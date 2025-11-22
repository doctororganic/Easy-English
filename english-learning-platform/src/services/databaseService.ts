import { supabase } from '../lib/supabase'

// ============================================
// VOCABULARY SERVICE
// ============================================

export interface VocabularyWord {
  id: number
  word: string
  class_number: number
  unit_number: number
  definition_en: string
  definition_ar: string
  phonetic: string
  examples: string[]
  category: string
  difficulty_level: number
  audio_url?: string
}

export const vocabularyService = {
  // Get vocabulary by class and unit
  async getByClassAndUnit(classNumber: number, unitNumber: number): Promise<VocabularyWord[]> {
    const { data, error } = await supabase
      .from('kuwait_vocabulary')
      .select('*')
      .eq('class_number', classNumber)
      .eq('unit_number', unitNumber)
      .order('order_in_unit')
    
    if (error) {
      console.error('Error fetching vocabulary:', error)
      return []
    }
    
    return data || []
  },

  // Get single vocabulary word
  async getById(id: number): Promise<VocabularyWord | null> {
    const { data, error } = await supabase
      .from('kuwait_vocabulary')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching vocabulary:', error)
      return null
    }
    
    return data
  },

  // Search vocabulary
  async search(query: string): Promise<VocabularyWord[]> {
    const { data, error } = await supabase
      .from('kuwait_vocabulary')
      .select('*')
      .ilike('word', `%${query}%`)
      .limit(20)
    
    if (error) {
      console.error('Error searching vocabulary:', error)
      return []
    }
    
    return data || []
  }
}

// ============================================
// TEST BANK SERVICE
// ============================================

export interface TestQuestion {
  id: number
  question_id: string
  class_number: number
  unit_number: number
  component_type: string
  question_number: number
  question_text: string
  question_type: string
  options?: Record<string, string>
  correct_answer?: string
  explanation?: string
  difficulty_level: number
}

export const testBankService = {
  // Get questions by component type
  async getQuestionsByComponent(
    classNumber: number,
    unitNumber: number,
    componentType: string
  ): Promise<TestQuestion[]> {
    const { data, error } = await supabase
      .from('test_bank_questions')
      .select('*')
      .eq('class_number', classNumber)
      .eq('unit_number', unitNumber)
      .eq('component_type', componentType)
      .order('question_number')
    
    if (error) {
      console.error('Error fetching questions:', error)
      return []
    }
    
    return data || []
  },

  // Get random questions for practice
  async getRandomQuestions(
    classNumber: number,
    componentType: string,
    count: number = 10
  ): Promise<TestQuestion[]> {
    const { data, error } = await supabase
      .from('test_bank_questions')
      .select('*')
      .eq('class_number', classNumber)
      .eq('component_type', componentType)
      .limit(count)
    
    if (error) {
      console.error('Error fetching random questions:', error)
      return []
    }
    
    // Shuffle array
    return (data || []).sort(() => Math.random() - 0.5)
  }
}

// ============================================
// SET BOOK SERVICE
// ============================================

export interface SetBookPassage {
  id: number
  class_number: number
  unit_number: number
  passage_title: string
  passage_text: string
  passage_text_ar: string
  theme: string
  key_vocabulary: string[]
  discussion_questions: string[]
}

export const setBookService = {
  // Get passage by class and unit
  async getPassage(classNumber: number, unitNumber: number): Promise<SetBookPassage | null> {
    const { data, error } = await supabase
      .from('set_book_content')
      .select('*')
      .eq('class_number', classNumber)
      .eq('unit_number', unitNumber)
      .single()
    
    if (error) {
      console.error('Error fetching set book passage:', error)
      return null
    }
    
    return data
  },

  // Get all passages for a class
  async getPassagesByClass(classNumber: number): Promise<SetBookPassage[]> {
    const { data, error } = await supabase
      .from('set_book_content')
      .select('*')
      .eq('class_number', classNumber)
      .order('unit_number')
    
    if (error) {
      console.error('Error fetching passages:', error)
      return []
    }
    
    return data || []
  }
}

// ============================================
// GRAMMAR SERVICE
// ============================================

export interface GrammarTopic {
  id: number
  topic_name: string
  class_number: number
  unit_number: number
  description: string
  rules: string[]
  examples: Array<{ sentence: string; type?: string; connector?: string }>
  difficulty_level: number
}

export const grammarService = {
  // Get grammar topics by class and unit
  async getTopics(classNumber: number, unitNumber: number): Promise<GrammarTopic[]> {
    const { data, error } = await supabase
      .from('grammar_topics')
      .select('*')
      .eq('class_number', classNumber)
      .eq('unit_number', unitNumber)
    
    if (error) {
      console.error('Error fetching grammar topics:', error)
      return []
    }
    
    return data || []
  },

  // Get all grammar topics for a class
  async getTopicsByClass(classNumber: number): Promise<GrammarTopic[]> {
    const { data, error } = await supabase
      .from('grammar_topics')
      .select('*')
      .eq('class_number', classNumber)
      .order('unit_number')
    
    if (error) {
      console.error('Error fetching grammar topics:', error)
      return []
    }
    
    return data || []
  }
}

// ============================================
// USER GOALS SERVICE
// ============================================

export interface UserGoal {
  id: number
  user_id: string
  goal_number: number
  goal_text: string
  status: 'active' | 'completed' | 'cancelled'
  target_date?: string
  created_at: string
  updated_at: string
  completed_at?: string
}

export const goalsService = {
  // Save goals (upsert)
  async saveGoals(userId: string, goals: Array<{ number: number; text: string; status: string }>): Promise<boolean> {
    try {
      // Delete existing goals for this user
      await supabase
        .from('user_goals')
        .delete()
        .eq('user_id', userId)
      
      // Insert new goals
      const goalsToInsert = goals
        .filter(g => g.text.trim())
        .map(g => ({
          user_id: userId,
          goal_number: g.number,
          goal_text: g.text,
          status: g.status,
          completed_at: g.status === 'completed' ? new Date().toISOString() : null
        }))
      
      if (goalsToInsert.length > 0) {
        const { error } = await supabase
          .from('user_goals')
          .insert(goalsToInsert)
        
        if (error) {
          console.error('Error saving goals:', error)
          return false
        }
      }
      
      return true
    } catch (error) {
      console.error('Error in saveGoals:', error)
      return false
    }
  },

  // Get user goals
  async getUserGoals(userId: string): Promise<UserGoal[]> {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .order('goal_number')
    
    if (error) {
      console.error('Error fetching goals:', error)
      return []
    }
    
    return data || []
  }
}

// ============================================
// PROGRESS TRACKING SERVICE
// ============================================

export interface UserProgress {
  id: number
  user_id: string
  class_number: number
  unit_number: number
  component_type: string
  items_completed: number
  items_total: number
  score_average: number
  time_spent_minutes: number
  last_accessed: string
}

export const progressService = {
  // Record progress
  async recordProgress(
    userId: string,
    classNumber: number,
    unitNumber: number,
    componentType: string,
    updates: Partial<UserProgress>
  ): Promise<boolean> {
    try {
      const { data: existing } = await supabase
        .from('user_progress_tracking')
        .select('*')
        .eq('user_id', userId)
        .eq('class_number', classNumber)
        .eq('unit_number', unitNumber)
        .eq('component_type', componentType)
        .single()
      
      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('user_progress_tracking')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)
        
        return !error
      } else {
        // Insert new
        const { error } = await supabase
          .from('user_progress_tracking')
          .insert({
            user_id: userId,
            class_number: classNumber,
            unit_number: unitNumber,
            component_type: componentType,
            ...updates
          })
        
        return !error
      }
    } catch (error) {
      console.error('Error recording progress:', error)
      return false
    }
  },

  // Get user progress
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from('user_progress_tracking')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false })
    
    if (error) {
      console.error('Error fetching progress:', error)
      return []
    }
    
    return data || []
  }
}
