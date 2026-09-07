import os

html = open("index.html", "r", encoding="utf-8").read()

html = html.replace('INPUT<br>ACTIVE', 'CONTROLE<br>ATIVO')
html = html.replace('GPU<br>TUNING', 'COMPUTADOR<br>AJUSTADO')
html = html.replace('SYSTEM<br>OVERRIDE', 'SISTEMA<br>OTIMIZADO')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
