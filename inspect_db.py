import sqlite3
import json

db_path = '/workspace/kuwait_platform_autonomous.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("=== DATABASE TABLES ===")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
for table in tables:
    print(f"  - {table[0]}")

print("\n=== TEST_BANK_QUESTIONS SCHEMA ===")
cursor.execute("PRAGMA table_info(test_bank_questions)")
schema = cursor.fetchall()
for col in schema:
    print(f"  {col[1]} ({col[2]})")

print("\n=== VOCABULARY COUNT BY GRADE/UNIT ===")
cursor.execute("""
    SELECT component_type, grade_level, unit_number, COUNT(*) as count
    FROM test_bank_questions
    GROUP BY component_type, grade_level, unit_number
    ORDER BY grade_level, unit_number
""")
counts = cursor.fetchall()
for row in counts:
    print(f"  {row[0]}: Grade {row[1]}, Unit {row[2]} - {row[3]} items")

print("\n=== SAMPLE VOCABULARY (Grade 12, Unit 1) ===")
cursor.execute("""
    SELECT id, english_word, arabic_translation, part_of_speech
    FROM test_bank_questions
    WHERE component_type = 'vocabulary' AND grade_level = 12 AND unit_number = 1
    LIMIT 10
""")
samples = cursor.fetchall()
for row in samples:
    print(f"  {row[0]}: {row[1]} ({row[2]}) - {row[3]}")

print("\n=== TOTAL RECORDS ===")
cursor.execute("SELECT COUNT(*) FROM test_bank_questions")
total = cursor.fetchone()[0]
print(f"  Total: {total} records")

conn.close()
