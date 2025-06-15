
import React from 'react';

const ConvergingArrowsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 8L10 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 16L10 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 8L14 11.5" stroke="#00FF9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 16L14 12.5" stroke="#00FF9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11.5L14 12.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
  </svg>
);

export default ConvergingArrowsIcon;
