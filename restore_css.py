import os
import re
import subprocess

# Restore style.css from f515ce8
result = subprocess.run(['git', 'show', 'f515ce8:style.css'], capture_output=True)
css = result.stdout.decode('utf-8')

# Now we append the 3D CSS
append_css = """
/* =========================================
   PLAN CARDS 3D HERO VISUALS (CSS 3D)
========================================= */

.card-hero-visual {
  position: relative;
  width: 100%;
  height: 140px;
  margin-bottom: 24px;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  margin-top: 10px;
  padding-bottom: 15px;
  overflow: visible;
}

.visual-3d-container {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-glow {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  z-index: 0;
  transition: all 0.5s ease;
}

.glow-console { background: var(--synth-cyan); }
.glow-pro { background: var(--synth-purple); }
.glow-elite { background: linear-gradient(45deg, var(--synth-cyan), var(--synth-purple)); width: 100px; height: 100px; }

.visual-label {
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  font-family: monospace;
  color: rgba(255,255,255,0.4);
  line-height: 1.3;
  text-transform: uppercase;
}
.visual-label::before {
  content: '●';
  color: var(--synth-cyan);
  margin-right: 6px;
  font-size: 0.5rem;
  animation: pulse-telemetry 2s infinite;
}

@keyframes pulse-telemetry {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

/* Global Hover Focus for cards */
@media (hover: hover) {
  .plans-grid:hover .plan-card:not(:hover) {
    opacity: 0.75;
    transform: scale(0.98);
  }
  .plans-grid:hover .plan-card:not(:hover) .visual-glow {
    opacity: 0.1;
  }
}

/* --- CONSOLE (Gamepad) --- */
.visual-console .visual-3d-container {
  transform: rotateX(10deg) rotateY(-15deg);
}
.plan-card:hover .visual-console .visual-3d-container {
  transform: rotateX(0deg) rotateY(-5deg) translateY(-4px) scale(1.05);
}
.plan-card:hover .glow-console { opacity: 0.5; }

.gamepad-svg {
  width: 140px;
  height: auto;
  stroke: #ffffff;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,0.4));
  transform: translateZ(15px);
  transition: transform 0.4s ease;
}
.plan-card:hover .gamepad-svg {
  stroke: #fff;
  transform: translateZ(25px);
}

/* --- PRO (GPU) --- */
.visual-pro .visual-3d-container {
  transform: rotateX(25deg) rotateY(-25deg) rotateZ(10deg);
}
.plan-card:hover .visual-pro .visual-3d-container {
  transform: rotateX(15deg) rotateY(-15deg) rotateZ(5deg) translateY(-5px) scale(1.05);
}
.plan-card:hover .glow-pro { opacity: 0.5; }

.css-gpu {
  width: 130px;
  height: 50px;
  border: 1.5px solid var(--synth-purple);
  background: rgba(10, 8, 20, 0.9);
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transform: translateZ(10px);
  box-shadow: inset 0 0 15px rgba(139, 92, 246, 0.2), 0 10px 20px rgba(0,0,0,0.5);
  transition: transform 0.4s ease;
}
.plan-card:hover .css-gpu {
  transform: translateZ(30px);
  border-color: #a78bfa;
}
.css-gpu::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 10px;
  width: 50px;
  height: 8px;
  border: 1px solid var(--synth-cyan);
  border-bottom: none;
  background: rgba(6, 182, 212, 0.1);
}
.css-gpu::after {
  content: '';
  position: absolute;
  right: -6px;
  bottom: 5px;
  width: 6px;
  height: 20px;
  border: 1px solid var(--text-muted);
  border-left: none;
}
.css-gpu-fan {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--synth-cyan);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fan-center {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--synth-cyan);
}
.css-gpu-fan::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--synth-cyan);
  transform: translate(-50%, -50%);
  transition: transform 0.2s linear;
}
.plan-card:hover .css-gpu-fan::after {
  animation: fan-spin 0.5s linear infinite;
}
@keyframes fan-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* --- ELITE (Exploded PC) --- */
.visual-elite .visual-3d-container {
  transform: rotateX(40deg) rotateY(-35deg) rotateZ(10deg);
}
.plan-card:hover .visual-elite .visual-3d-container {
  transform: rotateX(30deg) rotateY(-25deg) rotateZ(5deg) translateY(-5px) scale(1.05);
}
.plan-card:hover .glow-elite { opacity: 0.6; }

.css-pc {
  position: relative;
  width: 110px;
  height: 110px;
  transform-style: preserve-3d;
}
.pc-part {
  position: absolute;
  border: 1px solid;
  background: rgba(10, 8, 20, 0.85);
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
/* Motherboard */
.pc-mobo {
  width: 80px;
  height: 80px;
  bottom: 0; left: 0;
  border-color: rgba(255,255,255,0.2);
  transform: translateZ(0px);
}
/* CPU */
.pc-cpu {
  width: 22px;
  height: 22px;
  top: 20px; left: 25px;
  border-color: var(--synth-cyan);
  transform: translateZ(5px);
}
/* RAM */
.pc-ram {
  width: 10px;
  height: 38px;
  top: 15px; right: 15px;
  border-color: var(--synth-purple);
  transform: translateZ(8px);
}
/* GPU */
.pc-gpu-part {
  width: 70px;
  height: 22px;
  bottom: 12px; left: -10px;
  border-color: var(--synth-primary);
  transform: translateZ(15px);
  background: rgba(139, 92, 246, 0.15);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pc-gpu-part::after {
  content: ''; width: 14px; height: 14px; border-radius: 50%; border: 1px solid var(--synth-cyan);
}
.pc-gpu-part::before {
  content: ''; width: 14px; height: 14px; border-radius: 50%; border: 1px solid var(--synth-cyan);
}

/* Hover separation (Exploded view) */
.plan-card:hover .pc-gpu-part { transform: translateZ(40px) translateX(-5px) translateY(5px); border-color: #fff; }
.plan-card:hover .pc-cpu { transform: translateZ(25px); border-color: #fff; }
.plan-card:hover .pc-ram { transform: translateZ(18px) translateX(4px); }
.plan-card:hover .pc-mobo { opacity: 0.4; transform: translateZ(-10px); }

/* Synth wave lines */
.pc-lines {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  transform: translateZ(2px);
}
.pc-lines path {
  fill: none;
  stroke: var(--synth-cyan);
  stroke-dasharray: 2, 4;
  opacity: 0.5;
  transition: all 0.6s ease;
}
.plan-card:hover .pc-lines path {
  opacity: 1;
  stroke: var(--synth-purple);
}

/* =========================================
   EXPANDABLE PLAN CARDS
========================================= */
.plan-expandable {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 0;
}
.plan-card:hover .plan-expandable,
.plan-card.active .plan-expandable {
  max-height: 800px;
  opacity: 1;
  margin-top: 20px;
}

/* Responsive hints */
.hint-desktop { display: none; }
.hint-mobile { display: inline; }

@media (pointer: fine) {
  .hint-desktop { display: inline; }
  .hint-mobile { display: none; }
}

.plan-expand-hint {
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 10px;
  margin-bottom: -10px;
  padding-bottom: 20px;
  transition: opacity 0.3s ease;
  cursor: pointer;
}
.plan-card:hover .plan-expand-hint,
.plan-card.active .plan-expand-hint {
  opacity: 0;
  pointer-events: none;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
"""

css = css + append_css

# Make sure align-items is flex-start in .plans-grid
css = css.replace('align-items: stretch;', 'align-items: flex-start;')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
