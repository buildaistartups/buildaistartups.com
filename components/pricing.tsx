<style jsx global>{`
  /* Selection rectangle offsets */
  :root {
    --sel-top: -26px;         /* already working for the top */
    --sel-bottom: -56px;      /* lower the bottom so it clears "Email (48h)" */
    --sel-lr: -18px;          /* push side borders farther out from the text */
  }

  /* header pill (Startup) */
  .plan-card[data-highlight='true'] {
    position: relative;
  }
  .plan-card[data-highlight='true']::after {
    content: '';
    position: absolute;
    inset: var(--sel-top) var(--sel-lr) -14px var(--sel-lr); /* header only */
    border: 1px solid rgba(168, 85, 247, 0.55);
    border-radius: 28px;
    pointer-events: none;
  }

  /* full column (features matrix) */
  #selected-grid-col {
    position: absolute;
    left: 25%;           /* col 2 in a 4-col grid */
    right: 50%;
    top: 0;
    bottom: 0;
    pointer-events: none;
  }
  @media (min-width: 768px) {
    #selected-grid-col::after {
      content: '';
      position: absolute;
      inset: var(--sel-top) var(--sel-lr) var(--sel-bottom) var(--sel-lr);
      border: 1px solid rgba(168, 85, 247, 0.55);
      border-radius: 28px;
      pointer-events: none;
    }
  }

  /* give selected column cells more breathing room + center text on md+ */
  .matrix-cell--selected {
    padding-left: 2rem !important;   /* px-8 */
    padding-right: 2rem !important;  /* px-8 */
    text-align: inherit;
  }
  @media (min-width: 768px) {
    .matrix-cell--selected {
      text-align: center;
    }
  }
`}</style>
