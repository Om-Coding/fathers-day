/* ==========================================================================
   FATHER'S DAY TRIBUTE — script.js
   Tab navigation, mobile hamburger, floating particles, interactive 3D cards,
   and confetti burst animations.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. BACKGROUND PARTICLES
  const createParticles = () => {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const count = 25;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      
      const size = Math.random() * 5 + 3; // Particle size 3px to 8px
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 10; // 10s to 20s
      const delay = Math.random() * -20; // negative delay to start immediately
      
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      container.appendChild(p);
    }
  };
  createParticles();

  // 2. TAB NAVIGATION SYSTEM
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');

  const switchPage = (pageId) => {
    // 1. Update nav links
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 2. Update page visibility with transition
    pages.forEach(page => {
      if (page.id === `page-${pageId}`) {
        page.classList.add('active');
        
        // Restart slide animations on current page elements
        page.querySelectorAll('.slide').forEach(element => {
          element.style.animation = 'none';
          element.offsetHeight; // trigger reflow
          element.style.animation = '';
        });
      } else {
        page.classList.remove('active');
      }
    });

    // 3. Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 4. Close mobile menu if open
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  };

  // Attach nav menu click events
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      switchPage(pageId);
    });
  });

  // Global goTo function for inline button clicks (e.g. CTA buttons)
  window.goTo = (pageId) => {
    switchPage(pageId);
  };

  // 3. MOBILE HAMBURGER MENU
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // 4. INTERACTIVE 3D CARD TILT EFFECT (Desktop Only)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    const cards = document.querySelectorAll('.icard, .mcard, .letter-card, .cheers-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within element
        const y = e.clientY - rect.top;  // y position within element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg tilt
        const rotateY = ((x - centerX) / centerX) * 6;  // Max 6deg tilt
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.1s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  // 5. CONFETTI BURST CELEBRATION
  window.burst = () => {
    const box = document.getElementById('confettiBox');
    if (!box) return;
    
    const colors = [
      '#dfb15b', // Gold
      '#ffe0a3', // Light Gold
      '#ff7675', // Soft Red
      '#74b9ff', // Soft Blue
      '#55efc4', // Mint
      '#a29bfe', // Purple
      '#fd79a8'  // Pink
    ];
    
    const count = 75;
    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.classList.add('conf');
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 6; // 6px to 14px
      const left = Math.random() * 100;
      const duration = Math.random() * 1.5 + 1.2; // 1.2s to 2.7s
      const delay = Math.random() * 0.5;
      
      // Random shape: square, circle, or triangle
      const shapeType = Math.random();
      let borderRadius = '2px';
      if (shapeType > 0.6) {
        borderRadius = '50%'; // Circle
      }
      
      c.style.cssText = `
        left: ${left}%;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${borderRadius};
        animation: confettiRain ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        animation-delay: ${delay}s;
      `;
      
      box.appendChild(c);
      
      // Clean up DOM after animation completes
      setTimeout(() => {
        c.remove();
      }, (duration + delay) * 1000);
    }
  };

  // Console message greeting
  console.log('%c💛 Happy Father\'s Day Gaurav Sharma! Tribute built by Om.', 'color: #dfb15b; font-size: 14px; font-weight: bold;');
});
