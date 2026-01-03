
import React, { useState, useEffect, useMemo } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

export interface Asset {
  id: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentValue: number;
}

const PortfolioTracker: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newBuy, setNewBuy] = useState('');
  const [newCurrent, setNewCurrent] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('omnisuccess_portfolio');
    if (saved) {
      try {
        setAssets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse portfolio", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('omnisuccess_portfolio', JSON.stringify(assets));
  }, [assets]);

  const addAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newQty || !newBuy || !newCurrent) return;

    const newAsset: Asset = {
      id: crypto.randomUUID(),
      name: newName,
      quantity: parseFloat(newQty),
      purchasePrice: parseFloat(newBuy),
      currentValue: parseFloat(newCurrent),
    };

    setAssets([...assets, newAsset]);
    setNewName('');
    setNewQty('');
    setNewBuy('');
    setNewCurrent('');
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const stats = useMemo(() => {
    const totalInvested = assets.reduce((acc, a) => acc + (a.purchasePrice * a.quantity), 0);
    const totalValue = assets.reduce((acc, a) => acc + (a.currentValue * a.quantity), 0);
    const totalGain = totalValue - totalInvested;
    const gainPercentage = totalInvested === 0 ? 0 : (totalGain / totalInvested) * 100;
    
    return { totalInvested, totalValue, totalGain, gainPercentage };
  }, [assets]);

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-500/60 mb-1">Total Value</p>
          <p className="text-3xl font-black text-white">${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-gray-300">${stats.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className={`p-6 rounded-3xl border ${stats.totalGain >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
          <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Total Gain/Loss</p>
          <p className={`text-2xl font-black ${stats.totalGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {stats.totalGain >= 0 ? '+' : ''}{stats.totalGain.toLocaleString(undefined, { minimumFractionDigits: 2 })} 
            <span className="text-sm ml-2 opacity-80">({stats.gainPercentage.toFixed(2)}%)</span>
          </p>
        </div>
      </div>

      {/* Asset Form */}
      <form onSubmit={addAsset} className="bg-gray-950/40 p-6 rounded-3xl border border-white/5 grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
        <div className="space-y-2 col-span-2 md:col-span-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50">Asset Name</label>
          <input 
            type="text" value={newName} onChange={e => setNewName(e.target.value)}
            className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            placeholder="e.g. BTC, AAPL"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50">Quantity</label>
          <input 
            type="number" step="any" value={newQty} onChange={e => setNewQty(e.target.value)}
            className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50">Buy Price</label>
          <input 
            type="number" step="any" value={newBuy} onChange={e => setNewBuy(e.target.value)}
            className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50">Current</label>
          <input 
            type="number" step="any" value={newCurrent} onChange={e => setNewCurrent(e.target.value)}
            className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
          />
        </div>
        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black py-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
          <PlusIcon className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Asset Table */}
      {assets.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-gray-950/20 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Asset</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Qty</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Purchase</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Current</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Gain/Loss</th>
                <th className="p-5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                const gain = (asset.currentValue - asset.purchasePrice) * asset.quantity;
                const gainPct = ((asset.currentValue - asset.purchasePrice) / asset.purchasePrice) * 100;
                return (
                  <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-5 font-bold text-white">{asset.name}</td>
                    <td className="p-5 text-right text-gray-400 font-mono">{asset.quantity}</td>
                    <td className="p-5 text-right text-gray-400 font-mono">${asset.purchasePrice.toFixed(2)}</td>
                    <td className="p-5 text-right text-emerald-300 font-mono">${asset.currentValue.toFixed(2)}</td>
                    <td className={`p-5 text-right font-black font-mono ${gain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {gain >= 0 ? '+' : ''}${Math.abs(gain).toFixed(2)}
                      <div className="text-[10px] opacity-60 font-medium">({gainPct.toFixed(2)}%)</div>
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => removeAsset(asset.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-2"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PortfolioTracker;
