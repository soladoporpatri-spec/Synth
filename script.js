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
  { src: "imagens/Cliente7.jpeg", label: "VITOR", sub: "Otimizou console" },
  { src: "imagens/Cliente8.jpeg", label: "Vamp", sub: "sem stuttering +150fps" },
  { src: "imagens/Cliente9.jpeg", label: "Yang Rinox", sub: "+Estabilidade +fps" },
  { src: "imagens/Cliente10.jpeg", label: "Leornado", sub: "estabilidade +240" },
  { src: "imagens/Cliente11.jpeg", label: "YanCardoso", sub: "Estabilidade +fps" },
  { src: "imagens/Cliente12.jpeg", label: "araujo", sub: "+210fps" },
  { src: "imagens/Cliente13.jpeg", label: "GREEN", sub: "Otimizou Console" },
  { src: "imagens/Cliente14.jpeg", label: "Subs", sub: "estabilidade zero input" },
  { src: "imagens/Cliente15.jpeg", label: "biel7zzx", sub: "Input lag + estabilidade" },
  { src: "imagens/Cliente16.jpeg", label: "7mathias the best", sub: "+300FPS -input lag" },
  { src: "imagens/Cliente9.jpeg", label: "Yang Rinox", sub: "+Estabilidade +fps" },
  { src: "imagens/Cliente11.jpeg", label: "YanCardoso", sub: "Estabilidade +fps" }
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
  { q: "Isso pode danificar meu PC?", a: "Não. A otimização é feita com ajustes seguros de sistema, energia, rede, drivers e configurações. O foco é desempenho com estabilidade, sem forçar o PC além do que ele suporta." },
  { q: "Perco arquivos pessoais?", a: "Não. Seus arquivos pessoais não são apagados. O trabalho é feito nas configurações do sistema e, quando alguma limpeza for necessária, ela é feita com cuidado." },
  { q: "Preciso formatar?", a: "Na maioria dos casos, não. A formatação só é recomendada quando o Windows está muito pesado, corrompido ou cheio de problemas. Se for necessário, isso é conversado antes." },
  { q: "Quanto FPS posso ganhar?", a: "Depende do seu hardware, do jogo e do estado atual do Windows. Além do FPS, a otimização costuma melhorar travamentos, delay, estabilidade e tempo de resposta." },
  { q: "Funciona em notebook?", a: "Sim. A otimização também funciona em notebook gamer ou notebook comum, respeitando os limites de temperatura, energia e hardware do aparelho." },
  { q: "Posso acompanhar tudo ao vivo?", a: "Sim. No atendimento remoto você pode acompanhar tudo pela tela, tirar dúvidas e ver o que está sendo ajustado durante o processo." },
  { q: "Tem suporte depois da otimização?", a: "Sim. Se algo não ficar do jeito que você esperava, reviso os ajustes com você e faço as correções necessárias para deixar o PC estável e confortável para jogar." },
  { q: "Como funciona o pagamento?", a: "O pagamento pode ser feito via Pix ou cartão. No WhatsApp eu confirmo o plano, o valor e o melhor horário antes de iniciar o atendimento." },
  { q: "Qual é o prazo de entrega?", a: "Normalmente no mesmo dia do contato. Combinamos um horário e fazemos tudo remotamente em cerca de 1 a 2 horas, dependendo do plano e do estado do PC." },
  { q: "De quanto em quanto tempo posso otimizar novamente?", a: "Recomendo revisar a otimização a cada 3 a 6 meses, principalmente depois de muitas atualizações do Windows, drivers ou jogos." }
];const faqEl = document.getElementById("faqs");
FAQS.forEach((f) => {
  const d = document.createElement("div");
  d.className = "faqitem";
  d.innerHTML = `<div class="faq-q">${f.q}<span class="faq-ic">▼</span></div><div class="faq-a"><p>${f.a}</p></div>`;
  d.querySelector(".faq-q").onclick = () => d.classList.toggle("open");
  faqEl.appendChild(d);
});

function setupRevealAnimations() {
  const targets = document.querySelectorAll(".hero,.pain-banner,.sec,.console-banner,.cards-grid,.process,.assurance-grid,.diff-grid,.depos,.gallery,.faqs,.cta-wrap,footer");
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
