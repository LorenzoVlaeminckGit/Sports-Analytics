import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateAnalysisReport } from '../services/geminiService';
import { Loader2, Zap } from 'lucide-react';

export function OddsComparisonEngine() {
  const [event, setEvent] = useState('');
  const [sportsbooks, setSportsbooks] = useState('');
  const [odds, setOdds] = useState('');
  const [marketAverage, setMarketAverage] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const impliedProbability = useMemo(() => {
    const o = parseFloat(marketAverage);
    if (isNaN(o)) return null;
    
    let prob = 0;
    if (o > 0) {
      prob = 100 / (o + 100);
    } else if (o < 0) {
      prob = Math.abs(o) / (Math.abs(o) + 100);
    } else {
      return null;
    }
    return (prob * 100).toFixed(2);
  }, [marketAverage]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event.trim() || !sportsbooks.trim() || !odds.trim() || !marketAverage.trim()) return;

    setLoading(true);
    setResult(null);
    
    // Construct a structured prompt from the inputs
    const prompt = `Please run the Odds Comparison Engine for the following inputs:
Event: ${event}
Sportsbooks: ${sportsbooks}
Odds: ${odds}
Market Average Odds: ${marketAverage}
Implied Probability (Market Average): ${impliedProbability}%

Outputs required:
- Best available price
- Implied probability
- Market average
- Variance
- Outlier detection`;

    try {
      const data = await generateAnalysisReport(prompt, 'Odds Comparison Engine');
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult("Error generating analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-6 border-b border-white/5 shrink-0">
        <h2 className="text-xl font-semibold text-white mb-2">Odds Comparison Engine</h2>
        <p className="text-sm text-slate-400">
          Input market data to identify the best available price, implied probability, and market outliers.
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Data Inputs</h3>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Event / Matchup</label>
                <input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] font-mono transition-shadow placeholder:text-slate-600"
                  placeholder="e.g. RMA vs FCB"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Sportsbooks</label>
                <input
                  type="text"
                  value={sportsbooks}
                  onChange={(e) => setSportsbooks(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] font-mono transition-shadow placeholder:text-slate-600"
                  placeholder="e.g. Pinnacle, Bet365, AsianOdds"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Reported Odds</label>
                <textarea
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] font-mono transition-shadow placeholder:text-slate-600 h-24 resize-none"
                  placeholder="e.g. PIN: -110, B365: -105, ASIAN: -112"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">Market Average Odds</label>
                <input
                  type="text"
                  value={marketAverage}
                  onChange={(e) => setMarketAverage(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] font-mono transition-shadow placeholder:text-slate-600"
                  placeholder="e.g. -110"
                  disabled={loading}
                />
                {impliedProbability && (
                  <div className="mt-2 text-xs font-mono text-cyan-400 flex items-center justify-between">
                    <span>Implied Probability:</span>
                    <span className="font-bold">{impliedProbability}%</span>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !event.trim() || !sportsbooks.trim() || !odds.trim() || !marketAverage.trim()}
                  className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 px-6 py-3 rounded font-medium text-sm flex items-center justify-center space-x-2 hover:bg-cyan-500/20 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Zap size={16} />
                  )}
                  <span>{loading ? 'Running Quant Routines...' : 'Execute Comparison'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {result ? (
            <>
              {impliedProbability && (
                <div className="glass-card rounded-xl p-6 border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-between shrink-0">
                  <span className="text-sm font-mono font-semibold uppercase tracking-widest text-cyan-400">Market Implied Probability</span>
                  <span className="text-2xl font-bold tracking-tight text-white">{impliedProbability}%</span>
                </div>
              )}
              <div className="flex-1 glass-card rounded-xl p-6 overflow-auto">
                <h3 className="text-xs font-mono font-semibold neon-text-cyan uppercase tracking-widest mb-6 border-b border-cyan-400/20 pb-2">Analysis Output</h3>
                <div className="prose prose-invert prose-sm max-w-none 
                  prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-200
                  prose-a:text-cyan-400 prose-p:text-slate-300 prose-ul:text-slate-300
                  prose-th:text-slate-400 prose-th:font-mono prose-th:uppercase prose-th:text-xs
                  prose-td:font-mono prose-td:text-sm prose-td:text-slate-300
                  prose-table:border prose-table:border-white/10 prose-td:border-t prose-td:border-white/5">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full glass-card rounded-xl flex items-center justify-center text-center p-6 border border-white/5 border-dashed">
              <div className="max-w-md">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-slate-500" />
                </div>
                <h3 className="text-slate-200 font-medium mb-2">Awaiting Parameters</h3>
                <p className="text-slate-500 text-sm">
                  Provide event details, market makers, and odds above to generate the comparison report.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
