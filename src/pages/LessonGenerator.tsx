import React, { useState, useEffect } from 'react';
import { Screen, LanguageCode, LearningContext, LessonContent } from '../types';
import { DEMO_LESSONS, SUPPORTED_LANGUAGES } from '../data/demoData';
import { AudioButton } from '../components/AudioButton';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  CheckCircle2,
  Globe2,
  MapPin,
  HelpCircle,
  Layers,
  Sun,
  Droplets,
  Wind,
  Smile,
  Eye,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

interface LessonGeneratorProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  learningContext: LearningContext;
  onSelectContext: (ctx: LearningContext) => void;
}

export const LessonGenerator: React.FC<LessonGeneratorProps> = ({
  onNavigate,
  selectedLanguage,
  learningContext,
  onSelectContext,
}) => {
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  const generationSteps = [
    'Understanding curriculum context (Class 3 Science)...',
    'Adapting content for primary learners (Ages 7–9)...',
    'Preparing context-aware mother-tongue translation...',
    'Injecting local village & agricultural surroundings...',
    'Generating interactive visual & phonetic speech...',
  ];

  useEffect(() => {
    // Elegant deterministic loading animation (runs in ~1.8s)
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < generationSteps.length) {
        setGenerationStep(current);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 380);

    return () => clearInterval(interval);
  }, [selectedLanguage, learningContext]);

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const lesson: LessonContent =
    DEMO_LESSONS[selectedLanguage] || DEMO_LESSONS['santhali'];

  const localExample =
    lesson.localContextExamples.find((ex) => ex.context === learningContext) ||
    lesson.localContextExamples[0];

  if (isGenerating) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 max-w-xl mx-auto text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            AI Pedagogical Engine in Progress
          </h2>
          <p className="text-sm font-medium text-emerald-700 h-6 transition-all duration-300">
            {generationSteps[generationStep]}
          </p>
        </div>

        {/* Progress steps pill indicator */}
        <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-neutral-900 h-full rounded-full transition-all duration-300"
            style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
          />
        </div>

        <div className="text-xs text-neutral-400">
          Adapting NCERT Science for {currentLang.name} in {learningContext.replace('_', ' ')} context
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Class 3 Science</span>
            <span>•</span>
            <span>Unit 2: Plant Nutrition</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">{currentLang.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {lesson.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="regen-lesson-btn"
            onClick={() => {
              setIsGenerating(true);
              setGenerationStep(0);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>

          <button
            id="lesson-to-translate-btn"
            onClick={() => onNavigate('translate')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Translate & Adapt</span>
          </button>

          <button
            id="lesson-to-gaps-btn"
            onClick={() => onNavigate('gap_analysis')}
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer active:scale-98 transition-all"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Learning Gap AI</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Original Lesson */}
      <div className="p-5 rounded-2xl bg-neutral-100/80 border border-neutral-200/90 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Section 1: Original Curriculum Standard (NCERT)
          </span>
          <span className="text-xs text-neutral-400 font-mono">Source: English / Hindi</span>
        </div>
        <p className="text-lg font-semibold text-neutral-800 italic">
          "{lesson.originalCurriculumText}"
        </p>
      </div>

      {/* SECTION 2: AI Context-Aware Translation */}
      <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-3.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              Section 2: Context-Aware Educational Translation
            </span>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900 font-mono">
            {currentLang.nativeName}
          </span>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
            {lesson.translatedContent}
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Phonetic Transliteration & Reading Guide
              </span>
              <span className="font-mono text-neutral-700 font-medium">
                {lesson.transliteration}
              </span>
            </div>

            <AudioButton
              textToSpeak={lesson.phoneticAudioText || lesson.translatedContent}
              langCode={currentLang.speechCode}
              label="Listen in Mother Tongue"
              variant="primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Child-Friendly Explanation */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Smile className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Section 3: {lesson.childFriendlyTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Mother Tongue Simplified Analogy
            </span>
            <p className="text-sm text-neutral-800 font-medium leading-relaxed">
              {lesson.childFriendlyExplanationMt}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              English Pedagogy Alignment
            </span>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {lesson.childFriendlyExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Local Context Example */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Section 4: Learn from Your Surroundings (Local Context)
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span>Context:</span>
            <span className="font-semibold text-neutral-900 capitalize">
              {learningContext.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
          <div className="font-bold text-sm text-neutral-900">
            📍 {localExample.title}
          </div>
          <p className="text-sm text-neutral-800 font-medium leading-relaxed">
            {localExample.descriptionMt}
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed pt-1 border-t border-neutral-200/60">
            {localExample.description}
          </p>
        </div>
      </div>

      {/* SECTION 5: Visual Learning Diagram & SECTION 6: Key Audio Vocabulary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Learning Card */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Section 5: Visual Learning Diagram
            </h3>
          </div>

          {/* Interactive Clean Plant Biology Visual */}
          <div className="relative p-6 rounded-xl bg-gradient-to-b from-sky-50 via-emerald-50/40 to-amber-50/60 border border-neutral-200/80 flex flex-col items-center justify-center min-h-[220px] text-center overflow-hidden">
            {/* Sun */}
            <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-300 mb-4 animate-pulse">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>
                Sunlight Energy ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('sun'))?.vernacularTerm || 'Sunlight'})
              </span>
            </div>

            {/* Plant Icon & Canopy */}
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-600 text-white shadow-md">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="text-xs font-bold text-emerald-900 mt-1">
                Green Leaf = Plant Kitchen ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('leaf'))?.vernacularTerm || 'Leaf'})
              </div>
              <div className="text-[11px] text-neutral-600">
                Traps sunlight energy to make food
              </div>
            </div>

            {/* Roots & Water */}
            <div className="mt-4 flex items-center gap-3 text-xs font-medium text-neutral-700">
              <div className="flex items-center gap-1 bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-md border border-sky-200">
                <Droplets className="w-3.5 h-3.5 text-sky-600" />
                <span>
                  Water ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('water'))?.vernacularTerm || 'Water'})
                </span>
              </div>
              <div className="flex items-center gap-1 bg-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-md">
                <Wind className="w-3.5 h-3.5 text-neutral-600" />
                <span>
                  Air ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('air'))?.vernacularTerm || 'Air'})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Vocabulary & Audio Card */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Section 6: Audio Vocabulary Layer
              </h3>
            </div>

            <div className="space-y-2">
              {lesson.keyVocabulary.map((vocab, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-neutral-900">{vocab.vernacularTerm}</div>
                    <div className="text-[11px] text-neutral-500">{vocab.term} — {vocab.meaning}</div>
                  </div>
                  <AudioButton
                    textToSpeak={`${vocab.term}. In ${currentLang.nativeName}: ${vocab.vernacularTerm}`}
                    langCode={currentLang.speechCode}
                    size="sm"
                    label="Audio"
                    variant="subtle"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
            <button
              id="lesson-bottom-translate-btn"
              onClick={() => onNavigate('translate')}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Translate & Adapt Content</span>
            </button>

            <button
              id="lesson-bottom-gaps-btn"
              onClick={() => onNavigate('gap_analysis')}
              className="py-3 px-5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Review Learning Gaps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
