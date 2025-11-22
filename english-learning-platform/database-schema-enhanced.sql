-- Kuwait English Learning Platform - Comprehensive Database Schema
-- Enhanced with extracted PDF content integration

-- ============================================
-- CORE CURRICULUM TABLES
-- ============================================

-- Vocabulary table with bilingual support
CREATE TABLE IF NOT EXISTS kuwait_vocabulary (
  id SERIAL PRIMARY KEY,
  word VARCHAR(255) NOT NULL,
  class_number INTEGER NOT NULL CHECK (class_number IN (10, 11, 12)),
  unit_number INTEGER NOT NULL CHECK (unit_number >= 1 AND unit_number <= 6),
  order_in_unit INTEGER,
  definition_en TEXT,
  definition_ar TEXT,
  phonetic VARCHAR(255),
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 3),
  category VARCHAR(100),
  examples JSONB DEFAULT '[]'::jsonb,
  synonyms JSONB DEFAULT '[]'::jsonb,
  audio_url TEXT,
  image_url TEXT,
  ai_generated BOOLEAN DEFAULT false,
  source VARCHAR(100) DEFAULT 'kuwait_pdf_extraction',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(word, class_number, unit_number)
);

-- Test Bank Questions table (all 8 exam components)
CREATE TABLE IF NOT EXISTS test_bank_questions (
  id SERIAL PRIMARY KEY,
  question_id VARCHAR(100) UNIQUE NOT NULL,
  class_number INTEGER NOT NULL CHECK (class_number IN (10, 11, 12)),
  unit_number INTEGER NOT NULL CHECK (unit_number >= 1 AND unit_number <= 6),
  component_type VARCHAR(50) NOT NULL CHECK (component_type IN (
    'vocabulary', 'grammar', 'language_functions', 'set_book',
    'expository_writing', 'reading_comprehension', 'summary_making', 'translation'
  )),
  question_number INTEGER,
  question_text TEXT NOT NULL,
  question_text_ar TEXT,
  question_type VARCHAR(50) CHECK (question_type IN (
    'multiple_choice', 'fill_in_blank', 'transformation', 'short_answer', 'essay'
  )),
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  explanation_ar TEXT,
  difficulty_level INTEGER DEFAULT 2 CHECK (difficulty_level BETWEEN 1 AND 3),
  points INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Set Book Content table
CREATE TABLE IF NOT EXISTS set_book_content (
  id SERIAL PRIMARY KEY,
  class_number INTEGER NOT NULL CHECK (class_number IN (10, 11, 12)),
  unit_number INTEGER NOT NULL CHECK (unit_number >= 1 AND unit_number <= 6),
  passage_title VARCHAR(255),
  passage_text TEXT NOT NULL,
  passage_text_ar TEXT,
  theme VARCHAR(255),
  author VARCHAR(255),
  discussion_questions JSONB DEFAULT '[]'::jsonb,
  key_vocabulary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Grammar Content table
CREATE TABLE IF NOT EXISTS grammar_topics (
  id SERIAL PRIMARY KEY,
  topic_name VARCHAR(255) NOT NULL,
  class_number INTEGER CHECK (class_number IN (10, 11, 12)),
  unit_number INTEGER,
  description TEXT,
  rules JSONB DEFAULT '[]'::jsonb,
  examples JSONB DEFAULT '[]'::jsonb,
  exercises JSONB DEFAULT '[]'::jsonb,
  difficulty_level INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- USER PROGRESS & GOALS TABLES
-- ============================================

-- User Goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_number INTEGER NOT NULL CHECK (goal_number BETWEEN 1 AND 5),
  goal_text TEXT,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  target_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE(user_id, goal_number)
);

-- User Progress Tracking table
CREATE TABLE IF NOT EXISTS user_progress_tracking (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  class_number INTEGER CHECK (class_number IN (10, 11, 12)),
  unit_number INTEGER,
  component_type VARCHAR(50),
  items_completed INTEGER DEFAULT 0,
  items_total INTEGER DEFAULT 0,
  score_average DECIMAL(5,2),
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Vocabulary Learning Progress
CREATE TABLE IF NOT EXISTS vocabulary_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vocabulary_id INTEGER REFERENCES kuwait_vocabulary(id) ON DELETE CASCADE,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5),
  times_reviewed INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP,
  next_review TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, vocabulary_id)
);

-- Exam Attempts table
CREATE TABLE IF NOT EXISTS exam_attempts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  class_number INTEGER NOT NULL,
  unit_number INTEGER NOT NULL,
  component_type VARCHAR(50) NOT NULL,
  questions_data JSONB NOT NULL,
  answers_data JSONB NOT NULL,
  score DECIMAL(5,2),
  total_points INTEGER,
  time_taken_minutes INTEGER,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_vocabulary_class_unit ON kuwait_vocabulary(class_number, unit_number);
CREATE INDEX IF NOT EXISTS idx_vocabulary_word ON kuwait_vocabulary(word);
CREATE INDEX IF NOT EXISTS idx_test_questions_class_unit ON test_bank_questions(class_number, unit_number, component_type);
CREATE INDEX IF NOT EXISTS idx_test_questions_component ON test_bank_questions(component_type);
CREATE INDEX IF NOT EXISTS idx_set_book_class ON set_book_content(class_number, unit_number);
CREATE INDEX IF NOT EXISTS idx_grammar_class ON grammar_topics(class_number);
CREATE INDEX IF NOT EXISTS idx_user_goals_user ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_vocab_progress_user ON vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user ON exam_attempts(user_id);

-- ============================================
-- ROW LEVEL SECURITY POLICIES (Public Access)
-- ============================================

-- Enable RLS
ALTER TABLE kuwait_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_bank_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_book_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;

-- Public read access for curriculum content
CREATE POLICY "Public read access for vocabulary" ON kuwait_vocabulary FOR SELECT USING (true);
CREATE POLICY "Public read access for test questions" ON test_bank_questions FOR SELECT USING (true);
CREATE POLICY "Public read access for set book" ON set_book_content FOR SELECT USING (true);
CREATE POLICY "Public read access for grammar" ON grammar_topics FOR SELECT USING (true);

-- User-specific policies for goals and progress (allow both authenticated and anonymous)
CREATE POLICY "Users can manage their own goals" ON user_goals 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Users can manage their own progress" ON user_progress_tracking 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Users can manage their vocabulary progress" ON vocabulary_progress 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Users can manage their exam attempts" ON exam_attempts 
  FOR ALL USING (true) WITH CHECK (true);
