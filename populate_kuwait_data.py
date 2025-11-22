#!/usr/bin/env python3
"""
Kuwait Secondary School Data Population Script
Populates the database with comprehensive curriculum data for Classes 10-12
"""

import requests
import json
from datetime import datetime

# Supabase Configuration
SUPABASE_URL = "https://hkljprwxvdoxorhcbvpo.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"

headers = {
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
}

def insert_data(table_name: str, data: list) -> bool:
    """Insert data into Supabase table"""
    try:
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/{table_name}",
            headers=headers,
            json=data
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ Successfully inserted {len(data)} records into {table_name}")
            return True
        else:
            print(f"❌ Failed to insert into {table_name}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error inserting into {table_name}: {str(e)}")
        return False

def populate_kuwait_data():
    """Populate Kuwait Secondary School data"""
    
    print("🚀 Starting Kuwait Secondary School Data Population...")
    print("="*60)
    
    # Kuwait Classes Data
    classes_data = [
        {
            "class_number": 10,
            "class_name_en": "Class 10",
            "class_name_ar": "الصف العاشر", 
            "description": "Foundation level for Kuwait secondary education - Introduction to English fundamentals",
            "academic_year": "2024-2025",
            "is_active": True
        },
        {
            "class_number": 11,
            "class_name_en": "Class 11", 
            "class_name_ar": "الصف الحادي عشر",
            "description": "Intermediate level with advanced topics and structured grammar",
            "academic_year": "2024-2025",
            "is_active": True
        },
        {
            "class_number": 12,
            "class_name_en": "Class 12",
            "class_name_ar": "الصف الثاني عشر", 
            "description": "Advanced level preparing for university entrance and IELTS preparation",
            "academic_year": "2024-2025",
            "is_active": True
        }
    ]
    
    # Kuwait Units Data
    units_data = [
        # Class 10 Units
        {
            "class_id": 1, "unit_number": 1, "unit_name_en": "Personal Introduction", 
            "unit_name_ar": "التعريف بالنفس", "description_en": "Learn to introduce yourself and talk about personal information",
            "description_ar": "تعلم كيفية التعريف بالنفس والتحدث عن المعلومات الشخصية",
            "theme": "personal", "difficulty_level": 1, "order_index": 1, "is_published": True
        },
        {
            "class_id": 1, "unit_number": 2, "unit_name_en": "Daily Routines", 
            "unit_name_ar": "الروتين اليومي", "description_en": "Describe your daily activities and habits",
            "description_ar": "وصف الأنشطة اليومية والعادات", "theme": "daily_life", "difficulty_level": 1, "order_index": 2, "is_published": True
        },
        {
            "class_id": 1, "unit_number": 3, "unit_name_en": "Family and Friends", 
            "unit_name_ar": "الأسرة والأصدقاء", "description_en": "Talk about family members and relationships",
            "description_ar": "التحدث عن أفراد الأسرة والعلاقات", "theme": "relationships", "difficulty_level": 1, "order_index": 3, "is_published": True
        },
        {
            "class_id": 1, "unit_number": 4, "unit_name_en": "Food and Cooking", 
            "unit_name_ar": "الطعام والطبخ", "description_en": "Discuss different foods and cooking methods",
            "description_ar": "مناقشة الأطعمة المختلفة وطرق الطبخ", "theme": "food", "difficulty_level": 2, "order_index": 4, "is_published": True
        },
        {
            "class_id": 1, "unit_number": 5, "unit_name_en": "Travel and Tourism", 
            "unit_name_ar": "السفر والسياحة", "description_en": "Plan trips and describe travel experiences",
            "description_ar": "تخطيط الرحلات ووصف تجارب السفر", "theme": "travel", "difficulty_level": 2, "order_index": 5, "is_published": True
        },
        
        # Class 11 Units
        {
            "class_id": 2, "unit_number": 1, "unit_name_en": "Advanced Grammar: Conditionals", 
            "unit_name_ar": "قواعد متقدمة: الشروط", "description_en": "Master all types of conditional sentences",
            "description_ar": "إتقان جميع أنواع الجمل الشرطية", "theme": "grammar", "difficulty_level": 3, "order_index": 1, "is_published": True
        },
        {
            "class_id": 2, "unit_number": 2, "unit_name_en": "Professional Communication", 
            "unit_name_ar": "التواصل المهني", "description_en": "Business English and formal communication skills",
            "description_ar": "الإنجليزية التجارية ومهارات التواصل الرسمي", "theme": "business", "difficulty_level": 3, "order_index": 2, "is_published": True
        },
        {
            "class_id": 2, "unit_number": 3, "unit_name_en": "Technology and Innovation", 
            "unit_name_ar": "التكنولوجيا والابتكار", "description_en": "Discuss modern technology and its impact",
            "description_ar": "مناقشة التكنولوجيا الحديثة وتأثيرها", "theme": "technology", "difficulty_level": 3, "order_index": 3, "is_published": True
        },
        {
            "class_id": 2, "unit_number": 4, "unit_name_en": "Environmental Issues", 
            "unit_name_ar": "القضايا البيئية", "description_en": "Environmental awareness and sustainability",
            "description_ar": "الوعي البيئي والاستدامة", "theme": "environment", "difficulty_level": 3, "order_index": 4, "is_published": True
        },
        {
            "class_id": 2, "unit_number": 5, "unit_name_en": "Academic Writing", 
            "unit_name_ar": "الكتابة الأكاديمية", "description_en": "Essay writing and academic communication",
            "description_ar": "كتابة المقالات والتواصل الأكاديمي", "theme": "academic", "difficulty_level": 4, "order_index": 5, "is_published": True
        },
        
        # Class 12 Units
        {
            "class_id": 3, "unit_number": 1, "unit_name_en": "Advanced Literature", 
            "unit_name_ar": "الأدب المتقدم", "description_en": "Literary analysis and critical thinking",
            "description_ar": "تحليل الأدب والتفكير النقدي", "theme": "literature", "difficulty_level": 5, "order_index": 1, "is_published": True
        },
        {
            "class_id": 3, "unit_number": 2, "unit_name_en": "IELTS Preparation", 
            "unit_name_ar": "إعداد امتحان الآيلتس", "description_en": "Comprehensive IELTS exam preparation",
            "description_ar": "إعداد شامل لامتحان الآيلتس", "theme": "exam_prep", "difficulty_level": 5, "order_index": 2, "is_published": True
        },
        {
            "class_id": 3, "unit_number": 3, "unit_name_en": "Research and Presentation", 
            "unit_name_ar": "البحث والعرض", "description_en": "Research skills and presentation techniques",
            "description_ar": "مهارات البحث وتقنيات العرض", "theme": "research", "difficulty_level": 5, "order_index": 3, "is_published": True
        },
        {
            "class_id": 3, "unit_number": 4, "unit_name_en": "Global Issues", 
            "unit_name_ar": "القضايا العالمية", "description_en": "International affairs and global perspectives",
            "description_ar": "الشؤون الدولية والوجهات النظر العالمية", "theme": "global", "difficulty_level": 5, "order_index": 4, "is_published": True
        },
        {
            "class_id": 3, "unit_number": 5, "unit_name_en": "Career Preparation", 
            "unit_name_ar": "التحضير المهني", "description_en": "Professional development and career planning",
            "description_ar": "التطوير المهني وتخطيط المسار الوظيفي", "theme": "career", "difficulty_level": 5, "order_index": 5, "is_published": True
        }
    ]
    
    # Curriculum Configuration Data
    curriculum_data = [
        {
            "class_id": 1, "academic_year": "2024-2025", "curriculum_version": "1.0",
            "total_units": 8, "vocabulary_per_unit": 25, "grammar_topics_per_unit": 2,
            "assessment_frequency": "bi-weekly", "is_active": True
        },
        {
            "class_id": 2, "academic_year": "2024-2025", "curriculum_version": "1.0", 
            "total_units": 10, "vocabulary_per_unit": 30, "grammar_topics_per_unit": 3,
            "assessment_frequency": "weekly", "is_active": True
        },
        {
            "class_id": 3, "academic_year": "2024-2025", "curriculum_version": "1.0",
            "total_units": 12, "vocabulary_per_unit": 35, "grammar_topics_per_unit": 4,
            "assessment_frequency": "weekly", "is_active": True
        }
    ]
    
    # Sample Kuwait Vocabulary Data (linked to units)
    vocabulary_data = [
        # Class 10 - Unit 1: Personal Introduction
        {
            "unit_id": 1, "word": "introduce", "arabic_translation": "يقدم", 
            "phonetic": "/ɪntrə'djuːs/", "difficulty_level": 1, "category": "verbs",
            "usage_example_en": "Let me introduce you to my friend.", 
            "usage_example_ar": "دعني أقدمك إلى صديقي."
        },
        {
            "unit_id": 1, "word": "myself", "arabic_translation": "نفسي",
            "phonetic": "/maɪ'self/", "difficulty_level": 1, "category": "pronouns", 
            "usage_example_en": "I did the work myself.", 
            "usage_example_ar": "لقد قمت بالعمل بنفسي."
        },
        {
            "unit_id": 1, "word": "occupation", "arabic_translation": "المهنة",
            "phonetic": "/ˌɒkju'peɪʃn/", "difficulty_level": 2, "category": "nouns",
            "usage_example_en": "What is your occupation?", 
            "usage_example_ar": "ما هي مهنتك؟"
        },
        
        # Class 10 - Unit 2: Daily Routines
        {
            "unit_id": 2, "word": "routine", "arabic_translation": "الروتين",
            "phonetic": "/ruː'tiːn/", "difficulty_level": 2, "category": "nouns",
            "usage_example_en": "I have a strict daily routine.", 
            "usage_example_ar": "لدي روتين يومي صارم."
        },
        {
            "unit_id": 2, "word": "schedule", "arabic_translation": "الجدول",
            "phonetic": "/'ʃedjuːl/", "difficulty_level": 2, "category": "nouns",
            "usage_example_en": "My schedule is very busy.", 
            "usage_example_ar": "جدولي مشغول جداً."
        },
        
        # Class 11 - Unit 1: Advanced Grammar
        {
            "unit_id": 6, "word": "conditional", "arabic_translation": "شرطي",
            "phonetic": "/kən'dɪʃənl/", "difficulty_level": 3, "category": "grammar",
            "usage_example_en": "This is a conditional sentence.", 
            "usage_example_ar": "هذه جملة شرطية."
        },
        {
            "unit_id": 6, "word": "hypothetically", "arabic_translation": "نظرياً",
            "phonetic": "/ˌhaɪpə'θetɪkli/", "difficulty_level": 4, "category": "adverbs",
            "usage_example_en": "Hypothetically speaking, what would happen?", 
            "usage_example_ar": "من الناحية النظرية، ماذا سيحدث؟"
        },
        
        # Class 12 - Unit 2: IELTS Preparation
        {
            "unit_id": 12, "word": "comprehensive", "arabic_translation": "شامل",
            "phonetic": "/ˌkɒmprɪ'hensɪv/", "difficulty_level": 4, "category": "adjectives",
            "usage_example_en": "We need a comprehensive plan.", 
            "usage_example_ar": "نحتاج خطة شاملة."
        },
        {
            "unit_id": 12, "word": "procedure", "arabic_translation": "الإجراء",
            "phonetic": "/prə'siːdʒər/", "difficulty_level": 3, "category": "nouns",
            "usage_example_en": "Follow the correct procedure.", 
            "usage_example_ar": "اتبع الإجراء الصحيح."
        }
    ]
    
    # Sample Grammar Content Data
    grammar_content_data = [
        {
            "title": "Present Simple Tense",
            "content_text": "The present simple tense is used to describe habits, permanent situations, and general truths. Formation: Subject + Verb (base form/s)",
            "source_page": 45,
            "source_file": "Free-English-Grammar.pdf", "grammar_category": "tenses",
            "difficulty_level": 1, "review_status": "approved"
        },
        {
            "title": "Conditional Sentences Type 1", 
            "content_text": "Type 1 conditional sentences describe real or possible situations. Structure: If + Present Simple, Will + Base Verb",
            "source_page": 234, "source_file": "Free-English-Grammar.pdf", "grammar_category": "conditionals",
            "difficulty_level": 3, "review_status": "approved"
        },
        {
            "title": "Passive Voice",
            "content_text": "Passive voice is used when the action is more important than who performs it. Structure: Subject + be + Past Participle",
            "source_page": 187, "source_file": "Free-English-Grammar.pdf", "grammar_category": "voice",
            "difficulty_level": 3, "review_status": "approved"
        }
    ]
    
    # Sample Grammar Questions Data
    grammar_questions_data = [
        {
            "grammar_content_id": 1, "unit_id": 2,
            "question_text": "She ___ to school every day.", 
            "question_type": "fill_blank", "correct_answer": "goes",
            "difficulty_level": 1, "explanation_en": "Use present simple for habits.",
            "explanation_ar": "استخدم الماضي البسيط للعادات."
        },
        {
            "grammar_content_id": 2, "unit_id": 6,
            "question_text": "If it ___ tomorrow, we will cancel the picnic.",
            "question_type": "fill_blank", "correct_answer": "rains",
            "difficulty_level": 3, "explanation_en": "Type 1 conditionals use present simple in the if clause.",
            "explanation_ar": "الجمل الشرطية النوع الأول تستخدم الماضي البسيط في جملة الشرط."
        },
        {
            "grammar_content_id": 1, "unit_id": 1,
            "question_text": "Choose the correct form: I _____ coffee every morning.",
            "question_type": "multiple_choice", "correct_answer": "drink",
            "options": ["drink", "drinks", "drinking", "drank"],
            "difficulty_level": 1, "explanation_en": "Present simple with 'I' uses base form.",
            "explanation_ar": "الماضي البسيط مع 'I' يستخدم الشكل الأساسي."
        }
    ]
    
    # Insert data into database
    results = []
    
    # Insert Kuwait Classes
    print("\n📚 Inserting Kuwait Classes...")
    success = insert_data("kuwait_classes", classes_data)
    results.append((" Kuwait Classes", success))
    
    # Insert Kuwait Units
    print("\n📖 Inserting Kuwait Units...")
    success = insert_data("kuwait_units", units_data)
    results.append(("Kuwait Units", success))
    
    # Insert Curriculum Config
    print("\n⚙️ Inserting Curriculum Configuration...")
    success = insert_data("curriculum_config", curriculum_data)
    results.append(("Curriculum Config", success))
    
    # Insert Sample Vocabulary
    print("\n📝 Inserting Sample Kuwait Vocabulary...")
    success = insert_data("kuwait_vocabulary", vocabulary_data)
    results.append(("Sample Vocabulary", success))
    
    # Insert Grammar Content
    print("\n📕 Inserting Grammar Content...")
    success = insert_data("grammar_content", grammar_content_data)
    results.append(("Grammar Content", success))
    
    # Insert Grammar Questions
    print("\n❓ Inserting Grammar Questions...")
    success = insert_data("grammar_questions", grammar_questions_data)
    results.append(("Grammar Questions", success))
    
    # Summary
    print("\n" + "="*60)
    print("📊 KUWAIT DATA POPULATION SUMMARY")
    print("="*60)
    
    successful = sum(1 for _, success in results if success)
    failed = len(results) - successful
    
    for table_name, success in results:
        status = "✅ SUCCESS" if success else "❌ FAILED"
        print(f"{table_name:20} → {status}")
    
    print(f"\nTotal: {len(results)} tables")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    
    if successful == len(results):
        print("\n🎉 Kuwait Secondary School Data Population Completed Successfully!")
        print("\nNext Steps:")
        print("1. Run the RLS policies script")
        print("2. Test the database schema with sample queries")
        print("3. Build the UI components for class/unit navigation")
        print("4. Integrate vocabulary practice system")
    else:
        print(f"\n⚠️ {failed} tables failed to populate. Check errors above.")
    
    return successful == len(results)

if __name__ == "__main__":
    populate_kuwait_data()