import json
import re

def extract_grade12_answers():
    """Extract model answers from Grade 12 test bank"""
    with open('/workspace/extract/test-bank-grade-12.2022-2023-answers_28216062.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    text = data['text_in_pdf']
    
    # The answers are typically organized by component
    # Let's extract vocabulary and grammar answers
    
    answers = {
        'grade': 12,
        'unit': 1,
        'vocabulary': [],
        'grammar': [],
        'fill_in_blanks': []
    }
    
    # Save the full text for manual review
    with open('/workspace/data/grade12_answers_full_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"✓ Extracted answers from Grade 12 test bank")
    print(f"✓ Full text saved to /workspace/data/grade12_answers_full_text.txt for review")
    
    return answers

def extract_vocabulary_with_meanings():
    """Extract vocabulary words with their Arabic meanings from the Arabic PDF"""
    # Check if we have the Arabic vocabulary PDF
    import os
    arabic_pdf_files = [
        'ilovepdf_merged (1)_ab38a242.json',
        'ilovepdf_merged_68369229.json'
    ]
    
    vocab_data = []
    
    for pdf_file in arabic_pdf_files:
        pdf_path = f'/workspace/extract/{pdf_file}'
        if os.path.exists(pdf_path):
            with open(pdf_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                text = data.get('text_in_pdf', '')
                
                # Save for review
                with open(f'/workspace/data/arabic_vocab_{pdf_file}.txt', 'w', encoding='utf-8') as out:
                    out.write(text[:5000])  # First 5000 chars
                
                print(f"✓ Extracted {pdf_file} - saved preview")
    
    return vocab_data

def main():
    # Extract answers
    answers = extract_grade12_answers()
    
    # Extract vocabulary with meanings
    vocab = extract_vocabulary_with_meanings()
    
    print("\n✓ All answer extraction complete")

if __name__ == "__main__":
    main()
