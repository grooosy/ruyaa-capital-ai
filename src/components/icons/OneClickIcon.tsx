
import React from 'react';

const OneClickIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M17 10H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 12L11 14L15 10" stroke="#00FF9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default OneClickIcon;
