-- Kuwait English Learning Platform - MySQL Database Schema
-- Database: kuwait_english_platform

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS kuwait_english_platform;
USE kuwait_english_platform;

-- Kuwait Classes table
CREATE TABLE IF NOT EXISTS kuwait_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_number INT UNIQUE NOT NULL,
    class_name_en VARCHAR(255) NOT NULL,
    class_name_ar VARCHAR(255) NOT NULL,
    description TEXT,
    academic_year VARCHAR(20) DEFAULT '2024-2025',
    total_units INT DEFAULT 12,
    total_vocabulary INT DEFAULT 400,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Kuwait Units table
CREATE TABLE IF NOT EXISTS kuwait_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    unit_number INT NOT NULL,
    unit_name_en VARCHAR(255) NOT NULL,
    unit_name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    theme VARCHAR(100),
    difficulty_level INT DEFAULT 1,
    order_index INT NOT NULL,
    estimated_hours INT DEFAULT 2,
    vocabulary_count INT DEFAULT 25,
    completion_percentage INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES kuwait_classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_unit_class (class_id, unit_number)
);

-- Vocabulary table (enhanced)
CREATE TABLE IF NOT EXISTS vocabulary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    word_ar VARCHAR(255),
    pronunciation VARCHAR(255),
    definition_en TEXT,
    definition_ar TEXT,
    example_sentence_en TEXT,
    example_sentence_ar TEXT,
    class_number INT,
    unit_number INT,
    difficulty_level INT DEFAULT 1,
    category VARCHAR(100),
    part_of_speech VARCHAR(50),
    frequency_score INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_class_unit (class_number, unit_number),
    INDEX idx_category (category),
    INDEX idx_difficulty (difficulty_level)
);

-- Grammar topics table
CREATE TABLE IF NOT EXISTS grammar_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_name_en VARCHAR(255) NOT NULL,
    topic_name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    difficulty_level INT DEFAULT 1,
    question_types JSON,
    total_questions INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grammar questions table
CREATE TABLE IF NOT EXISTS grammar_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    question_text_en TEXT NOT NULL,
    question_text_ar TEXT,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer CHAR(1) NOT NULL,
    explanation_en TEXT,
    explanation_ar TEXT,
    difficulty_level INT DEFAULT 1,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES grammar_topics(id) ON DELETE CASCADE
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    class_id INT,
    unit_id INT,
    vocabulary_id INT,
    completed BOOLEAN DEFAULT FALSE,
    mastery_level INT DEFAULT 0,
    last_practiced_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES kuwait_classes(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES kuwait_units(id) ON DELETE CASCADE,
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_class_unit (class_id, unit_id)
);

-- User goals table
CREATE TABLE IF NOT EXISTS user_goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    goal_title VARCHAR(255) NOT NULL,
    goal_description TEXT,
    target_date DATE,
    status ENUM('active', 'completed', 'paused') DEFAULT 'active',
    progress_percentage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_goals (user_id),
    INDEX idx_status (status)
);

-- Insert Kuwait Classes data
INSERT INTO kuwait_classes (class_number, class_name_en, class_name_ar, description, total_units, total_vocabulary) VALUES
(10, 'Class 10', 'الصف العاشر', 'Foundation level for Kuwait secondary education - Basic vocabulary and grammar concepts', 12, 300),
(11, 'Class 11', 'الصف الحادي عشر', 'Intermediate level with advanced topics and complex sentence structures', 12, 350),
(12, 'Class 12', 'الصف الثاني عشر', 'Advanced level preparing for university entrance and professional English', 12, 400);

-- Insert Kuwait Units data
INSERT INTO kuwait_units (class_id, unit_number, unit_name_en, unit_name_ar, description_en, description_ar, theme, difficulty_level, order_index, estimated_hours, vocabulary_count, completion_percentage) VALUES
-- Grade 10 Units
(1, 1, 'Personal Introduction', 'التعريف بالنفس', 'Learn to introduce yourself and talk about personal information', 'تعلم كيفية التعريف بالنفس والتحدث عن المعلومات الشخصية', 'personal', 1, 1, 2, 25, 80),
(1, 2, 'Daily Routines', 'الروتين اليومي', 'Describe your daily activities and habits', 'وصف الأنشطة اليومية والعادات', 'daily_life', 1, 2, 2, 30, 60),
(1, 3, 'Family and Friends', 'الأسرة والأصدقاء', 'Talk about family members and relationships', 'التحدث عن أفراد الأسرة والعلاقات', 'relationships', 1, 3, 3, 28, 45),
(1, 4, 'Food and Cooking', 'الطعام والطبخ', 'Discuss different foods and cooking methods', 'مناقشة الأطعمة المختلفة وطرق الطبخ', 'food', 2, 4, 3, 35, 30),
(1, 5, 'Travel and Tourism', 'السفر والسياحة', 'Plan trips and describe travel experiences', 'تخطيط الرحلات ووصف تجارب السفر', 'travel', 2, 5, 4, 40, 15),
(1, 6, 'Technology and Innovation', 'التكنولوجيا والابتكار', 'Explore modern technology and digital life', 'استكشاف التكنولوجيا الحديثة والحياة الرقمية', 'technology', 3, 6, 4, 45, 10),
(1, 7, 'Health and Wellness', 'الصحة والعافية', 'Learn about health, fitness and well-being', 'تعلم عن الصحة واللياقة البدنية والعافية', 'health', 3, 7, 3, 38, 5),
(1, 8, 'Environment and Nature', 'البيئة والطبيعة', 'Discuss environmental issues and natural world', 'مناقشة القضايا البيئية والعالم الطبيعي', 'environment', 3, 8, 4, 42, 0),
(1, 9, 'Culture and Traditions', 'الثقافة والتقاليد', 'Explore Kuwaiti culture and international traditions', 'استكشاف الثقافة الكويتية والتقاليد الدولية', 'culture', 2, 9, 3, 32, 0),
(1, 10, 'Sports and Recreation', 'الرياضة والترفيه', 'Talk about sports, games and leisure activities', 'التحدث عن الرياضة والألعاب والأنشطة الترفيهية', 'sports', 2, 10, 3, 35, 0),
(1, 11, 'Education and Learning', 'التعليم والتعلم', 'Discuss school subjects and study methods', 'مناقشة المواد الدراسية وطرق الدراسة', 'education', 3, 11, 4, 30, 0),
(1, 12, 'Future Plans and Dreams', 'الخطط المستقبلية والأحلام', 'Express future intentions and career aspirations', 'تعبير عن النوايا المستقبلية والطموحات المهنية', 'future', 3, 12, 4, 28, 0),

-- Grade 11 Units
(2, 1, 'Business and Commerce', 'الأعمال والتجارة', 'Learn business vocabulary and communication', 'تعلم مفردات الأعمال والتواصل', 'business', 3, 1, 4, 40, 75),
(2, 2, 'Science and Technology', 'العلوم والتكنولوجيا', 'Explore scientific concepts and innovations', 'استكشاف المفاهيم العلمية والابتكارات', 'science', 4, 2, 4, 45, 55),
(2, 3, 'Literature and Arts', 'الأدب والفنون', 'Study literary works and artistic expressions', 'دراسة الأعمال الأدبية والتعبيرات الفنية', 'literature', 4, 3, 5, 35, 40),
(2, 4, 'Social Issues', 'القضايا الاجتماعية', 'Discuss contemporary social problems', 'مناقشة المشاكل الاجتماعية المعاصرة', 'social', 4, 4, 4, 38, 30),
(2, 5, 'Environment and Sustainability', 'البيئة والاستدامة', 'Focus on environmental protection and green living', 'التركيز على حماية البيئة والحياة الخضراء', 'sustainability', 4, 5, 4, 42, 20),
(2, 6, 'Media and Communication', 'الإعلام والتواصل', 'Study different media forms and communication methods', 'دراسة أشكال الإعلام المختلفة وطرق التواصل', 'media', 3, 6, 3, 32, 15),
(2, 7, 'International Relations', 'العلاقات الدولية', 'Explore global politics and diplomacy', 'استكشاف السياسة العالمية والدبلوماسية', 'international', 4, 7, 5, 30, 10),
(2, 8, 'Economics and Finance', 'الاقتصاد والمالية', 'Learn economic concepts and financial literacy', 'تعلم المفاهيم الاقتصادية والمالية', 'economics', 4, 8, 4, 35, 5),
(2, 9, 'Health and Medicine', 'الصحة والطب', 'Study medical terminology and health sciences', 'دراسة المصطلحات الطبية والعلوم الصحية', 'medicine', 4, 9, 4, 38, 0),
(2, 10, 'Education Systems', 'أنظمة التعليم', 'Compare educational systems worldwide', 'مقارنة أنظمة التعليم في جميع أنحاء العالم', 'education', 3, 10, 3, 28, 0),
(2, 11, 'Cultural Heritage', 'التراث الثقافي', 'Preserve and celebrate cultural heritage', 'الحفاظ على التراث الثقافي والاحتفال به', 'heritage', 3, 11, 4, 30, 0),
(2, 12, 'Future Technologies', 'التكنولوجيا المستقبلية', 'Explore emerging technologies and AI', 'استكشاف التقنيات الناشئة والذكاء الاصطناعي', 'future_tech', 5, 12, 5, 32, 0),

-- Grade 12 Units
(3, 1, 'Advanced Academic Writing', 'الكتابة الأكاديمية المتقدمة', 'Master essay writing and research skills', 'إتقان كتابة المقالات ومهارات البحث', 'academic', 5, 1, 5, 40, 70),
(3, 2, 'Critical Thinking', 'التفكير النقدي', 'Develop analytical and critical thinking abilities', 'تطوير قدرات التحليل والتفكير النقدي', 'critical', 5, 2, 4, 35, 60),
(3, 3, 'Professional Communication', 'التواصل المهني', 'Master workplace and professional interactions', 'إتقان التفاعلات في مكان العمل والمهنية', 'professional', 5, 3, 4, 45, 50),
(3, 4, 'Global Issues', 'القضايا العالمية', 'Address complex global challenges', 'معالجة التحديات العالمية المعقدة', 'global', 5, 4, 5, 38, 45),
(3, 5, 'Leadership and Management', 'القيادة والإدارة', 'Study leadership principles and management skills', 'دراسة مبادئ القيادة ومهارات الإدارة', 'leadership', 5, 5, 5, 32, 40),
(3, 6, 'Innovation and Entrepreneurship', 'الابتكار وريادة الأعمال', 'Explore business innovation and startup culture', 'استكشاف ابتكار الأعمال وثقافة الشركات الناشئة', 'innovation', 5, 6, 4, 35, 35),
(3, 7, 'Ethics and Philosophy', 'الأخلاق والفلسفة', 'Examine moral dilemmas and philosophical concepts', 'فحص المعضلات الأخلاقية والمفاهيم الفلسفية', 'philosophy', 5, 7, 5, 30, 30),
(3, 8, 'International Business', 'الأعمال الدولية', 'Learn global business practices and cross-cultural skills', 'تعلم ممارسات الأعمال العالمية والمهارات بين الثقافات', 'intl_business', 5, 8, 5, 42, 25),
(3, 9, 'Research Methods', 'مناهج البحث', 'Master academic research and documentation', 'إتقان البحث الأكاديمي والتوثيق', 'research', 5, 9, 4, 28, 20),
(3, 10, 'Digital Literacy', 'المهارات الرقمية', 'Navigate digital world and cybersecurity', 'التنقل في العالم الرقمي وأمن المعلومات', 'digital', 4, 10, 4, 38, 15),
(3, 11, 'Advanced Grammar and Style', 'قواعد النحو والأسلوب المتقدم', 'Perfect advanced grammar and writing style', 'إتقان القواعد المتقدمة وأسلوب الكتابة', 'advanced_grammar', 5, 11, 4, 25, 10),
(3, 12, 'University Preparation', 'التحضير للجامعة', 'Prepare for university studies and career choices', 'التحضير للدراسات الجامعية وخيارات المهنة', 'university', 5, 12, 5, 30, 0);

-- Create some sample vocabulary entries
INSERT INTO vocabulary (word, word_ar, pronunciation, definition_en, definition_ar, class_number, unit_number, difficulty_level, category) VALUES
-- Grade 10 Units 1-2 (Personal Introduction, Daily Routines)
('introduce', 'يقدم', '/ˌɪntrəˈdjuːs/', 'to present or make known', 'يقدم أو يجعل معروفاً', 10, 1, 1, 'verbs'),
('personal', 'شخصي', '/ˈpɜːsənl/', 'relating to a particular person', 'متعلق بشخص معين', 10, 1, 1, 'adjectives'),
('information', 'معلومات', '/ˌɪnfəˈmeɪʃn/', 'facts or details about something', 'حقائق أو تفاصيل عن شيء ما', 10, 1, 1, 'nouns'),
('routine', 'روتين', '/ruːˈtiːn/', 'a regular way of doing things', 'طريقة منتظمة لعمل الأشياء', 10, 2, 1, 'nouns'),
('activity', 'نشاط', '/ækˈtɪvəti/', 'something that you do', 'شيء تفعله', 10, 2, 1, 'nouns'),
('schedule', 'جدولة', '/ˈʃedjuːl/', 'a plan of what you will do', 'خطة لما ستفعله', 10, 2, 2, 'nouns'),
('morning', 'صباح', '/ˈmɔːnɪŋ/', 'the beginning of the day', 'بداية اليوم', 10, 2, 1, 'nouns'),
('evening', 'مساء', '/ˈiːvnɪŋ/', 'the end of the day', 'نهاية اليوم', 10, 2, 1, 'nouns'),
('breakfast', 'فطور', '/ˈbrekfəst/', 'the first meal of the day', 'أول وجبة في اليوم', 10, 2, 1, 'nouns'),
('lunch', 'غداء', '/lʌntʃ/', 'the midday meal', 'وجبة الظهيرة', 10, 2, 1, 'nouns'),

-- Grade 11 Units 1-2 (Business, Science)
('business', 'أعمال', '/ˈbɪznəs/', 'commercial or professional work', 'العمل التجاري أو المهني', 11, 1, 3, 'nouns'),
('commerce', 'تجارة', '/ˈkɒmɜːs/', 'the activity of buying and selling goods', 'نشاط شراء وبيع السلع', 11, 1, 3, 'nouns'),
('technology', 'تكنولوجيا', '/tekˈnɒlədʒi/', 'scientific knowledge used to make things', 'المعرفة العلمية المستخدمة لصنع الأشياء', 11, 2, 3, 'nouns'),
('innovation', 'ابتكار', '/ˌɪnəˈveɪʃn/', 'a new idea or method', 'فكرة أو طريقة جديدة', 11, 2, 3, 'nouns'),
('research', 'بحث', '/rɪˈsɜːtʃ/', 'careful study to find new information', 'دراسة دقيقة للعثور على معلومات جديدة', 11, 2, 3, 'nouns'),
('experiment', 'تجربة', '/ɪkˈsperɪmənt/', 'a test to discover something', 'اختبار لاكتشاف شيء ما', 11, 2, 3, 'nouns'),

-- Grade 12 Units 1-2 (Academic Writing, Critical Thinking)
('academic', 'أكاديمي', '/ˌækəˈdemɪk/', 'relating to education and scholarship', 'متعلق بالتعليم والعلم', 12, 1, 5, 'adjectives'),
('writing', 'كتابة', '/ˈraɪtɪŋ/', 'the activity of creating written work', 'نشاط إنشاء عمل مكتوب', 12, 1, 3, 'nouns'),
('essay', 'مقال', '/ˈeseɪ/', 'a piece of writing on a particular subject', 'مقطع كتابة حول موضوع معين', 12, 1, 4, 'nouns'),
('critical', 'نقدي', '/ˈkrɪtɪkl/', 'involving careful judgment', 'يتضمن الحكم الدقيق', 12, 2, 4, 'adjectives'),
('thinking', 'تفكير', '/ˈθɪŋkɪŋ/', 'the process of using your mind', 'عملية استخدام عقلك', 12, 2, 3, 'nouns'),
('analytical', 'تحليلي', '/ˌænəˈlɪtɪkl/', 'involving detailed examination', 'يتضمن فحصاً مفصلاً', 12, 2, 5, 'adjectives');

-- Insert Grammar Topics
INSERT INTO grammar_topics (topic_name_en, topic_name_ar, description_en, description_ar, difficulty_level, total_questions) VALUES
('Present Simple', 'الحاضر البسيط', 'Basic present tense forms', 'أشكال الحاضر البسيط الأساسية', 1, 50),
('Past Simple', 'الماضي البسيط', 'Basic past tense forms', 'أشكال الماضي البسيط الأساسية', 1, 50),
('Future Simple', 'المستقبل البسيط', 'Basic future tense forms', 'أشكال المستقبل البسيط الأساسية', 1, 50),
('Present Continuous', 'الحاضر المستمر', 'Progressive present forms', 'أشكال الحاضر المستمر', 2, 40),
('Present Perfect', 'الحاضر التام', 'Perfect present forms', 'أشكال الحاضر التام', 3, 35),
('Past Continuous', 'الماضي المستمر', 'Progressive past forms', 'أشكال الماضي المستمر', 3, 30),
('Conditionals', 'الشرطية', 'If-then sentence structures', 'بُنى الجمل الشرطية', 4, 25),
('Passive Voice', 'المبني للمجهول', 'Passive sentence constructions', 'تراكيب الجمل المبنية للمجهول', 4, 20),
('Reported Speech', 'الكلام المنقول', 'Indirect speech structures', 'تراكيب الكلام غير المباشر', 5, 20),
('Complex Sentences', 'الجمل المعقدة', 'Advanced sentence structures', 'تراكيب الجمل المتقدمة', 5, 15);

COMMIT;