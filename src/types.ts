export type Screen =
  | 'landing'
  | 'overview'
  | 'dashboard'
  | 'translate'
  | 'lesson_notes'
  | 'lesson_gen'
  | 'lesson_generator'
  | 'assessment'
  | 'gap_analysis'
  | 'remedial'
  | 'analytics'
  | 'knowledge_base'
  | 'admin_verification'
  | 'admin_analytics'
  | 'admin_overview'
  | 'admin_students'
  | 'admin_teachers'
  | 'admin_student_attendance'
  | 'admin_staff_attendance'
  | 'admin_lessons'
  | 'admin_student_progress'
  | 'admin_assessments'
  | 'admin_learning_gaps'
  | 'admin_languages'
  | 'admin_settings'
  | 'attendance'
  | 'staff_students'
  | 'student_home'
  | 'student_translator'
  | 'student_lessons'
  | 'student_notes'
  | 'student_learning'
  | 'student_vocabulary'
  | 'student_progress';

export type LanguageCode =
  | 'santhali'
  | 'gondi'
  | 'bhojpuri'
  | 'maithili'
  | 'odia'
  | 'marathi';

export type LearningContext =
  | 'rural_school'
  | 'village_environment'
  | 'local_community';

export type UserRole = 'admin' | 'staff' | 'student';

export interface StudentRecord {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  motherTongue: string;
  assignedTeacher?: string;
  initialScore: number;
  currentScore: number;
  understandingRate: number;
  learningProgress?: number;
  completedLessonsCount?: number;
  totalLessonsCount?: number;
  assessmentScore?: number;
  remedialSessionsCount?: number;
  improvementRate?: string;
  detectedGap: string;
  status: 'Mastered' | 'On Track' | 'Needs Support' | 'In Remediation';
  lastAssessed: string;
  parentContact?: string;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  strengths?: string[];
  weaknesses?: string[];
  recentActivity?: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
    score?: string;
  }>;
}

export interface TeacherRecord {
  id: string;
  name: string;
  staffId: string;
  email: string;
  subject: string;
  assignedClass: string;
  phone: string;
  qualification: string;
  languageProficiency: string[];
  studentsAssignedCount: number;
  lessonsCreatedCount: number;
  assessmentsConductedCount: number;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  status: 'Active' | 'On Leave';
  joinedDate: string;
  recentActivity?: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
  }>;
}

export interface VocabularyItem {
  id: string;
  category: string;
  english: string;
  hindi: string;
  motherTongue: string;
  transliteration: string;
  meaningInContext: string;
  status: 'verified' | 'pending_verification' | 'needs_review' | 'rejected';
  submittedBy?: string;
  submittedRole?: 'admin' | 'staff' | 'student';
  submissionDate?: string;
  teacherNote?: string;
  lastUpdated?: string;
}

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  region: string;
  speakerCount: string;
  script: string;
  speechCode: string;
  isLowResource: boolean;
}

export interface LessonContent {
  id: string;
  language: LanguageCode;
  title: string;
  originalCurriculumText: string;
  translatedContent: string;
  transliteration: string;
  phoneticAudioText: string;
  childFriendlyTitle: string;
  childFriendlyExplanation: string;
  childFriendlyExplanationMt: string;
  localContextExamples: Array<{
    context: LearningContext;
    title: string;
    description: string;
    descriptionMt: string;
  }>;
  keyVocabulary: Array<{
    term: string;
    vernacularTerm: string;
    meaning: string;
  }>;
}

export interface ConceptMastery {
  concept: string;
  masteryPercentage: number;
  studentsNeedingSupport: number;
  status: string;
}

export interface AdminLessonItem {
  id: string;
  title: string;
  subject: string;
  class: string;
  language: string;
  createdBy: string;
  createdDate?: string;
  studentsAssigned: number;
  completionRate: number;
  status: string;
  description: string;
  contentSample?: string;
}

export interface AdminAssessmentItem {
  id: string;
  title: string;
  subject: string;
  class: string;
  teacherName: string;
  date: string;
  studentsAttempted: number;
  totalStudents: number;
  averageScore: number;
  completionRate: number;
  status: string;
}

export interface AdminLearningGapItem {
  id: string;
  studentName: string;
  class: string;
  teacherName: string;
  concept: string;
  diagnosedDate: string;
  difficulty: 'High' | 'Medium' | 'Critical' | 'Low';
  status: 'Needs Support' | 'In Remediation' | 'Mastered';
  recommendedAction: string;
  improvement?: string;
}

export interface QuizOption {
  id: string;
  textEn: string;
  textMt: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  questionTextEn: string;
  questionTextMt: string;
  targetConcept: string;
  options: QuizOption[];
  explanationEn: string;
  explanationMt: string;
}

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  rollNumber?: string;
  staffId?: string;
  class?: string;
  school: string;
}

export interface UserProfileData {
  role: UserRole;
  name: string;
  rollNumber?: string;
  staffId?: string;
  email?: string;
  class?: string;
}

export interface ConvertedLessonSection {
  headingEn: string;
  headingMt: string;
  contentMt: string;
  contentEn: string;
  transliteration: string;
  childExplanation?: string;
}

export interface ConvertedLessonNote {
  id: string;
  fileName: string;
  fileSize?: string;
  uploadedAt: string;
  sourceLanguage: string;
  targetLanguage: LanguageCode;
  title: {
    english: string;
    motherTongue: string;
    transliteration: string;
  };
  extractedEnglishText: string;
  overviewMt: string;
  overviewEn: string;
  transliterationOverview: string;
  sections: ConvertedLessonSection[];
  keyVocabulary: Array<{
    englishTerm: string;
    motherTongueTerm: string;
    transliteration: string;
    meaning: string;
    villageExample?: string;
  }>;
  classroomActivities?: string[];
  pedagogicBridgingTip?: string;
}
