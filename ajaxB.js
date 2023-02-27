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
      li.classList.add('list-group-item', 'list-group-item-action','mi_cursor');
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
          }
        } else {
          alert("No hay existencias suficientes de ese producto seleccione otro");
        }

      } else {
        alert("No ha introducido un número válido.")
      }
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
    alert("segundo btn.")
    // Obtener cadena JSON del almacenamiento local
    const carritoJSON = localStorage.getItem('carrito');

    // Convertir cadena JSON a objeto
    const productos = JSON.parse(carritoJSON);

    // Acceder a las propiedades del objeto
    for (let i = 0; i < productos.length; i++) {
      console.log(productos[i]);
    }
  });//fin función


  document.addEventListener('keyup', function(event) {
    if (event.ctrlKey && event.code === 'Space') {
      document.addEventListener('click', function handleMouseDown(event) {
        if (event.button === 0) {
          window.location.replace('index.html');
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
    const sumaVenta = carrito.reduce((a, v) => { return a + v.importe; }, 0);
console.log(sumaVenta)

    function procesarPago() {
      return new Promise((resolve, reject) => {
        
        setTimeout(() => {
          const respuesta = { exitoso: true, mensaje: 'Pago procesado correctamente' };
          
          resolve(window.location.href = 'pasarela.html');
        }, 5000); // 
      });
    }
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
        localStorage.setItem('almacen', JSON.stringify(almacen)); //ACTUALIZAR STOCK
                const x = localStorage.getItem('almacen');
                const xx = JSON.parse(x);
        console.log(xx)
        localstorage.removeItem('carrito');
        setTimeout(() => {
          window.location.href = 'pago.html'; //REDIRECCION A WEB IPSE LORUM
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        window.location.href = 'amazon.es'; //REDIRECCION A WEB AMAZON
      });

  });

});