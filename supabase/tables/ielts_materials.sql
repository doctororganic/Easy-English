CREATE TABLE ielts_materials (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    difficulty_level VARCHAR(50),
    audio_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);