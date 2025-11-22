CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    grade_level INTEGER,
    preferred_language VARCHAR(50) DEFAULT 'en',
    theme_mode VARCHAR(20) DEFAULT 'light',
    progress_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);