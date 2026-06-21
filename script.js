/* =============================================
   FATHER'S DAY — script.js (Tabbed Navbar)
   ============================================= */

// ===== PARTICLES =====
(function () {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 18 + 12}s;
      animation-delay:-${Math.random() * 25}s;
    `;
    container.appendChild(p);
  }
})();

// ===== TAB SWITCHING =====
const tabs   = document.querySelectorAll('.nav-tab');
const pages  = document.querySelectorAll('.page');
const indicator = document.getElementById('tabIndicator');

function moveIndicator(btn) {
  const rect = btn.getBoundingClientRect();
  const navRect = document.getElementById('navbar').getBoundingClientRect();
  indicator.style.left    = (rect.left - navRect.left) + 'px';
  indicator.style.width   = rect.width + 'px';
  indicator.style.opacity = '1';
}

function switchTab(tabName) {
  // Deactivate all tabs & pages
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  pages.forEach(p => p.classList.remove('active'));

  // Activate chosen tab & page
  const targetTab  = document.querySelector(`[data-tab="${tabName}"]`);
  const targetPage = document.getElementById(`page-${tabName}`);

  if (targetTab && targetPage) {
    targetTab.classList.add('active');
    targetTab.setAttribute('aria-selected', 'true');
    targetPage.classList.add('active');
    moveIndicator(targetTab);

    // Re-trigger pop animations on cards in that page
    targetPage.querySelectorAll('.pop').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });
  }

  // Close mobile menu
  document.getElementById('navTabs').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Attach click listeners to tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

// Init indicator on load
window.addEventListener('load', () => {
  const activeTab = document.querySelector('.nav-tab.active');
  if (activeTab) moveIndicator(activeTab);
});
window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.nav-tab.active');
  if (activeTab) moveIndicator(activeTab);
});

// ===== HAMBURGER MENU =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navTabs').classList.toggle('open');
});

// ===== HERO PARALLAX =====
const heroBg = document.querySelector('.hero-bg');
function onScroll() {
  if (!heroBg) return;
  heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
}
window.addEventListener('scroll', onScroll, { passive: true });

// ===== CURSOR GLOW =====
const glow = document.createElement('div');
Object.assign(glow.style, {
  position: 'fixed', pointerEvents: 'none',
  width: '340px', height: '340px', borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(240,180,41,0.06), transparent 70%)',
  transform: 'translate(-50%,-50%)',
  transition: 'left 0.12s ease, top 0.12s ease',
  zIndex: '9999', mixBlendMode: 'screen'
});
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ===== CARD 3D TILT =====
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.trait-card, .memory-card, .glass-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
});
document.addEventListener('mouseleave', () => {
  document.querySelectorAll('.trait-card, .memory-card, .glass-card').forEach(c => c.style.transform = '');
});
document.querySelectorAll('.trait-card, .memory-card, .glass-card').forEach(card => {
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// ===== CONFETTI BURST =====
window.launchConfetti = function () {
  const ring = document.getElementById('confettiRing');
  if (!ring) return;
  const colors = ['#f0b429','#ffd966','#ff6b6b','#4ecdc4','#a29bfe','#fd79a8','#55efc4'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left  = Math.random() * 100;
    const dur   = Math.random() * 1.5 + 1;
    const delay = Math.random() * 0.8;
    const size  = Math.random() * 8 + 5;
    piece.style.cssText = `
      left:${left}%; top:0;
      width:${size}px; height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    ring.appendChild(piece);
    setTimeout(() => piece.remove(), (dur + delay + 0.2) * 1000);
  }
};

console.log('💛 Happy Father\'s Day Gaurav! Love, Om.');
