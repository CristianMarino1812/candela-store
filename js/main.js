// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('nav-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('nav-open'));
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
}
window.observeReveals = observeReveals;
observeReveals();

// Tarjetas de foto del hero: filtran el catálogo por categoría y llevan a la colección
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    const pill = document.querySelector(`.filter-pill[data-category="${category}"]`);
    if (pill) pill.click();
    document.getElementById('coleccion').scrollIntoView({ behavior: 'smooth' });
  });
});
