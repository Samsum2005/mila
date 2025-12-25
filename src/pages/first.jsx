import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import { Sparkles, Activity, Signal, Shield, FileText, CheckCircle2, Award, Users, MessageCircle } from 'lucide-react';
import robotImage from './image.png'; 

const First = () => {
  // 2. Initialize the navigation hook
  const navigate = useNavigate();

  return (
    // جعلنا الحاوية الرئيسية قابلة للتمرير (overflow-y-auto)
    <div className="relative w-full h-full overflow-y-auto bg-slate-900 font-sans no-scrollbar">
      
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-screen">
          {/* الصورة الخلفية */}
          <div className="absolute inset-0 z-0">
            <img 
              src={robotImage} 
              alt="AI Robot Hand" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* طبقة التعتيم */}
          <div className="absolute inset-0 z-10 bg-[#0a1432]/70"></div>

          {/* المحتوى - متمركز في الوسط */}
          <div className="relative z-20 flex h-full flex-col justify-center items-center px-4 text-center">
            
            <div className="max-w-3xl space-y-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              
              {/* الشارة مع الأيقونة */}
              <div className="flex justify-center">
                <span className="flex items-center gap-2 rounded-full bg-blue-900/40 border border-blue-400/30 px-4 py-1.5 text-sm font-bold text-blue-100 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                   <Sparkles size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                   الذكاء الاصطناعي في الصحافة
                </span>
              </div>

              {/* العنوان */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white drop-shadow-2xl">
                مستقبل الصحافة <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                  بتقنيات الذكاء المتقدم
                </span>
              </h1>

              {/* الفقرة */}
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed mx-auto max-w-xl font-medium drop-shadow-md">
                منصة <span className="text-blue-400 font-bold">سند AI</span> تجمع بين دقة الخوارزميات والخبرة البشرية لتقديم تجربة صحفية تفاعلية
              </p>

              {/* الأزرار */}
              <div className="pt-6 flex flex-wrap justify-center gap-4">
                
                {/* 3. Updated Button: Navigate to Content Page */}
                <button 
                  onClick={() => navigate('/content')}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-3 text-lg font-bold text-white hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  ابدأ الآن
                </button>
                
                {/* 4. Updated Button: Navigate to Analysis Page */}
                <button 
                  onClick={() => navigate('/analysis')}
                  className="rounded-xl px-8 py-3 text-lg font-bold text-white border border-blue-400/30 hover:bg-blue-900/30 transition-all backdrop-blur-sm cursor-pointer"
                >
                  شاهد العرض
                </button>
              </div>

            </div>
          </div>
      </div>

      {/* ================= NEW SECTION: INTELLIGENCE DASHBOARD ================= */}
      <div className="relative z-20 px-6 md:px-16 lg:px-24 py-16 bg-[#0a1432]" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                      <Activity className="text-blue-400" size={32} />
                      لوحة القيادة: حالة تدفق البيانات
                  </h2>
                  <p className="text-gray-300 mt-2">اتصالات مباشرة بالمصادر الرسمية والجهات الرقابية</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full font-bold text-sm border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  متصل بالشبكة
              </div>
          </div>

          {/* Top Cards Grid (Data Sources) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              {/* Card 1: APS */}
              <DashboardCard 
                  icon={<Signal size={28} className="text-yellow-400" />}
                  title="وكالة الأنباء الجزائرية"
                  subtitle="APS - المصدر الأساسي"
                  accentColor="yellow"
              >
                  <InfoRow label="معدل التدفق" value="247 خبر/ساعة" />
                  <InfoRow label="آخر تحديث" value="منذ 2 دقائق" valueColor="text-yellow-400 font-bold" />
                  <InfoRow label="الموثوقية" value="100%" valueColor="text-green-400 font-bold" />
              </DashboardCard>

              {/* Card 2: AVRA */}
              <DashboardCard 
                  icon={<Shield size={28} className="text-blue-400" />}
                  title="سلطة ضبط السمعي البصري"
                  subtitle="AVRA"
                  accentColor="blue"
              >
                  <InfoRow label="قاعدة البيانات" value="متصلة" valueBg="bg-blue-500/20 text-blue-300" />
                  <InfoRow label="آخر تحديث" value="منذ 5 دقائق" valueColor="text-blue-400 font-bold" />
                  <InfoRow label="حالة المزامنة" value="نشطة" valueColor="text-green-400 font-bold" />
              </DashboardCard>

              {/* Card 3: Written Press */}
              <DashboardCard 
                  icon={<FileText size={28} className="text-purple-400" />}
                  title="سلطة ضبط الصحافة المكتوبة"
                  subtitle="والإلكترونية"
                  accentColor="purple"
              >
                  <InfoRow label="قاعدة البيانات" value="متصلة" valueBg="bg-purple-500/20 text-purple-300" />
                  <InfoRow label="آخر تحديث" value="منذ 8 دقائق" valueColor="text-purple-400 font-bold" />
                  <InfoRow label="حالة المزامنة" value="نشطة" valueColor="text-green-400 font-bold" />
              </DashboardCard>
          </div>

          {/* Official Note */}
          <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3 mb-10">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="font-bold text-white">منصة رسمية تحت إشراف وزارة الاتصال:</span> تعمل منصة سند AI تحت الإشراف المباشر لوزارة الاتصال بالتعاون مع سلطات الضبط لضمان أقصى درجات المصداقية والدقة في المحتوى الصحفي.
              </p>
          </div>

          {/* Bottom Cards Grid (Metrics) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Metric Card 1: Trust Score */}
              <MetricCard 
                  icon={<Award size={32} className="text-yellow-400" />}
                  title="درجة الثقة"
                  value="92.4"
                  subValue="/ 100"
                  trend="+2.3% من الأسبوع الماضي"
                  trendColor="text-green-400"
                  borderColor="border-yellow-400/50"
                  shadowColor="shadow-yellow-400/20"
              />

              {/* Metric Card 2: Reach */}
              <MetricCard 
                  icon={<Users size={32} className="text-teal-400" />}
                  title="إجمالي الوصول"
                  value="248 ألف"
                  subValue="قارئ"
                  trend="+18% هذا الشهر"
                  trendColor="text-teal-400"
                  borderColor="border-teal-400/50"
                  shadowColor="shadow-teal-400/20"
              />

              {/* Metric Card 3: Engagement */}
              <MetricCard 
                  icon={<MessageCircle size={32} className="text-purple-400" />}
                  title="تفاعل الجمهور"
                  value="67.8%"
                  subValue="معدل متوسط"
                  trend="أعلى من المعدل الصناعي"
                  trendColor="text-purple-400 font-bold"
                  borderColor="border-purple-400/50"
                  shadowColor="shadow-purple-400/20"
              />
          </div>

      </div>
      
    </div>
  );
};

// ================= Sub-components for Cards =================

// مكون لبطاقات المصادر العلوية
const DashboardCard = ({ icon, title, subtitle, children, accentColor }) => {
    const colorClasses = {
        yellow: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20 shadow-yellow-400/10",
        blue: "bg-blue-400/10 text-blue-400 border-blue-400/20 shadow-blue-400/10",
        purple: "bg-purple-400/10 text-purple-400 border-purple-400/20 shadow-purple-400/10",
    };
    const accentClass = colorClasses[accentColor] || colorClasses.blue;

    return (
        <div className={`bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-${accentColor}-400/30`}>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <p className="text-gray-400 text-sm">{subtitle}</p>
                </div>
                <div className={`p-3 rounded-xl ${accentClass} border shadow-[0_0_10px_inset]`}>
                    {icon}
                </div>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

// مكون لصفوف المعلومات داخل البطاقات
const InfoRow = ({ label, value, valueColor = "text-white", valueBg = "" }) => (
    <div className="flex justify-between items-center border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className={`font-bold ${valueColor} ${valueBg} ${valueBg ? 'px-3 py-1 rounded-md text-sm' : ''}`}>
            {value}
        </span>
    </div>
);

// مكون لبطاقات الإحصائيات السفلية
const MetricCard = ({ icon, title, value, subValue, trend, trendColor, borderColor, shadowColor }) => (
    <div className={`bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border-2 ${borderColor} shadow-[0_0_20px_inset] ${shadowColor} transition-all hover:-translate-y-1`}>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-300">{title}</h3>
            {icon}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-white">{value}</span>
            <span className="text-gray-400 font-medium">{subValue}</span>
        </div>
        <p className={`text-sm font-bold ${trendColor} flex items-center gap-1`}>
            {trend}
        </p>
    </div>
);

export default First;