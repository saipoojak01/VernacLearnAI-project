import React, { useState } from 'react';
import { Screen, LanguageCode } from '../types';
import { INITIAL_STUDENT_RECORD, SUPPORTED_LANGUAGES, DEMO_ADMIN_LEARNING_GAPS } from '../data/demoData';
import { MULTILINGUAL_DICTIONARY } from '../utils/translation';
import {
  BrainCircuit,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Wand2,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  RefreshCw,
  Search,
} from 'lucide-react';

interface LearningGapAnalysisProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  studentScore: number;
  remedialCompleted: boolean;
  onStartRemedial: () => void;
  studentName?: string;
}

export const LearningGapAnalysis: React.FC<LearningGapAnalysisProps> = ({
  onNavigate,
  selectedLanguage,
  studentScore,
  remedialCompleted,
  onStartRemedial,
  studentName = 'Birsa Soren',
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const student = { ...INITIAL_STUDENT_RECORD, name: studentName };
  const score = studentScore || 4;
  const percentage = Math.round((score / 5) * 100);

  const [gaps, setGaps] = useState(DEMO_ADMIN_LEARNING_GAPS);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Needs Support' | 'In Remediation' | 'Mastered'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLaunchRemedial = () => {
    onStartRemedial();
    onNavigate('remedial');
  };

  const handleResolveGap = (gapId: string) => {
    setGaps((prev) =>
      prev.map((g) => (g.id === gapId ? { ...g, status: 'Mastered', improvement: '+20% (Mastered)' } : g))
    );
    showToast('Learning gap marked as Mastered via remedial cycle.');
  };

  const filteredGaps = gaps.filter(
    (g) => filterStatus === 'All' || g.status === filterStatus
  );

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">OK</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Teacher Pedagogy Engine</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Cognitive AI Diagnostics</span>
            <span>•</span>
            <span className="font-mono text-[11px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
              {currentLang.name} ({currentLang.script})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Learning Gap AI Engine
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Automated root-cause analysis tracing student conceptual errors to mother-tongue terminology mismatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="go-to-assessments-btn"
            onClick={() => onNavigate('assessment')}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View All Assessments</span>
          </button>
          <button
            id="launch-remedial-top-btn"
            onClick={handleLaunchRemedial}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Remedial Studio</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Active Identified Gaps
          </div>
          <div className="text-3xl font-black text-amber-600">
            {gaps.filter((g) => g.status !== 'Mastered').length}
          </div>
          <div className="text-xs text-neutral-500 font-medium">Across 4 Classroom Clusters</div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Diagnostic Confidence
          </div>
          <div className="text-3xl font-black text-emerald-700">98%</div>
          <div className="text-xs text-emerald-700 font-medium">Linguistic Mismatch Traced</div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Gaps Mastered
          </div>
          <div className="text-3xl font-black text-neutral-900">
            {remedialCompleted ? '5 / 5 (100%)' : `${gaps.filter((g) => g.status === 'Mastered').length} / ${gaps.length}`}
          </div>
          <div className="text-xs text-emerald-700 font-medium">Post-Remediation Follow-up</div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Avg. Bridge Time
          </div>
          <div className="text-3xl font-black text-neutral-900">2.4 Days</div>
          <div className="text-xs text-neutral-500 font-medium">Via Vernacular Metaphors</div>
        </div>
      </div>

      {/* Featured Deep-Dive Diagnosis: Active Student Focus */}
      <div className="bg-white rounded-3xl border border-amber-300 shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 via-amber-50/70 to-white border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-neutral-900">
                  Target Student Diagnosis: {student.name}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-bold">
                  Roll: {student.rollNumber || 'STD-304'}
                </span>
              </div>
              <p className="text-xs text-amber-900 font-medium">
                Cognitive gap detected during Unit 3 Botany & Photosynthesis assessment
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 font-mono">
              Score: {score}/5 ({percentage}%)
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              Bloom L3: Application
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Detected Learning Gap Statement */}
          <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Isolated Conceptual Gap</span>
            </div>
            <p className="text-base sm:text-lg font-extrabold text-neutral-900 leading-snug">
              "Student understands that plants need sunlight to live, but incorrectly believes sunlight is only for warmth/sleep, failing to recognize the green leaf as a biological food kitchen (Photosynthesis)."
            </p>
            <div className="text-xs text-amber-950 pt-1 font-medium bg-amber-100/60 p-3 rounded-xl border border-amber-200/60">
              <strong>Mother-tongue root cause: </strong>
              The student equated "{MULTILINGUAL_DICTIONARY.sunlight[selectedLanguage]?.mt || 'ᱥᱤᱛᱩᱝ'} ({MULTILINGUAL_DICTIONARY.sunlight[selectedLanguage]?.translit || 'Situng'} - Sun heat)" with staying warm rather than chemical energy preparation.
            </div>
          </div>

          {/* Strengths vs Needs Support */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Masteries</span>
              </div>
              <ul className="space-y-2 text-xs font-medium text-neutral-800">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Identifies basic plant needs (water, soil, fresh air)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Understands underground root water absorption via soil moisture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Distinguishes living plants from non-living objects</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-950 uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Targeted Concepts Needing Support</span>
              </div>
              <ul className="space-y-2 text-xs font-medium text-neutral-800">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Role of sunlight as an energy catalyst for preparing plant food</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Understanding the leaf as the plant's cooking hearth (Chulha metaphor)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Remedial Recommendation CTA */}
          <div className="p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Wand2 className="w-4 h-4" />
                <span>Recommended Remedial Action</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Launch Personalized Vernacular Remedial Simulation
              </h3>
              <p className="text-xs text-neutral-400 max-w-md">
                Uses the village cooking hearth (Chulha) analogy in {currentLang.name} to bridge {student.name.split(' ')[0]}'s comprehension from {percentage}% → 100%.
              </p>
            </div>

            <button
              id="launch-remedial-btn"
              onClick={handleLaunchRemedial}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>Launch Remedial Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* District & Classroom-wide Gaps Registry */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Classroom Learning Gaps Registry & Remedial Actions</span>
            </h3>
            <p className="text-xs text-neutral-500">Live monitoring of concept hurdles across rural primary batches</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            {(['All', 'Needs Support', 'In Remediation', 'Mastered'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Gaps List */}
        <div className="space-y-3">
          {filteredGaps.map((gap) => (
            <div
              key={gap.id}
              className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-sm text-neutral-900">{gap.studentName}</span>
                  <span className="text-xs text-neutral-500 font-medium">({gap.class})</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      gap.difficulty === 'Critical' || gap.difficulty === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {gap.difficulty} Priority
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      gap.status === 'Mastered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : gap.status === 'In Remediation'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {gap.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-neutral-800">
                  Concept Gap: <span className="font-normal text-neutral-700">{gap.concept}</span>
                </div>
                <div className="text-xs text-neutral-500 leading-relaxed">
                  <strong>Pedagogic Plan: </strong>
                  {gap.recommendedAction}
                </div>
                {gap.improvement && (
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    Progress: {gap.improvement}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {gap.status !== 'Mastered' ? (
                  <>
                    <button
                      onClick={handleLaunchRemedial}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Launch Remedial</span>
                    </button>
                    <button
                      onClick={() => handleResolveGap(gap.id)}
                      className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Mark Resolved</span>
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mastered</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
