import json
import re

def process_grade12_unit1_questions():
    """Process Grade 12 Unit 1 extracted questions into database-ready format"""
    
    # Load the extracted data
    with open('/workspace/data/grade12_unit1_extracted.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    grade = data.get('grade', 12)
    unit = data.get('unit', 1)
    components = data.get('components', {})
    
    # SQL statements list
    sql_statements = []
    
    # Process Vocabulary Multiple Choice
    vocab_mc = components.get('vocabulary', {}).get('multiple_choice', [])
    for q in vocab_mc:
        question_text = q.get('question', '').replace("'", "''")
        options = json.dumps(q.get('options', {}))
        
        sql = f"""INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('{q.get('id')}', {grade}, {unit}, 'vocabulary', {q.get('number')}, '{question_text}', 'multiple_choice', '{options}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;"""
        sql_statements.append(sql)
    
    # Process Vocabulary Fill-in-Blank
    vocab_fib = components.get('vocabulary', {}).get('fill_in_blank', [])
    for exercise in vocab_fib:
        for q in exercise.get('questions', []):
            question_text = q.get('question', '').replace("'", "''")
            answer = q.get('answer', '').replace("'", "''")
            
            sql = f"""INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, correct_answer, difficulty_level)
VALUES ('{q.get('id')}', {grade}, {unit}, 'vocabulary', {q.get('number')}, '{question_text}', 'fill_in_blank', '{answer}', 2)
ON CONFLICT (question_id) DO NOTHING;"""
            sql_statements.append(sql)
    
    # Process Grammar Multiple Choice
    grammar_mc = components.get('grammar', {}).get('multiple_choice', [])
    for q in grammar_mc:
        question_text = q.get('question', '').replace("'", "''")
        options = json.dumps(q.get('options', {}))
        
        sql = f"""INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('{q.get('id')}', {grade}, {unit}, 'grammar', {q.get('number')}, '{question_text}', 'multiple_choice', '{options}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;"""
        sql_statements.append(sql)
    
    # Process Grammar Transformations
    grammar_transform = components.get('grammar', {}).get('transformations', [])
    for q in grammar_transform:
        original = q.get('original', '').replace("'", "''")
        instruction = q.get('instruction', '').replace("'", "''")
        options = json.dumps(q.get('options', {}))
        
        sql = f"""INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, correct_answer, options, difficulty_level)
VALUES ('{q.get('id')}', {grade}, {unit}, 'grammar', {q.get('number')}, '{original}', 'transformation', '{instruction}', '{options}'::jsonb, 3)
ON CONFLICT (question_id) DO NOTHING;"""
        sql_statements.append(sql)
    
    return sql_statements

def create_complete_sql_file():
    """Create complete SQL file with schema and all data"""
    
    print("Creating complete database setup SQL...")
    
    # Read schema
    with open('/workspace/english-learning-platform/database-schema-enhanced.sql', 'r') as f:
        schema_sql = f.read()
    
    # Read sample vocabulary data
    with open('/workspace/english-learning-platform/sample-grade12-unit1-data.sql', 'r') as f:
        vocab_sql = f.read()
    
    # Process test bank questions
    test_questions_sql = process_grade12_unit1_questions()
    
    # Combine all SQL
    complete_sql = f"""-- Kuwait English Learning Platform - Complete Database Setup
-- Generated: 2025-11-09
-- This file includes: Schema + Sample Data + Test Bank Questions

-- ============================================
-- SCHEMA CREATION
-- ============================================

{schema_sql}

-- ============================================
-- SAMPLE VOCABULARY AND GRAMMAR DATA
-- ============================================

{vocab_sql}

-- ============================================
-- TEST BANK QUESTIONS (GRADE 12 UNIT 1)
-- ============================================

{chr(10).join(test_questions_sql)}

-- ============================================
-- SET BOOK CONTENT
-- ============================================

INSERT INTO set_book_content (class_number, unit_number, passage_title, passage_text, passage_text_ar, theme, key_vocabulary, discussion_questions)
VALUES (
  12,
  1,
  'Justice and the Law',
  'The legal system plays a vital role in maintaining order and justice in society. Laws are established to protect citizens'' rights and ensure fair treatment for all. In Kuwait, the judicial system is based on principles of equality and fairness, where everyone is entitled to a fair trial and legal representation.

The concept of justice extends beyond the courtroom. It encompasses the protection of individual rights, the prevention of injustice, and the promotion of social welfare. When citizens understand their legal rights and responsibilities, they become more empowered and active participants in their communities.

Legal consultation is an important service that helps people navigate complex legal matters. Whether dealing with property disputes, civil cases, or understanding new regulations, consulting with legal professionals ensures that individuals make informed decisions. The litigation process, while sometimes lengthy, exists to ensure that all parties receive proper consideration and that justice is served fairly.',
  'يلعب النظام القانوني دورًا حيويًا في الحفاظ على النظام والعدالة في المجتمع. يتم وضع القوانين لحماية حقوق المواطنين وضمان المعاملة العادلة للجميع. في الكويت، يقوم النظام القضائي على مبادئ المساواة والإنصاف، حيث يحق لكل فرد الحصول على محاكمة عادلة وتمثيل قانوني.',
  'Legal System and Justice',
  '["justice", "legal system", "judicial", "litigation", "consultation", "welfare", "rights"]'::jsonb,
  '["What is the importance of having a fair legal system?", "How does legal consultation help citizens?", "Why is it important to understand your legal rights?", "What role does justice play in maintaining social order?"]'::jsonb
) ON CONFLICT DO NOTHING;
"""
    
    # Write to file
    output_file = '/workspace/english-learning-platform/complete-database-setup.sql'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(complete_sql)
    
    print(f"✓ Complete SQL file created: {output_file}")
    print(f"✓ Includes schema + {len(test_questions_sql)} test questions + vocabulary + grammar + set book")
    
    return output_file

if __name__ == '__main__':
    create_complete_sql_file()
