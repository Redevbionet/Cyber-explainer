
import React from 'react';

export const ToolboxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M22 7h-7" />
    <path d="M22 17h-7" />
    <path d="M15 7l-4.5 10" />
    <path d="M9.5 7 5 17" />
    <path d="M5 7h.01" />
    <path d="M19 17h.01" />
    <rect width="20" height="14" x="2" y="5" rx="2" />
  </svg>
);
