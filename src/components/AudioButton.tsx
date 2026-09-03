import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../utils/speech';

interface AudioButtonProps {
  textToSpeak?: string;
  text?: string;
  langCode?: string;
  languageCode?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'subtle';
  className?: string;
}

const LANG_CODE_MAP: Record<string, string> = {
  santhali: 'sat-IN',
  gondi: 'gon-IN',
  bhojpuri: 'bho-IN',
  maithili: 'mai-IN',
  odia: 'or-IN',
  marathi: 'mr-IN',
  hindi: 'hi-IN',
  english: 'en-IN',
};

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  text,
  langCode = 'hi-IN',
  languageCode,
  label,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const speechContent = textToSpeak || text || '';
  const rawLang = (languageCode || langCode || 'hi-IN').toLowerCase();
  const activeLang = LANG_CODE_MAP[rawLang] || rawLang;

  useEffect(() => {
    return () => {
      // Clean up when unmounting
      if (isPlaying) {
        speechService.stop();
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechService.speak(speechContent, {
        lang: activeLang,
        rate: 0.84,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5 font-medium',
  };

  const variantClasses = {
    primary:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 active:scale-95 transition-all',
    secondary:
      'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm active:scale-95 transition-all',
    subtle:
      'bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 active:scale-95 transition-all',
  };

  return (
    <button
      id={`audio-btn-${Math.abs(speechContent.length + (label?.length || 0))}`}
      type="button"
      onClick={handleTogglePlay}
      className={`inline-flex items-center rounded-lg font-medium cursor-pointer transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      title={isPlaying ? 'Click to stop pronunciation' : 'Listen in Vernacular Speech'}
      aria-label="Play audio pronunciation"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-3.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-2.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span>{label || 'Playing Audio...'}</span>
        </>
      ) : (
        <>
          <Volume2 className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          <span>{label || 'Listen'}</span>
          <span className="text-[10px] opacity-75 font-mono px-1 py-0.2 rounded bg-black/10">TTS</span>
        </>
      )}
    </button>
  );
};
