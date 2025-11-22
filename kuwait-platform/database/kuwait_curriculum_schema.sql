-- Kuwait English Learning Platform - MySQL Database Schema
-- Educational platform for Kuwait's Ministry of Education English curriculum

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS kuwait_curriculum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kuwait_curriculum;

-- User profiles with Kuwait-specific requirements
CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT CHECK (age >= 10 AND age <= 19),
    grade_level ENUM('10', '11', '12') NOT NULL,
    preferred_language ENUM('english', 'arabic') DEFAULT 'english',
    theme_preference ENUM('light', 'dark') DEFAULT 'light',
    color_scheme ENUM('black_green_yellow', 'white_green_pale_yellow') DEFAULT 'white_green_pale_yellow',
    exam_goals TEXT,
    learning_plans TEXT,
    personal_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_grade_level (grade_level),
    INDEX idx_email (email)
);

-- Educational levels and curriculum structure
CREATE TABLE educational_levels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    level_name VARCHAR(100) NOT NULL,
    grade ENUM('10', '11', '12') NOT NULL,
    age_range VARCHAR(20),
    weight_in_final_grade DECIMAL(5,2) NOT NULL, -- 10%, 20%, 70% as per Kuwait system
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_grade (grade)
);

-- Subject areas for English curriculum
CREATE TABLE subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topics within each subject
CREATE TABLE topics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT NOT NULL,
    topic_name VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    INDEX idx_subject_id (subject_id)
);

-- Individual lessons with step-by-step content
CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    topic_id INT NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    lesson_description TEXT,
    content_type ENUM('interactive', 'presentation', 'exercise', 'assessment') DEFAULT 'interactive',
    estimated_duration INT, -- in minutes
    animation_steps JSON, -- Step-by-step PowerPoint-style animation data
    voice_explanations JSON, -- Audio content and voice instructions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    INDEX idx_topic_id (topic_id)
);

-- Kuwait exam components (8 official components)
CREATE TABLE kuwait_exam_components (
    id INT PRIMARY KEY AUTO_INCREMENT,
    component_name VARCHAR(100) NOT NULL,
    component_code VARCHAR(20) UNIQUE NOT NULL,
    weight_percentage DECIMAL(5,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Question types for assessment
CREATE TABLE question_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) NOT NULL,
    type_code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions database with Kuwait-specific content
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    component_id INT NOT NULL,
    question_type_id INT NOT NULL,
    grade_level ENUM('10', '11', '12') NOT NULL,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    question_text TEXT NOT NULL,
    options JSON, -- For multiple choice questions
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    tags JSON, -- For categorization and search
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (component_id) REFERENCES kuwait_exam_components(id) ON DELETE CASCADE,
    FOREIGN KEY (question_type_id) REFERENCES question_types(id) ON DELETE CASCADE,
    INDEX idx_component_grade (component_id, grade_level),
    INDEX idx_difficulty (difficulty_level)
);

-- User progress tracking
CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    time_spent INT DEFAULT 0, -- in seconds
    score DECIMAL(5,2) NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_lesson (user_id, lesson_id),
    INDEX idx_user_id (user_id)
);

-- User exam attempts and scores
CREATE TABLE user_exam_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    component_id INT NOT NULL,
    attempt_number INT DEFAULT 1,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    time_taken INT, -- in seconds
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    feedback JSON, -- AI-generated feedback and tips
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (component_id) REFERENCES kuwait_exam_components(id) ON DELETE CASCADE,
    INDEX idx_user_component (user_id, component_id),
    INDEX idx_attempt_date (attempt_date)
);

-- Interactive lesson content with animations
CREATE TABLE lesson_steps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NOT NULL,
    step_number INT NOT NULL,
    step_title VARCHAR(255) NOT NULL,
    step_content TEXT NOT NULL,
    animation_type ENUM('fade', 'slide', 'zoom', 'bounce', 'pulse') DEFAULT 'fade',
    duration_ms INT DEFAULT 1000, -- Animation duration
    voice_explanation TEXT, -- Audio explanation for this step
    interactive_element JSON, -- For quizzes, exercises, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    INDEX idx_lesson_number (lesson_id, step_number)
);

-- Performance analytics and insights
CREATE TABLE performance_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    component_id INT NOT NULL,
    total_attempts INT DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0,
    improvement_rate DECIMAL(5,2) DEFAULT 0, -- Percentage improvement
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strengths JSON, -- Areas where user excels
    weaknesses JSON, -- Areas needing improvement
    personalized_tips JSON, -- AI-generated recommendations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (component_id) REFERENCES kuwait_exam_components(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_component (user_id, component_id)
);

-- Themes and UI preferences
CREATE TABLE theme_configurations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    theme_name VARCHAR(50) NOT NULL,
    mode ENUM('light', 'dark') NOT NULL,
    color_scheme ENUM('black_green_yellow', 'white_green_pale_yellow') NOT NULL,
    primary_color VARCHAR(7) NOT NULL, -- Hex color code
    secondary_color VARCHAR(7) NOT NULL,
    accent_color VARCHAR(7) NOT NULL,
    text_color VARCHAR(7) NOT NULL,
    background_color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Voice/audio content management
CREATE TABLE audio_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NULL,
    step_id INT NULL,
    content_type ENUM('lesson_explanation', 'pronunciation', 'voice_exercise', 'exam_instruction') NOT NULL,
    language ENUM('english', 'arabic') NOT NULL,
    audio_url VARCHAR(500),
    transcript TEXT,
    duration_ms INT,
    file_size_kb INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES lesson_steps(id) ON DELETE CASCADE,
    INDEX idx_lesson_audio (lesson_id),
    INDEX idx_step_audio (step_id)
);

-- Insert default Kuwait exam components (8 components as per Ministry of Education)
INSERT INTO kuwait_exam_components (component_name, component_code, weight_percentage, description) VALUES
('Vocabulary Assessment', 'VOCAB', 12.5, 'Assessment of vocabulary knowledge and usage'),
('Grammar Questions', 'GRAMMAR', 12.5, 'Testing grammatical structures and rules'),
('Language Functions', 'LANG_FUNC', 12.5, 'Evaluation of language usage in real contexts'),
('Set Book Questions', 'SET_BOOK', 12.5, 'Questions based on prescribed literature texts'),
('Expository Writing', 'EXP_WRITING', 12.5, 'Assessment of expository writing skills'),
('Reading Comprehension', 'READ_COMP', 12.5, 'Evaluation of reading and comprehension abilities'),
('Summary Making', 'SUMMARY', 12.5, 'Testing ability to create concise summaries'),
('Translation', 'TRANSLATION', 12.5, 'Arabic to English and English to Arabic translation');

-- Insert question types
INSERT INTO question_types (type_name, type_code, description) VALUES
('Multiple Choice', 'MCQ', 'Multiple choice questions with single correct answer'),
('True/False', 'TRUE_FALSE', 'True or false statements'),
('Fill in the Blanks', 'FILL_BLANKS', 'Complete sentences with missing words'),
('Essay', 'ESSAY', 'Long-form written responses'),
('Short Answer', 'SHORT_ANSWER', 'Brief written responses'),
('Translation', 'TRANSLATION', 'Translation between Arabic and English');

-- Insert default theme configurations
INSERT INTO theme_configurations (theme_name, mode, color_scheme, primary_color, secondary_color, accent_color, text_color, background_color) VALUES
('Light Mode 1', 'light', 'white_green_pale_yellow', '#10B981', '#E5E7EB', '#FEF3C7', '#1F2937', '#FFFFFF'),
('Light Mode 2', 'light', 'black_green_yellow', '#10B981', '#000000', '#FDE047', '#000000', '#FFFFFF'),
('Dark Mode 1', 'dark', 'white_green_pale_yellow', '#10B981', '#374151', '#FEF3C7', '#F9FAFB', '#1F2937'),
('Dark Mode 2', 'dark', 'black_green_yellow', '#10B981', '#000000', '#FDE047', '#F9FAFB', '#111827');

-- Insert educational levels with Kuwait grading weights
INSERT INTO educational_levels (level_name, grade, age_range, weight_in_final_grade, description) VALUES
('Grade 10 - Second Form', '10', '15-16', 10.00, 'Foundation level English, 10% of final grade'),
('Grade 11 - Third Form', '11', '16-17', 20.00, 'Intermediate level English, 20% of final grade'),
('Grade 12 - Fourth Form', '12', '17-18', 70.00, 'Advanced level English, 70% of final grade - most important');

-- Insert default subject
INSERT INTO subjects (subject_name, subject_code, description) VALUES
('English Language', 'ENG', 'English Language curriculum for Kuwait Ministry of Education');

-- Insert core topics for English curriculum
INSERT INTO topics (subject_id, topic_name, description, difficulty_level) VALUES
(1, 'Basic Grammar Structures', 'Fundamental grammar rules and patterns', 'beginner'),
(1, 'Vocabulary Building', 'Expanding English vocabulary and word usage', 'intermediate'),
(1, 'Reading Comprehension', 'Developing reading and understanding skills', 'intermediate'),
(1, 'Writing Skills', 'Expository and creative writing techniques', 'advanced'),
(1, 'Language Functions', 'Practical language use in real contexts', 'intermediate'),
(1, 'Translation Skills', 'Arabic-English translation techniques', 'advanced');

COMMIT;