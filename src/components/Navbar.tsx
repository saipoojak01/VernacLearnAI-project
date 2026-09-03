import React, { useState, useRef, useEffect } from 'react';
import { Screen, LanguageCode, LearningContext, UserRole, DemoUser } from '../types';
import { SUPPORTED_LANGUAGES, DEMO_USERS } from '../data/demoData';
import {
  Sparkles,
  Wifi,
  WifiOff,
  Globe,
  MapPin,
  GraduationCap,
  RotateCcw,
  BookOpen,
  ChevronDown,
  Layers,
  Shield,
  Users,
  UserCheck,
  Check,
  LogOut,
  User,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  learningContext: LearningContext;
  onSelectContext: (ctx: LearningContext) => void;
  isOfflineMode: boolean;
  onOpenOfflinePanel: () => void;
  onResetDemo: () => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currentUser?: DemoUser;
  userProfiles?: Record<UserRole, DemoUser>;
  onRoleChange?: (role: UserRole) => void;
  onLanguageChange?: (lang: LanguageCode) => void;
  onToggleOfflineMode?: () => void;
  onOpenOfflineModal?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  learningContext,
  onSelectContext,
  isOfflineMode,
  onOpenOfflinePanel,
  onResetDemo,
  userRole,
  onSelectRole,
  currentUser: propCurrentUser,
  userProfiles,
  onRoleChange,
  onLanguageChange,
  onToggleOfflineMode,
  onOpenOfflineModal,
  onLogout,
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    };
    if (isRoleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRoleDropdownOpen]);

  const activeUser =
    propCurrentUser ||
    (userProfiles && userProfiles[userRole]) ||
    DEMO_USERS[userRole] ||
    DEMO_USERS.staff;

  const adminProfile = userProfiles?.admin || DEMO_USERS.admin;
  const staffProfile = userProfiles?.staff || DEMO_USERS.staff;
  const studentProfile = userProfiles?.student || DEMO_USERS.student;

  const handleRoleSelect = (role: UserRole) => {
    if (onSelectRole) onSelectRole(role);
    if (onRoleChange) onRoleChange(role);
    setIsRoleDropdownOpen(false);
    if (role === 'admin') onNavigate('admin_overview');
    else if (role === 'student') onNavigate('student_home');
    else onNavigate('translate');
  };

  const handleLanguageSelect = (lang: LanguageCode) => {
    if (onSelectLanguage) onSelectLanguage(lang);
    if (onLanguageChange) onLanguageChange(lang);
  };

  const handleOfflinePanelOpen = () => {
    if (onOpenOfflinePanel) onOpenOfflinePanel();
    if (onOpenOfflineModal) onOpenOfflineModal();
  };

  const handleLogout = () => {
    setIsRoleDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      onNavigate('landing');
    }
  };

  const getBrandHome = () => {
    if (userRole === 'admin') return 'admin_overview';
    if (userRole === 'student') return 'student_home';
    return 'translate';
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 lg:px-6 py-2.5 transition-all"
    >
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate(getBrandHome() as Screen)}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-emerald-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-bold font-mono text-sm tracking-tighter">V</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-900 text-sm sm:text-base tracking-tight group-hover:text-emerald-700 transition-colors">
                  VernacLearn
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  AI
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Global Controls: Mother Tongue + Local Context + Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mother Tongue Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-100/90 hover:bg-neutral-100 rounded-lg border border-neutral-200/80 text-xs font-medium text-neutral-800 transition-colors">
              <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <select
                id="navbar-language-select"
                value={selectedLanguage}
                onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                className="bg-transparent font-semibold text-neutral-900 border-none cursor-pointer focus:outline-hidden py-0 pr-3 text-xs"
                aria-label="Select Mother Tongue"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} {lang.isLowResource ? '⭐' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Context Selector (for Teachers & Admin) */}
          {userRole !== 'student' && (
            <div className="relative hidden lg:flex items-center">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-100/90 hover:bg-neutral-100 rounded-lg border border-neutral-200/80 text-xs font-medium text-neutral-800 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <select
                  id="navbar-context-select"
                  value={learningContext}
                  onChange={(e) => onSelectContext(e.target.value as LearningContext)}
                  className="bg-transparent font-semibold text-neutral-900 border-none cursor-pointer focus:outline-hidden py-0 pr-3 text-xs"
                  aria-label="Select Learning Context"
                >
                  <option value="rural_school">Rural School (Poshan Vatika)</option>
                  <option value="village_environment">Village Courtyard & Badi</option>
                  <option value="local_community">Local Sacred Grove</option>
                </select>
              </div>
            </div>
          )}

          {/* Offline Ready Indicator Pill */}
          <button
            id="navbar-offline-status-pill"
            onClick={onOpenOfflinePanel}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
              isOfflineMode
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Click to view offline-ready architecture"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold text-[11px]">Offline</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-[11px]">Offline Ready</span>
              </>
            )}
          </button>

          {/* Reset Demo State Button */}
          <button
            id="reset-demo-state-btn"
            onClick={onResetDemo}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
            title="Reset demo / Landing"
            aria-label="Reset demo to start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Logged in User Detail & Account Menu */}
          <div ref={userMenuRef} className="relative flex items-center">
            <button
              id="navbar-role-switcher-btn"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 pl-2.5 py-1 pr-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 transition-all cursor-pointer"
              title="Account Menu"
              aria-label="User account options"
              aria-expanded={isRoleDropdownOpen}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white ${
                  userRole === 'admin'
                    ? 'bg-neutral-900'
                    : userRole === 'student'
                    ? 'bg-amber-500'
                    : 'bg-emerald-700'
                }`}
              >
                {userRole === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                ) : userRole === 'student' ? (
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Users className="w-3.5 h-3.5 text-emerald-300" />
                )}
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-neutral-900 leading-none">
                  {activeUser.name}
                </div>
                <div className="text-[10px] text-neutral-500 font-semibold uppercase mt-0.5">
                  {userRole === 'admin' ? 'Admin' : userRole === 'staff' ? 'Staff' : 'Student'}
                </div>
              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu: Profile and Logout only */}
            {isRoleDropdownOpen && (
              <div
                id="user-account-dropdown"
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-neutral-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-1"
              >
                <div className="px-3 py-1.5 border-b border-neutral-100 mb-1">
                  <div className="text-xs font-bold text-neutral-900 truncate">{activeUser.name}</div>
                  <div className="text-[10px] text-neutral-500 font-medium capitalize mt-0.5">
                    {userRole === 'admin' ? 'Administrator' : userRole === 'staff' ? 'Staff / Teacher' : 'Student'}
                  </div>
                </div>

                <button
                  id="dropdown-profile-btn"
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span>Profile</span>
                </button>

                <button
                  id="dropdown-logout-btn"
                  onClick={handleLogout}
                  className="w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <LogOut className="w-3.5 h-3.5" />
                  </div>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Standalone Logout Button outside */}
          <button
            id="navbar-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer group"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5 text-neutral-500 group-hover:text-rose-600" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Profile Details Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-sm w-full p-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3.5 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white ${
                    userRole === 'admin'
                      ? 'bg-neutral-900'
                      : userRole === 'student'
                      ? 'bg-amber-500'
                      : 'bg-emerald-700'
                  }`}
                >
                  {userRole === 'admin' ? (
                    <Shield className="w-5 h-5 text-emerald-400" />
                  ) : userRole === 'student' ? (
                    <GraduationCap className="w-5 h-5 text-white" />
                  ) : (
                    <Users className="w-5 h-5 text-emerald-300" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{activeUser.name}</h3>
                  <div className="text-[10px] text-neutral-500 font-semibold uppercase mt-0.5">
                    {userRole === 'admin' ? 'Administrator' : userRole === 'staff' ? 'Staff / Teacher' : 'Student'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
                aria-label="Close profile"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3.5 space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-xs text-neutral-500 font-medium">Role</span>
                <span className="text-xs font-semibold text-neutral-900 capitalize">
                  {userRole === 'admin' ? 'Administrator' : userRole === 'staff' ? 'Teacher / Staff' : 'Student'}
                </span>
              </div>

              {activeUser.email && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Email</span>
                  <span className="text-xs font-semibold text-neutral-900">{activeUser.email}</span>
                </div>
              )}

              {activeUser.rollNumber && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Roll Number</span>
                  <span className="text-xs font-semibold text-neutral-900">{activeUser.rollNumber}</span>
                </div>
              )}

              {activeUser.staffId && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Staff ID</span>
                  <span className="text-xs font-semibold text-neutral-900">{activeUser.staffId}</span>
                </div>
              )}

              {activeUser.class && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Class / Grade</span>
                  <span className="text-xs font-semibold text-neutral-900">{activeUser.class}</span>
                </div>
              )}

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-xs text-neutral-500 font-medium">Institution</span>
                <span className="text-xs font-semibold text-neutral-900 text-right truncate max-w-[180px]">
                  {activeUser.school}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
