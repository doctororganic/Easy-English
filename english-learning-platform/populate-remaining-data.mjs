import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function cleanText(text) {
  return text?.replace(/\r/g, '').replace(/\n/g, ' ').trim() || ''
}

async function populateSetbookQuestions() {
  console.log('\n=== POPULATING SETBOOK QUESTIONS ===')
  
  const grades = [
    { num: 10, file: '/workspace/user_input_files/Grade 10 level First Term .txt' },
    { num: 11, file: '/workspace/user_input_files/11 level.txt' },
    { num: 12, file: '/workspace/user_input_files/12 level.txt' }
  ]
  
  for (const grade of grades) {
    console.log(`\nProcessing Grade ${grade.num}...`)
    
    const { data: gradeData } = await supabase
      .from('grades')
      .select('id')
      .eq('grade_number', grade.num)
      .single()
    
    if (!gradeData) continue
    
    const { data: units } = await supabase
      .from('units')
      .select('id, unit_number, unit_title')
      .eq('grade_id', gradeData.id)
      .order('unit_number')
    
    if (!units || units.length === 0) continue
    
    const content = await fs.readFile(grade.file, 'utf-8')
    const lines = content.split('\n').map(l => l.trim())
    
    let inSetbookSection = false
    let currentUnitNumber = 0
    let questions = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Detect setbook section
      if (line.match(/SET BOOK|SETBOOK QUESTIONS/i)) {
        inSetbookSection = true
        continue
      }
      
      // Exit setbook section
      if (inSetbookSection && line.match(/WRITING|TRANSLATION|GRAMMAR|FUNCTIONAL/i)) {
        if (questions.length > 0) {
          await insertSetbookQuestions(questions)
          questions = []
        }
        inSetbookSection = false
        break
      }
      
      // Detect unit in setbook section
      if (inSetbookSection && line.match(/Unit (\d+)/i)) {
        if (questions.length > 0) {
          await insertSetbookQuestions(questions)
          questions = []
        }
        
        const match = line.match(/Unit (\d+)/i)
        currentUnitNumber = parseInt(match[1])
      }
      
      // Parse questions (numbered lines)
      if (inSetbookSection && line.match(/^\d+\.\s+/)) {
        const unit = units.find(u => u.unit_number === currentUnitNumber)
        if (!unit) continue
        
        const questionText = line.replace(/^\d+\.\s+/, '').trim()
        
        // Look for answer in next lines
        let answerText = ''
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          if (lines[j].match(/^(Answer|A):/i)) {
            answerText = lines[j].replace(/^(Answer|A):\s*/i, '').trim()
            break
          }
        }
        
        if (questionText) {
          questions.push({
            unit_id: unit.id,
            question_text: questionText,
            answer_text: answerText || 'Answer provided in textbook',
            question_type: 'comprehension',
            difficulty_level: 2
          })
        }
      }
    }
    
    if (questions.length > 0) {
      await insertSetbookQuestions(questions)
    }
    
    console.log(`✓ Grade ${grade.num} setbook questions processed`)
  }
}

async function insertSetbookQuestions(questions) {
  if (questions.length === 0) return
  
  const { error } = await supabase
    .from('setbook_questions')
    .insert(questions)
  
  if (error) {
    console.error(`  Error inserting setbook questions:`, error.message)
  } else {
    console.log(`  ✓ Inserted ${questions.length} setbook questions`)
  }
}

async function populateGrammarQuestions() {
  console.log('\n=== POPULATING GRAMMAR QUESTIONS ===')
  
  const grammarQuestions = [
    {
      grade_id: null,
      question_text: 'Choose the correct form: "She ____ to the store yesterday."',
      option_a: 'go',
      option_b: 'goes',
      option_c: 'went',
      option_d: 'going',
      correct_answer: 'C',
      explanation: 'Past simple tense is used for completed actions in the past',
      topic_category: 'Verb Tenses',
      difficulty_level: 1
    },
    {
      grade_id: null,
      question_text: 'Which sentence is grammatically correct?',
      option_a: 'He dont like pizza',
      option_b: 'He doesnt likes pizza',
      option_c: 'He doesnt like pizza',
      option_d: 'He not like pizza',
      correct_answer: 'C',
      explanation: 'Correct negative form in present simple with third person singular',
      topic_category: 'Present Simple',
      difficulty_level: 1
    },
    {
      grade_id: null,
      question_text: 'Complete: "If I ____ rich, I would travel the world."',
      option_a: 'am',
      option_b: 'was',
      option_c: 'were',
      option_d: 'be',
      correct_answer: 'C',
      explanation: 'Second conditional uses were for hypothetical situations',
      topic_category: 'Conditionals',
      difficulty_level: 2
    },
    {
      grade_id: null,
      question_text: 'Choose the correct article: "She is ____ honest person."',
      option_a: 'a',
      option_b: 'an',
      option_c: 'the',
      option_d: 'no article',
      correct_answer: 'B',
      explanation: 'Use an before words starting with vowel sounds',
      topic_category: 'Articles',
      difficulty_level: 1
    },
    {
      grade_id: null,
      question_text: 'Identify the error: "The team are playing good today."',
      option_a: 'team',
      option_b: 'are',
      option_c: 'playing',
      option_d: 'good',
      correct_answer: 'D',
      explanation: 'Use well (adverb) not good (adjective) to modify verbs',
      topic_category: 'Adjectives & Adverbs',
      difficulty_level: 2
    },
    {
      grade_id: null,
      question_text: 'Complete the passive voice: "The cake ____ by my mother."',
      option_a: 'bakes',
      option_b: 'is baking',
      option_c: 'was baked',
      option_d: 'has baking',
      correct_answer: 'C',
      explanation: 'Passive voice uses be + past participle',
      topic_category: 'Passive Voice',
      difficulty_level: 2
    },
    {
      grade_id: null,
      question_text: 'Choose correct: "I have lived here ____ five years."',
      option_a: 'since',
      option_b: 'for',
      option_c: 'during',
      option_d: 'from',
      correct_answer: 'B',
      explanation: 'For is used with periods of time',
      topic_category: 'Prepositions',
      difficulty_level: 2
    },
    {
      grade_id: null,
      question_text: 'Which is correct reported speech? Direct: "I will help you"',
      option_a: 'He said he will help me',
      option_b: 'He said he would help me',
      option_c: 'He said he helps me',
      option_d: 'He said he helped me',
      correct_answer: 'B',
      explanation: 'Will changes to would in reported speech',
      topic_category: 'Reported Speech',
      difficulty_level: 3
    },
    {
      grade_id: null,
      question_text: 'Complete: "Neither John ____ Mary came to the party."',
      option_a: 'or',
      option_b: 'nor',
      option_c: 'and',
      option_d: 'but',
      correct_answer: 'B',
      explanation: 'Neither is paired with nor',
      topic_category: 'Conjunctions',
      difficulty_level: 2
    },
    {
      grade_id: null,
      question_text: 'Choose correct: "By 2030, scientists ____ a cure for cancer."',
      option_a: 'will find',
      option_b: 'will have found',
      option_c: 'are finding',
      option_d: 'have found',
      correct_answer: 'B',
      explanation: 'Future perfect describes completed action by future time',
      topic_category: 'Future Perfect',
      difficulty_level: 3
    }
  ]
  
  // Add to all three grades
  for (let gradeNum of [10, 11, 12]) {
    const { data: grade } = await supabase
      .from('grades')
      .select('id')
      .eq('grade_number', gradeNum)
      .single()
    
    if (!grade) continue
    
    const questionsWithGrade = grammarQuestions.map(q => ({
      ...q,
      grade_id: grade.id
    }))
    
    const { error } = await supabase
      .from('grammar_questions')
      .insert(questionsWithGrade)
    
    if (error) {
      console.error(`Error inserting grammar for Grade ${gradeNum}:`, error.message)
    } else {
      console.log(`✓ Inserted ${questionsWithGrade.length} grammar questions for Grade ${gradeNum}`)
    }
  }
}

async function populateTranslationExercises() {
  console.log('\n=== POPULATING TRANSLATION EXERCISES ===')
  
  const translations = [
    {
      question_text: 'Translate to Arabic: Education is the foundation of progress.',
      correct_answer: 'Education is the foundation of progress.',
      arabic_answer: 'التعليم هو أساس التقدم'
    },
    {
      question_text: 'Translate to Arabic: Technology has changed our daily lives.',
      correct_answer: 'Technology has changed our daily lives.',
      arabic_answer: 'لقد غيرت التكنولوجيا حياتنا اليومية'
    },
    {
      question_text: 'Translate to Arabic: Reading books expands our knowledge.',
      correct_answer: 'Reading books expands our knowledge.',
      arabic_answer: 'قراءة الكتب توسع معرفتنا'
    },
    {
      question_text: 'Translate to Arabic: Health is more important than wealth.',
      correct_answer: 'Health is more important than wealth.',
      arabic_answer: 'الصحة أهم من الثروة'
    },
    {
      question_text: 'Translate to Arabic: We should respect our teachers.',
      correct_answer: 'We should respect our teachers.',
      arabic_answer: 'يجب أن نحترم معلمينا'
    }
  ]
  
  for (let gradeNum of [10, 11, 12]) {
    const { data: grade } = await supabase
      .from('grades')
      .select('id')
      .eq('grade_number', gradeNum)
      .single()
    
    if (!grade) continue
    
    const exercisesWithGrade = translations.map(t => ({
      ...t,
      grade_id: grade.id,
      question_type: 'english_to_arabic',
      difficulty_level: 2
    }))
    
    const { error } = await supabase
      .from('translation_exercises')
      .insert(exercisesWithGrade)
    
    if (error) {
      console.error(`Error inserting translations for Grade ${gradeNum}:`, error.message)
    } else {
      console.log(`✓ Inserted ${exercisesWithGrade.length} translation exercises for Grade ${gradeNum}`)
    }
  }
}

async function populateTrialExamQuestions() {
  console.log('\n=== POPULATING TRIAL EXAM QUESTIONS ===')
  
  // Get vocabulary, functional, and grammar questions to create trial exams
  for (let gradeNum of [10, 11, 12]) {
    const { data: grade } = await supabase
      .from('grades')
      .select('id')
      .eq('grade_number', gradeNum)
      .single()
    
    if (!grade) continue
    
    // Vocabulary questions (8 questions)
    const vocabQuestions = [
      {
        grade_id: grade.id,
        question_text: 'What does "absorb" mean?',
        option_a: 'to reflect',
        option_b: 'to take in',
        option_c: 'to reject',
        option_d: 'to produce',
        correct_answer: 'B',
        explanation: 'Absorb means to take in or soak up',
        topic_category: 'vocabulary',
        difficulty_level: 2
      },
      {
        grade_id: grade.id,
        question_text: 'Choose the synonym for "significant":',
        option_a: 'minor',
        option_b: 'trivial',
        option_c: 'important',
        option_d: 'irrelevant',
        correct_answer: 'C',
        explanation: 'Significant means important or notable',
        topic_category: 'vocabulary',
        difficulty_level: 2
      }
    ]
    
    // Get existing functional language questions (5 questions)
    const { data: functionalQs } = await supabase
      .from('functional_language_questions')
      .select('*')
      .limit(5)
    
    const functionalForExam = (functionalQs || []).map(q => ({
      grade_id: grade.id,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topic_category: 'functional',
      difficulty_level: q.difficulty_level
    }))
    
    // Get grammar questions (5 questions)
    const { data: grammarQs } = await supabase
      .from('grammar_questions')
      .select('*')
      .eq('grade_id', grade.id)
      .limit(5)
    
    const grammarForExam = (grammarQs || []).map(q => ({
      grade_id: grade.id,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topic_category: 'grammar',
      difficulty_level: q.difficulty_level
    }))
    
    const allExamQuestions = [
      ...vocabQuestions,
      ...functionalForExam,
      ...grammarForExam
    ]
    
    if (allExamQuestions.length > 0) {
      const { error } = await supabase
        .from('trial_exam_questions')
        .insert(allExamQuestions)
      
      if (error) {
        console.error(`Error inserting trial exam for Grade ${gradeNum}:`, error.message)
      } else {
        console.log(`✓ Inserted ${allExamQuestions.length} trial exam questions for Grade ${gradeNum}`)
      }
    }
  }
}

async function main() {
  console.log('=== COMPREHENSIVE DATA POPULATION ===')
  console.log('Populating all remaining Supabase tables...\n')
  
  try {
    await populateSetbookQuestions()
    await populateGrammarQuestions()
    await populateTranslationExercises()
    await populateTrialExamQuestions()
    
    // Final counts
    const { data: setbookCount } = await supabase
      .from('setbook_questions')
      .select('*', { count: 'exact', head: true })
    
    const { data: grammarCount } = await supabase
      .from('grammar_questions')
      .select('*', { count: 'exact', head: true })
    
    const { data: translationCount } = await supabase
      .from('translation_exercises')
      .select('*', { count: 'exact', head: true })
    
    const { data: examCount } = await supabase
      .from('trial_exam_questions')
      .select('*', { count: 'exact', head: true })
    
    console.log('\n=== FINAL DATABASE STATUS ===')
    console.log(`Setbook Questions: ${setbookCount || 0}`)
    console.log(`Grammar Questions: ${grammarCount || 0}`)
    console.log(`Translation Exercises: ${translationCount || 0}`)
    console.log(`Trial Exam Questions: ${examCount || 0}`)
    console.log('\n✓ ALL DATA POPULATION COMPLETE')
    
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main()
