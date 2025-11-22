import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase configuration
const supabaseUrl = "https://wjdzoqlxudswcovbuptd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0MDksImV4cCI6MjA3NzU5ODQwOX0.AcOvzDba-IGxV_TNN1KE6FNSNxC4AJH2wOfAguG0yQc";

const supabase = createClient(supabaseUrl, supabaseKey);

interface VocabularyEntry {
  word: string;
  partOfSpeech: string;
  definitionAr: string;
  classNumber: number;
  unitNumber: number;
  orderInUnit: number;
}

interface ParsedVocabularyData {
  [classNumber: number]: {
    [unitNumber: number]: VocabularyEntry[];
  };
}

// Parse the vocabulary markdown file
function parseVocabularyMarkdown(filePath: string): ParsedVocabularyData {
  console.log('📖 Reading vocabulary data from file...');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const vocabularyData: ParsedVocabularyData = {};
  let currentClass = 0;
  let currentUnit = 0;
  let currentOrder = 0;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check for grade level headers
    if (trimmedLine.startsWith('## Grade ')) {
      const gradeMatch = trimmedLine.match(/Grade (\d+)/);
      if (gradeMatch) {
        currentClass = parseInt(gradeMatch[1]);
        console.log(`📚 Processing Grade ${currentClass}`);
        if (!vocabularyData[currentClass]) {
          vocabularyData[currentClass] = {};
        }
      }
      continue;
    }
    
    // Check for unit headers
    if (trimmedLine.startsWith('### Unit ')) {
      const unitMatch = trimmedLine.match(/Unit (\d+)/);
      if (unitMatch) {
        currentUnit = parseInt(unitMatch[1]);
        currentOrder = 0;
        console.log(`  📖 Processing Unit ${currentUnit}`);
        if (!vocabularyData[currentClass][currentUnit]) {
          vocabularyData[currentClass][currentUnit] = [];
        }
      }
      continue;
    }
    
    // Parse vocabulary entries (format: - word (part_of_speech) - Arabic definition)
    if (trimmedLine.startsWith('- ') && trimmedLine.includes(' - ')) {
      const entry = trimmedLine.substring(2); // Remove "- "
      const parts = entry.split(' - ');
      
      if (parts.length === 2) {
        const wordPart = parts[0].trim();
        const arabicDef = parts[1].trim();
        
        // Extract word and part of speech
        const wordMatch = wordPart.match(/^([^(]+)\s*\(([^)]+)\)/);
        if (wordMatch) {
          const word = wordMatch[1].trim();
          const partOfSpeech = wordMatch[2].trim();
          
          currentOrder++;
          
          vocabularyData[currentClass][currentUnit].push({
            word,
            partOfSpeech,
            definitionAr: arabicDef,
            classNumber: currentClass,
            unitNumber: currentUnit,
            orderInUnit: currentOrder
          });
          
          console.log(`    ✓ Added: ${word} (${partOfSpeech}) - ${arabicDef}`);
        } else {
          // Handle words without parentheses
          vocabularyData[currentClass][currentUnit].push({
            word: wordPart,
            partOfSpeech: 'n.', // Default to noun
            definitionAr: arabicDef,
            classNumber: currentClass,
            unitNumber: currentUnit,
            orderInUnit: currentOrder
          });
          
          console.log(`    ✓ Added: ${wordPart} - ${arabicDef}`);
        }
      }
    }
  }
  
  return vocabularyData;
}

// Convert vocabulary entries to database format
function convertToDatabaseFormat(vocabularyData: ParsedVocabularyData): any[] {
  const dbRecords: any[] = [];
  
  for (const [classNumber, units] of Object.entries(vocabularyData)) {
    for (const [unitNumber, entries] of Object.entries(units)) {
      for (const entry of entries) {
        dbRecords.push({
          word: entry.word,
          class_number: entry.classNumber,
          unit_number: entry.unitNumber,
          definition_en: entry.word, // Using the word itself as English definition for now
          definition_ar: entry.definitionAr,
          phonetic: entry.word, // Using the word itself as phonetic for now
          examples: [], // Empty array for examples
          category: entry.partOfSpeech,
          difficulty_level: Math.floor(entry.classNumber / 3) + 1, // Basic difficulty based on grade
          order_in_unit: entry.orderInUnit,
          audio_url: null
        });
      }
    }
  }
  
  return dbRecords;
}

// Insert data in batches
async function insertVocabularyBatch(records: any[], batchSize: number = 50) {
  console.log(`🚀 Starting batch insert of ${records.length} vocabulary records...`);
  
  let insertedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(records.length / batchSize);
    
    try {
      console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} records)...`);
      
      const { data, error } = await supabase
        .from('kuwait_vocabulary')
        .insert(batch);
      
      if (error) {
        console.error(`❌ Error in batch ${batchNumber}:`, error);
        errorCount += batch.length;
      } else {
        insertedCount += batch.length;
        console.log(`✅ Batch ${batchNumber} completed successfully (${insertedCount} total inserted)`);
      }
      
    } catch (err) {
      console.error(`💥 Exception in batch ${batchNumber}:`, err);
      errorCount += batch.length;
    }
    
    // Add small delay between batches to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Final Results:`);
  console.log(`   ✅ Successfully inserted: ${insertedCount} records`);
  console.log(`   ❌ Failed: ${errorCount} records`);
  console.log(`   📈 Success rate: ${((insertedCount / (insertedCount + errorCount)) * 100).toFixed(1)}%`);
  
  return { insertedCount, errorCount };
}

// Main execution function
async function main() {
  try {
    console.log('🎯 Kuwait English Learning Platform - Vocabulary Database Population');
    console.log('========================================================================\n');
    
    // Test database connection
    console.log('🔌 Testing Supabase connection...');
    const { data, error } = await supabase
      .from('kuwait_vocabulary')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error);
      return;
    }
    console.log('✅ Database connection successful!\n');
    
    // Parse vocabulary data
    const vocabularyFilePath = path.join(process.cwd(), 'extract', 'kuwait-vocabulary-database.md');
    if (!fs.existsSync(vocabularyFilePath)) {
      console.error(`❌ Vocabulary file not found: ${vocabularyFilePath}`);
      return;
    }
    
    const vocabularyData = parseVocabularyMarkdown(vocabularyFilePath);
    
    // Count total entries
    let totalEntries = 0;
    for (const units of Object.values(vocabularyData)) {
      for (const entries of Object.values(units)) {
        totalEntries += entries.length;
      }
    }
    console.log(`\n📊 Total vocabulary entries found: ${totalEntries}\n`);
    
    // Convert to database format
    const dbRecords = convertToDatabaseFormat(vocabularyData);
    console.log(`📋 Database records prepared: ${dbRecords.length}\n`);
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️ Clearing existing vocabulary data...');
    const { error: deleteError } = await supabase
      .from('kuwait_vocabulary')
      .delete()
      .gte('id', 0); // Delete all records
    
    if (deleteError) {
      console.warn('⚠️ Warning: Could not clear existing data:', deleteError);
    } else {
      console.log('✅ Existing data cleared');
    }
    
    // Insert new data
    await insertVocabularyBatch(dbRecords);
    
    // Verify insertion
    console.log('\n🔍 Verifying insertion...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('kuwait_vocabulary')
      .select('class_number, unit_number, count(*)', { count: 'exact' })
      .group('class_number, unit_number')
      .order('class_number')
      .order('unit_number');
    
    if (verifyError) {
      console.error('❌ Verification failed:', verifyError);
    } else {
      console.log('📊 Final database state:');
      verifyData?.forEach((row: any) => {
        console.log(`   Grade ${row.class_number}, Unit ${row.unit_number}: ${row.count} words`);
      });
    }
    
    console.log('\n🎉 Vocabulary database population completed successfully!');
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
  }
}

// Run the script
main();