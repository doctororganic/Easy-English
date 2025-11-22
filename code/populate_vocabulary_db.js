const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = "https://wjdzoqlxudswcovbuptd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0MDksImV4cCI6MjA3NzU5ODQwOX0.AcOvzDba-IGxV_TNN1KE6FNSNxC4AJH2wOfAguG0yQc";

const supabase = createClient(supabaseUrl, supabaseKey);

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
    
    // Read vocabulary data
    const vocabularyFilePath = path.join(process.cwd(), 'extract', 'kuwait-vocabulary-database.md');
    console.log('📖 Reading vocabulary data from:', vocabularyFilePath);
    
    if (!fs.existsSync(vocabularyFilePath)) {
      console.error(`❌ Vocabulary file not found: ${vocabularyFilePath}`);
      return;
    }
    
    const content = fs.readFileSync(vocabularyFilePath, 'utf8');
    const lines = content.split('\n');
    
    const vocabularyData = [];
    let currentClass = 0;
    let currentUnit = 0;
    let currentOrder = 0;
    
    console.log('📚 Parsing vocabulary data...');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check for grade level headers
      if (trimmedLine.startsWith('## Grade ')) {
        const gradeMatch = trimmedLine.match(/Grade (\d+)/);
        if (gradeMatch) {
          currentClass = parseInt(gradeMatch[1]);
          console.log(`📖 Processing Grade ${currentClass}`);
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
        }
        continue;
      }
      
      // Parse vocabulary entries
      if (trimmedLine.startsWith('- ') && trimmedLine.includes(' - ')) {
        const entry = trimmedLine.substring(2); // Remove "- "
        const parts = entry.split(' - ');
        
        if (parts.length === 2) {
          const wordPart = parts[0].trim();
          const arabicDef = parts[1].trim();
          
          // Extract word and part of speech
          const wordMatch = wordPart.match(/^([^(]+)\s*\(([^)]+)\)/);
          let word, partOfSpeech;
          
          if (wordMatch) {
            word = wordMatch[1].trim();
            partOfSpeech = wordMatch[2].trim();
          } else {
            word = wordPart;
            partOfSpeech = 'n.'; // Default to noun
          }
          
          currentOrder++;
          
          vocabularyData.push({
            word,
            class_number: currentClass,
            unit_number: currentUnit,
            definition_en: word, // Using the word itself as English definition
            definition_ar: arabicDef,
            phonetic: word, // Using the word itself as phonetic
            examples: [], // Empty array for examples
            category: partOfSpeech,
            difficulty_level: Math.floor(currentClass / 3) + 1,
            order_in_unit: currentOrder,
            audio_url: null
          });
          
          console.log(`    ✓ Added: ${word} (${partOfSpeech}) - ${arabicDef}`);
        }
      }
    }
    
    console.log(`\n📊 Total vocabulary entries parsed: ${vocabularyData.length}\n`);
    
    // Clear existing data
    console.log('🗑️ Clearing existing vocabulary data...');
    const { error: deleteError } = await supabase
      .from('kuwait_vocabulary')
      .delete()
      .gte('id', 0);
    
    if (deleteError) {
      console.warn('⚠️ Warning: Could not clear existing data:', deleteError);
    } else {
      console.log('✅ Existing data cleared');
    }
    
    // Insert data in batches
    console.log(`🚀 Starting batch insert of ${vocabularyData.length} vocabulary records...`);
    
    const batchSize = 50;
    let insertedCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < vocabularyData.length; i += batchSize) {
      const batch = vocabularyData.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(vocabularyData.length / batchSize);
      
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
      
      // Add small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n📊 Final Results:`);
    console.log(`   ✅ Successfully inserted: ${insertedCount} records`);
    console.log(`   ❌ Failed: ${errorCount} records`);
    console.log(`   📈 Success rate: ${((insertedCount / (insertedCount + errorCount)) * 100).toFixed(1)}%`);
    
    // Verify insertion
    console.log('\n🔍 Verifying insertion...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('kuwait_vocabulary')
      .select('class_number, unit_number')
      .group('class_number, unit_number')
      .order('class_number')
      .order('unit_number');
    
    if (verifyError) {
      console.error('❌ Verification failed:', verifyError);
    } else {
      console.log('📊 Final database state:');
      verifyData?.forEach((row) => {
        console.log(`   Grade ${row.class_number}, Unit ${row.unit_number}`);
      });
      
      const { count: totalCount } = await supabase
        .from('kuwait_vocabulary')
        .select('*', { count: 'exact', head: true });
      
      console.log(`   📈 Total records in database: ${totalCount}`);
    }
    
    console.log('\n🎉 Vocabulary database population completed successfully!');
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
  }
}

// Run the script
main();