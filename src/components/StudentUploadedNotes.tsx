import React, { useState, useEffect } from 'react';
import {
  ConvertedLessonNote,
  LanguageCode,
  Screen,
} from '../types';
import {
  SUPPORTED_LANGUAGES,
} from '../data/demoData';
import { generateLessonNotesConversionFallback } from '../utils/translation';
import { SAMPLE_ENGLISH_NOTES } from './LessonNotesConverter';
import {
  FileText,
  Volume2,
  VolumeX,
  Languages,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  Check,
  Copy,
  ChevronRight,
  School,
  FileCheck,
} from 'lucide-react';

interface StudentUploadedNotesProps {
  notes?: ConvertedLessonNote[];
  selectedLanguage: LanguageCode;
  onSelectLanguage?: (lang: LanguageCode) => void;
  onNavigate?: (screen: Screen) => void;
  onSelectLessonId?: (id: string) => void;
}

export const StudentUploadedNotes: React.FC<StudentUploadedNotesProps> = ({
  notes = [],
  selectedLanguage,
  onSelectLanguage,
  onNavigate,
  onSelectLessonId,
}) => {
  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  // If no notes provided, ensure we have initial sample translated notes available for students
  const activeNotesList: ConvertedLessonNote[] =
    notes.length > 0
      ? notes
      : SAMPLE_ENGLISH_NOTES.map((sample) =>
          generateLessonNotesConversionFallback(
            sample.fileName,
            sample.content,
            selectedLanguage || 'santhali',
            sample.size
          )
        );

  const [selectedNoteId, setSelectedNoteId] = useState<string>(activeNotesList[0]?.id || 'sample-1');
  const [activeView, setActiveView] = useState<'bilingual' | 'mother_tongue' | 'english'>('bilingual');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeAudioSection, setActiveAudioSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Current selected note
  const rawNote =
    activeNotesList.find((n) => n.id === selectedNoteId) || activeNotesList[0];

  // If the note was created for another language, adapt it automatically to the student's current mother tongue
  const note: ConvertedLessonNote = React.useMemo(() => {
    if (!rawNote) {
      return generateLessonNotesConversionFallback(
        SAMPLE_ENGLISH_NOTES[0].fileName,
        SAMPLE_ENGLISH_NOTES[0].content,
        selectedLanguage || 'santhali',
        SAMPLE_ENGLISH_NOTES[0].size
      );
    }
    if (rawNote.targetLanguage === selectedLanguage) {
      return rawNote;
    }
    // Adapt to student's current mother tongue
    return generateLessonNotesConversionFallback(
      rawNote.fileName,
      rawNote.extractedEnglishText || rawNote.title.english || '',
      selectedLanguage,
      rawNote.fileSize
    );
  }, [rawNote, selectedLanguage]);

  // Filter notes by search query
  const filteredNotes = activeNotesList.filter((n) => {
    const q = searchQuery.toLowerCase();
    return (
      n.title.english?.toLowerCase().includes(q) ||
      n.title.motherTongue?.toLowerCase().includes(q) ||
      n.fileName?.toLowerCase().includes(q)
    );
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Text-To-Speech Synthesis for indigenous script
  const playSpeech = (textToRead: string, sectionIdx?: number) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis audio is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    if (isPlayingAudio && activeAudioSection === sectionIdx) {
      setIsPlayingAudio(false);
      setActiveAudioSection(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9;
    utterance.pitch = 1.05;

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang.startsWith('hi') || v.lang.startsWith('bn') || v.lang.startsWith('or')) ||
      voices[0];
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setActiveAudioSection(sectionIdx ?? -1);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setActiveAudioSection(null);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setActiveAudioSection(null);
    };

    window.speechSynthesis.speak(utterance);
    showToast(`Listening in ${currentLangObj.name} (${currentLangObj.nativeName})...`);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stop audio when unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 border border-neutral-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-emerald-700" />
              Teacher's Uploaded Notes
            </span>
            <span className="text-xs font-bold text-neutral-400">•</span>
            <span className="text-xs font-bold text-emerald-700">
              Translated to {currentLangObj.name} ({currentLangObj.nativeName})
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-neutral-900">
            Mother-Tongue Classroom Notes (ᱚᱞ ᱪᱤᱠᱤ / मातृभाषा)
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 max-w-2xl">
            Read and listen to lesson notes uploaded by your class teacher at the staff portal. Each note is automatically
            translated into your home language with phonetic guides and village stories.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 shrink-0">
          {onNavigate && (
            <button
              onClick={() => onNavigate('student_translator')}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Languages className="w-4 h-4 text-emerald-700" />
              <span>Open AI Translator</span>
            </button>
          )}
        </div>
      </div>

      {/* Notes Selector Shelf */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Available Lesson Documents ({activeNotesList.length})</span>
          </h3>
          <span className="text-[11px] text-neutral-400 font-medium">
            Click any document to read & listen
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeNotesList.map((item) => {
            const isSelected = item.id === selectedNoteId;
            return (
              <button
                key={item.id}
                id={`select-note-${item.id}`}
                onClick={() => setSelectedNoteId(item.id)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wide truncate">
                      {item.fileName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold shrink-0">
                      Class 3
                    </span>
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-sm line-clamp-1">
                    {item.title.motherTongue || item.title.english}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-1">
                    English: "{item.title.english}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px]">
                  <span className="font-semibold text-neutral-400">
                    {item.fileSize || 'PDF Document'}
                  </span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      isSelected ? 'text-emerald-700' : 'text-neutral-500'
                    }`}
                  >
                    <span>{isSelected ? 'Active Note' : 'Read Note'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Converted Note View */}
      {note && (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden space-y-0">
          {/* Note Top Bar */}
          <div className="p-5 md:p-6 bg-neutral-50/80 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-extrabold">
                  {currentLangObj.name} Mother Tongue
                </span>
                <span>•</span>
                <span>Source File: {note.fileName}</span>
                <span>•</span>
                <span>Size: {note.fileSize || '142 KB'}</span>
              </div>

              {/* Title in Mother Tongue */}
              <h1 className="text-xl md:text-2xl font-black text-neutral-900 leading-tight">
                {note.title.motherTongue}
              </h1>

              {/* Phonetics & English Title */}
              <div className="text-xs text-neutral-600 space-y-0.5">
                {note.title.transliteration && (
                  <div className="font-mono text-neutral-600">
                    Phonetic Reading:{' '}
                    <span className="font-semibold text-neutral-900">
                      {note.title.transliteration}
                    </span>
                  </div>
                )}
                {note.title.english && (
                  <div className="text-neutral-500 font-medium">
                    English Title:{' '}
                    <span className="italic text-neutral-800">
                      "{note.title.english}"
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Note Actions Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* Audio Listen Button */}
              <button
                id="student-listen-note-btn"
                onClick={() =>
                  playSpeech(
                    `${note.title.motherTongue}. ${note.sections.map((s) => `${s.headingMt}. ${s.contentMt}`).join('. ')}`,
                    -1
                  )
                }
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer ${
                  isPlayingAudio && activeAudioSection === -1
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                }`}
              >
                {isPlayingAudio && activeAudioSection === -1 ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Listen Full Note</span>
                  </>
                )}
              </button>

              {/* View Switcher */}
              <div className="flex items-center bg-neutral-200/80 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setActiveView('bilingual')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeView === 'bilingual'
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Bilingual
                </button>
                <button
                  onClick={() => setActiveView('mother_tongue')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeView === 'mother_tongue'
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {currentLangObj.name} Only
                </button>
                <button
                  onClick={() => setActiveView('english')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeView === 'english'
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Content Sections */}
          <div className="p-5 md:p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Lesson Sections & Concepts ({note.sections.length})</span>
                </h3>
                <span className="text-xs font-medium text-neutral-400">
                  Click audio icon to listen to any section
                </span>
              </div>

              <div className="space-y-4">
                {note.sections.map((section, idx) => {
                  const isThisPlaying = isPlayingAudio && activeAudioSection === idx;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-3 transition-all hover:bg-neutral-50/90"
                    >
                      {/* Section Title & Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h4 className="font-black text-neutral-900 text-base md:text-lg">
                              {activeView === 'english'
                                ? section.headingEn
                                : section.headingMt}
                            </h4>
                          </div>

                          {activeView === 'bilingual' && section.transliteration && (
                            <div className="text-xs font-mono text-neutral-500 pl-7">
                              Phonetic: {section.transliteration} • English: "
                              {section.headingEn}"
                            </div>
                          )}
                        </div>

                        {/* Play Section Audio */}
                        <button
                          id={`listen-section-${idx}`}
                          onClick={() =>
                            playSpeech(
                              `${section.headingMt}. ${section.contentMt}`,
                              idx
                            )
                          }
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                            isThisPlaying
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-white hover:bg-emerald-50 text-neutral-700 hover:text-emerald-700 border border-neutral-200 shadow-2xs'
                          }`}
                          title="Listen to this section in mother tongue"
                        >
                          {isThisPlaying ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-emerald-600" />
                          )}
                          <span className="text-[11px] hidden sm:inline">
                            {isThisPlaying ? 'Stop' : 'Listen'}
                          </span>
                        </button>
                      </div>

                      {/* Section Body Text */}
                      <div className="pl-0 sm:pl-7 space-y-3">
                        {(activeView === 'bilingual' || activeView === 'mother_tongue') && (
                          <div className="p-3.5 bg-white rounded-xl border border-neutral-200/80 text-neutral-900 text-sm md:text-base leading-relaxed font-medium">
                            {section.contentMt}
                          </div>
                        )}

                        {activeView === 'bilingual' && section.transliteration && (
                          <div className="text-xs font-mono text-neutral-600 bg-neutral-100/80 p-2.5 rounded-lg">
                            <span className="font-bold text-neutral-700">Pronunciation:</span>{' '}
                            {section.transliteration}
                          </div>
                        )}

                        {(activeView === 'bilingual' || activeView === 'english') && (
                          <div className="text-xs md:text-sm text-neutral-600 leading-relaxed bg-neutral-100/60 p-3 rounded-xl">
                            <span className="font-bold text-neutral-800">English Text:</span>{' '}
                            {section.contentEn}
                          </div>
                        )}

                        {/* Cultural Metaphor / Relatable Village Context */}
                        {section.childExplanation && (
                          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-900">
                                Village Connection:
                              </span>{' '}
                              {section.childExplanation}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Vocabulary from Uploaded Notes */}
            {note.keyVocabulary && note.keyVocabulary.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-emerald-600" />
                    <span>Important Words in this Note ({note.keyVocabulary.length})</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-medium">
                    Tap speaker icon to hear pronunciation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {note.keyVocabulary.map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 relative group hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-black text-neutral-900 text-base">
                            {vocab.motherTongueTerm}
                          </div>
                          {vocab.transliteration && (
                            <div className="text-xs font-mono text-neutral-500">
                              {vocab.transliteration}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => playSpeech(`${vocab.motherTongueTerm}. Meaning: ${vocab.englishTerm}`)}
                          className="p-1.5 rounded-lg bg-white hover:bg-emerald-50 text-neutral-600 hover:text-emerald-700 border border-neutral-200 shadow-2xs transition-all cursor-pointer"
                          title="Listen to word"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-700 font-semibold pt-1 border-t border-neutral-100">
                        English: <span className="text-emerald-700 font-bold">{vocab.englishTerm}</span>
                      </div>

                      {(vocab.villageExample || vocab.meaning) && (
                        <p className="text-[11px] text-neutral-500 leading-snug">
                          {vocab.villageExample || vocab.meaning}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Hands-on Activities */}
            {note.classroomActivities && note.classroomActivities.length > 0 && (
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Fun Classroom & Village Learning Activities
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {note.classroomActivities.map((act, actIdx) => (
                    <div
                      key={actIdx}
                      className="p-3 bg-white rounded-xl border border-emerald-100 text-xs text-neutral-800 space-y-1 shadow-2xs"
                    >
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                          {actIdx + 1}
                        </span>
                        <span>Activity {actIdx + 1}</span>
                      </div>
                      <p className="text-neutral-600 leading-relaxed">{act}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100">
              <div className="text-xs text-neutral-500 font-medium">
                Note Synchronized: Verified for NEP 2020 Mother-Tongue Pedagogy
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="student-copy-note-text-btn"
                  onClick={() =>
                    handleCopy(
                      `${note.title.motherTongue}\n\n${note.sections.map((s) => `${s.headingMt}\n${s.contentMt}`).join('\n\n')}`,
                      note.id
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedId === note.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Notes</span>
                    </>
                  )}
                </button>

                {onNavigate && (
                  <button
                    onClick={() => {
                      onSelectLessonId?.('plants_needs');
                      onNavigate('student_learning');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <span>Practice with Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
