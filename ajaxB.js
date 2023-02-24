$(document).ready(function () {
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
});