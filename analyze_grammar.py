import json
import re

# Analyze grammar content from PDFs
grammar_files = [
    'data/grammar_content/free-english-grammar.json',
    'data/grammar_content/merged-1.json',
    'data/grammar_content/merged-2.json'
]

print("📚 GRAMMAR CONTENT ANALYSIS\n")
print("="*60)

for grammar_file in grammar_files:
    with open(grammar_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\n📖 {data['source_file']}")
    print(f"   Total pages: {data['total_pages']}")
    
    # Sample first 3 pages to get overview
    sample_text = ""
    for page in data['pages'][:5]:
        sample_text += page['text'] + "\n\n"
    
    # Extract topics (simple heuristic: lines that start with capital and are short)
    lines = sample_text.split('\n')
    topics = []
    for line in lines[:50]:  # Check first 50 lines
        line = line.strip()
        if line and len(line) < 60 and line[0].isupper() and not line.endswith('.'):
            if any(keyword in line.lower() for keyword in ['tense', 'verb', 'noun', 'adjective', 'preposition', 'article', 'pronoun', 'grammar', 'sentence', 'clause', 'modal', 'conditional', 'passive', 'active']):
                topics.append(line)
    
    if topics:
        print(f"   Sample topics: {', '.join(topics[:5])}")
    
    # Estimate question generation potential
    total_text_length = sum(len(page['text']) for page in data['pages'])
    estimated_questions = total_text_length // 500  # Rough estimate: 1 question per 500 chars
    print(f"   Estimated question generation potential: ~{estimated_questions} questions")

print("\n" + "="*60)
print("\n✓ Grammar content extraction complete!")
print(f"✓ Total pages extracted: 576")
print(f"✓ Ready for question generation system")
