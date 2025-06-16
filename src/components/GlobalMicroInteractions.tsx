
import React, { useEffect } from 'react';

const GlobalMicroInteractions = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Global button hover animations */
      button, .interactive-element {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
      }
      
      button:hover:not(:disabled), .interactive-element:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      button:active:not(:disabled), .interactive-element:active {
        transform: translateY(0px);
        transition-duration: 0.1s;
      }
      
      /* Link hover effects */
      a:not(.no-hover-effect) {
        position: relative;
        transition: color 0.2s ease;
      }
      
      a:not(.no-hover-effect):hover {
        color: #10A169;
      }
      
      a:not(.no-hover-effect)::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 0;
        background: linear-gradient(90deg, #10A169, #CFA100);
        transition: width 0.3s ease;
      }
      
      a:not(.no-hover-effect):hover::after {
        width: 100%;
      }
      
      /* Card hover effects */
      .neon-glow-card, .card-hover-effect {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .neon-glow-card:hover, .card-hover-effect:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 161, 105, 0.2);
      }
      
      /* Input focus animations */
      input, textarea, select {
        transition: all 0.2s ease;
      }
      
      input:focus, textarea:focus, select:focus {
        transform: scale(1.02);
        box-shadow: 0 0 0 2px rgba(16, 161, 105, 0.3);
      }
      
      /* Smooth scroll for all interactions */
      * {
        scroll-behavior: smooth;
      }
      
      /* Performance optimizations */
      button, a, .interactive-element {
        will-change: transform;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default GlobalMicroInteractions;
