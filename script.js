const WHATS = "556286315534";
const DISCORD = "https://discord.gg/6PHtcCVzQ8";
const loader = document.getElementById("siteLoader");
const loaderBar = document.getElementById("loaderBar");
const loaderText = document.getElementById("loaderText");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobileView = window.matchMedia("(max-width: 640px)").matches;
let loaderProgress = 12;

function setLoaderProgress(value, text) {
  loaderProgress = Math.max(loaderProgress, Math.min(value, 100));
  if (loaderBar) loaderBar.style.width = `${loaderProgress}%`;
  if (loaderText && text) loaderText.innerHTML = text;
}

function finishLoader() {
  setLoaderProgress(100, "Tudo pronto.");
  window.setTimeout(() => {
    loader?.classList.add("done");
    document.body.classList.remove("loading");
  }, 280);
}

setLoaderProgress(30, "Carregando interface...");

function openWhats(p, pr) {
  setLoaderProgress(96, "Abrindo WhatsApp...");
  const price = pr ? ` (${pr})` : "";
  const m = p ? `Olá! Quero contratar a otimização ${p}${price}.` : "Olá! Quero saber mais sobre as otimizações.";
  window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(m)}`, "_blank", "noopener");
}

function openDiscord() {
  setLoaderProgress(96, "Abrindo Discord...");
  window.open(DISCORD, "_blank", "noopener");
}

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let W;
let H;
let particles = [];
let particleFrame;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  W = canvas.offsetWidth;
  H = document.body.scrollHeight || 1200;
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function mkParticle() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    a: Math.random() * 0.5 + 0.1
  };
}

function initParticles() {
  if (prefersReducedMotion || isMobileView) return;
  resize();
  particles = Array.from({ length: 42 }, mkParticle);
}

function drawParticles() {
  if (prefersReducedMotion || isMobileView) return;
  if (document.hidden) {
    particleFrame = requestAnimationFrame(drawParticles);
    return;
  }
  ctx.clearRect(0, 0, W, H);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167,139,250,${p.a})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });

  particles.forEach((p, i) => {
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(167,139,250,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  particleFrame = requestAnimationFrame(drawParticles);
}

if (!prefersReducedMotion && !isMobileView) {
  initParticles();
  drawParticles();
}
window.addEventListener("resize", () => {
  window.clearTimeout(window.particleResizeTimer);
  window.particleResizeTimer = window.setTimeout(initParticles, 120);
});

function animCount(id, end, suf, dur) {
  let n = 0;
  const el = document.getElementById(id);
  const step = Math.max(1, Math.ceil(end / 55));
  const t = setInterval(() => {
    n = Math.min(n + step, end);
    el.textContent = n + suf;
    if (n >= end) clearInterval(t);
  }, Math.round(dur / 55));
}

setTimeout(() => {
  animCount("s1", 1200, "+", 1100);
  animCount("s2", 40, "%", 900);
  animCount("s3", 98, "%", 800);
}, 500);

const GALLERY = [
  { src: "imagens/Cliente1.jpeg", label: "Miguel.", sub: "Fortnite · +600 FPS" },
  { src: "imagens/Cliente2.jpeg", label: "1000x.", sub: "Sem stuttering · +120 FPS" },
  { src: "imagens/Cliente3.jpeg", label: "Victor.", sub: "Fortnite · 0 travamentos" },
  { src: "imagens/Cliente4.jpeg", label: "Mat.", sub: "Sem stuttering · máximo desempenho" },
  { src: "imagens/Cliente5.jpeg", label: "Doiselle.", sub: "" },
  { src: "imagens/Cliente6.jpeg", label: "Deliquente dc", sub: "+250 FPS" },
  { src: "imagens/Cliente7.jpeg", label: "Cliente 7", sub: "Espaco reservado" },
  { src: "imagens/Cliente8.jpeg", label: "Cliente 8", sub: "Espaco reservado" },
  { src: "imagens/Cliente9.jpeg", label: "Cliente 9", sub: "Espaco reservado" },
  { src: "imagens/Cliente10.jpeg", label: "Cliente 10", sub: "Espaco reservado" },
  { src: "imagens/Cliente11.jpeg", label: "Cliente 11", sub: "Espaco reservado" },
  { src: "imagens/Cliente12.jpeg", label: "Cliente 12", sub: "Espaco reservado" },
  { src: "imagens/Cliente13.jpeg", label: "Cliente 13", sub: "Espaco reservado" },
  { src: "imagens/Cliente14.jpeg", label: "Cliente 14", sub: "Espaco reservado" },
  { src: "imagens/Cliente15.jpeg", label: "Cliente 15", sub: "Espaco reservado" },
  { src: "imagens/Cliente16.jpeg", label: "Cliente 16", sub: "Espaco reservado" },
  { src: "imagens/Cliente17.jpeg", label: "Cliente 17", sub: "Espaco reservado" },
  { src: "imagens/Cliente18.jpeg", label: "Cliente 18", sub: "Espaco reservado" }
];

let gPage = 0;
const track = document.getElementById("gtrack");
const dotsEl = document.getElementById("gdots");
const prev = document.getElementById("gprev");
const next = document.getElementById("gnext");
const galleryState = GALLERY.map(() => ({ loaded: false }));
let galleryLoadEvents = 0;
const modal = document.createElement("div");
modal.className = "gmodal";
modal.innerHTML = `
  <button class="gmodal-close" type="button" aria-label="Fechar">x</button>
  <button class="gmodal-arrow gmodal-prev" type="button" aria-label="Resultado anterior">&#8592;</button>
  <figure class="gmodal-card">
    <img class="gmodal-img" alt="">
    <figcaption>
      <strong class="gmodal-title"></strong>
      <span class="gmodal-sub"></span>
    </figcaption>
  </figure>
  <button class="gmodal-arrow gmodal-next" type="button" aria-label="Proximo resultado">&#8594;</button>
`;
document.body.appendChild(modal);

let activeGalleryIndex = 0;
const modalImg = modal.querySelector(".gmodal-img");
const modalTitle = modal.querySelector(".gmodal-title");
const modalSub = modal.querySelector(".gmodal-sub");
const modalPrev = modal.querySelector(".gmodal-prev");
const modalNext = modal.querySelector(".gmodal-next");

function perPage() {
  return window.matchMedia("(max-width:640px)").matches ? 2 : 3;
}

function maxGalleryPage() {
  return Math.max(0, Math.ceil(GALLERY.length / perPage()) - 1);
}

function placeholderHtml(item) {
  return `<div class="gph"><div class="gph-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></div><div class="gph-txt"><strong>${item.label}</strong><br>${item.sub}</div></div>`;
}

function markGalleryAsset() {
  galleryLoadEvents += 1;
  const progress = 42 + Math.round((galleryLoadEvents / GALLERY.length) * 34);
  setLoaderProgress(progress, "Preparando resultados...");
}

GALLERY.forEach((item, index) => {
  const el = document.createElement("div");
  el.className = "gitem";
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.innerHTML = `<img src="${item.src}" alt="${item.label}" loading="lazy"><div class="goverlay"><div class="gname">${item.label}</div><div class="gsub">${item.sub}</div></div>`;
  const img = el.querySelector("img");
  img.onload = () => {
    galleryState[index].loaded = true;
    el.classList.add("loaded");
    markGalleryAsset();
  };
  img.onerror = () => {
    galleryState[index].loaded = false;
    el.classList.add("missing");
    el.removeAttribute("role");
    el.removeAttribute("tabindex");
    el.innerHTML = placeholderHtml(item);
    markGalleryAsset();
  };
  el.onclick = () => openGalleryModal(index);
  el.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openGalleryModal(index);
    }
  };
  track.appendChild(el);
});

function renderDots() {
  dotsEl.innerHTML = "";
  for (let i = 0; i <= maxGalleryPage(); i++) {
    const d = document.createElement("button");
    d.className = "gdot" + (i === gPage ? " on" : "");
    d.type = "button";
    d.setAttribute("aria-label", `Ir para a pagina ${i + 1}`);
    d.onclick = () => goPage(i);
    dotsEl.appendChild(d);
  }
}

function goPage(p) {
  const per = perPage();
  gPage = Math.max(0, Math.min(p, maxGalleryPage()));
  const iw = track.children[0] ? track.children[0].offsetWidth + 12 : 0;
  track.style.transform = `translateX(-${gPage * per * iw}px)`;
  document.querySelectorAll(".gdot").forEach((d, i) => d.classList.toggle("on", i === gPage));
  prev.disabled = gPage === 0;
  next.disabled = gPage === maxGalleryPage();
}

prev.onclick = () => goPage(gPage - 1);
next.onclick = () => goPage(gPage + 1);
prev.disabled = true;
renderDots();
goPage(0);
window.addEventListener("resize", () => {
  renderDots();
  goPage(gPage);
});

function loadedIndexes() {
  return galleryState
    .map((item, index) => item.loaded ? index : -1)
    .filter((index) => index >= 0);
}

function openGalleryModal(index) {
  if (!galleryState[index].loaded) return;
  activeGalleryIndex = index;
  updateGalleryModal();
  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeGalleryModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
  document.querySelectorAll(".gitem").forEach((item) => item.classList.remove("selected"));
}

function moveGalleryModal(dir) {
  const available = loadedIndexes();
  const current = available.indexOf(activeGalleryIndex);
  if (current < 0 || available.length < 2) return;
  activeGalleryIndex = available[(current + dir + available.length) % available.length];
  updateGalleryModal();
}

function updateGalleryModal() {
  const item = GALLERY[activeGalleryIndex];
  modalImg.src = item.src;
  modalImg.alt = item.label;
  modalTitle.textContent = item.label;
  modalSub.textContent = item.sub || "Resultado de cliente";
  document.querySelectorAll(".gitem").forEach((el, index) => el.classList.toggle("selected", index === activeGalleryIndex));
  const hasMultiple = loadedIndexes().length > 1;
  modalPrev.disabled = !hasMultiple;
  modalNext.disabled = !hasMultiple;
}

modal.querySelector(".gmodal-close").onclick = closeGalleryModal;
modalPrev.onclick = () => moveGalleryModal(-1);
modalNext.onclick = () => moveGalleryModal(1);
modal.onclick = (e) => {
  if (e.target === modal) closeGalleryModal();
};
window.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeGalleryModal();
  if (e.key === "ArrowLeft") moveGalleryModal(-1);
  if (e.key === "ArrowRight") moveGalleryModal(1);
});

const FAQS = [
  { q: "Isso pode danificar meu PC?", a: "N&atilde;o. A otimiza&ccedil;&atilde;o &eacute; feita com ajustes seguros de sistema, energia, rede, drivers e configura&ccedil;&otilde;es. O foco &eacute; desempenho com estabilidade, sem for&ccedil;ar o PC al&eacute;m do que ele suporta." },
  { q: "Perco arquivos?", a: "N&atilde;o. Seus arquivos pessoais n&atilde;o s&atilde;o apagados. O trabalho &eacute; feito nas configura&ccedil;&otilde;es do sistema e, quando alguma limpeza for necess&aacute;ria, ela &eacute; feita com cuidado." },
  { q: "Preciso formatar?", a: "Na maioria dos casos, n&atilde;o. A formata&ccedil;&atilde;o s&oacute; &eacute; recomendada quando o Windows est&aacute; muito pesado, corrompido ou cheio de problemas. Se for necess&aacute;rio, isso &eacute; conversado antes." },
  { q: "Quanto FPS posso ganhar?", a: "Depende do seu hardware, do jogo e do estado atual do Windows. Alguns PCs ganham poucos FPS, outros ganham muito mais; al&eacute;m do FPS, a otimiza&ccedil;&atilde;o costuma melhorar travamentos, delay e estabilidade." },
  { q: "Funciona em notebook?", a: "Sim. A otimiza&ccedil;&atilde;o tamb&eacute;m funciona em notebook gamer ou notebook comum, respeitando os limites de temperatura, energia e hardware do aparelho." },
  { q: "Posso acompanhar tudo ao vivo?", a: "Sim. No atendimento remoto voc&ecirc; pode acompanhar tudo pela tela, tirar d&uacute;vidas e ver o que est&aacute; sendo ajustado durante o processo." },
  { q: "E se eu n&atilde;o gostar do resultado?", a: "Se algo n&atilde;o ficar do jeito que voc&ecirc; esperava, eu reviso os ajustes com voc&ecirc; e fa&ccedil;o as corre&ccedil;&otilde;es necess&aacute;rias para deixar o PC est&aacute;vel e confort&aacute;vel para jogar." },
  { q: "Como funciona o processo de otimização?", a: "Você me envia acesso remoto via AnyDesk ou TeamViewer. Faço todas as configurações em 1 a 2h, e você sente a diferença na hora, sem precisar sair de casa." },
  { q: "Preciso reinstalar o Windows?", a: "Não necessariamente. PRO e ELITE funcionam no Windows atual. A PREMIUM inclui opcionalmente reinstalação com uma versão mais leve e otimizada." },
  { q: "Meu PC pode ficar instável depois?", a: "Não. Todas as otimizações focam em liberar desempenho sem comprometer a estabilidade. A maioria dos clientes reporta o sistema mais estável do que antes." },
  { q: "Qual é o prazo de entrega?", a: "Normalmente no mesmo dia do contato. Combinamos um horário e fazemos tudo remotamente." },
  { q: "De quanto em quanto tempo posso otimizar novamente?", a: "Recomendo otimizar a cada 3-6 meses para manter o desempenho, mas isso pode variar dependendo do uso e atualizações do sistema." },
  { q: "Como funciona o pagamento?", a: "Pagamento via Pix e cartão de crédito durante a otimização. Rápido e sem complicação." }
];

const faqEl = document.getElementById("faqs");
FAQS.forEach((f) => {
  const d = document.createElement("div");
  d.className = "faqitem";
  d.innerHTML = `<div class="faq-q">${f.q}<span class="faq-ic">▼</span></div><div class="faq-a"><p>${f.a}</p></div>`;
  d.querySelector(".faq-q").onclick = () => d.classList.toggle("open");
  faqEl.appendChild(d);
});

function setupRevealAnimations() {
  const targets = document.querySelectorAll(".hero,.pain-banner,.sec,.console-banner,.cards-grid,.process,.diff-grid,.gallery,.faqs,.cta-wrap,footer");
  targets.forEach((el) => {
    el.classList.add("reveal");
  });

  if (prefersReducedMotion || isMobileView || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach((el) => observer.observe(el));
}

setupRevealAnimations();
setLoaderProgress(86, "Finalizando detalhes...");

const loaderStart = performance.now();
function finishWhenReady() {
  const elapsed = performance.now() - loaderStart;
  window.setTimeout(finishLoader, Math.max(0, 650 - elapsed));
}

if (document.readyState === "complete") {
  finishWhenReady();
} else {
  window.addEventListener("load", finishWhenReady, { once: true });
}

window.setTimeout(finishLoader, 2200);
