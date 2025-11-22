/**
 * Complete Vocabulary Data Structure
 * Organized by grade level (10, 11, 12) with words, parts of speech, definitions, examples, and Arabic translations
 */

export interface VocabularyWord {
  id: number;
  word: string;
  partOfSpeech: string;
  englishMeaning: string;
  sentenceExample: string;
  arabicMeaning: string;
  unit?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface VocabularyUnit {
  id: string;
  title: string;
  description?: string;
  words: VocabularyWord[];
}

export interface VocabularyGradeData {
  grade: number;
  title: string;
  units: VocabularyUnit[];
}

export const vocabularyData: VocabularyGradeData[] = [
  // Grade 10 - Complete vocabulary (322+ words across 6 units)
  {
    grade: 10,
    title: "Grade 10 Vocabulary",
    units: [
      {
        id: "grade10-unit1",
        title: "Unit 1: Health & Nutrition",
        description: "Vocabulary related to health, nutrition, and wellness",
        words: [
          {
            id: 1,
            word: "absorb",
            partOfSpeech: "v",
            englishMeaning: "To take in or soak up",
            sentenceExample: "The body absorbs nutrients from food.",
            arabicMeaning: "يمتص",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 2,
            word: "antioxidant",
            partOfSpeech: "n",
            englishMeaning: "Substance that prevents cell damage",
            sentenceExample: "Blueberries are rich in antioxidants.",
            arabicMeaning: "مضاد الأكسدة",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 3,
            word: "arthritis",
            partOfSpeech: "n",
            englishMeaning: "Disease causing joint pain",
            sentenceExample: "My grandfather suffers from arthritis.",
            arabicMeaning: "التهاب المفاصل",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 4,
            word: "caffeine",
            partOfSpeech: "n",
            englishMeaning: "Stimulant found in coffee",
            sentenceExample: "Too much caffeine can cause insomnia.",
            arabicMeaning: "الكافيين",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 5,
            word: "calcium",
            partOfSpeech: "n",
            englishMeaning: "Mineral for strong bones",
            sentenceExample: "Milk provides calcium for children.",
            arabicMeaning: "الكالسيوم",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 6,
            word: "cholesterol",
            partOfSpeech: "n",
            englishMeaning: "Fatty substance in blood",
            sentenceExample: "High cholesterol can cause heart disease.",
            arabicMeaning: "الكوليسترول",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 7,
            word: "combat",
            partOfSpeech: "v",
            englishMeaning: "To fight against",
            sentenceExample: "Exercise helps combat obesity.",
            arabicMeaning: "يقاتل",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 8,
            word: "dietician",
            partOfSpeech: "n",
            englishMeaning: "Nutrition expert",
            sentenceExample: "The dietician gave me a meal plan.",
            arabicMeaning: "اختصاصي التغذية",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 9,
            word: "digestive",
            partOfSpeech: "adj",
            englishMeaning: "Related to digestion",
            sentenceExample: "Yogurt helps the digestive system.",
            arabicMeaning: "هضمي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 10,
            word: "fiber",
            partOfSpeech: "n",
            englishMeaning: "Indigestible plant material",
            sentenceExample: "Fiber is important for healthy digestion.",
            arabicMeaning: "الألياف",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 11,
            word: "deficiency",
            partOfSpeech: "n",
            englishMeaning: "Lack or shortage",
            sentenceExample: "Vitamin deficiency can cause illness.",
            arabicMeaning: "نقص",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 12,
            word: "grilled",
            partOfSpeech: "adj",
            englishMeaning: "Cooked over fire",
            sentenceExample: "Grilled vegetables are healthy.",
            arabicMeaning: "مشوي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 13,
            word: "metabolism",
            partOfSpeech: "n",
            englishMeaning: "Body's energy conversion process",
            sentenceExample: "Exercise speeds up your metabolism.",
            arabicMeaning: "الأيض",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 14,
            word: "organic",
            partOfSpeech: "adj",
            englishMeaning: "Grown without chemicals",
            sentenceExample: "Organic food is more expensive.",
            arabicMeaning: "عضوي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 15,
            word: "pomegranate",
            partOfSpeech: "n",
            englishMeaning: "Red fruit with many seeds",
            sentenceExample: "Pomegranate juice is very healthy.",
            arabicMeaning: "الرمان",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 16,
            word: "RDA",
            partOfSpeech: "abbr",
            englishMeaning: "Recommended Daily Allowance",
            sentenceExample: "The RDA for vitamin C is 60mg.",
            arabicMeaning: "الجرعة الموصى بها يومياً",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 17,
            word: "supplement",
            partOfSpeech: "n",
            englishMeaning: "Nutrient added to diet",
            sentenceExample: "He takes vitamin supplements daily.",
            arabicMeaning: "مكمل غذائي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 18,
            word: "appeal to",
            partOfSpeech: "v",
            englishMeaning: "To attract or interest",
            sentenceExample: "The diet appeals to health-conscious people.",
            arabicMeaning: "يجذب",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 19,
            word: "atmospheric",
            partOfSpeech: "adj",
            englishMeaning: "Related to the atmosphere",
            sentenceExample: "The restaurant has an atmospheric setting.",
            arabicMeaning: "جوي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 20,
            word: "iron",
            partOfSpeech: "n",
            englishMeaning: "Important mineral for blood",
            sentenceExample: "Spinach is a good source of iron.",
            arabicMeaning: "الحديد",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 21,
            word: "metabolize",
            partOfSpeech: "v",
            englishMeaning: "To process food for energy",
            sentenceExample: "The body metabolizes sugar quickly.",
            arabicMeaning: "يحرق (يحول)",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 22,
            word: "neutralize",
            partOfSpeech: "v",
            englishMeaning: "To make something ineffective",
            sentenceExample: "Citrus fruits help neutralize toxins.",
            arabicMeaning: "يعادل",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 23,
            word: "nutrition",
            partOfSpeech: "n",
            englishMeaning: "Study of healthy eating",
            sentenceExample: "Good nutrition is essential for health.",
            arabicMeaning: "التغذية",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 24,
            word: "probiotic",
            partOfSpeech: "adj",
            englishMeaning: "Containing beneficial bacteria",
            sentenceExample: "Probiotic yogurt aids digestion.",
            arabicMeaning: "بروبيوتيك",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 25,
            word: "protein",
            partOfSpeech: "n",
            englishMeaning: "Building block for body tissue",
            sentenceExample: "Meat is a good source of protein.",
            arabicMeaning: "البروتين",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 26,
            word: "saturated fat",
            partOfSpeech: "n",
            englishMeaning: "Unhealthy fat type",
            sentenceExample: "Avoid saturated fats for heart health.",
            arabicMeaning: "دهن مشبع",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 27,
            word: "unsaturated fat",
            partOfSpeech: "n",
            englishMeaning: "Healthy fat type",
            sentenceExample: "Olive oil contains unsaturated fats.",
            arabicMeaning: "دهن غير مشبع",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 28,
            word: "stimulant",
            partOfSpeech: "n",
            englishMeaning: "Substance that increases activity",
            sentenceExample: "Coffee is a natural stimulant.",
            arabicMeaning: "منشط",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 29,
            word: "vitamin",
            partOfSpeech: "n",
            englishMeaning: "Essential nutrient for health",
            sentenceExample: "Oranges are rich in vitamin C.",
            arabicMeaning: "فيتامين",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 30,
            word: "malnutrition",
            partOfSpeech: "n",
            englishMeaning: "Poor nutrition due to diet",
            sentenceExample: "Malnutrition affects millions worldwide.",
            arabicMeaning: "سوء تغذية",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 31,
            word: "salad bar",
            partOfSpeech: "n",
            englishMeaning: "Self-service salad station",
            sentenceExample: "The restaurant has a large salad bar.",
            arabicMeaning: "بار السلطة",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 32,
            word: "specialty",
            partOfSpeech: "n",
            englishMeaning: "A particular specialty dish",
            sentenceExample: "The specialty of the house is grilled fish.",
            arabicMeaning: "تخصص/طبق مميز",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 33,
            word: "vegetarian",
            partOfSpeech: "n",
            englishMeaning: "Person who doesn't eat meat",
            sentenceExample: "My sister is a vegetarian.",
            arabicMeaning: "نباتي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 34,
            word: "wholesome",
            partOfSpeech: "adj",
            englishMeaning: "Healthy and nutritious",
            sentenceExample: "Wholesome food keeps you active.",
            arabicMeaning: "مفيد/صحي",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 35,
            word: "crammed",
            partOfSpeech: "adj",
            englishMeaning: "Filled to capacity",
            sentenceExample: "The crammed restaurant had no empty tables.",
            arabicMeaning: "مزدحم",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 36,
            word: "eatery",
            partOfSpeech: "n",
            englishMeaning: "A place to eat; restaurant",
            sentenceExample: "We found a new eatery near the mall.",
            arabicMeaning: "مطعم",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 37,
            word: "fanatic",
            partOfSpeech: "n",
            englishMeaning: "Enthusiast; obsessed person",
            sentenceExample: "He's a health fanatic who exercises daily.",
            arabicMeaning: "متحمس/متعصب",
            unit: "Unit 1: Health & Nutrition"
          },
          {
            id: 38,
            word: "irresponsibly",
            partOfSpeech: "adv",
            englishMeaning: "Without responsibility",
            sentenceExample: "Eating irresponsibly harms your health.",
            arabicMeaning: "بدون مسؤولية"
          }
        ]
      },
      {
        id: "grade10-unit2",
        title: "Unit 2: Peace & Tolerance",
        description: "Vocabulary related to peace, tolerance, and cultural understanding",
        words: [
          {
            id: 39,
            word: "aspiration",
            partOfSpeech: "n",
            englishMeaning: "Strong desire to achieve",
            sentenceExample: "His aspiration is to promote peace.",
            arabicMeaning: "طموح",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 40,
            word: "creed",
            partOfSpeech: "n",
            englishMeaning: "System of religious belief",
            sentenceExample: "All creeds are respected in Kuwait.",
            arabicMeaning: "عقيدة / مذهب",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 41,
            word: "delegate",
            partOfSpeech: "n",
            englishMeaning: "Representative or envoy",
            sentenceExample: "Each country sent a delegate to the conference.",
            arabicMeaning: "مندوب / مفوض",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 42,
            word: "diversity",
            partOfSpeech: "n",
            englishMeaning: "Variety; difference",
            sentenceExample: "Cultural diversity enriches our society.",
            arabicMeaning: "تنوع / اختلاف",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 43,
            word: "initiative",
            partOfSpeech: "n",
            englishMeaning: "New plan or action",
            sentenceExample: "The peace initiative was successful.",
            arabicMeaning: "مبادرة",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 44,
            word: "interfaith",
            partOfSpeech: "adj",
            englishMeaning: "Between different religions",
            sentenceExample: "Interfaith dialogue promotes understanding.",
            arabicMeaning: "بين الأديان",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 45,
            word: "tolerance",
            partOfSpeech: "n",
            englishMeaning: "Acceptance of differences",
            sentenceExample: "Tolerance is essential for peace.",
            arabicMeaning: "تسامح",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 46,
            word: "unity",
            partOfSpeech: "n",
            englishMeaning: "State of being united",
            sentenceExample: "Unity brings strength to communities.",
            arabicMeaning: "وحدة",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 47,
            word: "harmony",
            partOfSpeech: "n",
            englishMeaning: "Agreement and accord",
            sentenceExample: "They live in perfect harmony.",
            arabicMeaning: "تناغم",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 48,
            word: "cooperation",
            partOfSpeech: "n",
            englishMeaning: "Working together",
            sentenceExample: "International cooperation is vital.",
            arabicMeaning: "تعاون",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 49,
            word: "reconciliation",
            partOfSpeech: "n",
            englishMeaning: "Restoration of friendly relations",
            sentenceExample: "The peace process focused on reconciliation.",
            arabicMeaning: "مصالحة",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 50,
            word: "compromised",
            partOfSpeech: "v",
            englishMeaning: "Reached mutual agreement",
            sentenceExample: "The parties compromised on key issues.",
            arabicMeaning: "توصلوا إلى حل وسط",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 51,
            word: "mediator",
            partOfSpeech: "n",
            englishMeaning: "Person who helps resolve disputes",
            sentenceExample: "The UN acted as a mediator in the conflict.",
            arabicMeaning: "وسيط",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 52,
            word: "friction",
            partOfSpeech: "n",
            englishMeaning: "Conflict or disagreement",
            sentenceExample: "Cultural friction can lead to misunderstandings.",
            arabicMeaning: "احتكاك",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 53,
            word: "diplomacy",
            partOfSpeech: "n",
            englishMeaning: "Skill in managing international relations",
            sentenceExample: "Diplomacy proved more effective than war.",
            arabicMeaning: "دبلوماسية",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 54,
            word: "merit",
            partOfSpeech: "n",
            englishMeaning: "Quality of being good or worthy",
            sentenceExample: "Everyone should be judged on merit alone.",
            arabicMeaning: "استحقاق",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 55,
            word: "prejudice",
            partOfSpeech: "n",
            englishMeaning: "Unfair opinion or feeling",
            sentenceExample: "We must fight against all prejudice.",
            arabicMeaning: "تحيز",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 56,
            word: "prejudiced",
            partOfSpeech: "adj",
            englishMeaning: "Having unfair negative opinions",
            sentenceExample: "Prejudiced people often discriminate.",
            arabicMeaning: "متحيز",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 57,
            word: "biased",
            partOfSpeech: "adj",
            englishMeaning: "Favoring one group over others",
            sentenceExample: "The article was biased against minorities.",
            arabicMeaning: "متحيز",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 58,
            word: "privilege",
            partOfSpeech: "n",
            englishMeaning: "Special right or advantage",
            sentenceExample: "Education should be a privilege for all.",
            arabicMeaning: "امتياز",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 59,
            word: "discrimination",
            partOfSpeech: "n",
            englishMeaning: "Unfair treatment based on prejudice",
            sentenceExample: "She faced discrimination at work.",
            arabicMeaning: "تمييز",
            unit: "Unit 2: Peace & Tolerance"
          },
          {
            id: 60,
            word: "integration",
            partOfSpeech: "n",
            englishMeaning: "Combining different groups into unity",
            sentenceExample: "Successful integration requires effort from all sides.",
            arabicMeaning: "تكامل",
            unit: "Unit 2: Peace & Tolerance"
          }
        ]
      },
      {
        id: "grade10-unit3",
        title: "Unit 3: Architecture & Design",
        description: "Vocabulary related to buildings, design, and construction",
        words: [
          {
            id: 61,
            word: "acoustics",
            partOfSpeech: "n",
            englishMeaning: "Sound qualities of a building",
            sentenceExample: "The auditorium has excellent acoustics.",
            arabicMeaning: "صوتيات",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 62,
            word: "aesthetic",
            partOfSpeech: "adj",
            englishMeaning: "Concerned with beauty",
            sentenceExample: "The building has strong aesthetic appeal.",
            arabicMeaning: "جمالي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 63,
            word: "architect",
            partOfSpeech: "n",
            englishMeaning: "Professional building designer",
            sentenceExample: "The architect designed a modern museum.",
            arabicMeaning: "مهندس معماري",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 64,
            word: "blueprint",
            partOfSpeech: "n",
            englishMeaning: "Detailed plan or design",
            sentenceExample: "The blueprint shows all construction details.",
            arabicMeaning: "مخطط تفصيلي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 65,
            word: "brand",
            partOfSpeech: "n",
            englishMeaning: "Trademark or label",
            sentenceExample: "The brand is famous worldwide.",
            arabicMeaning: "علامة تجارية",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 66,
            word: "canvas",
            partOfSpeech: "n",
            englishMeaning: "Heavy fabric for painting",
            sentenceExample: "The artist stretched a new canvas.",
            arabicMeaning: "لوحة رسم",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 67,
            word: "contemporary",
            partOfSpeech: "adj",
            englishMeaning: "Modern, current",
            sentenceExample: "The museum displays contemporary art.",
            arabicMeaning: "معاصر",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 68,
            word: "decorative",
            partOfSpeech: "adj",
            englishMeaning: "Made to be beautiful",
            sentenceExample: "Decorative tiles cover the walls.",
            arabicMeaning: "زخرفي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 69,
            word: "designer",
            partOfSpeech: "n",
            englishMeaning: "Professional who creates designs",
            sentenceExample: "The fashion designer created beautiful dresses.",
            arabicMeaning: "مصمم",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 70,
            word: "elevator",
            partOfSpeech: "n",
            englishMeaning: "Machine that moves between floors",
            sentenceExample: "The elevator takes you to the tenth floor.",
            arabicMeaning: "مصعد",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 71,
            word: "façade",
            partOfSpeech: "n",
            englishMeaning: "Front of a building",
            sentenceExample: "The palace's facade is magnificent.",
            arabicMeaning: "واجهة",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 72,
            word: "forecourt",
            partOfSpeech: "n",
            englishMeaning: "Open area in front of a building",
            sentenceExample: "The forecourt welcomes visitors.",
            arabicMeaning: "ساحة أمامية",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 73,
            word: "foundation",
            partOfSpeech: "n",
            englishMeaning: "Base structure",
            sentenceExample: "The foundation must be strong.",
            arabicMeaning: "أساس",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 74,
            word: "framework",
            partOfSpeech: "n",
            englishMeaning: "Supporting structure",
            sentenceExample: "The steel framework shapes the building.",
            arabicMeaning: "هيكل / بنية",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 75,
            word: "geometric",
            partOfSpeech: "adj",
            englishMeaning: "Using geometric shapes",
            sentenceExample: "The geometric patterns are stunning.",
            arabicMeaning: "هندسي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 76,
            word: "renowned",
            partOfSpeech: "adj",
            englishMeaning: "Famous",
            sentenceExample: "The architect is renowned worldwide.",
            arabicMeaning: "مشهور / معروف",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 77,
            word: "studio",
            partOfSpeech: "n",
            englishMeaning: "Artist's workshop",
            sentenceExample: "The design studio is very creative.",
            arabicMeaning: "استوديو",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 78,
            word: "venue",
            partOfSpeech: "n",
            englishMeaning: "Location for events",
            sentenceExample: "The concert venue seats 5,000 people.",
            arabicMeaning: "مكان / قاعة",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 79,
            word: "slightly",
            partOfSpeech: "adv",
            englishMeaning: "A little bit",
            sentenceExample: "The building is slightly tilted.",
            arabicMeaning: "قليلاً / بدرجة بسيطة",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 80,
            word: "council",
            partOfSpeech: "n",
            englishMeaning: "Governing body",
            sentenceExample: "The city council approved the project.",
            arabicMeaning: "مجلس",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 81,
            word: "detrimental",
            partOfSpeech: "adj",
            englishMeaning: "Harmful",
            sentenceExample: "Pollution is detrimental to architecture.",
            arabicMeaning: "ضار / مؤذٍ",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 82,
            word: "influx",
            partOfSpeech: "n",
            englishMeaning: "Arrival of large numbers",
            sentenceExample: "The influx of tourists is beneficial.",
            arabicMeaning: "اندفاع / تدفق",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 83,
            word: "objective",
            partOfSpeech: "n",
            englishMeaning: "Goal or aim",
            sentenceExample: "The objective is sustainable design.",
            arabicMeaning: "هدف / غاية",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 84,
            word: "profitable",
            partOfSpeech: "adj",
            englishMeaning: "Generating profit",
            sentenceExample: "The project was highly profitable.",
            arabicMeaning: "مربح",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 85,
            word: "voice",
            partOfSpeech: "v",
            englishMeaning: "To express",
            sentenceExample: "Architects voice their concerns.",
            arabicMeaning: "يشرح / يعبر",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 86,
            word: "chic",
            partOfSpeech: "adj",
            englishMeaning: "Stylish and fashionable",
            sentenceExample: "The chic design attracted attention.",
            arabicMeaning: "أنيق",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 87,
            word: "governmental",
            partOfSpeech: "adj",
            englishMeaning: "Related to government",
            sentenceExample: "Governmental buildings require security.",
            arabicMeaning: "حكومي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 88,
            word: "modernistic",
            partOfSpeech: "adj",
            englishMeaning: "Modern in style",
            sentenceExample: "The modernistic tower stands out.",
            arabicMeaning: "عصري / متطور",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 89,
            word: "public",
            partOfSpeech: "adj",
            englishMeaning: "For everyone",
            sentenceExample: "Public spaces should be accessible.",
            arabicMeaning: "عام / عمومي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 90,
            word: "residential",
            partOfSpeech: "adj",
            englishMeaning: "For living in",
            sentenceExample: "This is a residential area.",
            arabicMeaning: "سكني",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 91,
            word: "spacious",
            partOfSpeech: "adj",
            englishMeaning: "Having ample space",
            sentenceExample: "The lobby is bright and spacious.",
            arabicMeaning: "واسع / فسيح",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 92,
            word: "state",
            partOfSpeech: "adj",
            englishMeaning: "Government-owned",
            sentenceExample: "State buildings reflect national pride.",
            arabicMeaning: "حكومي / تابع للدولة",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 93,
            word: "sturdy",
            partOfSpeech: "adj",
            englishMeaning: "Strong and solid",
            sentenceExample: "The sturdy construction withstands storms.",
            arabicMeaning: "قوي / ثابت",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 94,
            word: "substantial",
            partOfSpeech: "adj",
            englishMeaning: "Large in size or importance",
            sentenceExample: "The building made a substantial impact.",
            arabicMeaning: "ضخم / قوي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 95,
            word: "advocate",
            partOfSpeech: "v",
            englishMeaning: "To support or recommend",
            sentenceExample: "Many advocate for green building.",
            arabicMeaning: "يدعم / يساند",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 96,
            word: "apprehensive",
            partOfSpeech: "adj",
            englishMeaning: "Anxious or fearful",
            sentenceExample: "Residents were apprehensive about changes.",
            arabicMeaning: "قلق / خائف",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 97,
            word: "benefit",
            partOfSpeech: "v",
            englishMeaning: "To be useful to",
            sentenceExample: "Good design benefits everyone.",
            arabicMeaning: "يفيد / ينفع",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 98,
            word: "boutique",
            partOfSpeech: "n",
            englishMeaning: "Small fashionable shop",
            sentenceExample: "The boutique sells designer clothes.",
            arabicMeaning: "محل صغير للملابس",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 99,
            word: "brand",
            partOfSpeech: "n",
            englishMeaning: "Trademark or label",
            sentenceExample: "The brand is famous worldwide.",
            arabicMeaning: "علامة تجارية",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 100,
            word: "edutainment",
            partOfSpeech: "n",
            englishMeaning: "Educational entertainment",
            sentenceExample: "The museum offers edutainment.",
            arabicMeaning: "تعليمي و ترفيهي",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 101,
            word: "gourmand",
            partOfSpeech: "n",
            englishMeaning: "Food enthusiast",
            sentenceExample: "The gourmand appreciated the restaurant.",
            arabicMeaning: "محب للطعام/شره",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 102,
            word: "mainstream",
            partOfSpeech: "adj",
            englishMeaning: "Conventional or dominant",
            sentenceExample: "Mainstream design follows popular trends.",
            arabicMeaning: "الاتجاه السائد",
            unit: "Unit 3: Architecture & Design"
          },
          {
            id: 103,
            word: "state-of-the-art",
            partOfSpeech: "adj",
            englishMeaning: "Using latest technology",
            sentenceExample: "The building uses state-of-the-art materials.",
            arabicMeaning: "حديث / متطور",
            unit: "Unit 3: Architecture & Design"
          }
        ]
      },
      {
        id: "grade10-unit4",
        title: "Unit 4: Computer Technology",
        description: "Vocabulary related to computers, technology, and gaming",
        words: [
          {
            id: 104,
            word: "analogue",
            partOfSpeech: "adj",
            englishMeaning: "Using continuous signals",
            sentenceExample: "Analogue watches have moving hands.",
            arabicMeaning: "تناظري / تماثلي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 105,
            word: "anti-reflective",
            partOfSpeech: "adj",
            englishMeaning: "Reducing reflection",
            sentenceExample: "The screen has an anti-reflective coating.",
            arabicMeaning: "مضاد للانعكاس",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 106,
            word: "computer-friendly",
            partOfSpeech: "adj",
            englishMeaning: "Easy to use with computers",
            sentenceExample: "The device is computer-friendly.",
            arabicMeaning: "متوافق مع الكمبيوتر",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 107,
            word: "artificial intelligence",
            partOfSpeech: "n",
            englishMeaning: "Computer systems that mimic human intelligence",
            sentenceExample: "AI powers smart assistants on phones.",
            arabicMeaning: "ذكاء اصطناعي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 108,
            word: "drive",
            partOfSpeech: "n",
            englishMeaning: "Data storage device",
            sentenceExample: "Save your files on the drive.",
            arabicMeaning: "مشغل (أقراص مدمجة)",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 109,
            word: "compete",
            partOfSpeech: "v",
            englishMeaning: "To try to win against others",
            sentenceExample: "Players compete in online games.",
            arabicMeaning: "يتنافس",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 110,
            word: "hold button",
            partOfSpeech: "n",
            englishMeaning: "Button to pause or stop",
            sentenceExample: "Press the hold button to pause.",
            arabicMeaning: "زر الإيقاف",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 111,
            word: "touchscreen",
            partOfSpeech: "n",
            englishMeaning: "Interactive display screen",
            sentenceExample: "The touchscreen responds to finger taps.",
            arabicMeaning: "شاشة تعمل باللمس",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 112,
            word: "wireless",
            partOfSpeech: "adj",
            englishMeaning: "Without wires",
            sentenceExample: "Wireless headphones are convenient.",
            arabicMeaning: "لاسلكي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 113,
            word: "competitive",
            partOfSpeech: "adj",
            englishMeaning: "Involving competition",
            sentenceExample: "The gaming market is highly competitive.",
            arabicMeaning: "تنافسي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 114,
            word: "console",
            partOfSpeech: "n",
            englishMeaning: "Gaming computer system",
            sentenceExample: "The PlayStation is a popular console.",
            arabicMeaning: "كمبيوتر خاص بالألعاب",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 115,
            word: "convoluted",
            partOfSpeech: "adj",
            englishMeaning: "Overly complex",
            sentenceExample: "The game's plot was too convoluted.",
            arabicMeaning: "معقد / صعب",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 116,
            word: "arcade",
            partOfSpeech: "n",
            englishMeaning: "Place with coin-operated games",
            sentenceExample: "We played at the arcade yesterday.",
            arabicMeaning: "لعبة كمبيوتر / مركز الألعاب",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 117,
            word: "discourse",
            partOfSpeech: "n",
            englishMeaning: "Conversation or dialogue",
            sentenceExample: "Online discourse can be toxic.",
            arabicMeaning: "محادثة / حوار",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 118,
            word: "bonus",
            partOfSpeech: "adj",
            englishMeaning: "Extra reward",
            sentenceExample: "The game offers a bonus level.",
            arabicMeaning: "مكافأة / علاوة",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 119,
            word: "breathtaking",
            partOfSpeech: "adj",
            englishMeaning: "Astonishing; stunning",
            sentenceExample: "The graphics are breathtaking.",
            arabicMeaning: "مثير / مذهل يأخذ الأنفاس",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 120,
            word: "employ",
            partOfSpeech: "v",
            englishMeaning: "To use or utilize",
            sentenceExample: "The game employs advanced physics.",
            arabicMeaning: "يوظف",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 121,
            word: "naturalistic",
            partOfSpeech: "adj",
            englishMeaning: "Realistic and lifelike",
            sentenceExample: "The naturalistic animation looks real.",
            arabicMeaning: "طبيعي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 122,
            word: "built-in",
            partOfSpeech: "adj",
            englishMeaning: "Included as part of something",
            sentenceExample: "The phone has built-in speakers.",
            arabicMeaning: "مدمج / متضمن",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 123,
            word: "perception",
            partOfSpeech: "n",
            englishMeaning: "Awareness or understanding",
            sentenceExample: "Virtual reality changes your perception.",
            arabicMeaning: "إدراك / فهم",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 124,
            word: "caller",
            partOfSpeech: "n",
            englishMeaning: "Person making a phone call",
            sentenceExample: "The caller ID shows who's calling.",
            arabicMeaning: "المتصل بالهاتف",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 125,
            word: "rival",
            partOfSpeech: "adj",
            englishMeaning: "Competing",
            sentenceExample: "Rival players face off in the tournament.",
            arabicMeaning: "منافس / خصم",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 126,
            word: "exclusive",
            partOfSpeech: "adj",
            englishMeaning: "Restricted to specific people",
            sentenceExample: "The game is exclusive to this console.",
            arabicMeaning: "حصري",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 127,
            word: "sensor",
            partOfSpeech: "n",
            englishMeaning: "Device that detects changes",
            sentenceExample: "The motion sensor tracks your movement.",
            arabicMeaning: "مستشعر / حساس",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 128,
            word: "helpline",
            partOfSpeech: "n",
            englishMeaning: "Support phone line",
            sentenceExample: "Call the helpline for technical issues.",
            arabicMeaning: "خط المساعدة",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 129,
            word: "joystick",
            partOfSpeech: "n",
            englishMeaning: "Game controller stick",
            sentenceExample: "Use the joystick to move your character.",
            arabicMeaning: "عصا التوجيه / التحكم",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 130,
            word: "simulate",
            partOfSpeech: "v",
            englishMeaning: "To imitate or model",
            sentenceExample: "The game simulates real-world physics.",
            arabicMeaning: "يقلد / يحاكي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 131,
            word: "speech recognition",
            partOfSpeech: "n",
            englishMeaning: "Technology that understands speech",
            sentenceExample: "Speech recognition allows voice commands.",
            arabicMeaning: "التعرف الصوتي",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 132,
            word: "keypad",
            partOfSpeech: "n",
            englishMeaning: "Set of keys on a device",
            sentenceExample: "Type your PIN on the keypad.",
            arabicMeaning: "لوحة المفاتيح",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 133,
            word: "visual effects",
            partOfSpeech: "n",
            englishMeaning: "Graphics and animations",
            sentenceExample: "The movie's visual effects are amazing.",
            arabicMeaning: "تأثيرات بصرية",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 134,
            word: "wizard",
            partOfSpeech: "n",
            englishMeaning: "Expert or skilled person",
            sentenceExample: "He's a wizard at programming games.",
            arabicMeaning: "بارع في / ساحر",
            unit: "Unit 4: Computer Technology"
          },
          {
            id: 135,
            word: "mode",
            partOfSpeech: "n",
            englishMeaning: "Way of operating",
            sentenceExample: "Switch to airplane mode on flights.",
            arabicMeaning: "طريقة / أسلوب / نمط",
            unit: "Unit 4: Computer Technology"
          }
        ]
      },
      {
        id: "grade10-unit5",
        title: "Unit 5: Sports & Achievement",
        description: "Vocabulary related to sports, competition, and achievement",
        words: [
          {
            id: 136,
            word: "able-bodied",
            partOfSpeech: "adj",
            englishMeaning: "Physically fit and healthy",
            sentenceExample: "Able-bodied athletes competed in the marathon.",
            arabicMeaning: "لائق بدنياً",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 137,
            word: "adversity",
            partOfSpeech: "n",
            englishMeaning: "Difficulties or hardship",
            sentenceExample: "She overcame adversity to become a champion.",
            arabicMeaning: "صعوبة / شدة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 138,
            word: "equestrian",
            partOfSpeech: "adj",
            englishMeaning: "Related to horse riding",
            sentenceExample: "Equestrian events require great skill.",
            arabicMeaning: "متعلق بركوب الخيل",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 139,
            word: "neurologist",
            partOfSpeech: "n",
            englishMeaning: "Doctor specializing in nerves",
            sentenceExample: "The neurologist treated the athlete's injury.",
            arabicMeaning: "أخصائي الأعصاب",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 140,
            word: "observe",
            partOfSpeech: "v",
            englishMeaning: "To watch carefully",
            sentenceExample: "Coaches observe athletes during training.",
            arabicMeaning: "يلاحظ",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 141,
            word: "paralympics",
            partOfSpeech: "n",
            englishMeaning: "Olympics for athletes with disabilities",
            sentenceExample: "The Paralympics showcase incredible talent.",
            arabicMeaning: "بارالمبياد",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 142,
            word: "phenomenon",
            partOfSpeech: "n",
            englishMeaning: "Remarkable event or fact",
            sentenceExample: "Her success is a global phenomenon.",
            arabicMeaning: "ظاهرة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 143,
            word: "physiotherapy",
            partOfSpeech: "n",
            englishMeaning: "Physical therapy treatment",
            sentenceExample: "Physiotherapy helped his recovery.",
            arabicMeaning: "العلاج الطبيعي",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 144,
            word: "rehabilitation",
            partOfSpeech: "n",
            englishMeaning: "Process of restoring health",
            sentenceExample: "The injury required months of rehabilitation.",
            arabicMeaning: "إعادة تأهيل",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 145,
            word: "self-discipline",
            partOfSpeech: "n",
            englishMeaning: "Control over one's actions",
            sentenceExample: "Self-discipline is essential for athletes.",
            arabicMeaning: "الانضباط الذاتي",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 146,
            word: "virtue",
            partOfSpeech: "n",
            englishMeaning: "Good moral quality",
            sentenceExample: "Patience is a virtue in sports.",
            arabicMeaning: "فضيلة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 147,
            word: "aggression",
            partOfSpeech: "n",
            englishMeaning: "Hostile or violent behavior",
            sentenceExample: "Controlled aggression helps in competition.",
            arabicMeaning: "عدوانية",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 148,
            word: "determination",
            partOfSpeech: "n",
            englishMeaning: "Firmness of purpose",
            sentenceExample: "Her determination led to victory.",
            arabicMeaning: "عزيمة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 149,
            word: "extrovert",
            partOfSpeech: "n",
            englishMeaning: "Outgoing, sociable person",
            sentenceExample: "The extrovert enjoyed team sports.",
            arabicMeaning: "منفتح",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 150,
            word: "conservation",
            partOfSpeech: "n",
            englishMeaning: "Protection of natural resources",
            sentenceExample: "Conservation efforts protect wildlife.",
            arabicMeaning: "حفظ",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 151,
            word: "deserve",
            partOfSpeech: "v",
            englishMeaning: "To be worthy of",
            sentenceExample: "Hard workers deserve recognition.",
            arabicMeaning: "يستحق",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 152,
            word: "effluent",
            partOfSpeech: "n",
            englishMeaning: "Liquid waste discharged",
            sentenceExample: "Industrial effluent pollutes water.",
            arabicMeaning: "مخرجات سائلة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 153,
            word: "fauna",
            partOfSpeech: "n",
            englishMeaning: "Animals of a region",
            sentenceExample: "The desert fauna is unique.",
            arabicMeaning: "الحيوانات",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 154,
            word: "fence off",
            partOfSpeech: "v",
            englishMeaning: "To enclose with a fence",
            sentenceExample: "They fenced off the protected area.",
            arabicMeaning: "يسياج / يفصل بسياج",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 155,
            word: "flora",
            partOfSpeech: "n",
            englishMeaning: "Plants of a region",
            sentenceExample: "The flora includes desert shrubs.",
            arabicMeaning: "النباتات",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 156,
            word: "hectare",
            partOfSpeech: "n",
            englishMeaning: "Unit of area (10,000 m²)",
            sentenceExample: "The park covers 50 hectares.",
            arabicMeaning: "هكتار",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 157,
            word: "marsh",
            partOfSpeech: "n",
            englishMeaning: "Wetland area",
            sentenceExample: "The marsh is home to many birds.",
            arabicMeaning: "مستنقع",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 158,
            word: "propagation",
            partOfSpeech: "n",
            englishMeaning: "Reproduction or spread",
            sentenceExample: "The propagation of species is essential.",
            arabicMeaning: "التكاثر",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 159,
            word: "sanctuary",
            partOfSpeech: "n",
            englishMeaning: "Safe place for wildlife",
            sentenceExample: "The bird sanctuary protects endangered species.",
            arabicMeaning: "محمية",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 160,
            word: "vegetation",
            partOfSpeech: "n",
            englishMeaning: "Plant life generally",
            sentenceExample: "The area lacks vegetation.",
            arabicMeaning: "النباتات / الغابات",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 161,
            word: "aggressive",
            partOfSpeech: "adj",
            englishMeaning: "Ready to attack",
            sentenceExample: "The aggressive animal protected its young.",
            arabicMeaning: "عدواني",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 162,
            word: "fierce",
            partOfSpeech: "adj",
            englishMeaning: "Ferocious and intense",
            sentenceExample: "The competition was fierce.",
            arabicMeaning: "شرس",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 163,
            word: "herbivore",
            partOfSpeech: "n",
            englishMeaning: "Animal that eats plants",
            sentenceExample: "The herbivore grazed peacefully.",
            arabicMeaning: "آكل الأعشاب",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 164,
            word: "hostile",
            partOfSpeech: "adj",
            englishMeaning: "Unfriendly, aggressive",
            sentenceExample: "The hostile environment challenged survival.",
            arabicMeaning: "معادٍ",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 165,
            word: "proud",
            partOfSpeech: "adj",
            englishMeaning: "Feeling pleasure from achievement",
            sentenceExample: "The team was proud of their victory.",
            arabicMeaning: "فخور",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 166,
            word: "stubborn",
            partOfSpeech: "adj",
            englishMeaning: "Refusing to change opinion",
            sentenceExample: "His stubborn attitude prevented compromise.",
            arabicMeaning: "عنيد",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 167,
            word: "sustenance",
            partOfSpeech: "n",
            englishMeaning: "Food and nourishment",
            sentenceExample: "The land provided little sustenance.",
            arabicMeaning: "غذاء",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 168,
            word: "mentality",
            partOfSpeech: "n",
            englishMeaning: "Way of thinking",
            sentenceExample: "A winning mentality drives success.",
            arabicMeaning: "عقلية / طريقة تفكير",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 169,
            word: "motivation",
            partOfSpeech: "n",
            englishMeaning: "Reason for acting",
            sentenceExample: "Motivation comes from within.",
            arabicMeaning: "حافز",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 170,
            word: "opponent",
            partOfSpeech: "n",
            englishMeaning: "Rival in competition",
            sentenceExample: "His opponent was very strong.",
            arabicMeaning: "منافس",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 171,
            word: "sportsmanship",
            partOfSpeech: "n",
            englishMeaning: "Fair play attitude",
            sentenceExample: "Good sportsmanship is essential.",
            arabicMeaning: "روح رياضية",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 172,
            word: "stimulation",
            partOfSpeech: "n",
            englishMeaning: "Encouragement or excitement",
            sentenceExample: "Mental stimulation improves performance.",
            arabicMeaning: "تحفيز",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 173,
            word: "teammate",
            partOfSpeech: "n",
            englishMeaning: "Member of the same team",
            sentenceExample: "My teammate passed the ball perfectly.",
            arabicMeaning: "زميل الفريق",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 174,
            word: "application",
            partOfSpeech: "n",
            englishMeaning: "Formal request",
            sentenceExample: "She submitted her application for the team.",
            arabicMeaning: "طلب",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 175,
            word: "badminton",
            partOfSpeech: "n",
            englishMeaning: "Racket sport",
            sentenceExample: "We play badminton on weekends.",
            arabicMeaning: "كرة الريشة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 176,
            word: "gymnastic",
            partOfSpeech: "adj",
            englishMeaning: "Physical exercises requiring skill",
            sentenceExample: "Gymnastic events require flexibility.",
            arabicMeaning: "جمباز",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 177,
            word: "member",
            partOfSpeech: "n",
            englishMeaning: "Person belonging to a group",
            sentenceExample: "Every member contributed to the win.",
            arabicMeaning: "عضو",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 178,
            word: "sauna",
            partOfSpeech: "n",
            englishMeaning: "Hot steam room",
            sentenceExample: "Athletes relax in the sauna.",
            arabicMeaning: "ساونا",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 179,
            word: "solarium",
            partOfSpeech: "n",
            englishMeaning: "Sun room for therapy",
            sentenceExample: "The solarium helps with vitamin D.",
            arabicMeaning: "حمام شمس",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 180,
            word: "feedback",
            partOfSpeech: "n",
            englishMeaning: "Information about performance",
            sentenceExample: "Coaches give feedback after matches.",
            arabicMeaning: "تغذية راجعة",
            unit: "Unit 5: Sports & Achievement"
          },
          {
            id: 181,
            word: "introvert",
            partOfSpeech: "n",
            englishMeaning: "Shy, reserved person",
            sentenceExample: "The introvert preferred individual sports.",
            arabicMeaning: "انطوائي",
            unit: "Unit 5: Sports & Achievement"
          }
        ]
      },
      {
        id: "grade10-unit6",
        title: "Unit 6: Environment & Wildlife",
        description: "Vocabulary related to nature, wildlife, and environmental protection",
        words: [
          {
            id: 182,
            word: "tame",
            partOfSpeech: "adj",
            englishMeaning: "Domesticated, not wild",
            sentenceExample: "The tame bird sat on his shoulder.",
            arabicMeaning: "مدجن",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 183,
            word: "adjacent",
            partOfSpeech: "adj",
            englishMeaning: "Next to or adjoining",
            sentenceExample: "The park is adjacent to the marsh.",
            arabicMeaning: "مجاور",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 184,
            word: "bed out",
            partOfSpeech: "ph.v",
            englishMeaning: "To plant in a garden",
            sentenceExample: "We bed out new plants in spring.",
            arabicMeaning: "يزرع في أرض معدة",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 185,
            word: "carbon monoxide",
            partOfSpeech: "n",
            englishMeaning: "Poisonous gas from combustion",
            sentenceExample: "Carbon monoxide is deadly to animals.",
            arabicMeaning: "أول أكسيد الكربون",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 186,
            word: "cleanup",
            partOfSpeech: "n",
            englishMeaning: "Act of making clean",
            sentenceExample: "The beach cleanup removed tons of trash.",
            arabicMeaning: "تنظيف",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 187,
            word: "exotic",
            partOfSpeech: "adj",
            englishMeaning: "Foreign or unusual",
            sentenceExample: "Exotic birds live in the sanctuary.",
            arabicMeaning: "غريب / أجنبي",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 188,
            word: "finance",
            partOfSpeech: "v",
            englishMeaning: "To provide money for",
            sentenceExample: "The project is financed by donations.",
            arabicMeaning: "يمول",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 189,
            word: "global",
            partOfSpeech: "adj",
            englishMeaning: "Worldwide",
            sentenceExample: "Global warming affects all species.",
            arabicMeaning: "عالمي",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 190,
            word: "imperative",
            partOfSpeech: "adj",
            englishMeaning: "Crucially important",
            sentenceExample: "It is imperative to protect wildlife.",
            arabicMeaning: "ضروري",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 191,
            word: "mammal",
            partOfSpeech: "n",
            englishMeaning: "Warm-blooded animal",
            sentenceExample: "The mammal nursed its young.",
            arabicMeaning: "ثديي",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 192,
            word: "nest",
            partOfSpeech: "n",
            englishMeaning: "Structure for eggs",
            sentenceExample: "The bird built its nest in the tree.",
            arabicMeaning: "عش",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 193,
            word: "on behalf of",
            partOfSpeech: "exp",
            englishMeaning: "Representing",
            sentenceExample: "I speak on behalf of the committee.",
            arabicMeaning: "نيابة عن",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 194,
            word: "toxin",
            partOfSpeech: "n",
            englishMeaning: "Poisonous substance",
            sentenceExample: "Industrial toxins harm the environment.",
            arabicMeaning: "سموم",
            unit: "Unit 6: Environment & Wildlife"
          },
          {
            id: 195,
            word: "wasteland",
            partOfSpeech: "n",
            englishMeaning: "Unused, barren land",
            sentenceExample: "The wasteland was turned into a reserve.",
            arabicMeaning: "أرض بور",
            unit: "Unit 6: Environment & Wildlife"
          }
        ]
      }
    ]
  },

  // Grade 11 - Complete vocabulary (adding missing units 3-6)
  {
    grade: 11,
    title: "Grade 11 Vocabulary",
    units: [
      {
        id: "grade11-unit1",
        title: "Unit One",
        description: "Celebrations and Cultural Events",
        words: [
          {
            id: 196,
            word: "canopy",
            partOfSpeech: "n",
            englishMeaning: "A covering forming a roof or shade",
            sentenceExample: "The dense jungle trees formed a thick canopy overhead.",
            arabicMeaning: "مظلة - غطاء مزخرف",
            unit: "Unit One"
          },
          {
            id: 197,
            word: "dazzling",
            partOfSpeech: "adj",
            englishMeaning: "Extremely bright, impressive, or attractive",
            sentenceExample: "The fireworks display was truly dazzling.",
            arabicMeaning: "مبهج - مبهر",
            unit: "Unit One"
          },
          {
            id: 198,
            word: "discipline",
            partOfSpeech: "n",
            englishMeaning: "A branch of learning or scholarly instruction",
            sentenceExample: "Physics is a challenging but rewarding academic discipline.",
            arabicMeaning: "مادة دراسية",
            unit: "Unit One"
          },
          {
            id: 199,
            word: "extravaganza",
            partOfSpeech: "n",
            englishMeaning: "An elaborate and spectacular show or event",
            sentenceExample: "The opening ceremony of the games was a stunning extravaganza.",
            arabicMeaning: "عرض استثنائي",
            unit: "Unit One"
          },
          {
            id: 200,
            word: "gather",
            partOfSpeech: "v",
            englishMeaning: "To come together; assemble or accumulate",
            sentenceExample: "The crowd began to gather in the town square for the concert.",
            arabicMeaning: "يجتمع",
            unit: "Unit One"
          },
          {
            id: 201,
            word: "launch",
            partOfSpeech: "v",
            englishMeaning: "To start or set in motion",
            sentenceExample: "The company plans to launch its new product next month.",
            arabicMeaning: "ينطلق - يبدأ",
            unit: "Unit One"
          },
          {
            id: 202,
            word: "multitude",
            partOfSpeech: "n",
            englishMeaning: "A large number of people or things",
            sentenceExample: "A multitude of stars shone brightly in the clear night sky.",
            arabicMeaning: "عديد - عدد كبير",
            unit: "Unit One"
          },
          {
            id: 203,
            word: "nurture",
            partOfSpeech: "v",
            englishMeaning: "To care for and encourage the growth or development of",
            sentenceExample: "Parents have a duty to nurture their children's talents.",
            arabicMeaning: "يرعي",
            unit: "Unit One"
          },
          {
            id: 204,
            word: "patriotic",
            partOfSpeech: "adj",
            englishMeaning: "Expressing devotion to and vigorous support for one's country",
            sentenceExample: "He felt a surge of patriotic pride as the flag was raised.",
            arabicMeaning: "وطني",
            unit: "Unit One"
          },
          {
            id: 205,
            word: "stream",
            partOfSpeech: "n",
            englishMeaning: "A continuous flow or succession of something",
            sentenceExample: "There was a constant stream of traffic on the highway.",
            arabicMeaning: "تدفق - سيل",
            unit: "Unit One"
          },
          {
            id: 206,
            word: "unrivalled",
            partOfSpeech: "adj",
            englishMeaning: "Better than everyone or everything else",
            sentenceExample: "The ancient city boasts a history of unrivalled richness and complexity.",
            arabicMeaning: "ليس له مثيل",
            unit: "Unit One"
          },
          {
            id: 207,
            word: "bagpipes",
            partOfSpeech: "n",
            englishMeaning: "A wind instrument with a bag and drone pipes",
            sentenceExample: "After three hours of worship from Christian music artists, the service opened with bagpipes playing \"Amazing Grace.\"",
            arabicMeaning: "مزمار القرية (آلة إسكتلندية)",
            unit: "Unit One"
          },
          {
            id: 208,
            word: "carnival",
            partOfSpeech: "n",
            englishMeaning: "A public festival, typically involving parades, music, and elaborate costumes",
            sentenceExample: "The annual carnival brought the whole city out onto the streets.",
            arabicMeaning: "كرنفال",
            unit: "Unit One"
          },
          {
            id: 209,
            word: "celebratory",
            partOfSpeech: "adj",
            englishMeaning: "Pertaining to or used for a celebration",
            sentenceExample: "They enjoyed a celebratory dinner after receiving the good news.",
            arabicMeaning: "احتفالي",
            unit: "Unit One"
          },
          {
            id: 210,
            word: "display",
            partOfSpeech: "n",
            englishMeaning: "A spectacular public showing or exhibition",
            sentenceExample: "The museum had a fascinating display of ancient artifacts.",
            arabicMeaning: "العرض",
            unit: "Unit One"
          },
          {
            id: 211,
            word: "festivity",
            partOfSpeech: "n",
            englishMeaning: "Joyful celebration or elaborate entertainment",
            sentenceExample: "The city was alive with festivity during the holiday season.",
            arabicMeaning: "احتفال",
            unit: "Unit One"
          },
          {
            id: 212,
            word: "hire",
            partOfSpeech: "v",
            englishMeaning: "To employ someone for wages or rent something",
            sentenceExample: "We decided to hire a professional photographer for the wedding.",
            arabicMeaning: "يؤجر",
            unit: "Unit One"
          },
          {
            id: 213,
            word: "preoccupied",
            partOfSpeech: "adj",
            englishMeaning: "Absorbed in thought; engrossed",
            sentenceExample: "She was too preoccupied with her work to notice the time.",
            arabicMeaning: "مشغول البال",
            unit: "Unit One"
          },
          {
            id: 214,
            word: "take part in",
            partOfSpeech: "ph.v",
            englishMeaning: "To participate in",
            sentenceExample: "Everyone should take part in community clean-up days.",
            arabicMeaning: "يشارك",
            unit: "Unit One"
          },
          {
            id: 215,
            word: "bubbly",
            partOfSpeech: "adj",
            englishMeaning: "Full of cheerful high spirits",
            sentenceExample: "She has a wonderfully bubbly personality that cheers up everyone around her.",
            arabicMeaning: "نشيط - حيوي",
            unit: "Unit One"
          },
          {
            id: 216,
            word: "chain",
            partOfSpeech: "n",
            englishMeaning: "A series of connected things or people",
            sentenceExample: "A popular chain of coffee shops opened a new branch downtown.",
            arabicMeaning: "سلسلة - مجموعة من",
            unit: "Unit One"
          },
          {
            id: 217,
            word: "commemorate",
            partOfSpeech: "v",
            englishMeaning: "To recall and show respect for (someone or something) in a ceremony",
            sentenceExample: "A statue was erected to commemorate the soldiers who died in the war.",
            arabicMeaning: "يحيي ذكري",
            unit: "Unit One"
          },
          {
            id: 218,
            word: "embark",
            partOfSpeech: "v",
            englishMeaning: "To begin a course of action; go on board a ship or aircraft",
            sentenceExample: "They decided to embark on a new business venture abroad.",
            arabicMeaning: "يركب",
            unit: "Unit One"
          },
          {
            id: 219,
            word: "exuberant",
            partOfSpeech: "adj",
            englishMeaning: "Filled with or characterized by a lively energy and excitement",
            sentenceExample: "The audience gave an exuberant round of applause.",
            arabicMeaning: "نشيط",
            unit: "Unit One"
          },
          {
            id: 220,
            word: "fanciful",
            partOfSpeech: "adj",
            englishMeaning: "Overimaginative and unrealistic; existing only in the imagination",
            sentenceExample: "The child told a fanciful story about talking animals.",
            arabicMeaning: "خيالي",
            unit: "Unit One"
          },
          {
            id: 221,
            word: "intricate",
            partOfSpeech: "adj",
            englishMeaning: "Very complicated or detailed",
            sentenceExample: "The clockwork mechanism was incredibly intricate.",
            arabicMeaning: "معقد",
            unit: "Unit One"
          },
          {
            id: 222,
            word: "unison",
            partOfSpeech: "n",
            englishMeaning: "Simultaneous performance or utterance of action or speech",
            sentenceExample: "The choir sang in perfect unison.",
            arabicMeaning: "تزامن",
            unit: "Environment"
          },
          {
            id: 223,
            word: "weaving",
            partOfSpeech: "n",
            englishMeaning: "The action or process of forming fabric by interlacing threads",
            sentenceExample: "She learned the traditional art of basket weaving from her grandmother.",
            arabicMeaning: "نسيج",
            unit: "Unit One"
          }
        ]
      },
      {
        id: "grade11-unit2",
        title: "Unit Two",
        description: "Family and Social Gatherings",
        words: [
          {
            id: 224,
            word: "close-knit",
            partOfSpeech: "adj",
            englishMeaning: "Closely linked together; tightly bonded",
            sentenceExample: "They are a very close-knit family who support each other constantly.",
            arabicMeaning: "متقارب - قريب",
            unit: "Unit Two"
          },
          {
            id: 225,
            word: "eldest",
            partOfSpeech: "adj",
            englishMeaning: "The person who is the oldest",
            sentenceExample: "My eldest sister is planning to go to university next year.",
            arabicMeaning: "الأكبر سناً",
            unit: "Unit Two"
          },
          {
            id: 226,
            word: "formal",
            partOfSpeech: "adj",
            englishMeaning: "Done in accordance with established convention or rules",
            sentenceExample: "The invitation specified a formal dress code for the dinner.",
            arabicMeaning: "رسمي",
            unit: "Unit Two"
          },
          {
            id: 227,
            word: "get-together",
            partOfSpeech: "n",
            englishMeaning: "An informal social gathering",
            sentenceExample: "We're planning a small get-together at my place this weekend.",
            arabicMeaning: "جمعة - لقاء",
            unit: "Unit Two"
          },
          {
            id: 228,
            word: "hold",
            partOfSpeech: "v",
            englishMeaning: "To organize or stage an event",
            sentenceExample: "The school will hold its annual sports day next Friday.",
            arabicMeaning: "يقيم",
            unit: "Unit Two"
          },
          {
            id: 229,
            word: "milestone",
            partOfSpeech: "n",
            englishMeaning: "A significant stage or event in the development of something",
            sentenceExample: "Graduating from college was a major milestone in her life.",
            arabicMeaning: "الحدث الرئيسي",
            unit: "Unit Two"
          },
          {
            id: 230,
            word: "swap",
            partOfSpeech: "v",
            englishMeaning: "To exchange one thing for another",
            sentenceExample: "I decided to swap my old car for a newer, more economical model.",
            arabicMeaning: "يتبادل",
            unit: "Unit Two"
          },
          {
            id: 231,
            word: "touching",
            partOfSpeech: "adj",
            englishMeaning: "Arousing tender, sympathetic, or sad emotion",
            sentenceExample: "It was a very touching moment when they were finally reunited.",
            arabicMeaning: "مؤثر",
            unit: "Unit Two"
          },
          {
            id: 232,
            word: "breathing space",
            partOfSpeech: "n",
            englishMeaning: "A pause or interval for rest or recovery",
            sentenceExample: "After finishing the project, he took a week off to get some much-needed breathing space.",
            arabicMeaning: "فترة راحة",
            unit: "Unit Two"
          }
        ]
      },
      {
        id: "grade11-unit3",
        title: "Unit Three",
        description: "Health & Hospitality",
        words: [
          {
            id: 233,
            word: "hospitality",
            partOfSpeech: "n",
            englishMeaning: "The friendly and generous reception and entertainment of guests",
            sentenceExample: "They showed great hospitality by inviting us to stay for the weekend.",
            arabicMeaning: "كرم ضيافة",
            unit: "Unit Three"
          },
          {
            id: 234,
            word: "cardamom",
            partOfSpeech: "n",
            englishMeaning: "The aromatic seeds or pods of a plant, used as a spice",
            sentenceExample: "The coffee was flavored with a pinch of cardamom and saffron.",
            arabicMeaning: "الهيل",
            unit: "Unit Three"
          },
          {
            id: 235,
            word: "cordially",
            partOfSpeech: "adv",
            englishMeaning: "In a warm and friendly manner",
            sentenceExample: "The hosts cordially invited all the neighbors to the gathering.",
            arabicMeaning: "بود - بحب",
            unit: "Unit Three"
          },
          {
            id: 236,
            word: "decaffeinated",
            partOfSpeech: "adj",
            englishMeaning: "Having had the caffeine removed",
            sentenceExample: "I prefer to drink decaffeinated coffee in the evening.",
            arabicMeaning: "خالي من الكافيين",
            unit: "Unit Three"
          },
          {
            id: 237,
            word: "distinctive",
            partOfSpeech: "adj",
            englishMeaning: "Characteristic of one person or thing, and distinguishing it from others",
            sentenceExample: "The building has a very distinctive architectural style.",
            arabicMeaning: "مميز",
            unit: "Unit Three"
          },
          {
            id: 238,
            word: "espresso",
            partOfSpeech: "n",
            englishMeaning: "Strong black coffee made by forcing steam through ground coffee beans",
            sentenceExample: "I usually start my day with a strong shot of espresso.",
            arabicMeaning: "قهوة مركزة",
            unit: "Unit Three"
          },
          {
            id: 239,
            word: "fragrance",
            partOfSpeech: "n",
            englishMeaning: "A pleasant, sweet smell",
            sentenceExample: "The room was filled with the sweet fragrance of roses.",
            arabicMeaning: "رائحته عطر",
            unit: "Unit Three"
          },
          {
            id: 240,
            word: "immediate",
            partOfSpeech: "adj",
            englishMeaning: "Happening or existing without delay",
            sentenceExample: "We need an immediate response to this emergency.",
            arabicMeaning: "فوري",
            unit: "Unit Three"
          },
          {
            id: 241,
            word: "import",
            partOfSpeech: "v",
            englishMeaning: "To bring goods or services into a country from abroad for sale",
            sentenceExample: "The country has to import most of its fuel from overseas.",
            arabicMeaning: "يستورد",
            unit: "Unit Three"
          },
          {
            id: 242,
            word: "instant",
            partOfSpeech: "adj",
            englishMeaning: "Happening or coming immediately",
            sentenceExample: "The new communication tool provides instant feedback.",
            arabicMeaning: "فوري",
            unit: "Unit Three"
          },
          {
            id: 243,
            word: "log on",
            partOfSpeech: "ph.v",
            englishMeaning: "To go through the procedures to begin use of a computer, network, or online service",
            sentenceExample: "Please log on to the website to access your account details.",
            arabicMeaning: "يسجل الدخول لموقع",
            unit: "Unit Three"
          },
          {
            id: 244,
            word: "pill",
            partOfSpeech: "n",
            englishMeaning: "A small rounded mass of a medicinal substance to be swallowed",
            sentenceExample: "She takes a vitamin pill every morning with breakfast.",
            arabicMeaning: "حبة دواء",
            unit: "Unit Three"
          },
          {
            id: 245,
            word: "quarrel",
            partOfSpeech: "n",
            englishMeaning: "A heated argument or disagreement",
            sentenceExample: "They had a small quarrel over which movie to watch.",
            arabicMeaning: "مشاجرة",
            unit: "Unit Three"
          },
          {
            id: 246,
            word: "refill",
            partOfSpeech: "v",
            englishMeaning: "To fill (something) again",
            sentenceExample: "Could you please refill my glass with water?",
            arabicMeaning: "يعيد ملئ",
            unit: "Unit Three"
          },
          {
            id: 247,
            word: "socialise",
            partOfSpeech: "v",
            englishMeaning: "To participate in social activities; to mix socially with others",
            sentenceExample: "She likes to socialise with her colleagues after work.",
            arabicMeaning: "يجتمع بالناس",
            unit: "Unit Three"
          },
          {
            id: 248,
            word: "autograph",
            partOfSpeech: "n",
            englishMeaning: "A signature, especially that of a celebrity",
            sentenceExample: "We asked her for her autograph after the concert.",
            arabicMeaning: "التوقيع من المشاهير",
            unit: "Unit Three"
          },
          {
            id: 249,
            word: "converse",
            partOfSpeech: "v",
            englishMeaning: "To engage in conversation",
            sentenceExample: "She enjoyed the chance to converse with the guest speaker after the lecture.",
            arabicMeaning: "يشترك في محادثة",
            unit: "Unit Three"
          },
          {
            id: 250,
            word: "in charge of",
            partOfSpeech: "exp",
            englishMeaning: "Responsible for; having control or supervision over",
            sentenceExample: "Who is in charge of organizing the team's travel arrangements?",
            arabicMeaning: "المسؤول عن",
            unit: "Unit Three"
          },
          {
            id: 251,
            word: "irritated",
            partOfSpeech: "adj",
            englishMeaning: "Annoyed, slightly angry",
            sentenceExample: "He was visibly irritated by the constant noise outside his window.",
            arabicMeaning: "متضايق",
            unit: "Unit Three"
          },
          {
            id: 252,
            word: "lonesome",
            partOfSpeech: "adj",
            englishMeaning: "Solitary or lonely",
            sentenceExample: "He felt lonesome after his family moved away.",
            arabicMeaning: "وحيد",
            unit: "Unit Three"
          },
          {
            id: 253,
            word: "plaza",
            partOfSpeech: "n",
            englishMeaning: "A public square or open space in a town or city",
            sentenceExample: "We met at the fountain in the main town plaza.",
            arabicMeaning: "ساحة - فناء",
            unit: "Unit Three"
          },
          {
            id: 254,
            word: "sickly",
            partOfSpeech: "adj",
            englishMeaning: "Frequent or susceptible to illness; causing nausea",
            sentenceExample: "The old dog had been looking very sickly for the past week.",
            arabicMeaning: "مريض",
            unit: "Unit Three"
          },
          {
            id: 255,
            word: "stadium",
            partOfSpeech: "n",
            englishMeaning: "An athletic or sports arena with tiers of seats for spectators",
            sentenceExample: "Thousands of fans filled the stadium for the championship match.",
            arabicMeaning: "استاد - ملعب",
            unit: "Unit Three"
          },
          {
            id: 256,
            word: "teapot",
            partOfSpeech: "n",
            englishMeaning: "A pot for brewing and serving tea",
            sentenceExample: "She poured the freshly brewed tea from the ceramic teapot.",
            arabicMeaning: "إبريق الشاي",
            unit: "Unit Three"
          },
          {
            id: 257,
            word: "weary",
            partOfSpeech: "adj",
            englishMeaning: "Feeling or showing tiredness, especially as a result of excessive exertion or lack of sleep",
            sentenceExample: "The hikers were weary after their long trek up the mountain.",
            arabicMeaning: "مرهق - متعب",
            unit: "Unit Three"
          },
          {
            id: 258,
            word: "beverage",
            partOfSpeech: "n",
            englishMeaning: "A drink, especially one other than water",
            sentenceExample: "Alcoholic beverages are served in the hotel lounge.",
            arabicMeaning: "مشروب",
            unit: "Unit Three"
          },
          {
            id: 259,
            word: "catch-up",
            partOfSpeech: "n",
            englishMeaning: "A meeting to discuss what has happened since the last meeting",
            sentenceExample: "Let's schedule a quick catch-up next week to review the project status.",
            arabicMeaning: "مقابلة - لقاء",
            unit: "Unit Three"
          },
          {
            id: 260,
            word: "make it",
            partOfSpeech: "ph.v",
            englishMeaning: "To be able to be present at a place or event; to succeed",
            sentenceExample: "I hope I can make it to your party despite my busy schedule.",
            arabicMeaning: "يحضر",
            unit: "Unit Three"
          },
          {
            id: 261,
            word: "meet up",
            partOfSpeech: "ph.v",
            englishMeaning: "To meet someone in order to do something together",
            sentenceExample: "We agreed to meet up outside the cinema at seven o'clock.",
            arabicMeaning: "يقابل",
            unit: "Unit Three"
          },
          {
            id: 262,
            word: "reschedule",
            partOfSpeech: "v",
            englishMeaning: "To change the time or date of (a planned event)",
            sentenceExample: "We had to reschedule the meeting because the main speaker was ill.",
            arabicMeaning: "يعيد ترتيب الجدول",
            unit: "Unit Three"
          },
          {
            id: 263,
            word: "sales",
            partOfSpeech: "n",
            englishMeaning: "A period during which a retailer sells goods at reduced prices",
            sentenceExample: "I bought this jacket during the summer sales.",
            arabicMeaning: "تخفيضات",
            unit: "Unit Three"
          },
          {
            id: 264,
            word: "window shopping",
            partOfSpeech: "n",
            englishMeaning: "The activity of looking at the goods displayed in shop windows without buying anything",
            sentenceExample: "We spent the afternoon window shopping and enjoying the festive atmosphere.",
            arabicMeaning: "التنقل بين المحلات بدون شراء",
            unit: "Unit Three"
          }
        ]
      },
      {
        id: "grade11-unit4",
        title: "Unit Four",
        description: "Social Interaction & Communication",
        words: [
          {
            id: 265,
            word: "adjustment",
            partOfSpeech: "n",
            englishMeaning: "A small alteration or movement made to achieve a desired fit, appearance, or result",
            sentenceExample: "Moving from the city to the country requires an adjustment.",
            arabicMeaning: "تعديل",
            unit: "Unit Four"
          },
          {
            id: 266,
            word: "assumption",
            partOfSpeech: "n",
            englishMeaning: "A thing that is accepted as true or as certain to happen, without proof",
            sentenceExample: "I made the assumption that he was coming, so I was surprised when he didn't show up.",
            arabicMeaning: "افتراض",
            unit: "Unit Four"
          },
          {
            id: 267,
            word: "block out",
            partOfSpeech: "ph.v",
            englishMeaning: "To prevent light or sound from entering or leaving a place",
            sentenceExample: "We used thick curtains to block out the morning sun.",
            arabicMeaning: "يسد - يحجب الرؤية",
            unit: "Unit Four"
          },
          {
            id: 268,
            word: "capacity",
            partOfSpeech: "n",
            englishMeaning: "The maximum amount that something can contain",
            sentenceExample: "The concert hall was filled to its full capacity.",
            arabicMeaning: "قدرة - مقدرة",
            unit: "Unit Four"
          },
          {
            id: 269,
            word: "defensiveness",
            partOfSpeech: "n",
            englishMeaning: "The quality of being anxious to avoid criticism or resistance",
            sentenceExample: "His immediate defensiveness suggested he knew he was partly at fault.",
            arabicMeaning: "دفاع",
            unit: "Unit Four"
          },
          {
            id: 270,
            word: "distraction",
            partOfSpeech: "n",
            englishMeaning: "A thing that prevents someone from concentrating on something else",
            sentenceExample: "The constant phone notifications were a major distraction while studying.",
            arabicMeaning: "تشتيت",
            unit: "Unit Four"
          },
          {
            id: 271,
            word: "empathy",
            partOfSpeech: "n",
            englishMeaning: "The ability to understand and share the feelings of another",
            sentenceExample: "Good leaders show empathy towards their team members.",
            arabicMeaning: "تعاطف",
            unit: "Unit Four"
          },
          {
            id: 272,
            word: "enhance",
            partOfSpeech: "v",
            englishMeaning: "To intensify, increase, or further improve the quality, value, or extent of",
            sentenceExample: "This new software will enhance the user experience.",
            arabicMeaning: "يقوي - يعزز",
            unit: "Unit Four"
          },
          {
            id: 273,
            word: "interlocutor",
            partOfSpeech: "n",
            englishMeaning: "A person who takes part in a dialogue or conversation",
            sentenceExample: "The moderator introduced the two interlocutors for the debate.",
            arabicMeaning: "مشترك في محادثة",
            unit: "Unit Four"
          },
          {
            id: 274,
            word: "non-verbal",
            partOfSpeech: "adj",
            englishMeaning: "Not involving or using words or speech",
            sentenceExample: "Her body language provided a lot of non-verbal communication.",
            arabicMeaning: "لا شفهي - بدون كلام",
            unit: "Unit Four"
          },
          {
            id: 275,
            word: "accountant",
            partOfSpeech: "n",
            englishMeaning: "A person whose job is to keep or inspect the financial accounts of an organization",
            sentenceExample: "I pay an accountant to file my tax returns each year.",
            arabicMeaning: "محاسب",
            unit: "Unit Four"
          },
          {
            id: 276,
            word: "annual",
            partOfSpeech: "adj",
            englishMeaning: "Occurring once every year",
            sentenceExample: "Our company supports an annual event to raise money for cancer research.",
            arabicMeaning: "سنوي",
            unit: "Unit Four"
          },
          {
            id: 277,
            word: "continent",
            partOfSpeech: "n",
            englishMeaning: "Any of the world's main continuous expanses of land",
            sentenceExample: "Australia is both a country and a continent.",
            arabicMeaning: "قارة",
            unit: "Unit Four"
          },
          {
            id: 278,
            word: "courteous",
            partOfSpeech: "adj",
            englishMeaning: "Polite, respectful, or considerate in manner",
            sentenceExample: "The clerk was very courteous and helped me find what I needed.",
            arabicMeaning: "مؤدب",
            unit: "Unit Four"
          },
          {
            id: 279,
            word: "deem",
            partOfSpeech: "v",
            englishMeaning: "To regard or consider in a specified way",
            sentenceExample: "The manager will deem which employees are eligible for the bonus.",
            arabicMeaning: "يحكم علي - يعتبر",
            unit: "Unit Four"
          },
          {
            id: 280,
            word: "demand",
            partOfSpeech: "n",
            englishMeaning: "An insistent and peremptory request, made as of right",
            sentenceExample: "The workers issued a list of demands to the management.",
            arabicMeaning: "طلب",
            unit: "Unit Four"
          },
          {
            id: 281,
            word: "diva",
            partOfSpeech: "n",
            englishMeaning: "A famous female singer, especially an opera singer",
            sentenceExample: "The renowned opera diva received a standing ovation.",
            arabicMeaning: "مغنية الأوبرا المشهورة",
            unit: "Unit Four"
          },
          {
            id: 282,
            word: "flattering",
            partOfSpeech: "adj",
            englishMeaning: "Full of praise and compliments; enhancing someone's appearance",
            sentenceExample: "That color is very flattering on you.",
            arabicMeaning: "مدح زائد",
            unit: "Unit Four"
          },
          {
            id: 283,
            word: "harshly",
            partOfSpeech: "adv",
            englishMeaning: "In a severe or cruel way",
            sentenceExample: "The teacher spoke harshly to the student who was misbehaving.",
            arabicMeaning: "بقسوة",
            unit: "Unit Four"
          },
          {
            id: 284,
            word: "insult",
            partOfSpeech: "n",
            englishMeaning: "A disrespectful or abusive remark or action",
            sentenceExample: "She felt the comment was a personal insult to her abilities.",
            arabicMeaning: "إهانة",
            unit: "Unit Four"
          },
          {
            id: 285,
            word: "meticulously",
            partOfSpeech: "adv",
            englishMeaning: "In a way that shows great attention to detail; very carefully and precisely",
            sentenceExample: "The artifact was cleaned meticulously by the conservator.",
            arabicMeaning: "بدقة",
            unit: "Unit Four"
          },
          {
            id: 286,
            word: "mountain range",
            partOfSpeech: "n",
            englishMeaning: "A line of mountains connected by high ground",
            sentenceExample: "The Andes mountain range stretches along the western coast of South America.",
            arabicMeaning: "سلاسل جبلية",
            unit: "Unit Four"
          },
          {
            id: 287,
            word: "owe",
            partOfSpeech: "v",
            englishMeaning: "To be under an obligation to pay or repay (money, services, or thanks) to someone",
            sentenceExample: "I still owe my friend $20 from lunch yesterday.",
            arabicMeaning: "يدين لشخص ما",
            unit: "Unit Four"
          },
          {
            id: 288,
            word: "pane",
            partOfSpeech: "n",
            englishMeaning: "A single sheet of glass in a window or door",
            sentenceExample: "A cricket ball shattered a pane of glass in the conservatory.",
            arabicMeaning: "لوح زجاج",
            unit: "Unit Four"
          },
          {
            id: 289,
            word: "attestation",
            partOfSpeech: "n",
            englishMeaning: "The action of giving official testimony or evidence",
            sentenceExample: "He declared his age at attestation as being 44.",
            arabicMeaning: "تصديق علي اوراق",
            unit: "Unit Four"
          },
          {
            id: 290,
            word: "cardiac",
            partOfSpeech: "adj",
            englishMeaning: "Relating to the heart",
            sentenceExample: "The patient was admitted to the hospital with a suspected cardiac arrest.",
            arabicMeaning: "خاص بالقلب",
            unit: "Unit Four"
          },
          {
            id: 291,
            word: "doctorate",
            partOfSpeech: "n",
            englishMeaning: "The highest degree awarded by a university",
            sentenceExample: "She is currently working towards her doctorate in philosophy.",
            arabicMeaning: "دكتوراه",
            unit: "Unit Four"
          },
          {
            id: 292,
            word: "enclose",
            partOfSpeech: "v",
            englishMeaning: "To surround or to put (something) inside something else",
            sentenceExample: "Please enclose your résumé with your application form.",
            arabicMeaning: "يرفق بـ",
            unit: "Unit Four"
          },
          {
            id: 293,
            word: "extensive",
            partOfSpeech: "adj",
            englishMeaning: "Covering a large area; very thorough",
            sentenceExample: "The damage caused by the storm was extensive.",
            arabicMeaning: "مكثف - شامل",
            unit: "Unit Four"
          },
          {
            id: 294,
            word: "in advance",
            partOfSpeech: "phrase",
            englishMeaning: "Before a particular time; beforehand",
            sentenceExample: "Please book your tickets in advance to avoid disappointment.",
            arabicMeaning: "مقدماً - مسبقا",
            unit: "Unit Four"
          },
          {
            id: 295,
            word: "reference",
            partOfSpeech: "n",
            englishMeaning: "A source of information or a citation, or a formal statement of a person's qualities",
            sentenceExample: "You should always include a list of references in your academic paper.",
            arabicMeaning: "مرجع",
            unit: "Unit Four"
          }
        ]
      },
      {
        id: "grade11-unit5",
        title: "Unit Five",
        description: "Languages & Writing",
        words: [
          {
            id: 296,
            word: "ameliorated",
            partOfSpeech: "adj",
            englishMeaning: "Made better; improved",
            sentenceExample: "An influx of foreign workers had ameliorated the problem somewhat, but that has now dried up.",
            arabicMeaning: "معدل - محسن",
            unit: "Unit Five"
          },
          {
            id: 297,
            word: "BCE",
            partOfSpeech: "abbr",
            englishMeaning: "Before the Common Era (used to indicate a year in the period before the presumed year of the birth of Jesus Christ)",
            sentenceExample: "The ancient city of Babylon flourished around 1700 BCE.",
            arabicMeaning: "فترة قبل الميلاد",
            unit: "Unit Five"
          },
          {
            id: 298,
            word: "character",
            partOfSpeech: "n",
            englishMeaning: "A written or printed letter, symbol, or mark",
            sentenceExample: "She used a special character to represent the ancient language.",
            arabicMeaning: "حرف - رمز",
            unit: "Unit Five"
          },
          {
            id: 299,
            word: "cuneiform",
            partOfSpeech: "n",
            englishMeaning: "A form of ancient writing, especially of the Sumerians and Akkadians, consisting of wedge-shaped characters",
            sentenceExample: "Scholars are still deciphering tablets written in cuneiform.",
            arabicMeaning: "الكتابة المسمارية (نوع من أنواع الكتابة)",
            unit: "Unit Five"
          },
          {
            id: 300,
            word: "empire",
            partOfSpeech: "n",
            englishMeaning: "An extensive group of states or countries under a single supreme authority",
            sentenceExample: "The Roman empire once stretched across most of Europe.",
            arabicMeaning: "إمبراطورية",
            unit: "Unit Five"
          },
          {
            id: 301,
            word: "financial",
            partOfSpeech: "adj",
            englishMeaning: "Relating to money or management of money",
            sentenceExample: "She sought advice on her long-term financial planning.",
            arabicMeaning: "مالي",
            unit: "Unit Five"
          },
          {
            id: 302,
            word: "gradually",
            partOfSpeech: "adv",
            englishMeaning: "Slowly, in stages",
            sentenceExample: "The fog began to gradually lift as the sun rose higher.",
            arabicMeaning: "تدريجياً",
            unit: "Unit Five"
          },
          {
            id: 303,
            word: "hieroglyphics",
            partOfSpeech: "n",
            englishMeaning: "Writing consisting of hieroglyphs (pictorial characters)",
            sentenceExample: "Ancient Egyptian tombs are covered in hieroglyphics.",
            arabicMeaning: "الهيروغليفية",
            unit: "Unit Five"
          },
          {
            id: 304,
            word: "pictogram",
            partOfSpeech: "n",
            englishMeaning: "A pictorial symbol for a word or phrase",
            sentenceExample: "Early writing systems often started with pictograms.",
            arabicMeaning: "البكتوجرام (رموز لكلمات لغة قديمة)",
            unit: "Unit Five"
          },
          {
            id: 305,
            word: "inscribe",
            partOfSpeech: "v",
            englishMeaning: "To write or carve (words or symbols) on something",
            sentenceExample: "The message was inscribed on the base of the monument.",
            arabicMeaning: "ينسخ - يحفر",
            unit: "Unit Five"
          },
          {
            id: 306,
            word: "quotidian",
            partOfSpeech: "adj",
            englishMeaning: "Of or occurring every day; daily",
            sentenceExample: "The film depicts the quotidian struggles of working-class life.",
            arabicMeaning: "يومي",
            unit: "Unit Five"
          },
          {
            id: 307,
            word: "reed",
            partOfSpeech: "n",
            englishMeaning: "A tall, slender-leaved plant of the grass family, which grows in marshes or shallow water",
            sentenceExample: "Ancient scribes used a sharpened reed as a writing tool.",
            arabicMeaning: "قصب (نبات كان يستخدم في الكتابة)",
            unit: "Unit Five"
          },
          {
            id: 308,
            word: "scribe",
            partOfSpeech: "n",
            englishMeaning: "A person who copies out documents, especially one employed to do this before printing was invented",
            sentenceExample: "The scribe meticulously copied the manuscript onto parchment.",
            arabicMeaning: "ناسخ - كاتب",
            unit: "Unit Five"
          },
          {
            id: 309,
            word: "throughout",
            partOfSpeech: "prep",
            englishMeaning: "In every part of (an area or object); from beginning to end of (a period of time)",
            sentenceExample: "The effects of the new policy were felt throughout the country.",
            arabicMeaning: "من خلال",
            unit: "Unit Five"
          },
          {
            id: 310,
            word: "practical",
            partOfSpeech: "adj",
            englishMeaning: "Of or concerned with the actual doing or use of something rather than with theory",
            sentenceExample: "She prefers a practical approach to problem-solving.",
            arabicMeaning: "عملي - تطبيقي",
            unit: "Unit Five"
          },
          {
            id: 311,
            word: "precious",
            partOfSpeech: "adj",
            englishMeaning: "Of great value because of being rare, costly, or important",
            sentenceExample: "The locket contained a precious lock of hair.",
            arabicMeaning: "ثمين - غالي",
            unit: "Unit Five"
          },
          {
            id: 312,
            word: "acquire",
            partOfSpeech: "v",
            englishMeaning: "To buy or obtain (an asset or object) for oneself",
            sentenceExample: "The team acquired three new players this year.",
            arabicMeaning: "يكسب",
            unit: "Unit Five"
          },
          {
            id: 313,
            word: "amateur",
            partOfSpeech: "n",
            englishMeaning: "A person who engages in a pursuit, especially a sport, as a pastime rather than as a profession",
            sentenceExample: "She played soccer as an amateur before turning professional.",
            arabicMeaning: "هاوي - غير محترف",
            unit: "Unit Five"
          },
          {
            id: 314,
            word: "ballpoint",
            partOfSpeech: "n",
            englishMeaning: "A pen having a small rotating ball that inks the writing surface",
            sentenceExample: "He used a blue ballpoint pen to sign the document.",
            arabicMeaning: "قلم ذو كرة دائرية (القلم الجاف)",
            unit: "Unit Five"
          },
          {
            id: 315,
            word: "call-in",
            partOfSpeech: "n",
            englishMeaning: "A program or show during which listeners or viewers telephone the broadcaster with questions or comments",
            sentenceExample: "The radio station hosted a popular call-in show every morning.",
            arabicMeaning: "اتصال - اتصال هاتفي خلال برنامج",
            unit: "Unit Five"
          },
          {
            id: 316,
            word: "falloff",
            partOfSpeech: "n",
            englishMeaning: "A decrease in number, amount, or quality",
            sentenceExample: "There has been a noticeable falloff in tourist numbers this season.",
            arabicMeaning: "تناقص",
            unit: "Unit Five"
          },
          {
            id: 317,
            word: "literacy",
            partOfSpeech: "n",
            englishMeaning: "The ability to read and write",
            sentenceExample: "Efforts are being made to improve adult literacy rates in the region.",
            arabicMeaning: "تعليم",
            unit: "Unit Five"
          },
          {
            id: 318,
            word: "pride and joy",
            partOfSpeech: "exp",
            englishMeaning: "A person or thing that gives someone great satisfaction and pleasure",
            sentenceExample: "His antique car collection is his pride and joy.",
            arabicMeaning: "مصدر فخر و سعادة",
            unit: "Unit Five"
          },
          {
            id: 319,
            word: "publish",
            partOfSpeech: "v",
            englishMeaning: "To prepare and issue (a book, journal, piece of music, etc.) for public sale, distribution, or readership",
            sentenceExample: "The scientist hopes to publish her research findings next year.",
            arabicMeaning: "ينشر مقاله أو كتاب",
            unit: "Unit Five"
          },
          {
            id: 320,
            word: "tryout",
            partOfSpeech: "n",
            englishMeaning: "A test of the ability of a sports player or performer",
            sentenceExample: "She attended the basketball team tryouts on Saturday.",
            arabicMeaning: "امتحان تجريبي",
            unit: "Unit Five"
          },
          {
            id: 321,
            word: "writer's block",
            partOfSpeech: "n",
            englishMeaning: "The condition of being unable to think of what to write or how to proceed with writing",
            sentenceExample: "After a month of writer's block, the novelist finally got a new idea.",
            arabicMeaning: "عدم قدرة الكاتب علي التفكير",
            unit: "Unit Five"
          },
          {
            id: 322,
            word: "contribution",
            partOfSpeech: "n",
            englishMeaning: "A gift or payment to a common fund or collection; the part played by a person or thing in bringing about a result",
            sentenceExample: "Her research made a significant contribution to the field of medicine.",
            arabicMeaning: "مساهمة",
            unit: "Unit Five"
          },
          {
            id: 323,
            word: "dominate",
            partOfSpeech: "v",
            englishMeaning: "To have a commanding influence on; exercise control over",
            sentenceExample: "Large corporations now dominate the national economy.",
            arabicMeaning: "يسيطر علي - يتحكم في",
            unit: "Unit Five"
          },
          {
            id: 324,
            word: "economic",
            partOfSpeech: "adj",
            englishMeaning: "Relating to economics or economy; concerning trade, industry, and money",
            sentenceExample: "The government is focused on improving the country's economic situation.",
            arabicMeaning: "اقتصادي",
            unit: "Unit Five"
          },
          {
            id: 325,
            word: "honorary PhD",
            partOfSpeech: "n",
            englishMeaning: "A doctoral degree conferred without the normal requirements",
            sentenceExample: "The university awarded the famous artist an honorary PhD.",
            arabicMeaning: "دكتوراه فخريه - شرفيه",
            unit: "Unit Five"
          },
          {
            id: 326,
            word: "impact",
            partOfSpeech: "n",
            englishMeaning: "A powerful effect or influence",
            sentenceExample: "The new law will have a major impact on small businesses.",
            arabicMeaning: "اصطدام - تأثير",
            unit: "Unit Five"
          },
          {
            id: 327,
            word: "mainly",
            partOfSpeech: "adv",
            englishMeaning: "For the most part; chiefly",
            sentenceExample: "The group's members were mainly students from the local university.",
            arabicMeaning: "بشكل أساسي - خاصة",
            unit: "Unit Five"
          },
          {
            id: 328,
            word: "wordsmith",
            partOfSpeech: "n",
            englishMeaning: "A person who works with words; a skillful writer",
            sentenceExample: "The journalist was known as a brilliant wordsmith for his eloquent articles.",
            arabicMeaning: "ماهر في استخدام الكلمات",
            unit: "Unit Five"
          }
        ]
      },
      {
        id: "grade11-unit6",
        title: "Unit Six",
        description: "Communication & Technology",
        words: [
          {
            id: 329,
            word: "agenda",
            partOfSpeech: "n",
            englishMeaning: "A list of items to be discussed at a formal meeting",
            sentenceExample: "There are several items on the agenda for tonight's meeting.",
            arabicMeaning: "جدول أعمال",
            unit: "Unit Six"
          },
          {
            id: 330,
            word: "a great deal of",
            partOfSpeech: "phr",
            englishMeaning: "A large amount of",
            sentenceExample: "He made a great deal of money.",
            arabicMeaning: "قدر كبير من",
            unit: "Unit Six"
          },
          {
            id: 331,
            word: "browse",
            partOfSpeech: "v",
            englishMeaning: "To look through a number of books or articles without a clear idea of what you are seeking",
            sentenceExample: "She likes to browse the internet for news and interesting articles.",
            arabicMeaning: "يتصفح",
            unit: "Unit Six"
          },
          {
            id: 332,
            word: "calendar",
            partOfSpeech: "n",
            englishMeaning: "A chart or series of pages showing the days, weeks, and months of a particular year",
            sentenceExample: "I marked the dates of our vacation on the wall calendar.",
            arabicMeaning: "رزنامة - تقويم",
            unit: "Unit Six"
          },
          {
            id: 333,
            word: "cell phone",
            partOfSpeech: "n",
            englishMeaning: "A mobile telephone",
            sentenceExample: "He forgot his cell phone at home and couldn't be reached all day.",
            arabicMeaning: "هاتف خلوي",
            unit: "Unit Six"
          },
          {
            id: 334,
            word: "complement",
            partOfSpeech: "n",
            englishMeaning: "A thing that completes or brings to perfection a larger whole",
            sentenceExample: "The green scarf was the perfect complement to her red dress.",
            arabicMeaning: "تكملة",
            unit: "Unit Six"
          },
          {
            id: 335,
            word: "customise",
            partOfSpeech: "v",
            englishMeaning: "To modify something to suit a particular individual or task",
            sentenceExample: "You can customise the settings on your phone to fit your preferences.",
            arabicMeaning: "يصنع حسب الطلب",
            unit: "Unit Six"
          },
          {
            id: 336,
            word: "dominant",
            partOfSpeech: "adj",
            englishMeaning: "Having power and influence over others",
            sentenceExample: "The lion is the dominant male in the pride.",
            arabicMeaning: "سائد - مسيطر",
            unit: "Unit Six"
          },
          {
            id: 337,
            word: "function",
            partOfSpeech: "v",
            englishMeaning: "To work or operate in a particular way",
            sentenceExample: "The new software seems to function smoothly.",
            arabicMeaning: "يعمل",
            unit: "Unit Six"
          },
          {
            id: 338,
            word: "lately",
            partOfSpeech: "adv",
            englishMeaning: "Recently",
            sentenceExample: "I haven't seen much of him lately.",
            arabicMeaning: "مؤخراً - حديثاً",
            unit: "Unit Six"
          },
          {
            id: 339,
            word: "miscellaneous",
            partOfSpeech: "adj",
            englishMeaning: "(Of items or people gathered or considered together) of various types or from different sources",
            sentenceExample: "The box contained miscellaneous objects from the attic.",
            arabicMeaning: "عديد - متعدد - متنوع",
            unit: "Unit Six"
          },
          {
            id: 340,
            word: "necessity",
            partOfSpeech: "n",
            englishMeaning: "The fact of being required or indispensable",
            sentenceExample: "Food and shelter are basic human necessities.",
            arabicMeaning: "ضرورة",
            unit: "Unit Six"
          },
          {
            id: 341,
            word: "notepad",
            partOfSpeech: "n",
            englishMeaning: "A pad of paper for making notes",
            sentenceExample: "I always carry a small notepad and a pen in my bag.",
            arabicMeaning: "مفكرة",
            unit: "Unit Six"
          },
          {
            id: 342,
            word: "rely on",
            partOfSpeech: "ph.v",
            englishMeaning: "To depend on with full trust or confidence",
            sentenceExample: "You can rely on him to keep his promises.",
            arabicMeaning: "يعتمد علي",
            unit: "Unit Six"
          },
          {
            id: 343,
            word: "reminder",
            partOfSpeech: "n",
            englishMeaning: "A thing that makes someone remember something",
            sentenceExample: "I set a reminder on my phone for the appointment.",
            arabicMeaning: "مذكر",
            unit: "Unit Six"
          },
          {
            id: 344,
            word: "teleputer",
            partOfSpeech: "n",
            englishMeaning: "A mobile or portable device with combined computer and telecommunication features",
            sentenceExample: "Modern smart devices are essentially a type of teleputer.",
            arabicMeaning: "جهاز موبايل مثل الكمبيوتر",
            unit: "Unit Six"
          },
          {
            id: 345,
            word: "tend",
            partOfSpeech: "v",
            englishMeaning: "To regularly or frequently behave in a particular way or have a certain characteristic",
            sentenceExample: "People often tend to worry about things they cannot control.",
            arabicMeaning: "يميل",
            unit: "Unit Six"
          },
          {
            id: 346,
            word: "theme",
            partOfSpeech: "n",
            englishMeaning: "The subject of a talk, a piece of writing, a person's thoughts, or an exhibition",
            sentenceExample: "The central theme of the novel is love and loss.",
            arabicMeaning: "موضوع",
            unit: "Unit Six"
          },
          {
            id: 347,
            word: "via",
            partOfSpeech: "prep",
            englishMeaning: "Passing through; by way of",
            sentenceExample: "I booked my flight to London via Paris.",
            arabicMeaning: "من خلال",
            unit: "Unit Six"
          },
          {
            id: 348,
            word: "weblog",
            partOfSpeech: "n",
            englishMeaning: "A regularly updated website or web page, typically run by an individual or small group, that is written in an informal or conversational style",
            sentenceExample: "She keeps a personal weblog where she shares her travel experiences.",
            arabicMeaning: "موقع إلكتروني لنشر مواضيع",
            unit: "Unit Six"
          },
          {
            id: 349,
            word: "bin",
            partOfSpeech: "v",
            englishMeaning: "To throw away",
            sentenceExample: "After the party, we had to bin a lot of disposable plates and cups.",
            arabicMeaning: "يلقي في القمامة",
            unit: "Unit Six"
          },
          {
            id: 350,
            word: "disposable",
            partOfSpeech: "adj",
            englishMeaning: "Intended to be used once, or until no longer useful, and then thrown away",
            sentenceExample: "We used disposable plates for the picnic to make cleanup easy.",
            arabicMeaning: "يستخدم مرة واحدة",
            unit: "Unit Six"
          },
          {
            id: 351,
            word: "pass on",
            partOfSpeech: "ph.v",
            englishMeaning: "To transmit something to someone else",
            sentenceExample: "Please pass on the message to your supervisor when you see her.",
            arabicMeaning: "يمرر الأشياء للآخرين",
            unit: "Unit Six"
          },
          {
            id: 352,
            word: "reclaim",
            partOfSpeech: "v",
            englishMeaning: "To retrieve or recover (something previously lost, withheld, or paid)",
            sentenceExample: "He went to the lost property office to reclaim his forgotten umbrella.",
            arabicMeaning: "يسترد - يسترجع",
            unit: "Unit Six"
          },
          {
            id: 353,
            word: "sibling",
            partOfSpeech: "n",
            englishMeaning: "A brother or sister",
            sentenceExample: "She is the eldest of three siblings.",
            arabicMeaning: "أخ - أخت",
            unit: "Unit Six"
          },
          {
            id: 354,
            word: "hike",
            partOfSpeech: "v",
            englishMeaning: "To walk for a long distance, especially over land such as hills or mountains",
            sentenceExample: "They plan to hike through the national park this weekend.",
            arabicMeaning: "يتمشى",
            unit: "Unit Six"
          },
          {
            id: 355,
            word: "mountainous",
            partOfSpeech: "adj",
            englishMeaning: "Having many mountains",
            sentenceExample: "The northern region of the country is very mountainous.",
            arabicMeaning: "جبلي",
            unit: "Unit Six"
          },
          {
            id: 356,
            word: "notify",
            partOfSpeech: "v",
            englishMeaning: "To inform (someone) of something, typically in a formal or official manner",
            sentenceExample: "We will notify you of the results by post.",
            arabicMeaning: "يبلغ - يخبر",
            unit: "Unit Six"
          },
          {
            id: 357,
            word: "recognise",
            partOfSpeech: "v",
            englishMeaning: "To identify (someone or something) from having encountered them before; know again",
            sentenceExample: "I didn't recognise her at first because she had changed her hair.",
            arabicMeaning: "يتعرف علي",
            unit: "Unit Six"
          },
          {
            id: 358,
            word: "security",
            partOfSpeech: "n",
            englishMeaning: "The state of being free from danger or threat",
            sentenceExample: "Airport security checked everyone's bags before boarding.",
            arabicMeaning: "آمان",
            unit: "Unit Six"
          },
          {
            id: 359,
            word: "usher",
            partOfSpeech: "n",
            englishMeaning: "A person who shows people to their seats, especially in a cinema or theater",
            sentenceExample: "The usher guided us down the aisle to our seats.",
            arabicMeaning: "مرشد في سينما",
            unit: "Unit Six"
          },
          {
            id: 360,
            word: "beforehand",
            partOfSpeech: "adv",
            englishMeaning: "In advance; in anticipation",
            sentenceExample: "She answers the phone only when she knows beforehand who is ringing.",
            arabicMeaning: "مسبقاً - مقدماً",
            unit: "Unit Six"
          },
          {
            id: 361,
            word: "bookmark",
            partOfSpeech: "n",
            englishMeaning: "A strip of leather, card, or other material, used to mark the place reached in a book",
            sentenceExample: "I put a bookmark in my novel before closing it for the night.",
            arabicMeaning: "علامة لتحديد موقع أو صفحة",
            unit: "Unit Six"
          },
          {
            id: 362,
            word: "don't tell a soul",
            partOfSpeech: "phr",
            englishMeaning: "Keep the secret; don't tell anyone",
            sentenceExample: "This is a secret, so don't tell a soul.",
            arabicMeaning: "احفظ السر - الزم الكتمان",
            unit: "Unit Six"
          },
          {
            id: 363,
            word: "GPRS",
            partOfSpeech: "abbr",
            englishMeaning: "General Packet Radio Service (a mobile data service)",
            sentenceExample: "Network operators who have launched GPRS are still wrestling with how to charge for content.",
            arabicMeaning: "نظام إرسال حزم المعلومات لاسلكياً",
            unit: "Unit Six"
          },
          {
            id: 364,
            word: "modem",
            partOfSpeech: "n",
            englishMeaning: "A device that converts digital signals to analog signals for transmission over a line (such as a phone line) and vice versa",
            sentenceExample: "You need a modem to connect your computer to the internet via a phone line.",
            arabicMeaning: "المودم (جهاز لتوصيل النت)",
            unit: "Unit Six"
          },
          {
            id: 365,
            word: "paste",
            partOfSpeech: "v",
            englishMeaning: "To stick (something) onto a surface",
            sentenceExample: "He used glue to paste the photographs into his album.",
            arabicMeaning: "يلصق",
            unit: "Unit Six"
          },
          {
            id: 366,
            word: "phone book",
            partOfSpeech: "n",
            englishMeaning: "A book listing the names, addresses, and telephone numbers of the local inhabitants or organizations",
            sentenceExample: "Look up the phone number of the restaurant in the Phone book and call to reserve a table.",
            arabicMeaning: "دليل الهاتف",
            unit: "Unit Six"
          },
          {
            id: 367,
            word: "press",
            partOfSpeech: "v",
            englishMeaning: "To move (something) into a position of contact with something else",
            sentenceExample: "You have to press the button to start the machine.",
            arabicMeaning: "يضغط علي",
            unit: "Unit Six"
          }
        ]
      }
    ]
  },

  // Grade 12 - Complete vocabulary (6 units)
  {
    grade: 12,
    title: "Grade 12 Vocabulary",
    units: [
      {
        id: "grade12-unit1",
        title: "Unit 1: The Law",
        description: "Vocabulary related to law, justice, and legal procedures",
        words: [
          {
            id: 368,
            word: "adoption",
            partOfSpeech: "n",
            englishMeaning: "The action of legally taking another's child and bringing it up as one's own",
            sentenceExample: "The couple celebrated the finalization of their daughter's adoption.",
            arabicMeaning: "التبني",
            unit: "Unit 1: The Law"
          },
          {
            id: 369,
            word: "civil",
            partOfSpeech: "adj",
            englishMeaning: "Relating to private relations between members of a community; noncriminal",
            sentenceExample: "The dispute was settled in civil court rather than criminal court.",
            arabicMeaning: "مدني",
            unit: "Unit 1: The Law"
          },
          {
            id: 370,
            word: "code of law",
            partOfSpeech: "n",
            englishMeaning: "A set of rules and standards adhered to by a society",
            sentenceExample: "The country updated its code of law to reflect modern values.",
            arabicMeaning: "قانون مدون",
            unit: "Unit 1: The Law"
          },
          {
            id: 371,
            word: "consultation",
            partOfSpeech: "n",
            englishMeaning: "The action or process of formally consulting or discussing",
            sentenceExample: "The government held a public consultation before passing the bill.",
            arabicMeaning: "مشاورة",
            unit: "Unit 1: The Law"
          },
          {
            id: 372,
            word: "define",
            partOfSpeech: "v",
            englishMeaning: "To state or describe exactly the nature, scope, or meaning of",
            sentenceExample: "The judge asked the lawyer to define the legal term clearly.",
            arabicMeaning: "يعرف",
            unit: "Unit 1: The Law"
          },
          {
            id: 373,
            word: "enforce",
            partOfSpeech: "v",
            englishMeaning: "To put into practice; to carry out",
            sentenceExample: "Police officers enforce traffic laws daily.",
            arabicMeaning: "ينفذ",
            unit: "Unit 1: The Law"
          },
          {
            id: 374,
            word: "govern",
            partOfSpeech: "v",
            englishMeaning: "To control",
            sentenceExample: "Elected officials govern the country according to the constitution.",
            arabicMeaning: "يحكم",
            unit: "Unit 1: The Law"
          },
          {
            id: 375,
            word: "guilty",
            partOfSpeech: "adj",
            englishMeaning: "Responsible for a crime",
            sentenceExample: "The jury found the defendant guilty of theft.",
            arabicMeaning: "مذنب",
            unit: "Unit 1: The Law"
          },
          {
            id: 376,
            word: "impose",
            partOfSpeech: "v",
            englishMeaning: "To require a duty, charge, or penalty to be undertaken or paid",
            sentenceExample: "The judge decided to impose a heavy fine on the company.",
            arabicMeaning: "يفرض",
            unit: "Unit 1: The Law"
          },
          {
            id: 377,
            word: "innocent",
            partOfSpeech: "adj",
            englishMeaning: "Not guilty of a crime or offense",
            sentenceExample: "The evidence proved he was innocent of all charges.",
            arabicMeaning: "بريء",
            unit: "Unit 1: The Law"
          },
          {
            id: 378,
            word: "judiciary",
            partOfSpeech: "n",
            englishMeaning: "The judicial authorities of a country; judges collectively",
            sentenceExample: "The judiciary must remain independent from political influence.",
            arabicMeaning: "السلطة القضائية",
            unit: "Unit 1: The Law"
          },
          {
            id: 379,
            word: "jury",
            partOfSpeech: "n",
            englishMeaning: "Group of people in court who decide whether someone is guilty",
            sentenceExample: "The jury deliberated for three hours before reaching a verdict.",
            arabicMeaning: "هيئة المحلفين",
            unit: "Unit 1: The Law"
          },
          {
            id: 380,
            word: "legal",
            partOfSpeech: "adj",
            englishMeaning: "Appointed or required by the law",
            sentenceExample: "You should always seek legal advice before signing contracts.",
            arabicMeaning: "قانوني",
            unit: "Unit 1: The Law"
          },
          {
            id: 381,
            word: "penalty",
            partOfSpeech: "n",
            englishMeaning: "A punishment imposed for breaking a law",
            sentenceExample: "The penalty for speeding includes a fine and points on your license.",
            arabicMeaning: "عقوبة",
            unit: "Unit 1: The Law"
          },
          {
            id: 382,
            word: "persuasion",
            partOfSpeech: "n",
            englishMeaning: "A belief or set of beliefs",
            sentenceExample: "People of all political persuasion participated in the debate.",
            arabicMeaning: "إقناع",
            unit: "Unit 1: The Law"
          },
          {
            id: 383,
            word: "principle",
            partOfSpeech: "n",
            englishMeaning: "Rule; belief",
            sentenceExample: "She refused to compromise her principles for personal gain.",
            arabicMeaning: "مبدأ",
            unit: "Unit 1: The Law"
          },
          {
            id: 384,
            word: "property",
            partOfSpeech: "n",
            englishMeaning: "Something valuable which belongs to someone",
            sentenceExample: "The property was transferred to the new owner last week.",
            arabicMeaning: "ممتلكات",
            unit: "Unit 1: The Law"
          },
          {
            id: 385,
            word: "prove",
            partOfSpeech: "v",
            englishMeaning: "To show that something is true by providing facts, information, etc.",
            sentenceExample: "The lawyer couldn't prove his client's innocence.",
            arabicMeaning: "يثبت",
            unit: "Unit 1: The Law"
          },
          {
            id: 386,
            word: "tolerant",
            partOfSpeech: "adj",
            englishMeaning: "Showing willingness to allow the existence of opinions or behavior that one does not necessarily agree with",
            sentenceExample: "A tolerant society respects different cultures and beliefs.",
            arabicMeaning: "متسامح",
            unit: "Unit 1: The Law"
          },
          {
            id: 387,
            word: "violence",
            partOfSpeech: "n",
            englishMeaning: "The unlawful exercise of physical force or intimidation by the exhibition of such force",
            sentenceExample: "The protest remained peaceful without any violence.",
            arabicMeaning: "عنف",
            unit: "Unit 1: The Law"
          },
          {
            id: 388,
            word: "welfare",
            partOfSpeech: "n",
            englishMeaning: "The health, happiness, and fortunes of a person or group",
            sentenceExample: "The government provides welfare support to low-income families.",
            arabicMeaning: "رفاهية",
            unit: "Unit 1: The Law"
          },
          {
            id: 389,
            word: "break into",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To enter by force",
            sentenceExample: "Thieves tried to break into the store last night.",
            arabicMeaning: "يقتحم",
            unit: "Unit 1: The Law"
          },
          {
            id: 390,
            word: "fake",
            partOfSpeech: "adj",
            englishMeaning: "Not real and seeming to be something it's not, in order to deceive people",
            sentenceExample: "The police seized thousands of fake designer handbags.",
            arabicMeaning: "مزيف",
            unit: "Unit 1: The Law"
          },
          {
            id: 391,
            word: "invisible",
            partOfSpeech: "adj",
            englishMeaning: "Cannot be seen",
            sentenceExample: "Bacteria are invisible to the naked eye.",
            arabicMeaning: "غير مرئي",
            unit: "Unit 1: The Law"
          },
          {
            id: 392,
            word: "techno-criminal",
            partOfSpeech: "n",
            englishMeaning: "A person who has committed a crime using technology",
            sentenceExample: "The techno-criminal hacked into the bank's computer system.",
            arabicMeaning: "مجرم تكنولوجي",
            unit: "Unit 1: The Law"
          },
          {
            id: 393,
            word: "worthless",
            partOfSpeech: "adj",
            englishMeaning: "Having no value, importance or use",
            sentenceExample: "The old coins proved to be worthless.",
            arabicMeaning: "عديم القيمة",
            unit: "Unit 1: The Law"
          },
          {
            id: 394,
            word: "bench",
            partOfSpeech: "n",
            englishMeaning: "A long seat for several people, typically made of wood or stone; A seat in Parliament; The office of judge",
            sentenceExample: "The park has several wooden benches for visitors.",
            arabicMeaning: "مقعد",
            unit: "Unit 1: The Law"
          },
          {
            id: 395,
            word: "brief",
            partOfSpeech: "n",
            englishMeaning: "A digest or synopsis of a larger document; An outline of how a legal case will be argued",
            sentenceExample: "The lawyer prepared a brief for the upcoming trial.",
            arabicMeaning: "ملخص",
            unit: "Unit 1: The Law"
          },
          {
            id: 396,
            word: "brief",
            partOfSpeech: "adj",
            englishMeaning: "Of a short duration",
            sentenceExample: "We had a brief meeting before lunch.",
            arabicMeaning: "قصير",
            unit: "Unit 1: The Law"
          },
          {
            id: 397,
            word: "case",
            partOfSpeech: "n",
            englishMeaning: "A legal action; A flat, rectangular container for putting your things in",
            sentenceExample: "The case will be heard in court next month.",
            arabicMeaning: "قضية",
            unit: "Unit 1: The Law"
          },
          {
            id: 398,
            word: "defence",
            partOfSpeech: "n",
            englishMeaning: "The action of defending from attack; The counsel for the defendant in a lawsuit",
            sentenceExample: "The defence lawyer presented strong evidence for her client.",
            arabicMeaning: "الدفاع",
            unit: "Unit 1: The Law"
          },
          {
            id: 399,
            word: "handcuffs",
            partOfSpeech: "n",
            englishMeaning: "A pair of lockable linked metal rings for securing a prisoner's wrists",
            sentenceExample: "The police put handcuffs on the suspect.",
            arabicMeaning: "الأصفاد",
            unit: "Unit 1: The Law"
          },
          {
            id: 400,
            word: "note",
            partOfSpeech: "n",
            englishMeaning: "A brief record; An official letter; A banknote; A single tone of definite pitch",
            sentenceExample: "She wrote a note to remind herself about the appointment.",
            arabicMeaning: "ملاحظة",
            unit: "Unit 1: The Law"
          },
          {
            id: 401,
            word: "note",
            partOfSpeech: "v",
            englishMeaning: "To notice or pay particular attention to; To record something in writing",
            sentenceExample: "Please note that the deadline has been extended.",
            arabicMeaning: "يلاحظ",
            unit: "Unit 1: The Law"
          },
          {
            id: 402,
            word: "prosecute",
            partOfSpeech: "v",
            englishMeaning: "To institute legal proceedings against (a person or organization)",
            sentenceExample: "The district attorney decided to prosecute the case.",
            arabicMeaning: "يقاضي",
            unit: "Unit 1: The Law"
          },
          {
            id: 403,
            word: "row",
            partOfSpeech: "v",
            englishMeaning: "To propel (a boat) with oars",
            sentenceExample: "They rowed across the lake in the morning mist.",
            arabicMeaning: "يجذف",
            unit: "Unit 1: The Law"
          },
          {
            id: 404,
            word: "row",
            partOfSpeech: "n",
            englishMeaning: "Things arranged in a line; A line of seats in a theater",
            sentenceExample: "We sat in the front row at the concert.",
            arabicMeaning: "صف",
            unit: "Unit 1: The Law"
          },
          {
            id: 405,
            word: "spring",
            partOfSpeech: "v",
            englishMeaning: "To move or jump suddenly; To originate or arise from",
            sentenceExample: "The cat sprang onto the table.",
            arabicMeaning: "يقفز",
            unit: "Unit 1: The Law"
          },
          {
            id: 406,
            word: "spring",
            partOfSpeech: "n",
            englishMeaning: "A resilient metal coil; The season between winter and summer",
            sentenceExample: "The mattress has pocketed springs for comfort.",
            arabicMeaning: "زنزربرك / ربيع",
            unit: "Unit 1: The Law"
          },
          {
            id: 407,
            word: "claim",
            partOfSpeech: "v",
            englishMeaning: "To state or assert that something is the case, typically without providing evidence or proof",
            sentenceExample: "He claimed to have witnessed the accident.",
            arabicMeaning: "يدعي",
            unit: "Unit 1: The Law"
          },
          {
            id: 408,
            word: "clog up",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To prevent things from being dealt with as quickly as usual",
            sentenceExample: "Too much paperwork can clog up the system.",
            arabicMeaning: "يسد",
            unit: "Unit 1: The Law"
          },
          {
            id: 409,
            word: "contend",
            partOfSpeech: "v",
            englishMeaning: "To assert something as a position in an argument",
            sentenceExample: "The lawyer contended that the evidence was inadmissible.",
            arabicMeaning: "يجادل",
            unit: "Unit 1: The Law"
          },
          {
            id: 410,
            word: "grievance",
            partOfSpeech: "n",
            englishMeaning: "An official statement of complaint over something believed to be wrong or unfair",
            sentenceExample: "The workers filed a grievance about unsafe conditions.",
            arabicMeaning: "شكوى",
            unit: "Unit 1: The Law"
          },
          {
            id: 411,
            word: "in favour of",
            partOfSpeech: "phrase",
            englishMeaning: "To the advantage of",
            sentenceExample: "The ruling was in favour of the plaintiff.",
            arabicMeaning: "لصالح",
            unit: "Unit 1: The Law"
          },
          {
            id: 412,
            word: "intend",
            partOfSpeech: "v",
            englishMeaning: "To have (a course of action) as one's purpose or objective; plan",
            sentenceExample: "She intended to study law at university.",
            arabicMeaning: "ينوي",
            unit: "Unit 1: The Law"
          },
          {
            id: 413,
            word: "litigation",
            partOfSpeech: "n",
            englishMeaning: "The process of taking claims to a court of law",
            sentenceExample: "The two companies avoided litigation through mediation.",
            arabicMeaning: "التقاضي",
            unit: "Unit 1: The Law"
          },
          {
            id: 414,
            word: "petty",
            partOfSpeech: "adj",
            englishMeaning: "Of little importance; trivial",
            sentenceExample: "The argument started over a petty misunderstanding.",
            arabicMeaning: "تافه",
            unit: "Unit 1: The Law"
          },
          {
            id: 415,
            word: "regardless",
            partOfSpeech: "adv",
            englishMeaning: "Without being affected by something",
            sentenceExample: "He went ahead with the plan regardless of the risks.",
            arabicMeaning: "بغض النظر",
            unit: "Unit 1: The Law"
          },
          {
            id: 416,
            word: "residential area",
            partOfSpeech: "n",
            englishMeaning: "A part of a town that consists of private houses, with no offices or factories",
            sentenceExample: "This residential area is very quiet at night.",
            arabicMeaning: "منطقة سكنية",
            unit: "Unit 1: The Law"
          },
          {
            id: 417,
            word: "speed limit",
            partOfSpeech: "n",
            englishMeaning: "The fastest speed allowed by law on a particular piece of road",
            sentenceExample: "The speed limit on this highway is 120 km/h.",
            arabicMeaning: "حد السرعة",
            unit: "Unit 1: The Law"
          },
          {
            id: 418,
            word: "sue",
            partOfSpeech: "v",
            englishMeaning: "To make legal claim against someone, especially for money, because they have harmed you in some way",
            sentenceExample: "She decided to sue the company for damages.",
            arabicMeaning: "يرفع دعوى",
            unit: "Unit 1: The Law"
          },
          {
            id: 419,
            word: "supporter",
            partOfSpeech: "n",
            englishMeaning: "Someone who agrees with a particular person, group, or plan",
            sentenceExample: "The politician thanked his supporters at the rally.",
            arabicMeaning: "مؤيد",
            unit: "Unit 1: The Law"
          },
          {
            id: 420,
            word: "ultimately",
            partOfSpeech: "adv",
            englishMeaning: "Finally, after everything else has been done or considered",
            sentenceExample: "Ultimately, the decision rests with the jury.",
            arabicMeaning: "في النهاية",
            unit: "Unit 1: The Law"
          }
        ]
      },
      {
        id: "grade12-unit2",
        title: "Unit 2: Migration",
        description: "Vocabulary related to migration, immigration, and human movement",
        words: [
          {
            id: 421,
            word: "afford",
            partOfSpeech: "v",
            englishMeaning: "To provide something or allow something to happen",
            sentenceExample: "The new policy will afford workers more protection.",
            arabicMeaning: "يوفر",
            unit: "Unit 2: Migration"
          },
          {
            id: 422,
            word: "boom",
            partOfSpeech: "n",
            englishMeaning: "Increase in business",
            sentenceExample: "The economic boom created many new jobs.",
            arabicMeaning: "طفرة",
            unit: "Unit 2: Migration"
          },
          {
            id: 423,
            word: "decimate",
            partOfSpeech: "v",
            englishMeaning: "To destroy a large part of something",
            sentenceExample: "The disease decimated the local population.",
            arabicMeaning: "يبيد",
            unit: "Unit 2: Migration"
          },
          {
            id: 424,
            word: "deteriorate",
            partOfSpeech: "v",
            englishMeaning: "To become worse",
            sentenceExample: "Relations between the two countries began to deteriorate.",
            arabicMeaning: "يتدهور",
            unit: "Unit 2: Migration"
          },
          {
            id: 425,
            word: "emigrate",
            partOfSpeech: "v",
            englishMeaning: "To leave your own country in order to live in another country",
            sentenceExample: "Many people emigrate from Kuwait to study abroad.",
            arabicMeaning: "يهاجر",
            unit: "Unit 2: Migration"
          },
          {
            id: 426,
            word: "famine",
            partOfSpeech: "n",
            englishMeaning: "A situation in which a large number of people have little or no food for a long time and many people die",
            sentenceExample: "The famine forced thousands to leave their homeland.",
            arabicMeaning: "مجاعة",
            unit: "Unit 2: Migration"
          },
          {
            id: 427,
            word: "foreign",
            partOfSpeech: "adj",
            englishMeaning: "From or relating to a country that is not your own",
            sentenceExample: "She speaks three foreign languages fluently.",
            arabicMeaning: "أجنبي",
            unit: "Unit 2: Migration"
          },
          {
            id: 428,
            word: "hard-pressed",
            partOfSpeech: "adj",
            englishMeaning: "Having a lot of problems and not enough money or time",
            sentenceExample: "The refugees were hard-pressed to find shelter.",
            arabicMeaning: "في وضع صعب",
            unit: "Unit 2: Migration"
          },
          {
            id: 429,
            word: "high-tech",
            partOfSpeech: "adj",
            englishMeaning: "Using advanced technology",
            sentenceExample: "Kuwait is investing in high-tech industries.",
            arabicMeaning: "عالي التقنية",
            unit: "Unit 2: Migration"
          },
          {
            id: 430,
            word: "necessitate",
            partOfSpeech: "v",
            englishMeaning: "To make it necessary for you to do something",
            sentenceExample: "The new regulations necessitate additional training.",
            arabicMeaning: "يستلزم",
            unit: "Unit 2: Migration"
          },
          {
            id: 431,
            word: "seek",
            partOfSpeech: "v",
            englishMeaning: "To try to achieve or get something",
            sentenceExample: "Many seek better opportunities abroad.",
            arabicMeaning: "يسعى",
            unit: "Unit 2: Migration"
          },
          {
            id: 432,
            word: "unfortunately",
            partOfSpeech: "adv",
            englishMeaning: "Used when you are mentioning a fact that you wish were not true",
            sentenceExample: "Unfortunately, the application was rejected.",
            arabicMeaning: "لسوء الحظ",
            unit: "Unit 2: Migration"
          },
          {
            id: 433,
            word: "instead",
            partOfSpeech: "adv",
            englishMeaning: "As an alternative or substitute",
            sentenceExample: "He couldn't emigrate, so he stayed instead.",
            arabicMeaning: "بدلاً من",
            unit: "Unit 2: Migration"
          },
          {
            id: 434,
            word: "periodic",
            partOfSpeech: "adj",
            englishMeaning: "Happening a number of times, usually at regular times",
            sentenceExample: "The government conducts periodic reviews of immigration policy.",
            arabicMeaning: "دوري",
            unit: "Unit 2: Migration"
          },
          {
            id: 435,
            word: "plenty of",
            partOfSpeech: "pronoun",
            englishMeaning: "A large quantity that is enough or more than enough",
            sentenceExample: "There are plenty of opportunities in Kuwait.",
            arabicMeaning: "الكثير من",
            unit: "Unit 2: Migration"
          },
          {
            id: 436,
            word: "swallow",
            partOfSpeech: "n",
            englishMeaning: "A migratory swift-flying songbird with a forked tail and long pointed wings, feeding on insects in flight",
            sentenceExample: "The swallow migrates thousands of miles each year.",
            arabicMeaning: "السنونو",
            unit: "Unit 2: Migration"
          },
          {
            id: 437,
            word: "disgruntled",
            partOfSpeech: "adj",
            englishMeaning: "Annoyed or disappointed, especially because things have not happened in the way that you wanted",
            sentenceExample: "Disgruntled workers protested against the new policy.",
            arabicMeaning: "مستاء",
            unit: "Unit 2: Migration"
          },
          {
            id: 438,
            word: "displace",
            partOfSpeech: "v",
            englishMeaning: "To make a group of people or animals have to leave the place where they normally live",
            sentenceExample: "War displaced millions from their homes.",
            arabicMeaning: "يشرّد",
            unit: "Unit 2: Migration"
          },
          {
            id: 439,
            word: "mass",
            partOfSpeech: "adj",
            englishMeaning: "Involving or intended for a very large number of people",
            sentenceExample: "The mass migration surprised authorities.",
            arabicMeaning: "جماعي",
            unit: "Unit 2: Migration"
          },
          {
            id: 440,
            word: "meticulous",
            partOfSpeech: "adj",
            englishMeaning: "Very careful about small details, and always making sure that everything is done correctly",
            sentenceExample: "She kept meticulous records of all her documents.",
            arabicMeaning: "دقيق",
            unit: "Unit 2: Migration"
          },
          {
            id: 441,
            word: "migrant",
            partOfSpeech: "n",
            englishMeaning: "Someone who goes to live in another area or country, especially in order to find work",
            sentenceExample: "The migrant sent money home to his family every month.",
            arabicMeaning: "مهاجر",
            unit: "Unit 2: Migration"
          },
          {
            id: 442,
            word: "obliterate",
            partOfSpeech: "v",
            englishMeaning: "To destroy something completely so that nothing remains",
            sentenceExample: "The bomb would obliterate the entire building.",
            arabicMeaning: "يمحو",
            unit: "Unit 2: Migration"
          },
          {
            id: 443,
            word: "perturbed",
            partOfSpeech: "adj",
            englishMeaning: "Worried about something that has happened or will happen",
            sentenceExample: "She was perturbed by the news of border closures.",
            arabicMeaning: "قلق",
            unit: "Unit 2: Migration"
          },
          {
            id: 444,
            word: "resort",
            partOfSpeech: "n",
            englishMeaning: "A place where a lot of people go for holidays",
            sentenceExample: "The beach resort was popular with tourists.",
            arabicMeaning: "منتجع",
            unit: "Unit 2: Migration"
          },
          {
            id: 445,
            word: "rift",
            partOfSpeech: "n",
            englishMeaning: "A crack or narrow opening in a large mass of rock",
            sentenceExample: "A rift formed between the two communities.",
            arabicMeaning: "صدع",
            unit: "Unit 2: Migration"
          },
          {
            id: 446,
            word: "animated",
            partOfSpeech: "adj",
            englishMeaning: "Showing a lot of interest and energy",
            sentenceExample: "The discussion was animated and productive.",
            arabicMeaning: "متحمس",
            unit: "Unit 2: Migration"
          },
          {
            id: 447,
            word: "arduous",
            partOfSpeech: "adj",
            englishMeaning: "Involving a lot of strength and effort",
            sentenceExample: "The journey across the desert was arduous.",
            arabicMeaning: "شاق",
            unit: "Unit 2: Migration"
          },
          {
            id: 448,
            word: "engage in",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To be involved in something, especially something that continues for a long time",
            sentenceExample: "Many engage in voluntary work to help newcomers.",
            arabicMeaning: "يشارك في",
            unit: "Unit 2: Migration"
          },
          {
            id: 449,
            word: "major",
            partOfSpeech: "adj",
            englishMeaning: "Very large or important, when compared to other things or people of a similar kind",
            sentenceExample: "There was a major increase in immigration last year.",
            arabicMeaning: "رئيسي",
            unit: "Unit 2: Migration"
          },
          {
            id: 450,
            word: "minor",
            partOfSpeech: "adj",
            englishMeaning: "Small and not very important or serious, especially when compared with other things",
            sentenceExample: "Only minor changes were made to the policy.",
            arabicMeaning: "ثانوي",
            unit: "Unit 2: Migration"
          },
          {
            id: 451,
            word: "nervously",
            partOfSpeech: "adv",
            englishMeaning: "Anxiously",
            sentenceExample: "He waited nervously for his visa approval.",
            arabicMeaning: "بقلق",
            unit: "Unit 2: Migration"
          },
          {
            id: 452,
            word: "rent",
            partOfSpeech: "v",
            englishMeaning: "To regularly pay money to live in a house or room that belongs to someone else, or to use something that belongs to someone else",
            sentenceExample: "They rent an apartment in the city center.",
            arabicMeaning: "يستأجر",
            unit: "Unit 2: Migration"
          },
          {
            id: 453,
            word: "reside",
            partOfSpeech: "v",
            englishMeaning: "To live in a particular place",
            sentenceExample: "Foreign workers must reside in the country for five years to apply.",
            arabicMeaning: "يقيم",
            unit: "Unit 2: Migration"
          },
          {
            id: 454,
            word: "strenuous",
            partOfSpeech: "adj",
            englishMeaning: "Needing a lot of effort or strength",
            sentenceExample: "The strenuous application process discouraged some candidates.",
            arabicMeaning: "متعب",
            unit: "Unit 2: Migration"
          },
          {
            id: 455,
            word: "take a breather",
            partOfSpeech: "expression",
            englishMeaning: "Take a brief pause for rest",
            sentenceExample: "After hours of paperwork, they decided to take a breather.",
            arabicMeaning: "يستريح قليلاً",
            unit: "Unit 2: Migration"
          }
        ]
      },
      {
        id: "grade12-unit3",
        title: "Unit 3: Human Values",
        description: "Vocabulary related to human values, ethics, and social responsibility",
        words: [
          {
            id: 456,
            word: "abuse",
            partOfSpeech: "n",
            englishMeaning: "Cruel and violent treatment of a person",
            sentenceExample: "The organization works to protect children from abuse.",
            arabicMeaning: "إساءة معاملة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 457,
            word: "anthropologist",
            partOfSpeech: "n",
            englishMeaning: "A person who studies people, their societies, culture, etc.",
            sentenceExample: "The anthropologist studied migration patterns in the region.",
            arabicMeaning: "أنثروبولوجي",
            unit: "Unit 3: Human Values"
          },
          {
            id: 458,
            word: "apparent",
            partOfSpeech: "adj",
            englishMeaning: "Clearly visible or understood",
            sentenceExample: "It was apparent that the community needed more support.",
            arabicMeaning: "واضح",
            unit: "Unit 3: Human Values"
          },
          {
            id: 459,
            word: "attribute",
            partOfSpeech: "n",
            englishMeaning: "A quality or feature regarded as a characteristic or inherent part of someone or something",
            sentenceExample: "Kindness is an important attribute for social workers.",
            arabicMeaning: "صفة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 460,
            word: "charitable",
            partOfSpeech: "adj",
            englishMeaning: "Of or relating to the assistance of those in need",
            sentenceExample: "The charitable organization provides food for the poor.",
            arabicMeaning: "خيري",
            unit: "Unit 3: Human Values"
          },
          {
            id: 461,
            word: "compassion",
            partOfSpeech: "n",
            englishMeaning: "Sympathetic pity and concern for the sufferings or misfortunes of others",
            sentenceExample: "She showed great compassion toward the refugees.",
            arabicMeaning: "رحمة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 462,
            word: "discrimination",
            partOfSpeech: "n",
            englishMeaning: "The unjust or prejudicial treatment of different categories of people esp. on the grounds of race, age, or gender",
            sentenceExample: "Discrimination in the workplace is illegal.",
            arabicMeaning: "تمييز",
            unit: "Unit 3: Human Values"
          },
          {
            id: 463,
            word: "diversity",
            partOfSpeech: "n",
            englishMeaning: "The state of being diverse; variety; a range of different things",
            sentenceExample: "Kuwait's diversity enriches its culture.",
            arabicMeaning: "تنوع",
            unit: "Unit 3: Human Values"
          },
          {
            id: 464,
            word: "empathy",
            partOfSpeech: "n",
            englishMeaning: "The ability to understand and share the feelings of another",
            sentenceExample: "Empathy is essential for building strong communities.",
            arabicMeaning: "التعاطف",
            unit: "Unit 3: Human Values"
          },
          {
            id: 465,
            word: "ethnographer",
            partOfSpeech: "n",
            englishMeaning: "A person whose job is to describe the customs of individual peoples and cultures",
            sentenceExample: "The ethnographer documented the traditions of migrant communities.",
            arabicMeaning: "إتنوغرافي",
            unit: "Unit 3: Human Values"
          },
          {
            id: 466,
            word: "impulse",
            partOfSpeech: "n",
            englishMeaning: "A sudden strong and unreflective urge to act",
            sentenceExample: "He acted on impulse without thinking about the consequences.",
            arabicMeaning: "اندفاع",
            unit: "Unit 3: Human Values"
          },
          {
            id: 467,
            word: "incapable",
            partOfSpeech: "adj",
            englishMeaning: "Not able to do something",
            sentenceExample: "No one is incapable of learning if given proper support.",
            arabicMeaning: "غير قادر",
            unit: "Unit 3: Human Values"
          },
          {
            id: 468,
            word: "inevitable",
            partOfSpeech: "adj",
            englishMeaning: "Certain to happen; unavoidable",
            sentenceExample: "Cultural change is inevitable in a globalized world.",
            arabicMeaning: "حتمي",
            unit: "Unit 3: Human Values"
          },
          {
            id: 469,
            word: "legislation",
            partOfSpeech: "n",
            englishMeaning: "Laws, considered collectively",
            sentenceExample: "New legislation protects workers' rights.",
            arabicMeaning: "تشريع",
            unit: "Unit 3: Human Values"
          },
          {
            id: 470,
            word: "liberty",
            partOfSpeech: "n",
            englishMeaning: "The state of being free within society from oppressive restrictions imposed by authority on one's way of life, behavior or political views",
            sentenceExample: "Freedom of speech is a fundamental liberty.",
            arabicMeaning: "حرية",
            unit: "Unit 3: Human Values"
          },
          {
            id: 471,
            word: "minority",
            partOfSpeech: "n",
            englishMeaning: "The smaller number or part, especially a number that is less than half the whole number",
            sentenceExample: "The minority group advocated for equal rights.",
            arabicMeaning: "أقلية",
            unit: "Unit 3: Human Values"
          },
          {
            id: 472,
            word: "overview",
            partOfSpeech: "n",
            englishMeaning: "A general review or summary of a subject",
            sentenceExample: "The report provided an overview of human rights issues.",
            arabicMeaning: "نظرة عامة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 473,
            word: "tolerance",
            partOfSpeech: "n",
            englishMeaning: "The ability or willingness to accept something, in particular the existence of opinions or behavior that one does not necessarily agree with",
            sentenceExample: "Tolerance is key to peaceful coexistence.",
            arabicMeaning: "تسامح",
            unit: "Unit 3: Human Values"
          },
          {
            id: 474,
            word: "universal",
            partOfSpeech: "adj",
            englishMeaning: "Applicable to all cases",
            sentenceExample: "Human rights are considered universal.",
            arabicMeaning: "شامل",
            unit: "Unit 3: Human Values"
          },
          {
            id: 475,
            word: "value",
            partOfSpeech: "v",
            englishMeaning: "Consider (someone or something) to be important or beneficial; have a high opinion of",
            sentenceExample: "We should value every individual's contribution to society.",
            arabicMeaning: "يقدّر",
            unit: "Unit 3: Human Values"
          },
          {
            id: 476,
            word: "aftermath",
            partOfSpeech: "n",
            englishMeaning: "The consequences of an event, especially a disastrous one, or the period of time during which these consequences are felt",
            sentenceExample: "The aftermath of the crisis required international aid.",
            arabicMeaning: "عواقب",
            unit: "Unit 3: Human Values"
          },
          {
            id: 477,
            word: "deploy",
            partOfSpeech: "v",
            englishMeaning: "To put something to use",
            sentenceExample: "Resources were deployed to help displaced families.",
            arabicMeaning: "ينشر",
            unit: "Unit 3: Human Values"
          },
          {
            id: 478,
            word: "ethnicity",
            partOfSpeech: "n",
            englishMeaning: "Ethnic affiliation or distinctiveness",
            sentenceExample: "The survey asked about participants' ethnicity.",
            arabicMeaning: "عرقية",
            unit: "Unit 3: Human Values"
          },
          {
            id: 479,
            word: "hardship",
            partOfSpeech: "n",
            englishMeaning: "Difficulty or suffering caused by a lack of something, especially money",
            sentenceExample: "Economic hardship drives many to seek opportunities abroad.",
            arabicMeaning: "صعوبة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 480,
            word: "voluntary",
            partOfSpeech: "adj",
            englishMeaning: "Done or given freely with no promise of money or other recompense",
            sentenceExample: "Voluntary work provides valuable community support.",
            arabicMeaning: "تطوعي",
            unit: "Unit 3: Human Values"
          },
          {
            id: 481,
            word: "vulnerable",
            partOfSpeech: "adj",
            englishMeaning: "Susceptible to physical or emotional attack or harm",
            sentenceExample: "Migrant children are particularly vulnerable to exploitation.",
            arabicMeaning: "عرضة للأذى",
            unit: "Unit 3: Human Values"
          },
          {
            id: 482,
            word: "aggressive",
            partOfSpeech: "adj",
            englishMeaning: "Ready or likely to attack or confront; characterized by or resulting from hostile or violent behaviour",
            sentenceExample: "An aggressive approach is not always effective in diplomacy.",
            arabicMeaning: "عدواني",
            unit: "Unit 3: Human Values"
          },
          {
            id: 483,
            word: "compassionately",
            partOfSpeech: "adv",
            englishMeaning: "Sympathetically",
            sentenceExample: "The case was handled compassionately by the authorities.",
            arabicMeaning: "بشفقة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 484,
            word: "cry over spilt milk",
            partOfSpeech: "idiom",
            englishMeaning: "To regret something after it is too late",
            sentenceExample: "It's no use crying over spilt milk; we must find a solution.",
            arabicMeaning: "البكاء على اللبن المسكوب",
            unit: "Unit 3: Human Values"
          },
          {
            id: 485,
            word: "enfranchisement",
            partOfSpeech: "n",
            englishMeaning: "The act of giving a group of people the right to vote",
            sentenceExample: "The enfranchisement of women was a historic milestone.",
            arabicMeaning: "منح الحق في التصويت",
            unit: "Unit 3: Human Values"
          },
          {
            id: 486,
            word: "extravagant",
            partOfSpeech: "adj",
            englishMeaning: "Exceeding what is reasonable or appropriate; absurd",
            sentenceExample: "Spending money on unnecessary luxuries is extravagant.",
            arabicMeaning: "مترف",
            unit: "Unit 3: Human Values"
          },
          {
            id: 487,
            word: "frail",
            partOfSpeech: "adj",
            englishMeaning: "Weak and delicate",
            sentenceExample: "The elderly refugee was too frail to travel.",
            arabicMeaning: "ضعيف",
            unit: "Unit 3: Human Values"
          },
          {
            id: 488,
            word: "over a barrel",
            partOfSpeech: "idiom",
            englishMeaning: "In a helpless position",
            sentenceExample: "Without his passport, he was over a barrel.",
            arabicMeaning: "في موقف لا يحسد عليه",
            unit: "Unit 3: Human Values"
          },
          {
            id: 489,
            word: "over the hill",
            partOfSpeech: "idiom",
            englishMeaning: "Old and past one's prime",
            sentenceExample: "At 40, he's hardly over the hill.",
            arabicMeaning: "تجاوز العمر",
            unit: "Unit 3: Human Values"
          },
          {
            id: 490,
            word: "over the top",
            partOfSpeech: "idiom",
            englishMeaning: "To an excessive or exaggerated degree, in particular so as to go beyond reasonable or acceptable limits",
            sentenceExample: "His reaction was completely over the top.",
            arabicMeaning: "مبالغ فيه",
            unit: "Unit 3: Human Values"
          },
          {
            id: 491,
            word: "suffrage",
            partOfSpeech: "n",
            englishMeaning: "The right to vote in political elections",
            sentenceExample: "Universal suffrage is a fundamental democratic principle.",
            arabicMeaning: "حق التصويت",
            unit: "Unit 3: Human Values"
          },
          {
            id: 492,
            word: "tide someone over",
            partOfSpeech: "idiom",
            englishMeaning: "Help out, assist, aid",
            sentenceExample: "The temporary job was enough to tide him over until he found permanent work.",
            arabicMeaning: "يساعد مؤقتاً",
            unit: "Unit 3: Human Values"
          },
          {
            id: 493,
            word: "alleviate",
            partOfSpeech: "v",
            englishMeaning: "To make (suffering, deficiency, or a problem) less severe",
            sentenceExample: "Programs were created to alleviate poverty among migrants.",
            arabicMeaning: "يخفف",
            unit: "Unit 3: Human Values"
          },
          {
            id: 494,
            word: "appeal",
            partOfSpeech: "n",
            englishMeaning: "A serious or urgent request, typically one made to the public",
            sentenceExample: "The charity made an appeal for donations.",
            arabicMeaning: "مناشدة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 495,
            word: "avert",
            partOfSpeech: "v",
            englishMeaning: "To prevent or ward off (an undesirable occurrence)",
            sentenceExample: "Quick action averted a humanitarian crisis.",
            arabicMeaning: "يمنع",
            unit: "Unit 3: Human Values"
          },
          {
            id: 496,
            word: "campaign",
            partOfSpeech: "n",
            englishMeaning: "An organized course of action to achieve a particular goal",
            sentenceExample: "The campaign raised awareness about migrant rights.",
            arabicMeaning: "حملة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 497,
            word: "commitment",
            partOfSpeech: "n",
            englishMeaning: "An engagement or obligation that restricts freedom of action",
            sentenceExample: "Helping others requires genuine commitment.",
            arabicMeaning: "التزام",
            unit: "Unit 3: Human Values"
          },
          {
            id: 498,
            word: "dire",
            partOfSpeech: "adj",
            englishMeaning: "(Of a situation or event) extremely serious or urgent",
            sentenceExample: "The refugees were in dire need of assistance.",
            arabicMeaning: "مأساوي",
            unit: "Unit 3: Human Values"
          },
          {
            id: 499,
            word: "donate",
            partOfSpeech: "v",
            englishMeaning: "To give (money or goods) for a good cause, for example to a charity",
            sentenceExample: "Many donate to help those less fortunate.",
            arabicMeaning: "يتبرع",
            unit: "Unit 3: Human Values"
          },
          {
            id: 500,
            word: "extensive",
            partOfSpeech: "adj",
            englishMeaning: "Large in size, amount or degree",
            sentenceExample: "The program received extensive support from the community.",
            arabicMeaning: "واسع",
            unit: "Unit 3: Human Values"
          },
          {
            id: 501,
            word: "humanitarian",
            partOfSpeech: "adj",
            englishMeaning: "Concerned with or seeking to promote human welfare",
            sentenceExample: "The humanitarian crisis required immediate international response.",
            arabicMeaning: "إنساني",
            unit: "Unit 3: Human Values"
          },
          {
            id: 502,
            word: "in leaps and bounds",
            partOfSpeech: "expression",
            englishMeaning: "Rapidly, swiftly",
            sentenceExample: "Progress was made in leaps and bounds.",
            arabicMeaning: "بسرعة كبيرة",
            unit: "Unit 3: Human Values"
          },
          {
            id: 503,
            word: "underprivileged",
            partOfSpeech: "adj",
            englishMeaning: "Deprived of many of the rights and privileges enjoyed by most people in society, usually as a result of poverty",
            sentenceExample: "The program helps underprivileged families.",
            arabicMeaning: "محروم",
            unit: "Unit 3: Human Values"
          }
        ]
      },
      {
        id: "grade12-unit4",
        title: "Unit 4: The Earth at Risk",
        description: "Vocabulary related to environmental issues and climate change",
        words: [
          {
            id: 504,
            word: "climate",
            partOfSpeech: "n",
            englishMeaning: "Weather conditions in an area over a period of time",
            sentenceExample: "Kuwait's climate is hot and dry.",
            arabicMeaning: "مناخ",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 505,
            word: "desertification",
            partOfSpeech: "n",
            englishMeaning: "The process by which fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agriculture",
            sentenceExample: "Desertification threatens agricultural areas.",
            arabicMeaning: "التصحر",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 506,
            word: "erode",
            partOfSpeech: "v",
            englishMeaning: "To destroy slowly",
            sentenceExample: "Wind and rain erode the soil.",
            arabicMeaning: "يتآكل",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 507,
            word: "graze",
            partOfSpeech: "v",
            englishMeaning: "To put animals in a field so that they can eat the grass",
            sentenceExample: "Nomads graze their camels on limited vegetation.",
            arabicMeaning: "يرعى",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 508,
            word: "harsh",
            partOfSpeech: "adj",
            englishMeaning: "Unpleasantly rough",
            sentenceExample: "The desert has a harsh environment.",
            arabicMeaning: "قاسٍ",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 509,
            word: "increasingly",
            partOfSpeech: "adv",
            englishMeaning: "Increasing over time",
            sentenceExample: "The temperature is increasingly rising.",
            arabicMeaning: "بشكل متزايد",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 510,
            word: "kill off",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To destroy something utterly, or destroy the remaining members of a group of people or creatures",
            sentenceExample: "Pollution is killing off marine life.",
            arabicMeaning: "يبيد",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 511,
            word: "over-cultivate",
            partOfSpeech: "v",
            englishMeaning: "To cultivate too much, more than you should",
            sentenceExample: "Over-cultivating the land reduces its fertility.",
            arabicMeaning: "زراعة مفرطة",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 512,
            word: "permanently",
            partOfSpeech: "adv",
            englishMeaning: "Lastingly",
            sentenceExample: "The damage to the ecosystem may be permanently irreversible.",
            arabicMeaning: "بشكل دائم",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 513,
            word: "precipitate",
            partOfSpeech: "v",
            englishMeaning: "To cause (an event or situation, typically one that is bad or undesirable) to happen suddenly, unexpectedly, or prematurely",
            sentenceExample: "Deforestation can precipitate environmental disasters.",
            arabicMeaning: "يعجل",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 514,
            word: "productive",
            partOfSpeech: "adj",
            englishMeaning: "Producing or able to produce large amounts of goods, crops or other commodities",
            sentenceExample: "The land is no longer productive due to overuse.",
            arabicMeaning: "منتج",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 515,
            word: "proportion",
            partOfSpeech: "n",
            englishMeaning: "A part, share, or number considered in comparative relation to a whole",
            sentenceExample: "A large proportion of Kuwait's land is desert.",
            arabicMeaning: "نسبة",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 516,
            word: "soil",
            partOfSpeech: "n",
            englishMeaning: "The top layer of the earth in which plants grow",
            sentenceExample: "The soil quality has degraded over time.",
            arabicMeaning: "تربة",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 517,
            word: "treacherous",
            partOfSpeech: "adj",
            englishMeaning: "Hazardous because of presenting hidden or unpredictable dangers",
            sentenceExample: "The desert can be treacherous for unprepared travelers.",
            arabicMeaning: "غادر",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 518,
            word: "unproductive",
            partOfSpeech: "adj",
            englishMeaning: "Not producing or able to produce large amounts of goods, crops, or other commodities",
            sentenceExample: "The land became unproductive after years of misuse.",
            arabicMeaning: "غير منتج",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 519,
            word: "wash away",
            partOfSpeech: "phrasal verb",
            englishMeaning: "If water washes something away, it carries it away, usually with great force",
            sentenceExample: "Heavy rains can wash away the topsoil.",
            arabicMeaning: "يجرف",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 520,
            word: "wildfire",
            partOfSpeech: "n",
            englishMeaning: "A large, destructive forest- or bush-fire that spreads quickly",
            sentenceExample: "Wildfires are becoming more common due to climate change.",
            arabicMeaning: "حريق هائل",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 521,
            word: "at the expense of",
            partOfSpeech: "phrase",
            englishMeaning: "So as to cause harm to or neglect of",
            sentenceExample: "Development should not come at the expense of the environment.",
            arabicMeaning: "على حساب",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 522,
            word: "devastating",
            partOfSpeech: "adj",
            englishMeaning: "Very impressive or effective",
            sentenceExample: "The storm had a devastating impact on wildlife.",
            arabicMeaning: "مدمر",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 523,
            word: "logger",
            partOfSpeech: "n",
            englishMeaning: "A person who fells trees for timber; a lumberjack",
            sentenceExample: "The logger cut down the old tree.",
            arabicMeaning: "قاطع أشجار",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 524,
            word: "vital",
            partOfSpeech: "adj",
            englishMeaning: "Extremely important and necessary for something to succeed or exist",
            sentenceExample: "Water is vital for all living organisms.",
            arabicMeaning: "حيوي",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 525,
            word: "arid",
            partOfSpeech: "adj",
            englishMeaning: "(Of land or a climate) having little or no rain; too dry or barren to support vegetation",
            sentenceExample: "Kuwait has an arid climate with very little rainfall.",
            arabicMeaning: "قاحل",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 526,
            word: "atmosphere",
            partOfSpeech: "n",
            englishMeaning: "The mixture of gases that surrounds the Earth",
            sentenceExample: "Carbon emissions pollute the atmosphere.",
            arabicMeaning: "الغلاف الجوي",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 527,
            word: "equator",
            partOfSpeech: "n",
            englishMeaning: "An imaginary line drawn around the earth equally distant from both poles, dividing the earth into northern and southern hemispheres",
            sentenceExample: "Kuwait is located north of the equator.",
            arabicMeaning: "خط الاستواء",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 528,
            word: "flooding",
            partOfSpeech: "n",
            englishMeaning: "An overflowing of a large amount of water beyond its normal confines, esp. over what is normally dry land",
            sentenceExample: "Flooding can occur during rare heavy rains in Kuwait.",
            arabicMeaning: "فيضان",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 529,
            word: "forecasting",
            partOfSpeech: "n",
            englishMeaning: "A prediction or estimate of future events, esp. coming weather or a financial trend",
            sentenceExample: "Weather forecasting helps predict sandstorms.",
            arabicMeaning: "التنبؤ",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 530,
            word: "frigid",
            partOfSpeech: "adj",
            englishMeaning: "Very cold in temperature",
            sentenceExample: "Frigid temperatures are rare in Kuwait.",
            arabicMeaning: "متجمد",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 531,
            word: "humid",
            partOfSpeech: "adj",
            englishMeaning: "Marked by a relatively high level of water vapor in the atmosphere",
            sentenceExample: "Coastal areas can be quite humid in summer.",
            arabicMeaning: "رطب",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 532,
            word: "misbehave",
            partOfSpeech: "v",
            englishMeaning: "To fail to conduct oneself in a way that is acceptable to others; behave badly",
            sentenceExample: "The students were punished for misbehaving.",
            arabicMeaning: "يسوء التصرف",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 533,
            word: "planting",
            partOfSpeech: "v",
            englishMeaning: "To place (a seed, bulb, or plant) in the ground so that it can grow",
            sentenceExample: "Spring is the best time for planting new trees.",
            arabicMeaning: "زراعة",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 534,
            word: "prevailing",
            partOfSpeech: "adj",
            englishMeaning: "Widespread in a particular area at a particular time; current",
            sentenceExample: "The prevailing wind direction affects desertification.",
            arabicMeaning: "سائد",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 535,
            word: "reclaim",
            partOfSpeech: "v",
            englishMeaning: "To bring (waste land or land formerly underwater) under cultivation",
            sentenceExample: "Efforts to reclaim desert land are ongoing.",
            arabicMeaning: "يستصلح",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 536,
            word: "curtail",
            partOfSpeech: "v",
            englishMeaning: "To reduce in extent or quantity; to impose a restriction on",
            sentenceExample: "We must curtail water usage during shortages.",
            arabicMeaning: "يقلل",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 537,
            word: "hurdle",
            partOfSpeech: "n",
            englishMeaning: "An obstacle or difficulty",
            sentenceExample: "Lack of funding is a major hurdle to conservation.",
            arabicMeaning: "عقبة",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 538,
            word: "implement",
            partOfSpeech: "v",
            englishMeaning: "To put into effect",
            sentenceExample: "The government plans to implement new environmental laws.",
            arabicMeaning: "ينفذ",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 539,
            word: "intrinsic",
            partOfSpeech: "adj",
            englishMeaning: "Belonging naturally; essential",
            sentenceExample: "The intrinsic value of nature goes beyond economics.",
            arabicMeaning: "جوهري",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 540,
            word: "paucity",
            partOfSpeech: "n",
            englishMeaning: "The presence of something only in small or insufficient quantities or amounts; scarcity",
            sentenceExample: "There is a paucity of water resources in the region.",
            arabicMeaning: "ندرة",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 541,
            word: "preservation",
            partOfSpeech: "n",
            englishMeaning: "The action of maintaining something in its original or existing state",
            sentenceExample: "Preservation of natural habitats is crucial.",
            arabicMeaning: "حفظ",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 542,
            word: "prevail over",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To prove more powerful than opposing forces; be victorious",
            sentenceExample: "Conservation efforts must prevail over development pressures.",
            arabicMeaning: "يسود",
            unit: "Unit 4: The Earth at Risk"
          },
          {
            id: 543,
            word: "scarcity",
            partOfSpeech: "n",
            englishMeaning: "Insufficiency; shortage",
            sentenceExample: "Water scarcity is a growing concern.",
            arabicMeaning: "نقص",
            unit: "Unit 4: The Earth at Risk"
          }
        ]
      },
      {
        id: "grade12-unit5",
        title: "Unit 5: Precious Resources",
        description: "Vocabulary related to resource management and sustainability",
        words: [
          {
            id: 544,
            word: "collection points",
            partOfSpeech: "n",
            englishMeaning: "Particular spots, places, or positions in an area where rubbish or litter is gathered",
            sentenceExample: "Recycling collection points are located throughout the neighborhood.",
            arabicMeaning: "نقاط التجميع",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 545,
            word: "concur",
            partOfSpeech: "v",
            englishMeaning: "To be of the same opinion; to agree",
            sentenceExample: "Experts concur that recycling is essential.",
            arabicMeaning: "يوافق",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 546,
            word: "crisis",
            partOfSpeech: "n",
            englishMeaning: "A time of intense difficulty, trouble or danger",
            sentenceExample: "The water crisis requires immediate action.",
            arabicMeaning: "أزمة",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 547,
            word: "machinery",
            partOfSpeech: "n",
            englishMeaning: "Machines collectively",
            sentenceExample: "The recycling machinery needs regular maintenance.",
            arabicMeaning: "آلات",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 548,
            word: "offence",
            partOfSpeech: "n",
            englishMeaning: "A breach of a law or rule; an illegal act",
            sentenceExample: "Littering is an offence punishable by fine.",
            arabicMeaning: "جنحة",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 549,
            word: "pass a law",
            partOfSpeech: "expression",
            englishMeaning: "To approve or put into effect (a proposal or law) by voting on it",
            sentenceExample: "The parliament will pass a law on waste management.",
            arabicMeaning: "يمرر قانوناً",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 550,
            word: "prohibitively",
            partOfSpeech: "adv",
            englishMeaning: "(Of a price or charge) excessively high",
            sentenceExample: "The cost of new equipment was prohibitively expensive.",
            arabicMeaning: "بشكل ممنوع",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 551,
            word: "reprocess",
            partOfSpeech: "v",
            englishMeaning: "To process (something, esp. spent nuclear fuel) again or differently, typically in order to reuse it",
            sentenceExample: "Plastic can be reprocessed into new products.",
            arabicMeaning: "يعالج مرة أخرى",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 552,
            word: "commercially",
            partOfSpeech: "adv",
            englishMeaning: "In commercial terms or from a profit-making point of view",
            sentenceExample: "Recycling is now commercially viable.",
            arabicMeaning: "تجارياً",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 553,
            word: "partnership",
            partOfSpeech: "n",
            englishMeaning: "A relationship between two people, organizations, or countries",
            sentenceExample: "The partnership between government and private sector improved recycling.",
            arabicMeaning: "شراكة",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 554,
            word: "wood pulp",
            partOfSpeech: "n",
            englishMeaning: "Wood crushed into a soft mass, used for making paper",
            sentenceExample: "Wood pulp is the raw material for paper production.",
            arabicMeaning: "لب الخشب",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 555,
            word: "administration",
            partOfSpeech: "n",
            englishMeaning: "The process or activity of running a business, organization",
            sentenceExample: "The administration of the recycling program is complex.",
            arabicMeaning: "إدارة",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 556,
            word: "annoyance",
            partOfSpeech: "n",
            englishMeaning: "The feeling or state of being annoyed; irritation",
            sentenceExample: "The smell from the landfill is a constant annoyance.",
            arabicMeaning: "إزعاج",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 557,
            word: "bureaucracy",
            partOfSpeech: "n",
            englishMeaning: "A system of government in which most of the important decisions are made by state officials rather than by elected representatives",
            sentenceExample: "Bureaucracy can slow down environmental projects.",
            arabicMeaning: "بيروقراطية",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 558,
            word: "come up against",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To meet; to face",
            sentenceExample: "The project came up against unexpected obstacles.",
            arabicMeaning: "يواجه",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 559,
            word: "criticism",
            partOfSpeech: "n",
            englishMeaning: "The expression of disapproval of someone or something based on perceived faults or mistakes",
            sentenceExample: "The policy faced criticism from environmental groups.",
            arabicMeaning: "انتقاد",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 560,
            word: "cut down on",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To reduce",
            sentenceExample: "We must cut down on plastic waste.",
            arabicMeaning: "يقلل من",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 561,
            word: "get rid of",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To dispose of, throw away",
            sentenceExample: "How can we get rid of electronic waste safely?",
            arabicMeaning: "يتخلص من",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 562,
            word: "go along with",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To give one's consent or agreement to a person or their views",
            sentenceExample: "The community goes along with the new recycling rules.",
            arabicMeaning: "يوافق على",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 563,
            word: "incinerator",
            partOfSpeech: "n",
            englishMeaning: "An apparatus for burning waste material, esp. industrial waste, at high temperatures until it is reduced to ash",
            sentenceExample: "The incinerator reduces waste volume significantly.",
            arabicMeaning: "محرقة النفايات",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 564,
            word: "irritation",
            partOfSpeech: "n",
            englishMeaning: "The state of feeling annoyed, impatient, or angry",
            sentenceExample: "The smoke from burning waste causes irritation.",
            arabicMeaning: "تهيج",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 565,
            word: "keep up with",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To know the latest information about",
            sentenceExample: "It's hard to keep up with all the new recycling regulations.",
            arabicMeaning: "يواكب",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 566,
            word: "packaging",
            partOfSpeech: "n",
            englishMeaning: "Materials used to wrap or protect goods",
            sentenceExample: "Excessive packaging creates unnecessary waste.",
            arabicMeaning: "تغليف",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 567,
            word: "paperwork",
            partOfSpeech: "n",
            englishMeaning: "Routine work involving written documents such as forms, records, or letters",
            sentenceExample: "The paperwork for permits took weeks.",
            arabicMeaning: "أوراق",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 568,
            word: "put up with",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To accept, stand, tolerate (something unpleasant)",
            sentenceExample: "Residents shouldn't have to put up with pollution.",
            arabicMeaning: "يتحمل",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 569,
            word: "red tape",
            partOfSpeech: "idiom",
            englishMeaning: "Paperwork and administration",
            sentenceExample: "Red tape delayed the project for months.",
            arabicMeaning: "بيروقراطية",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 570,
            word: "run out of",
            partOfSpeech: "phrasal verb",
            englishMeaning: "(Of a supply of something) to be used up",
            sentenceExample: "We must act before resources run out.",
            arabicMeaning: "ينفد",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 571,
            word: "component",
            partOfSpeech: "n",
            englishMeaning: "A part or element of a larger whole",
            sentenceExample: "Each component of the system must work properly.",
            arabicMeaning: "مكون",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 572,
            word: "compost",
            partOfSpeech: "v",
            englishMeaning: "To make (vegetable matter or manure) into decayed organic material used as a plant fertilizer",
            sentenceExample: "Kitchen waste can be composted naturally.",
            arabicMeaning: "يسمد",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 573,
            word: "constant",
            partOfSpeech: "adj",
            englishMeaning: "Occurring continuously over a period of time",
            sentenceExample: "There is constant pressure to reduce waste.",
            arabicMeaning: "مستمر",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 574,
            word: "constituent",
            partOfSpeech: "n",
            englishMeaning: "Being a part of a whole",
            sentenceExample: "Plastic is a major constituent of marine pollution.",
            arabicMeaning: "مكون",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 575,
            word: "duration",
            partOfSpeech: "n",
            englishMeaning: "The time during which something continues",
            sentenceExample: "The duration of the project is two years.",
            arabicMeaning: "مدة",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 576,
            word: "heartening",
            partOfSpeech: "adj",
            englishMeaning: "Inspiring, elevating",
            sentenceExample: "The community's response was truly heartening.",
            arabicMeaning: "مشجع",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 577,
            word: "household waste",
            partOfSpeech: "n",
            englishMeaning: "Material that is not wanted at home",
            sentenceExample: "Household waste should be sorted before disposal.",
            arabicMeaning: "نفايات منزلية",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 578,
            word: "incineration",
            partOfSpeech: "n",
            englishMeaning: "The process of destroying (something, esp. waste material) by burning",
            sentenceExample: "Incineration reduces waste volume but releases emissions.",
            arabicMeaning: "الحرق",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 579,
            word: "material",
            partOfSpeech: "n",
            englishMeaning: "The matter from which a thing is or can be made",
            sentenceExample: "Recycled materials save natural resources.",
            arabicMeaning: "مادة",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 580,
            word: "quantity",
            partOfSpeech: "n",
            englishMeaning: "Amount or number of something",
            sentenceExample: "The quantity of waste produced is enormous.",
            arabicMeaning: "كمية",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 581,
            word: "trend",
            partOfSpeech: "n",
            englishMeaning: "A general direction in which something is developing or changing",
            sentenceExample: "There is a growing trend toward recycling.",
            arabicMeaning: "اتجاه",
            unit: "Unit 5: Precious Resources"
          },
          {
            id: 582,
            word: "upsurge",
            partOfSpeech: "n",
            englishMeaning: "An upward surge in the strength or quantity of something; an increase",
            sentenceExample: "There has been an upsurge in environmental awareness.",
            arabicMeaning: "ارتفاع",
            unit: "Unit 5: Precious Resources"
          }
        ]
      },
      {
        id: "grade12-unit6",
        title: "Unit 6: Under Threat",
        description: "Vocabulary related to wildlife conservation and environmental protection",
        words: [
          {
            id: 583,
            word: "permanent",
            partOfSpeech: "adj",
            englishMeaning: "Lasting or intended to last or remain unchanged",
            sentenceExample: "The damage to the environment may be permanent.",
            arabicMeaning: "دائم",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 584,
            word: "pose",
            partOfSpeech: "v",
            englishMeaning: "To present or constitute",
            sentenceExample: "Climate change poses a serious threat to wildlife.",
            arabicMeaning: "يشكل",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 585,
            word: "refuge",
            partOfSpeech: "n",
            englishMeaning: "Shelter or protection from someone or something",
            sentenceExample: "The nature reserve provides refuge for endangered birds.",
            arabicMeaning: "ملجأ",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 586,
            word: "reservation",
            partOfSpeech: "n",
            englishMeaning: "The action of reserving something",
            sentenceExample: "The reservation of land for conservation is important.",
            arabicMeaning: "حجز",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 587,
            word: "reticent",
            partOfSpeech: "adj",
            englishMeaning: "Easily frightened; timid",
            sentenceExample: "The reticent animal hid from humans.",
            arabicMeaning: "خجول",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 588,
            word: "solitary",
            partOfSpeech: "adj",
            englishMeaning: "Done or existing alone",
            sentenceExample: "The solitary wolf roamed the desert alone.",
            arabicMeaning: "منعزل",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 589,
            word: "stem",
            partOfSpeech: "n",
            englishMeaning: "The long thin part of a plant, from which leaves, flowers or fruit grow",
            sentenceExample: "The stem of the plant was strong and green.",
            arabicMeaning: "ساق",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 590,
            word: "endangered",
            partOfSpeech: "adj",
            englishMeaning: "Threatened",
            sentenceExample: "Many species are endangered due to habitat loss.",
            arabicMeaning: "مهدد",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 591,
            word: "timid",
            partOfSpeech: "adj",
            englishMeaning: "Showing a lack of courage or confidence; easily frightened",
            sentenceExample: "The timid deer ran away at the slightest noise.",
            arabicMeaning: "خجول",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 592,
            word: "carnivorous",
            partOfSpeech: "adj",
            englishMeaning: "An animal that eats flesh",
            sentenceExample: "Lions are carnivorous predators.",
            arabicMeaning: "آكل للحوم",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 593,
            word: "enemy",
            partOfSpeech: "n",
            englishMeaning: "A thing that harms or weakens something else",
            sentenceExample: "Pollution is the environment's greatest enemy.",
            arabicMeaning: "عدو",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 594,
            word: "inject",
            partOfSpeech: "v",
            englishMeaning: "To put liquid into someone's body by using a special needle",
            sentenceExample: "The veterinarian will inject the animal with medicine.",
            arabicMeaning: "يحقن",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 595,
            word: "sting",
            partOfSpeech: "n",
            englishMeaning: "The sharp needle-shaped part of an insect's or animal's body, with which it stings",
            sentenceExample: "The bee's sting can be painful.",
            arabicMeaning: "لسعة",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 596,
            word: "aware",
            partOfSpeech: "adj",
            englishMeaning: "Having knowledge or perception of a situation or fact",
            sentenceExample: "People are becoming more aware of environmental issues.",
            arabicMeaning: "مدرك",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 597,
            word: "bounty",
            partOfSpeech: "n",
            englishMeaning: "An abundance or plenty",
            sentenceExample: "The sea provides a bounty of fish.",
            arabicMeaning: "وفرة",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 598,
            word: "cultivate",
            partOfSpeech: "v",
            englishMeaning: "To grow, raise, plant, sow",
            sentenceExample: "Farmers cultivate crops in the fertile areas.",
            arabicMeaning: "يزرع",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 599,
            word: "encroach",
            partOfSpeech: "v",
            englishMeaning: "To intrude on (a person's territory or a thing considered to be a right)",
            sentenceExample: "Urban development continues to encroach on wildlife habitats.",
            arabicMeaning: "يتعدى",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 600,
            word: "grow",
            partOfSpeech: "v",
            englishMeaning: "To become larger or greater over a period of time",
            sentenceExample: "The population continues to grow rapidly.",
            arabicMeaning: "ينمو",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 601,
            word: "illegitimate",
            partOfSpeech: "adj",
            englishMeaning: "Not authorised by the law; not in accordance with accepted standards or rules",
            sentenceExample: "Illegitimate logging harms the environment.",
            arabicMeaning: "غير شرعي",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 602,
            word: "nourishment",
            partOfSpeech: "n",
            englishMeaning: "Food, or the valuable substances in food that a person, animal, or plant requires to live, grow, or remain fit and healthy",
            sentenceExample: "The desert provides little nourishment for wildlife.",
            arabicMeaning: "تغذية",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 603,
            word: "recompense",
            partOfSpeech: "n",
            englishMeaning: "Compensation or reward given for effort made",
            sentenceExample: "There is little recompense for conservation efforts.",
            arabicMeaning: "تعويض",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 604,
            word: "reward",
            partOfSpeech: "n",
            englishMeaning: "A thing given in recognition of service, effort or achievement",
            sentenceExample: "Protecting nature has its own reward.",
            arabicMeaning: "مكافأة",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 605,
            word: "trespass on",
            partOfSpeech: "phrasal verb",
            englishMeaning: "To make unfair claims on or take advantage of something",
            sentenceExample: "Don't trespass on private conservation land.",
            arabicMeaning: "يتعدى على",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 606,
            word: "unsanctioned",
            partOfSpeech: "adj",
            englishMeaning: "Illegal, unofficial, unauthorized",
            sentenceExample: "Unsanctioned hunting is prohibited.",
            arabicMeaning: "غير مصرح به",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 607,
            word: "wealth",
            partOfSpeech: "n",
            englishMeaning: "An abundance of valuable possessions or money",
            sentenceExample: "Kuwait's wealth comes from oil reserves.",
            arabicMeaning: "ثروة",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 608,
            word: "burgeoning",
            partOfSpeech: "adj",
            englishMeaning: "Growing or expanding rapidly",
            sentenceExample: "The burgeoning population puts pressure on resources.",
            arabicMeaning: "نامٍ",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 609,
            word: "consensus",
            partOfSpeech: "n",
            englishMeaning: "General agreement",
            sentenceExample: "There is consensus on the need for conservation.",
            arabicMeaning: "توافق",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 610,
            word: "dearth",
            partOfSpeech: "n",
            englishMeaning: "A scarcity or lack of something",
            sentenceExample: "There is a dearth of water in the desert.",
            arabicMeaning: "نقص",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 611,
            word: "graduate",
            partOfSpeech: "v",
            englishMeaning: "To successfully complete an academic degree, course of training, or high school",
            sentenceExample: "She will graduate from university next year.",
            arabicMeaning: "يتخرج",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 612,
            word: "housing",
            partOfSpeech: "n",
            englishMeaning: "Houses and apartments considered collectively",
            sentenceExample: "New housing developments affect local wildlife.",
            arabicMeaning: "سكن",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 613,
            word: "knock-on",
            partOfSpeech: "adj",
            englishMeaning: "Of a process in which everything that happens causes something else to happen",
            sentenceExample: "Environmental damage has knock-on effects.",
            arabicMeaning: "متسلسل",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 614,
            word: "utilise",
            partOfSpeech: "v",
            englishMeaning: "To make practical and effective use of",
            sentenceExample: "We must utilise resources more efficiently.",
            arabicMeaning: "يستخدم",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 615,
            word: "vociferously",
            partOfSpeech: "adv",
            englishMeaning: "Enthusiastically, loudly",
            sentenceExample: "The community vociferously supported the conservation plan.",
            arabicMeaning: "بصوت عالٍ",
            unit: "Unit 6: Under Threat"
          },
          {
            id: 616,
            word: "wetland",
            partOfSpeech: "n",
            englishMeaning: "Land consisting of marshes or swamps; saturated land",
            sentenceExample: "Wetlands are important ecosystems for biodiversity.",
            arabicMeaning: "أرض رطبة",
            unit: "Unit 6: Under Threat"
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getVocabularyByGrade = (grade: number): VocabularyWord[] => {
  const gradeData = vocabularyData.find(data => data.grade === grade);
  if (!gradeData) return [];
  
  return gradeData.units.flatMap(unit => unit.words);
};

export const getVocabularyByUnit = (grade: number, unitId: string): VocabularyWord[] => {
  const gradeData = vocabularyData.find(data => data.grade === grade);
  if (!gradeData) return [];
  
  const unit = gradeData.units.find(u => u.id === unitId);
  return unit ? unit.words : [];
};

export const getUnitsByGrade = (grade: number): VocabularyUnit[] => {
  const gradeData = vocabularyData.find(data => data.grade === grade);
  return gradeData ? gradeData.units : [];
};

export const getAllGrades = (): number[] => {
  return vocabularyData.map(data => data.grade);
};

export const getTotalWordsByGrade = (grade: number): number => {
  return getVocabularyByGrade(grade).length;
};

export const searchVocabulary = (grade: number, searchTerm: string): VocabularyWord[] => {
  const words = getVocabularyByGrade(grade);
  const term = searchTerm.toLowerCase();
  
  return words.filter(word => 
    word.word.toLowerCase().includes(term) ||
    word.englishMeaning.toLowerCase().includes(term) ||
    word.arabicMeaning.includes(searchTerm)
  );
};

export const getVocabularyByPartOfSpeech = (grade: number, pos: string): VocabularyWord[] => {
  const words = getVocabularyByGrade(grade);
  return words.filter(word => 
    word.partOfSpeech.toLowerCase() === pos.toLowerCase()
  );
};

export const getWordById = (id: number): VocabularyWord | undefined => {
  for (const gradeData of vocabularyData) {
    for (const unit of gradeData.units) {
      const word = unit.words.find(w => w.id === id);
      if (word) return word;
    }
  }
  return undefined;
};