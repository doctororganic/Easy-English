const Database = require('better-sqlite3');

const db = new Database('/workspace/kuwait_platform_autonomous.db');

// Get all tables
console.log('\n=== TABLES ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(tables);

// Get vocabulary count
console.log('\n=== VOCABULARY COUNT ===');
const vocabCount = db.prepare(`
  SELECT component_type, grade_level, unit_number, COUNT(*) as count
  FROM test_bank_questions
  GROUP BY component_type, grade_level, unit_number
  ORDER BY grade_level, unit_number
`).all();
console.log(vocabCount);

// Get sample vocabulary
console.log('\n=== SAMPLE VOCABULARY ===');
const sampleVocab = db.prepare(`
  SELECT id, question_text, english_word, arabic_translation, grade_level, unit_number
  FROM test_bank_questions
  WHERE component_type = 'vocabulary'
  LIMIT 10
`).all();
console.log(sampleVocab);

db.close();
