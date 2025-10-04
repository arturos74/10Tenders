// 10Tenders – basic interactivity (no frameworks)


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


// Fake add-to-order + toast
const toast = document.getElementById('toast');
function showToast(message = 'Added to order') {
if (!toast) return;
toast.textContent = message;
toast.hidden = false;
clearTimeout(showToast._t);
showToast._t = setTimeout(() => (toast.hidden = true), 1800);
}


const addBtns = document.querySelectorAll('.add');
addBtns.forEach(btn => btn.addEventListener('click', () => {
const item = btn.getAttribute('data-item') || 'Item';
showToast(`${item} added to order`);
}));


// Newsletter mock handler
const form = document.getElementById('subscribe-form');
form?.addEventListener('submit', (e) => {
e.preventDefault();
const email = /** @type {HTMLInputElement} */(document.getElementById('email')).value.trim();
if (!email) return;
showToast('Subscribed! Check your inbox.');
form.reset();
});