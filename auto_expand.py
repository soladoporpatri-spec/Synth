import os
import re

js = open("script.js", "r", encoding="utf-8").read()

old_logic = """// Mobile expandable cards
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    document.querySelectorAll('.plan-card').forEach(c => {
      if (c !== this) c.classList.remove('active');
    });
    this.classList.toggle('active');
  });
});"""

new_logic = """// Auto-expand cards on mobile carousel scroll
const plansGrid = document.querySelector('.plans-grid');
const planCards = document.querySelectorAll('.plan-card');

function updateActiveCard() {
  if (window.innerWidth > 1024) {
    // On desktop, remove all active classes (CSS hover handles it)
    planCards.forEach(c => c.classList.remove('active'));
    return;
  }
  
  let closestCard = null;
  let minDistance = Infinity;
  // Calculate the horizontal center of the scroll container
  const gridRect = plansGrid.getBoundingClientRect();
  const gridCenter = gridRect.left + gridRect.width / 2;

  planCards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(gridCenter - cardCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestCard = card;
    }
  });

  if (closestCard) {
    planCards.forEach(c => {
      if (c !== closestCard) c.classList.remove('active');
    });
    closestCard.classList.add('active');
  }
}

if (plansGrid) {
  plansGrid.addEventListener('scroll', updateActiveCard);
  window.addEventListener('resize', updateActiveCard);
  // Trigger once on load
  setTimeout(updateActiveCard, 100);
}

// Fallback click/touch for cards just in case
planCards.forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    if (window.innerWidth <= 1024) {
      // Scroll to the card so it snaps and auto-expands
      this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
});"""

if old_logic in js:
    js = js.replace(old_logic, new_logic)
else:
    # Just in case there's an indentation mismatch, use regex to remove everything after '// Mobile expandable cards'
    js = re.sub(r'// Mobile expandable cards.*', new_logic, js, flags=re.DOTALL)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)
