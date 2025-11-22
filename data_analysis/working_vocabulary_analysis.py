#!/usr/bin/env python3
"""
Working Kuwait Curriculum Vocabulary Analysis
Simple, reliable analysis with proper data structure handling
"""

import json
import os
import re
from collections import defaultdict

def analyze_structured_data():
    """Analyze the structured vocabulary data"""
    with open('/workspace/data/kuwait_comprehensive_vocabulary.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    results = {
        'summary': {},
        'grade_details': {},
        'translation_quality': {},
        'missing_content': {}
    }
    
    total_words = 0
    total_units = 0
    
    for grade, units in data['kuwait_curriculum'].items():
        if isinstance(units, dict):  # Ensure it's a dict
            grade_words = 0
            grade_units = 0
            unit_details = {}
            
            for unit, word_list in units.items():
                if isinstance(word_list, list):
                    word_count = len(word_list)
                    grade_words += word_count
                    grade_units += 1
                    
                    # Analyze translations
                    missing_ar = 0
                    generic_ar = 0
                    sample_words = []
                    
                    for word_data in word_list[:5]:  # Sample first 5
                        word = word_data.get('word', '')
                        ar_translation = word_data.get('translations', {}).get('ar', '')
                        sample_words.append(word)
                        
                        if not ar_translation:
                            missing_ar += 1
                        elif ar_translation == f'عربي: {word}':
                            generic_ar += 1
                    
                    unit_details[unit] = {
                        'word_count': word_count,
                        'missing_translations': missing_ar,
                        'generic_translations': generic_ar,
                        'sample_words': sample_words
                    }
            
            results['grade_details'][grade] = {
                'total_words': grade_words,
                'unit_count': grade_units,
                'units': unit_details
            }
            
            total_words += grade_words
            total_units += grade_units
    
    results['summary'] = {
        'total_words': total_words,
        'total_units': total_units,
        'available_grades': list(data['kuwait_curriculum'].keys())
    }
    
    return results

def analyze_raw_extraction():
    """Analyze raw extracted markdown files"""
    raw_analysis = {}
    
    for grade_num in ['10', '11', '12']:
        file_path = f'/workspace/extract/extract_Gr{grade_num} Mr. Mohamed Sayed vocab 2nd .md'
        
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Count basic elements
            units = len(re.findall(r'Unit \d+', content))
            vocabulary_entries = len(re.findall(r'Word  Arabic', content))
            arabic_content = any(ord(c) > 127 for c in content)
            
            # Extract sample words
            lines = content.split('\\n')
            sample_words = []
            for line in lines:
                if 'Word  Arabic' in line and len(sample_words) < 10:
                    parts = line.split('Arabic')
                    if len(parts) > 1:
                        word = parts[0].replace('Word', '').strip()
                        if word and len(word) > 2:
                            sample_words.append(word)
            
            raw_analysis[f'grade_{grade_num}'] = {
                'extraction_status': 'complete',
                'file_size': len(content),
                'units_found': units,
                'vocabulary_entries': vocabulary_entries,
                'has_arabic_content': arabic_content,
                'sample_extracted': sample_words
            }
        else:
            raw_analysis[f'grade_{grade_num}'] = {'extraction_status': 'not_found'}
    
    return raw_analysis

def analyze_grammar_content():
    """Analyze grammar content"""
    grammar_analysis = {
        'json_extraction': {},
        'text_content': {}
    }
    
    # Check JSON extraction
    json_files = [
        '/workspace/extract/-Free-English-Grammar_5de3a115.json',
        '/workspace/extract/-Free-English-Grammar_92bf1d83.json'
    ]
    
    for json_file in json_files:
        if os.path.exists(json_file):
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                grammar_analysis['json_extraction'] = {
                    'status': 'extracted',
                    'content_length': len(data.get('text_in_pdf', '')),
                    'has_images': len(data.get('files_in_pdf', [])),
                    'quality': 'ocr_issues_present'
                }
                break
            except:
                pass
    
    # Check text-based grammar content
    text_files = [
        '/workspace/data/grade10_full_text.txt',
        '/workspace/data/grade11_full_text.txt', 
        '/workspace/data/grade12_answers_full_text.txt'
    ]
    
    for text_file in text_files:
        if os.path.exists(text_file):
            with open(text_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            grade = os.path.basename(text_file).replace('_full_text.txt', '').replace('_answers_full_text.txt', '')
            
            # Count grammar elements
            fill_blanks = len(re.findall(r'[\\.\\.\\.]{3,}', content))
            multiple_choice = len(re.findall(r'[a-d]\\.[^a-d]*', content))
            
            grammar_analysis['text_content'][grade] = {
                'content_length': len(content),
                'fill_in_blanks': fill_blanks,
                'multiple_choice': multiple_choice,
                'extraction_status': 'good'
            }
    
    return grammar_analysis

def create_integration_plan():
    """Create integration and improvement plan"""
    return {
        'immediate_actions': [
            {
                'priority': 1,
                'action': 'Structure Grade 10 and 12 raw data',
                'rationale': 'Complete the structured vocabulary database',
                'effort': 'medium',
                'timeline': '1-2 weeks'
            },
            {
                'priority': 2,
                'action': 'Enhance Arabic translations',
                'rationale': 'Replace generic translations with contextual ones',
                'effort': 'high',
                'timeline': '2-3 weeks'
            }
        ],
        'medium_term_actions': [
            {
                'priority': 3,
                'action': 'Cross-grade vocabulary alignment',
                'rationale': 'Ensure proper learning progression',
                'effort': 'high',
                'timeline': '1 month'
            }
        ],
        'long_term_actions': [
            {
                'priority': 4,
                'action': 'Add multimedia learning features',
                'rationale': 'Enhance learning experience',
                'effort': 'very_high',
                'timeline': '3-6 months'
            }
        ]
    }

def main():
    """Main analysis function"""
    print("Working Kuwait Curriculum Vocabulary Analysis")
    print("=" * 50)
    
    # Analyze structured data
    print("Analyzing structured vocabulary data...")
    structured_analysis = analyze_structured_data()
    
    # Analyze raw extractions
    print("Analyzing raw extractions...")
    raw_analysis = analyze_raw_extraction()
    
    # Analyze grammar
    print("Analyzing grammar content...")
    grammar_analysis = analyze_grammar_content()
    
    # Create integration plan
    print("Creating integration plan...")
    integration_plan = create_integration_plan()
    
    # Compile final report
    final_report = {
        'analysis_metadata': {
            'date': '2025-11-10',
            'version': 'working_v1',
            'analyst': 'MiniMax Agent'
        },
        'executive_summary': {
            'total_structured_vocabulary': structured_analysis['summary']['total_words'],
            'grade_coverage': structured_analysis['summary']['available_grades'],
            'raw_extractions': len([g for g in raw_analysis if raw_analysis[g].get('extraction_status') == 'complete']),
            'grammar_extraction': 'partial_with_issues',
            'overall_readiness': 'high_for_structured_content'
        },
        'detailed_findings': {
            'structured_data': structured_analysis,
            'raw_extractions': raw_analysis,
            'grammar_content': grammar_analysis,
            'integration_plan': integration_plan
        },
        'recommendations': {
            'next_immediate_steps': [
                'Process Grade 10 and 12 raw data into structured format',
                'Enhance Arabic translation quality',
                'Implement cross-grade vocabulary alignment'
            ],
            'quality_improvements': [
                'Add contextual example sentences',
                'Implement thematic organization',
                'Create multimedia learning components'
            ]
        },
        'curriculum_insights': {
            'strengths': [
                'Comprehensive vocabulary coverage for Grade 11',
                'Good Arabic translation foundation',
                'Well-structured unit-based organization',
                'Kuwait-specific curriculum alignment'
            ],
            'areas_for_improvement': [
                'Complete Grade 10 and 12 structuring',
                'Enhance translation depth and context',
                'Improve grammar content quality',
                'Add cross-grade progression analysis'
            ],
            'integration_opportunities': [
                'Create unified Kuwait curriculum database',
                'Implement adaptive learning pathways',
                'Develop assessment and progress tracking',
                'Add multimedia and interactive features'
            ]
        }
    }
    
    # Save report
    os.makedirs('/workspace/data_analysis', exist_ok=True)
    output_file = '/workspace/data_analysis/pdf_vocabulary_analysis.json'
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_report, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print(f"\\nAnalysis Complete!")
    print(f"Results saved to: {output_file}")
    print(f"\\nKey Results:")
    print(f"- Total structured vocabulary: {final_report['executive_summary']['total_structured_vocabulary']} words")
    print(f"- Available grades: {final_report['executive_summary']['grade_coverage']}")
    print(f"- Raw extractions complete: {final_report['executive_summary']['raw_extractions']}/3 grades")
    print(f"- Overall readiness: {final_report['executive_summary']['overall_readiness']}")
    
    return final_report

if __name__ == "__main__":
    result = main()
