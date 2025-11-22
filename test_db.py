import sqlite3

try:
    conn = sqlite3.connect('/workspace/kuwait_platform_autonomous.db')
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM test_bank_questions WHERE component_type = 'vocabulary'")
    count = cursor.fetchone()[0]
    print(f"Vocabulary count: {count}")
    
    # Get sample
    cursor.execute("SELECT id, english_word, arabic_translation FROM test_bank_questions WHERE component_type = 'vocabulary' LIMIT 5")
    samples = cursor.fetchall()
    print("\nSample vocabulary:")
    for row in samples:
        print(f"  {row[0]}: {row[1]} - {row[2]}")
    
    conn.close()
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
