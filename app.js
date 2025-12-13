// 10Tenders

// Mobile nav toggle
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-collapsible]');
if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

// Smooth scroll for same-page anchors
const samePageLinks = document.querySelectorAll('a[href^="#"]');
samePageLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu after navigation
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Toast helper
const toast = document.getElementById('toast');
function showToast(message = 'Added to order') {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => (toast.hidden = true), 1800);
}

// ----------------------------------------------------------------------
// Cart / Order logic
// ----------------------------------------------------------------------

/**
 * Cart is kept client-side and synced to the DOM.
 * When "Place Demo Order" is clicked, we POST to /api/orders.
 */
const cart = [];

/** @param {number} value */
function formatPrice(value) {
  return value.toFixed(2);
}

function renderCart() {
  const itemsList = document.getElementById('order-items');
  const totalEl = document.getElementById('order-total');
  const emptyEl = document.getElementById('order-empty');
  const placeBtn = document.getElementById('place-order-btn');

  if (!itemsList || !totalEl || !emptyEl || !placeBtn) return;

  itemsList.innerHTML = '';

  if (cart.length === 0) {
    emptyEl.hidden = false;
    totalEl.textContent = '0.00';
    placeBtn.disabled = true;
    return;
  }

  emptyEl.hidden = true;

  let total = 0;
  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;

    const li = document.createElement('li');
    li.className = 'order-item-row';
    li.innerHTML = `
      <div class="order-item-main">
        <span class="order-qty">${item.qty}×</span>
        <span class="order-name">${item.name}</span>
      </div>
      <div>
        <span class="order-price">$${formatPrice(lineTotal)}</span>
        <button type="button" class="order-remove">Remove</button>
      </div>
    `;

    const removeBtn = li.querySelector('.order-remove');
    removeBtn?.addEventListener('click', () => {
      removeFromCart(item.id);
    });

    itemsList.appendChild(li);
  });

  totalEl.textContent = formatPrice(total);
  placeBtn.disabled = false;
}

function addToCart(id, name, price) {
  const priceNum = Number(price) || 0;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: priceNum, qty: 1 });
  }
  renderCart();
  showToast(`${name} added to order`);
}

function removeFromCart(id) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx !== -1) {
    cart.splice(idx, 1);
    renderCart();
  }
}

// Attach to "Add to Order" buttons in Fan Favorites
const addBtns = document.querySelectorAll('.add');
addBtns.forEach(btn =>
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-item') || 'Item';
    const id = Number(btn.getAttribute('data-id') || Date.now());
    const price = Number(btn.getAttribute('data-price') || '0');
    addToCart(id, name, price);
  })
);

// Handle "Place Demo Order"
const placeOrderBtn = document.getElementById('place-order-btn');
if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', async () => {
    if (!cart.length) return;

    const nameInput = /** @type {HTMLInputElement|null} */ (
      document.getElementById('customer-name')
    );
    const emailInput = /** @type {HTMLInputElement|null} */ (
      document.getElementById('customer-email')
    );

    const full_name = nameInput?.value.trim() || 'Demo Guest';
    const email = emailInput?.value.trim() || 'guest@example.com';

    const body = {
      customer: { full_name, email },
      items: cart.map(item => ({
        menu_item_id: item.id,
        quantity: item.qty
      }))
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`Failed to place order (status ${res.status})`);
      }

      const data = await res.json();
      const orderLabel = data.orderId ? ` #${data.orderId}` : '';
      showToast(`Order${orderLabel} placed!`);

      // Reset cart
      cart.length = 0;
      renderCart();
    } catch (err) {
      console.error(err);
      showToast('There was a problem placing your order');
    }
  });
}

// Initialize empty cart UI on load
renderCart();

// ----------------------------------------------------------------------
// Newsletter mock handler
// ----------------------------------------------------------------------
const form = document.getElementById('subscribe-form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const email = /** @type {HTMLInputElement} */ (
    document.getElementById('email')
  ).value.trim();
  if (!email) return;
  showToast('Subscribed! Check your inbox.');
  form.reset();
});
