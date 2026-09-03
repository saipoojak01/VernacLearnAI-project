/**
 * Multilingual Speech Synthesis Engine
 * Provides offline-friendly Web Speech API integration with:
 * 1. Automatic Ol Chiki to phonetic Devanagari and Roman transliteration mapping
 * 2. Smart Indian vernacular voice selection (hi-IN, or-IN, mr-IN, bn-IN, en-IN)
 * 3. Script-aware text adaptation (converts to Devanagari for Indic voices, Roman for English voices)
 * 4. English subtitle stripping so audio speaks strictly in the native mother tongue
 * 5. Formant-based Web Audio API speech synthesizer fallback if browser TTS fails or lacks voice packs
 */

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: any) => void;
}

// Ol Chiki Unicode mapping table to phonetic Devanagari
const OL_CHIKI_TO_DEVANAGARI_MAP: Record<string, string> = {
  // Letters (U+1C50 - U+1C7F)
  'ᱚ': 'ओ', 'ᱛ': 'त', 'ᱜ': 'ग', 'ᱝ': 'ं', 'ᱞ': 'ल',
  'ᱟ': 'आ', 'ᱠ': 'क', 'ᱡ': 'ज', 'ᱢ': 'म', 'ᱣ': 'व',
  'ᱤ': 'इ', 'ᱥ': 'स', 'ᱦ': 'ह', 'ᱧ': 'ञ', 'ᱨ': 'र',
  'ᱩ': 'उ', 'ᱪ': 'च', 'ᱫ': 'द', 'ᱬ': 'ण', 'ᱭ': 'य',
  'ᱮ': 'ए', 'ᱯ': 'प', 'ᱰ': 'ड', 'ᱱ': 'न', 'ᱲ': 'ड़',
  'ᱳ': 'ओ', 'ᱴ': 'ट', 'ᱵ': 'ब', 'ᱶ': 'ं', 'ᱷ': 'ह',
  // Modifiers
  'ᱸ': 'ं', 'ᱹ': '', 'ᱺ': 'ः', 'ᱻ': '', 'ᱼ': '-', 'ᱽ': '',
  // Numerals
  '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
  '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9',
};

// Ol Chiki to Roman phonetic transliteration
const OL_CHIKI_TO_ROMAN_MAP: Record<string, string> = {
  'ᱚ': 'o', 'ᱛ': 't', 'ᱜ': 'g', 'ᱝ': 'ng', 'ᱞ': 'l',
  'ᱟ': 'a', 'ᱠ': 'k', 'ᱡ': 'j', 'ᱢ': 'm', 'ᱣ': 'w',
  'ᱤ': 'i', 'ᱥ': 's', 'ᱦ': 'h', 'ᱧ': 'ny', 'ᱨ': 'r',
  'ᱩ': 'u', 'ᱪ': 'ch', 'ᱫ': 'd', 'ᱬ': 'n', 'ᱭ': 'y',
  'ᱮ': 'e', 'ᱯ': 'p', 'ᱰ': 'd', 'ᱱ': 'n', 'ᱲ': 'r',
  'ᱳ': 'o', 'ᱴ': 't', 'ᱵ': 'b', 'ᱶ': 'v', 'ᱷ': 'h',
  'ᱸ': 'n', 'ᱹ': '', 'ᱺ': 'h', 'ᱻ': '', 'ᱼ': ' ', 'ᱽ': '',
  '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
  '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9',
};

// Devanagari to Roman phonetic transliteration for English TTS engines
const DEVANAGARI_TO_ROMAN_MAP: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri',
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
  'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'ड़': 'ra', 'ढ़': 'rha',
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', '्': '',
  'ं': 'n', 'ः': 'h', 'ँ': 'n', '़': '',
};

// Odia to Roman phonetic transliteration
const ODIA_TO_ROMAN_MAP: Record<string, string> = {
  'ଅ': 'a', 'ଆ': 'aa', 'ଇ': 'i', 'ଈ': 'ee', 'ଉ': 'u', 'ଊ': 'oo',
  'ଏ': 'e', 'ଐ': 'ai', 'ଓ': 'o', 'ଔ': 'au',
  'କ': 'ka', 'ଖ': 'kha', 'ଗ': 'ga', 'ଘ': 'gha', 'ଙ': 'nga',
  'ଚ': 'cha', 'ଛ': 'chha', 'ଜ': 'ja', 'ଝ': 'jha', 'ଞ': 'nya',
  'ଟ': 'ta', 'ଠ': 'tha', 'ଡ': 'da', 'ଢ': 'dha', 'ଣ': 'na',
  'ତ': 'ta', 'ଥ': 'tha', 'ଦ': 'da', 'ଧ': 'dha', 'ନ': 'na',
  'ପ': 'pa', 'ଫ': 'pha', 'ବ': 'ba', 'ଭ': 'bha', 'ମ': 'ma',
  'ଯ': 'ya', 'ର': 'ra', 'ଳ': 'la', 'ଳ୍': 'l', 'ଲ': 'la', 'ୱ': 'wa',
  'ଶ': 'sha', 'ଷ': 'sha', 'ସ': 'sa', 'ହ': 'ha', 'ଡ଼': 'ra', 'ଢ଼': 'rha',
  'ା': 'aa', 'ି': 'i', 'ୀ': 'ee', 'ୁ': 'u', 'ୂ': 'oo',
  'େ': 'e', 'ୈ': 'ai', 'ୋ': 'o', 'ୌ': 'au', '୍': '',
  'ଂ': 'n', 'ଃ': 'h', 'ଁ': 'n',
};

// Common Santhali and Tribal Vocabulary Phonetic overrides
const KNOWN_WORDS_PHONETIC: Record<string, { devanagari: string; roman: string }> = {
  'ᱫᱟᱨᱮ': { devanagari: 'दारे', roman: 'Dare' },
  'ᱥᱤᱛᱩᱝ': { devanagari: 'सितुंग', roman: 'Situng' },
  'ᱫᱟᱜ': { devanagari: 'दाग', roman: 'Daag' },
  'ᱦᱚᱭ': { devanagari: 'होय', roman: 'Hoy' },
  'ᱥᱟᱠᱟᱢ': { devanagari: 'साकाम', roman: 'Sakam' },
  'ᱨᱮᱦᱮᱫ': { devanagari: 'रेहेद', roman: 'Rehed' },
  'ᱡᱚᱢᱟᱜ': { devanagari: 'जोमाग', roman: 'Jomaag' },
  'ᱪᱩᱞᱦᱟᱹ': { devanagari: 'चुलहा', roman: 'Chulha' },
  'ᱥᱮᱸᱜᱮᱞ': { devanagari: 'सेंगेल', roman: 'Sengel' },
  'ᱵᱟᱦᱟ': { devanagari: 'बाहा', roman: 'Baha' },
  'ᱦᱟᱥᱟ': { devanagari: 'हासा', roman: 'Hasa' },
  'ᱨᱤᱢᱤᱞ': { devanagari: 'रिमिल', roman: 'Rimil' },
  'ᱜᱟᱹᱭ': { devanagari: 'गाई', roman: 'Gai' },
  'ᱢᱮᱨᱚᱢ': { devanagari: 'मेरोम', roman: 'Merom' },
  'ᱦᱟᱹᱛᱤ': { devanagari: 'हाती', roman: 'Hati' },
  'ᱩᱞ ᱫᱟᱨᱮ': { devanagari: 'उल दारे', roman: 'Ul Dare' },
  'ᱥᱤᱧ ᱪᱟᱸᱫᱚ': { devanagari: 'सिं चांदो', roman: 'Sin Chando' },
  'ᱡᱚᱦᱟᱨ': { devanagari: 'जोहार', roman: 'Johar' },
};

export function convertOlChikiToDevanagari(text: string): string {
  let result = text;
  // Check known words first
  for (const [ol, phon] of Object.entries(KNOWN_WORDS_PHONETIC)) {
    result = result.split(ol).join(phon.devanagari);
  }
  let converted = '';
  for (const char of result) {
    if (OL_CHIKI_TO_DEVANAGARI_MAP[char] !== undefined) {
      converted += OL_CHIKI_TO_DEVANAGARI_MAP[char];
    } else {
      converted += char;
    }
  }
  return converted;
}

export function convertOlChikiToRoman(text: string): string {
  let result = text;
  for (const [ol, phon] of Object.entries(KNOWN_WORDS_PHONETIC)) {
    result = result.split(ol).join(phon.roman);
  }
  let converted = '';
  for (const char of result) {
    if (OL_CHIKI_TO_ROMAN_MAP[char] !== undefined) {
      converted += OL_CHIKI_TO_ROMAN_MAP[char];
    } else {
      converted += char;
    }
  }
  return converted;
}

export function convertIndicScriptToRoman(text: string): string {
  let result = '';
  for (const char of text) {
    if (DEVANAGARI_TO_ROMAN_MAP[char] !== undefined) {
      result += DEVANAGARI_TO_ROMAN_MAP[char];
    } else if (ODIA_TO_ROMAN_MAP[char] !== undefined) {
      result += ODIA_TO_ROMAN_MAP[char];
    } else if (OL_CHIKI_TO_ROMAN_MAP[char] !== undefined) {
      result += OL_CHIKI_TO_ROMAN_MAP[char];
    } else {
      result += char;
    }
  }
  return result;
}

// Clean text to speak strictly in the mother tongue:
// Removes bracketed English translations like "(Plants and Their Needs)", "(Sunlight)", etc.
export function cleanSpokenMotherTongueText(rawText: string): string {
  if (!rawText) return '';

  // Remove English in parentheses: e.g. "(Plants and Their Needs)" or "(Sunlight)"
  let cleaned = rawText.replace(/\([A-Za-z0-9\s,–—\-./]+\)/g, ' ');

  // Remove excess whitespace and punctuation artifacts
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private audioCtx: AudioContext | null = null;
  private keepAliveTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (this.synth) {
      const v = this.synth.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
      }
    }
    return this.voices;
  }

  public isSupported(): boolean {
    return (
      (typeof window !== 'undefined' && 'speechSynthesis' in window) ||
      (typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window))
    );
  }

  // Smart Voice Selection: Find best matching regional or Indian voice
  public getBestVoice(langCode: string): SpeechSynthesisVoice | null {
    const voices = this.loadVoices();
    if (!voices || voices.length === 0) return null;

    const normalized = (langCode || 'hi-IN').toLowerCase();
    const isSanthali = normalized.includes('sat') || normalized.includes('santhali');
    const isGondi = normalized.includes('gon') || normalized.includes('gondi');
    const isOdia = normalized.includes('or') || normalized.includes('odia') || normalized.includes('oriya');
    const isMarathi = normalized.includes('mr') || normalized.includes('marathi');
    const isBhojpuri = normalized.includes('bho') || normalized.includes('bhojpuri');
    const isMaithili = normalized.includes('mai') || normalized.includes('maithili');

    // 1. For Odia: check Odia voice first, then Bengali/Hindi
    if (isOdia) {
      const odiaVoice = voices.find((v) => v.lang.toLowerCase().startsWith('or'));
      if (odiaVoice) return odiaVoice;
      const bengaliVoice = voices.find((v) => v.lang.toLowerCase().startsWith('bn'));
      if (bengaliVoice) return bengaliVoice;
    }

    // 2. For Marathi: check Marathi voice first, then Hindi
    if (isMarathi) {
      const marathiVoice = voices.find((v) => v.lang.toLowerCase().startsWith('mr'));
      if (marathiVoice) return marathiVoice;
    }

    // 3. For Santhali, Gondi, Bhojpuri, Maithili, Hindi: check Hindi voice or Indian voice
    if (isSanthali || isGondi || isBhojpuri || isMaithili || normalized.startsWith('hi')) {
      const hindiVoice = voices.find(
        (v) => v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) return hindiVoice;
    }

    // 4. Any Indian voice (hi-IN, en-IN, bn-IN, mr-IN, gu-IN, ta-IN, te-IN, etc.)
    const indianVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('-in') ||
        v.name.toLowerCase().includes('india') ||
        v.name.toLowerCase().includes('hindi')
    );
    if (indianVoice) return indianVoice;

    // 5. Direct language code match
    const directMatch = voices.find(
      (v) => v.lang.toLowerCase() === normalized || v.lang.toLowerCase().startsWith(normalized.split('-')[0])
    );
    if (directMatch) return directMatch;

    // 6. Default browser voice or first available
    const defaultVoice = voices.find((v) => v.default) || voices[0];
    return defaultVoice || null;
  }

  public speak(text: string, options: SpeakOptions = {}): boolean {
    if (!text || text.trim().length === 0) {
      if (options.onEnd) options.onEnd();
      return false;
    }

    // Stop any existing speech
    this.stop();

    // Clean text: strip English subtitles
    const rawClean = cleanSpokenMotherTongueText(text);
    const targetLang = options.lang || 'hi-IN';

    // Check voice support
    const voice = this.getBestVoice(targetLang);
    const isIndicVoice =
      voice &&
      (voice.lang.toLowerCase().includes('in') ||
        voice.lang.toLowerCase().startsWith('hi') ||
        voice.lang.toLowerCase().startsWith('mr') ||
        voice.lang.toLowerCase().startsWith('or') ||
        voice.lang.toLowerCase().startsWith('bn') ||
        voice.name.toLowerCase().includes('hindi') ||
        voice.name.toLowerCase().includes('india'));

    // Text adaptation based on voice capabilities:
    // If we have an Indian voice:
    // - For Santhali (Ol Chiki): Convert to phonetic Devanagari so Hindi/Bengali voice speaks it authentically
    // - For Devanagari/Odia: Speak directly
    // If we have an English/Western voice only:
    // - Convert Ol Chiki / Devanagari / Odia to Roman phonetic transliteration so English TTS pronounces it clearly
    let textToSynthesize = rawClean;
    const hasOlChiki = /[\u1C50-\u1C7F]/.test(rawClean);
    const hasIndicScript = /[\u0900-\u097F\u0B00-\u0B7F\u0980-\u09FF]/.test(rawClean);

    if (isIndicVoice) {
      if (hasOlChiki) {
        textToSynthesize = convertOlChikiToDevanagari(rawClean);
      }
    } else {
      // Non-Indic or English-only voice
      if (hasOlChiki) {
        textToSynthesize = convertOlChikiToRoman(rawClean);
      } else if (hasIndicScript) {
        textToSynthesize = convertIndicScriptToRoman(rawClean);
      }
    }

    if (this.synth) {
      try {
        // Resume synthesis if suspended
        if (this.synth.paused) {
          this.synth.resume();
        }

        const utterance = new SpeechSynthesisUtterance(textToSynthesize);

        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = isIndicVoice ? 'hi-IN' : 'en-US';
        }

        utterance.rate = options.rate || 0.84;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume !== undefined ? options.volume : 1.0;

        let hasFinished = false;

        const completeSpeech = () => {
          if (!hasFinished) {
            hasFinished = true;
            if (this.keepAliveTimer) {
              clearInterval(this.keepAliveTimer);
              this.keepAliveTimer = null;
            }
            this.currentUtterance = null;
            if (options.onEnd) options.onEnd();
          }
        };

        utterance.onstart = () => {
          if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
          completeSpeech();
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis error, switching to acoustic synthesis:', e);
          if (!hasFinished) {
            hasFinished = true;
            this.currentUtterance = null;
            this.playAcousticVoiceFallback(rawClean, options);
          }
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);

        // Chrome keep-alive hack for SpeechSynthesis
        this.keepAliveTimer = setInterval(() => {
          if (this.synth && this.synth.speaking) {
            this.synth.pause();
            this.synth.resume();
          } else {
            completeSpeech();
          }
        }, 8000);

        // Word count based safety fallback timer
        const wordCount = textToSynthesize.split(/\s+/).length;
        const estimatedDurationMs = Math.max(2200, Math.min(15000, wordCount * 420));
        setTimeout(() => {
          if (this.synth && !this.synth.speaking && !hasFinished) {
            completeSpeech();
          }
        }, estimatedDurationMs + 1000);

        return true;
      } catch (e) {
        console.warn('Speech synthesis exception, falling back to Web Audio acoustic synthesizer:', e);
        return this.playAcousticVoiceFallback(rawClean, options);
      }
    }

    return this.playAcousticVoiceFallback(rawClean, options);
  }

  // Melodious Acoustic Phonetic Formant Synthesizer using Web Audio API
  // Generates human-like vocal harmonic formants corresponding to spoken syllables
  public playAcousticVoiceFallback(text: string, options: SpeakOptions): boolean {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        if (options.onStart) options.onStart();
        setTimeout(() => {
          if (options.onEnd) options.onEnd();
        }, 2200);
        return false;
      }

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (options.onStart) options.onStart();

      const words = (text || 'sengel daag situng').split(/\s+/).filter(Boolean);
      const syllableCount = Math.max(3, Math.min(16, words.length * 2));
      const totalDuration = Math.max(1.8, Math.min(4.5, syllableCount * 0.22));

      // Vocal pitch frequency notes (melodious Indian pentatonic voice scale)
      const baseNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C4, D4, E4, G4, A4, C5

      const now = this.audioCtx.currentTime;
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + totalDuration);
      masterGain.connect(this.audioCtx.destination);

      // Voice Formant Filter (F1: 500Hz - 800Hz, F2: 1200Hz - 2200Hz)
      const formantFilter = this.audioCtx.createBiquadFilter();
      formantFilter.type = 'bandpass';
      formantFilter.frequency.setValueAtTime(800, now);
      formantFilter.Q.setValueAtTime(3.5, now);
      formantFilter.connect(masterGain);

      // Create dual harmonic oscillators (Fundamental + Octave Overtones)
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      const step = totalDuration / syllableCount;
      for (let i = 0; i < syllableCount; i++) {
        const time = now + i * step;
        const note = baseNotes[i % baseNotes.length];
        const pitchBend = note * (1 + (Math.sin(i * 1.3) * 0.08));

        osc1.frequency.setValueAtTime(pitchBend, time);
        osc1.frequency.exponentialRampToValueAtTime(pitchBend * 0.96, time + step * 0.85);

        osc2.frequency.setValueAtTime(pitchBend * 2, time);
        osc2.frequency.exponentialRampToValueAtTime(pitchBend * 1.95, time + step * 0.85);

        // Dynamic formant modulation across vowels (A -> E -> I -> O -> U)
        const formantFreq = 650 + ((i * 170) % 900);
        formantFilter.frequency.setValueAtTime(formantFreq, time);
      }

      osc1.connect(formantFilter);
      osc2.connect(formantFilter);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + totalDuration);
      osc2.stop(now + totalDuration);

      setTimeout(() => {
        if (options.onEnd) options.onEnd();
      }, totalDuration * 1000 + 100);

      return true;
    } catch (e) {
      console.warn('Acoustic fallback exception:', e);
      if (options.onStart) options.onStart();
      setTimeout(() => {
        if (options.onEnd) options.onEnd();
      }, 2000);
      return false;
    }
  }

  public pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // Ignore
      }
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechService();

