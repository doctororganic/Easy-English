CREATE TABLE setbook_questions (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(100),
    answer_text TEXT,
    arabic_translation TEXT,
    difficulty_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);