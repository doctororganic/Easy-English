Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { topic, difficulty = 2, questionCount = 10 } = await req.json();

    if (!topic) {
      throw new Error('Topic parameter is required');
    }

    // Grammar question templates and generation logic
    const questions = generateGrammarQuestions(topic, difficulty, questionCount);

    return new Response(
      JSON.stringify({
        success: true,
        questions: questions,
        topic: topic,
        difficulty: difficulty,
        total_questions: questions.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Quiz Generation Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateGrammarQuestions(topic: string, difficulty: number, count: number) {
  const questionBank: any[] = [];

  // Simple Present Tense
  if (topic.includes('Simple Present')) {
    questionBank.push(
      {
        id: 1,
        question_text: 'She _____ to work every day.',
        question_type: 'multiple_choice',
        correct_answer: 'goes',
        options: ['go', 'goes', 'going', 'gone'],
        explanation_en: 'Use third person singular form (-s/-es) with she/he/it in simple present.',
        explanation_ar: 'استخدم صيغة المفرد الغائب (-s/-es) مع she/he/it في المضارع البسيط.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      },
      {
        id: 2,
        question_text: 'They _____ English at school.',
        question_type: 'multiple_choice',
        correct_answer: 'learn',
        options: ['learn', 'learns', 'learning', 'learned'],
        explanation_en: 'Use base form of verb with plural subjects in simple present.',
        explanation_ar: 'استخدم الشكل الأساسي للفعل مع الفاعل الجمع في المضارع البسيط.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      }
    );
  }

  // Simple Past Tense
  if (topic.includes('Simple Past')) {
    questionBank.push(
      {
        id: 3,
        question_text: 'I _____ a movie yesterday.',
        question_type: 'multiple_choice',
        correct_answer: 'watched',
        options: ['watch', 'watched', 'watching', 'watches'],
        explanation_en: 'Use past tense form for actions completed in the past.',
        explanation_ar: 'استخدم صيغة الماضي للأفعال المكتملة في الماضي.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      },
      {
        id: 4,
        question_text: 'She _____ in Paris last year.',
        question_type: 'fill_blank',
        correct_answer: 'lived',
        options: ['live', 'lived', 'living', 'lives'],
        explanation_en: 'Regular past tense is formed by adding -ed to the base verb.',
        explanation_ar: 'يتكون الماضي المنتظم بإضافة -ed إلى الفعل الأساسي.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      }
    );
  }

  // Present Perfect
  if (topic.includes('Present Perfect')) {
    questionBank.push(
      {
        id: 5,
        question_text: 'I _____ never _____ to Japan.',
        question_type: 'multiple_choice',
        correct_answer: 'have been',
        options: ['have been', 'has been', 'had been', 'was'],
        explanation_en: 'Present perfect: have/has + past participle. Use "have" with I/you/we/they.',
        explanation_ar: 'المضارع التام: have/has + اسم المفعول. استخدم "have" مع I/you/we/they.',
        difficulty_level: 3,
        points: 2,
        topic: topic
      },
      {
        id: 6,
        question_text: 'She _____ her homework already.',
        question_type: 'fill_blank',
        correct_answer: 'has finished',
        options: ['has finished', 'have finished', 'finished', 'finishing'],
        explanation_en: 'Present perfect shows a completed action with present relevance. Use "has" with she/he/it.',
        explanation_ar: 'المضارع التام يُظهر فعلاً مكتملاً له صلة بالحاضر. استخدم "has" مع she/he/it.',
        difficulty_level: 3,
        points: 2,
        topic: topic
      }
    );
  }

  // Conditionals
  if (topic.includes('Conditional')) {
    questionBank.push(
      {
        id: 7,
        question_text: 'If it rains tomorrow, I _____ stay home.',
        question_type: 'multiple_choice',
        correct_answer: 'will',
        options: ['will', 'would', 'could', 'should'],
        explanation_en: 'First conditional: If + simple present, will + base verb (real future possibility).',
        explanation_ar: 'الشرط الأول: If + مضارع بسيط، will + فعل أساسي (إمكانية حقيقية في المستقبل).',
        difficulty_level: 2,
        points: 2,
        topic: topic
      },
      {
        id: 8,
        question_text: 'If I _____ rich, I would travel the world.',
        question_type: 'fill_blank',
        correct_answer: 'were',
        options: ['were', 'was', 'am', 'will be'],
        explanation_en: 'Second conditional: If + simple past, would + base verb. Use "were" for all subjects.',
        explanation_ar: 'الشرط الثاني: If + ماضي بسيط، would + فعل أساسي. استخدم "were" لجميع الضمائر.',
        difficulty_level: 3,
        points: 2,
        topic: topic
      }
    );
  }

  // Passive Voice
  if (topic.includes('Passive')) {
    questionBank.push(
      {
        id: 9,
        question_text: 'The book _____ by millions of people.',
        question_type: 'multiple_choice',
        correct_answer: 'is read',
        options: ['is read', 'reads', 'was reading', 'has read'],
        explanation_en: 'Passive voice present: is/are + past participle.',
        explanation_ar: 'المبني للمجهول في المضارع: is/are + اسم المفعول.',
        difficulty_level: 3,
        points: 2,
        topic: topic
      },
      {
        id: 10,
        question_text: 'Transform to passive: "John wrote the letter."',
        question_type: 'sentence_transformation',
        correct_answer: 'The letter was written by John.',
        explanation_en: 'Passive: Object becomes subject + was/were + past participle + by + original subject.',
        explanation_ar: 'المبني للمجهول: المفعول به يصبح فاعلاً + was/were + اسم المفعول + by + الفاعل الأصلي.',
        difficulty_level: 3,
        points: 3,
        topic: topic
      }
    );
  }

  // Modal Verbs
  if (topic.includes('Modal')) {
    questionBank.push(
      {
        id: 11,
        question_text: 'You _____ wear a seatbelt when driving.',
        question_type: 'multiple_choice',
        correct_answer: 'must',
        options: ['must', 'can', 'may', 'might'],
        explanation_en: '"Must" expresses strong obligation or necessity.',
        explanation_ar: '"Must" يعبر عن التزام قوي أو ضرورة.',
        difficulty_level: 2,
        points: 1,
        topic: topic
      },
      {
        id: 12,
        question_text: 'She _____ speak three languages fluently.',
        question_type: 'fill_blank',
        correct_answer: 'can',
        options: ['can', 'must', 'should', 'would'],
        explanation_en: '"Can" expresses ability or possibility.',
        explanation_ar: '"Can" يعبر عن القدرة أو الإمكانية.',
        difficulty_level: 2,
        points: 1,
        topic: topic
      }
    );
  }

  // Reported Speech
  if (topic.includes('Reported Speech')) {
    questionBank.push(
      {
        id: 13,
        question_text: 'Direct: "I am happy." Reported: She said she _____ happy.',
        question_type: 'multiple_choice',
        correct_answer: 'was',
        options: ['was', 'is', 'were', 'has been'],
        explanation_en: 'In reported speech, present tense shifts to past tense.',
        explanation_ar: 'في الكلام المنقول، يتحول المضارع إلى الماضي.',
        difficulty_level: 3,
        points: 2,
        topic: topic
      }
    );
  }

  // Prepositions
  if (topic.includes('Preposition')) {
    questionBank.push(
      {
        id: 14,
        question_text: 'I will meet you _____ 5 PM.',
        question_type: 'multiple_choice',
        correct_answer: 'at',
        options: ['at', 'in', 'on', 'by'],
        explanation_en: 'Use "at" with specific times.',
        explanation_ar: 'استخدم "at" مع الأوقات المحددة.',
        difficulty_level: 2,
        points: 1,
        topic: topic
      },
      {
        id: 15,
        question_text: 'The cat is _____ the table.',
        question_type: 'fill_blank',
        correct_answer: 'on',
        options: ['on', 'at', 'in', 'by'],
        explanation_en: 'Use "on" for surfaces.',
        explanation_ar: 'استخدم "on" للأسطح.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      }
    );
  }

  // Comparatives and Superlatives
  if (topic.includes('Comparative') || topic.includes('Superlative')) {
    questionBank.push(
      {
        id: 16,
        question_text: 'This book is _____ than that one.',
        question_type: 'multiple_choice',
        correct_answer: 'better',
        options: ['better', 'best', 'good', 'more good'],
        explanation_en: 'Comparative of "good" is "better".',
        explanation_ar: 'صيغة المقارنة من "good" هي "better".',
        difficulty_level: 2,
        points: 1,
        topic: topic
      },
      {
        id: 17,
        question_text: 'Mount Everest is the _____ mountain in the world.',
        question_type: 'fill_blank',
        correct_answer: 'highest',
        options: ['highest', 'higher', 'high', 'most high'],
        explanation_en: 'Superlative: the + -est for short adjectives.',
        explanation_ar: 'صيغة التفضيل: the + -est للصفات القصيرة.',
        difficulty_level: 2,
        points: 1,
        topic: topic
      }
    );
  }

  // Articles
  if (topic.includes('Article')) {
    questionBank.push(
      {
        id: 18,
        question_text: 'I saw _____ elephant at the zoo.',
        question_type: 'multiple_choice',
        correct_answer: 'an',
        options: ['an', 'a', 'the', 'no article'],
        explanation_en: 'Use "an" before words starting with a vowel sound.',
        explanation_ar: 'استخدم "an" قبل الكلمات التي تبدأ بصوت حرف علة.',
        difficulty_level: 1,
        points: 1,
        topic: topic
      }
    );
  }

  // Subject-Verb Agreement
  if (topic.includes('Agreement')) {
    questionBank.push(
      {
        id: 19,
        question_text: 'The team _____ won the championship.',
        question_type: 'multiple_choice',
        correct_answer: 'has',
        options: ['has', 'have', 'had', 'having'],
        explanation_en: 'Collective nouns like "team" take singular verbs in American English.',
        explanation_ar: 'الأسماء الجماعية مثل "team" تأخذ أفعالاً مفردة في الإنجليزية الأمريكية.',
        difficulty_level: 2,
        points: 1,
        topic: topic
      }
    );
  }

  // Gerunds and Infinitives
  if (topic.includes('Gerund') || topic.includes('Infinitive')) {
    questionBank.push(
      {
        id: 20,
        question_text: 'I enjoy _____ books in my free time.',
        question_type: 'multiple_choice',
        correct_answer: 'reading',
        options: ['reading', 'to read', 'read', 'reads'],
        explanation_en: '"Enjoy" is followed by a gerund (-ing form).',
        explanation_ar: '"Enjoy" يتبعه gerund (صيغة -ing).',
        difficulty_level: 3,
        points: 2,
        topic: topic
      }
    );
  }

  // Select random questions up to the requested count
  const shuffled = questionBank.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, questionBank.length));

  // If we don't have enough questions, generate more generic ones
  while (selected.length < count) {
    selected.push({
      id: selected.length + 1,
      question_text: `Complete the sentence correctly using ${topic}.`,
      question_type: 'usage_example',
      correct_answer: 'Sample answer based on grammar rules',
      explanation_en: `This tests your understanding of ${topic}.`,
      explanation_ar: `هذا يختبر فهمك لـ ${topic}.`,
      difficulty_level: difficulty,
      points: difficulty,
      topic: topic
    });
  }

  return selected;
}
