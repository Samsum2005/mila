import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  FileText, 
  Globe, 
  Sparkles, 
  Copy, 
  Save, 
  Share2, 
  UploadCloud, 
  CheckCircle2,
  Maximize2,
  Mic,       
  MicOff,
  Volume2,   // Added: For reading text
  Square     // Added: For stopping text
} from 'lucide-react';

const ContentWorkspace = () => {
  const [activeMode, setActiveMode] = useState('create');
  const [inputText, setInputText] = useState('');
  
  // --- STATE: Generated Content & TTS ---
  const [generatedContent, setGeneratedContent] = useState(''); // Holds the result text
  const [isSpeaking, setIsSpeaking] = useState(false);
  // --------------------------------------

  // --- ADDED: Microphone Logic (Existing) ---
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'ar-SA';

      rec.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInputText(prev => prev + " " + finalTranscript);
        }
      };

      rec.onerror = (event) => {
        console.error("Speech error:", event.error);
        setIsListening(false);
      };

      setRecognition(rec);
    }

    // Cleanup speech synthesis on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleMic = () => {
    if (!recognition) return alert("المتصفح لا يدعم تحويل الصوت لنص");
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // --- NEW: Handle Text-to-Speech (Read Article) ---
  const handleSpeak = () => {
    if (!generatedContent) return;

    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Start speaking
      const utterance = new SpeechSynthesisUtterance(generatedContent);
      utterance.lang = 'ar-SA'; // Set language to Arabic
      utterance.rate = 0.9;     // Slightly slower for better clarity
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // --- NEW: Simulate Generation (For testing) ---
  const handleGenerate = () => {
    // In a real app, this would be an API call
    const fakeResult = "هذا نص تجريبي تم توليده بواسطة الذكاء الاصطناعي. يهدف هذا النظام إلى مساعدة الكتاب وصناع المحتوى على تحسين إنتاجيتهم وتوليد أفكار إبداعية جديدة بسرعة وكفاءة عالية. يمكنك الآن الاستماع إلى هذا النص بالنقر على أيقونة الصوت في الأعلى.";
    setGeneratedContent(fakeResult);
  };

  const modes = {
    create: {
      id: 'create',
      label: 'إنشاء محتوى',
      icon: <PenTool size={20} />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/50',
      btnColor: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      placeholder: 'عماذا تريد أن تكتب اليوم؟ (مقالة، منشور، بريد إلكتروني...)',
      actionText: 'توليد المحتوى'
    },
    summarize: {
      id: 'summarize',
      label: 'تلخيص وتحليل',
      icon: <FileText size={20} />,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/50',
      btnColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
      placeholder: 'الصق النص هنا، أو ارفع ملف PDF لتلخيصه...',
      actionText: 'تلخيص النص'
    },
    research: {
      id: 'research',
      label: 'بحث ذكي',
      icon: <Globe size={20} />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/50',
      btnColor: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      placeholder: 'عن أي موضوع تبحث؟ سأقوم بجلب المصادر والحقائق...',
      actionText: 'بدء البحث'
    }
  };

  const currentConfig = modes[activeMode];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
          body, button, input, textarea, select, div, span, h1, h2, h3, h4, h5, h6 {
            font-family: 'Cairo', sans-serif !important;
          }
        `}
      </style>

      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30" dir="rtl">
        
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-wide">استوديو الإبداع</span>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-400">
                  <span className="font-bold text-green-500 text-xs">AI Online</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               </div>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-4rem)]">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-4 h-full">
            
            {/* Tabs */}
            <div className="bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 flex justify-between relative">
              {Object.values(modes).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300
                    ${activeMode === mode.id 
                      ? `bg-slate-800 text-white shadow-lg ${mode.borderColor} border` 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Input Panel */}
            <div className={`flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col gap-4 relative overflow-hidden transition-colors duration-500 hover:border-slate-700 shadow-2xl shadow-black/20 group`}>
              
              <div className={`absolute top-0 right-0 w-64 h-64 ${currentConfig.bgColor} blur-[80px] rounded-full opacity-40 pointer-events-none transition-colors duration-500`}></div>

              <div className="flex justify-between items-center z-10">
                <h2 className={`text-lg font-bold flex items-center gap-2 ${currentConfig.color}`}>
                  {currentConfig.icon}
                  {activeMode === 'create' && 'ماذا نكتب اليوم؟'}
                  {activeMode === 'summarize' && 'المحتوى المراد تلخيصه'}
                  {activeMode === 'research' && 'موضوع البحث'}
                </h2>
                {activeMode === 'summarize' && (
                   <button className="text-xs font-semibold flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors">
                      <UploadCloud size={14} /> رفع ملف
                   </button>
                )}
              </div>

              {/* Input Textarea Wrapper */}
              <div className="relative flex-1 flex flex-col z-10">
                <textarea 
                  className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-lg placeholder-slate-600 leading-relaxed font-medium"
                  placeholder={isListening ? "جاري الاستماع... تحدث الآن" : currentConfig.placeholder}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>

                {/* Microphone Button */}
                <button 
                  onClick={toggleMic}
                  className={`absolute bottom-0 left-0 p-2 rounded-full transition-all duration-300
                    ${isListening 
                      ? 'bg-red-500/20 text-red-500 animate-pulse border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }
                  `}
                  title="تحدث للكتابة"
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>

              {/* Controls */}
              <div className="pt-4 border-t border-slate-800/50 z-10 grid grid-cols-2 gap-3">
                  {activeMode === 'create' && (
                    <>
                      <SelectBox label="النبرة" options={['رسمية', 'ودودة', 'حماسية', 'احترافية']} />
                      <SelectBox label="الطول" options={['قصير', 'متوسط', 'طويل']} />
                    </>
                  )}
                  {activeMode === 'summarize' && (
                    <>
                       <SelectBox label="نوع الملخص" options={['نقاط رئيسية', 'فقرة واحدة', 'تحليل شامل']} />
                       <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-800/50 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors font-medium">
                          <UploadCloud size={16} />
                          <span>اسحب ملف PDF</span>
                       </div>
                    </>
                  )}
                  {activeMode === 'research' && (
                    <>
                       <SelectBox label="النطاق الزمني" options={['أي وقت', 'آخر 24 ساعة', 'آخر شهر', 'آخر سنة']} />
                       <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-800/50 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors font-medium">
                          <CheckCircle2 size={16} />
                          <span>تدقيق المصادر</span>
                       </div>
                    </>
                  )}
              </div>

              {/* Action Button */}
              <button 
                onClick={handleGenerate}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-black/30 flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] ${currentConfig.btnColor}`}
              >
                  <Sparkles size={18} />
                  {currentConfig.actionText}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 h-full flex flex-col gap-4">
            <div className="flex-1 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col overflow-hidden relative shadow-2xl">
              
              {/* Toolbar */}
              <div className="h-14 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between px-4">
                 <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
                 </div>
                 <div className="flex items-center gap-2">
                    
                    {/* --- NEW: Text-to-Speech Button --- */}
                    <button 
                      onClick={handleSpeak}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all duration-300 text-sm font-medium border
                        ${isSpeaking 
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 animate-pulse' 
                          : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800 border-transparent'
                        }`}
                      title={isSpeaking ? "إيقاف القراءة" : "قراءة النص"}
                    >
                      {isSpeaking ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
                      <span>{isSpeaking ? 'إيقاف' : 'استماع'}</span>
                    </button>
                    {/* ---------------------------------- */}
                    
                    <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
                    <ToolButton icon={<Copy size={16} />} label="نسخ" />
                    <ToolButton icon={<Save size={16} />} label="حفظ" />
                    <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
                    <ToolButton icon={<Maximize2 size={16} />} />
                 </div>
              </div>

              {/* Editor Area (Result) */}
              <div className="flex-1 p-8 overflow-y-auto leading-8 text-lg text-slate-300 relative bg-slate-900">
                {/* Empty State */}
                {!generatedContent && !inputText && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 opacity-50 select-none">
                    <div className={`w-24 h-24 rounded-full ${currentConfig.bgColor} flex items-center justify-center mb-6 transition-colors duration-500`}>
                      {activeMode === 'create' && <PenTool size={40} className={currentConfig.color} />}
                      {activeMode === 'summarize' && <FileText size={40} className={currentConfig.color} />}
                      {activeMode === 'research' && <Globe size={40} className={currentConfig.color} />}
                    </div>
                    <p className="text-xl font-bold">النتيجة ستظهر هنا...</p>
                    <p className="text-sm mt-2 font-medium">املأ البيانات واضغط على الزر أدناه</p>
                  </div>
                )}
                
                {/* Loading State (Simulated with inputText for demo) */}
                {inputText && !generatedContent && (
                  <div className="animate-pulse space-y-4 opacity-50 pt-10">
                      <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-800 rounded w-full"></div>
                      <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                  </div>
                )}

                {/* --- Display Generated Content --- */}
                {generatedContent && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    <p>{generatedContent}</p>
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="h-9 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4 text-xs font-medium text-slate-500">
                 <div className="flex gap-4">
                    <span>الكلمات: {generatedContent ? generatedContent.split(' ').length : 0}</span>
                    <span>الأحرف: {generatedContent ? generatedContent.length : 0}</span>
                 </div>
                 <div className="flex items-center gap-2 text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    جاهز
                 </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

// Sub-components
const ToolButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-sm font-medium">
    {icon}
    {label && <span>{label}</span>}
  </button>
);

const SelectBox = ({ label, options }) => (
  <div className="group relative">
    <select className="w-full appearance-none bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 hover:border-slate-600 transition-colors cursor-pointer">
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
    <label className="absolute -top-2 right-2 bg-slate-900 px-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
      {label}
    </label>
    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

export default ContentWorkspace;