-- Migration: create_kuwait_curriculum_schema
-- Created at: 1762139694

-- Kuwait Secondary School Database Schema
-- Execute this in Supabase SQL Editor

-- Kuwait Classes Table
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

-- Kuwait Units Table
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

-- Kuwait Vocabulary Table
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
  mastery_score DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_unit ON kuwait_vocabulary(unit_id);
CREATE INDEX IF NOT EXISTS idx_kuwait_vocabulary_word ON kuwait_vocabulary(word);

-- Grammar Content Table
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
  review_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_grammar_content_category ON grammar_content(grammar_category);

-- Grammar Questions Table
CREATE TABLE IF NOT EXISTS grammar_questions (
  id SERIAL PRIMARY KEY,
  grammar_content_id INTEGER,
  unit_id INTEGER,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,
  correct_answer TEXT,
  options JSONB,
  explanation_en TEXT,
  explanation_ar TEXT,
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  points INTEGER DEFAULT 1,
  estimated_time_seconds INTEGER DEFAULT 60,
  question_tags JSONB,
  ai_generated BOOLEAN DEFAULT false,
  review_status TEXT DEFAULT 'draft',
  usage_count INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_grammar_questions_type ON grammar_questions(question_type);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  vocabulary_id INTEGER,
  question_id INTEGER,
  unit_id INTEGER,
  class_id INTEGER,
  progress_type TEXT NOT NULL,
  status TEXT NOT NULL,
  score DECIMAL(3,2) DEFAULT 0.00,
  attempts INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);

-- Learning Sessions Table
CREATE TABLE IF NOT EXISTS learning_sessions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_type TEXT NOT NULL,
  class_id INTEGER,
  unit_id INTEGER,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP,
  duration_minutes INTEGER,
  activities_completed JSONB DEFAULT '[]',
  performance_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_user ON learning_sessions(user_id);

-- Curriculum Config Table
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

-- Insert sample classes
INSERT INTO kuwait_classes (class_number, class_name_en, class_name_ar, description, academic_year, is_active) VALUES
(10, 'Class 10', 'الصف العاشر', 'Foundation level for Kuwait secondary education', '2024-2025', true),
(11, 'Class 11', 'الصف الحادي عشر', 'Intermediate level with advanced topics', '2024-2025', true),
(12, 'Class 12', 'الصف الثاني عشر', 'Advanced level preparing for university entrance', '2024-2025', true)
ON CONFLICT DO NOTHING;;