import React, { useState } from 'react';
import { Screen, LanguageCode, LearningContext } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoData';
import { StatCard } from '../components/StatCard';
import {
  Sparkles,
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Globe2,
  MapPin,
  Clock,
  CheckCircle2,
  GraduationCap,
  Play,
  FileCheck,
  FileUp,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  learningContext: LearningContext;
  onSelectContext: (ctx: LearningContext) => void;
  onStartLessonGeneration: (classVal: string, subjectVal: string, topicVal: string) => void;
  remedialCompleted: boolean;
  onOpenOfflinePanel: () => void;
  teacherName?: string;
  targetStudentName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  learningContext,
  onSelectContext,
  onStartLessonGeneration,
  remedialCompleted,
  onOpenOfflinePanel,
  teacherName = 'Teacher',
  targetStudentName = 'Birsa Soren',
}) => {
  const [selectedClass, setSelectedClass] = useState('Class 3');
  const [selectedSubject, setSelectedSubject] = useState('Science');
  const [selectedTopic, setSelectedTopic] = useState('Plants and Their Needs');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const handleGenerateClick = () => {
    setIsGenerating(true);
    onStartLessonGeneration(selectedClass, selectedSubject, selectedTopic);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Session • Primary Section
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Good morning, {teacherName}
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5 font-medium">
            Create inclusive learning experiences in every child's mother tongue.
          </p>
        </div>

        {/* Offline Status Badge & Quick Guide */}
        <div className="flex items-center gap-3">
          <button
            id="dashboard-offline-status-btn"
            onClick={onOpenOfflinePanel}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:bg-neutral-50 text-xs font-medium text-neutral-700 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-neutral-900">Offline Ready</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
              Local Cache
            </span>
          </button>
        </div>
      </div>

      {/* 4 Dashboard Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          id="stat-students"
          label="Students"
          value={24}
          subtitle="Primary Class 3 (Section A)"
          icon={Users}
          trend={{ value: '100% Enrolled', isPositive: true }}
        />
        <StatCard
          id="stat-lessons"
          label="Lessons Created"
          value={18}
          subtitle="14 Vernacular Translated"
          icon={BookOpen}
          trend={{ value: '+3 This Week', isPositive: true }}
        />
        <StatCard
          id="stat-understanding"
          label="Average Understanding"
          value={remedialCompleted ? '88%' : '82%'}
          subtitle={remedialCompleted ? 'Boosted after remedial (+6%)' : 'Pre-remedial benchmark'}
          icon={TrendingUp}
          trend={{ value: remedialCompleted ? '+6% Post-Fix' : 'Stable', isPositive: true }}
          highlight={remedialCompleted}
        />
        <StatCard
          id="stat-needs-support"
          label="Needs Support"
          value={remedialCompleted ? 4 : 5}
          subtitle={remedialCompleted ? 'Birsa Soren resolved ✓' : 'Identified by AI Gap Detector'}
          icon={AlertCircle}
          trend={{
            value: remedialCompleted ? '1 Remediated' : 'Action Required',
            isPositive: remedialCompleted,
          }}
        />
      </div>

      {/* Main Section: Create a Learning Experience */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden">
        <div className="px-6 py-4.5 border-b border-neutral-100 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Create a Learning Experience
            </h2>
            <p className="text-xs text-neutral-500">
              Transform standard NCERT/State curriculum into child-friendly vernacular pedagogy.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
            <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Target: <strong>{currentLang.name}</strong></span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Target Language Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Mother Tongue
              </label>
              <select
                id="dash-select-lang"
                value={selectedLanguage}
                onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} {lang.isLowResource ? '(Low-Resource)' : ''}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-neutral-400 mt-1 block">
                Region: {currentLang.region.split(',')[0]}
              </span>
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Grade / Class
              </label>
              <select
                id="dash-select-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Class 1">Class 1 (Foundational)</option>
                <option value="Class 2">Class 2 (Preparatory)</option>
                <option value="Class 3">Class 3 (Primary Standard)</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
              <span className="text-[11px] text-neutral-400 mt-1 block">Age group: 7–9 years</span>
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Subject
              </label>
              <select
                id="dash-select-subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Science">Science (पर्यावरण विज्ञान / विज्ञान)</option>
                <option value="Environmental Studies">Environmental Studies (EVS)</option>
                <option value="Mathematics">Mathematics (गणित)</option>
                <option value="Language Arts">Language Arts (मातृभाषा)</option>
              </select>
              <span className="text-[11px] text-neutral-400 mt-1 block">Domain: Biological Sciences</span>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Curriculum Topic
              </label>
              <select
                id="dash-select-topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Plants and Their Needs">Plants and Their Needs (Demo Focus)</option>
                <option value="Water in Our Surroundings">Water in Our Surroundings</option>
                <option value="Village Domestic Animals">Village Domestic Animals</option>
                <option value="Counting Market Goods">Counting Market Goods</option>
              </select>
              <span className="text-[11px] text-neutral-400 mt-1 block">Chapter 4 • Unit 2</span>
            </div>
          </div>

          {/* Local Context Selector Row */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Cultural & Local Context Adaptation
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                AI will inject familiar village agricultural artifacts and metaphors instead of foreign objects.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(['rural_school', 'village_environment', 'local_community'] as LearningContext[]).map((ctx) => {
                const labels: Record<LearningContext, string> = {
                  rural_school: 'Rural School',
                  village_environment: 'Village Badi',
                  local_community: 'Sacred Grove',
                };
                const isSelected = learningContext === ctx;
                return (
                  <button
                    key={ctx}
                    id={`context-btn-${ctx}`}
                    onClick={() => onSelectContext(ctx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {labels[ctx]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Loop: Translate → Adapt → Teach → Assess → Detect Gap → Remediate</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                id="dash-upload-notes-btn"
                onClick={() => onNavigate('lesson_notes')}
                className="w-full sm:w-auto px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
              >
                <FileUp className="w-4 h-4 text-emerald-700" />
                <span>Upload Lesson Notes (PDF)</span>
              </button>

              <button
                id="generate-ai-lesson-btn"
                onClick={handleGenerateClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Generate AI Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch & Active Student Case Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Pedagogical Case Study */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-neutral-900 text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              Active Target Student: {targetStudentName}
            </h3>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                remedialCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {remedialCompleted ? 'Remediation Mastered (100%)' : 'Learning Gap Detected (80%)'}
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            {targetStudentName} scored 4/5 on the Plant Needs assessment. The AI identified that while understanding water and air, there was a specific misconception about sunlight's biological role in food preparation.
          </p>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-neutral-900">
                Identified Gap: Photosynthesis & Leaf Energy
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                Prescribed: Simplified Mother-Tongue Kitchen Metaphor + Visual Sunlight Activity
              </div>
            </div>
            <button
              id="dash-jump-remedial-btn"
              onClick={() => onNavigate('remedial')}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shrink-0"
            >
              {remedialCompleted ? 'View Intervention' : 'Open Remedial Studio'}
            </button>
          </div>
        </div>

        {/* Right 1 Col: Quick Links */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-neutral-900 text-base flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-neutral-700" />
              Quick Pedagogical Actions
            </h3>
            <div className="space-y-2">
              <button
                id="dash-quick-gap-analysis"
                onClick={() => onNavigate('gap_analysis')}
                className="w-full text-left p-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Review Learning Gap Diagnosis</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              <button
                id="dash-quick-class-analytics"
                onClick={() => onNavigate('analytics')}
                className="w-full text-left p-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>View Class Concept Mastery Chart</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              <button
                id="dash-quick-upload-notes"
                onClick={() => onNavigate('lesson_notes')}
                className="w-full text-left p-2.5 rounded-lg bg-emerald-50/60 hover:bg-emerald-100/70 text-xs font-bold text-emerald-950 flex items-center justify-between transition-colors cursor-pointer border border-emerald-200/70"
              >
                <div className="flex items-center gap-2">
                  <FileUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Upload Lesson Notes (English PDF)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>

              <button
                id="dash-quick-translator"
                onClick={() => onNavigate('translate')}
                className="w-full text-left p-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>AI Translator & Pedagogic Adapt</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Class 3 Section A</span>
            <span className="font-mono">NEP-FLN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
