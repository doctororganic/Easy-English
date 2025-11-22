import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to clean text
function cleanText(text) {
  return text?.replace(/\r/g, '').trim() || ''
}

// Step 1: Ensure grades exist
async function ensureGrades() {
  console.log('\n=== Step 1: Ensuring Grades ===')
  
  const grades = [
    { grade_number: 10, grade_name: 'Grade 10', description: 'First Term' },
    { grade_number: 11, grade_name: 'Grade 11', description: 'Complete Curriculum' },
    { grade_number: 12, grade_name: 'Grade 12', description: 'Complete Curriculum' }
  ]
  
  for (const grade of grades) {
    const { data: existing } = await supabase
      .from('grades')
      .select('id')
      .eq('grade_number', grade.grade_number)
      .single()
    
    if (!existing) {
      const { error } = await supabase.from('grades').insert(grade)
      if (error) {
        console.error(`Error inserting grade ${grade.grade_number}:`, error.message)
      } else {
        console.log(`✓ Inserted Grade ${grade.grade_number}`)
      }
    } else {
      console.log(`✓ Grade ${grade.grade_number} already exists`)
    }
  }
}

// Step 2: Parse and populate vocabulary
async function populateVocabulary(gradeNumber, filePath) {
  console.log(`\n=== Populating Vocabulary for Grade ${gradeNumber} ===`)
  
  const content = await fs.readFile(filePath, 'utf-8')
  const lines = content.split('\n').map(l => cleanText(l))
  
  // Get grade ID
  const { data: grade } = await supabase
    .from('grades')
    .select('id')
    .eq('grade_number', gradeNumber)
    .single()
  
  if (!grade) {
    console.error(`Grade ${gradeNumber} not found`)
    return
  }
  
  const gradeId = grade.id
  let currentUnit = null
  let unitId = null
  let vocabularyItems = []
  let unitNumber = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect unit headers (e.g., "Unit 1: Nutrition & Health")
    if (line.match(/^Unit \d+:/i)) {
      // Save previous unit's vocabulary
      if (vocabularyItems.length > 0) {
        await insertVocabularyBatch(vocabularyItems, unitId)
        vocabularyItems = []
      }
      
      unitNumber++
      const unitTitle = line.replace(/^Unit \d+:\s*/i, '').trim()
      currentUnit = unitTitle
      
      // Insert or get unit
      const { data: existingUnit } = await supabase
        .from('units')
        .select('id')
        .eq('grade_id', gradeId)
        .eq('unit_number', unitNumber)
        .single()
      
      if (existingUnit) {
        unitId = existingUnit.id
        console.log(`  Using existing Unit ${unitNumber}: ${unitTitle}`)
      } else {
        const { data: newUnit, error } = await supabase
          .from('units')
          .insert({
            grade_id: gradeId,
            unit_number: unitNumber,
            unit_title: unitTitle
          })
          .select('id')
          .single()
        
        if (error) {
          console.error(`Error creating unit: ${error.message}`)
        } else {
          unitId = newUnit.id
          console.log(`  Created Unit ${unitNumber}: ${unitTitle}`)
        }
      }
    }
    
    // Parse vocabulary entries (tab-separated: English, Arabic, Meaning, Example)
    if (line.includes('\t') && unitId) {
      const parts = line.split('\t').map(p => cleanText(p))
      if (parts.length >= 3 && parts[0] && !parts[0].match(/^(English|TableCopy|الترجمة)/i)) {
        const word = parts[0].replace(/\s*\([^)]*\)/, '').trim() // Remove (n), (v), etc.
        const arabic = parts[1]
        const meaning = parts[2]
        const example = parts[3] || ''
        
        if (word && arabic && meaning) {
          vocabularyItems.push({
            word,
            arabic_translation: arabic,
            category: meaning,
            usage_example: example,
            difficulty_level: 'intermediate'
          })
        }
      }
    }
  }
  
  // Save last unit's vocabulary
  if (vocabularyItems.length > 0) {
    await insertVocabularyBatch(vocabularyItems, unitId)
  }
  
  console.log(`✓ Completed vocabulary for Grade ${gradeNumber}`)
}

async function insertVocabularyBatch(items, unitId) {
  if (items.length === 0) return
  
  // Check if vocabulary already exists for this unit
  const { count } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true })
    .eq('category', items[0].category)
  
  if (count > 0) {
    console.log(`  Skipping ${items.length} vocabulary items (already exist)`)
    return
  }
  
  const { error } = await supabase
    .from('vocabulary')
    .insert(items)
  
  if (error) {
    console.error(`  Error inserting vocabulary: ${error.message}`)
  } else {
    console.log(`  ✓ Inserted ${items.length} vocabulary items`)
  }
}

// Step 3: Parse and populate setbook questions
async function populateSetbookQuestions(gradeNumber, filePath) {
  console.log(`\n=== Populating Setbook Questions for Grade ${gradeNumber} ===`)
  
  const content = await fs.readFile(filePath, 'utf-8')
  const lines = content.split('\n').map(l => cleanText(l))
  
  // Get grade ID
  const { data: grade } = await supabase
    .from('grades')
    .select('id')
    .eq('grade_number', gradeNumber)
    .single()
  
  if (!grade) return
  
  const gradeId = grade.id
  let inSetbookSection = false
  let currentUnitId = null
  let questions = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect setbook section
    if (line.match(/PART \d+: SET BOOK|SETBOOK QUESTIONS/i)) {
      inSetbookSection = true
      continue
    }
    
    // Stop at next major section
    if (inSetbookSection && line.match(/PART \d+:|^(WRITING|TRANSLATION|GRAMMAR)/i)) {
      inSetbookSection = false
      if (questions.length > 0) {
        await insertSetbookBatch(questions)
        questions = []
      }
    }
    
    // Detect unit within setbook section
    if (inSetbookSection && line.match(/^Unit \d+/i)) {
      // Save previous unit's questions
      if (questions.length > 0) {
        await insertSetbookBatch(questions)
        questions = []
      }
      
      const unitMatch = line.match(/^Unit (\d+)/i)
      if (unitMatch) {
        const unitNumber = parseInt(unitMatch[1])
        const { data: unit } = await supabase
          .from('units')
          .select('id')
          .eq('grade_id', gradeId)
          .eq('unit_number', unitNumber)
          .single()
        
        currentUnitId = unit?.id
      }
    }
    
    // Parse questions (numbered lines like "1. What is...")
    if (inSetbookSection && currentUnitId && line.match(/^\d+\.\s+/)) {
      const questionText = line.replace(/^\d+\.\s+/, '').trim()
      
      // Look for answer in next few lines
      let answerText = ''
      let arabicTranslation = ''
      
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j]
        if (nextLine.match(/^Answer:|^A:/i)) {
          answerText = nextLine.replace(/^(Answer:|A:)/i, '').trim()
        }
        if (nextLine.match(/الترجمة|الإجابة/)) {
          arabicTranslation = nextLine
        }
        if (nextLine.match(/^\d+\.\s+/)) break // Next question
      }
      
      if (questionText) {
        questions.push({
          unit_id: currentUnitId,
          question_text: questionText,
          answer_text: answerText || 'See model answer in textbook',
          arabic_translation: arabicTranslation,
          question_type: 'comprehension',
          difficulty_level: 2
        })
      }
    }
  }
  
  // Save last batch
  if (questions.length > 0) {
    await insertSetbookBatch(questions)
  }
  
  console.log(`✓ Completed setbook questions for Grade ${gradeNumber}`)
}

async function insertSetbookBatch(questions) {
  if (questions.length === 0) return
  
  const { error } = await supabase
    .from('setbook_questions')
    .insert(questions)
  
  if (error) {
    console.error(`  Error inserting setbook questions: ${error.message}`)
  } else {
    console.log(`  ✓ Inserted ${questions.length} setbook questions`)
  }
}

// Step 4: Parse and populate writing topics
async function populateWritingTopics(gradeNumber, filePath) {
  console.log(`\n=== Populating Writing Topics for Grade ${gradeNumber} ===`)
  
  const content = await fs.readFile(filePath, 'utf-8')
  const lines = content.split('\n').map(l => cleanText(l))
  
  const { data: grade } = await supabase
    .from('grades')
    .select('id')
    .eq('grade_number', gradeNumber)
    .single()
  
  if (!grade) return
  
  const gradeId = grade.id
  let inWritingSection = false
  let topics = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    if (line.match(/WRITING TOPICS|PART \d+: WRITING/i)) {
      inWritingSection = true
      continue
    }
    
    if (inWritingSection && line.match(/PART \d+:|^(TRANSLATION|GRAMMAR|FUNCTIONAL)/i)) {
      break
    }
    
    if (inWritingSection && line.match(/^\d+\.\s+/)) {
      const topicTitle = line.replace(/^\d+\.\s+/, '').trim()
      
      // Look for outline and tips in next lines
      let outline = ''
      let tips = ''
      
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const nextLine = lines[j]
        if (nextLine.match(/Outline:|Model:/i)) {
          outline = nextLine
        }
        if (nextLine.match(/Tips:|Enhancement:/i)) {
          tips = nextLine
        }
        if (nextLine.match(/^\d+\.\s+/)) break
      }
      
      if (topicTitle) {
        topics.push({
          grade_id: gradeId,
          topic_title: topicTitle,
          topic_description: topicTitle,
          outline_points: outline || 'Introduction, Body paragraphs, Conclusion',
          enhancement_tips: tips || 'Use varied vocabulary, check grammar, organize ideas clearly',
          difficulty_level: 2
        })
      }
    }
  }
  
  if (topics.length > 0) {
    const { error } = await supabase
      .from('writing_topics')
      .insert(topics)
    
    if (error) {
      console.error(`  Error inserting writing topics: ${error.message}`)
    } else {
      console.log(`  ✓ Inserted ${topics.length} writing topics`)
    }
  }
  
  console.log(`✓ Completed writing topics for Grade ${gradeNumber}`)
}

// Step 5: Populate functional language questions
async function populateFunctionalLanguage(filePath) {
  console.log('\n=== Populating Functional Language Questions ===')
  
  const content = await fs.readFile(filePath, 'utf-8')
  const lines = content.split('\n').map(l => cleanText(l))
  
  let blockNumber = 0
  let questions = []
  let currentCategory = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect category headers (e.g., "Giving an Opinion", "Making a Suggestion")
    if (line.match(/\t/) && !line.match(/^(Function|الوظيفة)/i)) {
      const parts = line.split('\t')
      if (parts[0] && parts[0].length > 5 && parts[0].length < 50) {
        // Save previous block
        if (questions.length > 0) {
          await insertFunctionalBatch(questions, blockNumber)
          questions = []
        }
        
        blockNumber++
        currentCategory = parts[0]
        console.log(`  Processing Block ${blockNumber}: ${currentCategory}`)
      }
    }
    
    // Create MCQ questions from functional phrases
    if (currentCategory && line.includes('\t')) {
      const parts = line.split('\t')
      if (parts.length >= 3 && parts[1] && parts[2]) {
        const formalPhrase = parts[1]
        const arabic = parts[2]
        const commonPhrase = parts[3] || ''
        
        if (formalPhrase && formalPhrase.length > 10) {
          questions.push({
            question_text: `Which phrase is appropriate for ${currentCategory}?`,
            option_a: formalPhrase,
            option_b: commonPhrase || 'I think so',
            option_c: 'Maybe later',
            option_d: 'Not sure',
            correct_answer: 'A',
            explanation: `"${formalPhrase}" (${arabic}) is the formal/appropriate expression for ${currentCategory}.`,
            block_number: blockNumber,
            difficulty_level: 2
          })
        }
      }
    }
  }
  
  // Save last block
  if (questions.length > 0) {
    await insertFunctionalBatch(questions, blockNumber)
  }
  
  console.log(`✓ Completed functional language questions (${blockNumber} blocks)`)
}

async function insertFunctionalBatch(questions, blockNumber) {
  if (questions.length === 0) return
  
  // Check if this block already exists
  const { count } = await supabase
    .from('functional_language_questions')
    .select('*', { count: 'exact', head: true })
    .eq('block_number', blockNumber)
  
  if (count > 0) {
    console.log(`  Skipping block ${blockNumber} (already exists)`)
    return
  }
  
  // Take only 5 questions per block
  const limitedQuestions = questions.slice(0, 5)
  
  const { error } = await supabase
    .from('functional_language_questions')
    .insert(limitedQuestions)
  
  if (error) {
    console.error(`  Error inserting functional questions: ${error.message}`)
  } else {
    console.log(`  ✓ Inserted ${limitedQuestions.length} questions for block ${blockNumber}`)
  }
}

// Main execution
async function main() {
  console.log('=== KUWAIT ENGLISH HUB - DATABASE POPULATION ===')
  console.log('Target: Supabase Database')
  console.log(`URL: ${supabaseUrl}`)
  
  try {
    // Step 1: Ensure grades
    await ensureGrades()
    
    // Step 2-4: Process each grade file
    const dataDir = '/workspace/user_input_files'
    
    console.log('\n=== Processing Grade 10 Data ===')
    await populateVocabulary(10, path.join(dataDir, 'Grade 10 level First Term .txt'))
    await populateSetbookQuestions(10, path.join(dataDir, 'Grade 10 level First Term .txt'))
    await populateWritingTopics(10, path.join(dataDir, 'Grade 10 level First Term .txt'))
    
    console.log('\n=== Processing Grade 11 Data ===')
    await populateVocabulary(11, path.join(dataDir, '11 level.txt'))
    await populateSetbookQuestions(11, path.join(dataDir, '11 level.txt'))
    await populateWritingTopics(11, path.join(dataDir, '11 level.txt'))
    
    console.log('\n=== Processing Grade 12 Data ===')
    await populateVocabulary(12, path.join(dataDir, '12 level.txt'))
    await populateSetbookQuestions(12, path.join(dataDir, '12 level.txt'))
    await populateWritingTopics(12, path.join(dataDir, '12 level.txt'))
    
    // Step 5: Process functional language
    await populateFunctionalLanguage(path.join(dataDir, 'functional language and grammar.txt'))
    
    console.log('\n=== DATABASE POPULATION COMPLETE ===')
    console.log('✓ All curriculum data has been inserted into Supabase')
    
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main()
