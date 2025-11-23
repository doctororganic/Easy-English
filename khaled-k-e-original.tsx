
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { gradesData } from './data';
import { TabType, QuestionItem, WritingTopic } from './types';
import { BookOpen, PenTool, Volume2, Eye, EyeOff, CheckCircle, ChevronRight, GraduationCap, AlertCircle, Languages, Globe, Lock } from 'lucide-react';

// --- Components ---

interface QuestionCardProps {
  q: QuestionItem;
  isLearned: boolean;
  isRevealed: boolean;
  isTranslated: boolean;
  onToggleLearned: (id: string) => void;
  onToggleAnswer: (id: string) => void;
  onToggleTranslation: (id: string) => void;
  onSpeak: (text: string) => void;
}

const QuestionCard = React.memo(({ 
  q, 
  isLearned, 
  isRevealed, 
  isTranslated, 
  onToggleLearned, 
  onToggleAnswer, 
  onToggleTranslation, 
  onSpeak 
}: QuestionCardProps) => {
  return (
    <div 
      className={`group relative bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isLearned 
          ? 'border-green-900/30 opacity-60 hover:opacity-100 bg-slate-900/50' 
          : 'border-slate-800 hover:border-blue-500/30 shadow-xl shadow-black/20'
      }`}
    >
      {/* Card Header / Question */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-semibold text-slate-100 leading-relaxed">
              {q.questionEn}
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="text-right text-emerald-400/80 font-arabic text-lg leading-relaxed pt-2" dir="rtl">
                  {q.questionAr}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTranslation(q.id);
                }}
                className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                  isTranslated ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/10'
                }`}
                title="Translate"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(q.questionEn + ". " + q.answerEn);
                }}
                className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all flex-shrink-0"
                title="Listen to native pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-out border-t border-slate-800/50 bg-slate-950/30 ${
          isRevealed ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-6 space-y-4">
             <div className="space-y-4">
              <div className="text-slate-300 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-purple-500">
                {q.answerEn}
              </div>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="text-right text-purple-400/80 font-arabic whitespace-pre-line text-lg leading-relaxed pr-4 border-r-2 border-emerald-500/50 pt-2" dir="rtl">
                    {q.answerAr}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center">
        <button
          onClick={() => onToggleLearned(q.id)}
          className={`flex items-center space-x-2 text-xs font-medium transition-colors px-2 py-1 rounded-md ${
            isLearned 
              ? 'text-green-500 bg-green-500/10' 
              : 'text-slate-500 hover:text-green-400 hover:bg-green-500/5'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isLearned ? "Learned" : "Mark as Learned"}</span>
        </button>

        <button
          onClick={() => onToggleAnswer(q.id)}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border shadow-lg ${
            isRevealed 
              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
              : 'bg-blue-600/10 text-blue-400 border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40'
          }`}
        >
          {isRevealed ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
      
      {/* Progress Bar Decoration */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 opacity-50" style={{ width: isRevealed ? '100%' : '0%' }} />
    </div>
  );
});

interface WritingTopicCardProps {
  topic: WritingTopic;
  isTranslated: boolean;
  onToggleTranslation: (id: string) => void;
  onSpeak: (text: string) => void;
}

const WritingTopicCard = React.memo(({ 
  topic, 
  isTranslated, 
  onToggleTranslation, 
  onSpeak 
}: WritingTopicCardProps) => {
  return (
   <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300 group shadow-xl shadow-black/20">
     <div className="p-6 md:p-8 space-y-6">
       <div className="flex justify-between items-start gap-4">
         <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-[10px] font-bold tracking-wide border border-purple-500/20 uppercase">
                Writing Topic
              </span>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {topic.titleEn}
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <h3 className="text-xl font-bold text-emerald-400/90 font-arabic text-right pt-1" dir="rtl">
                    {topic.titleAr}
                  </h3>
                </div>
            </div>
         </div>
         <div className="flex gap-2">
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTranslation(topic.id);
                }}
                className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                  isTranslated ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/10'
                }`}
                title="Translate"
              >
                <Globe className="w-6 h-6" />
              </button>
           <button
              onClick={() => onSpeak(topic.promptEn)}
              className="p-2.5 text-slate-500 hover:text-purple-400 hover:bg-purple-400/10 rounded-xl transition-colors flex-shrink-0"
            >
              <Volume2 className="w-6 h-6" />
            </button>
         </div>
       </div>

       <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 relative">
         <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500/50 to-blue-500/50 rounded-l-xl"></div>
         <p className="text-slate-300 leading-relaxed text-lg font-light pl-2">
           {topic.promptEn}
         </p>
         <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <p className="text-right text-emerald-400/80 font-arabic text-lg leading-relaxed pt-4 pr-2 border-t border-slate-800 mt-4" dir="rtl">
                {topic.promptAr}
              </p>
            </div>
          </div>
       </div>

       <div className="space-y-4">
         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Languages className="w-4 h-4 text-blue-500" />
            <span>Plan & Outline</span>
                         </h4>
                         <div className="grid grid-cols-1 gap-4">
                           {topic.plan.map((section, idx) => (
                             <div key={idx} className="rounded-lg bg-slate-800/20 border border-slate-700/30 p-4 hover:bg-slate-800/40 transition-colors">
                               <div className="mb-3 flex flex-col gap-1">
                                 <div className="flex items-center space-x-2">
                                   <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-xs font-bold border border-purple-500/20">
                                     {idx + 1}
                                   </div>
                                   <h5 className="text-blue-300 font-semibold text-sm">{section.sectionEn}</h5>
                                 </div>
                                 {isTranslated && (
                                   <h5 className="text-emerald-400/80 font-arabic text-sm font-semibold text-right pr-8" dir="rtl">
                                     {section.sectionAr}
                                   </h5>
                                 )}
                               </div>
                               <div className="space-y-3 pl-8">
                  {section.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex flex-col gap-1">
                      <div className="flex gap-2 items-start">
                        <span className="text-slate-600 mt-1.5">•</span>
                        <p className="text-slate-400 text-sm">{task.en}</p>
                      </div>
                      {isTranslated && (
                        <p className="text-emerald-500/60 text-sm font-arabic text-right pr-4" dir="rtl">
                          {task.ar}
                        </p>
                      )}
                    </div>
                  ))}
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
  );
});

interface SubscriptionLockProps {
  onSubscribe: () => void;
}

const SubscriptionLock = ({ onSubscribe }: SubscriptionLockProps) => {
  const handleSubscribe = () => {
    // Open the Google Form in a new tab
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScdZUjA4nsWqdFKXLDLi15EF7oLeTtpqbxQl7FDqAQZ81agSQ/viewform?usp=header", "_blank");
    // Unlock the content immediately so it's ready when the user returns
    onSubscribe();
  };

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 text-center space-y-8 bg-slate-900/80 rounded-3xl border border-purple-500/30 shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-500">
      <div className="p-5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-xl shadow-purple-500/20">
         <Lock className="w-10 h-10 text-white" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Premium Content
        </h3>
        <p className="text-xl text-purple-400 font-arabic">
          محتوى حصري للمشتركين
        </p>
      </div>

      <div className="grid gap-4 max-w-3xl w-full text-left">
         <div className="p-5 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-green-500/10 rounded-full text-green-500 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-lg">Subscribe to get full content and questions with answers.</p>
                <p className="text-emerald-400 font-arabic mt-1 text-base" dir="rtl">اشترك للحصول على المحتوى الكامل وبنك الأسئلة المجاب عنه.</p>
              </div>
            </div>
         </div>

         <div className="p-5 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-blue-500/10 rounded-full text-blue-500 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-lg">Take all services and immediate translation with reading (no need to open extra sites).</p>
                <p className="text-emerald-400 font-arabic mt-1 text-base" dir="rtl">تمتع بكافة الخدمات: ترجمة فورية وقراءة صوتية (لن تحتاج لمواقع خارجية).</p>
              </div>
            </div>
         </div>

         <div className="p-5 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-purple-500/10 rounded-full text-purple-500 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-slate-200 font-semibold text-lg">Get full content (no need for extra notes, books, or PDFs).</p>
                 <p className="text-emerald-400 font-arabic mt-1 text-base" dir="rtl">محتوى شامل يغنيك عن المذكرات والكتب الخارجية وملفات الـ PDF.</p>
              </div>
            </div>
         </div>

         <div className="p-5 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-pink-500/10 rounded-full text-pink-500 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-slate-200 font-semibold text-lg">Save your time, money, and effort.</p>
                 <p className="text-emerald-400 font-arabic mt-1 text-base" dir="rtl">وفر وقتك ومالك وجهدك.</p>
              </div>
            </div>
         </div>
      </div>

      <button 
        onClick={handleSubscribe}
        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all transform hover:scale-105 hover:-translate-y-1"
      >
         Subscribe Now / اشترك الآن
      </button>
    </div>
  );
};

// --- Main App ---

function App() {
  const [selectedGrade, setSelectedGrade] = useState<number>(10);
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.SET_BOOK);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  
  // State Maps
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [learnedItems, setLearnedItems] = useState<Record<string, boolean>>({});
  
  const [showAllTranslation, setShowAllTranslation] = useState<boolean>(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Subscription State
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                             voices.find(v => v.name.includes('Zira')) ||
                             voices.find(v => v.lang === 'en-US');
      setVoice(preferredVoice || null);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Memoized Data Selectors
  const currentGradeData = useMemo(() => 
    gradesData.find(g => g.grade === selectedGrade), 
  [selectedGrade]);
  
  const currentUnit = useMemo(() => 
    currentGradeData?.units.find(u => u.unitNumber === selectedUnitNumber), 
  [currentGradeData, selectedUnitNumber]);

  const isLocked = !isSubscribed && selectedUnitNumber >= 4;

  useEffect(() => {
    setSelectedUnitNumber(1);
  }, [selectedGrade]);

  // Callbacks
  const toggleAnswer = useCallback((id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleLearned = useCallback((id: string) => {
    setLearnedItems(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleTranslation = useCallback((id: string) => {
    setRevealedTranslations(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const speakText = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [voice]);

  const handleSubscriptionSuccess = useCallback(() => {
    setIsSubscribed(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-800 sticky top-0 z-20 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                  The Expert
                </h1>
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">High School English Companion</p>
              </div>
            </div>

            {/* Grade Selector */}
            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800 backdrop-blur-sm overflow-hidden">
              {[10, 11, 12].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    selectedGrade === grade
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex space-x-8 mt-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedTab(TabType.SET_BOOK)}
              className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
                selectedTab === TabType.SET_BOOK
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Set Book Questions</span>
            </button>
            <button
              onClick={() => setSelectedTab(TabType.WRITING)}
              className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
                selectedTab === TabType.WRITING
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-5 h-5" />
              <span className="font-medium">Writing Topics</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Units */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-4 sticky top-40 shadow-xl">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 ml-2 flex justify-between items-center">
                <span>Select Unit</span>
                <span className="text-blue-500/50 text-[10px]">G{selectedGrade}</span>
              </h3>
              <div className="space-y-2">
                {currentGradeData?.units.map((unit) => {
                  const isUnitLocked = !isSubscribed && unit.unitNumber >= 4;
                  return (
                    <button
                      key={unit.unitNumber}
                      onClick={() => setSelectedUnitNumber(unit.unitNumber)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                        selectedUnitNumber === unit.unitNumber
                          ? 'bg-slate-800 text-white border border-slate-700 shadow-lg shadow-black/20'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent hover:border-slate-800'
                      }`}
                    >
                      <span className="font-medium truncate pr-2 flex items-center">
                        {isUnitLocked && <Lock className="w-3 h-3 mr-2 text-purple-500" />}
                        <span className={`${isUnitLocked ? 'text-slate-500' : 'text-blue-500'} mr-2 font-mono text-sm opacity-80`}>
                          0{unit.unitNumber}
                        </span> 
                        {unit.title}
                      </span>
                      {selectedUnitNumber === unit.unitNumber && (
                        <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Global Controls */}
              <div className="mt-8 pt-6 border-t border-slate-800 px-2">
                <button 
                  onClick={() => setShowAllTranslation(!showAllTranslation)}
                  className="flex items-center space-x-2 text-sm text-slate-400 hover:text-blue-400 transition-colors w-full group"
                >
                  <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    {showAllTranslation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>
                  <span>{showAllTranslation ? "Hide All Translations" : "Show All Translations"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-2">
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 flex items-center gap-3">
                  {currentUnit?.title}
                  {isLocked && <Lock className="w-6 h-6 text-purple-500/50" />}
                </h2>
                <p className="text-slate-500 text-sm mt-1">Unit {selectedUnitNumber}</p>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800/50">
                <AlertCircle className="w-4 h-4 text-purple-500" />
                <span className="text-slate-400 text-xs font-medium">
                  {isLocked ? 'Locked Content' : (selectedTab === TabType.SET_BOOK 
                    ? `${currentUnit?.questions.length || 0} Questions`
                    : `${currentUnit?.writingTopics.length || 0} Topics`)}
                </span>
              </div>
            </div>

            {isLocked ? (
              <SubscriptionLock onSubscribe={handleSubscriptionSuccess} />
            ) : (
              <>
                {selectedTab === TabType.SET_BOOK && (
                  <div className="grid gap-6">
                    {currentUnit?.questions.map((q) => (
                      <QuestionCard
                        key={q.id}
                        q={q}
                        isLearned={!!learnedItems[q.id]}
                        isRevealed={!!revealedAnswers[q.id]}
                        isTranslated={showAllTranslation || !!revealedTranslations[q.id]}
                        onToggleLearned={toggleLearned}
                        onToggleAnswer={toggleAnswer}
                        onToggleTranslation={toggleTranslation}
                        onSpeak={speakText}
                      />
                    ))}
                  </div>
                )}

                {selectedTab === TabType.WRITING && (
                  <div className="grid grid-cols-1 gap-6">
                     {currentUnit?.writingTopics.map((topic) => (
                       <WritingTopicCard
                         key={topic.id}
                         topic={topic}
                         isTranslated={showAllTranslation || !!revealedTranslations[topic.id]}
                         onToggleTranslation={toggleTranslation}
                         onSpeak={speakText}
                       />
                     ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
