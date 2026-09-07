import re

css = open("style.css", "r", encoding="utf-8").read()

css = css.replace(
    'scroll-snap-type: x mandatory;\n    gap: var(--space-md);',
    'scroll-snap-type: x mandatory;\n    gap: var(--space-md);\n    align-items: flex-start;'
)

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css)
