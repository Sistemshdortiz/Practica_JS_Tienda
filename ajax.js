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
        
        alert($('input:text[id=descrip]').val())
        alert($('input:text[id=importe]').val())
        alert($('input:text[id=stock]').val())
    
        
    });

    $('#boton2').click(function () {
        alert("segundo btn.")
        // Obtener cadena JSON del almacenamiento local
        const productoJSON = localStorage.getItem('producto');

        //obtener datos del porducto para pasarlo al xml
        // let data = localStorage.getItem('producto')
        // let xhr = new XMLHttpRequest()
        // let url = 'productos.xml'
        // xhr.open('POST', url, true);
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // let params = 'producto='+encodeURIComponent(data);
        // xhr.send(params);

        // xhr.onreadystatechange = function(){
        //     if(xhr.readyState ===4 && xhr.status ===200){
        //         console.log(xhr.responseText)
        //     }
        // }

        // Convertir cadena JSON a objeto
        const producto = JSON.parse(productoJSON);
    
        // Acceder a las propiedades del objeto
        console.log(producto.codigo);        
        console.log(producto.descripcion);  
        console.log(producto.importe);      
        console.log(producto.stock);   
        

    
    });
    
});

