/**
 * Expert Companion Page
 * Integrated from Khaled-K-E into Kuwait English Hub
 * Provides set book questions and writing topics with translation and text-to-speech
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BookOpen, PenTool, Volume2, Eye, EyeOff, ChevronRight, GraduationCap, AlertCircle, Languages, Globe, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { QuestionCard } from './QuestionCard';
import { WritingTopicCard } from './WritingTopicCard';
import { gradesData } from '../../data/expert-companion-data';
import { TabType, QuestionItem, WritingTopic } from '../../types/expert-companion-types';
import { useLanguage, getLocalizedText } from '../../contexts/LanguageContext';

interface SubscriptionLockProps {
  onSubscribe: () => void;
}

const SubscriptionLock = ({ onSubscribe }: SubscriptionLockProps) => {
  const { language, isRTL } = useLanguage();
  
  const handleSubscribe = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScdZUjA4nsWqdFKXLDLi15EF7oLeTtpqbxQl7FDqAQZ81agSQ/viewform?usp=header", "_blank");
    onSubscribe();
  };

  return (
    <Card className="col-span-full flex flex-col items-center justify-center py-16 px-6 text-center space-y-8">
      <CardContent className="space-y-8">
        <div className="p-5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-xl shadow-purple-500/20 mx-auto w-fit">
          <Lock className="w-10 h-10 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
            {getLocalizedText('Premium Content', 'محتوى حصري للمشتركين', language)}
          </h3>
        </div>

        <div className="grid gap-4 max-w-3xl w-full text-left">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-green-500/10 rounded-full text-green-500 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {getLocalizedText(
                      'Subscribe to get full content and questions with answers.',
                      'اشترك للحصول على المحتوى الكامل وبنك الأسئلة المجاب عنه.',
                      language
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-blue-500/10 rounded-full text-blue-500 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {getLocalizedText(
                      'Take all services and immediate translation with reading (no need to open extra sites).',
                      'تمتع بكافة الخدمات: ترجمة فورية وقراءة صوتية (لن تحتاج لمواقع خارجية).',
                      language
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-purple-500/10 rounded-full text-purple-500 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {getLocalizedText(
                      'Get full content (no need for extra notes, books, or PDFs).',
                      'محتوى شامل يغنيك عن المذكرات والكتب الخارجية وملفات الـ PDF.',
                      language
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-pink-500/10 rounded-full text-pink-500 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {getLocalizedText(
                      'Save your time, money, and effort.',
                      'وفر وقتك ومالك وجهدك.',
                      language
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleSubscribe}
          size="lg"
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
        >
          {getLocalizedText('Subscribe Now', 'اشترك الآن', language)}
        </Button>
      </CardContent>
    </Card>
  );
};

export function ExpertCompanionPage() {
  const { language, isRTL } = useLanguage();
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
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem('expert-companion-subscribed') === 'true';
  });

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
    localStorage.setItem('expert-companion-subscribed', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ${isRTL ? 'font-arabic' : ''}`}>
                  {getLocalizedText('The Expert', 'الخبير', language)}
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                  {getLocalizedText('High School English Companion', 'رفيق اللغة الإنجليزية للمرحلة الثانوية', language)}
                </p>
              </div>
            </div>

            {/* Grade Selector */}
            <div className="flex bg-muted/50 p-1 rounded-xl border backdrop-blur-sm overflow-hidden">
              {[10, 11, 12].map((grade) => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedGrade(grade)}
                  className="px-6"
                >
                  {getLocalizedText(`Grade ${grade}`, `الصف ${grade}`, language)}
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-4">
            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as TabType)}>
              <TabsList>
                <TabsTrigger value={TabType.SET_BOOK} className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {getLocalizedText('Set Book Questions', 'أسئلة الكتاب المقرر', language)}
                </TabsTrigger>
                <TabsTrigger value={TabType.WRITING} className="flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  {getLocalizedText('Writing Topics', 'مواضيع الكتابة', language)}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Units */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="sticky top-40">
              <CardContent className="p-4">
                <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-4 flex justify-between items-center">
                  <span>{getLocalizedText('Select Unit', 'اختر الوحدة', language)}</span>
                  <Badge variant="outline" className="text-[10px]">G{selectedGrade}</Badge>
                </h3>
                <div className="space-y-2">
                  {currentGradeData?.units.map((unit) => {
                    const isUnitLocked = !isSubscribed && unit.unitNumber >= 4;
                    return (
                      <Button
                        key={unit.unitNumber}
                        variant={selectedUnitNumber === unit.unitNumber ? "default" : "outline"}
                        className="w-full justify-between"
                        onClick={() => setSelectedUnitNumber(unit.unitNumber)}
                      >
                        <span className="flex items-center truncate">
                          {isUnitLocked && <Lock className="w-3 h-3 mr-2" />}
                          <span className="font-mono text-sm opacity-80 mr-2">
                            0{unit.unitNumber}
                          </span> 
                          {unit.title}
                        </span>
                        {selectedUnitNumber === unit.unitNumber && (
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        )}
                      </Button>
                    );
                  })}
                </div>
                
                {/* Global Controls */}
                <div className="mt-8 pt-6 border-t">
                  <Button 
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setShowAllTranslation(!showAllTranslation)}
                  >
                    {showAllTranslation ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                    {getLocalizedText(
                      showAllTranslation ? "Hide All Translations" : "Show All Translations",
                      showAllTranslation ? "إخفاء جميع الترجمات" : "إظهار جميع الترجمات",
                      language
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-end border-b pb-4 gap-2">
              <div>
                <h2 className={`text-3xl font-bold flex items-center gap-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {currentUnit?.title}
                  {isLocked && <Lock className="w-6 h-6 text-muted-foreground" />}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {getLocalizedText(`Unit ${selectedUnitNumber}`, `الوحدة ${selectedUnitNumber}`, language)}
                </p>
              </div>
              <Badge variant="secondary" className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {isLocked 
                  ? getLocalizedText('Locked Content', 'محتوى مقفل', language)
                  : selectedTab === TabType.SET_BOOK 
                    ? getLocalizedText(`${currentUnit?.questions.length || 0} Questions`, `${currentUnit?.questions.length || 0} سؤال`, language)
                    : getLocalizedText(`${currentUnit?.writingTopics.length || 0} Topics`, `${currentUnit?.writingTopics.length || 0} موضوع`, language)}
              </Badge>
            </div>

            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as TabType)}>
              <TabsContent value={TabType.SET_BOOK} className="mt-6">
                {isLocked ? (
                  <SubscriptionLock onSubscribe={handleSubscriptionSuccess} />
                ) : (
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
              </TabsContent>

              <TabsContent value={TabType.WRITING} className="mt-6">
                {isLocked ? (
                  <SubscriptionLock onSubscribe={handleSubscriptionSuccess} />
                ) : (
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
