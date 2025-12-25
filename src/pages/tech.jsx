import React from 'react';
import { 
  Cpu, 
  Zap, 
  Layers, 
  BookOpen, 
  Type, 
  Wand2, 
  Image as ImageIcon,
  FileText, 
  BarChart, 
  RefreshCw,
  MessageSquare, 
  Hash, 
  Users, 
  Link, 
  GitCompare, 
  History, 
  Search, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle2, 
  Settings, 
  AlignLeft, 
  PieChart, 
  Video
} from 'lucide-react';

const TechPage = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
          
          body, button, input, textarea, select, div, span, h1, h2, h3, h4, h5, h6, p {
            font-family: 'Cairo', sans-serif !important;
          }
          .font-mono {
            font-family: 'JetBrains Mono', monospace !important;
          }
        `}
      </style>

      <div className="min-h-screen bg-slate-950 text-slate-100 pb-12" dir="rtl">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-wide">التقنيات والنماذج</span>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-bold text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-8 space-y-12">

          {/* --- SECTION 1: THE CORE (Active Model) --- */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            {/* Background Tech Mesh */}
            <div className="absolute inset-0 opacity-20" 
                 style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px'}}>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
               <div className="lg:col-span-2 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                     <Zap size={14} /> الإصدار 2.1 (مُحسن للصحافة)
                  </div>
                  <h1 className="text-4xl font-black text-white leading-tight">
                     Sanad-Pro <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500">Neural Core</span>
                  </h1>
                  <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                     النموذج اللغوي الأحدث المخصص للبيئة الجزائرية والعربية. يتميز بفهم عميق للهجات المحلية (الدارجة)، دقة عالية في التحقق من الحقائق، وسرعة استجابة فائقة.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                     <StatBox label="نافذة السياق" value="128K Token" />
                     <StatBox label="تاريخ المعرفة" value="Dec 2025" />
                     <StatBox label="دقة اللهجات" value="99.4%" />
                  </div>
               </div>

               <div className="flex justify-center">
                  <div className="w-48 h-48 relative">
                     <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20 animate-pulse"></div>
                     <div className="relative z-10 w-full h-full bg-slate-950/80 border border-slate-700 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Cpu size={64} className="text-cyan-400" />
                        <div className="absolute top-0 left-0 w-full h-full animate-spin-slow rounded-full border-t border-cyan-500/30"></div>
                        <div className="absolute top-2 left-2 w-[92%] h-[92%] animate-spin-reverse rounded-full border-b border-indigo-500/30"></div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* --- SECTION 2: SPECIALIZED TOOLS --- */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <Layers size={28} className="text-indigo-400" />
               أدوات المعالجة المتخصصة
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               {/* 1. News Writing (Highlight Removed) */}
               <ToolCard 
                  title="كتابة الأخبار السريعة"
                  subtitle="تحويل البيانات إلى قصص صحفية احترافية"
                  icon={<Zap size={24} className="text-amber-200" />}
                  iconBg="bg-amber-600"
                  // highlight={true} <--- REMOVED THIS LINE
                  glowClass="hover:border-amber-500/60 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] hover:bg-slate-900/80"
                  actions={[
                    { icon: <FileText size={16} />, text: "تلخيص التقارير الطويلة" },
                    { icon: <BarChart size={16} />, text: "تحويل البيانات إلى صحافة البيانات" },
                    { icon: <RefreshCw size={16} />, text: "إعادة صياغة الأخبار" }
                  ]}
               />

               {/* 2. Content Creation */}
               <ToolCard 
                  title="إنشاء محتوى متنوع"
                  subtitle="مقالات رأي، تغريدات، وملخصات"
                  icon={<Layers size={24} className="text-purple-200" />}
                  iconBg="bg-purple-600"
                  glowClass="hover:border-purple-500/60 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] hover:bg-slate-900/80"
                  actions={[
                    { icon: <MessageSquare size={16} />, text: "مقالات الرأي والتحليل" },
                    { icon: <Hash size={16} />, text: "منشورات وسائل التواصل" },
                    { icon: <Users size={16} />, text: "ملخصات المؤتمرات والبيانات" }
                  ]}
               />

               {/* 3. Search & Verify */}
               <ToolCard 
                  title="البحث والتحقق الذكي"
                  subtitle="مصادر موثوقة وسياق شامل"
                  icon={<BookOpen size={24} className="text-emerald-200" />}
                  iconBg="bg-emerald-600"
                  glowClass="hover:border-emerald-500/60 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] hover:bg-slate-900/80"
                  actions={[
                    { icon: <Link size={16} />, text: "اقتراح مصادر موثوقة" },
                    { icon: <GitCompare size={16} />, text: "مقارنة المصادر المتعددة" },
                    { icon: <History size={16} />, text: "توليد السياق التاريخي" }
                  ]}
               />

               {/* 4. Headlines */}
               <ToolCard 
                  title="عناوين جذابة"
                  subtitle="توليد عناوين احترافية وملفتة"
                  icon={<Type size={24} className="text-orange-200" />}
                  iconBg="bg-orange-600"
                  glowClass="hover:border-orange-500/60 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] hover:bg-slate-900/80"
                  actions={[
                    { icon: <Search size={16} />, text: "عناوين محسنة ل SEO" },
                    { icon: <Lightbulb size={16} />, text: "اقتراحات عناوين بديلة" },
                    { icon: <TrendingUp size={16} />, text: "عناوين فيروسية" }
                  ]}
               />

               {/* 5. Style Improvement */}
               <ToolCard 
                  title="تحسين الأسلوب"
                  subtitle="تدقيق لغوي وتحسين النبرة"
                  icon={<Wand2 size={24} className="text-pink-200" />}
                  iconBg="bg-pink-600"
                  glowClass="hover:border-pink-500/60 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)] hover:bg-slate-900/80"
                  actions={[
                    { icon: <CheckCircle2 size={16} />, text: "تدقيق إملائي ونحوي" },
                    { icon: <Settings size={16} />, text: "ضبط نبرة الأسلوب" },
                    { icon: <AlignLeft size={16} />, text: "تبسيط اللغة" }
                  ]}
               />

               {/* 6. Media Help */}
               <ToolCard 
                  title="المساعدة في الوسائط"
                  subtitle="صور، رسوم بيانية، وفيديو"
                  icon={<ImageIcon size={24} className="text-cyan-200" />}
                  iconBg="bg-cyan-600"
                  glowClass="hover:border-cyan-500/60 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:bg-slate-900/80"
                  actions={[
                    { icon: <ImageIcon size={16} />, text: "اقتراحات الصور والإنفوجرافيك" },
                    { icon: <PieChart size={16} />, text: "توليد رسوم بيانية مبسطة" },
                    { icon: <Video size={16} />, text: "اقتراحات مقاطع الفيديو" }
                  ]}
               />

            </div>
          </div>

        </main>
      </div>
    </>
  );
};

/* --- SUB COMPONENTS --- */

const StatBox = ({ label, value }) => (
  <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-center">
    <div className="text-slate-500 text-xs font-bold mb-1">{label}</div>
    <div className="text-white font-bold font-mono text-sm tracking-tight">{value}</div>
  </div>
);

const ToolCard = ({ title, subtitle, icon, actions, iconBg, highlight, glowClass }) => (
  // The logic below ensures that if 'highlight' is false/undefined, the border is slate-800 (Grey)
  <div className={`relative bg-slate-900 border ${highlight ? 'border-amber-500/40 shadow-[0_0_20px_-10px_rgba(245,158,11,0.15)]' : 'border-slate-800'} rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 group ${glowClass}`}>
     
     <div className="flex justify-between items-start mb-6">
        <div>
           <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">{title}</h3>
           <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{subtitle}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${iconBg}`}>
           {icon}
        </div>
     </div>

     <div className="space-y-3">
        {actions.map((action, idx) => (
           <button 
             key={idx}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200 text-right group-hover:border-slate-700"
           >
              <span className="text-slate-500 group-hover:text-current transition-colors">
                {action.icon}
              </span>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {action.text}
              </span>
           </button>
        ))}
     </div>
  </div>
);

export default TechPage;