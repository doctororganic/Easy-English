#!/usr/bin/env python3
"""
Comprehensive script to populate Grade 10, 11, and 12 vocabulary and setbook questions
"""

import os
import re
from supabase import create_client, Client

# Initialize Supabase client
supabase_url = os.getenv('SUPABASE_URL', 'https://hkljprwxvdoxorhcbvpo.supabase.co')
supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTk2NDQ4NiwiZXhwIjoyMDc3NTQwNDg2fQ.heaHyMO4dBSo2PotYtcWR-QsVPUc4ZVJbng37GPX3Fo')

supabase: Client = create_client(supabase_url, supabase_key)

def clean_text(text):
    """Clean text by removing extra whitespace and newlines"""
    if not text:
        return ''
    return text.replace('\r', '').replace('\n', ' ').strip()

def populate_grade10_vocabulary():
    """Populate Grade 10 vocabulary from the structured text file"""
    print('\n=== Populating Grade 10 Vocabulary ===')
    
    with open('/workspace/user_input_files/Grade 10 level First Term .txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = [l.strip() for l in content.split('\n')]
    
    current_unit = None
    vocabulary_batch = []
    total_inserted = 0
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Detect unit headers
        unit_match = re.match(r'^Unit\s+(\d+)[\s:]', line, re.IGNORECASE)
        if unit_match:
            # Insert previous batch
            if vocabulary_batch:
                print(f'Inserting {len(vocabulary_batch)} words for {current_unit}...')
                try:
                    result = supabase.table('vocabulary').insert(vocabulary_batch).execute()
                    total_inserted += len(vocabulary_batch)
                    print(f'✓ Inserted {len(vocabulary_batch)} words for {current_unit}')
                except Exception as e:
                    print(f'Error inserting {current_unit}: {str(e)}')
                vocabulary_batch = []
            
            unit_num = int(unit_match.group(1))
            current_unit = f'Grade 10 Unit {unit_num}'
            print(f'\nProcessing {current_unit}...')
            i += 1
            continue
        
        # Skip headers and empty lines
        if not line or line in ['TableCopy', 'English', 'Arabic', 'Meaning', 'Example Sentence'] or line.startswith('PART'):
            i += 1
            continue
        
        # Match vocabulary word pattern: word (part of speech)
        vocab_match = re.match(r'^([a-zA-Z\s\'-]+)\s*\(([^)]+)\)\s*$', line)
        
        if vocab_match and current_unit and i + 3 < len(lines):
            word = vocab_match.group(1).strip()
            part_of_speech = vocab_match.group(2).strip()
            
            # Next 3 lines are: Arabic, Meaning, Example
            arabic = lines[i + 1].strip()
            meaning = lines[i + 2].strip()
            example = lines[i + 3].strip()
            
            if word and meaning:
                vocabulary_batch.append({
                    'word': word,
                    'arabic_translation': arabic if arabic else 'N/A',
                    'phonetic': f'({part_of_speech})',
                    'difficulty_level': 'intermediate',
                    'category': current_unit,
                    'usage_example': example if example else f'Example with {word}.',
                    'audio_url': None
                })
            
            # Skip the next 3 lines we just processed
            i += 4
        else:
            i += 1
    
    # Insert final batch
    if vocabulary_batch and current_unit:
        print(f'\nInserting final batch of {len(vocabulary_batch)} words for {current_unit}...')
        try:
            result = supabase.table('vocabulary').insert(vocabulary_batch).execute()
            total_inserted += len(vocabulary_batch)
            print(f'✓ Inserted {len(vocabulary_batch)} words')
        except Exception as e:
            print(f'Error inserting final batch: {str(e)}')
    
    print(f'\n✅ Grade 10 Vocabulary Complete: {total_inserted} total words inserted')
    return total_inserted

def populate_grade12_vocabulary():
    """Populate Grade 12 vocabulary with numbered list format"""
    print('\n=== Populating Grade 12 Vocabulary ===')
    
    with open('/workspace/user_input_files/12 level.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = [l.strip() for l in content.split('\n')]
    
    current_unit = None
    vocabulary_batch = []
    total_inserted = 0
    
    for line in lines:
        # Detect unit headers: **vocab unit-X (Topic)**
        unit_match = re.match(r'\*\*vocab\s+unit-(\d+)', line, re.IGNORECASE)
        if unit_match:
            # Insert previous batch
            if vocabulary_batch and current_unit:
                print(f'Inserting {len(vocabulary_batch)} words for {current_unit}...')
                try:
                    result = supabase.table('vocabulary').insert(vocabulary_batch).execute()
                    total_inserted += len(vocabulary_batch)
                    print(f'✓ Inserted {len(vocabulary_batch)} words for {current_unit}')
                except Exception as e:
                    print(f'Error inserting {current_unit}: {str(e)}')
                vocabulary_batch = []
            
            unit_num = int(unit_match.group(1))
            current_unit = f'Grade 12 Unit {unit_num}'
            print(f'\nProcessing {current_unit}...')
            continue
        
        # Parse vocabulary entries
        # Format: number. word (part) - English definition - Arabic
        vocab_match = re.match(r'^(\d+)\.\s+([a-zA-Z\s\'-]+)\s*\(([^)]+)\)\s*-\s*(.+?)\s*-\s*(.+)$', line)
        
        if vocab_match and current_unit:
            number, word, part_of_speech, meaning, arabic = vocab_match.groups()
            
            vocabulary_batch.append({
                'word': clean_text(word),
                'arabic_translation': clean_text(arabic),
                'phonetic': f'({clean_text(part_of_speech)})',
                'difficulty_level': 'advanced',
                'category': current_unit,
                'usage_example': f'{clean_text(word)} is commonly used in {current_unit.lower()} contexts.',
                'audio_url': None
            })
    
    # Insert final batch
    if vocabulary_batch and current_unit:
        print(f'\nInserting final batch of {len(vocabulary_batch)} words for {current_unit}...')
        try:
            result = supabase.table('vocabulary').insert(vocabulary_batch).execute()
            total_inserted += len(vocabulary_batch)
            print(f'✓ Inserted {len(vocabulary_batch)} words')
        except Exception as e:
            print(f'Error inserting final batch: {str(e)}')
    
    print(f'\n✅ Grade 12 Vocabulary Complete: {total_inserted} total words inserted')
    return total_inserted

def populate_setbook_questions():
    """Populate setbook questions from all grade files"""
    print('\n=== Populating Setbook Questions ===')
    
    # Grade 10 Setbook Questions
    print('\nProcessing Grade 10 setbook questions...')
    with open('/workspace/user_input_files/Grade 10 level First Term .txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Look for PART 2: SETBOOK QUESTIONS section
    setbook_match = re.search(r'PART\s+2[:\s]+SETBOOK.*?(?=PART\s+\d+|$)', content, re.IGNORECASE | re.DOTALL)
    
    questions_inserted = 0
    if setbook_match:
        setbook_section = setbook_match.group(0)
        lines = [l.strip() for l in setbook_section.split('\n')]
        
        current_unit = None
        questions = []
        current_question = None
        
        for line in lines:
            # Detect unit
            unit_match = re.match(r'Unit\s+(\d+)', line, re.IGNORECASE)
            if unit_match:
                current_unit = int(unit_match.group(1))
                print(f'Found Unit {current_unit}')
                continue
            
            # Detect questions (Q1, Q2, 1., 2., etc.)
            question_match = re.match(r'^([Qq]\d+|Question\s+\d+|\d+[\.\)])\s*(.+)', line)
            
            if question_match and current_unit:
                # Save previous question
                if current_question:
                    questions.append(current_question)
                
                question_text = question_match.group(2).strip()
                current_question = {
                    'unit_number': current_unit,
                    'question_text': question_text,
                    'question_text_arabic': '',
                    'answer': '',
                    'answer_arabic': '',
                    'page_reference': None
                }
            elif current_question and line:
                # Accumulate text
                if line.lower().startswith('answer') or line.lower().startswith('a:'):
                    current_question['answer'] = line.replace('Answer:', '').replace('A:', '').strip()
                elif not current_question['answer']:
                    current_question['question_text'] += ' ' + line
                else:
                    current_question['answer'] += ' ' + line
        
        # Add last question
        if current_question:
            questions.append(current_question)
        
        # Insert questions
        if questions:
            print(f'Inserting {len(questions)} Grade 10 setbook questions...')
            try:
                result = supabase.table('setbook_questions').insert(questions).execute()
                questions_inserted += len(questions)
                print(f'✓ Inserted {len(questions)} questions')
            except Exception as e:
                print(f'Error inserting questions: {str(e)}')
    
    print(f'\n✅ Setbook Questions Complete: {questions_inserted} questions inserted')
    return questions_inserted

def main():
    print('='*60)
    print('KUWAIT ENGLISH HUB - COMPREHENSIVE DATA POPULATION')
    print('='*60)
    print(f'Supabase URL: {supabase_url}')
    
    try:
        # Check current database state
        print('\n--- Current Database State ---')
        vocab_count = supabase.table('vocabulary').select('id', count='exact').execute()
        print(f'Current vocabulary count: {vocab_count.count}')
        
        # Populate Grade 10
        grade10_vocab = populate_grade10_vocabulary()
        
        # Populate Grade 12
        grade12_vocab = populate_grade12_vocabulary()
        
        # Populate Setbook Questions
        setbook_count = populate_setbook_questions()
        
        # Final summary
        print('\n' + '='*60)
        print('POPULATION COMPLETE!')
        print('='*60)
        print(f'✅ Grade 10 Vocabulary: {grade10_vocab} words')
        print(f'✅ Grade 12 Vocabulary: {grade12_vocab} words')
        print(f'✅ Setbook Questions: {setbook_count} questions')
        print(f'\nTotal new items: {grade10_vocab + grade12_vocab + setbook_count}')
        
        # Check final state
        final_vocab = supabase.table('vocabulary').select('id', count='exact').execute()
        print(f'\nFinal vocabulary count: {final_vocab.count}')
        
    except Exception as e:
        print(f'\n❌ Fatal error: {str(e)}')
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
