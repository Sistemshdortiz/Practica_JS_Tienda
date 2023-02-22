document.addEventListener('onload', function() {
const buscarInput = document.querySelector('#busqueda');
const listaSugerencias = document.querySelector('#sugerencia');

buscarInput.addEventListener('input', busqueda);

function busqueda() {
    const textoBuscado = buscarInput.value;
    if (textoBuscado.trim().length > 0) {
        getSugerencias(textoBuscado)
            .then(mostrarSugerencias)
            .catch(gestionarError);
    } else {
        limpiarSugerencias();
    }
}

function getSugerencias(textoBuscado) {
  return new Promise((resolve, reject) => {
      $.ajax({
        url: 'productos.xml',
        dataType: 'xml',
        success: function(data) {
          const sugerencias = [];
          $(data).find('producto').each(function() {
            const descripcion = $(this).find('descripcion').text();
            sugerencias.push(
            
              descripcion
            );
          });
          console.log(sugerencias)
          const sugerenciasFiltradas = sugerencias.filter(sugerencia =>
            sugerencia.descripcion.toLowerCase().startsWith(textoBuscado.toLowerCase())
          );
          resolve(sugerenciasFiltradas);
        },
        error: function() {
          reject('Ha ocurrido un error al obtener las sugerencias.');
        }
      });
    });
}

function mostrarSugerencias(sugerencias) {
    listaSugerencias.innerHTML = '';
    sugerencias.forEach(sugerencia => {
        const li = document.createElement('li');
        li.textContent = sugerencia;
        listaSugerencias.appendChild(li);
    });
}

function gestionarError(error) {
    console.error(error);
}

function limpiarSugerencias() {
    listaSugerencias.innerHTML = '';
}
})