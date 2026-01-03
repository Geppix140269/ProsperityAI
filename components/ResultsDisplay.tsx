
import React, { useMemo } from 'react';
import { SuccessPillar } from '../services/geminiService';

interface ResultsDisplayProps {
  markdownText: string;
  pillar: SuccessPillar;
}

const parseMarkdown = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactElement[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-4 mb-8 pl-4 text-gray-300">
          {listItems.map((item, index) => (
            <li key={`li-${index}`} className="marker:text-emerald-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  lines.forEach((line, index) => {
    line = line.trim();
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-300 font-bold">$1</strong>');

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-2xl font-black text-emerald-400 mt-12 mb-6 uppercase tracking-widest border-b border-white/5 pb-3">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) inList = true;
      listItems.push(line.substring(2));
    } else if (line) {
      flushList();
      elements.push(<p key={index} className="mb-6 text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: line }} />);
    }
  });

  flushList();
  return elements;
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ markdownText, pillar }) => {
  const content = useMemo(() => parseMarkdown(markdownText), [markdownText]);

  return (
    <div className="bg-gray-900/60 backdrop-blur-3xl p-10 sm:p-16 rounded-[3rem] shadow-3xl border border-white/5 animate-[fadeIn_0.6s_ease-out]">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-white/5 pb-8 gap-4">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-amber-300 uppercase tracking-tighter">
          {pillar === 'wealth' ? 'Wealth Blueprint' : pillar === 'business' ? 'Innovation Blueprint' : 'Strategic Career Edge'}
        </h2>
        <div className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-[0.6rem] font-black uppercase tracking-[0.2em]">
          Priority Execution Required
        </div>
      </div>
      <div className="prose prose-invert max-w-none">
         {content}
      </div>
      <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center gap-6">
        <p className="text-sm text-gray-500 italic text-center max-w-md">Optimized for passive scalability and maximum ROI. For individuals up to age 65.</p>
        <button 
          onClick={() => window.print()} 
          className="px-10 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-emerald-500 text-xs font-black uppercase tracking-widest transition-all duration-300"
        >
          Export Success Strategy
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
