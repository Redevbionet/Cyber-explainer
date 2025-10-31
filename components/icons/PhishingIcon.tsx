
import React from 'react';

export const PhishingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M13.5 9a3.5 3.5 0 1 0-5.9-2.4" />
    <path d="M13 11.5c-2.5-1-6.5-.5-6.5 2.5a4.3 4.3 0 0 0 4.5 4.5c2 0 4.5-1.5 4.5-4.5" />
    <path d="m15.5 11.5 2 2" />
    <path d="M18.5 14.5 20 16" />
    <path d="m14 20-3-3" />
    <path d="m21.5 4.5-1.5 1.5" />
  </svg>
);
