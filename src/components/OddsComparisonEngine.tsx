import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateAnalysisReport } from '../services/geminiService';
import { Loader2, Zap, Globe, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export function OddsComparisonEngine() {
  const [event, setEvent] = useState('');
  const [sportsbooks, setSportsbooks] = useState('');
  const [odds, setOdds] = useState('');
  const [marketAverage, setMarketAverage] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [fetchingOdds, setFetchingOdds] = useState(false);
  const [oddsError, setOddsError] = useState<string | null>(null);

  const fetchRealTimeOdds = async () => {
    const apiKey = import.meta.env.VITE_ODDS_API_KEY;
    if (!apiKey) {
      setOddsError('VITE_ODDS_API_KEY is not configured in the environment. Add it to .env to fetch live market data from The Odds API.');
      return;
    }

    setFetchingOdds(true);
    setOddsError(null);

    try {
      const res = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=${apiKey}&regions=eu,uk,us&markets=h2h&oddsFormat=american&limit=1`);
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (!data || data.length === 0) {
        throw new Error('No upcoming games found for EPL.');
      }

      const match = data[0];
      const matchupStr = `${match.home_team} vs ${match.away_team}`;
      setEvent(matchupStr);

      const bookmakersStr: string[] = [];
      const oddsLines: string[] = [];
      let totalOdds = 0;
      let oddsCount = 0;

      const homeTeam = match.home_team;

      match.bookmakers.forEach((bm: any) => {
        bookmakersStr.push(bm.title);
        const h2h = bm.markets?.find((m: any) => m.key === 'h2h');
        if (h2h) {
          const outcome = h2h.outcomes?.find((o: any) => o.name === homeTeam);
          if (outcome && outcome.price !== undefined) {
            oddsLines.push(`${bm.title}: ${outcome.price > 0 ? '+' : ''}${outcome.price}`);
            totalOdds += outcome.price;
            oddsCount++;
          }
        }
      });

      setSportsbooks(bookmakersStr.join(', '));
      setOdds(oddsLines.join('\n'));

      if (oddsCount > 0) {
        const avg = Math.round(totalOdds / oddsCount);
        setMarketAverage(`${avg > 0 ? '+' : ''}${avg}`);
      } else {
        setMarketAverage('');
      }

    } catch (err: any) {
      console.error(err);
      setOddsError(err.message || 'Failed to fetch live odds from The Odds API.');
    } finally {
      setFetchingOdds(false);
    }
  };

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

  const chartData = useMemo(() => {
    if (!odds) return [];
    const parts = odds.split(/[\n,]/).filter(p => p.trim());
    const parsedData = [];
    
    for (const part of parts) {
      const match = part.match(/(.+?):\s*([+-]?\d+(?:\.\d+)?)/);
      if (match) {
        let val = parseFloat(match[2]);
        let prob = 0;
        if (val > 0) prob = 100 / (val + 100);
        else if (val < 0) prob = Math.abs(val) / (Math.abs(val) + 100);

        parsedData.push({
          bookmaker: match[1].trim(),
          odds: val,
          impliedProb: prob * 100
        });
      }
    }
    
    return parsedData;
  }, [odds]);

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
- Outlier detection
- Specific Betting Angles (suggesting value based on identified market inefficiencies and best available odds)`;

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
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2">
              <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest m-0">Data Inputs</h3>
              <button 
                onClick={fetchRealTimeOdds}
                disabled={fetchingOdds}
                type="button"
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 text-xs rounded font-medium flex items-center space-x-1 transition-colors disabled:opacity-50"
              >
                {fetchingOdds ? <Loader2 size={12} className="animate-spin" /> : <Globe size={12} />}
                <span>{fetchingOdds ? 'Loading...' : 'Live Odds'}</span>
              </button>
            </div>
            
            {oddsError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded">
                <div className="flex space-x-2 items-start">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>{oddsError}</span>
                </div>
              </div>
            )}
            
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
          {chartData.length > 0 && (
             <div className="glass-card rounded-xl p-6 shrink-0 border border-white/5">
               <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Odds Distribution</h3>
               <div className="h-48 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                     <XAxis dataKey="bookmaker" stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                     <YAxis stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                     <RechartsTooltip 
                       contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(8px)' }}
                       itemStyle={{ color: '#e2e8f0' }}
                       formatter={(value: any, name: any) => [name === 'odds' ? (value > 0 ? `+${value}` : value) : `${value.toFixed(2)}%`, name === 'odds' ? 'Odds' : 'Implied Prob']}
                     />
                     <Bar dataKey="odds" name="odds" radius={[4, 4, 0, 0]}>
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.odds > 0 ? 'rgba(52, 211, 153, 0.8)' : 'rgba(251, 191, 36, 0.8)'} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             </div>
          )}

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
