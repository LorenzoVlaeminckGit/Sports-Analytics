import React from 'react';
import { Compass, Zap, BookOpen, Layers, LineChart, BarChart3, ScanSearch, CheckCircle2, Moon, ArrowRight } from 'lucide-react';

export function AppGuide() {
  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-8 pb-4 shrink-0 border-b border-white/5 bg-black/20">
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <Compass className="text-cyan-400" size={18} />
          </div>
          App Guide & Features
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-mono">
          Explore the core features, functions, and quick start guide for SportsAnalytics OS.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        {/* Quick Start Guide */}
        <section className="glass-card rounded-xl p-8 border border-white/5">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
            <Zap className="text-amber-400" size={20} />
            Quick Start Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/20 p-6 rounded-lg border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="text-3xl font-bold font-mono text-white/10 absolute -right-2 top-2">01</div>
              <h3 className="text-emerald-400 font-mono font-bold mb-2 uppercase text-sm tracking-widest relative z-10">Configure Environment</h3>
              <p className="text-slate-400 text-sm relative z-10">
                To fetch real-time market data across sportsbooks, set up your <span className="text-cyan-400">VITE_ODDS_API_KEY</span> in the <code>.env</code> file. Grab your key from The Odds API.
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="text-3xl font-bold font-mono text-white/10 absolute -right-2 top-2">02</div>
              <h3 className="text-emerald-400 font-mono font-bold mb-2 uppercase text-sm tracking-widest relative z-10">Analyze Inefficiencies</h3>
              <p className="text-slate-400 text-sm relative z-10">
                Head to the <strong>Market Efficiency Scanner</strong> to view pricing anomalies. Select the signals and click "Generate Report" to receive precise betting angles from the AI.
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="text-3xl font-bold font-mono text-white/10 absolute -right-2 top-2">03</div>
              <h3 className="text-emerald-400 font-mono font-bold mb-2 uppercase text-sm tracking-widest relative z-10">Compare & Calculate</h3>
              <p className="text-slate-400 text-sm relative z-10">
                Open the <strong>Odds Comparison Engine</strong>. Enter target bookmakers, fetch live odds, and review implied probabilities, odds distribution, and AI-identified outlier value.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Functions */}
        <section className="glass-card rounded-xl p-8 border border-white/5">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
            <Layers className="text-cyan-400" size={20} />
            Key Features & Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <ScanSearch className="text-emerald-400" size={16} />
                </div>
                <h3 className="text-white font-medium text-lg">Market Efficiency Scanner</h3>
              </div>
              <ul className="space-y-2 pl-11">
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>Identifies sporting inefficiencies, calculating EV magnitude and classifying risk (Actionable/Monitoring).</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>Synthesizes AI-powered detailed reports for selected inefficiencies.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>Generates actionable insights, concrete betting angles, and risk management guidelines.</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <BarChart3 className="text-cyan-400" size={16} />
                </div>
                <h3 className="text-white font-medium text-lg">Odds Comparison Engine</h3>
              </div>
              <ul className="space-y-2 pl-11">
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                  <span>Fetches live, real-time odds natively using The Odds API for targeted bookmakers.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                  <span>Visualizes the market with interactive odds distribution bar charts comparing bookmaker metrics.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                  <span>AI extraction yields implied probabilities, outlier detection, and value-based odds divergence mapping.</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <LineChart className="text-purple-400" size={16} />
                </div>
                <h3 className="text-white font-medium text-lg">CLV Tracker</h3>
              </div>
              <ul className="space-y-2 pl-11">
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                  <span>Maintains records of Closing Line Value (CLV) per bet for evaluation.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                  <span>Displays a detailed historical CLV trends chart to monitor continuous personal performance.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                  <span>Tracks Historical True Edge values over time using advanced variance analysis.</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Moon className="text-amber-400" size={16} />
                </div>
                <h3 className="text-white font-medium text-lg">System Utilities</h3>
              </div>
              <ul className="space-y-2 pl-11">
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <span><strong>Theme Management:</strong> Toggle seamlessly between precision Dark Mode for night sessions and clean Light Mode, instantly persisted to your device layout.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <span><strong>State Persistance:</strong> Retains active themes, sidebar contexts, and modular selections natively.</span>
                </li>
                <li className="text-slate-400 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <span><strong>AI Synthesis:</strong> Generative AI components utilize Gemini to craft real-time analytical reports on Game conditions and line tracking.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
