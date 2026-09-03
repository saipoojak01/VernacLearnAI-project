import React from 'react';
import {
  WifiOff,
  CheckCircle2,
  HardDrive,
  Download,
  RefreshCw,
  X,
  FileText,
  Languages,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

interface OfflinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  activeLanguageName: string;
}

export const OfflinePanel: React.FC<OfflinePanelProps> = ({
  isOpen,
  onClose,
  isOfflineMode,
  onToggleOfflineMode,
  activeLanguageName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        id="offline-modal"
        className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl ${
                isOfflineMode ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isOfflineMode ? <WifiOff className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">
                Offline-First Pedagogical Engine
              </h3>
              <p className="text-xs text-neutral-500">
                Low-resource rural classroom edge deployment with local cache
              </p>
            </div>
          </div>
          <button
            id="close-offline-panel-btn"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
            aria-label="Close offline status modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* SIMULATION & TOGGLE STATUS */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
              isOfflineMode
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-neutral-50 border-neutral-200/80 text-neutral-900'
            }`}
          >
            <div className="space-y-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">
                  {isOfflineMode ? '⚠️ Offline Simulation Active' : 'Online / Cloud Connected'}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    isOfflineMode
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isOfflineMode ? 'Disconnected' : 'Online'}
                </span>
              </div>
              <p className="text-xs text-neutral-600">
                {isOfflineMode
                  ? 'All lessons, audio phonetics, and quiz evaluations are running 100% locally from IndexedDB cache.'
                  : 'Toggle to simulate teaching in a remote school with zero internet connectivity.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isOfflineMode ? (
                <button
                  id="exit-offline-mode-btn"
                  onClick={onToggleOfflineMode}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Exit Offline Mode</span>
                </button>
              ) : (
                <button
                  id="enable-offline-mode-btn"
                  onClick={onToggleOfflineMode}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Simulate Offline</span>
                </button>
              )}
            </div>
          </div>

          {/* 5-STEP EXPLANATION OF HOW OFFLINE MODE WORKS */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>How Offline-First Mode Works in Rural Schools:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-emerald-100/80 shadow-2xs space-y-1">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  1
                </div>
                <div className="font-bold text-neutral-800 text-[11px]">Local Edge Cache</div>
                <div className="text-[10px] text-neutral-500">Stored in browser IndexedDB</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100/80 shadow-2xs space-y-1">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  2
                </div>
                <div className="font-bold text-neutral-800 text-[11px]">Vernacular Audio</div>
                <div className="text-[10px] text-neutral-500">Web Speech offline synthesis</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100/80 shadow-2xs space-y-1">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  3
                </div>
                <div className="font-bold text-neutral-800 text-[11px]">Instant Quizzes</div>
                <div className="text-[10px] text-neutral-500">Zero-latency score evaluation</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100/80 shadow-2xs space-y-1">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  4
                </div>
                <div className="font-bold text-neutral-800 text-[11px]">Remedial Engine</div>
                <div className="text-[10px] text-neutral-500">Diagnostic logic runs offline</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100/80 shadow-2xs space-y-1">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  5
                </div>
                <div className="font-bold text-neutral-800 text-[11px]">Auto Sync</div>
                <div className="text-[10px] text-neutral-500">Syncs when network resumes</div>
              </div>
            </div>
          </div>

          {/* STATUS CHECKLIST OF CACHED RESOURCES */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Cached Offline Storage Breakdown:
              </h4>
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5" /> 4.8 MB / 64 MB IndexedDB
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Saved Primary Lessons</div>
                    <div className="text-[11px] text-neutral-400">18 curated Class 1–5 science & math modules</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-500">1.8 MB</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-800">
                      Vernacular Language Pack ({activeLanguageName})
                    </div>
                    <div className="text-[11px] text-neutral-400">Synthesized TTS phonetic maps & vocabulary dictionary</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-500">2.1 MB</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Worksheets & Visual Prompts</div>
                    <div className="text-[11px] text-neutral-400">Contextualized village agriculture & nature visuals</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-500">620 KB</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Assessments & Remedial Engine</div>
                    <div className="text-[11px] text-neutral-400">Deterministic gap detector with zero server latency</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-500">280 KB</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Student Progress & Feedback Buffer</div>
                    <div className="text-[11px] text-neutral-400">Queued for background cloud sync when network resumes</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-500">12 KB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between shrink-0">
          {isOfflineMode ? (
            <button
              id="footer-exit-offline-btn"
              onClick={onToggleOfflineMode}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
              <span>Exit Offline Mode</span>
            </button>
          ) : (
            <div className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All caches synced with cloud</span>
            </div>
          )}

          <button
            id="done-offline-btn"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Dismiss Panel
          </button>
        </div>
      </div>
    </div>
  );
};
