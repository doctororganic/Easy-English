import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

function cleanText(text) {
  return text?.replace(/\r/g, '').replace(/\n/g, ' ').trim() || ''
}

async function populateGrade12Vocabulary() {
  console.log('\n=== Populating Grade 12 Vocabulary ===')
  
  const content = await fs.readFile('/workspace/user_input_files/12 level.txt', 'utf-8')
  const lines = content.split('\n').map(l => l.trim()).filter(l => l)
  
  let currentUnit = null
  let vocabularyBatch = []
  let totalInserted = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect unit headers: **vocab unit-X (Topic)**
    if (line.match(/\*\*vocab\s+unit-(\d+)/i)) {
      // Save previous unit's vocabulary
      if (vocabularyBatch.length > 0 && currentUnit) {
        console.log(`Inserting ${vocabularyBatch.length} words for ${currentUnit}...`)
        const { data, error } = await supabase
          .from('vocabulary')
          .insert(vocabularyBatch)
        
        if (error) {
          console.error(`Error inserting vocabulary for ${currentUnit}:`, error.message)
        } else {
          totalInserted += vocabularyBatch.length
          console.log(`✓ Inserted ${vocabularyBatch.length} words for ${currentUnit}`)
        }
        vocabularyBatch = []
      }
      
      const match = line.match(/vocab\s+unit-(\d+)/i)
      const unitNumber = parseInt(match[1])
      currentUnit = `Grade 12 Unit ${unitNumber}`
      console.log(`\nProcessing ${currentUnit}...`)
      continue
    }
    
    // Parse vocabulary entries
    // Format: number. word (part) - English definition - Arabic
    // Example: 1. adoption (n) - the action of legally taking another's child - تبني
    const vocabMatch = line.match(/^(\d+)\.\s+([a-zA-Z\s-]+)\s*\(([^)]+)\)\s*-\s*(.+?)\s*-\s*(.+)$/)
    
    if (vocabMatch && currentUnit) {
      const [, number, word, partOfSpeech, meaning, arabic] = vocabMatch
      
      vocabularyBatch.push({
        word: cleanText(word),
        arabic_translation: cleanText(arabic),
        phonetic: `(${cleanText(partOfSpeech)})`,
        difficulty_level: 'advanced',
        category: currentUnit,
        usage_example: `Example: ${cleanText(word)} is used in legal contexts.`,
        audio_url: null
      })
    }
  }
  
  // Insert remaining batch
  if (vocabularyBatch.length > 0 && currentUnit) {
    console.log(`\nInserting final batch of ${vocabularyBatch.length} words for ${currentUnit}...`)
    const { data, error } = await supabase
      .from('vocabulary')
      .insert(vocabularyBatch)
    
    if (error) {
      console.error(`Error inserting final vocabulary:`, error.message)
    } else {
      totalInserted += vocabularyBatch.length
      console.log(`✓ Inserted ${vocabularyBatch.length} words`)
    }
  }
  
  console.log(`\n✅ Grade 12 Vocabulary Complete: ${totalInserted} total words inserted`)
}

async function populateGrade12SetbookQuestions() {
  console.log('\n=== Populating Grade 12 Setbook Questions ===')
  
  const content = await fs.readFile('/workspace/user_input_files/12 level.txt', 'utf-8')
  const lines = content.split('\n')
  
  let inSetbookSection = false
  let currentUnit = null
  let questions = []
  let currentQuestion = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Detect setbook section
    if (line.match(/Setbook Questions|Set Book|Set-book/i)) {
      inSetbookSection = true
      console.log('Found setbook section')
      continue
    }
    
    if (!inSetbookSection) continue
    
    // Detect unit
    if (line.match(/Unit\s+(\d+)/i)) {
      const match = line.match(/Unit\s+(\d+)/i)
      currentUnit = parseInt(match[1])
      console.log(`Processing setbook Unit ${currentUnit}`)
      continue
    }
    
    // Detect questions
    const questionMatch = line.match(/^(\d+[\)\.:]|Q\d+)/i)
    
    if (questionMatch && currentUnit) {
      // Save previous question
      if (currentQuestion) {
        questions.push(currentQuestion)
      }
      
      // Start new question
      currentQuestion = {
        unit_number: currentUnit,
        question_text: line.replace(/^(\d+[\)\.:]|Q\d+)/i, '').trim(),
        question_text_arabic: '',
        answer: '',
        answer_arabic: '',
        page_reference: null
      }
    } else if (currentQuestion && line) {
      // Accumulate question or answer text
      if (!currentQuestion.answer && !line.match(/^Answer|^A:/i)) {
        currentQuestion.question_text += ' ' + line
      } else if (line.match(/^Answer|^A:/i)) {
        currentQuestion.answer = line.replace(/^(Answer|A:)/i, '').trim()
      } else if (currentQuestion.answer) {
        currentQuestion.answer += ' ' + line
      }
    }
    
    // Stop at vocabulary section
    if (line.match(/\*\*vocab/i)) {
      break
    }
  }
  
  // Add last question
  if (currentQuestion) {
    questions.push(currentQuestion)
  }
  
  // Insert questions
  if (questions.length > 0) {
    console.log(`\nInserting ${questions.length} setbook questions...`)
    const { data, error } = await supabase
      .from('setbook_questions')
      .insert(questions)
    
    if (error) {
      console.error('Error inserting setbook questions:', error.message)
    } else {
      console.log(`✅ Inserted ${questions.length} Grade 12 setbook questions`)
    }
  } else {
    console.log('⚠️  No setbook questions found in expected format')
  }
}

// Run all population tasks
async function main() {
  try {
    console.log('Starting Grade 12 data population...')
    console.log('Supabase URL:', supabaseUrl)
    
    await populateGrade12Vocabulary()
    await populateGrade12SetbookQuestions()
    
    console.log('\n🎉 All Grade 12 data population complete!')
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main()
