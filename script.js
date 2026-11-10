/* ==========================================================================
   MATHEUS HENRIQUE — PORTFOLIO 2026 | SCRIPT.JS
   Stack: Lenis (smooth scroll) + GSAP + ScrollTrigger + SplitType

   Organização:
   1. Utilitários
   2. Lenis Smooth Scroll
   3. GSAP & ScrollTrigger Setup
   4. Hero Animations
   5. Section Reveals
   6. Education Progress Bars
   7. Custom Cursor
   8. Mobile Menu
   9. Scroll Progress Bar
   10. Constellation Lines (Skills)
   11. Cleanup & Resize
   ========================================================================== */

// --- 1. UTILITÁRIOS -------------------------------------------------------

/** Verifica se usuário prefere reduced motion */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Debounce simples para resize handlers */
function debounce(fn, delay = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// --- 2. LENIS SMOOTH SCROLL -----------------------------------------------

let lenis;

function initLenis() {
  // Respeita prefers-reduced-motion: não inicia smooth scroll
  if (prefersReducedMotion()) return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Integração com GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// --- 3. GSAP & SCROLLTRIGGER SETUP ----------------------------------------

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Configuração global: respeitar reduced motion
  if (prefersReducedMotion()) {
    ScrollTrigger.defaults({ enabled: false });
    return;
  }

  // Refresh após fonts carregarem para evitar layout shift
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}

// --- 4. HERO ANIMATIONS ---------------------------------------------------

function animateHero() {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Eyebrow fade-in
  tl.from('.hero-eyebrow', {
    opacity: 0,
    y: 20,
    duration: 0.8,
  });

  // H1 split-text reveal (caractere por caractere)
  const heroName = document.querySelector('#sobre h1');
  if (heroName && typeof SplitType !== 'undefined') {
    const split = new SplitType(heroName, { types: 'chars' });
    tl.from(split.chars, {
      opacity: 0,
      y: '100%',
      rotateX: -40,
      stagger: 0.03,
      duration: 1,
      ease: 'back.out(1.4)',
    }, '-=0.4');
  }

  // Description fade
  tl.from('.hero-description', {
    opacity: 0,
    y: 30,
    duration: 0.8,
  }, '-=0.5');

  // CTA buttons stagger
  tl.from('.hero-actions > *', {
    opacity: 0,
    y: 20,
    stagger: 0.15,
    duration: 0.6,
  }, '-=0.4');

  // Portrait card reveal com mask animation
  tl.from('.hero-portrait-card', {
    opacity: 0,
    scale: 0.95,
    clipPath: 'inset(10% 10% 10% 10%)',
    duration: 1.2,
    ease: 'power3.inOut',
  }, '-=0.8');
}

// --- 5. SECTION REVEALS ---------------------------------------------------

function animateSections() {
  if (prefersReducedMotion()) return;

  // Kicker + H2 de cada seção
  const sectionHeaders = document.querySelectorAll(
    '#projetos .section-kicker, #projetos h2, #projetos .section-intro, ' +
    '#formacao .section-kicker, #formacao h2, ' +
    '#habilidades .skills-eyebrow, #habilidades h2, #habilidades .skills-intro, ' +
    '#servicos .section-kicker, #servicos h2, #servicos .section-intro, ' +
    '#contato .section-kicker, #contato h2, #contato p'
  );

  sectionHeaders.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Project cards stagger entrance
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 60,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Education cards stagger
  gsap.from('.education-card', {
    scrollTrigger: {
      trigger: '.education-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out',
  });

  // Service cards stagger
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
  });

  // Contact box reveal
  gsap.from('.contact-box', {
    scrollTrigger: {
      trigger: '.contact-box',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 50,
    scale: 0.97,
    duration: 0.9,
    ease: 'power3.out',
  });

  // Skills constellation nodes
  gsap.from('.constellation-node', {
    scrollTrigger: {
      trigger: '.skills-constellation',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    scale: 0,
    stagger: {
      each: 0.05,
      from: 'center',
    },
    duration: 0.5,
    ease: 'back.out(1.7)',
  });
}

// --- 6. EDUCATION PROGRESS BARS -------------------------------------------

function animateProgressBars() {
  if (prefersReducedMotion()) {
    // Se reduced motion, mostra barras diretamente no width inline
    document.querySelectorAll('.progress').forEach((bar) => {
      bar.style.transition = 'none';
    });
    return;
  }

  document.querySelectorAll('.progress').forEach((bar) => {
    const targetWidth = bar.style.width || '0%';
    bar.style.width = '0%';

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => {
        bar.style.width = targetWidth;
      },
      once: true,
    });
  });
}

// --- 7. CUSTOM CURSOR -----------------------------------------------------

function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  if (!cursor || !dot || !ring) return;

  // Não ativa em dispositivos touch
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Ring segue com delay suave via requestAnimationFrame
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state em elementos interativos
  const interactiveElements = document.querySelectorAll(
    'a, button, .project-card, .service-card-link, .constellation-node'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}

// --- 8. MOBILE MENU -------------------------------------------------------

function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileNav) return;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    mobileNav.classList.toggle('is-active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    // Troca ícone
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }

    // Previne scroll quando menu está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Fecha ao clicar em um link
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu();
    });
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) toggleMenu();
  });

  // Animação stagger dos links mobile ao abrir
  if (!prefersReducedMotion()) {
    const observer = new MutationObserver(() => {
      if (mobileNav.classList.contains('is-active')) {
        gsap.from(mobileLinks, {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
        });
      }
    });
    observer.observe(mobileNav, { attributes: true, attributeFilter: ['class'] });
  }
}

// --- 9. SCROLL PROGRESS BAR -----------------------------------------------

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  if (prefersReducedMotion()) {
    progressBar.style.display = 'none';
    return;
  }

  gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

// --- 10. CONSTELLATION LINES (SKILLS) -------------------------------------

function drawConstellationLines() {
  const svg = document.querySelector('.constellation-lines');
  const edgeLayer = svg?.querySelector('.constellation-edge-layer');
  const nodes = document.querySelectorAll('.constellation-node');

  if (!svg || !edgeLayer || nodes.length < 2) return;

  // Limpa linhas anteriores
  edgeLayer.innerHTML = '';

  const container = document.querySelector('.skills-constellation');
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const positions = [];

  nodes.forEach((node) => {
    const x = parseFloat(node.style.getPropertyValue('--x'));
    const y = parseFloat(node.style.getPropertyValue('--y'));
    positions.push({
      x: (x / 100) * rect.width,
      y: (y / 100) * rect.height,
    });
  });

  // Conecta nós próximos (distância < threshold)
  const threshold = rect.width * 0.18;

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < threshold) {
        const opacity = 1 - dist / threshold;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', positions[i].x);
        line.setAttribute('y1', positions[i].y);
        line.setAttribute('x2', positions[j].x);
        line.setAttribute('y2', positions[j].y);
        line.setAttribute('stroke', '#00ff88');
        line.setAttribute('stroke-width', '0.5');
        line.setAttribute('opacity', (opacity * 0.2).toFixed(3));
        edgeLayer.appendChild(line);
      }
    }
  }
}

// --- 11. CITY RAIN CANVAS (BACKGROUND) ------------------------------------

function initCityRain() {
  const canvas = document.querySelector('.city-rain');
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  const drops = [];
  const dropCount = 80;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createDrops() {
    drops.length = 0;
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 2 + Math.random() * 4,
        length: 10 + Math.random() * 20,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 0.5;

    drops.forEach((drop) => {
      ctx.globalAlpha = drop.opacity;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.speed;
      if (drop.y > height) {
        drop.y = -drop.length;
        drop.x = Math.random() * width;
      }
    });

    requestAnimationFrame(animate);
  }

  resize();
  createDrops();
  animate();

  window.addEventListener('resize', debounce(() => {
    resize();
    createDrops();
  }, 200));
}

// --- 12. INITIALIZATION ---------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initGSAP();
  animateHero();
  animateSections();
  animateProgressBars();
  initCustomCursor();
  initMobileMenu();
  initScrollProgress();
  initCityRain();

  // Constellation lines desenhadas após layout estabilizar
  requestAnimationFrame(() => {
    drawConstellationLines();
  });

  // Redesenha constellation no resize
  window.addEventListener('resize', debounce(drawConstellationLines, 250));
});

// --- 13. CLEANUP (para SPAs futuras ou hot reload) ------------------------

window.addEventListener('beforeunload', () => {
  if (lenis) lenis.destroy();
  ScrollTrigger.getAll().forEach((st) => st.kill());
});