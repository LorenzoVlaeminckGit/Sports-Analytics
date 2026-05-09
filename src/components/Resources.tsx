import React from 'react';
import { ExternalLink, Wrench, Smartphone, Lightbulb, Users, Youtube, Newspaper, Bookmark } from 'lucide-react';

const RESOURCES = [
  {
    category: "Tools & Calculators",
    icon: Wrench,
    items: [
      { name: "Pinnacle Odds Converter", url: "https://www.pinnacle.com/en/betting-resources/betting-tools/odds-converter", desc: "Industry standard odds conversion and implied probability." },
      { name: "Unabated Sports", url: "https://unabated.com/", desc: "Tools for sharp bettors including line simulators and closing line value calculators." },
      { name: "OddsJam", url: "https://oddsjam.com/", desc: "Arbitrage and +EV betting tools and software." }
    ]
  },
  {
    category: "Data Platforms & Apps",
    icon: Smartphone,
    items: [
      { name: "SofaScore", url: "https://www.sofascore.com/", desc: "Live scores, statistics, and detailed player ratings." },
      { name: "FotMob", url: "https://www.fotmob.com/", desc: "Essential app for global soccer scores and stats." },
      { name: "FBref", url: "https://fbref.com/", desc: "In-depth football statistics and history including xG data." },
      { name: "Flashscore", url: "https://www.flashscore.com/", desc: "Lightning fast live scores and deeper historical context." }
    ]
  },
  {
    category: "Communities & Forums",
    icon: Users,
    items: [
      { name: "r/sportsbook", url: "https://www.reddit.com/r/sportsbook/", desc: "The largest sports betting community on Reddit." },
      { name: "Punters Lounge", url: "https://www.punterslounge.com/", desc: "UK-focused betting community and forum." },
      { name: "BettingAdvice Forum", url: "https://forum.bettingadvice.com/", desc: "Long-standing forum for serious sports bettors." }
    ]
  },
  {
    category: "Newsletters & Blogs",
    icon: Newspaper,
    items: [
      { name: "The Quant Jocks", url: "https://thequantjocks.com/", desc: "Deep dives into quantitative sports betting." },
      { name: "Pinnacle Betting Resources", url: "https://www.pinnacle.com/en/betting-resources/", desc: "Educational articles from sharpness-orientated bookmaker." },
      { name: "Nassim Taleb's Writings", url: "https://medium.com/incerto", desc: "General concepts on probability, risk, and variance." }
    ]
  },
  {
    category: "YouTube Channels",
    icon: Youtube,
    items: [
      { name: "Trademate Sports", url: "https://www.youtube.com/c/TrademateSports", desc: "Value betting software and educational content." },
      { name: "Captain Odds", url: "https://www.youtube.com/", desc: "Mathematical sports betting approach." },
      { name: "SofaScore YouTube", url: "https://www.youtube.com/", desc: "Visualizing stats and trends in sports." }
    ]
  },
  {
    category: "Tipsters & Predictions",
    icon: Lightbulb,
    items: [
      { name: "Blogabet", url: "https://blogabet.com/", desc: "Platform for verified tipsters and betting networks." },
      { name: "Pyckio", url: "https://pyckio.com/", desc: "Sports betting rating platform with PRO tipsters." },
      { name: "BetAlytics", url: "https://betalytics.com/", desc: "AI and machine learning powered predictions." }
    ]
  }
];

export function Resources() {
  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-8 pb-4 shrink-0 border-b border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-end">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Bookmark className="text-cyan-400" size={18} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-white mb-0">Betting Resources</h1>
            </div>
            <p className="text-slate-400 text-sm max-w-2xl font-mono mt-2">
              Curated directories of essential tools, data platforms, communities, and educational materials 
              for quantitative sports betting.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="glass-card rounded-xl border border-white/5 p-6 flex flex-col hover:border-white/10 transition-colors">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/5">
                  <div className="bg-slate-800/50 p-2 rounded-lg text-cyan-400">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">{section.category}</h2>
                </div>
                
                <div className="space-y-5 flex-1">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block outline-none">
                        <div className="flex justify-between items-start mb-1 group-hover:text-cyan-400 transition-colors">
                          <h3 className="text-sm font-medium text-slate-200 group-hover:text-cyan-400">{item.name}</h3>
                          <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400 mt-1 flex-shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{item.desc}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 p-6 glass-card rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-transparent">
          <div className="flex items-start space-x-4">
            <div className="bg-cyan-500/20 p-3 rounded-xl">
              <Lightbulb className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Methodology Note</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                This repository is constantly updated with resources that align with <span className="text-cyan-300">quantitative and value-oriented</span> betting strategies. 
                We do not endorse tipsters or services that sell guaranteed returns or fail to track closing line value. Treat all external models and tipsters as supplementary data points alongside your own analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
