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

async function populateGrade10Vocabulary() {
  console.log('\n=== Populating Grade 10 Vocabulary ===')
  
  const content = await fs.readFile('/workspace/user_input_files/Grade 10 level First Term .txt', 'utf-8')
  const lines = content.split('\n').map(l => l.trim()).filter(l => l)
  
  let currentUnit = null
  let vocabularyBatch = []
  let totalInserted = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect unit headers: "Unit 1: Topic Name" or "UNIT 1"
    if (line.match(/^Unit\s+(\d+)[\s:]/i)) {
      // Save previous unit's vocabulary
      if (vocabularyBatch.length > 0) {
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
      
      const match = line.match(/Unit\s+(\d+)/i)
      const unitNumber = parseInt(match[1])
      currentUnit = `Grade 10 Unit ${unitNumber}`
      console.log(`\nProcessing ${currentUnit}...`)
      continue
    }
    
    // Skip table headers and separators
    if (line.match(/^(English|Arabic|Meaning|Example|TableCopy|\||---)/i)) {
      continue
    }
    
    // Look for vocabulary words - they appear after unit headers
    // Format patterns in Grade 10 file:
    // 1. "word (part of speech)" followed by Arabic, meaning, example
    // 2. Lines with tab-separated or multi-line entries
    
    if (currentUnit && line.length > 2 && !line.startsWith('PART') && !line.startsWith('=')) {
      // Try to match vocabulary pattern: word (part of speech)
      const vocabMatch = line.match(/^([a-zA-Z\s-]+)\s*\(([^)]+)\)/)
      
      if (vocabMatch) {
        const word = vocabMatch[1].trim()
        const partOfSpeech = vocabMatch[2].trim()
        
        // Get Arabic translation (next line or same line)
        let arabic = ''
        let meaning = ''
        let example = ''
        
        // Look ahead for Arabic, meaning, and example on next few lines
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim()
          // Arabic is usually the first non-English text after the word
          if (nextLine && !nextLine.match(/^[a-zA-Z\s()]+$/)) {
            arabic = nextLine
            i++
          }
        }
        
        if (i + 1 < lines.length) {
          meaning = cleanText(lines[i + 1])
          i++
        }
        
        if (i + 1 < lines.length) {
          example = cleanText(lines[i + 1])
          i++
        }
        
        if (word && meaning) {
          vocabularyBatch.push({
            word: word,
            arabic_translation: arabic || 'N/A',
            phonetic: `(${partOfSpeech})`,
            difficulty_level: 'intermediate',
            category: currentUnit,
            usage_example: example || `Example with ${word}.`,
            audio_url: null
          })
        }
      }
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
  
  console.log(`\n✅ Grade 10 Vocabulary Complete: ${totalInserted} total words inserted`)
}

async function populateGrade10SetbookQuestions() {
  console.log('\n=== Populating Grade 10 Setbook Questions ===')
  
  const content = await fs.readFile('/workspace/user_input_files/Grade 10 level First Term .txt', 'utf-8')
  const lines = content.split('\n')
  
  let inSetbookSection = false
  let currentUnit = null
  let questions = []
  let currentQuestion = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Detect setbook section
    if (line.match(/PART.*SETBOOK|Setbook Questions/i)) {
      inSetbookSection = true
      console.log('Found setbook section')
      continue
    }
    
    if (!inSetbookSection) continue
    
    // Detect unit in setbook section
    if (line.match(/^Unit\s+(\d+)/i)) {
      const match = line.match(/Unit\s+(\d+)/i)
      currentUnit = parseInt(match[1])
      console.log(`Processing setbook Unit ${currentUnit}`)
      continue
    }
    
    // Detect questions (usually numbered or start with "Q:")
    const questionMatch = line.match(/^(\d+[\)\.:]|Q\d+[\)\.:]|Question\s+\d+)/i)
    
    if (questionMatch && currentUnit) {
      // Save previous question
      if (currentQuestion) {
        questions.push(currentQuestion)
      }
      
      // Start new question
      currentQuestion = {
        unit_number: currentUnit,
        question_text: line.replace(/^(\d+[\)\.:]|Q\d+[\)\.:]|Question\s+\d+)/i, '').trim(),
        question_text_arabic: '',
        answer: '',
        answer_arabic: '',
        page_reference: null
      }
    } else if (currentQuestion && line) {
      // Accumulate question text
      if (!currentQuestion.answer && !line.match(/^Answer|^A:/i)) {
        currentQuestion.question_text += ' ' + line
      } else if (line.match(/^Answer|^A:/i)) {
        currentQuestion.answer = line.replace(/^(Answer|A:)/i, '').trim()
      } else if (currentQuestion.answer) {
        currentQuestion.answer += ' ' + line
      }
    }
    
    // Stop at next major section
    if (line.match(/^PART\s+\d+|^===|Writing Topics/i) && inSetbookSection) {
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
      console.log(`✅ Inserted ${questions.length} Grade 10 setbook questions`)
    }
  } else {
    console.log('⚠️  No setbook questions found in expected format')
  }
}

// Run all population tasks
async function main() {
  try {
    console.log('Starting Grade 10 data population...')
    console.log('Supabase URL:', supabaseUrl)
    
    await populateGrade10Vocabulary()
    await populateGrade10SetbookQuestions()
    
    console.log('\n🎉 All Grade 10 data population complete!')
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main()
