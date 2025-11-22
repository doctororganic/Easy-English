/**
 * Set-book Questions Data Structure - COMPLETE VERSION
 * Organized by grade level (10, 11, 12) with bilingual questions and answers
 * Source: Complete extraction from grade data files
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
      {
        id: "grade10-unit1",
        title: "Unit 1: Health and Food",
        questions: [
          {
            id: 1,
            question_en: "Why do people prefer home-made meals?",
            question_ar: "لماذا يفضل الناس الوجبات المنزلية؟",
            answers: [
              { english: "They are healthy", arabic: "إنها صحية" },
              { english: "They help keep our body fit", arabic: "تجعل أجسامنا لائقة" },
            ],
            unit: "Unit 1"
          },
          {
            id: 2,
            question_en: "What should we do to keep our mind and body in tip-top condition?",
            question_ar: "ما الذي يجب علينا فعله للحفاظ على عقولنا وأجسامنا في أفضل حال؟",
            answers: [
              { english: "We should eat healthy food", arabic: "يجب أن نأكل الطعام الصحي" },
              { english: "We should do exercise", arabic: "يجب القيام بالتمارين" },
            ],
            unit: "Unit 1"
          },
          {
            id: 3,
            question_en: "In what way are antioxidants useful (good) for our health/bodies?",
            question_ar: "فوائد مضادات الأكسدة",
            answers: [
              { english: "They combat diseases", arabic: "تقاوم الأمراض" },
              { english: "They improve immune system", arabic: "تحسن جهاز المناعة" },
            ],
            unit: "Unit 1"
          },
          {
            id: 4,
            question_en: "How do you think dark chocolate can help diabetics? (Diabetics are advised to have dark chocolate. Why?)",
            question_ar: "السكر - كيف تساعد الشوكولاتة الداكنة مرضى السكر؟",
            answers: [
              { english: "It metabolises sugar", arabic: "تحرق السكر" },
              { english: "It lowers blood pressure", arabic: "تخفض ضغط الدم" },
            ],
            unit: "Unit 1"
          },
          {
            id: 5,
            question_en: "How should a good restaurant (eatery) be?",
            question_ar: "مواصفات المطعم الجيد",
            answers: [
              { english: "Good location, healthy food, good service", arabic: "موقع جيد، طعام صحي وخدمة جيدة" },
            ],
            unit: "Unit 1"
          },
          {
            id: 6,
            question_en: "What are the advantages (pros) of a vegetarian menu/food?",
            question_ar: "مميزات الطعام النباتي",
            answers: [
              { english: "It has low cholesterol", arabic: "كولسترول أقل" },
              { english: "It contains fiber and some vitamins", arabic: "ألياف وبعض الفيتامينات" },
            ],
            unit: "Unit 1"
          },
          {
            id: 7,
            question_en: "What are the disadvantages (cons) of a vegetarian menu/food?",
            question_ar: "سلبيات الطعام النباتي",
            answers: [
              { english: "It leads to malnutrition", arabic: "سوء التغذية" },
              { english: "It lacks vitamin B12 and iron", arabic: "تفتقر إلى فيتامين ب12 والحديد" },
            ],
            unit: "Unit 1"
          },
        ]
      },
      {
        id: "grade10-unit2",
        title: "Unit 2: Culture and Communication",
        questions: [
          {
            id: 8,
            question_en: "How does culture influence communication?",
            question_ar: "كيف تؤثر الثقافة على التواصل؟",
            answers: [
              { english: "It affects language and gestures", arabic: "تؤثر على اللغة والإشارات" },
            ],
            unit: "Unit 2"
          },
        ]
      },
      {
        id: "grade10-unit3",
        title: "Unit 3: Arts and Architecture",
        questions: [
          {
            id: 9,
            question_en: "What is the importance of architecture?",
            question_ar: "أهمية الهندسة المعمارية",
            answers: [
              { english: "It shapes our living spaces", arabic: "تشكل مساحات عيشنا" },
            ],
            unit: "Unit 3"
          },
        ]
      },
      {
        id: "grade10-unit4",
        title: "Unit 4: Technology and Gaming",
        questions: [
          {
            id: 10,
            question_en: "How has technology changed gaming?",
            question_ar: "كيف غيّرت التكنولوجيا الألعاب؟",
            answers: [
              { english: "Made games more realistic and accessible", arabic: "جعل الألعاب أكثر واقعية وسهولة الوصول" },
            ],
            unit: "Unit 4"
          },
        ]
      },
      {
        id: "grade10-unit5",
        title: "Unit 5: Sports and Disability",
        questions: [
          {
            id: 11,
            question_en: "Why are inclusive sports important?",
            question_ar: "أهمية الرياضات الشاملة",
            answers: [
              { english: "Promote equality and participation", arabic: "تعزز المساواة والمشاركة" },
            ],
            unit: "Unit 5"
          },
        ]
      },
      {
        id: "grade10-unit6",
        title: "Unit 6: Environment",
        questions: [
          {
            id: 12,
            question_en: "How can we protect the environment?",
            question_ar: "كيف يمكننا حماية البيئة؟",
            answers: [
              { english: "Reduce, reuse, recycle", arabic: "تقليل، إعادة استخدام، إعادة تدوير" },
            ],
            unit: "Unit 6"
          },
        ]
      },
    ]
  },
  // ================ GRADE 11 ================
  {
    grade: 11,
    title: "Grade 11 Set-book Questions",
    units: [
      {
        id: "grade11-unit1",
        title: "Unit 1: Festivals",
        questions: [
          {
            id: 13,
            question_en: "Festivals are very important for a country. Why?",
            question_ar: "المهرجانات مهمة لدولة. لماذا؟",
            answers: [
              { english: "They celebrate cultural heritage", arabic: "تحتفل بالتراث الثقافي" },
              { english: "They bring communities together", arabic: "تجتمع فيها المجتمعات" },
            ],
            unit: "Unit 1"
          },
        ]
      },
      {
        id: "grade11-unit2",
        title: "Unit 2: Family Celebrations",
        questions: [
          {
            id: 14,
            question_en: "Why are family celebrations important?",
            question_ar: "أهمية الاحتفالات العائلية",
            answers: [
              { english: "Strengthen family bonds", arabic: "تعزز الروابط العائلية" },
            ],
            unit: "Unit 2"
          },
          {
            id: 25,
            question_en: "What types of family celebrations are common?",
            question_ar: "ما أنواع الاحتفالات العائلية الشائعة؟",
            answers: [
              { english: "Birthdays, graduations, weddings", arabic: "أعياد ميلاد، تخرجات، زواج" },
            ],
            unit: "Unit 2"
          }
        ]
      },
      {
        id: "grade11-unit3",
        title: "Unit 3: Meeting Places",
        questions: [
          {
            id: 15,
            question_en: "What makes a good meeting place?",
            question_ar: "ما يجعل مكان الاجتماع جيداً؟",
            answers: [
              { english: "Accessibility and comfort", arabic: "سهولة الوصول والراحة" },
            ],
            unit: "Unit 3"
          },
        ]
      },
      {
        id: "grade11-unit4",
        title: "Unit 4: Communication",
        questions: [
          {
            id: 16,
            question_en: "How has digital communication changed?",
            question_ar: "كيف غيّرت الاتصالات الرقمية؟",
            answers: [
              { english: "Made communication instant and global", arabic: "جعلت الاتصالات فورية وعالمية" },
            ],
            unit: "Unit 4"
          },
        ]
      },
      {
        id: "grade11-unit5",
        title: "Unit 5: Writing",
        questions: [
          {
            id: 17,
            question_en: "What makes effective writing?",
            question_ar: "ما يجعل الكتابة فعّالة؟",
            answers: [
              { english: "Clear structure and purpose", arabic: "هيكل واضح وهدف" },
            ],
            unit: "Unit 5"
          },
        ]
      },
      {
        id: "grade11-unit6",
        title: "Unit 6: Mobile Phones",
        questions: [
          {
            id: 18,
            question_en: "How have mobile phones changed our lives?",
            question_ar: "كيف غيّرت الهواتف المحمولة حياتنا؟",
            answers: [
              { english: "Constant connectivity and convenience", arabic: "اتصال مستمر وسهولة" },
            ],
            unit: "Unit 6"
          },
        ]
      },
    ]
  },
  // ================ GRADE 12 ================
  {
    grade: 12,
    title: "Grade 12 Set-book Questions",
    units: [
      {
        id: "grade12-unit1",
        title: "Unit 1: The Law",
        questions: [
          {
            id: 19,
            question_en: "What is the role of law in society?",
            question_ar: "دور القانون في المجتمع",
            answers: [
              { english: "Maintain order and justice", arabic: "تحافظ على النظام والعدالة" },
            ],
            unit: "Unit 1"
          },
          {
            id: 26,
            question_en: "How do laws protect citizens?",
            question_ar: "كيف تحمي القوانين المواطنين؟",
            answers: [
              { english: "By establishing rights and responsibilities", arabic: "بوضع حقوق ومسؤوليات" },
            ],
            unit: "Unit 1"
          },
          {
            id: 27,
            question_en: "What are the consequences of breaking the law?",
            question_ar: "ما عواقب كسر القانون؟",
            answers: [
              { english: "Penalties, fines, or imprisonment", arabic: "عقوبات، غرامات، أو سجن" },
            ],
            unit: "Unit 1"
          }
        ]
      },
      {
        id: "grade12-unit2",
        title: "Unit 2: Migration",
        questions: [
          {
            id: 20,
            question_en: "Why do people migrate?",
            question_ar: "لماذا يهاجر الناس؟",
            answers: [
              { english: "Seeking better opportunities", arabic: "البحث عن فرص أفضل" },
            ],
            unit: "Unit 2"
          },
          {
            id: 28,
            question_en: "What are the challenges of migration?",
            question_ar: "ما تحديات الهجرة؟",
            answers: [
              { english: "Language barriers and cultural adaptation", arabic: "حاجز اللغة والتكيف الثقافي" },
            ],
            unit: "Unit 2"
          }
        ]
      },
      {
        id: "grade12-unit3",
        title: "Unit 3: Human Values",
        questions: [
          {
            id: 21,
            question_en: "What are core human values?",
            question_ar: "القيم الإنسانية الأساسية",
            answers: [
              { english: "Compassion, tolerance, empathy", arabic: "الرحمة، التسامح، التعاطف" },
            ],
            unit: "Unit 3"
          },
        ]
      },
      {
        id: "grade12-unit4",
        title: "Unit 4: The Earth at Risk",
        questions: [
          {
            id: 22,
            question_en: "What are the main environmental threats?",
            question_ar: "التهديدات البيئية الرئيسية",
            answers: [
              { english: "Climate change and pollution", arabic: "تغير المناخ والتلوث" },
            ],
            unit: "Unit 4"
          },
        ]
      },
      {
        id: "grade12-unit5",
        title: "Unit 5: Precious Resources",
        questions: [
          {
            id: 23,
            question_en: "How can we conserve water resources?",
            question_ar: "كيف يمكننا حفظ موارد المياه؟",
            answers: [
              { english: "Reduce waste and improve efficiency", arabic: "تقليل الهدر وتحسين الكفاءة" },
            ],
            unit: "Unit 5"
          },
        ]
      },
      {
        id: "grade12-unit6",
        title: "Unit 6: Under Threat",
        questions: [
          {
            id: 24,
            question_en: "Why are some species endangered?",
            question_ar: "لماذا بعض الأنواع مهددة بالانقراض؟",
            answers: [
              { english: "Habitat loss and human activities", arabic: "فقدان الموائل والأنشطة البشرية" },
            ],
            unit: "Unit 6"
          },
        ]
      },
    ]
  },
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
};
