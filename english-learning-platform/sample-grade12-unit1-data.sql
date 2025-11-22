-- Sample Data from Grade 12 Unit 1 (Legal Theme)
-- This is a subset for initial implementation

-- Insert Grammar Topic
INSERT INTO grammar_topics (topic_name, class_number, unit_number, description, rules, examples, difficulty_level)
VALUES (
  'Present Perfect Tense',
  12,
  1,
  'The Present Perfect tense is used for actions that started in the past and continue to the present, or have just been completed.',
  '[
    "Form: have/has + past participle",
    "Used for actions with present relevance",
    "Often used with: just, already, yet, since, for",
    "Common with time expressions: recently, lately, up to now"
  ]'::jsonb,
  '[
    {"sentence": "They have broken the law, they should be punished.", "type": "present_perfect"},
    {"sentence": "I have just broken my leg during the race.", "type": "present_perfect_just"},
    {"sentence": "She has never been to London.", "type": "present_perfect_never"},
    {"sentence": "The manager has already fired the employee.", "type": "present_perfect_already"}
  ]'::jsonb,
  2
);

INSERT INTO grammar_topics (topic_name, class_number, unit_number, description, rules, examples, difficulty_level)
VALUES (
  'Comparative and Contrastive Connectors',
  12,
  1,
  'Connectors used to show comparison and contrast between ideas.',
  '[
    "in comparison with - to compare two things",
    "whereas - to show contrast (often mid-sentence)",
    "on the other hand - to present an alternative view",
    "instead of - to suggest an alternative choice",
    "but - simple contrast connector"
  ]'::jsonb,
  '[
    {"sentence": "I prefer spending vacations in busy cities. On the other hand, my brother prefers small villages.", "connector": "on the other hand"},
    {"sentence": "I want to go out with friends, but I must study for the exams.", "connector": "but"},
    {"sentence": "My new car is not comfortable in comparison with the old one.", "connector": "in comparison with"},
    {"sentence": "Lets do some yoga instead of jogging.", "connector": "instead of"}
  ]'::jsonb,
  2
);

-- Insert Sample Vocabulary from Legal Theme
INSERT INTO kuwait_vocabulary (word, class_number, unit_number, order_in_unit, definition_en, definition_ar, category, difficulty_level)
VALUES
('adoption', 12, 1, 1, 'The legal process of becoming the parent of a child who is not biologically yours', 'التبني', 'legal', 2),
('bench', 12, 1, 2, 'A long seat for sitting; also refers to judges in court', 'مقعد / هيئة القضاة', 'legal', 1),
('consultation', 12, 1, 3, 'A meeting to discuss something or get advice', 'استشارة', 'legal', 2),
('litigation', 12, 1, 4, 'The process of taking legal action', 'التقاضي', 'legal', 3),
('persuasion', 12, 1, 5, 'The action of persuading someone to do or believe something', 'الإقناع', 'general', 2),
('civil', 12, 1, 6, 'Relating to citizens or society; not military or criminal', 'مدني', 'legal', 2),
('guilty', 12, 1, 7, 'Having done something wrong or illegal', 'مذنب', 'legal', 1),
('petty', 12, 1, 8, 'Of little importance; trivial', 'تافه / بسيط', 'general', 2),
('brief', 12, 1, 9, 'Short in duration or extent', 'موجز', 'general', 1),
('case', 12, 1, 10, 'A legal action or lawsuit', 'قضية', 'legal', 1),
('claim', 12, 1, 11, 'To state or assert that something is true', 'يدعي', 'legal', 2),
('sue', 12, 1, 12, 'To take legal action against someone', 'يقاضي', 'legal', 2),
('property', 12, 1, 13, 'Land, buildings, or possessions owned by someone', 'ملكية / عقار', 'legal', 2),
('row', 12, 1, 14, 'A line of things or people', 'صف', 'general', 1),
('supporter', 12, 1, 15, 'A person who supports a cause or policy', 'مؤيد', 'general', 1),
('tolerant', 12, 1, 16, 'Showing willingness to allow beliefs or behavior one disagrees with', 'متسامح', 'general', 2),
('welfare', 12, 1, 17, 'Health, happiness, and well-being', 'رفاهية', 'general', 2),
('violence', 12, 1, 18, 'Behavior involving physical force to hurt or damage', 'عنف', 'general', 1),
('intend', 12, 1, 19, 'To have a plan or purpose', 'ينوي', 'general', 1),
('prosecute', 12, 1, 20, 'To conduct legal proceedings against someone', 'يحاكم', 'legal', 3),
('contend', 12, 1, 21, 'To assert or argue', 'يجادل / يزعم', 'general', 2),
('define', 12, 1, 22, 'To state the meaning of something', 'يُعرّف', 'general', 1),
('principle', 12, 1, 23, 'A fundamental truth or rule', 'مبدأ', 'general', 2),
('ultimately', 12, 1, 24, 'Finally; in the end', 'في النهاية', 'general', 2),
('regardless', 12, 1, 25, 'Without being affected by; in spite of', 'بغض النظر عن', 'general', 2),
('note', 12, 1, 26, 'A brief record or written remark', 'ملاحظة', 'general', 1),
('legal', 12, 1, 27, 'Permitted by law', 'قانوني', 'legal', 1),
('code of law', 12, 1, 28, 'A systematic collection of laws', 'مدونة قانونية', 'legal', 3),
('speed limit', 12, 1, 29, 'The maximum speed allowed on a road', 'حد السرعة', 'general', 1),
('prove', 12, 1, 30, 'To demonstrate the truth of something', 'يُثبت', 'general', 1);
