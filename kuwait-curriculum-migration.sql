-- Kuwait English Learning Platform - Database Migration
-- Complete schema and data migration from extracted PDF content

-- Create database
CREATE DATABASE IF NOT EXISTS kuwait_english_platform;
USE kuwait_english_platform;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS set_book_passages;
DROP TABLE IF EXISTS grammar_content;
DROP TABLE IF EXISTS test_bank_questions;
DROP TABLE IF EXISTS vocabulary_words;
DROP TABLE IF EXISTS kuwait_units;
DROP TABLE IF EXISTS kuwait_classes;

-- Table 1: Kuwait Classes (Difficulty levels)
CREATE TABLE kuwait_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    description TEXT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Kuwait Units (Curriculum units)
CREATE TABLE kuwait_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit_number INT NOT NULL,
    unit_name VARCHAR(100) NOT NULL,
    theme VARCHAR(100),
    class_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES kuwait_classes(id)
);

-- Table 3: Vocabulary Words
CREATE TABLE vocabulary_words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    english VARCHAR(255) NOT NULL,
    arabic VARCHAR(255) NOT NULL,
    phonetic VARCHAR(500),
    example TEXT,
    category VARCHAR(100),
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    unit_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
);

-- Table 4: Test Bank Questions
CREATE TABLE test_bank_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id VARCHAR(50) UNIQUE NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500),
    option_b VARCHAR(500),
    option_c VARCHAR(500),
    option_d VARCHAR(500),
    correct_answer CHAR(1),
    question_type ENUM('vocabulary', 'grammar', 'reading', 'writing') NOT NULL,
    unit_id INT,
    grade_level INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
);

-- Table 5: Grammar Content
CREATE TABLE grammar_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    subtopic VARCHAR(100),
    explanation TEXT,
    examples TEXT,
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    unit_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
);

-- Table 6: Set Book Passages
CREATE TABLE set_book_passages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    passage_title VARCHAR(255) NOT NULL,
    english_text TEXT NOT NULL,
    arabic_text TEXT,
    unit_id INT,
    grade_level INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES kuwait_units(id)
);

-- Table 7: User Progress
CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    vocabulary_mastered INT DEFAULT 0,
    questions_answered INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    grammar_topics_completed INT DEFAULT 0,
    total_study_time INT DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Kuwait Classes
INSERT INTO kuwait_classes (class_name, description, difficulty_level) VALUES
('Grade 10', 'Basic English curriculum for Grade 10 students', 'beginner'),
('Grade 11', 'Intermediate English curriculum for Grade 11 students', 'intermediate'),
('Grade 12', 'Advanced English curriculum for Grade 12 students', 'advanced');

-- Insert Kuwait Units
INSERT INTO kuwait_units (unit_number, unit_name, theme, class_id, description) VALUES
(1, 'Unit One: Legal and Civil Rights', 'Legal and Civil Rights', 3, 'Introduction to legal terminology, civil rights, and social justice'),
(2, 'Unit Two: Technology and Innovation', 'Technology and Innovation', 3, 'Modern technology vocabulary and innovation concepts'),
(3, 'Unit Three: Environment and Nature', 'Environment and Nature', 3, 'Environmental protection and nature conservation'),
(4, 'Unit Four: Health and Medicine', 'Health and Medicine', 3, 'Medical terminology and health-related vocabulary'),
(5, 'Unit Five: Arts and Culture', 'Arts and Culture', 3, 'Cultural expressions and artistic terminology'),
(6, 'Unit Six: Economics and Business', 'Economics and Business', 3, 'Business vocabulary and economic concepts');

-- Insert Vocabulary Words (Grade 12 Unit 1 - Legal Theme)
INSERT INTO vocabulary_words (english, arabic, phonetic, example, category, difficulty, unit_id) VALUES
('adoption', 'تبني', '/əˈdɒpʃən/', 'There are strict regulations concerning the adoption of children.', 'Legal', 'intermediate', 1),
('consultation', 'استشارة', '/ˌkɒnsəlˈteɪʃən/', 'He chose to join the course abroad after consultation with his parents.', 'Legal', 'intermediate', 1),
('litigation', 'تقاضٍ', '/ˌlɪtɪˈɡeɪʃən/', 'Television can encourage litigation in children.', 'Legal', 'advanced', 1),
('persuasion', 'إقناع', '/pəˈsweɪʒən/', 'There are strict regulations concerning the persuasion of children.', 'Legal', 'intermediate', 1),
('bench', 'مقعد', '/bentʃ/', 'My father is accustomed to sipping his coffee on a wooden bench.', 'Objects', 'beginner', 1),
('case', 'قضية', '/keɪs/', 'The case was refused as there was no evidence.', 'Legal', 'beginner', 1),
('notes', 'ملاحظات', '/noʊts/', 'The speaker looked at the notes he wrote to help him remember key points.', 'Learning', 'beginner', 1),
('brief', 'مختصر', '/briːf/', 'A brief meeting was held to discuss the policy and goals.', 'Legal', 'intermediate', 1),
('civil', 'مدني', '/ˈsɪvəl/', 'A civil meeting was held to discuss company policy.', 'Legal', 'intermediate', 1),
('guilty', 'مذنب', '/ˈɡɪlti/', 'He was proved to be guilty of the crime.', 'Legal', 'intermediate', 1),
('claimed', 'ادعى', '/kleɪmd/', 'The man claimed that he was innocent.', 'Legal', 'intermediate', 1),
('governed', 'يحكم', '/ˈɡʌvənd/', 'Our society is governed by customs and values related to Islam.', 'Legal', 'intermediate', 1),
('intended', 'قصد', '/ɪnˈtendɪd/', 'They intend to visit all the touristic places in London.', 'Verbs', 'intermediate', 1),
('enforced', 'نفذ', '/ɪnˈfɔːrst/', 'Laws against littering should be enforced to save the environment.', 'Legal', 'intermediate', 1),
('defined', 'حدد', '/dɪˈfaɪnd/', 'Culture can be defined as the knowledge, beliefs, laws, and customs of a group.', 'Verbs', 'intermediate', 1),
('grievance', 'شكوى', '/ˈɡriːvəns/', 'He has a grievance against the store for poor customer service.', 'Legal', 'advanced', 1),
('handcuffs', 'كلابات', '/ˈhændkʌfs/', 'The criminal was taken to the police station in handcuffs.', 'Legal', 'intermediate', 1),
('imposing', 'فرض', '/ɪmˈpoʊzɪŋ/', 'Beware of imposing your own taste on your children.', 'Verbs', 'intermediate', 1),
('principle', 'مبدأ', '/ˈprɪnsɪpəl/', 'The organization works on the principle that all members have equal rights.', 'Legal', 'intermediate', 1),
('innocent', 'بريء', '/ˈɪnəsənt/', 'The judge released the innocent man after considering new evidence.', 'Legal', 'intermediate', 1),
('legal', 'قانوني', '/ˈliːɡəl/', 'There are organizations that offer free legal advice to people.', 'Legal', 'intermediate', 1),
('violence', 'عنف', '/ˈvaɪələns/', 'Television can encourage violence in children.', 'Social', 'intermediate', 1),
('penalty', 'عقوبة', '/ˈpenəlti/', 'The company was given a severe penalty for violating environmental rules.', 'Legal', 'intermediate', 1),
('tolerant', 'متسامح', '/ˈtɒlərənt/', 'People should stop arguing over petty issues.', 'Social', 'intermediate', 1);

-- Insert Test Bank Questions (Present Perfect Tense - Grammar)
INSERT INTO test_bank_questions (question_id, question_text, option_a, option_b, option_c, option_d, correct_answer, question_type, unit_id, grade_level) VALUES
('g12_u1_g1', 'They ...... the law, they should be punished.', 'has broken', 'have broken', 'hadn''t broken', 'didn''t break', 'b', 'grammar', 1, 12),
('g12_u1_g2', 'I just ... my leg during the race.', 'had-broken', 'didn''t-break', 'has-broken', 'have-broken', 'c', 'grammar', 1, 12),
('g12_u1_g3', 'She never... to London.', 'have-been', 'has-been', 'is-being', 'was-being', 'b', 'grammar', 1, 12),
('g12_u1_g4', 'The manager... already ... the employee.', 'has-fired', 'had been-fired', 'have-fired', 'has-been fired', 'd', 'grammar', 1, 12),
('g12_u1_g5', 'My father''s flight ... yet.', 'has arrived', 'arrived', 'hasn''t arrived', 'haven''t arrived', 'c', 'grammar', 1, 12),
('g12_u1_g6', 'He ... in this school for five years.', 'were teaching', 'has been teaching', 'have taught', 'teaching', 'b', 'grammar', 1, 12),
('g12_u1_g7', 'I ... this novel all day long. I am not done yet.', 'have been reading', 'had read', 'read', 'reading', 'a', 'grammar', 1, 12),
('g12_u1_g8', 'They ... in that area since 1999.', 'are living', 'have been living', 'were living', 'has been living', 'b', 'grammar', 1, 12),
('g12_u1_g9', 'My sister ... for the Olympics since last year.', 'is training', 'has been training', 'was training', 'training', 'b', 'grammar', 1, 12),
('g12_u1_g10', 'I ... in this neighbourhood for several years.', 'lives', 'living', 'have lived', 'has lived', 'c', 'grammar', 1, 12);

-- Insert Test Bank Questions (Comparative Connectors - Grammar)
INSERT INTO test_bank_questions (question_id, question_text, option_a, option_b, option_c, option_d, correct_answer, question_type, unit_id, grade_level) VALUES
('g12_u1_g11', 'My new car is not comfortable ... the old one.', 'in comparison with', 'whereas', 'instead of', 'but', 'a', 'grammar', 1, 12),
('g12_u1_g12', 'Her phone ... for two minutes. It''s quite annoying.', 'rang', 'has been ringing', 'have been ringing', 'ring', 'b', 'grammar', 1, 12),
('g12_u1_g13', 'My brother looks very tired. He ... without break since morning.', 'has been working', 'will be working', 'have worked', 'worked', 'a', 'grammar', 1, 12),
('g12_u1_g14', 'I prefer spending vacations in busy cities. ..., my brother prefers small villages.', 'On the other hand', 'whereas', 'in comparison with', 'instead of', 'a', 'grammar', 1, 12),
('g12_u1_g15', 'I want to go out with friends, ... I must study for the exams.', 'but', 'whereas', 'on the other hand', 'instead of', 'a', 'grammar', 1, 12),
('g12_u1_g16', 'Staying at home is relaxing. ..., you might feel bored.', 'Whereas', 'Instead of', 'On the other hand', 'In comparison with', 'c', 'grammar', 1, 12),
('g12_u1_g17', '..., being a doctor is a hard profession.', 'But', 'On the other hand', 'Whereas', 'In comparison with', 'c', 'grammar', 1, 12),
('g12_u1_g18', 'Let''s do some yoga ... jogging.', 'but', 'instead of', 'whereas', 'on the other hand', 'b', 'grammar', 1, 12),
('g12_u1_g19', 'The tallest buildings in London are small ... those in New York.', 'instead of', 'in comparison with', 'whereas', 'but', 'b', 'grammar', 1, 12),
('g12_u1_g20', 'Wherever possible I use honey ... sugar.', 'whereas', 'on the other hand', 'but', 'instead of', 'd', 'grammar', 1, 12);

-- Insert Grammar Content
INSERT INTO grammar_content (topic, subtopic, explanation, examples, difficulty, unit_id) VALUES
('Tenses', 'Present Perfect Tense', 'The Present Perfect Tense is used to describe actions that started in the past and continue to the present, or actions that happened at an unspecified time in the past but have relevance to the present.', 'Examples: "I have just finished my homework." "She has been working here for five years." "They have visited Paris three times."', 'intermediate', 1),
('Connectors', 'Comparative and Contrastive Connectors', 'These connectives are used to show relationships between ideas, particularly comparisons and contrasts. They help create coherence in writing and speaking.', 'Examples: "My car is not comfortable in comparison with the old one." "I prefer busy cities. On the other hand, my brother prefers small villages." "Instead of jogging, let''s do some yoga."', 'intermediate', 1);

-- Insert Set Book Passages
INSERT INTO set_book_passages (passage_title, english_text, arabic_text, unit_id, grade_level) VALUES
('Justice and the Law', 'Justice is a fundamental concept in any civilized society. It represents the idea that all people should be treated fairly and equally under the law. In a just society, individuals have rights and responsibilities, and the legal system protects these rights while ensuring that everyone is held accountable for their actions. The pursuit of justice requires both laws that are fair and enforcement that is consistent. When these elements work together, society can achieve harmony and peace for all its members.', 'العدالة هي مفهوم أساسي في أي مجتمع متحضر. تمثل فكرة أن جميع الأشخاص يجب أن يُعاملوا بإنصاف وتكافؤ تحت القانون. في مجتمع عادل، للأفراد حقوق ومسؤوليات، ويحمي النظام القانوني هذه الحقوق مع ضمان محاسبة الجميع على أفعالهم. السعي لتحقيق العدالة يتطلب قوانين عادلة وإنفاذاً متسقاً. عندما تعمل هذه العناصر معاً، يمكن للمجتمع تحقيق الانسجام والسلام لجميع أعضائه.', 1, 12);

-- Create indexes for better performance
CREATE INDEX idx_vocabulary_unit_id ON vocabulary_words(unit_id);
CREATE INDEX idx_vocabulary_difficulty ON vocabulary_words(difficulty);
CREATE INDEX idx_questions_unit_id ON test_bank_questions(unit_id);
CREATE INDEX idx_questions_type ON test_bank_questions(question_type);
CREATE INDEX idx_grammar_unit_id ON grammar_content(unit_id);
CREATE INDEX idx_progress_user_id ON user_progress(user_id);

-- Display success message
SELECT 'Kuwait English Learning Platform database migration completed successfully!' as message;
SELECT COUNT(*) as vocabulary_words FROM vocabulary_words;
SELECT COUNT(*) as test_questions FROM test_bank_questions;
SELECT COUNT(*) as grammar_topics FROM grammar_content;
SELECT COUNT(*) as set_book_passages FROM set_book_passages;