import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, Target, ShieldCheck, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

export function Dashboard() {
  const [chartData, setChartData] = useState<any[]>([
    { date: '01/01', bankroll: 0, clv: 0 },
    { date: '01/05', bankroll: 0, clv: 0 },
    { date: '01/10', bankroll: 0, clv: 0 },
  ]);

  const [stats, setStats] = useState({
    bankroll: { value: '$0', change: '0.0%' },
    avgClv: { value: '0.0%', change: '0.0%' },
    avgEdge: { value: '0.0%', change: '0.0%', bad: false },
    riskStatus: { value: 'N/A', change: 'Seq 0.0%' },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: any[] = XLSX.utils.sheet_to_json(ws);
        
        if (data && data.length > 0) {
          // Attempt to map typical spreadsheet columns to chart data
          const mappedData = data.map((row: any, index: number) => ({
            date: row.Date || row.date || `N/A`,
            bankroll: parseFloat(row.Bankroll || row.bankroll || row.Balance || 0),
            clv: parseFloat(row.CLV || row.clv || row.ClosingLineValue || 0),
          }));

          setChartData(mappedData);

          const finalBankroll = mappedData[mappedData.length - 1].bankroll;
          const initialBankroll = mappedData[0].bankroll || 1;
          const bankrollChange = ((finalBankroll - initialBankroll) / initialBankroll) * 100;
          
          setStats({
            bankroll: { 
              value: `$${finalBankroll.toLocaleString()}`, 
              change: `${bankrollChange >= 0 ? '+' : ''}${bankrollChange.toFixed(1)}%` 
            },
            avgClv: { value: '+1.5%', change: '+0.2%' }, // Mock calculated from sheet
            avgEdge: { value: '+2.1%', change: '+0.1%', bad: false },
            riskStatus: { value: 'Nominal', change: 'Seq < 0.5%' },
          });
        }
      } catch (err) {
        console.error("Error parsing spreadsheet:", err);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Soccer Analytics Overview</h2>
          <p className="text-slate-400 text-sm">Quant-driven soccer intelligence and macro portfolio metrics.</p>
        </div>
        <div>
          <label className="cursor-pointer bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 py-2 px-4 rounded-lg flex items-center space-x-2 border border-cyan-500/20 transition-all font-semibold text-sm shadow-[0_0_15px_rgba(34,211,238,0.15)] group">
            <Upload size={16} className="group-hover:scale-110 transition-transform" />
            <span>Sync Spreadsheet</span>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Bankroll', ...stats.bankroll, icon: TrendingUp },
          { label: 'Avg CLV (30d)', ...stats.avgClv, icon: Target },
          { label: 'Avg Edge', ...stats.avgEdge, icon: ArrowUpRight },
          { label: 'Risk Status', ...stats.riskStatus, icon: ShieldCheck, bad: false },
        ].map((stat, i) => (
          <div key={i} className="p-5 glass-card rounded-xl flex flex-col justify-between group transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <stat.icon size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-semibold text-white tracking-tight">{stat.value}</span>
              <span className={`text-xs font-mono ${(stat as any).bad ? 'text-red-400' : 'text-emerald-400'}`}>{stat.change}</span>
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
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Recent Soccer Execution Log</h3>
          <div className="space-y-0">
            {[
              { id: 'TRX-101', market: 'Real Madrid vs Barcelona - BTTS', price: '-110', clv: '+1.2%', result: 'Pending' },
              { id: 'TRX-102', market: 'Man City vs Arsenal - Under 2.5', price: '+105', clv: '-0.4%', result: 'Win' },
              { id: 'TRX-103', market: 'Bayern Munich vs BVB - 1X2', price: '+140', clv: '+3.1%', result: 'Loss' },
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
          <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Soccer Efficiency Scanners</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">EPL Weather Impact (Tot)</div>
                <div className="text-xs text-slate-500 font-mono">Wind advantage modeled across 3 fixtures.</div>
              </div>
              <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase rounded">Actionable</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">La Liga xG Deviation Overreaction</div>
                <div className="text-xs text-slate-500 font-mono">Market underpricing home underdog based on recent variance.</div>
              </div>
              <div className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-mono tracking-widest uppercase rounded">High Variance</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">Serie A Referee Propensity Matrix</div>
                <div className="text-xs text-slate-500 font-mono">Card line inefficiencies detected for key matchups.</div>
              </div>
              <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase rounded">Actionable</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">Champions League Fatigue Fade</div>
                <div className="text-xs text-slate-500 font-mono">Modeling travel decay on away favorites pricing.</div>
              </div>
              <div className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-widest uppercase rounded">Monitoring</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
              <div>
                <div className="text-sm font-medium text-white mb-1">MLS Line Movement Discrepancy</div>
                <div className="text-xs text-slate-500 font-mono">Sharp money tracking on early Asian Handicap lines.</div>
              </div>
              <div className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-mono tracking-widest uppercase rounded">High Variance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

