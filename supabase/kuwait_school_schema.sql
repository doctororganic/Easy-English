-- Kuwait Secondary School Database Schema
-- Execute this script in Supabase SQL Editor
-- Creates comprehensive schema for Classes 10-12 with Units and Vocabulary

-- =====================================================
-- KUWAIT CLASSES TABLE
-- =====================================================
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

-- =====================================================
-- KUWAIT UNITS TABLE  
-- =====================================================
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

-- =====================================================
-- KUWAIT VOCABULARY TABLE (Enhanced vocabulary linked to classes and units)
-- =====================================================
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

-- =====================================================
-- GRAMMAR CONTENT TABLE (for extracted PDF content)
-- =====================================================
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

-- =====================================================
-- GRAMMAR QUESTIONS TABLE
-- =====================================================
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

-- =====================================================
-- USER PROGRESS TRACKING TABLE
-- =====================================================
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

-- =====================================================
-- LEARNING SESSIONS TABLE
-- =====================================================
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

-- =====================================================
-- KUWAIT CURRICULUM CONFIGURATION TABLE
-- =====================================================
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

-- =====================================================
-- SAMPLE DATA INSERTION (Optional - for testing)
-- =====================================================

-- Insert Kuwait Classes
INSERT INTO kuwait_classes (class_number, class_name_en, class_name_ar, description, academic_year, is_active) VALUES
(10, 'Class 10', 'الصف العاشر', 'Foundation level for Kuwait secondary education', '2024-2025', true),
(11, 'Class 11', 'الصف الحادي عشر', 'Intermediate level with advanced topics', '2024-2025', true),
(12, 'Class 12', 'الصف الثاني عشر', 'Advanced level preparing for university entrance', '2024-2025', true)
ON CONFLICT DO NOTHING;

-- Insert Kuwait Units for Class 10
INSERT INTO kuwait_units (class_id, unit_number, unit_name_en, unit_name_ar, description_en, description_ar, theme, difficulty_level, order_index, is_published) VALUES
(1, 1, 'Personal Introduction', 'التعريف بالنفس', 'Learn to introduce yourself and talk about personal information', 'تعلم كيفية التعريف بالنفس والتحدث عن المعلومات الشخصية', 'personal', 1, 1, true),
(1, 2, 'Daily Routines', 'الروتين اليومي', 'Describe your daily activities and habits', 'وصف الأنشطة اليومية والعادات', 'daily_life', 1, 2, true),
(1, 3, 'Family and Friends', 'الأسرة والأصدقاء', 'Talk about family members and relationships', 'التحدث عن أفراد الأسرة والعلاقات', 'relationships', 1, 3, true),
(1, 4, 'Food and Cooking', 'الطعام والطبخ', 'Discuss different foods and cooking methods', 'مناقشة الأطعمة المختلفة وطرق الطبخ', 'food', 1, 4, true),
(1, 5, 'Travel and Tourism', 'السفر والسياحة', 'Plan trips and describe travel experiences', 'تخطيط الرحلات ووصف تجارب السفر', 'travel', 2, 5, true)
ON CONFLICT DO NOTHING;