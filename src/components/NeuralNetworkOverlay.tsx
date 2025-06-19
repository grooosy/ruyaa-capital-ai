const NeuralNetworkOverlay = () => (
  <svg
    viewBox="0 0 1200 800"
    width="100%"
    height="100%"
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      opacity: 0.08,
      filter: "blur(0.5px)",
    }}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="neuralGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00A86B" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#00A86B" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Main neural pathways */}
    <path
      d="M100 100 Q300 200 500 150 Q700 100 900 200 Q1000 300 1100 250"
      stroke="url(#neuralGradient)"
      strokeWidth="1"
      fill="none"
      filter="url(#glow)"
    />
    <path
      d="M50 400 Q250 300 450 350 Q650 400 850 300 Q1050 200 1150 350"
      stroke="url(#neuralGradient)"
      strokeWidth="0.8"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M200 600 Q400 500 600 550 Q800 600 1000 500"
      stroke="url(#neuralGradient)"
      strokeWidth="0.6"
      fill="none"
      opacity="0.4"
    />

    {/* Neural nodes */}
    <circle cx="300" cy="200" r="3" fill="#FFD700" opacity="0.4" className="subtle-pulse" />
    <circle cx="500" cy="150" r="2" fill="#00A86B" opacity="0.3" />
    <circle cx="700" cy="100" r="2.5" fill="#FFD700" opacity="0.5" className="subtle-pulse" />
    <circle cx="450" cy="350" r="2" fill="#FFD700" opacity="0.3" />
    <circle cx="650" cy="400" r="3" fill="#00A86B" opacity="0.4" className="subtle-pulse" />
    <circle cx="600" cy="550" r="2" fill="#FFD700" opacity="0.3" />

    {/* Geometric elements */}
    <polygon points="150,50 170,80 130,80" fill="#FFD700" opacity="0.1" className="subtle-pulse" />
    <rect x="950" y="150" width="15" height="15" fill="#00A86B" opacity="0.1" transform="rotate(45 957.5 157.5)" />
  </svg>
)

export default NeuralNetworkOverlay
