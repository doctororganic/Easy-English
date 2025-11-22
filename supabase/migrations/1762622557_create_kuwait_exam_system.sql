-- Migration: create_kuwait_exam_system
-- Created at: 1762622557

-- Kuwait English Learning Platform - PostgreSQL Schema for Supabase
-- This schema must be applied using apply_migration once the Supabase access token is refreshed

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER PROFILES TABLE
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  age INTEGER,
  grade_level TEXT CHECK (grade_level IN ('10', '11', '12')),
  goals TEXT,
  learning_plans TEXT,
  notes TEXT,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'ar')),
  theme_mode TEXT DEFAULT 'auto' CHECK (theme_mode IN ('light', 'dark', 'auto')),
  color_scheme TEXT DEFAULT 'black_green_yellow' CHECK (color_scheme IN ('black_green_yellow', 'white_green_pale_yellow')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- 2. KUWAIT EXAM COMPONENTS
CREATE TABLE exam_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

INSERT INTO exam_components (name, name_en, name_ar, description_en, description_ar, display_order) VALUES
('vocabulary', 'Vocabulary', 'المفردات', 'Vocabulary assessment', 'تقييم المفردات', 1),
('grammar', 'Grammar', 'القواعد', 'Grammar questions', 'أسئلة القواعد', 2),
('language_functions', 'Language Functions', 'الوظائف اللغوية', 'Language use', 'استخدام اللغة', 3),
('set_book', 'Set Book Questions', 'أسئلة الكتاب المقرر', 'Set book questions', 'أسئلة الكتاب', 4),
('expository_writing', 'Expository Writing', 'الكتابة التوضيحية', 'Writing tasks', 'مهام الكتابة', 5),
('reading_comprehension', 'Reading Comprehension', 'الفهم القرائي', 'Reading questions', 'أسئلة القراءة', 6),
('summary_making', 'Summary Making', 'صياغة الملخص', 'Summary tasks', 'مهام التلخيص', 7),
('translation', 'Translation', 'الترجمة', 'Translation tasks', 'مهام الترجمة', 8);

-- 3. LESSONS TABLE
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_id UUID NOT NULL,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  unit_number INTEGER,
  lesson_number INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration_minutes INTEGER,
  is_interactive BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. QUESTIONS TABLE
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_id UUID NOT NULL,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  question_type TEXT NOT NULL,
  question_text_en TEXT NOT NULL,
  question_text_ar TEXT NOT NULL,
  options JSONB,
  correct_answer JSONB NOT NULL,
  explanation_en TEXT,
  explanation_ar TEXT,
  difficulty_score DECIMAL(3,2) DEFAULT 0.5,
  points INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ASSESSMENTS TABLE
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  assessment_type TEXT NOT NULL,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  component_ids JSONB NOT NULL,
  questions_config JSONB NOT NULL,
  time_limit_minutes INTEGER,
  total_points INTEGER DEFAULT 100,
  passing_score DECIMAL(5,2) DEFAULT 70.00,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SUBMISSIONS TABLE
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  assessment_id UUID NOT NULL,
  responses JSONB NOT NULL,
  score DECIMAL(5,2),
  percentage_score DECIMAL(5,2),
  time_spent_seconds INTEGER,
  started_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  attempt_number INTEGER DEFAULT 1,
  status TEXT DEFAULT 'in_progress',
  ai_feedback JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. USER PROGRESS TABLE
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  component_id UUID NOT NULL,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  mastery_level DECIMAL(3,2) DEFAULT 0.00,
  practice_attempts INTEGER DEFAULT 0,
  total_time_spent_minutes INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  strengths JSONB,
  weaknesses JSONB,
  recommendations JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allowing both anon and service_role)
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Published lessons readable" ON lessons
  FOR SELECT USING (is_published = TRUE OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Active questions readable" ON questions
  FOR SELECT USING (is_active = TRUE OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Published assessments readable" ON assessments
  FOR SELECT USING (is_published = TRUE OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Users can manage own submissions" ON submissions
  FOR ALL USING (auth.uid() = user_id OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Users can manage own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id OR auth.role() IN ('anon', 'service_role'));

-- Create indexes
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_lessons_component ON lessons(component_id);
CREATE INDEX idx_questions_component ON questions(component_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_progress_user ON user_progress(user_id);;