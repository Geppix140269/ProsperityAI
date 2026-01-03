
import React from 'react';

export const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="3" y1="21" x2="21" y2="21" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="3 10 12 3 21 10" />
    <line x1="5" y1="21" x2="5" y2="10" />
    <line x1="9" y1="21" x2="9" y2="10" />
    <line x1="15" y1="21" x2="15" y2="10" />
    <line x1="19" y1="21" x2="19" y2="10" />
  </svg>
);
