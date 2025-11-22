# Kuwait English Learning Platform - Database Schema Documentation

## Overview

This document provides comprehensive documentation for the MySQL database schema designed for the Kuwait English Learning Platform. The schema is optimized for educational content management, user progress tracking, and exam simulation systems.

**Version:** 1.0  
**Created:** 2025-11-08  
**Database Engine:** MySQL 8.0+  
**Character Set:** UTF8MB4  
**Collation:** utf8mb4_unicode_ci  

## Table of Contents

1. [Schema Architecture](#schema-architecture)
2. [Core Tables](#core-tables)
3. [Educational Content Tables](#educational-content-tables)
4. [Assessment Tables](#assessment-tables)
5. [User Progress Tables](#user-progress-tables)
6. [Interactive Content Tables](#interactive-content-tables)
7. [Analytics and Feedback Tables](#analytics-and-feedback-tables)
8. [Relationships and Foreign Keys](#relationships-and-foreign-keys)
9. [Indexes and Performance](#indexes-and-performance)
10. [Data Types and Constraints](#data-types-and-constraints)
11. [Sample Queries](#sample-queries)
12. [Maintenance and Best Practices](#maintenance-and-best-practices)

## Schema Architecture

### Design Principles

1. **Normalization**: The schema follows 3NF to reduce data redundancy
2. **Scalability**: Designed to handle thousands of users and millions of records
3. **Performance**: Strategic indexing for common query patterns
4. **Flexibility**: JSON fields for dynamic content and analytics data
5. **Auditability**: Timestamp fields for tracking changes
6. **Data Integrity**: Foreign key constraints and check constraints

### Core Design Decisions

- **User-Centric Design**: All progress tracking is centered around user_id
- **Hierarchical Content**: Grade Levels → Subjects → Topics → Lessons → Content
- **Flexible Assessment**: Generic question system supporting multiple exam types
- **Progress Tracking**: Comprehensive progress logging with status management
- **Analytics Ready**: Pre-computed analytics for performance tracking

## Core Tables

### 1. user_profiles

**Purpose**: Central user information and preferences

```sql
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
  -- ... timestamps
)
```

**Key Features**:
- Unique email constraint
- JSON-friendly text fields for flexible data storage
- Theme preference for UI customization
- Active status for soft deletion

**Indexes**:
- Primary key on `id`
- Unique index on `email`
- Indexes on `created_at` and `is_active` for filtering

### 2. grade_levels

**Purpose**: Reference table for educational levels

```sql
CREATE TABLE `grade_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(50) NOT NULL,
  `level_order` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `age_range_min` int(3) DEFAULT NULL,
  `age_range_max` int(3) DEFAULT NULL,
  -- ... status fields
)
```

**Key Features**:
- Ordered levels for proper curriculum sequencing
- Age range mapping for grade placement
- Unique constraint on `level_order`

## Educational Content Tables

### 3. subjects

**Purpose**: Main subject categories linked to grade levels

**Relationships**:
- Foreign key to `grade_levels`
- One-to-many with `topics`

**Key Features**:
- Subject code for system references
- Display order for UI presentation
- Active status for content management

### 4. topics

**Purpose**: Subdivisions within subjects

**Relationships**:
- Foreign key to `subjects`
- One-to-many with `lessons`

**Key Features**:
- Estimated duration for progress planning
- Topic code for content referencing
- Cascade delete for data integrity

### 5. lessons

**Purpose**: Individual learning units

**Relationships**:
- Foreign keys to `topics` and `difficulty_levels`
- One-to-many with `interactive_lesson_content`
- One-to-many with `user_progress`

**Key Features**:
- Interactive flag for multimedia content
- Difficulty level classification
- Duration estimation for scheduling

### 6. difficulty_levels

**Purpose**: Standardized difficulty classification

**Data**:
```
Level 1: Beginner (Green)
Level 2: Elementary (Teal)
Level 3: Intermediate (Yellow)
Level 4: Upper Intermediate (Orange)
Level 5: Advanced (Red)
Level 6: Expert (Purple)
```

**Key Features**:
- Unique level values
- Color coding for UI
- Consistent across all content

## Assessment Tables

### 7. question_types

**Purpose**: Standardized question type classification

**Supported Types**:
- MCQ (Multiple Choice)
- TF (True/False)
- FIB (Fill in the Blank)
- ESSAY (Essay)
- MATCH (Matching)
- DnD (Drag and Drop)
- AUDIO (Audio Based)
- RC (Reading Comprehension)

### 8. questions

**Purpose**: Central question repository

```sql
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
  -- ... status and timestamps
)
```

**Key Features**:
- JSON fields for flexible data storage
- Media file support
- Points and time limit configuration
- Tag-based organization

### 9. kuwait_exam_simulations

**Purpose**: Exam configuration and structure

**Exam Types**:
- primary (Primary school assessments)
- intermediate (Middle school assessments)
- secondary (High school assessments)
- ieltstoefl (International tests)
- general (General proficiency)

**Key Features**:
- Duration and question count specification
- Passing score thresholds
- Difficulty distribution (JSON)
- Comprehensive instructions

### 10. exam_question_mappings

**Purpose**: Link questions to specific exam instances

**Key Features**:
- Question ordering within exams
- Section organization
- Time allocation per question
- Unique constraint on exam + order combination

## User Progress Tables

### 11. user_progress

**Purpose**: Track user progress through individual lessons

```sql
CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `status` enum('not_started','in_progress','completed','failed') DEFAULT 'not_started',
  `score` decimal(5,2) DEFAULT NULL,
  `time_spent_minutes` int(11) DEFAULT 0,
  `attempts_count` int(11) DEFAULT 1,
  -- ... timestamps
)
```

**Status Values**:
- `not_started`: Lesson not yet begun
- `in_progress`: Currently being studied
- `completed`: Successfully finished
- `failed`: Completed but below passing threshold

**Key Features**:
- Unique constraint on user + lesson combination
- Score tracking with decimal precision
- Attempt counting
- Time spent aggregation

### 12. user_exam_attempts

**Purpose**: Track complete exam sessions

```sql
CREATE TABLE `user_exam_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `attempt_number` int(11) NOT NULL,
  `status` enum('in_progress','completed','abandoned') DEFAULT 'in_progress',
  `total_score` decimal(5,2) DEFAULT NULL,
  `percentage_score` decimal(5,2) DEFAULT NULL,
  `time_taken_minutes` int(11) DEFAULT NULL,
  `answers_data` json DEFAULT NULL,
  -- ... timestamps
)
```

**Key Features**:
- Multiple attempt tracking per exam
- JSON storage for detailed answers
- Both absolute and percentage scoring
- Comprehensive timing data

## Interactive Content Tables

### 13. interactive_lesson_content

**Purpose**: Step-by-step interactive content for lessons

```sql
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
  -- ... ordering and status
)
```

**Content Types**:
- `text`: Plain text content
- `animation`: Animated explanations
- `voice`: Audio narration
- `video`: Video content
- `interactive`: Interactive elements

**Key Features**:
- Step-by-step progression
- Media file support
- JSON interaction data
- Ordered presentation

## Analytics and Feedback Tables

### 14. performance_analytics

**Purpose**: Pre-computed user performance metrics

```sql
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
  -- ... timestamps
)
```

**Analytics Metrics**:
- Lesson completion counts
- Time investment tracking
- Score averaging
- Subject strength/weakness analysis
- Trend identification
- Streak counting

### 15. user_feedback

**Purpose**: Personalized tips and performance feedback

```sql
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
  -- ... timestamps
)
```

**Feedback Types**:
- `personalized_tip`: Targeted learning advice
- `performance_feedback`: Score-based insights
- `encouragement`: Motivational messages
- `suggestion`: Learning path recommendations

### 16. user_notes

**Purpose**: User-created notes and annotations

```sql
CREATE TABLE `user_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `related_type` enum('lesson','topic','subject','general') DEFAULT 'general',
  `related_id` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` longtext NOT NULL,
  `tags` json DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT 1,
  -- ... timestamps
)
```

**Key Features**:
- Contextual linking to lessons/topics/subjects
- Tag-based organization
- Privacy controls
- Rich text content

## Relationships and Foreign Keys

### Primary Relationships

1. **Educational Hierarchy**:
   ```
   grade_levels → subjects → topics → lessons → interactive_lesson_content
   ```

2. **User Progress Chain**:
   ```
   user_profiles → user_progress → lessons
   user_profiles → user_exam_attempts → kuwait_exam_simulations
   ```

3. **Question Management**:
   ```
   question_types, difficulty_levels → questions → exam_question_mappings → kuwait_exam_simulations
   ```

4. **Subject Classification**:
   ```
   subjects, topics → questions
   lessons → questions
   ```

### Foreign Key Constraints

All foreign keys use `ON DELETE CASCADE` where appropriate to maintain referential integrity:

- User progress and exam attempts cascade on user deletion
- Educational content cascades on parent deletion
- Optional references (subject_id, topic_id in questions) use `ON DELETE SET NULL`

### Referential Integrity

- **User profiles**: Referenced by all user-specific tables
- **Educational content**: Structured hierarchy with cascade deletes
- **Questions**: Reusable across multiple contexts (subjects, exams)
- **Progress tracking**: Unique constraints prevent duplicate progress entries

## Indexes and Performance

### Index Strategy

1. **Primary Keys**: All tables have auto-increment primary keys
2. **Foreign Key Indexes**: Automatically created for foreign key columns
3. **Query Optimization Indexes**: Additional indexes on frequently queried columns

### Key Indexes

```sql
-- User performance queries
user_profiles: email (UNIQUE), created_at, is_active
user_progress: user_id, lesson_id (UNIQUE), status, last_accessed_at
user_exam_attempts: user_id, exam_id, attempt_number (UNIQUE), status

-- Content navigation
subjects: grade_level_id, display_order
topics: subject_id, display_order
lessons: topic_id, difficulty_level_id, display_order

-- Question selection
questions: question_type_id, difficulty_level_id, subject_id, topic_id
exam_question_mappings: exam_id, question_id (UNIQUE)
```

### Performance Considerations

1. **Composite Indexes**: Consider adding for complex WHERE clauses
2. **Index Maintenance**: Regular `ANALYZE TABLE` for query optimization
3. **Pagination**: Use LIMIT with proper ordering for large datasets
4. **JSON Queries**: MySQL 8.0+ supports JSON indexing for performance

## Data Types and Constraints

### Data Type Guidelines

1. **IDs**: `int(11) AUTO_INCREMENT` for scalability
2. **Text Fields**: `varchar()` for short text, `longtext` for content
3. **JSON**: Used for flexible, structured data
4. **Timestamps**: `timestamp` with automatic updating
5. **Decimals**: `decimal(5,2)` for scores and percentages
6. **Booleans**: `tinyint(1)` for flags and status

### Constraint Types

1. **NOT NULL**: Core required fields
2. **UNIQUE**: Email addresses, order sequences
3. **ENUM**: Controlled vocabularies for status and types
4. **FOREIGN KEY**: Referential integrity
5. **CHECK**: Additional validation (can be added)

### Data Validation

```sql
-- Example additional constraints
ALTER TABLE user_profiles ADD CONSTRAINT chk_age 
CHECK (age IS NULL OR (age >= 3 AND age <= 99));

ALTER TABLE questions ADD CONSTRAINT chk_points 
CHECK (points > 0 AND points <= 100);
```

## Sample Queries

### User Progress Analysis

```sql
-- Get user's current progress summary
SELECT 
    up.status,
    COUNT(*) as lesson_count,
    AVG(up.score) as average_score,
    SUM(up.time_spent_minutes) as total_time
FROM user_progress up
WHERE up.user_id = ?
GROUP BY up.status;

-- Find user's weakest subjects
SELECT 
    s.name as subject_name,
    AVG(up.score) as avg_score,
    COUNT(*) as lessons_attempted
FROM user_progress up
JOIN lessons l ON up.lesson_id = l.id
JOIN topics t ON l.topic_id = t.id
JOIN subjects s ON t.subject_id = s.id
WHERE up.user_id = ? AND up.status = 'completed'
GROUP BY s.id
ORDER BY avg_score ASC
LIMIT 5;
```

### Content Navigation

```sql
-- Get complete curriculum hierarchy
SELECT 
    gl.level_name,
    s.name as subject_name,
    t.name as topic_name,
    l.title as lesson_title,
    dl.level_name as difficulty
FROM grade_levels gl
JOIN subjects s ON gl.id = s.grade_level_id
JOIN topics t ON s.id = t.subject_id
JOIN lessons l ON t.id = l.topic_id
JOIN difficulty_levels dl ON l.difficulty_level_id = dl.id
WHERE gl.id = ?
ORDER BY s.display_order, t.display_order, l.display_order;
```

### Exam Performance

```sql
-- User's exam history with trends
SELECT 
    kes.exam_name,
    uea.attempt_number,
    uea.total_score,
    uea.percentage_score,
    uea.time_taken_minutes,
    uea.completed_at
FROM user_exam_attempts uea
JOIN kuwait_exam_simulations kes ON uea.exam_id = kes.id
WHERE uea.user_id = ?
ORDER BY uea.completed_at DESC;
```

### Analytics Queries

```sql
-- Daily user activity
SELECT 
    analytics_date,
    total_lessons_completed,
    total_time_spent_minutes,
    average_score,
    improvement_trend,
    weekly_streak_days
FROM performance_analytics
WHERE user_id = ?
ORDER BY analytics_date DESC
LIMIT 30;
```

## Maintenance and Best Practices

### Database Maintenance

1. **Regular Backups**: Implement automated daily backups
2. **Index Optimization**: Run `ANALYZE TABLE` weekly
3. **Data Cleanup**: Archive old exam attempts and progress data
4. **Performance Monitoring**: Track slow queries and optimize

### Security Considerations

1. **User Data**: Encrypt sensitive personal information
2. **SQL Injection**: Use parameterized queries only
3. **Access Control**: Implement role-based permissions
4. **Audit Logging**: Log all data modifications

### Scalability Planning

1. **Read Replicas**: Consider read replicas for reporting queries
2. **Partitioning**: Large tables (questions, progress) may need partitioning
3. **Caching**: Implement Redis for frequently accessed content
4. **Archival Strategy**: Move old data to separate databases

### Development Guidelines

1. **Version Control**: Database changes should be versioned
2. **Migration Scripts**: All schema changes via migration scripts
3. **Testing**: Test queries on production-sized datasets
4. **Documentation**: Keep schema documentation updated

## Future Enhancements

### Potential Additions

1. **Multi-language Support**: Add language-specific content tables
2. **Collaborative Features**: User discussion and peer interaction
3. **Advanced Analytics**: Machine learning-based performance prediction
4. **Mobile Optimization**: Offline sync capabilities
5. **Integration APIs**: External learning management system integration

### Schema Evolution

The schema is designed to be extensible while maintaining backward compatibility. New features can be added through:

- Additional tables for new functionality
- JSON fields for flexible data storage
- New enum values for controlled vocabularies
- Index additions for performance optimization

---

**Document Version**: 1.0  
**Last Updated**: 2025-11-08  
**Next Review**: 2025-12-08