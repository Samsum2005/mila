import React from 'react';
import { 
  User, 
  Activity
} from 'lucide-react';

// --- IMPORT THE LOGO HERE ---
import logo from './logo.png'; 

const Header = () => {
  return (
    // UPDATED BACKGROUND: Deep Violet to Indigo Gradient
    <header className="bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] text-white p-4 shadow-xl border-b border-indigo-500/30 sticky top-0 z-50">
      
      <div className="flex items-center justify-between">
        
        {/* --- RIGHT SIDE (Logo & Title) --- */}
        <div className="flex items-center gap-4">
          
          {/* 1. LOGO CONTAINER (UPDATED: Round & Focused) */}
          <div className="relative group">
            
            {/* Outer Glow (Updated to rounded-full) */}
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
            
            {/* Logo Image Container (Updated to rounded-full) */}
            <div className="relative w-14 h-14 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden transition-transform hover:scale-105 bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <img 
                    src={logo} 
                    alt="Sanad AI Logo" 
                    // UPDATED: object-cover fills the circle, removing extra background space
                    className="w-full h-full object-cover" 
                />
            </div>
          </div>

          {/* 2. Text Titles */}
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
              منصة سند <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">AI</span> للصحافة الذكية
            </h1>
            <p className="text-[11px] text-indigo-200/80 font-medium mt-0.5 tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              وزارة الاتصال • سلطة ضبط السمعي والبصري
            </p>
          </div>

        </div>

        {/* --- LEFT SIDE (Status & User) --- */}
        <div className="flex items-center gap-3">

          {/* 3. Green Status (APS Connection) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#059669]/10 border border-[#059669]/30 text-emerald-300 text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span>متصل ببث وكالة الأنباء</span>
          </div>

          {/* 4. Yellow Status (System Active) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Activity size={14} className="animate-pulse" />
            <span>النظام نشط</span>
          </div>

          {/* 5. Version Badge (Glass effect) */}
          <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-indigo-200 text-xs font-mono backdrop-blur-sm">
            نسخة تجريبية 1.0
          </div>

          {/* 6. User Profile */}
          <button className="relative group ml-2 pl-2 border-l border-indigo-500/30">
            <div className="w-10 h-10 rounded-full border-2 border-indigo-400/30 flex items-center justify-center bg-indigo-500/20 hover:bg-indigo-500/40 transition-all shadow-lg shadow-indigo-900/20">
              <User size={20} className="text-indigo-200" />
            </div>
            {/* Status dot */}
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#1e1b4b]"></span>
          </button>

        </div>

      </div>
    </header>
  );
};

export default Header;