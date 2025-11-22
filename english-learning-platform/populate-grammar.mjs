import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function populateGrammarQuestions() {
  console.log('=== POPULATING GRAMMAR QUESTIONS ===')
  
  const grammarData = [
    {
      question_text: 'Choose the correct form: "She ____ to the store yesterday."',
      options: { a: 'go', b: 'goes', c: 'went', d: 'going' },
      correct_answer: 'c',
      explanation_en: 'Past simple tense is used for completed actions in the past',
      difficulty_level: 1
    },
    {
      question_text: 'Which sentence is grammatically correct?',
      options: { a: 'He dont like pizza', b: 'He doesnt likes pizza', c: 'He doesnt like pizza', d: 'He not like pizza' },
      correct_answer: 'c',
      explanation_en: 'Correct negative form in present simple with third person singular',
      difficulty_level: 1
    },
    {
      question_text: 'Complete: "If I ____ rich, I would travel the world."',
      options: { a: 'am', b: 'was', c: 'were', d: 'be' },
      correct_answer: 'c',
      explanation_en: 'Second conditional uses were for hypothetical situations',
      difficulty_level: 2
    },
    {
      question_text: 'Choose the correct article: "She is ____ honest person."',
      options: { a: 'a', b: 'an', c: 'the', d: 'no article' },
      correct_answer: 'b',
      explanation_en: 'Use an before words starting with vowel sounds',
      difficulty_level: 1
    },
    {
      question_text: 'Complete the passive voice: "The cake ____ by my mother."',
      options: { a: 'bakes', b: 'is baking', c: 'was baked', d: 'has baking' },
      correct_answer: 'c',
      explanation_en: 'Passive voice uses be + past participle',
      difficulty_level: 2
    },
    {
      question_text: 'Choose correct: "I have lived here ____ five years."',
      options: { a: 'since', b: 'for', c: 'during', d: 'from' },
      correct_answer: 'b',
      explanation_en: 'For is used with periods of time',
      difficulty_level: 2
    },
    {
      question_text: 'Which is correct reported speech? Direct: "I will help you"',
      options: { a: 'He said he will help me', b: 'He said he would help me', c: 'He said he helps me', d: 'He said he helped me' },
      correct_answer: 'b',
      explanation_en: 'Will changes to would in reported speech',
      difficulty_level: 3
    },
    {
      question_text: 'Complete: "Neither John ____ Mary came to the party."',
      options: { a: 'or', b: 'nor', c: 'and', d: 'but' },
      correct_answer: 'b',
      explanation_en: 'Neither is paired with nor',
      difficulty_level: 2
    },
    {
      question_text: 'Choose correct: "By 2030, scientists ____ a cure for cancer."',
      options: { a: 'will find', b: 'will have found', c: 'are finding', d: 'have found' },
      correct_answer: 'b',
      explanation_en: 'Future perfect describes completed action by future time',
      difficulty_level: 3
    },
    {
      question_text: 'Identify the error: "The team are playing good today."',
      options: { a: 'team', b: 'are', c: 'playing', d: 'good' },
      correct_answer: 'd',
      explanation_en: 'Use well (adverb) not good (adjective) to modify verbs',
      difficulty_level: 2
    }
  ]
  
  // Add to all three grades and all units
  for (let gradeNum of [10, 11, 12]) {
    const { data: grade } = await supabase
      .from('grades')
      .select('id')
      .eq('grade_number', gradeNum)
      .single()
    
    if (!grade) continue
    
    const { data: units } = await supabase
      .from('units')
      .select('id')
      .eq('grade_id', grade.id)
      .limit(1)
    
    if (!units || units.length === 0) continue
    
    const questionsWithUnit = grammarData.map(q => ({
      unit_id: units[0].id,
      question_text: q.question_text,
      question_type: 'multiple_choice',
      correct_answer: q.correct_answer,
      options: q.options,
      explanation_en: q.explanation_en,
      difficulty_level: q.difficulty_level
    }))
    
    const { error } = await supabase
      .from('grammar_questions')
      .insert(questionsWithUnit)
    
    if (error) {
      console.error(`Error for Grade ${gradeNum}:`, error.message)
    } else {
      console.log(`✓ Inserted ${questionsWithUnit.length} grammar questions for Grade ${gradeNum}`)
    }
  }
  
  const { count } = await supabase
    .from('grammar_questions')
    .select('*', { count: 'exact', head: true })
  
  console.log(`\nTotal grammar questions: ${count}`)
}

populateGrammarQuestions()
