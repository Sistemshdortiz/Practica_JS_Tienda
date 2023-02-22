$(document).ready(function () {
 
    $('#boton1').click(function () {

        alert("!!!")
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
        // Convertir objeto a cadena JSON
        const productoJSON = JSON.stringify(producto);

        // Guardar cadena JSON en localStorage
        localStorage.setItem('producto', productoJSON);
        alert($('input:text[id=cod_producto]').val())
        alert($('input:text[id=descrip]').val())
        alert($('input:text[id=importe]').val())
        alert($('input:text[id=stock]').val())
    
        
    });

    $('#boton2').click(function () {
        alert("segundo btn..")
        // Obtener cadena JSON del almacenamiento local
        const productoJSON = localStorage.getItem('producto');
    
        // Convertir cadena JSON a objeto
        const producto = JSON.parse(productoJSON);
    
        // Acceder a las propiedades del objeto
        console.log(producto.codigo);        
        console.log(producto.descripcion);  
        console.log(producto.importe);      
        console.log(producto.stock);        
    
    });
    
});

