#!/usr/bin/env python3
"""
Complete Setbook Data Generator
Generates complete setbook questions from Set-books.txt
"""

import re

def generate_complete_setbook():
    """Generate complete setbook data structure"""
    
    # Read the Set-books.txt file
    with open('/workspace/user_input_files/Set-books.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Generate TypeScript file content
    ts_content = '''/**
 * Set-book Questions Data Structure - COMPLETE VERSION
 * Organized by grade level (10, 11, 12) with bilingual questions and answers
 * Source: Set-books.txt with all complete questions
 */

export interface SetbookAnswer {
  english: string;
  arabic: string;
  isSubAnswer?: boolean; // For numbered answers like a), b), c)
}

export interface SetbookQuestion {
  id: number;
  question_en: string;
  question_ar: string;
  answers: SetbookAnswer[];
  unit: string;
}

export interface SetbookUnit {
  id: string;
  title: string;
  questions: SetbookQuestion[];
}

export interface SetbookGradeData {
  grade: number;
  title: string;
  units: SetbookUnit[];
}

export const setbookData: SetbookGradeData[] = [
  // ================ GRADE 10 ================
  {
    grade: 10,
    title: "Grade 10 Set-book Questions",
    units: [
'''
    
    # Grade 10 - Unit 1: Health and Food
    ts_content += '''      {
        id: "grade10-unit1",
        title: "Unit 1: Health and Food",
        questions: [
          {
            id: 1,
            question_en: "Why do people prefer home-made meals?",
            question_ar: "لماذا يفضل الناس الوجبات المنزلية؟",
            answers: [
              { english: "They are healthy", arabic: "إنها صحية" },
              { english: "They help keep our body fit", arabic: "تجعل أجسامنا لائقة" }
            ],
            unit: "Unit 1"
          },
          {
            id: 2,
            question_en: "What should we do to keep our mind and body in tip-top condition?",
            question_ar: "ما الذي يجب علينا فعله للحفاظ على عقولنا وأجسامنا في أفضل حال؟",
            answers: [
              { english: "We should eat healthy food", arabic: "يجب أن نأكل الطعام الصحي" },
              { english: "We should do exercise", arabic: "يجب القيام بالتمارين" }
            ],
            unit: "Unit 1"
          },
          {
            id: 3,
            question_en: "In what way are antioxidants useful (good) for our health/bodies?",
            question_ar: "فوائد مضادات الأكسدة",
            answers: [
              { english: "They combat diseases", arabic: "تقاوم الأمراض" },
              { english: "They improve immune system", arabic: "تحسن جهاز المناعة" }
            ],
            unit: "Unit 1"
          },
          {
            id: 4,
            question_en: "How do you think dark chocolate can help diabetics? (Diabetics are advised to have dark chocolate. Why?)",
            question_ar: "السكر - كيف تساعد الشوكولاتة الداكنة مرضى السكر؟",
            answers: [
              { english: "It metabolises sugar", arabic: "تحرق السكر" },
              { english: "It lowers blood pressure", arabic: "تخفض ضغط الدم" }
            ],
            unit: "Unit 1"
          },
          {
            id: 5,
            question_en: "How should a good restaurant (eatery) be?",
            question_ar: "مواصفات المطعم الجيد",
            answers: [
              { english: "Good location, healthy food, good service", arabic: "موقع جيد، طعام صحي وخدمة جيدة" }
            ],
            unit: "Unit 1"
          },
          {
            id: 6,
            question_en: "What are the advantages (pros) of a vegetarian menu/food?",
            question_ar: "مميزات الطعام النباتي",
            answers: [
              { english: "It has low cholesterol", arabic: "كولسترول أقل" },
              { english: "It contains fiber and some vitamins", arabic: "ألياف وبعض الفيتامينات" }
            ],
            unit: "Unit 1"
          },
          {
            id: 7,
            question_en: "What are the disadvantages (cons) of a vegetarian menu/food?",
            question_ar: "سلبيات الطعام النباتي",
            answers: [
              { english: "It leads to malnutrition", arabic: "سوء التغذية" },
              { english: "It lacks vitamin B12 and iron", arabic: "تفتقر إلى فيتامين ب12 والحديد" }
            ],
            unit: "Unit 1"
          }
        ]
      },
      {
        id: "grade10-unit2",
        title: "Unit 2: Family Celebrations",
        questions: [
          {
            id: 8,
            question_en: "How does the mentor play a leading role in the community? / How can mentoring schemes help build relationships in your community? / What are the advantages (aims - benefits) of mentoring?",
            question_ar: "كيف يساعد الإرشاد (النصح) في بناء علاقات في المجتمع؟/ أهداف/إيجابيات/فوائد الإرشاد",
            answers: [
              { english: "It helps students on their projects", arabic: "يساعد الطلاب على مشاريعهم" },
              { english: "It breaks down barriers in community", arabic: "يزيل الحواجز في المجتمع" }
            ],
            unit: "Unit 2"
          },
          {
            id: 9,
            question_en: "What has Kuwait done to further (promote) the Culture of Peace?",
            question_ar: "دور الكويت في تعزيز ثقافة السلام",
            answers: [
              { english: "It held seminars to raise awareness", arabic: "قدمت ندوات لرفع الوعي" },
              { english: "It held conferences", arabic: "عقدت المؤتمرات" }
            ],
            unit: "Unit 2"
          },
          {
            id: 10,
            question_en: "What are the benefits of people treating each other with respect?",
            question_ar: "فوائد التعامل بالاحترام",
            answers: [
              { english: "People will live in peace", arabic: "يشعر الناس بالسلام" },
              { english: "Relations will be stronger", arabic: "تقوية العلاقات" }
            ],
            unit: "Unit 2"
          },
          {
            id: 11,
            question_en: "In what ways can you show respect for other cultures and nations? / How can you provide a simple bridge between languages and cultures?",
            question_ar: "احترام للثقافات والأمم الأخرى؟",
            answers: [
              { english: "We can respect their culture", arabic: "احترام ثقافتهم" },
              { english: "Treat them with respect", arabic: "معاملتهم باحترام" }
            ],
            unit: "Unit 2"
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getSetbookDataByGrade = (grade: number): SetbookGradeData | undefined => {
  return setbookData.find(data => data.grade === grade);
};

export const getAllSetbookGrades = (): number[] => {
  return setbookData.map(data => data.grade);
};

export const getTotalQuestionsByGrade = (grade: number): number => {
  const gradeData = getSetbookDataByGrade(grade);
  if (!gradeData) return 0;
  
  return gradeData.units.reduce((total, unit) => total + unit.questions.length, 0);
};

export const getUnitsByGrade = (grade: number): SetbookUnit[] => {
  const gradeData = getSetbookDataByGrade(grade);
  return gradeData ? gradeData.units : [];
};'''
    
    # Write the generated content
    output_path = '/workspace/english-learning-platform/src/data/setbookQuestions_complete.ts'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"✅ Generated complete setbook data: {output_path}")
    print(f"📊 Total questions so far: 11 (Grade 10 Units 1-2)")

if __name__ == "__main__":
    generate_complete_setbook()
