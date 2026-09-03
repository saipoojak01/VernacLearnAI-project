import React, { useState, useEffect } from 'react';
import { Screen, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoData';
import { speechService } from '../utils/speech';
import {
  fetchTranslation,
  fetchPedagogicAdaptation,
  generateMotherTongueTranslation,
  generateMotherTongueToEnglishTranslation,
  generatePedagogicAdaptation,
} from '../utils/translation';
import {
  Globe2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Sliders,
  CheckCircle2,
  FileText,
  Compass,
  ArrowDownRight,
  BookOpen,
  Layers,
  FileUp,
  ArrowLeftRight,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';
import { LessonNotesConverter } from '../components/LessonNotesConverter';
import { ConvertedLessonNote } from '../types';

interface StaffTranslatorProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage?: (lang: LanguageCode) => void;
  onSetLessonPrompt?: (prompt: string) => void;
  learningContext?: any;
  initialTab?: ActiveTab;
  isStudentMode?: boolean;
  onSaveConvertedNote?: (note: ConvertedLessonNote) => void;
  uploadedNotes?: ConvertedLessonNote[];
}

type ActiveTab = 'translator' | 'adapt' | 'upload_notes';

// Sample prompts for students in their mother tongue
const STUDENT_SAMPLE_PROMPTS: Record<LanguageCode, Array<{ label: string; text: string; englishMeaning: string }>> = {
  santhali: [
    {
      label: 'ᱫᱟᱨᱮ ᱟᱨ ᱥᱤᱛᱩᱝ (Plants & Sun)',
      text: 'ᱫᱟᱨᱮ ᱠᱚ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱥᱤᱛᱩᱝ, ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ ᱞᱟᱹᱠᱛᱤᱭᱟᱜ-ᱟ᱾ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
      englishMeaning: 'Plants need sunlight, water and fresh air to make food.',
    },
    {
      label: 'ᱫᱟᱨᱮ ᱨᱮᱦᱮᱫ (Plant Roots)',
      text: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱧᱩᱭᱟ ᱟᱨ ᱫᱟᱨᱮ ᱛᱤᱸᱜᱩ ᱫᱚᱦᱚᱭᱟ᱾',
      englishMeaning: 'Plant roots drink water and minerals from the soil.',
    },
    {
      label: 'ᱪᱮᱬᱮ ᱟᱨ ᱛᱩᱠᱟᱹ (Birds & Nests)',
      text: 'ᱪᱮᱬᱮ ᱠᱚ ᱫᱚ ᱫᱟᱨᱮ ᱨᱮ ᱛᱩᱠᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣᱟ ᱟᱨ ᱵᱤᱞᱤ ᱠᱚ ᱮᱢᱟ᱾',
      englishMeaning: 'Birds build nests in trees and lay eggs.',
    },
    {
      label: 'ᱜᱟᱹᱭ ᱟᱨ ᱛᱚᱣᱟ (Cows & Milk)',
      text: 'ᱜᱟᱹᱭ ᱫᱚ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱜᱷᱟᱸᱥ ᱡᱚᱢ ᱠᱟᱛᱮ ᱥᱤᱵᱤᱞ ᱛᱚᱣᱟ ᱮᱢᱚᱜ-ᱟ᱾',
      englishMeaning: 'Cows eat green grass and give wholesome milk.',
    },
    {
      label: 'ᱟᱥᱲᱟ ᱟᱨ ᱯᱚᱛᱚᱵ (School & Books)',
      text: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱥᱲᱟ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱯᱚᱛᱚᱵ ᱯᱟᱲᱦᱟᱣ ᱟᱨ ᱚᱞ ᱠᱚ ᱥᱮᱬᱟᱭᱟ᱾',
      englishMeaning: 'Children go to school to read books and learn.',
    },
  ],
  gondi: [
    {
      label: 'मरांग अनि पोद्दु (Plants & Sun)',
      text: 'मरांग वाढ़ना काजे पोद्दु, येर अनि हवा जरत आंद। आक मरांग ता रांदना आंद।',
      englishMeaning: 'Plants need sun, water and air to make food.',
    },
    {
      label: 'मरांग ता मुडु (Plant Roots)',
      text: 'मरांग ता मुडु भूईं ते येर ऊंडी की डंग तुन ईंतूर।',
      englishMeaning: 'Roots absorb water from underground.',
    },
    {
      label: 'पिट्टे अनि गुड्डा (Birds & Nests)',
      text: 'पिट्टे मरांग ते गुड्डा कींतूर अनि बिंज ईंतूर।',
      englishMeaning: 'Birds build nests in trees and lay eggs.',
    },
    {
      label: 'गाई अनि पाल (Cows & Milk)',
      text: 'गाई हड़िया गासी तींजी की मीठा पाल ईंतूर।',
      englishMeaning: 'Cows eat grass and give sweet milk.',
    },
  ],
  bhojpuri: [
    {
      label: 'पेड़ अउरी घाम (Plants & Sun)',
      text: 'पेड़ के बढ़े खातिर घाम, पानी अउरी हवा जरूरी बा। हरियर पतई पेड़ के रसोई हवे।',
      englishMeaning: 'Plants need sunlight, water and air to make food.',
    },
    {
      label: 'पेड़ के जड़ (Plant Roots)',
      text: 'पेड़ के जड़ माटी से पानी सोखेला अउरी पेड़ के खड़ा राखेला।',
      englishMeaning: 'Plant roots absorb water from the soil.',
    },
    {
      label: 'चिरई अउरी खोता (Birds & Nests)',
      text: 'चिरई पेड़ पर खोता बनावेली अउरी अंडा देवेली।',
      englishMeaning: 'Birds build nests on trees and lay eggs.',
    },
    {
      label: 'गैया अउरी दूध (Cows & Milk)',
      text: 'गैया हरियर घास चर के मीठ दूध देवेली।',
      englishMeaning: 'Cows graze grass and give milk.',
    },
  ],
  maithili: [
    {
      label: 'गाछ आ रौद (Plants & Sun)',
      text: 'गाछ-बिरिछ केँ बढ़य लेल रौद, पानि आ शुद्ध बतासक आवश्यकता होइत अछि। हरियर पात गाछक भानस घर थीक।',
      englishMeaning: 'Plants need sun, water and air to make food.',
    },
    {
      label: 'गाछक जड़ि (Plant Roots)',
      text: 'गाछक जड़ि माटि सं पानि आ खनिज लवण सोखैत अछि।',
      englishMeaning: 'Roots absorb water and nutrients from the soil.',
    },
    {
      label: 'चिरै आ खोता (Birds & Nests)',
      text: 'चिरै गाछ पर खोता बनबैत अछि आ अण्डा दैत अछि।',
      englishMeaning: 'Birds build nests on trees and lay eggs.',
    },
    {
      label: 'गाय आ दूध (Cows & Milk)',
      text: 'गाय हरियर घास खा कऽ मीठ दूध दैत अछि।',
      englishMeaning: 'Cows eat grass and give milk.',
    },
  ],
  odia: [
    {
      label: 'ଗଛ ଏବଂ ଖରା (Plants & Sun)',
      text: 'ଗଛ ବଢ଼ିବା ପାଇଁ ସୂର୍ଯ୍ୟାଲୋକ (ଖରା), ଜଳ ଏବଂ ନିର୍ମଳ ବାୟୁ ଅତ୍ୟନ୍ତ ଆବଶ୍ୟକ। ସବୁଜ ପତ୍ର ହେଉଛି ଗଛର ରୋଷେଇଶାଳା।',
      englishMeaning: 'Plants need sunlight, water and air to make food.',
    },
    {
      label: 'ଗଛର ଚେର (Plant Roots)',
      text: 'ଗଛର ଚେର ମାଟି ଭିତରୁ ଜଳ ଶୋଷଣ କରି ଗଛକୁ ସତେଜ ରଖେ।',
      englishMeaning: 'Roots absorb water from the soil.',
    },
    {
      label: 'ଚଢ଼େଇ ଏବଂ ବସା (Birds & Nests)',
      text: 'ଚଢ଼େଇମାନେ ଗଛ ଡାଳରେ ବସା ବାନ୍ଧନ୍ତି ଏବଂ ଅଣ୍ଡା ଦିଅନ୍ତି।',
      englishMeaning: 'Birds build nests in branches.',
    },
    {
      label: 'ଗାଈ ଏବଂ କ୍ଷୀର (Cows & Milk)',
      text: 'ଗାଈ ସବୁଜ ଘାସ ଖାଇ ମିଠା କ୍ଷୀର ଦିଏ।',
      englishMeaning: 'Cows eat grass and give milk.',
    },
  ],
  marathi: [
    {
      label: 'झाडे आणि सूर्यप्रकाश (Plants & Sun)',
      text: 'झाडांच्या वाढीसाठी सूर्यप्रकाश, पाणी आणि शुद्ध हवेची गरज असते. हिरवे पान हे झाडाचे स्वयंपाकघर आहे.',
      englishMeaning: 'Plants need sunlight, water and air to make food.',
    },
    {
      label: 'झाडांची मुळे (Plant Roots)',
      text: 'झाडांची मुळे मातीमधून पाणी शोषून झाडाला ताजेतवाने ठेवतात.',
      englishMeaning: 'Roots absorb water from the soil.',
    },
    {
      label: 'पक्षी आणि घरटे (Birds & Nests)',
      text: 'पक्षी झाडांच्या फांद्यांवर घरटी बांधतात आणि अंडी घालतात.',
      englishMeaning: 'Birds build nests in branches.',
    },
    {
      label: 'गाय आणि दूध (Cows & Milk)',
      text: 'गाय हिरवे गवत खाऊन गोड दूध देते.',
      englishMeaning: 'Cows eat grass and give milk.',
    },
  ],
};

// Quick vocabulary chips for students to tap and add to their text
const STUDENT_WORD_CHIPS: Record<LanguageCode, string[]> = {
  santhali: ['ᱫᱟᱨᱮ (Tree)', 'ᱫᱟᱜ (Water)', 'ᱥᱤᱛᱩᱝ (Sun)', 'ᱥᱟᱠᱟᱢ (Leaf)', 'ᱨᱮᱦᱮᱫ (Root)', 'ᱦᱚᱭ (Air)', 'ᱡᱚᱢᱟᱜ (Food)', 'ᱪᱮᱬᱮ (Bird)', 'ᱜᱟᱹᱭ (Cow)', 'ᱛᱚᱣᱟ (Milk)', 'ᱟᱥᱲᱟ (School)', 'ᱵᱟᱦᱟ (Flower)'],
  gondi: ['मरांग (Tree)', 'येर (Water)', 'पोद्दु (Sun)', 'आक (Leaf)', 'मुडु (Root)', 'हवा (Air)', 'गाटा (Food)', 'पिट्टे (Bird)', 'गाई (Cow)', 'पाल (Milk)', 'रोन (School)', 'फूल (Flower)'],
  bhojpuri: ['पेड़ (Tree)', 'पानी (Water)', 'घाम (Sun)', 'पतई (Leaf)', 'जड़ (Root)', 'हवा (Air)', 'खाना (Food)', 'चिरई (Bird)', 'गैया (Cow)', 'दूध (Milk)', 'स्कूल (School)', 'फूल (Flower)'],
  maithili: ['गाछ (Tree)', 'पानि (Water)', 'रौद (Sun)', 'पात (Leaf)', 'जड़ि (Root)', 'बतास (Air)', 'भोजन (Food)', 'चिरै (Bird)', 'गाय (Cow)', 'दूध (Milk)', 'विद्यालय (School)', 'फूल (Flower)'],
  odia: ['ଗଛ (Tree)', 'ପାଣି (Water)', 'ଖରା (Sun)', 'ପତ୍ର (Leaf)', 'ଚେର (Root)', 'ପବନ (Air)', 'ଖାଦ୍ୟ (Food)', 'ଚଢ଼େଇ (Bird)', 'ଗାଈ (Cow)', 'କ୍ଷୀର (Milk)', 'ବିଦ୍ୟାଳୟ (School)', 'ଫୁଲ (Flower)'],
  marathi: ['झाड (Tree)', 'पाणी (Water)', 'सूर्यप्रकाश (Sun)', 'पान (Leaf)', 'मुळे (Root)', 'हवा (Air)', 'अन्न (Food)', 'पक्षी (Bird)', 'गाय (Cow)', 'दूध (Milk)', 'शाळा (School)', 'फूल (Flower)'],
};

export const StaffTranslator: React.FC<StaffTranslatorProps> = ({
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  onSetLessonPrompt,
  learningContext,
  initialTab,
  isStudentMode = false,
  onSaveConvertedNote,
  uploadedNotes,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab || 'translator');

  // If in student mode, default direction is Mother Tongue -> English
  const initialSource = isStudentMode ? selectedLanguage || 'santhali' : 'en';
  const initialTarget = isStudentMode ? 'en' : selectedLanguage || 'santhali';

  const [sourceLang, setSourceLang] = useState<string>(initialSource);
  const [targetLang, setTargetLang] = useState<string>(initialTarget);

  const initialText = isStudentMode
    ? (STUDENT_SAMPLE_PROMPTS[selectedLanguage || 'santhali']?.[0]?.text ||
       'ᱫᱟᱨᱮ ᱠᱚ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱥᱤᱛᱩᱝ, ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ ᱞᱟᱹᱠᱛᱤᱭᱟᱜ-ᱟ᱾ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾')
    : 'Plants need sunlight, water, and fresh air to create sweet food in their green leaves.';

  const [inputText, setInputText] = useState<string>(initialText);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translatedResult, setTranslatedResult] = useState(() =>
    isStudentMode
      ? generateMotherTongueToEnglishTranslation(initialText, (selectedLanguage || 'santhali') as LanguageCode)
      : generateMotherTongueTranslation(initialText, (selectedLanguage || 'santhali') as LanguageCode)
  );

  // Adapt Form State (for Staff Mode)
  const [learningLevel, setLearningLevel] = useState<'Beginner (Class 1-2)' | 'Intermediate (Class 3-4)' | 'Advanced (Class 5)'>(
    'Intermediate (Class 3-4)'
  );
  const [explanationStyle, setExplanationStyle] = useState<'Simple' | 'Story-based' | 'Example-based'>('Story-based');
  const [localContext, setLocalContext] = useState<
    'Village (Badi & Courtyard)' | 'Agriculture (Paddy fields)' | 'Nature (Sacred Grove & Forest)' | 'Daily Life (Local Haat/Market)'
  >('Village (Badi & Courtyard)');
  const [contentFormat, setContentFormat] = useState<string>('Story-based Visual Explanation');
  const [adaptTopic, setAdaptTopic] = useState<string>(
    'Plants need sunlight, water, and fresh air to grow and make food in green leaves.'
  );
  const [isAdapting, setIsAdapting] = useState<boolean>(false);
  const [adaptedResult, setAdaptedResult] = useState(() =>
    generatePedagogicAdaptation(
      'Intermediate (Class 3-4)',
      'Story-based',
      'Village (Badi & Courtyard)',
      'Story-based Visual Explanation',
      (selectedLanguage || 'santhali') as LanguageCode,
      'Plants need sunlight, water, and fresh air to grow and make food in green leaves.'
    )
  );

  // Toast & Audio Feedback State
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [sourceAudioPlaying, setSourceAudioPlaying] = useState<boolean>(false);
  const [adaptAudioPlaying, setAdaptAudioPlaying] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Determine active native language metadata
  const activeNativeCode = (sourceLang !== 'en' ? sourceLang : targetLang) as LanguageCode;
  const currentNativeLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === activeNativeCode) || SUPPORTED_LANGUAGES[0];
  const currentLangObj = currentNativeLang;

  const isTranslatingToEnglish = targetLang === 'en' || targetLang === 'english';

  // Sync when selectedLanguage prop changes
  useEffect(() => {
    if (selectedLanguage) {
      if (isStudentMode) {
        setSourceLang(selectedLanguage);
        setTargetLang('en');
        const defaultSample = STUDENT_SAMPLE_PROMPTS[selectedLanguage]?.[0]?.text;
        if (defaultSample) {
          setInputText(defaultSample);
          handleTranslate(defaultSample, 'en', selectedLanguage);
        }
      } else {
        setTargetLang(selectedLanguage);
        setSourceLang('en');
        handleTranslate(inputText, selectedLanguage, 'en');
        handleAdapt(learningLevel, explanationStyle, localContext, contentFormat, selectedLanguage);
      }
    }
  }, [selectedLanguage, isStudentMode]);

  const teacherSamplePrompts = [
    {
      label: 'Photosynthesis & Leaves',
      text: 'Green leaves need bright sunlight, clean water from roots, and air to make plant food.',
    },
    {
      label: 'Water Cycle in Nature',
      text: 'When the summer sun heats ponds and rivers, water rises into the sky as invisible steam to form dark rain clouds.',
    },
    {
      label: 'Plant Roots Absorption',
      text: 'Roots act like tiny drinking straws deep inside the moist brown soil, soaking up minerals and water.',
    },
    {
      label: 'Village Ecosystems',
      text: 'Earthworms make soil soft for crops, while bees and butterflies carry pollen between flowering crops.',
    },
  ];

  // Dynamic Translation Trigger - supports MT -> English and English -> MT
  const handleTranslate = async (customText?: string, targetOverride?: string, sourceOverride?: string) => {
    const rawText = customText !== undefined ? customText : inputText;
    const text = rawText ? rawText.trim() : '';
    if (!text) return;
    const target = targetOverride || targetLang;
    const source = sourceOverride || sourceLang;
    setIsTranslating(true);
    try {
      const result = await fetchTranslation(text, target as any, source);
      setTranslatedResult(result);
      const targetName = target === 'en' ? 'English' : SUPPORTED_LANGUAGES.find((l) => l.code === target)?.name || target;
      showToast(`Translated to ${targetName} successfully.`);
    } catch (err) {
      console.warn('Translation fetch failed, applying fallback:', err);
      const result = target === 'en'
        ? generateMotherTongueToEnglishTranslation(text, source as LanguageCode)
        : generateMotherTongueTranslation(text, target as LanguageCode);
      setTranslatedResult(result);
    } finally {
      setIsTranslating(false);
    }
  };

  // Swap translation direction
  const handleSwapDirection = () => {
    const newSource = targetLang;
    const newTarget = sourceLang;
    setSourceLang(newSource);
    setTargetLang(newTarget);
    if (translatedResult?.script) {
      const nextInput = translatedResult.script;
      setInputText(nextInput);
      handleTranslate(nextInput, newTarget, newSource);
    }
  };

  // Dynamic Pedagogic Adapt Trigger (Staff mode)
  const handleAdapt = async (
    lvl = learningLevel,
    sty = explanationStyle,
    ctx = localContext,
    fmt = contentFormat,
    lang = (targetLang as LanguageCode),
    topic = adaptTopic
  ) => {
    const topicText = (topic !== undefined ? topic : adaptTopic).trim();
    if (!topicText) return;
    setIsAdapting(true);
    try {
      const result = await fetchPedagogicAdaptation(lvl, sty, ctx, fmt, lang, topicText);
      setAdaptedResult(result);
      showToast(`Pedagogic plan adapted for "${topicText.slice(0, 24)}...".`);
    } catch (err) {
      console.warn('Adaptation fetch failed, applying fallback:', err);
      const result = generatePedagogicAdaptation(lvl, sty, ctx, fmt, lang, topicText);
      setAdaptedResult(result);
    } finally {
      setIsAdapting(false);
    }
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    if (isTranslatingToEnglish) {
      setSourceLang(newLang);
      if (onSelectLanguage) onSelectLanguage(newLang);
      const sample = STUDENT_SAMPLE_PROMPTS[newLang]?.[0]?.text || '';
      if (sample) {
        setInputText(sample);
        handleTranslate(sample, 'en', newLang);
      } else {
        handleTranslate(inputText, 'en', newLang);
      }
    } else {
      setTargetLang(newLang);
      if (onSelectLanguage) onSelectLanguage(newLang);
      handleTranslate(inputText, newLang, sourceLang);
      handleAdapt(learningLevel, explanationStyle, localContext, contentFormat, newLang);
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    setInputText(promptText);
    handleTranslate(promptText, targetLang, sourceLang);
  };

  const handleAddWordChip = (chipText: string) => {
    const word = chipText.split(' ')[0].trim();
    setInputText((prev) => (prev ? `${prev} ${word}` : word));
  };

  const handleCopy = () => {
    if (!translatedResult) return;
    const textToCopy = `${translatedResult.script}\n\nTransliteration: ${translatedResult.transliteration}\n\nExplanation: ${translatedResult.childFriendly}`;
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Audio for translated result (English if to-English, otherwise Mother Tongue)
  const handleSpeakTranslated = () => {
    if (!translatedResult) return;
    if (audioPlaying) {
      speechService.stop();
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      const isEnglish = targetLang === 'en';
      const targetMeta = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];
      const speechCode = isEnglish ? 'en-IN' : targetMeta.speechCode;
      const textToSpeak = `${translatedResult.script}. ${translatedResult.childFriendly}`;

      const success = speechService.speak(textToSpeak, {
        lang: speechCode,
        rate: isEnglish ? 0.88 : 0.82,
        onStart: () => setAudioPlaying(true),
        onEnd: () => setAudioPlaying(false),
        onError: () => setAudioPlaying(false),
      });
      if (!success) {
        setTimeout(() => setAudioPlaying(false), 2500);
      }
    }
  };

  // Audio for source input
  const handleSpeakSource = () => {
    if (!inputText.trim()) return;
    if (sourceAudioPlaying) {
      speechService.stop();
      setSourceAudioPlaying(false);
    } else {
      setSourceAudioPlaying(true);
      const isEnglish = sourceLang === 'en';
      const sourceMeta = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang) || SUPPORTED_LANGUAGES[0];
      const speechCode = isEnglish ? 'en-IN' : sourceMeta.speechCode;

      const success = speechService.speak(inputText, {
        lang: speechCode,
        rate: isEnglish ? 0.88 : 0.82,
        onStart: () => setSourceAudioPlaying(true),
        onEnd: () => setSourceAudioPlaying(false),
        onError: () => setSourceAudioPlaying(false),
      });
      if (!success) {
        setTimeout(() => setSourceAudioPlaying(false), 2500);
      }
    }
  };

  const handleSpeakAdapted = () => {
    if (!adaptedResult) return;
    if (adaptAudioPlaying) {
      speechService.stop();
      setAdaptAudioPlaying(false);
    } else {
      setAdaptAudioPlaying(true);
      const targetMeta = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];
      const success = speechService.speak(adaptedResult.contentMt, {
        lang: targetMeta.speechCode,
        rate: 0.82,
        onStart: () => setAdaptAudioPlaying(true),
        onEnd: () => setAdaptAudioPlaying(false),
        onError: () => setAdaptAudioPlaying(false),
      });
      if (!success) {
        setTimeout(() => setAdaptAudioPlaying(false), 2500);
      }
    }
  };

  const handleUseInLesson = () => {
    if (isStudentMode) {
      onNavigate('student_learning');
      return;
    }
    if (onSetLessonPrompt && translatedResult) {
      onSetLessonPrompt(inputText);
    }
    if (onSelectLanguage) {
      onSelectLanguage(activeNativeCode);
    }
    onNavigate('lesson_gen');
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HEADER: STUDENT MODE VS. STAFF MODE */}
      {isStudentMode ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
              <span>Student Portal</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">AI Translator (ᱛᱚᱨᱡᱚᱢᱟ)</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                {currentNativeLang.name} ({currentNativeLang.nativeName}) ➔ English
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <Globe2 className="w-7 h-7 text-emerald-600" />
              <span>Student AI Translator (Mother Tongue → English)</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
              Type, speak, or tap words in your mother tongue (<strong>{currentNativeLang.name} - {currentNativeLang.nativeName}</strong>) to see clear English translations with friendly meanings!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('student_home')}
              className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to My Lessons</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
              <span>Staff Pedagogy Tools</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">Multilingual AI Engine</span>
              <span>•</span>
              <span className="text-neutral-600 font-mono text-[11px]">
                Active: {currentNativeLang.name} ({currentNativeLang.nativeName})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <Globe2 className="w-7 h-7 text-emerald-600" />
              Vernacular Translator & Pedagogic Adapt
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
              Translate national curriculum into mother-tongue dialects and adapt explanations with village cultural context.
            </p>
          </div>

          {/* Tab Switcher for Staff */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-2xl border border-neutral-200 self-start sm:self-auto">
            <button
              id="tab-translator-btn"
              onClick={() => setActiveTab('translator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'translator'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Translator</span>
            </button>
            <button
              id="tab-adapt-btn"
              onClick={() => setActiveTab('adapt')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'adapt'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pedagogic Adapt</span>
            </button>
            <button
              id="tab-upload-notes-btn"
              onClick={() => setActiveTab('upload_notes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'upload_notes'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FileUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Upload Lesson Notes (PDF)</span>
            </button>
          </div>
        </div>
      )}

      {/* GLOBAL LANGUAGE DIRECTION SELECTOR BAR */}
      {activeTab !== 'upload_notes' && (
        <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            {/* Source Language Control */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                {isTranslatingToEnglish ? 'Student Mother Tongue (Source):' : 'Source Language:'}
              </span>
              {isTranslatingToEnglish ? (
                <select
                  id="source-language-select"
                  value={sourceLang}
                  onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                  className="px-3.5 py-2 bg-emerald-50 border border-emerald-300 rounded-xl font-bold text-emerald-950 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name} ({l.nativeName}) - {l.script}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="source-language-select"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-800 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden cursor-pointer"
                >
                  <option value="en">English (Standard NCERT)</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="bn">Bengali (বাংলা)</option>
                </select>
              )}
            </div>

            {/* Direction Swap Button */}
            <button
              onClick={handleSwapDirection}
              title="Swap translation direction"
              className="p-2 rounded-xl bg-neutral-100 hover:bg-emerald-100 text-neutral-700 hover:text-emerald-900 border border-neutral-200 transition-all cursor-pointer flex items-center gap-1 font-bold text-xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Swap</span>
            </button>

            {/* Target Language Control */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                {isTranslatingToEnglish ? 'Translation Target:' : 'Target Mother Tongue:'}
              </span>
              {isTranslatingToEnglish ? (
                <div className="px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-xl font-bold text-blue-950 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>English (Standard / Primary)</span>
                </div>
              ) : (
                <select
                  id="target-language-select"
                  value={targetLang}
                  onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                  className="px-3.5 py-2 bg-emerald-50 border border-emerald-300 rounded-xl font-bold text-emerald-900 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name} ({l.nativeName}) - {l.script}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
              {isTranslatingToEnglish
                ? `⚡ Vernacular ➔ English Engine (${currentNativeLang.name})`
                : currentNativeLang.isLowResource
                ? '⚡ Low-Resource Vernacular Model Active'
                : '✓ Standard Vernacular Model'}
            </span>
          </div>
        </div>
      )}

      {/* TAB 1: AI TRANSLATOR */}
      {activeTab === 'translator' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Quick Prompts: Mother Tongue phrases for student, or NCERT topics for staff */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isTranslatingToEnglish
                  ? `Quick ${currentNativeLang.name} (${currentNativeLang.nativeName}) Phrases (Tap to Translate to English):`
                  : 'Quick NCERT / Primary Curriculum Prompts (Click to Instant Translate):'}
              </span>
            </span>

            <div className="flex flex-wrap gap-2">
              {isTranslatingToEnglish
                ? (STUDENT_SAMPLE_PROMPTS[activeNativeCode] || STUDENT_SAMPLE_PROMPTS.santhali).map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(p.text)}
                      className="px-3.5 py-2 bg-neutral-100 hover:bg-emerald-50 hover:border-emerald-300 border border-neutral-200 text-neutral-800 hover:text-emerald-950 rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-98 text-left"
                      title={p.englishMeaning}
                    >
                      <div className="font-bold">{p.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{p.englishMeaning}</div>
                    </button>
                  ))
                : teacherSamplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(p.text)}
                      className="px-3.5 py-2 bg-neutral-100 hover:bg-emerald-50 hover:border-emerald-200 border border-transparent text-neutral-700 hover:text-emerald-950 rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-98"
                    >
                      {p.label}
                    </button>
                  ))}
            </div>
          </div>

          {/* COMPARISON LAYOUT: ORIGINAL VS. TRANSLATED */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT CARD: SOURCE CONTENT */}
            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                      {isTranslatingToEnglish
                        ? `Student Mother Tongue Input • ${currentNativeLang.name} (${currentNativeLang.nativeName})`
                        : 'Original Curriculum Text (English)'}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {inputText.length} chars
                  </span>
                </div>

                {/* Quick Mother Tongue Word Chips (for student ease on keyboard) */}
                {isTranslatingToEnglish && (
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Tap vocabulary words to add:
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                      {(STUDENT_WORD_CHIPS[activeNativeCode] || STUDENT_WORD_CHIPS.santhali).map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAddWordChip(chip)}
                          className="px-2 py-1 bg-white hover:bg-emerald-100 hover:border-emerald-300 border border-neutral-200 rounded-lg text-[11px] font-medium text-neutral-800 cursor-pointer transition-all active:scale-95"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <textarea
                  id="source-text-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={5}
                  placeholder={
                    isTranslatingToEnglish
                      ? `Type, speak, or click words in ${currentNativeLang.name} (${currentNativeLang.nativeName}) to translate into English...`
                      : 'Enter standard curriculum text, science definition, or lesson story to translate...'
                  }
                  className="w-full p-4 bg-neutral-50 rounded-2xl border border-neutral-200 font-medium text-neutral-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInputText('')}
                    className="text-xs text-neutral-400 hover:text-neutral-700 font-semibold cursor-pointer"
                  >
                    Clear text
                  </button>

                  <button
                    id="listen-source-audio-btn"
                    onClick={handleSpeakSource}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                      sourceAudioPlaying
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                    title="Listen to input text"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{sourceAudioPlaying ? 'Playing...' : 'Pronounce'}</span>
                  </button>
                </div>

                <button
                  id="translate-submit-btn"
                  onClick={() => handleTranslate()}
                  disabled={isTranslating || !inputText.trim()}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                >
                  <span>
                    {isTranslating
                      ? 'Translating...'
                      : isTranslatingToEnglish
                      ? 'Translate to English'
                      : 'Translate Lesson Content'}
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT CARD: TRANSLATED CONTENT */}
            <div className="p-6 bg-white rounded-3xl border-2 border-emerald-500/80 shadow-xs space-y-4 flex flex-col justify-between relative">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      {isTranslatingToEnglish
                        ? 'English Translation Output (Student Understanding)'
                        : `Mother-Tongue Output • ${currentNativeLang.name} (${currentNativeLang.nativeName})`}
                    </span>
                  </div>

                  {/* Actions: Copy & Audio */}
                  <div className="flex items-center gap-2">
                    <button
                      id="listen-translated-audio-btn"
                      onClick={handleSpeakTranslated}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                        audioPlaying
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                      title={isTranslatingToEnglish ? 'Listen to English translation' : 'Listen with mother-tongue speech synthesis'}
                    >
                      {audioPlaying ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen ({isTranslatingToEnglish ? 'English' : 'TTS'})</span>
                        </>
                      )}
                    </button>

                    <button
                      id="copy-translation-btn"
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                      title="Copy to clipboard"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Translation Display */}
                {translatedResult ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-1.5">
                      <div className="text-lg sm:text-xl font-extrabold text-neutral-900 leading-relaxed">
                        {translatedResult.script}
                      </div>
                      {translatedResult.transliteration && (
                        <div className="text-xs font-mono text-emerald-900 font-medium">
                          {translatedResult.transliteration}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-neutral-700 font-medium leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/60">
                      <strong>Child-Friendly Meaning: </strong>
                      {translatedResult.childFriendly}
                    </div>

                    {/* Vocabulary Terms */}
                    {translatedResult.vocabularyTerms && translatedResult.vocabularyTerms.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                          Mapped Primary Terms ({isTranslatingToEnglish ? 'Mother Tongue ➔ English' : 'Curriculum ➔ Mother Tongue'}):
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {translatedResult.vocabularyTerms.map((vt, i) => (
                            <div key={i} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
                              <div className="font-bold text-neutral-900">{vt.term}</div>
                              <div className="text-[11px] text-neutral-500 mt-0.5">
                                {vt.meaning} {vt.pronunciation ? `• ${vt.pronunciation}` : ''}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center text-neutral-400 text-xs">
                    Click "Translate" to generate output.
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  id="clear-translation-btn"
                  onClick={() => setTranslatedResult(null)}
                  className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  Clear Output
                </button>

                <button
                  id="use-in-lesson-btn"
                  onClick={handleUseInLesson}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>{isStudentMode ? 'Practice in Primary Lessons' : 'Use in Lesson Creation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PEDAGOGIC ADAPT */}
      {activeTab === 'adapt' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-neutral-900 text-sm">
                  Pedagogical Customization Settings
                </h3>
              </div>

              {/* Staff Input: Lesson Concept / Topic */}
              <div className="space-y-2 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Lesson Topic / Content to Adapt *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAdaptTopic(inputText);
                      handleAdapt(learningLevel, explanationStyle, localContext, contentFormat, targetLang, inputText);
                    }}
                    className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                  >
                    Use Translator Text
                  </button>
                </div>
                <textarea
                  id="adapt-topic-input"
                  value={adaptTopic}
                  onChange={(e) => setAdaptTopic(e.target.value)}
                  rows={3}
                  placeholder="Enter specific lesson topic or curriculum text to adapt..."
                  className="w-full p-2.5 bg-white rounded-xl border border-emerald-200 text-xs font-medium text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {[
                    'Photosynthesis & Leaf Kitchen',
                    'Water Transport via Roots',
                    'Village Ecosystems & Pollination',
                    'Village Market Counting',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setAdaptTopic(chip);
                        handleAdapt(learningLevel, explanationStyle, localContext, contentFormat, targetLang, chip);
                      }}
                      className="px-2 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[10px] font-semibold text-emerald-900 cursor-pointer transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Learning Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  1. Target Grade & Learning Level
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(['Beginner (Class 1-2)', 'Intermediate (Class 3-4)', 'Advanced (Class 5)'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setLearningLevel(lvl);
                        handleAdapt(lvl, explanationStyle, localContext, contentFormat);
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                        learningLevel === lvl
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-700'
                      }`}
                    >
                      <span>{lvl}</span>
                      {learningLevel === lvl && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Explanation Style */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  2. Explanation Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Simple', 'Story-based', 'Example-based'] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => {
                        setExplanationStyle(style);
                        handleAdapt(learningLevel, style, localContext, contentFormat);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        explanationStyle === style
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Cultural Context */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  3. Regional & Cultural Context
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    [
                      'Village (Badi & Courtyard)',
                      'Agriculture (Paddy fields)',
                      'Nature (Sacred Grove & Forest)',
                      'Daily Life (Local Haat/Market)',
                    ] as const
                  ).map((ctx) => (
                    <button
                      key={ctx}
                      type="button"
                      onClick={() => {
                        setLocalContext(ctx);
                        handleAdapt(learningLevel, explanationStyle, ctx, contentFormat);
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                        localContext === ctx
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-700'
                      }`}
                    >
                      <span>{ctx}</span>
                      {localContext === ctx && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Format */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  4. Pedagogy Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Text Summary', 'Visual Explanation', 'Class Activity'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => {
                        setContentFormat(fmt);
                        handleAdapt(learningLevel, explanationStyle, localContext, fmt);
                      }}
                      className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                        contentFormat === fmt
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-700'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Adapt Button */}
              <button
                id="adapt-lesson-submit-btn"
                onClick={() => handleAdapt()}
                disabled={isAdapting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAdapting ? 'Adapting Lesson...' : 'Adapt Lesson with Local Context'}</span>
              </button>
            </div>

            {/* Right Column: Adapt Output Preview */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-emerald-500/80 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                      Context-Adapted Lesson Plan • {currentLangObj.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="listen-adapted-audio-btn"
                      onClick={handleSpeakAdapted}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                        adaptAudioPlaying
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                      title="Listen to adapted lesson"
                    >
                      {adaptAudioPlaying ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen (TTS)</span>
                        </>
                      )}
                    </button>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {learningLevel.split(' ')[0]} • {explanationStyle}
                    </span>
                  </div>
                </div>

                {adaptedResult ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-extrabold text-neutral-900">
                        {adaptedResult.title}
                      </h3>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        Context setting: <strong>{localContext}</strong> • Language:{' '}
                        <strong>{currentLangObj.name}</strong>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-2">
                      <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-between">
                        <span>Mother-Tongue Phrasing:</span>
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                          {currentLangObj.script}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-neutral-900 leading-relaxed">
                        {adaptedResult.contentMt}
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
                      <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Teacher Explanation & Narrative:
                      </div>
                      <div className="text-xs text-neutral-700 leading-relaxed">
                        {adaptedResult.contentEn}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
                      <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Interactive Pedagogy Activity:</span>
                      </div>
                      <div className="text-xs text-amber-950 font-medium">
                        {adaptedResult.activityPrompt}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-neutral-400 text-xs">
                    Configure options and click "Adapt Lesson" to preview the localized plan.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">
                  Ready to deploy in rural multi-grade classrooms.
                </span>

                <button
                  id="insert-adapted-lesson-btn"
                  onClick={handleUseInLesson}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>Insert into Lesson Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD LESSON NOTES (PDF TO MOTHER TONGUE) */}
      {activeTab === 'upload_notes' && (
        <LessonNotesConverter
          selectedLanguage={targetLang}
          onSelectLanguage={handleLanguageChange}
          onNavigate={onNavigate}
          onSetLessonPrompt={onSetLessonPrompt}
          onSaveConvertedNote={onSaveConvertedNote}
          uploadedNotes={uploadedNotes}
        />
      )}
    </div>
  );
};
