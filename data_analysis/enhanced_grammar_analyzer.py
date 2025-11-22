#!/usr/bin/env python3
"""
Enhanced Grammar Content Analyzer
Improved version that better handles mixed-language content and extracts more comprehensive grammar topics
"""
import json
import os
import re
import logging
from collections import Counter, defaultdict
from typing import Dict, List, Any, Tuple

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class EnhancedGrammarAnalyzer:
    def __init__(self):
        self.grammar_topics = {
            'present_tenses': ['present simple', 'present continuous', 'present perfect', 'present perfect continuous'],
            'past_tenses': ['past simple', 'past continuous', 'past perfect', 'past perfect continuous'],
            'future_tenses': ['future simple', 'future continuous', 'future perfect', 'will', 'going to'],
            'conditionals': ['zero conditional', 'first conditional', 'second conditional', 'third conditional'],
            'modal_verbs': ['can', 'could', 'may', 'might', 'must', 'should', 'would', 'shall', 'will'],
            'voice': ['active voice', 'passive voice'],
            'questions': ['yes/no questions', 'wh questions', 'question tags', 'indirect questions'],
            'sentences': ['simple sentences', 'compound sentences', 'complex sentences', 'compound-complex sentences'],
            'clauses': ['independent clauses', 'dependent clauses', 'relative clauses', 'noun clauses'],
            'adjectives': ['comparative adjectives', 'superlative adjectives', 'descriptive adjectives'],
            'adverbs': ['adverbs of frequency', 'adverbs of manner', 'adverbs of time', 'adverbs of place'],
            'prepositions': ['prepositions of time', 'prepositions of place', 'prepositions of movement'],
            'conjunctions': ['coordinating conjunctions', 'subordinating conjunctions', 'correlative conjunctions'],
            'articles': ['definite article', 'indefinite article', 'zero article'],
            'pronouns': ['personal pronouns', 'possessive pronouns', 'reflexive pronouns', 'demonstrative pronouns'],
            'tenses_overall': ['tenses', 'verb tenses', 'time expressions'],
            'communication': ['speaking skills', 'writing skills', 'communication functions']
        }
        
        self.vocabulary_patterns = {
            'nouns': r'\b([A-Z][a-z]+)\s*\(n\.\?\)\b',
            'verbs': r'\b([a-z]+)\s*\(v\.\?\)\b', 
            'adjectives': r'\b([a-z]+)\s*\(adj\.\?\)\b',
            'adverbs': r'\b([a-z]+)\s*\(adv\.\?\)\b',
            'phrasal_verbs': r'\b([a-z]+\s+[a-z]+)\s*\(ph\.v\.\?\)\b',
            'expressions': r'\b([a-z\s]+)\s*\(exp\.\?\)\b'
        }
    
    def load_data_sources(self) -> Dict[str, Any]:
        """Load all available grammar content files"""
        data_sources = {}
        file_paths = [
            "/workspace/data/grammar_content/free-english-grammar.json",
            "/workspace/data/grammar_content/merged-1.json", 
            "/workspace/data/grammar_content/merged-2.json",
            "/workspace/extract/ilovepdf_merged (1)_30b53d84.json",
            "/workspace/data/arabic_vocab_ilovepdf_merged (1)_ab38a242.json.txt",
            "/workspace/data/arabic_vocab_ilovepdf_merged_68369229.json.txt"
        ]
        
        for file_path in file_paths:
            try:
                if os.path.exists(file_path):
                    logger.info(f"Loading: {file_path}")
                    with open(file_path, 'r', encoding='utf-8') as f:
                        if file_path.endswith('.txt'):
                            data_sources[file_path] = f.read()
                        else:
                            data_sources[file_path] = json.load(f)
                else:
                    logger.warning(f"File not found: {file_path}")
            except Exception as e:
                logger.error(f"Error loading {file_path}: {e}")
                
        return data_sources
    
    def extract_text_from_source(self, source_content: Any) -> List[str]:
        """Extract text content from various source formats"""
        text_samples = []
        
        if isinstance(source_content, dict):
            if 'pages' in source_content:
                for page in source_content.get('pages', []):
                    if 'text' in page and isinstance(page['text'], str):
                        text = page['text'].strip()
                        if text and len(text) > 10:
                            text_samples.append(text)
            else:
                # Handle other JSON structures
                for key, value in source_content.items():
                    if isinstance(value, str) and len(value) > 10:
                        text_samples.append(value)
                    elif isinstance(value, dict):
                        text_samples.extend(self.extract_text_from_source(value))
        elif isinstance(source_content, str):
            text_samples.append(source_content)
        
        return text_samples
    
    def extract_grammar_topics_enhanced(self, content: str) -> List[str]:
        """Enhanced grammar topic extraction with better patterns"""
        found_topics = []
        content_lower = content.lower()
        
        # Direct topic matching
        for topic_category, topic_list in self.grammar_topics.items():
            for topic in topic_list:
                if topic.lower() in content_lower:
                    found_topics.append(topic)
        
        # Pattern-based extraction for specific grammar elements
        grammar_patterns = {
            'present_simple': [r'present\s+simple', r'simple\s+present'],
            'present_continuous': [r'present\s+continuous', r'continuous\s+present'],
            'past_continuous': [r'past\s+continuous', r'continuous\s+past'],
            'passive_voice': [r'passive\s+voice', r'passive\s+form'],
            'active_voice': [r'active\s+voice', r'active\s+form'],
            'comparatives': [r'comparative', r'-er\s+than', r'more\s+.*\s+than'],
            'superlatives': [r'superlative', r'-est', r'most\s+.*'],
            'conditionals': [r'conditional', r'if\s+.*\s+will'],
            'questions': [r'question', r'what\s+|when\s+|where\s+|who\s+|why\s+|how\s+'],
            'prepositions': [r'preposition', r'in\s+on\s+at', r'of\s+to\s+for'],
            'articles': [r'article', r'the\s+a\s+an'],
            'modal_verbs': [r'modal', r'can\s+|could\s+|may\s+|might\s+|must\s+|should\s+|would\s+'],
            'tenses': [r'tense', r'present\s+|past\s+|future\s+']
        }
        
        for pattern_name, patterns in grammar_patterns.items():
            for pattern in patterns:
                if re.search(pattern, content_lower, re.IGNORECASE):
                    found_topics.append(pattern_name)
                    break
        
        return list(set(found_topics))
    
    def extract_vocabulary_terms(self, content: str) -> List[str]:
        """Extract vocabulary terms that might indicate grammar topics"""
        vocab_terms = []
        
        # Extract word patterns with their parts of speech
        for pos_type, pattern in self.vocabulary_patterns.items():
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    word = match[0] if match[0] else match[1] if len(match) > 1 else str(match)
                else:
                    word = match
                
                # Convert to potential grammar topics
                if pos_type == 'verbs':
                    vocab_terms.append(f"verb_usage_{word}")
                elif pos_type == 'adjectives':
                    vocab_terms.append(f"adjective_{word}")
                elif pos_type == 'adverbs':
                    vocab_terms.append(f"adverb_{word}")
                elif pos_type == 'phrasal_verbs':
                    vocab_terms.append(f"phrasal_verb_{word}")
        
        # Extract specific grammar-related vocabulary
        grammar_vocab = re.findall(r'\b(grammar|vocabulary|sentence|clause|phrase|word|tense|voice|tense)\b', content, re.IGNORECASE)
        vocab_terms.extend(grammar_vocab)
        
        return list(set(vocab_terms))
    
    def analyze_question_types_enhanced(self, content: str) -> Dict[str, int]:
        """Enhanced question type analysis"""
        question_patterns = {
            "multiple_choice": [r'choose\s+[a-d]\)', r'[a-d]\)\s+[a-z]', r'select\s+the\s+correct'],
            "fill_in_blanks": [r'______|…\.\.\.|_____|_____', r'complete\s+the\s+.*'],
            "complete_sentence": [r'complete\s+.*sentence', r'finish\s+the\s+.*'],
            "transform_sentence": [r'transform', r'rewrite', r'change\s+to\s+.*'],
            "reorder": [r'reorder', r'arrange', r'put\s+.*\s+order'],
            "matching": [r'match\s+.*with', r'connect\s+.*pairs', r'line\s+up'],
            "vocabulary_usage": [r'use.*word', r'choose.*word', r'what.*means'],
            "grammar_correction": [r'correct.*sentence', r'find.*error', r'what.*wrong'],
            "essay_writing": [r'write.*essay', r'paragraph', r'composition'],
            "translation": [r'translate', r'means.*in', r'in.*means']
        }
        
        question_counts = defaultdict(int)
        content_lower = content.lower()
        
        for q_type, patterns in question_patterns.items():
            for pattern in patterns:
                matches = len(re.findall(pattern, content_lower, re.IGNORECASE))
                if matches > 0:
                    question_counts[q_type] += matches
                    break
        
        return dict(question_counts)
    
    def extract_grade_information(self, content: str) -> List[str]:
        """Extract grade level information"""
        grades = []
        
        # Look for grade patterns
        grade_patterns = [
            r'grade\s+(\d+)',
            r'g\s*(\d+)',
            r'(\d+)(st|nd|rd|th)\s+grade',
            r'class\s+(\d+)',
            r'year\s+(\d+)'
        ]
        
        for pattern in grade_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    grade = match[0]
                else:
                    grade = match
                try:
                    grade_num = int(grade)
                    if 1 <= grade_num <= 12:  # Reasonable grade range
                        grades.append(f"grade_{grade_num}")
                except ValueError:
                    continue
        
        return list(set(grades))
    
    def analyze_arabic_content(self, content: str) -> Dict[str, Any]:
        """Analyze Arabic content for translation quality indicators"""
        # Check for Arabic text presence
        arabic_pattern = re.compile(r'[\u0600-\u06FF]')
        arabic_texts = arabic_pattern.findall(content)
        has_arabic = len(arabic_texts) > 0
        
        # Look for English-Arabic pairs
        english_arabic_pairs = re.findall(r'([A-Za-z\s]+)\s+([\u0600-\u06FF\s]+)', content)
        
        # Check for common Arabic grammar terms
        arabic_grammar_terms = [
            'قواعد', 'النحو', 'الصرف', 'الإملاء', 'التعبير', 'الكتابة'
        ]
        found_arabic_grammar = [term for term in arabic_grammar_terms if term in content]
        
        return {
            "has_arabic_content": has_arabic,
            "english_arabic_pairs": len(english_arabic_pairs),
            "arabic_grammar_terms": found_arabic_grammar,
            "arabic_character_count": len(arabic_texts)
        }
    
    def generate_integrated_data(self, data_sources: Dict) -> Dict[str, Any]:
        """Generate comprehensive integrated grammar data"""
        logger.info("Starting enhanced grammar content analysis...")
        
        all_topics = []
        all_questions = defaultdict(int)
        all_grades = []
        all_vocab_terms = []
        all_arabic_analysis = []
        
        for source_name, source_content in data_sources.items():
            logger.info(f"Processing source: {source_name}")
            
            text_samples = self.extract_text_from_source(source_content)
            
            for content in text_samples:
                # Extract grammar topics
                topics = self.extract_grammar_topics_enhanced(content)
                all_topics.extend(topics)
                
                # Extract vocabulary terms
                vocab_terms = self.extract_vocabulary_terms(content)
                all_vocab_terms.extend(vocab_terms)
                
                # Analyze questions
                questions = self.analyze_question_types_enhanced(content)
                for q_type, count in questions.items():
                    all_questions[q_type] += count
                
                # Extract grade information
                grades = self.extract_grade_information(content)
                all_grades.extend(grades)
                
                # Analyze Arabic content
                arabic_analysis = self.analyze_arabic_content(content)
                all_arabic_analysis.append(arabic_analysis)
        
        # Compile results
        topic_counter = Counter(all_topics)
        question_counter = all_questions
        grade_counter = Counter(all_grades)
        vocab_counter = Counter(all_vocab_terms)
        
        # Calculate statistics
        unique_topics = list(set(all_topics))
        unique_vocab = list(set(all_vocab_terms))
        
        # Assess translation quality
        arabic_presence = sum(1 for analysis in all_arabic_analysis if analysis["has_arabic_content"])
        translation_coverage = arabic_presence / max(len(all_arabic_analysis), 1)
        
        integrated_data = {
            "metadata": {
                "analysis_date": "2025-11-10",
                "total_sources": len(data_sources),
                "analysis_type": "enhanced",
                "content_types": ["grammar_reference", "exercises", "vocabulary", "curriculum_materials"]
            },
            "overview": {
                "total_unique_topics": len(unique_topics),
                "total_unique_vocabulary": len(unique_vocab),
                "total_questions_analyzed": sum(question_counter.values()),
                "grade_distribution": dict(grade_counter),
                "most_common_topics": dict(topic_counter.most_common(10)),
                "most_common_vocabulary": dict(vocab_counter.most_common(20))
            },
            "topics": {
                "complete_topic_list": sorted(unique_topics),
                "topic_frequency": dict(topic_counter),
                "vocabulary_terms": sorted(unique_vocab)
            },
            "question_types": {
                "identified_types": list(question_counter.keys()),
                "question_type_distribution": dict(question_counter)
            },
            "arabic_translations": {
                "translation_quality": {
                    "overall_quality": min(translation_coverage * 1.2, 1.0),  # Slight boost for having Arabic content
                    "has_arabic_content": arabic_presence > 0,
                    "coverage_percentage": translation_coverage * 100
                },
                "content_analysis": all_arabic_analysis
            },
            "curriculum_mapping": {
                "curriculum_alignment_score": self.calculate_curriculum_alignment(unique_topics, grade_counter),
                "grade_levels_covered": list(grade_counter.keys()),
                "aligned_topics": unique_topics,
                "missing_topics": self.get_missing_topics(unique_topics),
                "extra_topics": []
            },
            "recommendations": {
                "content_completeness": {
                    "coverage_percentage": len(unique_topics) / len(self.grammar_topics) * 100,
                    "missing_topics": self.get_missing_topics(unique_topics),
                    "well_covered_topics": [topic for topic, count in topic_counter.most_common(5)],
                    "completeness_status": "comprehensive" if len(unique_topics) >= 15 else "partial" if len(unique_topics) >= 8 else "limited"
                },
                "improvement_priorities": self.get_improvement_priorities(unique_topics, question_counter, grade_counter, translation_coverage)
            }
        }
        
        logger.info("Enhanced grammar content analysis completed successfully")
        return integrated_data
    
    def calculate_curriculum_alignment(self, topics: List[str], grade_counter: Counter) -> float:
        """Calculate curriculum alignment score"""
        grade_10_topics = {"tenses", "passive voice", "conditionals", "questions", "prepositions", "articles", "modal verbs"}
        aligned_topics = len(set(topics) & grade_10_topics)
        return aligned_topics / max(len(grade_10_topics), 1)
    
    def get_missing_topics(self, covered_topics: List[str]) -> List[str]:
        """Get list of missing grammar topics"""
        all_possible_topics = set()
        for topic_list in self.grammar_topics.values():
            all_possible_topics.update(topic_list)
        
        # Also include pattern-based topics
        pattern_topics = ['present_simple', 'present_continuous', 'past_continuous', 'passive_voice', 'active_voice', 
                         'comparatives', 'superlatives', 'conditionals', 'questions', 'prepositions', 'articles', 
                         'modal_verbs', 'tenses']
        
        all_possible_topics.update(pattern_topics)
        
        return sorted(list(all_possible_topics - set(covered_topics)))
    
    def get_improvement_priorities(self, topics: List[str], questions: Dict[str, int], 
                                 grades: Counter, translation_coverage: float) -> List[str]:
        """Get improvement recommendations"""
        priorities = []
        
        if len(topics) < 10:
            priorities.append("HIGH: Add more grammar topics and categories")
        
        if sum(questions.values()) < 20:
            priorities.append("MEDIUM: Increase question variety and quantity")
        
        if len(grades) < 3:
            priorities.append("MEDIUM: Include more grade levels")
        
        if translation_coverage < 0.3:
            priorities.append("LOW: Improve Arabic translation coverage")
        
        if "essay_writing" not in questions:
            priorities.append("LOW: Add essay writing exercises")
        
        return priorities

def main():
    """Main execution function"""
    logger.info("Starting Enhanced Grammar Content Analysis")
    
    analyzer = EnhancedGrammarAnalyzer()
    
    # Load data sources
    logger.info("Loading data sources...")
    data_sources = analyzer.load_data_sources()
    
    if not data_sources:
        logger.error("No data sources found.")
        return
    
    logger.info(f"Successfully loaded {len(data_sources)} data sources")
    
    # Generate integrated analysis
    integrated_data = analyzer.generate_integrated_data(data_sources)
    
    # Save integrated data
    output_path = "/workspace/data_analysis/enhanced_grammar_content_integrated.json"
    logger.info(f"Saving enhanced integrated grammar data to: {output_path}")
    
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(integrated_data, f, indent=2, ensure_ascii=False)
        logger.info("Successfully saved enhanced integrated grammar data")
    except Exception as e:
        logger.error(f"Error saving data: {e}")
        return
    
    # Generate summary
    summary = {
        "analysis_status": "completed",
        "analysis_type": "enhanced",
        "data_sources_processed": len(data_sources),
        "total_grammar_topics": integrated_data["overview"]["total_unique_topics"],
        "total_vocabulary_terms": integrated_data["overview"]["total_unique_vocabulary"],
        "total_questions_analyzed": integrated_data["overview"]["total_questions_analyzed"],
        "curriculum_alignment": integrated_data["curriculum_mapping"]["curriculum_alignment_score"],
        "translation_quality": integrated_data["arabic_translations"]["translation_quality"]["overall_quality"],
        "content_completeness": integrated_data["recommendations"]["content_completeness"]["coverage_percentage"],
        "grade_levels": list(integrated_data["overview"]["grade_distribution"].keys()),
        "top_recommendations": integrated_data["recommendations"]["improvement_priorities"][:3]
    }
    
    # Save summary
    summary_path = "/workspace/data_analysis/enhanced_analysis_summary.json"
    try:
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        logger.info("Analysis summary saved successfully")
    except Exception as e:
        logger.error(f"Error saving summary: {e}")
    
    # Print results
    print("\n" + "="*70)
    print("ENHANCED GRAMMAR CONTENT ANALYSIS COMPLETED")
    print("="*70)
    print(f"📊 Total Grammar Topics Identified: {summary['total_grammar_topics']}")
    print(f"📚 Total Vocabulary Terms: {summary['total_vocabulary_terms']}")
    print(f"❓ Total Questions Analyzed: {summary['total_questions_analyzed']}")
    print(f"🎯 Curriculum Alignment: {summary['curriculum_alignment']:.1%}")
    print(f"🔤 Translation Quality: {summary['translation_quality']:.1%}")
    print(f"📖 Content Completeness: {summary['content_completeness']:.1%}")
    print(f"🏫 Grade Levels: {', '.join(summary['grade_levels'])}")
    print(f"📁 Enhanced Output Location: {output_path}")
    print("="*70)

if __name__ == "__main__":
    main()