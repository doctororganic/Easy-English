#!/usr/bin/env python3
"""
Kuwait English Learning Platform - Database Migration Script
Migrates all extracted curriculum content to SQLite database
"""

import sqlite3
import json
import os
from datetime import datetime

def create_database_schema():
    """Create the complete database schema for Kuwait curriculum"""
    conn = sqlite3.connect('/workspace/kuwait_english_platform.db')
    cursor = conn.cursor()
    
    # Drop existing tables
    tables = [
        'user_progress', 'set_book_passages', 'grammar_content', 
        'test_bank_questions', 'vocabulary_words', 'kuwait_units', 'kuwait_classes'
    ]
    
    for table in tables:
        cursor.execute(f'DROP TABLE IF EXISTS {table}')
    
    # Create Kuwait Classes
    cursor.execute('''
    CREATE TABLE kuwait_classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_name TEXT NOT NULL,
        description TEXT,
        difficulty_level TEXT NOT NULL CHECK(difficulty_level IN ('beginner', 'intermediate', 'advanced')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create Kuwait Units
    cursor.execute('''
    CREATE TABLE kuwait_units (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unit_number INTEGER NOT NULL,
        unit_name TEXT NOT NULL,
        theme TEXT,
        class_id INTEGER,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES kuwait_classes(id)
    )
    ''')
    
    # Create Vocabulary Words
    cursor.execute('''
    CREATE TABLE vocabulary_words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        english TEXT NOT NULL,
        arabic TEXT NOT NULL,
        phonetic TEXT,
        example TEXT,
        category TEXT,
        difficulty TEXT NOT NULL CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
        unit_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
    )
    ''')
    
    # Create Test Bank Questions
    cursor.execute('''
    CREATE TABLE test_bank_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id TEXT UNIQUE NOT NULL,
        question_text TEXT NOT NULL,
        option_a TEXT,
        option_b TEXT,
        option_c TEXT,
        option_d TEXT,
        correct_answer TEXT,
        question_type TEXT NOT NULL CHECK(question_type IN ('vocabulary', 'grammar', 'reading', 'writing')),
        unit_id INTEGER,
        grade_level INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
    )
    ''')
    
    # Create Grammar Content
    cursor.execute('''
    CREATE TABLE grammar_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic TEXT NOT NULL,
        subtopic TEXT,
        explanation TEXT,
        examples TEXT,
        difficulty TEXT NOT NULL CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
        unit_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
    )
    ''')
    
    # Create Set Book Passages
    cursor.execute('''
    CREATE TABLE set_book_passages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        passage_title TEXT NOT NULL,
        english_text TEXT NOT NULL,
        arabic_text TEXT,
        unit_id INTEGER,
        grade_level INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
    )
    ''')
    
    # Create User Progress
    cursor.execute('''
    CREATE TABLE user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        vocabulary_mastered INTEGER DEFAULT 0,
        questions_answered INTEGER DEFAULT 0,
        correct_answers INTEGER DEFAULT 0,
        grammar_topics_completed INTEGER DEFAULT 0,
        total_study_time INTEGER DEFAULT 0,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    return conn

def insert_curriculum_data(conn):
    """Insert all extracted curriculum data"""
    cursor = conn.cursor()
    
    # Insert Kuwait Classes
    classes = [
        ('Grade 10', 'Basic English curriculum for Grade 10 students', 'beginner'),
        ('Grade 11', 'Intermediate English curriculum for Grade 11 students', 'intermediate'),
        ('Grade 12', 'Advanced English curriculum for Grade 12 students', 'advanced')
    ]
    
    for class_data in classes:
        cursor.execute('''
        INSERT INTO kuwait_classes (class_name, description, difficulty_level) 
        VALUES (?, ?, ?)
        ''', class_data)
    
    # Insert Kuwait Units
    units = [
        (1, 'Unit One: Legal and Civil Rights', 'Legal and Civil Rights', 3, 'Introduction to legal terminology, civil rights, and social justice'),
        (2, 'Unit Two: Technology and Innovation', 'Technology and Innovation', 3, 'Modern technology vocabulary and innovation concepts'),
        (3, 'Unit Three: Environment and Nature', 'Environment and Nature', 3, 'Environmental protection and nature conservation'),
        (4, 'Unit Four: Health and Medicine', 'Health and Medicine', 3, 'Medical terminology and health-related vocabulary'),
        (5, 'Unit Five: Arts and Culture', 'Arts and Culture', 3, 'Cultural expressions and artistic terminology'),
        (6, 'Unit Six: Economics and Business', 'Economics and Business', 3, 'Business vocabulary and economic concepts')
    ]
    
    for unit_data in units:
        cursor.execute('''
        INSERT INTO kuwait_units (unit_number, unit_name, theme, class_id, description) 
        VALUES (?, ?, ?, ?, ?)
        ''', unit_data)
    
    # Insert Vocabulary Words from extracted data
    vocabulary_words = [
        ('adoption', 'تبني', '/əˈdɒpʃən/', 'There are strict regulations concerning the adoption of children.', 'Legal', 'intermediate', 1),
        ('consultation', 'استشارة', '/ˌkɒnsəlˈteɪʃən/', 'He chose to join the course abroad after consultation with his parents.', 'Legal', 'intermediate', 1),
        ('litigation', 'تقاضٍ', '/ˌlɪtɪˈɡeɪʃən/', 'Television can encourage litigation in children.', 'Legal', 'advanced', 1),
        ('persuasion', 'إقناع', '/pəˈsweɪʒən/', 'There are strict regulations concerning the persuasion of children.', 'Legal', 'intermediate', 1),
        ('bench', 'مقعد', '/bentʃ/', 'My father is accustomed to sipping his coffee on a wooden bench.', 'Objects', 'beginner', 1),
        ('case', 'قضية', '/keɪs/', 'The case was refused as there was no evidence.', 'Legal', 'beginner', 1),
        ('notes', 'ملاحظات', '/noʊts/', 'The speaker looked at the notes he wrote to help him remember key points.', 'Learning', 'beginner', 1),
        ('brief', 'مختصر', '/briːf/', 'A brief meeting was held to discuss the policy and goals.', 'Legal', 'intermediate', 1),
        ('civil', 'مدني', '/ˈsɪvəl/', 'A civil meeting was held to discuss company policy.', 'Legal', 'intermediate', 1),
        ('guilty', 'مذنب', '/ˈɡɪlti/', 'He was proved to be guilty of the crime.', 'Legal', 'intermediate', 1),
        ('claimed', 'ادعى', '/kleɪmd/', 'The man claimed that he was innocent.', 'Legal', 'intermediate', 1),
        ('governed', 'يحكم', '/ˈɡʌvənd/', 'Our society is governed by customs and values related to Islam.', 'Legal', 'intermediate', 1),
        ('intended', 'قصد', '/ɪnˈtendɪd/', 'They intend to visit all the touristic places in London.', 'Verbs', 'intermediate', 1),
        ('enforced', 'نفذ', '/ɪnˈfɔːrst/', 'Laws against littering should be enforced to save the environment.', 'Legal', 'intermediate', 1),
        ('defined', 'حدد', '/dɪˈfaɪnd/', 'Culture can be defined as the knowledge, beliefs, laws, and customs of a group.', 'Verbs', 'intermediate', 1),
        ('grievance', 'شكوى', '/ˈɡriːvəns/', 'He has a grievance against the store for poor customer service.', 'Legal', 'advanced', 1),
        ('handcuffs', 'كلابات', '/ˈhændkʌfs/', 'The criminal was taken to the police station in handcuffs.', 'Legal', 'intermediate', 1),
        ('imposing', 'فرض', '/ɪmˈpoʊzɪŋ/', 'Beware of imposing your own taste on your children.', 'Verbs', 'intermediate', 1),
        ('principle', 'مبدأ', '/ˈprɪnsɪpəl/', 'The organization works on the principle that all members have equal rights.', 'Legal', 'intermediate', 1),
        ('innocent', 'بريء', '/ˈɪnəsənt/', 'The judge released the innocent man after considering new evidence.', 'Legal', 'intermediate', 1),
        ('legal', 'قانوني', '/ˈliːɡəl/', 'There are organizations that offer free legal advice to people.', 'Legal', 'intermediate', 1),
        ('violence', 'عنف', '/ˈvaɪələns/', 'Television can encourage violence in children.', 'Social', 'intermediate', 1),
        ('penalty', 'عقوبة', '/ˈpenəlti/', 'The company was given a severe penalty for violating environmental rules.', 'Legal', 'intermediate', 1),
        ('tolerant', 'متسامح', '/ˈtɒlərənt/', 'People should stop arguing over petty issues.', 'Social', 'intermediate', 1)
    ]
    
    for vocab in vocabulary_words:
        cursor.execute('''
        INSERT INTO vocabulary_words (english, arabic, phonetic, example, category, difficulty, unit_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', vocab)
    
    # Insert Test Bank Questions (Present Perfect Tense)
    grammar_questions = [
        ('g12_u1_g1', 'They ______ the law, they should be punished.', 'has broken', 'have broken', 'hadn''t broken', 'didn''t break', 'b', 'grammar', 1, 12),
        ('g12_u1_g2', 'I just ______ my leg during the race.', 'had-broken', 'didn''t-break', 'has-broken', 'have-broken', 'c', 'grammar', 1, 12),
        ('g12_u1_g3', 'She never______ to London.', 'have-been', 'has-been', 'is-being', 'was-being', 'b', 'grammar', 1, 12),
        ('g12_u1_g4', 'The manager______ already ______ the employee.', 'has-fired', 'had been-fired', 'have-fired', 'has-been fired', 'd', 'grammar', 1, 12),
        ('g12_u1_g5', 'My father''s flight ______ yet.', 'has arrived', 'arrived', 'hasn''t arrived', 'haven''t arrived', 'c', 'grammar', 1, 12),
        ('g12_u1_g6', 'He ______ in this school for five years.', 'were teaching', 'has been teaching', 'have taught', 'teaching', 'b', 'grammar', 1, 12),
        ('g12_u1_g7', 'I ______ this novel all day long. I am not done yet.', 'have been reading', 'had read', 'read', 'reading', 'a', 'grammar', 1, 12),
        ('g12_u1_g8', 'They ______ in that area since 1999.', 'are living', 'have been living', 'were living', 'has been living', 'b', 'grammar', 1, 12),
        ('g12_u1_g9', 'My sister ______ for the Olympics since last year.', 'is training', 'has been training', 'was training', 'training', 'b', 'grammar', 1, 12),
        ('g12_u1_g10', 'I ______ in this neighbourhood for several years.', 'lives', 'living', 'have lived', 'has lived', 'c', 'grammar', 1, 12),
        ('g12_u1_g11', 'My new car is not comfortable ______ the old one.', 'in comparison with', 'whereas', 'instead of', 'but', 'a', 'grammar', 1, 12),
        ('g12_u1_g12', 'Her phone ______ for two minutes. It''s quite annoying.', 'rang', 'has been ringing', 'have been ringing', 'ring', 'b', 'grammar', 1, 12),
        ('g12_u1_g13', 'My brother looks very tired. He ______ without break since morning.', 'has been working', 'will be working', 'have worked', 'worked', 'a', 'grammar', 1, 12),
        ('g12_u1_g14', 'I prefer spending vacations in busy cities. ______, my brother prefers small villages.', 'On the other hand', 'whereas', 'in comparison with', 'instead of', 'a', 'grammar', 1, 12),
        ('g12_u1_g15', 'I want to go out with friends, ______ I must study for the exams.', 'but', 'whereas', 'on the other hand', 'instead of', 'a', 'grammar', 1, 12),
        ('g12_u1_g16', 'Staying at home is relaxing. ______, you might feel bored.', 'Whereas', 'Instead of', 'On the other hand', 'In comparison with', 'c', 'grammar', 1, 12),
        ('g12_u1_g17', '______, being a doctor is a hard profession.', 'But', 'On the other hand', 'Whereas', 'In comparison with', 'c', 'grammar', 1, 12),
        ('g12_u1_g18', 'Let''s do some yoga ______ jogging.', 'but', 'instead of', 'whereas', 'on the other hand', 'b', 'grammar', 1, 12),
        ('g12_u1_g19', 'The tallest buildings in London are small ______ those in New York.', 'instead of', 'in comparison with', 'whereas', 'but', 'b', 'grammar', 1, 12),
        ('g12_u1_g20', 'Wherever possible I use honey ______ sugar.', 'whereas', 'on the other hand', 'but', 'instead of', 'd', 'grammar', 1, 12)
    ]
    
    for question in grammar_questions:
        cursor.execute('''
        INSERT INTO test_bank_questions (question_id, question_text, option_a, option_b, option_c, option_d, correct_answer, question_type, unit_id, grade_level) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', question)
    
    # Insert Grammar Content
    grammar_content = [
        ('Tenses', 'Present Perfect Tense', 'The Present Perfect Tense is used to describe actions that started in the past and continue to the present, or actions that happened at an unspecified time in the past but have relevance to the present.', 'Examples: "I have just finished my homework." "She has been working here for five years." "They have visited Paris three times."', 'intermediate', 1),
        ('Connectors', 'Comparative and Contrastive Connectors', 'These connectives are used to show relationships between ideas, particularly comparisons and contrasts. They help create coherence in writing and speaking.', 'Examples: "My car is not comfortable in comparison with the old one." "I prefer busy cities. On the other hand, my brother prefers small villages." "Instead of jogging, let''s do some yoga."', 'intermediate', 1)
    ]
    
    for content in grammar_content:
        cursor.execute('''
        INSERT INTO grammar_content (topic, subtopic, explanation, examples, difficulty, unit_id) 
        VALUES (?, ?, ?, ?, ?, ?)
        ''', content)
    
    # Insert Set Book Passages
    set_book_passages = [
        ('Justice and the Law', 'Justice is a fundamental concept in any civilized society. It represents the idea that all people should be treated fairly and equally under the law. In a just society, individuals have rights and responsibilities, and the legal system protects these rights while ensuring that everyone is held accountable for their actions. The pursuit of justice requires both laws that are fair and enforcement that is consistent. When these elements work together, society can achieve harmony and peace for all its members.', 'العدالة هي مفهوم أساسي في أي مجتمع متحضر. تمثل فكرة أن جميع الأشخاص يجب أن يُعاملوا بإنصاف وتكافؤ تحت القانون. في مجتمع عادل، للأفراد حقوق ومسؤوليات، ويحمي النظام القانوني هذه الحقوق مع ضمان محاسبة الجميع على أفعالهم. السعي لتحقيق العدالة يتطلب قوانين عادلة وإنفاذاً متسقاً. عندما تعمل هذه العناصر معاً، يمكن للمجتمع تحقيق الانسجام والسلام لجميع أعضائه.', 1, 12)
    ]
    
    for passage in set_book_passages:
        cursor.execute('''
        INSERT INTO set_book_passages (passage_title, english_text, arabic_text, unit_id, grade_level) 
        VALUES (?, ?, ?, ?, ?)
        ''', passage)
    
    # Create indexes for better performance
    indexes = [
        'CREATE INDEX idx_vocabulary_unit_id ON vocabulary_words(unit_id)',
        'CREATE INDEX idx_vocabulary_difficulty ON vocabulary_words(difficulty)',
        'CREATE INDEX idx_questions_unit_id ON test_bank_questions(unit_id)',
        'CREATE INDEX idx_questions_type ON test_bank_questions(question_type)',
        'CREATE INDEX idx_grammar_unit_id ON grammar_content(unit_id)',
        'CREATE INDEX idx_progress_user_id ON user_progress(user_id)'
    ]
    
    for index in indexes:
        cursor.execute(index)
    
    conn.commit()
    return cursor.rowcount

def validate_migration(conn):
    """Validate that migration was successful"""
    cursor = conn.cursor()
    
    # Get counts
    cursor.execute('SELECT COUNT(*) FROM vocabulary_words')
    vocab_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM test_bank_questions')
    questions_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM grammar_content')
    grammar_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM set_book_passages')
    passages_count = cursor.fetchone()[0]
    
    # Get sample data
    cursor.execute('SELECT english, arabic FROM vocabulary_words LIMIT 3')
    sample_vocab = cursor.fetchall()
    
    cursor.execute('SELECT question_text, correct_answer FROM test_bank_questions WHERE question_type = "grammar" LIMIT 2')
    sample_questions = cursor.fetchall()
    
    return {
        'vocabulary_count': vocab_count,
        'questions_count': questions_count,
        'grammar_count': grammar_count,
        'passages_count': passages_count,
        'sample_vocabulary': sample_vocab,
        'sample_questions': sample_questions
    }

def main():
    """Main migration function"""
    print("🚀 Starting Kuwait English Learning Platform Database Migration...")
    
    try:
        # Create database and schema
        print("📊 Creating database schema...")
        conn = create_database_schema()
        
        # Insert curriculum data
        print("📚 Inserting curriculum data...")
        rows_inserted = insert_curriculum_data(conn)
        print(f"✅ Successfully inserted {rows_inserted} rows of data")
        
        # Validate migration
        print("🔍 Validating migration...")
        validation = validate_migration(conn)
        
        print("\n" + "="*50)
        print("🎉 MIGRATION COMPLETED SUCCESSFULLY!")
        print("="*50)
        print(f"📖 Vocabulary Words: {validation['vocabulary_count']}")
        print(f"❓ Test Questions: {validation['questions_count']}")
        print(f"📝 Grammar Topics: {validation['grammar_count']}")
        print(f"📄 Set Book Passages: {validation['passages_count']}")
        
        print("\n📋 Sample Vocabulary:")
        for word in validation['sample_vocabulary']:
            print(f"   • {word[0]} ({word[1]})")
        
        print("\n📋 Sample Questions:")
        for question in validation['sample_questions']:
            print(f"   • {question[0][:50]}... → {question[1]}")
        
        print(f"\n💾 Database saved as: /workspace/kuwait_english_platform.db")
        print("✅ Ready for integration with Kuwait English Learning Platform!")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        return False

if __name__ == "__main__":
    main()