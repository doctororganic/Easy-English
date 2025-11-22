-- Enhanced Kuwait English Learning Platform Schema
-- New tables for comprehensive features

-- ==========================================
-- VOCABULARY SYSTEM
-- ==========================================

-- Vocabulary units with bilingual support
CREATE TABLE IF NOT EXISTS vocabulary_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level VARCHAR(2) NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 6),
  word_english VARCHAR(255) NOT NULL,
  word_arabic VARCHAR(255),
  definition_english TEXT NOT NULL,
  definition_arabic TEXT,
  phonetic VARCHAR(255),
  example_sentence_english TEXT,
  example_sentence_arabic TEXT,
  part_of_speech VARCHAR(50),
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vocabulary questions (multiple choice)
CREATE TABLE IF NOT EXISTS vocabulary_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level VARCHAR(2) NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 6),
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  explanation_english TEXT,
  explanation_arabic TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- SET BOOK SYSTEM
-- ==========================================

CREATE TABLE IF NOT EXISTS set_book_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level VARCHAR(2) NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 6),
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('passage', 'question', 'exercise')),
  title_english VARCHAR(500),
  title_arabic VARCHAR(500),
  content_english TEXT NOT NULL,
  content_arabic TEXT,
  model_answer_english TEXT,
  model_answer_arabic TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- TEST BANK SYSTEM (All 8 Components)
-- ==========================================

CREATE TABLE IF NOT EXISTS test_bank_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level VARCHAR(2) NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 6),
  component_type VARCHAR(50) NOT NULL CHECK (component_type IN (
    'vocabulary', 'grammar', 'language_functions', 'set_book',
    'expository_writing', 'reading_comprehension', 'summary_making', 'translation'
  )),
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL CHECK (question_type IN (
    'multiple_choice', 'fill_in_blank', 'transformation', 'correction',
    'essay', 'translation', 'reading', 'summary', 'open_ended'
  )),
  options JSONB,  -- {a: "option1", b: "option2", c: "option3", d: "option4"}
  correct_answer TEXT,
  model_answer TEXT,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- GRAMMAR CONTENT
-- ==========================================

CREATE TABLE IF NOT EXISTS grammar_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level VARCHAR(2) NOT NULL CHECK (grade_level IN ('10', '11', '12')),
  unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 6),
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_instruction TEXT,  -- e.g., "Correct the verb", "Make Passive"
  option_a VARCHAR(500),
  option_b VARCHAR(500),
  option_c VARCHAR(500),
  option_d VARCHAR(500),
  correct_answer CHAR(1) CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  explanation TEXT,
  grammar_topic VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- THEME SYSTEM
-- ==========================================

CREATE TABLE IF NOT EXISTS theme_presets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  display_name_en VARCHAR(100) NOT NULL,
  display_name_ar VARCHAR(100) NOT NULL,
  primary_color VARCHAR(7) NOT NULL,
  secondary_color VARCHAR(7) NOT NULL,
  accent_color VARCHAR(7) NOT NULL,
  background_light VARCHAR(7) NOT NULL,
  background_dark VARCHAR(7) NOT NULL,
  text_light VARCHAR(7) NOT NULL,
  text_dark VARCHAR(7) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default theme presets
INSERT INTO theme_presets (name, display_name_en, display_name_ar, primary_color, secondary_color, accent_color, background_light, background_dark, text_light, text_dark, display_order)
VALUES
  ('pale_yellow', 'Pale Yellow', 'أصفر فاتح', '#10B981', '#FEF3C7', '#F59E0B', '#FFFFFF', '#1F2937', '#1F2937', '#F9FAFB', 1),
  ('purple_pink', 'Purple & Pink', 'بنفسجي ووردي', '#9333EA', '#EC4899', '#F472B6', '#FFFFFF', '#1F2937', '#1F2937', '#F9FAFB', 2),
  ('green', 'Green Theme', 'الثيم الأخضر', '#10B981', '#34D399', '#6EE7B7', '#FFFFFF', '#064E3B', '#064E3B', '#ECFDF5', 3),
  ('dark_mode', 'Dark Mode', 'الوضع الداكن', '#10B981', '#FCD34D', '#F59E0B', '#F9FAFB', '#000000', '#1F2937', '#F9FAFB', 4);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_vocabulary_units_grade_unit ON vocabulary_units(grade_level, unit_number);
CREATE INDEX IF NOT EXISTS idx_vocabulary_questions_grade_unit ON vocabulary_questions(grade_level, unit_number);
CREATE INDEX IF NOT EXISTS idx_set_book_content_grade_unit ON set_book_content(grade_level, unit_number);
CREATE INDEX IF NOT EXISTS idx_test_bank_questions_grade_unit_component ON test_bank_questions(grade_level, unit_number, component_type);
CREATE INDEX IF NOT EXISTS idx_grammar_questions_grade_unit ON grammar_questions(grade_level, unit_number);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE vocabulary_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_book_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_bank_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_presets ENABLE ROW LEVEL SECURITY;

-- Public read access for all content (no authentication required)
CREATE POLICY "Public read access for vocabulary_units" ON vocabulary_units FOR SELECT USING (true);
CREATE POLICY "Public read access for vocabulary_questions" ON vocabulary_questions FOR SELECT USING (true);
CREATE POLICY "Public read access for set_book_content" ON set_book_content FOR SELECT USING (true);
CREATE POLICY "Public read access for test_bank_questions" ON test_bank_questions FOR SELECT USING (true);
CREATE POLICY "Public read access for grammar_questions" ON grammar_questions FOR SELECT USING (true);
CREATE POLICY "Public read access for theme_presets" ON theme_presets FOR SELECT USING (true);
