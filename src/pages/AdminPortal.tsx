import React, { useState } from 'react';
import {
  Screen,
  LanguageCode,
  StudentRecord,
  TeacherRecord,
  AdminLessonItem,
  AdminAssessmentItem,
  AdminLearningGapItem,
} from '../types';
import {
  CLASS_STUDENTS,
  INITIAL_TEACHERS,
  DEMO_ADMIN_LESSONS,
  DEMO_ADMIN_ASSESSMENTS,
  DEMO_ADMIN_LEARNING_GAPS,
  SUPPORTED_LANGUAGES,
} from '../data/demoData';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  AlertTriangle,
  Languages,
  Settings,
  TrendingUp,
  Sparkles,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Eye,
  Check,
  X,
  Database,
  BarChart3,
  Flame,
  Download,
  FileSpreadsheet,
  Upload,
  FileText,
  Trash2,
  Calendar,
  Award,
} from 'lucide-react';

interface AdminPortalProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  remedialCompleted: boolean;
  students?: StudentRecord[];
  onUpdateStudents?: (students: StudentRecord[]) => void;
  adminName?: string;
  teacherName?: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentScreen,
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  remedialCompleted,
  students: propStudents,
  onUpdateStudents,
  adminName = 'Dr. Rajeshwar Sharma',
  teacherName = 'Anjali Hansda',
}) => {
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    if (propStudents && propStudents.length > 0) return propStudents;
    return CLASS_STUDENTS;
  });

  const [teachers, setTeachers] = useState<TeacherRecord[]>(() =>
    INITIAL_TEACHERS.map((t) => (t.id === 't1' ? { ...t, name: teacherName } : t))
  );

  const [lessonsList, setLessonsList] = useState<AdminLessonItem[]>(DEMO_ADMIN_LESSONS);
  const [assessmentsList, setAssessmentsList] = useState<AdminAssessmentItem[]>(DEMO_ADMIN_ASSESSMENTS);
  const [learningGaps, setLearningGaps] = useState<AdminLearningGapItem[]>(DEMO_ADMIN_LEARNING_GAPS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState<'All' | 'Needs Support' | 'Mastered'>('All');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Daily Roll-Call State
  const [dailyAttendance, setDailyAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    s1: 'present',
    s2: 'present',
    s3: 'present',
    s4: 'present',
    s5: 'late',
    s6: 'present',
    s7: 'absent',
    s8: 'present',
  });

  // Lesson Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonTitleMt, setNewLessonTitleMt] = useState('');
  const [newLessonSubject, setNewLessonSubject] = useState('Science');
  const [newLessonClass, setNewLessonClass] = useState('Class 3');
  const [newLessonLanguage, setNewLessonLanguage] = useState<LanguageCode>(selectedLanguage || 'santhali');
  const [newLessonMetaphor, setNewLessonMetaphor] = useState('Village Courtyard & Kitchen Hearth');
  const [newLessonDescription, setNewLessonDescription] = useState('');
  const [newLessonFileName, setNewLessonFileName] = useState<string | null>(null);

  // Assessment Modal State
  const [isNewAssessmentModalOpen, setIsNewAssessmentModalOpen] = useState(false);
  const [newAssessmentTitle, setNewAssessmentTitle] = useState('');
  const [newAssessmentSubject, setNewAssessmentSubject] = useState('Science');
  const [newAssessmentClass, setNewAssessmentClass] = useState('Class 3');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Set individual student daily attendance (Present / Absent / Late)
  const handleSetDailyAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setDailyAttendance((prev) => ({ ...prev, [studentId]: status }));
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const deltaPresent = status === 'present' ? 1 : 0;
          const deltaAbsent = status === 'absent' ? 1 : 0;
          const newPres = Math.max(1, s.presentDays + deltaPresent);
          const newAbs = Math.max(0, s.absentDays + deltaAbsent);
          const newPct = Math.min(100, Math.round((newPres / (newPres + newAbs)) * 100));
          return {
            ...s,
            attendancePercentage: newPct,
          };
        }
        return s;
      })
    );
    const targetStudent = students.find((s) => s.id === studentId);
    showToast(`Marked ${status.toUpperCase()} for ${targetStudent?.name || 'student'}.`);
  };

  // Mark all students present for today
  const handleMarkAllPresent = () => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach((s) => {
      updated[s.id] = 'present';
    });
    setDailyAttendance(updated);
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        presentDays: s.presentDays + 1,
        attendancePercentage: Math.min(
          100,
          Math.round(((s.presentDays + 1) / (s.presentDays + s.absentDays + 1)) * 100)
        ),
      }))
    );
    showToast('All Class 3A students marked PRESENT for today.');
  };

  // Student Attendance toggle
  const handleToggleStudentAttendance = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newPresent = s.presentDays + 1;
          const newPct = Math.round((newPresent / (newPresent + s.absentDays)) * 100);
          return {
            ...s,
            presentDays: newPresent,
            attendancePercentage: Math.min(100, newPct),
          };
        }
        return s;
      })
    );
    showToast('Student attendance marked for today.');
  };

  // Staff Attendance toggle
  const handleToggleStaffAttendance = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === teacherId) {
          const newStatus = t.status === 'Active' ? 'On Leave' : 'Active';
          return {
            ...t,
            status: newStatus,
            attendancePercentage: newStatus === 'Active' ? Math.min(100, t.attendancePercentage + 1) : Math.max(80, t.attendancePercentage - 2),
          };
        }
        return t;
      })
    );
    showToast('Teacher attendance status updated.');
  };

  const handleMarkAllStaffPresent = () => {
    setTeachers((prev) =>
      prev.map((t) => ({
        ...t,
        status: 'Active',
      }))
    );
    showToast('All teaching staff marked Present for today (Biometric sync complete).');
  };

  // Handle Upload New Lesson Submit
  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) {
      showToast('Please enter a lesson title.');
      return;
    }

    const targetLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === newLessonLanguage) || SUPPORTED_LANGUAGES[0];

    const newLesson: AdminLessonItem = {
      id: `lesson-${Date.now()}`,
      title: newLessonTitle,
      subject: newLessonSubject,
      class: newLessonClass,
      language: targetLangObj.name,
      status: 'Active',
      createdBy: teacherName || 'District Curriculum Team',
      createdDate: new Date().toISOString().split('T')[0],
      studentsAssigned: students.length,
      completionRate: 0,
      description: newLessonDescription || `${newLessonSubject} unit adapted with ${newLessonMetaphor} for ${targetLangObj.name} learners.`,
    };

    setLessonsList([newLesson, ...lessonsList]);
    setIsUploadModalOpen(false);

    // Reset Form
    setNewLessonTitle('');
    setNewLessonTitleMt('');
    setNewLessonDescription('');
    setNewLessonFileName(null);

    showToast(`Lesson "${newLesson.title}" published successfully to classroom roster.`);
  };

  // Handle Create Assessment
  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssessmentTitle.trim()) {
      showToast('Please enter an assessment unit title.');
      return;
    }

    const newAssessment: AdminAssessmentItem = {
      id: `assess-${Date.now()}`,
      title: newAssessmentTitle,
      subject: newAssessmentSubject,
      class: newAssessmentClass,
      teacherName: teacherName || 'Anjali Hansda',
      date: new Date().toISOString().split('T')[0],
      studentsAttempted: students.length,
      totalStudents: students.length,
      averageScore: 88,
      completionRate: 100,
      status: 'Active',
    };

    setAssessmentsList([newAssessment, ...assessmentsList]);
    setIsNewAssessmentModalOpen(false);
    setNewAssessmentTitle('');
    showToast(`Diagnostic cycle "${newAssessment.title}" scheduled.`);
  };

  // Delete Lesson
  const handleDeleteLesson = (lessonId: string) => {
    setLessonsList((prev) => prev.filter((l) => l.id !== lessonId));
    showToast('Lesson removed from registry.');
  };

  // Resolve learning gap
  const handleResolveGap = (gapId: string) => {
    setLearningGaps((prev) =>
      prev.map((g) => (g.id === gapId ? { ...g, status: 'Mastered', improvement: '+20%' } : g))
    );
    showToast('Learning gap marked as Mastered via remedial cycle.');
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>District School Administration</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Dumka District Primary Schools</span>
            <span>•</span>
            <span className="font-mono text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
              Academic Year 2026-27
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {currentScreen === 'admin_students' || currentScreen === 'staff_students'
              ? 'Students & Learning Gaps Roster'
              : currentScreen === 'admin_student_attendance' || currentScreen === 'attendance'
              ? 'Daily Roll-Call & Attendance Register'
              : currentScreen === 'admin_teachers'
              ? 'Teaching Staff Directory'
              : currentScreen === 'admin_staff_attendance'
              ? 'Staff Attendance & Duty Register'
              : currentScreen === 'admin_lessons'
              ? 'Curriculum & Lesson Registry'
              : currentScreen === 'admin_assessments'
              ? 'Assessment Cycles & Diagnostic Records'
              : currentScreen === 'admin_learning_gaps'
              ? 'District Learning Gap Diagnostics'
              : currentScreen === 'admin_languages'
              ? 'Regional Languages Configuration'
              : currentScreen === 'admin_settings'
              ? 'System Configuration & Offline Cache'
              : 'School Administration & Institutional Overview'}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {currentScreen === 'admin_lessons' && (
            <button
              id="admin-upload-new-lesson-btn"
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Lesson</span>
            </button>
          )}

          {currentScreen === 'admin_assessments' && (
            <button
              id="admin-schedule-assessment-btn"
              onClick={() => setIsNewAssessmentModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Assessment Cycle</span>
            </button>
          )}

          <button
            onClick={() => showToast('Report exported as CSV/PDF successfully.')}
            className="px-3.5 py-2 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">OK</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: OVERVIEW                                                          */}
      {/* ========================================================================= */}
      {(currentScreen === 'admin_overview' || currentScreen === 'overview') && (
        <div className="space-y-6">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigate('admin_students')}
              className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-900 transition-all cursor-pointer space-y-1"
            >
              <div className="text-xs font-bold text-neutral-400 uppercase">Enrolled Students</div>
              <div className="text-3xl font-black text-neutral-900">420</div>
              <div className="text-xs text-emerald-700 font-semibold">14 Rural Primary Centers</div>
            </div>

            <div
              onClick={() => onNavigate('admin_teachers')}
              className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-900 transition-all cursor-pointer space-y-1"
            >
              <div className="text-xs font-bold text-neutral-400 uppercase">Active Teachers</div>
              <div className="text-3xl font-black text-neutral-900">{teachers.length}</div>
              <div className="text-xs text-emerald-700 font-semibold">100% Mother-Tongue Certified</div>
            </div>

            <div
              onClick={() => onNavigate('admin_student_attendance')}
              className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-900 transition-all cursor-pointer space-y-1"
            >
              <div className="text-xs font-bold text-neutral-400 uppercase">Average Attendance</div>
              <div className="text-3xl font-black text-neutral-900">92.4%</div>
              <div className="text-xs text-emerald-700 font-semibold">+4.2% since Vernacular Launch</div>
            </div>

            <div
              onClick={() => onNavigate('admin_learning_gaps')}
              className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-900 transition-all cursor-pointer space-y-1"
            >
              <div className="text-xs font-bold text-neutral-400 uppercase">Gaps Resolved</div>
              <div className="text-3xl font-black text-emerald-700">
                {remedialCompleted ? '94%' : '88%'}
              </div>
              <div className="text-xs text-neutral-500 font-semibold">Adaptive Remedial Pipeline</div>
            </div>
          </div>

          {/* Quick Management Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-neutral-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Classroom Roster & Pedagogical Status</span>
              </h3>
              <div className="space-y-2.5">
                {students.slice(0, 3).map((st) => (
                  <div
                    key={st.id}
                    className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-neutral-900">{st.name}</div>
                      <div className="text-[11px] text-neutral-500">
                        {st.class} • {st.motherTongue}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-neutral-900">{st.understandingRate}%</div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {st.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('admin_students')}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-bold text-neutral-800 transition-colors cursor-pointer"
              >
                View Full Student Registry →
              </button>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-neutral-900 text-sm flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-600" />
                <span>Active Language Distribution</span>
              </h3>
              <div className="space-y-3">
                {SUPPORTED_LANGUAGES.slice(0, 4).map((lang) => (
                  <div key={lang.code} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-neutral-800">
                        {lang.name} ({lang.nativeName})
                      </span>
                      <span className="text-neutral-500 font-mono">{lang.speakerCount}</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{
                          width:
                            lang.code === 'santhali'
                              ? '80%'
                              : lang.code === 'gondi'
                              ? '60%'
                              : lang.code === 'bhojpuri'
                              ? '75%'
                              : '50%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('admin_languages')}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-bold text-neutral-800 transition-colors cursor-pointer"
              >
                Manage Language Models & Audio →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: STUDENTS & LEARNING GAPS ROSTER (RESOLVED / COMPREHENSIVE)        */}
      {/* ========================================================================= */}
      {(currentScreen === 'admin_students' || currentScreen === 'staff_students') && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Class 3A Enrolled</div>
              <div className="text-2xl font-extrabold text-neutral-900">{students.length} Students</div>
              <div className="text-xs text-neutral-500 font-medium">100% Mother-Tongue Profiled</div>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Gaps Requiring Support</div>
              <div className="text-2xl font-extrabold text-amber-950">
                {students.filter((s) => s.status === 'Needs Support').length} Students
              </div>
              <div className="text-xs text-amber-800 font-semibold">Vocabulary & Metaphor Mismatches</div>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Mastered / On-Track</div>
              <div className="text-2xl font-extrabold text-emerald-950">
                {students.filter((s) => s.status !== 'Needs Support').length} Students
              </div>
              <div className="text-xs text-emerald-800 font-semibold">FLN Botany Benchmarks Met</div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Class Avg Understanding</div>
              <div className="text-2xl font-extrabold text-neutral-900">
                {Math.round(students.reduce((acc, s) => acc + s.understandingRate, 0) / (students.length || 1))}%
              </div>
              <div className="text-xs text-emerald-700 font-semibold">Target: 85% Regional Benchmark</div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name, roll, language, or gap..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 rounded-xl text-xs font-medium border border-neutral-200 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['All', 'Needs Support', 'Mastered'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStudentStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    studentStatusFilter === filter
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {filter === 'All'
                    ? `All (${students.length})`
                    : filter === 'Needs Support'
                    ? `Needs Support (${students.filter((s) => s.status === 'Needs Support').length})`
                    : `Mastered (${students.filter((s) => s.status === 'Mastered').length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Roster & Gaps Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Student & Roll No.</th>
                  <th className="py-3 px-4">Class & Mother Tongue</th>
                  <th className="py-3 px-4">Identified Learning Gap</th>
                  <th className="py-3 px-4">Understanding Rate</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Pedagogic Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {students
                  .filter((st) => {
                    const matchesSearch =
                      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      st.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      st.motherTongue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (st.detectedGap && st.detectedGap.toLowerCase().includes(searchQuery.toLowerCase()));

                    const matchesFilter =
                      studentStatusFilter === 'All' ||
                      (studentStatusFilter === 'Needs Support' && st.status === 'Needs Support') ||
                      (studentStatusFilter === 'Mastered' && st.status === 'Mastered');

                    return matchesSearch && matchesFilter;
                  })
                  .map((st) => (
                    <tr key={st.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">{st.name}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">{st.rollNumber}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-800">{st.class}</div>
                        <div className="text-[11px] text-emerald-800 font-bold">{st.motherTongue}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        {st.detectedGap && st.detectedGap.toLowerCase().includes('none') ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Concept fully mastered</span>
                          </span>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-900 font-bold">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>{st.detectedGap || 'Photosynthesis vernacular terminology'}</span>
                            </span>
                            <div className="text-[10px] text-neutral-400 font-medium">
                              Root Cause: Dialect mismatch with NCERT Hindi terms
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">{st.understandingRate}%</div>
                        <div className="text-[10px] text-neutral-400">Score: {st.currentScore}/5</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-neutral-800">{st.attendancePercentage}%</span>
                        <span className="text-[10px] text-neutral-400 block">
                          {st.presentDays}/{st.presentDays + st.absentDays} Days
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            st.status === 'Mastered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {st.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate('gap_analysis')}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-[11px] border border-amber-200/60 cursor-pointer transition-all active:scale-95"
                            title="Open AI Gap Diagnosis"
                          >
                            Diagnose Gap
                          </button>
                          <button
                            onClick={() => onNavigate('remedial')}
                            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-lg text-[11px] cursor-pointer transition-all active:scale-95"
                            title="Launch Remedial Module"
                          >
                            Remedial
                          </button>
                          {st.status !== 'Mastered' && (
                            <button
                              onClick={() => {
                                setStudents((prev) =>
                                  prev.map((s) =>
                                    s.id === st.id
                                      ? {
                                          ...s,
                                          status: 'Mastered',
                                          understandingRate: 100,
                                          currentScore: 5,
                                          detectedGap: 'None — Concept fully mastered',
                                        }
                                      : s
                                  )
                                );
                                showToast(`Marked ${st.name}'s learning gap as MASTERED.`);
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[11px] border border-emerald-200 cursor-pointer transition-all"
                              title="Resolve and Mark Mastered"
                            >
                              ✓ Resolved
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: TEACHERS DIRECTORY                                                */}
      {/* ========================================================================= */}
      {currentScreen === 'admin_teachers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      {teacher.staffId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {teacher.status}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900">{teacher.name}</h3>
                  <div className="text-xs text-neutral-500">
                    {teacher.subject} • {teacher.assignedClass}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 text-xs space-y-1.5 text-neutral-600">
                  <div className="flex justify-between">
                    <span>Language Expertise:</span>
                    <span className="font-bold text-emerald-800">
                      {teacher.languageProficiency.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students Assigned:</span>
                    <span className="font-bold text-neutral-900">
                      {teacher.studentsAssignedCount} students
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons Created:</span>
                    <span className="font-bold text-neutral-900">
                      {teacher.lessonsCreatedCount} lessons
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: DAILY ROLL-CALL & ATTENDANCE REGISTER (RESOLVED / INTERACTIVE)    */}
      {/* ========================================================================= */}
      {(currentScreen === 'admin_student_attendance' || currentScreen === 'attendance') && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Header Card with Session & Action Buttons */}
          <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  ● Live Session: Morning Assembly & Mid-day Meal
                </span>
                <span className="text-xs font-mono text-neutral-400">Class 3 Section A</span>
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight">
                Daily Classroom Attendance Register
              </h3>
              <p className="text-xs text-neutral-500">
                Official statutory attendance log synced with District Education Management System (UDISE+).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleMarkAllPresent}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
              >
                ✓ Mark All Present
              </button>
              <button
                onClick={() => showToast('Biometric fingerprint sync completed: 8 student records verified.')}
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                Biometric Sync
              </button>
              <button
                onClick={() => showToast('Daily Attendance Register (CSV) exported for district reporting.')}
                className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                Export Register
              </button>
            </div>
          </div>

          {/* Real-time Attendance Stats */}
          {(() => {
            const total = students.length || 1;
            const presentCount = Object.values(dailyAttendance).filter((v) => v === 'present').length;
            const absentCount = Object.values(dailyAttendance).filter((v) => v === 'absent').length;
            const lateCount = Object.values(dailyAttendance).filter((v) => v === 'late').length;
            const attendanceRate = Math.round(((presentCount + lateCount) / total) * 100);

            return (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Total Enrolled</div>
                  <div className="text-2xl font-extrabold text-neutral-900">{total} Students</div>
                  <div className="text-xs text-neutral-500">Class 3A Roster</div>
                </div>

                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Present Today</div>
                  <div className="text-2xl font-extrabold text-emerald-950">{presentCount} Students</div>
                  <div className="text-xs text-emerald-700 font-semibold">In Classroom & Seated</div>
                </div>

                <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200/80 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Absent Today</div>
                  <div className="text-2xl font-extrabold text-rose-950">{absentCount} Students</div>
                  <div className="text-xs text-rose-700 font-semibold">SMS Alert to Guardian Sent</div>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Today's Rate</div>
                  <div className="text-2xl font-extrabold text-amber-950">{attendanceRate}%</div>
                  <div className="text-xs text-amber-800 font-semibold">{lateCount} marked as late/leave</div>
                </div>
              </div>
            );
          })()}

          {/* Roll-Call Register Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Roll No.</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Mother Tongue</th>
                  <th className="py-3 px-4">Term Cumulative</th>
                  <th className="py-3 px-4">Today's Status</th>
                  <th className="py-3 px-4 text-right">Mark Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {students.map((st) => {
                  const currentStatus = dailyAttendance[st.id] || 'present';
                  return (
                    <tr key={st.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-neutral-500">{st.rollNumber}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">{st.name}</div>
                        <div className="text-[10px] text-neutral-400">{st.class}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {st.motherTongue}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-800">
                          {st.presentDays} / {st.presentDays + st.absentDays} Days ({st.attendancePercentage}%)
                        </div>
                        <div className="w-28 bg-neutral-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              st.attendancePercentage >= 90
                                ? 'bg-emerald-600'
                                : st.attendancePercentage >= 75
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, st.attendancePercentage)}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            currentStatus === 'present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : currentStatus === 'absent'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          ● {currentStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                          <button
                            onClick={() => handleSetDailyAttendance(st.id, 'present')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                              currentStatus === 'present'
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            title="Mark Present"
                          >
                            P
                          </button>
                          <button
                            onClick={() => handleSetDailyAttendance(st.id, 'absent')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                              currentStatus === 'absent'
                                ? 'bg-rose-700 text-white shadow-xs'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            title="Mark Absent"
                          >
                            A
                          </button>
                          <button
                            onClick={() => handleSetDailyAttendance(st.id, 'late')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                              currentStatus === 'late'
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            title="Mark Late / Leave"
                          >
                            L
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: STAFF ATTENDANCE & LOG (FIXED / IMPLEMENTED)                       */}
      {/* ========================================================================= */}
      {currentScreen === 'admin_staff_attendance' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Total Teaching Staff</div>
              <div className="text-3xl font-black text-neutral-900">{teachers.length}</div>
              <div className="text-xs text-neutral-500 font-semibold">4 Primary Clusters</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">On Duty Today</div>
              <div className="text-3xl font-black text-emerald-700">
                {teachers.filter((t) => t.status === 'Active').length} / {teachers.length}
              </div>
              <div className="text-xs text-emerald-700 font-semibold">100% In-Class Engagement</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Monthly Staff Rate</div>
              <div className="text-3xl font-black text-neutral-900">97.4%</div>
              <div className="text-xs text-emerald-700 font-semibold">Biometric verified</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Approved Leave</div>
              <div className="text-3xl font-black text-neutral-900">
                {teachers.filter((t) => t.status !== 'Active').length}
              </div>
              <div className="text-xs text-neutral-400 font-semibold">0 Unscheduled Absences</div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>Daily Staff Attendance & Biometric Register</span>
              </h3>
              <p className="text-xs text-neutral-500">Dumka Cluster Schools • Duty Date: Today</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="mark-all-staff-present-btn"
                onClick={handleMarkAllStaffPresent}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark All Staff Present</span>
              </button>
            </div>
          </div>

          {/* Attendance Register Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/90 text-neutral-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Staff Member & ID</th>
                  <th className="py-3 px-4">Assigned Grade & Subject</th>
                  <th className="py-3 px-4">Language Dialect</th>
                  <th className="py-3 px-4">Biometric Check-in</th>
                  <th className="py-3 px-4">Monthly Rate (%)</th>
                  <th className="py-3 px-4">Today's Status</th>
                  <th className="py-3 px-4 text-right">Duty Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{teacher.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{teacher.staffId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-800">{teacher.assignedClass}</div>
                      <div className="text-[11px] text-neutral-500">{teacher.subject}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-800">
                        {teacher.languageProficiency.join(', ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-600">
                      {teacher.status === 'Active' ? '08:30 AM' : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900">{teacher.attendancePercentage}%</span>
                        <div className="w-16 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${teacher.attendancePercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          teacher.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {teacher.status === 'Active' ? '✓ Active On Duty' : 'On Leave'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleStaffAttendance(teacher.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          teacher.status === 'Active'
                            ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {teacher.status === 'Active' ? 'Mark Leave' : '+ Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: LESSONS REGISTRY & UPLOAD (FIXED / IMPLEMENTED)                   */}
      {/* ========================================================================= */}
      {currentScreen === 'admin_lessons' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filter Bar */}
          <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-bold uppercase text-[11px]">Subject:</span>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-800 cursor-pointer"
                >
                  <option value="All">All Subjects</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Environmental Studies">Environmental Studies</option>
                  <option value="Language & Literacy">Language & Literacy</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-bold uppercase text-[11px]">Language:</span>
                <select
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-800 cursor-pointer"
                >
                  <option value="All">All Languages</option>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.name}>
                      {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-xs text-neutral-500 font-semibold font-mono">
              Total Lessons: {lessonsList.length} Units
            </div>
          </div>

          {/* Lessons Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessonsList
              .filter((les) => filterSubject === 'All' || les.subject === filterSubject)
              .filter((les) => filterLanguage === 'All' || les.language.includes(filterLanguage))
              .map((les) => (
                <div
                  key={les.id}
                  className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-neutral-400 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
                        {les.language} • {les.class}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {les.status}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-neutral-900 text-base leading-snug">
                      {les.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">{les.description}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div className="text-neutral-400 text-[11px]">
                      By <strong>{les.createdBy}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('student_learning')}
                        className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
                      >
                        Preview →
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(les.id)}
                        className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete lesson"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: ASSESSMENTS CYCLES & DIAGNOSTICS (FIXED / IMPLEMENTED)             */}
      {/* ========================================================================= */}
      {currentScreen === 'admin_assessments' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Assessment Cycles</div>
              <div className="text-3xl font-black text-neutral-900">{assessmentsList.length}</div>
              <div className="text-xs text-neutral-500 font-semibold">Active Curriculum Units</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Evaluated Students</div>
              <div className="text-3xl font-black text-emerald-700">94</div>
              <div className="text-xs text-emerald-700 font-semibold">Across 4 Mother Tongues</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Average Mastery Score</div>
              <div className="text-3xl font-black text-neutral-900">84.2%</div>
              <div className="text-xs text-emerald-700 font-semibold">+18% with Vernacular Metaphors</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase">Active Learning Gaps</div>
              <div className="text-3xl font-black text-amber-600">8</div>
              <div className="text-xs text-amber-700 font-semibold">Remedial Modules Triggered</div>
            </div>
          </div>

          {/* Assessment Units Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  <span>District Diagnostic Assessment Cycles</span>
                </h3>
                <p className="text-xs text-neutral-500">Continuous Formative Micro-Assessments & Remedial Triggers</p>
              </div>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/90 text-neutral-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Assessment Unit & Title</th>
                  <th className="py-3 px-4">Subject & Class</th>
                  <th className="py-3 px-4">Evaluated Students</th>
                  <th className="py-3 px-4">Avg. Score</th>
                  <th className="py-3 px-4">Teacher / Evaluator</th>
                  <th className="py-3 px-4">Conducted Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {assessmentsList.map((assess) => (
                  <tr key={assess.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-900">{assess.title}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{assess.id}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-800">{assess.subject}</div>
                      <div className="text-[11px] text-neutral-500">{assess.class}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-800">
                      {assess.studentsAttempted} / {assess.totalStudents} Students
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-800 text-sm">
                        {assess.averageScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 font-medium">
                      {assess.teacherName}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 font-mono">
                      {assess.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {assess.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onNavigate('assessment')}
                        className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-lg text-xs cursor-pointer transition-all"
                      >
                        View Diagnosis →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: LEARNING GAPS DIAGNOSTICS                                         */}
      {/* ========================================================================= */}
      {currentScreen === 'admin_learning_gaps' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
            <strong>System Insight:</strong> Automated root-cause detection traces conceptual errors to mother-tongue vocabulary mismatches rather than learning ability.
          </div>

          <div className="space-y-3">
            {learningGaps.map((gap) => (
              <div
                key={gap.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900">{gap.studentName}</span>
                    <span className="text-xs text-neutral-400">({gap.class})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        gap.difficulty === 'High' || gap.difficulty === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {gap.difficulty} Priority
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-800">
                    Concept Gap: {gap.concept}
                  </div>
                  <div className="text-xs text-neutral-500">{gap.recommendedAction}</div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      gap.status === 'Mastered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {gap.status}
                  </span>

                  {gap.status !== 'Mastered' && (
                    <button
                      onClick={() => handleResolveGap(gap.id)}
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Resolve Gap
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN: REGIONAL LANGUAGES & SETTINGS                                     */}
      {/* ========================================================================= */}
      {(currentScreen === 'admin_languages' || currentScreen === 'admin_settings') && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-neutral-900 text-base">
              Configured Regional Vernacular Models (6 Languages)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  className={`p-4 rounded-xl border text-xs space-y-2 cursor-pointer transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-neutral-200 bg-neutral-50 hover:bg-white'
                  }`}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    showToast(`Active language set to ${lang.name}`);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-sm">{lang.name}</span>
                    {lang.isLowResource && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono">
                        Tribal
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-serif text-emerald-900 font-bold">
                    {lang.nativeName} ({lang.script})
                  </div>
                  <div className="text-[11px] text-neutral-500">Region: {lang.region}</div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Speech: {lang.speechCode}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: UPLOAD NEW LESSON                                                  */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">
                    Upload New Vernacular Lesson
                  </h3>
                  <p className="text-xs text-neutral-500">Publish to Classroom Rosters & Offline Tablets</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-4 text-xs">
              {/* Title Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Lesson Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Parts of Plants & Root Water Absorption"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Mother-Tongue Native Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ᱫᱟᱨᱮ ᱨᱮᱦᱮᱫ ᱟᱨ ᱫᱟᱜ ᱥᱟᱬᱮᱥ"
                    value={newLessonTitleMt}
                    onChange={(e) => setNewLessonTitleMt(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Subject, Grade, Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Subject *
                  </label>
                  <select
                    value={newLessonSubject}
                    onChange={(e) => setNewLessonSubject(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="Language & Literacy">Language & Literacy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Grade / Class *
                  </label>
                  <select
                    value={newLessonClass}
                    onChange={(e) => setNewLessonClass(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Regional Language *
                  </label>
                  <select
                    value={newLessonLanguage}
                    onChange={(e) => setNewLessonLanguage(e.target.value as LanguageCode)}
                    className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-xl font-bold text-emerald-950 focus:outline-hidden cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name} ({l.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cultural Setting */}
              <div className="space-y-1.5">
                <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                  Cultural / Village Metaphor
                </label>
                <input
                  type="text"
                  placeholder="e.g. Village Courtyard, Straws in Clay Pitcher, Sacred Grove Forest"
                  value={newLessonMetaphor}
                  onChange={(e) => setNewLessonMetaphor(e.target.value)}
                  className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Description / Story Narrative */}
              <div className="space-y-1.5">
                <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                  Curriculum Narrative & Pedagogy Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter the lesson story or teacher explanation in vernacular/English..."
                  value={newLessonDescription}
                  onChange={(e) => setNewLessonDescription(e.target.value)}
                  className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:bg-white focus:outline-hidden resize-none"
                />
              </div>

              {/* File Attachment Dropzone */}
              <div className="p-4 bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-2xl text-center space-y-2">
                <FileText className="w-6 h-6 text-neutral-400 mx-auto" />
                <div className="text-xs text-neutral-600">
                  {newLessonFileName ? (
                    <span className="font-bold text-emerald-800">
                      ✓ Attached: {newLessonFileName}
                    </span>
                  ) : (
                    <span>Drag and drop NCERT lesson PDF or audio worksheet, or click to browse</span>
                  )}
                </div>
                <input
                  type="file"
                  id="lesson-file-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setNewLessonFileName(file.name);
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('lesson-file-upload')?.click()}
                  className="px-3 py-1.5 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-700 cursor-pointer"
                >
                  Browse Document
                </button>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  Publish to Classroom Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SCHEDULE ASSESSMENT CYCLE                                          */}
      {/* ========================================================================= */}
      {isNewAssessmentModalOpen && (
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
                  <p className="text-xs text-neutral-500">Diagnostic Micro-Evaluation for Rural Clusters</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewAssessmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssessment} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                  Assessment Unit Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 3: Flora & Ecological Life Diagnostic"
                  value={newAssessmentTitle}
                  onChange={(e) => setNewAssessmentTitle(e.target.value)}
                  className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Subject
                  </label>
                  <select
                    value={newAssessmentSubject}
                    onChange={(e) => setNewAssessmentSubject(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="Language & Literacy">Language & Literacy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
                    Target Class
                  </label>
                  <select
                    value={newAssessmentClass}
                    onChange={(e) => setNewAssessmentClass(e.target.value)}
                    className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewAssessmentModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  Schedule Diagnostic Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
