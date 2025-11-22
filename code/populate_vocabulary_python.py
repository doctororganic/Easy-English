#!/usr/bin/env python3

import json
import re
import os
import subprocess
import sys
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
            f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary?select=id&limit=1'
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

def clear_data():
    """Clear existing vocabulary data"""
    print("🗑️ Clearing existing vocabulary data...")
    try:
        result = subprocess.run([
            'curl', '-s', '-X', 'DELETE',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            '-H', 'Content-Type: application/json',
            f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary?id=gte.0'
        ], capture_output=True, text=True, timeout=10)
        
        if 'error' in result.stdout.lower():
            print(f"⚠️ Warning: Could not clear existing data: {result.stdout}")
        else:
            print("✅ Existing data cleared")
    except Exception as e:
        print(f"⚠️ Warning: Error clearing data: {e}")

def parse_vocabulary_file(file_path: str) -> List[Dict[str, Any]]:
    """Parse the vocabulary markdown file and extract all entries"""
    print("📖 Reading and parsing vocabulary data...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return []
    
    lines = content.split('\n')
    vocabulary_data = []
    current_class = 0
    current_unit = 0
    order = 0
    
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
                order = 0
                print(f"  📖 Processing Unit {current_unit}")
            continue
        
        # Parse vocabulary entries
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
                
                order += 1
                
                vocabulary_data.append({
                    "word": word,
                    "class_number": current_class,
                    "unit_number": current_unit,
                    "definition_en": word,
                    "definition_ar": arabic_def,
                    "phonetic": word,
                    "examples": [],
                    "category": part_of_speech,
                    "difficulty_level": current_class // 3 + 1,
                    "order_in_unit": order,
                    "audio_url": None
                })
                
                print(f"    ✓ Added: {word} ({part_of_speech}) - {arabic_def}")
    
    print(f"📊 Total vocabulary entries parsed: {len(vocabulary_data)}")
    return vocabulary_data

def insert_batch(batch_data: List[Dict[str, Any]], batch_name: str) -> bool:
    """Insert a batch of data into Supabase"""
    try:
        # Create temporary JSON file
        temp_file = f"/tmp/vocab_batch_{batch_name.replace(' ', '_').replace(',', '_')}.json"
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(batch_data, f, ensure_ascii=False, indent=2)
        
        # Insert data
        result = subprocess.run([
            'curl', '-s', '-X', 'POST',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            '-H', 'Content-Type: application/json',
            '-H', 'Prefer: return=minimal',
            '--data', f'@{temp_file}',
            f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary'
        ], capture_output=True, text=True, timeout=30)
        
        # Clean up temp file
        os.remove(temp_file)
        
        if 'error' in result.stdout.lower():
            print(f"❌ Error inserting {batch_name}: {result.stdout}")
            return False
        else:
            print(f"✅ Successfully inserted {batch_name} ({len(batch_data)} records)")
            return True
            
    except Exception as e:
        print(f"💥 Exception inserting {batch_name}: {e}")
        return False

def verify_data():
    """Verify the final state of the database"""
    print("\n🔍 Verifying final data...")
    try:
        result = subprocess.run([
            'curl', '-s',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary?select=class_number,unit_number&order=class_number.asc,unit_number.asc'
        ], capture_output=True, text=True, timeout=10)
        
        if 'error' in result.stdout.lower():
            print(f"❌ Verification failed: {result.stdout}")
            return False
        else:
            try:
                data = json.loads(result.stdout)
                print("📊 Final database state:")
                
                # Group by class and unit
                state = {}
                for item in data:
                    class_key = str(item['class_number'])
                    unit_key = str(item['unit_number'])
                    if class_key not in state:
                        state[class_key] = {}
                    if unit_key not in state[class_key]:
                        state[class_key][unit_key] = 0
                    state[class_key][unit_key] += 1
                
                for class_num in sorted(state.keys()):
                    for unit_num in sorted(state[class_num].keys(), key=int):
                        count = state[class_num][unit_num]
                        print(f"   Grade {class_num}, Unit {unit_num}: {count} words")
                
                # Get total count
                result_count = subprocess.run([
                    'curl', '-s',
                    '-H', f'apikey: {SUPABASE_KEY}',
                    '-H', f'Authorization: Bearer {SUPABASE_KEY}',
                    f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary?select=*&limit=1'
                ], capture_output=True, text=True)
                
                if 'content-range' in result_count.stdout:
                    match = re.search(r'content-range: 0-(\d+)/\d+', result_count.stdout)
                    if match:
                        total = int(match[1]) + 1
                        print(f"   📈 Total records in database: {total}")
                
                return True
            except json.JSONDecodeError:
                print("📊 Raw response:", result.stdout[:200] + "...")
                return True
                
    except Exception as e:
        print(f"❌ Verification error: {e}")
        return False

def main():
    """Main execution function"""
    print("🎯 Kuwait English Learning Platform - Vocabulary Database Population")
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
    
    # Clear existing data
    clear_data()
    print()
    
    # Parse vocabulary data
    vocabulary_data = parse_vocabulary_file(vocab_file)
    
    if not vocabulary_data:
        print("❌ No vocabulary data found")
        sys.exit(1)
    
    print()
    
    # Insert data in batches of 50
    batch_size = 50
    total_inserted = 0
    
    print(f"🚀 Starting batch insert of {len(vocabulary_data)} vocabulary records...")
    print()
    
    for i in range(0, len(vocabulary_data), batch_size):
        batch = vocabulary_data[i:i + batch_size]
        batch_number = i // batch_size + 1
        total_batches = (len(vocabulary_data) + batch_size - 1) // batch_size
        
        batch_name = f"batch_{batch_number}"
        
        if insert_batch(batch, batch_name):
            total_inserted += len(batch)
    
    print()
    print(f"📊 Total successfully inserted: {total_inserted} records")
    
    # Verify data
    verify_data()
    
    print("\n🎉 Vocabulary database population completed!")
    return 0

if __name__ == "__main__":
    sys.exit(main())