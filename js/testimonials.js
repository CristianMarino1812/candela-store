/*
  Testimonios de clientes.
  Los de acá abajo son los comentarios iniciales que siempre se muestran.
  Los que agregan los visitantes desde el formulario se guardan en el
  navegador (localStorage) y se suman a estos.
*/
const SEED_TESTIMONIALS = [
  { name: "Marina G.", text: "Las sábanas son buenísimas, se nota la calidad. ¡Ya pedí otro juego!" },
  { name: "Julián P.", text: "Mi termo llegó perfecto y mantiene la temperatura todo el día. Muy recomendable." },
  { name: "Sofía R.", text: "Excelente variedad de mates y muy buena atención. Llegó todo a tiempo." },
];

const TESTIMONIALS_KEY = "candela_testimonials";

function loadUserTestimonials() {
  try {
    return JSON.parse(localStorage.getItem(TESTIMONIALS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUserTestimonials(list) {
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(list));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = ["rose", "mint", "lavender", "cream"];

function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  const userTestimonials = loadUserTestimonials();
  const all = [...userTestimonials, ...SEED_TESTIMONIALS];

  grid.innerHTML = all
    .map((t, i) => `
      <blockquote class="testimonial reveal is-visible">
        <span class="testimonial__quote">“</span>
        <p>${escapeHtml(t.text)}</p>
        <div class="testimonial__author">
          <span class="testimonial__avatar testimonial__avatar--${AVATAR_COLORS[i % AVATAR_COLORS.length]}">${initials(t.name)}</span>
          <cite>${escapeHtml(t.name)}</cite>
        </div>
      </blockquote>
    `)
    .join("");
}

document.getElementById("testimonialForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("testimonialName");
  const textInput = document.getElementById("testimonialText");

  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (!name || !text) return;

  const userTestimonials = loadUserTestimonials();
  userTestimonials.unshift({ name, text });
  saveUserTestimonials(userTestimonials);

  renderTestimonials();
  e.target.reset();
});

renderTestimonials();
