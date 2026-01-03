
import React from 'react';
import { SuccessPillar } from '../services/geminiService';

interface LoadingSpinnerProps {
  pillar: SuccessPillar;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ pillar }) => {
  const getColor = () => {
    switch(pillar) {
      case 'wealth': return 'border-t-emerald-400';
      case 'cv': return 'border-t-indigo-400';
      case 'business': return 'border-t-amber-400';
    }
  };

  return (
    <div className="relative w-28 h-28">
      <div className="absolute inset-0 border-8 border-white/5 rounded-full"></div>
      <div className={`absolute inset-0 border-t-8 ${getColor()} rounded-full animate-spin shadow-[0_0_30px_rgba(52,211,153,0.3)]`}></div>
    </div>
  );
};

export default LoadingSpinner;
