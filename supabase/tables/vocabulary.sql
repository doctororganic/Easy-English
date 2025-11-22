CREATE TABLE vocabulary (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER NOT NULL,
    word VARCHAR(255) NOT NULL,
    part_of_speech VARCHAR(100),
    english_meaning TEXT NOT NULL,
    arabic_translation VARCHAR(255),
    example_sentence TEXT,
    example_translation VARCHAR(255),
    difficulty_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);