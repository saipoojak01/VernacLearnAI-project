import React, { useState, useEffect } from 'react';
import { Screen, LanguageCode, StudentRecord } from '../types';
import { DEMO_LESSONS, SUPPORTED_LANGUAGES, DEMO_QUIZ_QUESTIONS_BY_LANG } from '../data/demoData';
import { getRemedialLesson } from '../data/remedialLessonsData';
import { speechService } from '../utils/speech';
import { AudioButton } from '../components/AudioButton';
import {
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Star,
  Check,
  RotateCcw,
  Sun,
  Droplets,
  Wind,
  Play,
  Pause,
  Award,
  HelpCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface StudentLearningProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  students?: StudentRecord[];
  onUpdateStudents?: (students: StudentRecord[]) => void;
  studentScore?: number;
  onUpdateStudentScore?: (score: number) => void;
  selectedLessonId?: string;
  onSelectLessonId?: (id: string) => void;
}

export const StudentLearning: React.FC<StudentLearningProps> = ({
  onNavigate,
  selectedLanguage,
  students,
  onUpdateStudents,
  studentScore = 4,
  onUpdateStudentScore,
  selectedLessonId = 'plants_needs',
  onSelectLessonId,
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const lesson = DEMO_LESSONS[selectedLanguage] || DEMO_LESSONS.santhali;
  const activeRemedial = getRemedialLesson(selectedLessonId);

  // Audio Playback State
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused' | 'completed'>('idle');

  // Interactive 5-Question Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [showDetailedReview, setShowDetailedReview] = useState(false);

  const textToRead = `${lesson.translatedContent}. ${lesson.childFriendlyExplanationMt}`;

  useEffect(() => {
    return () => {
      // Clean up audio on unmount
      speechService.stop();
    };
  }, []);

  // Audio Controller
  const handleToggleAudio = () => {
    if (audioState === 'playing') {
      speechService.pause();
      setAudioState('paused');
    } else if (audioState === 'paused') {
      speechService.resume();
      setAudioState('playing');
    } else {
      // Start or Replay
      setAudioState('playing');
      const success = speechService.speak(textToRead, {
        lang: currentLang.speechCode,
        rate: 0.82,
        onStart: () => setAudioState('playing'),
        onEnd: () => setAudioState('completed'),
        onError: () => setAudioState('completed'),
      });

      if (!success) {
        // Fallback simulation timer for Web Speech API
        setTimeout(() => setAudioState('completed'), 4000);
      }
    }
  };

  const handleReplayAudio = () => {
    speechService.stop();
    setAudioState('playing');
    const success = speechService.speak(textToRead, {
      lang: currentLang.speechCode,
      rate: 0.82,
      onStart: () => setAudioState('playing'),
      onEnd: () => setAudioState('completed'),
      onError: () => setAudioState('completed'),
    });

    if (!success) {
      setTimeout(() => setAudioState('completed'), 4000);
    }
  };

  // Quiz Controller
  const questions = DEMO_QUIZ_QUESTIONS_BY_LANG[selectedLanguage] || DEMO_QUIZ_QUESTIONS_BY_LANG.santhali;
  const currentQ = questions[currentQuestionIndex] || questions[0];
  const selectedOptionId = userAnswers[currentQ?.id];

  const handleSelectOption = (optionId: string) => {
    if (quizSubmitted || !currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      const selected = userAnswers[q.id];
      const correctOpt = q.options.find((opt) => opt.isCorrect);
      if (selected && correctOpt && selected === correctOpt.id) {
        score += 1;
      }
    });

    setFinalScore(score);
    setQuizSubmitted(true);

    if (onUpdateStudentScore) {
      onUpdateStudentScore(score);
    }

    // Persist score in student record
    if (students && onUpdateStudents) {
      const updated = students.map((s) => {
        if (s.id === 's3' || s.rollNumber === 'STD-304' || s.name.includes('Birsa')) {
          const newRate = Math.round((score / 5) * 100);
          return {
            ...s,
            currentScore: score,
            understandingRate: newRate,
            status: score >= 4 ? ('Mastered' as const) : ('Needs Support' as const),
            assessmentScore: score,
            learningProgress: Math.min(100, (s.learningProgress || 80) + (score >= 4 ? 10 : 0)),
          };
        }
        return s;
      });
      onUpdateStudents(updated);
    }
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setFinalScore(null);
    setCurrentQuestionIndex(0);
    setShowDetailedReview(false);
  };

  const getEvaluationFeedback = (score: number) => {
    const feedbackByLang: Record<LanguageCode, { high: string; mid: string; low: string }> = {
      santhali: {
        high: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! (Excellent)',
        mid: 'ᱱᱟᱯᱟᱭ ᱠᱩᱨᱩᱢᱩᱴᱩ! (Good Progress)',
        low: 'ᱟᱨᱦᱚᱸ ᱯᱟᱲᱦᱟᱣ ᱢᱮ (Needs Practice)',
      },
      gondi: {
        high: 'सबलून बेस! (Excellent)',
        mid: 'बेस प्रयास! (Good Progress)',
        low: 'आरो वासी कीम (Needs Practice)',
      },
      bhojpuri: {
        high: 'बहुत बढ़िया! (Excellent)',
        mid: 'बढ़िया कोशिश! (Good Progress)',
        low: 'अउरी अभ्यास करीं (Needs Practice)',
      },
      maithili: {
        high: 'अति उत्तम! (Excellent)',
        mid: 'सुंदर प्रयास! (Good Progress)',
        low: 'आरो अभ्यास करू (Needs Practice)',
      },
      odia: {
        high: 'ବହୁତ ବଢ଼ିଆ! (Excellent)',
        mid: 'ଭଲ ପ୍ରୟାସ! (Good Progress)',
        low: 'ପୁଣି ଅଭ୍ୟାସ କରନ୍ତୁ (Needs Practice)',
      },
      marathi: {
        high: 'खूप छान! (Excellent)',
        mid: 'चांगला प्रयत्न! (Good Progress)',
        low: 'पुन्हा सराव करा (Needs Practice)',
      },
    };

    const fb = feedbackByLang[selectedLanguage] || feedbackByLang.santhali;

    if (score >= 4) {
      return {
        label: 'Excellent - Great Concept Grasp!',
        nativeLabel: fb.high,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        textColor: 'text-emerald-800',
        description: 'You understand how green leaves capture sunlight to make food for the whole plant!',
      };
    }
    if (score === 3) {
      return {
        label: 'Good Progress - Keep Practicing!',
        nativeLabel: fb.mid,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        textColor: 'text-blue-800',
        description: 'You have a solid foundation. Listen to the mother-tongue audio once more to master leaf energy.',
      };
    }
    return {
      label: 'Needs Practice - Review Lesson Audio',
      nativeLabel: fb.low,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      textColor: 'text-amber-800',
      description: 'Review the kitchen fire story to understand how sunlight helps plants cook food in leaves.',
    };
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Navigation */}
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

        <button
          id="student-learning-back-btn"
          onClick={() => onNavigate('student_lessons')}
          className="px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Lessons</span>
        </button>
      </div>

      {/* SECTION 1: MOTHER-TONGUE TEACHING CARD & AUDIO PLAYER */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-6">
        {/* Card Header with Audio Play / Pause / Replay Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 block">
                Mother-Tongue Teaching Card
              </span>
              <span className="text-[11px] text-neutral-500">
                Primary Standard • {currentLang.nativeName} ({currentLang.script})
              </span>
            </div>
          </div>

          {/* AUDIO CONTROLLER WITH VISUAL FEEDBACK */}
          <div className="flex items-center gap-2 bg-neutral-50 p-1.5 rounded-2xl border border-neutral-200">
            {audioState === 'completed' ? (
              <button
                id="replay-audio-btn"
                onClick={handleReplayAudio}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>↻ Replay Audio</span>
              </button>
            ) : audioState === 'playing' ? (
              <button
                id="pause-audio-btn"
                onClick={handleToggleAudio}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95 animate-pulse"
              >
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>⏸ Pause Audio</span>
              </button>
            ) : audioState === 'paused' ? (
              <button
                id="resume-audio-btn"
                onClick={handleToggleAudio}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>▶ Resume Audio</span>
              </button>
            ) : (
              <button
                id="play-audio-btn"
                onClick={handleToggleAudio}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>▶ Play Audio</span>
              </button>
            )}

            {/* Audio state badge */}
            <div className="px-2.5 py-1 text-[11px] font-medium text-neutral-600 hidden sm:block">
              {audioState === 'playing' ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Playing audio...
                </span>
              ) : audioState === 'paused' ? (
                <span className="text-amber-700 font-semibold">Audio paused</span>
              ) : audioState === 'completed' ? (
                <span className="text-neutral-500">Audio finished</span>
              ) : (
                <span>Audio ready</span>
              )}
            </div>
          </div>
        </div>

        {/* Vernacular Script Display */}
        <div className="p-5 sm:p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
          <div className="text-xl sm:text-3xl font-extrabold text-neutral-900 leading-relaxed">
            {lesson.translatedContent}
          </div>
          <div className="text-xs sm:text-sm font-mono text-emerald-900 font-medium">
            {lesson.transliteration}
          </div>
        </div>

        {/* Child-Friendly Explanation */}
        <div className="space-y-2">
          <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{lesson.childFriendlyTitle}</span>
          </h3>
          <p className="text-sm text-neutral-800 font-medium leading-relaxed">
            {lesson.childFriendlyExplanationMt}
          </p>
          <p className="text-xs text-neutral-500 italic pt-1 border-t border-neutral-100">
            "{lesson.childFriendlyExplanation}"
          </p>
        </div>

        {/* 3 Visual Science Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-1">
            <Sun className="w-6 h-6 text-amber-600 mx-auto" />
            <div className="font-bold text-neutral-900">Sunlight Energy (ᱥᱤᱛᱩᱝ)</div>
            <div className="text-[11px] text-neutral-600">Powers food cooking in leaves</div>
          </div>

          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200/80 space-y-1">
            <Droplets className="w-6 h-6 text-sky-600 mx-auto" />
            <div className="font-bold text-neutral-900">Water (ᱫᱟᱜ)</div>
            <div className="text-[11px] text-neutral-600">Drank by roots from soil</div>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1">
            <Wind className="w-6 h-6 text-emerald-600 mx-auto" />
            <div className="font-bold text-neutral-900">Fresh Air (ᱦᱚᱭ)</div>
            <div className="text-[11px] text-neutral-600">Absorbed through tiny pores</div>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE PRACTICE / QUICK CHECK (5 QUESTIONS) */}
      <div
        id="student-interactive-practice-section"
        className="p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">
                Interactive Practice: Quick Check (ᱠᱩᱠᱞᱤ ᱟᱨ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ)
              </h2>
              <p className="text-xs text-neutral-500">
                Test your understanding with 5 questions in your mother tongue.
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          {!quizSubmitted && (
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-neutral-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="w-24 bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* QUIZ CONTENT OR RESULT VIEW */}
        {!quizSubmitted ? (
          <div className="space-y-6">
            {/* Question Text */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Question {currentQuestionIndex + 1} • {currentQ.targetConcept}
                </div>
                <AudioButton
                  textToSpeak={currentQ.questionTextMt}
                  langCode={currentLang.speechCode}
                  size="sm"
                  label="Listen Question"
                  variant="subtle"
                />
              </div>
              <div className="text-base sm:text-lg font-extrabold text-neutral-900 leading-snug">
                {currentQ.questionTextMt}
              </div>
              <div className="text-xs text-neutral-500 font-medium">
                {currentQ.questionTextEn}
              </div>
            </div>

            {/* 4 Options (A, B, C, D) */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Choose the best answer:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      id={`quiz-option-${currentQ.id}-${opt.id}`}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-bold shadow-xs'
                          : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-neutral-900">{opt.textMt}</div>
                          <div className="text-xs text-neutral-500 font-normal">{opt.textEn}</div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <button
                id="quiz-prev-btn"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  currentQuestionIndex === 0
                    ? 'border-neutral-200 text-neutral-300 cursor-not-allowed opacity-50'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    id="quiz-next-btn"
                    onClick={handleNext}
                    disabled={!selectedOptionId}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      selectedOptionId
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs cursor-pointer active:scale-95'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    id="quiz-submit-btn"
                    onClick={handleSubmitQuiz}
                    disabled={!selectedOptionId}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedOptionId
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer active:scale-95'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Finish Practice</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* RESULT VIEW */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Score Result Card */}
            {finalScore !== null && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 border border-emerald-200 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-600 text-white shadow-lg mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Practice Completed!
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
                    Your Score: {finalScore} / {questions.length} ({Math.round((finalScore / questions.length) * 100)}%)
                  </h3>
                </div>

                {/* Feedback pill */}
                {(() => {
                  const fb = getEvaluationFeedback(finalScore);
                  return (
                    <div className="max-w-md mx-auto space-y-1.5">
                      <div
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold border ${fb.badgeColor}`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{fb.label}</span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                        {fb.description}
                      </p>
                    </div>
                  );
                })()}

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    id="retake-practice-btn"
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2.5 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Practice</span>
                  </button>

                  <button
                    id="toggle-review-btn"
                    onClick={() => setShowDetailedReview(!showDetailedReview)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-neutral-600" />
                    <span>{showDetailedReview ? 'Hide Answer Review' : 'Review All 5 Answers'}</span>
                  </button>

                  <button
                    id="goto-remedial-btn"
                    onClick={() => {
                      if (onSelectLessonId) {
                        onSelectLessonId(selectedLessonId);
                      }
                      onNavigate('remedial');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all"
                  >
                    <span>Play {activeRemedial.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* DETAILED ANSWER REVIEW */}
            {showDetailedReview && (
              <div className="space-y-4 pt-4 border-t border-neutral-100 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-900">
                    Comprehensive Question Breakdown (5 Items)
                  </h4>
                  <span className="text-xs text-neutral-500 font-mono">
                    Deterministic Scoring
                  </span>
                </div>

                <div className="space-y-3">
                  {questions.map((q, idx) => {
                    const userOptId = userAnswers[q.id];
                    const correctOpt = q.options.find((o) => o.isCorrect);
                    const isCorrect = userOptId === correctOpt?.id;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border text-xs space-y-2 ${
                          isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-amber-50/50 border-amber-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-bold text-neutral-900">
                            {idx + 1}. {q.questionTextMt}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 flex items-center gap-1 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Correct
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Missed
                              </>
                            )}
                          </span>
                        </div>

                        <div className="text-neutral-500">{q.questionTextEn}</div>

                        <div className="pt-2 border-t border-neutral-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <span className="font-bold text-neutral-600">Your Selection: </span>
                            <span
                              className={`font-semibold ${
                                isCorrect ? 'text-emerald-800' : 'text-amber-900'
                              }`}
                            >
                              Option {userOptId || 'None'} -{' '}
                              {q.options.find((o) => o.id === userOptId)?.textEn || 'Unanswered'}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-emerald-800">Correct Answer: </span>
                            <span className="font-semibold text-emerald-900">
                              Option {correctOpt?.id} - {correctOpt?.textEn}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-neutral-700 bg-white/70 p-2.5 rounded-xl border border-neutral-200/60 mt-1">
                          <strong>Pedagogy note: </strong>
                          {q.explanationMt} ({q.explanationEn})
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
