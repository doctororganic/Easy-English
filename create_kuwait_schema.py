#!/usr/bin/env python3
"""
Kuwait Secondary School Database Schema Creator
Creates comprehensive database schema for Classes 10-12 with Units and Vocabulary relationships
"""

import requests
import json
from datetime import datetime

# Supabase Configuration
SUPABASE_URL = "https://hkljprwxvdoxorhcbvpo.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"

headers = {
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def create_table(table_name: str, schema_sql: str) -> bool:
    """Create a table using Supabase REST API"""
    try:
        # Create table using SQL function approach
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
            headers=headers,
            json={"query": schema_sql}
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ Successfully created table: {table_name}")
            return True
        else:
            print(f"❌ Failed to create {table_name}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error creating {table_name}: {str(e)}")
        return False

def create_kuwait_schema():
    """Create the complete Kuwait Secondary School database schema"""
    
    print("🚀 Starting Kuwait Secondary School Database Schema Creation...")
    print("="*60)
    
    # Kuwait Classes Table
    kuwait_classes_sql = """
    CREATE TABLE IF NOT EXISTS kuwait_classes (
        id SERIAL PRIMARY KEY,
        class_number INTEGER NOT NULL CHECK (class_number IN (10, 11, 12)),
        class_name_en TEXT NOT NULL,
        class_name_ar TEXT NOT NULL,
        description TEXT,
        academic_year TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_kuwait_classes_number ON kuwait_classes(class_number);
    CREATE INDEX IF NOT EXISTS idx_kuwait_classes_active ON kuwait_classes(is_active);
    """
    
    # Kuwait Units Table  
    kuwait_units_sql = """
    CREATE TABLE IF NOT EXISTS kuwait_units (
        id SERIAL PRIMARY KEY,
        class_id INTEGER NOT NULL,
        unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 12),
        unit_name_en TEXT NOT NULL,
        unit_name_ar TEXT NOT NULL,
        description_en TEXT,
        description_ar TEXT,
        theme TEXT,
        difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
        order_index INTEGER DEFAULT 0,
        estimated_hours INTEGER DEFAULT 2,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_kuwait_units_class ON kuwait_units(class_id);
    CREATE INDEX IF NOT EXISTS idx_kuwait_units_number ON kuwait_units(class_id, unit_number);
    CREATE INDEX IF NOT EXISTS idx_kuwait_units_order ON kuwait_units(order_index);
    CREATE INDEX IF NOT EXISTS idx_kuwait_units_published ON kuwait_units(is_published);
    """
    
    # Kuwait Vocabulary Table (Enhanced vocabulary linked to classes and units)
    kuwait_vocabulary_sql = """
    CREATE TABLE IF NOT EXISTS kuwait_vocabulary (
        id SERIAL PRIMARY KEY,
        unit_id INTEGER,
        original_vocabulary_id INTEGER,
        word TEXT NOT NULL,
        arabic_translation TEXT,
        phonetic TEXT,
        difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
        category TEXT,
        subcategory TEXT,
        usage_example_en TEXT,
        usage_example_ar TEXT,
        audio_url TEXT,
        image_url TEXT,
        grammar_info JSONB,
        synonyms JSONB,
        antonyms JSONB,
        related_words JSONB,
        is_core_vocabulary BOOLEAN DEFAULT true,
        practice_count INTEGER DEFAULT 0,
        mastery_score DECIMAL(3,2) DEFAULT 0.00 CHECK (mastery_score BETWEEN 0 AND 1),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_unit ON kuwait_vocabulary(unit_id);
    CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_original ON kuwait_vocabulary(original_vocabulary_id);
    CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_word ON kuwait_vocabulary(word);
    CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_difficulty ON kuwait_vocabulary(difficulty_level);
    CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_mastery ON kuwait_vocabulary(mastery_score);
    CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_category ON kuwait_vocabulary(category);
    """
    
    # Grammar Content Table (for extracted PDF content)
    grammar_content_sql = """
    CREATE TABLE IF NOT EXISTS grammar_content (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content_text TEXT NOT NULL,
        source_page INTEGER,
        source_file TEXT,
        grammar_category TEXT,
        subcategory TEXT,
        grammar_rule TEXT,
        difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
        topic_tags JSONB,
        is_ai_generated BOOLEAN DEFAULT false,
        review_status TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_grammar_content_category ON grammar_content(grammar_category);
    CREATE INDEX IF NOT EXISTS idx_grammar_content_difficulty ON grammar_content(difficulty_level);
    CREATE INDEX IF NOT EXISTS idx_grammar_content_page ON grammar_content(source_page);
    CREATE INDEX IF NOT EXISTS idx_grammar_content_status ON grammar_content(review_status);
    """
    
    # Grammar Questions Table
    grammar_questions_sql = """
    CREATE TABLE IF NOT EXISTS grammar_questions (
        id SERIAL PRIMARY KEY,
        grammar_content_id INTEGER,
        unit_id INTEGER,
        question_text TEXT NOT NULL,
        question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'fill_blank', 'error_correction', 'sentence_transformation', 'usage_example')),
        correct_answer TEXT,
        options JSONB,
        explanation_en TEXT,
        explanation_ar TEXT,
        difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
        points INTEGER DEFAULT 1,
        estimated_time_seconds INTEGER DEFAULT 60,
        question_tags JSONB,
        ai_generated BOOLEAN DEFAULT false,
        review_status TEXT DEFAULT 'draft' CHECK (review_status IN ('draft', 'approved', 'rejected')),
        usage_count INTEGER DEFAULT 0,
        accuracy_rate DECIMAL(3,2) DEFAULT 0.00 CHECK (accuracy_rate BETWEEN 0 AND 1),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_grammar_questions_content ON grammar_questions(grammar_content_id);
    CREATE INDEX IF NOT EXISTS idx_grammar_questions_unit ON grammar_questions(unit_id);
    CREATE INDEX IF NOT EXISTS idx_grammar_questions_type ON grammar_questions(question_type);
    CREATE INDEX IF NOT EXISTS idx_grammar_questions_difficulty ON grammar_questions(difficulty_level);
    CREATE INDEX IF NOT EXISTS idx_grammar_questions_status ON grammar_questions(review_status);
    """
    
    # User Progress Tracking Table
    user_progress_sql = """
    CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        vocabulary_id INTEGER,
        question_id INTEGER,
        unit_id INTEGER,
        class_id INTEGER,
        progress_type TEXT NOT NULL CHECK (progress_type IN ('vocabulary_practice', 'grammar_quiz', 'unit_completion')),
        status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
        score DECIMAL(3,2) DEFAULT 0.00 CHECK (score BETWEEN 0 AND 1),
        attempts INTEGER DEFAULT 0,
        time_spent_minutes INTEGER DEFAULT 0,
        last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_progress_vocabulary ON user_progress(vocabulary_id);
    CREATE INDEX IF NOT EXISTS idx_user_progress_question ON user_progress(question_id);
    CREATE INDEX IF NOT EXISTS idx_user_progress_unit ON user_progress(unit_id);
    CREATE INDEX IF NOT EXISTS idx_user_progress_type ON user_progress(progress_type);
    CREATE INDEX IF NOT EXISTS idx_user_progress_status ON user_progress(status);
    """
    
    # Learning Sessions Table
    learning_sessions_sql = """
    CREATE TABLE IF NOT EXISTS learning_sessions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        session_type TEXT NOT NULL CHECK (session_type IN ('vocabulary_study', 'grammar_practice', 'quiz', 'review')),
        class_id INTEGER,
        unit_id INTEGER,
        start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        end_time TIMESTAMP WITH TIME ZONE,
        duration_minutes INTEGER,
        activities_completed JSONB DEFAULT '[]',
        performance_metrics JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_learning_sessions_user ON learning_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_learning_sessions_type ON learning_sessions(session_type);
    CREATE INDEX IF NOT EXISTS idx_learning_sessions_unit ON learning_sessions(unit_id);
    CREATE INDEX IF NOT EXISTS idx_learning_sessions_time ON learning_sessions(start_time);
    """
    
    # Kuwait Curriculum Configuration Table
    curriculum_config_sql = """
    CREATE TABLE IF NOT EXISTS curriculum_config (
        id SERIAL PRIMARY KEY,
        class_id INTEGER NOT NULL,
        academic_year TEXT NOT NULL,
        curriculum_version TEXT DEFAULT '1.0',
        total_units INTEGER DEFAULT 12,
        vocabulary_per_unit INTEGER DEFAULT 25,
        grammar_topics_per_unit INTEGER DEFAULT 3,
        assessment_frequency TEXT DEFAULT 'weekly',
        grading_scale JSONB,
        learning_objectives JSONB,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_curriculum_config_class ON curriculum_config(class_id);
    CREATE INDEX IF NOT EXISTS idx_curriculum_config_active ON curriculum_config(is_active);
    """
    
    # Execute table creation
    tables = [
        ("kuwait_classes", kuwait_classes_sql),
        ("kuwait_units", kuwait_units_sql),
        ("kuwait_vocabulary", kuwait_vocabulary_sql),
        ("grammar_content", grammar_content_sql),
        ("grammar_questions", grammar_questions_sql),
        ("user_progress", user_progress_sql),
        ("learning_sessions", learning_sessions_sql),
        ("curriculum_config", curriculum_config_sql)
    ]
    
    results = []
    
    for table_name, schema_sql in tables:
        print(f"\n🔨 Creating table: {table_name}")
        success = create_table(table_name, schema_sql)
        results.append((table_name, success))
        
        if success:
            print(f"   ✅ {table_name} table created successfully")
        else:
            print(f"   ❌ Failed to create {table_name} table")
    
    print("\n" + "="*60)
    print("📊 KUWAIT SCHEMA CREATION SUMMARY")
    print("="*60)
    
    successful = sum(1 for _, success in results if success)
    failed = len(results) - successful
    
    for table_name, success in results:
        status = "✅ SUCCESS" if success else "❌ FAILED"
        print(f"{table_name:25} → {status}")
    
    print(f"\nTotal: {len(results)} tables")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    
    if successful == len(results):
        print("\n🎉 Kuwait Secondary School Database Schema Created Successfully!")
        return True
    else:
        print(f"\n⚠️  {failed} tables failed to create. Check errors above.")
        return False

if __name__ == "__main__":
    create_kuwait_schema()