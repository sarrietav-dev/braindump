function Noise() {
  return (
    <svg
      style={{
        pointerEvents: "none",
        position: "absolute",
        isolation: "isolate",
        height: "100%",

        width: "100%",
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
