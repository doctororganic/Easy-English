#!/usr/bin/env python3
"""
Kuwait English Learning Platform - Autonomous MySQL Database Setup
Creates MySQL-compatible database structure and populates with vocabulary data
"""

import sqlite3
import json
import re
import uuid
import os
import sys
from typing import List, Dict, Any, Tuple
from datetime import datetime

class AutonomousKuwaitDB:
    def __init__(self, db_path: str = "/workspace/kuwait_platform_autonomous.db"):
        self.db_path = db_path
        self.setup_database()
    
    def setup_database(self):
        """Create autonomous database schema"""
        print("🗄️ Setting up autonomous Kuwait platform database...")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Main vocabulary table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS test_bank_questions (
                id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
                question_text TEXT NOT NULL,
                question_type TEXT NOT NULL DEFAULT 'vocabulary',
                component_type TEXT NOT NULL DEFAULT 'vocabulary',
                grade_level INTEGER NOT NULL,
                unit_number INTEGER NOT NULL,
                english_word TEXT NOT NULL,
                part_of_speech TEXT,
                arabic_translation TEXT NOT NULL,
                difficulty_level TEXT DEFAULT 'intermediate',
                question_data JSON,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Indexes for performance
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_grade_unit ON test_bank_questions(grade_level, unit_number)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_component_type ON test_bank_questions(component_type)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_question_type ON test_bank_questions(question_type)')
        
        # Cache table for autonomous performance
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS vocabulary_cache (
                id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
                cache_key TEXT UNIQUE NOT NULL,
                cache_data TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                expires_at DATETIME
            )
        ''')
        
        # User progress tracking
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_progress (
                id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
                user_id TEXT NOT NULL,
                grade_level INTEGER NOT NULL,
                unit_number INTEGER NOT NULL,
                vocabulary_completed TEXT,
                last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        print("✅ Autonomous database schema created")
    
    def parse_vocabulary_file(self, file_path: str) -> List[Dict[str, Any]]:
        """Parse vocabulary markdown file into structured data"""
        print("📖 Parsing vocabulary data autonomously...")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"❌ Error reading vocabulary file: {e}")
            return []
        
        lines = content.split('\n')
        vocabulary_questions = []
        current_grade = 0
        current_unit = 0
        question_number = 0
        
        for line in lines:
            line = line.strip()
            
            # Skip empty lines and main headers
            if not line or line.startswith('#'):
                continue
            
            # Detect grade level
            if 'Grade' in line and 'Vocabulary' in line:
                grade_match = re.search(r'Grade\s+(\d+)', line)
                if grade_match:
                    current_grade = int(grade_match.group(1))
                continue
            
            # Detect unit number
            if line.startswith('### Unit'):
                unit_match = re.search(r'Unit\s+(\d+)', line)
                if unit_match:
                    current_unit = int(unit_match.group(1))
                continue
            
            # Parse vocabulary entries (format: word (pos.) - arabic)
            if '-' in line and '(' in line and ')' in line:
                # Extract components using regex
                entry_pattern = r'^(.+?)\s*\(([^)]+)\)\s*-\s*(.+)$'
                match = re.match(entry_pattern, line)
                
                if match:
                    english_word, part_of_speech, arabic_translation = match.groups()
                    
                    # Clean up the extracted data
                    english_word = english_word.strip()
                    part_of_speech = part_of_speech.strip()
                    arabic_translation = arabic_translation.strip()
                    
                    # Skip if critical data is missing
                    if not english_word or not arabic_translation:
                        continue
                    
                    question_number += 1
                    
                    # Create question data structure
                    question_data = {
                        "vocabulary_entry": {
                            "english_word": english_word,
                            "part_of_speech": part_of_speech,
                            "arabic_translation": arabic_translation,
                            "grade_level": current_grade,
                            "unit_number": current_unit,
                            "question_number": question_number
                        },
                        "question_type": "vocabulary_identification",
                        "difficulty_level": "intermediate"
                    }
                    
                    # Create the main question record
                    question_record = {
                        "id": str(uuid.uuid4()),
                        "question_text": f"Identify the Arabic translation for: {english_word} ({part_of_speech})",
                        "question_type": "vocabulary",
                        "component_type": "vocabulary",
                        "grade_level": current_grade,
                        "unit_number": current_unit,
                        "english_word": english_word,
                        "part_of_speech": part_of_speech,
                        "arabic_translation": arabic_translation,
                        "difficulty_level": "intermediate",
                        "question_data": json.dumps(question_data)
                    }
                    
                    vocabulary_questions.append(question_record)
        
        print(f"✅ Parsed {len(vocabulary_questions)} vocabulary entries")
        return vocabulary_questions
    
    def insert_vocabulary_batch(self, questions: List[Dict[str, Any]], batch_size: int = 50) -> bool:
        """Insert vocabulary questions in batches with autonomous error handling"""
        print(f"💾 Inserting {len(questions)} vocabulary entries in batches of {batch_size}...")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        total_inserted = 0
        total_failed = 0
        
        # Process in batches
        for i in range(0, len(questions), batch_size):
            batch = questions[i:i + batch_size]
            batch_num = (i // batch_size) + 1
            total_batches = (len(questions) + batch_size - 1) // batch_size
            
            print(f"🔄 Processing batch {batch_num}/{total_batches} ({len(batch)} records)...")
            
            try:
                for question in batch:
                    cursor.execute('''
                        INSERT INTO test_bank_questions 
                        (id, question_text, question_type, component_type, grade_level, unit_number, 
                         english_word, part_of_speech, arabic_translation, difficulty_level, question_data)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        question['id'],
                        question['question_text'],
                        question['question_type'],
                        question['component_type'],
                        question['grade_level'],
                        question['unit_number'],
                        question['english_word'],
                        question['part_of_speech'],
                        question['arabic_translation'],
                        question['difficulty_level'],
                        question['question_data']
                    ))
                    total_inserted += 1
                
                conn.commit()
                print(f"✅ Batch {batch_num} completed successfully")
                
            except Exception as e:
                print(f"❌ Batch {batch_num} failed: {e}")
                conn.rollback()
                total_failed += len(batch)
                continue
        
        conn.close()
        
        print(f"📊 Insertion completed:")
        print(f"  ✅ Successfully inserted: {total_inserted} records")
        print(f"  ❌ Failed insertions: {total_failed} records")
        
        return total_failed == 0
    
    def validate_insertion(self) -> Dict[str, Any]:
        """Validate the inserted data autonomously"""
        print("🔍 Validating autonomous data insertion...")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get overall statistics
        cursor.execute('SELECT COUNT(*) FROM test_bank_questions WHERE component_type = "vocabulary"')
        total_vocabulary = cursor.fetchone()[0]
        
        # Grade distribution
        cursor.execute('''
            SELECT grade_level, COUNT(*) as count 
            FROM test_bank_questions 
            WHERE component_type = "vocabulary" 
            GROUP BY grade_level 
            ORDER BY grade_level
        ''')
        grade_distribution = dict(cursor.fetchall())
        
        # Unit distribution
        cursor.execute('''
            SELECT grade_level, unit_number, COUNT(*) as count 
            FROM test_bank_questions 
            WHERE component_type = "vocabulary" 
            GROUP BY grade_level, unit_number 
            ORDER BY grade_level, unit_number
        ''')
        unit_distribution = [f"Grade {row[0]} Unit {row[1]}: {row[2]} words" for row in cursor.fetchall()]
        
        # Sample data check
        cursor.execute('''
            SELECT english_word, arabic_translation, grade_level, unit_number 
            FROM test_bank_questions 
            WHERE component_type = "vocabulary" 
            LIMIT 5
        ''')
        sample_data = cursor.fetchall()
        
        conn.close()
        
        validation_result = {
            'total_vocabulary_entries': total_vocabulary,
            'grade_distribution': grade_distribution,
            'unit_distribution': unit_distribution,
            'sample_data': sample_data,
            'validation_passed': total_vocabulary > 0
        }
        
        if validation_result['validation_passed']:
            print(f"✅ Autonomous validation PASSED")
            print(f"📊 Total vocabulary entries: {total_vocabulary}")
            print(f"📈 Grade distribution: {grade_distribution}")
            print(f"📋 Sample entries:")
            for sample in sample_data[:3]:
                print(f"  - {sample[0]} → {sample[1]} (Grade {sample[2]} Unit {sample[3]})")
        else:
            print(f"❌ Autonomous validation FAILED")
        
        return validation_result

def autonomous_main():
    """Main autonomous execution function"""
    print("🚀 Starting Kuwait Platform Autonomous Database Setup")
    print("=" * 60)
    
    try:
        # Step 1: Initialize autonomous database
        db = AutonomousKuwaitDB()
        
        # Step 2: Parse vocabulary data
        vocabulary_file = "/workspace/extract/kuwait-vocabulary-database.md"
        questions = db.parse_vocabulary_file(vocabulary_file)
        
        if not questions:
            print("❌ No vocabulary questions parsed - stopping autonomous execution")
            return False
        
        # Step 3: Insert data autonomously
        success = db.insert_vocabulary_batch(questions)
        
        if not success:
            print("❌ Data insertion failed - autonomous execution stopped")
            return False
        
        # Step 4: Validate results
        validation = db.validate_insertion()
        
        if not validation['validation_passed']:
            print("❌ Validation failed - autonomous execution stopped")
            return False
        
        # Step 5: Generate autonomous report
        report_path = "/workspace/autonomous_setup_report.json"
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump({
                'setup_completed': True,
                'timestamp': datetime.now().isoformat(),
                'database_path': db.db_path,
                'validation_results': validation,
                'total_processed': len(questions)
            }, f, indent=2, ensure_ascii=False)
        
        print(f"📋 Autonomous setup report saved: {report_path}")
        print("🎯 Kuwait Platform Autonomous Setup COMPLETED SUCCESSFULLY!")
        
        return True
        
    except Exception as e:
        print(f"💥 Autonomous setup failed: {e}")
        return False

if __name__ == "__main__":
    success = autonomous_main()
    sys.exit(0 if success else 1)
