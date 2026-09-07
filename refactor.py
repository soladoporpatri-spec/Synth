import re

with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
in_expandable = False

for i, line in enumerate(lines):
    # Strip old hints and expandable tags
    if '<div class="plan-expand-hint">' in line or '<span class="hint-desktop">' in line or '<span class="hint-mobile">' in line or '</div>' in line and 'plan-expand-hint' in lines[i-1] if i>0 else False:
        # We will handle old hint removal simply by skipping lines that contain old hint strings
        pass
    
    if '<div class="plan-expand-hint">Ver pacote completo &#9662;</div>' in line:
        continue
    if '<div class="plan-expandable">' in line:
        continue
        
    # Wait, the closing </div> for plan-expandable is hard to find just by lines.
    new_lines.append(line)

html = "".join(new_lines)

# Now html is mostly clean of old wrappers, except the rogue </div> that closed plan-expandable.
# Let's just use regex to clean up.
html = re.sub(r'<div class="plan-expand-hint">.*?</div>', '', html, flags=re.DOTALL)
html = html.replace('<div class="plan-expandable">\n', '')
html = html.replace('</div>\n            <div class="mt-auto">', '<div class="mt-auto">')

# Now let's do the wrapping safely
def replacer(match):
    content = match.group(1)
    hint = """            <div class="plan-expand-hint">
              <span class="hint-desktop">Passe o mouse para ver pacote</span>
              <span class="hint-mobile">Toque para ver pacote</span>
            </div>"""
    return f'{hint}\n            <div class="plan-expandable">\n{content}            </div>\n          </div>'

pattern = r'(<p class="plan-desc">.*?</button>\n(?:.*?</div>\n)?\s*</div>)\n          </div>'
html = re.sub(pattern, replacer, html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
