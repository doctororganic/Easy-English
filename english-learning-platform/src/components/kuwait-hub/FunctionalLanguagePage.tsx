/**
 * Functional Language Page
 * Practice functional English with comprehensive MCQ questions organized by topic
 * Following vocabulary learning pattern with simplified interface
 */

import { useState } from 'react';
import { MessageSquare, CheckCircle2, XCircle, RotateCw, Award, BookOpen, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  getAllFunctionalSections, 
  getFunctionalQuestionsBySection,
  FunctionalSection,
  FunctionalQuestion
} from '../../data/functionalQuestions';
import { useDebugLifecycle, useDebugState } from '../../hooks/useDebugState';

export function FunctionalLanguagePage() {
  const [selectedSection, setSelectedSection] = useDebugState<string>('section1', 'FunctionalLanguagePage', 'selectedSection');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showPractice, setShowPractice] = useDebugState<boolean>(false, 'FunctionalLanguagePage', 'showPractice');
  const [userAnswers, setUserAnswers] = useDebugState<Map<number, string>>(new Map(), 'FunctionalLanguagePage', 'userAnswers');
  const [showExplanation, setShowExplanation] = useDebugState<Set<number>>(new Set(), 'FunctionalLanguagePage', 'showExplanation');
  
  // Debug hooks
  const debugLogger = useDebugLifecycle('FunctionalLanguagePage');

  const sections = getAllFunctionalSections();
  const currentSection = sections.find(s => s.id === selectedSection);
  const questions = currentSection ? getFunctionalQuestionsBySection(currentSection.id) : [];
  
  // Debug state changes
  console.log('[Functional] Component render - selectedSection:', selectedSection, 'showPractice:', showPractice, 'sections:', sections.length);

  // Simplified click handler to fix state management issue
  const handlePracticeClick = (sectionId: string) => {
    console.log('🎯 PRACTICE CLICK: Starting practice for section:', sectionId);
    console.log('🎯 PRACTICE CLICK: Current state - selectedSection:', selectedSection, 'showPractice:', showPractice);
    
    // Direct state update without dependency on debug state
    setSelectedSection(sectionId);
    setShowPractice(true);
    
    console.log('🎯 PRACTICE CLICK: States updated successfully');
  };

  // Apply vocabulary pattern: Conditional render
  const renderPracticeInterface = () => {
    console.log('[Functional] renderPracticeInterface - showPractice:', showPractice, 'currentSection:', currentSection?.id);
    if (!showPractice || !currentSection) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">Choose a Section to Practice</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map(section => {
              const sectionQuestions = getFunctionalQuestionsBySection(section.id);
              return (
                <Card 
                  key={section.id} 
                  className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/50"
                  onClick={() => handlePracticeClick(section.id)}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl">{section.title_en}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {section.description_en}
                    </p>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="flex justify-center items-center gap-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {sectionQuestions.length} Questions
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => handlePracticeClick(section.id)}
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      type="button"
                    >
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    // Practice Interface Component
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{currentSection.title_en}</h2>
            <p className="text-muted-foreground">{currentSection.description_en}</p>
          </div>
          <Button 
            onClick={() => setShowPractice(false, 'Back to Sections button')}
            variant="outline"
          >
            Back to Sections
          </Button>
        </div>

        {/* Progress and Score */}
        {questions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const correct = questions.filter(q => userAnswers.get(q.id) === q.correctAnswer).length;
                const percentage = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed Questions:</span>
                      <Badge variant="outline">
                        {userAnswers.size} / {questions.length}
                      </Badge>
                    </div>
                    {userAnswers.size > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Current Score:</span>
                        <Badge variant={percentage >= 70 ? "default" : "secondary"}>
                          {correct} / {questions.length} ({percentage}%)
                        </Badge>
                      </div>
                    )}
                    <Progress value={(userAnswers.size / questions.length) * 100} className="h-2" />
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Questions List */}
        <div className="grid gap-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers.get(question.id);
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === question.correctAnswer;

            // One-click handler: automatically select answer
            const handleAnswerSelect = (questionId: number, answer: string) => {
              const newAnswers = new Map(userAnswers);
              newAnswers.set(questionId, answer);
              setUserAnswers(newAnswers);
            };

            const getTypeColor = (type: string) => {
              const colors = {
                opinion: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                suggestion: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                request: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
                formal: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
                advice: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
              };
              return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            };

            return (
              <Card key={question.id} className={`transition-all ${isAnswered ? (isCorrect ? 'border-green-500 bg-green-50/50 dark:bg-green-950/50' : 'border-red-500 bg-red-50/50 dark:bg-red-950/50') : 'hover:shadow-md'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Q{index + 1}</Badge>
                      <Badge className={getTypeColor(question.type)}>
                        {question.type}
                      </Badge>
                      {isAnswered && (
                        <Badge variant={isCorrect ? "default" : "destructive"}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isAnswered && (
                        isCorrect ? 
                          <CheckCircle2 className="w-5 h-5 text-green-600" /> : 
                          <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-left text-lg">
                    {question.question_en}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {/* Arabic Translation */}
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg" dir="rtl">
                    <p className="text-sm text-muted-foreground">{question.question_ar}</p>
                  </div>

                  {/* Options - One Click to Select and Show Answer */}
                  <div className="space-y-2 mb-4">
                    {['A', 'B', 'C', 'D'].map(letter => {
                      const optionKey = letter as 'A' | 'B' | 'C' | 'D';
                      const option = question.options?.[optionKey] || `Option ${letter}`;
                      if (!option) return null;

                      const isSelected = userAnswer === letter;
                      const isCorrectOption = question.correctAnswer === letter;

                      let buttonClass = 'w-full text-left p-3 border rounded-lg transition-all hover:bg-muted/50 ';
                      if (isAnswered) {
                        if (isCorrectOption) {
                          buttonClass += 'bg-green-50 border-green-500 dark:bg-green-950 text-green-900 dark:text-green-100 ';
                        } else if (isSelected && !isCorrectOption) {
                          buttonClass += 'bg-red-50 border-red-500 dark:bg-red-950 text-red-900 dark:text-red-100 ';
                        } else {
                          buttonClass += 'opacity-60 ';
                        }
                      } else if (isSelected) {
                        buttonClass += 'bg-primary/10 border-primary ';
                      }

                      return (
                        <button
                          key={letter}
                          onClick={() => !isAnswered && handleAnswerSelect(question.id, letter)}
                          disabled={isAnswered}
                          className={buttonClass}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex-1">
                              <span className="font-semibold mr-2">{letter}.</span>
                              {option}
                            </span>
                            {isAnswered && isCorrectOption && (
                              <CheckCircle2 className="text-green-600" size={20} />
                            )}
                            {isAnswered && isSelected && !isCorrectOption && (
                              <XCircle className="text-red-600" size={20} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Status */}
                  {isAnswered && (
                    <div className="space-y-4">
                      {/* Answer Result */}
                      <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-green-800 dark:text-green-200">
                                Correct!
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-600" />
                              <span className="font-medium text-red-800 dark:text-red-200">
                                Incorrect.
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Reset Option */}
                  {isAnswered && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        onClick={() => {
                          const newAnswers = new Map(userAnswers);
                          newAnswers.delete(question.id);
                          setUserAnswers(newAnswers);
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <RotateCw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
            Functional Language Practice
          </h1>
          <p className="text-xl text-muted-foreground">
            Master practical English communication skills
          </p>
        </div>

        {/* Apply vocabulary pattern: Conditional render */}
        {renderPracticeInterface()}
      </div>
    </div>
  );
}