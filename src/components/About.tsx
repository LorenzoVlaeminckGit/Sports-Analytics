import React from 'react';
import { MapPin, Target, Camera, Shield, Cpu, ExternalLink } from 'lucide-react';

export function About() {
  // Uses professional placeholders. To use the images provided in chat, 
  // users can upload them to the code files via File Explorer into a `public` folder.
  const profileImages = [
    "https://ui-avatars.com/api/?name=Lorenzo+Vlaeminck&background=0D8ABC&color=fff&size=512",
    "https://ui-avatars.com/api/?name=LV&background=0A0A0A&color=22d3ee&size=512",
    "https://ui-avatars.com/api/?name=Lorenzo&background=09090b&color=cbd5e1&size=512",
    "https://ui-avatars.com/api/?name=Vlaeminck&background=1e293b&color=38bdf8&size=512"
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
              src="https://ui-avatars.com/api/?name=Lorenzo+Vlaeminck&background=random&size=512" 
              alt="Lorenzo Vlaeminck" 
              className="relative w-48 h-48 rounded-2xl object-cover border border-white/10 shadow-2xl z-10"
            />
            <div className="absolute -bottom-3 -right-3 z-20 bg-black border border-cyan-500/30 text-cyan-400 p-2 rounded-lg">
              <Cpu size={20} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2 neon-text-cyan">
              Lorenzo Vlaeminck
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
