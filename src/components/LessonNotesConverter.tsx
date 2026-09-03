import React, { useState, useRef } from 'react';
import { LanguageCode, LearningContext, ConvertedLessonNote } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoData';
import { speechService } from '../utils/speech';
import { fetchConvertLessonNotes, generateLessonNotesConversionFallback } from '../utils/translation';
import {
  FileUp,
  FileText,
  UploadCloud,
  CheckCircle2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Printer,
  Sparkles,
  ArrowRight,
  BookOpen,
  MapPin,
  Globe2,
  Layers,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Eye,
  Languages,
} from 'lucide-react';

export interface LessonNotesConverterProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage?: (lang: LanguageCode) => void;
  onNavigate?: (screen: any) => void;
  onSetLessonPrompt?: (prompt: string) => void;
  onSaveConvertedNote?: (note: ConvertedLessonNote) => void;
  uploadedNotes?: ConvertedLessonNote[];
}

// Pre-packaged realistic English lesson notes for instant 1-click teacher demonstration
export const SAMPLE_ENGLISH_NOTES = [
  {
    id: 'sample-plant',
    fileName: 'NCERT_Class3_EVS_Plant_Life.pdf',
    size: '142 KB',
    title: 'Parts of a Plant and Their Functions',
    content: `Topic: Parts of a Plant and Their Vital Functions (Class 3 EVS).
1. Introduction: Plants are living things rooted in the ground that sustain life on Earth.
2. Root System: The roots grow downward into the moist soil. Their main job is to anchor the plant firmly and suck up water and mineral nutrients from the earth.
3. Stem and Branches: The strong stem holds the plant upright towards the sky and acts as a pipeline, carrying water and nourishment upward to every leaf and flower.
4. Green Leaves: Leaves are the green kitchens of the plant. Using sunlight, carbon dioxide from the air, and water from the roots, they prepare nourishment for growth.
5. Flowers and Seeds: Flowers blossom in diverse colors to attract bees and butterflies, eventually forming fruit and seeds that grow into new saplings.
Learning Outcome: Children identify plant parts in their immediate surroundings and describe how each part contributes to plant survival.`,
  },
  {
    id: 'sample-water',
    fileName: 'Science_Grade2_Clean_Water_Hygiene.pdf',
    size: '118 KB',
    title: 'Clean Water, Sources, and Village Health',
    content: `Topic: Water in Our Lives: Sources, Cleanliness, and Good Health (Class 2 Science).
1. Sources of Water: Rain fills our ponds, streams, rivers, and deep tube wells.
2. Safe Drinking Water: Water used for cooking and drinking must be boiled or filtered from a protected handpump or clean well.
3. Good Hygiene Habits: Washing hands with soap before eating and after using the toilet keeps invisible germs away and stops stomach sickness.
4. Protecting Village Water: We must never wash dirty clothes or bathe animals near drinking water ponds.
Learning Outcome: Children learn the difference between clean drinking water and stagnant water, and adopt daily handwashing routines.`,
  },
  {
    id: 'sample-math',
    fileName: 'Math_Grade3_Fractions_Sharing.pdf',
    size: '165 KB',
    title: 'Equal Sharing and Fractions with Village Harvests',
    content: `Topic: Understanding Fractions as Equal Sharing (Class 3 Mathematics).
1. Concept of a Whole: A whole bread (roti), a full ripe papaya, or a full basket of grain.
2. Halves (1/2): When a roti is shared equally between two friends, each friend receives one half (1/2).
3. Fourths / Quarters (1/4): When a ripe guava is cut into 4 equal slices, each slice is one quarter (1/4).
4. Practical Sharing: Counting seed pods or dividing 12 tamarind seeds equally into 3 heaps gives 4 seeds per heap (one third).
Learning Outcome: Learners understand fractions not as abstract symbols, but as fair and equal division of everyday village food items.`,
  },
];

export const LessonNotesConverter: React.FC<LessonNotesConverterProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onNavigate,
  onSetLessonPrompt,
  onSaveConvertedNote,
  uploadedNotes,
}) => {
  const [targetLang, setTargetLang] = useState<LanguageCode>(selectedLanguage || 'santhali');
  const [gradeLevel, setGradeLevel] = useState<string>('Class 3');
  const [context, setContext] = useState<string>('Village Badi & Rural School');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>(SAMPLE_ENGLISH_NOTES[0].content);
  const [currentFileName, setCurrentFileName] = useState<string>(SAMPLE_ENGLISH_NOTES[0].fileName);
  const [currentFileSize, setCurrentFileSize] = useState<string>(SAMPLE_ENGLISH_NOTES[0].size);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Conversion State
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionStep, setConversionStep] = useState<string>('');
  const [convertedNote, setConvertedNote] = useState<ConvertedLessonNote | null>(() => {
    if (uploadedNotes && uploadedNotes.length > 0) {
      return uploadedNotes[0];
    }
    return generateLessonNotesConversionFallback(
      SAMPLE_ENGLISH_NOTES[0].fileName,
      SAMPLE_ENGLISH_NOTES[0].content,
      selectedLanguage || 'santhali',
      SAMPLE_ENGLISH_NOTES[0].size
    );
  });

  // View & Audio State
  const [activeView, setActiveView] = useState<'bilingual' | 'mother_tongue' | 'source_english'>('bilingual');
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Process File Selection
  const handleFile = (file: File) => {
    if (!file) return;

    setCurrentFileName(file.name);
    const sizeKb = Math.round(file.size / 1024);
    setCurrentFileSize(`${sizeKb} KB`);
    setUploadedFile(file);

    const reader = new FileReader();

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFileBase64(result);
        setExtractedText(''); // Will be extracted by Gemini backend
        showToast(`PDF "${file.name}" loaded ready for translation.`);
      };
      reader.readAsDataURL(file);
    } else {
      // Plain text or markdown
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setExtractedText(text);
        setFileBase64(null);
        showToast(`Notes file "${file.name}" loaded successfully.`);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Quick Select Sample Notes
  const handleSelectSample = (sample: (typeof SAMPLE_ENGLISH_NOTES)[0]) => {
    setUploadedFile(null);
    setFileBase64(null);
    setCurrentFileName(sample.fileName);
    setCurrentFileSize(sample.size);
    setExtractedText(sample.content);

    const converted = generateLessonNotesConversionFallback(
      sample.fileName,
      sample.content,
      targetLang,
      sample.size
    );
    setConvertedNote(converted);
    if (onSaveConvertedNote) onSaveConvertedNote(converted);
    showToast(`Loaded sample notes & translated for students: "${sample.title}"`);
  };

  // Perform AI Conversion
  const handleConvert = async () => {
    setIsConverting(true);
    setConversionStep('Analyzing English Lesson Notes...');

    const timer1 = setTimeout(() => {
      setConversionStep(`Translating to ${currentLangObj.name} (${currentLangObj.nativeName})...`);
    }, 1200);

    const timer2 = setTimeout(() => {
      setConversionStep('Adapting cultural metaphors and classroom activities...');
    }, 2400);

    try {
      const result = await fetchConvertLessonNotes({
        pdfBase64: fileBase64 || undefined,
        text: extractedText || undefined,
        fileName: currentFileName,
        fileSize: currentFileSize,
        targetLanguage: targetLang,
        gradeLevel,
        context,
      });

      setConvertedNote(result);
      if (onSaveConvertedNote) onSaveConvertedNote(result);
      showToast(`Lesson notes successfully converted & shared to Student Portal in ${currentLangObj.name}!`);
    } catch (err) {
      console.warn('Conversion failed, using fallback:', err);
      const fallback = generateLessonNotesConversionFallback(
        currentFileName,
        extractedText,
        targetLang,
        currentFileSize
      );
      setConvertedNote(fallback);
      if (onSaveConvertedNote) onSaveConvertedNote(fallback);
      showToast(`Generated mother-tongue lesson adaptation & shared to Student Portal for ${currentLangObj.name}.`);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsConverting(false);
      setConversionStep('');
    }
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    setTargetLang(newLang);
    if (onSelectLanguage) onSelectLanguage(newLang);
  };

  // Text-To-Speech Playback
  const handleToggleAudio = () => {
    if (!convertedNote) return;

    if (audioPlaying) {
      speechService.stop();
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      const speechCode = currentLangObj.speechCode;
      const textToRead = `${convertedNote.title.motherTongue}. ${convertedNote.overviewMt}. ${convertedNote.sections
        .map((s) => `${s.headingMt}. ${s.contentMt}`)
        .join('. ')}`;

      const success = speechService.speak(textToRead, {
        lang: speechCode,
        rate: 0.82,
        onStart: () => setAudioPlaying(true),
        onEnd: () => setAudioPlaying(false),
        onError: () => setAudioPlaying(false),
      });

      if (!success) {
        setTimeout(() => setAudioPlaying(false), 3000);
      }
    }
  };

  const handleSpeakTerm = (term: string) => {
    speechService.speak(term, {
      lang: currentLangObj.speechCode,
      rate: 0.8,
    });
  };

  const handleCopy = () => {
    if (!convertedNote) return;
    const fullText = `LESSON: ${convertedNote.title.english} / ${convertedNote.title.motherTongue} (${convertedNote.title.transliteration})\n\nOVERVIEW (Mother Tongue):\n${convertedNote.overviewMt}\n\nOVERVIEW (English):\n${convertedNote.overviewEn}\n\nSECTIONS:\n${convertedNote.sections
      .map(
        (s) =>
          `[${s.headingEn} - ${s.headingMt}]\n${s.contentMt}\nPhonetics: ${s.transliteration}\nChild Metaphor: ${s.childExplanation || ''}\n`
      )
      .join('\n')}\nKEY VOCABULARY:\n${convertedNote.keyVocabulary
      .map((v) => `- ${v.englishTerm} = ${v.motherTongueTerm} (${v.transliteration}): ${v.meaning}`)
      .join('\n')}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('Converted lesson notes copied to clipboard.');
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUseInLessonGenerator = () => {
    if (!convertedNote) return;
    if (onSetLessonPrompt) {
      onSetLessonPrompt(
        `Topic: ${convertedNote.title.english}. Mother Tongue: ${currentLangObj.name}. Focus: ${convertedNote.overviewEn}`
      );
    }
    if (onNavigate) {
      onNavigate('lesson_gen');
    }
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Staff Portal</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Curriculum Converter</span>
            <span>•</span>
            <span className="text-neutral-600 font-mono text-[11px]">
              Target: {currentLangObj.name} ({currentLangObj.nativeName})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
            <FileUp className="w-7 h-7 text-emerald-600" />
            Lesson Notes PDF to Mother Tongue
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium max-w-3xl">
            Upload teacher lesson notes or curriculum handouts in English (PDF/Doc) to instantly convert them into
            child-friendly mother tongue teaching materials with Ol Chiki / regional script, phonetics, and village
            metaphors.
          </p>
        </div>

        {/* Global Target Language Switcher */}
        <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-2xl border border-neutral-200 shrink-0">
          <Languages className="w-4 h-4 text-emerald-600 ml-1" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Mother Tongue:</span>
            <select
              id="notes-target-language-select"
              value={targetLang}
              onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent font-bold text-xs text-neutral-900 focus:outline-hidden cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name} ({l.nativeName}) {l.isLowResource ? '★' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Upload & Parameters | Right Live Converted Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: File Upload & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-emerald-600" />
                Upload English Notes (PDF / Doc)
              </h2>
              <span className="text-[11px] font-mono text-neutral-400">PDF, TXT, DOCX</span>
            </div>

            {/* Drag & Drop Zone */}
            <div
              id="pdf-dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-neutral-200 hover:border-emerald-400 hover:bg-neutral-50/70 bg-neutral-50/30'
              }`}
            >
              <input
                ref={fileInputRef}
                id="file-upload-input"
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-emerald-600 mb-3">
                <FileUp className="w-6 h-6" />
              </div>

              <div className="text-xs font-bold text-neutral-900">
                {uploadedFile ? uploadedFile.name : 'Click to browse or drag & drop English PDF'}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                Standard NCERT teacher notes, chapter summaries, or worksheets
              </div>

              {currentFileName && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{currentFileName}</span>
                  <span className="text-[10px] font-mono text-emerald-600">({currentFileSize})</span>
                </div>
              )}
            </div>

            {/* Ready-to-Test Sample Notes */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Or Select Sample English Notes:</span>
                <span className="text-emerald-700 font-medium">1-Click Test</span>
              </div>
              <div className="space-y-1.5">
                {SAMPLE_ENGLISH_NOTES.map((sample) => (
                  <button
                    key={sample.id}
                    id={`sample-btn-${sample.id}`}
                    onClick={() => handleSelectSample(sample)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                      currentFileName === sample.fileName
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{sample.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0 ml-2">{sample.size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pedagogic Adaptation Settings */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-100">
              <div>
                <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  Grade / Level
                </label>
                <select
                  id="notes-grade-select"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 cursor-pointer focus:outline-hidden"
                >
                  <option value="Class 1">Class 1 (Foundational)</option>
                  <option value="Class 2">Class 2 (Preparatory)</option>
                  <option value="Class 3">Class 3 (Primary Standard)</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  Metaphor Setting
                </label>
                <select
                  id="notes-context-select"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 cursor-pointer focus:outline-hidden"
                >
                  <option value="Village Badi & Rural School">Village Badi & Yard</option>
                  <option value="Sacred Grove & Forest Flora">Sacred Grove / Forest</option>
                  <option value="River, Stream & Pond Life">River & Village Pond</option>
                  <option value="Weekly Haat & Market">Weekly Village Haat</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <button
              id="convert-notes-btn"
              onClick={handleConvert}
              disabled={isConverting}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                isConverting
                  ? 'bg-neutral-800 text-neutral-300 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98'
              }`}
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>{conversionStep || 'Converting Lesson Notes...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Convert to {currentLangObj.name} (Mother Tongue)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Quick Guidance Box */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 text-xs space-y-2 text-emerald-950">
            <div className="font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>NEP 2020 Mother Tongue Bridging</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-900/90 font-medium">
              Uploaded English notes are translated into authentic native script (like Santhali Ol Chiki ᱚᱞ ᱪᱤᱠᱤ),
              paired with Latin phonetic guides so non-native teachers can read along with children, and enriched with
              relatable village metaphors.
            </p>
          </div>
        </div>

        {/* Right Column: Converted Lesson Notes View (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {convertedNote ? (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden space-y-0">
              {/* Student Portal Auto-Sync Notification Bar */}
              <div className="px-5 py-2.5 bg-emerald-50/90 border-b border-emerald-100 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Available in Student Portal • Translated into {currentLangObj.name} ({currentLangObj.nativeName})</span>
                </div>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('student_notes')}
                    className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>View Student Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Header Bar */}
              <div className="p-5 border-b border-neutral-100 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    <span>Source: {convertedNote.fileName}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{currentLangObj.name} Mother Tongue</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 mt-0.5">
                    {convertedNote.title.motherTongue || convertedNote.title.english}
                  </h3>
                  {convertedNote.title.transliteration && (
                    <div className="text-xs font-mono text-neutral-500 mt-0.5">
                      Phonetics: <span className="font-semibold text-neutral-800">{convertedNote.title.transliteration}</span>
                      {convertedNote.title.english && ` • English: "${convertedNote.title.english}"`}
                    </div>
                  )}
                </div>

                {/* Top Action Toolbar */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="listen-notes-btn"
                    onClick={handleToggleAudio}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      audioPlaying
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs animate-pulse'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {audioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{audioPlaying ? 'Stop Audio' : 'Listen in MT'}</span>
                  </button>

                  <button
                    id="copy-notes-btn"
                    onClick={handleCopy}
                    className="p-2 rounded-xl text-xs font-bold border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                    title="Copy full translated notes"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    id="print-notes-btn"
                    onClick={handlePrint}
                    className="p-2 rounded-xl text-xs font-bold border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                    title="Print / Save PDF handout"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* View Switcher Tabs */}
              <div className="px-5 pt-3 pb-2 border-b border-neutral-100 flex items-center gap-1 bg-white">
                <button
                  id="view-bilingual-btn"
                  onClick={() => setActiveView('bilingual')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeView === 'bilingual'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bilingual Dual View</span>
                </button>

                <button
                  id="view-mt-btn"
                  onClick={() => setActiveView('mother_tongue')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeView === 'mother_tongue'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Mother Tongue Child View</span>
                </button>

                <button
                  id="view-english-btn"
                  onClick={() => setActiveView('source_english')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeView === 'source_english'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Extracted English Source</span>
                </button>
              </div>

              {/* View Content Body */}
              <div className="p-5 space-y-6">
                {/* 1. BILINGUAL DUAL VIEW */}
                {activeView === 'bilingual' && (
                  <div className="space-y-6">
                    {/* Lesson Overview Banner */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Lesson Overview & Motivation</span>
                      </div>
                      <div className="text-base font-bold text-neutral-900 leading-relaxed">
                        {convertedNote.overviewMt}
                      </div>
                      {convertedNote.transliterationOverview && (
                        <div className="text-xs font-mono text-emerald-900">
                          Phonetic: {convertedNote.transliterationOverview}
                        </div>
                      )}
                      <div className="text-xs text-neutral-600 border-t border-emerald-200/60 pt-2 mt-2">
                        <strong>Teacher Guide:</strong> {convertedNote.overviewEn}
                      </div>
                    </div>

                    {/* Lesson Sections */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        Converted Lesson Concepts ({convertedNote.sections.length} Units)
                      </div>
                      {convertedNote.sections.map((section, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors space-y-3 bg-white"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                            <span className="font-extrabold text-sm text-neutral-900">
                              Unit {idx + 1}: {section.headingMt || section.headingEn}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                              {section.headingEn}
                            </span>
                          </div>

                          {/* Mother tongue explanation */}
                          <div className="text-sm font-semibold text-neutral-900 leading-relaxed">
                            {section.contentMt}
                          </div>

                          {/* Latin pronunciation guide */}
                          {section.transliteration && (
                            <div className="text-xs font-mono text-neutral-600 bg-neutral-50 p-2 rounded-lg border border-neutral-200/60">
                              <span className="font-bold text-neutral-700">Pronounce: </span>
                              {section.transliteration}
                            </div>
                          )}

                          {/* Child Relatable Metaphor */}
                          {section.childExplanation && (
                            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">Village Child Metaphor: </span>
                                <span>{section.childExplanation}</span>
                              </div>
                            </div>
                          )}

                          {/* English parallel */}
                          <div className="text-xs text-neutral-500 border-t border-neutral-100 pt-2">
                            <strong>Textbook English: </strong>
                            {section.contentEn}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Vocabulary Table */}
                    {convertedNote.keyVocabulary && convertedNote.keyVocabulary.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Essential Lesson Vocabulary ({convertedNote.keyVocabulary.length} Terms)</span>
                          <span className="text-[11px] text-emerald-700 font-medium">Click speaker for audio</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {convertedNote.keyVocabulary.map((term, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 flex items-start justify-between gap-2"
                            >
                              <div className="space-y-0.5">
                                <div className="text-sm font-black text-neutral-900">{term.motherTongueTerm}</div>
                                <div className="text-xs font-mono text-emerald-700">{term.transliteration}</div>
                                <div className="text-xs text-neutral-700">
                                  <strong>{term.englishTerm}:</strong> {term.meaning}
                                </div>
                                {term.villageExample && (
                                  <div className="text-[11px] text-neutral-500 italic mt-0.5">
                                    "{term.villageExample}"
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleSpeakTerm(term.motherTongueTerm)}
                                className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 cursor-pointer shrink-0"
                                title="Listen pronunciation"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Classroom Activities */}
                    {convertedNote.classroomActivities && convertedNote.classroomActivities.length > 0 && (
                      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                        <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Suggested Hands-on Classroom Activities</span>
                        </div>
                        <ul className="space-y-1 text-xs text-neutral-700 list-disc list-inside">
                          {convertedNote.classroomActivities.map((act, i) => (
                            <li key={i} className="leading-relaxed">
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pedagogic Bridging Tip */}
                    {convertedNote.pedagogicBridgingTip && (
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Bridging Advice: </span>
                          <span>{convertedNote.pedagogicBridgingTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. MOTHER TONGUE CHILD VIEW (Clean, Large Typography for Children) */}
                {activeView === 'mother_tongue' && (
                  <div className="p-6 bg-neutral-50/50 rounded-2xl border border-neutral-200 space-y-6">
                    <div className="text-center space-y-1 pb-4 border-b border-neutral-200">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold font-mono">
                        {currentLangObj.name} ({currentLangObj.nativeName})
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-2">
                        {convertedNote.title.motherTongue}
                      </h2>
                      <p className="text-sm font-mono text-neutral-600">{convertedNote.title.transliteration}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 bg-white rounded-xl border border-neutral-200 text-base font-bold text-neutral-900 leading-relaxed">
                        {convertedNote.overviewMt}
                      </div>

                      {convertedNote.sections.map((sec, i) => (
                        <div key={i} className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
                          <h4 className="text-lg font-black text-emerald-800">{sec.headingMt}</h4>
                          <p className="text-base font-medium text-neutral-900 leading-relaxed">{sec.contentMt}</p>
                          {sec.childExplanation && (
                            <p className="text-xs text-neutral-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                              💡 {sec.childExplanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. EXTRACTED SOURCE ENGLISH */}
                {activeView === 'source_english' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-mono text-neutral-800 leading-relaxed whitespace-pre-wrap">
                      {convertedNote.extractedEnglishText || extractedText}
                    </div>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-neutral-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Converts English PDFs directly into student mother tongue</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      id="save-to-lesson-gen-btn"
                      onClick={handleUseInLessonGenerator}
                      className="w-full sm:w-auto px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Use in Lesson Generator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-neutral-300 space-y-3">
              <FileUp className="w-10 h-10 text-neutral-300 mx-auto" />
              <div className="text-sm font-bold text-neutral-700">No Lesson Notes Converted Yet</div>
              <div className="text-xs text-neutral-500 max-w-sm mx-auto">
                Upload an English PDF lesson note on the left or select one of the sample curriculum notes to view the
                instant mother-tongue conversion.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
