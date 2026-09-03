import React, { useState, useEffect } from 'react';
import { Screen, LanguageCode, UserRole, UserProfileData, DemoUser } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe2,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Database,
  Layers,
  CheckCircle2,
  Lock,
  GraduationCap,
  Users,
  Shield,
  User,
  Hash,
  Mail,
  ChevronDown,
  KeyRound,
  Check,
} from 'lucide-react';

interface LandingProps {
  onEnterDemo: (role?: UserRole, profileData?: UserProfileData) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenOfflinePanel?: () => void;
  currentRole?: UserRole;
  onSelectRole?: (role: UserRole, profileData?: UserProfileData) => void;
  currentUser?: DemoUser;
  userProfiles?: Record<UserRole, DemoUser>;
}

export const Landing: React.FC<LandingProps> = ({
  onEnterDemo,
  selectedLanguage,
  onSelectLanguage,
  onOpenOfflinePanel,
  currentRole,
  onSelectRole,
  currentUser,
  userProfiles,
}) => {
  const [selectedRoleState, setSelectedRoleState] = useState<UserRole>(currentRole || 'student');

  // Form input states
  // Student fields
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  
  // Staff fields
  const [staffName, setStaffName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffEmail, setStaffEmail] = useState('');

  // Admin fields
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // Password
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronize when currentRole or userProfiles changes
  useEffect(() => {
    if (currentRole) {
      setSelectedRoleState(currentRole);
    }
  }, [currentRole]);

  const coreFeatures = [
    {
      title: 'Adaptive Learning Cycle',
      description: 'Full closed loop: Translate → Adapt → Teach → Assess → Detect Gap → Remediate → Re-Assess.',
      icon: Sparkles,
    },
    {
      title: 'AI Learning-Gap Detection',
      description: 'Pinpoints the exact conceptual bottleneck (e.g. sunlight food production) instead of raw scores.',
      icon: HelpCircle,
    },
    {
      title: 'Personalized Remedial Learning',
      description: 'Generates simplified analogies, interactive visual activities, and tailored practice in the mother tongue.',
      icon: BookOpen,
    },
    {
      title: 'Context-Aware Translation',
      description: 'Translates educational pedagogy rather than literal word-to-word, preserving conceptual clarity.',
      icon: Globe2,
    },
    {
      title: 'Low-Resource Knowledge Base',
      description: 'Structured linguistic layer for tribal & regional languages (Santhali, Gondi, etc.) with teacher corrections.',
      icon: Database,
    },
    {
      title: 'Local & Cultural Context Adaptation',
      description: 'Replaces generic examples with local village crops, Poshan Vatika gardens, and community references.',
      icon: Layers,
    },
  ];

  const handleRoleChange = (role: UserRole) => {
    setSelectedRoleState(role);
    setErrorMsg(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    let profile: UserProfileData;

    // Basic client validation and profile packaging
    if (selectedRoleState === 'student') {
      const trimmedName = studentName.trim();
      const trimmedRoll = rollNumber.trim();
      if (!trimmedName || !trimmedRoll) {
        setErrorMsg('Please provide your name and roll number.');
        return;
      }
      profile = {
        role: 'student',
        name: trimmedName,
        rollNumber: trimmedRoll,
        class: 'Class 3A',
      };
    } else if (selectedRoleState === 'staff') {
      const trimmedName = staffName.trim();
      const trimmedId = staffId.trim();
      const trimmedEmail = staffEmail.trim();
      if (!trimmedName || !trimmedId || !trimmedEmail) {
        setErrorMsg('Please fill in all teacher credentials.');
        return;
      }
      profile = {
        role: 'staff',
        name: trimmedName,
        staffId: trimmedId,
        email: trimmedEmail,
        class: 'Class 3A',
      };
    } else {
      const trimmedName = adminName.trim();
      const trimmedEmail = adminEmail.trim();
      if (!trimmedName || !trimmedEmail) {
        setErrorMsg('Please enter your administrator name and email.');
        return;
      }
      profile = {
        role: 'admin',
        name: trimmedName,
        email: trimmedEmail,
      };
    }

    if (onSelectRole) onSelectRole(selectedRoleState, profile);
    onEnterDemo(selectedRoleState, profile);
  };

  const getSubmitButtonLabel = () => {
    switch (selectedRoleState) {
      case 'admin':
        return 'Secure Admin Login →';
      case 'staff':
        return 'Secure Staff Login →';
      case 'student':
      default:
        return 'Secure Login →';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-emerald-600" />;
      case 'staff':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'student':
      default:
        return <GraduationCap className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between">
      {/* Top Banner */}
      <div className="border-b border-neutral-200/80 bg-white px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
              V
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900 text-lg tracking-tight">VernacLearn AI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Primary Pedagogy
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="landing-offline-pill"
              onClick={onOpenOfflinePanel}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Offline-Ready (Edge Cached)</span>
            </button>
            <div className="hidden sm:flex items-center gap-1 text-xs text-neutral-500 font-mono">
              <span>NEP 2020 FLN Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero & Login Section */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Vision & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              National Education Policy (NEP 2020) • Foundational Literacy & Numeracy
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
                Learn in the language you understand.
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 font-medium leading-relaxed">
                AI-powered mother-tongue learning for primary education. Role-based dashboards for School Administrators, Classroom Teachers, and Primary Students.
              </p>
            </div>

            {/* Language Selector in Hero */}
            <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Target Low-Resource Mother Tongue:
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  6 Regional & Tribal Languages Loaded
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      id={`lang-choice-${lang.code}`}
                      onClick={() => onSelectLanguage(lang.code)}
                      className={`p-2.5 rounded-lg text-left border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <div className="font-semibold flex items-center justify-between">
                        <span>{lang.name.split(' ')[0]}</span>
                        {lang.isLowResource && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-mono">
                            Tribal
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                        {lang.nativeName} ({lang.region.split(',')[0]})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Role-Based Authentication Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">Portal Login</h2>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    VernacLearn Auth
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  Enter your credentials and click login to access your portal.
                </p>
              </div>

              {/* Form Container */}
              <form onSubmit={handleFormSubmit} className="space-y-4" id="role-auth-form">
                {/* 1. ROLE SELECTOR ABOVE CREDENTIAL FIELDS */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="login-role-select"
                    className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center justify-between"
                  >
                    <span>Role</span>
                    <span className="text-[10px] font-semibold text-emerald-700 capitalize flex items-center gap-1">
                      {getRoleIcon(selectedRoleState)}
                      {selectedRoleState === 'staff' ? 'Staff / Teacher' : selectedRoleState}
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="login-role-select"
                      value={selectedRoleState}
                      onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                      className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer appearance-none pr-10 transition-all shadow-2xs"
                    >
                      <option value="student">Student</option>
                      <option value="staff">Staff / Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* DYNAMIC CREDENTIAL FIELDS BASED ON SELECTED ROLE */}
                <div className="space-y-3.5 pt-1 transition-all duration-200">
                  {/* === STUDENT FIELDS === */}
                  {selectedRoleState === 'student' && (
                    <>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="student-name-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Student Name
                        </label>
                        <div className="relative">
                          <input
                            id="student-name-input"
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="student-roll-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Roll Number
                        </label>
                        <div className="relative">
                          <input
                            id="student-roll-input"
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="Enter your roll number"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono transition-all"
                          />
                          <Hash className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="student-password-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="student-password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* === STAFF / TEACHER FIELDS === */}
                  {selectedRoleState === 'staff' && (
                    <>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="staff-name-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Staff Name
                        </label>
                        <div className="relative">
                          <input
                            id="staff-name-input"
                            type="text"
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="staff-id-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Staff ID
                        </label>
                        <div className="relative">
                          <input
                            id="staff-id-input"
                            type="text"
                            value={staffId}
                            onChange={(e) => setStaffId(e.target.value)}
                            placeholder="Enter your Staff ID"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono transition-all"
                          />
                          <Hash className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="staff-email-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <input
                            id="staff-email-input"
                            type="email"
                            value={staffEmail}
                            onChange={(e) => setStaffEmail(e.target.value)}
                            placeholder="Enter your institutional email"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="staff-password-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="staff-password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* === ADMIN FIELDS === */}
                  {selectedRoleState === 'admin' && (
                    <>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="admin-name-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Administrator Name
                        </label>
                        <div className="relative">
                          <input
                            id="admin-name-input"
                            type="text"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="admin-email-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Admin Email
                        </label>
                        <div className="relative">
                          <input
                            id="admin-email-input"
                            type="email"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            placeholder="Enter admin email"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="admin-password-input"
                          className="text-xs font-semibold text-neutral-700 block"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="admin-password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                          />
                          <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Primary Secure Submit Button */}
                <div className="pt-2">
                  <button
                    id="secure-login-submit-btn"
                    type="submit"
                    className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>{getSubmitButtonLabel()}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 6 Core Innovative Features Grid */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              6 Core Pillars of VernacLearn AI
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Built specifically to address the root challenge of vernacular primary education in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  id={`feature-card-${idx}`}
                  className="p-5 bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-all shadow-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 mb-3.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{feat.title}</h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-4 px-4 text-center text-xs text-neutral-500">
        <p>
          VernacLearn AI • AI-Powered Vernacular Pedagogy & Mother Tongue-Based Primary Education Platform
        </p>
      </footer>
    </div>
  );
};
