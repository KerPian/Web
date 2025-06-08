// Función para detectar si es móvil
function esMovil() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }
  
  // Bloquear descargas en móviles
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (esMovil()) {
        e.preventDefault();
        alert('La descarga no está disponible en dispositivos móviles.');
      }
    });
  });
  
  // Función para cargar contenido según la página (sin extensión)
  function cargarPagina(pagina) {
    fetch(pagina + '.html')
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        // Buscamos contenido dentro de #contenido o todo el body si no existe
        const newContent = doc.querySelector('#contenido') || doc.body;
        document.getElementById('contenido').innerHTML = newContent.innerHTML;
      })
      .catch(err => {
        document.getElementById('contenido').innerHTML = '<p>Error al cargar contenido.</p>';
      });
  }
  
  // Manejar clicks en los links usando hash routing
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const hash = this.getAttribute('href').substring(1); // quitar el '#'
      location.hash = hash; // cambiar el hash en la URL
    });
  });
  
  // Cuando cambia el hash, cargar la página correspondiente
  window.addEventListener('hashchange', () => {
    const pagina = location.hash.substring(1) || 'inicio'; // default a inicio si vacío
    cargarPagina(pagina);
  });
  
  // Al cargar la página, cargar contenido según hash o inicio por defecto
  window.addEventListener('load', () => {
    const pagina = location.hash.substring(1) || 'inicio';
    cargarPagina(pagina);
  });
  