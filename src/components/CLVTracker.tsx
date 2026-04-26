import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Activity } from 'lucide-react';

const clvData = [
  { date: '01/01', currentCLV: 2.1, expectedCLV: 1.8 },
  { date: '01/05', currentCLV: 2.3, expectedCLV: 1.9 },
  { date: '01/10', currentCLV: 1.9, expectedCLV: 2.0 },
  { date: '01/15', currentCLV: 2.5, expectedCLV: 2.1 },
  { date: '01/20', currentCLV: 2.6, expectedCLV: 2.2 },
  { date: '01/25', currentCLV: 2.4, expectedCLV: 2.3 },
  { date: '01/30', currentCLV: 2.8, expectedCLV: 2.4 },
  { date: '02/05', currentCLV: 3.1, expectedCLV: 2.5 },
  { date: '02/10', currentCLV: 2.9, expectedCLV: 2.6 },
  { date: '02/15', currentCLV: 3.4, expectedCLV: 2.7 },
  { date: '02/20', currentCLV: 3.2, expectedCLV: 2.8 },
  { date: '02/25', currentCLV: 3.6, expectedCLV: 2.9 },
];

export function CLVTracker() {
  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-semibold text-white mb-2">Customer Lifetime Value (CLV) Tracker</h2>
        <p className="text-sm text-slate-400">
          Historical CLV trends and expected versus actual closing line value performance over time.
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Current Avg CLV', value: '+3.6%', change: '+0.4%', icon: TrendingUp, positive: true },
            { label: 'Expected CLV', value: '+2.9%', change: '+0.1%', icon: Target, positive: true },
            { label: 'Variance', value: '+0.7%', change: '+0.3%', icon: Activity, positive: true },
          ].map((stat, i) => (
            <div key={i} className="p-5 glass-card rounded-xl flex flex-col justify-between group transition-colors border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</span>
                <stat.icon size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-semibold text-white tracking-tight">{stat.value}</span>
                <span className={`text-xs font-mono ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 glass-card rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">Historical CLV Trends</h3>
            <div className="flex space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Actual CLV</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400">Expected CLV</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clvData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace'}} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value: any) => [`${value}%`]}
                />
                <Area type="monotone" dataKey="expectedCLV" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorExpected)" name="Expected CLV" />
                <Area type="monotone" dataKey="currentCLV" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" name="Actual CLV" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
