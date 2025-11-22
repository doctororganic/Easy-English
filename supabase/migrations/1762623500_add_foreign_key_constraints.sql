-- Migration: add_foreign_key_constraints
-- Created at: 1762623500

-- Add foreign key constraints for better relationships
ALTER TABLE lessons
ADD CONSTRAINT fk_lessons_component
FOREIGN KEY (component_id) REFERENCES exam_components(id);

ALTER TABLE questions
ADD CONSTRAINT fk_questions_component
FOREIGN KEY (component_id) REFERENCES exam_components(id);;