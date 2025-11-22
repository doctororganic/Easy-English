CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    grade_number INTEGER NOT NULL,
    grade_name VARCHAR(100) NOT NULL,
    description TEXT
);