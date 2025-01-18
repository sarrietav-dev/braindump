function Noise() {
  return (
    <svg
      style={{
        pointerEvents: "none",
        position: "fixed", // Use "fixed" to make it cover the entire viewport.
        top: 0,
        left: 0,
        height: "100vh", // Ensure it always covers the visible viewport height.
        width: "100vw", // Ensure it always covers the visible viewport width.
        mixBlendMode: "soft-light",
        zIndex: 50,
        opacity: 0.7,
      }}
      width="100%"
      height="100%"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.80"
          numOctaves="4"
          stitchTiles="stitch"
        ></feTurbulence>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  )
}

export default Noise
