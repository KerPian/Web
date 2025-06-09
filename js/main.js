// Función para detectar si es móvil
function esMovil() {
    return window.matchMedia("(max-width: 768px)").matches;
  }  

  // Bloquear descargas en móviles
  document.querySelectorAll('.download').forEach(link => {
    link.addEventListener('click', function (e) {
      if (esMovil()) {
        e.preventDefault();
        alert('La descarga no está disponible en dispositivos móviles.');
      }
    });
  });
  
  function cargarPagina(pagina) {
    fetch(pagina + '.html')
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newContent = doc.body;
        document.getElementById('contenido').innerHTML = newContent.innerHTML;
      })
      .catch(err => {
        document.getElementById('contenido').innerHTML = '<p>Error al cargar contenido.</p>';
      });
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
  