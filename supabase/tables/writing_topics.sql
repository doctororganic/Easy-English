CREATE TABLE writing_topics (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER NOT NULL,
    topic_title VARCHAR(255) NOT NULL,
    topic_description TEXT,
    outline_points TEXT,
    enhancement_tips TEXT,
    sample_answer TEXT,
    difficulty_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);