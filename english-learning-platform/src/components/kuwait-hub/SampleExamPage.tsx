/**
 * Kuwait English Hub - Sample Exam System
 * 
 * Features:
 * - 23-question MCQ exams per grade (8 vocab + 5 setbook + 5 grammar + 5 functional)
 * - Optional countdown timer (45 minutes default)
 * - Question navigation with mark for review
 * - Auto-scoring with detailed results
 * - Progress tracking and best scores
 * - Retake functionality
 * - Voice reading support
 */

import { useState, useEffect, useCallback } from 'react'
import { 
  Clock, Play, Pause, RotateCcw, CheckCircle, XCircle, 
  BookOpen, Volume2, ChevronLeft, ChevronRight, Flag,
  Trophy, Award, Target
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import CurriculumDataService from '../../services/curriculumDataService'
import VoiceService from '../../services/voiceService'
import type { GradeLevel, VocabularyItem, SetbookQuestion, GrammarQuestion, FunctionalLanguageQuestion } from '../../types/curriculum'

// Exam question type that unifies different question types
interface ExamQuestion {
  id: string
  type: 'vocabulary' | 'setbook' | 'grammar' | 'functional'
  question: string
  options: string[]
  correctAnswer: number // Index of correct option
  explanation?: string
  sourceQuestion?: any
}

interface ExamState {
  questions: ExamQuestion[]
  currentQuestionIndex: number
  answers: (number | null)[]
  markedForReview: boolean[]
  timeRemaining: number // in seconds
  timerActive: boolean
  examStarted: boolean
  examCompleted: boolean
}

interface ExamResult {
  grade: GradeLevel
  score: number
  totalQuestions: number
  percentage: number
  correctAnswers: number
  date: string
  timeSpent: number
}

export function SampleExamPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(10)
  const [examDuration, setExamDuration] = useState(45) // minutes
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [examState, setExamState] = useState<ExamState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    markedForReview: [],
    timeRemaining: 45 * 60, // 45 minutes in seconds
    timerActive: false,
    examStarted: false,
    examCompleted: false
  })

  const [showResults, setShowResults] = useState(false)
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  const [bestScores, setBestScores] = useState<Record<GradeLevel, ExamResult | null>>({
    10: null,
    11: null,
    12: null
  })

  const curriculumService = CurriculumDataService
  const voiceService = VoiceService

  // Load best scores from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('examBestScores')
    if (saved) {
      setBestScores(JSON.parse(saved))
    }
  }, [])

  // Timer countdown
  useEffect(() => {
    if (!examState.timerActive || examState.examCompleted) return

    const interval = setInterval(() => {
      setExamState(prev => {
        const newTime = prev.timeRemaining - 1
        
        // Auto-submit when time runs out
        if (newTime <= 0) {
          handleSubmitExam()
          return { ...prev, timeRemaining: 0, timerActive: false }
        }
        
        return { ...prev, timeRemaining: newTime }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [examState.timerActive, examState.examCompleted])

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Generate exam questions from curriculum data
  const generateExam = useCallback(async (grade: GradeLevel) => {
    setLoading(true)
    setError(null)

    try {
      const data = await curriculumService.loadAllData()
      const gradeData = data[`grade${grade}` as keyof typeof data]
      const functionalData = data.functionalLanguage

      // Collect all available questions
      const vocabItems: VocabularyItem[] = []
      const setbookQuestions: SetbookQuestion[] = []
      const grammarQuestions: GrammarQuestion[] = []

      // Extract from curriculum units
      if (gradeData && 'units' in gradeData) {
        gradeData.units.forEach(unit => {
          if (unit.vocabulary) vocabItems.push(...unit.vocabulary)
          if (unit.setbookQuestions) setbookQuestions.push(...unit.setbookQuestions)
          if (unit.grammar) grammarQuestions.push(...unit.grammar)
        })
      }

      // Extract all functional language questions from blocks
      const allFunctionalQuestions: FunctionalLanguageQuestion[] = []
      functionalData.questionBlocks.forEach(block => {
        allFunctionalQuestions.push(...block.questions)
      })

      // Generate exam questions
      const examQuestions: ExamQuestion[] = []
      let questionId = 1

      // 8 Vocabulary questions (converted to MCQ)
      const shuffledVocab = shuffleArray([...vocabItems])
      for (let i = 0; i < Math.min(8, shuffledVocab.length); i++) {
        const item = shuffledVocab[i]
        examQuestions.push(createVocabularyQuestion(item, questionId++, vocabItems))
      }

      // 5 Setbook questions (converted to MCQ)
      const shuffledSetbook = shuffleArray([...setbookQuestions])
      for (let i = 0; i < Math.min(5, shuffledSetbook.length); i++) {
        const q = shuffledSetbook[i]
        examQuestions.push(createSetbookQuestion(q, questionId++))
      }

      // 5 Grammar questions
      const shuffledGrammar = shuffleArray([...grammarQuestions])
      for (let i = 0; i < Math.min(5, shuffledGrammar.length); i++) {
        const q = shuffledGrammar[i]
        examQuestions.push(createGrammarQuestion(q, questionId++))
      }

      // 5 Functional Language questions
      const shuffledFunctional = shuffleArray([...allFunctionalQuestions])
      for (let i = 0; i < Math.min(5, shuffledFunctional.length); i++) {
        const q = shuffledFunctional[i]
        examQuestions.push(createFunctionalQuestion(q, questionId++))
      }

      // Shuffle all questions for randomness
      const finalQuestions = shuffleArray(examQuestions)

      setExamState({
        questions: finalQuestions,
        currentQuestionIndex: 0,
        answers: new Array(finalQuestions.length).fill(null),
        markedForReview: new Array(finalQuestions.length).fill(false),
        timeRemaining: examDuration * 60,
        timerActive: true,
        examStarted: true,
        examCompleted: false
      })

      setShowResults(false)
      setLoading(false)
    } catch (err) {
      console.error('Error generating exam:', err)
      setError('Failed to generate exam. Please try again.')
      setLoading(false)
    }
  }, [examDuration])

  // Create vocabulary MCQ from vocabulary item
  const createVocabularyQuestion = (item: VocabularyItem, id: number, allVocab: VocabularyItem[]): ExamQuestion => {
    const correctAnswer = item.meaning
    const wrongAnswers = allVocab
      .filter(v => v.id !== item.id && v.meaning !== correctAnswer)
      .map(v => v.meaning)
      .slice(0, 3)
    
    const options = shuffleArray([correctAnswer, ...wrongAnswers])
    const correctIndex = options.indexOf(correctAnswer)

    return {
      id: `vocab-${id}`,
      type: 'vocabulary',
      question: `What does "${item.english}" mean?`,
      options,
      correctAnswer: correctIndex,
      explanation: item.example || undefined,
      sourceQuestion: item
    }
  }

  // Create setbook MCQ
  const createSetbookQuestion = (q: SetbookQuestion, id: number): ExamQuestion => {
    return {
      id: `setbook-${id}`,
      type: 'setbook',
      question: q.question,
      options: [
        q.answer,
        'This event happens at the beginning of the story',
        'The character changes their mind about their decision',
        'The conflict is resolved peacefully'
      ],
      correctAnswer: 0,
      explanation: q.arabicTranslation,
      sourceQuestion: q
    }
  }

  // Create grammar MCQ
  const createGrammarQuestion = (q: GrammarQuestion, id: number): ExamQuestion => {
    return {
      id: `grammar-${id}`,
      type: 'grammar',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      sourceQuestion: q
    }
  }

  // Create functional language MCQ
  const createFunctionalQuestion = (q: FunctionalLanguageQuestion, id: number): ExamQuestion => {
    return {
      id: `functional-${id}`,
      type: 'functional',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: `Function: ${q.function}`,
      sourceQuestion: q
    }
  }

  // Utility: Shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    setExamState(prev => {
      const newAnswers = [...prev.answers]
      newAnswers[prev.currentQuestionIndex] = optionIndex
      return { ...prev, answers: newAnswers }
    })
  }

  // Toggle mark for review
  const toggleMarkForReview = () => {
    setExamState(prev => {
      const newMarked = [...prev.markedForReview]
      newMarked[prev.currentQuestionIndex] = !newMarked[prev.currentQuestionIndex]
      return { ...prev, markedForReview: newMarked }
    })
  }

  // Navigation
  const goToQuestion = (index: number) => {
    setExamState(prev => ({ ...prev, currentQuestionIndex: index }))
  }

  const goToPrevious = () => {
    if (examState.currentQuestionIndex > 0) {
      goToQuestion(examState.currentQuestionIndex - 1)
    }
  }

  const goToNext = () => {
    if (examState.currentQuestionIndex < examState.questions.length - 1) {
      goToQuestion(examState.currentQuestionIndex + 1)
    }
  }

  // Submit exam
  const handleSubmitExam = () => {
    const totalQuestions = examState.questions.length
    const correctAnswers = examState.questions.reduce((count, q, i) => {
      return count + (examState.answers[i] === q.correctAnswer ? 1 : 0)
    }, 0)

    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    const timeSpent = (examDuration * 60) - examState.timeRemaining

    const result: ExamResult = {
      grade: selectedGrade,
      score: correctAnswers,
      totalQuestions,
      percentage,
      correctAnswers,
      date: new Date().toISOString(),
      timeSpent
    }

    setExamResult(result)
    setExamState(prev => ({ ...prev, examCompleted: true, timerActive: false }))
    setShowResults(true)

    // Update best score if this is better
    const currentBest = bestScores[selectedGrade]
    if (!currentBest || percentage > currentBest.percentage) {
      const newBestScores = { ...bestScores, [selectedGrade]: result }
      setBestScores(newBestScores)
      localStorage.setItem('examBestScores', JSON.stringify(newBestScores))
    }
  }

  // Reset exam
  const handleRetake = () => {
    generateExam(selectedGrade)
  }

  // Start new exam
  const handleStartExam = () => {
    generateExam(selectedGrade)
  }

  // Voice reading
  const speakQuestion = (text: string) => {
    voiceService.speak(text)
  }

  // Render exam setup screen
  if (!examState.examStarted) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
              Sample Exam System
            </h1>
            <p className="text-lg text-muted-foreground">
              Test your knowledge with comprehensive 23-question exams
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              {/* Grade Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Grade
                </label>
                <Select
                  value={selectedGrade.toString()}
                  onValueChange={(value) => setSelectedGrade(parseInt(value) as GradeLevel)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Exam Duration (minutes)
                </label>
                <Select
                  value={examDuration.toString()}
                  onValueChange={(value) => setExamDuration(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes (Recommended)</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="0">No time limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Details */}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold mb-3">Exam Structure:</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span>8 Vocabulary Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>5 Setbook Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span>5 Grammar Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    <span>5 Functional Questions</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Total: 23 multiple-choice questions
                </p>
              </div>

              {/* Best Score Display */}
              {bestScores[selectedGrade] && (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Your Best Score (Grade {selectedGrade})</span>
                  </div>
                  <div className="text-2xl font-bold text-gradient-purple-blue">
                    {bestScores[selectedGrade]!.percentage}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {bestScores[selectedGrade]!.correctAnswers} / {bestScores[selectedGrade]!.totalQuestions} correct
                  </p>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                  {error}
                </div>
              )}

              {/* Start Button */}
              <Button
                onClick={handleStartExam}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? 'Generating Exam...' : 'Start Exam'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Render results screen
  if (showResults && examResult) {
    const currentQuestion = examState.questions[examState.currentQuestionIndex]
    const isPassed = examResult.percentage >= 60

    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Results Summary */}
          <Card className="p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-purple-blue mb-4">
                {isPassed ? (
                  <Trophy className="w-10 h-10 text-white" />
                ) : (
                  <Target className="w-10 h-10 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
              </h2>
              <p className="text-muted-foreground">
                You scored {examResult.percentage}% on the Grade {examResult.grade} exam
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-gradient-purple-blue mb-1">
                  {examResult.score}
                </div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-gradient-purple-blue mb-1">
                  {examResult.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-gradient-purple-blue mb-1">
                  {formatTime(examResult.timeSpent)}
                </div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRetake} size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Exam
              </Button>
              <Button
                onClick={() => {
                  setExamState(prev => ({ ...prev, examStarted: false }))
                  setShowResults(false)
                }}
                variant="outline"
                size="lg"
              >
                Back to Setup
              </Button>
            </div>
          </Card>

          {/* Detailed Review */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Review Your Answers</h3>
            
            <div className="space-y-6">
              {examState.questions.map((q, index) => {
                const userAnswer = examState.answers[index]
                const isCorrect = userAnswer === q.correctAnswer
                
                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-lg border-2 ${
                      isCorrect 
                        ? 'border-green-500/30 bg-green-500/5' 
                        : 'border-red-500/30 bg-red-500/5'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Badge variant={isCorrect ? 'default' : 'destructive'}>
                        Q{index + 1}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {q.type}
                      </Badge>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <p className="font-medium flex-1">{q.question}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakQuestion(q.question)}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {q.options.map((option, optIndex) => {
                        const isUserAnswer = userAnswer === optIndex
                        const isCorrectAnswer = optIndex === q.correctAnswer
                        
                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded border ${
                              isCorrectAnswer
                                ? 'bg-green-500/10 border-green-500/50 font-medium'
                                : isUserAnswer
                                ? 'bg-red-500/10 border-red-500/50'
                                : 'bg-muted/50 border-border'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{String.fromCharCode(65 + optIndex)}.</span>
                              <span className="flex-1">{option}</span>
                              {isCorrectAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {q.explanation && (
                      <div className="bg-muted p-3 rounded text-sm">
                        <span className="font-semibold">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Render exam in progress
  const currentQuestion = examState.questions[examState.currentQuestionIndex]
  const answeredCount = examState.answers.filter(a => a !== null).length
  const progress = (answeredCount / examState.questions.length) * 100

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Timer */}
        <Card className="p-4 mb-6 sticky top-4 z-10 bg-card/95 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold">Grade {selectedGrade} Sample Exam</h2>
              <p className="text-sm text-muted-foreground">
                Question {examState.currentQuestionIndex + 1} of {examState.questions.length}
              </p>
            </div>

            {examDuration > 0 && (
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${examState.timeRemaining < 300 ? 'text-red-500' : 'text-muted-foreground'}`} />
                <span className={`text-2xl font-mono font-bold ${examState.timeRemaining < 300 ? 'text-red-500' : ''}`}>
                  {formatTime(examState.timeRemaining)}
                </span>
              </div>
            )}

            <Button onClick={handleSubmitExam} variant="default">
              Submit Exam
            </Button>
          </div>

          <Progress value={progress} className="mt-4" />
          <p className="text-xs text-muted-foreground mt-2">
            {answeredCount} of {examState.questions.length} questions answered
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigator */}
          <Card className="p-4 lg:col-span-1 h-fit">
            <h3 className="font-semibold mb-4">Questions</h3>
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
              {examState.questions.map((_, index) => {
                const isAnswered = examState.answers[index] !== null
                const isMarked = examState.markedForReview[index]
                const isCurrent = index === examState.currentQuestionIndex

                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`
                      relative w-10 h-10 rounded flex items-center justify-center text-sm font-medium
                      transition-all
                      ${isCurrent 
                        ? 'bg-gradient-purple-blue text-white ring-2 ring-purple-500' 
                        : isAnswered
                        ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }
                    `}
                  >
                    {index + 1}
                    {isMarked && (
                      <Flag className="absolute -top-1 -right-1 w-3 h-3 text-orange-500 fill-orange-500" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-purple-blue rounded" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500/20 rounded" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Marked</span>
              </div>
            </div>
          </Card>

          {/* Question Display */}
          <Card className="p-6 lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="capitalize">
                  {currentQuestion.type}
                </Badge>
                <Badge variant={examState.markedForReview[examState.currentQuestionIndex] ? 'default' : 'outline'}>
                  Question {examState.currentQuestionIndex + 1}
                </Badge>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <p className="text-lg font-medium flex-1">
                  {currentQuestion.question}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakQuestion(currentQuestion.question)}
                  title="Read question aloud"
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = examState.answers[examState.currentQuestionIndex] === index

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`
                        w-full p-4 rounded-lg border-2 text-left transition-all
                        ${isSelected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-border hover:border-purple-300 hover:bg-muted/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-border'}
                        `}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-semibold mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                onClick={toggleMarkForReview}
                variant="outline"
                className={examState.markedForReview[examState.currentQuestionIndex] ? 'bg-orange-500/10' : ''}
              >
                <Flag className="w-4 h-4 mr-2" />
                {examState.markedForReview[examState.currentQuestionIndex] ? 'Unmark' : 'Mark for Review'}
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={goToPrevious}
                  disabled={examState.currentQuestionIndex === 0}
                  variant="outline"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  onClick={goToNext}
                  disabled={examState.currentQuestionIndex === examState.questions.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
