import { useState } from 'react'
import { CheckCircle, XCircle, Award, Clock } from 'lucide-react'

interface IELTSQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const speakingPart1Questions: IELTSQuestion[] = [
  {
    id: 1,
    question: "Which response best answers: 'Where do you live?'",
    options: [
      "I live in house.",
      "I live in a modern apartment in the city center.",
      "Yes, I living there.",
      "I am live in city."
    ],
    correctAnswer: 1,
    explanation: "Option B provides a complete, grammatically correct answer with specific details."
  },
  {
    id: 2,
    question: "Which is the best response to: 'Do you enjoy reading?'",
    options: [
      "Yes.",
      "I like read books.",
      "Yes, I really enjoy reading, especially novels and biographies.",
      "Reading is good."
    ],
    correctAnswer: 2,
    explanation: "Option C gives an extended response with specific details and correct grammar."
  },
  {
    id: 3,
    question: "Best way to answer: 'What do you do in your free time?'",
    options: [
      "I do nothing.",
      "Free time is important.",
      "In my free time, I enjoy playing sports and spending time with friends.",
      "I am doing many things."
    ],
    correctAnswer: 2,
    explanation: "Option C provides specific activities with proper grammar and natural expression."
  }
]

const writingTask2Questions: IELTSQuestion[] = [
  {
    id: 1,
    question: "Which thesis statement is most appropriate for an essay about technology in education?",
    options: [
      "Technology is good.",
      "While technology offers significant benefits in education, it must be implemented thoughtfully to avoid potential drawbacks.",
      "I think technology should be used in schools.",
      "Technology bad for students."
    ],
    correctAnswer: 1,
    explanation: "Option B presents a balanced, academic view with clear position and acknowledgment of complexity."
  },
  {
    id: 2,
    question: "Which sentence demonstrates good cohesion?",
    options: [
      "Cars pollute. Trees help. We need trees.",
      "Furthermore, it is essential to consider the environmental impact of our transportation choices.",
      "I think environment important and cars bad.",
      "Many people drive cars and this is problem."
    ],
    correctAnswer: 1,
    explanation: "Option B uses appropriate linking words and maintains formal academic tone."
  }
]

const readingQuestions: IELTSQuestion[] = [
  {
    id: 1,
    question: "Which strategy is MOST effective for IELTS Reading?",
    options: [
      "Read every word carefully from start to finish.",
      "Skim the passage first, then scan for specific information to answer questions.",
      "Answer questions based on general knowledge without reading.",
      "Translate every sentence into your native language."
    ],
    correctAnswer: 1,
    explanation: "Skimming for main ideas then scanning for details is the most time-efficient approach."
  },
  {
    id: 2,
    question: "For True/False/Not Given questions, what does 'Not Given' mean?",
    options: [
      "The statement is false.",
      "The information is not mentioned in the passage.",
      "The statement is partially true.",
      "The passage contradicts the statement."
    ],
    correctAnswer: 1,
    explanation: "'Not Given' means the passage doesn't provide information to confirm or deny the statement."
  }
]

interface IELTSPracticeModuleProps {
  section: 'speaking' | 'writing' | 'reading' | 'listening'
}

export function IELTSPracticeModule({ section }: IELTSPracticeModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [startTime] = useState(Date.now())
  const [answers, setAnswers] = useState<number[]>([])

  const getQuestions = () => {
    switch (section) {
      case 'speaking':
        return speakingPart1Questions
      case 'writing':
        return writingTask2Questions
      case 'reading':
        return readingQuestions
      default:
        return speakingPart1Questions
    }
  }

  const questions = getQuestions()
  const question = questions[currentQuestion]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)
    
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setCompleted(true)
    }
  }

  const calculateBandScore = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return 9.0
    if (percentage >= 80) return 8.0
    if (percentage >= 70) return 7.0
    if (percentage >= 60) return 6.5
    if (percentage >= 50) return 6.0
    if (percentage >= 40) return 5.5
    return 5.0
  }

  const getTimeSpent = () => {
    const seconds = Math.floor((Date.now() - startTime) / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const restart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setCompleted(false)
    setAnswers([])
  }

  if (completed) {
    const bandScore = calculateBandScore()
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Practice Complete!</h2>
          <p className="text-gray-600">Your IELTS {section.charAt(0).toUpperCase() + section.slice(1)} Practice Results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{bandScore}</div>
            <div className="text-gray-600">Band Score</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{score}/{questions.length}</div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">{getTimeSpent()}</div>
            <div className="text-gray-600">Time Spent</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Accuracy</span>
              <span className="text-blue-600 font-bold">{((score / questions.length) * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Level</span>
              <span className="text-green-600 font-bold">
                {bandScore >= 7.5 ? 'Advanced' : bandScore >= 6.5 ? 'Upper Intermediate' : 'Intermediate'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500">
          <h4 className="font-bold text-gray-800 mb-2">Feedback & Tips</h4>
          <ul className="text-gray-700 space-y-1 text-sm">
            {bandScore >= 7.5 && (
              <>
                <li>• Excellent work! Your responses show strong language skills.</li>
                <li>• Continue practicing to maintain this high level.</li>
              </>
            )}
            {bandScore >= 6.0 && bandScore < 7.5 && (
              <>
                <li>• Good progress! Focus on expanding vocabulary and using complex sentences.</li>
                <li>• Practice organizing ideas more clearly in your responses.</li>
              </>
            )}
            {bandScore < 6.0 && (
              <>
                <li>• Keep practicing! Focus on basic grammar and sentence structure.</li>
                <li>• Build your vocabulary through regular reading and listening.</li>
                <li>• Try to give more detailed responses with examples.</li>
              </>
            )}
          </ul>
        </div>

        <button
          onClick={restart}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Practice Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {section.charAt(0).toUpperCase() + section.slice(1)} Practice
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{getTimeSpent()}</span>
          </div>
          <div className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showFeedback
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  showFeedback && index === question.correctAnswer
                    ? 'bg-green-500'
                    : showFeedback && index === selectedAnswer
                    ? 'bg-red-500'
                    : 'bg-gray-200'
                }`}>
                  {showFeedback && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                  {showFeedback && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                  {!showFeedback && (
                    <span className="text-gray-600 text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border border-green-200'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className="font-bold text-gray-800 mb-2">
            {selectedAnswer === question.correctAnswer ? '✓ Correct!' : 'Explanation:'}
          </h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}

      {showFeedback && (
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
        </button>
      )}

      <div className="mt-6 flex justify-center gap-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < currentQuestion
                ? answers[index] === questions[index].correctAnswer
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : index === currentQuestion
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
