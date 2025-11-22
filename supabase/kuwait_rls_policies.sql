-- Kuwait Secondary School Database RLS Policies
-- Execute after creating the schema tables

-- Enable RLS on all tables
ALTER TABLE kuwait_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE kuwait_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE kuwait_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_config ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- KUWAIT CLASSES POLICIES
-- =====================================================

-- Read access to all authenticated users
CREATE POLICY "Public read access for kuwait_classes" ON kuwait_classes
    FOR SELECT USING (is_active = true);

-- Admin can manage classes (you can modify this based on your user management)
CREATE POLICY "Admin access for kuwait_classes" ON kuwait_classes
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- =====================================================
-- KUWAIT UNITS POLICIES  
-- =====================================================

-- Read access to published units for authenticated users
CREATE POLICY "Public read access for published units" ON kuwait_units
    FOR SELECT USING (is_published = true);

-- Teachers can manage units
CREATE POLICY "Teacher access for kuwait_units" ON kuwait_units
    FOR ALL USING (auth.jwt() ->> 'role' = 'teacher');

-- =====================================================
-- KUWAIT VOCABULARY POLICIES
-- =====================================================

-- Read access for all authenticated users
CREATE POLICY "Public read access for vocabulary" ON kuwait_vocabulary
    FOR SELECT USING (true);

-- Teachers can manage vocabulary
CREATE POLICY "Teacher access for vocabulary" ON kuwait_vocabulary
    FOR ALL USING (auth.jwt() ->> 'role' = 'teacher');

-- Users can update their own practice progress
CREATE POLICY "Users can update vocabulary mastery" ON kuwait_vocabulary
    FOR UPDATE USING (auth.uid()::text = user_id);

-- =====================================================
-- GRAMMAR CONTENT POLICIES
-- =====================================================

-- Read access to approved content
CREATE POLICY "Public read access for approved grammar content" ON grammar_content
    FOR SELECT USING (review_status = 'approved');

-- Teachers can manage grammar content
CREATE POLICY "Teacher access for grammar content" ON grammar_content
    FOR ALL USING (auth.jwt() ->> 'role' = 'teacher');

-- =====================================================
-- GRAMMAR QUESTIONS POLICIES
-- =====================================================

-- Read access to approved questions
CREATE POLICY "Public read access for approved questions" ON grammar_questions
    FOR SELECT USING (review_status = 'approved');

-- Teachers can manage questions
CREATE POLICY "Teacher access for grammar questions" ON grammar_questions
    FOR ALL USING (auth.jwt() ->> 'role' = 'teacher');

-- Users can track their own question progress
CREATE POLICY "Users can track question progress" ON user_progress
    FOR ALL USING (auth.uid()::text = user_id);

-- =====================================================
-- USER PROGRESS POLICIES
-- =====================================================

-- Users can only access their own progress
CREATE POLICY "Users access own progress" ON user_progress
    FOR ALL USING (auth.uid()::text = user_id);

-- Teachers can view student progress (if they have appropriate role)
CREATE POLICY "Teachers can view student progress" ON user_progress
    FOR SELECT USING (auth.jwt() ->> 'role' = 'teacher');

-- =====================================================
-- LEARNING SESSIONS POLICIES
-- =====================================================

-- Users can only access their own learning sessions
CREATE POLICY "Users access own sessions" ON learning_sessions
    FOR ALL USING (auth.uid()::text = user_id);

-- =====================================================
-- CURRICULUM CONFIG POLICIES
-- =====================================================

-- Read access to active curriculum config
CREATE POLICY "Public read access for curriculum config" ON curriculum_config
    FOR SELECT USING (is_active = true);

-- Admin can manage curriculum config
CREATE POLICY "Admin access for curriculum config" ON curriculum_config
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get user ID from JWT
CREATE OR REPLACE FUNCTION get_user_id()
RETURNS TEXT AS $$
BEGIN
    RETURN auth.uid()::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has role
CREATE OR REPLACE FUNCTION user_has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (auth.jwt() ->> 'role') = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;