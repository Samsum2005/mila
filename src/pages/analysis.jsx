import React, { useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Users, 
  Clock, 
  BarChart2, 
  ArrowUpRight, 
  Activity,
  Target,
  Share2,
  MoreHorizontal,
  PieChart
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <>
      {/* --- FONT LOADING & FORCING --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
          
          /* Apply Cairo to absolutely everything */
          body, button, input, textarea, select, div, span, h1, h2, h3, h4, h5, h6, p {
            font-family: 'Cairo', sans-serif !important;
          }
        `}
      </style>

      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 pb-10" dir="rtl">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <BarChart2 className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-wide">مركز التحليلات</span>
            </div>
            
            {/* Time Range Selector */}
            <div className="bg-slate-800/50 p-1 rounded-lg border border-slate-700 flex text-xs font-bold">
              {['يومي', 'أسبوعي', 'شهري'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range === 'يومي' ? 'day' : range === 'أسبوعي' ? 'week' : 'month')}
                  className={`px-4 py-1.5 rounded-md transition-all ${
                    (range === 'أسبوعي' && timeRange === 'week') || (range === 'يومي' && timeRange === 'day') || (range === 'شهري' && timeRange === 'month')
                    ? 'bg-slate-700 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">

          {/* --- SECTION 1: KPI CARDS (High Level Metrics) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard 
              title="نقاط الإنتاجية" 
              value="94%" 
              trend="+12%" 
              icon={<Zap size={20} />} 
              color="text-amber-400" 
              bg="bg-amber-500/10" 
              border="border-amber-500/20"
            />
            <KpiCard 
              title="جودة التأثير" 
              value="8.5/10" 
              trend="+0.4" 
              icon={<Target size={20} />} 
              color="text-cyan-400" 
              bg="bg-cyan-500/10" 
              border="border-cyan-500/20"
            />
            <KpiCard 
              title="الوقت الموفر" 
              value="14 ساعة" 
              trend="هذا الأسبوع" 
              icon={<Clock size={20} />} 
              color="text-emerald-400" 
              bg="bg-emerald-500/10" 
              border="border-emerald-500/20"
            />
            <KpiCard 
              title="التفاعل المتوقع" 
              value="1.2k" 
              trend="+8%" 
              icon={<Users size={20} />} 
              color="text-purple-400" 
              bg="bg-purple-500/10" 
              border="border-purple-500/20"
            />
          </div>

          {/* --- SECTION 2: VISUAL CHARTS --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Main Productivity Chart (Big Area) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-900/10 to-transparent pointer-events-none"></div>

               <div className="flex justify-between items-start mb-8 relative z-10">
                 <div>
                   <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     <TrendingUp size={18} className="text-cyan-400"/>
                     تحليل الأداء عبر الزمن
                   </h3>
                   <p className="text-slate-400 text-sm mt-1 font-medium">معدل إنجاز المهام باستخدام الذكاء الاصطناعي</p>
                 </div>
                 <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={20}/></button>
               </div>
               
               {/* CSS Bar Chart */}
               <div className="h-64 flex items-end justify-between gap-3 px-2 relative z-10">
                 {/* Generate Bars */}
                 {[45, 60, 50, 75, 55, 90, 70, 85, 65, 95, 80, 88].map((h, i) => (
                   <div key={i} className="w-full h-full flex items-end relative group/bar">
                     <div 
                       style={{ height: `${h}%` }} 
                       className="w-full rounded-t-md bg-gradient-to-t from-slate-800 to-cyan-500 opacity-70 group-hover/bar:opacity-100 group-hover/bar:to-cyan-400 transition-all duration-300"
                     ></div>
                     {/* Tooltip */}
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded border border-slate-700 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg pointer-events-none transform translate-y-2 group-hover/bar:translate-y-0">
                       {h}% كفاءة
                     </div>
                   </div>
                 ))}
               </div>
               
               {/* X-Axis Labels (UPDATED: Steps of 2 months) */}
               <div className="flex justify-between text-slate-500 text-xs font-bold mt-4 px-2">
                 <span>يناير</span>
                 <span>مارس</span>
                 <span>مايو</span>
                 <span>يوليو</span>
                 <span>سبتمبر</span>
                 <span>نوفمبر</span>
               </div>
            </div>

            {/* 2. Influence Radar / Skills (Right Side) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                  <Activity size={18} className="text-purple-400"/>
                  تحليل جودة المحتوى
                </h3>
                
                <div className="space-y-6">
                  <SkillBar label="وضوح الرسالة" percentage={92} color="bg-emerald-500" />
                  <SkillBar label="الجاذبية العاطفية" percentage={78} color="bg-pink-500" />
                  <SkillBar label="تحسينات SEO" percentage={85} color="bg-blue-500" />
                  <SkillBar label="الإبداع والابتكار" percentage={65} color="bg-amber-500" />
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  <span className="text-emerald-400 font-bold block mb-1">💡 نصيحة للتحسين:</span>
                  محتواك يتمتع بوضوح عالٍ، لكن زيادة <span className="text-white border-b border-pink-500/50">الكلمات العاطفية</span> قد ترفع نسبة التفاعل 15%.
                </p>
              </div>
            </div>
          </div>

          {/* --- SECTION 3: DETAILED BREAKDOWN --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Efficiency Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
               <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                 <PieChart size={18} className="text-emerald-400"/>
                 أين وفرت الوقت هذا الشهر؟
               </h3>
               <div className="flex flex-col gap-4">
                 <TimeSaveItem title="توليد المقالات والنصوص" saved="4.5 ساعة" percent="35%" icon={<Zap className="text-yellow-400" size={18}/>} />
                 <TimeSaveItem title="البحث وجمع المصادر" saved="3.2 ساعة" percent="25%" icon={<Share2 className="text-blue-400" size={18}/>} />
                 <TimeSaveItem title="التلخيص وإعادة الصياغة" saved="2.1 ساعة" percent="15%" icon={<Activity className="text-purple-400" size={18}/>} />
               </div>
            </div>

            {/* Content Health / Plagiarism Check */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500/20 blur-[80px] rounded-full"></div>
               
               <div className="flex justify-between items-center mb-6 relative z-10">
                 <h3 className="text-lg font-bold text-white">صحة وسلامة المحتوى</h3>
                 <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20">ممتاز</span>
               </div>

               <div className="grid grid-cols-2 gap-4 relative z-10">
                 <div className="p-5 bg-slate-950/60 rounded-xl text-center border border-slate-800/50">
                   <div className="text-3xl font-bold text-emerald-400 mb-1">0%</div>
                   <div className="text-sm font-bold text-slate-400">انتحال نصي</div>
                 </div>
                 <div className="p-5 bg-slate-950/60 rounded-xl text-center border border-slate-800/50">
                   <div className="text-3xl font-bold text-blue-400 mb-1">98%</div>
                   <div className="text-sm font-bold text-slate-400">دقة لغوية</div>
                 </div>
                 
                 {/* Readability Score */}
                 <div className="col-span-2 p-5 bg-slate-950/60 rounded-xl flex items-center justify-between border border-slate-800/50">
                   <div className="text-sm font-bold text-slate-400">سهولة القراءة</div>
                   <div className="flex gap-1.5">
                     {[1,2,3,4,5].map(s => <div key={s} className="w-8 h-2.5 rounded-full bg-emerald-500 shadow shadow-emerald-500/50"></div>)}
                   </div>
                   <span className="text-emerald-400 font-bold text-sm">سهل جداً</span>
                 </div>
               </div>
            </div>

          </div>

        </main>
      </div>
    </>
  );
};

/* --- Sub-Components --- */

const KpiCard = ({ title, value, trend, icon, color, bg, border }) => (
  <div className={`p-5 rounded-2xl border ${border} bg-slate-900 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 group relative overflow-hidden`}>
    <div className={`absolute -right-6 -top-6 w-24 h-24 ${bg} rounded-full blur-2xl group-hover:bg-opacity-100 transition-all opacity-50`}></div>
    
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-slate-400 text-xs font-bold mb-2">{title}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <ArrowUpRight size={12} /> {trend}
          </span>
          <span className="text-slate-500">مقارنة بالشهر الماضي</span>
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center border ${border}`}>
        {icon}
      </div>
    </div>
  </div>
);

const SkillBar = ({ label, percentage, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-2 font-bold">
      <span className="text-slate-300">{label}</span>
      <span className="text-white">{percentage}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const TimeSaveItem = ({ title, saved, percent, icon }) => (
  <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-800 transition-colors cursor-default border border-transparent hover:border-slate-700/50 group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-slate-600 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-200">{title}</span>
        <span className="text-xs text-slate-500 font-medium">{percent} من إجمالي الوقت</span>
      </div>
    </div>
    <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
      +{saved}
    </span>
  </div>
);

export default AnalyticsPage;