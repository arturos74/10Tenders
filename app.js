// 10Tenders

// ---------- Mobile nav toggle ----------
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-collapsible]');
if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

// ---------- Smooth scroll for same-page anchors ----------
document.addEventListener('click', (event) => {
  const target = /** @type {HTMLElement} */ (event.target);
  if (!target.closest) return;
  const link = target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href || href === '#') return;

  const section = document.querySelector(href);
  if (!section) return;

  event.preventDefault();
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Close mobile nav after click
  if (navLinks && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    toggleBtn?.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Toast helper ----------
const toastEl = /** @type {HTMLDivElement | null} */ (
  document.getElementById('toast')
);

/**
 * @param {string} message
 */
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  toastEl.classList.add('show');

  setTimeout(() => {
    toastEl.classList.remove('show');
    toastEl.hidden = true;
  }, 2500);
}

// ---------- Cart / Order state ----------
/**
 * @typedef {{ id: number; name: string; price: number; quantity: number }} CartItem
 */

/** @type {CartItem[]} */
let cart = [];

const orderItemsList = document.getElementById('order-items');
const orderEmpty = document.getElementById('order-empty');
const orderTotalEl = document.getElementById('order-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const customerNameInput = /** @type {HTMLInputElement | null} */ (
  document.getElementById('customer-name')
);
const customerEmailInput = /** @type {HTMLInputElement | null} */ (
  document.getElementById('customer-email')
);

// Floating cart bubble elements
const cartFab = /** @type {HTMLButtonElement | null} */ (
  document.getElementById('cart-fab')
);
const cartFabCount = document.getElementById('cart-fab-count');
const cartFabTotal = document.getElementById('cart-fab-total');

/**
 * Update the floating cart bubble
 * @param {number} totalQty
 * @param {number} total
 */
function updateCartFab(totalQty, total) {
  if (!cartFab || !cartFabCount || !cartFabTotal) return;

  if (totalQty === 0) {
    cartFab.hidden = true;
    cartFab.setAttribute('aria-hidden', 'true');
  } else {
    cartFab.hidden = false;
    cartFab.setAttribute('aria-hidden', 'false');
    cartFabCount.textContent = String(totalQty);
    cartFabTotal.textContent = `$${total.toFixed(2)}`;
  }
}

/**
 * Re-render cart UI and floating bubble based on current cart state.
 */
function renderCart() {
  if (!orderItemsList || !orderTotalEl || !orderEmpty || !placeOrderBtn) return;

  orderItemsList.innerHTML = '';

  let total = 0;
  let totalQty = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    totalQty += item.quantity;

    const li = document.createElement('li');
    li.className = 'order-item-row';
    li.innerHTML = `
      <div class="order-item-main">
        <span class="order-item-name">${item.name}</span>
      </div>
      <div class="order-item-meta">
        <div class="order-item-qty-controls">
          <button class="qty-btn minus" type="button" aria-label="Decrease ${item.name}">
            −
          </button>
          <span class="order-item-qty">${item.quantity}</span>
          <button class="qty-btn plus" type="button" aria-label="Increase ${item.name}">
            +
          </button>
        </div>
        <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="order-remove" type="button" aria-label="Remove ${item.name}">
          ✕
        </button>
      </div>
    `;

    const minusBtn = li.querySelector('.qty-btn.minus');
    const plusBtn = li.querySelector('.qty-btn.plus');
    const removeBtn = li.querySelector('.order-remove');

    minusBtn?.addEventListener('click', () => changeCartQuantity(item.id, -1));
    plusBtn?.addEventListener('click', () => changeCartQuantity(item.id, 1));
    removeBtn?.addEventListener('click', () => removeFromCart(item.id));

    orderItemsList.appendChild(li);
  });

  orderTotalEl.textContent = total.toFixed(2);

  const hasItems = cart.length > 0;
  orderEmpty.style.display = hasItems ? 'none' : '';
  placeOrderBtn.disabled = !hasItems;

  updateCartFab(totalQty, total);
}

/**
 * @param {number} id
 * @param {string} name
 * @param {number} price
 * @param {number} [quantity]
 */
function addToCart(id, name, price, quantity = 1) {
  const qty = quantity > 0 ? quantity : 1;
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id, name, price, quantity: qty });
  }
  renderCart();
}

/**
 * @param {number} id
 */
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

/**
 * @param {number} id
 * @param {number} delta
 */
function changeCartQuantity(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  renderCart();
}

// Clicking the floating cart bubble scrolls to the order section
cartFab?.addEventListener('click', () => {
  const orderSection = document.getElementById('order');
  if (!orderSection) return;
  orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- Menu quantity controls ----------
const qtyWrappers = document.querySelectorAll('.menu-qty');
qtyWrappers.forEach((wrapper) => {
  const minusBtn = wrapper.querySelector('.qty-btn.minus');
  const plusBtn = wrapper.querySelector('.qty-btn.plus');
  const input = wrapper.querySelector('.menu-qty-input');

  if (!(input instanceof HTMLInputElement)) return;

  minusBtn?.addEventListener('click', () => {
    let value = Number(input.value || '1');
    if (Number.isNaN(value) || value <= 1) {
      value = 1;
    } else {
      value -= 1;
    }
    input.value = String(value);
  });

  plusBtn?.addEventListener('click', () => {
    let value = Number(input.value || '1');
    if (Number.isNaN(value) || value < 1) {
      value = 1;
    } else {
      value += 1;
    }
    input.value = String(value);
  });
});

// Wire up "Add to Order" buttons
const addBtns = document.querySelectorAll('.btn.add');
addBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = /** @type {HTMLElement} */ (btn);
    const id = Number(el.dataset.id || '0');
    const name = el.dataset.item || 'Item';
    const price = Number(el.dataset.price || '0');

    let qty = 1;
    const cardBody = el.closest('.card-body');
    const qtyInput = cardBody?.querySelector('.menu-qty-input');
    if (qtyInput instanceof HTMLInputElement) {
      const parsed = Number(qtyInput.value);
      qty = !Number.isNaN(parsed) && parsed > 0 ? parsed : 1;
    }

    addToCart(id, name, price, qty);
    showToast(`${name} added to order`);
  });
});

// ---------- Place Demo Order (POST to backend) ----------
placeOrderBtn?.addEventListener('click', async () => {
  if (cart.length === 0) return;

  const full_name = customerNameInput?.value.trim() || 'Demo Guest';
  const email = customerEmailInput?.value.trim() || 'guest@example.com';

  // Build payload expected by server.js
  const payload = {
    customer: { full_name, email },
    items: cart.map((item) => ({
      menu_item_id: item.id,
      quantity: item.quantity,
    })),
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    const orderId = data?.orderId;

    showToast(
      orderId ? `Order #${orderId} placed!` : 'Order placed! (Demo backend)'
    );

    // Reset cart
    cart = [];
    renderCart();
  } catch (err) {
    console.error('Error placing order:', err);
    showToast('Something went wrong placing your order.');
  }
});

// ---------- "AI" Flavor Coach (rule-based demo) ----------
const aiToggle = /** @type {HTMLButtonElement | null} */ (
  document.getElementById('ai-toggle')
);
const aiPanel = document.getElementById('ai-panel');
const aiClose = /** @type {HTMLButtonElement | null} */ (
  document.getElementById('ai-close')
);
const aiForm = document.getElementById('ai-form');
const aiInput = /** @type {HTMLInputElement | null} */ (
  document.getElementById('ai-input')
);
const aiMessages = document.getElementById('ai-messages');

/**
 * Append a new chat bubble.
 * @param {'user' | 'bot'} who
 * @param {string} text
 */
function addAiMessage(who, text) {
  if (!aiMessages) return;
  const div = document.createElement('div');
  div.className =
    'ai-message ' + (who === 'user' ? 'ai-message-user' : 'ai-message-bot');
  div.textContent = text;
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

/**
 * Very simple rule-based "AI" that picks a canned response.
 * In a real deployment, this is where we'd call a generative AI API.
 * @param {string} raw
 */
function getAiResponse(raw) {
  const text = raw.toLowerCase();

  if (text.includes('spicy') || text.includes('heat')) {
    return (
      "If you like spicy, try the Spicy Garlic Wrap or Loaded Tender Fries with extra House Heat. " +
      "On the milder side, the 3-Tender Combo is a safe starter."
    );
  }

  if (text.includes('group') || text.includes('friends') || text.includes('people')) {
    return (
      "For groups, the 10-Tender Feast plus a couple Loaded Tender Fries is the move. " +
      "That usually feeds 3–4 hungry people."
    );
  }

  if (text.includes('vegetarian') || text.includes('vegan')) {
    return (
      "Right now most mains are chicken-based, but you can build a vegetarian snack with fries, sauce flight, " +
      "and a drink. A future version of this app could surface veggie specials automatically."
    );
  }

  if (text.includes('hours') || text.includes('open') || text.includes('time')) {
    return "For the demo, we pretend we’re open daily 11am–11pm, matching the footer hours.";
  }

  if (text.includes('location') || text.includes('where') || text.includes('address')) {
    return "We’re demo-based in Fullerton and Anaheim in this project: check the Locations section for the exact addresses.";
  }

  if (text.includes('deal') || text.includes('discount') || text.includes('promo') || text.includes('code')) {
    return (
      "Best value combo right now is the 3-Tender Combo with the FRYDAY launch code for free fries. " +
      "In a real system the AI would query live promos."
    );
  }

  if (text.includes('recommend') || text.includes('what should i get') || text.includes('suggest')) {
    return (
      "If you’re not sure: 5-Tender Combo if you’re hungry, 3-Tender Combo if you’re light, " +
      "and Spicy Garlic Wrap if you want something with a kick."
    );
  }

  return (
    "Great question. For this class demo, I’m a simple rule-based assistant, not a full LLM yet. " +
    "But this chat UI is wired so we could swap my brain out for a real generative model on the backend later."
  );
}

// Open/close panel
aiToggle?.addEventListener('click', () => {
  if (!aiPanel) return;
  const isHidden = aiPanel.hasAttribute('hidden');
  if (isHidden) {
    aiPanel.removeAttribute('hidden');
    aiToggle.style.display = 'none';
    aiInput?.focus();
  } else {
    aiPanel.setAttribute('hidden', 'true');
    aiToggle.style.display = 'inline-flex';
  }
});

aiClose?.addEventListener('click', () => {
  if (!aiPanel || !aiToggle) return;
  aiPanel.setAttribute('hidden', 'true');
  aiToggle.style.display = 'inline-flex';
});

// Handle question submit
aiForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!aiInput) return;
  const value = aiInput.value.trim();
  if (!value) return;

  addAiMessage('user', value);
  aiInput.value = '';

  // Simulate AI "thinking" quickly
  const reply = getAiResponse(value);
  setTimeout(() => {
    addAiMessage('bot', reply);
  }, 350);
});


// ---------- Newsletter mock handler ----------
const form = document.getElementById('subscribe-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = /** @type {HTMLInputElement | null} */ (
    document.getElementById('email')
  );
  const email = emailInput?.value.trim();
  if (!email) return;
  showToast('Subscribed! Check your inbox.');
  form.reset();
});

// Initialize UI once on load
renderCart();
