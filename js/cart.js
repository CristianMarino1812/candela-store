/*
  Carrito de compras.
  Guarda el carrito en el navegador (localStorage) para que no se pierda
  si el cliente recarga la página.

  Pago: "Pagar con Mercado Pago" lleva al link de pago de abajo. Ese link
  no conoce el total del carrito (es un link fijo, no generado por
  producto/pedido), así que se le muestra el total al comprador antes de
  redirigirlo para que lo pague por ese monto.

  Email automático del pedido: se envía con EmailJS (emailjs.com), que
  manda el mail directo desde el navegador sin necesidad de un servidor.
  Para activarlo hay que completar las 3 constantes EMAILJS_* de abajo con
  los datos de tu cuenta de EmailJS (Service ID, Template ID, Public Key).
  Si no están completas, el sitio usa el botón secundario (mailto) como
  respaldo manual.
*/

const MERCADO_PAGO_LINK = "https://link.mercadopago.com.ar/candelaastore"; // reemplazar por el link de pago que te va a pasar Cristian
const SELLER_EMAIL = "hola@candelastore.com"; // reemplazar por el email real donde querés recibir los pedidos

const EMAILJS_PUBLIC_KEY = "tS8usttzLLEwPeKL8";   // Account > General > Public Key
const EMAILJS_SERVICE_ID = "service_naflp72";  // Email Services > tu servicio de Gmail
const EMAILJS_TEMPLATE_ID = "template_09tcjro"; // Email Templates > tu plantilla

if (EMAILJS_PUBLIC_KEY && window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const CART_KEY = "candela_cart";
const BUYER_NAME_KEY = "candela_buyer_name";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();

function formatMoney(value) {
  return "$" + value.toLocaleString("es-AR");
}

function addToCart(productIndex, qty = 1) {
  const line = cart.find(item => item.productIndex === productIndex);
  if (line) {
    line.qty += qty;
  } else {
    cart.push({ productIndex, qty });
  }
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(productIndex) {
  cart = cart.filter(item => item.productIndex !== productIndex);
  saveCart();
  renderCart();
}

function setQty(productIndex, qty) {
  if (qty <= 0) {
    removeFromCart(productIndex);
    return;
  }
  const line = cart.find(item => item.productIndex === productIndex);
  if (!line) return;
  line.qty = qty;
  saveCart();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + PRODUCTS[item.productIndex].price * item.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartItemThumb(product) {
  const first = product.media[0];
  return first.type === "video"
    ? `<video src="${first.src}" muted playsinline preload="metadata"></video>`
    : `<img src="${first.src}" alt="${product.name}">`;
}

function renderCart() {
  const list = document.getElementById("cartItems");
  const badge = document.getElementById("cartBadge");
  const totalEl = document.getElementById("cartTotal");
  const emptyEl = document.getElementById("cartEmpty");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
  checkoutBtn.disabled = count === 0;

  if (cart.length === 0) {
    list.innerHTML = "";
    emptyEl.style.display = "block";
    totalEl.textContent = formatMoney(0);
    return;
  }
  emptyEl.style.display = "none";

  list.innerHTML = cart.map(item => {
    const product = PRODUCTS[item.productIndex];
    return `
      <div class="cart-item" data-index="${item.productIndex}">
        <div class="cart-item__thumb">${cartItemThumb(product)}</div>
        <div class="cart-item__body">
          <h4>${product.name}</h4>
          <span class="cart-item__price">${formatMoney(product.price)} c/u</span>
          <div class="cart-item__qty">
            <button class="qty-btn" data-action="decrease" aria-label="Restar">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="increase" aria-label="Sumar">+</button>
          </div>
        </div>
        <div class="cart-item__side">
          <span class="cart-item__line-total">${formatMoney(product.price * item.qty)}</span>
          <button class="cart-item__remove" data-action="remove" aria-label="Quitar">✕</button>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = formatMoney(cartTotal());

  list.querySelectorAll(".cart-item").forEach(el => {
    const idx = Number(el.dataset.index);
    const line = cart.find(i => i.productIndex === idx);
    el.querySelector('[data-action="increase"]').addEventListener("click", () => setQty(idx, line.qty + 1));
    el.querySelector('[data-action="decrease"]').addEventListener("click", () => setQty(idx, line.qty - 1));
    el.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(idx));
  });
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("is-open");
  document.body.style.overflow = "";
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartBackdrop").addEventListener("click", closeCart);

const buyerNameInput = document.getElementById("buyerName");
const buyerNameError = document.getElementById("buyerNameError");

buyerNameInput.value = localStorage.getItem(BUYER_NAME_KEY) || "";
buyerNameInput.addEventListener("input", () => {
  localStorage.setItem(BUYER_NAME_KEY, buyerNameInput.value.trim());
  if (buyerNameInput.value.trim()) buyerNameError.classList.remove("is-visible");
});

function getBuyerName() {
  return buyerNameInput.value.trim();
}

function requireBuyerName() {
  if (getBuyerName()) return true;
  buyerNameError.classList.add("is-visible");
  buyerNameInput.focus();
  return false;
}

function buildOrderParams() {
  const lines = cart.map(item => {
    const p = PRODUCTS[item.productIndex];
    return `- ${p.name}  x${item.qty}  ${formatMoney(p.price)} c/u  =  ${formatMoney(p.price * item.qty)}`;
  }).join("\n");

  return {
    buyer_name: getBuyerName(),
    item_count: cartCount(),
    order_total: formatMoney(cartTotal()),
    order_details: lines,
    order_date: new Date().toLocaleString("es-AR"),
  };
}

function buildOrderText() {
  const p = buildOrderParams();
  return `Nombre y apellido: ${p.buyer_name}\n` +
    `Cantidad de productos: ${p.item_count}\n` +
    `TOTAL A TRANSFERIR: ${p.order_total}\n\n` +
    `Detalle del pedido:\n${p.order_details}\n\n` +
    `Dirección / punto de entrega:\nTeléfono:\nMedio de pago preferido:`;
}

function emailAutomationReady() {
  return Boolean(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && window.emailjs);
}

function sendOrderEmailAutomatic() {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, buildOrderParams());
}

const checkoutNote = document.getElementById("checkoutNote");
checkoutNote.textContent = emailAutomationReady()
  ? "Al pagar, te avisamos automáticamente a nosotros con tu nombre y el detalle del pedido."
  : "Te llevamos a Mercado Pago para pagar el total. Usá el botón de abajo para avisarnos por email con el detalle.";

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  if (!requireBuyerName()) return;

  const total = formatMoney(cartTotal());
  const confirmed = window.confirm(
    `${getBuyerName()}, vas a pagar ${total} (${cartCount()} producto${cartCount() === 1 ? "" : "s"}) en Mercado Pago.\n\n` +
    `Asegurate de indicar ese monto en la página de pago.`
  );
  if (!confirmed) return;

  if (emailAutomationReady()) {
    sendOrderEmailAutomatic().catch(err => console.error("No se pudo enviar el email automático:", err));
  }

  window.open(MERCADO_PAGO_LINK, "_blank", "noopener");

  cart = [];
  saveCart();
  renderCart();
  closeCart();
});

document.getElementById("checkoutEmailBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  if (!requireBuyerName()) return;

  const subject = `Nuevo pedido - Candela Store - ${getBuyerName()}`;
  window.location.href = `mailto:${SELLER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildOrderText())}`;
});

renderCart();
