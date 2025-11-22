#!/usr/bin/env python3

import json
import re
import os
import subprocess
import sys
import uuid
from typing import List, Dict, Any

# Supabase configuration
SUPABASE_URL = "https://wjdzoqlxudswcovbuptd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0MDksImV4cCI6MjA3NzU5ODQwOX0.AcOvzDba-IGxV_TNN1KE6FNSNxC4AJH2wOfAguG0yQc"

def test_connection():
    """Test Supabase connection"""
    print("🔌 Testing Supabase connection...")
    try:
        result = subprocess.run([
            'curl', '-s', '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            f'{SUPABASE_URL}/rest/v1/test_bank_questions?select=id&limit=1'
        ], capture_output=True, text=True, timeout=10)
        
        if 'error' in result.stdout.lower():
            print(f"❌ Database connection failed: {result.stdout}")
            return False
        else:
            print("✅ Database connection successful!")
            return True
    except Exception as e:
        print(f"❌ Connection test failed: {e}")
        return False

def parse_vocabulary_file(file_path: str) -> List[Dict[str, Any]]:
    """Parse the vocabulary markdown file and convert to test_bank_questions format"""
    print("📖 Reading and parsing vocabulary data...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return []
    
    lines = content.split('\n')
    vocabulary_questions = []
    current_class = 0
    current_unit = 0
    question_number = 0
    
    for line in lines:
        line = line.strip()
        
        # Check for grade level headers
        if line.startswith('## Grade '):
            grade_match = re.match(r'Grade (\d+)', line)
            if grade_match:
                current_class = int(grade_match[1])
                print(f"📚 Processing Grade {current_class}")
            continue
        
        # Check for unit headers
        if line.startswith('### Unit '):
            unit_match = re.match(r'Unit (\d+)', line)
            if unit_match:
                current_unit = int(unit_match[1])
                question_number = 0
                print(f"  📖 Processing Unit {current_unit}")
            continue
        
        # Parse vocabulary entries and create questions
        if line.startswith('- ') and ' - ' in line:
            entry = line[2:]  # Remove "- "
            parts = entry.split(' - ')
            
            if len(parts) == 2:
                word_part = parts[0].strip()
                arabic_def = parts[1].strip()
                
                # Extract word and part of speech
                word_match = re.match(r'^([^(]+)\s*\(([^)]+)\)', word_part)
                if word_match:
                    word = word_match[1].strip()
                    part_of_speech = word_match[2].strip()
                else:
                    word = word_part
                    part_of_speech = 'n.'  # Default to noun
                
                question_number += 1
                
                # Create vocabulary question
                vocabulary_questions.append({
                    "id": str(uuid.uuid4()),
                    "grade_level": str(current_class),
                    "unit_number": current_unit,
                    "component_type": "vocabulary",
                    "question_number": question_number,
                    "question_text": f"What is the meaning of '{word}'?",
                    "question_type": "vocabulary",
                    "options": {
                        "word": word,
                        "part_of_speech": part_of_speech,
                        "arabic_definition": arabic_def,
                        "phonetic": word  # Using word as phonetic for now
                    },
                    "correct_answer": {
                        "word": word,
                        "definition": arabic_def,
                        "part_of_speech": part_of_speech
                    },
                    "model_answer": json.dumps({
                        "word": word,
                        "pronunciation": word,
                        "definition": arabic_def,
                        "part_of_speech": part_of_speech,
                        "example": f"The word '{word}' means {arabic_def}.",
                        "example_arabic": f"كلمة {word} تعني {arabic_def}."
                    }, ensure_ascii=False),
                    "explanation": f"The word '{word}' ({part_of_speech}) means {arabic_def} in Arabic.",
                    "points": 1,
                    "difficulty": current_class // 3 + 1,
                    "created_at": "2025-11-09T23:59:50+00:00"
                })
    
    print(f"📊 Total vocabulary questions created: {len(vocabulary_questions)}")
    return vocabulary_questions

def clear_existing_vocabulary():
    """Clear existing vocabulary questions"""
    print("🗑️ Clearing existing vocabulary questions...")
    try:
        result = subprocess.run([
            'curl', '-s', '-X', 'DELETE',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            '-H', 'Content-Type: application/json',
            f'{SUPABASE_URL}/rest/v1/test_bank_questions?component_type=eq.vocabulary'
        ], capture_output=True, text=True, timeout=10)
        
        if 'error' in result.stdout.lower():
            print(f"⚠️ Warning: Could not clear existing vocabulary: {result.stdout}")
        else:
            print("✅ Existing vocabulary questions cleared")
    except Exception as e:
        print(f"⚠️ Warning: Error clearing vocabulary: {e}")

def insert_vocabulary_batch(batch_data: List[Dict[str, Any]], batch_name: str) -> bool:
    """Insert a batch of vocabulary questions into test_bank_questions table"""
    try:
        # Create temporary JSON file
        import tempfile
        with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
            json.dump(batch_data, f, ensure_ascii=False, indent=2)
            temp_file = f.name
        
        # Insert data
        result = subprocess.run([
            'curl', '-s', '-X', 'POST',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            '-H', 'Content-Type: application/json',
            '-H', 'Prefer: return=minimal',
            '--data', f'@{temp_file}',
            f'{SUPABASE_URL}/rest/v1/test_bank_questions'
        ], capture_output=True, text=True, timeout=30)
        
        # Clean up temp file
        os.unlink(temp_file)
        
        if 'error' in result.stdout.lower():
            print(f"❌ Error inserting {batch_name}: {result.stdout}")
            return False
        else:
            print(f"✅ Successfully inserted {batch_name} ({len(batch_data)} records)")
            return True
            
    except Exception as e:
        print(f"💥 Exception inserting {batch_name}: {e}")
        return False

def verify_vocabulary_data():
    """Verify the final state of vocabulary data"""
    print("\n🔍 Verifying vocabulary data...")
    try:
        result = subprocess.run([
            'curl', '-s',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            f'{SUPABASE_URL}/rest/v1/test_bank_questions?select=grade_level,unit_number,component_type&component_type=eq.vocabulary&order=grade_level.asc,unit_number.asc'
        ], capture_output=True, text=True, timeout=10)
        
        if 'error' in result.stdout.lower():
            print(f"❌ Verification failed: {result.stdout}")
            return False
        else:
            try:
                data = json.loads(result.stdout)
                print("📊 Final vocabulary database state:")
                
                if isinstance(data, list) and len(data) > 0:
                    # Group by class and unit
                    state = {}
                    for item in data:
                        class_key = str(item['grade_level'])
                        unit_key = str(item['unit_number'])
                        if class_key not in state:
                            state[class_key] = {}
                        if unit_key not in state[class_key]:
                            state[class_key][unit_key] = 0
                        state[class_key][unit_key] += 1
                    
                    for class_num in sorted(state.keys()):
                        for unit_num in sorted(state[class_num].keys(), key=int):
                            count = state[class_num][unit_key]
                            print(f"   Grade {class_num}, Unit {unit_num}: {count} vocabulary questions")
                    
                    print(f"   📈 Total vocabulary questions in database: {len(data)}")
                else:
                    print("   📭 No vocabulary data found in database")
                
                return True
            except json.JSONDecodeError:
                print("📊 Raw response:", result.stdout[:200] + "...")
                return True
                
    except Exception as e:
        print(f"❌ Verification error: {e}")
        return False

def main():
    """Main execution function"""
    print("🎯 Kuwait English Learning Platform - Vocabulary Questions Population")
    print("========================================================================\n")
    
    # File path
    vocab_file = "/workspace/extract/kuwait-vocabulary-database.md"
    
    if not os.path.exists(vocab_file):
        print(f"❌ Vocabulary file not found: {vocab_file}")
        sys.exit(1)
    
    # Test connection
    if not test_connection():
        sys.exit(1)
    
    print()
    
    # Clear existing vocabulary
    clear_existing_vocabulary()
    print()
    
    # Parse vocabulary data and create questions
    vocabulary_questions = parse_vocabulary_file(vocab_file)
    
    if not vocabulary_questions:
        print("❌ No vocabulary data found")
        sys.exit(1)
    
    print()
    
    # Insert data in batches of 50
    batch_size = 50
    total_inserted = 0
    
    print(f"🚀 Starting batch insert of {len(vocabulary_questions)} vocabulary questions...")
    print()
    
    for i in range(0, len(vocabulary_questions), batch_size):
        batch = vocabulary_questions[i:i + batch_size]
        batch_number = i // batch_size + 1
        total_batches = (len(vocabulary_questions) + batch_size - 1) // batch_size
        
        batch_name = f"vocabulary_batch_{batch_number}"
        
        if insert_vocabulary_batch(batch, batch_name):
            total_inserted += len(batch)
    
    print()
    print(f"📊 Total successfully inserted: {total_inserted} vocabulary questions")
    
    # Verify data
    verify_vocabulary_data()
    
    print("\n🎉 Vocabulary questions database population completed!")
    print("📝 Note: Vocabulary questions are stored in the test_bank_questions table")
    print("🔗 Component type: 'vocabulary' | Question type: 'vocabulary'")
    return 0

if __name__ == "__main__":
    sys.exit(main())