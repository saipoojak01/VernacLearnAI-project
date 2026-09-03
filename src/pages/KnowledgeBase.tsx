import React, { useState, useEffect } from 'react';
import { Screen, LanguageCode, VocabularyItem, UserRole } from '../types';
import { INITIAL_VOCABULARY_BASE, SUPPORTED_LANGUAGES } from '../data/demoData';
import { AudioButton } from '../components/AudioButton';
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Edit3,
  Check,
  X,
  Sparkles,
  Plus,
  ArrowRight,
  ShieldCheck,
  Save,
  Trash2,
  RotateCcw,
  BookOpen,
  Tag,
  Clock,
  HelpCircle,
  CheckCheck,
  XCircle,
} from 'lucide-react';

const STORAGE_KEY = 'vernaclearn_kb_vocabulary_v3';

interface KnowledgeBaseProps {
  onNavigate: (screen: Screen) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  userRole?: UserRole;
  vocabulary?: VocabularyItem[];
  onUpdateVocabulary?: (updated: VocabularyItem[]) => void;
}

type CategoryType =
  | 'Plants'
  | 'Animals'
  | 'Numbers'
  | 'Daily Life'
  | 'Education'
  | 'Classroom Instructions';

interface QuickPreset {
  category: CategoryType;
  english: string;
  hindi: string;
  motherTongueByLang: Record<LanguageCode, { mt: string; translit: string }>;
  meaning: string;
}

const QUICK_PRESETS: QuickPreset[] = [
  {
    category: 'Plants',
    english: 'Mango Tree',
    hindi: 'आम का पेड़',
    motherTongueByLang: {
      santhali: { mt: 'ᱩᱞ ᱫᱟᱨᱮ', translit: 'Ul Dare' },
      gondi: { mt: 'मरका मरा', translit: 'Marka Mara' },
      bhojpuri: { mt: 'आम के गाछ', translit: 'Aam ke Gaachh' },
      maithili: { mt: 'आम केर गाछ', translit: 'Aam Ker Gaachh' },
      odia: { mt: 'ଆମ୍ବ ଗଛ', translit: 'Amba Gachha' },
      marathi: { mt: 'आंब्याचे झाड', translit: 'Ambyache Jhaad' },
    },
    meaning: 'A fruit-bearing tree commonly found in local surroundings and school courtyards.',
  },
  {
    category: 'Animals',
    english: 'Cow',
    hindi: 'गाय',
    motherTongueByLang: {
      santhali: { mt: 'ᱜᱟᱹᱭ', translit: 'Gai' },
      gondi: { mt: 'कोन्द', translit: 'Konda' },
      bhojpuri: { mt: 'गाय / गैया', translit: 'Gaiya' },
      maithili: { mt: 'गाय', translit: 'Gaay' },
      odia: { mt: 'ଗାଈ', translit: 'Gaai' },
      marathi: { mt: 'गाय', translit: 'Gaay' },
    },
    meaning: 'A domestic dairy animal central to rural agriculture and daily village life.',
  },
  {
    category: 'Animals',
    english: 'Goat',
    hindi: 'बकरी',
    motherTongueByLang: {
      santhali: { mt: 'ᱢᱮᱨᱚᱢ', translit: 'Merom' },
      gondi: { mt: 'येटी', translit: 'Yeti' },
      bhojpuri: { mt: 'छेरी / बकरी', translit: 'Chheri' },
      maithili: { mt: 'बकरी', translit: 'Bakri' },
      odia: { mt: 'ଛେଳି', translit: 'Chheli' },
      marathi: { mt: 'शेळी', translit: 'Sheli' },
    },
    meaning: 'A small herbivorous livestock animal common in rural households.',
  },
  {
    category: 'Animals',
    english: 'Elephant',
    hindi: 'हाथी',
    motherTongueByLang: {
      santhali: { mt: 'ᱦᱟᱹᱛᱤ', translit: 'Hati' },
      gondi: { mt: 'हात्ती', translit: 'Haatti' },
      bhojpuri: { mt: 'हाथी', translit: 'Haathi' },
      maithili: { mt: 'हाथी', translit: 'Haathi' },
      odia: { mt: 'ହାତୀ', translit: 'Haati' },
      marathi: { mt: 'हत्ती', translit: 'Hatti' },
    },
    meaning: 'A large wild herbivore honored in regional folklore and forest ecosystems.',
  },
  {
    category: 'Numbers',
    english: 'Ten wild flowers',
    hindi: 'दस जंगली फूल',
    motherTongueByLang: {
      santhali: { mt: 'ᱜᱮᱞ ᱜᱚᱴᱟᱝ ᱵᱤᱨ ᱵᱟᱦᱟ', translit: 'Gel gotang bir baha' },
      gondi: { mt: 'पद पुंगार', translit: 'Pad Pungar' },
      bhojpuri: { mt: 'दस गो जंगली फूल', translit: 'Das go jangali phool' },
      maithili: { mt: 'दश टा जंगली फूल', translit: 'Dash ta jangali phool' },
      odia: { mt: 'ଦଶଟି ଜଙ୍ଗଲୀ ଫୁଲ', translit: 'Dashati jangali phula' },
      marathi: { mt: 'दहा रानटी फुले', translit: 'Daha raanti phule' },
    },
    meaning: 'Used in primary counting exercises utilizing local nature objects.',
  },
  {
    category: 'Daily Life',
    english: 'Early morning sunrise',
    hindi: 'सुबह का सूर्योदय',
    motherTongueByLang: {
      santhali: { mt: 'ᱥᱮᱛᱟᱜ ᱵᱮᱲᱟ ᱨᱟᱠᱟᱵ', translit: 'Setag bera rakab' },
      gondi: { mt: 'सकारो पोद्द् पोडितो', translit: 'Sakaro podd podito' },
      bhojpuri: { mt: 'सवेरे के घाम / सुरुज उगना', translit: 'Savere ke gham' },
      maithili: { mt: 'भोरुक सूर्योदय', translit: 'Bhoruk suryoday' },
      odia: { mt: 'ସକାଳ ସୂର୍ଯ୍ୟୋଦୟ', translit: 'Sakala suryodaya' },
      marathi: { mt: 'सकाळचा सूर्योदय', translit: 'Sakalcha suryodaya' },
    },
    meaning: 'Time of day marker for morning school routines and daily village activities.',
  },
  {
    category: 'Classroom Instructions',
    english: 'Sit quietly and listen carefully',
    hindi: 'शांत बैठो और ध्यान से सुनो',
    motherTongueByLang: {
      santhali: { mt: 'ᱛᱷᱤᱨ ᱠᱟᱛᱮ ᱫᱩᱲᱩᱵ ᱢᱮ ᱟᱨ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ', translit: 'Thir kate durub me ar mone em kate anjom me' },
      gondi: { mt: 'निंते कुर्री की मति तासी केजा', translit: 'Ninte kurri ki mati tasi keja' },
      bhojpuri: { mt: 'शांति से बइठा आ ध्यान से सुना', translit: 'Shanti se baitha aa dhyan se suna' },
      maithili: { mt: 'शांत बैसू आ ध्यान सँ सुनू', translit: 'Shaant baisu aa dhyan sa sunu' },
      odia: { mt: 'ଚୁପ୍ଚାପ୍ ବସନ୍ତୁ ଏବଂ ଧ୍ୟାନ ଦେଇ ଶୁଣନ୍ତୁ', translit: 'Chupchap basantu ebanga dhyan dei sunantu' },
      marathi: { mt: 'शांत बसा आणि लक्षपूर्वक ऐका', translit: 'Shaant basa aani lakshapurvak aika' },
    },
    meaning: 'Classroom management prompt to focus learners before introducing key concepts.',
  },
];

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  userRole = 'admin',
  vocabulary: propsVocabulary,
  onUpdateVocabulary,
}) => {
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  // Local storage state fallback
  const [internalVocabulary, setInternalVocabulary] = useState<VocabularyItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read vocabulary from localStorage', e);
    }
    return INITIAL_VOCABULARY_BASE;
  });

  const vocabulary = propsVocabulary || internalVocabulary;

  const setVocabulary = (updater: VocabularyItem[] | ((prev: VocabularyItem[]) => VocabularyItem[])) => {
    if (typeof updater === 'function') {
      const updated = updater(vocabulary);
      setInternalVocabulary(updated);
      if (onUpdateVocabulary) onUpdateVocabulary(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
    } else {
      setInternalVocabulary(updater);
      if (onUpdateVocabulary) onUpdateVocabulary(updater);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updater));
      } catch (e) {}
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [updatedToast, setUpdatedToast] = useState<string | null>(null);

  // Modals & form states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<VocabularyItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<VocabularyItem | null>(null);

  // New entry form state
  const [newCategory, setNewCategory] = useState<CategoryType>('Plants');
  const [newEnglish, setNewEnglish] = useState<string>('');
  const [newHindi, setNewHindi] = useState<string>('');
  const [newMotherTongue, setNewMotherTongue] = useState<string>('');
  const [newTransliteration, setNewTransliteration] = useState<string>('');
  const [newMeaning, setNewMeaning] = useState<string>('');
  const [newTeacherNote, setNewTeacherNote] = useState<string>('');

  const categoryList: CategoryType[] = [
    'Plants',
    'Animals',
    'Numbers',
    'Daily Life',
    'Education',
    'Classroom Instructions',
  ];

  const filterCategories = ['All', ...categoryList];

  const showToast = (message: string) => {
    setUpdatedToast(message);
    setTimeout(() => {
      setUpdatedToast((curr) => (curr === message ? null : curr));
    }, 3800);
  };

  // Filter items
  const filteredItems = vocabulary.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus =
      statusFilter === 'All' || item.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.english.toLowerCase().includes(query) ||
      item.hindi.toLowerCase().includes(query) ||
      item.motherTongue.toLowerCase().includes(query) ||
      item.transliteration.toLowerCase().includes(query) ||
      item.meaningInContext.toLowerCase().includes(query);
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const pendingVerificationCount = vocabulary.filter(
    (item) => item.status === 'pending_verification' || item.status === 'needs_review'
  ).length;

  const handleOpenAddModal = (defaultCat?: CategoryType) => {
    if (defaultCat) {
      setNewCategory(defaultCat);
    } else if (selectedCategory !== 'All' && categoryList.includes(selectedCategory as CategoryType)) {
      setNewCategory(selectedCategory as CategoryType);
    } else {
      setNewCategory('Plants');
    }
    setNewEnglish('');
    setNewHindi('');
    setNewMotherTongue('');
    setNewTransliteration('');
    setNewMeaning('');
    setNewTeacherNote('');
    setIsAddModalOpen(true);
  };

  // Apply Quick Preset
  const handleApplyPreset = (preset: QuickPreset) => {
    setNewCategory(preset.category);
    setNewEnglish(preset.english);
    setNewHindi(preset.hindi);
    const langData = preset.motherTongueByLang[selectedLanguage] || {
      mt: preset.english,
      translit: preset.english,
    };
    setNewMotherTongue(langData.mt);
    setNewTransliteration(langData.translit);
    setNewMeaning(preset.meaning);
    setNewTeacherNote(`Standard primary vocabulary for ${preset.category.toLowerCase()}.`);
  };

  // Save / Submit New Entry
  const handleSaveNewEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnglish.trim() || !newMotherTongue.trim()) return;

    // If role is staff, it MUST be pending_verification. If admin, it is verified.
    const initialStatus = userRole === 'staff' ? 'pending_verification' : 'verified';
    const submittedBy = userRole === 'staff' ? 'Anjali Hansda (Teacher)' : 'Platform Administrator';

    const newItem: VocabularyItem = {
      id: `voc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      category: newCategory,
      english: newEnglish.trim(),
      hindi: newHindi.trim() || newEnglish.trim(),
      motherTongue: newMotherTongue.trim(),
      transliteration: newTransliteration.trim() || newMotherTongue.trim(),
      meaningInContext:
        newMeaning.trim() ||
        `Used in primary ${newCategory.toLowerCase()} pedagogy and classroom contextualization.`,
      status: initialStatus,
      submittedBy,
      submittedRole: userRole as any,
      submissionDate: '2026-08-29',
      teacherNote: newTeacherNote.trim() || undefined,
      lastUpdated: userRole === 'staff' ? 'Pending Admin Verification' : 'Aug 2026 (Verified)',
    };

    setVocabulary((prev) => [newItem, ...prev]);
    
    if (userRole === 'staff') {
      showToast(`Vocabulary Submission Received: "${newItem.english}" submitted for Admin verification.`);
    } else {
      showToast(`Knowledge Base Updated: "${newItem.english}" added and verified.`);
    }

    setIsAddModalOpen(false);
    if (selectedCategory !== 'All' && selectedCategory !== newItem.category) {
      setSelectedCategory(newItem.category);
    }
  };

  // Save Edit Entry
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setVocabulary((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...editingItem,
              lastUpdated: 'Just now (Updated)',
            }
          : item
      )
    );

    showToast(`Knowledge Base Updated: "${editingItem.english}" revised.`);
    setEditingItem(null);
  };

  // Admin Approve Entry
  const handleApproveEntry = (id: string) => {
    setVocabulary((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'verified',
              lastUpdated: 'Approved by Admin (Verified)',
            }
          : item
      )
    );
    showToast('Vocabulary Approved: Word is now verified and visible to students.');
  };

  // Admin Reject Entry
  const handleRejectEntry = (id: string) => {
    setVocabulary((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'rejected',
              lastUpdated: 'Rejected by Admin',
            }
          : item
      )
    );
    showToast('Vocabulary Entry Rejected.');
  };

  // Delete Entry
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const deletedName = itemToDelete.english;
    setVocabulary((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    showToast(`Knowledge Base Updated: "${deletedName}" deleted.`);
    setItemToDelete(null);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
            <span>Linguistic Grounding Layer</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">{currentLang.name}</span>
            {currentLang.isLowResource && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono">
                Low-Resource Tribal
              </span>
            )}
            <span>•</span>
            <span className="text-neutral-400 font-mono text-[10px]">
              {userRole === 'admin' ? 'Admin Governance' : 'Teacher Knowledge Base'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
            <Database className="w-6 h-6 text-emerald-600" />
            Mother-Tongue Knowledge Base
          </h1>
          <p className="text-sm text-neutral-500 mt-1 font-medium">
            {userRole === 'admin'
              ? 'Review pending teacher submissions, approve vocabulary, and govern language dictionary.'
              : 'Add vocabulary entries to submit for admin verification and view verified terms.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            id="add-new-entry-header-btn"
            onClick={() => handleOpenAddModal()}
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>{userRole === 'staff' ? 'Submit New Word' : 'Add New Entry'}</span>
          </button>
        </div>
      </div>

      {/* Admin Pending Review Banner */}
      {userRole === 'admin' && pendingVerificationCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-amber-900">
                {pendingVerificationCount} Vocabulary Submissions Awaiting Approval
              </div>
              <div className="text-amber-800 text-[11px]">
                Teachers submitted new terms for Class 3 curriculum. Review and verify them below.
              </div>
            </div>
          </div>

          <button
            id="filter-pending-btn"
            onClick={() => setStatusFilter('pending_verification')}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            View Pending ({pendingVerificationCount})
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {updatedToast && (
        <div
          id="kb-toast-notification"
          className="p-4 rounded-xl bg-neutral-900 text-white shadow-lg flex items-center justify-between border border-neutral-700 animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{updatedToast}</span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
            Synced
          </span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="kb-search-input"
              type="text"
              placeholder="Search by English, Hindi, Mother Tongue, or transliteration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <span className="text-neutral-400">Status:</span>
              <select
                id="kb-status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-800 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Entries</option>
                <option value="verified">Verified (Student Visible)</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="needs_review">Needs Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="text-xs text-neutral-500 font-semibold pl-2 border-l border-neutral-200">
              {filteredItems.length} entries
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Database className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-900">No vocabulary entries found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No entries match the current filter or search query.
            </p>
            <button
              onClick={() => handleOpenAddModal()}
              className="mt-2 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Entry</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Standard Term (EN / HI)</th>
                  <th className="py-3 px-4">Mother Tongue & Phonetics</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Contextual Meaning</th>
                  <th className="py-3 px-4">Status & Submitter</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    id={`vocab-row-${item.id}`}
                    className="hover:bg-neutral-50/60 transition-colors"
                  >
                    {/* English / Hindi */}
                    <td className="py-3 px-4 max-w-[200px]">
                      <div className="font-bold text-neutral-900 text-sm">{item.english}</div>
                      <div className="text-[11px] text-neutral-500">{item.hindi}</div>
                    </td>

                    {/* Mother Tongue & Audio */}
                    <td className="py-3 px-4 max-w-[240px]">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-neutral-900 text-sm">
                          {item.motherTongue}
                        </span>
                        <AudioButton
                          text={item.transliteration || item.motherTongue}
                          languageCode={currentLang.speechCode}
                          label="Listen"
                        />
                      </div>
                      <div className="text-[11px] text-emerald-800 font-medium font-mono">
                        {item.transliteration}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    {/* Contextual Meaning */}
                    <td className="py-3 px-4 max-w-[220px]">
                      <p className="text-neutral-600 line-clamp-2 leading-relaxed text-[11px]">
                        {item.meaningInContext}
                      </p>
                    </td>

                    {/* Status & Submitter */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                            item.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'pending_verification'
                              ? 'bg-amber-100 text-amber-900 font-extrabold'
                              : item.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.status === 'verified'
                            ? 'Verified'
                            : item.status === 'pending_verification'
                            ? 'Pending Verification'
                            : item.status === 'rejected'
                            ? 'Rejected'
                            : 'Needs Review'}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {item.submittedBy || 'Curriculum Team'}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Admin quick approval buttons */}
                        {userRole === 'admin' &&
                          (item.status === 'pending_verification' ||
                            item.status === 'needs_review') && (
                            <>
                              <button
                                id={`approve-word-${item.id}`}
                                onClick={() => handleApproveEntry(item.id)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                                title="Approve and make visible to students"
                              >
                                <Check className="w-3 h-3" />
                                <span>Approve</span>
                              </button>
                              <button
                                id={`reject-word-${item.id}`}
                                onClick={() => handleRejectEntry(item.id)}
                                className="p-1 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 cursor-pointer"
                                title="Reject entry"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                        {userRole === 'admin' && (
                          <>
                            <button
                              id={`edit-kb-btn-${item.id}`}
                              onClick={() => setEditingItem({ ...item })}
                              className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                              title="Edit entry"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`delete-kb-btn-${item.id}`}
                              onClick={() => setItemToDelete(item)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / SUBMIT ENTRY                                                 */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div
            id="add-entry-modal"
            className="w-full max-w-xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    {userRole === 'staff'
                      ? 'Submit Vocabulary Entry for Verification'
                      : 'Add New Vocabulary Entry'}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {userRole === 'staff'
                      ? 'Admin will review and approve this term before students can access it.'
                      : 'Add verified vernacular terms to the central curriculum dictionary.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="px-6 pt-3 pb-1 border-b border-neutral-100 bg-neutral-50/50">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Auto-fill from Primary Curriculum Presets:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {QUICK_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 hover:border-neutral-900 text-[11px] font-semibold text-neutral-800 cursor-pointer whitespace-nowrap transition-all"
                  >
                    + {preset.english}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveNewEntry} className="p-6 space-y-4 text-xs">
              {/* Category */}
              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-category-select"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                >
                  {categoryList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* English & Hindi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Standard Term (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-english-input"
                    type="text"
                    placeholder="e.g. Sunlight, Green Leaf, Roots"
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Hindi Equivalent
                  </label>
                  <input
                    id="modal-hindi-input"
                    type="text"
                    placeholder="e.g. धूप, हरा पत्ता, जड़ें"
                    value={newHindi}
                    onChange={(e) => setNewHindi(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              {/* Mother Tongue & Pronunciation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Mother-Tongue Equivalent <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-mt-input"
                    type="text"
                    placeholder="e.g. ᱥᱤᱛᱩᱝ / ᱵᱮᱲᱟ ᱨᱟᱱ"
                    value={newMotherTongue}
                    onChange={(e) => setNewMotherTongue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-extrabold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Phonetic / Pronunciation <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-phonetic-input"
                    type="text"
                    placeholder="e.g. Situng / Bera Ran"
                    value={newTransliteration}
                    onChange={(e) => setNewTransliteration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>
              </div>

              {/* Contextual Meaning */}
              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Contextual Meaning & Pedagogical Use
                </label>
                <textarea
                  id="modal-meaning-input"
                  rows={2}
                  placeholder="Describe how primary school teachers should contextualize this word in class..."
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="save-new-entry-btn"
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{userRole === 'staff' ? 'Submit for Verification' : 'Save Entry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT ENTRY                                                         */}
      {/* ========================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div
            id="edit-entry-modal"
            className="w-full max-w-xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in duration-150"
          >
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <h3 className="font-bold text-neutral-900 text-sm">
                Edit Vocabulary Entry — {editingItem.english}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Standard English Term
                  </label>
                  <input
                    type="text"
                    value={editingItem.english}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, english: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Hindi Equivalent
                  </label>
                  <input
                    type="text"
                    value={editingItem.hindi}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, hindi: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Mother-Tongue Script
                  </label>
                  <input
                    type="text"
                    value={editingItem.motherTongue}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, motherTongue: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-extrabold text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Phonetics / Transliteration
                  </label>
                  <input
                    type="text"
                    value={editingItem.transliteration}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        transliteration: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono font-medium text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Contextual Meaning
                </label>
                <textarea
                  rows={2}
                  value={editingItem.meaningInContext}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      meaningInContext: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DELETE CONFIRMATION                                                */}
      {/* ========================================================================= */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div
            id="delete-entry-modal"
            className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Delete Vocabulary Entry</h3>
                <p className="text-xs text-neutral-500">
                  Are you sure you want to remove <strong>"{itemToDelete.english}"</strong> ({itemToDelete.motherTongue}) from the knowledge base?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-entry-btn"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
