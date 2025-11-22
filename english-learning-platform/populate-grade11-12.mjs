import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

function cleanText(text) {
  return text?.replace(/\r/g, '').replace(/\n/g, '').trim() || ''
}

async function populateGrade11Vocabulary() {
  console.log('=== Populating Grade 11 Vocabulary ===')
  
  const content = await fs.readFile('/workspace/user_input_files/11 level.txt', 'utf-8')
  const lines = content.split('\n').map(l => l.trim())
  
  // Get Grade 11 ID
  const { data: grade11 } = await supabase
    .from('grades')
    .select('id')
    .eq('grade_number', 11)
    .single()
  
  if (!grade11) {
    console.error('Grade 11 not found')
    return
  }
  
  let currentUnitNumber = 0
  let currentUnitId = null
  let vocabularyBatch = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect unit headers: ### **vocab unit-1**
    if (line.match(/###\s*\*\*vocab unit-(\d+)\*\*/i)) {
      // Save previous unit's vocabulary
      if (vocabularyBatch.length > 0 && currentUnitId) {
        await insertVocabulary(vocabularyBatch)
        vocabularyBatch = []
      }
      
      const match = line.match(/###\s*\*\*vocab unit-(\d+)\*\*/i)
      currentUnitNumber = parseInt(match[1])
      
      // Create or get unit
      const unitTitle = `Unit ${currentUnitNumber}`
      
      const { data: existingUnit } = await supabase
        .from('units')
        .select('id')
        .eq('grade_id', grade11.id)
        .eq('unit_number', currentUnitNumber)
        .single()
      
      if (existingUnit) {
        currentUnitId = existingUnit.id
        console.log(`  Using existing Unit ${currentUnitNumber}`)
      } else {
        const { data: newUnit } = await supabase
          .from('units')
          .insert({
            grade_id: grade11.id,
            unit_number: currentUnitNumber,
            unit_title: unitTitle
          })
          .select('id')
          .single()
        
        currentUnitId = newUnit.id
        console.log(`  Created Unit ${currentUnitNumber}`)
      }
    }
    
    // Parse vocabulary lines: - **word** (pos): Arabic | English: meaning | Example: sentence
    if (line.startsWith('- **') && currentUnitId) {
      try {
        // Extract word and part of speech
        const wordMatch = line.match(/- \*\*([^*]+)\*\*\s*\(([^)]+)\):/)
        if (!wordMatch) continue
        
        const word = wordMatch[1].trim()
        const pos = wordMatch[2].trim()
        
        // Split by pipes to get sections
        const parts = line.split('|').map(p => p.trim())
        if (parts.length < 3) continue
        
        // Extract Arabic (first part after word)
        const arabicPart = parts[0].split(':').slice(1).join(':').trim()
        
        // Extract meaning (after "English:")
        const meaningMatch = parts[1].match(/English:\s*(.+)/)
        const meaning = meaningMatch ? meaningMatch[1].trim() : ''
        
        // Extract example (after "Example:")
        const exampleMatch = parts[2].match(/Example:\s*(.+)/)
        const example = exampleMatch ? exampleMatch[1].trim() : ''
        
        if (word && meaning) {
          vocabularyBatch.push({
            word: `${word} (${pos})`,
            arabic_translation: arabicPart || word,
            category: `Grade 11 Unit ${currentUnitNumber}`,
            usage_example: example,
            difficulty_level: 'intermediate'
          })
        }
      } catch (err) {
        console.error(`Error parsing line: ${line.substring(0, 50)}...`, err.message)
      }
    }
  }
  
  // Save last batch
  if (vocabularyBatch.length > 0 && currentUnitId) {
    await insertVocabulary(vocabularyBatch)
  }
  
  console.log('✓ Grade 11 vocabulary population complete')
}

async function insertVocabulary(items) {
  if (items.length === 0) return
  
  const { error } = await supabase
    .from('vocabulary')
    .insert(items)
  
  if (error) {
    console.error(`  Error inserting vocabulary:`, error.message)
  } else {
    console.log(`  ✓ Inserted ${items.length} vocabulary items`)
  }
}

async function populateGrade12Vocabulary() {
  console.log('\n=== Populating Grade 12 Vocabulary ===')
  
  const content = await fs.readFile('/workspace/user_input_files/12 level.txt', 'utf-8')
  const lines = content.split('\n').map(l => l.trim())
  
  const { data: grade12 } = await supabase
    .from('grades')
    .select('id')
    .eq('grade_number', 12)
    .single()
  
  if (!grade12) {
    console.error('Grade 12 not found')
    return
  }
  
  let currentUnitNumber = 0
  let currentUnitId = null
  let vocabularyBatch = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect unit headers
    if (line.match(/###\s*\*\*vocab unit-(\d+)\*\*/i) || line.match(/Unit (\d+):/i)) {
      if (vocabularyBatch.length > 0 && currentUnitId) {
        await insertVocabulary(vocabularyBatch)
        vocabularyBatch = []
      }
      
      const match = line.match(/###\s*\*\*vocab unit-(\d+)\*\*/i) || line.match(/Unit (\d+):/i)
      currentUnitNumber = parseInt(match[1])
      
      const unitTitle = `Unit ${currentUnitNumber}`
      
      const { data: existingUnit } = await supabase
        .from('units')
        .select('id')
        .eq('grade_id', grade12.id)
        .eq('unit_number', currentUnitNumber)
        .single()
      
      if (existingUnit) {
        currentUnitId = existingUnit.id
        console.log(`  Using existing Unit ${currentUnitNumber}`)
      } else {
        const { data: newUnit } = await supabase
          .from('units')
          .insert({
            grade_id: grade12.id,
            unit_number: currentUnitNumber,
            unit_title: unitTitle
          })
          .select('id')
          .single()
        
        currentUnitId = newUnit.id
        console.log(`  Created Unit ${currentUnitNumber}`)
      }
    }
    
    // Parse vocabulary
    if (line.startsWith('- **') && currentUnitId) {
      try {
        const wordMatch = line.match(/- \*\*([^*]+)\*\*\s*\(([^)]+)\):/)
        if (!wordMatch) continue
        
        const word = wordMatch[1].trim()
        const pos = wordMatch[2].trim()
        
        const parts = line.split('|').map(p => p.trim())
        if (parts.length < 3) continue
        
        const arabicPart = parts[0].split(':').slice(1).join(':').trim()
        const meaningMatch = parts[1].match(/English:\s*(.+)/)
        const meaning = meaningMatch ? meaningMatch[1].trim() : ''
        const exampleMatch = parts[2].match(/Example:\s*(.+)/)
        const example = exampleMatch ? exampleMatch[1].trim() : ''
        
        if (word && meaning) {
          vocabularyBatch.push({
            word: `${word} (${pos})`,
            arabic_translation: arabicPart || word,
            category: `Grade 12 Unit ${currentUnitNumber}`,
            usage_example: example,
            difficulty_level: 'advanced'
          })
        }
      } catch (err) {
        console.error(`Error parsing line: ${line.substring(0, 50)}...`, err.message)
      }
    }
  }
  
  if (vocabularyBatch.length > 0 && currentUnitId) {
    await insertVocabulary(vocabularyBatch)
  }
  
  console.log('✓ Grade 12 vocabulary population complete')
}

async function main() {
  console.log('=== GRADE 11 & 12 VOCABULARY POPULATION ===')
  
  try {
    await populateGrade11Vocabulary()
    await populateGrade12Vocabulary()
    
    // Check results
    const { data: counts } = await supabase
      .from('vocabulary')
      .select('category')
    
    const grade11Count = counts?.filter(c => c.category?.includes('Grade 11')).length || 0
    const grade12Count = counts?.filter(c => c.category?.includes('Grade 12')).length || 0
    
    console.log('\n=== RESULTS ===')
    console.log(`Grade 11 vocabulary: ${grade11Count} items`)
    console.log(`Grade 12 vocabulary: ${grade12Count} items`)
    console.log('✓ Population complete')
    
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main()
