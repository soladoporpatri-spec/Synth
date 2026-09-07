const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/(<\/div>\s*<div class="mt-auto">)/g, '<div class="plan-expand-hint">Ver pacote completo &#9662;</div>\n');
fs.writeFileSync('index.html', html);

// Mobile expandable cards
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    document.querySelectorAll('.plan-card').forEach(c => {
      if (c !== this) c.classList.remove('active');
    });
    this.classList.toggle('active');
  });
});
