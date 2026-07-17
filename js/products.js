/*
  Catálogo de productos.
  Para agregar un producto nuevo, copiá un bloque y completá los datos.

  - category:   nombre de la categoría (se agrupa y genera el filtro solo)
  - name:       nombre del producto
  - price:      precio en pesos, solo número (se usa para mostrar "$ ...")
  - priceLabel: opcional. Si el precio no es un número simple (ej. "3x$1.500"
                o "c/u"), poné acá el texto exacto y se muestra en vez del precio.
  - stock:      "stock" (con stock) o "encargue" (por encargue)
  - media:      array de fotos y/o video del producto, en el orden en que se
                muestran. Cada item es { type: "image"|"video", src: "..." }.
                El primer item se usa como miniatura en la grilla.
  - mpLink:     link de pago de Mercado Pago del producto (reemplazar el "#")
*/
const PRODUCTS = [
  {
    category: "Vajilla", name: "Set de tazas con plato", price: 25000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/set-de-tazas-con-plato.jpeg" },
      { type: "video", src: "videos/set-de-tazas.mp4" },
    ],
  },
  {
    category: "Acolchados", name: "Acolchado", price: 25000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/acolchado.jpeg" },
      { type: "image", src: "images/acolchado-back.jpeg" },
      { type: "image", src: "images/acolchado-rosa.jpeg" },
      { type: "video", src: "videos/acolchado.mp4" },
    ],
  },
  {
    category: "Ropa", name: "Medias", price: 1500, priceLabel: "3 x $1.500", stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/medias.jpeg" }],
  },
  {
    category: "Cocina", name: "Repasadores", price: 1000, priceLabel: "$1.000 c/u", stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/repasadores.jpg" },
      { type: "video", src: "videos/repasadores.mp4" },
    ],
  },
  {
    category: "Mates y termos", name: "Termo + mate", price: 30000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/termo-mate.jpeg" },
      { type: "image", src: "images/termo-mate-azul.jpeg" },
      { type: "video", src: "videos/termo-mate.mp4" },
    ],
  },
  {
    category: "Mates y termos", name: "Termo Selección AFA", price: 24000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/termo-seleccion-afa.jpeg" }],
  },
  {
    category: "Sábanas", name: "Sábana de niño", price: 25000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/sabana-de-nino.jpeg" }],
  },
  {
    category: "Sábanas", name: "Set de sábanas 2 plazas 4 piezas", price: 30000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/set-sabanas-4-piezas.jpeg" }],
  },
  {
    category: "Vasos", name: "Vaso Stanley", price: 20000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/vaso-stanley.jpeg" },
      { type: "video", src: "videos/vaso-stanley.mp4" },
    ],
  },
  {
    category: "Cocina", name: "Set para cocina", price: 25000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/set-para-cocina.jpeg" }],
  },
  {
    category: "Vasos", name: "Vaso eléctrico para café", price: 22000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/vaso-electrico-cafe.jpeg" },
      { type: "video", src: "videos/vaso-electrico-cafe.mp4" },
    ],
  },
  {
    category: "Vasos", name: "Vasos con pajita", price: 17000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/vaso-con-pajita.jpeg" },
      { type: "image", src: "images/vaso-con-pajita-2.jpeg" },
      { type: "video", src: "videos/vaso-con-pajita.mp4" },
    ],
  },
  {
    category: "Otros", name: "Monopatines", price: 22000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/monopatines.jpeg" }],
  },
  {
    category: "Textiles", name: "Mantel", price: 8000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/mantel.jpeg" }],
  },
  {
    category: "Acolchados", name: "Acolchado de capibara", price: 25000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/acolchado-capibara.jpeg" }],
  },
  {
    category: "Otros", name: "Mochila de capibara", price: 20000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/mochila-capibara.jpeg" },
      { type: "image", src: "images/mochila-capibara-2.jpeg" },
      { type: "image", src: "images/mochila-capibara-angulo.jpeg" },
      { type: "image", src: "images/mochila-capibara-angulo-2.jpeg" },
    ],
  },
  {
    category: "Cocina", name: "Cubiertos", price: 16000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/cubiertos.jpeg" },
      { type: "image", src: "images/cubiertos-azul.jpeg" },
      { type: "image", src: "images/cubiertos-rojo.jpeg" },
    ],
  },
  {
    category: "Ropa", name: "Boxer", price: 4000, stock: "stock", mpLink: "#",
    media: [
      { type: "image", src: "images/boxer.jpg" },
      { type: "video", src: "videos/boxer.mp4" },
    ],
  },
  {
    category: "Textiles", name: "Toallón", price: 15000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/toallon.jpeg" }],
  },
  {
    category: "Sábanas", name: "Set de sábanas 2 plazas 3 piezas", price: 25000, stock: "stock", mpLink: "#",
    media: [{ type: "image", src: "images/set-sabanas-3-piezas.jpeg" }],
  },
];

const CARD_COLORS = ["rose", "mint", "lavender", "cream"];

function formatPrice(product) {
  if (product.priceLabel) return product.priceLabel;
  return "$" + product.price.toLocaleString("es-AR");
}

function thumbnailMarkup(product) {
  const first = product.media[0];
  if (first.type === "video") {
    return `<video src="${first.src}" muted playsinline preload="metadata"></video><span class="play-badge">▶</span>`;
  }
  return `<img src="${first.src}" alt="${product.name}" loading="lazy">`;
}

function renderProducts(filterCategory) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  const items = filterCategory && filterCategory !== "Todos"
    ? PRODUCTS.filter(p => p.category === filterCategory)
    : PRODUCTS;

  items.forEach((product, index) => {
    const color = CARD_COLORS[index % CARD_COLORS.length];
    const stockLabel = product.stock === "stock" ? "En stock" : "Por encargue";
    const stockClass = product.stock === "stock" ? "stock-badge--stock" : "stock-badge--encargue";
    const productIndex = PRODUCTS.indexOf(product);

    const card = document.createElement("article");
    card.className = "product-card reveal";
    card.dataset.productIndex = productIndex;
    card.innerHTML = `
      <div class="product-card__image product-card__image--${color}">
        <span class="stock-badge ${stockClass}">${stockLabel}</span>
        ${thumbnailMarkup(product)}
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-card__footer">
          <span class="price">${formatPrice(product)}</span>
          <button class="btn btn--small" data-action="add-to-cart">Agregar</button>
        </div>
      </div>
    `;
    card.querySelector(".product-card__image").addEventListener("click", () => openModal(productIndex));
    card.querySelector("h3").addEventListener("click", () => openModal(productIndex));
    card.querySelector('[data-action="add-to-cart"]').addEventListener("click", () => addToCart(productIndex));
    grid.appendChild(card);
  });

  if (window.observeReveals) window.observeReveals();
}

function renderFilters() {
  const container = document.getElementById("categoryFilters");
  const categories = ["Todos", ...new Set(PRODUCTS.map(p => p.category))];

  container.innerHTML = categories
    .map((cat, i) => `<button class="filter-pill${i === 0 ? " is-active" : ""}" data-category="${cat}">${cat}</button>`)
    .join("");

  container.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderProducts(btn.dataset.category);
    });
  });
}

/* ===== Modal / galería de producto ===== */
let currentProduct = null;
let currentProductIndex = null;
let currentMediaIndex = 0;

const modal = document.getElementById("productModal");
const modalMediaInner = document.getElementById("modalMediaInner");
const modalDots = document.getElementById("modalDots");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalBuy = document.getElementById("modalBuy");
const modalStock = document.getElementById("modalStock");

function openModal(productIndex) {
  currentProduct = PRODUCTS[productIndex];
  currentProductIndex = productIndex;
  currentMediaIndex = 0;
  modalCategory.textContent = currentProduct.category;
  modalName.textContent = currentProduct.name;
  modalPrice.textContent = formatPrice(currentProduct);
  modalStock.textContent = currentProduct.stock === "stock" ? "En stock" : "Por encargue";
  modalStock.className = "stock-badge " + (currentProduct.stock === "stock" ? "stock-badge--stock" : "stock-badge--encargue");
  renderModalMedia();
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  modalMediaInner.innerHTML = "";
}

function renderModalMedia() {
  const item = currentProduct.media[currentMediaIndex];
  modalMediaInner.innerHTML = item.type === "video"
    ? `<video src="${item.src}" controls autoplay playsinline></video>`
    : `<img src="${item.src}" alt="${currentProduct.name}">`;

  const hasMultiple = currentProduct.media.length > 1;
  document.getElementById("modalPrev").style.display = hasMultiple ? "flex" : "none";
  document.getElementById("modalNext").style.display = hasMultiple ? "flex" : "none";

  modalDots.innerHTML = hasMultiple
    ? currentProduct.media
        .map((m, i) => `<span class="modal__dot${i === currentMediaIndex ? " is-active" : ""}"></span>`)
        .join("")
    : "";
}

function stepMedia(direction) {
  const total = currentProduct.media.length;
  currentMediaIndex = (currentMediaIndex + direction + total) % total;
  renderModalMedia();
}

document.getElementById("modalPrev").addEventListener("click", () => stepMedia(-1));
document.getElementById("modalNext").addEventListener("click", () => stepMedia(1));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
modalBuy.addEventListener("click", () => {
  addToCart(currentProductIndex);
  closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") stepMedia(-1);
  if (e.key === "ArrowRight") stepMedia(1);
});

renderFilters();
renderProducts("Todos");
