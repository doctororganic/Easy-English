/**
 * Setbook Questions Component
 * Displays setbook questions with bilingual answers and organized by grade and unit
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookMarked, Eye, EyeOff, Languages, Users, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { 
  getSetbookDataByGrade, 
  getAllSetbookGrades, 
  getTotalQuestionsByGrade, 
  getUnitsByGrade,
  SetbookGradeData,
  SetbookUnit,
  SetbookQuestion
} from '../../data/setbookQuestions';
import { useDebugLifecycle, useDebugState, useDebugEventHandler, useDebugNavigation } from '../../hooks/useDebugState';

interface SetbookQuestionsPageProps {
  initialGrade?: number;
}

export function SetbookQuestionsPage({ initialGrade = 0 }: SetbookQuestionsPageProps) {
  const [selectedGrade, setSelectedGrade] = useDebugState<number>(initialGrade, 'SetbookQuestionsPage', 'selectedGrade');
  const [selectedUnit, setSelectedUnit] = useDebugState<string>('', 'SetbookQuestionsPage', 'selectedUnit');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [showArabic, setShowArabic] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useDebugState<string>(initialGrade > 0 ? 'questions' : 'grade-selection', 'SetbookQuestionsPage', 'activeTab');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug hooks
  const debugLogger = useDebugLifecycle('SetbookQuestionsPage');
  const debugNavigate = useDebugNavigation(navigate, 'SetbookQuestionsPage');

  // Update state when initialGrade prop changes
  useEffect(() => {
    if (initialGrade > 0) {
      setSelectedGrade(initialGrade);
      const newUnits = getUnitsByGrade(initialGrade);
      if (newUnits.length > 0) {
        setSelectedUnit(newUnits[0].id);
      }
      setActiveTab('questions');
    }
  }, [initialGrade]);

  // Update URL when grade changes (for direct navigation)
  useEffect(() => {
    if (selectedGrade > 0 && location.pathname !== `/setbook/grade${selectedGrade}`) {
      navigate(`/setbook/grade${selectedGrade}`, { replace: true });
    }
  }, [selectedGrade, location.pathname, navigate]);

  const gradeData = getSetbookDataByGrade(selectedGrade);
  const availableGrades = getAllSetbookGrades();
  const units = getUnitsByGrade(selectedGrade);
  const selectedUnitData = units.find(unit => unit.id === selectedUnit);


  const toggleQuestionExpansion = (questionId: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const selectGrade = (grade: number) => {
    debugLogger.logEvent('selectGrade:click', { grade, currentSelectedGrade: selectedGrade });
    // Update local state immediately for better UX
    setSelectedGrade(grade);
    const newUnits = getUnitsByGrade(grade);
    if (newUnits.length > 0) {
      setSelectedUnit(newUnits[0].id);
    } else {
      setSelectedUnit('');
    }
    setActiveTab('questions');
    
    // Then navigate to update URL
    const targetPath = `/setbook/grade${grade}`;
    debugNavigate(targetPath);
  };

  // Auto-select first unit when grade changes or when selectedUnit is empty
  useEffect(() => {
    if (selectedGrade > 0 && units.length > 0 && !selectedUnit) {
      setSelectedUnit(units[0].id);
    }
  }, [selectedGrade, units, selectedUnit]);

  const selectUnit = (unitId: string) => {
    setSelectedUnit(unitId);
    setExpandedQuestions(new Set()); // Reset expanded questions when changing units
  };

  // Grade selection content
  const GradeSelectionContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
          Set-book Questions
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose your grade level and practice with set-book questions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {availableGrades.map(grade => {
          const totalQuestions = getTotalQuestionsByGrade(grade);
          const gradeData = getSetbookDataByGrade(grade);
          
          return (
            <Card 
              key={grade} 
              className={`hover:shadow-lg transition-all cursor-pointer group ${
                selectedGrade === grade ? 'ring-2 ring-primary' : ''
              }`}
              onClick={(e) => {
                debugLogger.logEvent('gradeCard:click', { grade, event: { 
                  target: (e.target as HTMLElement).tagName, 
                  currentTarget: (e.currentTarget as HTMLElement).tagName,
                  isTrusted: e.isTrusted,
                  bubbles: e.bubbles
                }});
                e.preventDefault();
                e.stopPropagation();
                selectGrade(grade);
              }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                  selectedGrade === grade 
                    ? 'bg-primary text-white' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                }`}>
                  <Users className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">Grade {grade}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {gradeData?.title}
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <BookMarked className="w-4 h-4" />
                    {getUnitsByGrade(grade).length} Units
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {totalQuestions} Questions
                  </Badge>
                </div>
                <Button 
                  onClick={() => {
                    console.log('[Setbook] Select Grade clicked:', grade);
                    selectGrade(grade);
                  }}
                  className={`w-full transition-colors ${
                    selectedGrade === grade 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'group-hover:bg-primary group-hover:text-white'
                  }`}
                  type="button"
                >
                  {selectedGrade === grade ? 'Selected' : `Select Grade ${grade}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Units and questions content
  const UnitsAndQuestionsContent = () => {
    if (!gradeData || !selectedUnitData) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Please select a grade and unit to view questions</p>
          <Button 
            onClick={() => navigate('/setbook')}
            className="mt-4"
          >
            Select Grade
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gradient-purple-blue">
              Grade {selectedGrade}
            </h2>
            <p className="text-lg text-muted-foreground mt-1">
              {selectedUnitData.title}
            </p>
          </div>
          <Button 
            onClick={() => navigate('/setbook')}
            variant="outline"
          >
            ← Change Grade
          </Button>
        </div>

        {/* Unit Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {units.map(unit => (
                <button
                  key={unit.id}
                  onClick={() => selectUnit(unit.id)}
                  className={`p-4 border rounded-lg text-left transition-all hover:bg-muted/50 ${
                    selectedUnit === unit.id ? 'bg-primary/10 border-primary' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{unit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {unit.questions.length} questions
                      </p>
                    </div>
                    {selectedUnit === unit.id && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {selectedUnitData.questions.map((question, index) => {
            const isExpanded = expandedQuestions.has(question.id);
            
            return (
              <Card key={question.id} className="overflow-hidden">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <button
                      onClick={() => toggleQuestionExpansion(question.id)}
                      className="w-full"
                    >
                      <CardHeader className="hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline">Q{index + 1}</Badge>
                              <CardTitle className="text-lg">{question.unit}</CardTitle>
                            </div>
                            <p className="text-base font-medium">
                              {question.question_en}
                            </p>
                            {showArabic && (
                              <p className="text-sm text-muted-foreground mt-1" dir="rtl">
                                {question.question_ar}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Answers:</h4>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => setShowArabic(!showArabic)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Languages className="w-4 h-4" />
                              {showArabic ? 'English Only' : 'Show Arabic'}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {question.answers.map((answer, answerIndex) => (
                            <div 
                              key={answerIndex}
                              className="p-4 bg-muted/50 rounded-lg border"
                            >
                              <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="mt-0.5">
                                  {String.fromCharCode(65 + answerIndex)}
                                </Badge>
                                <div className="flex-1">
                                  <p className="text-sm font-medium mb-1">
                                    {answer.english}
                                  </p>
                                  {showArabic && (
                                    <p className="text-sm text-muted-foreground" dir="rtl">
                                      {answer.arabic}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {/* Practice Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Study Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  📖 Read Carefully
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Read each question carefully and try to answer before revealing the answers.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  🌐 Use Arabic Translation
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Toggle Arabic translation to better understand complex questions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Custom Tab Implementation */}
        <div className="w-full">
          <div className="grid w-full grid-cols-2 border-b">
            <button
              onClick={() => setActiveTab('grade-selection')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'grade-selection'
                  ? 'bg-background text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Grade Selection
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              disabled={selectedGrade === 0}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'questions'
                  ? 'bg-background text-foreground border-b-2 border-primary'
                  : selectedGrade === 0
                  ? 'text-muted-foreground opacity-50 cursor-not-allowed'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Units & Questions
            </button>
          </div>
          
          <div className="mt-4">
            {activeTab === 'grade-selection' && <GradeSelectionContent />}
            {activeTab === 'questions' && (
              selectedGrade === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Please select a grade first</p>
                  <Button onClick={() => selectGrade(10)}>
                    Select Grade 10
                  </Button>
                </div>
              ) : (
                <UnitsAndQuestionsContent />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}