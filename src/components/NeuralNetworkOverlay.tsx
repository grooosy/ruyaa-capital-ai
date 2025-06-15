
import React from "react";

const NeuralNetworkOverlay = () => (
  <svg
    viewBox="0 0 800 800"
    width="100%"
    height="100%"
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      opacity: 0.5,
      filter: "blur(0.5px)",
    }}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="neonStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00FF9D" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
    <path d="M50 50 Q200 400 500 300 Q650 200 750 750" stroke="url(#neonStroke)" strokeWidth="1.5" fill="none" />
    <path d="M0 400 Q250 200 600 400 Q700 600 800 200" stroke="#00FF9D" strokeWidth="1" fill="none" opacity="0.6"/>
    <circle cx="250" cy="400" r="6" fill="#00FF9D" opacity="0.4" />
    <circle cx="600" cy="400" r="4" fill="#D4AF37" opacity="0.25" />
    <circle cx="520" cy="310" r="4" fill="#00FF9D" opacity="0.3" />
  </svg>
);

export default NeuralNetworkOverlay;
