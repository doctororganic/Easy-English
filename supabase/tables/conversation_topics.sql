CREATE TABLE conversation_topics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    vocabulary TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);