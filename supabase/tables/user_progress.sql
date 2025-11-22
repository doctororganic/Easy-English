CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    score INTEGER,
    max_score INTEGER,
    time_spent INTEGER,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);