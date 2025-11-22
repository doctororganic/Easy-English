# Kuwait Secondary School Database Schema - Setup Guide

## Overview
This guide provides step-by-step instructions for setting up the Kuwait Secondary School database schema in Supabase, designed specifically for Classes 10-12 with comprehensive curriculum management.

## Prerequisites
- Access to Supabase project dashboard
- Admin permissions to create tables and RLS policies
- Supabase Project URL: https://hkljprwxvdoxorhcbvpo.supabase.co

## Step 1: Create Database Schema

### 1.1 Access Supabase SQL Editor
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `hkljprwxvdoxorhcbvpo`
3. Navigate to **SQL Editor** in the left sidebar
4. Create a new query

### 1.2 Execute Schema Creation
Copy and paste the contents of `kuwait_school_schema.sql` into the SQL Editor and execute.

**Tables Created:**
- `kuwait_classes` - Kuwait Secondary School Classes (10-12)
- `kuwait_units` - Units within each class
- `kuwait_vocabulary` - Enhanced vocabulary linked to classes and units
- `grammar_content` - Extracted grammar content from PDFs
- `grammar_questions` - Generated grammar questions
- `user_progress` - User progress tracking
- `learning_sessions` - Learning session records
- `curriculum_config` - Kuwait curriculum configuration

### 1.3 Verify Schema Creation
Run this query to verify all tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'kuwait_%' 
ORDER BY table_name;
```

Expected result: 8 tables starting with "kuwait_"

## Step 2: Set Up Row Level Security (RLS)

### 2.1 Execute RLS Policies
Copy and paste the contents of `kuwait_rls_policies.sql` into the SQL Editor and execute.

**Security Features:**
- Public read access to curriculum content
- Role-based access control (admin, teacher, student)
- User progress privacy protection
- Secure vocabulary practice tracking

## Step 3: Populate Sample Data

### 3.1 Manual Data Insertion
The schema includes sample data in comments. Execute this to insert initial Kuwait classes:

```sql
-- Insert Kuwait Classes
INSERT INTO kuwait_classes (class_number, class_name_en, class_name_ar, description, academic_year, is_active) VALUES
(10, 'Class 10', 'الصف العاشر', 'Foundation level for Kuwait secondary education', '2024-2025', true),
(11, 'Class 11', 'الصف الحادي عشر', 'Intermediate level with advanced topics', '2024-2025', true),
(12, 'Class 12', 'الصف الثاني عشر', 'Advanced level preparing for university entrance', '2024-2025', true);

-- Insert Kuwait Units for Class 10
INSERT INTO kuwait_units (class_id, unit_number, unit_name_en, unit_name_ar, description_en, description_ar, theme, difficulty_level, order_index, is_published) VALUES
(1, 1, 'Personal Introduction', 'التعريف بالنفس', 'Learn to introduce yourself and talk about personal information', 'تعلم كيفية التعريف بالنفس والتحدث عن المعلومات الشخصية', 'personal', 1, 1, true),
(1, 2, 'Daily Routines', 'الروتين اليومي', 'Describe your daily activities and habits', 'وصف الأنشطة اليومية والعادات', 'daily_life', 1, 2, true),
(1, 3, 'Family and Friends', 'الأسرة والأصدقاء', 'Talk about family members and relationships', 'التحدث عن أفراد الأسرة والعلاقات', 'relationships', 1, 3, true);

-- Insert Class 11 Units
INSERT INTO kuwait_units (class_id, unit_number, unit_name_en, unit_name_ar, description_en, description_ar, theme, difficulty_level, order_index, is_published) VALUES
(2, 1, 'Advanced Grammar: Conditionals', 'قواعد متقدمة: الشروط', 'Master all types of conditional sentences', 'إتقان جميع أنواع الجمل الشرطية', 'grammar', 3, 1, true),
(2, 2, 'Professional Communication', 'التواصل المهني', 'Business English and formal communication skills', 'الإنجليزية التجارية ومهارات التواصل الرسمي', 'business', 3, 2, true),
(2, 3, 'Technology and Innovation', 'التكنولوجيا والابتكار', 'Discuss modern technology and its impact', 'مناقشة التكنولوجيا الحديثة وتأثيرها', 'technology', 3, 3, true);

-- Insert Class 12 Units  
INSERT INTO kuwait_units (class_id, unit_number, unit_name_en, unit_name_ar, description_en, description_ar, theme, difficulty_level, order_index, is_published) VALUES
(3, 1, 'Advanced Literature', 'الأدب المتقدم', 'Literary analysis and critical thinking', 'تحليل الأدب والتفكير النقدي', 'literature', 5, 1, true),
(3, 2, 'IELTS Preparation', 'إعداد امتحان الآيلتس', 'Comprehensive IELTS exam preparation', 'إعداد شامل لامتحان الآيلتس', 'exam_prep', 5, 2, true),
(3, 3, 'Research and Presentation', 'البحث والعرض', 'Research skills and presentation techniques', 'مهارات البحث وتقنيات العرض', 'research', 5, 3, true);
```

## Step 4: Test Database Operations

### 4.1 Verify Classes
```sql
SELECT * FROM kuwait_classes ORDER BY class_number;
```

### 4.2 Verify Units
```sql
SELECT c.class_name_en, u.unit_number, u.unit_name_en, u.unit_name_ar
FROM kuwait_units u 
JOIN kuwait_classes c ON u.class_id = c.id 
ORDER BY c.class_number, u.unit_number;
```

### 4.3 Test Vocabulary Integration
```sql
SELECT v.word, v.arabic_translation, u.unit_name_en
FROM kuwait_vocabulary v
JOIN kuwait_units u ON v.unit_id = u.id
LIMIT 10;
```

## Step 5: API Testing

### 5.1 Test Classes API
```bash
curl -X GET "https://hkljprwxvdoxorhcbvpo.supabase.co/rest/v1/kuwait_classes?select=*&order=class_number" \
-H "Authorization: Bearer YOUR_ANON_KEY" \
-H "apikey: YOUR_ANON_KEY"
```

### 5.2 Test Units API
```bash
curl -X GET "https://hkljprwxvdoxorhcbvpo.supabase.co/rest/v1/kuwait_units?select=*&class_id=eq.1&order=unit_number" \
-H "Authorization: Bearer YOUR_ANON_KEY" \
-H "apikey: YOUR_ANON_KEY"
```

## Database Schema Features

### Relationships
- **One-to-Many**: Classes → Units → Vocabulary
- **Flexible Linking**: Vocabulary can link to original vocabulary table or be standalone
- **Grammar Integration**: Questions link to both units and grammar content

### Performance Optimizations
- **Strategic Indexes**: All frequently queried columns are indexed
- **JSONB Fields**: Flexible metadata storage for complex data
- **Efficient Queries**: Optimized for Kuwait curriculum structure

### Kuwait-Specific Features
- **Arabic Language Support**: All tables include Arabic translations
- **Academic Year Tracking**: Supports multiple academic years
- **Difficulty Progression**: Structured difficulty levels (1-5)
- **Theme-Based Organization**: Units organized by educational themes

## Integration with Existing System

### Vocabulary Integration
The `kuwait_vocabulary` table can link to existing `vocabulary` table:
```sql
-- Link existing vocabulary to Kuwait units
UPDATE kuwait_vocabulary 
SET original_vocabulary_id = id 
WHERE original_vocabulary_id IS NULL;
```

### Grammar Content Integration
Grammar content is linked to the extracted PDF content for question generation.

### Progress Tracking
User progress can be tracked across vocabulary practice and grammar quizzes.

## Next Steps

1. **Execute the schema SQL** in Supabase
2. **Set up RLS policies** for security
3. **Populate sample data** for testing
4. **Test API endpoints** to verify functionality
5. **Integrate with frontend** for class-based navigation
6. **Connect existing vocabulary** to Kuwait curriculum units

## File References
- `kuwait_school_schema.sql` - Complete database schema
- `kuwait_rls_policies.sql` - Security policies
- `create_kuwait_schema.py` - Schema creation attempt
- `populate_kuwait_data.py` - Data population script
- This setup guide for manual implementation

## Troubleshooting

### Common Issues
1. **Table not found**: Ensure schema creation was executed successfully
2. **Permission denied**: Check RLS policies and user authentication
3. **JSON parsing errors**: Verify API request format matches table schema

### Verification Queries
Use the test queries provided above to verify successful setup at each step.