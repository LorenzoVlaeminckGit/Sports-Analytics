import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, Target, ShieldCheck } from 'lucide-react';

const mockChartData = [
  { date: '01/01', bankroll: 10000, clv: 2.1 },
  { date: '01/05', bankroll: 10250, clv: 2.3 },
  { date: '01/10', bankroll: 10100, clv: 1.9 },
  { date: '01/15', bankroll: 10450, clv: 2.5 },
  { date: '01/20', bankroll: 10800, clv: 2.6 },
  { date: '01/25', bankroll: 10650, clv: 2.4 },
  { date: '01/30', bankroll: 11200, clv: 2.8 },
];

export function Dashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">System Overview</h2>
        <p className="text-slate-400 text-sm">Quant-driven sports analytics intelligence and macro portfolio metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Bankroll', value: '$11,200', change: '+12.0%', icon: TrendingUp },
          { label: 'Avg CLV (30d)', value: '+2.8%', change: '+0.4%', icon: Target },
          { label: 'Avg Edge', value: '+3.1%', change: '-0.2%', icon: ArrowUpRight, bad: true },
          { label: 'Risk Status', value: 'Nominal', change: 'Seq < 0.5%', icon: ShieldCheck },
        ].map((stat, i) => (
          <div key={i} className="p-5 glass-card rounded-xl flex flex-col justify-between group transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <stat.icon size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-semibold text-white tracking-tight">{stat.value}</span>
              <span className={`text-xs font-mono ${stat.bad ? 'text-red-400' : 'text-emerald-400'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 glass-card rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">Bankroll Trajectory & CLV Drift</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBankroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace'}} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <YAxis yAxisId="right" orientation="right" stroke="#4b5563" tick={{fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace'}} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(8px)' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area yAxisId="left" type="monotone" dataKey="bankroll" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorBankroll)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 glass-card rounded-xl">
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Recent Execution Log</h3>
          <div className="space-y-0">
            {[
              { id: 'TRX-994', market: 'LAL @ GSW - Total', price: '-110', clv: '+1.2%', result: 'Pending' },
              { id: 'TRX-993', market: 'BOS @ MIA - Spread', price: '+105', clv: '-0.4%', result: 'Win' },
              { id: 'TRX-992', market: 'DEN @ PHX - Moneyline', price: '+140', clv: '+3.1%', result: 'Loss' },
            ].map(row => (
              <div key={row.id} className="data-row hover:bg-white/5">
                <div className="col-span-2 text-sm text-slate-300 truncate">{row.market}</div>
                <div className="col-span-1 text-sm font-mono text-slate-400">{row.price}</div>
                <div className={`col-span-1 text-sm font-mono ${row.clv.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{row.clv}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 glass-card rounded-xl">
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Efficiency Scanners</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">NBA Props Sentiment Drift</div>
                <div className="text-xs text-slate-500 font-mono">Signal: Noise ratio elevated due to late injury news.</div>
              </div>
              <div className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-mono tracking-widest uppercase rounded">High Variance</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">EPL Weather Impact (Tot)</div>
                <div className="text-xs text-slate-500 font-mono">Wind advantage modeled across 3 fixtures.</div>
              </div>
              <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase rounded">Actionable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
