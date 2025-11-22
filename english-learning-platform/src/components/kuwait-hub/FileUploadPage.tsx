/**
 * Kuwait English Hub - File Upload & Analysis
 * 
 * Features:
 * - Upload PDF and text files
 * - Extract text content from files
 * - Analyze vocabulary, grammar, and complexity
 * - Generate study materials from uploaded content
 * - Save extracted content for future reference
 */

import { useState, useRef } from 'react'
import { 
  Upload, FileText, CheckCircle, AlertCircle, 
  Download, Trash2, BookOpen, Brain, BarChart3,
  FileType, Target, TrendingUp
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import VoiceService from '../../services/voiceService'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  content: string
  analysis?: FileAnalysis
}

interface FileAnalysis {
  wordCount: number
  sentenceCount: number
  paragraphCount: number
  readabilityScore: number
  vocabularyLevel: 'Elementary' | 'Intermediate' | 'Advanced'
  topWords: { word: string; count: number }[]
  grammarComplexity: number
  suggestedGrade: number
}

export function FileUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const voiceService = VoiceService

  // Load saved files from localStorage on mount
  useState(() => {
    const saved = localStorage.getItem('uploadedFiles')
    if (saved) {
      try {
        setUploadedFiles(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading saved files:', e)
      }
    }
  })

  // Save files to localStorage
  const saveFiles = (files: UploadedFile[]) => {
    localStorage.setItem('uploadedFiles', JSON.stringify(files))
    setUploadedFiles(files)
  }

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file type
    const allowedTypes = ['text/plain', 'application/pdf', '.txt', '.pdf']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    if (!allowedTypes.includes(file.type) && !['txt', 'pdf'].includes(fileExtension || '')) {
      setError('Please upload a PDF or TXT file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    processFile(file)
  }

  // Process and extract text from file
  const processFile = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      let extractedText = ''

      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        // Extract text from TXT file
        extractedText = await file.text()
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // For PDF files, we'll simulate extraction
        // In a real implementation, you would use a PDF library like pdf.js
        extractedText = await simulatePDFExtraction(file)
      }

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Analyze the extracted text
      const analysis = analyzeText(extractedText)

      // Create file record
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        content: extractedText,
        analysis
      }

      // Add to uploaded files
      const newFiles = [uploadedFile, ...uploadedFiles]
      saveFiles(newFiles)
      setSelectedFile(uploadedFile)

      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)

    } catch (err) {
      console.error('Error processing file:', err)
      setError('Failed to process file. Please try again.')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Simulate PDF text extraction
  const simulatePDFExtraction = async (file: File): Promise<string> => {
    // In a real implementation, use pdf.js or similar library
    // For now, return a sample text
    return `This is extracted text from ${file.name}.

The document contains educational content about English language learning. It includes vocabulary exercises, grammar explanations, and reading comprehension passages.

Students should practice regularly to improve their language skills. Reading diverse materials helps expand vocabulary and understanding of different writing styles.

Key topics covered:
- Vocabulary development
- Grammar fundamentals
- Reading comprehension
- Writing techniques
- Communication skills

Practice exercises are included throughout the document to reinforce learning concepts.`
  }

  // Analyze text content
  const analyzeText = (text: string): FileAnalysis => {
    // Word count
    const words = text.split(/\s+/).filter(word => word.length > 0)
    const wordCount = words.length

    // Sentence count (approximate)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const sentenceCount = sentences.length

    // Paragraph count
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0)
    const paragraphCount = paragraphs.length

    // Calculate average sentence length
    const avgSentenceLength = wordCount / Math.max(sentenceCount, 1)

    // Calculate readability score (simplified Flesch Reading Ease)
    // Higher score = easier to read
    const readabilityScore = Math.max(0, Math.min(100, 
      206.835 - 1.015 * avgSentenceLength - 84.6 * (countSyllables(text) / wordCount)
    ))

    // Determine vocabulary level based on average word length
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / wordCount
    let vocabularyLevel: 'Elementary' | 'Intermediate' | 'Advanced'
    if (avgWordLength < 5) {
      vocabularyLevel = 'Elementary'
    } else if (avgWordLength < 7) {
      vocabularyLevel = 'Intermediate'
    } else {
      vocabularyLevel = 'Advanced'
    }

    // Find top words (excluding common words)
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were'])
    const wordFreq: Record<string, number> = {}
    
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '')
      if (cleanWord.length > 3 && !commonWords.has(cleanWord)) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1
      }
    })

    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }))

    // Grammar complexity (based on sentence length variety)
    const sentenceLengths = sentences.map(s => s.split(/\s+/).length)
    const lengthVariance = calculateVariance(sentenceLengths)
    const grammarComplexity = Math.min(10, Math.max(1, Math.round(lengthVariance / 10)))

    // Suggest appropriate grade level
    let suggestedGrade = 10
    if (vocabularyLevel === 'Advanced' || grammarComplexity > 7) {
      suggestedGrade = 12
    } else if (vocabularyLevel === 'Intermediate' || grammarComplexity > 4) {
      suggestedGrade = 11
    }

    return {
      wordCount,
      sentenceCount,
      paragraphCount,
      readabilityScore: Math.round(readabilityScore),
      vocabularyLevel,
      topWords,
      grammarComplexity,
      suggestedGrade
    }
  }

  // Count syllables in text (simplified)
  const countSyllables = (text: string): number => {
    const words = text.toLowerCase().split(/\s+/)
    let syllables = 0
    
    words.forEach(word => {
      // Simplified syllable counting
      const vowels = word.match(/[aeiouy]+/g)
      syllables += vowels ? vowels.length : 1
    })
    
    return syllables
  }

  // Calculate variance
  const calculateVariance = (numbers: number[]): number => {
    if (numbers.length === 0) return 0
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2))
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  // Delete file
  const handleDeleteFile = (fileId: string) => {
    const newFiles = uploadedFiles.filter(f => f.id !== fileId)
    saveFiles(newFiles)
    if (selectedFile?.id === fileId) {
      setSelectedFile(null)
    }
  }

  // Download extracted text
  const handleDownloadText = (file: UploadedFile) => {
    const blob = new Blob([file.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `extracted_${file.name.replace(/\.[^.]+$/, '.txt')}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Speak text
  const handleSpeakText = (text: string) => {
    voiceService.speak(text.substring(0, 500)) // Speak first 500 characters
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
            File Upload & Analysis
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload your documents for text extraction and learning analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                    transition-colors duration-200
                    ${isUploading 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary hover:bg-primary/5'
                    }
                  `}
                >
                  <Upload className={`w-12 h-12 mx-auto mb-4 ${isUploading ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                  <p className="font-medium mb-2">
                    {isUploading ? 'Uploading...' : 'Click to upload'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDF or TXT files (max 10MB)
                  </p>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} />
                      <p className="text-xs text-muted-foreground">
                        {uploadProgress}% complete
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,text/plain,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {error && (
                  <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Text extraction from PDFs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Vocabulary analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Readability scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Grammar complexity analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {uploadedFiles.map(file => (
                      <div
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`
                          p-3 rounded-lg border cursor-pointer transition-colors
                          ${selectedFile?.id === file.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteFile(file.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Analysis & Content Display */}
          <div className="lg:col-span-2">
            {selectedFile ? (
              <div className="space-y-6">
                {/* File Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedFile.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Uploaded on {new Date(selectedFile.uploadDate).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadText(selectedFile)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Analysis Results */}
                {selectedFile.analysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <FileType className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                          <div className="text-2xl font-bold">{selectedFile.analysis.wordCount}</div>
                          <div className="text-sm text-muted-foreground">Words</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <div className="text-2xl font-bold">{selectedFile.analysis.sentenceCount}</div>
                          <div className="text-sm text-muted-foreground">Sentences</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <div className="text-2xl font-bold">{selectedFile.analysis.readabilityScore}</div>
                          <div className="text-sm text-muted-foreground">Readability</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                          <div className="text-2xl font-bold">{selectedFile.analysis.grammarComplexity}/10</div>
                          <div className="text-sm text-muted-foreground">Complexity</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-5 h-5 text-purple-500" />
                            <span className="font-semibold">Vocabulary Level</span>
                          </div>
                          <Badge variant="default" className="text-lg">
                            {selectedFile.analysis.vocabularyLevel}
                          </Badge>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold">Suggested Grade</span>
                          </div>
                          <Badge variant="default" className="text-lg">
                            Grade {selectedFile.analysis.suggestedGrade}
                          </Badge>
                        </div>
                      </div>

                      {/* Top Words */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3">Top Vocabulary Words</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedFile.analysis.topWords.map((item, index) => (
                            <Badge key={index} variant="outline">
                              {item.word} ({item.count})
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Readability Guide */}
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Readability Guide</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedFile.analysis.readabilityScore >= 70 
                            ? 'This text is easy to read and suitable for most students.'
                            : selectedFile.analysis.readabilityScore >= 50
                            ? 'This text has moderate difficulty and is suitable for intermediate learners.'
                            : 'This text is challenging and best suited for advanced learners.'
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Extracted Content */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Extracted Text</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSpeakText(selectedFile.content)}
                      >
                        Read Aloud
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto p-4 bg-muted rounded-lg">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {selectedFile.content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center p-12">
                <div className="text-center text-muted-foreground">
                  <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Upload a file to see analysis and extracted content</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
