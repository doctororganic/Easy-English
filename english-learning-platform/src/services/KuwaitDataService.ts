// Kuwait English Learning Platform - Data Service
// Complete data service for Kuwait curriculum with MySQL integration

export interface KuwaitClass {
  id: number
  class_number: number
  class_name_en: string
  class_name_ar: string
  description: string
  academic_year: string
  total_units: number
  total_vocabulary: number
  is_active: boolean
}

export interface KuwaitUnit {
  id: number
  class_id: number
  unit_number: number
  unit_name_en: string
  unit_name_ar: string
  description_en: string
  description_ar: string
  theme: string
  difficulty_level: number
  order_index: number
  estimated_hours: number
  vocabulary_count: number
  completion_percentage: number
  is_published: boolean
}

export interface VocabularyItem {
  id: number
  word: string
  word_ar: string
  pronunciation: string
  definition_en: string
  definition_ar: string
  example_sentence_en: string
  example_sentence_ar: string
  class_number: number
  unit_number: number
  difficulty_level: number
  category: string
  part_of_speech: string
  is_active: boolean
}

export interface ClassProgress {
  total_units: number
  completed_units: number
  total_vocabulary: number
  mastered_vocabulary: number
  completion_percentage: number
}

class KuwaitDataService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'
  private isMySQLEnabled = process.env.REACT_APP_USE_MYSQL === 'true'

  // Kuwait Classes Data
  private getKuwaitClasses(): KuwaitClass[] {
    return [
      {
        id: 1,
        class_number: 10,
        class_name_en: 'Class 10',
        class_name_ar: 'الصف العاشر',
        description: 'Foundation level for Kuwait secondary education - Basic vocabulary and grammar concepts',
        academic_year: '2024-2025',
        total_units: 12,
        total_vocabulary: 300,
        is_active: true
      },
      {
        id: 2,
        class_number: 11,
        class_name_en: 'Class 11',
        class_name_ar: 'الصف الحادي عشر',
        description: 'Intermediate level with advanced topics and complex sentence structures',
        academic_year: '2024-2025',
        total_units: 12,
        total_vocabulary: 350,
        is_active: true
      },
      {
        id: 3,
        class_number: 12,
        class_name_en: 'Class 12',
        class_name_ar: 'الصف الثاني عشر',
        description: 'Advanced level preparing for university entrance and professional English',
        academic_year: '2024-2025',
        total_units: 12,
        total_vocabulary: 400,
        is_active: true
      }
    ]
  }

  // Kuwait Units Data (Complete curriculum)
  private getKuwaitUnits(): KuwaitUnit[] {
    return [
      // Grade 10 Units
      {
        id: 1, class_id: 1, unit_number: 1,
        unit_name_en: 'Personal Introduction', unit_name_ar: 'التعريف بالنفس',
        description_en: 'Learn to introduce yourself and talk about personal information',
        description_ar: 'تعلم كيفية التعريف بالنفس والتحدث عن المعلومات الشخصية',
        theme: 'personal', difficulty_level: 1, order_index: 1, estimated_hours: 2,
        vocabulary_count: 25, completion_percentage: 80, is_published: true
      },
      {
        id: 2, class_id: 1, unit_number: 2,
        unit_name_en: 'Daily Routines', unit_name_ar: 'الروتين اليومي',
        description_en: 'Describe your daily activities and habits',
        description_ar: 'وصف الأنشطة اليومية والعادات',
        theme: 'daily_life', difficulty_level: 1, order_index: 2, estimated_hours: 2,
        vocabulary_count: 30, completion_percentage: 60, is_published: true
      },
      {
        id: 3, class_id: 1, unit_number: 3,
        unit_name_en: 'Family and Friends', unit_name_ar: 'الأسرة والأصدقاء',
        description_en: 'Talk about family members and relationships',
        description_ar: 'التحدث عن أفراد الأسرة والعلاقات',
        theme: 'relationships', difficulty_level: 1, order_index: 3, estimated_hours: 3,
        vocabulary_count: 28, completion_percentage: 45, is_published: true
      },
      {
        id: 4, class_id: 1, unit_number: 4,
        unit_name_en: 'Food and Cooking', unit_name_ar: 'الطعام والطبخ',
        description_en: 'Discuss different foods and cooking methods',
        description_ar: 'مناقشة الأطعمة المختلفة وطرق الطبخ',
        theme: 'food', difficulty_level: 2, order_index: 4, estimated_hours: 3,
        vocabulary_count: 35, completion_percentage: 30, is_published: true
      },
      {
        id: 5, class_id: 1, unit_number: 5,
        unit_name_en: 'Travel and Tourism', unit_name_ar: 'السفر والسياحة',
        description_en: 'Plan trips and describe travel experiences',
        description_ar: 'تخطيط الرحلات ووصف تجارب السفر',
        theme: 'travel', difficulty_level: 2, order_index: 5, estimated_hours: 4,
        vocabulary_count: 40, completion_percentage: 15, is_published: true
      },
      {
        id: 6, class_id: 1, unit_number: 6,
        unit_name_en: 'Technology and Innovation', unit_name_ar: 'التكنولوجيا والابتكار',
        description_en: 'Explore modern technology and digital life',
        description_ar: 'استكشاف التكنولوجيا الحديثة والحياة الرقمية',
        theme: 'technology', difficulty_level: 3, order_index: 6, estimated_hours: 4,
        vocabulary_count: 45, completion_percentage: 10, is_published: true
      },
      {
        id: 7, class_id: 1, unit_number: 7,
        unit_name_en: 'Health and Wellness', unit_name_ar: 'الصحة والعافية',
        description_en: 'Learn about health, fitness and well-being',
        description_ar: 'تعلم عن الصحة واللياقة البدنية والعافية',
        theme: 'health', difficulty_level: 3, order_index: 7, estimated_hours: 3,
        vocabulary_count: 38, completion_percentage: 5, is_published: true
      },
      {
        id: 8, class_id: 1, unit_number: 8,
        unit_name_en: 'Environment and Nature', unit_name_ar: 'البيئة والطبيعة',
        description_en: 'Discuss environmental issues and natural world',
        description_ar: 'مناقشة القضايا البيئية والعالم الطبيعي',
        theme: 'environment', difficulty_level: 3, order_index: 8, estimated_hours: 4,
        vocabulary_count: 42, completion_percentage: 0, is_published: true
      },
      {
        id: 9, class_id: 1, unit_number: 9,
        unit_name_en: 'Culture and Traditions', unit_name_ar: 'الثقافة والتقاليد',
        description_en: 'Explore Kuwaiti culture and international traditions',
        description_ar: 'استكشاف الثقافة الكويتية والتقاليد الدولية',
        theme: 'culture', difficulty_level: 2, order_index: 9, estimated_hours: 3,
        vocabulary_count: 32, completion_percentage: 0, is_published: true
      },
      {
        id: 10, class_id: 1, unit_number: 10,
        unit_name_en: 'Sports and Recreation', unit_name_ar: 'الرياضة والترفيه',
        description_en: 'Talk about sports, games and leisure activities',
        description_ar: 'التحدث عن الرياضة والألعاب والأنشطة الترفيهية',
        theme: 'sports', difficulty_level: 2, order_index: 10, estimated_hours: 3,
        vocabulary_count: 35, completion_percentage: 0, is_published: true
      },
      {
        id: 11, class_id: 1, unit_number: 11,
        unit_name_en: 'Education and Learning', unit_name_ar: 'التعليم والتعلم',
        description_en: 'Discuss school subjects and study methods',
        description_ar: 'مناقشة المواد الدراسية وطرق الدراسة',
        theme: 'education', difficulty_level: 3, order_index: 11, estimated_hours: 4,
        vocabulary_count: 30, completion_percentage: 0, is_published: true
      },
      {
        id: 12, class_id: 1, unit_number: 12,
        unit_name_en: 'Future Plans and Dreams', unit_name_ar: 'الخطط المستقبلية والأحلام',
        description_en: 'Express future intentions and career aspirations',
        description_ar: 'تعبير عن النوايا المستقبلية والطموحات المهنية',
        theme: 'future', difficulty_level: 3, order_index: 12, estimated_hours: 4,
        vocabulary_count: 28, completion_percentage: 0, is_published: true
      },

      // Grade 11 Units
      {
        id: 13, class_id: 2, unit_number: 1,
        unit_name_en: 'Business and Commerce', unit_name_ar: 'الأعمال والتجارة',
        description_en: 'Learn business vocabulary and communication',
        description_ar: 'تعلم مفردات الأعمال والتواصل',
        theme: 'business', difficulty_level: 3, order_index: 1, estimated_hours: 4,
        vocabulary_count: 40, completion_percentage: 75, is_published: true
      },
      {
        id: 14, class_id: 2, unit_number: 2,
        unit_name_en: 'Science and Technology', unit_name_ar: 'العلوم والتكنولوجيا',
        description_en: 'Explore scientific concepts and innovations',
        description_ar: 'استكشاف المفاهيم العلمية والابتكارات',
        theme: 'science', difficulty_level: 4, order_index: 2, estimated_hours: 4,
        vocabulary_count: 45, completion_percentage: 55, is_published: true
      },
      {
        id: 15, class_id: 2, unit_number: 3,
        unit_name_en: 'Literature and Arts', unit_name_ar: 'الأدب والفنون',
        description_en: 'Study literary works and artistic expressions',
        description_ar: 'دراسة الأعمال الأدبية والتعبيرات الفنية',
        theme: 'literature', difficulty_level: 4, order_index: 3, estimated_hours: 5,
        vocabulary_count: 35, completion_percentage: 40, is_published: true
      },
      {
        id: 16, class_id: 2, unit_number: 4,
        unit_name_en: 'Social Issues', unit_name_ar: 'القضايا الاجتماعية',
        description_en: 'Discuss contemporary social problems',
        description_ar: 'مناقشة المشاكل الاجتماعية المعاصرة',
        theme: 'social', difficulty_level: 4, order_index: 4, estimated_hours: 4,
        vocabulary_count: 38, completion_percentage: 30, is_published: true
      },
      {
        id: 17, class_id: 2, unit_number: 5,
        unit_name_en: 'Environment and Sustainability', unit_name_ar: 'البيئة والاستدامة',
        description_en: 'Focus on environmental protection and green living',
        description_ar: 'التركيز على حماية البيئة والحياة الخضراء',
        theme: 'sustainability', difficulty_level: 4, order_index: 5, estimated_hours: 4,
        vocabulary_count: 42, completion_percentage: 20, is_published: true
      },
      {
        id: 18, class_id: 2, unit_number: 6,
        unit_name_en: 'Media and Communication', unit_name_ar: 'الإعلام والتواصل',
        description_en: 'Study different media forms and communication methods',
        description_ar: 'دراسة أشكال الإعلام المختلفة وطرق التواصل',
        theme: 'media', difficulty_level: 3, order_index: 6, estimated_hours: 3,
        vocabulary_count: 32, completion_percentage: 15, is_published: true
      },
      {
        id: 19, class_id: 2, unit_number: 7,
        unit_name_en: 'International Relations', unit_name_ar: 'العلاقات الدولية',
        description_en: 'Explore global politics and diplomacy',
        description_ar: 'استكشاف السياسة العالمية والدبلوماسية',
        theme: 'international', difficulty_level: 4, order_index: 7, estimated_hours: 5,
        vocabulary_count: 30, completion_percentage: 10, is_published: true
      },
      {
        id: 20, class_id: 2, unit_number: 8,
        unit_name_en: 'Economics and Finance', unit_name_ar: 'الاقتصاد والمالية',
        description_en: 'Learn economic concepts and financial literacy',
        description_ar: 'تعلم المفاهيم الاقتصادية والمالية',
        theme: 'economics', difficulty_level: 4, order_index: 8, estimated_hours: 4,
        vocabulary_count: 35, completion_percentage: 5, is_published: true
      },
      {
        id: 21, class_id: 2, unit_number: 9,
        unit_name_en: 'Health and Medicine', unit_name_ar: 'الصحة والطب',
        description_en: 'Study medical terminology and health sciences',
        description_ar: 'دراسة المصطلحات الطبية والعلوم الصحية',
        theme: 'medicine', difficulty_level: 4, order_index: 9, estimated_hours: 4,
        vocabulary_count: 38, completion_percentage: 0, is_published: true
      },
      {
        id: 22, class_id: 2, unit_number: 10,
        unit_name_en: 'Education Systems', unit_name_ar: 'أنظمة التعليم',
        description_en: 'Compare educational systems worldwide',
        description_ar: 'مقارنة أنظمة التعليم في جميع أنحاء العالم',
        theme: 'education', difficulty_level: 3, order_index: 10, estimated_hours: 3,
        vocabulary_count: 28, completion_percentage: 0, is_published: true
      },
      {
        id: 23, class_id: 2, unit_number: 11,
        unit_name_en: 'Cultural Heritage', unit_name_ar: 'التراث الثقافي',
        description_en: 'Preserve and celebrate cultural heritage',
        description_ar: 'الحفاظ على التراث الثقافي والاحتفال به',
        theme: 'heritage', difficulty_level: 3, order_index: 11, estimated_hours: 4,
        vocabulary_count: 30, completion_percentage: 0, is_published: true
      },
      {
        id: 24, class_id: 2, unit_number: 12,
        unit_name_en: 'Future Technologies', unit_name_ar: 'التكنولوجيا المستقبلية',
        description_en: 'Explore emerging technologies and AI',
        description_ar: 'استكشاف التقنيات الناشئة والذكاء الاصطناعي',
        theme: 'future_tech', difficulty_level: 5, order_index: 12, estimated_hours: 5,
        vocabulary_count: 32, completion_percentage: 0, is_published: true
      },

      // Grade 12 Units
      {
        id: 25, class_id: 3, unit_number: 1,
        unit_name_en: 'Advanced Academic Writing', unit_name_ar: 'الكتابة الأكاديمية المتقدمة',
        description_en: 'Master essay writing and research skills',
        description_ar: 'إتقان كتابة المقالات ومهارات البحث',
        theme: 'academic', difficulty_level: 5, order_index: 1, estimated_hours: 5,
        vocabulary_count: 40, completion_percentage: 70, is_published: true
      },
      {
        id: 26, class_id: 3, unit_number: 2,
        unit_name_en: 'Critical Thinking', unit_name_ar: 'التفكير النقدي',
        description_en: 'Develop analytical and critical thinking abilities',
        description_ar: 'تطوير قدرات التحليل والتفكير النقدي',
        theme: 'critical', difficulty_level: 5, order_index: 2, estimated_hours: 4,
        vocabulary_count: 35, completion_percentage: 60, is_published: true
      },
      {
        id: 27, class_id: 3, unit_number: 3,
        unit_name_en: 'Professional Communication', unit_name_ar: 'التواصل المهني',
        description_en: 'Master workplace and professional interactions',
        description_ar: 'إتقان التفاعلات في مكان العمل والمهنية',
        theme: 'professional', difficulty_level: 5, order_index: 3, estimated_hours: 4,
        vocabulary_count: 45, completion_percentage: 50, is_published: true
      },
      {
        id: 28, class_id: 3, unit_number: 4,
        unit_name_en: 'Global Issues', unit_name_ar: 'القضايا العالمية',
        description_en: 'Address complex global challenges',
        description_ar: 'معالجة التحديات العالمية المعقدة',
        theme: 'global', difficulty_level: 5, order_index: 4, estimated_hours: 5,
        vocabulary_count: 38, completion_percentage: 45, is_published: true
      },
      {
        id: 29, class_id: 3, unit_number: 5,
        unit_name_en: 'Leadership and Management', unit_name_ar: 'القيادة والإدارة',
        description_en: 'Study leadership principles and management skills',
        description_ar: 'دراسة مبادئ القيادة ومهارات الإدارة',
        theme: 'leadership', difficulty_level: 5, order_index: 5, estimated_hours: 5,
        vocabulary_count: 32, completion_percentage: 40, is_published: true
      },
      {
        id: 30, class_id: 3, unit_number: 6,
        unit_name_en: 'Innovation and Entrepreneurship', unit_name_ar: 'الابتكار وريادة الأعمال',
        description_en: 'Explore business innovation and startup culture',
        description_ar: 'استكشاف ابتكار الأعمال وثقافة الشركات الناشئة',
        theme: 'innovation', difficulty_level: 5, order_index: 6, estimated_hours: 4,
        vocabulary_count: 35, completion_percentage: 35, is_published: true
      },
      {
        id: 31, class_id: 3, unit_number: 7,
        unit_name_en: 'Ethics and Philosophy', unit_name_ar: 'الأخلاق والفلسفة',
        description_en: 'Examine moral dilemmas and philosophical concepts',
        description_ar: 'فحص المعضلات الأخلاقية والمفاهيم الفلسفية',
        theme: 'philosophy', difficulty_level: 5, order_index: 7, estimated_hours: 5,
        vocabulary_count: 30, completion_percentage: 30, is_published: true
      },
      {
        id: 32, class_id: 3, unit_number: 8,
        unit_name_en: 'International Business', unit_name_ar: 'الأعمال الدولية',
        description_en: 'Learn global business practices and cross-cultural skills',
        description_ar: 'تعلم ممارسات الأعمال العالمية والمهارات بين الثقافات',
        theme: 'intl_business', difficulty_level: 5, order_index: 8, estimated_hours: 5,
        vocabulary_count: 42, completion_percentage: 25, is_published: true
      },
      {
        id: 33, class_id: 3, unit_number: 9,
        unit_name_en: 'Research Methods', unit_name_ar: 'مناهج البحث',
        description_en: 'Master academic research and documentation',
        description_ar: 'إتقان البحث الأكاديمي والتوثيق',
        theme: 'research', difficulty_level: 5, order_index: 9, estimated_hours: 4,
        vocabulary_count: 28, completion_percentage: 20, is_published: true
      },
      {
        id: 34, class_id: 3, unit_number: 10,
        unit_name_en: 'Digital Literacy', unit_name_ar: 'المهارات الرقمية',
        description_en: 'Navigate digital world and cybersecurity',
        description_ar: 'التنقل في العالم الرقمي وأمن المعلومات',
        theme: 'digital', difficulty_level: 4, order_index: 10, estimated_hours: 4,
        vocabulary_count: 38, completion_percentage: 15, is_published: true
      },
      {
        id: 35, class_id: 3, unit_number: 11,
        unit_name_en: 'Advanced Grammar and Style', unit_name_ar: 'قواعد النحو والأسلوب المتقدم',
        description_en: 'Perfect advanced grammar and writing style',
        description_ar: 'إتقان القواعد المتقدمة وأسلوب الكتابة',
        theme: 'advanced_grammar', difficulty_level: 5, order_index: 11, estimated_hours: 4,
        vocabulary_count: 25, completion_percentage: 10, is_published: true
      },
      {
        id: 36, class_id: 3, unit_number: 12,
        unit_name_en: 'University Preparation', unit_name_ar: 'التحضير للجامعة',
        description_en: 'Prepare for university studies and career choices',
        description_ar: 'التحضير للدراسات الجامعية وخيارات المهنة',
        theme: 'university', difficulty_level: 5, order_index: 12, estimated_hours: 5,
        vocabulary_count: 30, completion_percentage: 0, is_published: true
      }
    ]
  }

  // Sample vocabulary data
  private getVocabularyData(): VocabularyItem[] {
    return [
      // Grade 10 Unit 1: Personal Introduction
      {
        id: 1, word: 'introduce', word_ar: 'يقدم', pronunciation: '/ˌɪntrəˈdjuːs/',
        definition_en: 'to present or make known', definition_ar: 'يقدم أو يجعل معروفاً',
        example_sentence_en: 'I will introduce you to my family.',
        example_sentence_ar: 'سأقدمك لعائلتي.',
        class_number: 10, unit_number: 1, difficulty_level: 1, category: 'verbs',
        part_of_speech: 'verb', is_active: true
      },
      {
        id: 2, word: 'personal', word_ar: 'شخصي', pronunciation: '/ˈpɜːsənl/',
        definition_en: 'relating to a particular person', definition_ar: 'متعلق بشخص معين',
        example_sentence_en: 'This is my personal information.',
        example_sentence_ar: 'هذه معلوماتي الشخصية.',
        class_number: 10, unit_number: 1, difficulty_level: 1, category: 'adjectives',
        part_of_speech: 'adjective', is_active: true
      },
      {
        id: 3, word: 'information', word_ar: 'معلومات', pronunciation: '/ˌɪnfəˈmeɪʃn/',
        definition_en: 'facts or details about something', definition_ar: 'حقائق أو تفاصيل عن شيء ما',
        example_sentence_en: 'I need more information about this.',
        example_sentence_ar: 'أحتاج المزيد من المعلومات عن هذا.',
        class_number: 10, unit_number: 1, difficulty_level: 1, category: 'nouns',
        part_of_speech: 'noun', is_active: true
      },

      // Grade 10 Unit 2: Daily Routines
      {
        id: 4, word: 'routine', word_ar: 'روتين', pronunciation: '/ruːˈtiːn/',
        definition_en: 'a regular way of doing things', definition_ar: 'طريقة منتظمة لعمل الأشياء',
        example_sentence_en: 'My morning routine includes exercise.',
        example_sentence_ar: 'روتيني الصباحي يتضمن التمرين.',
        class_number: 10, unit_number: 2, difficulty_level: 1, category: 'nouns',
        part_of_speech: 'noun', is_active: true
      },
      {
        id: 5, word: 'activity', word_ar: 'نشاط', pronunciation: '/ækˈtɪvəti/',
        definition_en: 'something that you do', definition_ar: 'شيء تفعله',
        example_sentence_en: 'Reading is my favorite activity.',
        example_sentence_ar: 'القراءة هي هوايتي المفضلة.',
        class_number: 10, unit_number: 2, difficulty_level: 1, category: 'nouns',
        part_of_speech: 'noun', is_active: true
      },

      // Grade 11 Unit 1: Business and Commerce
      {
        id: 6, word: 'business', word_ar: 'أعمال', pronunciation: '/ˈbɪznəs/',
        definition_en: 'commercial or professional work', definition_ar: 'العمل التجاري أو المهني',
        example_sentence_en: 'She runs a successful business.',
        example_sentence_ar: 'تقوم بتشغيل عمل تجاري ناجح.',
        class_number: 11, unit_number: 1, difficulty_level: 3, category: 'nouns',
        part_of_speech: 'noun', is_active: true
      },
      {
        id: 7, word: 'commerce', word_ar: 'تجارة', pronunciation: '/ˈkɒmɜːs/',
        definition_en: 'the activity of buying and selling goods', definition_ar: 'نشاط شراء وبيع السلع',
        example_sentence_en: 'E-commerce has grown significantly.',
        example_sentence_ar: 'التجارة الإلكترونية نمت بشكل كبير.',
        class_number: 11, unit_number: 1, difficulty_level: 3, category: 'nouns',
        part_of_speech: 'noun', is_active: true
      },

      // Grade 12 Unit 1: Advanced Academic Writing
      {
        id: 8, word: 'academic', word_ar: 'أكاديمي', pronunciation: '/ˌækəˈdemɪk/',
        definition_en: 'relating to education and scholarship', definition_ar: 'متعلق بالتعليم والعلم',
        example_sentence_en: 'He has excellent academic performance.',
        example_sentence_ar: 'لديه أداء أكاديمي ممتاز.',
        class_number: 12, unit_number: 1, difficulty_level: 5, category: 'adjectives',
        part_of_speech: 'adjective', is_active: true
      },
      {
        id: 9, word: 'essay', word_ar: 'مقال', pronunciation: '/ˈeseɪ/',
        definition_en: 'a piece of writing on a particular subject', definition_ar: 'مقطع كتابة حول موضوع معين',
        example_sentence_en: 'I need to write an essay for English class.',
        example_sentence_ar: 'أحتاج لكتابة مقال لفئة اللغة الإنجليزية.',
        class_number: 12, unit_number: 1, difficulty_level: 4, category: 'nouns',
        part_of_speech: 'noun', is_active: true
      }
    ]
  }

  // Public methods
  async fetchClasses(): Promise<KuwaitClass[]> {
    try {
      if (this.isMySQLEnabled) {
        // TODO: Implement MySQL API call
        // const response = await fetch(`${this.baseUrl}/api/classes`)
        // return await response.json()
      }
      
      // Return local data for now
      return this.getKuwaitClasses()
    } catch (error) {
      console.error('Error fetching classes:', error)
      return this.getKuwaitClasses() // Fallback to local data
    }
  }

  async fetchUnits(classNumber: number): Promise<KuwaitUnit[]> {
    try {
      if (this.isMySQLEnabled) {
        // TODO: Implement MySQL API call
        // const response = await fetch(`${this.baseUrl}/api/units/${classNumber}`)
        // return await response.json()
      }
      
      // Return filtered local data
      const allUnits = this.getKuwaitUnits()
      return allUnits.filter(unit => {
        const classMap = { 10: 1, 11: 2, 12: 3 }
        return unit.class_id === classMap[classNumber as keyof typeof classMap]
      })
    } catch (error) {
      console.error('Error fetching units:', error)
      return this.getKuwaitUnits().filter(unit => unit.class_id === classNumber)
    }
  }

  async fetchVocabulary(classNumber: number, unitNumber: number): Promise<VocabularyItem[]> {
    try {
      if (this.isMySQLEnabled) {
        // TODO: Implement MySQL API call
        // const response = await fetch(`${this.baseUrl}/api/vocabulary/${classNumber}/${unitNumber}`)
        // return await response.json()
      }
      
      // Return filtered local data
      const allVocabulary = this.getVocabularyData()
      return allVocabulary.filter(item => 
        item.class_number === classNumber && item.unit_number === unitNumber
      )
    } catch (error) {
      console.error('Error fetching vocabulary:', error)
      return this.getVocabularyData().filter(item => 
        item.class_number === classNumber && item.unit_number === unitNumber
      )
    }
  }

  async getClassProgress(classNumber: number): Promise<ClassProgress> {
    const allUnits = this.getKuwaitUnits()
    const classMap = { 10: 1, 11: 2, 12: 3 }
    const classId = classMap[classNumber as keyof typeof classMap]
    const classUnits = allUnits.filter(unit => unit.class_id === classId)
    
    const completedUnits = classUnits.filter(unit => unit.completion_percentage === 100).length
    const totalVocabulary = classUnits.reduce((sum, unit) => sum + unit.vocabulary_count, 0)
    const masteredVocabulary = Math.floor(totalVocabulary * 0.3) // Simulated mastery
    
    return {
      total_units: classUnits.length,
      completed_units: completedUnits,
      total_vocabulary: totalVocabulary,
      mastered_vocabulary: masteredVocabulary,
      completion_percentage: Math.round((completedUnits / classUnits.length) * 100)
    }
  }

  // Generate more vocabulary data for demo
  generateVocabularyForUnit(classNumber: number, unitNumber: number): VocabularyItem[] {
    const baseWords = {
      10: ['hello', 'good', 'nice', 'meet', 'name', 'welcome', 'friend', 'family', 'school', 'teacher', 'student', 'class', 'book', 'read', 'write', 'speak', 'listen', 'learn', 'study', 'work'],
      11: ['business', 'economy', 'culture', 'society', 'technology', 'innovation', 'research', 'experiment', 'science', 'development', 'progress', 'communication', 'media', 'information', 'knowledge', 'experience', 'practice', 'application', 'analysis', 'evaluation'],
      12: ['academic', 'critical', 'thinking', 'analysis', 'synthesis', 'evaluation', 'complex', 'sophisticated', 'comprehensive', 'sustainable', 'innovative', 'entrepreneurial', 'leadership', 'management', 'strategic', 'international', 'multicultural', 'professional', 'ethical', 'philosophical']
    }

    const themes = {
      1: ['personal', 'family', 'introduction', 'greeting', 'identity', 'background', 'hobby', 'interest', 'activity', 'experience'],
      2: ['routine', 'schedule', 'daily', 'morning', 'evening', 'weekend', 'habit', 'practice', 'activity', 'lifestyle'],
      3: ['relationship', 'friendship', 'communication', 'understanding', 'support', 'community', 'social', 'cultural', 'traditional', 'modern'],
      4: ['food', 'cooking', 'nutrition', 'health', 'diet', 'cuisine', 'recipe', 'ingredient', 'flavor', 'taste'],
      5: ['travel', 'journey', 'destination', 'adventure', 'exploration', 'tourism', 'culture', 'experience', 'memory', 'photograph'],
      6: ['technology', 'digital', 'innovation', 'device', 'internet', 'communication', 'information', 'data', 'software', 'hardware']
    }

    const words = baseWords[classNumber as keyof typeof baseWords] || []
    const themeWords = themes[unitNumber as keyof typeof themes] || []
    const allWords = [...words, ...themeWords]

    return allWords.map((word, index) => ({
      id: index + 1,
      word,
      word_ar: `${word}_ar`, // Would be actual Arabic translation
      pronunciation: `/word/${index}/`,
      definition_en: `Definition of ${word}`,
      definition_ar: `تعريف ${word}`,
      example_sentence_en: `This is an example sentence with ${word}.`,
      example_sentence_ar: `هذه جملة مثال تحتوي على ${word}.`,
      class_number: classNumber,
      unit_number: unitNumber,
      difficulty_level: Math.min(Math.max(1, Math.floor(classNumber / 3) + 1), 5),
      category: themeWords[index % themeWords.length] || 'general',
      part_of_speech: ['noun', 'verb', 'adjective', 'adverb'][index % 4],
      is_active: true
    }))
  }
}

export const kuwaitDataService = new KuwaitDataService()
export default kuwaitDataService