import sys
import re

html = open('index.html', 'r', encoding='utf-8').read()

consoleHTML = """
            <div class="card-hero-visual visual-console" aria-hidden="true">
              <div class="visual-glow glow-console"></div>
              <div class="visual-3d-container">
                <svg class="gamepad-svg" viewBox="0 0 100 65" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
            </div>"""

proHTML = """
            <div class="card-hero-visual visual-pro" aria-hidden="true">
              <div class="visual-glow glow-pro"></div>
              <div class="visual-3d-container">
                <div class="css-gpu">
                  <div class="css-gpu-fan"><div class="fan-center"></div></div>
                  <div class="css-gpu-fan"><div class="fan-center"></div></div>
                </div>
              </div>
              <div class="visual-label">GPU<br>TUNING</div>
            </div>"""

eliteHTML = """
             <div class="card-hero-visual visual-elite" aria-hidden="true">
              <div class="visual-glow glow-elite"></div>
              <div class="visual-3d-container">
                <div class="css-pc">
                  <svg class="pc-lines" viewBox="0 0 90 90">
                    <path d="M 36 31 L 36 50 L 50 50" />
                    <path d="M 65 34 L 65 20 L 47 20" />
                  </svg>
                  <div class="pc-part pc-mobo"></div>
                  <div class="pc-part pc-cpu"></div>
                  <div class="pc-part pc-ram"></div>
                  <div class="pc-part pc-gpu-part"></div>
                </div>
              </div>
              <div class="visual-label">SYSTEM<br>OVERRIDE</div>
            </div>"""

html = html.replace('<div class="plan-header">\n                <span class="plan-badge badge-console">', consoleHTML + '\n            <div class="plan-header">\n                <span class="plan-badge badge-console">')
html = html.replace('<div class="plan-header">\n              <span class="plan-badge badge-pro">', proHTML + '\n            <div class="plan-header">\n              <span class="plan-badge badge-pro">')
html = html.replace('<div class="plan-header">\n              <span class="plan-badge badge-elite">', eliteHTML + '\n            <div class="plan-header">\n              <span class="plan-badge badge-elite">')

pattern = r'(<p class="plan-desc">.*?</p>\s*<ul class="plan-features">.*?</ul>)'
replacement = r'<div class="plan-expandable">\n              \1\n            </div>'
html = re.sub(pattern, replacement, html, flags=re.DOTALL)

html = re.sub(r'(</div>\s*<div class="mt-auto">)', r'<div class="plan-expand-hint">Ver pacote completo &#9662;</div>\n\1', html)

open('index.html', 'w', encoding='utf-8').write(html)
