/**
 * Functional Language Questions Data Structure
 * Organized by topic/section with MCQ format and bilingual explanations
 */

export interface FunctionalQuestion {
  id: number;
  question_en: string;
  question_ar: string;
  correctAnswer: string;
  explanation_en: string;
  explanation_ar: string;
  options?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  context?: string; // For dialogue completion questions
  type: 'opinion' | 'suggestion' | 'request' | 'formal' | 'advice';
}

export interface FunctionalSection {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  questions: FunctionalQuestion[];
}

export const functionalQuestionsData: FunctionalSection[] = [
  {
    id: "section1",
    title_en: "Giving Opinions & Agreeing",
    title_ar: "إبداء الرأي والاتفاق",
    description_en: "Practice expressing opinions and responding to others' viewpoints",
    description_ar: "مارس التعبير عن الآراء والاستجابة لآراء الآخرين",
    questions: [
      {
        id: 1,
        question_en: "A: I think the new policy is actually quite effective. B: _______. It has solved many old problems.",
        question_ar: "أ: أعتقد أن السياسة الجديدة فعالة جداً في الواقع. ب: _______. لقد حلت العديد من المشاكل القديمة.",
        correctAnswer: "C",
        explanation_en: "\"I couldn't agree more\" is a phrase used to express strong agreement. Speaker B is confirming agreement by saying the policy solved many problems.",
        explanation_ar: "\"I couldn't agree more\" هي عبارة تستخدم للتعبير عن الاتفاق القوي. يؤكد المتحدث \"ب\" اتفاقه بقوله إن السياسة حلت العديد من المشاكل.",
        type: "opinion",
        options: {
          A: "I'm not sure about that",
          B: "I disagree completely",
          C: "I couldn't agree more",
          D: "That might be wrong"
        }
      },
      {
        id: 2,
        question_en: "A: Don't you think working from home is better for productivity? B: _______. Some people need the office environment.",
        question_ar: "أ: ألا تعتقد أن العمل من المنزل أفضل للإنتاجية؟ ب: _______. بعض الناس بحاجة إلى بيئة العمل المكتبية.",
        correctAnswer: "C",
        explanation_en: "Speaker B is expressing disagreement and provides a counter-argument (\"Some people need the office environment\"). \"I'm afraid I have to disagree\" is a polite way to disagree.",
        explanation_ar: "يعبر المتحدث \"ب\" عن الاختلاف في الرأي ويقدم حجة مضادة (\"بعض الناس بحاجة إلى بيئة العمل المكتبية\"). \"I'm afraid I have to disagree\" هي طريقة مهذبة للاختلاف.",
        type: "opinion",
        options: {
          A: "I completely agree",
          B: "That's a great idea",
          C: "I'm afraid I have to disagree",
          D: "I think you're absolutely right"
        }
      },
      {
        id: 3,
        question_en: "Which phrase is least formal for giving an opinion?",
        question_ar: "ما هي العبارة الأقل رسمية لإبداء الرأي؟",
        correctAnswer: "D",
        explanation_en: "\"If you ask me\" is a very informal expression used to introduce a personal opinion. The other options are much more formal.",
        explanation_ar: "\"If you ask me\" هو تعبير غير رسمي جداً يستخدم لتقديم رأي شخصي. الخيارات الأخرى أكثر رسمية بكثير.",
        type: "opinion",
        options: {
          A: "In my opinion",
          B: "I believe that",
          C: "From my perspective",
          D: "If you ask me"
        }
      },
      {
        id: 4,
        question_en: "A: I believe this restaurant serves the best coffee in the city. B: _______. It's too bitter for me.",
        question_ar: "أ: أعتقد أن هذا المطعم يقدم أفضل قهوة في المدينة. ب: _______. إنها مرّة جداً بالنسبة لي.",
        correctAnswer: "C",
        explanation_en: "Speaker B is expressing partial agreement/acknowledgement followed by disagreement (\"I see your point, but I disagree\"). The second sentence (\"It's too bitter for me\") supports the disagreement.",
        explanation_ar: "يعبر المتحدث \"ب\" عن موافقة جزئية/اعتراف يليه اختلاف في الرأي (\"I see your point, but I disagree\"). الجملة الثانية (\"إنها مرّة جداً بالنسبة لي\") تدعم الاختلاف.",
        type: "opinion",
        options: {
          A: "I totally agree",
          B: "That's delicious",
          C: "I see your point, but I disagree",
          D: "Best coffee ever"
        }
      },
      {
        id: 5,
        question_en: "What is the most common way to say \"I think\" in spoken English?",
        question_ar: "ما هي الطريقة الأكثر شيوعاً لقول \"أعتقد\" في اللغة الإنجليزية المحكية؟",
        correctAnswer: "B",
        explanation_en: "\"I reckon\" is a common, often informal, and natural way of saying \"I think\" or \"I suppose\" in spoken English, especially in certain dialects.",
        explanation_ar: "\"I reckon\" هي طريقة شائعة، وغير رسمية في كثير من الأحيان، وطبيعية لقول \"أعتقد\" أو \"أفترض\" في اللغة الإنجليزية المحكية، خاصة في بعض اللهجات.",
        type: "opinion",
        options: {
          A: "In my opinion",
          B: "I reckon",
          C: "I suppose",
          D: "From my point of view"
        }
      },
      {
        id: 6,
        question_en: "A: We should start saving more money this year. B: _______. It's the only sensible option.",
        question_ar: "أ: يجب أن نبدأ في توفير المزيد من المال هذا العام. ب: _______. إنه الخيار المعقول الوحيد.",
        correctAnswer: "C",
        explanation_en: "The second sentence (\"It's the only sensible option\") indicates strong agreement. \"That is absolutely correct\" expresses strong agreement formally.",
        explanation_ar: "تشير الجملة الثانية (\"إنه الخيار المعقول الوحيد\") إلى اتفاق قوي. تعبر \"That is absolutely correct\" عن اتفاق قوي بطريقة رسمية.",
        type: "opinion",
        options: {
          A: "I disagree with that",
          B: "That might be wrong",
          C: "That is absolutely correct",
          D: "I'm not sure"
        }
      },
      {
        id: 7,
        question_en: "Which phrase uses hedging to soften the opinion?",
        question_ar: "ما هي العبارة التي تستخدم التحوط (Hedging) لتخفيف حدة الرأي؟",
        correctAnswer: "C",
        explanation_en: "Hedging uses language (like \"It seems that,\" \"might,\" \"some minor\") to make a statement less direct, thereby softening the opinion or criticism.",
        explanation_ar: "يستخدم التحوط (Hedging) لغة (مثل \"It seems that,\" \"might,\" \"some minor\") لجعل العبارة أقل مباشرة، وبالتالي تخفيف حدة الرأي أو النقد.",
        type: "opinion",
        options: {
          A: "Obviously, the plan is terrible",
          B: "Everyone knows this is wrong",
          C: "It seems that there might be some minor issues",
          D: "I completely reject this idea"
        }
      },
      {
        id: 8,
        question_en: "A: The traffic today is terrible. B: _______. I've been stuck for an hour.",
        question_ar: "أ: حركة المرور اليوم فظيعة. ب: _______. لقد علقت لمدة ساعة.",
        correctAnswer: "B",
        explanation_en: "\"Tell me about it!\" is an informal, emphatic way to express strong agreement or shared experience, often about something negative (like bad traffic).",
        explanation_ar: "\"Tell me about it!\" هي طريقة غير رسمية ومؤكدة للتعبير عن الاتفاق القوي أو الخبرة المشتركة، وغالباً ما تكون حول شيء سلبي (مثل حركة المرور السيئة).",
        type: "opinion"
      },
      {
        id: 9,
        question_en: "A: Our government should invest more in public transport. B: _______.",
        question_ar: "أ: يجب على حكومتنا أن تستثمر المزيد في النقل العام. ب: _______.",
        correctAnswer: "B",
        explanation_en: "This is a positive political/social statement. \"I fully support that idea\" expresses strong, positive agreement. \"I don't buy it\" means \"I disagree/don't believe it.\"",
        explanation_ar: "هذه عبارة سياسية/اجتماعية إيجابية. تعبر \"I fully support that idea\" عن اتفاق قوي وإيجابي. \"I don't buy it\" تعني \"أنا أختلف/لا أصدق ذلك\".",
        type: "opinion"
      },
      {
        id: 10,
        question_en: "Which response expresses strong, formal disagreement?",
        question_ar: "أي رد يعبر عن اختلاف قوي ورسمي في الرأي؟",
        correctAnswer: "C",
        explanation_en: "\"I must object to that proposal\" is a formal, strong expression of disagreement, often used in professional or official settings.",
        explanation_ar: "\"I must object to that proposal\" هو تعبير رسمي وقوي عن الاختلاف في الرأي، وغالباً ما يستخدم في الأوساط المهنية أو الرسمية.",
        type: "formal"
      },
      {
        id: 11,
        question_en: "A: The best solution is to hire more staff. B: In my view, _______.",
        question_ar: "أ: أفضل حل هو توظيف المزيد من الموظفين. ب: في رأيي، _______.",
        correctAnswer: "B",
        explanation_en: "Speaker B starts by indicating they are giving their opinion (\"In my view,\") and then presents a counter-argument/disagreement about the proposed solution.",
        explanation_ar: "يبدأ المتحدث \"ب\" بالإشارة إلى أنه يبدي رأيه (\"In my view,\") ثم يقدم حجة مضادة/اختلاف في الرأي حول الحل المقترح.",
        type: "opinion",
        options: {
          A: "that's the right approach",
          B: "we should try technology instead",
          C: "I completely agree",
          D: "that's perfect"
        }
      },
      {
        id: 12,
        question_en: "Which phrase is suitable for a neutral opinion?",
        question_ar: "ما هي العبارة المناسبة لرأي محايد؟",
        correctAnswer: "B",
        explanation_en: "\"I feel that\" is a common, relatively neutral phrase to introduce a personal thought or opinion without strong emotional intensity or formality.",
        explanation_ar: "\"I feel that\" هي عبارة شائعة ومحايدة نسبياً لتقديم فكرة أو رأي شخصي دون شدة عاطفية قوية أو رسمية.",
        type: "opinion"
      },
      {
        id: 13,
        question_en: "A: This movie was too long. B: _______ It kept me engaged the whole time.",
        question_ar: "أ: هذا الفيلم كان طويلاً جداً. ب: _______ لقد أبقاني منغمساً طوال الوقت.",
        correctAnswer: "B",
        explanation_en: "Speaker B's follow-up sentence expresses a contrary opinion (they enjoyed the length). \"I don't think so\" is a simple way to express disagreement.",
        explanation_ar: "تعبر الجملة اللاحقة للمتحدث \"ب\" عن رأي معاكس (لقد استمتعوا بطول الفيلم). \"I don't think so\" هي طريقة بسيطة للتعبير عن الاختلاف في الرأي.",
        type: "opinion"
      },
      {
        id: 14,
        question_en: "A: Do you think we'll finish the project on time? B: _______ we should be able to meet the deadline.",
        question_ar: "أ: هل تعتقد أننا سننتهي من المشروع في الوقت المحدد؟ ب: _______ يجب أن نكون قادرين على الوفاء بالموعد النهائي.",
        correctAnswer: "B",
        explanation_en: "\"It appears that\" is a phrase used to introduce an opinion or conclusion based on available evidence, which fits the context of assessing a project's timeline.",
        explanation_ar: "\"It appears that\" هي عبارة تستخدم لتقديم رأي أو استنتاج بناءً على الأدلة المتاحة، وهو ما يتناسب مع سياق تقييم الجدول الزمني للمشروع.",
        type: "opinion"
      },
      {
        id: 15,
        question_en: "A: That was a terrible presentation. B: I see your point, but _______.",
        question_ar: "أ: كان هذا عرضاً تقديمياً فظيعاً. ب: أرى وجهة نظرك، ولكن _______.",
        correctAnswer: "B",
        explanation_en: "\"I see your point, but...\" is used to acknowledge the previous statement but then introduce a partial disagreement or counterpoint—in this case, mentioning a positive aspect (good content).",
        explanation_ar: "تُستخدم \"I see your point, but...\" للاعتراف بالعبارة السابقة ولكن بعد ذلك لتقديم اختلاف جزئي في الرأي أو نقطة مضادة - وفي هذه الحالة، ذكر جانب إيجابي (محتوى جيد).",
        type: "opinion",
        options: {
          A: "the presentation was perfect",
          B: "the content was actually quite good",
          C: "I agree completely",
          D: "that was excellent"
        }
      }
    ]
  },
  {
    id: "section2",
    title_en: "Suggestions & Requests",
    title_ar: "الاقتراحات والطلبات",
    description_en: "Learn how to make suggestions and polite requests",
    description_ar: "تعلم كيفية تقديم الاقتراحات والطلبات المهذبة",
    questions: [
      {
        id: 16,
        question_en: "A: I'm so bored. What should we do? B: _______ watching a documentary tonight?",
        question_ar: "أ: أنا أشعر بالملل الشديد. ماذا يجب أن نفعل؟ ب: _______ مشاهدة فيلم وثائقي الليلة؟",
        correctAnswer: "B",
        explanation_en: "\"How about\" is a very common phrase for making a suggestion, and it is typically followed by a gerund (verb + -ing).",
        explanation_ar: "\"How about\" هي عبارة شائعة جداً لتقديم اقتراح، وعادة ما يتبعها اسم فاعل (فعل + ing-).",
        type: "suggestion",
        options: {
          A: "I suggest we",
          B: "How about",
          C: "Let's do",
          D: "We should"
        }
      },
      {
        id: 17,
        question_en: "A: We need a better way to communicate. B: May I suggest _______ weekly meetings?",
        question_ar: "أ: نحن بحاجة إلى طريقة أفضل للتواصل. ب: هل لي أن أقترح _______ اجتماعات أسبوعية؟",
        correctAnswer: "C",
        explanation_en: "The verb \"suggest\" is typically followed by a gerund (verb + -ing) or a that-clause (e.g., May I suggest that we schedule).",
        explanation_ar: "يتبع الفعل \"suggest\" عادة اسم فاعل (gerund) (فعل + ing-) أو جملة (that-clause) (على سبيل المثال، May I suggest that we schedule).",
        type: "suggestion",
        options: {
          A: "to schedule",
          B: "that we have",
          C: "having",
          D: "for scheduling"
        }
      },
      {
        id: 18,
        question_en: "A: Could you possibly check my report before I send it? B: _______. Send it over.",
        question_ar: "أ: هل يمكنك من فضلك مراجعة تقريري قبل أن أرسله؟ ب: _______. أرسله.",
        correctAnswer: "C",
        explanation_en: "Speaker B is agreeing to the request and asks for the report. \"No problem at all\" is a common way to agree to a request for help.",
        explanation_ar: "يوافق المتحدث \"ب\" على الطلب ويطلب التقرير. \"No problem at all\" هي طريقة شائعة للموافقة على طلب المساعدة.",
        type: "request",
        options: {
          A: "I'm too busy",
          B: "I can't help",
          C: "No problem at all",
          D: "That's difficult"
        }
      },
      {
        id: 19,
        question_en: "Which is the most polite way to ask someone to turn down the music?",
        question_ar: "ما هي الطريقة الأكثر تهذيباً لطلب شخص ما خفض صوت الموسيقى؟",
        correctAnswer: "B",
        explanation_en: "\"Would you mind...\" is the most polite structure for making a request in English, and it must be followed by a gerund (verb + -ing).",
        explanation_ar: "\"Would you mind...\" هو التركيب الأكثر تهذيباً لتقديم طلب في اللغة الإنجليزية، ويجب أن يتبعه اسم فاعل (فعل + ing-).",
        type: "request",
        options: {
          A: "Can you turn down the music?",
          B: "Would you mind turning down the music?",
          C: "Turn down that music!",
          D: "I want you to turn down the music"
        }
      },
      {
        id: 20,
        question_en: "A: I think we should try the new Italian place. B: Sounds good. _______.",
        question_ar: "أ: أعتقد أنه يجب أن نجرب المطعم الإيطالي الجديد. ب: يبدو جيداً. _______.",
        correctAnswer: "B",
        explanation_en: "Speaker B first accepts the suggestion (\"Sounds good\") and then uses a phrase to confirm agreement with the plan.",
        explanation_ar: "يوافق المتحدث \"ب\" أولاً على الاقتراح (\"Sounds good\") ثم يستخدم عبارة لتأكيد الاتفاق على الخطة.",
        type: "suggestion",
        options: {
          A: "that's not good",
          B: "let's do it",
          C: "I disagree",
          D: "that won't work"
        }
      },
      {
        id: 21,
        question_en: "A: I'm very cold. B: We could always _______ the heating up.",
        question_ar: "أ: أنا أشعر بالبرد الشديد. ب: يمكننا دائماً _______ التدفئة.",
        correctAnswer: "B",
        explanation_en: "The modal verb \"could\" is followed by the base form of the verb (infinitive without \"to\").",
        explanation_ar: "يتبع الفعل الناقص \"could\" الشكل الأساسي للفعل (المصدر بدون \"to\").",
        type: "suggestion",
        options: {
          A: "turning",
          B: "turn",
          C: "to turn",
          D: "turned"
        }
      },
      {
        id: 22,
        question_en: "A: Can you lend me $20 until Friday? B: I'll try my best, but _______.",
        question_ar: "أ: هل يمكنك إقراضي 20 دولاراً حتى يوم الجمعة؟ ب: سأبذل قصارى جهدي، ولكن _______.",
        correctAnswer: "B",
        explanation_en: "Speaker B is expressing a tentative acceptance/uncertainty about being able to fulfill the request, which is indicated by \"I'll try my best, but...\".",
        explanation_ar: "يعبر المتحدث \"ب\" عن قبول مبدئي/عدم يقين بشأن قدرته على تلبية الطلب، وهو ما يدل عليه \"I'll try my best, but...\".",
        type: "request"
      },
      {
        id: 23,
        question_en: "Which phrase is used to accept a suggestion formally?",
        question_ar: "ما هي العبارة المستخدمة لقبول اقتراح بشكل رسمي؟",
        correctAnswer: "C",
        explanation_en: "\"That is an excellent idea\" is a formal, strong expression of accepting and complimenting a suggestion. The others are informal or neutral.",
        explanation_ar: "\"That is an excellent idea\" هو تعبير رسمي وقوي لقبول اقتراح والإثناء عليه. الخيارات الأخرى غير رسمية أو محايدة.",
        type: "formal"
      },
      {
        id: 24,
        question_en: "A: I highly recommend that we postpone the event until next week. B: _______.",
        question_ar: "أ: أوصي بشدة بتأجيل الحدث حتى الأسبوع المقبل. ب: _______.",
        correctAnswer: "C",
        explanation_en: "Speaker B is accepting the recommendation/suggestion. \"I am happy to do that\" is a suitable response for agreeing to carry out an action.",
        explanation_ar: "يوافق المتحدث \"ب\" على التوصية/الاقتراح. \"I am happy to do that\" هو رد مناسب للموافقة على تنفيذ إجراء.",
        type: "suggestion"
      },
      {
        id: 25,
        question_en: "A: I need to print this. B: _______ use my printer?",
        question_ar: "أ: أحتاج إلى طباعة هذا. ب: _______ استخدام طابعتي؟",
        correctAnswer: "B",
        explanation_en: "\"Why don't you\" is a very common structure for making a suggestion or offering help.",
        explanation_ar: "\"Why don't you\" هو تركيب شائع جداً لتقديم اقتراح أو عرض المساعدة.",
        type: "suggestion"
      },
      {
        id: 26,
        question_en: "A: _______ if I borrowed your lecture notes for an hour? B: No, not at all! Here you are.",
        question_ar: "أ: _______ لو استعرت مذكرات محاضراتك لمدة ساعة؟ ب: لا، على الإطلاق! تفضل.",
        correctAnswer: "D",
        explanation_en: "\"I was wondering if...\" is a very polite and indirect way to make a request or ask for permission. The answer \"No, not at all!\" confirms permission.",
        explanation_ar: "\"I was wondering if...\" هي طريقة مهذبة وغير مباشرة جداً لتقديم طلب أو طلب إذن. الإجابة \"No, not at all!\" تؤكد الإذن.",
        type: "request"
      },
      {
        id: 27,
        question_en: "What is a polite way to decline an invitation?",
        question_ar: "ما هي الطريقة المهذبة لرفض دعوة؟",
        correctAnswer: "B",
        explanation_en: "This phrase acknowledges the offer (\"I appreciate the offer\") before politely but firmly declining (\"I must decline\"), which is the most appropriate for politeness.",
        explanation_ar: "تعترف هذه العبارة بالعرض (\"I appreciate the offer\") قبل أن ترفض بأدب ولكن بحزم (\"I must decline\")، وهو الأنسب للتهذيب.",
        type: "request"
      },
      {
        id: 28,
        question_en: "A: Let's go hiking tomorrow. B: I wish I could, but _______.",
        question_ar: "أ: لنذهب في نزهة غداً. ب: أتمنى أن أتمكن من ذلك، ولكن _______.",
        correctAnswer: "B",
        explanation_en: "\"I wish I could, but...\" is used to politely decline a suggestion/invitation and is typically followed by a reason, such as \"I have another engagement.\"",
        explanation_ar: "تُستخدم \"I wish I could, but...\" لرفض اقتراح/دعوة بأدب وتتبع عادة بذكر سبب، مثل \"I have another engagement\".",
        type: "request"
      },
      {
        id: 29,
        question_en: "A: _______ we try calling the supplier again? B: That's a good point.",
        question_ar: "أ: _______ نحاول الاتصال بالمورد مرة أخرى؟ ب: هذه نقطة جيدة.",
        correctAnswer: "D",
        explanation_en: "\"What if...\" is a common and casual way to introduce a suggestion or a new possibility, often followed by the simple present or past tense.",
        explanation_ar: "\"What if...\" هي طريقة شائعة وعفوية لتقديم اقتراح أو إمكانية جديدة، وغالباً ما تتبع بالزمن المضارع البسيط أو الماضي.",
        type: "suggestion"
      },
      {
        id: 30,
        question_en: "Which is a neutral phrase for making a suggestion?",
        question_ar: "ما هي العبارة المحايدة لتقديم اقتراح؟",
        correctAnswer: "B",
        explanation_en: "\"We could always\" introduces a suggestion as one of the available options, without insistence or strong formality, making it a neutral choice.",
        explanation_ar: "تقدم \"We could always\" اقتراحاً كأحد الخيارات المتاحة، دون إصرار أو رسمية قوية، مما يجعلها خياراً محايداً.",
        type: "suggestion",
        options: {
          A: "We should definitely",
          B: "We could always",
          C: "We must",
          D: "We can't"
        }
      }
    ]
  },
  {
    id: "section3",
    title_en: "Formalities, Regrets & Acknowledgements",
    title_ar: "الإجراءات الرسمية، الندم، والإقرار",
    description_en: "Master formal language for professional and academic contexts",
    description_ar: "أتقن اللغة الرسمية للسياقات المهنية والأكاديمية",
    questions: [
      {
        id: 31,
        question_en: "A: That presentation was amazing! B: You've hit the nail on the head; _______.",
        question_ar: "أ: كان ذلك العرض التقديمي مذهلاً! ب: لقد أصبت الهدف تماماً؛ _______.",
        correctAnswer: "B",
        explanation_en: "\"You've hit the nail on the head\" means \"You are absolutely right.\" Speaker B then continues with a sentence that reaffirms and expands on the strong agreement.",
        explanation_ar: "\"You've hit the nail on the head\" تعني \"أنت محق تماماً\". ثم يتابع المتحدث \"ب\" بجملة تؤكد وتوسع الاتفاق القوي.",
        type: "formal",
        options: {
          A: "You've completely missed the point",
          B: "You've hit the nail on the head",
          C: "That doesn't make sense",
          D: "You're way off"
        }
      },
      {
        id: 32,
        question_en: "Which word is a common informal substitute for \"I think\"?",
        question_ar: "ما هي الكلمة التي تعتبر بديلاً شائعاً غير رسمي لـ \"أعتقد\"؟",
        correctAnswer: "B",
        explanation_en: "\"I reckon\" is a very common, often informal, regional substitute for \"I think\" or \"I suppose.\"",
        explanation_ar: "\"I reckon\" هي بديل إقليمي شائع جداً وغير رسمي في كثير من الأحيان لـ \"أعتقد\" أو \"أفترض\".",
        type: "opinion",
        options: {
          A: "I believe",
          B: "I reckon",
          C: "I think",
          D: "I suppose"
        }
      },
      {
        id: 33,
        question_en: "A: The weather forecast says rain tomorrow. B: _______ it doesn't rain; I have a picnic planned.",
        question_ar: "أ: يقول توقعات الطقس إن هناك مطراً غداً. ب: _______ ألا تمطر؛ لدي نزهة مخططة.",
        correctAnswer: "B",
        explanation_en: "The second part of B's speech (\"I have a picnic planned\") expresses a wish or desire for a specific weather outcome, making \"I hope\" the correct response.",
        explanation_ar: "يعبر الجزء الثاني من كلام \"ب\" (\"لدي نزهة مخططة\") عن أمنية أو رغبة في نتيجة طقس محددة، مما يجعل \"I hope\" هو الرد الصحيح.",
        type: "opinion",
        options: {
          A: "I hope",
          B: "I doubt it",
          C: "I'm certain",
          D: "That will never happen"
        }
      },
      {
        id: 34,
        question_en: "A: This textbook is very dense and hard to follow. B: I see your point, but _______ it covers the syllabus thoroughly.",
        question_ar: "أ: هذا الكتاب المدرسي كثيف للغاية ويصعب متابعته. ب: أرى وجهة نظرك، ولكن _______ يغطي المنهج الدراسي بالكامل.",
        correctAnswer: "B",
        explanation_en: "\"I see your point, but...\" signals a partial disagreement or counter-balance. Speaker B is acknowledging the difficulty but pointing out a positive feature (comprehensiveness).",
        explanation_ar: "تشير \"I see your point, but...\" إلى اختلاف جزئي في الرأي أو موازنة مضادة. يعترف المتحدث \"ب\" بالصعوبة ولكنه يشير إلى ميزة إيجابية (الشمول).",
        type: "opinion",
        options: {
          A: "I completely agree",
          B: "I see your point, but it covers the syllabus thoroughly",
          C: "You're absolutely wrong",
          D: "That book is terrible"
        }
      },
      {
        id: 35,
        question_en: "The phrase \"I am completely taken aback\" is used for expressing:",
        question_ar: "تُستخدم عبارة \"I am completely taken aback\" للتعبير عن:",
        correctAnswer: "C",
        explanation_en: "\"Taken aback\" means to be surprised or shocked by something.",
        explanation_ar: "\"Taken aback\" تعني أن تكون مفاجئاً أو مصدوماً بشيء ما.",
        type: "opinion",
        options: {
          A: "surprise",
          B: "anger",
          C: "disappointment",
          D: "joy"
        }
      },
      {
        id: 36,
        question_en: "A: Do you agree that the old system was better? B: _______. The new interface is far more intuitive.",
        question_ar: "أ: هل توافق على أن النظام القديم كان أفضل؟ ب: _______. الواجهة الجديدة أكثر سهولة بكثير.",
        correctAnswer: "B",
        explanation_en: "Speaker B is expressing strong opposition/disagreement to A's suggestion that the old system was better, supporting the disagreement with a reason (\"The new interface is far more intuitive\").",
        explanation_ar: "يعبر المتحدث \"ب\" عن معارضة/اختلاف قوي لاقتراح \"أ\" بأن النظام القديم كان أفضل، ويدعم الاختلاف في الرأي بسبب (\"الواجهة الجديدة أكثر سهولة بكثير\").",
        type: "formal",
        options: {
          A: "I totally agree",
          B: "I couldn't disagree more",
          C: "That's perfect",
          D: "I love the old system"
        }
      },
      {
        id: 37,
        question_en: "Which sentence uses a formal hedging device?",
        question_ar: "أي جملة تستخدم أداة تحوط رسمية؟",
        correctAnswer: "B",
        explanation_en: "\"It would seem\" is a classic formal hedging phrase used to present a conclusion or opinion indirectly and tentatively, softening its impact.",
        explanation_ar: "\"It would seem\" هي عبارة تحوط رسمية كلاسيكية تستخدم لتقديم استنتاج أو رأي بطريقة غير مباشرة ومترددة، مما يخفف من تأثيره.",
        type: "formal",
        options: {
          A: "Obviously this is the solution",
          B: "It would seem that this might be a possibility",
          C: "Definitely this is wrong",
          D: "Clearly this is right"
        }
      },
      {
        id: 38,
        question_en: "A: That news is shocking! B: No way! _______",
        question_ar: "أ: هذا الخبر صادم! ب: مستحيل! _______",
        correctAnswer: "B",
        explanation_en: "\"No way!\" is an informal expression of disbelief or surprise, often followed by an equivalent expression like \"You're kidding me!\"",
        explanation_ar: "\"No way!\" هو تعبير غير رسمي عن عدم التصديق أو المفاجأة، وغالباً ما يتبعه تعبير مماثل مثل \"You're kidding me!\"",
        type: "opinion",
        options: {
          A: "That makes sense",
          B: "No way!",
          C: "I believe you",
          D: "That's interesting"
        }
      },
      {
        id: 39,
        question_en: "A: We must act immediately. B: I fully support that idea, _______ we should start now.",
        question_ar: "أ: يجب أن نتصرف فوراً. ب: أنا أؤيد هذه الفكرة بالكامل، _______ يجب أن نبدأ الآن.",
        correctAnswer: "B",
        explanation_en: "Speaker B agrees and then uses the formal conjunction \"and therefore\" to introduce the logical consequence of the agreement (starting now).",
        explanation_ar: "يوافق المتحدث \"ب\" ثم يستخدم أداة الربط الرسمية \"and therefore\" لتقديم النتيجة المنطقية للاتفاق (البدء الآن).",
        type: "formal",
        options: {
          A: "but I disagree",
          B: "and therefore we should start now",
          C: "however, that's not good",
          D: "but we need more time"
        }
      },
      {
        id: 40,
        question_en: "Which is the most casual way to agree?",
        question_ar: "ما هي الطريقة الأكثر عفوية للاتفاق؟",
        correctAnswer: "C",
        explanation_en: "\"Totally!\" is a very short, high-energy, and informal way to express complete agreement, often used in casual conversation.",
        explanation_ar: "\"Totally!\" هي طريقة قصيرة جداً، وعالية الطاقة، وغير رسمية للتعبير عن الاتفاق الكامل، وغالباً ما تستخدم في المحادثات العفوية.",
        type: "opinion",
        options: {
          A: "I agree with that",
          B: "That's reasonable",
          C: "Totally!",
          D: "I think so too"
        }
      },
      {
        id: 41,
        question_en: "A: Could you possibly proofread this chapter? B: I'm afraid I'm swamped. _______ later this week?",
        question_ar: "أ: هل يمكنك من فضلك تدقيق هذا الفصل؟ ب: أخشى أنني غارق في العمل. _______ في وقت لاحق من هذا الأسبوع؟",
        correctAnswer: "B",
        explanation_en: "Speaker B is politely refusing the immediate request but offering a counter-suggestion (\"later this week\"). \"Would that be acceptable?\" asks if the alternative timing is okay.",
        explanation_ar: "يرفض المتحدث \"ب\" الطلب الفوري بأدب ولكنه يقدم اقتراحاً مضاداً (\"في وقت لاحق من هذا الأسبوع\"). \"Would that be acceptable؟\" يسأل عما إذا كان التوقيت البديل مناسباً.",
        type: "request",
        options: {
          A: "I'll do it right now",
          B: "I'm afraid I'm swamped. Would that be acceptable later this week?",
          C: "I can't help",
          D: "I'm too busy forever"
        }
      },
      {
        id: 42,
        question_en: "A: Would you mind covering my shift tomorrow? B: _______! I have an important appointment.",
        question_ar: "أ: هل تمانع في تغطية مناوبتي غداً؟ ب: _______! لدي موعد مهم.",
        correctAnswer: "C",
        explanation_en: "\"I wish I could, but\" is the classic, polite way to decline a request while expressing a desire to help, followed by the reason for the refusal.",
        explanation_ar: "\"I wish I could, but\" هي الطريقة الكلاسيكية والمهذبة لرفض طلب مع التعبير عن الرغبة في المساعدة، تليها سبب الرفض.",
        type: "request",
        options: {
          A: "I'd love to help!",
          B: "I have an important appointment",
          C: "I wish I could, but",
          D: "I refuse completely"
        }
      },
      {
        id: 43,
        question_en: "Which advice structure uses the subjunctive mood for hypothetical situations?",
        question_ar: "أي هيكل نصيحة يستخدم صيغة الشرط (Subjunctive Mood) للحالات الافتراضية؟",
        correctAnswer: "C",
        explanation_en: "\"If I were you\" is a fixed phrase for giving advice in the subjunctive mood (using were instead of was), followed by the conditional structure (I would).",
        explanation_ar: "\"If I were you\" هي عبارة ثابتة لتقديم النصيحة في صيغة الشرط (subjunctive mood) (باستخدام were بدلاً من was)، تليها البنية الشرطية (I would).",
        type: "advice",
        options: {
          A: "If you were me",
          B: "In your position",
          C: "If I were you",
          D: "From my experience"
        }
      },
      {
        id: 44,
        question_en: "A: I don't know how to fix this software bug. B: _______ consulting the user manual first?",
        question_ar: "أ: لا أعرف كيفية إصلاح خطأ البرنامج هذا. ب: _______ استشارة دليل المستخدم أولاً؟",
        correctAnswer: "B",
        explanation_en: "\"Why don't you try...\" is a common structure for making a suggestion about a course of action, and \"try\" is followed by a gerund (\"consulting\").",
        explanation_ar: "\"Why don't you try...\" هو هيكل شائع لتقديم اقتراح حول مسار عمل ما، ويتبع \"try\" باسم فاعل (\"consulting\").",
        type: "advice",
        options: {
          A: "have you tried",
          B: "why don't you try",
          C: "you should do",
          D: "I suggest you"
        }
      },
      {
        id: 45,
        question_en: "A: We need to decide on a vendor by noon. B: I appreciate the urgency, but _______.",
        question_ar: "أ: نحتاج إلى اتخاذ قرار بشأن مورد بحلول الظهر. ب: أنا أقدر الحاجة الملحة، ولكن _______.",
        correctAnswer: "B",
        explanation_en: "This is a formal refusal to comply with a demand (\"decide by noon\"), explaining that the speaker requires more time.",
        explanation_ar: "هذا رفض رسمي للامتثال لطلب (\"اتخاذ قرار بحلول الظهر\")، يوضح أن المتحدث يحتاج إلى مزيد من الوقت.",
        type: "formal",
        options: {
          A: "that sounds reasonable",
          B: "I appreciate the urgency, but",
          C: "I'll do it immediately",
          D: "that's perfect timing"
        }
      }
    ]
  }
];

// Helper functions
export const getFunctionalQuestionsBySection = (sectionId: string): FunctionalQuestion[] => {
  const section = functionalQuestionsData.find(s => s.id === sectionId);
  return section ? section.questions : [];
};

export const getAllFunctionalSections = (): FunctionalSection[] => {
  return functionalQuestionsData;
};

export const getTotalQuestions = (): number => {
  return functionalQuestionsData.reduce((total, section) => total + section.questions.length, 0);
};

export const getQuestionsByType = (type: string): FunctionalQuestion[] => {
  const allQuestions: FunctionalQuestion[] = [];
  functionalQuestionsData.forEach(section => {
    allQuestions.push(...section.questions.filter(q => q.type === type));
  });
  return allQuestions;
};

export const getQuestionById = (id: number): FunctionalQuestion | undefined => {
  for (const section of functionalQuestionsData) {
    const question = section.questions.find(q => q.id === id);
    if (question) return question;
  }
  return undefined;
};

export const getRandomQuestions = (count: number, sectionId?: string): FunctionalQuestion[] => {
  let questions: FunctionalQuestion[];
  
  if (sectionId) {
    questions = getFunctionalQuestionsBySection(sectionId);
  } else {
    questions = [];
    functionalQuestionsData.forEach(section => {
      questions.push(...section.questions);
    });
  }
  
  // Shuffle and return requested count
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};