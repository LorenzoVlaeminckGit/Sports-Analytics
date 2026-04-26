import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateAnalysisReport } from '../services/geminiService';
import { Loader2, Send } from 'lucide-react';
import { MODULES } from '../constants';

export function GenerativeModule({ moduleId }: { moduleId: string }) {
  const module = MODULES.find(m => m.id === moduleId);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !module) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await generateAnalysisReport(prompt, module.name);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult("Error generating analysis.");
    } finally {
      setLoading(false);
    }
  };

  if (!module) return null;

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-semibold text-white mb-2">{module.name}</h2>
        <p className="text-sm text-slate-400">
          Enter event details or query below. The system will output a structured, analytical report.
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="animate-spin text-cyan-400" size={32} />
            <span className="font-mono text-sm text-slate-400 animate-pulse">Running OS routines...</span>
          </div>
        ) : result ? (
          <div className="max-w-4xl max-w-full">
            <div className="glass-card rounded-xl p-6 prose prose-invert prose-sm max-w-none 
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-200
              prose-a:text-cyan-400 prose-p:text-slate-300 prose-ul:text-slate-300
              prose-th:text-slate-400 prose-th:font-mono prose-th:uppercase prose-th:text-xs
              prose-td:font-mono prose-td:text-sm prose-td:text-slate-300
              prose-table:border prose-table:border-white/10 prose-td:border-t prose-td:border-white/5">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-md">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4">
                <module.icon size={24} className="text-slate-500" />
              </div>
              <h3 className="text-slate-200 font-medium mb-2">Awaiting Input</h3>
              <p className="text-slate-500 text-sm">
                Provide event names, timestamps, or context for the {module.name} to process.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <form onSubmit={handleGenerate} className="max-w-4xl mx-auto flex space-x-4">
          <input
            type="text"
            className="flex-1 bg-black/30 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] font-mono transition-shadow placeholder:text-slate-600"
            placeholder={
              module.id === 'market-efficiency'
                ? "e.g. Scan NFL Week 4 totals for weather-driven edge..."
                : module.id === 'trend-analyzer'
                ? "e.g. Analyze AST/TO ratio trends for Trae Young vs switch defenses..."
                : "e.g. Analysis for LAL vs GSW tonight focusing on injury impact..."
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 px-6 py-2 rounded font-medium text-sm flex items-center space-x-2 hover:bg-cyan-500/20 disabled:opacity-50 transition-colors"
          >
            <span>Run</span>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
