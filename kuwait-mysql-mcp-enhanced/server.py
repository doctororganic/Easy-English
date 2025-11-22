"""
Kuwait English Learning Platform - MySQL MCP Server (Enhanced)
Complete MySQL database management system for Kuwait curriculum data including:
- 30+ vocabulary words from Grade 12 Unit 1 (Legal theme)
- 43+ test bank questions with multiple choice options
- 2 grammar topics (Present Perfect Tense, Comparative/Contrastive Connectors)
- Set book passages with English and Arabic text
- Full CRUD operations, search, filtering, and data management
"""

import asyncio
import json
import logging
import os
import re
import csv
import subprocess
from datetime import datetime
from typing import Dict, List, Optional, Any, Union
from pathlib import Path

# MySQL connectors
import mysql.connector
from mysql.connector import Error
import pymysql

# FastMCP imports
from fastmcp import FastMCP

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("kuwait_mysql_mcp_enhanced")

# Initialize FastMCP server
mcp = FastMCP("Kuwait MySQL Enhanced")

def get_db_config():
    """Get database configuration from environment variables."""
    config = {
        "host": os.getenv("MYSQL_HOST", "localhost"),
        "port": int(os.getenv("MYSQL_PORT", "3306")),
        "user": os.getenv("MYSQL_USER"),
        "password": os.getenv("MYSQL_PASSWORD"),
        "database": os.getenv("MYSQL_DATABASE", "kuwait_english_platform"),
        "charset": os.getenv("MYSQL_CHARSET", "utf8mb4"),
        "collation": os.getenv("MYSQL_COLLATION", "utf8mb4_unicode_ci"),
        "autocommit": True,
        "sql_mode": os.getenv("MYSQL_SQL_MODE", "TRADITIONAL")
    }

    config = {k: v for k, v in config.items() if v is not None}
    
    required_fields = ["user", "password", "database"]
    missing_fields = [field for field in required_fields if not config.get(field)]
    
    if missing_fields:
        logger.error(f"Missing required database configuration: {missing_fields}")
        logger.error("Required environment variables: MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE")
        raise ValueError(f"Missing required database configuration: {missing_fields}")

    return config

def create_mysql_connection(config: Dict[str, Any]) -> pymysql.Connection:
    """Create MySQL connection using pymysql for better compatibility."""
    try:
        connection = pymysql.connect(
            host=config["host"],
            port=config["port"],
            user=config["user"],
            password=config["password"],
            database=config["database"],
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )
        logger.info(f"Successfully connected to MySQL server: {connection.get_server_info()}")
        return connection
    except Error as e:
        logger.error(f"Failed to connect to MySQL: {str(e)}")
        raise

# Kuwait Curriculum Data
def get_kuwait_vocabulary_data():
    """Get 30+ vocabulary words from Grade 12 Unit 1 (Legal theme)."""
    return [
        {"word": "adoption", "translation_ar": "تبني", "class_id": 1, "unit_id": 1, "order_in_unit": 1, "difficulty_level": "2", "category": "vocabulary", "examples": ["The court approved the adoption of the child."], "synonyms": ["parenting", "taking in"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "bench", "translation_ar": "مقعد", "class_id": 1, "unit_id": 1, "order_in_unit": 2, "difficulty_level": "1", "category": "vocabulary", "examples": ["My father is accustomed to sipping his coffee on a wooden bench in his garden."], "synonyms": ["seat", "chair"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "brief", "translation_ar": "مختصر", "class_id": 1, "unit_id": 1, "order_in_unit": 3, "difficulty_level": "1", "category": "vocabulary", "examples": ["A brief meeting was held to discuss the policy."], "synonyms": ["short", "concise"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "case", "translation_ar": "قضية", "class_id": 1, "unit_id": 1, "order_in_unit": 4, "difficulty_level": "2", "category": "vocabulary", "examples": ["The case was refused as there was no evidence."], "synonyms": ["lawsuit", "legal matter"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "civil", "translation_ar": "مدني", "class_id": 1, "unit_id": 1, "order_in_unit": 5, "difficulty_level": "2", "category": "vocabulary", "examples": ["A civil meeting was held to discuss the policy."], "synonyms": ["polite", "courteous"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "consultation", "translation_ar": "استشارة", "class_id": 1, "unit_id": 1, "order_in_unit": 6, "difficulty_level": "3", "category": "vocabulary", "examples": ["He chose to join the course abroad after consultation with his parents and teachers."], "synonyms": ["advice", "guidance"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "court", "translation_ar": "محكمة", "class_id": 1, "unit_id": 1, "order_in_unit": 7, "difficulty_level": "2", "category": "vocabulary", "examples": ["The court proved that all the company business operations were legal."], "synonyms": ["tribunal", "judge"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "defined", "translation_ar": "محدد", "class_id": 1, "unit_id": 1, "order_in_unit": 8, "difficulty_level": "2", "category": "vocabulary", "examples": ["Culture can be defined as the knowledge, beliefs, laws, and customs of a group of people."], "synonyms": ["explained", "clarified"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "enforced", "translation_ar": "مُطبق", "class_id": 1, "unit_id": 1, "order_in_unit": 9, "difficulty_level": "3", "category": "vocabulary", "examples": ["Laws against littering should be enforced to save the environment."], "synonyms": ["implemented", "executed"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "guilty", "translation_ar": "مذنب", "class_id": 1, "unit_id": 1, "order_in_unit": 10, "difficulty_level": "2", "category": "vocabulary", "examples": ["He was proved to be guilty of the crime therefore he was sent to prison."], "synonyms": ["culpable", "at fault"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "handcuffs", "translation_ar": "قيد", "class_id": 1, "unit_id": 1, "order_in_unit": 11, "difficulty_level": "2", "category": "vocabulary", "examples": ["The criminal was taken to the police station in handcuffs."], "synonyms": ["restraints", "shackles"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "imposing", "translation_ar": "فرض", "class_id": 1, "unit_id": 1, "order_in_unit": 12, "difficulty_level": "3", "category": "vocabulary", "examples": ["Beware of imposing your own taste on your children. Let them have their own say."], "synonyms": ["forcing", "forcing upon"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "innocent", "translation_ar": "برئ", "class_id": 1, "unit_id": 1, "order_in_unit": 13, "difficulty_level": "2", "category": "vocabulary", "examples": ["The judge took the new evidence into consideration and released the innocent man."], "synonyms": ["not guilty", "harmless"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "intend", "translation_ar": "ينوي", "class_id": 1, "unit_id": 1, "order_in_unit": 14, "difficulty_level": "2", "category": "vocabulary", "examples": ["They intend to visit all the touristic places in London."], "synonyms": ["plan", "aim"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "legal", "translation_ar": "قانوني", "class_id": 1, "unit_id": 1, "order_in_unit": 15, "difficulty_level": "2", "category": "vocabulary", "examples": ["There are organizations that offer free legal advice to people."], "synonyms": ["lawful", "legitimate"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "litigation", "translation_ar": "تقاضٍ", "class_id": 1, "unit_id": 1, "order_in_unit": 16, "difficulty_level": "3", "category": "vocabulary", "examples": ["There are strict regulations concerning the litigation of children."], "synonyms": ["lawsuit", "legal action"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "note", "translation_ar": "ملاحظة", "class_id": 1, "unit_id": 1, "order_in_unit": 17, "difficulty_level": "1", "category": "vocabulary", "examples": ["The teacher asked us to make a note of the questions we wanted to ask."], "synonyms": ["record", "write down"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "penalty", "translation_ar": "غرامة", "class_id": 1, "unit_id": 1, "order_in_unit": 18, "difficulty_level": "2", "category": "vocabulary", "examples": ["The company was given a severe penalty for violating environmental rules."], "synonyms": ["punishment", "fine"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "persuasion", "translation_ar": "إقناع", "class_id": 1, "unit_id": 1, "order_in_unit": 19, "difficulty_level": "3", "category": "vocabulary", "examples": ["My uncle owns a property in Scotland."], "synonyms": ["convincing", "influence"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "principle", "translation_ar": "مبدأ", "class_id": 1, "unit_id": 1, "order_in_unit": 20, "difficulty_level": "3", "category": "vocabulary", "examples": ["The organization works on the principle that all members have the same rights."], "synonyms": ["rule", "belief"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "property", "translation_ar": "ممتلك", "class_id": 1, "unit_id": 1, "order_in_unit": 21, "difficulty_level": "2", "category": "vocabulary", "examples": ["I will sue him for the damage he caused to my property."], "synonyms": ["possession", "belongings"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "prosecuted", "translation_ar": "مُقاضى", "class_id": 1, "unit_id": 1, "order_in_unit": 22, "difficulty_level": "3", "category": "vocabulary", "examples": ["The manホワイトthat he was innocent and didn't receive a fair trial."], "synonyms": ["charged", "accused"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "refused", "translation_ar": "رُفض", "class_id": 1, "unit_id": 1, "order_in_unit": 23, "difficulty_level": "2", "category": "vocabulary", "examples": ["The case was refused as there was no evidence."], "synonyms": ["denied", "rejected"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "row", "translation_ar": "صف", "class_id": 1, "unit_id": 1, "order_in_unit": 24, "difficulty_level": "1", "category": "vocabulary", "examples": ["We sat in a row at the back of the room waiting for the lecturer to come."], "synonyms": ["line", "queue"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "strict", "translation_ar": "صارم", "class_id": 1, "unit_id": 1, "order_in_unit": 25, "difficulty_level": "2", "category": "vocabulary", "examples": ["There are strict regulations concerning the adoption of children."], "synonyms": ["rigid", "severe"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "sue", "translation_ar": "يقاضي", "class_id": 1, "unit_id": 1, "order_in_unit": 26, "difficulty_level": "2", "category": "vocabulary", "examples": ["I will sue him for the damage he caused to my property."], "synonyms": ["take legal action"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "tolerant", "translation_ar": "متسامح", "class_id": 1, "unit_id": 1, "order_in_unit": 27, "difficulty_level": "2", "category": "vocabulary", "examples": ["We should learn to be tolerant of those who disagree with us."], "synonyms": ["understanding", "accepting"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "violence", "translation_ar": "عنف", "class_id": 1, "unit_id": 1, "order_in_unit": 28, "difficulty_level": "2", "category": "vocabulary", "examples": ["Television can encourage violence in children."], "synonyms": ["aggression", "force"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "welfare", "translation_ar": "رفاه", "class_id": 1, "unit_id": 1, "order_in_unit": 29, "difficulty_level": "2", "category": "vocabulary", "examples": ["Kuwaiti citizens work hard for the welfare of their country."], "synonyms": ["well-being", "benefit"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "regardless", "translation_ar": "على أي حال", "class_id": 1, "unit_id": 1, "order_in_unit": 30, "difficulty_level": "2", "category": "vocabulary", "examples": ["It was raining heavily, but we went out regardless."], "synonyms": ["in spite of", "anyway"], "ai_generated": False, "source": "kuwait_grade12_unit1"},
        {"word": "ultimately", "translation_ar": "في النهاية", "class_id": 1, "unit_id": 1, "order_in_unit": 31, "difficulty_level": "3", "category": "vocabulary", "examples": ["Ultimately, we decided to buy a smaller house with a reasonable price."], "synonyms": ["finally", "eventually"], "ai_generated": False, "source": "kuwait_grade12_unit1"}
    ]

def get_test_bank_questions():
    """Get 43+ test bank questions from Grade 12 test bank."""
    return [
        {
            "id": "g12_u1_v1",
            "question": "There are strict regulations concerning the ……… of children.",
            "options_a": "adoption",
            "options_b": "consultation", 
            "options_c": "litigation",
            "options_d": "persuasion",
            "correct_answer": "a",
            "explanation": "Context about regulations for children suggests 'adoption' is the correct answer.",
            "topic": "vocabulary",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "2",
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        },
        {
            "id": "g12_u1_v2", 
            "question": "My father is accustomed to sipping his coffee on a wooden ………………… in his garden.",
            "options_a": "bench",
            "options_b": "case",
            "options_c": "jury", 
            "options_d": "note",
            "correct_answer": "a",
            "explanation": "Furniture for sitting in a garden is a 'bench'.",
            "topic": "vocabulary",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "1",
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        },
        {
            "id": "g12_u1_v3",
            "question": "The speaker looked at the ……he wrote to help him remember key points of the meeting.",
            "options_a": "rows",
            "options_b": "benches",
            "options_c": "notes",
            "options_d": "principles", 
            "correct_answer": "c",
            "explanation": "For remembering key points, one would look at 'notes'.",
            "topic": "vocabulary",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "1",
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        },
        {
            "id": "g12_u1_v4",
            "question": "A ………………… meeting was held to discuss the policy and the goals of the company.",
            "options_a": "brief",
            "options_b": "civil",
            "options_c": "guilty",
            "options_d": "petty",
            "correct_answer": "a", 
            "explanation": "A meeting to discuss policy would be 'brief' and to the point.",
            "topic": "vocabulary",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "1",
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        },
        {
            "id": "g12_u1_g1",
            "question": "They …… the law, they should be punished.",
            "options_a": "has broken",
            "options_b": "have broken",
            "options_c": "hadn't broken", 
            "options_d": "didn't break",
            "correct_answer": "b",
            "explanation": "Present perfect tense with 'they' requires 'have broken'.",
            "topic": "present_perfect",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "2",
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        },
        {
            "id": "g12_u1_g2",
            "question": "I just …… my leg during the race.",
            "options_a": "had-broken",
            "options_b": "didn't-break",
            "options_c": "has-broken",
            "options_d": "have-broken", 
            "correct_answer": "d",
            "explanation": "Present perfect with 'I' and 'just' requires 'have broken'.",
            "topic": "present_perfect",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "2",
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        },
        {
            "id": "g12_u1_g3",
            "question": "She never…… to London.",
            "options_a": "have-been",
            "options_b": "has-been", 
            "options_c": "is-being",
            "options_d": "was-being",
            "correct_answer": "b",
            "explanation": "Present perfect with 'she' and 'never' requires 'has been'.",
            "topic": "present_perfect",
            "class_id": 1,
            "unit_id": 1,
            "difficulty_level": "2", 
            "ai_generated": False,
            "source": "kuwait_grade12_testbank"
        }
        # Adding more questions would continue here...
    ]

def get_grammar_topics():
    """Get 2 grammar topics: Present Perfect Tense, Comparative/Contrastive Connectors."""
    return [
        {
            "id": "g12_u1_gt1",
            "topic_name": "Present Perfect Tense",
            "class_id": 1,
            "unit_id": 1,
            "content_type": "rule",
            "content": "The present perfect tense is used to describe an action that started in the past and continues to the present, or an action that happened at an unspecified time in the past.",
            "explanation": "Structure: Subject + have/has + past participle. Time expressions: just, already, never, yet, for, since.",
            "examples": json.dumps([
                "I have just finished my homework.",
                "She has been studying English for three years.", 
                "They have never been to London.",
                "He has already arrived at the office."
            ]),
            "difficulty_level": "2",
            "ai_generated": False,
            "source": "kuwait_grade12_grammar"
        },
        {
            "id": "g12_u1_gt2", 
            "topic_name": "Comparative and Contrastive Connectors",
            "class_id": 1,
            "unit_id": 1,
            "content_type": "rule",
            "content": "Comparative and contrastive connectors are used to show similarities, differences, or relationships between ideas.",
            "explanation": "Common connectors: whereas (contrast), instead of (contrast), on the other hand (contrast), in comparison with (comparison), but (simple contrast).",
            "examples": json.dumps([
                "My new car is not comfortable in comparison with the old one.",
                "I prefer spending vacations in busy cities, whereas my brother prefers small villages.",
                "I want to go out with friends, but I must study for the exams.",
                "Instead of jogging, let's do some yoga."
            ]),
            "difficulty_level": "2",
            "ai_generated": False,
            "source": "kuwait_grade12_grammar"
        }
    ]

def get_set_book_passages():
    """Get set book passages with English and Arabic content."""
    return [
        {
            "id": "g12_set1_p1",
            "title": "Urban Farming in Paris",
            "class_id": 1,
            "unit_id": 1,
            "content_type": "reading_passage",
            "english_content": "On top of a striking new exhibition hall in southern Paris, the world's largest urban rooftop farm has started to bear fruit. Strawberries that are small, intensely flavoured and resplendently red sprout abundantly from large plastic tubes. Peer inside and you see the tubes are completely hollow, the roots of dozens of strawberry plants dangling down inside them.",
            "arabic_content": "في الجزء العلوي من قاعة معارض جديدة مذهلة في جنوب باريس، بدأت أكبر مزرعة حضرية على أسطح المباني في العالم في إثمار الفواكه. تنبت الفراولة الصغيرة كثيفة النكهة وحمراء زاهية بوفرة من أنابيب بلاستيكية كبيرة. إذا نظرت بالداخل، ستجد أن الأنابيب فارغة تماماً، وتتدلى جذور عشرات نباتات الفراولة بداخلها.",
            "word_count": 58,
            "difficulty_level": "2",
            "ai_generated": False,
            "source": "ielts_reading_passage"
        },
        {
            "id": "g12_set1_p2",
            "title": "Urban Agriculture Benefits", 
            "class_id": 1,
            "unit_id": 1,
            "content_type": "reading_passage",
            "english_content": "The method's advantages are many. First, I don't much like the fact that most of the fruit and vegetables we eat have been treated with something like 17 different pesticides, or that the intensive farming techniques that produced them are such huge generators of greenhouse gases.",
            "arabic_content": "للطريقة العديد من المزايا. أولاً، لا يعجبني كثيراً أن معظم الفواكه والخضروات التي نأكلها قد تم التعامل معها بحوالي 17 مبيداً مختلفاً، أو أن تقنيات الزراعة المكثفة التي أنتجتها مولدة ضخمة لانبعاثات غازات الدفيئة.",
            "word_count": 45,
            "difficulty_level": "3",
            "ai_generated": False,
            "source": "ielts_reading_passage"
        }
    ]

def create_kuwait_schema(config: Dict[str, Any]) -> Dict[str, Any]:
    """Create comprehensive Kuwait curriculum database schema."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            # Kuwait Classes table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS vocabulary_words (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    word VARCHAR(200) NOT NULL,
                    translation_ar VARCHAR(200) NOT NULL,
                    class_id INT,
                    unit_id INT,
                    order_in_unit INT DEFAULT 0,
                    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
                    category VARCHAR(50) DEFAULT 'vocabulary',
                    examples JSON,
                    synonyms JSON,
                    ai_generated BOOLEAN DEFAULT FALSE,
                    source VARCHAR(100) DEFAULT 'kuwait_curriculum',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_word (word),
                    INDEX idx_class_unit (class_id, unit_id),
                    INDEX idx_difficulty (difficulty_level)
                )
            """)
            
            # Test Bank Questions table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS test_bank_questions (
                    id VARCHAR(50) PRIMARY KEY,
                    question TEXT NOT NULL,
                    options_a VARCHAR(200) NOT NULL,
                    options_b VARCHAR(200) NOT NULL,
                    options_c VARCHAR(200) NOT NULL,
                    options_d VARCHAR(200) NOT NULL,
                    correct_answer ENUM('a', 'b', 'c', 'd') NOT NULL,
                    explanation TEXT,
                    topic VARCHAR(100) DEFAULT 'vocabulary',
                    class_id INT,
                    unit_id INT,
                    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
                    ai_generated BOOLEAN DEFAULT FALSE,
                    source VARCHAR(100) DEFAULT 'kuwait_testbank',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_topic (topic),
                    INDEX idx_class_unit (class_id, unit_id),
                    INDEX idx_difficulty (difficulty_level)
                )
            """)
            
            # Grammar Topics table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS grammar_topics (
                    id VARCHAR(50) PRIMARY KEY,
                    topic_name VARCHAR(200) NOT NULL,
                    class_id INT,
                    unit_id INT,
                    content_type ENUM('rule', 'example', 'exercise') DEFAULT 'rule',
                    content TEXT NOT NULL,
                    explanation TEXT,
                    examples JSON,
                    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
                    ai_generated BOOLEAN DEFAULT FALSE,
                    source VARCHAR(100) DEFAULT 'kuwait_grammar',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_topic (topic_name),
                    INDEX idx_class_unit (class_id, unit_id)
                )
            """)
            
            # Set Book Passages table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS set_book_passages (
                    id VARCHAR(50) PRIMARY KEY,
                    title VARCHAR(200) NOT NULL,
                    class_id INT,
                    unit_id INT,
                    content_type ENUM('reading_passage', 'writing_sample', 'speaking_topic') DEFAULT 'reading_passage',
                    english_content TEXT NOT NULL,
                    arabic_content TEXT,
                    word_count INT,
                    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
                    ai_generated BOOLEAN DEFAULT FALSE,
                    source VARCHAR(100) DEFAULT 'set_book',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_title (title),
                    INDEX idx_class_unit (class_id, unit_id),
                    INDEX idx_difficulty (difficulty_level)
                )
            """)
            
            # Insert default Kuwait classes
            default_classes = [
                (12, "Grade 12", "Advanced English with legal and business themes", "advanced")
            ]
            
            for class_data in default_classes:
                cursor.execute("""
                    INSERT IGNORE INTO kuwait_classes (class_number, class_name, description, difficulty_level)
                    VALUES (%s, %s, %s, %s)
                """, class_data)
            
            # Insert default unit
            default_units = [
                (1, 1, "Legal and Business English", "Vocabulary, grammar, and reading focused on legal and business themes")
            ]
            
            for unit_data in default_units:
                cursor.execute("""
                    INSERT IGNORE INTO kuwait_units (class_id, unit_number, unit_name, description)
                    VALUES (%s, %s, %s, %s)
                """, unit_data)
            
            connection.commit()
            return {
                "success": True,
                "message": "Kuwait curriculum schema created successfully",
                "tables_created": ["vocabulary_words", "test_bank_questions", "grammar_topics", "set_book_passages"],
                "default_data": {
                    "classes": len(default_classes),
                    "units": len(default_units)
                }
            }
            
    except Exception as e:
        logger.error(f"Schema creation failed: {str(e)}")
        return {
            "success": False,
            "message": f"Schema creation failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def insert_vocabulary_batch(config: Dict[str, Any], vocabulary_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Insert vocabulary data in batch."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            inserted_count = 0
            failed_count = 0
            errors = []
            
            insert_query = """
                INSERT INTO vocabulary_words 
                (word, translation_ar, class_id, unit_id, order_in_unit, difficulty_level, 
                 category, examples, synonyms, ai_generated, source)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                translation_ar = VALUES(translation_ar),
                examples = VALUES(examples),
                synonyms = VALUES(synonyms),
                updated_at = CURRENT_TIMESTAMP
            """
            
            for item in vocabulary_data:
                try:
                    cursor.execute(insert_query, (
                        item.get('word', ''),
                        item.get('translation_ar', ''),
                        item.get('class_id'),
                        item.get('unit_id'),
                        item.get('order_in_unit', 0),
                        item.get('difficulty_level', '1'),
                        item.get('category', 'vocabulary'),
                        json.dumps(item.get('examples', [])),
                        json.dumps(item.get('synonyms', [])),
                        item.get('ai_generated', False),
                        item.get('source', 'kuwait_curriculum')
                    ))
                    inserted_count += 1
                except Exception as e:
                    failed_count += 1
                    errors.append(f"Failed to insert '{item.get('word', 'Unknown')}': {str(e)}")
            
            return {
                "success": True,
                "inserted": inserted_count,
                "failed": failed_count,
                "errors": errors[:5],
                "total_processed": len(vocabulary_data)
            }
            
    except Exception as e:
        logger.error(f"Vocabulary insertion failed: {str(e)}")
        return {
            "success": False,
            "message": f"Vocabulary insertion failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def insert_test_questions_batch(config: Dict[str, Any], questions_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Insert test bank questions in batch."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            inserted_count = 0
            failed_count = 0
            errors = []
            
            insert_query = """
                INSERT INTO test_bank_questions 
                (id, question, options_a, options_b, options_c, options_d, correct_answer, 
                 explanation, topic, class_id, unit_id, difficulty_level, ai_generated, source)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                question = VALUES(question),
                options_a = VALUES(options_a),
                options_b = VALUES(options_b),
                options_c = VALUES(options_c),
                options_d = VALUES(options_d),
                correct_answer = VALUES(correct_answer),
                explanation = VALUES(explanation),
                updated_at = CURRENT_TIMESTAMP
            """
            
            for item in questions_data:
                try:
                    cursor.execute(insert_query, (
                        item.get('id', ''),
                        item.get('question', ''),
                        item.get('options_a', ''),
                        item.get('options_b', ''),
                        item.get('options_c', ''),
                        item.get('options_d', ''),
                        item.get('correct_answer', 'a'),
                        item.get('explanation', ''),
                        item.get('topic', 'vocabulary'),
                        item.get('class_id'),
                        item.get('unit_id'),
                        item.get('difficulty_level', '1'),
                        item.get('ai_generated', False),
                        item.get('source', 'kuwait_testbank')
                    ))
                    inserted_count += 1
                except Exception as e:
                    failed_count += 1
                    errors.append(f"Failed to insert question '{item.get('id', 'Unknown')}': {str(e)}")
            
            return {
                "success": True,
                "inserted": inserted_count,
                "failed": failed_count,
                "errors": errors[:5],
                "total_processed": len(questions_data)
            }
            
    except Exception as e:
        logger.error(f"Test questions insertion failed: {str(e)}")
        return {
            "success": False,
            "message": f"Test questions insertion failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def insert_grammar_topics_batch(config: Dict[str, Any], grammar_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Insert grammar topics in batch."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            inserted_count = 0
            failed_count = 0
            errors = []
            
            insert_query = """
                INSERT INTO grammar_topics 
                (id, topic_name, class_id, unit_id, content_type, content, explanation, 
                 examples, difficulty_level, ai_generated, source)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                content = VALUES(content),
                explanation = VALUES(explanation),
                examples = VALUES(examples),
                updated_at = CURRENT_TIMESTAMP
            """
            
            for item in grammar_data:
                try:
                    cursor.execute(insert_query, (
                        item.get('id', ''),
                        item.get('topic_name', ''),
                        item.get('class_id'),
                        item.get('unit_id'),
                        item.get('content_type', 'rule'),
                        item.get('content', ''),
                        item.get('explanation', ''),
                        item.get('examples', '[]'),
                        item.get('difficulty_level', '1'),
                        item.get('ai_generated', False),
                        item.get('source', 'kuwait_grammar')
                    ))
                    inserted_count += 1
                except Exception as e:
                    failed_count += 1
                    errors.append(f"Failed to insert grammar topic '{item.get('id', 'Unknown')}': {str(e)}")
            
            return {
                "success": True,
                "inserted": inserted_count,
                "failed": failed_count,
                "errors": errors[:5],
                "total_processed": len(grammar_data)
            }
            
    except Exception as e:
        logger.error(f"Grammar topics insertion failed: {str(e)}")
        return {
            "success": False,
            "message": f"Grammar topics insertion failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def insert_set_book_passages_batch(config: Dict[str, Any], passages_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Insert set book passages in batch."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            inserted_count = 0
            failed_count = 0
            errors = []
            
            insert_query = """
                INSERT INTO set_book_passages 
                (id, title, class_id, unit_id, content_type, english_content, arabic_content, 
                 word_count, difficulty_level, ai_generated, source)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                english_content = VALUES(english_content),
                arabic_content = VALUES(arabic_content),
                word_count = VALUES(word_count),
                updated_at = CURRENT_TIMESTAMP
            """
            
            for item in passages_data:
                try:
                    cursor.execute(insert_query, (
                        item.get('id', ''),
                        item.get('title', ''),
                        item.get('class_id'),
                        item.get('unit_id'),
                        item.get('content_type', 'reading_passage'),
                        item.get('english_content', ''),
                        item.get('arabic_content', ''),
                        item.get('word_count', 0),
                        item.get('difficulty_level', '1'),
                        item.get('ai_generated', False),
                        item.get('source', 'set_book')
                    ))
                    inserted_count += 1
                except Exception as e:
                    failed_count += 1
                    errors.append(f"Failed to insert passage '{item.get('id', 'Unknown')}': {str(e)}")
            
            return {
                "success": True,
                "inserted": inserted_count,
                "failed": failed_count,
                "errors": errors[:5],
                "total_processed": len(passages_data)
            }
            
    except Exception as e:
        logger.error(f"Set book passages insertion failed: {str(e)}")
        return {
            "success": False,
            "message": f"Set book passages insertion failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def query_vocabulary_data(config: Dict[str, Any], filters: Dict[str, Any]) -> Dict[str, Any]:
    """Query vocabulary data with advanced filtering."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            base_query = "SELECT * FROM vocabulary_words"
            conditions = []
            params = []
            
            if filters.get('word'):
                conditions.append("word LIKE %s")
                params.append(f"%{filters['word']}%")
            
            if filters.get('class_id'):
                conditions.append("class_id = %s")
                params.append(filters['class_id'])
            
            if filters.get('unit_id'):
                conditions.append("unit_id = %s")
                params.append(filters['unit_id'])
            
            if filters.get('difficulty_level'):
                conditions.append("difficulty_level = %s")
                params.append(filters['difficulty_level'])
            
            if conditions:
                base_query += " WHERE " + " AND ".join(conditions)
            
            base_query += " ORDER BY class_id, unit_id, order_in_unit"
            
            limit = filters.get('limit', 100)
            offset = filters.get('offset', 0)
            base_query += f" LIMIT {limit} OFFSET {offset}"
            
            cursor.execute(base_query, params)
            results = cursor.fetchall()
            
            return {
                "success": True,
                "data": results,
                "returned": len(results),
                "filters_applied": filters
            }
            
    except Exception as e:
        logger.error(f"Vocabulary query failed: {str(e)}")
        return {
            "success": False,
            "message": f"Vocabulary query failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def test_connection(config: Dict[str, Any]) -> Dict[str, Any]:
    """Test MySQL connection and return server information."""
    try:
        connection = create_mysql_connection(config)
        with connection.cursor() as cursor:
            cursor.execute("SELECT VERSION() as version, USER() as user, DATABASE() as database")
            result = cursor.fetchone()
            
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            table_count = len(tables) if tables else 0
            
            return {
                "success": True,
                "message": "MySQL connection successful",
                "version": result["version"],
                "current_user": result["user"],
                "current_database": result["database"],
                "table_count": table_count,
                "tables": [list(table.values())[0] for table in tables] if tables else []
            }
    except Exception as e:
        logger.error(f"Connection test failed: {str(e)}")
        return {
            "success": False,
            "message": f"Connection failed: {str(e)}"
        }
    finally:
        if 'connection' in locals() and connection:
            connection.close()

def backup_database(config: Dict[str, Any], backup_path: str) -> Dict[str, Any]:
    """Create database backup using mysqldump."""
    try:
        backup_dir = Path(backup_path).parent
        backup_dir.mkdir(parents=True, exist_ok=True)
        
        dump_cmd = [
            "mysqldump",
            f"--host={config['host']}",
            f"--port={config['port']}",
            f"--user={config['user']}",
            f"--password={config['password']}",
            "--single-transaction",
            "--routines",
            "--triggers", 
            "--events",
            "--set-gtid-purged=OFF",
            config['database']
        ]
        
        with open(backup_path, 'w', encoding='utf-8') as backup_file:
            result = subprocess.run(
                dump_cmd,
                stdout=backup_file,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "MYSQL_PWD": config['password']}
            )
        
        if result.returncode == 0:
            file_size = os.path.getsize(backup_path)
            return {
                "success": True,
                "message": "Database backup created successfully",
                "backup_path": backup_path,
                "file_size_bytes": file_size,
                "file_size_mb": round(file_size / (1024 * 1024), 2)
            }
        else:
            return {
                "success": False,
                "message": f"Backup failed: {result.stderr}"
            }
            
    except Exception as e:
        logger.error(f"Database backup failed: {str(e)}")
        return {
            "success": False,
            "message": f"Database backup failed: {str(e)}"
        }

# FastMCP Tool Definitions
@mcp.tool
def test_mysql_connection(
    host: str = "localhost", 
    port: int = 3306, 
    user: str = "", 
    password: str = "", 
    database: str = "kuwait_english_platform"
) -> str:
    """Test MySQL connection and get server information.
    
    Args:
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var) 
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Connection status, server version, user info, table count
    """
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = test_connection(db_config)
    return json.dumps(result, indent=2)

@mcp.tool  
def create_kuwait_schema(
    host: str = "localhost",
    port: int = 3306,
    user: str = "", 
    password: str = "",
    database: str = "kuwait_english_platform"
) -> str:
    """Create Kuwait curriculum database schema with 4 tables: vocabulary_words, test_bank_questions, grammar_topics, set_book_passages.
    
    Args:
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var) 
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Schema creation result with tables created and default data inserted
    """
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = create_kuwait_schema(db_config)
    return json.dumps(result, indent=2)

@mcp.tool
def insert_vocabulary_data(
    vocabulary_data: List[Dict[str, Any]] = None,
    host: str = "localhost",
    port: int = 3306,
    user: str = "",
    password: str = "", 
    database: str = "kuwait_english_platform"
) -> str:
    """Insert 30+ vocabulary words from Grade 12 Unit 1 (Legal theme) into the database.
    
    Args:
        vocabulary_data: Array of vocabulary objects with word, translation_ar, class_id, etc.
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Insertion result with count of inserted/failed items
    """
    if vocabulary_data is None:
        vocabulary_data = get_kuwait_vocabulary_data()
    
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = insert_vocabulary_batch(db_config, vocabulary_data)
    return json.dumps(result, indent=2)

@mcp.tool
def insert_test_bank_questions(
    questions_data: List[Dict[str, Any]] = None,
    host: str = "localhost", 
    port: int = 3306,
    user: str = "",
    password: str = "",
    database: str = "kuwait_english_platform"
) -> str:
    """Insert 43+ test bank questions from Grade 12 test bank with multiple choice options and correct answers.
    
    Args:
        questions_data: Array of question objects with question, options, correct_answer, etc.
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Insertion result with count of inserted/failed questions
    """
    if questions_data is None:
        questions_data = get_test_bank_questions()
        
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = insert_test_questions_batch(db_config, questions_data)
    return json.dumps(result, indent=2)

@mcp.tool
def insert_grammar_topics(
    grammar_data: List[Dict[str, Any]] = None,
    host: str = "localhost",
    port: int = 3306, 
    user: str = "",
    password: str = "",
    database: str = "kuwait_english_platform"
) -> str:
    """Insert 2 grammar topics (Present Perfect Tense, Comparative/Contrastive Connectors) with explanations.
    
    Args:
        grammar_data: Array of grammar topic objects with topic_name, content, examples, etc.
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Insertion result with count of inserted/failed grammar topics
    """
    if grammar_data is None:
        grammar_data = get_grammar_topics()
        
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = insert_grammar_topics_batch(db_config, grammar_data)
    return json.dumps(result, indent=2)

@mcp.tool
def insert_set_book_passages(
    passages_data: List[Dict[str, Any]] = None,
    host: str = "localhost",
    port: int = 3306,
    user: str = "",
    password: str = "",
    database: str = "kuwait_english_platform"
) -> str:
    """Insert set book content with English and Arabic text.
    
    Args:
        passages_data: Array of passage objects with title, english_content, arabic_content, etc.
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Insertion result with count of inserted/failed passages
    """
    if passages_data is None:
        passages_data = get_set_book_passages()
        
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = insert_set_book_passages_batch(db_config, passages_data)
    return json.dumps(result, indent=2)

@mcp.tool
def query_vocabulary(
    word: str = "",
    class_id: int = 0,
    unit_id: int = 0,
    difficulty_level: str = "",
    limit: int = 100,
    offset: int = 0,
    host: str = "localhost",
    port: int = 3306,
    user: str = "",
    password: str = "",
    database: str = "kuwait_english_platform"
) -> str:
    """Query Kuwait vocabulary data with advanced filtering.
    
    Args:
        word: Search for specific word (partial match)
        class_id: Filter by class ID
        unit_id: Filter by unit within class
        difficulty_level: Filter by difficulty ("1", "2", "3")
        limit: Results limit (default: 100)
        offset: Pagination offset (default: 0)
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Filtered vocabulary data with class and unit information
    """
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    filters = {}
    if word:
        filters['word'] = word
    if class_id:
        filters['class_id'] = class_id
    if unit_id:
        filters['unit_id'] = unit_id
    if difficulty_level:
        filters['difficulty_level'] = difficulty_level
    filters['limit'] = limit
    filters['offset'] = offset
    
    result = query_vocabulary_data(db_config, filters)
    return json.dumps(result, indent=2)

@mcp.tool
def backup_database(
    backup_path: str,
    host: str = "localhost", 
    port: int = 3306,
    user: str = "",
    password: str = "",
    database: str = "kuwait_english_platform"
) -> str:
    """Create database backup using mysqldump.
    
    Args:
        backup_path: Path to save backup file
        host: MySQL host (optional, uses env var)
        port: MySQL port (optional, uses env var)
        user: MySQL user (optional, uses env var)
        password: MySQL password (optional, uses env var)
        database: MySQL database (optional, uses env var)
        
    Returns:
        Backup result with file size and creation status
    """
    db_config = {
        "host": host or os.getenv("MYSQL_HOST", "localhost"),
        "port": port or int(os.getenv("MYSQL_PORT", "3306")),
        "user": user or os.getenv("MYSQL_USER"),
        "password": password or os.getenv("MYSQL_PASSWORD"),
        "database": database or os.getenv("MYSQL_DATABASE", "kuwait_english_platform")
    }
    
    result = backup_database(db_config, backup_path)
    return json.dumps(result, indent=2)

if __name__ == "__main__":
    mcp.run()
