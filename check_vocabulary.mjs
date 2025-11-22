import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://hkljprwxvdoxorhcbvpo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkVocabulary() {
  console.log('Fetching vocabulary data from Supabase...')
  
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
  
  if (error) {
    console.error('✗ Error fetching vocabulary:', error)
    return
  }
  
  if (data) {
    console.log(`\n✓ Found ${data.length} vocabulary entries`)
    
    // Search for the "acute" error
    const acuteEntries = data.filter(v => 
      v.word && v.word.toLowerCase().includes('acute')
    )
    
    if (acuteEntries.length > 0) {
      console.log(`\n🔍 Found ${acuteEntries.length} entries with 'acute':`)
      acuteEntries.forEach(entry => {
        console.log(`  - ID: ${entry.id}, Word: ${entry.word}, Arabic: ${entry.arabic_translation || 'N/A'}`)
      })
    }
    
    // Save all vocabulary to file for analysis
    fs.writeFileSync('data/vocabulary_dump.json', JSON.stringify(data, null, 2))
    console.log(`\n✓ Vocabulary data saved to data/vocabulary_dump.json`)
    
    // Check for potential errors
    const errors = []
    data.forEach(entry => {
      if (!entry.word) {
        errors.push(`Missing word: ${JSON.stringify(entry)}`)
      }
      if (!entry.arabic_translation) {
        errors.push(`Missing Arabic translation for: ${entry.word}`)
      }
      if (entry.arabic_translation === 'No') {
        errors.push(`Invalid translation 'No' for: ${entry.word} (ID: ${entry.id})`)
      }
    })
    
    if (errors.length > 0) {
      console.log(`\n⚠ Found ${errors.length} potential errors:`)
      errors.slice(0, 20).forEach(error => {
        console.log(`  - ${error}`)
      })
      
      fs.writeFileSync('data/vocabulary_errors.txt', errors.join('\n'))
      console.log(`\n✓ All errors saved to data/vocabulary_errors.txt`)
    } else {
      console.log('\n✓ No errors found in vocabulary data')
    }
  }
}

checkVocabulary()
