import React from "react";

/**
 * FuturisticBackground renders a global AI-themed background with
 * circuit patterns, neural networks, and geometric elements.
 */
const FuturisticBackground = () => (
  <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
    {/* Primary gradient background */}
    <div className="absolute inset-0 bg-black" />
    
    {/* Circuit board pattern overlay */}
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #f5c518 1px, transparent 1px),
          linear-gradient(180deg, #f5c518 1px, transparent 1px),
          linear-gradient(45deg, #f5c518 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px, 50px 50px, 25px 25px',
        backgroundPosition: '0 0, 0 0, 0 0'
      }}
    />
    
    {/* Hexagonal pattern */}
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5c518' fill-opacity='0.4'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    />
    
    {/* Neural network nodes */}
    <div className="absolute inset-0">
      {/* Top-left neural cluster */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-gold rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-32 left-40 w-1 h-1 bg-gold rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-40 left-60 w-1.5 h-1.5 bg-gold rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Top-right neural cluster */}
      <div className="absolute top-40 right-32 w-1 h-1 bg-gold rounded-full opacity-35 animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-60 right-20 w-2 h-2 bg-gold rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Bottom neural cluster */}
      <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-gold rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-gold rounded-full opacity-40 animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
    
    {/* Geometric accent shapes */}
    <div className="absolute top-1/4 right-10 w-20 h-20 border border-gold opacity-10 rotate-45 animate-spin-slow" />
    <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-gold opacity-15 rotate-12 animate-pulse" />
    
    {/* Subtle glow effects */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
  </div>
);

export default FuturisticBackground;