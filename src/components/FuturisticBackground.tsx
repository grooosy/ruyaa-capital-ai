import React from "react";

/**
 * FuturisticBackground renders a global dark background with
 * gradients and a subtle grid. It is positioned absolutely so it
 * does not interfere with content rendering.
 */
const FuturisticBackground = () => (
  <div className="absolute inset-0 -z-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
  </div>
);

export default FuturisticBackground;
