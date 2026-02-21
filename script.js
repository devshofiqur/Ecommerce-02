// ══════════════════════════════════════════════
//  Dunrovin Group — script.js
// ══════════════════════════════════════════════

(function () {
  'use strict';

  // ── Nav sticky shadow ──────────────────
  const nav = document.getElementById('primaryNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  // ── Reading progress bar ───────────────
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });

  // ── Mobile menu toggle ─────────────────
  const menuBtn = document.getElementById('menuBtn');
  const drawer  = document.getElementById('mobileDrawer');
  menuBtn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  });
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });

  // ── Scroll fade-in ─────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => io.observe(el));

  // ── Pagination buttons ─────────────────
  document.querySelectorAll('.page-btn:not(.prev):not(.next)').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.page-btn').forEach(b => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');
    });
  });

  // ── Newsletter form ────────────────────
  const nForm = document.querySelector('.newsletter-form');
  if (nForm) {
    nForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nForm.querySelector('input[type=email]');
      const btn   = nForm.querySelector('.newsletter-btn');
      if (!input.value) return;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2d7d46';
      input.value = '';
      input.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Subscribe Free';
        btn.style.background = '';
        input.disabled = false;
      }, 3500);
    });
  }

})();
