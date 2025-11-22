#!/usr/bin/env python3
"""
Populate grammar content from extracted PDF data into Supabase database.
This script processes the 576 pages of grammar content and inserts them into the grammar_content table.
"""

import json
import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent))

GRAMMAR_FILES = [
    'data/grammar_content/free-english-grammar.json',
    'data/grammar_content/merged-1.json',
    'data/grammar_content/merged-2.json'
]

def load_grammar_data():
    """Load all grammar content from JSON files."""
    all_content = []
    
    for file_path in GRAMMAR_FILES:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, list):
                    all_content.extend(data)
                    print(f"Loaded {len(data)} pages from {file_path}")
                else:
                    all_content.append(data)
                    print(f"Loaded 1 page from {file_path}")
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
    
    return all_content

def categorize_grammar_content(content_text):
    """Categorize grammar content based on keywords in the text."""
    text_lower = content_text.lower()
    
    categories = {
        'tenses': ['present', 'past', 'future', 'tense', 'perfect', 'continuous', 'progressive'],
        'conditionals': ['conditional', 'if clause', 'unless', 'provided that'],
        'voice': ['passive', 'active voice', 'passive voice'],
        'reported_speech': ['reported speech', 'indirect speech', 'direct speech', 'reporting verbs'],
        'modals': ['modal', 'can', 'could', 'may', 'might', 'must', 'should', 'would', 'shall'],
        'clauses': ['relative clause', 'subordinate clause', 'dependent clause', 'independent clause'],
        'verbals': ['infinitive', 'gerund', 'participle', 'verbal'],
        'determiners': ['article', 'determiner', 'a/an/the'],
        'prepositions': ['preposition', 'prepositional phrase'],
        'connectors': ['conjunction', 'connector', 'linking word'],
        'agreement': ['subject-verb agreement', 'agreement', 'concord'],
        'syntax': ['word order', 'sentence structure', 'syntax'],
        'adjectives': ['comparative', 'superlative', 'adjective', 'adverb'],
        'idioms': ['phrasal verb', 'idiom', 'expression'],
        'questions': ['question formation', 'interrogative', 'wh-question'],
        'negation': ['negative', 'negation', "don't", "doesn't", "didn't"],
    }
    
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in text_lower:
                return category
    
    return 'general'

def estimate_difficulty(content_text):
    """Estimate difficulty level based on content complexity."""
    text_lower = content_text.lower()
    
    # Count advanced grammar terms
    advanced_terms = ['subjunctive', 'perfect continuous', 'mixed conditional', 'inversion', 
                     'ellipsis', 'cleft sentence', 'participle clause']
    advanced_count = sum(1 for term in advanced_terms if term in text_lower)
    
    if advanced_count >= 2:
        return 5
    elif advanced_count == 1:
        return 4
    elif 'perfect' in text_lower or 'passive' in text_lower or 'reported' in text_lower:
        return 3
    elif 'present' in text_lower or 'past' in text_lower or 'future' in text_lower:
        return 2
    else:
        return 1

def create_sql_insert_statements(grammar_data):
    """Create SQL INSERT statements for grammar content."""
    sql_statements = []
    
    sql_statements.append("-- Grammar Content Insertion")
    sql_statements.append("-- Total pages: " + str(len(grammar_data)))
    sql_statements.append("")
    
    for i, item in enumerate(grammar_data):
        # Extract fields
        title = item.get('title', f'Grammar Content {i+1}')
        content_text = item.get('text', item.get('content', ''))
        source_page = item.get('page', i+1)
        source_file = item.get('source_file', 'extracted_pdf')
        
        # Auto-categorize
        category = categorize_grammar_content(content_text)
        difficulty = estimate_difficulty(content_text)
        
        # Escape single quotes
        title_escaped = title.replace("'", "''")
        content_escaped = content_text.replace("'", "''")
        
        # Create INSERT statement
        sql = f"""
INSERT INTO grammar_content (title, content_text, source_page, source_file, grammar_category, difficulty_level, review_status)
VALUES ('{title_escaped}', '{content_escaped}', {source_page}, '{source_file}', '{category}', {difficulty}, 'approved');
"""
        sql_statements.append(sql)
    
    return '\n'.join(sql_statements)

def main():
    print("Loading grammar content from JSON files...")
    grammar_data = load_grammar_data()
    
    if not grammar_data:
        print("No grammar content found!")
        return
    
    print(f"\nTotal grammar content items: {len(grammar_data)}")
    
    print("\nGenerating SQL insert statements...")
    sql_content = create_sql_insert_statements(grammar_data)
    
    output_file = 'grammar_content_inserts.sql'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(sql_content)
    
    print(f"\nSQL file created: {output_file}")
    print(f"Total INSERT statements: {len(grammar_data)}")
    print("\nTo populate the database:")
    print("1. Open Supabase SQL Editor")
    print(f"2. Copy and execute the contents of {output_file}")
    print("3. Verify insertion with: SELECT COUNT(*) FROM grammar_content;")

if __name__ == '__main__':
    main()
