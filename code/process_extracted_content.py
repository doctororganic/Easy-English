import json
import os
import sys

# Add path for supabase client
sys.path.append('/workspace')

def load_json_file(filepath):
    """Load JSON file safely"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def process_vocabulary_data():
    """Process kuwait_comprehensive_vocabulary.json"""
    data = load_json_file('/workspace/data/kuwait_comprehensive_vocabulary.json')
    if not data:
        return []
    
    vocabulary_records = []
    
    # Process nested structure
    if 'kuwait_curriculum' in data:
        for grade_key, grade_data in data['kuwait_curriculum'].items():
            # Extract grade number from key like "grade_11"
            class_number = int(grade_key.split('_')[1]) if '_' in grade_key else 11
            
            for unit_key, words in grade_data.items():
                # Extract unit number from key like "unit_7"
                unit_number = int(unit_key.split('_')[1]) if '_' in unit_key else 1
                
                for word_data in words:
                    record = {
                        'word': word_data.get('word', ''),
                        'class_number': class_number,
                        'unit_number': unit_number,
                        'order_in_unit': word_data.get('order_in_unit'),
                        'definition_en': '',  # Will be added later
                        'definition_ar': word_data.get('translations', {}).get('ar', ''),
                        'difficulty_level': word_data.get('difficulty_level', 2),
                        'category': word_data.get('category', 'vocabulary'),
                        'examples': json.dumps(word_data.get('examples', [])),
                        'synonyms': json.dumps(word_data.get('synonyms', [])),
                        'ai_generated': word_data.get('ai_generated', False),
                        'source': word_data.get('source', 'kuwait_pdf_extraction')
                    }
                    vocabulary_records.append(record)
    
    print(f"Processed {len(vocabulary_records)} vocabulary records")
    return vocabulary_records

def process_test_bank_questions():
    """Process Grade 12 Unit 1 test bank questions"""
    data = load_json_file('/workspace/data/grade12_unit1_extracted.json')
    if not data:
        return []
    
    questions = []
    grade = data.get('grade', 12)
    unit = data.get('unit', 1)
    components = data.get('components', {})
    
    # Process vocabulary questions
    vocab_mc = components.get('vocabulary', {}).get('multiple_choice', [])
    for q in vocab_mc:
        record = {
            'question_id': q.get('id'),
            'class_number': grade,
            'unit_number': unit,
            'component_type': 'vocabulary',
            'question_number': q.get('number'),
            'question_text': q.get('question'),
            'question_type': 'multiple_choice',
            'options': json.dumps(q.get('options', {})),
            'difficulty_level': 2
        }
        questions.append(record)
    
    # Process fill-in-blank questions
    vocab_fib = components.get('vocabulary', {}).get('fill_in_blank', [])
    for exercise in vocab_fib:
        for q in exercise.get('questions', []):
            record = {
                'question_id': q.get('id'),
                'class_number': grade,
                'unit_number': unit,
                'component_type': 'vocabulary',
                'question_number': q.get('number'),
                'question_text': q.get('question'),
                'question_type': 'fill_in_blank',
                'correct_answer': q.get('answer'),
                'difficulty_level': 2
            }
            questions.append(record)
    
    # Process grammar questions
    grammar_mc = components.get('grammar', {}).get('multiple_choice', [])
    for q in grammar_mc:
        record = {
            'question_id': q.get('id'),
            'class_number': grade,
            'unit_number': unit,
            'component_type': 'grammar',
            'question_number': q.get('number'),
            'question_text': q.get('question'),
            'question_type': 'multiple_choice',
            'options': json.dumps(q.get('options', {})),
            'difficulty_level': 2
        }
        questions.append(record)
    
    # Process transformation questions
    grammar_transform = components.get('grammar', {}).get('transformations', [])
    for q in grammar_transform:
        record = {
            'question_id': q.get('id'),
            'class_number': grade,
            'unit_number': unit,
            'component_type': 'grammar',
            'question_number': q.get('number'),
            'question_text': q.get('original'),
            'question_type': 'transformation',
            'options': json.dumps(q.get('options', {})),
            'correct_answer': q.get('instruction'),
            'difficulty_level': 3
        }
        questions.append(record)
    
    print(f"Processed {len(questions)} test bank questions")
    return questions

def generate_sql_inserts():
    """Generate SQL INSERT statements for all data"""
    
    print("=" * 60)
    print("Processing Kuwait English Learning Platform Content")
    print("=" * 60)
    
    # Process vocabulary
    vocabulary_records = process_vocabulary_data()
    
    # Process test bank
    test_questions = process_test_bank_questions()
    
    # Generate SQL file
    sql_statements = []
    
    # Vocabulary inserts
    if vocabulary_records:
        sql_statements.append("-- Vocabulary Records")
        for record in vocabulary_records[:100]:  # Limit for initial batch
            sql = f"""INSERT INTO kuwait_vocabulary 
            (word, class_number, unit_number, order_in_unit, definition_ar, 
             difficulty_level, category, examples, synonyms, ai_generated, source)
            VALUES (
                '{record['word'].replace("'", "''")}',
                {record['class_number']},
                {record['unit_number']},
                {record.get('order_in_unit') or 'NULL'},
                '{record.get('definition_ar', '').replace("'", "''")}',
                {record['difficulty_level']},
                '{record['category']}',
                '{record['examples']}'::jsonb,
                '{record['synonyms']}'::jsonb,
                {str(record['ai_generated']).lower()},
                '{record['source']}'
            ) ON CONFLICT (word, class_number, unit_number) DO NOTHING;"""
            sql_statements.append(sql)
    
    # Test bank question inserts
    if test_questions:
        sql_statements.append("\n-- Test Bank Questions")
        for record in test_questions:
            options_str = record.get('options', '{}')
            correct_answer = record.get('correct_answer', '')
            sql = f"""INSERT INTO test_bank_questions 
            (question_id, class_number, unit_number, component_type, question_number,
             question_text, question_type, options, correct_answer, difficulty_level)
            VALUES (
                '{record['question_id']}',
                {record['class_number']},
                {record['unit_number']},
                '{record['component_type']}',
                {record['question_number']},
                '{record['question_text'].replace("'", "''")}',
                '{record['question_type']}',
                '{options_str}'::jsonb,
                '{correct_answer.replace("'", "''")}',
                {record['difficulty_level']}
            ) ON CONFLICT (question_id) DO NOTHING;"""
            sql_statements.append(sql)
    
    # Write to file
    output_file = '/workspace/english-learning-platform/insert-extracted-content.sql'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"\nSQL file generated: {output_file}")
    print(f"Total vocabulary records: {len(vocabulary_records)}")
    print(f"Total test questions: {len(test_questions)}")
    print("=" * 60)
    
    return output_file

if __name__ == '__main__':
    generate_sql_inserts()
