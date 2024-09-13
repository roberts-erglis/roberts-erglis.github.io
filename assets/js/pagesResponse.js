document.addEventListener('DOMContentLoaded', function () {
  const routes = {
    '#/': 'homepage',
    '#/index.html': 'homepage',
    '#/idea': 'idea',
    '#/hope_aid': 'hope_aid',
    '#/hope_bank': 'hope_bank',
    '#/log_on_hope': 'log_on_hope',
    '#/for_bussines': 'for_bussines',
    '#/story': 'story',
  };

  const contentDiv = document.getElementById('content');

  function navigate(route) {
    const page = routes[route] || '404';
    fetchPage(page);
  }

  function fetchPage(page) {
    fetch(`pages/${page}.html`)
      .then(response => response.ok ? response.text() : fetch('404.html').then(res => res.text()))
      .then(html => {
        contentDiv.innerHTML = html;
      });
  }

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const route = this.getAttribute('href');
      history.pushState({}, '', route);
      navigate(route);
    });
  });

  window.addEventListener('popstate', function () {
    navigate(window.location.hash || '#/');
  });

  function detectRouteOnLoad() {
    const currentRoute = window.location.hash || '#/';
    navigate(currentRoute);
  }

  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    detectRouteOnLoad();
  } else {
    detectRouteOnLoad();
  }

  document.getElementById('dropdown').addEventListener('click', function() {
    const menu = document.getElementById('link-mobile');
  
    if (menu.classList.contains('nav-visible')) {
      menu.classList.remove('nav-visible');
      menu.classList.add('nav-hidden');
    } else {
      menu.classList.remove('nav-hidden');
      menu.classList.add('nav-visible');
    }
  });
});

