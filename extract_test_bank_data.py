import json
import re
import os

def extract_grade12_vocabulary():
    """Extract vocabulary questions from Grade 12 test bank"""
    with open('/workspace/extract/test-bank-grade-12-2022-2023-questions-st.-term_af3f9caf.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    text = data['text_in_pdf']
    
    # Extract vocabulary words and their options
    vocab_section = text.split('GRADE 12 – UNIT ONE – VOCABULARY')[1].split('sue / regardless')[0]
    
    # Pattern for multiple choice questions
    pattern = r'(\d+)\.\s+(.+?)\s+a\.\s+(.+?)\s+b\.\s+(.+?)\s+c\.\s+(.+?)\s+d\.\s+(.+?)(?=\n\n|\n\d+\.)'
    
    vocab_questions = []
    for match in re.finditer(pattern, vocab_section, re.DOTALL):
        num, question, a, b, c, d = match.groups()
        vocab_questions.append({
            'id': f'g12_u1_v{num.strip()}',
            'number': int(num.strip()),
            'question': question.strip().replace('\n', ' '),
            'options': {
                'a': a.strip(),
                'b': b.strip(),
                'c': c.strip(),
                'd': d.strip()
            }
        })
    
    return vocab_questions

def extract_grade12_grammar():
    """Extract grammar questions from Grade 12 test bank"""
    with open('/workspace/extract/test-bank-grade-12-2022-2023-questions-st.-term_af3f9caf.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    text = data['text_in_pdf']
    
    # Extract grammar section
    grammar_section = text.split('GRADE 12 – UNIT ONE – GRAMMAR')[1].split('GRDE 12 2023-2022 MODEL ANSWERS')[0]
    
    pattern = r'(\d+)\.\s+(.+?)\s+a\.\s+(.+?)\s+b\.\s+(.+?)\s+c\.\s+(.+?)\s+d\.\s+(.+?)(?=\n\n|\n\d+\.)'
    
    grammar_questions = []
    for match in re.finditer(pattern, grammar_section, re.DOTALL):
        num, question, a, b, c, d = match.groups()
        grammar_questions.append({
            'id': f'g12_u1_g{num.strip()}',
            'number': int(num.strip()),
            'question': question.strip().replace('\n', ' '),
            'options': {
                'a': a.strip(),
                'b': b.strip(),
                'c': c.strip(),
                'd': d.strip()
            }
        })
    
    return grammar_questions

def extract_fill_in_blanks():
    """Extract fill-in-the-blank vocabulary exercises"""
    with open('/workspace/extract/test-bank-grade-12-2022-2023-questions-st.-term_af3f9caf.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    text = data['text_in_pdf']
    
    # Extract fill-in section
    fill_section_1 = text.split('sue / regardless / note / define / principle / ultimately')[1].split('C- Fill in the spaces')[0]
    fill_section_2 = text.split('legal / code of law / intend / petty / speed limit / prove')[1].split('GRADE 12 – UNIT ONE – GRAMMAR')[0]
    
    exercises = []
    
    # Pattern for numbered fill-in sentences
    pattern = r'(\d+)\.\s+(.+?)(?=\n\d+\.|\Z)'
    
    for match in re.finditer(pattern, fill_section_1 + fill_section_2, re.DOTALL):
        num, sentence = match.groups()
        exercises.append({
            'id': f'g12_u1_f{num.strip()}',
            'number': int(num.strip()),
            'sentence': sentence.strip()
        })
    
    return exercises

def main():
    # Create data directory if it doesn't exist
    os.makedirs('/workspace/data', exist_ok=True)
    
    # Extract all question types
    vocab_questions = extract_grade12_vocabulary()
    grammar_questions = extract_grade12_grammar()
    fill_exercises = extract_fill_in_blanks()
    
    # Save to JSON
    output = {
        'grade': 12,
        'unit': 1,
        'components': {
            'vocabulary': {
                'multiple_choice': vocab_questions,
                'fill_in_blanks': fill_exercises
            },
            'grammar': {
                'multiple_choice': grammar_questions
            }
        }
    }
    
    with open('/workspace/data/grade12_unit1_extracted.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Extracted {len(vocab_questions)} vocabulary multiple choice questions")
    print(f"✓ Extracted {len(grammar_questions)} grammar questions")
    print(f"✓ Extracted {len(fill_exercises)} fill-in-the-blank exercises")
    print(f"✓ Saved to /workspace/data/grade12_unit1_extracted.json")

if __name__ == "__main__":
    main()
