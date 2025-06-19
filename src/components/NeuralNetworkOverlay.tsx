import React from "react";

const NeuralNetworkOverlay = () => (
  <svg
    viewBox="0 0 800 800"
    width="100%"
    height="100%"
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      opacity: 0.3,
      filter: "blur(0.5px)",
    }}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="neonStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <path d="M50 50 Q200 400 500 300 Q650 200 750 750" stroke="url(#neonStroke)" strokeWidth="1.5" fill="none" />
    <path d="M0 400 Q250 200 600 400 Q700 600 800 200" stroke="#FFD700" strokeWidth="1" fill="none" opacity="0.4"/>
    <circle cx="250" cy="400" r="6" fill="#FFD700" opacity="0.3" />
    <circle cx="600" cy="400" r="4" fill="#FFA500" opacity="0.2" />
    <circle cx="520" cy="310" r="4" fill="#FFD700" opacity="0.25" />
  </svg>
);

export default NeuralNetworkOverlay;