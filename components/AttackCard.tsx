
import React from 'react';
import type { Attack } from '../types';
import { ShareIcon } from './icons/ShareIcon';

interface AttackCardProps {
  attack: Attack;
  onSelect: (attack: Attack) => void;
  onShare: (attack: Attack) => void;
}

const AttackCard: React.FC<AttackCardProps> = ({ attack, onSelect, onShare }) => {
  const { title, Icon } = attack;

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(attack);
  };

  return (
    <div
      onClick={() => onSelect(attack)}
      className="attack-card bg-slate-800/50 rounded-lg p-6 border border-slate-700 cursor-pointer group hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex flex-col"
    >
      <div className="flex items-center space-x-4">
        <div className="relative flex-shrink-0">
          <div className="bg-slate-700/50 p-3 rounded-md group-hover:bg-cyan-400/10 transition-colors duration-300 peer">
            <Icon className="h-8 w-8 text-cyan-400" />
          </div>
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-950 text-slate-100 text-sm px-3 py-1.5 rounded-lg shadow-lg opacity-0 peer-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            role="tooltip"
          >
            {attack.title}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-950"></div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-slate-400 flex-grow">
        {attack.description.substring(0, 100)}...
      </p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleShareClick}
          className="flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors duration-200"
          aria-label={`Share ${title}`}
        >
          <ShareIcon className="w-4 h-4 mr-2" />
          แบ่งปัน
        </button>
        <span className="text-sm font-medium text-cyan-400 group-hover:underline">
          เรียนรู้เพิ่มเติม →
        </span>
      </div>
    </div>
  );
};

export default AttackCard;
