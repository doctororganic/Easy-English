import json
import os
from supabase import create_client

# Initialize Supabase client
SUPABASE_URL = "https://wjdzoqlxudswcovbuptd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjAyMjQwOSwiZXhwIjoyMDc3NTk4NDA5fQ.MHIkA73VonD0_gCD6JJpB7SPNetIcrDmsGTWksAzePk"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def populate_grade12_vocabulary():
    """Populate vocabulary words for Grade 12, Unit 1"""
    
    # Based on extracted PDF content
    vocabulary_words = [
        {"word": "adoption", "definition": "the act of legally taking another person's child into your own family to raise", "arabic": "تبني"},
        {"word": "bench", "definition": "a long seat for two or more people, typically made of wood or stone", "arabic": "مقعد"},
        {"word": "note", "definition": "a brief record of points or ideas written down as an aid to memory", "arabic": "ملاحظة"},
        {"word": "brief", "definition": "of short duration or distance", "arabic": "موجز"},
        {"word": "case", "definition": "an instance of a particular situation; an example of something occurring", "arabic": "قضية"},
        {"word": "claimed", "definition": "stated or asserted that something is the case", "arabic": "ادعى"},
        {"word": "consultation", "definition": "the action or process of formally consulting or discussing", "arabic": "استشارة"},
        {"word": "violence", "definition": "behavior involving physical force intended to hurt, damage, or kill", "arabic": "عنف"},
        {"word": "defined", "definition": "stated or described exactly the nature, scope, or meaning of", "arabic": "عرف"},
        {"word": "enforced", "definition": "compel observance of or compliance with (a law, rule, or obligation)", "arabic": "فرض"},
        {"word": "governed", "definition": "conduct the policy, actions, and affairs of (a state, organization, or people)", "arabic": "حكم"},
        {"word": "grievance", "definition": "a real or imagined cause for complaint, especially unfair treatment", "arabic": "شكوى"},
        {"word": "guilty", "definition": "culpable of or responsible for a specified wrongdoing", "arabic": "مذنب"},
        {"word": "handcuffs", "definition": "a pair of lockable linked metal rings for securing a prisoner's wrists", "arabic": "أصفاد"},
        {"word": "imposing", "definition": "forcing (something unwelcome or unfamiliar) to be accepted or put in place", "arabic": "فرض"},
        {"word": "principle", "definition": "a fundamental truth or proposition that serves as the foundation", "arabic": "مبدأ"},
        {"word": "innocent", "definition": "not guilty of a crime or offense", "arabic": "بريء"},
        {"word": "intend", "definition": "have (a course of action) as one's purpose or objective; plan", "arabic": "ينوي"},
        {"word": "legal", "definition": "of, based on, or concerned with the law", "arabic": "قانوني"},
        {"word": "litigation", "definition": "the process of taking legal action", "arabic": "تقاضي"},
        {"word": "penalty", "definition": "a punishment imposed for breaking a law, rule, or contract", "arabic": "عقوبة"},
        {"word": "petty", "definition": "of little importance; trivial", "arabic": "تافه"},
        {"word": "property", "definition": "a thing or things belonging to someone; possessions", "arabic": "ممتلكات"},
        {"word": "supporter", "definition": "a person who approves of and encourages a public figure, political party, policy, etc.", "arabic": "مؤيد"},
        {"word": "tolerant", "definition": "showing willingness to allow the existence of opinions with which one does not necessarily agree", "arabic": "متسامح"},
        {"word": "welfare", "definition": "the health, happiness, and fortunes of a person or group", "arabic": "رفاهية"},
        {"word": "prosecute", "definition": "institute or conduct legal proceedings against (a person or organization)", "arabic": "قاضى"},
        {"word": "sue", "definition": "institute legal proceedings against (a person or institution)", "arabic": "رفع دعوى"},
        {"word": "regardless", "definition": "without paying attention to the present situation; despite the prevailing circumstances", "arabic": "بغض النظر"},
        {"word": "ultimately", "definition": "finally; in the end", "arabic": "في النهاية"},
    ]
    
    # Insert into database
    for word_data in vocabulary_words:
        data = {
            "grade_level": "12",
            "unit_number": 1,
            "word_english": word_data["word"],
            "word_arabic": word_data["arabic"],
            "definition_english": word_data["definition"],
            "definition_arabic": word_data["arabic"],
            "part_of_speech": "noun/verb/adjective",  # This should be determined properly
            "difficulty_level": 3
        }
        
        result = supabase.table("vocabulary_units").insert(data).execute()
    
    print(f"✓ Inserted {len(vocabulary_words)} vocabulary words for Grade 12, Unit 1")

def populate_vocabulary_questions():
    """Populate vocabulary multiple choice questions"""
    
    # Based on extracted PDF
    questions = [
        {
            "question": "There are strict regulations concerning the _______ of children.",
            "a": "adoption", "b": "consultation", "c": "litigation", "d": "persuasion",
            "correct": "a",
            "explanation": "Adoption refers to the legal process of taking another person's child into one's own family."
        },
        {
            "question": "My father is accustomed to sipping his coffee on a wooden _______ in his garden.",
            "a": "bench", "b": "case", "c": "jury", "d": "note",
            "correct": "a",
            "explanation": "A bench is a long seat typically found in gardens or public places."
        },
        {
            "question": "The speaker looked at the _______ he wrote to help him remember key points of the meeting.",
            "a": "rows", "b": "benches", "c": "notes", "d": "principles",
            "correct": "c",
            "explanation": "Notes are brief records written down to aid memory."
        },
        {
            "question": "A _______ meeting was held to discuss the policy and the goals of the company.",
            "a": "brief", "b": "civil", "c": "guilty", "d": "petty",
            "correct": "a",
            "explanation": "Brief means short in duration."
        },
        {
            "question": "The _______ was refused as there was no evidence.",
            "a": "case", "b": "principle", "c": "spring", "d": "welfare",
            "correct": "a",
            "explanation": "Case refers to a legal matter or instance requiring investigation."
        },
    ]
    
    for idx, q in enumerate(questions, start=1):
        data = {
            "grade_level": "12",
            "unit_number": 1,
            "question_number": idx,
            "question_text": q["question"],
            "option_a": q["a"],
            "option_b": q["b"],
            "option_c": q["c"],
            "option_d": q["d"],
            "correct_answer": q["correct"],
            "explanation_english": q["explanation"]
        }
        
        result = supabase.table("vocabulary_questions").insert(data).execute()
    
    print(f"✓ Inserted {len(questions)} vocabulary questions for Grade 12, Unit 1")

def populate_test_bank_questions():
    """Populate test bank questions from extracted PDFs"""
    
    # Grammar questions from Grade 12
    grammar_questions = [
        {
            "question": "They _______ the law, they should be punished.",
            "options": {"a": "has broken", "b": "have broken", "c": "hadn't broken", "d": "didn't break"},
            "correct": "b",
            "explanation": "Present perfect tense is used because the action has relevance to the present."
        },
        {
            "question": "I _______ just my leg during the race.",
            "options": {"a": "had-broken", "b": "didn't-break", "c": "has-broken", "d": "have-broken"},
            "correct": "d",
            "explanation": "Present perfect with 'just' indicates a recent action."
        },
        {
            "question": "She _______ never to London.",
            "options": {"a": "have-been", "b": "has-been", "c": "is-being", "d": "was-being"},
            "correct": "b",
            "explanation": "Present perfect is used with 'never' to describe life experience."
        },
    ]
    
    for idx, q in enumerate(grammar_questions, start=1):
        data = {
            "grade_level": "12",
            "unit_number": 1,
            "component_type": "grammar",
            "question_number": idx,
            "question_text": q["question"],
            "question_type": "multiple_choice",
            "options": q["options"],
            "correct_answer": q["correct"],
            "explanation": q["explanation"],
            "points": 1,
            "difficulty": 3
        }
        
        result = supabase.table("test_bank_questions").insert(data).execute()
    
    print(f"✓ Inserted {len(grammar_questions)} grammar questions for Grade 12, Unit 1")

def main():
    print("Starting database population...")
    print("=" * 60)
    
    try:
        populate_grade12_vocabulary()
        populate_vocabulary_questions()
        populate_test_bank_questions()
        
        print("=" * 60)
        print("✓ Database population complete!")
        print("\nSummary:")
        print("- Vocabulary words: 30 words")
        print("- Vocabulary questions: 5 questions")
        print("- Grammar questions: 3 questions")
        
    except Exception as e:
        print(f"✗ Error during population: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
