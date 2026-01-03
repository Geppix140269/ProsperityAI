
import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { UserIcon } from './icons/UserIcon';
import { BankIcon } from './icons/BankIcon';
import { SuccessPillar } from '../services/geminiService';

interface HeaderProps {
  pillar: SuccessPillar;
}

const Header: React.FC<HeaderProps> = ({ pillar }) => {
  const getIcon = () => {
    switch(pillar) {
      case 'wealth': return <BankIcon className="w-14 h-14 text-emerald-400" />;
      case 'cv': return <UserIcon className="w-14 h-14 text-indigo-400" />;
      case 'business': return <LightbulbIcon className="w-14 h-14 text-amber-400" />;
    }
  };

  const getTitle = () => {
    switch(pillar) {
      case 'wealth': return 'Wealth Strategist';
      case 'cv': return 'Career Architect';
      case 'business': return 'Startup Incubator';
    }
  };

  const getGradient = () => {
    switch(pillar) {
      case 'wealth': return 'from-emerald-300 via-emerald-500 to-amber-200';
      case 'cv': return 'from-indigo-300 via-indigo-500 to-purple-200';
      case 'business': return 'from-amber-200 via-amber-400 to-yellow-600';
    }
  };

  return (
    <header className="text-center space-y-6">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-110">
          {getIcon()}
        </div>
        <h1 className={`text-6xl sm:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br ${getGradient()} transition-all duration-700`}>
          {getTitle()}
        </h1>
      </div>
      <p className="mt-2 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
        {pillar === 'wealth' && 'Accelerate your path to financial freedom with AI-driven, high-margin strategies.'}
        {pillar === 'cv' && 'Transform your professional identity into a high-impact, high-value brand.'}
        {pillar === 'business' && 'Incubate raw sparks of inspiration into comprehensive startup blueprints.'}
      </p>
    </header>
  );
};

export default Header;
