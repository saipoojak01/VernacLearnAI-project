import React, { useState, useEffect } from 'react';
import {
  Screen,
  LanguageCode,
  LearningContext,
  UserRole,
  StudentRecord,
  VocabularyItem,
  DemoUser,
  UserProfileData,
  ConvertedLessonNote,
} from './types';
import {
  CLASS_STUDENTS,
  INITIAL_VOCABULARY_BASE,
  SUPPORTED_LANGUAGES,
  DEMO_USERS,
} from './data/demoData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OfflinePanel } from './components/OfflinePanel';
import { generateLessonNotesConversionFallback } from './utils/translation';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { LessonGenerator } from './pages/LessonGenerator';
import { StaffTranslator } from './pages/StaffTranslator';
import { LessonNotesConverter, SAMPLE_ENGLISH_NOTES } from './components/LessonNotesConverter';
import { StudentLearning } from './pages/StudentLearning';
import { Assessment } from './pages/Assessment';
import { LearningGapAnalysis } from './pages/LearningGapAnalysis';
import { RemedialLearning } from './pages/RemedialLearning';
import { Analytics } from './pages/Analytics';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { StudentPortal } from './pages/StudentPortal';
import { AdminPortal } from './pages/AdminPortal';

export function App() {
  // Navigation & Role State
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('santhali');
  const [learningContext, setLearningContext] = useState<LearningContext>('rural_school');

  // Dynamic User Profiles
  const [userProfiles, setUserProfiles] = useState<Record<UserRole, DemoUser>>({
    admin: { ...DEMO_USERS.admin },
    staff: { ...DEMO_USERS.staff },
    student: { ...DEMO_USERS.student },
  });

  // Interactive Learning & Assessment State
  const [studentScore, setStudentScore] = useState<number>(4);
  const [remedialCompleted, setRemedialCompleted] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('plants_needs');

  // Offline Simulation State
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [showOfflineModal, setShowOfflineModal] = useState<boolean>(false);

  // Central Shared Data (Students & Vocabulary)
  const [students, setStudents] = useState<StudentRecord[]>(CLASS_STUDENTS);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(INITIAL_VOCABULARY_BASE);

  // Uploaded and Translated Lesson Notes (Staff Portal <-> Student Portal)
  const [uploadedNotes, setUploadedNotes] = useState<ConvertedLessonNote[]>(() => {
    return SAMPLE_ENGLISH_NOTES.map((sample) =>
      generateLessonNotesConversionFallback(
        sample.fileName,
        sample.content,
        selectedLanguage || 'santhali',
        sample.size
      )
    );
  });

  const handleSaveConvertedNote = (note: ConvertedLessonNote) => {
    setUploadedNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === note.id || n.fileName === note.fileName);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = note;
        return copy;
      }
      return [note, ...prev];
    });
  };

  // Sync state if remedial is completed
  const handleCompleteRemedial = () => {
    setRemedialCompleted(true);
    setStudentScore(5);
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === 's3' || s.rollNumber === userProfiles.student.rollNumber || s.rollNumber === 'STD-304') {
          return {
            ...s,
            currentScore: 5,
            understandingRate: 100,
            status: 'Mastered',
            detectedGap: 'Resolved (Sunlight food synthesis mastered)',
          };
        }
        return s;
      })
    );
  };

  const handleRoleSelect = (role: UserRole, profileData?: UserProfileData) => {
    setUserRole(role);
    if (profileData && profileData.name) {
      setUserProfiles((prev) => ({
        ...prev,
        [role]: {
          ...prev[role],
          name: profileData.name,
          email: profileData.email || prev[role].email,
          rollNumber: profileData.rollNumber || prev[role].rollNumber,
          staffId: profileData.staffId || prev[role].staffId,
        },
      }));

      // If student profile is updated, also update the student record in class roster
      if (role === 'student') {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === 's3'
              ? {
                  ...s,
                  name: profileData.name,
                  rollNumber: profileData.rollNumber || s.rollNumber,
                }
              : s
          )
        );
      }
    }

    if (role === 'admin') {
      setCurrentScreen('admin_overview');
    } else if (role === 'student') {
      setCurrentScreen('student_home');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleEnterDemo = (role?: UserRole, profileData?: UserProfileData) => {
    const activeRole = role || userRole;
    handleRoleSelect(activeRole, profileData);
  };

  const handleResetDemo = () => {
    setUserProfiles({
      admin: { ...DEMO_USERS.admin },
      staff: { ...DEMO_USERS.staff },
      student: { ...DEMO_USERS.student },
    });
    setStudents(CLASS_STUDENTS);
    setRemedialCompleted(false);
    setStudentScore(4);
  };

  const currentUser = userProfiles[userRole];

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <Landing
            onEnterDemo={handleEnterDemo}
            onSelectRole={handleRoleSelect}
            onSelectLanguage={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
            currentRole={userRole}
            currentUser={currentUser}
            userProfiles={userProfiles}
            onOpenOfflinePanel={() => setShowOfflineModal(true)}
          />
        );

      // Staff Hub
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            learningContext={learningContext}
            onSelectContext={setLearningContext}
            onStartLessonGeneration={() => setCurrentScreen('lesson_gen')}
            remedialCompleted={remedialCompleted}
            onOpenOfflinePanel={() => setShowOfflineModal(true)}
            teacherName={userProfiles.staff.name}
            targetStudentName={userProfiles.student.name}
          />
        );

      // Lesson Generator
      case 'lesson_gen':
      case 'lesson_generator':
        return (
          <LessonGenerator
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            learningContext={learningContext}
            onSelectContext={setLearningContext}
          />
        );

      // Translator / Adapter
      case 'translate':
      case 'student_translator':
        return (
          <StaffTranslator
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            learningContext={learningContext}
            isStudentMode={currentScreen === 'student_translator' || userRole === 'student'}
            onSaveConvertedNote={handleSaveConvertedNote}
            uploadedNotes={uploadedNotes}
          />
        );

      // Lesson Notes Converter (Upload English PDF -> Mother Tongue)
      case 'lesson_notes':
        return (
          <LessonNotesConverter
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            onNavigate={setCurrentScreen}
            onSaveConvertedNote={handleSaveConvertedNote}
            uploadedNotes={uploadedNotes}
          />
        );

      // Student Interactive Learning with 5-Question Quiz & TTS
      case 'student_learning':
        return (
          <StudentLearning
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            students={students}
            onUpdateStudents={setStudents}
            studentScore={studentScore}
            onUpdateStudentScore={setStudentScore}
            selectedLessonId={selectedLessonId}
            onSelectLessonId={setSelectedLessonId}
          />
        );

      // Student Portal Views
      case 'student_home':
      case 'student_lessons':
      case 'student_notes':
      case 'student_vocabulary':
      case 'student_progress':
        return (
          <StudentPortal
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            studentScore={studentScore}
            remedialCompleted={remedialCompleted}
            vocabulary={vocabulary}
            studentName={userProfiles.student.name}
            rollNumber={userProfiles.student.rollNumber}
            selectedLessonId={selectedLessonId}
            onSelectLessonId={setSelectedLessonId}
            uploadedNotes={uploadedNotes}
          />
        );

      // Assessment Diagnostic
      case 'assessment':
        return (
          <Assessment
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            studentScore={studentScore}
            onStartRemedial={() => setRemedialCompleted(false)}
            studentName={userProfiles.student.name}
          />
        );

      // Learning Gap AI Engine
      case 'gap_analysis':
        return (
          <LearningGapAnalysis
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            studentScore={studentScore}
            remedialCompleted={remedialCompleted}
            onStartRemedial={() => setRemedialCompleted(false)}
            studentName={userProfiles.student.name}
          />
        );

      // Remedial Learning
      case 'remedial':
        return (
          <RemedialLearning
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            remedialCompleted={remedialCompleted}
            onCompleteRemedial={handleCompleteRemedial}
            studentName={userProfiles.student.name}
            selectedLessonId={selectedLessonId}
            onSelectLessonId={setSelectedLessonId}
          />
        );

      // Analytics
      case 'analytics':
        return (
          <Analytics
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            remedialCompleted={remedialCompleted}
          />
        );

      // Knowledge Base & Admin Verification
      case 'knowledge_base':
      case 'admin_verification':
        return (
          <KnowledgeBase
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            userRole={userRole}
            vocabulary={vocabulary}
            onUpdateVocabulary={setVocabulary}
          />
        );

      // Admin Management Views
      case 'admin_overview':
      case 'overview':
      case 'admin_students':
      case 'admin_teachers':
      case 'admin_student_attendance':
      case 'admin_staff_attendance':
      case 'admin_lessons':
      case 'admin_assessments':
      case 'admin_learning_gaps':
      case 'admin_languages':
      case 'admin_settings':
      case 'attendance':
      case 'staff_students':
        return (
          <AdminPortal
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            remedialCompleted={remedialCompleted}
            students={students}
            onUpdateStudents={setStudents}
            adminName={userProfiles.admin.name}
            teacherName={userProfiles.staff.name}
          />
        );

      default:
        return (
          <Dashboard
            onNavigate={setCurrentScreen}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            learningContext={learningContext}
            onSelectContext={setLearningContext}
            onStartLessonGeneration={() => setCurrentScreen('lesson_gen')}
            remedialCompleted={remedialCompleted}
            onOpenOfflinePanel={() => setShowOfflineModal(true)}
            teacherName={userProfiles.staff.name}
            targetStudentName={userProfiles.student.name}
          />
        );
    }
  };

  // If on Landing page, show landing without app shell
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased">
        <Landing
          onEnterDemo={handleEnterDemo}
          onSelectRole={handleRoleSelect}
          onSelectLanguage={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
          currentRole={userRole}
          currentUser={currentUser}
          userProfiles={userProfiles}
          onOpenOfflinePanel={() => setShowOfflineModal(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        userRole={userRole}
        onSelectRole={handleRoleSelect}
        onRoleChange={handleRoleSelect}
        currentUser={currentUser}
        userProfiles={userProfiles}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onLanguageChange={setSelectedLanguage}
        learningContext={learningContext}
        onSelectContext={setLearningContext}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
        onOpenOfflinePanel={() => setShowOfflineModal(true)}
        onOpenOfflineModal={() => setShowOfflineModal(true)}
        onResetDemo={handleResetDemo}
        onLogout={() => setCurrentScreen('landing')}
      />

      {/* Main Workspace Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Navigation */}
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          userRole={userRole}
          currentUser={currentUser}
          remedialCompleted={remedialCompleted}
          onOpenOfflinePanel={() => setShowOfflineModal(true)}
          onLogout={() => setCurrentScreen('landing')}
          selectedLessonId={selectedLessonId}
        />

        {/* Dynamic Workspace Canvas */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/50">
          {renderScreen()}
        </main>
      </div>

      {/* Offline Architecture Modal */}
      <OfflinePanel
        isOpen={showOfflineModal}
        onClose={() => setShowOfflineModal(false)}
        isOffline={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
      />
    </div>
  );
}

export default App;
