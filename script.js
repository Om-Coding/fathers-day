/* =============================================
   FATHER'S DAY WEBSITE — JavaScript
   ============================================= */

// ===== FLOATING PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 12;
    const delay = Math.random() * 20;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
})();

// ===== SCROLL-BASED ANIMATIONS =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
  el.dataset.delay = i * 80; // slight stagger
  observer.observe(el);
});

// ===== PARALLAX HERO =====
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}

// ===== SMOOTH CURSOR GLOW (subtle) =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  pointer-events: none;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240,180,41,0.055), transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
  z-index: 9999;
  mix-blend-mode: screen;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== MEMORY CARD TILT (subtle 3D) =====
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      translateY(-4px)
      rotateX(${-y * 4}deg)
      rotateY(${x * 4}deg)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== TITLE LETTER REVEAL =====
function wrapLetters(el) {
  if (!el) return;
  const text = el.innerText;
  el.innerHTML = text.split('').map((char, i) => {
    if (char === ' ') return ' ';
    return `<span style="display:inline-block; animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.025}s both">${char}</span>`;
  }).join('');
}

// ===== LAUNCH =====
window.addEventListener('DOMContentLoaded', () => {
  console.log('💛 Happy Father\'s Day, Gaurav! Love, Om.');
});
