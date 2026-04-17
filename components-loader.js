/* ============================================
   COMPONENTS-LOADER.JS
   Sistema modular - Dr. Omar Alberto Tirado Aguilar
   Ginecología y Medicina Materno Fetal CDMX
   ============================================ */

// Cargar componentes reutilizables
async function loadComponent(selector, file) {
  const element = document.querySelector(selector);
  if (!element) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error(`Error cargando componente ${file}:`, error);
  }
}

// Inicializar todos los componentes al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  // Cargar componentes en paralelo
  await Promise.all([
    loadComponent('#navbar-placeholder', 'components/navbar.html'),
    loadComponent('#footer-placeholder', 'components/footer.html'),
    loadComponent('#whatsapp-placeholder', 'components/whatsapp-float.html')
  ]);

  // Inicializar funcionalidades después de cargar
  initNavbar();
  initFAQ();
  initScrollAnimations();
  initSmoothScroll();
});

// Menú móvil
function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Cerrar menú al hacer click en un enlace (mobile)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        menu.classList.remove('active');
      }
    });
  });

  // Scroll effect en navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(40, 60, 120, 0.12)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.96)';
        navbar.style.boxShadow = '0 4px 20px rgba(40, 60, 120, 0.08)';
      }
    });
  }
}

// FAQ Acordeón
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const pregunta = item.querySelector('.faq-pregunta');
    if (pregunta) {
      pregunta.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Smooth scroll para anchors internos
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
