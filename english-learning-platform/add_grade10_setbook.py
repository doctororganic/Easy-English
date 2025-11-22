from supabase import create_client

supabase = create_client(
    'https://hkljprwxvdoxorhcbvpo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTk2NDQ4NiwiZXhwIjoyMDc3NTQwNDg2fQ.heaHyMO4dBSo2PotYtcWR-QsVPUc4ZVJbng37GPX3Fo'
)

grade10_questions = [
    {'unit_id': 1, 'question_text': 'Why do people prefer home-made meals?', 'question_type': 'comprehension', 'answer_text': 'They are healthy and help keep our body fit.', 'arabic_translation': 'لماذا يفضل الناس الوجبات المنزلية؟', 'difficulty_level': 2},
    {'unit_id': 1, 'question_text': 'What should we do to keep our mind and body in tip-top shape?', 'question_type': 'comprehension', 'answer_text': 'We should eat healthy food and do exercise.', 'arabic_translation': 'ماذا يجب أن نفعل لنحافظ على عقولنا وأجسامنا في أفضل حال؟', 'difficulty_level': 2},
    {'unit_id': 1, 'question_text': 'In what way are antioxidants useful for our health?', 'question_type': 'comprehension', 'answer_text': 'They combat diseases and improve the immune system.', 'arabic_translation': 'ما هي فوائد مضادات الأكسدة لصحتنا؟', 'difficulty_level': 2},
    {'unit_id': 2, 'question_text': 'How does the mentor play a leading role in the community?', 'question_type': 'comprehension', 'answer_text': 'It helps students on their projects and breaks down barriers in community.', 'arabic_translation': 'كيف يلعب المرشد دورًا قياديًا في المجتمع؟', 'difficulty_level': 2},
    {'unit_id': 2, 'question_text': 'What has Kuwait done to further the Culture of Peace?', 'question_type': 'comprehension', 'answer_text': 'It held seminars to raise awareness and conferences.', 'arabic_translation': 'ماذا فعلت الكويت لتعزيز ثقافة السلام؟', 'difficulty_level': 2},
    {'unit_id': 3, 'question_text': 'Why is building impressive buildings important?', 'question_type': 'comprehension', 'answer_text': 'They reflect culture, are landmarks, and attract tourists.', 'arabic_translation': 'لماذا بناء مباني مميزة مهم؟', 'difficulty_level': 2},
    {'unit_id': 4, 'question_text': 'What are the benefits of modern technology?', 'question_type': 'comprehension', 'answer_text': 'It improves communication, enhances productivity, and makes life easier.', 'arabic_translation': 'ما هي فوائد التكنولوجيا الحديثة؟', 'difficulty_level': 2},
    {'unit_id': 5, 'question_text': 'Why is sports participation important for youth?', 'question_type': 'comprehension', 'answer_text': 'It promotes health, teaches teamwork, and builds discipline.', 'arabic_translation': 'لماذا المشاركة في الرياضة مهمة للشباب؟', 'difficulty_level': 2},
]

result = supabase.table('setbook_questions').insert(grade10_questions).execute()
print(f"✅ Inserted {len(grade10_questions)} Grade 10 setbook questions")

final = supabase.table('setbook_questions').select('id', count='exact').execute()
print(f"📊 Final setbook questions count: {final.count}")
