// Kuwait Platform - Autonomous MySQL Service Layer
// Compatible with SQLite/MySQL databases

import Database from 'better-sqlite3'

// Database connection
let db: Database.Database

// Initialize database connection
export const initDatabase = () => {
  const dbPath = process.env.DATABASE_PATH || '/workspace/kuwait_platform_autonomous.db'
  db = new Database(dbPath)
  console.log('🗄️ Connected to autonomous Kuwait database')
  return db
}

// Vocabulary Service
export interface VocabularyWord {
  id: string
  question_text: string
  question_type: string
  component_type: string
  grade_level: number
  unit_number: number
  english_word: string
  part_of_speech: string
  arabic_translation: string
  difficulty_level: string
  question_data: any
  created_at: string
  updated_at: string
}

export const vocabularyService = {
  // Get vocabulary by class and unit
  async getByClassAndUnit(classNumber: number, unitNumber: number): Promise<VocabularyWord[]> {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT * FROM test_bank_questions 
      WHERE component_type = 'vocabulary' 
      AND grade_level = ? 
      AND unit_number = ?
      ORDER BY question_text
    `)
    
    const rows = stmt.all(classNumber, unitNumber)
    
    // Transform database rows to expected format
    return rows.map((row: any) => ({
      id: row.id,
      question_text: row.question_text,
      question_type: row.question_type,
      component_type: row.component_type,
      grade_level: row.grade_level,
      unit_number: row.unit_number,
      english_word: row.english_word,
      part_of_speech: row.part_of_speech,
      arabic_translation: row.arabic_translation,
      difficulty_level: row.difficulty_level,
      question_data: row.question_data ? JSON.parse(row.question_data) : null,
      created_at: row.created_at,
      updated_at: row.updated_at
    }))
  },

  // Get all vocabulary for a class
  async getByClass(classNumber: number): Promise<VocabularyWord[]> {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT * FROM test_bank_questions 
      WHERE component_type = 'vocabulary' 
      AND grade_level = ?
      ORDER BY unit_number, question_text
    `)
    
    const rows = stmt.all(classNumber)
    
    return rows.map((row: any) => ({
      id: row.id,
      question_text: row.question_text,
      question_type: row.question_type,
      component_type: row.component_type,
      grade_level: row.grade_level,
      unit_number: row.unit_number,
      english_word: row.english_word,
      part_of_speech: row.part_of_speech,
      arabic_translation: row.arabic_translation,
      difficulty_level: row.difficulty_level,
      question_data: row.question_data ? JSON.parse(row.question_data) : null,
      created_at: row.created_at,
      updated_at: row.updated_at
    }))
  },

  // Search vocabulary
  async searchVocabulary(query: string, classNumber?: number): Promise<VocabularyWord[]> {
    if (!db) initDatabase()
    
    let sql = `
      SELECT * FROM test_bank_questions 
      WHERE component_type = 'vocabulary' 
      AND (english_word LIKE ? OR arabic_translation LIKE ?)
    `
    const params: any[] = [`%${query}%`, `%${query}%`]
    
    if (classNumber) {
      sql += ' AND grade_level = ?'
      params.push(classNumber)
    }
    
    sql += ' ORDER BY grade_level, unit_number LIMIT 50'
    
    const stmt = db.prepare(sql)
    const rows = stmt.all(...params)
    
    return rows.map((row: any) => ({
      id: row.id,
      question_text: row.question_text,
      question_type: row.question_type,
      component_type: row.component_type,
      grade_level: row.grade_level,
      unit_number: row.unit_number,
      english_word: row.english_word,
      part_of_speech: row.part_of_speech,
      arabic_translation: row.arabic_translation,
      difficulty_level: row.difficulty_level,
      question_data: row.question_data ? JSON.parse(row.question_data) : null,
      created_at: row.created_at,
      updated_at: row.updated_at
    }))
  },

  // Get vocabulary statistics
  async getStatistics() {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT 
        grade_level,
        COUNT(*) as word_count,
        COUNT(DISTINCT unit_number) as unit_count
      FROM test_bank_questions 
      WHERE component_type = 'vocabulary'
      GROUP BY grade_level
      ORDER BY grade_level
    `)
    
    return stmt.all()
  }
}

// User Progress Service (if needed)
export const progressService = {
  async getUserProgress(userId: string, classNumber: number) {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT * FROM user_progress 
      WHERE user_id = ? AND grade_level = ?
    `)
    
    return stmt.get(userId, classNumber)
  },

  async updateUserProgress(userId: string, classNumber: number, unitNumber: number, completedVocabulary: any) {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO user_progress 
      (user_id, grade_level, unit_number, vocabulary_completed, last_accessed)
      VALUES (?, ?, ?, ?, datetime('now'))
    `)
    
    return stmt.run(userId, classNumber, unitNumber, JSON.stringify(completedVocabulary))
  }
}

// Test Bank Questions Service
export const testBankService = {
  async getQuestionsByComponent(componentType: string, gradeLevel?: number) {
    if (!db) initDatabase()
    
    let sql = `SELECT * FROM test_bank_questions WHERE component_type = ?`
    const params: any[] = [componentType]
    
    if (gradeLevel) {
      sql += ' AND grade_level = ?'
      params.push(gradeLevel)
    }
    
    sql += ' ORDER BY grade_level, unit_number, question_text'
    
    const stmt = db.prepare(sql)
    const rows = stmt.all(...params)
    
    return rows.map((row: any) => ({
      ...row,
      question_data: row.question_data ? JSON.parse(row.question_data) : null
    }))
  }
}

// Initialize database on import
initDatabase()
