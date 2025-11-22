-- Kuwait English Learning Platform - Complete Database Setup
-- Generated: 2025-11-09
-- This file includes: Schema + Sample Data + Test Bank Questions

-- ============================================
-- SCHEMA CREATION
-- ============================================

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


-- ============================================
-- SAMPLE VOCABULARY AND GRAMMAR DATA
-- ============================================

-- Sample Data from Grade 12 Unit 1 (Legal Theme)
-- This is a subset for initial implementation

-- Insert Grammar Topic
INSERT INTO grammar_topics (topic_name, class_number, unit_number, description, rules, examples, difficulty_level)
VALUES (
  'Present Perfect Tense',
  12,
  1,
  'The Present Perfect tense is used for actions that started in the past and continue to the present, or have just been completed.',
  '[
    "Form: have/has + past participle",
    "Used for actions with present relevance",
    "Often used with: just, already, yet, since, for",
    "Common with time expressions: recently, lately, up to now"
  ]'::jsonb,
  '[
    {"sentence": "They have broken the law, they should be punished.", "type": "present_perfect"},
    {"sentence": "I have just broken my leg during the race.", "type": "present_perfect_just"},
    {"sentence": "She has never been to London.", "type": "present_perfect_never"},
    {"sentence": "The manager has already fired the employee.", "type": "present_perfect_already"}
  ]'::jsonb,
  2
);

INSERT INTO grammar_topics (topic_name, class_number, unit_number, description, rules, examples, difficulty_level)
VALUES (
  'Comparative and Contrastive Connectors',
  12,
  1,
  'Connectors used to show comparison and contrast between ideas.',
  '[
    "in comparison with - to compare two things",
    "whereas - to show contrast (often mid-sentence)",
    "on the other hand - to present an alternative view",
    "instead of - to suggest an alternative choice",
    "but - simple contrast connector"
  ]'::jsonb,
  '[
    {"sentence": "I prefer spending vacations in busy cities. On the other hand, my brother prefers small villages.", "connector": "on the other hand"},
    {"sentence": "I want to go out with friends, but I must study for the exams.", "connector": "but"},
    {"sentence": "My new car is not comfortable in comparison with the old one.", "connector": "in comparison with"},
    {"sentence": "Lets do some yoga instead of jogging.", "connector": "instead of"}
  ]'::jsonb,
  2
);

-- Insert Sample Vocabulary from Legal Theme
INSERT INTO kuwait_vocabulary (word, class_number, unit_number, order_in_unit, definition_en, definition_ar, category, difficulty_level)
VALUES
('adoption', 12, 1, 1, 'The legal process of becoming the parent of a child who is not biologically yours', 'التبني', 'legal', 2),
('bench', 12, 1, 2, 'A long seat for sitting; also refers to judges in court', 'مقعد / هيئة القضاة', 'legal', 1),
('consultation', 12, 1, 3, 'A meeting to discuss something or get advice', 'استشارة', 'legal', 2),
('litigation', 12, 1, 4, 'The process of taking legal action', 'التقاضي', 'legal', 3),
('persuasion', 12, 1, 5, 'The action of persuading someone to do or believe something', 'الإقناع', 'general', 2),
('civil', 12, 1, 6, 'Relating to citizens or society; not military or criminal', 'مدني', 'legal', 2),
('guilty', 12, 1, 7, 'Having done something wrong or illegal', 'مذنب', 'legal', 1),
('petty', 12, 1, 8, 'Of little importance; trivial', 'تافه / بسيط', 'general', 2),
('brief', 12, 1, 9, 'Short in duration or extent', 'موجز', 'general', 1),
('case', 12, 1, 10, 'A legal action or lawsuit', 'قضية', 'legal', 1),
('claim', 12, 1, 11, 'To state or assert that something is true', 'يدعي', 'legal', 2),
('sue', 12, 1, 12, 'To take legal action against someone', 'يقاضي', 'legal', 2),
('property', 12, 1, 13, 'Land, buildings, or possessions owned by someone', 'ملكية / عقار', 'legal', 2),
('row', 12, 1, 14, 'A line of things or people', 'صف', 'general', 1),
('supporter', 12, 1, 15, 'A person who supports a cause or policy', 'مؤيد', 'general', 1),
('tolerant', 12, 1, 16, 'Showing willingness to allow beliefs or behavior one disagrees with', 'متسامح', 'general', 2),
('welfare', 12, 1, 17, 'Health, happiness, and well-being', 'رفاهية', 'general', 2),
('violence', 12, 1, 18, 'Behavior involving physical force to hurt or damage', 'عنف', 'general', 1),
('intend', 12, 1, 19, 'To have a plan or purpose', 'ينوي', 'general', 1),
('prosecute', 12, 1, 20, 'To conduct legal proceedings against someone', 'يحاكم', 'legal', 3),
('contend', 12, 1, 21, 'To assert or argue', 'يجادل / يزعم', 'general', 2),
('define', 12, 1, 22, 'To state the meaning of something', 'يُعرّف', 'general', 1),
('principle', 12, 1, 23, 'A fundamental truth or rule', 'مبدأ', 'general', 2),
('ultimately', 12, 1, 24, 'Finally; in the end', 'في النهاية', 'general', 2),
('regardless', 12, 1, 25, 'Without being affected by; in spite of', 'بغض النظر عن', 'general', 2),
('note', 12, 1, 26, 'A brief record or written remark', 'ملاحظة', 'general', 1),
('legal', 12, 1, 27, 'Permitted by law', 'قانوني', 'legal', 1),
('code of law', 12, 1, 28, 'A systematic collection of laws', 'مدونة قانونية', 'legal', 3),
('speed limit', 12, 1, 29, 'The maximum speed allowed on a road', 'حد السرعة', 'general', 1),
('prove', 12, 1, 30, 'To demonstrate the truth of something', 'يُثبت', 'general', 1);


-- ============================================
-- TEST BANK QUESTIONS (GRADE 12 UNIT 1)
-- ============================================

INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v1', 12, 1, 'vocabulary', 1, 'There are strict regulations concerning the ……… of children.', 'multiple_choice', '{"a": "adoption", "b": "consultation", "c": "litigation", "d": "persuasion"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v2', 12, 1, 'vocabulary', 2, 'My father is accustomed to sipping his coffee on a wooden ………………… in his garden.', 'multiple_choice', '{"a": "bench", "b": "case", "c": "jury", "d": "note"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v3', 12, 1, 'vocabulary', 3, 'The speaker looked at the ……he wrote to help him remember key points of the meeting.', 'multiple_choice', '{"a": "rows", "b": "benches", "c": "notes", "d": "principles"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v4', 12, 1, 'vocabulary', 4, 'A ………………… meeting was held to discuss the policy and the goals of the company.', 'multiple_choice', '{"a": "brief", "b": "civil", "c": "guilty", "d": "petty"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v5', 12, 1, 'vocabulary', 5, 'The was refused as there was no evidence.', 'multiple_choice', '{"a": "case", "b": "principle", "c": "spring", "d": "welfare"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v6', 12, 1, 'vocabulary', 6, 'The man … that he was innocent and didn’t receive a fair trial.', 'multiple_choice', '{"a": "governed", "b": "intended", "c": "prosecuted", "d": "claimed"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v7', 12, 1, 'vocabulary', 7, 'He chose to join the course abroad after ………………… with his parents and teachers.', 'multiple_choice', '{"a": "welfare", "b": "principle", "c": "consultation", "d": "jury"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v8', 12, 1, 'vocabulary', 8, 'Television can encourage aggression in children.', 'multiple_choice', '{"a": "litigation", "b": "violence", "c": "adoption", "d": "defence"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v9', 12, 1, 'vocabulary', 9, 'Culture can be …………as the knowledge, beliefs, laws, and customs of a group of people.', 'multiple_choice', '{"a": "defined", "b": "imposed", "c": "contended", "d": "governed"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v10', 12, 1, 'vocabulary', 10, 'Laws against littering should be …… …… to save the environment.', 'multiple_choice', '{"a": "enforced", "b": "contended", "c": "proved", "d": "governed"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v11', 12, 1, 'vocabulary', 11, 'Our society is …………… by customs and values related to Islam.', 'multiple_choice', '{"a": "governed", "b": "prosecuted", "c": "intended", "d": "contended"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v12', 12, 1, 'vocabulary', 12, 'He has a ……… …… against the store for its poor customer service.', 'multiple_choice', '{"a": "persuasion", "b": "property", "c": "grievance", "d": "violence"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v13', 12, 1, 'vocabulary', 13, 'He was proved to be ……… of the crime therefore he was sent to prison.', 'multiple_choice', '{"a": "brief", "b": "petty", "c": "legal", "d": "guilty"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v14', 12, 1, 'vocabulary', 14, 'The criminal was taken to the police station in', 'multiple_choice', '{"a": "handcuffs", "b": "cases", "c": "notes", "d": "grievances"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v15', 12, 1, 'vocabulary', 15, 'Beware of ………………… your own taste on your children. Let them have their own say.', 'multiple_choice', '{"a": "imposing", "b": "proving", "c": "contending", "d": "suing"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v16', 12, 1, 'vocabulary', 16, 'The organisation works on the ……… that all members have the same rights.', 'multiple_choice', '{"a": "welfare", "b": "defence", "c": "principle", "d": "litigation"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v17', 12, 1, 'vocabulary', 17, 'The judge took the new evidence into consideration and released the ………………… man.', 'multiple_choice', '{"a": "legal", "b": "innocent", "c": "petty", "d": "brief"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v18', 12, 1, 'vocabulary', 18, 'They …… to visit all the touristic places in London.', 'multiple_choice', '{"a": "prove", "b": "enforce", "c": "impose", "d": "intend"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v19', 12, 1, 'vocabulary', 19, 'The court proved that all the company business operations were ……', 'multiple_choice', '{"a": "petty", "b": "legal", "c": "guilty", "d": "tolerant"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v20', 12, 1, 'vocabulary', 20, 'The government works on ending petty ……… … at courts.', 'multiple_choice', '{"a": "cases", "b": "benches", "c": "principles", "d": "handcuffs"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v21', 12, 1, 'vocabulary', 21, 'The teacher asked us to make a ………… of the questions we wanted to ask.', 'multiple_choice', '{"a": "case", "b": "note", "c": "penalty", "d": "welfare"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v22', 12, 1, 'vocabulary', 22, 'The company was given a severe ………… …… for violating environmental rules.', 'multiple_choice', '{"a": "principle", "b": "supporter", "c": "penalty", "d": "adoption"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_v23', 12, 1, 'vocabulary', 23, 'People should stop arguing around issues.', 'multiple_choice', '{"a": "petty", "b": "civil", "c": "tolerant", "d": "innocent"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g1', 12, 1, 'grammar', 1, 'They …… the law, they should be punished.', 'multiple_choice', '{"a": "has broken", "b": "have broken", "c": "hadn\u2019t broken", "d": "didn\u2019t break"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g2', 12, 1, 'grammar', 2, 'I just my leg during the race.', 'multiple_choice', '{"a": "had-broken", "b": "didn\u2019t-break", "c": "has-broken", "d": "have-broken"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g3', 12, 1, 'grammar', 3, 'She never… to London.', 'multiple_choice', '{"a": "have-been", "b": "has-been", "c": "is-being", "d": "was-being"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g4', 12, 1, 'grammar', 4, 'The manager…… already .... the employee.', 'multiple_choice', '{"a": "has-fired", "b": "had been-fired", "c": "have-fired", "d": "has-been fired"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g5', 12, 1, 'grammar', 5, 'My father’s flight …… yet.', 'multiple_choice', '{"a": "has arrived", "b": "arrived", "c": "hasn\u2019t arrived", "d": "haven\u2019t arrived"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g6', 12, 1, 'grammar', 6, 'He in this school for five years.', 'multiple_choice', '{"a": "were teaching", "b": "has been teaching", "c": "have taught", "d": "teaching"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g7', 12, 1, 'grammar', 7, 'I … this novel all day long. I am not done yet.', 'multiple_choice', '{"a": "have been reading", "b": "had read", "c": "read", "d": "reading"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g8', 12, 1, 'grammar', 8, 'They …… in that area since 1999.', 'multiple_choice', '{"a": "are living", "b": "have been living", "c": "were living", "d": "has been living"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g9', 12, 1, 'grammar', 9, 'My sister for the Olympics since last year.', 'multiple_choice', '{"a": "is training", "b": "has been training", "c": "was training", "d": "training"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g10', 12, 1, 'grammar', 10, 'I in this neighbourhood for several years.', 'multiple_choice', '{"a": "lives", "b": "living", "c": "have lived", "d": "has lived"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g11', 12, 1, 'grammar', 11, 'My new car is not comfortable the old one.', 'multiple_choice', '{"a": "in comparison with", "b": "whereas", "c": "instead of", "d": "but"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g12', 12, 1, 'grammar', 12, 'Her phone ……… for two minutes. It’s quite annoying.', 'multiple_choice', '{"a": "rang", "b": "has been ringing", "c": "have been ringing", "d": "ring"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g13', 12, 1, 'grammar', 13, 'My brother looks very tired. He without break since morning.', 'multiple_choice', '{"a": "has been working", "b": "will be working", "c": "have worked", "d": "worked"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g14', 12, 1, 'grammar', 14, 'I prefer spending vacations in busy cities. …………………, my brother prefers small villages.', 'multiple_choice', '{"a": "On the other hand", "b": "whereas", "c": "in comparison with", "d": "instead of"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g15', 12, 1, 'grammar', 15, 'I want to go out with friends, … I must study for the exams.', 'multiple_choice', '{"a": "but", "b": "whereas", "c": "on the other hand", "d": "instead of"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g16', 12, 1, 'grammar', 16, 'Staying at home is relaxing. …………………, you might feel bored.', 'multiple_choice', '{"a": "Whereas", "b": "Instead of", "c": "On the other hand", "d": "In comparison with"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g17', 12, 1, 'grammar', 17, 'teaching, being a doctor is a hard profession.', 'multiple_choice', '{"a": "But", "b": "On the other hand", "c": "Whereas", "d": "In comparison with"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g18', 12, 1, 'grammar', 18, 'Let’s do some yoga jogging.', 'multiple_choice', '{"a": "but", "b": "instead of", "c": "whereas", "d": "on the other hand"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g19', 12, 1, 'grammar', 19, 'The tallest buildings in London are small those in New York.', 'multiple_choice', '{"a": "instead of", "b": "in comparison with", "c": "whereas", "d": "but"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO test_bank_questions 
(question_id, class_number, unit_number, component_type, question_number, question_text, question_type, options, difficulty_level)
VALUES ('g12_u1_g20', 12, 1, 'grammar', 20, 'Wherever possible I use honey ………………… sugar.', 'multiple_choice', '{"a": "whereas", "b": "on the other hand", "c": "but", "d": "instead of"}'::jsonb, 2)
ON CONFLICT (question_id) DO NOTHING;

-- ============================================
-- SET BOOK CONTENT
-- ============================================

INSERT INTO set_book_content (class_number, unit_number, passage_title, passage_text, passage_text_ar, theme, key_vocabulary, discussion_questions)
VALUES (
  12,
  1,
  'Justice and the Law',
  'The legal system plays a vital role in maintaining order and justice in society. Laws are established to protect citizens'' rights and ensure fair treatment for all. In Kuwait, the judicial system is based on principles of equality and fairness, where everyone is entitled to a fair trial and legal representation.

The concept of justice extends beyond the courtroom. It encompasses the protection of individual rights, the prevention of injustice, and the promotion of social welfare. When citizens understand their legal rights and responsibilities, they become more empowered and active participants in their communities.

Legal consultation is an important service that helps people navigate complex legal matters. Whether dealing with property disputes, civil cases, or understanding new regulations, consulting with legal professionals ensures that individuals make informed decisions. The litigation process, while sometimes lengthy, exists to ensure that all parties receive proper consideration and that justice is served fairly.',
  'يلعب النظام القانوني دورًا حيويًا في الحفاظ على النظام والعدالة في المجتمع. يتم وضع القوانين لحماية حقوق المواطنين وضمان المعاملة العادلة للجميع. في الكويت، يقوم النظام القضائي على مبادئ المساواة والإنصاف، حيث يحق لكل فرد الحصول على محاكمة عادلة وتمثيل قانوني.',
  'Legal System and Justice',
  '["justice", "legal system", "judicial", "litigation", "consultation", "welfare", "rights"]'::jsonb,
  '["What is the importance of having a fair legal system?", "How does legal consultation help citizens?", "Why is it important to understand your legal rights?", "What role does justice play in maintaining social order?"]'::jsonb
) ON CONFLICT DO NOTHING;
