CREATE TABLE trial_exam_questions (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(100),
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer VARCHAR(1) NOT NULL,
    explanation TEXT,
    topic_category VARCHAR(100),
    difficulty_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);