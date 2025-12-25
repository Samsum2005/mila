import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Moon, 
  LogOut, 
  Save,
  Scale,
  BookOpen,
  Cpu,
  AlertTriangle,
  ChevronRight,
  Eye,             // Added for accessibility icon
  Monitor          // Added for display icon
} from 'lucide-react';

const SettingsPage = () => {
  // --- 1. STATE MANAGEMENT ---
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  
  // Accessibility States
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // --- 2. FUNCTIONAL LOGIC (THE MAGIC) ---
  // This effect runs whenever the toggles change and applies CSS filters to the body
  useEffect(() => {
    const filters = [];
    
    if (isGrayscale) {
      filters.push('grayscale(100%)');
    }
    
    if (isHighContrast) {
      // 125% contrast + 110% brightness makes text pop against dark backgrounds
      filters.push('contrast(125%) brightness(110%)'); 
    }

    // Apply to the document body
    document.body.style.filter = filters.join(' ') || 'none';
    
    // Smooth transition
    document.body.style.transition = 'filter 0.5s ease';

    // Cleanup when leaving component (optional, keep if you want settings to persist)
    return () => {
      // document.body.style.filter = 'none'; 
    };
  }, [isGrayscale, isHighContrast]);

  return (
    <>
      {/* --- FORCE CAIRO FONT --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
          body, button, input, textarea, select, div, span, h1, h2, h3, h4, h5, h6, p, li {
            font-family: 'Cairo', sans-serif !important;
          }
        `}
      </style>

      <div className="min-h-screen bg-slate-950 text-slate-100 pb-12" dir="rtl">
        
        {/* --- Header --- */}
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
               {/* Avatar */}
               <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <User size={40} className="text-slate-500" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-white">تغيير</span>
                  </div>
               </div>

               {/* Inputs */}
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="الاسم الكامل" value="أنيس الجزائري" />
                  <InputGroup label="المسمى الوظيفي" value="صحفي أول" />
                  <InputGroup label="البريد الإلكتروني" value="anis@sanad-ai.dz" type="email" />
                  <InputGroup label="المؤسسة الإعلامية" value="جريدة الخبر" />
               </div>
            </div>
          </section>

          {/* --- SECTION 2: GRID FOR PREFERENCES --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* NEW SECTION: Accessibility (Live Preview) */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-white">
                <Eye size={20} className="text-purple-500" />
                العرض وإمكانيات الوصول
              </h2>
              <div className="space-y-4">
                 <ToggleRow 
                    label="تدرج رمادي (Grayscale)" 
                    active={isGrayscale} 
                    onClick={() => setIsGrayscale(!isGrayscale)} 
                 />
                 <ToggleRow 
                    label="تباين عالي (High Contrast)" 
                    active={isHighContrast} 
                    onClick={() => setIsHighContrast(!isHighContrast)} 
                 />
                 <div className="p-3 bg-slate-800/50 rounded-lg text-xs text-slate-400 leading-relaxed border border-slate-700/50">
                    <Monitor size={14} className="inline ml-1 mb-0.5" />
                    تساعد هذه الخيارات في تحسين القراءة للمستخدمين الذين يعانون من حساسية بصرية.
                 </div>
              </div>
            </section>

            {/* Notifications */}
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

          {/* Security Full Width */}
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

          {/* --- SECTION 3: COMMUNITY STANDARDS --- */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-3">
               <Scale className="text-indigo-400" size={24} />
               <div>
                  <h2 className="text-lg font-bold text-white">معايير المجتمع وأخلاقيات المهنة</h2>
                  <p className="text-xs text-slate-400 font-medium">وثيقة ملزمة لجميع مستخدمي منصة سند AI</p>
               </div>
            </div>

            <div className="p-8 space-y-8">
               
               {/* 1. Journalism Principles */}
               <div>
                  <h3 className="text-md font-bold text-indigo-400 mb-3 flex items-center gap-2">
                     <BookOpen size={18} />
                     المبادئ الأساسية للصحافة
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm font-medium leading-relaxed marker:text-indigo-500">
                     <li>الالتزام بالحقيقة والدقة في نقل الأخبار والمعلومات.</li>
                     <li>الموضوعية والحياد في التغطية الإخبارية.</li>
                     <li>احترام الخصوصية وحماية مصادر المعلومات.</li>
                     <li>التحقق من المعلومات قبل نشرها.</li>
                  </ul>
               </div>

               {/* 2. Legal Framework */}
               <div>
                  <h3 className="text-md font-bold text-indigo-400 mb-3 flex items-center gap-2">
                     <Scale size={18} />
                     الإطار القانوني
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm font-medium leading-relaxed marker:text-indigo-500">
                     <li>الامتثال لقوانين الصحافة والإعلام الجزائرية.</li>
                     <li>احترام قوانين حقوق النشر والملكية الفكرية.</li>
                     <li>الالتزام بلوائح سلطات ضبط الإعلام.</li>
                  </ul>
               </div>

               {/* 3. AI Responsibility */}
               <div>
                  <h3 className="text-md font-bold text-indigo-400 mb-3 flex items-center gap-2">
                     <Cpu size={18} />
                     استخدام الذكاء الاصطناعي بمسؤولية
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm font-medium leading-relaxed marker:text-indigo-500">
                     <li>الذكاء الاصطناعي أداة مساعدة وليس بديلاً عن الصحفي.</li>
                     <li>المراجعة البشرية إلزامية لجميع المحتويات الناتجة عن الذكاء الاصطناعي.</li>
                     <li>الشفافية في الإعلان عن استخدام أدوات الذكاء الاصطناعي.</li>
                     <li>عدم استخدام الذكاء الاصطناعي لنشر معلومات مضللة أو زائفة.</li>
                  </ul>
               </div>

               {/* 4. WARNING BLOCK */}
               <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex gap-4 items-start mt-6">
                  <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
                  <div>
                     <h4 className="font-bold text-red-500 mb-1">تنبيه هام</h4>
                     <p className="text-sm text-slate-300 leading-relaxed">
                        أي انتهاك لهذه المعايير قد يؤدي إلى <span className="text-white font-bold decoration-red-500 underline decoration-2">تعليق أو إلغاء حسابك</span> على منصة سند AI. للمزيد من المعلومات، يرجى الاتصال بوزارة الاتصال أو السلطات المعنية.
                     </p>
                  </div>
               </div>

            </div>
          </section>

          {/* --- Floating Save Button --- */}
          <div className="fixed bottom-6 left-6 z-40">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg shadow-indigo-600/30 font-bold flex items-center gap-2 transition-transform hover:-translate-y-1 active:scale-95">
                <Save size={20} />
                حفظ التغييرات
             </button>
          </div>

        </main>
      </div>
    </>
  );
};

/* --- Helper Components --- */

const InputGroup = ({ label, value, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-400">{label}</label>
    <input 
      type={type} 
      defaultValue={value}
      className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
    />
  </div>
);

const ToggleRow = ({ label, active, onClick }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-sm font-medium text-slate-300">{label}</span>
    <button 
      onClick={onClick}
      className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors duration-300 ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${active ? '-translate-x-5' : 'translate-x-0'}`}></div>
    </button>
  </div>
);

export default SettingsPage;