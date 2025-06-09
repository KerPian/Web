//función para detectar si es móvil
function esMovil() {
    return window.matchMedia("(max-width: 768px)").matches;
  }  

  function cargarPagina(pagina) {
    fetch(pagina + '.html')
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newContent = doc.body;
        document.getElementById('contenido').innerHTML = newContent.innerHTML;
        nullEventoDeDescarga();
      })
      .catch(err => {
        document.getElementById('contenido').innerHTML = '<p>Error al cargar contenido.</p>';
      });
  }

  function nullEventoDeDescarga() {
    //console.log(document.querySelectorAll('.download-game').length); //test de funcionamiento -> 0 no hay links, 0 < la función sirve
    //bloquear descargas en móviles
    document.querySelectorAll('.download-game').forEach(link => {
        link.addEventListener('click', function (e) {
          if (esMovil()) {
              e.preventDefault();
              alert('La descarga no está disponible en dispositivos móviles.');
        }
      });
    });
    document.querySelectorAll('.download-joke').forEach(link => {
        link.addEventListener('click', function (){
            alert('Su dispositivo acaba de detectar un virus. \nFavor reiniciar su dispositivo')
        })
    })
    
  }
  
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const hash = this.getAttribute('href').substring(1);
      location.hash = hash;
    });
  });
  
  window.addEventListener('hashchange', () => {
    const pagina = location.hash.substring(1) || 'inicio';
    cargarPagina(pagina);
  });
  
  window.addEventListener('load', () => {
    const pagina = location.hash.substring(1) || 'inicio';
    cargarPagina(pagina);
  });
