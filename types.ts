
import type React from 'react';

export interface Attack {
  id: string;
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  threat: string;
  mitigation: string[];
}
