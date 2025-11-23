import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Search, Volume2, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { vocabularyData } from '../../data/vocabulary';

import { useLanguage, getLocalizedText } from '../../contexts/LanguageContext';

export function VocabularyLearningPage() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [selectedUnit, setSelectedUnit] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedGrade, setSelectedGrade] = useState<'grade10' | 'grade11' | 'grade12'>('grade10');

  // Get vocabulary data for current grade
  const currentGradeData = vocabularyData.find(grade => 
    (selectedGrade === 'grade10' && grade.grade === 10) ||
    (selectedGrade === 'grade11' && grade.grade === 11) || 
    (selectedGrade === 'grade12' && grade.grade === 12)
  );
  
  // Build unit ID more safely
  const getGradeNumber = () => {
    if (selectedGrade === 'grade10') return 10;
    if (selectedGrade === 'grade11') return 11;
    return 12;
  };
  
  // Build target unit ID
  const targetUnitId = `grade${getGradeNumber()}-unit${selectedUnit}`;
  
  // Find the target unit
  const targetUnit = currentGradeData?.units.find(unit => unit.id === targetUnitId);
  
  // Effect to validate and reset unit when grade changes
  useEffect(() => {
    if (currentGradeData?.units?.length > 0) {
      const availableUnitIds = currentGradeData.units.map(unit => {
        const match = unit.id.match(/unit(\d+)/);
        return match ? match[1] : null;
      }).filter(Boolean);
      
      // If current selected unit doesn't exist in this grade, reset to first unit
      if (!availableUnitIds.includes(selectedUnit)) {
        const firstUnit = currentGradeData.units[0];
        const unitMatch = firstUnit.id.match(/unit(\d+)/);
        if (unitMatch) {
          setSelectedUnit(unitMatch[1]);
        }
      }
    }
  }, [selectedGrade, currentGradeData, selectedUnit]);
  
  // Get current unit data, fallback to first available unit if current unit doesn't exist
  const getCurrentUnitData = () => {
    if (targetUnit) {
      return targetUnit.words;
    }
    
    // If target unit doesn't exist, return empty array
    // The useEffect above will handle resetting the selected unit
    return [];
  };
  
  const currentUnitData = getCurrentUnitData();

  // Filter vocabulary based on search
  const filteredVocabulary = currentUnitData.filter(item => {
    if (searchQuery.trim() === '') return true;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    
    return (
      item.word.toLowerCase().includes(searchTerm) ||
      (item.englishMeaning && item.englishMeaning.toLowerCase().includes(searchTerm)) ||
      (item.arabicMeaning && item.arabicMeaning.includes(searchQuery)) ||
      (item.sentenceExample && item.sentenceExample.toLowerCase().includes(searchTerm)) ||
      (item.partOfSpeech && item.partOfSpeech.toLowerCase().includes(searchTerm))
    );
  });

  // Bilingual labels
  const labels = {
    pageTitle: getLocalizedText('Vocabulary Learning', 'تعلم المفردات', language),
    pageSubtitle: getLocalizedText(
      'Expand your English vocabulary with words, meanings, and examples for Kuwaiti students',
      'توسيع مفرداتك الإنجليزية بكلمات ومعاني وأمثلة للطلاب الكويتيين',
      language
    ),
    selectUnit: getLocalizedText('Select Unit', 'اختيار الوحدة', language),
    unitPlaceholder: getLocalizedText('Choose a unit', 'اختر وحدة', language),
    searchWords: getLocalizedText('Search Words', 'البحث عن الكلمات', language),
    searchPlaceholder: getLocalizedText(
      'Search by word, meaning, Arabic translation, or part of speech...',
      'البحث بكلمة أو معنى أو ترجمة عربية أو نوع الكلمة...',
      language
    ),
    wordsCount: getLocalizedText('words', 'كلمة', language),
    grade10: getLocalizedText('Grade 10', 'الصف العاشر', language),
    grade11: getLocalizedText('Grade 11', 'الصف الحادي عشر', language),
    grade12: getLocalizedText('Grade 12', 'الصف الثاني عشر', language),
    unitLabel: getLocalizedText('Unit', 'الوحدة', language),
    filteredResults: getLocalizedText('Filtered results', 'نتائج مفلترة', language),
    noWordsFound: getLocalizedText('No words found matching your search', 'لم يتم العثور على كلمات تطابق بحثك', language),
    noVocabularyAvailable: getLocalizedText('No vocabulary available for this unit', 'لا توجد مفردات متاحة لهذه الوحدة', language),
    listen: getLocalizedText('Listen', 'استمع', language),
    showExample: getLocalizedText('Show Example', 'عرض المثال', language),
    hideExample: getLocalizedText('Hide Example', 'إخفاء المثال', language),
    exampleSentence: getLocalizedText('Example Sentence:', 'جملة المثال:', language),
    translation: getLocalizedText('Translation:', 'الترجمة:', language),
  };

  // Toggle expanded state
  const toggleExpanded = (wordKey: string) => {
    setExpandedItems(prevExpanded => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(wordKey)) {
        newExpanded.delete(wordKey);
      } else {
        newExpanded.add(wordKey);
      }
      return newExpanded;
    });
  };

  // Clear expanded items when unit or grade changes
  useEffect(() => {
    setExpandedItems(new Set());
  }, [selectedGrade, selectedUnit]);

  // Audio generation for words
  const playWordAudio = async (word: string, meaning: string, example: string) => {
    try {
      const textToSpeak = `${word}. ${meaning}. For example: ${example}`;
      
      // Use browser's speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.8; // Slightly slower for learning
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
      } else {
        // Audio playback initiated
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Get available units for current grade
  const availableUnits = currentGradeData?.units.map((unit, index) => {
    // Extract unit number from ID more safely
    const unitMatch = unit.id.match(/unit(\d+)/);
    const unitNumber = unitMatch ? unitMatch[1] : (index + 1).toString();
    
    return {
      key: unitNumber,
      label: unit.title
    };
  }) || [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-4xl font-bold text-gradient-purple-blue ${isRTL ? 'font-arabic' : ''}`}>
              {labels.pageTitle}
            </h1>
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
          <p className={`text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
            {labels.pageSubtitle}
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Unit Selector */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {labels.selectUnit}
                </label>
                <Select 
                  value={selectedUnit} 
                  onValueChange={(value) => {
                    setSelectedUnit(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={labels.unitPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUnits.map(unit => (
                      <SelectItem key={unit.key} value={unit.key}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {labels.searchWords}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder={labels.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-4 text-sm">
              <Badge variant="secondary">
                <BookOpen className="mr-1" size={16} />
                {filteredVocabulary.length} {labels.wordsCount}
              </Badge>
              <Badge variant="outline">
                {selectedGrade === 'grade10' ? labels.grade10 : selectedGrade === 'grade11' ? labels.grade11 : labels.grade12} - {labels.unitLabel} {selectedUnit}
              </Badge>
              {searchQuery && (
                <Badge variant="outline">
                  {labels.filteredResults}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grade Buttons */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedGrade === 'grade10' 
                  ? 'bg-purple-600 text-white' 
                  : 'border border-purple-200 bg-white text-purple-600 hover:bg-purple-50'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selectedGrade !== 'grade10') {
                  setSelectedGrade('grade10');
                  // Reset unit to first available unit for grade 10
                  const grade10Data = vocabularyData.find(g => g.grade === 10);
                  if (grade10Data?.units?.length > 0) {
                    const firstUnit = grade10Data.units[0];
                    const unitMatch = firstUnit.id.match(/unit(\d+)/);
                    const newUnit = unitMatch ? unitMatch[1] : '1';
                    setSelectedUnit(newUnit);
                  }
                }
              }}
            >
              {labels.grade10}
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedGrade === 'grade11' 
                  ? 'bg-purple-600 text-white' 
                  : 'border border-purple-200 bg-white text-purple-600 hover:bg-purple-50'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selectedGrade !== 'grade11') {
                  setSelectedGrade('grade11');
                  // Reset unit to first available unit for grade 11
                  const grade11Data = vocabularyData.find(g => g.grade === 11);
                  if (grade11Data?.units?.length > 0) {
                    const firstUnit = grade11Data.units[0];
                    const unitMatch = firstUnit.id.match(/unit(\d+)/);
                    const newUnit = unitMatch ? unitMatch[1] : '1';
                    setSelectedUnit(newUnit);
                  }
                }
              }}
            >
              {labels.grade11}
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedGrade === 'grade12' 
                  ? 'bg-purple-600 text-white' 
                  : 'border border-purple-200 bg-white text-purple-600 hover:bg-purple-50'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selectedGrade !== 'grade12') {
                  setSelectedGrade('grade12');
                  // Reset unit to first available unit for grade 12
                  const grade12Data = vocabularyData.find(g => g.grade === 12);
                  if (grade12Data?.units?.length > 0) {
                    const firstUnit = grade12Data.units[0];
                    const unitMatch = firstUnit.id.match(/unit(\d+)/);
                    const newUnit = unitMatch ? unitMatch[1] : '1';
                    setSelectedUnit(newUnit);
                  }
                }
              }}
            >
              {labels.grade12}
            </button>
          </div>
        </div>

        {/* Vocabulary Content */}
        <div className="space-y-4">
          {filteredVocabulary.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="space-y-4">
                  <p className={`text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                    {searchQuery ? labels.noWordsFound : labels.noVocabularyAvailable}
                  </p>
                  {!searchQuery && (
                    <div className="text-sm text-muted-foreground">
                      <p>Grade: {selectedGrade === 'grade10' ? labels.grade10 : selectedGrade === 'grade11' ? labels.grade11 : labels.grade12}</p>
                      <p>Unit: {selectedUnit}</p>
                      <p>Available units: {availableUnits.map(u => u.key).join(', ') || 'None'}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredVocabulary.map((item, index) => {
              const wordKey = `${selectedGrade}-${selectedUnit}-${index}`;
              const isExpanded = expandedItems.has(wordKey);
              

              
              return (
                <Card key={index} className="vocabulary-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Word and Part of Speech */}
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-primary">
                            {item.word}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {item.partOfSpeech}
                          </Badge>
                        </div>

                        {/* English Meaning */}
                        <p className="text-lg mb-2 text-foreground">
                          {item.englishMeaning || 'No definition available'}
                        </p>

                        {/* Arabic Translation */}
                        <div className="mb-3 rtl">
                          <span className="text-xl text-secondary font-semibold">
                            {item.arabicMeaning || 'لا يوجد ترجمة'}
                          </span>
                        </div>

                        {/* Audio Button and Expand */}
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              playWordAudio(item.word, item.englishMeaning, item.sentenceExample);
                            }}
                          >
                            <Volume2 className="mr-1" size={16} />
                            {labels.listen}
                          </Button>
                          
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleExpanded(wordKey);
                            }}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="mr-1" size={16} />
                                {labels.hideExample}
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-1" size={16} />
                                {labels.showExample}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Example Content - Show when expanded */}
                    {isExpanded && (
                      <div className="mt-4 bg-accent/50 rounded-lg p-4 border border-border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                              {labels.exampleSentence}
                            </h4>
                            <p className={`text-foreground italic mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                              {item.sentenceExample || `Example: The word "${item.word}" is used in various contexts.`}
                            </p>
                            <div className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                              <strong>{labels.translation}</strong> {item.arabicMeaning || 'لا يوجد ترجمة'}
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              playWordAudio(item.word, item.englishMeaning, item.sentenceExample);
                            }}
                            className="ml-2"
                          >
                            <Volume2 size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}