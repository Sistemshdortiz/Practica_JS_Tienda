"use strict";

$(document).ready(function () {
  //variables globales
  const buscarInput = document.querySelector('#busqueda');
  const listaSugerencias = document.querySelector('#sugerencia');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  buscarInput.addEventListener('input', busqueda);

  //--------------Funciones---------------
  function busqueda() {
    const textoBuscado = buscarInput.value;
    if (textoBuscado.trim().length > 0) {
      getSugerencias(textoBuscado.trim())
        .then(mostrarSugerencias)
        .catch(gestionarError);
    } else {
      limpiarSugerencias();
    }
  }//Fin función

  function getSugerencias(textoBuscado) {
    return new Promise((resolve, reject) => {
      const datos = localStorage.getItem('almacen');
      const data = JSON.parse(datos);
      console.log(data)
      if (!data) {
        reject('No se encontraron datos en Local Storage.');
      }
      const sugerencias = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        const descripcion = data[i].descripcion;
        sugerencias.push(descripcion);
      }
      const sugerenciasFiltradas = sugerencias.filter(sugerencia =>
        sugerencia.toLowerCase().startsWith(textoBuscado.toLowerCase()));
      resolve(sugerenciasFiltradas);
      console.log(sugerenciasFiltradas)
    });
  }//Fin función

  function mostrarSugerencias(sugerencias) {
    listaSugerencias.innerHTML = '';
    sugerencias.forEach(sugerencia => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'list-group-item-action', 'mi_cursor');
      li.textContent = sugerencia;

      //Añadimos el evento mouseenter y mouseleave
      li.addEventListener('mouseenter', function () {
        const imagen = new Image();
        imagen.src = "img_producto.jpg"
        imagen.id = "img_hover"
        imagen.style.width = "50px";
        $(this).append(imagen);
      });
      li.addEventListener('mouseleave', function () {
        const imagen = document.querySelector('#img_hover');
        $(this).find(imagen).remove();
      });

      listaSugerencias.appendChild(li);
    });
    //Esto a sido añadido para que en el usuario pueda seleccionar una de las sugerencias y sea
    //añadido automaticamente al imput de busqueda
    $(listaSugerencias).on('click', function (event) {
      if (event.target.tagName === 'LI') {
        buscarInput.value = event.target.textContent;
      }
    });
  }//Fin función


  function gestionarError(error) {
    console.error(error);
  }//Fin función

  function limpiarSugerencias() {
    listaSugerencias.innerHTML = '';
  }//Fin función

  //función para btn buscar, consulta sobre cuantos productos hay y añadir al carrito
  $('#botonBusqueda').on('click', function () {
    let input = prompt('Introduzca el número de unidades que desea de este producto.')
    const pattern = /^\d+$/;
    const datos = localStorage.getItem('almacen');
    const datos_array = JSON.parse(datos);

    //ocultar la lista de sugerencias con stock
    $('#div_sugerencias_ocultas').hide();

    if (pattern.test(input)) {
      console.log("OK")
      let unidades_en_existencia = datos_array.find(elem => elem.descripcion == buscarInput.value)?.stock;

      console.log(unidades_en_existencia)
      if (comprobar_existencias(unidades_en_existencia, input)) {

        let precio_unitario = datos_array.find(elem => elem.descripcion == buscarInput.value)?.importe;

        let total = precio_unitario * input;
        // Aqui se evalua si que se quiere el producto y se añade al carrito 
        if (confirm(`El precio por unidad es de ${precio_unitario}€, y el total a pagar sería de ${total}€`)) {
          let elemento_de_compra = datos_array.find(elem => {
            if (elem.descripcion == buscarInput.value) {
              elem.stock = input;
              elem.importe = total;

              return elem;
            }
          });

          carrito.push(elemento_de_compra)
          console.log(carrito)
          const carritoJSON = JSON.stringify(carrito)
          localStorage.setItem('carrito', carritoJSON);
          alert('Añadido al carrito')
        } else {
          alert('De acuerdo, sigua con con sus compras')
        }


      } else if (comprobar_existencias2(unidades_en_existencia, input)) {

        if (confirm(`Solo tenemos ${unidades_en_existencia} unidades, ¿Desea continuar con su compra?`)) {
          let precio_unitario = datos_array.find(elem => elem.descripcion == buscarInput.value)?.importe;

          let total = precio_unitario * unidades_en_existencia;
          // Aqui se evalua si que se quiere el producto y se añade al carrito 
          if (confirm(`El precio por unidad es de ${precio_unitario}€, y el total a pagar sería de ${total}€`)) {
            let elemento_de_compra = datos_array.find(elem => {
              if (elem.descripcion == buscarInput.value) {
                elem.importe = total;
                return elem;
              }
            });

            carrito.push(elemento_de_compra)
            console.log(carrito)
            const carritoJSON = JSON.stringify(carrito)
            localStorage.setItem('carrito', carritoJSON);
            alert('Añadido al carrito')
          } else {
            alert('Muy bien continue con sus compras.')
          }
        } else {
          alert("De acuerdo!");
        }
      } else {
        alert("NO HAY EXISTENCIAS DE ESTE PRODUCTO AQUI TE DEJAMOS UNA LISTA DE PRODUCTOS SIMILARES.")
        buscarInput.value = buscarInput.value[0];
        let primera_letra = buscarInput.value[0];
        let almacen = localStorage.getItem('almacen');
        let almacenJSON = JSON.parse(almacen);
        console.log(almacenJSON)
        let sugerencias_parecidas = almacenJSON.filter((producto => producto.descripcion[0] == primera_letra));
        console.log(sugerencias_parecidas)
        let sugerencias_en_stock = sugerencias_parecidas.map(function (sugerencia) {
          const li = document.createElement('li');
          li.classList.add('list-group-item', 'list-group-item-action', 'mi_cursor');
          $('#sugerencia_con_stock').append(li);
          return (sugerencia.stock > 0) ? li.textContent = sugerencia.descripcion + " con cod#" + sugerencia.codigo + "---> En Stock" : li.textContent = sugerencia.descripcion + " con cod#" + sugerencia.codigo + "---> Agotado";
        })

        console.log(`sugerencias en stock ${sugerencias_en_stock}`)
        $('#div_sugerencias_ocultas').show();

      }
    } else {
      alert("No ha introducido un número válido.")
    }
  });//Fin función

  //--Funcines comprobación número de productos--
  function comprobar_existencias(existencias, num_pedido) {
    return existencias >= num_pedido ? true : false;
  }//fin función
  function comprobar_existencias2(existencias, num_pedido) {
    return existencias < num_pedido && existencias > 0 ? true : false;
  }//fin función
  //*****************

  //Función de prueba para ver que tiene el localStorage con clave carrito
  $('#btn2').click(function () {
    // Obtener cadena JSON del almacenamiento local
    const carritoJSON = localStorage.getItem('carrito');

    // Convertir cadena JSON a objeto
    const productos = JSON.parse(carritoJSON);
    let carrito_alert="";
    // Acceder a las propiedades del objeto
    for (let i = 0; i < productos.length; i++) {
      console.log(productos[i]);
      carrito_alert += "-" + productos[i].descripcion +", -->cantidad: "+productos[i].stock + "\n";
    }
    alert(carrito_alert)
  });//fin función


  document.addEventListener('keyup', function (event) {
    if (event.ctrlKey && event.code === 'Space') {
      document.addEventListener('click', function handleMouseDown(event) {
        if (event.button === 0) {
           window.open('index.html', '_blank');
          document.removeEventListener('click', handleMouseDown);
          document.removeEventListener('keyup');
        }
      });
    }
  });


  $('#botonPagar').click(function () {

    const car = localStorage.getItem('carrito');
    const carrito = JSON.parse(car);
    console.log(carrito);
    if (carrito) {
      const sumaVenta = carrito.reduce((a, v) => { return a + v.importe; }, 0);
      console.log(sumaVenta)
      alert("El total de la compra es de " + sumaVenta + "€");
      procesarPago()
        .then(respuesta => {
          console.log(respuesta.mensaje);//PASARELA MAGICA
          alert(respuesta.mensaje)
          let almacen = JSON.parse(localStorage.getItem('almacen'));
          almacen = almacen.map(producto => {
            const carritoProducto = carrito.find(item => item.codigo === producto.codigo);
            if (carritoProducto) {
              producto.stock -= carritoProducto.stock;
            }
            return producto;
          });
          localStorage.removeItem('carrito');
          localStorage.setItem('almacen', JSON.stringify(almacen)); //ACTUALIZAR STOCK
          const x = localStorage.getItem('almacen');
          const xx = JSON.parse(x);
          console.log(xx)

          setTimeout(() => {
            window.location.href = 'pago.html'; //REDIRECCION A WEB IPSE LORUM
          }, 2000);


        })
        .catch(error => {
          console.error(error);
          alert(error.mensaje)
          window.location.replace('https://www.amazon.es'); //REDIRECCION A WEB AMAZON
        });
    } else {
      alert("El carrito está vacio")
    }

  });

//  async function pasarela(){
//   window.location.href = 'pasarela.html';
//   await procesarPago();
//  }
  function procesarPago() {
    
    alert('Nombre completo:\t\t\n' +
      'Número de tarjeta:\t\n' +
      'Fecha de caducidad:\t\n' +
      'CVV:\t\t\t\n' +
      'Monto a pagar:\t\t\n' +
      '\n' +
      '\t\t\tComprar');
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const exitoso = Math.random() < 0.7; // El 70% de las veces el pago es exitoso
        if (exitoso) {
          const respuesta = { exitoso: true, mensaje: 'Pago procesado correctamente.' };
          resolve(respuesta);
        } else {
          const respuesta = { exitoso: false, mensaje: 'Error al procesar el pago. Intente de nuevo más tarde.' };
          reject(respuesta);
        }
      }, 3000);
    });
  }

  document.addEventListener('contextmenu', (event) => {
    //prevenir el comportamiento predeterminado del botón derecho del mouse
    event.preventDefault();

    //elementos a deshabilitar
    const input = document.querySelector('input');
    const botones = document.querySelectorAll('button');

    //deshabilitar los elementos
    input.disabled = true;
    botones.forEach(boton => boton.disabled = true);

  });

  //manejar el evento click 
  document.addEventListener('click', () => {
    const input = document.querySelector('input');
    const botones = document.querySelectorAll('button');

    input.disabled = false;
    botones.forEach(boton => boton.disabled = false);
  });






});