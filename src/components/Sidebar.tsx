import React from 'react';
import { CATEGORIES, MODULES } from '../constants';
import { clsx } from 'clsx';
import { Network, LogIn, LogOut, ChevronRight, Moon, Sun } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const { user, signIn, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <aside className="w-72 bg-black/40 backdrop-blur-xl border-r border-cyan-500/10 h-screen overflow-y-auto flex flex-col shrink-0 rounded-r-2xl shadow-[4px_0_24px_rgba(34,211,238,0.05)] z-10 relative">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50" />
      
      <div className="p-6 border-b border-white/5 flex items-center justify-between space-x-4 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-cyan-400 rounded-lg blur opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 relative z-10">
              <Network size={22} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <h1 className="font-sans font-bold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">SportsAnalytics OS</h1>
            <div className="flex items-center space-x-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">Quant Edition</p>
            </div>
          </div>
        </div>
        
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      
      <div className="flex-1 py-6 px-4 relative z-10 space-y-8">
        {CATEGORIES.map(category => {
          const categoryModules = MODULES.filter(m => m.category === category && m.id !== 'documentation');
          if (categoryModules.length === 0) return null;
          
          return (
          <div key={category} className="space-y-3">
            <div className="flex items-center space-x-2 px-2">
              <h2 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{category}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="space-y-1">
              {categoryModules.map(module => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={clsx(
                      "group w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all duration-300 text-sm relative overflow-hidden",
                      isActive 
                        ? "bg-cyan-500/10 text-cyan-300" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    )}
                    <div className="flex items-center space-x-3 relative z-10">
                      <Icon size={16} className={clsx(
                        "transition-all duration-300",
                        isActive ? "text-cyan-400 neon-text-cyan scale-110" : "opacity-70 group-hover:text-cyan-300"
                      )} />
                      <span className={clsx("font-medium tracking-tight truncate", isActive ? "font-semibold" : "")}>{module.name}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-cyan-400 opacity-70" />}
                  </button>
                )
              })}
            </div>
          </div>
        )})}
      </div>
      
      <div className="px-4 pb-4 relative z-10">
        <button
          onClick={() => setActiveModule('documentation')}
          className={clsx(
            "w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-all duration-300 text-sm border border-white/5",
            activeModule === 'documentation'
              ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" 
              : "bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-white/5"
          )}
        >
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={clsx("transition-all duration-300", activeModule === 'documentation' ? "text-cyan-400 neon-text-cyan scale-110" : "opacity-70")}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span className={clsx("font-medium tracking-tight", activeModule === 'documentation' ? "font-semibold" : "")}>Operator Manual</span>
          </div>
        </button>
      </div>
      
      <div className="p-5 mx-4 mb-4 rounded-xl glass-card border border-white/5 relative z-10 flex flex-col justify-center">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-lg shadow-cyan-500/20">
                {user.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate text-xs font-medium text-slate-200">{user.email}</div>
                <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-mono mt-0.5">Verified</div>
              </div>
            </div>
            <button onClick={logOut} className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors text-xs font-medium flex items-center justify-center gap-2 border border-white/5 hover:border-red-500/20 group">
              <LogOut size={14} className="group-hover:scale-110 transition-transform" /> Sign Out
            </button>
          </div>
        ) : (
          <button onClick={signIn} className="w-full py-2.5 px-4 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all text-xs font-semibold flex items-center justify-center gap-2 border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] group">
            <LogIn size={15} className="group-hover:scale-110 transition-transform" /> Authenticate
          </button>
        )}
      </div>
    </aside>
  );
}
