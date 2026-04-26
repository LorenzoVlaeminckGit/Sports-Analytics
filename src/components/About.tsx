import React from 'react';
import { MapPin, Target, Camera, Shield, Cpu, ExternalLink, Network, Facebook, Mail, TrendingUp } from 'lucide-react';

export function About() {
  // Uses professional placeholders. To use the images provided in chat, 
  // users can upload them to the code files via File Explorer into a `public` folder.
  const profileImages = [
    "reference-images/Lorenzo Vlaeminck Profile Picture (1).png", // Lorenzo Vlaeminck
    "reference-images/Lorenzo Vlaeminck Profile Picture (2).png", // Dark tech style
    "reference-images/Lorenzo Vlaeminck Profile Picture (7).png", // Neon pink/blue
    "reference-images/Lorenzo Vlaeminck Profile Picture (6).png"  // Neon night
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-auto space-y-8 pb-20">
      
      {/* Header Profile Section */}
      <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.05)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
          {/* Main Profile Picture */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src="reference-images/Lorenzo Vlaeminck Profile Picture (3).png" 
              alt="Lorenzo Vlaeminck" 
              className="relative w-48 h-48 rounded-2xl object-cover border border-white/10 shadow-2xl z-10"
            />
            <div className="absolute -bottom-3 -right-3 z-20 bg-black border border-cyan-500/30 text-cyan-400 p-2 rounded-lg">
              <Cpu size={20} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2 neon-text-cyan flex items-center gap-3 justify-center md:justify-start">
              Lorenzo Vlaeminck
              <span className="flex h-3 w-3 relative ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </h1>
            <p className="text-cyan-400 font-mono tracking-widest uppercase mb-8 flex items-center justify-center md:justify-start gap-2">
              <Shield size={16} /> Lead System Operator
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-4 text-slate-300 bg-black/40 p-5 rounded-xl border border-white/5 transition-colors hover:bg-black/60">
                <MapPin className="text-cyan-400 mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-2 text-xs uppercase tracking-widest opacity-80">Origin Coordinates</h3>
                  <p className="leading-relaxed font-mono text-sm">
                    De Wallaart 2 B6<br />
                    8680 Koekelare<br />
                    BE
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-slate-300 bg-black/40 p-5 rounded-xl border border-white/5 transition-colors hover:bg-black/60">
                <Target className="text-cyan-400 mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-2 text-xs uppercase tracking-widest opacity-80">System Role</h3>
                  <p className="leading-relaxed font-sans text-sm text-slate-400">
                    Lead Quant Analyst & System Architecture Manager for Sports Analytics OS. Managing core algorithms and edge detection parameters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offer CTA Banner */}
      <div className="pt-2 pb-4">
        <a 
          href="https://72e65vplecwr0u0-r-5odsaoez.hop.clickbank.net"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full overflow-hidden rounded-2xl border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500 group"
        >
          <img 
            src="reference-images/goal-predictor.gif" 
            alt="Goal Predictor - Special Offer" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </a>
      </div>

      {/* Network Connections */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Network className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-bold text-white tracking-tight">Network Connections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="https://facebook.com/thereallorenzovlaeminck" target="_blank" rel="noopener noreferrer" className="group flex items-center p-5 bg-black/40 border border-white/5 rounded-xl hover:border-blue-500/50 hover:bg-black/60 transition-all duration-300">
            <div className="bg-[#1877F2]/20 p-3 rounded-lg mr-4 group-hover:bg-[#1877F2]/30 transition-colors">
              <Facebook className="text-[#1877F2]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Facebook Network</h3>
              <p className="text-sm text-slate-400 font-mono flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                @thereallorenzovlaeminck <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </a>

          <a href="mailto:Social.LorenzoVlaeminck@gmail.com" className="group flex items-center p-5 bg-black/40 border border-white/5 rounded-xl hover:border-emerald-500/50 hover:bg-black/60 transition-all duration-300">
            <div className="bg-emerald-500/20 p-3 rounded-lg mr-4 group-hover:bg-emerald-500/30 transition-colors">
              <Mail className="text-emerald-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Direct Secure Line</h3>
              <p className="text-sm text-slate-400 font-mono flex items-center gap-1 group-hover:text-emerald-400 transition-colors truncate max-w-[180px]" title="Social.LorenzoVlaeminck@gmail.com">
                Social.LorenzoVlaeminck... <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Secondary Special Offer CTA */}
      <div className="pt-2 pb-4">
        <a 
          href="https://9f0f21jipqxpetawmm0ci12uej.hop.clickbank.net"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border border-emerald-500/40 rounded-2xl p-8 relative overflow-hidden group hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-full bg-emerald-500/10 blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                  <TrendingUp className="text-emerald-400" size={28} />
                  How to make £427.02 this weekend
                </h3>
                <p className="text-emerald-200/90 text-lg mb-1 font-medium">Land one bet make profit (its that simple)</p>
                <p className="text-emerald-400/60 font-mono text-sm uppercase tracking-wider mt-2">Weekend Premier League Bets</p>
              </div>
              <div className="shrink-0">
                <span className="bg-emerald-500 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 group-hover:bg-emerald-400 group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  Get Access Now <ExternalLink size={20} />
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Gallery Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Camera className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-bold text-white tracking-tight">Identity Gallery</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {profileImages.map((src, idx) => (
            <div key={idx} className="group relative rounded-xl overflow-hidden bg-black/40 border border-white/5 aspect-square cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300 pointer-events-none" />
              <img 
                src={src} 
                alt={`Lorenzo Vlaeminck Profile ${idx + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-black/80 px-2 py-1 rounded backdrop-blur-md">Record 0{idx + 1}</span>
                <ExternalLink size={14} className="text-white/50" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
