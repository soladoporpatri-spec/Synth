const WHATS = "556286315534";
function openWhats(p, pr) {
  const m = p ? `Olá! Quero contratar a otimização ${p} (${pr}).` : "Olá! Quero saber mais sobre as otimizações.";
  window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(m)}`, '_blank');
}

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = document.body.scrollHeight || 1200;
}
function mkParticle() {
  return {
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
    a: Math.random() * .5 + .1
  };
}
function initParticles() {
  resize();
  particles = Array.from({length: 90}, mkParticle);
}
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167,139,250,${p.a})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });
  particles.forEach((p, i) => {
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(167,139,250,${0.06 * (1 - dist/100)})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}
initParticles();
drawParticles();
window.addEventListener('resize', initParticles);

function animCount(id, end, suf, dur) {
  let n = 0; const el = document.getElementById(id);
  const step = Math.max(1, Math.ceil(end / 55));
  const t = setInterval(() => {
    n = Math.min(n + step, end);
    el.textContent = n + suf;
    if (n >= end) clearInterval(t);
  }, Math.round(dur / 55));
}
setTimeout(() => {
  animCount('s1', 1200, '+', 1100);
  animCount('s2', 40, '%', 900);
  animCount('s3', 98, '%', 800);
}, 500);

const GALLERY = [
  {src:'imagens/Cliente1.jpeg', label:'Miguel.', sub:'Fortnite · +600 FPS'},
  {src:'imagens/Cliente2.jpeg', label:'1000x.', sub:'sem sttutering · +120 '},
  {src:'imagens/Cliente3.jpeg', label:'Victor.', sub:'Fortnite · 0 travamentos'},
  {src:'imagens/Cliente4.jpeg', label:'Mat.', sub:'Sem sttutering · maximo desempenho'},
  {src:'imagens/Cliente5.jpeg', label:'Doiselle.', sub:''},
  {src:'imagens/cliente6.jpeg', label:'Deliquente dc', sub:' · +250 fps'},
];
const PER = 3;
let gPage = 0;
const maxP = Math.ceil(GALLERY.length / PER) - 1;
const track = document.getElementById('gtrack');
const dotsEl = document.getElementById('gdots');
const prev = document.getElementById('gprev');
const next = document.getElementById('gnext');

GALLERY.forEach(item => {
  const el = document.createElement('div'); el.className = 'gitem';
  const icon = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`;
  el.innerHTML = item.src
    ? `<img src="${item.src}" alt="${item.label}"><div class="goverlay"><div class="gname">${item.label}</div><div class="gsub">${item.sub}</div></div>`
    : `<div class="gph"><div class="gph-icon">${icon}</div><div class="gph-txt"><strong style="color:#a78bfa;font-size:12px">${item.label}</strong><br>${item.sub}</div></div><div class="goverlay"><div class="gname">${item.label}</div><div class="gsub">${item.sub}</div></div>`;
  track.appendChild(el);
});

for (let i = 0; i <= maxP; i++) {
  const d = document.createElement('div'); d.className = 'gdot' + (i === 0 ? ' on' : '');
  d.onclick = () => goPage(i);
  dotsEl.appendChild(d);
}

function goPage(p) {
  gPage = Math.max(0, Math.min(p, maxP));
  const iw = track.children[0] ? track.children[0].offsetWidth + 12 : 0;
  track.style.transform = `translateX(-${gPage * PER * iw}px)`;
  document.querySelectorAll('.gdot').forEach((d, i) => d.classList.toggle('on', i === gPage));
  prev.disabled = gPage === 0;
  next.disabled = gPage === maxP;
}
prev.onclick = () => goPage(gPage - 1);
next.onclick = () => goPage(gPage + 1);
prev.disabled = true;

const FAQS = [
  {q:"Como funciona o processo de otimização?", a:"Você me envia acesso remoto via AnyDesk ou TeamViewer. Faço todas as configurações em 1 a 2h, e você sente a diferença na hora — sem precisar sair de casa."},
  {q:"Preciso reinstalar o Windows?", a:"Não necessariamente. PRO e ELITE funcionam no Windows atual. A PREMIUM inclui opcionalmente reinstalação com uma versão mais leve e otimizada."},
  {q:"Meu PC pode ficar instável depois?", a:"Não. Todas as otimizações focam em liberar desempenho sem comprometer a estabilidade. A maioria dos clientes reporta o sistema mais estável do que antes."},
  {q:"Qual é o prazo de entrega?", a:"Normalmente no mesmo dia do contato. Combinamos um horário e fazemos tudo remotamente."},
  {q:"de quanto em quanto tempo posso otimizar novamente?", a:"Recomendo otimizar a cada 3-6 meses para manter o desempenho, mas isso pode variar dependendo do uso e atualizações do sistema."},
  {q:"Como funciona o pagamento?", a:"Pagamento via Pix e cartão de crédito, Durante a otimização. Rápido e sem complicação."},
];
const faqEl = document.getElementById('faqs');
FAQS.forEach(f => {
  const d = document.createElement('div'); d.className = 'faqitem';
  d.innerHTML = `<div class="faq-q">${f.q}<span class="faq-ic">▼</span></div><div class="faq-a"><p>${f.a}</p></div>`;
  d.querySelector('.faq-q').onclick = () => d.classList.toggle('open');
  faqEl.appendChild(d);
});