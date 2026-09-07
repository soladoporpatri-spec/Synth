import os

html = open("index.html", "r", encoding="utf-8").read()

# Remove old wrapper and hints
html = html.replace('<div class="plan-expandable">\n              <p class="plan-desc">', '<p class="plan-desc">')
html = html.replace('</ul>\n            </div>', '</ul>')
html = html.replace('<div class="plan-expand-hint">Ver pacote completo &#9662;</div>\n            <div class="mt-auto">', '<div class="mt-auto">')

# Wrap Console
html = html.replace(
    '<p class="plan-desc">Focado na galera',
    '<div class="plan-expand-hint"><span class="hint-desktop">Passe o mouse para ver pacote</span><span class="hint-mobile">Toque para ver pacote</span></div>\n            <div class="plan-expandable">\n              <p class="plan-desc">Focado na galera'
)
html = html.replace(
    '</button>\n            </div>\n          </div>\n\n          <!-- PRO -->',
    '</button>\n            </div>\n            </div>\n          </div>\n\n          <!-- PRO -->'
)

# Wrap Pro
html = html.replace(
    '<p class="plan-desc">Pacote completo',
    '<div class="plan-expand-hint"><span class="hint-desktop">Passe o mouse para ver pacote</span><span class="hint-mobile">Toque para ver pacote</span></div>\n            <div class="plan-expandable">\n              <p class="plan-desc">Pacote completo'
)
html = html.replace(
    '</div>\n            </div>\n          </div>\n\n          <!-- ELITE -->',
    '</div>\n            </div>\n            </div>\n          </div>\n\n          <!-- ELITE -->'
)

# Wrap Elite
html = html.replace(
    '<p class="plan-desc">Tiramos tudo',
    '<div class="plan-expand-hint"><span class="hint-desktop">Passe o mouse para ver pacote</span><span class="hint-mobile">Toque para ver pacote</span></div>\n            <div class="plan-expandable">\n              <p class="plan-desc">Tiramos tudo'
)
html = html.replace(
    '</div>\n            </div>\n          </div>\n        </div>',
    '</div>\n            </div>\n            </div>\n          </div>\n        </div>'
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
