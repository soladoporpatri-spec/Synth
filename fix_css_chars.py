import re

css = open("style.css", "r", encoding="utf-8").read()
css = re.sub(r'\.plan-features li::before {\s*content:.*?;', '.plan-features li::before {\n  content: "✓";', css)
css = re.sub(r'\.bento-list li::before {\s*content:.*?;', '.bento-list li::before {\n  content: "•";', css)
css = re.sub(r'\.visual-label::before {\s*content:.*?;', '.visual-label::before {\n  content: "●";', css)

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css)
