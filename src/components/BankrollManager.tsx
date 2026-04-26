import React, { useState } from 'react';

export function BankrollManager() {
  const [bankroll, setBankroll] = useState('10000');
  const [kellyFraction, setKellyFraction] = useState('0.25'); // Quarter Kelly
  const [edge, setEdge] = useState('2.5');
  const [odds, setOdds] = useState('-110');

  const calculateExposure = () => {
    const b = parseFloat(bankroll);
    const k = parseFloat(kellyFraction);
    const e = parseFloat(edge) / 100;
    const o = parseFloat(odds);

    if (isNaN(b) || isNaN(k) || isNaN(e) || isNaN(o)) return null;

    let decimalOdds = 0;
    if (o > 0) {
      decimalOdds = (o / 100) + 1;
    } else if (o < 0) {
      decimalOdds = (100 / Math.abs(o)) + 1;
    } else {
      decimalOdds = 2; // fallback
    }

    const b_p = decimalOdds - 1; // proportion of bet gained with a win
    const p = (e + 1) / decimalOdds; // probability of winning
    const q = 1 - p; // probability of losing

    // Kelly criterion format: f* = (bp - q) / b
    const f_star = (b_p * p - q) / b_p;
    
    // Apply fraction multiplier (e.g., quarter kelly)
    const suggestedFraction = f_star * k;
    const exposureAmount = Math.max(0, b * suggestedFraction);
    const percentExposure = Math.max(0, suggestedFraction * 100);

    return {
      percent: percentExposure.toFixed(2),
      amount: exposureAmount.toFixed(2),
      risk: percentExposure > 5 ? 'Extreme' : percentExposure > 2 ? 'High' : percentExposure > 0.5 ? 'Moderate' : 'Conservative'
    };
  };

  const results = calculateExposure();

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Bankroll Exposure Manager</h2>
        <p className="text-slate-400 text-sm">Calculate optimal position sizing using Fractional Kelly criterion principles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 glass-card rounded-xl drop-shadow-md">
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6">Portfolio Parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Total Bankroll ($)</label>
              <input
                type="number"
                value={bankroll}
                onChange={(e) => setBankroll(e.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded px-4 py-2 font-mono text-white outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Assumed Edge (%)</label>
              <input
                type="number"
                value={edge}
                onChange={(e) => setEdge(e.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded px-4 py-2 font-mono text-white outline-none"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Market Odds (American)</label>
              <input
                type="number"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded px-4 py-2 font-mono text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Kelly Multiplier (0.25 = Quarter)</label>
              <input
                type="number"
                value={kellyFraction}
                onChange={(e) => setKellyFraction(e.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded px-4 py-2 font-mono text-white outline-none"
                step="0.05"
              />
            </div>
          </div>
        </div>

        <div className="p-6 glass-card neon-glow-cyan rounded-xl drop-shadow-md flex flex-col justify-center">
          <h3 className="text-xs font-mono font-semibold neon-text-cyan uppercase tracking-widest mb-6 border-b border-cyan-400/20 pb-2">Exposure Profile</h3>
          
          {results ? (
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <span className="text-slate-400 text-sm">Recommended Sizing</span>
                <span className="font-mono text-white text-xl">${results.amount}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <span className="text-slate-400 text-sm">Bankroll Impact</span>
                <span className="font-mono text-white">{results.percent}%</span>
              </div>
              <div className="pt-2">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Risk Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold uppercase border ${
                  results.risk === 'Conservative' ? 'bg-black/30 text-slate-300 border-white/5' :
                  results.risk === 'Moderate' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20' :
                  results.risk === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {results.risk}
                </span>
                
                {parseFloat(results.percent) > 2 && (
                  <p className="mt-4 text-xs text-red-400 max-w-sm">
                    Warning: Recommended exposure exceeds 2% threshold. Consider adjusting Kelly multiplier or re-evaluating edge assumptions to mitigate ruin sequence probability.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">Awaiting inputs to compute portfolio exposure.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
