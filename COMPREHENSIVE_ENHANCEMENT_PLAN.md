# Kuwait English Learning Platform - Comprehensive Enhancement Plan

## Current Platform
- URL: https://i4uxovbxggzb.space.minimax.io
- Supabase: https://wjdzoqlxudswcovbuptd.supabase.co
- Tech Stack: React + TypeScript + Vite + Tailwind CSS + Supabase

## Enhancement Tasks

### Phase 1: Color Scheme & Theme System
- [ ] Create pale yellow theme (less shiny, eye-friendly)
- [ ] Implement dark mode (black background)
- [ ] Design purple/pink alternative palette
- [ ] Design green alternative palette
- [ ] Add theme switcher component
- [ ] Test accessibility for all color schemes

### Phase 2: Database Schema Updates
- [ ] Create `vocabulary_units` table (grade, unit, word, definition, arabic_translation, example)
- [ ] Create `vocabulary_questions` table (unit_id, question, options, correct_answer)
- [ ] Create `set_book_content` table (grade, unit, content, model_answers)
- [ ] Create `test_bank_questions` table (grade, unit, component, question, options, answer)
- [ ] Create `user_goals` table (temporary storage for goal setting)
- [ ] Create `user_progress` table (tracking system)

### Phase 3: Interactive Vocabulary Units
- [ ] Extract vocabulary from PDFs (Grades 10, 11, 12)
- [ ] Create VocabularyUnits component
- [ ] Display vocabulary with English definitions
- [ ] Add Arabic translations
- [ ] Integrate multiple-choice questions
- [ ] Add answer checking functionality
- [ ] Support all 6 units per grade

### Phase 4: Set Book Reading System
- [ ] Extract set book content from PDFs
- [ ] Create SetBookReader component
- [ ] Display content without answers initially
- [ ] Add "Generate Answers" button
- [ ] Implement translation toggle (EN ↔ AR)
- [ ] Create canvas view for better visualization
- [ ] Support all units for grades 10, 11, 12

### Phase 5: Goal Setting Feature
- [ ] Create GoalSetting page
- [ ] Add 5 writeable text boxes
- [ ] Implement download functionality (PDF/text)
- [ ] Add auto-clear on page leave
- [ ] Add back button navigation
- [ ] Design clean, intuitive interface

### Phase 6: Progress Tracking System
- [ ] Create ProgressTracking page
- [ ] Display user progress metrics
- [ ] Implement download functionality
- [ ] Add auto-clear on page leave
- [ ] Add back button navigation
- [ ] Create visual progress indicators

### Phase 7: Exam System Updates
- [ ] Replace "AI-powered exam" text with "Exams"
- [ ] Integrate real test bank questions
- [ ] Organize by grade level (10, 11, 12)
- [ ] Add answer bank functionality
- [ ] Support all 8 exam components
- [ ] Test exam generation and grading

### Phase 8: Navigation & UX
- [ ] Add back buttons to all new pages
- [ ] Ensure responsive design
- [ ] Maintain bilingual support
- [ ] Test on multiple devices
- [ ] Optimize performance

### Phase 9: Testing & Deployment
- [ ] Test all new features end-to-end
- [ ] Verify PDF extraction accuracy
- [ ] Test color schemes in all modes
- [ ] Validate translation functionality
- [ ] Ensure download features work
- [ ] Deploy to production
- [ ] Complete real-time testing

## Data Extraction Status
- ✓ Grade 12 Test Bank Questions extracted (23 vocabulary, 20 grammar)
- ✓ Grade 12 Unit 1 fill-in-the-blank exercises (10)
- ⏳ Grade 11 Test Bank (pending)
- ⏳ Grade 10 Test Bank (pending)
- ⏳ Arabic vocabulary PDFs (pending)
- ⏳ Set Book content (pending)

## Technical Decisions
1. **Database**: Supabase PostgreSQL with RLS policies
2. **Storage**: Local state + download functionality (no persistent user data)
3. **Translation**: Pre-translated content from PDFs
4. **Theme System**: CSS variables + Tailwind config
5. **Downloads**: jsPDF for PDF generation, simple text for text files
