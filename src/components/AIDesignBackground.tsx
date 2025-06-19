import React from "react";

const AIDesignBackground: React.FC = () => (
  <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none">
    <svg
      width="260"
      height="260"
      viewBox="0 0 260 260"
      className="opacity-20"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="aiGradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#aiGradient)" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="80"
        fontWeight="bold"
        fill="white"
        opacity="0.3"
      >
        AI
      </text>
    </svg>
  </div>
);

export default AIDesignBackground;
