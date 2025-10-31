
import React from 'react';

export const MitMIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M8 12h-5" />
    <path d="M12 8V3" />
    <path d="M21 12h-5" />
    <path d="M12 21v-5" />
    <path d="M12 12 6.2 6.2" />
    <path d="m3.7 17.5 2.5-2.5" />
    <path d="M12 12l5.8-5.8" />
    <path d="m17.5 20.3 2.8-2.8" />
  </svg>
);
