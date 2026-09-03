import React from 'react';
import { Screen, UserRole, DemoUser } from '../types';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Database,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Globe2,
  Users,
  GraduationCap,
  CalendarCheck,
  Settings,
  Star,
  Award,
  Shield,
  Layers,
  BarChart3,
  LogOut,
  FileUp,
} from 'lucide-react';
import { getRemedialLesson } from '../data/remedialLessonsData';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  remedialCompleted: boolean;
  onOpenOfflinePanel: () => void;
  userRole?: UserRole;
  currentUser?: DemoUser;
  onLogout?: () => void;
  selectedLessonId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  remedialCompleted,
  onOpenOfflinePanel,
  userRole = 'staff',
  currentUser,
  onLogout,
  selectedLessonId = 'plants_needs',
}) => {
  const activeRemedial = getRemedialLesson(selectedLessonId);

  // Navigation lists tailored per role
  const getNavItems = () => {
    if (userRole === 'admin') {
      return [
        {
          id: 'admin_overview' as Screen,
          label: 'Dashboard',
          icon: LayoutDashboard,
          badge: undefined,
        },
        {
          id: 'admin_students' as Screen,
          label: 'Students',
          icon: Users,
          badge: '8 Enrolled',
        },
        {
          id: 'admin_teachers' as Screen,
          label: 'Teachers / Staff',
          icon: GraduationCap,
          badge: '4 Active',
        },
        {
          id: 'admin_student_attendance' as Screen,
          label: 'Student Attendance',
          icon: CalendarCheck,
          badge: '94%',
        },
        {
          id: 'admin_staff_attendance' as Screen,
          label: 'Staff Attendance',
          icon: CheckCircle2,
          badge: '96%',
        },
        {
          id: 'admin_lessons' as Screen,
          label: 'Lessons',
          icon: BookOpen,
          badge: '46',
        },
        {
          id: 'admin_student_progress' as Screen,
          label: 'Student Progress',
          icon: TrendingUp,
          badge: '82% Avg',
        },
        {
          id: 'admin_assessments' as Screen,
          label: 'Assessments',
          icon: Award,
          badge: '4 Units',
        },
        {
          id: 'admin_learning_gaps' as Screen,
          label: 'Learning Gaps',
          icon: AlertCircle,
          badge: '4 Gaps',
          badgeColor: 'bg-amber-100 text-amber-900 font-bold',
        },
        {
          id: 'admin_languages' as Screen,
          label: 'Languages',
          icon: Globe2,
          badge: '6 Active',
        },
        {
          id: 'analytics' as Screen,
          label: 'Analytics',
          icon: BarChart3,
          badge: 'FLN Live',
        },
        {
          id: 'admin_settings' as Screen,
          label: 'Settings',
          icon: Settings,
          badge: undefined,
        },
      ];
    }

    if (userRole === 'student') {
      return [
        {
          id: 'student_home' as Screen,
          label: 'My Home (ᱚᱲᱟᱜ)',
          icon: LayoutDashboard,
          badge: undefined,
        },
        {
          id: 'student_translator' as Screen,
          label: 'AI Translator (ᱛᱚᱨᱡᱚᱢᱟ)',
          icon: Globe2,
          badge: 'AI',
        },
        {
          id: 'student_lessons' as Screen,
          label: 'My Lessons (ᱯᱟᱴᱷ)',
          icon: BookOpen,
          badge: 'Class 3',
        },
        {
          id: 'student_notes' as Screen,
          label: 'Uploaded Notes (ᱯᱚᱛᱚᱵ)',
          icon: FileUp,
          badge: 'Translated',
          badgeColor: 'bg-emerald-100 text-emerald-800 font-bold',
        },
        {
          id: 'student_learning' as Screen,
          label: 'Interactive Lesson',
          icon: Sparkles,
          badge: 'Audio',
        },
        {
          id: 'remedial' as Screen,
          label: activeRemedial.badge,
          icon: Star,
          badge: 'Game',
          badgeColor: 'bg-amber-100 text-amber-900',
        },
        {
          id: 'student_progress' as Screen,
          label: 'My Stars & Badges',
          icon: Award,
          badge: '12 ★',
          badgeColor: 'bg-amber-100 text-amber-800 font-bold',
        },
      ];
    }

    // Staff / Teacher default items
    return [
      {
        id: 'overview' as Screen,
        label: 'Classroom Dashboard',
        icon: LayoutDashboard,
        badge: undefined,
      },
      {
        id: 'translate' as Screen,
        label: 'Translate & Adapt',
        icon: Globe2,
        badge: 'Pedagogy',
      },
      {
        id: 'lesson_notes' as Screen,
        label: 'Upload Lesson Notes',
        icon: FileUp,
        badge: 'PDF Convert',
        badgeColor: 'bg-emerald-100 text-emerald-800 font-bold',
      },
      {
        id: 'lesson_gen' as Screen,
        label: 'Lesson Generator',
        icon: Sparkles,
        badge: 'AI',
      },
      {
        id: 'assessment' as Screen,
        label: 'Assessments',
        icon: Award,
        badge: 'Diagnostic',
      },
      {
        id: 'gap_analysis' as Screen,
        label: 'Learning Gap AI',
        icon: AlertCircle,
        badge: 'Gap AI',
      },
      {
        id: 'remedial' as Screen,
        label: 'Remedial Studio',
        icon: BookOpen,
        badge: remedialCompleted ? 'Fixed (100%)' : 'Action Req',
        badgeColor: remedialCompleted
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-amber-100 text-amber-800',
      },
      {
        id: 'staff_students' as Screen,
        label: 'Students & Gaps',
        icon: Users,
        badge: 'Class 3A',
      },
      {
        id: 'attendance' as Screen,
        label: 'Daily Roll-Call',
        icon: CheckCircle2,
        badge: 'Today',
      },
      {
        id: 'analytics' as Screen,
        label: 'Pedagogy Analytics',
        icon: TrendingUp,
        badge: 'Insights',
      },
    ];
  };

  const navItems = getNavItems();

  const roleTitle =
    userRole === 'admin'
      ? 'Administrator Portal'
      : userRole === 'student'
      ? 'Student Learning Portal'
      : 'Teacher Pedagogy Engine';

  return (
    <aside
      id="main-sidebar"
      className="w-64 shrink-0 bg-white border-r border-neutral-200/80 min-h-[calc(100vh-60px)] flex flex-col justify-between p-4"
    >
      <div className="space-y-6">
        {/* Module Title */}
        <div>
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
            <span>{roleTitle}</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                userRole === 'admin'
                  ? 'bg-neutral-900 text-white'
                  : userRole === 'student'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {userRole}
            </span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                currentScreen === item.id ||
                (item.id === 'lesson_gen' && currentScreen === 'lesson_generator') ||
                (item.id === 'overview' && currentScreen === 'dashboard') ||
                (item.id === 'assessment' && currentScreen === 'student_learning');
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-neutral-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Curriculum Alignment Highlight Badge */}
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            NEP 2020 & FLN Aligned
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
            Vernacular mother-tongue primary pedagogy platform.
          </p>
        </div>
      </div>

      {/* Offline Storage Status widget */}
      <div className="pt-4 border-t border-neutral-200/80 space-y-2">
        <button
          id="sidebar-offline-card-btn"
          onClick={onOpenOfflinePanel}
          className="w-full text-left p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200/60 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-700" /> Offline Edge Mode
            </span>
            <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-1.5 py-0.5 rounded font-mono">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">
            Zero-latency local fallback active for remote primary classrooms.
          </p>
        </button>

        {/* User Session & Logout Action */}
        <div className="p-2.5 rounded-xl bg-neutral-100/80 border border-neutral-200/80 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-neutral-900 truncate">
              {currentUser?.name || (userRole === 'admin' ? 'Administrator' : userRole === 'staff' ? 'Teacher' : 'Student')}
            </div>
            <div className="text-[10px] text-neutral-500 truncate">
              {userRole === 'admin'
                ? currentUser?.email || 'Admin Portal'
                : userRole === 'staff'
                ? `ID: ${currentUser?.staffId || 'TCH-102'}`
                : `Roll: ${currentUser?.rollNumber || 'STD-304'}`}
            </div>
          </div>
          {onLogout && (
            <button
              id="sidebar-logout-btn"
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-neutral-500 hover:text-rose-600 border border-neutral-200 hover:border-rose-200 transition-colors cursor-pointer shrink-0"
              title="Log out"
              aria-label="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="px-3 py-0.5 flex items-center justify-between text-[11px] text-neutral-400">
          <span>v1.0.5 Role RBAC</span>
          <span className="font-mono">FLN Ready</span>
        </div>
      </div>
    </aside>
  );
};
