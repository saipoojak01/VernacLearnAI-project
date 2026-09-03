import React, { useState } from 'react';
import { Screen, LanguageCode, StudentRecord, ConceptMastery } from '../types';
import {
  CLASS_STUDENTS,
  CONCEPT_MASTERY_STATS,
  SUPPORTED_LANGUAGES,
} from '../data/demoData';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Wand2,
  Layers,
  GraduationCap,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface AnalyticsProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  remedialCompleted: boolean;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  onNavigate,
  selectedLanguage,
  remedialCompleted,
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const [groupRemedialGenerated, setGroupRemedialGenerated] = useState<boolean>(false);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<StudentRecord | null>(null);

  // Update Birsa Soren's score dynamically based on remedial state
  const students: StudentRecord[] = CLASS_STUDENTS.map((st) => {
    if (st.id === 's3' && remedialCompleted) {
      return {
        ...st,
        currentScore: 5,
        understandingRate: 100,
        detectedGap: 'Resolved (Sunlight food synthesis mastered)',
        status: 'Mastered',
      };
    }
    return st;
  });

  const conceptStats: ConceptMastery[] = CONCEPT_MASTERY_STATS.map((c) => {
    if (c.concept.includes('Photosynthesis') && remedialCompleted) {
      return {
        ...c,
        masteryPercentage: 78,
        studentsNeedingSupport: 2,
        status: 'Satisfactory',
      };
    }
    return c;
  });

  const avgUnderstanding = Math.round(
    students.reduce((acc, curr) => acc + curr.understandingRate, 0) / students.length
  );

  const needsSupportCount = students.filter((s) => s.status === 'Needs Support').length;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Pedagogical Diagnostics</span>
            <span>•</span>
            <span>Class 3 Section A</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">{currentLang.name} Cohort</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-neutral-900" />
            Student Learning Insights
          </h1>
          <p className="text-sm text-neutral-500 mt-1 font-medium">
            Actionable pedagogical gap diagnosis rather than traditional numerical mark sheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
              remedialCompleted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {remedialCompleted ? 'Remediation Cycle Active (+6% Class Gain)' : 'Pre-Remediation Baseline'}
          </span>
        </div>
      </div>

      {/* 4 Summary Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Cohort Average
          </div>
          <div className="mt-2 text-3xl font-bold text-neutral-900">{avgUnderstanding}%</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            {remedialCompleted ? '↑ +5.5% vs Last Week' : 'Target: 90%'}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Mastered Concepts
          </div>
          <div className="mt-2 text-3xl font-bold text-emerald-700">3 / 4</div>
          <div className="text-xs text-neutral-500 mt-1">Basic Needs, Roots, Ecosystems</div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Active Learning Gaps
          </div>
          <div className="mt-2 text-3xl font-bold text-amber-600">
            {remedialCompleted ? '1 Minor' : '1 Critical'}
          </div>
          <div className="text-xs text-neutral-500 mt-1">Photosynthesis Energy Catalyst</div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Students Needing Support
          </div>
          <div className="mt-2 text-3xl font-bold text-neutral-900">
            {needsSupportCount === 0 ? '0' : `${needsSupportCount}`}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {remedialCompleted ? 'Birsa Soren resolved ✓' : 'Birsa Soren + 1 other'}
          </div>
        </div>
      </div>

      {/* Middle Section: Student Roster & Concept Mastery Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Student Individual Roster */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Primary Student Profiles (Class 3A)
            </h3>
            <span className="text-xs text-neutral-400">4 Tracked Students</span>
          </div>

          <div className="space-y-3">
            {students.map((student) => {
              const isMastered = student.status === 'Mastered';
              const isBirsa = student.id === 's3';

              return (
                <div
                  key={student.id}
                  id={`student-row-${student.id}`}
                  onClick={() => setSelectedStudentDetail(student)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isBirsa && remedialCompleted
                      ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/70'
                      : isMastered
                      ? 'border-neutral-200/80 bg-neutral-50/40 hover:bg-neutral-100/60'
                      : 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/70'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">
                        {student.name}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {student.rollNumber}
                      </span>
                      {isBirsa && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-neutral-900 text-white">
                          Demo Focus
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-600">
                      <strong>Gap Analysis:</strong> {student.detectedGap}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-base font-extrabold text-neutral-900">
                        {student.understandingRate}%
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        Score: {student.currentScore}/5
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isMastered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Concept Mastery Bar Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              Concept Mastery Levels
            </h3>
            <span className="text-xs text-neutral-400">Class 3 Science</span>
          </div>

          <div className="space-y-4">
            {conceptStats.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-neutral-800">{item.concept}</span>
                  <span
                    className={`font-mono font-bold ${
                      item.masteryPercentage < 70
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }`}
                  >
                    {item.masteryPercentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.masteryPercentage < 70
                        ? 'bg-amber-500'
                        : 'bg-emerald-600'
                    }`}
                    style={{ width: `${item.masteryPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Status: {item.status}</span>
                  {item.studentsNeedingSupport > 0 && (
                    <span className="text-amber-700">
                      {item.studentsNeedingSupport} students need support
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actionable AI Recommendation Card */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              AI Pedagogical Recommendation
            </div>
            <h3 className="text-xl font-bold">
              {remedialCompleted
                ? 'Cohort Progressing Well: 1 Group Lesson Recommended'
                : '3 students in Class 3A need additional support with Photosynthesis'}
            </h3>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              Based on common mother-tongue confusion around solar energy synthesis, we recommend conducting a 10-minute group activity in the schoolyard garden using the "Leaf Kitchen" metaphor.
            </p>
          </div>

          <button
            id="group-remedial-btn"
            onClick={() => setGroupRemedialGenerated(true)}
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all shrink-0"
          >
            <Wand2 className="w-4 h-4" />
            <span>Generate Group Remedial Lesson</span>
          </button>
        </div>

        {groupRemedialGenerated && (
          <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Group Vernacular Activity Plan Generated:
            </div>
            <p className="text-neutral-200">
              <strong>Activity:</strong> "The Solar Chef in the School Garden" (ᱥᱤᱛᱩᱝ ᱨᱮᱱ ᱤᱥᱤᱱᱤᱭᱟᱹ). Take students outside to collect 3 green leaves and observe how leaves point directly at the sun.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] text-neutral-400">
              <span>Duration: 12 minutes</span>
              <span>•</span>
              <span>Target Cohort: Birsa, Sunita, Karan</span>
              <span>•</span>
              <span>Material: Local schoolyard leaves</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
