CREATE TABLE translation_exercises (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(100),
    correct_answer TEXT,
    arabic_answer TEXT,
    difficulty_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);