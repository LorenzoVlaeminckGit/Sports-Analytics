import React, { useState } from 'react';
import { ScanSearch, AlertTriangle, TrendingUp, Activity, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateAnalysisReport } from '../services/geminiService';

const MOCK_INEFFICIENCIES = [
  { id: 1, sport: 'Soccer', league: 'EPL', match: 'Aston Villa vs Brentford', market: 'Total Goals Over 3.5', magnitude: '+4.2% EV', description: 'Significant weather impact (high winds) not fully priced into Asian books.', risk: 'High Variance' },
  { id: 2, sport: 'Soccer', league: 'La Liga', match: 'Sevilla vs Valencia', market: 'Asian Handicap +0.5 Valencia', magnitude: '+2.8% EV', description: 'Sevilla xG regression indicated, key midfield absence not adequately reflected.', risk: 'Actionable' },
  { id: 3, sport: 'Soccer', league: 'Serie A', match: 'Juventus vs Torino', market: 'Cards Over 4.5', magnitude: '+5.1% EV', description: 'Derby match with strict referee assigned. Historical data suggests massive card rate.', risk: 'Actionable' },
  { id: 4, sport: 'Soccer', league: 'Champions League', match: 'PSG vs Bayern', market: 'BTTS - No', magnitude: '+1.5% EV', description: 'Defensive formations heavily imply lower scoring, but public money pushing BTTS - Yes higher.', risk: 'Monitoring' },
];

export function MarketEfficiencyScanner() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const generateReport = async () => {
    if (selectedIds.length === 0) return;
    
    setLoading(true);
    setReport(null);
    
    const selectedItems = MOCK_INEFFICIENCIES.filter(item => selectedIds.includes(item.id));
    const prompt = `Generate a detailed market efficiency report for the following identified inefficiencies:\n\n${selectedItems.map(i => `- ${i.league}: ${i.match} | Market: ${i.market} | EV: ${i.magnitude} | Reason: ${i.description}`).join('\n')}\n\nPlease provide specific actionable insights, concrete betting angles, and risk management recommendations for each of these inefficiencies.`;

    try {
      const result = await generateAnalysisReport(prompt, "Market Efficiency Scanner");
      setReport(result);
    } catch (e) {
      console.error(e);
      setReport("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-8 pb-4 shrink-0 border-b border-white/5">
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <ScanSearch className="text-cyan-400" size={18} />
          </div>
          Market Efficiency Scanner
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-mono">Real-time detection of pricing anomalies and market inefficiencies across global soccer leagues.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Identified Inefficiencies List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400 font-mono">Identified Inefficiencies</h2>
            <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded font-mono border border-cyan-500/20">{MOCK_INEFFICIENCIES.length} signals found</span>
          </div>
          
          <div className="space-y-3">
            {MOCK_INEFFICIENCIES.map(item => (
              <div 
                key={item.id} 
                onClick={() => toggleSelection(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedIds.includes(item.id) ? 'bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'glass-card border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={() => {}}
                      className="rounded border-white/20 bg-black/50 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{item.league}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{item.market}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${item.magnitude.includes('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {item.magnitude}
                  </span>
                </div>
                <h3 className="text-white font-medium mb-1">{item.match}</h3>
                <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                <div className="flex">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded ${
                    item.risk === 'Actionable' ? 'bg-emerald-500/10 text-emerald-400' : 
                    item.risk === 'High Variance' ? 'bg-amber-500/10 text-amber-400' : 
                    'bg-slate-500/10 text-slate-400'
                  }`}>
                    {item.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={generateReport}
            disabled={selectedIds.length === 0 || loading}
            className="w-full mt-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? <Activity className="animate-spin" size={18} /> : <FileText size={18} />}
            <span>Generate Detailed Report ({selectedIds.length} selected)</span>
          </button>
        </div>

        {/* Detailed Report Panel */}
        <div className="glass-card rounded-xl border border-white/5 flex flex-col h-[calc(100vh-200px)]">
          <div className="p-4 border-b border-white/5 bg-black/20">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400 font-mono flex items-center gap-2">
              <TrendingUp size={16} />
              AI Synthesized Report
            </h2>
          </div>
          <div className="p-6 flex-1 overflow-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Activity className="animate-spin text-cyan-400" size={32} />
                <span className="font-mono text-sm text-slate-400 animate-pulse">Synthesizing market data...</span>
              </div>
            ) : report ? (
              <div className="prose prose-invert prose-sm max-w-none 
                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-200
                prose-a:text-cyan-400 prose-p:text-slate-300 prose-ul:text-slate-300
                prose-th:text-slate-400 prose-th:font-mono prose-th:uppercase prose-th:text-xs
                prose-td:font-mono prose-td:text-sm prose-td:text-slate-300
                prose-table:border prose-table:border-white/10 prose-td:border-t prose-td:border-white/5">
                <ReactMarkdown>{report}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-4">
                <AlertTriangle size={32} className="opacity-20" />
                <p className="text-sm">Select inefficiencies and generate a report to see deep algorithmic analysis.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
