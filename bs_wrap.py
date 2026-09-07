import os
import bs4

# 1. Restore from f515ce8 to get a completely clean slate with perfect encoding
os.system('git checkout f515ce8 -- index.html')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# TEXT UPDATES
html = html.replace('<li>Configuração do Discord (menor consumo)</li>\n              <li>Configuração do Spotify (menor consumo)</li>\n              <li>Redução avançada de ping</li>\n              <li>Configuração de internet otimizada</li>\n              <li>Ajustes avançados no jogo escolhido</li>\n              <li>Otimização técnica na BIOS</li>', '<li>Redução avançada de ping</li>\n              <li>Configuração de internet otimizada</li>\n              <li>Ajustes avançados no jogo escolhido</li>\n              <li>Otimização técnica na BIOS</li>\n              <li>Configuração do Discord (menor consumo)</li>\n              <li>Configuração do Spotify (menor consumo)</li>')

html = html.replace('<p>Você chama no WhatsApp e a gente decide qual plano resolve o seu problema.</p>', '<p>Para começar seu atendimento fazemos uma análise antes de otimizar para decidir qual plano é o melhor para vc.</p>')
html = html.replace('<p>A otimização demora quase duas horas. Você assiste a tudo no seu monitor.</p>', '<p>A otimização é feita em torno de 30 minutos a 1 hora.</p>')
html = html.replace('<p>Não. Nós respeitamos o limite de calor e energia da sua placa. O objetivo é tirar o lag e não fritar a máquina. O risco de queimar algo não existe.</p>', '<p>Não! A otimização visa deixar seu pc no máximo sem estragar nenhuma peça, tirando o máximo de delay e do input lag, e subir seu fps.</p>')
html = html.replace('<p>Quase nunca. Nós limpamos o seu sistema do jeito que ele está hoje. A formatação só acontece no plano Elite se você fizer questão.</p>', '<p>A formatação é recomendada mas não obrigatória. Recomendamos sempre formatar o pc antes de otimizar para ter ganhos mais expressivos.</p>')
html = html.replace('<p>Isso depende muito da placa que você já tem. A verdadeira diferença não é o número do FPS subir. A diferença é o jogo parar de dar umas travadas quando aparece inimigo na tela.</p>', '<p>Não dá para ter uma estimativa de quantos FPS irá fazer, os ganhos de desempenho variam de pc para pc.</p>')
html = html.replace('<p>O serviço é pago no Pix antes de começar. Como é um trabalho manual ao vivo, não devolvemos o valor. Porém, nós refazemos tudo de graça caso algo não fique do seu jeito.</p>', '<p>Você paga no início da otimização. E como é um trabalho manual e que demanda tempo de serviço e conhecimento, não temos reembolso. Porém refazemos tudo de graça caso haja algum problema!</p>')

# 3D MODELS INJECTION
consoleHTML = """
            <div class="card-hero-visual visual-console" aria-hidden="true">
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
html = html.replace('<div class="plan-header">\r\n                <span class="plan-badge badge-console">', consoleHTML + '\r\n            <div class="plan-header">\r\n                <span class="plan-badge badge-console">')
html = html.replace('<div class="plan-header">\n              <span class="plan-badge badge-pro">', proHTML + '\n            <div class="plan-header">\n              <span class="plan-badge badge-pro">')
html = html.replace('<div class="plan-header">\r\n              <span class="plan-badge badge-pro">', proHTML + '\r\n            <div class="plan-header">\r\n              <span class="plan-badge badge-pro">')
html = html.replace('<div class="plan-header">\n              <span class="plan-badge badge-elite">', eliteHTML + '\n            <div class="plan-header">\n              <span class="plan-badge badge-elite">')
html = html.replace('<div class="plan-header">\r\n              <span class="plan-badge badge-elite">', eliteHTML + '\r\n            <div class="plan-header">\r\n              <span class="plan-badge badge-elite">')

soup = bs4.BeautifulSoup(html, 'html.parser')
cards = soup.select('.plan-card')

for card in cards:
    desc = card.select_one('.plan-desc')
    features = card.select_one('.plan-features')
    mtauto = card.select_one('.mt-auto')
    
    # Create the expandable wrapper
    wrapper = soup.new_tag("div")
    wrapper['class'] = "plan-expandable"
    
    # Create the hint
    hint = soup.new_tag("div")
    hint['class'] = "plan-expand-hint"
    
    span_desktop = soup.new_tag("span")
    span_desktop['class'] = "hint-desktop"
    span_desktop.string = "Passe o mouse para ver pacote"
    
    span_mobile = soup.new_tag("span")
    span_mobile['class'] = "hint-mobile"
    span_mobile.string = "Toque para ver pacote"
    
    hint.append(span_desktop)
    hint.append(span_mobile)
    
    # Insert hint BEFORE the description
    desc.insert_before(hint)
    
    # Move elements into wrapper
    desc.insert_before(wrapper)
    wrapper.append(desc.extract())
    wrapper.append(features.extract())
    wrapper.append(mtauto.extract())

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
