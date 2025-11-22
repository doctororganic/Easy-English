import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, Clock, Trophy, TrendingUp, Play, CheckCircle, XCircle, ArrowRight, RotateCw } from 'lucide-react'

const GRAMMAR_TOPICS = [
  { id: 1, name: 'Simple Present Tense', category: 'Tenses', difficulty: 1 },
  { id: 2, name: 'Simple Past Tense', category: 'Tenses', difficulty: 1 },
  { id: 3, name: 'Simple Future Tense', category: 'Tenses', difficulty: 1 },
  { id: 4, name: 'Present Continuous', category: 'Tenses', difficulty: 2 },
  { id: 5, name: 'Past Continuous', category: 'Tenses', difficulty: 2 },
  { id: 6, name: 'Future Continuous', category: 'Tenses', difficulty: 2 },
  { id: 7, name: 'Present Perfect', category: 'Tenses', difficulty: 3 },
  { id: 8, name: 'Past Perfect', category: 'Tenses', difficulty: 3 },
  { id: 9, name: 'Future Perfect', category: 'Tenses', difficulty: 3 },
  { id: 10, name: 'Present Perfect Continuous', category: 'Tenses', difficulty: 4 },
  { id: 11, name: 'Past Perfect Continuous', category: 'Tenses', difficulty: 4 },
  { id: 12, name: 'Conditionals Type 0', category: 'Conditionals', difficulty: 2 },
  { id: 13, name: 'Conditionals Type 1', category: 'Conditionals', difficulty: 2 },
  { id: 14, name: 'Conditionals Type 2', category: 'Conditionals', difficulty: 3 },
  { id: 15, name: 'Conditionals Type 3', category: 'Conditionals', difficulty: 4 },
  { id: 16, name: 'Mixed Conditionals', category: 'Conditionals', difficulty: 5 },
  { id: 17, name: 'Passive Voice - Present', category: 'Voice', difficulty: 3 },
  { id: 18, name: 'Passive Voice - Past', category: 'Voice', difficulty: 3 },
  { id: 19, name: 'Passive Voice - Future', category: 'Voice', difficulty: 3 },
  { id: 20, name: 'Reported Speech - Statements', category: 'Reported Speech', difficulty: 3 },
  { id: 21, name: 'Reported Speech - Questions', category: 'Reported Speech', difficulty: 4 },
  { id: 22, name: 'Reported Speech - Commands', category: 'Reported Speech', difficulty: 4 },
  { id: 23, name: 'Modal Verbs - Ability', category: 'Modals', difficulty: 2 },
  { id: 24, name: 'Modal Verbs - Permission', category: 'Modals', difficulty: 2 },
  { id: 25, name: 'Modal Verbs - Obligation', category: 'Modals', difficulty: 2 },
  { id: 26, name: 'Modal Verbs - Deduction', category: 'Modals', difficulty: 3 },
  { id: 27, name: 'Relative Clauses - Defining', category: 'Clauses', difficulty: 3 },
  { id: 28, name: 'Relative Clauses - Non-defining', category: 'Clauses', difficulty: 4 },
  { id: 29, name: 'Infinitives and Gerunds', category: 'Verbals', difficulty: 3 },
  { id: 30, name: 'Articles (a, an, the)', category: 'Determiners', difficulty: 2 },
  { id: 31, name: 'Prepositions of Time', category: 'Prepositions', difficulty: 2 },
  { id: 32, name: 'Prepositions of Place', category: 'Prepositions', difficulty: 2 },
  { id: 33, name: 'Prepositions of Movement', category: 'Prepositions', difficulty: 2 },
  { id: 34, name: 'Conjunctions', category: 'Connectors', difficulty: 2 },
  { id: 35, name: 'Subject-Verb Agreement', category: 'Agreement', difficulty: 2 },
  { id: 36, name: 'Word Order', category: 'Syntax', difficulty: 2 },
  { id: 37, name: 'Comparatives and Superlatives', category: 'Adjectives', difficulty: 2 },
  { id: 38, name: 'Phrasal Verbs', category: 'Idioms', difficulty: 4 },
  { id: 39, name: 'Question Formation', category: 'Questions', difficulty: 2 },
  { id: 40, name: 'Negation', category: 'Negative Forms', difficulty: 2 },
]

interface Question {
  id: number
  question_text: string
  question_type: 'multiple_choice'
  correct_answer: string
  options: string[]
  explanation_en: string
  explanation_ar: string
  difficulty_level: number
  points: number
  topic: string
}

interface QuizResult {
  question: Question
  userAnswer: string
  isCorrect: boolean
}

export function GrammarQuiz() {
  const { user } = useAuth()
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(2)
  const [questionCount, setQuestionCount] = useState<number>(10)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive])

  async function generateQuiz() {
    if (!selectedTopic) {
      alert('Please select a grammar topic')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-grammar-quiz', {
        body: {
          topic: selectedTopic,
          difficulty: difficulty,
          questionCount: questionCount
        }
      })

      if (error) throw error

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions)
        setQuizStarted(true)
        setTimerActive(true)
        setTimeElapsed(0)
      } else {
        // Fallback to sample questions
        setQuestions(getSampleQuestions(selectedTopic, difficulty, questionCount))
        setQuizStarted(true)
        setTimerActive(true)
        setTimeElapsed(0)
      }
    } catch (err) {
      console.error('Quiz generation error:', err)
      // Use fallback questions
      setQuestions(getSampleQuestions(selectedTopic, difficulty, questionCount))
      setQuizStarted(true)
      setTimerActive(true)
      setTimeElapsed(0)
    } finally {
      setLoading(false)
    }
  }

  function getSampleQuestions(topic: string, diff: number, count: number): Question[] {
    const samples: Question[] = [
      {
        id: 1,
        question_text: 'I _____ to school every day.',
        question_type: 'multiple_choice',
        correct_answer: 'go',
        options: ['go', 'goes', 'going', 'went'],
        explanation_en: 'Use simple present tense with "I". The base form of the verb is "go".',
        explanation_ar: 'استخدم المضارع البسيط مع "أنا". الشكل الأساسي للفعل هو "go".',
        difficulty_level: 1,
        points: 1,
        topic: topic
      },
      {
        id: 2,
        question_text: 'She _____ a book yesterday.',
        question_type: 'multiple_choice',
        correct_answer: 'read',
        options: ['read', 'reads', 'reading', 'will read'],
        explanation_en: 'Use simple past tense for actions completed in the past. "Read" is the past form.',
        explanation_ar: 'استخدم الماضي البسيط للأفعال المكتملة في الماضي. "read" هو شكل الماضي.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      },
      {
        id: 3,
        question_text: 'If I _____ rich, I would buy a house.',
        question_type: 'multiple_choice',
        correct_answer: 'were',
        options: ['were', 'was', 'am', 'will be'],
        explanation_en: 'Second conditional uses "were" for all subjects after "if".',
        explanation_ar: 'الشرط الثاني يستخدم "were" لجميع الضمائر بعد "if".',
        difficulty_level: 3,
        points: 2,
        topic: topic
      },
      {
        id: 4,
        question_text: 'The book was wrote by the author. [Find the error]',
        question_type: 'multiple_choice',
        correct_answer: 'wrote should be written',
        options: ['wrote should be written', 'was should be is', 'the should be a', 'No error'],
        explanation_en: 'Passive voice requires the past participle "written", not the simple past "wrote".',
        explanation_ar: 'الصوت المبني للمجهول يتطلب اسم المفعول "written"، وليس الماضي البسيط "wrote".',
        difficulty_level: 2,
        points: 2,
        topic: topic
      },
      {
        id: 5,
        question_text: 'Which is the correct passive form of "John writes the letter"?',
        question_type: 'multiple_choice',
        correct_answer: 'The letter is written by John.',
        options: ['The letter is written by John.', 'The letter was written by John.', 'The letter writes by John.', 'John is written the letter.'],
        explanation_en: 'Passive voice: Object + is/are + past participle + by + subject',
        explanation_ar: 'الصوت المبني للمجهول: المفعول به + is/are + اسم المفعول + by + الفاعل',
        difficulty_level: 3,
        points: 3,
        topic: topic
      }
    ]

    return samples.slice(0, count)
  }

  function submitQuiz() {
    setTimerActive(false)
    const quizResults: QuizResult[] = questions.map(q => {
      const userAnswer = userAnswers[q.id] || ''
      const isCorrect = userAnswer.toLowerCase().trim() === q.correct_answer.toLowerCase().trim()
      return { question: q, userAnswer, isCorrect }
    })

    setResults(quizResults)
    setQuizFinished(true)

    // Save to database
    if (user) {
      const score = quizResults.filter(r => r.isCorrect).length / quizResults.length
      const totalPoints = quizResults.filter(r => r.isCorrect).reduce((sum, r) => sum + r.question.points, 0)
      
      supabase
        .from('learning_sessions')
        .insert({
          user_id: user.id,
          session_type: 'quiz',
          start_time: new Date(Date.now() - timeElapsed * 1000).toISOString(),
          end_time: new Date().toISOString(),
          duration_minutes: Math.floor(timeElapsed / 60),
          performance_metrics: {
            topic: selectedTopic,
            total_questions: questions.length,
            correct_answers: quizResults.filter(r => r.isCorrect).length,
            score: score,
            total_points: totalPoints,
            difficulty: difficulty
          }
        })
        .then(({ error }) => {
          if (error) console.error('Session save error:', error)
        })
    }
  }

  function resetQuiz() {
    setQuizStarted(false)
    setQuizFinished(false)
    setQuestions([])
    setUserAnswers({})
    setCurrentQuestionIndex(0)
    setResults([])
    setTimeElapsed(0)
    setTimerActive(false)
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Quiz Setup Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">Grammar Quiz Generator</h1>
            <p className="text-xl text-primary">AI-Powered Grammar Practice with 40+ Topics</p>
            <p className="text-lg text-muted-foreground mt-2">مولد اختبارات القواعد بالذكاء الاصطناعي</p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Configure Your Quiz</h2>

            {/* Topic Selection */}
            <div className="mb-6">
              <label className="block text-foreground mb-2 font-semibold">Select Grammar Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-input text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-border"
              >
                <option value="">-- Choose a topic --</option>
                {['Tenses', 'Conditionals', 'Voice', 'Reported Speech', 'Modals', 'Clauses', 'Verbals', 'Determiners', 'Prepositions', 'Connectors', 'Agreement', 'Syntax', 'Adjectives', 'Idioms', 'Questions', 'Negative Forms'].map(category => (
                  <optgroup key={category} label={category}>
                    {GRAMMAR_TOPICS.filter(t => t.category === category).map(topic => (
                      <option key={topic.id} value={topic.name}>
                        {topic.name} (Level {topic.difficulty})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-6">
              <label className="block text-foreground mb-2 font-semibold">Difficulty Level</label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      difficulty === level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    Level {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-6">
              <label className="block text-foreground mb-2 font-semibold">Number of Questions</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      questionCount === count
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateQuiz}
              disabled={!selectedTopic || loading}
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Results Screen
  if (quizFinished) {
    const correctCount = results.filter(r => r.isCorrect).length
    const totalPoints = results.filter(r => r.isCorrect).reduce((sum, r) => sum + r.question.points, 0)
    const maxPoints = results.reduce((sum, r) => sum + r.question.points, 0)
    const percentage = Math.round((correctCount / results.length) * 100)

    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          {/* Score Summary */}
          <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border mb-8">
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 text-secondary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Complete!</h1>
              <p className="text-xl text-primary">اكتمل الاختبار!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-4 text-center border border-border">
                <p className="text-muted-foreground text-sm mb-1">Score</p>
                <p className="text-3xl font-bold text-foreground">{percentage}%</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center border border-border">
                <p className="text-muted-foreground text-sm mb-1">Correct</p>
                <p className="text-3xl font-bold text-secondary">{correctCount}/{results.length}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center border border-border">
                <p className="text-muted-foreground text-sm mb-1">Points</p>
                <p className="text-3xl font-bold text-primary">{totalPoints}/{maxPoints}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center border border-border">
                <p className="text-muted-foreground text-sm mb-1">Time</p>
                <p className="text-3xl font-bold text-secondary">{formatTime(timeElapsed)}</p>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <RotateCw className="w-5 h-5" />
              Take Another Quiz
            </button>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Detailed Results</h2>
            {results.map((result, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border-2 ${
                  result.isCorrect
                    ? 'bg-secondary/10 border-secondary'
                    : 'bg-destructive/10 border-destructive'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {result.isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-secondary" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-semibold mb-2">
                      Question {index + 1}: {result.question.question_text}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Answer:</p>
                        <p className={`font-semibold ${result.isCorrect ? 'text-secondary' : 'text-destructive'}`}>
                          {result.userAnswer || '(No answer)'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Correct Answer:</p>
                        <p className="font-semibold text-secondary">{result.question.correct_answer}</p>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-foreground mb-1">{result.question.explanation_en}</p>
                      <p className="text-primary">{result.question.explanation_ar}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Quiz Questions Screen
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Question {currentQuestionIndex + 1} of {questions.length}</p>
              <p className="text-foreground text-lg font-semibold">{selectedTopic}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-xl">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border mb-8">
          <div className="mb-6">
            <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm mb-4">
              {currentQuestion.question_type.replace('_', ' ').toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {currentQuestion.question_text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setUserAnswers({ ...userAnswers, [currentQuestion.id]: option })}
                className={`w-full text-left p-4 rounded-lg transition-all border-2 ${
                  userAnswers[currentQuestion.id] === option
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-foreground hover:bg-accent border-border'
                }`}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="bg-muted text-foreground px-6 py-3 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-border"
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold flex items-center gap-2"
            >
              Submit Quiz
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
