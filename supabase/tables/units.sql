CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER NOT NULL,
    unit_number INTEGER NOT NULL,
    unit_title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);