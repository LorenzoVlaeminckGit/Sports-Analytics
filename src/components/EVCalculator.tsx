import React, { useState } from 'react';

export function EVCalculator() {
  const [odds, setOdds] = useState<string>('');
  const [prob, setProb] = useState<string>('');

  const calculateEV = () => {
    const o = parseFloat(odds);
    const p = parseFloat(prob) / 100;
    
    if (isNaN(o) || isNaN(p)) return null;

    let decimalOdds = 0;
    if (o > 0) {
      decimalOdds = (o / 100) + 1;
    } else if (o < 0) {
      decimalOdds = (100 / Math.abs(o)) + 1;
    } else {
      decimalOdds = o; // assume decimal if passed 0 (though technically invalid, just fallback)
    }

    const impliedProb = 1 / decimalOdds;
    const ev = (p * decimalOdds) - 1;
    const edge = p - impliedProb;

    return {
      impliedProb: (impliedProb * 100).toFixed(2),
      ev: (ev * 100).toFixed(2),
      edge: (edge * 100).toFixed(2),
      risk: edge > 0.05 ? 'High Value' : edge > 0 ? 'Moderate Edge' : 'No Value (Negative EV)'
    };
  };

  const results = calculateEV();

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Expected Value Calculator</h2>
        <p className="text-slate-400 text-sm">Calculate EV, edge, and implied probabilities based on model assumptions versus market lines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 glass-card rounded-xl drop-shadow-md">
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6">Market Inputs</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Market Odds (American)</label>
              <input
                type="number"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded px-4 py-2 font-mono text-white outline-none"
                placeholder="-110 or +150"
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Model Probability (%)</label>
              <input
                type="number"
                value={prob}
                onChange={(e) => setProb(e.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded px-4 py-2 font-mono text-white outline-none"
                placeholder="55"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="p-6 glass-card neon-glow-cyan rounded-xl drop-shadow-md flex flex-col justify-center">
          <h3 className="text-xs font-mono font-semibold neon-text-cyan uppercase tracking-widest mb-6 border-b border-cyan-400/20 pb-2">Analysis Output</h3>
          
          {results ? (
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <span className="text-slate-400 text-sm">Implied Probability</span>
                <span className="font-mono text-white">{results.impliedProb}%</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <span className="text-slate-400 text-sm">Expected Value (EV)</span>
                <span className={`font-mono ${parseFloat(results.ev) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {parseFloat(results.ev) > 0 ? '+' : ''}{results.ev}%
                </span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <span className="text-slate-400 text-sm">True Edge</span>
                <span className={`font-mono ${parseFloat(results.edge) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {parseFloat(results.edge) > 0 ? '+' : ''}{results.edge}%
                </span>
              </div>
              
              {/* Prominent Risk Classification */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 text-center">System Recommendation</span>
                <div className={`p-4 rounded-xl border flex items-center justify-center ${
                  results.risk === 'High Value' 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : results.risk === 'Moderate Edge'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <span className={`text-lg font-bold uppercase tracking-wider ${
                    results.risk === 'High Value' 
                      ? 'text-emerald-400' 
                      : results.risk === 'Moderate Edge'
                        ? 'text-amber-400'
                        : 'text-red-400'
                  }`}>
                    {results.risk}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">Awaiting valid inputs to compute Expected Value.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
