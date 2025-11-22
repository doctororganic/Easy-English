-- =====================================================
-- Kuwait English Learning Platform - MySQL Database Schema
-- Created: 2025-11-08
-- =====================================================

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- =====================================================
-- 1. USER PROFILES TABLE
-- =====================================================
CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `age` int(3) DEFAULT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `goals` text DEFAULT NULL,
  `learning_plans` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `preferred_language` varchar(10) DEFAULT 'en',
  `theme_preference` enum('light','dark','auto') DEFAULT 'auto',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. GRADE LEVELS TABLE
-- =====================================================
CREATE TABLE `grade_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(50) NOT NULL,
  `level_order` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `age_range_min` int(3) DEFAULT NULL,
  `age_range_max` int(3) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_level_order` (`level_order`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. SUBJECTS TABLE
-- =====================================================
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `subject_code` varchar(20) DEFAULT NULL,
  `grade_level_id` int(11) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_subjects_grade_level` (`grade_level_id`),
  KEY `idx_display_order` (`display_order`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `fk_subjects_grade_level` FOREIGN KEY (`grade_level_id`) REFERENCES `grade_levels` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. TOPICS TABLE
-- =====================================================
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `topic_code` varchar(20) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `estimated_duration_minutes` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_topics_subject` (`subject_id`),
  KEY `idx_display_order` (`display_order`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `fk_topics_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. LESSONS TABLE
-- =====================================================
CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `lesson_code` varchar(20) DEFAULT NULL,
  `difficulty_level_id` int(11) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `estimated_duration_minutes` int(11) DEFAULT NULL,
  `is_interactive` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_lessons_topic` (`topic_id`),
  KEY `fk_lessons_difficulty` (`difficulty_level_id`),
  KEY `idx_display_order` (`display_order`),
  KEY `idx_is_active` (`is_active`),
  KEY `idx_is_interactive` (`is_interactive`),
  CONSTRAINT `fk_lessons_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_lessons_difficulty` FOREIGN KEY (`difficulty_level_id`) REFERENCES `difficulty_levels` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. DIFFICULTY LEVELS TABLE
-- =====================================================
CREATE TABLE `difficulty_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(50) NOT NULL,
  `level_value` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `color_code` varchar(7) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_level_value` (`level_value`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. INTERACTIVE LESSON CONTENT TABLE
-- =====================================================
CREATE TABLE `interactive_lesson_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `content_type` enum('text','animation','voice','video','interactive') NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` longtext NOT NULL,
  `animation_file_path` varchar(500) DEFAULT NULL,
  `voice_explanation_file_path` varchar(500) DEFAULT NULL,
  `video_file_path` varchar(500) DEFAULT NULL,
  `interaction_data` json DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_lesson_step` (`lesson_id`, `step_number`),
  KEY `fk_interactive_content_lesson` (`lesson_id`),
  KEY `idx_content_type` (`content_type`),
  KEY `idx_display_order` (`display_order`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `fk_interactive_content_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. QUESTION TYPES TABLE
-- =====================================================
CREATE TABLE `question_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL,
  `type_code` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_type_code` (`type_code`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. QUESTIONS TABLE
-- =====================================================
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` longtext NOT NULL,
  `question_type_id` int(11) NOT NULL,
  `difficulty_level_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `options` json DEFAULT NULL,
  `correct_answer` longtext NOT NULL,
  `explanation` longtext DEFAULT NULL,
  `points` int(11) DEFAULT 1,
  `time_limit_seconds` int(11) DEFAULT NULL,
  `media_file_path` varchar(500) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_questions_type` (`question_type_id`),
  KEY `fk_questions_difficulty` (`difficulty_level_id`),
  KEY `fk_questions_subject` (`subject_id`),
  KEY `fk_questions_topic` (`topic_id`),
  KEY `idx_points` (`points`),
  KEY `idx_is_active` (`is_active`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_questions_type` FOREIGN KEY (`question_type_id`) REFERENCES `question_types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_questions_difficulty` FOREIGN KEY (`difficulty_level_id`) REFERENCES `difficulty_levels` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_questions_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_questions_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. KUWAIT EXAM SIMULATIONS TABLE
-- =====================================================
CREATE TABLE `kuwait_exam_simulations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(200) NOT NULL,
  `exam_type` enum('primary','intermediate','secondary','ieltstoefl','general') NOT NULL,
  `description` text DEFAULT NULL,
  `total_duration_minutes` int(11) NOT NULL,
  `total_questions` int(11) NOT NULL,
  `passing_score` decimal(5,2) DEFAULT NULL,
  `difficulty_mix` json DEFAULT NULL,
  `instructions` longtext DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_exam_type` (`exam_type`),
  KEY `idx_is_active` (`is_active`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 11. EXAM QUESTION MAPPINGS TABLE
-- =====================================================
CREATE TABLE `exam_question_mappings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_order` int(11) NOT NULL,
  `section_name` varchar(100) DEFAULT NULL,
  `time_allocation_seconds` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_exam_question_order` (`exam_id`, `question_order`),
  KEY `fk_exam_mapping_exam` (`exam_id`),
  KEY `fk_exam_mapping_question` (`question_id`),
  CONSTRAINT `fk_exam_mapping_exam` FOREIGN KEY (`exam_id`) REFERENCES `kuwait_exam_simulations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_exam_mapping_question` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 12. USER PROGRESS TABLE
-- =====================================================
CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `status` enum('not_started','in_progress','completed','failed') DEFAULT 'not_started',
  `score` decimal(5,2) DEFAULT NULL,
  `time_spent_minutes` int(11) DEFAULT 0,
  `attempts_count` int(11) DEFAULT 1,
  `last_accessed_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_lesson` (`user_id`, `lesson_id`),
  KEY `fk_user_progress_user` (`user_id`),
  KEY `fk_user_progress_lesson` (`lesson_id`),
  KEY `idx_status` (`status`),
  KEY `idx_score` (`score`),
  KEY `idx_last_accessed` (`last_accessed_at`),
  KEY `idx_completed_at` (`completed_at`),
  CONSTRAINT `fk_user_progress_user` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_progress_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 13. USER EXAM ATTEMPTS TABLE
-- =====================================================
CREATE TABLE `user_exam_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `attempt_number` int(11) NOT NULL,
  `status` enum('in_progress','completed','abandoned') DEFAULT 'in_progress',
  `total_score` decimal(5,2) DEFAULT NULL,
  `percentage_score` decimal(5,2) DEFAULT NULL,
  `time_taken_minutes` int(11) DEFAULT NULL,
  `started_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL DEFAULT NULL,
  `answers_data` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_exam_attempt` (`user_id`, `exam_id`, `attempt_number`),
  KEY `fk_exam_attempts_user` (`user_id`),
  KEY `fk_exam_attempts_exam` (`exam_id`),
  KEY `idx_status` (`status`),
  KEY `idx_total_score` (`total_score`),
  KEY `idx_started_at` (`started_at`),
  KEY `idx_completed_at` (`completed_at`),
  CONSTRAINT `fk_exam_attempts_user` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_exam_attempts_exam` FOREIGN KEY (`exam_id`) REFERENCES `kuwait_exam_simulations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 14. PERFORMANCE ANALYTICS TABLE
-- =====================================================
CREATE TABLE `performance_analytics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `analytics_date` date NOT NULL,
  `total_lessons_completed` int(11) DEFAULT 0,
  `total_time_spent_minutes` int(11) DEFAULT 0,
  `average_score` decimal(5,2) DEFAULT NULL,
  `weakest_subjects` json DEFAULT NULL,
  `strongest_subjects` json DEFAULT NULL,
  `improvement_trend` enum('improving','declining','stable') DEFAULT 'stable',
  `weekly_streak_days` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_date` (`user_id`, `analytics_date`),
  KEY `fk_performance_analytics_user` (`user_id`),
  KEY `idx_analytics_date` (`analytics_date`),
  KEY `idx_improvement_trend` (`improvement_trend`),
  KEY `idx_weekly_streak` (`weekly_streak_days`),
  CONSTRAINT `fk_performance_analytics_user` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 15. USER FEEDBACK AND TIPS TABLE
-- =====================================================
CREATE TABLE `user_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `feedback_type` enum('personalized_tip','performance_feedback','encouragement','suggestion') NOT NULL,
  `title` varchar(200) NOT NULL,
  `message` longtext NOT NULL,
  `context_data` json DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `is_read` tinyint(1) DEFAULT 0,
  `is_dismissed` tinyint(1) DEFAULT 0,
  `related_lesson_id` int(11) DEFAULT NULL,
  `related_exam_id` int(11) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `read_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_feedback_user` (`user_id`),
  KEY `idx_feedback_type` (`feedback_type`),
  KEY `idx_priority` (`priority`),
  KEY `idx_is_read` (`is_read`),
  KEY `idx_is_dismissed` (`is_dismissed`),
  KEY `fk_feedback_lesson` (`related_lesson_id`),
  KEY `fk_feedback_exam` (`related_exam_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_user_feedback_user` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_lesson` FOREIGN KEY (`related_lesson_id`) REFERENCES `lessons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_exam` FOREIGN KEY (`related_exam_id`) REFERENCES `kuwait_exam_simulations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 16. USER NOTES TABLE
-- =====================================================
CREATE TABLE `user_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `related_type` enum('lesson','topic','subject','general') DEFAULT 'general',
  `related_id` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` longtext NOT NULL,
  `tags` json DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_notes_user` (`user_id`),
  KEY `idx_related_type` (`related_type`),
  KEY `idx_related_id` (`related_id`),
  KEY `idx_is_private` (`is_private`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_user_notes_user` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- DATA INSERTS
-- =====================================================

-- Insert default difficulty levels
INSERT INTO `difficulty_levels` (`level_name`, `level_value`, `description`, `color_code`) VALUES
('Beginner', 1, 'Basic level suitable for new learners', '#28a745'),
('Elementary', 2, 'Elementary level with basic concepts', '#17a2b8'),
('Intermediate', 3, 'Intermediate level with moderate complexity', '#ffc107'),
('Upper Intermediate', 4, 'Upper intermediate level', '#fd7e14'),
('Advanced', 5, 'Advanced level for proficient learners', '#dc3545'),
('Expert', 6, 'Expert level for mastery', '#6f42c1');

-- Insert default question types
INSERT INTO `question_types` (`type_name`, `type_code`, `description`) VALUES
('Multiple Choice', 'MCQ', 'Single correct answer from multiple options'),
('True/False', 'TF', 'True or False questions'),
('Fill in the Blank', 'FIB', 'Complete the missing word or phrase'),
('Essay', 'ESSAY', 'Open-ended written response'),
('Matching', 'MATCH', 'Match related items'),
('Drag and Drop', 'DnD', 'Interactive drag and drop questions'),
('Audio Based', 'AUDIO', 'Questions based on audio content'),
('Reading Comprehension', 'RC', 'Questions based on reading passages');

-- Insert default grade levels
INSERT INTO `grade_levels` (`level_name`, `level_order`, `description`, `age_range_min`, `age_range_max`) VALUES
('Kindergarten', 1, 'Pre-primary education', 4, 6),
('Grade 1', 2, 'First grade primary', 6, 7),
('Grade 2', 3, 'Second grade primary', 7, 8),
('Grade 3', 4, 'Third grade primary', 8, 9),
('Grade 4', 5, 'Fourth grade primary', 9, 10),
('Grade 5', 6, 'Fifth grade primary', 10, 11),
('Grade 6', 7, 'Sixth grade primary', 11, 12),
('Grade 7', 8, 'First grade intermediate', 12, 13),
('Grade 8', 9, 'Second grade intermediate', 13, 14),
('Grade 9', 10, 'Third grade intermediate', 14, 15),
('Grade 10', 11, 'First grade secondary', 15, 16),
('Grade 11', 12, 'Second grade secondary', 16, 17),
('Grade 12', 13, 'Third grade secondary', 17, 18),
('Adult Education', 14, 'Adult learning programs', 18, 99);

-- Insert sample Kuwait exam simulations
INSERT INTO `kuwait_exam_simulations` (`exam_name`, `exam_type`, `description`, `total_duration_minutes`, `total_questions`, `passing_score`, `difficulty_mix`) VALUES
('Kuwait Primary English Assessment', 'primary', 'English assessment for primary school students', 60, 30, 70.00, '{"beginner": 40, "elementary": 60}'),
('Kuwait Intermediate English Exam', 'intermediate', 'English proficiency test for intermediate level', 90, 50, 75.00, '{"elementary": 30, "intermediate": 70}'),
('Kuwait Secondary English Assessment', 'secondary', 'English assessment for secondary school students', 120, 60, 80.00, '{"intermediate": 50, "upper_intermediate": 30, "advanced": 20}'),
('IELTS Kuwait Simulation', 'ieltstoefl', 'IELTS preparation exam simulation', 180, 80, 75.00, '{"intermediate": 20, "upper_intermediate": 50, "advanced": 30}'),
('TOEFL Kuwait Practice', 'ieltstoefl', 'TOEFL iBT practice test for Kuwait students', 180, 60, 80.00, '{"upper_intermediate": 30, "advanced": 70}'),
('General English Proficiency Test', 'general', 'General English language assessment', 90, 40, 75.00, '{"elementary": 20, "intermediate": 50, "upper_intermediate": 30}');

COMMIT;