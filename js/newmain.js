document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('href');
  
      fetch(url)
        .then(res => res.text())
        .then(data => {
          document.getElementById('contenido').innerHTML = data;
          history.pushState(null, '', url);
        })
        .catch(err => {
          document.getElementById('contenido').innerHTML = '<p>Error al cargar contenido.</p>';
        });
    });
  });
  
  // Maneja el botón "atrás"
  window.addEventListener('popstate', () => {
    fetch(location.pathname)
      .then(res => res.text())
      .then(data => {
        document.getElementById('contenido').innerHTML = data;
      });
  });
  