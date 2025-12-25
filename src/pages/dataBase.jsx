import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Video, 
  Mic, 
  Image as ImageIcon, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  DownloadCloud,
  RefreshCw,
  Link as LinkIcon,
  Server
} from 'lucide-react';

const DatabasePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data for the Archive
  const documents = [
    { id: 1, title: 'مشروع قانون المالية 2025 - النسخة النهائية', source: 'وزارة المالية', type: 'pdf', size: '12 MB', date: '25 ديسمبر 2024', status: 'verified', confidence: 99 },
    { id: 2, title: 'تصريح صحفي حول الطاقات المتجددة', source: 'سونلغاز', type: 'video', size: '450 MB', date: '24 ديسمبر 2024', status: 'processing', confidence: 60 },
    { id: 3, title: 'إحصائيات التصدير خارج المحروقات Q4', source: 'الجمارك الجزائرية', type: 'xlsx', size: '2.4 MB', date: '23 ديسمبر 2024', status: 'verified', confidence: 98 },
    { id: 4, title: 'ملخص المؤتمر الصحفي الأسبوعي', source: 'وكالة الأنباء (APS)', type: 'text', size: '15 KB', date: '22 ديسمبر 2024', status: 'verified', confidence: 100 },
    { id: 5, title: 'تقرير: أزمة المياه والحلول المقترحة', source: 'تحقيق خاص', type: 'audio', size: '45 MB', date: '20 ديسمبر 2024', status: 'warning', confidence: 45 },
  ];

  return (
    <>
      {/* --- FORCE CAIRO FONT --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
          body, button, input, textarea, select, div, span, h1, h2, h3, h4, h5, h6, p, td, th {
            font-family: 'Cairo', sans-serif !important;
          }
        `}
      </style>

      <div className="min-h-screen bg-slate-950 text-slate-100 pb-12" dir="rtl">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Database className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-wide">قاعدة البيانات والمصادر</span>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Stats in Header */}
               <div className="hidden md:flex gap-6 text-xs font-medium text-slate-400 border-l border-slate-800 pl-6 ml-2">
                  <div className="flex flex-col items-end">
                     <span className="text-white font-bold text-sm">2.4 TB</span>
                     <span>سعة التخزين</span>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-white font-bold text-sm">1.5M</span>
                     <span>وثيقة مؤرشفة</span>
                  </div>
               </div>
               
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  <span>إضافة مصدر</span>
               </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">

          {/* --- SECTION 1: SEARCH & FILTER --- */}
          <section className="flex flex-col md:flex-row gap-4">
             {/* Search Bar */}
             <div className="flex-1 relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                   <Search className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="بحث دلالي ذكي (مثال: العقود الغازية المبرمة في 2024...)" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pr-12 pl-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-2 flex items-center">
                   <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded">AI Search</span>
                </div>
             </div>
             
             {/* Filters */}
             <button className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-5 rounded-xl flex items-center gap-2 font-bold transition-colors">
                <Filter size={18} />
                <span>تصفية</span>
             </button>
             <button className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-5 rounded-xl flex items-center gap-2 font-bold transition-colors">
                <RefreshCw size={18} />
                <span>تحديث</span>
             </button>
          </section>

          {/* --- SECTION 2: CONNECTED SOURCES (Quick View) --- */}
          <section>
             <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <LinkIcon size={20} className="text-blue-400" />
                المصادر المتصلة حياً
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SourceCard name="وكالة الأنباء (APS)" status="online" count="124 جديد" icon="APS" color="bg-red-500" />
                <SourceCard name="الجريدة الرسمية" status="online" count="تم التحديث" icon="PDF" color="bg-green-600" />
                <SourceCard name="رويترز (Reuters)" status="offline" count="منفصل" icon="R" color="bg-orange-500" />
                <SourceCard name="أرشيف المؤسسة" status="syncing" count="جاري المزامنة..." icon={<Server size={20}/>} color="bg-indigo-500" />
             </div>
          </section>

          {/* --- SECTION 3: THE DATA TABLE --- */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
             {/* Table Tabs */}
             <div className="border-b border-slate-800 flex overflow-x-auto">
                {['الكل', 'وثائق PDF', 'صور وفيديو', 'تسجيلات صوتية', 'نصوص'].map((tab, idx) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab 
                        ? 'border-indigo-500 text-white bg-slate-800/50' 
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                     }`}
                   >
                      {tab}
                   </button>
                ))}
             </div>

             {/* Table Content */}
             <div className="overflow-x-auto">
                <table className="w-full text-right">
                   <thead>
                      <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                         <th className="px-6 py-4 font-bold">اسم الملف</th>
                         <th className="px-6 py-4 font-bold">المصدر</th>
                         <th className="px-6 py-4 font-bold">تاريخ الأرشفة</th>
                         <th className="px-6 py-4 font-bold">الحالة</th>
                         <th className="px-6 py-4 font-bold">دقة المصدر</th>
                         <th className="px-6 py-4 font-bold text-left">إجراءات</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800">
                      {documents.map((doc) => (
                         <tr key={doc.id} className="group hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                     {doc.type === 'pdf' && <FileText size={20} className="text-red-400" />}
                                     {doc.type === 'video' && <Video size={20} className="text-blue-400" />}
                                     {doc.type === 'audio' && <Mic size={20} className="text-purple-400" />}
                                     {doc.type === 'text' && <FileText size={20} className="text-slate-400" />}
                                     {doc.type === 'xlsx' && <Database size={20} className="text-green-400" />}
                                  </div>
                                  <div>
                                     <div className="font-bold text-slate-200 text-sm">{doc.title}</div>
                                     <div className="text-xs text-slate-500 mt-0.5">{doc.size} • {doc.type.toUpperCase()}</div>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <span className="text-sm text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                  {doc.source}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                               {doc.date}
                            </td>
                            <td className="px-6 py-4">
                               <StatusBadge status={doc.status} />
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                     <div 
                                       className={`h-full rounded-full ${doc.confidence > 90 ? 'bg-emerald-500' : doc.confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                       style={{width: `${doc.confidence}%`}}
                                     ></div>
                                  </div>
                                  <span className="text-xs font-bold text-slate-400">{doc.confidence}%</span>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                     <DownloadCloud size={18} />
                                  </button>
                                  <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                     <MoreVertical size={18} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             {/* Pagination */}
             <div className="border-t border-slate-800 p-4 flex items-center justify-between text-xs text-slate-500">
                <span>عرض 5 من أصل 1,540 سجل</span>
                <div className="flex gap-2">
                   <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 text-white transition-colors">السابق</button>
                   <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 text-white transition-colors">التالي</button>
                </div>
             </div>
          </section>

        </main>
      </div>
    </>
  );
};

/* --- HELPER COMPONENTS --- */

const SourceCard = ({ name, status, count, icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between group hover:border-slate-700 transition-all">
     <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${typeof icon === 'string' ? color : 'bg-slate-800'} flex items-center justify-center text-white font-bold shadow-lg`}>
           {icon}
        </div>
        <div>
           <div className="font-bold text-sm text-slate-200">{name}</div>
           <div className={`text-xs font-bold flex items-center gap-1 ${status === 'online' ? 'text-emerald-400' : status === 'offline' ? 'text-slate-500' : 'text-blue-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-emerald-500 animate-pulse' : status === 'offline' ? 'bg-slate-500' : 'bg-blue-500 animate-spin'}`}></span>
              {status === 'online' ? 'متصل' : status === 'offline' ? 'غير متصل' : 'مزامنة'}
           </div>
        </div>
     </div>
     <span className="text-xs bg-slate-950 border border-slate-800 px-2 py-1 rounded text-slate-400 group-hover:text-white transition-colors">
        {count}
     </span>
  </div>
);

const StatusBadge = ({ status }) => {
   const styles = {
      verified: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', label: 'موثوق', icon: <CheckCircle2 size={12}/> },
      processing: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', label: 'معالجة', icon: <RefreshCw size={12} className="animate-spin"/> },
      warning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', label: 'مراجعة', icon: <AlertCircle size={12}/> },
   };
   
   const style = styles[status] || styles.verified;

   return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
         {style.icon}
         <span>{style.label}</span>
      </div>
   );
};

export default DatabasePage;