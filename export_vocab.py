import sqlite3
import json
import os

db_path = '/workspace/kuwait_platform_autonomous.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all vocabulary
cursor.execute("""
    SELECT 
        id, question_text, english_word, arabic_translation, 
        part_of_speech, grade_level, unit_number, difficulty_level, question_data
    FROM test_bank_questions
    WHERE component_type = 'vocabulary'
    ORDER BY grade_level, unit_number, english_word
""")

vocabulary = []
for row in cursor.fetchall():
    vocab_item = {
        'id': str(row[0]),
        'question_text': row[1],
        'english_word': row[2],
        'arabic_translation': row[3],
        'part_of_speech': row[4],
        'grade_level': row[5],
        'unit_number': row[6],
        'difficulty_level': row[7] if row[7] else 2,
        'question_data': json.loads(row[8]) if row[8] and row[8] != 'null' else {}
    }
    vocabulary.append(vocab_item)

# Create output directory
os.makedirs('/workspace/english-learning-platform/public/data', exist_ok=True)

# Save to JSON for browser access
output_file = '/workspace/english-learning-platform/public/data/vocabulary.json'

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(vocabulary, f, ensure_ascii=False, indent=2)

print(f"Exported {len(vocabulary)} vocabulary items to {output_file}")

# Print summary
cursor.execute("""
    SELECT grade_level, unit_number, COUNT(*) as count
    FROM test_bank_questions
    WHERE component_type = 'vocabulary'
    GROUP BY grade_level, unit_number
    ORDER BY grade_level, unit_number
""")

print("\nVocabulary Distribution:")
for row in cursor.fetchall():
    print(f"  Grade {row[0]}, Unit {row[1]}: {row[2]} words")

conn.close()
