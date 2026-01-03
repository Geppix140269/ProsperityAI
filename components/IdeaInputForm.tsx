
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
// Corrected import to use SuccessPillar instead of non-existent IncubatorMode
import { SuccessPillar } from '../services/geminiService';

interface IdeaInputFormProps {
  value: string;
  setValue: (val: string) => void;
  // Updated type from IncubatorMode to SuccessPillar to resolve compilation error
  mode: SuccessPillar;
  // Updated type from IncubatorMode to SuccessPillar to resolve compilation error
  setMode: (mode: SuccessPillar) => void;
  onSubmit: (val: string) => void;
  isLoading: boolean;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({ value, setValue, mode, setMode, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-gray-800 rounded-xl border border-gray-700">
          <button
            type="button"
            onClick={() => setMode('business')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'business' ? 'bg-amber-500 text-gray-900 shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Startup Blueprint
          </button>
          <button
            type="button"
            onClick={() => setMode('cv')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'cv' ? 'bg-amber-500 text-gray-900 shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Career Catalyst
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="input-field" className="block text-sm font-bold uppercase tracking-widest text-amber-500/80">
          {mode === 'business' ? 'The Innovation Seed' : 'Your Professional Profile'}
        </label>
        <p className="text-xs text-gray-500 italic">
          {mode === 'business' 
            ? 'Describe your business idea in detail.' 
            : 'Paste your current bio, key skills, or career goals.'}
        </p>
      </div>
      
      <textarea
        id="input-field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={mode === 'business' 
          ? "e.g., 'An app for tracking rare indoor plants'..." 
          : "e.g., '5 years in digital marketing, expert in SEO and Python, looking to transition into FinTech'..."}
        className="w-full h-40 p-5 bg-gray-950/80 border-2 border-gray-800 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-gray-200 placeholder-gray-700 resize-none shadow-inner"
        disabled={isLoading}
      />
      
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-amber-900/20"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-6 h-6 transition-transform group-hover:rotate-12" />
            <span>{mode === 'business' ? 'Refine My Idea' : 'Catalyze My Career'}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default IdeaInputForm;
