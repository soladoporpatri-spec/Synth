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
    console.error("Three.js not loaded. Check internet or CDN blockers.");
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position:fixed; top:10px; left:10px; background:orange; color:black; padding:10px; z-index:9999;';
    errorDiv.innerText = 'Three.js CDN não carregou. Verifique conexão ou bloqueadores.';
    document.body.appendChild(errorDiv);
  } else {
    const canvas = document.getElementById('webgl-canvas');
  
  if (canvas) {
    let renderer, scene, camera;
    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05040a, 0.04);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 15);

      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: !isMobile,
        powerPreference: "high-performance" 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch (e) {
      console.error("Three.js Init Error:", e);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'position:fixed; top:10px; left:10px; background:red; color:white; padding:10px; z-index:9999;';
      errorDiv.innerText = 'WebGL Error: ' + e.message;
      document.body.appendChild(errorDiv);
      // Fallback
    }

    if (renderer) {

    // --- Synth Wave (Particle Line) ---
    const waveParams = {
      count: isMobile ? 120 : 200, // Fewer particles on mobile
      amplitude: 2.0,
      frequency: 0.5,
      speed: 0.02
    };
    
    const waveGeometry = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveParams.count * 3);
    for (let i = 0; i < waveParams.count; i++) {
      wavePositions[i*3] = (i / waveParams.count) * 40 - 20;
      wavePositions[i*3+1] = 0;
      wavePositions[i*3+2] = (Math.random() - 0.5) * 5;
    }
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    
    const waveMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        amplitude: { value: waveParams.amplitude },
        frequency: { value: waveParams.frequency },
        colorMain: { value: new THREE.Color(0x8b5cf6) },
        colorSec: { value: new THREE.Color(0x06b6d4) }
      },
      vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        varying vec3 vPos;
        
        void main() {
          vec3 pos = position;
          float n = sin(pos.x * frequency + time) * cos(pos.z * frequency + time * 0.5);
          pos.y += n * amplitude;
          vPos = pos;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (15.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 colorMain;
        uniform vec3 colorSec;
        varying vec3 vPos;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = (0.5 - dist) * 2.0;
          vec3 col = mix(colorSec, colorMain, (vPos.y + 2.0) / 4.0);
          gl_FragColor = vec4(col, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // --- 3D Hardware (CPU, RAM, GPU) ---
    const hwGroup = new THREE.Group();
    const edgeMatCyan = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
    const edgeMatPurple = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 });
    const solidMat = new THREE.MeshBasicMaterial({ color: 0x0a0a10 });

    // 1. Procedural CPU
    const cpuGroup = new THREE.Group();
    const cpuBase = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 2), solidMat);
    cpuBase.add(new THREE.LineSegments(new THREE.EdgesGeometry(cpuBase.geometry), edgeMatPurple));
    const cpuIhs = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.2, 1.4), solidMat);
    cpuIhs.position.y = 0.15;
    cpuIhs.add(new THREE.LineSegments(new THREE.EdgesGeometry(cpuIhs.geometry), edgeMatCyan));
    cpuGroup.add(cpuBase, cpuIhs);
    cpuGroup.position.set(4, -1, -3);
    cpuGroup.rotation.set(0.4, -0.5, 0);
    cpuGroup.userData = { floatOffset: 0, speed: 0.005 };

    // 2. Procedural RAM
    const ramGroup = new THREE.Group();
    const ramPcb = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.2, 0.1), solidMat);
    ramPcb.add(new THREE.LineSegments(new THREE.EdgesGeometry(ramPcb.geometry), edgeMatCyan));
    for(let i = 0; i < 4; i++) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.15), solidMat);
      chip.position.set(-1.1 + i * 0.73, 0, 0.05);
      chip.add(new THREE.LineSegments(new THREE.EdgesGeometry(chip.geometry), edgeMatPurple));
      ramPcb.add(chip);
    }
    ramGroup.add(ramPcb);
    ramGroup.position.set(-5, 2, -5);
    ramGroup.rotation.set(-0.2, 0.5, 0.2);
    ramGroup.userData = { floatOffset: 2, speed: -0.004 };

    // 3. Procedural GPU (More Realistic 3-Fan Design)
    const gpuGroup = new THREE.Group();
    // Main Body
    const gpuBody = new THREE.Mesh(new THREE.BoxGeometry(6.0, 1.6, 1.8), solidMat);
    gpuBody.add(new THREE.LineSegments(new THREE.EdgesGeometry(gpuBody.geometry), edgeMatPurple));
    
    // Backplate details
    const backplate = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.4, 0.2), solidMat);
    backplate.position.set(0, 0, -1.0);
    backplate.add(new THREE.LineSegments(new THREE.EdgesGeometry(backplate.geometry), edgeMatCyan));
    gpuGroup.add(backplate);

    // Fans
    const fanGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.1, 16);
    for(let i = -1; i <= 1; i++) {
      const fan = new THREE.Mesh(fanGeo, solidMat);
      fan.name = 'fan';
      fan.rotation.x = Math.PI / 2;
      fan.position.set(i * 1.8, 0, 0.95);
      fan.add(new THREE.LineSegments(new THREE.EdgesGeometry(fanGeo), edgeMatCyan));
      gpuGroup.add(fan);
    }
    
    // PCI-E Connector
    const pcie = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.2, 0.4), solidMat);
    pcie.position.set(-1.0, -0.9, 0);
    pcie.add(new THREE.LineSegments(new THREE.EdgesGeometry(pcie.geometry), edgeMatCyan));
    gpuGroup.add(pcie);

    gpuGroup.add(gpuBody);
    gpuGroup.position.set(0, 3, -6); // Start middle-top
    gpuGroup.rotation.set(0.3, -0.6, -0.1);
    gpuGroup.userData = { floatOffset: 4, speed: 0.005 }; // Reduced from 0.015

    hwGroup.add(cpuGroup, ramGroup, gpuGroup);
    scene.add(hwGroup);

    // --- Mouse Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    if (!isMobile) {
      document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.001;
        mouseY = (event.clientY - windowHalfY) * 0.001;
      }, { passive: true });
    }

    // --- Render Loop ---
    const clock = new THREE.Clock();
    let isPageVisible = true;
    
    // Pause rendering when tab is hidden (performance-engineer)
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        clock.getDelta(); // Reset delta to avoid jump
        animate();
      }
    });

    function animate() {
      if (!isPageVisible) return;
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax (smooth interpolation)
      if (!isMobile) {
        const targetX = mouseX * 1.5;
        const targetY = mouseY * 1.5;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (-targetY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
      }

      // Wave
      waveMaterial.uniforms.time.value = elapsedTime * waveParams.speed * 50;
      waveMaterial.uniforms.amplitude.value = waveParams.amplitude;

      // Hardware Floating & Spinning
      hwGroup.children.forEach(child => {
        child.rotation.y += child.userData.speed;
        child.position.y += Math.sin(elapsedTime * 2 + child.userData.floatOffset) * 0.003; // Reduced float amplitude
        
        // If this is the GPU, spin its fans
        if (child === gpuGroup) {
          child.children.forEach(c => {
            if (c.name === 'fan') {
              c.rotation.y += 0.04; // Reduced fan speed
            }
          });
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // --- ScrollTrigger for 3D Storytelling ---
    if (typeof ScrollTrigger !== 'undefined') {
      
      // Continuous Parallax Tracking for all hardware across the entire page
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Super smooth scrubbing
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1 across the whole page

          // Synth Wave flattens out slightly as you scroll down
          waveParams.amplitude = 2.0 - (p * 0.8);
          
          // CPU floats slowly from top-right down to bottom-left
          cpuGroup.position.x = 4 - (p * 4);
          cpuGroup.position.y = 1 + (p * 1.5); 
          cpuGroup.position.z = -3 + (p * 0.5);
          cpuGroup.rotation.z = p * 1.0; 
          
          // RAM floats from top-left, crosses screen, to bottom-right
          ramGroup.position.x = -4 + (p * 4);
          ramGroup.position.y = -1 - (p * 1);
          ramGroup.position.z = -4 + (p * 1);
          ramGroup.rotation.x = -0.2 + (p * 0.8);
          
          // GPU is right in the middle, drops down
          gpuGroup.position.x = 0 - (p * 3);
          gpuGroup.position.y = 3 - (p * 4); 
          gpuGroup.position.z = -6 + (p * 1.5);
          gpuGroup.rotation.z = -p * 0.8;
        }
      });

      // Elite Plan Color Shift (Keep this localized)
      ScrollTrigger.create({
        trigger: ".card-elite",
        start: "top center",
        onEnter: () => {
          gsap.to(waveParams, { speed: 0.05, duration: 1.2, ease: "power2.out" });
          gsap.to(waveMaterial.uniforms.colorMain.value, { r: 0.02, g: 0.71, b: 0.83, duration: 1.2 });
        },
        onLeaveBack: () => {
          gsap.to(waveParams, { speed: 0.02, duration: 1.2, ease: "power2.out" });
          gsap.to(waveMaterial.uniforms.colorMain.value, { r: 0.54, g: 0.36, b: 0.96, duration: 1.2 });
        }
      });
    }

    // Handle Resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    }, { passive: true });
    }
  }
}
}
