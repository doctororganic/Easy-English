import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Volume2, CheckCircle, Circle, ArrowLeft, Download, Shuffle, Loader2 } from 'lucide-react'
import { vocabularyService, VocabularyWord as DBVocabularyWord } from '../services/vocabularyService'

// Extended interface with additional fields for compatibility
interface VocabularyWord extends DBVocabularyWord {
  word?: string
  definition_en?: string
  definition_ar?: string
  category?: string
  phonetic?: string
  examples?: string[]
}

// Utility function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function VocabularyLearning() {
  const navigate = useNavigate()
  const { classNumber, unitNumber } = useParams()
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([])
  const [shuffledVocabulary, setShuffledVocabulary] = useState<VocabularyWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredWords, setMasteredWords] = useState<Set<string>>(new Set())
  const [showTranslation, setShowTranslation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch vocabulary from database
  useEffect(() => {
    async function fetchVocabulary() {
      try {
        setLoading(true)
        setError(null)
        
        const classNum = parseInt(classNumber || '12')
        const unitNum = parseInt(unitNumber || '1')
        
        const words = await vocabularyService.getByClassAndUnit(classNum, unitNum)
        
        if (words.length === 0) {
          setError(`No vocabulary found for Grade ${classNum}, Unit ${unitNum}`)
          return
        }
        
        setVocabulary(words)
        // Shuffle on initial load for varied experience
        setShuffledVocabulary(shuffleArray(words))
      } catch (err) {
        console.error('Error fetching vocabulary:', err)
        setError('Failed to load vocabulary. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchVocabulary()
  }, [classNumber, unitNumber])

  const currentWord = shuffledVocabulary[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % shuffledVocabulary.length)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + shuffledVocabulary.length) % shuffledVocabulary.length)
  }

  const handleShuffle = () => {
    setShuffledVocabulary(shuffleArray(vocabulary))
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const toggleMastered = () => {
    if (!currentWord) return
    
    const newMastered = new Set(masteredWords)
    if (newMastered.has(currentWord.id)) {
      newMastered.delete(currentWord.id)
    } else {
      newMastered.add(currentWord.id)
    }
    setMasteredWords(newMastered)
    
    // Save to localStorage
    localStorage.setItem(`mastered_${classNumber}_${unitNumber}`, JSON.stringify(Array.from(newMastered)))
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const downloadProgress = () => {
    try {
      const data = {
        class: classNumber,
        unit: unitNumber,
        totalWords: vocabulary.length,
        masteredWords: masteredWords.size,
        progress: Math.round((masteredWords.size / vocabulary.length) * 100),
        masteredList: vocabulary.filter(w => masteredWords.has(w.id)).map(w => ({
          word: w.english_word || w.word,
          arabic: w.arabic_translation || w.definition_ar
        })),
        timestamp: new Date().toISOString()
      }
      
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `vocabulary-progress-grade${classNumber}-unit${unitNumber}.json`
      a.style.display = 'none'
      
      // Add to DOM, click, then remove
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)
      
      console.log('Download initiated successfully')
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download progress. Please try again.')
    }
  }

  // Load mastered words from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`mastered_${classNumber}_${unitNumber}`)
    if (saved) {
      setMasteredWords(new Set(JSON.parse(saved)))
    }
  }, [classNumber, unitNumber])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground text-xl">Loading vocabulary...</p>
        </div>
      </div>
    )
  }

  if (error || !currentWord) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/kuwait-classes')}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Back to Classes</span>
          </button>
          
          <div className="bg-destructive/10 border border-destructive rounded-lg p-8 text-center">
            <p className="text-destructive text-xl">{error || 'No vocabulary available'}</p>
          </div>
        </div>
      </div>
    )
  }

  const wordText = currentWord.english_word || currentWord.word || 'Unknown'
  const translationText = currentWord.arabic_translation || currentWord.definition_ar || 'لا يوجد ترجمة'
  const categoryText = currentWord.part_of_speech || currentWord.category || 'general'
  const exampleText = currentWord.question_data?.example || `Example: "${wordText}" is used in various contexts.`

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/kuwait-classes')}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Back to Classes</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Vocabulary Learning</h1>
            <p className="text-muted-foreground">Grade {classNumber || 12} - Unit {unitNumber || 1}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold text-primary">{masteredWords.size}/{shuffledVocabulary.length}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 justify-center">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Shuffle className="w-5 h-5" />
            Shuffle Cards
          </button>
          
          <button
            onClick={downloadProgress}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Progress
          </button>
        </div>

        {/* Flashcard */}
        <div className="relative mb-8">
          <div
            className={`bg-card border-2 border-primary rounded-2xl p-12 shadow-2xl min-h-[400px] cursor-pointer transition-all duration-500 transform ${
              isFlipped ? 'scale-98' : 'scale-100'
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {!isFlipped ? (
              /* Front of card - English */
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <h2 className="text-5xl font-bold text-foreground">{wordText}</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      speak(wordText)
                    }}
                    className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className={`px-4 py-1 rounded-full text-sm ${
                    currentWord.difficulty_level === 1 ? 'bg-green-500/20 text-green-600' :
                    currentWord.difficulty_level === 2 ? 'bg-yellow-500/20 text-yellow-600' :
                    'bg-red-500/20 text-red-600'
                  }`}>
                    {currentWord.difficulty_level === 1 ? 'Easy' : currentWord.difficulty_level === 2 ? 'Medium' : 'Hard'}
                  </span>
                  <span className="px-4 py-1 bg-primary/20 text-primary rounded-full text-sm capitalize">
                    {categoryText}
                  </span>
                </div>

                {showTranslation && (
                  <div className="mt-8 space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Arabic Translation:</h4>
                      <p className="text-2xl text-foreground" dir="rtl">{translationText}</p>
                    </div>
                    
                    <div className="bg-accent/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Example:</h4>
                      <p className="text-foreground italic">{exampleText}</p>
                    </div>
                  </div>
                )}

                <p className="text-center text-muted-foreground italic text-sm mt-8">
                  {showTranslation ? 'Click to see full flashcard mode' : 'Click to see translation and definition'}
                </p>
              </div>
            ) : (
              /* Back of card - Definition */
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Arabic Translation</h3>
                  <p className="text-3xl text-foreground" dir="rtl">{translationText}</p>
                </div>

                <div className="text-center p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Part of Speech:</h4>
                  <p className="text-lg text-foreground capitalize">{categoryText}</p>
                </div>

                <div className="bg-accent/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Example:</h4>
                  <p className="text-foreground italic">{exampleText}</p>
                </div>

                <p className="text-center text-muted-foreground italic text-sm">
                  Click to flip back
                </p>
              </div>
            )}
          </div>

          {/* Card counter */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full shadow-lg">
            <span className="font-semibold">{currentIndex + 1} / {shuffledVocabulary.length}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Previous
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-foreground"
            >
              {showTranslation ? 'Hide' : 'Show'} Details
            </button>

            <button
              onClick={toggleMastered}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                masteredWords.has(currentWord.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-card border border-border text-foreground hover:bg-accent'
              }`}
            >
              {masteredWords.has(currentWord.id) ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Mastered
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5" />
                  Mark as Mastered
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Next
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-muted rounded-full h-4 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${(masteredWords.size / shuffledVocabulary.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {masteredWords.size} of {shuffledVocabulary.length} words mastered ({Math.round((masteredWords.size / shuffledVocabulary.length) * 100)}%)
        </p>
      </div>
    </div>
  )
}
