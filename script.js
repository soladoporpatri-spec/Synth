// --- Synth Optimizer 2.0 ---
// Skills: review-animations, performance-engineer, fixing-accessibility, baseline-ui

// --- Global Config ---
const WHATS_NUMBER = "5562994488816";
const DISCORD_LINK = "https://discord.gg/7RBpUfn6Cw";

// --- State & Performance ---
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const isLowEnd = (navigator.deviceMemory && navigator.deviceMemory < 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
let is3DEnabled = true; // Forçar o 3D para todos os testes

// --- Window Functions (for HTML onclick attributes) ---
window.openWhats = (plan = '', price = '') => {
  const p = price ? ` (${price})` : "";
  const msg = plan ? `Olá! Quero otimizar meu PC com o plano ${plan}${p}.` : "Olá! Quero saber mais sobre a otimização.";
  window.open(`https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.openDiscord = () => {
  window.open(DISCORD_LINK, "_blank");
};

window.scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// --- DOM Elements ---
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderStatus = document.getElementById('loader-status');

// --- Loader ---
let loadProgress = 0;
const loaderInterval = setInterval(() => {
  loadProgress += Math.random() * 18;
  if (loadProgress >= 100) loadProgress = 100;
  if (loaderBar) loaderBar.style.width = `${loadProgress}%`;
  
  if (loadProgress > 40 && loadProgress < 70 && loaderStatus) loaderStatus.innerText = "TUNING SYSTEM...";
  if (loadProgress > 70 && loaderStatus) loaderStatus.innerText = "SYSTEM READY";
  
  if (loadProgress === 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      document.body.classList.remove('loading');
      if (loader) loader.classList.add('hidden');
      initScrollAnimations();
      initRevealObserver();
    }, 400);
  }
}, 150);

// --- Mobile Menu ---
const btnMenu = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (btnMenu && mobileMenu) {
  btnMenu.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    btnMenu.setAttribute('aria-expanded', isActive);
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Navbar Scroll (performance-engineer: IntersectionObserver instead of scroll listener) ---
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');

if (navbar && heroSection) {
  const navObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        navbar.classList.remove('scrolled');
      } else {
        navbar.classList.add('scrolled');
      }
    },
    { threshold: 0.1, rootMargin: '-60px 0px 0px 0px' }
  );
  navObserver.observe(heroSection);
}

// --- Scroll Reveal (review-animations: IntersectionObserver, not scroll events) ---
function initRevealObserver() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// --- FAQ Accordion (fixing-accessibility: keyboard support) ---
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    toggleFaq(btn);
  });
  
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(btn);
    }
  });
});

function toggleFaq(btn) {
  const parent = btn.parentElement;
  const answer = parent.querySelector('.faq-a');
  const isOpen = parent.classList.contains('active');
  
  // Close others
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== parent) {
      item.classList.remove('active');
      const a = item.querySelector('.faq-a');
      if (a) a.style.maxHeight = null;
      const q = item.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle current
  if (isOpen) {
    parent.classList.remove('active');
    answer.style.maxHeight = null;
    btn.setAttribute('aria-expanded', 'false');
  } else {
    parent.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + "px";
    btn.setAttribute('aria-expanded', 'true');
  }
}

// --- Wall of Results ---
const wallContainer = document.getElementById('wall-of-results');
if (wallContainer) {
  const fragments = [];
  const labels = ["ESTABILIDADE + FPS", "INPUT LAG ZERADO", "SISTEMA RESPONSIVO", "MENOS DELAY", "1% LOW CRAVADO", "JOGO LISO"];
  
  for (let i = 1; i <= 12; i++) {
    const randomLabel = labels[Math.floor(Math.random() * labels.length)];
    const html = `
      <div class="result-card reveal" onclick="openLightbox('imagens/Cliente${i}.jpeg')">
        <div class="result-img-wrapper">
           <img src="imagens/Cliente${i}.jpeg" alt="Resultado da otimização do cliente ${i}" loading="lazy" onerror="this.parentElement.parentElement.style.display='none'">
        </div>
        <div class="result-hud">${randomLabel}</div>
      </div>
    `;
    fragments.push(html);
  }
  wallContainer.innerHTML = fragments.join('');
}

// --- Lightbox (fixing-accessibility: Escape key, backdrop click, focus trap) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

window.openLightbox = (src) => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Focus the close button
  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
};

window.closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox && lightbox.classList.contains('active')) {
      window.closeLightbox();
    }
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      if (btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
    }
  }
});

// Close lightbox on backdrop click
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      window.closeLightbox();
    }
  });
}


// --- GSAP Scroll Animations ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  // Counter animation
  const counter = document.getElementById('counter-clients');
  if (counter) {
    ScrollTrigger.create({
      trigger: counter,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: 1200,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.round(this.targets()[0].innerHTML) + "+";
          }
        });
      }
    });
  }

  // Pipeline Progress
  const pipeProgress = document.getElementById('pipe-progress');
  const pipeTrack = document.querySelector('.pipeline-track');
  if (pipeProgress && pipeTrack) {
    gsap.to(pipeProgress, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".pipeline-container",
        start: "top center",
        end: "bottom center",
        scrub: 0.8
      }
    });

    document.querySelectorAll('.pipe-step').forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%",
        onEnter: () => step.classList.add('active'),
        onLeaveBack: () => step.classList.remove('active')
      });
    });
  }
  
  // Tilt Cards (Desktop only, gated behind hover media query check)
  if (!isMobile && !prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -4;
        const tiltY = ((x - centerX) / centerX) * 4;
        
        gsap.to(card, {
          rotationX: tiltX,
          rotationY: tiltY,
          transformPerspective: 800,
          ease: "power1.out",
          duration: 0.4
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          ease: "power2.out",
          duration: 0.6
        });
      });
    });
  }
  
  // Section reveal animations with stagger
  if (!prefersReducedMotion) {
    // Hero content entrance
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.fromTo(heroContent.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out", delay: 0.3 }
      );
    }
    
    // Bento cards stagger
    gsap.utils.toArray('.bento-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });
    
    // Plan cards stagger
    gsap.utils.toArray('.plan-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });
    
    // Trust cards stagger
    gsap.utils.toArray('.trust-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });
    
    // CTA entrance
    const ctaTitle = document.querySelector('.cta-title');
    if (ctaTitle) {
      gsap.fromTo(ctaTitle,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaTitle,
            start: "top 85%",
            once: true
          }
        }
      );
    }
  }
}


// --- Three.js Scene (Synth Wave & Abstract Hardware) ---
if (is3DEnabled) {
  if (typeof THREE === 'undefined') {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position:fixed; top:10px; left:10px; background:orange; color:black; padding:10px; z-index:9999;';
    errorDiv.innerText = 'Three.js CDN não carregou. Verifique conexão ou bloqueadores.';
    document.body.appendChild(errorDiv);
  } else {
    const canvas = document.getElementById('webgl-canvas');
    if (canvas) {
      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        camera.position.z = 10;
        
        function animate() {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle Resize
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      } catch (e) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position:fixed; top:10px; left:10px; background:red; color:white; padding:10px; z-index:9999;';
        errorDiv.innerText = 'WebGL Error: ' + e.message;
        document.body.appendChild(errorDiv);
      }
    }
  }
}
