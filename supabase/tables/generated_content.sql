CREATE TABLE generated_content (
    id SERIAL PRIMARY KEY,
    content_type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    file_url VARCHAR(500),
    metadata JSONB,
    user_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);