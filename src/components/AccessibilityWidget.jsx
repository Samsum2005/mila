import React, { useState } from 'react';
import { Settings, Type, Sun, Eye, X, ZoomIn, ZoomOut, Monitor } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext'; // Import from step 1

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    fontSize, setFontSize, 
    isHighContrast, setIsHighContrast,
    isGrayscale, setIsGrayscale 
  } = useAccessibility();

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-sans" dir="rtl">
      
      {/* 1. The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="أدوات الوصول (Accessibility Tools)"
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:ring-4 focus:ring-blue-400 focus:outline-none
          ${isOpen ? 'bg-slate-900 rotate-90 text-white' : 'bg-blue-600 text-white'}
        `}
      >
        {isOpen ? <X size={28} /> : <Settings size={28} className="animate-spin-slow" />}
      </button>

      {/* 2. The Panel (Modal) */}
      {isOpen && (
        <div 
            className="absolute bottom-20 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up"
            role="dialog"
            aria-modal="true"
            aria-labelledby="access-title"
        >
          {/* Header */}
          <div className="bg-slate-900 p-4">
            <h3 id="access-title" className="text-white font-bold flex items-center gap-2">
              <Eye size={20} className="text-blue-400" />
              تسهيلات الوصول
            </h3>
          </div>

          <div className="p-5 space-y-6">
            
            {/* Feature 1: Font Sizing */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Type size={16} /> حجم النص
              </label>
              <div className="flex items-center justify-between bg-slate-100 rounded-lg p-1">
                <button 
                  onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                  className="p-2 hover:bg-white rounded-md transition shadow-sm w-full flex justify-center"
                  aria-label="تصغير الخط"
                >
                  <ZoomOut size={18} />
                </button>
                <span className="font-mono font-bold text-slate-600 w-16 text-center">{fontSize}%</span>
                <button 
                  onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                  className="p-2 hover:bg-white rounded-md transition shadow-sm w-full flex justify-center"
                  aria-label="تكبير الخط"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Feature 2: High Contrast */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Sun size={16} /> تباين عالي
              </label>
              <button 
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isHighContrast ? 'bg-blue-600' : 'bg-slate-300'}`}
                aria-pressed={isHighContrast}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isHighContrast ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Feature 3: Grayscale */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Monitor size={16} /> تدرج رمادي
              </label>
              <button 
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isGrayscale ? 'bg-blue-600' : 'bg-slate-300'}`}
                aria-pressed={isGrayscale}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isGrayscale ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Reset Button */}
            <button 
              onClick={() => { setFontSize(100); setIsHighContrast(false); setIsGrayscale(false); }}
              className="w-full py-2 text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              إعادة تعيين الإعدادات
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;