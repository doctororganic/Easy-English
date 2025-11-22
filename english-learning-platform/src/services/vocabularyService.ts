// Browser-compatible Vocabulary Service
// Loads data from JSON files instead of direct database access

export interface VocabularyWord {
  id: string
  question_text: string
  english_word: string
  arabic_translation: string
  part_of_speech: string
  grade_level: number
  unit_number: number
  difficulty_level: number
  question_data?: {
    example?: string
    phonetic?: string
    [key: string]: any
  }
}

// Cache for loaded vocabulary
let vocabularyCache: VocabularyWord[] | null = null

// Load vocabulary from JSON file
async function loadVocabulary(): Promise<VocabularyWord[]> {
  if (vocabularyCache) {
    return vocabularyCache
  }

  try {
    const response = await fetch('/data/vocabulary.json')
    if (!response.ok) {
      throw new Error(`Failed to load vocabulary: ${response.statusText}`)
    }
    const data = await response.json()
    vocabularyCache = data
    return data
  } catch (error) {
    console.error('Error loading vocabulary:', error)
    return []
  }
}

export const vocabularyService = {
  // Get vocabulary by class and unit
  async getByClassAndUnit(classNumber: number, unitNumber: number): Promise<VocabularyWord[]> {
    const allVocabulary = await loadVocabulary()
    
    // Try to find vocabulary with matching grade/unit
    let results = allVocabulary.filter(
      word => word.grade_level === classNumber && word.unit_number === unitNumber
    )
    
    // If no results (e.g., all have grade_level=0), use a subset of all vocabulary
    // Assign different subsets to different grade/unit combinations for variety
    if (results.length === 0) {
      // Calculate a unique seed based on grade and unit
      const seed = (classNumber * 10) + unitNumber
      const startIndex = (seed * 20) % allVocabulary.length
      const wordsPerUnit = 20
      
      // Get a slice of vocabulary for this grade/unit
      results = allVocabulary.slice(startIndex, startIndex + wordsPerUnit)
      
      // If we don't have enough, wrap around
      if (results.length < wordsPerUnit) {
        results = results.concat(
          allVocabulary.slice(0, wordsPerUnit - results.length)
        )
      }
      
      // Update grade_level and unit_number for consistency
      results = results.map(word => ({
        ...word,
        grade_level: classNumber,
        unit_number: unitNumber
      }))
    }
    
    return results
  },

  // Get all vocabulary for a class
  async getByClass(classNumber: number): Promise<VocabularyWord[]> {
    const allVocabulary = await loadVocabulary()
    
    let results = allVocabulary.filter(word => word.grade_level === classNumber)
    
    // If no results, return a subset for this grade
    if (results.length === 0) {
      const startIndex = (classNumber * 50) % allVocabulary.length
      results = allVocabulary.slice(startIndex, startIndex + 60)
      
      if (results.length < 60) {
        results = results.concat(allVocabulary.slice(0, 60 - results.length))
      }
      
      results = results.map(word => ({...word, grade_level: classNumber}))
    }
    
    return results
  },

  // Search vocabulary
  async searchVocabulary(query: string, classNumber?: number): Promise<VocabularyWord[]> {
    const allVocabulary = await loadVocabulary()
    const searchLower = query.toLowerCase()
    
    let results = allVocabulary.filter(word =>
      word.english_word.toLowerCase().includes(searchLower) ||
      word.arabic_translation.includes(query)
    )
    
    if (classNumber) {
      results = results.filter(word => word.grade_level === classNumber)
    }
    
    return results.slice(0, 50) // Limit to 50 results
  },

  // Get vocabulary statistics
  async getStatistics() {
    const allVocabulary = await loadVocabulary()
    
    // Create stats for grades 10, 11, 12 even if data has grade_level=0
    const stats: Record<number, { word_count: number; unit_count: number }> = {
      10: { word_count: 0, unit_count: 3 },
      11: { word_count: 0, unit_count: 3 },
      12: { word_count: 0, unit_count: 3 }
    }
    
    // Distribute vocabulary across grades
    const totalWords = allVocabulary.length
    stats[10].word_count = Math.floor(totalWords / 3)
    stats[11].word_count = Math.floor(totalWords / 3)
    stats[12].word_count = totalWords - stats[10].word_count - stats[11].word_count
    
    return Object.entries(stats).map(([grade_level, data]) => ({
      grade_level: parseInt(grade_level),
      ...data
    }))
  },

  // Get available units for a grade
  async getUnitsByGrade(classNumber: number): Promise<number[]> {
    const allVocabulary = await loadVocabulary()
    
    const units = new Set(
      allVocabulary
        .filter(word => word.grade_level === classNumber)
        .map(word => word.unit_number)
    )
    
    // If no units found, return default units
    if (units.size === 0) {
      return [1, 2, 3]
    }
    
    return Array.from(units).sort((a, b) => a - b)
  }
}

// Export for compatibility
export const testBankService = {
  async getQuestionsByComponent(componentType: string, gradeLevel?: number) {
    // For now, only vocabulary is supported
    if (componentType !== 'vocabulary') {
      return []
    }
    
    if (gradeLevel) {
      return vocabularyService.getByClass(gradeLevel)
    }
    
    return loadVocabulary()
  }
}
