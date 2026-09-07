import re

css = open("style.css", "r", encoding="utf-8").read()

# Find the block inside max-width: 1024px
old_block = """  .plans-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
  }"""

new_block = """  /* Swipe Carousel para Mobile/Tablet */
  .plans-grid {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: var(--space-md);
    margin: 0 -1.5rem;
    padding: 1rem 1.5rem 2rem 1.5rem;
    -ms-overflow-style: none; /* IE e Edge */
    scrollbar-width: none; /* Firefox */
    -webkit-overflow-scrolling: touch;
  }
  .plans-grid::-webkit-scrollbar {
    display: none;
  }
  
  .plans-grid .plan-card {
    flex: 0 0 85%;
    max-width: 380px;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }"""

css = css.replace(old_block, new_block)

# We also want to add a subtle hint for swiping! Maybe a tiny indicator dot logic?
# Actually, standard swipe is intuitive enough. Let's just apply the CSS.

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css)
