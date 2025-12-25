import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Menu, Brain, ShieldCheck, FileText, Database, 
  TrendingUp, Activity, Settings, 
  Shield, CheckCircle2, ChevronFirst, ChevronLast 
} from 'lucide-react';

// --- IMPORT THE LOGO HERE ---
import logo from './logo.png';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { id: "AI News", label: "الذكاء الإخباري", icon: <Brain size={20} />, path: "/first" },
    { id: "Check", label: "التحقق من الأخبار", icon: <ShieldCheck size={20} />, path: "/check" },
    { id: "Content", label: "توليد المحتوى", icon: <FileText size={20} />, path: "/content" },
    { id: "Data", label: "مختبر البيانات", icon: <Database size={20} />, path: "/data" },
    { id: "Analysis", label: "تحليل التأثير", icon: <TrendingUp size={20} />, path: "/analysis" },
    { id: "Tech", label: "بنية تقنية", icon: <Activity size={20} />, path: "/tech" },
    { id: "Settings", label: "الإعدادات", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <aside 
      className={`h-screen transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col sticky top-0 border-l border-slate-200/60
      ${expanded ? "w-72" : "w-20"}
      bg-white/95 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] z-50
      `}
    >
      
      {/* --- HEADER --- */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-slate-100">
        
        {/* LOGO SECTION (Replaced Brain Icon) */}
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${expanded ? "w-48 opacity-100" : "w-0 opacity-0"}`}>
            
            {/* Logo Image Container - Round & Focused */}
            <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
               <img 
                 src={logo} 
                 alt="Sanad AI Logo" 
                 className="w-full h-full object-cover" 
               />
            </div>

            {/* Title Text */}
            <div className="flex flex-col">
                <span className="font-black text-xl text-slate-800 leading-none">سند <span className="text-indigo-600">AI</span></span>
            </div>
        </div>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all duration-300"
        >
           {expanded ? <ChevronFirst size={24} /> : <ChevronLast size={24} />}
        </button>
      </div>

      {/* --- MENU ITEMS --- */}
      <ul className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center w-full p-3.5 rounded-2xl transition-all duration-300 group overflow-hidden
                ${isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" // Active State
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900" // Normal State
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Bar (Stylish Side Line) */}
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full bg-indigo-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Icon */}
                  <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span 
                    className={`relative z-10 overflow-hidden transition-all duration-500 whitespace-nowrap mr-4 font-bold text-sm
                    ${expanded ? "w-48 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-10"}
                    `}
                  >
                    {item.label}
                  </span>

                  {/* Floating Tooltip (Only when collapsed) */}
                  {!expanded && (
                    <div className="absolute right-[120%] mr-2 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50">
                      {item.label}
                      {/* Little triangle pointer for the tooltip */}
                      <div className="absolute top-1/2 -right-1 -mt-1 border-4 border-transparent border-l-slate-900"></div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* --- FOOTER (Glassmorphism Card) --- */}
      <div className="p-4 border-t border-slate-100">
        <div className={`
            relative overflow-hidden rounded-2xl transition-all duration-500
            ${expanded ? "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4" : "bg-transparent p-0 flex justify-center"}
        `}>
            {expanded ? (
                <>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <Shield size={18} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-xs">حالة النظام</h4>
                            <p className="text-[10px] text-emerald-600 font-bold">آمن ومتوافق 100%</p>
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        {["تدخل بشري", "أخلاقيات", "شفافية"].map((txt, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-semibold text-slate-500">{txt}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-emerald-500 hover:bg-emerald-50 transition-colors cursor-help" title="الحالة الأخلاقية: آمن">
                    <Shield size={20} />
                </div>
            )}
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;