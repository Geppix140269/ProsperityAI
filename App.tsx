
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SuccessInputForm from './components/SuccessInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import PortfolioTracker from './components/PortfolioTracker';
import { generateSuccessPlan, SuccessPillar } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [pillar, setPillar] = useState<SuccessPillar>('wealth');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = useCallback(async (currentInput: string) => {
    if (!currentInput.trim()) {
      setError(`Please provide input for the ${pillar} pillar.`);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const plan = await generateSuccessPlan(currentInput, pillar);
      setResult(plan);
    } catch (e) {
      console.error(e);
      setError('Connection to the success engine failed. Please retry.');
    } finally {
      setIsLoading(false);
    }
  }, [pillar]);

  return (
    <div className="min-h-screen bg-[#05070a] text-gray-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Dynamic Glow Background */}
      <div className={`fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2 transition-colors duration-1000 ${
        pillar === 'wealth' ? 'bg-emerald-600/10' : pillar === 'business' ? 'bg-amber-600/10' : 'bg-indigo-600/10'
      }`}></div>
      
      <div className="relative z-10 flex flex-col items-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-5xl mx-auto space-y-12">
          <Header pillar={pillar} />
          
          <main className="space-y-12">
            <section className="bg-gray-900/40 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.6)] border border-white/5 transition-all duration-700 hover:border-emerald-500/20">
              <SuccessInputForm 
                value={input}
                setValue={setInput}
                pillar={pillar}
                setPillar={setPillar}
                onSubmit={handleProcess} 
                isLoading={isLoading} 
              />
            </section>

            {/* Pillar Specific Tooling: Portfolio Tracker */}
            {pillar === 'wealth' && (
              <section className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500/60">Portfolio Terminal</h2>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>
                <PortfolioTracker />
              </section>
            )}

            {error && (
              <div className="bg-red-950/20 border border-red-500/20 text-red-300 px-8 py-4 rounded-2xl text-center animate-pulse">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-10 py-16">
                <LoadingSpinner pillar={pillar} />
                <div className="text-center">
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300 animate-pulse uppercase tracking-widest">
                    Synthesizing Success...
                  </p>
                  <p className="text-gray-500 text-sm mt-3 tracking-widest uppercase">Connecting to OmniSuccess Core</p>
                </div>
              </div>
            )}

            {result && !isLoading && (
              <div className="mt-12">
                <ResultsDisplay markdownText={result} pillar={pillar} />
              </div>
            )}
          </main>
          
          <footer className="text-center text-gray-700 text-xs pt-16 uppercase tracking-[0.3em] font-bold">
            OmniSuccess AI &copy; {new Date().getFullYear()} • THE FUTURE OF PROSPERITY
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
