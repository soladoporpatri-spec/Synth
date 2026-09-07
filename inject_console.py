import re

html = open("index.html", "r", encoding="utf-8").read()

consoleHTML = """<div class="card-hero-visual visual-console" aria-hidden="true">
  <div class="visual-glow glow-console"></div>
  <div class="visual-3d-container">
    <svg class="gamepad-svg" viewBox="0 0 100 65" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 25 20 C 25 10, 40 10, 50 15 C 60 10, 75 10, 75 20 C 80 30, 95 55, 80 60 C 70 65, 60 50, 50 45 C 40 50, 30 65, 20 60 C 5 55, 20 30, 25 20 Z" />
      <path d="M 26 28 h 4 v -4 h 4 v 4 h 4 v 4 h -4 v 4 h -4 v -4 h -4 z" stroke="var(--synth-cyan)" />
      <circle cx="68" cy="24" r="2.5" stroke="var(--synth-purple)"/>
      <circle cx="74" cy="30" r="2.5" stroke="var(--synth-purple)"/>
      <circle cx="68" cy="36" r="2.5" stroke="var(--synth-purple)"/>
      <circle cx="62" cy="30" r="2.5" stroke="var(--synth-purple)"/>
      <circle cx="38" cy="42" r="5"/>
      <circle cx="62" cy="42" r="5"/>
    </svg>
  </div>
  <div class="visual-label">INPUT<br>ACTIVE</div>
</div>
<div class="plan-header">"""

html = re.sub(r'<div class="plan-header">\s*<span class="plan-badge badge-console">', f'{consoleHTML}\n<span class="plan-badge badge-console">', html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
