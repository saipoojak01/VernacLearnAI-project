import React, { useState } from 'react';
import { Screen, LanguageCode, StudentRecord, VocabularyItem, ConvertedLessonNote } from '../types';
import {
  SUPPORTED_LANGUAGES,
  DEMO_LESSONS,
  INITIAL_VOCABULARY_BASE,
  INITIAL_STUDENT_RECORD,
} from '../data/demoData';
import { GREETINGS_BY_LANG, generateLessonNotesConversionFallback } from '../utils/translation';
import { AudioButton } from '../components/AudioButton';
import { StudentUploadedNotes } from '../components/StudentUploadedNotes';
import { SAMPLE_ENGLISH_NOTES } from '../components/LessonNotesConverter';
import {
  BookOpen,
  Sparkles,
  Volume2,
  Award,
  TrendingUp,
  Star,
  CheckCircle2,
  Play,
  ArrowRight,
  Sun,
  Droplets,
  Wind,
  Search,
  Check,
  Calendar,
  Layers,
  Heart,
  Globe2,
  FileText,
  FileUp,
} from 'lucide-react';

interface StudentPortalProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  studentScore: number;
  remedialCompleted: boolean;
  vocabulary?: VocabularyItem[];
  studentName?: string;
  rollNumber?: string;
  selectedLessonId?: string;
  onSelectLessonId?: (id: string) => void;
  uploadedNotes?: ConvertedLessonNote[];
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  currentScreen,
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  studentScore,
  remedialCompleted,
  vocabulary = INITIAL_VOCABULARY_BASE,
  studentName = 'Birsa Soren',
  rollNumber = 'STD-304',
  selectedLessonId = 'plants_needs',
  onSelectLessonId,
  uploadedNotes,
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const lesson = DEMO_LESSONS[selectedLanguage] || DEMO_LESSONS.santhali;
  const student = { ...INITIAL_STUDENT_RECORD, name: studentName, rollNumber };

  // Notes uploaded at staff portal, adapted into student's current mother tongue
  const effectiveNotes: ConvertedLessonNote[] = React.useMemo(() => {
    const rawList =
      uploadedNotes && uploadedNotes.length > 0
        ? uploadedNotes
        : SAMPLE_ENGLISH_NOTES.map((s) =>
            generateLessonNotesConversionFallback(
              s.fileName,
              s.content,
              selectedLanguage || 'santhali',
              s.size
            )
          );

    return rawList.map((n) => {
      if (n.targetLanguage === selectedLanguage) return n;
      return generateLessonNotesConversionFallback(
        n.fileName,
        n.rawExtractedText || n.title.english || '',
        selectedLanguage,
        n.fileSize
      );
    });
  }, [uploadedNotes, selectedLanguage]);

  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState('All');

  const score = remedialCompleted ? 5 : studentScore || 4;
  const masteryPct = remedialCompleted ? 100 : Math.round((score / 5) * 100);

  // Filtered vocabulary for student view (only verified terms)
  const verifiedVocab = vocabulary.filter(
    (v) => v.status === 'verified' || !v.status
  );

  const filteredVocab = verifiedVocab.filter((item) => {
    const matchesCat =
      selectedVocabCategory === 'All' || item.category === selectedVocabCategory;
    const query = vocabSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.english.toLowerCase().includes(query) ||
      item.hindi.toLowerCase().includes(query) ||
      item.motherTongue.toLowerCase().includes(query) ||
      item.transliteration.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const availableCategories = [
    'All',
    'Plants',
    'Animals',
    'Numbers',
    'Daily Life',
    'Education',
  ];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/60 text-emerald-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Primary Class 3 • Mother-Tongue Learning Space</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {GREETINGS_BY_LANG[selectedLanguage]?.greeting || 'ᱡᱚᱦᱟᱨ'}, {student.name}! (Hello {student.name.split(' ')[0] || student.name})
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl font-medium">
              Learn science, math, and stories in your native language <strong>{currentLang.name}</strong> ({currentLang.nativeName}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Stat Pill */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
              <div className="text-2xl font-extrabold text-amber-300">{masteryPct}%</div>
              <div className="text-[11px] text-emerald-200 font-semibold">Class Mastery</div>
            </div>

            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
              <div className="text-2xl font-extrabold text-white">
                {remedialCompleted ? '4 / 4' : '3 / 4'}
              </div>
              <div className="text-[11px] text-emerald-200 font-semibold">Lessons Done</div>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Sub-Navigation for Student Views */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 overflow-x-auto">
        <button
          onClick={() => onNavigate('student_home')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            currentScreen === 'student_home' || currentScreen === 'student_lessons'
              ? 'bg-neutral-900 text-white shadow-2xs'
              : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
          }`}
        >
          My Primary Lessons
        </button>

        <button
          id="student-nav-translator-btn"
          onClick={() => onNavigate('student_translator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            currentScreen === 'student_translator'
              ? 'bg-neutral-900 text-white shadow-2xs'
              : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Translator (Mother Tongue → English)</span>
        </button>

        <button
          onClick={() => onNavigate('student_vocabulary')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            currentScreen === 'student_vocabulary'
              ? 'bg-neutral-900 text-white shadow-2xs'
              : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
          }`}
        >
          Picture Dictionary ({verifiedVocab.length} Words)
        </button>

        <button
          id="student-nav-notes-btn"
          onClick={() => onNavigate('student_notes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            currentScreen === 'student_notes'
              ? 'bg-neutral-900 text-white shadow-2xs'
              : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          <span>Uploaded Notes ({effectiveNotes.length})</span>
          <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
            Translated
          </span>
        </button>

        <button
          onClick={() => onNavigate('student_progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            currentScreen === 'student_progress'
              ? 'bg-neutral-900 text-white shadow-2xs'
              : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
          }`}
        >
          My Progress & Badges
        </button>
      </div>

      {/* VIEW 1: MY LESSONS (STUDENT HOME) */}
      {(currentScreen === 'student_home' || currentScreen === 'student_lessons') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Assigned Lessons for Class 3</span>
            </h2>
            <span className="text-xs font-semibold text-neutral-500 font-mono">
              Language: {currentLang.name}
            </span>
          </div>

          {/* Featured Active Lesson Card */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border-2 border-emerald-500/80 shadow-md space-y-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold">
                  Active Lesson
                </span>
                <span className="text-xs text-neutral-400 font-medium">Science • Chapter 4</span>
              </div>
              <div className="flex items-center gap-2">
                <AudioButton
                  text={`${lesson.translatedContent}. ${lesson.childFriendlyExplanationMt}`}
                  languageCode={currentLang.speechCode}
                  label="Play Audio"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-neutral-900">{lesson.title}</h3>
              <p className="text-lg font-extrabold text-emerald-950 font-serif">
                {lesson.translatedContent}
              </p>
              <p className="text-xs font-mono text-neutral-500">{lesson.transliteration}</p>
            </div>

            {/* Child Friendly Story Summary */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{lesson.childFriendlyTitle}</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                {lesson.childFriendlyExplanationMt}
              </p>
            </div>

            {/* 3 Quick Visual Features */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-950 font-semibold flex flex-col items-center gap-1">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>
                  Sunlight ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('sun'))?.vernacularTerm || 'Sunlight'})
                </span>
              </div>
              <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-200 text-sky-950 font-semibold flex flex-col items-center gap-1">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>
                  Water ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('water'))?.vernacularTerm || 'Water'})
                </span>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-emerald-950 font-semibold flex flex-col items-center gap-1">
                <Wind className="w-4 h-4 text-emerald-600" />
                <span>
                  Air ({lesson.keyVocabulary?.find((v) => v.term.toLowerCase().includes('air'))?.vernacularTerm || 'Air'})
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 font-medium">
                Status: {remedialCompleted ? '✓ Concept Mastered (100%)' : `Score: ${score}/5 (${masteryPct}%)`}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  id="student-play-story-btn"
                  onClick={() => {
                    onSelectLessonId?.('plants_needs');
                    onNavigate('remedial');
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Play Story & Game (Kitchen Fire)</span>
                </button>

                <button
                  id="student-start-learning-btn"
                  onClick={() => {
                    onSelectLessonId?.('plants_needs');
                    onNavigate('student_learning');
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Open Audio Lesson & Quiz</span>
                </button>
              </div>
            </div>
          </div>

          {/* Other Lessons in Curriculum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">Lesson 1</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Completed ✓
                </span>
              </div>
              <h4 className="font-bold text-neutral-900 text-base">Parts of a Plant & Roots</h4>
              <p className="text-xs text-neutral-500 line-clamp-2">
                Learn how underground roots drink water and anchor tall trees into the earth.
              </p>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-100">
                <button
                  onClick={() => {
                    onSelectLessonId?.('plant_roots');
                    onNavigate('student_learning');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Review Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="play-roots-story-btn"
                  onClick={() => {
                    onSelectLessonId?.('plant_roots');
                    onNavigate('remedial');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                >
                  <Sparkles className="w-3 h-3 text-sky-700" />
                  <span>Play Thirsty Roots Game</span>
                </button>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">Lesson 2</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Completed ✓
                </span>
              </div>
              <h4 className="font-bold text-neutral-900 text-base">Living vs Non-Living Things</h4>
              <p className="text-xs text-neutral-500 line-clamp-2">
                Distinguishing breathing animals and growing plants from rocks and tools.
              </p>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-100">
                <button
                  onClick={() => {
                    onSelectLessonId?.('living_things');
                    onNavigate('student_learning');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Review Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="play-living-story-btn"
                  onClick={() => {
                    onSelectLessonId?.('living_things');
                    onNavigate('remedial');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                >
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  <span>Play Sprouting Seed Game</span>
                </button>
              </div>
            </div>
          </div>

          {/* TEACHER UPLOADED NOTES SECTION (TRANSLATED TO MOTHER TONGUE) */}
          <div className="p-6 bg-emerald-50/70 rounded-3xl border border-emerald-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Teacher's Uploaded Notes
                  </span>
                  <span className="text-xs font-bold text-emerald-800">
                    Translated into {currentLang.name} ({currentLang.nativeName})
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-neutral-900 mt-1">
                  Classroom Notes Uploaded by Staff (ᱯᱚᱛᱚᱵ / नोट्स)
                </h3>
              </div>
              <button
                id="view-all-uploaded-notes-btn"
                onClick={() => onNavigate('student_notes')}
                className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer underline"
              >
                <span>Open Full Notes & Audio Reader ({effectiveNotes.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {effectiveNotes.map((noteItem, idx) => (
                <div
                  key={noteItem.id || idx}
                  className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs space-y-2.5 flex flex-col justify-between hover:border-emerald-300 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono font-bold">
                      <span className="truncate max-w-[150px]">{noteItem.fileName}</span>
                      <span className="text-emerald-700 font-sans font-extrabold">Class 3</span>
                    </div>
                    <h4 className="font-extrabold text-neutral-900 text-sm line-clamp-1">
                      {noteItem.title.motherTongue || noteItem.title.english}
                    </h4>
                    {noteItem.title.transliteration && (
                      <p className="text-[11px] font-mono text-neutral-500 line-clamp-1">
                        {noteItem.title.transliteration}
                      </p>
                    )}
                    <p className="text-xs text-neutral-600 line-clamp-2 mt-0.5">
                      {noteItem.sections[0]?.contentMt || noteItem.title.english}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-[11px] font-semibold text-neutral-500">
                      {noteItem.sections.length} Sections • {noteItem.fileSize || 'PDF'}
                    </span>
                    <button
                      onClick={() => onNavigate('student_notes')}
                      className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read & Listen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PICTURE DICTIONARY & VOCABULARY */}
      {currentScreen === 'student_vocabulary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-neutral-900">
                Primary Picture & Audio Dictionary (ᱟᱹᱲᱟᱹ ᱢᱩᱨᱟᱹᱭ)
              </h2>
              <p className="text-xs text-neutral-500">
                Tap the speaker to hear pronunciation in {currentLang.name} ({currentLang.script}).
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search words..."
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedVocabCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedVocabCategory === cat
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vocabulary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3 hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md">
                      {item.category}
                    </span>
                    <AudioButton
                      text={item.transliteration || item.motherTongue}
                      languageCode={currentLang.speechCode}
                      label="Listen"
                    />
                  </div>

                  <div className="text-xl font-extrabold text-neutral-900 pt-1">
                    {item.motherTongue}
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-800">
                    {item.transliteration}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 text-xs space-y-0.5">
                  <div className="font-bold text-neutral-800">{item.english}</div>
                  <div className="text-neutral-500">{item.hindi}</div>
                  <p className="text-[11px] text-neutral-600 pt-1 leading-relaxed">
                    {item.meaningInContext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: MY PROGRESS & BADGES */}
      {currentScreen === 'student_progress' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Learning Achievements & Mastery</span>
            </h2>
            <span className="text-xs text-neutral-500 font-mono">Roll: {student.rollNumber || 'STD-304'}</span>
          </div>

          {/* Summary Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Overall Score</div>
              <div className="text-3xl font-black text-neutral-900">
                {score} / 5 ({masteryPct}%)
              </div>
              <div className="text-xs text-emerald-700 font-semibold">
                {remedialCompleted ? 'Remedial Completed ✓' : 'Support Session Available'}
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Attendance</div>
              <div className="text-3xl font-black text-neutral-900">92%</div>
              <div className="text-xs text-neutral-500 font-medium">46 of 50 Days Present</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Badges Earned</div>
              <div className="text-3xl font-black text-amber-600">
                {remedialCompleted ? '4 Badges' : '3 Badges'}
              </div>
              <div className="text-xs text-neutral-500 font-medium">Science Star, Nature Friend</div>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Earned Badges
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  🌱
                </div>
                <div className="font-bold text-xs text-neutral-900">Plant Detective</div>
                <div className="text-[10px] text-neutral-500">Mastered plant root systems</div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  🗣️
                </div>
                <div className="font-bold text-xs text-neutral-900">Mother-Tongue Speaker</div>
                <div className="text-[10px] text-neutral-500">Learned 20+ {currentLang.name} terms</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  ⭐
                </div>
                <div className="font-bold text-xs text-neutral-900">Quiz Champion</div>
                <div className="text-[10px] text-neutral-500">Completed 3 lesson quizzes</div>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  remedialCompleted
                    ? 'bg-purple-50 border-purple-200 text-neutral-900'
                    : 'bg-neutral-50 border-dashed border-neutral-300 opacity-60'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  ☀️
                </div>
                <div className="font-bold text-xs">Solar Chef Master</div>
                <div className="text-[10px] text-neutral-500">
                  {remedialCompleted ? 'Photosynthesis Gap Solved!' : 'Complete Remedial Story to Unlock'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: UPLOADED NOTES BY TEACHER (TRANSLATED TO MOTHER TONGUE) */}
      {currentScreen === 'student_notes' && (
        <StudentUploadedNotes
          notes={effectiveNotes}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={onSelectLanguage}
          onNavigate={onNavigate}
          onSelectLessonId={onSelectLessonId}
        />
      )}
    </div>
  );
};
