#!/usr/bin/env python3
"""
Populate Kuwait vocabulary database from extracted PDF content
Organized by Class (10, 11, 12) and Units with vocabulary from uploaded PDFs
"""

import os
import json
from supabase import create_client, Client

# Supabase credentials
supabase_url = "https://hkljprwxvdoxorhcbvpo.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

def get_unit_id(class_number, unit_number):
    """Get unit ID from class and unit number"""
    try:
        # Get class ID first
        class_response = supabase.table('kuwait_classes').select('id').eq('class_number', class_number).execute()
        if not class_response.data:
            print(f"Class {class_number} not found")
            return None
        
        class_id = class_response.data[0]['id']
        
        # Get unit ID
        unit_response = supabase.table('kuwait_units').select('id').eq('class_id', class_id).eq('unit_number', unit_number).execute()
        if unit_response.data:
            return unit_response.data[0]['id']
        else:
            return None
    except Exception as e:
        print(f"Error getting unit ID: {e}")
        return None

def create_unit(class_number, unit_number):
    """Create a unit if it doesn't exist"""
    try:
        # Get class ID
        class_response = supabase.table('kuwait_classes').select('id').eq('class_number', class_number).execute()
        if not class_response.data:
            print(f"Class {class_number} not found")
            return None
        
        class_id = class_response.data[0]['id']
        
        # Check if unit exists
        existing = supabase.table('kuwait_units').select('id').eq('class_id', class_id).eq('unit_number', unit_number).execute()
        if existing.data:
            return existing.data[0]['id']
        
        # Create unit
        unit_data = {
            'class_id': class_id,
            'unit_number': unit_number,
            'unit_name_en': f'Unit {unit_number}',
            'unit_name_ar': f'الوحدة {unit_number}',
            'description_en': f'Unit {unit_number} vocabulary from PDF curriculum',
            'description_ar': f'مفردات الوحدة {unit_number} من منهج الملف',
            'theme': 'General',
            'difficulty_level': 1,
            'order_index': unit_number,
            'estimated_hours': 2,
            'is_published': True
        }
        
        result = supabase.table('kuwait_units').insert(unit_data).execute()
        if result.data:
            print(f"Created unit {unit_number} for class {class_number}")
            return result.data[0]['id']
        else:
            print(f"Failed to create unit {unit_number} for class {class_number}")
            return None
    except Exception as e:
        print(f"Error creating unit: {e}")
        return None

def insert_vocabulary_unit(vocabulary_entries, class_number, unit_number):
    """Insert vocabulary entries for a specific unit"""
    try:
        # Get or create unit
        unit_id = get_unit_id(class_number, unit_number)
        if not unit_id:
            unit_id = create_unit(class_number, unit_number)
            if not unit_id:
                print(f"Could not create/find unit {unit_number} for class {class_number}")
                return
        
        inserted_count = 0
        
        for entry in vocabulary_entries:
            try:
                # Clean Arabic translation - skip if it's garbled OCR text
                arabic_translation = entry.get('arabic_translation', '').strip()
                
                # Skip if Arabic translation is garbled OCR (contains non-Arabic characters)
                if arabic_translation and any(char in arabic_translation for char in ['CLL', '/', '．', '．', '！', '？', '、', '；']):
                    arabic_translation = None
                
                # Parse grammar category
                category = entry.get('grammar_category') or entry.get('part_of_speech', '')
                if category:
                    # Extract just the category type (remove punctuation)
                    if '(' in category and ')' in category:
                        category = category.split('(')[1].split(')')[0]
                    elif '.' in category:
                        category = category.replace('.', '')
                
                # Determine difficulty level based on class
                difficulty = class_number - 9  # Class 10 = level 1, Class 11 = level 2, Class 12 = level 3
                
                vocab_data = {
                    'unit_id': unit_id,
                    'word': entry.get('english_word', '').strip(),
                    'arabic_translation': arabic_translation,
                    'phonetic': entry.get('phonetic_pronunciation') or entry.get('pronunciation'),
                    'difficulty_level': difficulty,
                    'category': category,
                    'subcategory': None,
                    'usage_example_en': entry.get('usage_example_en') or entry.get('english_example'),
                    'usage_example_ar': entry.get('usage_example_ar') or entry.get('arabic_example'),
                    'audio_url': None,
                    'image_url': None,
                    'grammar_info': None,
                    'synonyms': None,
                    'antonyms': None,
                    'related_words': None,
                    'is_core_vocabulary': True,
                    'practice_count': 0,
                    'mastery_score': 0.00
                }
                
                # Skip if word is empty
                if not vocab_data['word']:
                    continue
                
                result = supabase.table('kuwait_vocabulary').insert(vocab_data).execute()
                if result.data:
                    inserted_count += 1
                    
            except Exception as e:
                print(f"Error inserting vocabulary '{entry.get('english_word', 'Unknown')}': {e}")
                continue
        
        print(f"Inserted {inserted_count} vocabulary entries for Class {class_number}, Unit {unit_number}")
        return inserted_count
        
    except Exception as e:
        print(f"Error inserting vocabulary for unit {unit_number}: {e}")
        return 0

def main():
    """Main function to populate Kuwait vocabulary database"""
    print("Starting Kuwait vocabulary population from PDF content...")
    
    # Class 12, Unit 12 vocabulary from PDFs
    class_12_unit_12 = [
        {"english_word": "aviation", "arabic_translation": "طيران", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "coincide with", "arabic_translation": "يتزامن مع", "grammar_category": "v.", "class_level": 12, "unit": 12},
        {"english_word": "exemplary", "arabic_translation": "مثالي", "grammar_category": "adj.", "class_level": 12, "unit": 12},
        {"english_word": "gliding", "arabic_translation": "انزلاق", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "instructor", "arabic_translation": "مدرب", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "intensely", "arabic_translation": "بشدة", "grammar_category": "adv.", "class_level": 12, "unit": 12},
        {"english_word": "notably", "arabic_translation": "لاحظ", "grammar_category": "adv.", "class_level": 12, "unit": 12},
        {"english_word": "acclaimed", "arabic_translation": "مشهور", "grammar_category": "adj.", "class_level": 12, "unit": 12},
        {"english_word": "attendant", "arabic_translation": "مرافق", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "cabin", "arabic_translation": "كابينة", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "confrontational", "arabic_translation": "متصادم", "grammar_category": "adj.", "class_level": 12, "unit": 12},
        {"english_word": "corporation", "arabic_translation": "شركة", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "courteously", "arabic_translation": "بأدب", "grammar_category": "adv.", "class_level": 12, "unit": 12},
        {"english_word": "expression", "arabic_translation": "تعبير", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "mumble", "arabic_translation": "تمتم", "grammar_category": "v.", "class_level": 12, "unit": 12},
        {"english_word": "resemble", "arabic_translation": "يشبه", "grammar_category": "v.", "class_level": 12, "unit": 12},
        {"english_word": "stern", "arabic_translation": "صارم", "grammar_category": "adj.", "class_level": 12, "unit": 12},
        {"english_word": "stunned", "arabic_translation": "مصعوق", "grammar_category": "adj.", "class_level": 12, "unit": 12},
        {"english_word": "altitude", "arabic_translation": "ارتفاع", "grammar_category": "n.", "class_level": 12, "unit": 12},
        {"english_word": "aviate", "arabic_translation": "يطير", "grammar_category": "v.", "class_level": 12, "unit": 12}
    ]
    
    # Class 11 vocabulary from PDFs
    class_11_units = {
        7: [
            {"english_word": "broadcast", "arabic_translation": "إذاعة", "grammar_category": "n."},
            {"english_word": "collectively", "arabic_translation": "collectively", "grammar_category": "adv."},
            {"english_word": "digital", "arabic_translation": "رقمي", "grammar_category": "adj."},
            {"english_word": "dispatch", "arabic_translation": "إرسال", "grammar_category": "v."},
            {"english_word": "entertainment", "arabic_translation": "ترفيه", "grammar_category": "n."},
            {"english_word": "evolve", "arabic_translation": "يتطور", "grammar_category": "v."},
            {"english_word": "film industry", "arabic_translation": "صناعة الأفلام", "grammar_category": "n."},
            {"english_word": "invention", "arabic_translation": "اختراع", "grammar_category": "n."},
            {"english_word": "set", "arabic_translation": "مجموعة", "grammar_category": "n."},
            {"english_word": "station", "arabic_translation": "محطة", "grammar_category": "n."}
        ],
        8: [
            {"english_word": "age-appropriate", "arabic_translation": "مناسب للعمر", "grammar_category": "adj."},
            {"english_word": "channel-surf", "arabic_translation": "تصفح القنوات", "grammar_category": "v."},
            {"english_word": "comedy", "arabic_translation": "كوميديا", "grammar_category": "n."},
            {"english_word": "inactivity", "arabic_translation": "عدم النشاط", "grammar_category": "n."},
            {"english_word": "mentally", "arabic_translation": "عقلياً", "grammar_category": "adv."},
            {"english_word": "miss out on", "arabic_translation": "يفوت", "grammar_category": "ph.v"},
            {"english_word": "promote", "arabic_translation": "يعزز", "grammar_category": "v."},
            {"english_word": "provoke", "arabic_translation": "يثير", "grammar_category": "v."},
            {"english_word": "tune out", "arabic_translation": "يغلق", "grammar_category": "v."}
        ],
        9: [
            {"english_word": "capability", "arabic_translation": "قدرة", "grammar_category": "n."},
            {"english_word": "high-end", "arabic_translation": "عالي الجودة", "grammar_category": "adj."},
            {"english_word": "hydraulic", "arabic_translation": "هيدروليكي", "grammar_category": "n."},
            {"english_word": "motion picture", "arabic_translation": "فيلم", "grammar_category": "n."},
            {"english_word": "nowadays", "arabic_translation": "هذه الأيام", "grammar_category": "adv."},
            {"english_word": "pedestal", "arabic_translation": "قاعدة", "grammar_category": "n."},
            {"english_word": "period drama", "arabic_translation": "دراما تاريخية", "grammar_category": "n."},
            {"english_word": "stabilizing", "arabic_translation": "مثبت", "grammar_category": "adj."},
            {"english_word": "amicably", "arabic_translation": "بود", "grammar_category": "adv."},
            {"english_word": "audience", "arabic_translation": "جمهور", "grammar_category": "n."}
        ]
    }
    
    # Class 10 vocabulary from PDFs  
    class_10_units = {
        7: [
            {"english_word": "crude oil", "arabic_translation": "النفط الخام", "grammar_category": "n."},
            {"english_word": "entirely", "arabic_translation": "بالكامل", "grammar_category": "adv."},
            {"english_word": "finite", "arabic_translation": "محدود", "grammar_category": "adj."},
            {"english_word": "fossil fuel", "arabic_translation": "وقود أحفوري", "grammar_category": "n."},
            {"english_word": "fractional distillation", "arabic_translation": "التقطير التجزيئي", "grammar_category": "n."},
            {"english_word": "polymer", "arabic_translation": "بوليمر", "grammar_category": "n."},
            {"english_word": "refining", "arabic_translation": "تكرير", "grammar_category": "n."},
            {"english_word": "actually", "arabic_translation": "في الواقع", "grammar_category": "adv."},
            {"english_word": "appliance", "arabic_translation": "جهاز", "grammar_category": "n."},
            {"english_word": "breakdown", "arabic_translation": "انهيار", "grammar_category": "n."}
        ],
        8: [
            {"english_word": "contact lens", "arabic_translation": "عدسة لاصقة", "grammar_category": "n."},
            {"english_word": "cure-all", "arabic_translation": "علاج شامل", "grammar_category": "n."},
            {"english_word": "currently", "arabic_translation": "حالياً", "grammar_category": "adv."},
            {"english_word": "gold-coated", "arabic_translation": "مطلي بالذهب", "grammar_category": "adj."},
            {"english_word": "innovate", "arabic_translation": "يبتكر", "grammar_category": "v."},
            {"english_word": "instantly", "arabic_translation": "فوراً", "grammar_category": "adv."},
            {"english_word": "latest", "arabic_translation": "أحدث", "grammar_category": "adj."},
            {"english_word": "micro-robot", "arabic_translation": "ميكرو روبوت", "grammar_category": "n."},
            {"english_word": "sophisticated", "arabic_translation": "متطور", "grammar_category": "adj."},
            {"english_word": "frequent", "arabic_translation": "متكرر", "grammar_category": "adj."}
        ],
        9: [
            {"english_word": "auction", "arabic_translation": "مزاد", "grammar_category": "n."},
            {"english_word": "complimentary", "arabic_translation": "مجاني", "grammar_category": "adj."},
            {"english_word": "login", "arabic_translation": "تسجيل دخول", "grammar_category": "n."},
            {"english_word": "shipping", "arabic_translation": "شحن", "grammar_category": "n."},
            {"english_word": "tax", "arabic_translation": "ضريبة", "grammar_category": "n."},
            {"english_word": "affluent", "arabic_translation": "غني", "grammar_category": "adj."},
            {"english_word": "evil", "arabic_translation": "شرير", "grammar_category": "adj."},
            {"english_word": "extinct", "arabic_translation": "منقرض", "grammar_category": "adj."},
            {"english_word": "generosity", "arabic_translation": "كرم", "grammar_category": "n."},
            {"english_word": "profit", "arabic_translation": "ربح", "grammar_category": "n."}
        ]
    }
    
    total_inserted = 0
    
    # Insert Class 12, Unit 12
    print("\n=== Inserting Class 12, Unit 12 ===")
    total_inserted += insert_vocabulary_unit(class_12_unit_12, 12, 12)
    
    # Insert Class 11 units
    print("\n=== Inserting Class 11 Units ===")
    for unit_num, vocab_list in class_11_units.items():
        print(f"\n--- Class 11, Unit {unit_num} ---")
        total_inserted += insert_vocabulary_unit(vocab_list, 11, unit_num)
    
    # Insert Class 10 units
    print("\n=== Inserting Class 10 Units ===")
    for unit_num, vocab_list in class_10_units.items():
        print(f"\n--- Class 10, Unit {unit_num} ---")
        total_inserted += insert_vocabulary_unit(vocab_list, 10, unit_num)
    
    print(f"\n=== POPULATION COMPLETE ===")
    print(f"Total vocabulary entries inserted: {total_inserted}")
    print(f"Kuwait Secondary School vocabulary database populated successfully!")
    
    # Verify data
    print("\n=== Verification ===")
    try:
        # Count total vocabulary
        vocab_count = supabase.table('kuwait_vocabulary').select('id', count='exact').execute()
        print(f"Total vocabulary entries in database: {vocab_count.count}")
        
        # Count units
        units_count = supabase.table('kuwait_units').select('id', count='exact').execute()
        print(f"Total units in database: {units_count.count}")
        
        # Count classes
        classes_count = supabase.table('kuwait_classes').select('id', count='exact').execute()
        print(f"Total classes in database: {classes_count.count}")
        
    except Exception as e:
        print(f"Error during verification: {e}")

if __name__ == "__main__":
    main()
