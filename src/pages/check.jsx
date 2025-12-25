import React, { useState, useEffect } from 'react';
import { 
  Link, FileText, AlertTriangle, ShieldCheck, 
  Search, Info, Mic, MicOff 
} from 'lucide-react';

const Check = () => {
  const [analyzingLink, setAnalyzingLink] = useState(false);
  const [analyzingText, setAnalyzingText] = useState(false);
  const [result, setResult] = useState(null);

  // --- 1. MICROPHONE LOGIC ---
  const [textInput, setTextInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check browser support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'ar-SA'; // Arabic

      rec.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTextInput(prev => prev + " " + finalTranscript);
        }
      };

      rec.onerror = (event) => {
        console.error("Speech error", event);
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleMic = () => {
    if (!recognition) return alert("المتصفح لا يدعم هذه الميزة");
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };
  // ---------------------------

  const handleAnalyze = (type) => {
    if (type === 'link') setAnalyzingLink(true);
    else setAnalyzingText(true);
    setResult(null);

    setTimeout(() => {
      setAnalyzingLink(false);
      setAnalyzingText(false);
      setResult({
        type: type,
        score: 95,
        status: "محتوى موثوق",
        details: "تم التدقيق عبر مقاطعة المعلومات مع المصادر الرسمية المعتمدة."
      });
    }, 2000);
  };

  return (
    <div className="w-full h-full p-6 md:p-10 overflow-y-auto bg-slate-900 pb-20 no-scrollbar font-sans" style={{ fontFamily: 'Cairo, sans-serif' }}>
      
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');`}
      </style>

      {/* Header */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
          <ShieldCheck className="text-blue-400" size={36} />
          التحقق من الأخبار
        </h1>
        <p className="text-gray-400 text-lg font-medium">
          أدوات متقدمة للكشف عن الأخبار الزائفة باستخدام خوارزميات الذكاء الاصطناعي.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        {/* --- RIGHT CARD: TEXT ANALYSIS + MIC --- */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col h-full hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_inset_rgba(59,130,246,0.1)]">
               <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">تحليل المحتوى النصي</h2>
              <p className="text-gray-400 text-sm">الصق النص أو استخدم الميكروفون</p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <label className="text-sm font-bold text-gray-300">نص الخبر:</label>
            
            {/* Textarea Wrapper for Mic Positioning */}
            <div className={`relative rounded-xl transition-all ${isListening ? 'ring-2 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : ''}`}>
              <textarea 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full h-64 bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-inner"
                placeholder={isListening ? "جاري الاستماع... تحدث الآن" : "الصق المقال الإخباري هنا أو اضغط على الميكروفون..."}
              ></textarea>
              
              {/* --- MIC BUTTON INSIDE TEXTAREA --- */}
              <button 
                onClick={toggleMic}
                className={`absolute bottom-4 left-4 p-2 rounded-full transition-all duration-300 flex items-center justify-center
                  ${isListening 
                    ? 'bg-red-500 text-white shadow-lg animate-pulse scale-110' 
                    : 'bg-slate-700 text-slate-400 hover:bg-blue-600 hover:text-white'}
                `}
                title="تسجيل صوتي"
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center">
               {isListening && <span className="text-xs text-red-400 font-bold animate-pulse">جاري الاستماع...</span>}
               <div className="text-xs text-gray-500 mr-auto">{textInput.length} حرف</div>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={() => handleAnalyze('text')}
              disabled={analyzingText || !textInput}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {analyzingText ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Search size={20} />
                  تحليل المحتوى
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- LEFT CARD: LINK ANALYSIS (Unchanged) --- */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col h-full hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_inset_rgba(168,85,247,0.1)]">
               <Link size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">تحليل الروابط والفيديو</h2>
              <p className="text-gray-400 text-sm">تحقق من مصداقية المنشورات والروابط</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-300">رابط المحتوى:</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 pl-10 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  placeholder="https://example.com/news-article"
                />
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
              <p className="text-xs text-gray-500 text-left opacity-70" dir="ltr">
                Supports: Facebook, Twitter, YouTube, News Sites
              </p>
            </div>

            <button 
              onClick={() => handleAnalyze('link')}
              disabled={analyzingLink}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {analyzingLink ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  جاري الفحص...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  التحقق من الرابط
                </>
              )}
            </button>

            <div className="mt-auto bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 flex gap-3">
              <Info className="text-blue-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-blue-300 text-sm mb-1">التقنية المستخدمة:</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-medium">
                  يتم تحليل الروابط باستخدام نماذج BERT وخوارزميات كشف الأخبار المضللة مع التحقق من البيانات الوصفية والمصادر المرجعية.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- RESULT DEMO (Unchanged) --- */}
      {result && (
        <div className="mb-10 animate-bounce-in">
           <div className="bg-slate-800/80 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500 shadow-[0_0_15px_inset_rgba(16,185,129,0.2)]">
                  <span className="text-2xl font-black text-emerald-400">{result.score}%</span>
                </div>
                <div className="absolute -bottom-2 right-0 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  آمن
                </div>
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-2xl font-bold text-emerald-400 mb-1">{result.status}</h3>
                <p className="text-gray-300 font-medium">{result.details}</p>
              </div>
              <button onClick={() => setResult(null)} className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors font-bold border border-slate-600">
                إغلاق
              </button>
           </div>
        </div>
      )}

      {/* --- WARNING FOOTER (Unchanged) --- */}
      <div className="bg-slate-800/80 backdrop-blur-md border-r-4 border-amber-500 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row gap-5 items-start border border-slate-700/50">
        <div className="bg-amber-500/20 p-3 rounded-xl flex-shrink-0 shadow-[0_0_15px_inset_rgba(245,158,11,0.2)] border border-amber-500/30">
          <AlertTriangle className="text-amber-500" size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            ملاحظة مهمة للصحفيين
          </h3>
          <p className="text-gray-300 text-sm leading-loose font-medium">
            نظام التحقق من الأخبار يعتمد على تقنيات الذكاء الاصطناعي المتقدمة. 
            <span className="text-amber-400 font-bold mx-1 bg-amber-500/10 px-2 py-0.5 rounded">يُنصح دائماً بالمراجعة اليدوية</span> 
            والتحقق من مصادر متعددة قبل نشر أي محتوى. هذه الأداة مساعدة وليست بديلاً عن التدقيق الصحفي المهني.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Check;