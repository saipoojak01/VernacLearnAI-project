import React, { useState } from 'react';
import { Screen, LanguageCode } from '../types';
import {
  SUPPORTED_LANGUAGES,
  DEMO_ADMIN_ASSESSMENTS,
  DEMO_QUIZ_QUESTIONS_BY_LANG,
  CLASS_STUDENTS,
} from '../data/demoData';
import {
  ClipboardList,
  Plus,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  X,
  FileText,
  Search,
  Filter,
  Layers,
} from 'lucide-react';

interface AssessmentProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  studentScore: number;
  onStartRemedial: () => void;
  studentName?: string;
}

export const Assessment: React.FC<AssessmentProps> = ({
  onNavigate,
  selectedLanguage,
  studentScore,
  onStartRemedial,
  studentName = 'Birsa Soren',
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const [assessments, setAssessments] = useState(DEMO_ADMIN_ASSESSMENTS);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('as1');
  const [activeTab, setActiveTab] = useState<'cycles' | 'questions' | 'roster'>('cycles');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Environmental Studies');
  const [newClass, setNewClass] = useState('Class 3A');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newObj = {
      id: `as_${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      class: newClass,
      teacherName: 'Anjali Hansda',
      date: 'Today',
      studentsAttempted: 0,
      totalStudents: 25,
      averageScore: 0,
      completionRate: 0,
      status: 'In Progress' as const,
    };

    setAssessments([newObj, ...assessments]);
    setSelectedAssessmentId(newObj.id);
    setIsNewModalOpen(false);
    setNewTitle('');
    showToast(`Assessment "${newObj.title}" scheduled successfully.`);
  };

  const selectedAssessment =
    assessments.find((a) => a.id === selectedAssessmentId) || assessments[0];

  // Questions in current language
  const questions =
    DEMO_QUIZ_QUESTIONS_BY_LANG[selectedLanguage] || DEMO_QUIZ_QUESTIONS_BY_LANG.santhali;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMsg && (
        <div className="p-3.5 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">OK</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Classroom Pedagogy</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Diagnostic Micro-Evaluations</span>
            <span>•</span>
            <span className="font-mono text-[11px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
              {currentLang.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Assessments & Diagnostic Cycles
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Standardized formative micro-evaluations designed to detect conceptual masteries and language barriers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="view-gap-ai-btn"
            onClick={() => onNavigate('gap_analysis')}
            className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-xs font-bold text-amber-900 cursor-pointer shadow-2xs flex items-center gap-1.5 transition-all"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-amber-700" />
            <span>Learning Gap AI</span>
          </button>
          <button
            id="schedule-assessment-btn"
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Assessment</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Total Diagnostic Cycles
          </div>
          <div className="text-3xl font-black text-neutral-900">{assessments.length}</div>
          <div className="text-xs text-neutral-500 font-medium">Across FLN Modules</div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Average Class Score
          </div>
          <div className="my-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">84.2%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Above Benchmark
            </span>
          </div>
          <div className="text-xs text-neutral-500 font-medium">Benchmark: 80% Mastery</div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Students Evaluated
          </div>
          <div className="text-3xl font-black text-neutral-900">24 / 25</div>
          <div className="text-xs text-emerald-700 font-medium">96% Completion Rate</div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Gaps Diagnosed
          </div>
          <div className="text-3xl font-black text-amber-600">3 Students</div>
          <div className="text-xs text-amber-700 font-medium">Auto-Routed to Gap AI</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab('cycles')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'cycles'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Diagnostic Assessment Cycles</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'questions'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Diagnostic Question Bank ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'roster'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Student Score Roster</span>
        </button>
      </div>

      {/* TAB 1: ASSESSMENT CYCLES */}
      {activeTab === 'cycles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedAssessmentId(a.id)}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedAssessmentId === a.id
                  ? 'bg-emerald-50/40 border-emerald-600 shadow-sm'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-mono">
                    {a.class} • {a.subject}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      a.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-neutral-900 leading-snug">
                  {a.title}
                </h3>
                <div className="text-xs text-neutral-500">
                  Conducted by <strong>{a.teacherName}</strong> • {a.date}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-neutral-50">
                  <div className="text-[10px] text-neutral-400 font-bold uppercase">Attempted</div>
                  <div className="text-sm font-extrabold text-neutral-900">
                    {a.studentsAttempted}/{a.totalStudents}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-neutral-50">
                  <div className="text-[10px] text-neutral-400 font-bold uppercase">Avg Score</div>
                  <div className="text-sm font-extrabold text-emerald-700">
                    {a.averageScore}%
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-neutral-50">
                  <div className="text-[10px] text-neutral-400 font-bold uppercase">Completion</div>
                  <div className="text-sm font-extrabold text-neutral-900">
                    {a.completionRate}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAssessmentId(a.id);
                    setActiveTab('questions');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
                >
                  <span>Review 5 Test Questions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('student_learning');
                  }}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Take Test Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: DIAGNOSTIC QUESTION BANK */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900">
                Diagnostic Micro-Evaluation Items: {selectedAssessment.title}
              </h3>
              <p className="text-xs text-neutral-500">
                Evaluating conceptual understanding with mother-tongue framing in {currentLang.name}
              </p>
            </div>
            <button
              onClick={() => onNavigate('student_learning')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Launch Quiz in Student Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/60 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                    Question {idx + 1} • Concept: {q.targetConcept}
                  </span>
                  <span className="text-xs text-neutral-500 font-semibold">Bloom Level 2-3</span>
                </div>

                <div className="space-y-1">
                  <div className="text-base font-extrabold text-neutral-900">
                    {q.questionTextMt}
                  </div>
                  <div className="text-xs font-medium text-neutral-500 italic">
                    English translation: "{q.questionTextEn}"
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                        opt.isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-white border-neutral-200 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            opt.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span>{opt.textMt}</span>
                      </div>
                      {opt.isCorrect && (
                        <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                          Correct Key
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200/60 text-xs text-neutral-600 flex items-center gap-2">
                  <span className="font-bold text-neutral-800">Pedagogic Rationale:</span>
                  <span>{q.explanationEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT SCORE ROSTER */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900">
                Student Performance & Evaluation Breakdown (Class 3A)
              </h3>
              <p className="text-xs text-neutral-500">
                Unit 3 Botany & Photosynthesis Diagnostic Scorecard
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-600">Legend:</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                Mastered (&ge;90%)
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full">
                Needs Support (&lt;90%)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-600 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Student Name</th>
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5">Mother Tongue</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Mastery Rate</th>
                  <th className="p-3.5">Identified Gap</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {CLASS_STUDENTS.map((st) => (
                  <tr key={st.id} className="hover:bg-neutral-50/80 transition-all">
                    <td className="p-3.5 font-bold text-neutral-900">{st.name}</td>
                    <td className="p-3.5 font-mono text-neutral-500">{st.rollNumber}</td>
                    <td className="p-3.5 font-medium text-neutral-700">{st.motherTongue}</td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-neutral-900">
                        {st.name === studentName ? studentScore || 4 : st.currentScore}
                      </span>
                      <span className="text-neutral-400"> / 5</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-extrabold px-2.5 py-1 rounded-full text-[11px] ${
                          (st.name === studentName ? (studentScore || 4) : st.currentScore) >= 5
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {Math.round(
                          ((st.name === studentName ? (studentScore || 4) : st.currentScore) / 5) *
                            100
                        )}
                        %
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs truncate text-neutral-600 font-medium">
                      {st.detectedGap}
                    </td>
                    <td className="p-3.5 text-right">
                      {(st.name === studentName ? (studentScore || 4) : st.currentScore) < 5 ? (
                        <button
                          onClick={() => onNavigate('gap_analysis')}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[11px] font-bold cursor-pointer transition-all shadow-2xs flex items-center gap-1 ml-auto"
                        >
                          <BrainCircuit className="w-3 h-3" />
                          <span>Diagnose Gap</span>
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mastered</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE NEW ASSESSMENT */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">
                    Schedule Assessment Cycle
                  </h3>
                  <p className="text-xs text-neutral-500">Diagnostic Micro-Evaluation for Rural Batches</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssessment} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                  Assessment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 4: Seasonal Rainfall & Soil Nutrition"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="Science & Botany">Science & Botany</option>
                    <option value="Mathematics & Numeracy">Mathematics & Numeracy</option>
                    <option value="Mother Tongue Literacy">Mother Tongue Literacy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Target Class
                  </label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3A">Class 3A</option>
                    <option value="Class 3B">Class 3B</option>
                    <option value="Class 4A">Class 4A</option>
                    <option value="Class 5A">Class 5A</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  Schedule Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
