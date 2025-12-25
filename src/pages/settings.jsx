import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  LogOut, 
  Save,
  Scale,
  BookOpen,
  Cpu,
  AlertTriangle,
  ChevronRight,
  Eye,
  Monitor,
  Database,   // Added for My Data icon
  Calendar,   // Added for Date icon
  ExternalLink // Added for link icon
} from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // --- MOCK DATA: Stocked Articles ---
  const [myArticles, setMyArticles] = useState([
    { id: 1, title: "مستقبل الذكاء الاصطناعي في الصحافة", date: "2025/05/10", type: "نشر", mode: "إنشاء" },
    { id: 2, title: "تحليل سوق الطاقة في الجزائر", date: "2025/05/08", type: "حفظ", mode: "بحث" },
    { id: 3, title: "ملخص مؤتمر التكنولوجيا العربي", date: "2025/05/05", type: "نشر", mode: "تلخيص" },
  ]);

  useEffect(() => {
    const filters = [];
    if (isGrayscale) filters.push('grayscale(100%)');
    if (isHighContrast) filters.push('contrast(125%) brightness(110%)'); 
    document.body.style.filter = filters.join(' ') || 'none';
    document.body.style.transition = 'filter 0.5s ease';
  }, [isGrayscale, isHighContrast]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
          body, button, input, textarea, select, div, span, h1, h2, h3, h4, h5, h6, p, li {
            font-family: 'Cairo', sans-serif !important;
          }
        `}
      </style>

      <div className="min-h-screen bg-slate-950 text-slate-100 pb-12" dir="rtl">
        
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-700 hover:text-white transition-colors">
                <ChevronRight size={20} />
             </div>
             <h1 className="text-xl font-bold">الإعدادات</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 pt-8 space-y-8">

          {/* --- SECTION 1: ACCOUNT SETTINGS --- */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-white">
              <User size={20} className="text-blue-500" />
              الملف الشخصي
            </h2>
            <div className="flex items-start gap-6">
               <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <User size={40} className="text-slate-500" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-white">تغيير</span>
                  </div>
               </div>
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="الاسم الكامل" value="أنيس الجزائري" />
                  <InputGroup label="المسمى الوظيفي" value="صحفي أول" />
                  <InputGroup label="البريد الإلكتروني" value="anis@sanad-ai.dz" type="email" />
                  <InputGroup label="المؤسسة الإعلامية" value="جريدة الخبر" />
               </div>
            </div>
          </section>

          {/* --- NEW SECTION: MY DATA (Articles History) --- */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Database size={20} className="text-indigo-400" />
                بياناتي ومسوداتي
              </h2>
              <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 font-bold">
                إجمالي العناصر: {myArticles.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-slate-500 text-xs border-b border-slate-800">
                    <th className="pb-3 font-bold">عنوان المقال</th>
                    <th className="pb-3 font-bold">التاريخ</th>
                    <th className="pb-3 font-bold">الأداة</th>
                    <th className="pb-3 font-bold">الحالة</th>
                    <th className="pb-3 font-bold text-center">الرابط</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {myArticles.map((article) => (
                    <tr key={article.id} className="group hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 text-sm font-medium text-slate-200">{article.title}</td>
                      <td className="py-4 text-sm text-slate-400 flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </td>
                      <td className="py-4">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {article.mode}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          article.type === 'نشر' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {article.type}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors border-t border-slate-800 pt-4">
              عرض سجل النشاط الكامل
            </button>
          </section>

          {/* --- SECTION 2: PREFERENCES --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-white">
                <Eye size={20} className="text-purple-500" />
                العرض وإمكانيات الوصول
              </h2>
              <div className="space-y-4">
                 <ToggleRow label="تدرج رمادي (Grayscale)" active={isGrayscale} onClick={() => setIsGrayscale(!isGrayscale)} />
                 <ToggleRow label="تباين عالي (High Contrast)" active={isHighContrast} onClick={() => setIsHighContrast(!isHighContrast)} />
                 <div className="p-3 bg-slate-800/50 rounded-lg text-xs text-slate-400 border border-slate-700/50">
                    <Monitor size={14} className="inline ml-1" />
                    تحسين القراءة بناءً على التفضيلات البصرية.
                 </div>
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-white">
                <Bell size={20} className="text-yellow-500" />
                التنبيهات
              </h2>
              <div className="space-y-4">
                 <ToggleRow label="إشعارات التطبيق" active={notifications} onClick={() => setNotifications(!notifications)} />
                 <ToggleRow label="إشعارات البريد الإلكتروني" active={false} onClick={() => {}} />
                 <ToggleRow label="تحديثات الأخبار العاجلة" active={true} onClick={() => {}} />
              </div>
            </section>
          </div>

          {/* Security */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-white">
                <Shield size={20} className="text-emerald-500" />
                الأمان والخصوصية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <ToggleRow label="المصادقة الثنائية (2FA)" active={twoFactor} onClick={() => setTwoFactor(!twoFactor)} />
                    <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-bold transition-colors">
                      تغيير كلمة المرور
                    </button>
                 </div>
                 <div className="flex items-end">
                    <button className="w-full py-2 text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                      <LogOut size={16} /> تسجيل الخروج
                    </button>
                 </div>
              </div>
            </section>

          {/* Community Standards */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-3">
               <Scale className="text-indigo-400" size={24} />
               <div>
                  <h2 className="text-lg font-bold text-white">معايير المجتمع وأخلاقيات المهنة</h2>
                  <p className="text-xs text-slate-400">وثيقة ملزمة لمستخدمي منصة سند AI</p>
               </div>
            </div>
            <div className="p-8 space-y-6">
               <EthicsBlock title="المبادئ الأساسية" icon={<BookOpen size={18}/>} items={["الحقيقة والدقة", "الموضوعية والحياد", "حماية المصادر"]} />
               <EthicsBlock title="المسؤولية التقنية" icon={<Cpu size={18}/>} items={["المراجعة البشرية إلزامية", "الشفافية في استخدام AI", "منع المعلومات المضللة"]} />
               <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex gap-4 items-start">
                  <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    أي انتهاك قد يؤدي إلى <span className="text-white font-bold underline">تعليق حسابك</span> فوراً.
                  </p>
               </div>
            </div>
          </section>

          <div className="fixed bottom-6 left-6 z-40">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg shadow-indigo-600/30 font-bold flex items-center gap-2 transition-transform hover:-translate-y-1">
                <Save size={20} /> حفظ التغييرات
             </button>
          </div>
        </main>
      </div>
    </>
  );
};

/* --- Helper Components --- */

const EthicsBlock = ({ title, icon, items }) => (
  <div>
    <h3 className="text-md font-bold text-indigo-400 mb-3 flex items-center gap-2">{icon}{title}</h3>
    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-indigo-500">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  </div>
);

const InputGroup = ({ label, value, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-400">{label}</label>
    <input type={type} defaultValue={value} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
  </div>
);

const ToggleRow = ({ label, active, onClick }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-sm font-medium text-slate-300">{label}</span>
    <button onClick={onClick} className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
      <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${active ? '-translate-x-5' : 'translate-x-0'}`}></div>
    </button>
  </div>
);

export default SettingsPage;
