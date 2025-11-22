/**
 * Kuwait English Hub - Comprehensive Curriculum Type Definitions
 * This file defines all TypeScript interfaces for the curriculum data
 * covering grades 10, 11, and 12
 */

// ==================== VOCABULARY TYPES ====================

/**
 * Represents a single vocabulary item with English word, Arabic translation,
 * meaning, and example sentence
 */
export interface VocabularyItem {
  id?: string;
  english: string;
  arabic: string;
  meaning: string;
  example: string;
  unit: string;
  grade: 10 | 11 | 12;
}

/**
 * Collection of vocabulary items organized by unit
 */
export interface VocabularyUnit {
  unitNumber: number;
  unitName: string;
  vocabulary: VocabularyItem[];
}

// ==================== SETBOOK QUESTION TYPES ====================

/**
 * Represents a setbook question with its answer and Arabic translation
 */
export interface SetbookQuestion {
  id?: string;
  question: string;
  answer: string;
  arabicTranslation?: string;
  unit: string;
  unitNumber: number;
  grade: 10 | 11 | 12;
  questionType?: 'short-answer' | 'essay' | 'critical-thinking';
}

/**
 * Collection of setbook questions organized by unit
 */
export interface SetbookUnit {
  unitNumber: number;
  unitName: string;
  questions: SetbookQuestion[];
}

// ==================== GRAMMAR QUIZ TYPES ====================

/**
 * Represents a single grammar multiple-choice question
 */
export interface GrammarQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation?: string;
  topic: string;
  grade: 10 | 11 | 12;
  unit?: number;
}

/**
 * Grammar quiz section with questions on a specific topic
 */
export interface GrammarQuizSection {
  topic: string;
  questions: GrammarQuestion[];
}

// ==================== TRANSLATION EXERCISE TYPES ====================

/**
 * Represents a translation exercise with source and target text
 */
export interface TranslationExercise {
  id?: string;
  sourceText: string;
  targetText: string;
  sourceLanguage: 'arabic' | 'english';
  targetLanguage: 'arabic' | 'english';
  unit: string;
  unitNumber: number;
  grade: 10 | 11 | 12;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Collection of translation exercises organized by unit
 */
export interface TranslationUnit {
  unitNumber: number;
  unitName: string;
  exercises: TranslationExercise[];
}

// ==================== WRITING TOPIC TYPES ====================

/**
 * Represents a writing topic with outline, model answer, and tips
 */
export interface WritingTopic {
  id?: string;
  topic: string;
  outline: string[];
  modelAnswer: string;
  tips?: string[];
  grade: 10 | 11 | 12;
  unit: string;
  unitNumber: number;
  writingType: 'expository' | 'narrative' | 'argumentative' | 'descriptive';
  wordCount?: number;
}

/**
 * Collection of writing topics organized by unit
 */
export interface WritingUnit {
  unitNumber: number;
  unitName: string;
  topics: WritingTopic[];
}

// ==================== FUNCTIONAL LANGUAGE TYPES ====================

/**
 * Represents a functional language phrase with formal/informal variants
 */
export interface FunctionalPhrase {
  id?: string;
  function: string; // e.g., "Giving Opinion", "Agreeing", "Disagreeing"
  formalPhrases: string[];
  formalArabic: string[];
  commonPhrases: string[];
  commonArabic: string[];
  situation?: string;
  examples?: string[];
}

/**
 * Represents a functional language MCQ question
 */
export interface FunctionalLanguageQuestion {
  id?: string;
  questionNumber: number;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  function: string; // Which language function it tests
  blockNumber: number; // 1-9 for the 9 blocks
}

/**
 * Collection of functional language questions organized by block
 */
export interface FunctionalLanguageBlock {
  blockNumber: number;
  blockName: string;
  questions: FunctionalLanguageQuestion[];
}

/**
 * Complete functional language curriculum (unified for all grades)
 */
export interface FunctionalLanguageCurriculum {
  phrases: FunctionalPhrase[];
  questionBlocks: FunctionalLanguageBlock[];
}

// ==================== SAMPLE EXAM TYPES ====================

/**
 * Represents a single exam question (can be various types)
 */
export interface ExamQuestion {
  id?: string;
  questionNumber: number;
  type: 'vocabulary' | 'grammar' | 'reading' | 'writing' | 'functional-language';
  question: string;
  options?: string[]; // For MCQ
  correctAnswer?: string | number;
  points: number;
  section?: string;
}

/**
 * Represents a complete sample exam for a grade
 */
export interface SampleExam {
  grade: 10 | 11 | 12;
  examName: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: ExamQuestion[];
  instructions?: string;
}

// ==================== UNIT TYPES ====================

/**
 * Represents a complete unit with all content types
 */
export interface CurriculumUnit {
  unitNumber: number;
  unitName: string;
  grade: 10 | 11 | 12;
  vocabulary: VocabularyItem[];
  setbookQuestions: SetbookQuestion[];
  grammar?: GrammarQuestion[];
  translations: TranslationExercise[];
  writing: WritingTopic[];
}

// ==================== GRADE LEVEL TYPES ====================

/**
 * Complete curriculum for Grade 10
 */
export interface Grade10Curriculum {
  grade: 10;
  units: CurriculumUnit[];
  totalUnits: number;
}

/**
 * Complete curriculum for Grade 11
 */
export interface Grade11Curriculum {
  grade: 11;
  units: CurriculumUnit[];
  totalUnits: number;
}

/**
 * Complete curriculum for Grade 12
 */
export interface Grade12Curriculum {
  grade: 12;
  units: CurriculumUnit[];
  totalUnits: number;
}

/**
 * Union type for all grade curricula
 */
export type GradeCurriculum = Grade10Curriculum | Grade11Curriculum | Grade12Curriculum;

// ==================== COMPLETE PLATFORM DATA ====================

/**
 * Complete curriculum data for all grades
 */
export interface CompleteCurriculum {
  grade10: Grade10Curriculum;
  grade11: Grade11Curriculum;
  grade12: Grade12Curriculum;
  functionalLanguage: FunctionalLanguageCurriculum;
  sampleExams: SampleExam[];
}

// ==================== PROGRESS TRACKING TYPES ====================

/**
 * User progress for vocabulary learning
 */
export interface VocabularyProgress {
  vocabularyId: string;
  userId: string;
  grade: 10 | 11 | 12;
  unit: number;
  mastered: boolean;
  reviewCount: number;
  lastReviewed: Date;
}

/**
 * User progress for grammar quizzes
 */
export interface GrammarProgress {
  userId: string;
  grade: 10 | 11 | 12;
  topic: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

/**
 * Overall user progress across all grades
 */
export interface UserProgress {
  userId: string;
  currentGrade: 10 | 11 | 12;
  vocabularyProgress: VocabularyProgress[];
  grammarProgress: GrammarProgress[];
  completedUnits: number[];
  totalPoints: number;
  lastActivity: Date;
}

// ==================== FILTER AND SEARCH TYPES ====================

/**
 * Filter options for vocabulary search
 */
export interface VocabularyFilter {
  grade?: 10 | 11 | 12;
  unit?: number;
  searchTerm?: string;
}

/**
 * Filter options for grammar questions
 */
export interface GrammarFilter {
  grade?: 10 | 11 | 12;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Filter options for writing topics
 */
export interface WritingFilter {
  grade?: 10 | 11 | 12;
  unit?: number;
  writingType?: 'expository' | 'narrative' | 'argumentative' | 'descriptive';
}

// ==================== FILE UPLOAD TYPES ====================

/**
 * Represents an uploaded PDF file for text extraction
 */
export interface UploadedFile {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  extractedText?: string;
  analysis?: string;
  userId: string;
}

// ==================== VISUAL LEARNING TYPES ====================

/**
 * Data for vocabulary card visualization
 */
export interface VocabularyCardData {
  word: string;
  translation: string;
  example: string;
  color: string;
}

/**
 * Progress chart data point
 */
export interface ProgressDataPoint {
  date: string;
  value: number;
  label: string;
}

/**
 * Mind map node for vocabulary relationships
 */
export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  color?: string;
}

// ==================== RESPONSE TYPES ====================

/**
 * API response wrapper for curriculum data
 */
export interface CurriculumResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

// ==================== CONSTANTS ====================

/**
 * Available grades in the system
 */
export const GRADES = [10, 11, 12] as const;

/**
 * Available writing types
 */
export const WRITING_TYPES = ['expository', 'narrative', 'argumentative', 'descriptive'] as const;

/**
 * Available language functions
 */
export const LANGUAGE_FUNCTIONS = [
  'Giving an Opinion',
  'Agreeing',
  'Disagreeing',
  'Making a Suggestion',
  'Accepting a Suggestion',
  'Refusing/Declining',
  'Asking for Clarification',
  'Apologizing',
  'Thanking',
  'Offering Help',
  'Making a Request',
  'Complaining',
  'Expressing Preference',
  'Giving Advice'
] as const;

/**
 * Question types for exams
 */
export const QUESTION_TYPES = [
  'vocabulary',
  'grammar',
  'reading',
  'writing',
  'functional-language'
] as const;

// ==================== HELPER TYPES ====================

/**
 * Type for grade values
 */
export type GradeLevel = 10 | 11 | 12;

/**
 * Type for unit numbers (1-6 typically)
 */
export type UnitNumber = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Type for language directions
 */
export type LanguageDirection = 'ltr' | 'rtl';

/**
 * Type for theme modes
 */
export type ThemeMode = 'light' | 'dark';
