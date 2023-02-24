

$(document).ready(function () {

    let almacen = JSON.parse(localStorage.getItem('almacen')) || [];

    $('#boton1').click(function () {

        const producto = {
            codigo: null,
            descripcion: null,
            importe: null,
            stock: null
        };

        producto.codigo = $('input:text[id=cod_producto]').val()
        producto.descripcion = $('input:text[id=descrip]').val()
        producto.importe = $('input:text[id=importe]').val()
        producto.stock = $('input:text[id=stock]').val()

        //validación de código
        for(let i=0; i<almacen.length; i++){
        if(almacen[i].codigo == $('input:text[id=cod_producto]').val()) return alert("Ya existe un producto con ese código, no puede darse de alta otra vez!")
        }
        almacen.push(producto)

        const productoJSON = JSON.stringify(almacen);

        // Guardar cadena JSON en localStorage

        localStorage.setItem('almacen', productoJSON);

        alert($('input:text[id=descrip]').val())
        alert($('input:text[id=importe]').val())
        alert($('input:text[id=stock]').val())

        // const producto2= JSON.parse(localStorage.getItem('almacen2'))
        // console.log(producto2);

    });

    $('#boton3').click(function () {
       alert("bt 3!!")

        for(let i=0; i<almacen.length; i++){
          
            if(almacen[i].codigo == $('input:text[id=cod_producto]').val()){
                alert(almacen[i].codigo)
                almacen[i].importe = $('input:text[id=importe]').val()
                almacen[i].stock = $('input:text[id=stock]').val()
            }
        }
        let productoJSON = JSON.stringify(almacen);  
        localStorage.setItem('almacen', productoJSON);
    });
    $('#boton2').click(function () {
        alert("segundo btn.")
        // Obtener cadena JSON del almacenamiento local
        const almacenJSON = localStorage.getItem('almacen');

        // Convertir cadena JSON a objeto
        const producto = JSON.parse(almacenJSON);

        // Acceder a las propiedades del objeto
        for (i = 0; i < producto.length; i++) {
            console.log(producto[i]);
        }

        // console.log(producto.descripcion);  
        // console.log(producto.importe);      
        // console.log(producto.stock);   


    });


    $('#boton4').click(function () {
        let aBorrar = $('input:text[id=cod_producto]').val();
        let almacen = JSON.parse(localStorage.getItem('almacen'));
        almacen.forEach((prod,index) => {
            if (prod.codigo === aBorrar) {
              almacen.splice(index,1)
            }
        });
        const productoJSON = JSON.stringify(almacen);

        // Guardar cadena JSON en localStorage

        localStorage.setItem('almacen', productoJSON);
    })

});

