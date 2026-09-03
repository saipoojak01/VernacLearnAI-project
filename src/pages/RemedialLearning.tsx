import React, { useState, useEffect } from 'react';
import { Screen, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, DEMO_LESSONS } from '../data/demoData';
import {
  REMEDIAL_LESSONS_MAP,
  getRemedialLesson,
  RemedialLessonConfig,
} from '../data/remedialLessonsData';
import { AudioButton } from '../components/AudioButton';
import confetti from 'canvas-confetti';
import {
  Wand2,
  Sparkles,
  Sun,
  Flame,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Volume2,
  Check,
  Zap,
  Eye,
  Award,
  Droplets,
  CloudRain,
  Sprout,
  Filter,
  PieChart,
  Flower2,
  Heart,
  RefreshCw,
  Scissors,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

interface RemedialLearningProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  remedialCompleted: boolean;
  onCompleteRemedial: () => void;
  studentName?: string;
  selectedLessonId?: string;
  onSelectLessonId?: (lessonId: string) => void;
}

export const RemedialLearning: React.FC<RemedialLearningProps> = ({
  onNavigate,
  selectedLanguage,
  remedialCompleted,
  onCompleteRemedial,
  studentName = 'Birsa Soren',
  selectedLessonId = 'plants_needs',
  onSelectLessonId,
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  // Active Lesson State
  const [activeLessonId, setActiveLessonId] = useState<string>(selectedLessonId || 'plants_needs');

  // Keep in sync if parent passes a different selectedLessonId
  useEffect(() => {
    if (selectedLessonId && selectedLessonId !== activeLessonId) {
      setActiveLessonId(selectedLessonId);
    }
  }, [selectedLessonId]);

  const activeLessonConfig: RemedialLessonConfig = getRemedialLesson(activeLessonId);
  const langPack =
    activeLessonConfig.languages[selectedLanguage] || activeLessonConfig.languages.santhali;
  const practiceQ = langPack.practiceQuestion;

  // Quiz / Practice State
  const [selectedOption, setSelectedOption] = useState<string | null>(
    remedialCompleted ? 'A' : null
  );
  const [hasAnswered, setHasAnswered] = useState<boolean>(remedialCompleted);

  // GAME STATES:
  // 1. Kitchen Fire Game
  const [simEnergyCount, setSimEnergyCount] = useState<number>(remedialCompleted ? 5 : 0);
  const [isSimActive, setIsSimActive] = useState<boolean>(false);

  // 2. Thirsty Roots Game
  const [rootWaterLevel, setRootWaterLevel] = useState<number>(remedialCompleted ? 5 : 0);
  const [isRaining, setIsRaining] = useState<boolean>(false);
  const [isPumping, setIsPumping] = useState<boolean>(false);

  // 3. Living vs Non-Living Game
  const [growthStage, setGrowthStage] = useState<number>(remedialCompleted ? 4 : 0);
  const [isNourishing, setIsNourishing] = useState<boolean>(false);

  // 4. Clay Filter Game
  const [purifiedCups, setPurifiedCups] = useState<number>(remedialCompleted ? 5 : 0);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  // 5. Equal Shares Haat Game
  const [fractionMode, setFractionMode] = useState<'whole' | 'halves' | 'quarters'>('halves');
  const [distributedShares, setDistributedShares] = useState<number>(remedialCompleted ? 4 : 2);

  // 6. Butterfly Pollinator Game
  const [pollinatedFlowers, setPollinatedFlowers] = useState<number[]>(
    remedialCompleted ? [1, 2, 3] : []
  );
  const [isButterflyFlying, setIsButterflyFlying] = useState<boolean>(false);

  // Switch Lesson Handler
  const handleSwitchLesson = (newId: string) => {
    setActiveLessonId(newId);
    if (onSelectLessonId) {
      onSelectLessonId(newId);
    }
    // Reset micro-check for new lesson unless already answered
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
    if (optId === 'A') {
      setHasAnswered(true);
      onCompleteRemedial();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  };

  // --- GAME HANDLERS ---
  // Game 1: Kitchen Fire
  const handleTriggerSunlightSim = () => {
    setIsSimActive(true);
    setSimEnergyCount((prev) => Math.min(5, prev + 1));
    setTimeout(() => setIsSimActive(false), 600);
  };

  // Game 2: Thirsty Roots
  const handleTriggerRainAndRoots = () => {
    setIsRaining(true);
    setIsPumping(true);
    setRootWaterLevel((prev) => Math.min(5, prev + 1));
    setTimeout(() => {
      setIsRaining(false);
      setIsPumping(false);
    }, 700);
  };

  // Game 3: Living Growth
  const handleTriggerNourish = () => {
    setIsNourishing(true);
    setGrowthStage((prev) => Math.min(4, prev + 1));
    setTimeout(() => setIsNourishing(false), 700);
  };

  // Game 4: Clay Filter
  const handleTriggerFilter = () => {
    setIsFiltering(true);
    setPurifiedCups((prev) => Math.min(5, prev + 1));
    setTimeout(() => setIsFiltering(false), 700);
  };

  // Game 5: Equal Shares
  const handleSliceFruit = (mode: 'whole' | 'halves' | 'quarters') => {
    setFractionMode(mode);
    setDistributedShares(mode === 'whole' ? 1 : mode === 'halves' ? 2 : 4);
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.65 } });
    } catch (e) {}
  };

  // Game 6: Butterfly Pollinator
  const handlePollinateFlower = (flowerId: number) => {
    if (!pollinatedFlowers.includes(flowerId)) {
      setIsButterflyFlying(true);
      setPollinatedFlowers((prev) => [...prev, flowerId]);
      setTimeout(() => {
        setIsButterflyFlying(false);
        if (pollinatedFlowers.length + 1 >= 3) {
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }
      }, 500);
    }
  };

  const handleReassessClick = () => {
    onCompleteRemedial();
    onNavigate('analytics');
  };

  // Get Story Icon Component
  const renderStoryIcon = () => {
    switch (activeLessonConfig.iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-700 animate-pulse" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-sky-700 animate-bounce" />;
      case 'Sparkles':
        return <Sprout className="w-5 h-5 text-emerald-700" />;
      case 'Filter':
        return <Filter className="w-5 h-5 text-cyan-700" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-orange-700" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-rose-700 animate-pulse" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  const allLessons = Object.values(REMEDIAL_LESSONS_MAP);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header with Adaptive Pedagogic Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Adaptive Pedagogical Cycle</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Step 6: Local Metaphor & Game</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
            <Wand2 className="w-6 h-6 text-emerald-600" />
            <span>{langPack.storyTitle}</span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1 font-medium">
            Story, explanation, and interactive mini-game adapt automatically to the selected lesson in{' '}
            <span className="font-bold text-neutral-800">{currentLang.name}</span> ({currentLang.nativeName}).
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              hasAnswered
                ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-md'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Progress: {hasAnswered ? '100% (Mastered)' : 'In Practice'}</span>
          </div>
        </div>
      </div>

      {/* LESSON SELECTOR TABS: Allows student or teacher to select which lesson story and game to play */}
      <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Select Lesson to Change Story, Explanation & Mini-Game:
            </span>
          </div>
          <span className="text-[11px] font-semibold text-neutral-500">
            {allLessons.length} Curriculum Stories Available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {allLessons.map((l) => {
            const isSelected = l.id === activeLessonId;
            return (
              <button
                key={l.id}
                id={`lesson-selector-${l.id}`}
                onClick={() => handleSwitchLesson(l.id)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 active:scale-98 ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm ring-2 ring-emerald-500/40'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200/90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {l.iconName === 'Flame' && '🔥'}
                    {l.iconName === 'Droplets' && '💧'}
                    {l.iconName === 'Sparkles' && '🌱'}
                    {l.iconName === 'Filter' && '🚰'}
                    {l.iconName === 'PieChart' && '🍉'}
                    {l.iconName === 'Flower2' && '🦋'}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-bold leading-tight line-clamp-1">
                    {l.badge}
                  </div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {l.titleEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Remedial Step 1: Simpler Explanation in Mother Tongue */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Simpler Explanation in {currentLang.name} ({currentLang.nativeName})
            </h3>
          </div>

          <AudioButton
            textToSpeak={langPack.simplerExplanationMt}
            langCode={currentLang.speechCode}
            size="sm"
            label="Audio Explanation"
            variant="subtle"
          />
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
          <p className="text-lg font-bold text-neutral-900 leading-snug">
            "{langPack.simplerExplanationMt}"
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-200">
            {langPack.simplerExplanationEn}
          </p>
        </div>
      </div>

      {/* Remedial Step 2: Local Metaphor (Changes according to the lesson selected!) */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Familiar Local Metaphor ({langPack.metaphorTitle})
            </h3>
          </div>
          <AudioButton
            textToSpeak={langPack.metaphorDescriptionMt}
            langCode={currentLang.speechCode}
            size="sm"
            label={`Listen ${activeLessonConfig.badge}`}
            variant="subtle"
          />
        </div>

        <div className={`p-4 rounded-xl ${activeLessonConfig.themeColor.bg} border ${activeLessonConfig.themeColor.border} flex items-start gap-4`}>
          <div className="p-3 bg-white rounded-xl shadow-xs shrink-0">
            {renderStoryIcon()}
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="text-sm font-bold text-neutral-900 flex items-center justify-between">
              <span>{langPack.metaphorTitle}</span>
              <span className="text-[11px] font-semibold text-neutral-500 font-mono">
                {activeLessonConfig.badge}
              </span>
            </div>
            <p className="text-sm text-neutral-900 font-semibold leading-relaxed">
              {langPack.metaphorDescriptionMt}
            </p>
          </div>
        </div>
      </div>

      {/* Remedial Step 3: Interactive Simulation Mini-Game (Changes according to the lesson selected!) */}
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Visual Mini-Game: {activeLessonConfig.badge}
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-800">
            {langPack.gamePromptMt}
          </span>
        </div>

        {/* --- GAME 1: KITCHEN FIRE GAME (Plants & Leaves) --- */}
        {activeLessonConfig.gameType === 'kitchen_fire' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-amber-50 via-emerald-50 to-sky-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Interactive Sun Button */}
            <button
              id="sunlight-pulse-btn"
              onClick={handleTriggerSunlightSim}
              className={`p-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold shadow-md cursor-pointer transition-transform active:scale-95 flex flex-col items-center gap-1.5 ${
                isSimActive ? 'scale-110 ring-4 ring-amber-300' : ''
              }`}
            >
              <Sun className={`w-8 h-8 ${isSimActive ? 'animate-spin' : ''}`} />
              <span className="text-xs">{langPack.gameSourceTerm}</span>
            </button>

            {/* Energy Beams Flow */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs font-bold text-neutral-600 mb-1">
                Sunlight Photons Captured: {simEnergyCount}/5
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <span
                    key={idx}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                      idx <= simEnergyCount
                        ? 'bg-emerald-500 text-white scale-110 animate-pulse'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    ⚡
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1.5 text-center">
                {simEnergyCount >= 3
                  ? '🍃 Leaf Kitchen is active! Food synthesized successfully in the hearth.'
                  : 'Tap the warm sun to send light energy to the leaf hearth.'}
              </div>
            </div>

            {/* Green Leaf Target */}
            <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold flex flex-col items-center gap-1 shadow-md">
              <span className="text-3xl">🌿</span>
              <span className="text-xs">{langPack.gameTargetTerm}</span>
            </div>
          </div>
        )}

        {/* --- GAME 2: THIRSTY ROOTS GAME (Roots Drinking Water Straw) --- */}
        {activeLessonConfig.gameType === 'thirsty_roots' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-sky-50 via-blue-50 to-emerald-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Interactive Raincloud & Earthen Well */}
            <button
              id="raincloud-btn"
              onClick={handleTriggerRainAndRoots}
              className={`p-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-md cursor-pointer transition-transform active:scale-95 flex flex-col items-center gap-1.5 ${
                isRaining ? 'scale-110 ring-4 ring-sky-300' : ''
              }`}
            >
              <CloudRain className={`w-8 h-8 ${isRaining ? 'animate-bounce' : ''}`} />
              <span className="text-xs">{langPack.gameSourceTerm}</span>
            </button>

            {/* Roots Straw Drinking Pump */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs font-bold text-neutral-700 mb-1">
                Root Moisture Sucked Upward: {rootWaterLevel}/5
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <span
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      idx <= rootWaterLevel
                        ? 'bg-sky-500 text-white scale-110 shadow-xs'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    💧
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1.5 text-center">
                {rootWaterLevel >= 3
                  ? '✨ Underground root straws drank moisture! Water pumped into tall stems.'
                  : 'Tap raincloud to shower damp soil and let bamboo roots pump water.'}
              </div>
            </div>

            {/* Target Blooming Sunflower */}
            <div className="p-4 rounded-2xl bg-emerald-700 text-white font-bold flex flex-col items-center gap-1 shadow-md min-w-24 text-center">
              <span className={`text-3xl transition-transform ${rootWaterLevel >= 3 ? 'scale-125 animate-pulse' : 'opacity-70'}`}>
                {rootWaterLevel >= 3 ? '🌻' : '🥀'}
              </span>
              <span className="text-xs">
                {rootWaterLevel >= 3 ? langPack.gameTargetTerm : 'Wilting Bud'}
              </span>
            </div>
          </div>
        )}

        {/* --- GAME 3: LIVING VS NON-LIVING GAME (Sprout vs River Pebble) --- */}
        {activeLessonConfig.gameType === 'living_growth' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-50 via-stone-50 to-amber-50 border border-emerald-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* Subject 1: Living Sprouting Seed */}
              <div className="p-4 bg-white rounded-2xl border-2 border-emerald-400 shadow-sm flex flex-col items-center gap-2 w-full sm:w-48 text-center">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                  Living (ᱥᱟᱦᱮᱫ ᱦᱟᱛᱟᱣᱟ)
                </span>
                <span className="text-4xl transition-all">
                  {growthStage === 0 && '🌰'}
                  {growthStage === 1 && '🌱'}
                  {growthStage === 2 && '🌿'}
                  {growthStage >= 3 && '🪴'}
                </span>
                <span className="text-xs font-bold text-emerald-950">
                  {langPack.gameTargetTerm}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Growth: Level {growthStage}/4 (Breathes & Drinks)
                </span>
              </div>

              {/* Action Button: Give Water & Breath */}
              <button
                id="nourish-living-btn"
                onClick={handleTriggerNourish}
                className={`px-5 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md cursor-pointer transition-transform active:scale-95 flex items-center gap-2 ${
                  isNourishing ? 'ring-4 ring-emerald-300 scale-105' : ''
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>Nourish with Water & Air (💧💨)</span>
              </button>

              {/* Subject 2: Non-Living River Stone */}
              <div className="p-4 bg-white rounded-2xl border border-stone-300 shadow-xs flex flex-col items-center gap-2 w-full sm:w-48 text-center opacity-85">
                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-extrabold uppercase">
                  Non-Living (ᱵᱟᱝ ᱦᱟᱨᱟᱜ-ᱟ)
                </span>
                <span className="text-4xl">🪨</span>
                <span className="text-xs font-bold text-stone-800">
                  River Pebble (ᱜᱟᱰᱟ ᱫᱷᱤᱨᱤ)
                </span>
                <span className="text-[10px] text-stone-500">
                  Never grows or breathes (Solid stone)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-center text-neutral-600 font-medium">
              Tap nourish: Watch the living seed drink water and sprout green leaves, while the non-living stone remains still!
            </p>
          </div>
        )}

        {/* --- GAME 4: CLAY FILTER GAME (Village Rainwater Purifier) --- */}
        {activeLessonConfig.gameType === 'clay_filter' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-50 via-sky-50 to-teal-50 border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Action: Pour Rainwater */}
            <button
              id="pour-water-btn"
              onClick={handleTriggerFilter}
              className={`p-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-md cursor-pointer transition-transform active:scale-95 flex flex-col items-center gap-1.5 ${
                isFiltering ? 'scale-110 ring-4 ring-cyan-300' : ''
              }`}
            >
              <CloudRain className="w-8 h-8" />
              <span className="text-xs">Pour Rainwater (🌧️)</span>
            </button>

            {/* Three Pot Filter Graphic */}
            <div className="flex-1 flex flex-col items-center space-y-1.5">
              <div className="text-xs font-bold text-neutral-700">
                Purified Clean Water Glasses: {purifiedCups}/5
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-[10px] font-bold text-amber-900">
                  Top: Pot 1 (Cloudy)
                </span>
                <span className="text-xs text-neutral-400">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-stone-200 border border-stone-300 text-[10px] font-bold text-stone-800">
                  Mid: Sand & Charcoal
                </span>
                <span className="text-xs text-neutral-400">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-100 border border-cyan-300 text-[10px] font-bold text-cyan-900">
                  Bottom: Pure Cup
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <span
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      idx <= purifiedCups
                        ? 'bg-cyan-500 text-white scale-110 shadow-xs'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    🥛
                  </span>
                ))}
              </div>
            </div>

            {/* Target Glass */}
            <div className="p-4 rounded-2xl bg-teal-700 text-white font-bold flex flex-col items-center gap-1 shadow-md min-w-24 text-center">
              <span className="text-3xl">✨🥛</span>
              <span className="text-xs">{langPack.gameTargetTerm}</span>
            </div>
          </div>
        )}

        {/* --- GAME 5: EQUAL SHARES HAAT GAME (Papaya Slicer) --- */}
        {activeLessonConfig.gameType === 'equal_shares' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🍈</span>
                <div>
                  <h4 className="text-sm font-bold text-orange-950">
                    Golden Haat Papaya Slicer
                  </h4>
                  <p className="text-xs text-orange-800">
                    Current division: {fractionMode === 'whole' ? '1 Whole' : fractionMode === 'halves' ? '2 Equal Halves (1/2 + 1/2)' : '4 Equal Quarters (1/4 each)'}
                  </p>
                </div>
              </div>

              {/* Slicing Controls */}
              <div className="flex items-center gap-2">
                <button
                  id="slice-halves-btn"
                  onClick={() => handleSliceFruit('halves')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    fractionMode === 'halves'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white text-orange-900 border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 inline mr-1" />
                  Cut in Half (1/2)
                </button>
                <button
                  id="slice-quarters-btn"
                  onClick={() => handleSliceFruit('quarters')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    fractionMode === 'quarters'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white text-orange-900 border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 inline mr-1" />
                  Cut in 4 (1/4)
                </button>
              </div>
            </div>

            {/* Visual Slices Distributed to Village Friends */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {Array.from({ length: distributedShares }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-orange-200 shadow-2xs flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-2xl">🍉</span>
                  <span className="text-xs font-bold text-orange-950">
                    Share {idx + 1}: {fractionMode === 'halves' ? '1/2' : '1/4'}
                  </span>
                  <span className="text-[10px] text-orange-700">
                    {idx === 0 && '🦜 Little Sister'}
                    {idx === 1 && '🐿️ Elder Sister'}
                    {idx === 2 && '🐰 Cousin'}
                    {idx === 3 && '🐒 Neighbor'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- GAME 6: BUTTERFLY POLLINATOR GAME --- */}
        {activeLessonConfig.gameType === 'butterfly_pollinator' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border border-rose-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`text-4xl transition-transform ${isButterflyFlying ? 'scale-125 rotate-12' : ''}`}>
                  🦋
                </span>
                <div>
                  <h4 className="text-sm font-bold text-rose-950">
                    Golden Butterfly Pollen Flight
                  </h4>
                  <p className="text-xs text-rose-800">
                    Blossoms Pollinated: {pollinatedFlowers.length}/3 Flowers
                  </p>
                </div>
              </div>

              {pollinatedFlowers.length >= 3 && (
                <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-1.5 animate-in zoom-in-90 duration-200">
                  <span>🎃 Big Pumpkin Swelled on the Vine!</span>
                </div>
              )}
            </div>

            {/* 3 Garden Flowers */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 1, name: 'Gourd Blossom', emoji: '🌸' },
                { id: 2, name: 'Pumpkin Blossom', emoji: '🌼' },
                { id: 3, name: 'Cucumber Flower', emoji: '🌺' },
              ].map((flower) => {
                const isPollinated = pollinatedFlowers.includes(flower.id);
                return (
                  <button
                    key={flower.id}
                    id={`flower-pollinate-${flower.id}`}
                    onClick={() => handlePollinateFlower(flower.id)}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                      isPollinated
                        ? 'bg-amber-100/80 border-amber-400 text-amber-950 shadow-xs'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="text-3xl">{isPollinated ? '✨' + flower.emoji : flower.emoji}</span>
                    <span className="text-xs font-bold">{flower.name}</span>
                    <span className={`text-[10px] font-semibold ${isPollinated ? 'text-amber-800' : 'text-neutral-400'}`}>
                      {isPollinated ? '✓ Pollinated!' : 'Tap to Land'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Remedial Step 4 & 5: Practice Question & Re-Assessment */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Step 5: Remedial Micro-Check ({currentLang.nativeName})
            </h3>
          </div>
          <AudioButton
            textToSpeak={practiceQ.questionTextMt}
            langCode={currentLang.speechCode}
            size="sm"
            label="Listen Question"
            variant="subtle"
          />
        </div>

        <div className="space-y-3">
          <div className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
            {practiceQ.questionTextMt}
          </div>
          <p className="text-sm text-neutral-600 font-medium">
            {practiceQ.questionTextEn}
          </p>
        </div>

        {/* Clickable Practice Options */}
        <div className="grid grid-cols-1 gap-3">
          {practiceQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.isCorrect;

            return (
              <button
                key={opt.id}
                id={`remedial-opt-${opt.id}`}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected && isCorrect
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                    : isSelected
                    ? 'border-rose-400 bg-rose-50 text-rose-950 font-medium'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-neutral-300 text-neutral-700'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <div>
                    <div className="text-sm font-bold">{opt.textMt}</div>
                    <div className="text-xs text-neutral-500">{opt.textEn}</div>
                  </div>
                </div>

                {isSelected && isCorrect && (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Success / Improvement Result Card */}
        {hasAnswered && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950">
                    Learning Gap Resolved! (Concept Mastered 100%)
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {studentName} has successfully mastered the concept of{' '}
                    <span className="font-bold">{activeLessonConfig.titleEn}</span> in {currentLang.name}.
                  </p>
                </div>
              </div>

              <button
                id="reassess-update-btn"
                onClick={handleReassessClick}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all shrink-0"
              >
                <span>Re-assess & Update Analytics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-emerald-900/90 leading-relaxed pt-2 border-t border-emerald-200">
              {practiceQ.explanationMt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
