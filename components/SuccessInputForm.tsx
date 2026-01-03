
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { SuccessPillar } from '../services/geminiService';

interface SuccessInputFormProps {
  value: string;
  setValue: (val: string) => void;
  pillar: SuccessPillar;
  setPillar: (pillar: SuccessPillar) => void;
  onSubmit: (val: string) => void;
  isLoading: boolean;
}

const SuccessInputForm: React.FC<SuccessInputFormProps> = ({ value, setValue, pillar, setPillar, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 3-Way Mode Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-gray-950/80 rounded-[1.25rem] border border-white/5 shadow-inner">
          {(['wealth', 'business', 'cv'] as SuccessPillar[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPillar(p)}
              className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                pillar === p 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-950 shadow-[0_4px_20px_rgba(16,185,129,0.3)]' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {p === 'cv' ? 'Career' : p}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="input-field" className="block text-xs font-black uppercase tracking-[0.2em] text-emerald-500/80 px-1">
          Input Context
        </label>
        <textarea
          id="input-field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            pillar === 'wealth' ? "e.g., 'I have $5,000 and 5 hours a week' or 'Local automated landscaping business'..." :
            pillar === 'business' ? "e.g., 'An AI-powered app for tracking rare indoor plants'..." :
            "e.g., 'Marketing Lead with 7 years experience in tech, skilled in SEO and growth strategies'..."
          }
          className="w-full h-44 p-6 bg-gray-950/60 border-2 border-white/5 rounded-3xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-500 text-lg text-gray-200 placeholder-gray-700 resize-none shadow-2xl"
          disabled={isLoading}
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex items-center justify-center gap-4 px-10 py-5 border border-transparent text-xl font-black uppercase tracking-widest rounded-3xl text-gray-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-300 hover:from-emerald-300 hover:to-amber-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform active:scale-[0.98] shadow-[0_20px_40px_rgba(16,185,129,0.25)]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-7 w-7 text-gray-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing Potential...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-7 h-7 transition-transform group-hover:rotate-12" />
            <span>Generate {pillar} Edge</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SuccessInputForm;
