import { supabase, Grade, Unit, VocabularyItem, SetbookQuestion, WritingTopic, FunctionalLanguageQuestion } from '../lib/supabase'

class SupabaseDataService {
  private static instance: SupabaseDataService
  private gradesCache: Grade[] | null = null
  private unitsCache: Map<number, Unit[]> = new Map()

  private constructor() {}

  static getInstance(): SupabaseDataService {
    if (!SupabaseDataService.instance) {
      SupabaseDataService.instance = new SupabaseDataService()
    }
    return SupabaseDataService.instance
  }

  // Fetch all grades
  async getGrades(): Promise<Grade[]> {
    if (this.gradesCache) {
      return this.gradesCache
    }

    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('grade_number')

    if (error) {
      console.error('Error fetching grades:', error)
      throw error
    }

    this.gradesCache = data || []
    return this.gradesCache
  }

  // Fetch units for a specific grade
  async getUnitsByGrade(gradeNumber: number): Promise<Unit[]> {
    if (this.unitsCache.has(gradeNumber)) {
      return this.unitsCache.get(gradeNumber)!
    }

    // First get the grade ID
    const grades = await this.getGrades()
    const grade = grades.find(g => g.grade_number === gradeNumber)
    
    if (!grade) {
      return []
    }

    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('grade_id', grade.id)
      .order('unit_number')

    if (error) {
      console.error('Error fetching units:', error)
      throw error
    }

    const units = data || []
    this.unitsCache.set(gradeNumber, units)
    return units
  }

  // Fetch vocabulary (with pagination and filtering)
  async getVocabulary(options?: {
    category?: string
    search?: string
    limit?: number
    offset?: number
  }): Promise<VocabularyItem[]> {
    let query = supabase
      .from('vocabulary')
      .select('*')

    if (options?.category) {
      query = query.eq('category', options.category)
    }

    if (options?.search) {
      query = query.or(`word.ilike.%${options.search}%,arabic_translation.ilike.%${options.search}%`)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching vocabulary:', error)
      throw error
    }

    return data || []
  }

  // Fetch vocabulary categories
  async getVocabularyCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('vocabulary')
      .select('category')
      .not('category', 'is', null)

    if (error) {
      console.error('Error fetching categories:', error)
      throw error
    }

    const categories = [...new Set((data || []).map(item => item.category).filter(Boolean))]
    return categories as string[]
  }

  // Fetch setbook questions for a specific unit
  async getSetbookQuestions(unitId: number): Promise<SetbookQuestion[]> {
    const { data, error } = await supabase
      .from('setbook_questions')
      .select('*')
      .eq('unit_id', unitId)
      .order('id')

    if (error) {
      console.error('Error fetching setbook questions:', error)
      throw error
    }

    return data || []
  }

  // Fetch all setbook questions for a grade
  async getSetbookQuestionsByGrade(gradeNumber: number): Promise<SetbookQuestion[]> {
    const units = await this.getUnitsByGrade(gradeNumber)
    const unitIds = units.map(u => u.id)

    if (unitIds.length === 0) {
      return []
    }

    const { data, error } = await supabase
      .from('setbook_questions')
      .select('*')
      .in('unit_id', unitIds)
      .order('unit_id')

    if (error) {
      console.error('Error fetching setbook questions:', error)
      throw error
    }

    return data || []
  }

  // Fetch writing topics for a grade
  async getWritingTopicsByGrade(gradeNumber: number): Promise<WritingTopic[]> {
    const grades = await this.getGrades()
    const grade = grades.find(g => g.grade_number === gradeNumber)
    
    if (!grade) {
      return []
    }

    const { data, error } = await supabase
      .from('writing_topics')
      .select('*')
      .eq('grade_id', grade.id)
      .order('id')

    if (error) {
      console.error('Error fetching writing topics:', error)
      throw error
    }

    return data || []
  }

  // Fetch functional language questions by block
  async getFunctionalLanguageQuestions(blockNumber?: number): Promise<FunctionalLanguageQuestion[]> {
    let query = supabase
      .from('functional_language_questions')
      .select('*')

    if (blockNumber !== undefined) {
      query = query.eq('block_number', blockNumber)
    }

    query = query.order('block_number').order('id')

    const { data, error } = await query

    if (error) {
      console.error('Error fetching functional language questions:', error)
      throw error
    }

    return data || []
  }

  // Get unique block numbers
  async getFunctionalLanguageBlocks(): Promise<number[]> {
    const { data, error } = await supabase
      .from('functional_language_questions')
      .select('block_number')

    if (error) {
      console.error('Error fetching blocks:', error)
      throw error
    }

    const blocks = [...new Set((data || []).map(item => item.block_number))]
    return blocks.sort((a, b) => a - b)
  }

  // Fetch translation exercises for a grade
  async getTranslationExercisesByGrade(gradeNumber: number): Promise<any[]> {
    const grades = await this.getGrades()
    const grade = grades.find(g => g.grade_number === gradeNumber)
    
    if (!grade) {
      return []
    }

    const { data, error } = await supabase
      .from('translation_exercises')
      .select('*')
      .eq('grade_id', grade.id)
      .order('id')

    if (error) {
      console.error('Error fetching translation exercises:', error)
      throw error
    }

    return data || []
  }

  // Clear caches (useful for refreshing data)
  clearCache() {
    this.gradesCache = null
    this.unitsCache.clear()
  }
}

export const supabaseDataService = SupabaseDataService.getInstance()
