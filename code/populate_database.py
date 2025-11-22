#!/usr/bin/env python3
"""
Kuwait English Learning Platform - Database Population Script
Populates Supabase database with extracted vocabulary data from PDFs
"""

import os
import json
from supabase import create_client, Client

# Supabase configuration
SUPABASE_URL = "https://wjdzoqlxudswcovbuptd.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0MDksImV4cCI6MjA3NzU5ODQwOX0.AcOvzDba-IGxV_TNN1KE6FNSNxC4AJH2wOfAguG0yQc"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def extract_vocabulary_data():
    """Extract vocabulary data from the organized markdown file"""
    vocabulary_data = []
    
    # Grade 10 vocabulary data (Units 1-12)
    grade_10_data = {
        "1": [
            {"word": "absorb", "arabic": "يَمتص", "type": "v."},
            {"word": "antioxidant", "arabic": "مضاد الأكسدة", "type": "n."},
            {"word": "saturated fat", "arabic": "دهون مشبعة", "type": "n."},
            {"word": "appeal to", "arabic": "يجذب", "type": "v."},
            {"word": "grilled", "arabic": "مشوي", "type": "adj."},
            {"word": "arthritis", "arabic": "التهاب المفاصل", "type": "n."},
            {"word": "iron", "arabic": "حديد", "type": "n."},
            {"word": "caffeine", "arabic": "كافيين", "type": "n."},
            {"word": "malnutrition", "arabic": "سوء التغذية", "type": "n."},
            {"word": "calcium", "arabic": "كالسيوم", "type": "n."},
            {"word": "metabolise", "arabic": "يحول غذائياً", "type": "V."},
            {"word": "carbohydrate", "arabic": "كربوهيدرات", "type": "n."},
            {"word": "cholesterol", "arabic": "كوليسترول", "type": "n."},
            {"word": "combat", "arabic": "يحارب", "type": "v."},
            {"word": "nutrition", "arabic": "تغذية", "type": "n."},
            {"word": "wholesome", "arabic": "صحي", "type": "adj."},
            {"word": "vegetarian", "arabic": "نباتي", "type": "adj."},
            {"word": "organic", "arabic": "عضوي", "type": "adj."},
            {"word": "vitamin", "arabic": "فيتامين", "type": "n."},
            {"word": "pomegranate", "arabic": "رمان", "type": "n."},
            {"word": "probiotic", "arabic": "بريبيوتيك", "type": "adj."},
            {"word": "protein", "arabic": "بروتين", "type": "n."},
            {"word": "RDA", "arabic": "الكمية اليومية الموصى بها", "type": "abbr."}
        ],
        "7": [
            {"word": "crude oil", "arabic": "البترول الخام", "type": "n"},
            {"word": "entirely", "arabic": "تماماً", "type": "adv"},
            {"word": "finite", "arabic": "محدود", "type": "adj"},
            {"word": "fossil fuel", "arabic": "الوقود الأحفوري", "type": "n"},
            {"word": "fractional distillation", "arabic": "التقطير التجزيئي", "type": "n"},
            {"word": "polymer", "arabic": "بوليمر", "type": "n"},
            {"word": "refining", "arabic": "التكرير", "type": "n"},
            {"word": "actually", "arabic": "في الواقع", "type": "adv"},
            {"word": "appliance", "arabic": "جهاز منزلي", "type": "n"},
            {"word": "breakdown", "arabic": "انهيار", "type": "n"},
            {"word": "generate", "arabic": "يُنتج", "type": "v"},
            {"word": "last", "arabic": "يدوم", "type": "v"},
            {"word": "motoring", "arabic": "قيادة السيارات", "type": "n"},
            {"word": "strong", "arabic": "قوي", "type": "adj."},
            {"word": "asthma", "arabic": "الربو", "type": "n"},
            {"word": "congestion", "arabic": "ازدحام", "type": "n"},
            {"word": "consult", "arabic": "يستشير", "type": "v"},
            {"word": "diminish", "arabic": "يقل", "type": "v"},
            {"word": "end up with", "arabic": "ينتهي بـ", "type": "ph.v"},
            {"word": "government", "arabic": "الحكومة", "type": "n"},
            {"word": "hazardous", "arabic": "خطر", "type": "adj"},
            {"word": "irreversible", "arabic": "غير قابل للعكس", "type": "adj"},
            {"word": "motorist", "arabic": "سائق سيارة", "type": "n"},
            {"word": "procure", "arabic": "يحصل على", "type": "v"},
            {"word": "recently", "arabic": "مؤخراً", "type": "adv"},
            {"word": "self-employed", "arabic": "يعمل لحسابه", "type": "adj"},
            {"word": "smog", "arabic": "دخان مخاليط", "type": "n"},
            {"word": "squander", "arabic": "يُبدد", "type": "v"},
            {"word": "waste", "arabic": "إهدار", "type": "n"}
        ],
        "8": [
            {"word": "contact lens", "arabic": "عدسات لاصقة", "type": "n"},
            {"word": "cure-all", "arabic": "علاج لكل الأمراض", "type": "n"},
            {"word": "currently", "arabic": "حالياً", "type": "adv"},
            {"word": "draw", "arabic": "يرسم", "type": "v"},
            {"word": "gold-coated", "arabic": "مطلية بالذهب", "type": "adj"},
            {"word": "innovate", "arabic": "يُبتكر", "type": "v"},
            {"word": "instantly", "arabic": "فوراً", "type": "adv"},
            {"word": "latest", "arabic": "أحدث", "type": "adj"},
            {"word": "micro-robot", "arabic": "روبوت صغير", "type": "n"},
            {"word": "nanoshell", "arabic": "قشرة النانو", "type": "n"},
            {"word": "satnav", "arabic": "جهاز الملاحة", "type": "n"},
            {"word": "shock", "arabic": "صدمة", "type": "n"},
            {"word": "sophisticated", "arabic": "متطور", "type": "adj"},
            {"word": "tumour", "arabic": "ورم", "type": "n"},
            {"word": "bifocal", "arabic": "ثنائي البؤر", "type": "adj"},
            {"word": "frequent", "arabic": "متكرر", "type": "adj"},
            {"word": "instigate", "arabic": "يُثير", "type": "v"},
            {"word": "legible", "arabic": "واضح", "type": "adj"},
            {"word": "obedient", "arabic": "مطيع", "type": "adj"},
            {"word": "patient", "arabic": "صبور", "type": "adj"},
            {"word": "reputation", "arabic": "سمعة", "type": "n"},
            {"word": "software", "arabic": "برمجيات", "type": "n"},
            {"word": "spot", "arabic": "مكان", "type": "n"},
            {"word": "anniversary", "arabic": "عيد السنوية", "type": "n"},
            {"word": "heart rate", "arabic": "معدل ضربات القلب", "type": "n"},
            {"word": "recharge", "arabic": "يعيد شحن", "type": "v"},
            {"word": "remind", "arabic": "يذكر", "type": "v"},
            {"word": "terminal", "arabic": "جهاز طرفي", "type": "n"},
            {"word": "torso", "arabic": "جذع الجسم", "type": "n"},
            {"word": "transmit", "arabic": "ينقل", "type": "v"},
            {"word": "trespass", "arabic": "يتعدى", "type": "v"},
            {"word": "wearer", "arabic": "حامل", "type": "n"}
        ]
    }
    
    # Grade 11 vocabulary data (Units 7-12)
    grade_11_data = {
        "7": [
            {"word": "broadcast", "arabic": "إذاعة/ بث", "type": "n"},
            {"word": "collectively", "arabic": "مجتمعين", "type": "adv"},
            {"word": "digital", "arabic": "رقمي", "type": "adj"},
            {"word": "dispatch", "arabic": "يرسل", "type": "v"},
            {"word": "entertainment", "arabic": "ترفيه", "type": "n"},
            {"word": "evolve", "arabic": "يتطور", "type": "v"},
            {"word": "film industry", "arabic": "صناعة الأفلام", "type": "n"},
            {"word": "invention", "arabic": "اختراع", "type": "n"},
            {"word": "set", "arabic": "مجموعة", "type": "n"},
            {"word": "station", "arabic": "محطة", "type": "n"},
            {"word": "transistor", "arabic": "ترانزستور", "type": "n"},
            {"word": "video recorder", "arabic": "جهاز التسجيل", "type": "n"},
            {"word": "adversely", "arabic": "سلبياً", "type": "adv"},
            {"word": "dedication", "arabic": "تفانٍ", "type": "n"},
            {"word": "deterrent", "arabic": "ردع", "type": "n"},
            {"word": "glorify", "arabic": "يمدح", "type": "v"},
            {"word": "innumerable", "arabic": "عدد لا يحصى", "type": "adj"},
            {"word": "remote", "arabic": "بعيد", "type": "adj"},
            {"word": "bring about", "arabic": "يحدث", "type": "phr."},
            {"word": "demonstrate", "arabic": "يُظهر", "type": "v"},
            {"word": "disappointing", "arabic": "محبط", "type": "adj"},
            {"word": "half", "arabic": "شوط", "type": "n"},
            {"word": "potential", "arabic": "طاقة", "type": "n"},
            {"word": "prominent", "arabic": "مميز", "type": "adj"},
            {"word": "resident", "arabic": "ساكن", "type": "n"},
            {"word": "reveal", "arabic": "يكشف", "type": "v"},
            {"word": "telecommunication", "arabic": "اتصالات", "type": "n"},
            {"word": "teleprinter", "arabic": "آلة الطباعة التلكس", "type": "n"},
            {"word": "tension", "arabic": "توتر", "type": "n"},
            {"word": "transatlantic", "arabic": "عبر المحيط الأطلسي", "type": "adj"},
            {"word": "victory", "arabic": "فوز", "type": "n"},
            {"word": "zealous", "arabic": "طموح", "type": "adj"},
            {"word": "consume", "arabic": "يستخدم", "type": "v"},
            {"word": "electronic device", "arabic": "جهاز إلكتروني", "type": "n"},
            {"word": "electronics", "arabic": "إلكترونيات", "type": "n"},
            {"word": "portable", "arabic": "محمول", "type": "adj"},
            {"word": "rank", "arabic": "يصنف", "type": "v"}
        ],
        "8": [
            {"word": "age-appropriate", "arabic": "مناسب لسن معين", "type": "adj."},
            {"word": "channel-surf", "arabic": "يتنقل بين القنوات", "type": "v."},
            {"word": "comedy", "arabic": "كوميديا", "type": "n."},
            {"word": "inactivity", "arabic": "خمود", "type": "n."},
            {"word": "mentally", "arabic": "ذهنياً", "type": "adv."},
            {"word": "miss out on", "arabic": "يفوت فرصة", "type": "ph.v"},
            {"word": "promote", "arabic": "يروج", "type": "v."},
            {"word": "provoke", "arabic": "يستفز", "type": "v."},
            {"word": "tune out", "arabic": "يتجاهل", "type": "v."},
            {"word": "get behind with", "arabic": "يتخلف عن", "type": "phr.v"},
            {"word": "get down to", "arabic": "يبدأ العمل", "type": "phr.v"},
            {"word": "get on", "arabic": "ينجح", "type": "phr.v"},
            {"word": "get over", "arabic": "يتجاوز", "type": "phr.v"},
            {"word": "get through", "arabic": "ينجح في", "type": "phr.v"},
            {"word": "occasionally", "arabic": "أحياناً", "type": "adv"},
            {"word": "record", "arabic": "يسجل", "type": "v"},
            {"word": "tune in", "arabic": "يتابع", "type": "v"},
            {"word": "convict", "arabic": "يدين", "type": "v."},
            {"word": "equestrian", "arabic": "متعلق بالحصان", "type": "adj"},
            {"word": "evidence", "arabic": "دليل", "type": "n."},
            {"word": "newcomer", "arabic": "قادم جديد", "type": "n."},
            {"word": "news team", "arabic": "فريق الأخبار", "type": "n."},
            {"word": "prosecution", "arabic": "محاكمة", "type": "n."},
            {"word": "thriller", "arabic": "إثارة", "type": "n."}
        ],
        "9": [
            {"word": "capability", "arabic": "قدرة", "type": "n."},
            {"word": "consumer", "arabic": "مستهلك", "type": "n"},
            {"word": "ENG", "arabic": "جمع الأخبار الإلكترونية", "type": "abbr."},
            {"word": "high-end", "arabic": "فاخر", "type": "adj."},
            {"word": "hydraulic", "arabic": "هيدروليك", "type": "n"},
            {"word": "motion picture", "arabic": "فيلم", "type": "n"},
            {"word": "nowadays", "arabic": "هذه الأيام", "type": "adv."},
            {"word": "pedestal", "arabic": "منصة", "type": "n"},
            {"word": "period drama", "arabic": "دراما تاريخية", "type": "n"},
            {"word": "stabilizing", "arabic": "مثبت", "type": "adj."},
            {"word": "amicably", "arabic": "بود", "type": "adv."},
            {"word": "audience", "arabic": "جمهور", "type": "n"},
            {"word": "beckon away", "arabic": "يرفض", "type": "phr.v"},
            {"word": "bring up", "arabic": "يخرج", "type": "phr.v"},
            {"word": "category", "arabic": "فئة", "type": "n"},
            {"word": "characterize", "arabic": "يتميز", "type": "v"},
            {"word": "cityscape", "arabic": "منظر المدينة", "type": "n"},
            {"word": "commentator", "arabic": "معلق", "type": "n"},
            {"word": "court", "arabic": "محكمة", "type": "n"},
            {"word": "feature", "arabic": "ميزة", "type": "n"},
            {"word": "producer", "arabic": "منتج", "type": "v"},
            {"word": "screen", "arabic": "شاشة", "type": "n"},
            {"word": "spotlight", "arabic": "مركز الضوء", "type": "n"},
            {"word": "sprawling", "arabic": "منتشر", "type": "adj"},
            {"word": "basically", "arabic": "أساساً", "type": "adv"},
            {"word": "catch", "arabic": "يلتقط", "type": "v"},
            {"word": "congested", "arabic": "مكتظ", "type": "adj"},
            {"word": "fundamentally", "arabic": "في الأساس", "type": "adv"},
            {"word": "inexpensive", "arabic": "غير مكلف", "type": "adj"},
            {"word": "voice over", "arabic": "تعليق صوتي", "type": "n"},
            {"word": "wholeheartedly", "arabic": "بصفة كاملة", "type": "adv"}
        ]
    }
    
    # Grade 12 vocabulary data (Units 7-12)
    grade_12_data = {
        "7": [
            {"word": "cardiovascular", "arabic": "متعلق بالقلب والأوعية الدموية", "type": "adj"},
            {"word": "centenarian", "arabic": "شخص عمره مائة عام", "type": "n"},
            {"word": "commentary", "arabic": "تعليق", "type": "n"},
            {"word": "cycle", "arabic": "يقود دورة", "type": "v"},
            {"word": "elderly", "arabic": "كبير السن", "type": "adj"},
            {"word": "expectation", "arabic": "توقع", "type": "n"},
            {"word": "geriatric", "arabic": "معلق بكبار السن", "type": "adj"},
            {"word": "honour", "arabic": "يكرم", "type": "v"},
            {"word": "integral", "arabic": "أساسي", "type": "adj"},
            {"word": "onerous", "arabic": "قاس", "type": "adj"},
            {"word": "supple", "arabic": "مرن", "type": "adj"},
            {"word": "vigorous", "arabic": "قوي", "type": "adj"},
            {"word": "chronic", "arabic": "مزمن", "type": "adj"},
            {"word": "deprived of", "arabic": "محروم من", "type": "phr."},
            {"word": "drowsy", "arabic": "نعسان", "type": "adj"},
            {"word": "genetic make-up", "arabic": "التركيب الجيني", "type": "n"},
            {"word": "restful", "arabic": "هادئ", "type": "adj"},
            {"word": "shallow", "arabic": "قليل", "type": "adj"},
            {"word": "blizzard", "arabic": "عاصفة ثلجية", "type": "n."},
            {"word": "conceal", "arabic": "يخفي", "type": "v."},
            {"word": "dispute", "arabic": "جدل", "type": "n."},
            {"word": "do away with", "arabic": "يتخلص من", "type": "phr."},
            {"word": "do up", "arabic": "يصلح", "type": "phr."},
            {"word": "do without", "arabic": "يستغني عن", "type": "phr."},
            {"word": "excuse", "arabic": "عذر", "type": "n."},
            {"word": "frequently", "arabic": "بشكل متكرر", "type": "adv."},
            {"word": "in spite of", "arabic": "بالرغم من", "type": "prep."},
            {"word": "make up", "arabic": "يخترع", "type": "phr."},
            {"word": "make up for", "arabic": "يعوض", "type": "phr."},
            {"word": "vicinity", "arabic": "المناطق المجاورة", "type": "n."}
        ],
        "8": [
            {"word": "almond", "arabic": "لوز", "type": "n"},
            {"word": "depopulation", "arabic": "انخفاض عدد السكان", "type": "n"},
            {"word": "deserted", "arabic": "مهجور", "type": "adj"},
            {"word": "export", "arabic": "تصدير", "type": "n"},
            {"word": "graduated", "arabic": "متخرج", "type": "adj"},
            {"word": "infrastructure", "arabic": "البنية التحتية", "type": "n"},
            {"word": "overcrowding", "arabic": "ازدحام", "type": "n"},
            {"word": "public services", "arabic": "خدمات عامة", "type": "n"},
            {"word": "reverse", "arabic": "يعكس", "type": "v"},
            {"word": "rural", "arabic": "ريفي", "type": "adj"},
            {"word": "socioeconomic", "arabic": "اجتماعي اقتصادي", "type": "adj"},
            {"word": "unemployment", "arabic": "البطالة", "type": "n"},
            {"word": "vacant", "arabic": "فارغ", "type": "adj"},
            {"word": "vice versa", "arabic": "بالضد من العكس", "type": "adv"},
            {"word": "astounded", "arabic": "مذهول", "type": "adj."},
            {"word": "bump into", "arabic": "يصادف", "type": "phv."},
            {"word": "densely", "arabic": "بشكل كثيف", "type": "adv."},
            {"word": "disturbance", "arabic": "اضطراب", "type": "n."},
            {"word": "embarrassed", "arabic": "محرج", "type": "adj."},
            {"word": "far and wide", "arabic": "في كل مكان", "type": "idiom"},
            {"word": "glamour", "arabic": "جاذبية", "type": "n."},
            {"word": "hub", "arabic": "مركز", "type": "n."},
            {"word": "metropolis", "arabic": "مدينة كبيرة", "type": "n."},
            {"word": "narrate", "arabic": "يحكي", "type": "v."},
            {"word": "odds and ends", "arabic": "أشياء متنوعة", "type": "idiom"},
            {"word": "pluck up the courage", "arabic": "يجمع الشجاعة", "type": "exp."},
            {"word": "tranquil", "arabic": "هادئ", "type": "adj."},
            {"word": "hustle and bustle", "arabic": "صخب وضوضاء", "type": "idiom"}
        ]
    }
    
    return {
        "10": grade_10_data,
        "11": grade_11_data, 
        "12": grade_12_data
    }

def populate_database():
    """Populate the Supabase database with vocabulary data"""
    print("🔄 Starting database population...")
    
    # Get vocabulary data
    vocabulary_data = extract_vocabulary_data()
    
    # Track inserted records
    total_inserted = 0
    
    # Insert data for each grade level
    for grade_level, units_data in vocabulary_data.items():
        print(f"\n📚 Processing Grade {grade_level}...")
        
        for unit_number, words in units_data.items():
            print(f"  📖 Unit {unit_number} ({len(words)} words)")
            
            # Prepare batch insert data
            batch_data = []
            for i, word_data in enumerate(words):
                record = {
                    "class_number": int(grade_level),
                    "unit_number": int(unit_number),
                    "word": word_data["word"],
                    "class_type": word_data.get("type", "n."),  # Default to noun if not specified
                    "definition_en": word_data["word"],  # Use word as definition
                    "definition_ar": word_data["arabic"],
                    "phonetic": "",  # Empty for now
                    "examples": [],  # Empty for now
                    "category": "vocabulary",  # Default category
                    "difficulty_level": 1,  # Default difficulty
                    "order_in_unit": i + 1
                }
                batch_data.append(record)
            
            # Insert batch to Supabase
            try:
                result = supabase.table("kuwait_vocabulary").insert(batch_data).execute()
                if result.data:
                    total_inserted += len(result.data)
                    print(f"    ✅ Inserted {len(result.data)} words")
                else:
                    print(f"    ⚠️  No data returned from insert")
            except Exception as e:
                print(f"    ❌ Error inserting data: {str(e)}")
                # Try inserting one by one for debugging
                for word_data in words:
                    try:
                        single_record = {
                            "class_number": int(grade_level),
                            "unit_number": int(unit_number),
                            "word": word_data["word"],
                            "class_type": word_data.get("type", "n."),
                            "definition_en": word_data["word"],
                            "definition_ar": word_data["arabic"],
                            "order_in_unit": 1
                        }
                        result = supabase.table("kuwait_vocabulary").insert(single_record).execute()
                        if result.data:
                            total_inserted += 1
                    except Exception as single_e:
                        print(f"      ❌ Failed to insert '{word_data['word']}': {str(single_e)}")
    
    print(f"\n🎉 Database population completed!")
    print(f"📊 Total records inserted: {total_inserted}")
    
    return total_inserted

def verify_data():
    """Verify the inserted data"""
    print("\n🔍 Verifying inserted data...")
    
    try:
        # Get count of vocabulary records
        result = supabase.table("kuwait_vocabulary").select("id", count="exact").execute()
        total_count = result.count if hasattr(result, 'count') else len(result.data)
        print(f"📈 Total vocabulary records in database: {total_count}")
        
        # Get sample data
        sample_result = supabase.table("kuwait_vocabulary").select("*").limit(5).execute()
        if sample_result.data:
            print("\n📋 Sample records:")
            for record in sample_result.data:
                print(f"  - Grade {record['class_number']}, Unit {record['unit_number']}: {record['word']} ({record['definition_ar']})")
        
        return True
    except Exception as e:
        print(f"❌ Error verifying data: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Kuwait English Learning Platform - Database Population")
    print("=" * 60)
    
    # Populate database
    inserted_count = populate_database()
    
    # Verify data
    if inserted_count > 0:
        verify_data()
    
    print("\n✨ Process completed!")
