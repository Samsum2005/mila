import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Rewind, FastForward, Volume2 } from 'lucide-react';

const ArticleReader = ({ textToRead, title = "قراءة المقال" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Create new speech instance
      const u = new SpeechSynthesisUtterance(textToRead);
      u.lang = 'ar-SA'; // Arabic Language
      u.rate = speed;
      u.pitch = 1;
      
      u.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      setUtterance(u);
      window.speechSynthesis.speak(u);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const changeSpeed = () => {
    const newSpeed = speed >= 2 ? 0.75 : speed + 0.25;
    setSpeed(newSpeed);
    // Note: To change speed dynamically while playing, we usually have to restart the utterance
    // For simplicity, this takes effect on next play or we can restart logic here
  };

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4" aria-label="Audio Player">
      
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
          <Volume2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
          <p className="text-xs text-slate-500">استمع إلى الخبر بتقنية الذكاء الاصطناعي</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-100">
        {/* Speed Control */}
        <button onClick={changeSpeed} className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded" title="Speed">
          {speed}x
        </button>
        
        {/* Controls */}
        {!isPlaying || isPaused ? (
          <button 
            onClick={handlePlay} 
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            aria-label="Play"
          >
            <Play size={18} fill="currentColor" />
          </button>
        ) : (
          <button 
            onClick={handlePause} 
            className="p-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition"
            aria-label="Pause"
          >
            <Pause size={18} fill="currentColor" />
          </button>
        )}

        <button 
          onClick={handleStop}
          className="p-2 text-slate-400 hover:text-red-500 transition" 
          aria-label="Stop"
        >
          <Square size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default ArticleReader;