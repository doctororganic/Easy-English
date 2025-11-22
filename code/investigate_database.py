#!/usr/bin/env python3

import subprocess
import json

# Supabase configuration
SUPABASE_URL = "https://wjdzoqlxudswcovbuptd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0MDksImV4cCI6MjA3NzU5ODQwOX0.AcOvzDba-IGxV_TNN1KE6FNSNxC4AJH2wOfAguG0yQc"

def test_simple_insert():
    """Test a simple insert to see if the table is created automatically"""
    print("🧪 Testing simple vocabulary insert...")
    
    test_data = [{
        "word": "test",
        "class_number": 10,
        "unit_number": 1,
        "definition_en": "test",
        "definition_ar": "اختبار",
        "phonetic": "test",
        "examples": [],
        "category": "n.",
        "difficulty_level": 1,
        "order_in_unit": 1,
        "audio_url": None
    }]
    
    # Create temporary JSON file
    import tempfile
    import os
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        json.dump(test_data, f, ensure_ascii=False, indent=2)
        temp_file = f.name
    
    try:
        # Try to insert
        result = subprocess.run([
            'curl', '-s', '-X', 'POST',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            '-H', 'Content-Type: application/json',
            '-H', 'Prefer: return=representation',
            '--data', f'@{temp_file}',
            f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary'
        ], capture_output=True, text=True, timeout=30)
        
        print(f"Insert response status: {result.returncode}")
        print(f"Insert response: {result.stdout[:200]}...")
        
        if 'error' in result.stdout.lower():
            print("❌ Insert failed")
        else:
            print("✅ Insert successful!")
            
        # Try to retrieve
        result2 = subprocess.run([
            'curl', '-s',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            f'{SUPABASE_URL}/rest/v1/kuwait_vocabulary?select=*&limit=5'
        ], capture_output=True, text=True, timeout=10)
        
        print(f"Retrieve response: {result2.stdout[:200]}...")
        
    finally:
        os.unlink(temp_file)

def check_existing_tables():
    """Check what tables actually exist"""
    print("\n🔍 Checking available tables...")
    
    # Try to get schema information
    result = subprocess.run([
        'curl', '-s',
        '-H', f'apikey: {SUPABASE_KEY}',
        '-H', f'Authorization: Bearer {SUPABASE_KEY}',
        f'{SUPABASE_URL}/rest/v1/'
    ], capture_output=True, text=True, timeout=10)
    
    print("Raw schema response (first 500 chars):")
    print(result.stdout[:500])
    print("...")
    
    # Try some common table names
    common_tables = [
        'kuwait_vocabulary',
        'kuwait_user_progress', 
        'vocabulary',
        'test_bank_questions',
        'set_book_content'
    ]
    
    print("\n🧪 Testing common table names:")
    for table in common_tables:
        result = subprocess.run([
            'curl', '-s',
            '-H', f'apikey: {SUPABASE_KEY}',
            '-H', f'Authorization: Bearer {SUPABASE_KEY}',
            f'{SUPABASE_URL}/rest/v1/{table}?limit=1'
        ], capture_output=True, text=True, timeout=5)
        
        if 'error' in result.stdout.lower():
            print(f"  {table}: ❌ Not found")
        else:
            print(f"  {table}: ✅ Found")
            # If found, try to get count
            count_result = subprocess.run([
                'curl', '-s',
                '-H', f'apikey: {SUPABASE_KEY}',
                '-H', f'Authorization: Bearer {SUPABASE_KEY}',
                f'{SUPABASE_URL}/rest/v1/{table}?select=*&limit=1'
            ], capture_output=True, text=True, timeout=5)
            print(f"    Sample: {count_result.stdout[:100]}...")

def main():
    print("🎯 Kuwait English Platform - Database Investigation")
    print("=" * 50)
    
    # Check existing tables
    check_existing_tables()
    
    # Test simple insert
    test_simple_insert()
    
    print("\n📊 Investigation complete!")

if __name__ == "__main__":
    main()