useEffect(() => {
  function measure() {
    const container = containerRef.current
    const header = highlightHeaderRef.current
    const matrix = matrixRef.current
    if (!container || !header || !matrix) return

    const c = container.getBoundingClientRect()
    const h = header.getBoundingClientRect()
    const m = matrix.getBoundingClientRect()

    // Position the rectangle to start at the matrix (feature table) area only
    // and extend it to cover just the feature comparison rows
    const SIDE_PADDING = 8   // px padding from both sides for spacing
    const BOTTOM_PADDING = 8 // small padding from bottom of matrix
    
    // Start from the matrix top, not the header
    const left = h.left - c.left + SIDE_PADDING
    const width = h.width - (SIDE_PADDING * 2)
    const top = m.top - c.top // Start at matrix top
    const height = m.height - BOTTOM_PADDING // End at matrix bottom with padding

    setBox({ left, width, top, height, position: 'absolute' })
  }

  // measure now & on resize / reflow
  const ro = new ResizeObserver(measure)
  if (containerRef.current) ro.observe(containerRef.current)
  if (highlightHeaderRef.current) ro.observe(highlightHeaderRef.current)
  if (matrixRef.current) ro.observe(matrixRef.current)
  measure()

  window.addEventListener('resize', measure)
  return () => {
    window.removeEventListener('resize', measure)
    ro.disconnect()
  }
}, [annual])
