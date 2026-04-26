import React from 'react';
import { CATEGORIES, MODULES } from '../constants';
import { clsx } from 'clsx';
import { Network, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const { user, signIn, logOut } = useAuth();
  
  return (
    <aside className="w-64 bg-black/20 border-r border-white/5 h-screen overflow-y-auto flex flex-col shrink-0">
      <div className="p-4 border-b border-white/5 flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <Network size={20} />
        </div>
        <div>
          <h1 className="font-sans font-semibold text-sm tracking-wide text-white">SportsAnalytics OS</h1>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Quant Edition</p>
        </div>
      </div>
      
      <div className="flex-1 py-4">
        {CATEGORIES.map(category => (
          <div key={category} className="mb-6">
            <h2 className="px-4 mb-2 font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{category}</h2>
            <div className="space-y-0.5">
              {MODULES.filter(m => m.category === category).map(module => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={clsx(
                      "w-full text-left px-4 py-2 flex items-center space-x-3 transition-colors text-sm",
                      isActive 
                        ? "bg-cyan-500/10 text-cyan-400 border-l-[3px] border-cyan-400" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-[3px] border-transparent"
                    )}
                  >
                    <Icon size={16} className={clsx(isActive ? "text-cyan-400" : "opacity-70")} />
                    <span className="font-medium tracking-tight truncate">{module.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-white/5">
        {user ? (
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <div className="truncate text-xs">{user.email}</div>
            <button onClick={logOut} className="flex items-center gap-2 hover:text-white transition-colors">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        ) : (
          <button onClick={signIn} className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            <LogIn size={16} /> Sign in
          </button>
        )}
      </div>
    </aside>
  );
}
