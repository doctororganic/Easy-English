/**
 * Grammar Quiz Component
 * Interactive multiple-choice grammar quiz organized by grade and topic
 */

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCw, Award, BookOpen, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { grammarQuestionsData, getQuestionsByGrade, getQuizzesByGrade, getTotalQuestionsByGrade, GrammarQuestion, GrammarQuiz } from '../../data/grammarQuestions';

interface QuizState {
  questions: GrammarQuestion[];
  currentIndex: number;
  selectedAnswer: string | null;
  showResult: boolean;
  score: number;
  answeredQuestions: Set<number>;
  quizComplete: boolean;
  selectedQuiz: GrammarQuiz | null;
  selectedGrade: number;
}

export function GrammarQuizPage() {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    answeredQuestions: new Set(),
    quizComplete: false,
    selectedQuiz: null,
    selectedGrade: 10
  });

  const [activeTab, setActiveTab] = useState('grade-selection');

  // Initialize with Grade 10 questions
  useEffect(() => {
    initializeGrade(10);
  }, []);

  const initializeGrade = (grade: number) => {
    const questions = getQuestionsByGrade(grade);
    setQuizState(prev => ({
      ...prev,
      selectedGrade: grade,
      questions: questions,
      currentIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      answeredQuestions: new Set(),
      quizComplete: false,
      selectedQuiz: null
    }));
  };

  const startQuiz = (quiz: GrammarQuiz) => {
    setQuizState(prev => ({
      ...prev,
      questions: quiz.questions,
      currentIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      answeredQuestions: new Set(),
      quizComplete: false,
      selectedQuiz: quiz
    }));
    setActiveTab('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    if (quizState.showResult || quizState.answeredQuestions.has(quizState.currentIndex)) return;

    const selectedLetter = String.fromCharCode(65 + answerIndex); // A=65, B=66, etc.
    const isCorrect = selectedLetter === quizState.questions[quizState.currentIndex].answer;

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: selectedLetter,
      showResult: true,
      answeredQuestions: new Set([...prev.answeredQuestions, prev.currentIndex]),
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        showResult: false
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        quizComplete: true
      }));
    }
  };

  const restartQuiz = () => {
    if (quizState.selectedQuiz) {
      startQuiz(quizState.selectedQuiz);
    } else {
      initializeGrade(quizState.selectedGrade);
    }
  };

  const goBackToQuizzes = () => {
    setActiveTab('grade-selection');
    setQuizState(prev => ({
      ...prev,
      selectedQuiz: null,
      questions: getQuestionsByGrade(prev.selectedGrade),
      currentIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      answeredQuestions: new Set(),
      quizComplete: false
    }));
  };

  const currentQuestion = quizState.questions[quizState.currentIndex];
  const optionsArray = currentQuestion ? [
    currentQuestion.options.a,
    currentQuestion.options.b,
    currentQuestion.options.c,
    currentQuestion.options.d
  ] : [];
  const correctAnswerIndex = currentQuestion ? currentQuestion.answer.charCodeAt(0) - 65 : -1;
  const isCorrect = quizState.selectedAnswer === currentQuestion?.answer;
  const progressPercentage = ((quizState.currentIndex + 1) / quizState.questions.length) * 100;

  // Grade selection content
  const GradeSelectionContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
          Grammar Quiz
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose your grade level and start practicing grammar
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[10, 11, 12].map(grade => {
          const totalQuestions = getTotalQuestionsByGrade(grade);
          const quizzes = getQuizzesByGrade(grade);
          
          return (
            <Card key={grade} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => {
              initializeGrade(grade);
              setActiveTab('quizzes');
            }}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Grade {grade}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {quizzes.length} Quizzes
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {totalQuestions} Questions
                  </Badge>
                </div>
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  Start Grade {grade}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Quiz selection content
  const QuizSelectionContent = () => {
    const quizzes = getQuizzesByGrade(quizState.selectedGrade);
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gradient-purple-blue">
            Grade {quizState.selectedGrade} Grammar Quizzes
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose a quiz topic to start practicing
          </p>
          <Button onClick={() => setActiveTab('grade-selection')} variant="outline" className="mt-4">
            ← Back to Grade Selection
          </Button>
        </div>

        <div className="grid gap-6">
          {quizzes.map(quiz => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">{quiz.topic}</p>
                  </div>
                  <Badge variant="secondary">{quiz.questions.length} Questions</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Practice with {quiz.questions.length} multiple choice questions
                  </p>
                  <Button onClick={() => startQuiz(quiz)} className="group-hover:bg-primary transition-colors">
                    Start Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Quiz completion content
  if (quizState.quizComplete) {
    const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Award className="mx-auto mb-4 text-primary" size={64} />
              <CardTitle className="text-3xl text-gradient-purple-blue">
                Quiz Complete!
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-2">
                {quizState.selectedQuiz?.title}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-6xl font-bold text-primary mb-2">
                  {percentage}%
                </div>
                <p className="text-xl text-muted-foreground">
                  You scored {quizState.score} out of {quizState.questions.length}
                </p>
              </div>

              <div className="space-y-2">
                {percentage >= 90 && (
                  <Badge className="text-lg px-4 py-2" variant="default">
                    Excellent! Outstanding performance!
                  </Badge>
                )}
                {percentage >= 70 && percentage < 90 && (
                  <Badge className="text-lg px-4 py-2" variant="secondary">
                    Good job! Keep practicing!
                  </Badge>
                )}
                {percentage < 70 && (
                  <Badge className="text-lg px-4 py-2" variant="outline">
                    Keep trying! Practice makes perfect!
                  </Badge>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={restartQuiz} size="lg">
                  <RotateCw className="mr-2" size={20} />
                  Retry Quiz
                </Button>
                <Button onClick={goBackToQuizzes} variant="outline" size="lg">
                  Choose Another Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Active quiz content
  const ActiveQuizContent = () => {
    if (!currentQuestion) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gradient-purple-blue">
              {quizState.selectedQuiz?.title}
            </h2>
            <p className="text-muted-foreground">{quizState.selectedQuiz?.topic}</p>
          </div>
          <Button onClick={goBackToQuizzes} variant="outline">
            ← Back to Quizzes
          </Button>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <Badge variant="secondary">
                  Question {quizState.currentIndex + 1} of {quizState.questions.length}
                </Badge>
                <Badge variant="outline">
                  Score: {quizState.score} / {quizState.answeredQuestions.size}
                </Badge>
              </div>
              <Button onClick={restartQuiz} variant="ghost" size="sm">
                <RotateCw className="mr-2" size={16} />
                Restart
              </Button>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="unit-card">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Options */}
            {optionsArray.map((option, index) => {
              const isSelected = quizState.selectedAnswer === String.fromCharCode(65 + index);
              const isCorrectOption = index === correctAnswerIndex;
              
              let optionClass = 'quiz-option w-full text-left p-4 border rounded-lg transition-all hover:bg-muted/50';
              if (quizState.showResult) {
                if (isCorrectOption) {
                  optionClass += ' bg-green-50 border-green-500 dark:bg-green-950';
                } else if (isSelected && !isCorrectOption) {
                  optionClass += ' bg-red-50 border-red-500 dark:bg-red-950';
                }
              } else {
                optionClass += ' cursor-pointer';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={quizState.showResult}
                  className={optionClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1 text-left">
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </span>
                    {quizState.showResult && isCorrectOption && (
                      <CheckCircle2 className="text-green-600" size={24} />
                    )}
                    {quizState.showResult && isSelected && !isCorrectOption && (
                      <XCircle className="text-red-600" size={24} />
                    )}
                  </div>
                </button>
              );
            })}

            {/* Result Message */}
            {quizState.showResult && (
              <div className={`p-4 rounded-lg border-2 ${
                isCorrect 
                  ? 'bg-green-50 border-green-500 dark:bg-green-950' 
                  : 'bg-red-50 border-red-500 dark:bg-red-950'
              }`}>
                <p className={`font-semibold ${
                  isCorrect 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {currentQuestion.rule && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    <strong>Rule:</strong> {currentQuestion.rule}
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {quizState.showResult && (
              <Button onClick={nextQuestion} size="lg" className="w-full mt-4">
                {quizState.currentIndex < quizState.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="grade-selection">
            <GradeSelectionContent />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <QuizSelectionContent />
          </TabsContent>
          
          <TabsContent value="quiz">
            <ActiveQuizContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}