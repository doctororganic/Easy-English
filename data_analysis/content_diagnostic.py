#!/usr/bin/env python3
"""
Diagnostic script to check content extraction from grammar source files
"""
import json
import os
import re
from collections import Counter

def load_source_file(file_path):
    """Load and parse a source file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            if file_path.endswith('.txt'):
                return f.read()
            else:
                return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

def extract_text_from_json(data):
    """Extract all text content from JSON data structure"""
    all_text = []
    
    if isinstance(data, dict):
        if 'pages' in data:
            for page in data.get('pages', []):
                if 'text' in page and isinstance(page['text'], str):
                    text = page['text'].strip()
                    if text and len(text) > 10:  # Only include substantial text
                        all_text.append(text)
        else:
            # Handle other JSON structures
            for key, value in data.items():
                if isinstance(value, str) and len(value) > 10:
                    all_text.append(value)
                elif isinstance(value, dict):
                    all_text.extend(extract_text_from_json(value))
    elif isinstance(data, str):
        all_text.append(data)
    
    return all_text

def analyze_content_quality(text_samples):
    """Analyze the quality of extracted content"""
    total_chars = 0
    readable_chars = 0
    english_words = []
    
    for text in text_samples:
        total_chars += len(text)
        
        # Count readable English characters (a-z, A-Z, spaces, basic punctuation)
        readable = re.findall(r'[a-zA-Z\s\.\,\!\?\:\;\-\'\"]', text)
        readable_chars += len(readable)
        
        # Extract English words
        words = re.findall(r'\b[a-zA-Z]+\b', text.lower())
        english_words.extend(words)
    
    readability_ratio = readable_chars / max(total_chars, 1) if total_chars > 0 else 0
    word_freq = Counter(english_words)
    
    return {
        'total_samples': len(text_samples),
        'total_characters': total_chars,
        'readable_ratio': readability_ratio,
        'top_words': word_freq.most_common(20),
        'unique_words': len(set(english_words))
    }

def main():
    """Main diagnostic function"""
    data_files = [
        "/workspace/data/grammar_content/free-english-grammar.json",
        "/workspace/data/grammar_content/merged-1.json", 
        "/workspace/data/grammar_content/merged-2.json",
        "/workspace/extract/ilovepdf_merged (1)_30b53d84.json",
        "/workspace/data/arabic_vocab_ilovepdf_merged (1)_ab38a242.json.txt",
        "/workspace/data/arabic_vocab_ilovepdf_merged_68369229.json.txt"
    ]
    
    print("=== GRAMMAR CONTENT DIAGNOSTIC ===\n")
    
    for file_path in data_files:
        if not os.path.exists(file_path):
            print(f"❌ File not found: {file_path}")
            continue
            
        print(f"📁 Analyzing: {os.path.basename(file_path)}")
        print("-" * 60)
        
        data = load_source_file(file_path)
        if data is None:
            continue
            
        text_samples = extract_text_from_json(data)
        
        if not text_samples:
            print("❌ No substantial text content found")
            continue
        
        quality = analyze_content_quality(text_samples)
        
        print(f"✅ Text samples found: {quality['total_samples']}")
        print(f"📊 Total characters: {quality['total_characters']:,}")
        print(f"📖 Readability ratio: {quality.get('readability_ratio', 0):.1%}")
        print(f"🔤 Unique words: {quality['unique_words']:,}")
        
        if quality['top_words']:
            print(f"🏆 Top 10 words: {', '.join([word for word, count in quality['top_words'][:10]])}")
        
        # Show first 200 characters of first sample
        if text_samples:
            first_sample = text_samples[0][:200].replace('\n', ' ')
            print(f"📝 Sample content: {first_sample}...")
        
        print()

if __name__ == "__main__":
    main()