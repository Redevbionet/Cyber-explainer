
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-700 rounded-md h-14 w-14"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="h-3 bg-slate-700 rounded"></div>
        <div className="h-3 bg-slate-700 rounded"></div>
        <div className="h-3 bg-slate-700 rounded w-5/6"></div>
      </div>
      <div className="flex justify-end mt-4">
        <div className="h-4 bg-slate-700 rounded w-28"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
