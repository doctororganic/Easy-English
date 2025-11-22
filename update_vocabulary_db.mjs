#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://hkljprwxvdoxorhcbvpo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateVocabularyTranslations() {
  console.log('🔧 UPDATING VOCABULARY DATABASE\n');
  console.log('='.repeat(60));
  
  // Load translation updates
  const updates = JSON.parse(fs.readFileSync('data/vocabulary_translation_updates.json', 'utf-8'));
  
  console.log(`\n📊 Total updates to apply: ${updates.length}`);
  
  // Filter out entries that need manual translation
  const autoUpdates = updates.filter(u => !u.new_translation.startsWith('[ترجمة:'));
  const manualUpdates = updates.filter(u => u.new_translation.startsWith('[ترجمة:'));
  
  console.log(`✓ Auto-fixable: ${autoUpdates.length}`);
  console.log(`⚠ Need manual review: ${manualUpdates.length}\n`);
  
  // Update in batches of 50
  const batchSize = 50;
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < autoUpdates.length; i += batchSize) {
    const batch = autoUpdates.slice(i, i + batchSize);
    
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(autoUpdates.length / batchSize)}...`);
    
    for (const update of batch) {
      const { error } = await supabase
        .from('vocabulary')
        .update({ arabic_translation: update.new_translation })
        .eq('id', update.id);
      
      if (error) {
        console.error(`  ✗ Failed to update ID ${update.id}: ${error.message}`);
        errorCount++;
      } else {
        successCount++;
      }
    }
    
    // Small delay between batches to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ UPDATE COMPLETE`);
  console.log(`  ✓ Successfully updated: ${successCount} entries`);
  console.log(`  ✗ Failed: ${errorCount} entries`);
  console.log(`  ⚠ Require manual translation: ${manualUpdates.length} entries\n`);
  
  // Save manual review list
  if (manualUpdates.length > 0) {
    fs.writeFileSync(
      'data/vocabulary_manual_review.json',
      JSON.stringify(manualUpdates, null, 2)
    );
    console.log('✓ Manual review list saved to data/vocabulary_manual_review.json');
  }
}

updateVocabularyTranslations().catch(console.error);
