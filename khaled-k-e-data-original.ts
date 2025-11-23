
import { GradeData } from './types';

export const gradesData: GradeData[] = [
  {
    grade: 10,
    units: [
      {
        unitNumber: 1,
        title: "Healthy Living",
        questions: [
          {
            id: "g10-u1-q1",
            questionEn: "Why do people prefer home-made meals?",
            questionAr: "لماذا يفضل الناس الوجبات المنزلية؟",
            answerEn: "• They are healthy and full of nutrients.\n• They help keep our body fit and strong.\n• They contain less salt and additives.",
            answerAr: "انها صحية ومليئة بالعناصر الغذائية - تجعل أجسامنا قوية ولائقة - تحتوي على ملح وإضافات أقل"
          },
          {
            id: "g10-u1-q2",
            questionEn: "What should we do to keep our mind and body in tip-top shape?",
            questionAr: "كيف نجعل عقولنا وأجسامنا في أفضل حال؟",
            answerEn: "• We should eat healthy food rich in vitamins.\n• We should do regular exercise.\n• We should get enough sleep.",
            answerAr: "الأكل الصحي الغني بالفيتامينات - ممارسة الرياضة بانتظام - الحصول على قسط كاف من النوم"
          },
          {
            id: "g10-u1-q3",
            questionEn: "In what way are antioxidants useful (good) for our health?",
            questionAr: "فوائد مضادات الأكسدة؟",
            answerEn: "• They combat diseases like cancer.\n• They improve the immune system.\n• They prevent premature aging.",
            answerAr: "تقاوم الأمراض مثل السرطان - تحسن جهاز المناعة - تمنع الشيخوخة المبكرة"
          },
          {
            id: "g10-u1-q4",
            questionEn: "How can dark chocolate help diabetics?",
            questionAr: "كيف تساعد الشوكولاتة الداكنة مرضي السكري؟",
            answerEn: "• It metabolises sugar effectively.\n• It lowers blood pressure.\n• It reduces the risk of heart disease.",
            answerAr: "تحرق السكر بفعالية - تخفض ضغط الدم - تقلل خطر الإصابة بأمراض القلب"
          },
          {
            id: "g10-u1-q5",
            questionEn: "What are the characteristics of a good restaurant?",
            questionAr: "مواصفات المطعم الجيد؟",
            answerEn: "• It should have a good location.\n• It serves healthy and clean food.\n• It provides good service and a nice atmosphere.",
            answerAr: "موقع جيد - يقدم طعام صحي ونظيف - خدمة جيدة وجو لطيف"
          },
          {
            id: "g10-u1-q6",
            questionEn: "What are the advantages of a vegetarian menu?",
            questionAr: "مميزات الطعام النباتي",
            answerEn: "• It has low cholesterol and saturated fats.\n• It contains high fiber and vitamins.\n• It reduces the risk of obesity.",
            answerAr: "كولسترول ودهون أقل - ألياف وفيتامينات عالية - يقلل خطر السمنة"
          },
          {
            id: "g10-u1-q7",
            questionEn: "What are the disadvantages of a vegetarian menu?",
            questionAr: "سلبيات الطعام النباتي",
            answerEn: "• It may lead to malnutrition if not balanced.\n• It lacks vitamin B12, iron, and protein.",
            answerAr: "قد يؤدي لسوء التغذية - ينقصه فيتامين ب ١٢ والحديد والبروتين"
          },
          {
            id: "g10-u1-q8",
            questionEn: "Fast food is harmful. Explain.",
            questionAr: "الوجبات السريعة ضارة. اشرح.",
            answerEn: "• It is high in fat, sugar, and salt.\n• It causes obesity and heart diseases.\n• It contains unhealthy additives.",
            answerAr: "عالية الدهون والسكر والملح - تسبب السمنة وأمراض القلب - تحتوي إضافات غير صحية"
          },
          {
            id: "g10-u1-q9",
            questionEn: "What are the benefits of Probiotic drinks?",
            questionAr: "ما هي فوائد المشروبات التي تحتوي على البروبيوتيك؟",
            answerEn: "• They contain good bacteria.\n• They help digestion.\n• They boost the immune system.",
            answerAr: "تحتوي على بكتيريا نافعة - تساعد على الهضم - تعزز جهاز المناعة"
          },
          {
            id: "g10-u1-q10",
            questionEn: "Why is breakfast the most important meal of the day?",
            questionAr: "لماذا يعتبر الإفطار أهم وجبة في اليوم؟",
            answerEn: "• It gives energy to start the day.\n• It improves concentration and memory.\n• It helps maintain a healthy weight.",
            answerAr: "يعطي طاقة لبدء اليوم - يحسن التركيز والذاكرة - يساعد في الحفاظ على وزن صحي"
          }
        ],
        writingTopics: [
          {
            id: "g10-u1-w1",
            titleEn: "A Healthy Lifestyle",
            titleAr: "نمط الحياة الصحي",
            promptEn: "Health is better than wealth. Plan and write an essay explaining how to lead a healthy lifestyle through diet and exercise.",
            promptAr: "الصحة خير من الثروة. خطط واكتب مقالاً تشرح فيه كيفية اتباع نمط حياة صحي من خلال النظام الغذائي والرياضة.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Hook: Health is wealth.", ar: "جملة جاذبة: الصحة هي الثروة." },
                  { en: "Thesis: Healthy diet and exercise are keys to a good life.", ar: "الأطروحة: النظام الغذائي الصحي والرياضة هما مفتاح الحياة الجيدة." }
                ] 
              },
              { 
                sectionEn: "Body 1: Healthy Diet", 
                sectionAr: "العرض ١: الغذاء الصحي",
                tasks: [
                  { en: "Eating home-made food.", ar: "تناول الطعام المنزلي." },
                  { en: "Avoiding fast food.", ar: "تجنب الوجبات السريعة." },
                  { en: "Drinking plenty of water.", ar: "شرب الكثير من الماء." }
                ] 
              },
              { 
                sectionEn: "Body 2: Exercise", 
                sectionAr: "العرض ٢: الرياضة",
                tasks: [
                  { en: "Benefits for the body (muscles, heart).", ar: "فوائد للجسم (العضلات، القلب)." },
                  { en: "Benefits for the mind (reducing stress).", ar: "فوائد للعقل (تقليل التوتر)." }
                ] 
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Summary of main points.", ar: "ملخص النقاط الرئيسية." },
                  { en: "Final advice on maintaining health.", ar: "نصيحة أخيرة للحفاظ على الصحة." }
                ] 
              }
            ]
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Respecting Cultures",
        questions: [
          {
            id: "g10-u2-q1",
            questionEn: "How does the mentor play a leading role in the community?",
            questionAr: "كيف يساعد الإرشاد في بناء المجتمع؟",
            answerEn: "• Helping students on their projects.\n• Breaking down barriers in the community.\n• Inspiring young people.",
            answerAr: "مساعدة الطلاب - إزالة الحواجز في المجتمع - إلهام الشباب"
          },
          {
            id: "g10-u2-q2",
            questionEn: "What has Kuwait done to promote the Culture of Peace?",
            questionAr: "دور الكويت في تعزيز ثقافة السلام",
            answerEn: "• Organizing seminars to raise awareness.\n• Holding conferences to solve conflicts.\n• Sponsoring peace initiatives.",
            answerAr: "تنظيم ندوات لرفع الوعي - عقد مؤتمرات لحل النزاعات - رعاية مبادرات السلام"
          },
          {
            id: "g10-u2-q3",
            questionEn: "Why is it important to treat others with respect?",
            questionAr: "أهمية التعامل باحترام",
            answerEn: "• People will live in peace and harmony.\n• Relations will be stronger.\n• It reduces conflicts and hatred.",
            answerAr: "العيش بسلام ووئام - تقوية العلاقات - تقليل الصراعات والكراهية"
          },
          {
            id: "g10-u2-q4",
            questionEn: "How can we show respect for other cultures?",
            questionAr: "كيف نظهر الاحترام للثقافات الأخرى؟",
            answerEn: "• By respecting their traditions and beliefs.\n• By treating them with kindness.\n• By learning about their history.",
            answerAr: "احترام تقاليدهم ومعتقداتهم - معاملتهم بلطف - التعلم عن تاريخهم"
          },
          {
            id: "g10-u2-q5",
            questionEn: "What are the aims of the UN?",
            questionAr: "ما هي أهداف الأمم المتحدة؟",
            answerEn: "• To maintain international peace and security.\n• To develop friendly relations among nations.\n• To solve international problems.",
            answerAr: "حفظ السلام والأمن الدوليين - تنمية العلاقات الودية - حل المشاكل الدولية"
          },
          {
            id: "g10-u2-q6",
            questionEn: "What makes Kuwait a center for humanitarian works?",
            questionAr: "ما الذي يجعل الكويت مركزاً للعمل الإنساني؟",
            answerEn: "• Its continuous aid to poor countries.\n• Hosting international donor conferences.\n• The efforts of the late Amir as a Humanitarian Leader.",
            answerAr: "مساعداتها المستمرة للدول الفقيرة - استضافة مؤتمرات المانحين - جهود الأمير الراحل كقائد للعمل الإنساني"
          },
          {
            id: "g10-u2-q7",
            questionEn: "Why is tolerance important in Islam?",
            questionAr: "لماذا التسامح مهم في الإسلام؟",
            answerEn: "• It promotes brotherhood and unity.\n• It reflects the true image of Islam.\n• It ensures justice for all people regardless of religion.",
            answerAr: "يعزز الأخوة والوحدة - يعكس الصورة الحقيقية للإسلام - يضمن العدالة للجميع بغض النظر عن الدين"
          }
        ],
        writingTopics: [
          {
            id: "g10-u2-w1",
            titleEn: "Culture of Peace",
            titleAr: "ثقافة السلام",
            promptEn: "Respect is the bond of friendship. Write an essay about the importance of respecting other cultures and how Kuwait promotes peace.",
            promptAr: "الاحترام هو رابط الصداقة. اكتب مقالاً عن أهمية احترام الثقافات الأخرى وكيف تعزز الكويت السلام.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Definition of respect.", ar: "تعريف الاحترام." },
                  { en: "Thesis: Respect leads to a peaceful world.", ar: "الأطروحة: الاحترام يقود إلى عالم مسالم." }
                ]
              },
              { 
                sectionEn: "Body 1: Respecting Others", 
                sectionAr: "العرض ١: احترام الآخرين",
                tasks: [
                  { en: "Listening to different opinions.", ar: "الاستماع للآراء المختلفة." },
                  { en: "Respecting different religions and traditions.", ar: "احترام الأديان والتقاليد المختلفة." }
                ]
              },
              { 
                sectionEn: "Body 2: Kuwait's Role", 
                sectionAr: "العرض ٢: دور الكويت",
                tasks: [
                  { en: "Hosting peace conferences.", ar: "استضافة مؤتمرات السلام." },
                  { en: "Humanitarian aid to other countries.", ar: "المساعدات الإنسانية للدول الأخرى." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Peace is a shared responsibility.", ar: "السلام مسؤولية مشتركة." },
                  { en: "Call to action for unity.", ar: "دعوة للوحدة." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Inspiring Architecture",
        questions: [
          {
            id: "g10-u3-q1",
            questionEn: "Why are impressive buildings important for any country?",
            questionAr: "أهمية المباني المميزة",
            answerEn: "• They reflect the country's culture and heritage.\n• They serve as landmarks.\n• They attract tourists and boost the economy.",
            answerAr: "تعكس الثقافة والتراث - تعتبر معالم - تجذب السياح وتدعم الاقتصاد"
          },
          {
            id: "g10-u3-q2",
            questionEn: "What makes a shopping centre appeal to customers?",
            questionAr: "عوامل جذب الزبائن للمراكز التجارية",
            answerEn: "• Having many famous brands.\n• Having a variety of restaurants.\n• Having entertainment facilities (cinema, games).",
            answerAr: "وجود ماركات مشهورة - تنوع المطاعم - وجود مرافق ترفيهية"
          },
          {
            id: "g10-u3-q3",
            questionEn: "What are the benefits of building a new airport?",
            questionAr: "إيجابيات بناء مطار جديد",
            answerEn: "• It creates jobs.\n• It helps the economy.\n• It makes travelling easier and faster.",
            answerAr: "يخلق وظائف - يساعد الاقتصاد - يجعل السفر أسهل وأسرع"
          },
          {
            id: "g10-u3-q4",
            questionEn: "What are the disadvantages of building a new airport?",
            questionAr: "سلبيات بناء مطار جديد",
            answerEn: "• It creates noise for nearby residents.\n• It causes air pollution.\n• It increases traffic congestion.",
            answerAr: "يسبب إزعاج للسكان - يسبب تلوث هواء - يزيد الازدحام المروري"
          },
          {
            id: "g10-u3-q5",
            questionEn: "Why is 360 Mall considered a unique landmark?",
            questionAr: "لماذا يعتبر مول 360 معلم فريد؟",
            answerEn: "• It combines modern design with traditional features.\n• It has the Solar Garden and high-tech entertainment.",
            answerAr: "يجمع بين التصميم الحديث والتقليدي - به الحديقة الشمسية وترفيه عالي التقنية"
          },
          {
            id: "g10-u3-q6",
            questionEn: "How are the Kuwait Towers a symbol of modern Kuwait?",
            questionAr: "كيف تعتبر أبراج الكويت رمزاً للكويت الحديثة؟",
            answerEn: "• They represent the combination of technology and Islamic art.\n• They serve as water towers and tourist attractions.",
            answerAr: "تمثل مزيجاً بين التكنولوجيا والفن الإسلامي - تعمل كأبراج مياه وجذب سياحي"
          },
          {
            id: "g10-u3-q7",
            questionEn: "Why do people prefer to shop in malls rather than small shops?",
            questionAr: "لماذا يفضل الناس المولات على المحلات الصغيرة؟",
            answerEn: "• Malls are air-conditioned and comfortable.\n• They offer everything in one place (All-in-one).\n• They are safe family environments.",
            answerAr: "المولات مكيفة ومريحة - توفر كل شيء في مكان واحد - بيئات عائلية آمنة"
          }
        ],
        writingTopics: [
          {
            id: "g10-u3-w1",
            titleEn: "Modern Architecture",
            titleAr: "العمارة الحديثة",
            promptEn: "Architecture reflects a country's culture. Write about a modern building in Kuwait (like 360 Mall or the Airport) and its importance.",
            promptAr: "تعكس العمارة ثقافة البلد. اكتب عن مبنى حديث في الكويت (مثل مول 360 أو المطار) وأهميته.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Architecture as art.", ar: "العمارة كفن." },
                  { en: "Mentioning Kuwait's landmarks.", ar: "ذكر معالم الكويت." }
                ]
              },
              { 
                sectionEn: "Body 1: The Building", 
                sectionAr: "العرض ١: المبنى",
                tasks: [
                  { en: "Description of design (Interior/Exterior).", ar: "وصف التصميم (الداخلي/الخارجي)." },
                  { en: "Facilities provided.", ar: "المرافق المتوفرة." }
                ]
              },
              { 
                sectionEn: "Body 2: Importance", 
                sectionAr: "العرض ٢: الأهمية",
                tasks: [
                  { en: "Economic impact (Tourism/Jobs).", ar: "التأثير الاقتصادي (سياحة/وظائف)." },
                  { en: "Social gathering place.", ar: "مكان للتجمع الاجتماعي." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Buildings are symbols of progress.", ar: "المباني رموز للتقدم." },
                  { en: "Future of architecture in Kuwait.", ar: "مستقبل العمارة في الكويت." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Computer Games",
        questions: [
          {
            id: "g10-u4-q1",
            questionEn: "How will computer games change in the future?",
            questionAr: "مستقبل ألعاب الكمبيوتر",
            answerEn: "• They will become more realistic.\n• They will be more difficult and complex.\n• Characters will look more natural.",
            answerAr: "ستصبح أكثر واقعية - أكثر صعوبة وتعقيدا - الشخصيات ستبدو طبيعية أكثر"
          },
          {
            id: "g10-u4-q2",
            questionEn: "What are the positive effects of playing computer games?",
            questionAr: "الآثار الإيجابية للألعاب",
            answerEn: "• They develop imagination.\n• Players learn new skills.\n• They improve problem-solving abilities.",
            answerAr: "تنمي الخيال - تعلم مهارات جديدة - تحسن قدرات حل المشكلات"
          },
          {
            id: "g10-u4-q3",
            questionEn: "What are the negative effects of playing computer games?",
            questionAr: "الآثار السلبية للألعاب",
            answerEn: "• They waste time.\n• They can cause health problems (eye strain, back pain).\n• They make children idle and socially isolated.",
            answerAr: "تضيع الوقت - تسبب مشاكل صحية - تجعل الأطفال كسالى ومنعزلين"
          },
          {
            id: "g10-u4-q4",
            questionEn: "Compare traditional games and modern games.",
            questionAr: "مقارنة بين الألعاب التقليدية والحديثة",
            answerEn: "• Traditional: Simple, cheap, active, social.\n• Modern: Electronic, expensive, sedentary, often solitary.",
            answerAr: "التقليدية: بسيطة، رخيصة، نشيطة، اجتماعية\nالحديثة: إلكترونية، غالية، خاملة، فردية غالبا"
          },
          {
            id: "g10-u4-q5",
            questionEn: "How can parents control their children's gaming habits?",
            questionAr: "كيف يتحكم الآباء في عادات لعب أطفالهم؟",
            answerEn: "• By setting time limits.\n• By choosing educational games.\n• By encouraging outdoor activities.",
            answerAr: "وضع حدود زمنية - اختيار ألعاب تعليمية - تشجيع الأنشطة الخارجية"
          },
          {
            id: "g10-u4-q6",
            questionEn: "Why are simulation games useful?",
            questionAr: "لماذا ألعاب المحاكاة مفيدة؟",
            answerEn: "• They train pilots and drivers safely.\n• They simulate real-life situations without risk.",
            answerAr: "تدرب الطيارين والسائقين بأمان - تحاكي مواقف واقعية دون مخاطر"
          }
        ],
        writingTopics: [
          {
            id: "g10-u4-w1",
            titleEn: "Computer Games: Pros & Cons",
            titleAr: "ألعاب الكمبيوتر: إيجابيات وسلبيات",
            promptEn: "Computer games are popular but controversial. Write an essay discussing the positive and negative effects of playing computer games.",
            promptAr: "ألعاب الكمبيوتر شائعة لكنها مثيرة للجدل. اكتب مقالاً تناقش فيه الآثار الإيجابية والسلبية للعب ألعاب الكمبيوتر.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Popularity of gaming.", ar: "شعبية الألعاب." },
                  { en: "Thesis: Games have both benefits and drawbacks.", ar: "الأطروحة: للألعاب فوائد وعيوب." }
                ]
              },
              { 
                sectionEn: "Body 1: Advantages", 
                sectionAr: "العرض ١: المميزات",
                tasks: [
                  { en: "Educational value.", ar: "قيمة تعليمية." },
                  { en: "Improving reflexes and logic.", ar: "تحسين ردود الفعل والمنطق." }
                ]
              },
              { 
                sectionEn: "Body 2: Disadvantages", 
                sectionAr: "العرض ٢: العيوب",
                tasks: [
                  { en: "Health issues (Obesity, Eyesight).", ar: "مشاكل صحية (سمنة، نظر)." },
                  { en: "Social isolation and violence.", ar: "عزلة اجتماعية وعنف." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Moderation is key.", ar: "الاعتدال هو الحل." },
                  { en: "Parental guidance is necessary.", ar: "توجيه الوالدين ضروري." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Paralympics",
        questions: [
          {
            id: "g10-u5-q1",
            questionEn: "Why are the Paralympics important?",
            questionAr: "أهمية الألعاب البارالمبية",
            answerEn: "• They rehabilitate disabled athletes.\n• They build self-confidence.\n• They draw attention to the capabilities of the disabled.",
            answerAr: "إعادة تأهيل الرياضيين - بناء الثقة بالنفس - لفت الانتباه لقدرات المعاقين"
          },
          {
            id: "g10-u5-q2",
            questionEn: "What skills do successful athletes need?",
            questionAr: "مهارات الرياضي الناجح",
            answerEn: "• Patience and determination.\n• Sacrifice and hard work.\n• Self-discipline.",
            answerAr: "الصبر والعزيمة - التضحية والعمل الجاد - الانضباط الذاتي"
          },
          {
            id: "g10-u5-q3",
            questionEn: "How can society support the disabled?",
            questionAr: "كيف يدعم المجتمع المعاقين؟",
            answerEn: "• Building special sports clubs.\n• Providing modern equipment.\n• Organizing competitions for them.",
            answerAr: "بناء نوادي خاصة - توفير معدات حديثة - تنظيم مسابقات"
          },
          {
            id: "g10-u5-q4",
            questionEn: "Why are psychological factors important for athletes?",
            questionAr: "أهمية العامل النفسي للرياضيين",
            answerEn: "• To maintain motivation.\n• To improve performance under pressure.\n• To help choose the right sport.",
            answerAr: "الحفاظ على الحافز - تحسين الأداء تحت الضغط - اختيار الرياضة المناسبة"
          },
          {
            id: "g10-u5-q5",
            questionEn: "What lessons can we learn from Paralympic athletes?",
            questionAr: "الدروس المستفادة من الرياضيين البارالمبيين",
            answerEn: "• Nothing is impossible.\n• Hard work leads to success.\n• Focusing on abilities rather than disabilities.",
            answerAr: "لا شيء مستحيل - العمل الجاد يقود للنجاح - التركيز على القدرات لا الإعاقات"
          },
          {
            id: "g10-u5-q6",
            questionEn: "How does sport help in rehabilitation?",
            questionAr: "كيف تساعد الرياضة في إعادة التأهيل؟",
            answerEn: "• It strengthens muscles and improves coordination.\n• It helps mental recovery and social integration.",
            answerAr: "تقوي العضلات وتحسن التنسيق - تساعد في التعافي الذهني والاندماج الاجتماعي"
          }
        ],
        writingTopics: [
          {
            id: "g10-u5-w1",
            titleEn: "Overcoming Disability",
            titleAr: "تحدي الإعاقة",
            promptEn: "Disability is in the mind, not the body. Write about the importance of the Paralympics and how society can support disabled athletes.",
            promptAr: "الإعاقة في العقل وليست في الجسد. اكتب عن أهمية الألعاب البارالمبية وكيف يمكن للمجتمع دعم الرياضيين المعاقين.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Definition of Paralympics.", ar: "تعريف البارالمبياد." },
                  { en: "Thesis: Sports empower the disabled.", ar: "الأطروحة: الرياضة تمكن المعاقين." }
                ]
              },
              { 
                sectionEn: "Body 1: Importance", 
                sectionAr: "العرض ١: الأهمية",
                tasks: [
                  { en: "Physical rehabilitation.", ar: "إعادة التأهيل البدني." },
                  { en: "Social integration and confidence.", ar: "الاندماج الاجتماعي والثقة." }
                ]
              },
              { 
                sectionEn: "Body 2: Role of Society", 
                sectionAr: "العرض ٢: دور المجتمع",
                tasks: [
                  { en: "Providing facilities (ramps, clubs).", ar: "توفير المرافق (منحدرات، نوادي)." },
                  { en: "Encouragement and media coverage.", ar: "التشجيع والتغطية الإعلامية." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Disabled people are champions.", ar: "المعاقون أبطال." },
                  { en: "We must support equal opportunities.", ar: "يجب دعم تكافؤ الفرص." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 6,
        title: "Nature Reserves",
        questions: [
          {
            id: "g10-u6-q1",
            questionEn: "What is unique about Al-Jahra Pools Nature Reserve?",
            questionAr: "ما الفريد في محمية الجهراء؟",
            answerEn: "• It is completely man-made.\n• It is a habitat for many bird species.\n• It manages sewage water.",
            answerAr: "من صنع الإنسان بالكامل - موطن لطيور كثيرة - تعالج مياه الصرف"
          },
          {
            id: "g10-u6-q2",
            questionEn: "What are the main purposes of nature reserves?",
            questionAr: "أهداف المحميات الطبيعية",
            answerEn: "• Protecting rare animals and plants.\n• Scientific research and education.\n• Encouraging tourism.",
            answerAr: "حماية الحيوانات والنباتات النادرة - البحث العلمي والتعليم - تشجيع السياحة"
          },
          {
            id: "g10-u6-q3",
            questionEn: "Why is it crucial to protect wildlife?",
            questionAr: "لماذا حماية الحياة البرية ضرورية؟",
            answerEn: "• To keep the balance in nature.\n• To prevent extinction of species.\n• For future generations to enjoy.",
            answerAr: "حفظ التوازن البيئي - منع الانقراض - للأجيال القادمة"
          },
          {
            id: "g10-u6-q4",
            questionEn: "How can we protect wildlife in our area?",
            questionAr: "كيف نحمي الحياة البرية في منطقتنا؟",
            answerEn: "• By banning illegal hunting.\n• By stopping pollution and littering.\n• By organizing clean-up campaigns.",
            answerAr: "منع الصيد الجائر - وقف التلوث ورمي النفايات - تنظيم حملات تنظيف"
          },
          {
            id: "g10-u6-q5",
            questionEn: "Why do birds migrate?",
            questionAr: "لماذا تهاجر الطيور؟",
            answerEn: "• To find food and water.\n• To escape cold weather.\n• To breed in safer places.",
            answerAr: "للبحث عن الطعام والماء - للهروب من البرد - للتكاثر في أماكن آمنة"
          },
          {
            id: "g10-u6-q6",
            questionEn: "What threatens animals in the wild?",
            questionAr: "ما الذي يهدد الحيوانات في البرية؟",
            answerEn: "• Habitat destruction (building houses).\n• Climate change.\n• Hunting and poaching.",
            answerAr: "تدمير الموطن (بناء البيوت) - تغير المناخ - الصيد والصيد الجائر"
          }
        ],
        writingTopics: [
          {
            id: "g10-u6-w1",
            titleEn: "Protecting Nature",
            titleAr: "حماية الطبيعة",
            promptEn: "Nature reserves are vital for our planet. Write an essay about the Al-Jahra Pools Nature Reserve and the importance of protecting wildlife.",
            promptAr: "المحميات الطبيعية حيوية لكوكبنا. اكتب مقالاً عن محمية برك الجهراء وأهمية حماية الحياة البرية.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Nature is a gift.", ar: "الطبيعة هدية." },
                  { en: "Thesis: Reserves are essential for survival.", ar: "الأطروحة: المحميات ضرورية للبقاء." }
                ]
              },
              { 
                sectionEn: "Body 1: Al-Jahra Pools", 
                sectionAr: "العرض ١: برك الجهراء",
                tasks: [
                  { en: "Location and features.", ar: "الموقع والمميزات." },
                  { en: "Man-made achievement.", ar: "إنجاز من صنع الإنسان." }
                ]
              },
              { 
                sectionEn: "Body 2: Protecting Wildlife", 
                sectionAr: "العرض ٢: حماية الحياة البرية",
                tasks: [
                  { en: "Stopping extinction.", ar: "وقف الانقراض." },
                  { en: "Maintaining ecological balance.", ar: "الحفاظ على التوازن البيئي." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Duty of individuals and government.", ar: "واجب الأفراد والحكومة." },
                  { en: "Hope for a greener future.", ar: "أمل في مستقبل أكثر اخضراراً." }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 11,
    units: [
      {
        unitNumber: 1,
        title: "Festivals",
        questions: [
          {
            id: "g11-u1-q1",
            questionEn: "How do festivals benefit society?",
            questionAr: "كيف تفيد المهرجانات المجتمع؟",
            answerEn: "• They attract tourists and boost the economy.\n• They increase national income.\n• They spread joy and happiness.\n• They raise the sense of patriotism.",
            answerAr: "تجذب السياح وتدعم الاقتصاد - تزيد الدخل القومي - تنشر الفرح - ترفع الحس الوطني"
          },
          {
            id: "g11-u1-q2",
            questionEn: "What activities happen during Hala February Festival?",
            questionAr: "أنشطة مهرجان هلا فبراير",
            answerEn: "• Shopping discounts and sales.\n• Cultural contests and raffles.\n• Marching parades and fireworks.",
            answerAr: "تخفيضات تسوق - مسابقات وسحوبات - مسيرات وألعاب نارية"
          },
          {
            id: "g11-u1-q3",
            questionEn: "Describe the Qurain Cultural Festival.",
            questionAr: "صف مهرجان القرين الثقافي",
            answerEn: "• It includes concerts, exhibitions, and film screenings.\n• It gathers artists from the Gulf to show their talents.\n• It honours leading artists with awards.",
            answerAr: "يشمل حفلات ومعارض وأفلام - يجمع فناني الخليج - يكرم الرواد بجوائز"
          },
          {
            id: "g11-u1-q4",
            questionEn: "Why is Hajj important for Muslims?",
            questionAr: "أهمية الحج للمسلمين",
            answerEn: "• It is the fifth pillar of Islam.\n• It purifies the soul from sins.\n• It demonstrates the unity and equality of all Muslims.",
            answerAr: "الركن الخامس للإسلام - يطهر النفس من الذنوب - يظهر وحدة ومساواة المسلمين"
          },
          {
            id: "g11-u1-q5",
            questionEn: "Why do pilgrims wear white clothes (Ihram)?",
            questionAr: "لماذا يلبس الحجاج الإحرام الأبيض؟",
            answerEn: "• To show equality between rich and poor.\n• To symbolize purity and simplicity.",
            answerAr: "لإظهار المساواة بين الغني والفقير - يرمز للنقاء والبساطة"
          },
          {
            id: "g11-u1-q6",
            questionEn: "What preparations are needed before Hajj?",
            questionAr: "الاستعدادات للحج",
            answerEn: "• Obtaining a visa and travel documents.\n• Learning the rituals of Hajj.\n• Paying off debts and resolving conflicts.",
            answerAr: "الحصول على تأشيرة - تعلم المناسك - سداد الديون وحل الخلافات"
          },
          {
            id: "g11-u1-q7",
            questionEn: "Why is Hala February a patriotic event?",
            questionAr: "لماذا يعتبر هلا فبراير حدثاً وطنياً؟",
            answerEn: "• Because it coincides with National Day and Liberation Day.\n• It celebrates the history and freedom of Kuwait.",
            answerAr: "لأنه يتزامن مع العيد الوطني وعيد التحرير - يحتفل بتاريخ وحرية الكويت"
          },
          {
            id: "g11-u1-q8",
            questionEn: "What role does culture play in festivals?",
            questionAr: "ما الدور الذي تلعبه الثقافة في المهرجانات؟",
            answerEn: "• It helps preserve heritage.\n• It educates young generations about traditions.\n• It connects people to their roots.",
            answerAr: "تحافظ على التراث - تعلم الأجيال الشابة التقاليد - تربط الناس بجذورهم"
          }
        ],
        writingTopics: [
          {
            id: "g11-u1-w1",
            titleEn: "Festivals in Kuwait",
            titleAr: "المهرجانات في الكويت",
            promptEn: "Festivals bring joy and economic benefits. Write about Hala February Festival, describing the activities and its importance to Kuwait.",
            promptAr: "تجلب المهرجانات الفرح والفوائد الاقتصادية. اكتب عن مهرجان هلا فبراير، واصفاً الأنشطة وأهميته للكويت.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Role of festivals in society.", ar: "دور المهرجانات في المجتمع." },
                  { en: "Hala February as a major event.", ar: "هلا فبراير كحدث رئيسي." }
                ]
              },
              { 
                sectionEn: "Body 1: Activities", 
                sectionAr: "العرض ١: الأنشطة",
                tasks: [
                  { en: "Shopping carnivals.", ar: "كرنفالات التسوق." },
                  { en: "Cultural events and concerts.", ar: "الأحداث الثقافية والحفلات." },
                  { en: "Parades.", ar: "المسيرات." }
                ]
              },
              { 
                sectionEn: "Body 2: Importance", 
                sectionAr: "العرض ٢: الأهمية",
                tasks: [
                  { en: "Economic growth (tourism).", ar: "النمو الاقتصادي (السياحة)." },
                  { en: "Patriotic celebration (National Day).", ar: "احتفال وطني (العيد الوطني)." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Festivals unite people.", ar: "المهرجانات توحد الناس." },
                  { en: "Invitation to visit Kuwait.", ar: "دعوة لزيارة الكويت." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Family Celebrations",
        questions: [
          {
            id: "g11-u2-q1",
            questionEn: "Why are family gatherings important?",
            questionAr: "أهمية التجمعات العائلية",
            answerEn: "• To strengthen family ties.\n• To share happy and sad moments.\n• To solve family problems and exchange advice.",
            answerAr: "تقوية الروابط - مشاركة اللحظات السعيدة والحزينة - حل المشاكل وتبادل النصائح"
          },
          {
            id: "g11-u2-q2",
            questionEn: "What occasions bring families together?",
            questionAr: "مناسبات تجمع العائلة",
            answerEn: "• Weddings and birthdays.\n• Graduation parties.\n• Religious holidays (Eid).\n• Returning from travel or Hajj.",
            answerAr: "الأعراس وأعياد الميلاد - التخرج - الأعياد الدينية - العودة من السفر"
          },
          {
            id: "g11-u2-q3",
            questionEn: "How can you plan a memorable celebration?",
            questionAr: "كيف تخطط لاحتفال لا ينسى؟",
            answerEn: "• By decorating the venue.\n• By preparing delicious food and drinks.\n• By organizing fun games and activities.\n• By giving gifts.",
            answerAr: "تزيين المكان - إعداد طعام لذيذ - تنظيم ألعاب - تقديم هدايا"
          },
          {
            id: "g11-u2-q4",
            questionEn: "Role of the eldest family member.",
            questionAr: "دور كبير العائلة",
            answerEn: "• They are the head of the family.\n• They provide wisdom and guidance.\n• They resolve disputes.",
            answerAr: "رأس العائلة - يقدمون الحكمة والتوجيه - يحلون النزاعات"
          },
          {
            id: "g11-u2-q5",
            questionEn: "Why is food an important part of celebrations?",
            questionAr: "لماذا الطعام جزء مهم في الاحتفالات؟",
            answerEn: "• It shows hospitality and generosity.\n• Sharing meals brings people closer.\n• It adds joy to the occasion.",
            answerAr: "يظهر الضيافة والكرم - مشاركة الطعام تقرب الناس - يضيف فرحاً للمناسبة"
          },
          {
            id: "g11-u2-q6",
            questionEn: "What is Gargeean?",
            questionAr: "ما هو القرقيعان؟",
            answerEn: "• A traditional Kuwaiti celebration in Ramadan.\n• Children wear traditional clothes and sing songs.\n• They collect sweets and nuts from neighbors.",
            answerAr: "احتفال كويتي تقليدي في رمضان - يرتدي الأطفال ملابس تقليدية ويغنون - يجمعون الحلوى من الجيران"
          }
        ],
        writingTopics: [
          {
            id: "g11-u2-w1",
            titleEn: "Family Ties",
            titleAr: "الروابط العائلية",
            promptEn: "Family is the compass that guides us. Write an essay about the importance of family gatherings and how to keep family ties strong.",
            promptAr: "العائلة هي البوصلة التي ترشدنا. اكتب مقالاً عن أهمية التجمعات العائلية وكيفية الحفاظ على قوة الروابط العائلية.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Family as the foundation of society.", ar: "العائلة أساس المجتمع." },
                  { en: "Importance of connection.", ar: "أهمية التواصل." }
                ]
              },
              { 
                sectionEn: "Body 1: Gatherings", 
                sectionAr: "العرض ١: التجمعات",
                tasks: [
                  { en: "Occasions (Weddings, Eid).", ar: "المناسبات (أعراس، عيد)." },
                  { en: "Sharing meals and stories.", ar: "مشاركة الوجبات والقصص." }
                ]
              },
              { 
                sectionEn: "Body 2: Strengthening Ties", 
                sectionAr: "العرض ٢: تقوية الروابط",
                tasks: [
                  { en: "Communication and support.", ar: "التواصل والدعم." },
                  { en: "Respecting elders.", ar: "احترام الكبار." },
                  { en: "Helping each other.", ar: "مساعدة بعضنا البعض." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Family is a blessing.", ar: "العائلة نعمة." },
                  { en: "We must cherish our relatives.", ar: "يجب أن نعتز بأقاربنا." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Meeting Places",
        questions: [
          {
            id: "g11-u3-q1",
            questionEn: "Why were coffee houses important in the past?",
            questionAr: "أهمية المقاهي في الماضي",
            answerEn: "• People went there to read newspapers.\n• They discussed politics and business.\n• They listened to lectures and stories.",
            answerAr: "قراءة الصحف - مناقشة السياسة والأعمال - الاستماع للمحاضرات والقصص"
          },
          {
            id: "g11-u3-q2",
            questionEn: "Why is the Diwaniya important in Kuwaiti society?",
            questionAr: "أهمية الديوانية في الكويت",
            answerEn: "• It is a place for socialization and weddings.\n• It plays a political role (meeting MPs).\n• It strengthens ties between citizens.",
            answerAr: "للتواصل والأعراس - دور سياسي (لقاء النواب) - تقوية الروابط بين المواطنين"
          },
          {
            id: "g11-u3-q3",
            questionEn: "Compare old and modern Diwaniyas.",
            questionAr: "مقارنة الديوانيات قديما وحديثا",
            answerEn: "• Old: Simple tents, served simple coffee.\n• Modern: Permanent luxurious structures, TV, internet, lavish meals.",
            answerAr: "قديمة: خيام بسيطة، قهوة فقط\nحديثة: مباني فخمة، تلفاز وانترنت، وجبات دسمة"
          },
          {
            id: "g11-u3-q4",
            questionEn: "Why is coffee a popular drink?",
            questionAr: "لماذا القهوة مشروب شعبي؟",
            answerEn: "• It gives energy and focus.\n• It has a great taste and aroma.\n• It is a symbol of hospitality in Arab culture.",
            answerAr: "تعطي طاقة وتركيز - طعم ورائحة رائعة - رمز للضيافة العربية"
          },
          {
            id: "g11-u3-q5",
            questionEn: "What do people do in a Diwaniya?",
            questionAr: "ماذا يفعل الناس في الديوانية؟",
            answerEn: "• They discuss social and family matters.\n• They talk about politics and elections.\n• They hold wedding receptions and condolences.",
            answerAr: "مناقشة أمور اجتماعية وعائلية - التحدث في السياسة والانتخابات - إقامة الأعراس والعزاء"
          },
          {
            id: "g11-u3-q6",
            questionEn: "Why are traditional meeting places better than online chats?",
            questionAr: "لماذا أماكن اللقاء التقليدية أفضل من المحادثات عبر الإنترنت؟",
            answerEn: "• Face-to-face interaction builds stronger trust.\n• You can see body language and emotions.\n• It prevents isolation.",
            answerAr: "التفاعل وجهاً لوجه يبني ثقة أقوى - رؤية لغة الجسد والمشاعر - يمنع العزلة"
          }
        ],
        writingTopics: [
          {
            id: "g11-u3-w1",
            titleEn: "The Diwaniya",
            titleAr: "الديوانية",
            promptEn: "The Diwaniya is a unique Kuwaiti tradition. Write an essay describing the role of Diwaniyas in Kuwaiti society past and present.",
            promptAr: "الديوانية تقليد كويتي فريد. اكتب مقالاً تصف فيه دور الديوانيات في المجتمع الكويتي في الماضي والحاضر.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Definition of Diwaniya.", ar: "تعريف الديوانية." },
                  { en: "Significance in Kuwaiti culture.", ar: "أهميتها في الثقافة الكويتية." }
                ]
              },
              { 
                sectionEn: "Body 1: Functions", 
                sectionAr: "العرض ١: الوظائف",
                tasks: [
                  { en: "Social (Weddings, Funerals).", ar: "اجتماعية (أعراس، عزاء)." },
                  { en: "Political (Debates, Voting).", ar: "سياسية (مناظرات، تصويت)." }
                ]
              },
              { 
                sectionEn: "Body 2: Evolution", 
                sectionAr: "العرض ٢: التطور",
                tasks: [
                  { en: "Past (Tents, simple).", ar: "الماضي (خيام، بسيطة)." },
                  { en: "Present (Modern buildings, technology).", ar: "الحاضر (مباني حديثة، تكنولوجيا)." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Preserving traditions.", ar: "الحفاظ على التقاليد." },
                  { en: "Diwaniya as a symbol of democracy.", ar: "الديوانية كرمز للديمقراطية." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: "Communicating",
        questions: [
          {
            id: "g11-u4-q1",
            questionEn: "What are the characteristics of a good listener?",
            questionAr: "صفات المستمع الجيد",
            answerEn: "• Being patient and attentive.\n• Not interrupting the speaker.\n• Listening openly without judging.\n• Asking questions for clarification.",
            answerAr: "صبور ومنتبه - عدم المقاطعة - الاستماع بانفتاح دون حكم - طرح أسئلة للتوضيح"
          },
          {
            id: "g11-u4-q2",
            questionEn: "What are the barriers to effective communication?",
            questionAr: "عوائق التواصل الفعال",
            answerEn: "• Poor listening skills.\n• Making assumptions.\n• Defensive behavior.\n• Physical distractions (noise).",
            answerAr: "مهارات استماع ضعيفة - الافتراضات - السلوك الدفاعي - المشتتات الجسدية"
          },
          {
            id: "g11-u4-q3",
            questionEn: "How does effective communication help us?",
            questionAr: "كيف يساعدنا التواصل الفعال؟",
            answerEn: "• It solves problems and avoids misunderstandings.\n• It builds trust and strong relationships.\n• It helps in making better decisions.",
            answerAr: "يحل المشاكل ويجنب سوء الفهم - يبني الثقة والعلاقات - يساعد في اتخاذ القرارات"
          },
          {
            id: "g11-u4-q4",
            questionEn: "What constitutes a good letter of application?",
            questionAr: "مكونات رسالة التقديم الجيدة",
            answerEn: "• Clear personal details and contact info.\n• Relevant qualifications and experience.\n• Professional tone and correct grammar.",
            answerAr: "بيانات شخصية واضحة - مؤهلات وخبرات ذات صلة - نغمة مهنية وقواعد صحيحة"
          },
          {
            id: "g11-u4-q5",
            questionEn: "What is meant by 'Listening between the lines'?",
            questionAr: "ما المقصود بـ 'الاستماع لما بين السطور'؟",
            answerEn: "• Understanding the hidden meaning.\n• Noticing non-verbal cues like tone and body language.",
            answerAr: "فهم المعنى المخفي - ملاحظة الإشارات غير اللفظية كالنبرة ولغة الجسد"
          },
          {
            id: "g11-u4-q6",
            questionEn: "Why are non-verbal signals important?",
            questionAr: "لماذا الإشارات غير اللفظية مهمة؟",
            answerEn: "• They convey emotions and attitudes.\n• They support the spoken message.\n• Examples: Facial expressions, eye contact.",
            answerAr: "تنقل المشاعر والمواقف - تدعم الرسالة المنطوقة - أمثلة: تعابير الوجه، التواصل البصري"
          }
        ],
        writingTopics: [
          {
            id: "g11-u4-w1",
            titleEn: "Effective Communication",
            titleAr: "التواصل الفعال",
            promptEn: "Communication is key to success. Write about the barriers to effective communication and how to become a good listener.",
            promptAr: "التواصل هو مفتاح النجاح. اكتب عن عوائق التواصل الفعال وكيف تصبح مستمعاً جيداً.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Importance of communication in life.", ar: "أهمية التواصل في الحياة." },
                  { en: "Thesis: Good listening ensures success.", ar: "الأطروحة: الاستماع الجيد يضمن النجاح." }
                ]
              },
              { 
                sectionEn: "Body 1: Barriers", 
                sectionAr: "العرض ١: العوائق",
                tasks: [
                  { en: "Poor listening habits.", ar: "عادات الاستماع السيئة." },
                  { en: "Prejudice and assumptions.", ar: "التحيز والافتراضات." },
                  { en: "Environmental noise.", ar: "الضوضاء البيئية." }
                ]
              },
              { 
                sectionEn: "Body 2: Good Listening", 
                sectionAr: "العرض ٢: الاستماع الجيد",
                tasks: [
                  { en: "Listening between the lines.", ar: "الاستماع لما بين السطور." },
                  { en: "Empathy and eye contact.", ar: "التعاطف والتواصل البصري." },
                  { en: "Asking feedback questions.", ar: "طرح أسئلة تعقيبية." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Communication builds bridges.", ar: "التواصل يبني الجسور." },
                  { en: "Keep improving social skills.", ar: "استمر في تحسين المهارات الاجتماعية." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Writing & Language",
        questions: [
          {
            id: "g11-u5-q1",
            questionEn: "Why did humans invent writing?",
            questionAr: "لماذا اخترع البشر الكتابة؟",
            answerEn: "• To document history and events.\n• To pass knowledge to future generations.\n• To communicate across distances and time.\n• For trade and records.",
            answerAr: "لتوثيق التاريخ - نقل المعرفة - التواصل عبر المسافات - للتجارة والسجلات"
          },
          {
            id: "g11-u5-q2",
            questionEn: "How does Arabic differ from the Roman alphabet?",
            questionAr: "الفرق بين العربية والأبجدية الرومانية",
            answerEn: "• Arabic is written right to left; Roman is left to right.\n• Arabic has 28 letters; Roman has 26.\n• Arabic letters change shape based on position.",
            answerAr: "العربية من اليمين لليسار - 28 حرف مقابل 26 - الحروف العربية يتغير شكلها"
          },
          {
            id: "g11-u5-q3",
            questionEn: "Why is Arabic calligraphy important?",
            questionAr: "أهمية الخط العربي",
            answerEn: "• It is a form of art and decoration.\n• It is used to write the Holy Quran.\n• It represents Islamic heritage.",
            answerAr: "نوع من الفن والزخرفة - كتابة القرآن - يمثل التراث الإسلامي"
          },
          {
            id: "g11-u5-q4",
            questionEn: "Will computers replace pens and paper?",
            questionAr: "هل سيستبدل الكمبيوتر القلم والورق؟",
            answerEn: "• Likely yes, for storage and speed.\n• However, handwriting is still needed for cognitive development and personal notes.",
            answerAr: "نعم للتخزين والسرعة - لكن خط اليد مهم للتطور الذهني والملاحظات الشخصية"
          },
          {
            id: "g11-u5-q5",
            questionEn: "Why is it important to learn foreign languages?",
            questionAr: "لماذا من المهم تعلم لغات أجنبية؟",
            answerEn: "• To understand other cultures.\n• To get better job opportunities.\n• To travel easily.",
            answerAr: "لفهم الثقافات الأخرى - للحصول على فرص عمل أفضل - للسفر بسهولة"
          },
          {
            id: "g11-u5-q6",
            questionEn: "How did writing systems evolve?",
            questionAr: "كيف تطورت أنظمة الكتابة؟",
            answerEn: "• Started with pictograms (drawings).\n• Evolved into symbols (Hieroglyphics).\n• Finally became alphabets (Letters).",
            answerAr: "بدأت بالرسوم الصورية - تطورت لرموز - أخيراً أصبحت أبجديات"
          }
        ],
        writingTopics: [
          {
            id: "g11-u5-w1",
            titleEn: "History of Writing",
            titleAr: "تاريخ الكتابة",
            promptEn: "Writing preserves human knowledge. Write an essay tracing the development of writing and the importance of the Arabic language.",
            promptAr: "الكتابة تحفظ المعرفة البشرية. اكتب مقالاً تتتبع فيه تطور الكتابة وأهمية اللغة العربية.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Writing distinguishes humans.", ar: "الكتابة تميز البشر." },
                  { en: "Evolution from pictograms to alphabets.", ar: "التطور من الصور إلى الأبجدية." }
                ]
              },
              { 
                sectionEn: "Body 1: Arabic Language", 
                sectionAr: "العرض ١: اللغة العربية",
                tasks: [
                  { en: "Beauty of calligraphy.", ar: "جمال الخط العربي." },
                  { en: "Language of the Quran.", ar: "لغة القرآن." },
                  { en: "Wide usage.", ar: "الاستخدام الواسع." }
                ]
              },
              { 
                sectionEn: "Body 2: Technology", 
                sectionAr: "العرض ٢: التكنولوجيا",
                tasks: [
                  { en: "Impact of computers.", ar: "تأثير الكمبيوتر." },
                  { en: "Shift from paper to screens.", ar: "التحول من الورق للشاشات." },
                  { en: "Future of handwriting.", ar: "مستقبل خط اليد." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Writing is essential.", ar: "الكتابة ضرورية." },
                  { en: "Preserving languages is preserving culture.", ar: "حفظ اللغات هو حفظ للثقافة." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 6,
        title: "Mobile Phones",
        questions: [
          {
            id: "g11-u6-q1",
            questionEn: "Why are mobile phones a necessity today?",
            questionAr: "لماذا الموبايل ضرورة اليوم؟",
            answerEn: "• Instant communication anywhere.\n• Access to the internet and information.\n• Safety tool in emergencies.",
            answerAr: "تواصل فوري - دخول الانترنت - أداة أمان في الطوارئ"
          },
          {
            id: "g11-u6-q2",
            questionEn: "What are the negative effects of mobile phones?",
            questionAr: "سلبيات الهواتف",
            answerEn: "• Addiction and waste of time.\n• Health issues like eye strain and headaches.\n• Increased risk of car accidents due to texting.",
            answerAr: "إدمان وضياع وقت - مشاكل صحية - حوادث سيارات"
          },
          {
            id: "g11-u6-q3",
            questionEn: "What features do you look for in a new phone?",
            questionAr: "مواصفات الهاتف الجديد",
            answerEn: "• Large storage capacity.\n• High-quality camera.\n• Long battery life and fast processor.",
            answerAr: "سعة تخزين - كاميرا عالية الجودة - بطارية ومعالج سريع"
          },
          {
            id: "g11-u6-q4",
            questionEn: "Accomplishments of Sheikha Suad Al-Sabah.",
            questionAr: "إنجازات الشيخة سعاد الصباح",
            answerEn: "• Founded a publishing house.\n• Established literary prizes.\n• Wrote poetry and economic books.",
            answerAr: "أسست دار نشر - جوائز أدبية - كتبت شعر وكتب اقتصاد"
          },
          {
            id: "g11-u6-q5",
            questionEn: "How can mobile phones be used in education?",
            questionAr: "كيف تستخدم الهواتف في التعليم؟",
            answerEn: "• Researching information quickly.\n• Using educational apps.\n• Attending online classes.",
            answerAr: "البحث السريع - تطبيقات تعليمية - حضور حصص أونلاين"
          },
          {
            id: "g11-u6-q6",
            questionEn: "What is correct 'Netiquette'?",
            questionAr: "ما هي آداب الإنترنت الصحيحة؟",
            answerEn: "• Respecting others online.\n• Not spamming or bullying.\n• Protecting personal privacy.",
            answerAr: "احترام الآخرين - عدم الإزعاج أو التنمر - حماية الخصوصية"
          }
        ],
        writingTopics: [
          {
            id: "g11-u6-w1",
            titleEn: "Smart Phones",
            titleAr: "الهواتف الذكية",
            promptEn: "Mobile phones have changed our lives. Discuss the pros and cons of mobile phones and predict their future development.",
            promptAr: "غيرت الهواتف المحمولة حياتنا. ناقش إيجابيات وسلبيات الهواتف وتوقع تطورها المستقبلي.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Revolution in communication.", ar: "ثورة في الاتصالات." },
                  { en: "Thesis: Phones are double-edged swords.", ar: "الأطروحة: الهواتف سلاح ذو حدين." }
                ]
              },
              { 
                sectionEn: "Body 1: Advantages", 
                sectionAr: "العرض ١: المميزات",
                tasks: [
                  { en: "Connectivity and internet.", ar: "الاتصال والإنترنت." },
                  { en: "Emergency use.", ar: "استخدام الطوارئ." },
                  { en: "Entertainment and apps.", ar: "الترفيه والتطبيقات." }
                ]
              },
              { 
                sectionEn: "Body 2: Disadvantages", 
                sectionAr: "العرض ٢: العيوب",
                tasks: [
                  { en: "Social isolation.", ar: "العزلة الاجتماعية." },
                  { en: "Health hazards.", ar: "المخاطر الصحية." },
                  { en: "Distraction while driving.", ar: "التشتت أثناء القيادة." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Use phones wisely.", ar: "استخدم الهاتف بحكمة." },
                  { en: "Future: AI and wearable tech.", ar: "المستقبل: الذكاء الاصطناعي والتقنيات الملبوسة." }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 12,
    units: [
      {
        unitNumber: 1,
        title: "The Law",
        questions: [
          {
            id: "g12-u1-q1",
            questionEn: "Why are laws essential for any society?",
            questionAr: "لماذا القوانين ضرورية؟",
            answerEn: "• To ensure safety and security.\n• To protect individual rights.\n• To maintain order and prevent chaos.",
            answerAr: "لضمان الأمن - حماية الحقوق - حفظ النظام ومنع الفوضى"
          },
          {
            id: "g12-u1-q2",
            questionEn: "What would happen if there were no laws?",
            questionAr: "ماذا يحدث لو لم توجد قوانين؟",
            answerEn: "• Crime rates would increase.\n• Chaos and violence would spread.\n• The weak would be abused by the strong.",
            answerAr: "زيادة الجريمة - انتشار الفوضى والعنف - استغلال الضعيف"
          },
          {
            id: "g12-u1-q3",
            questionEn: "How does Islam influence the Kuwaiti law?",
            questionAr: "تأثير الإسلام على القانون الكويتي",
            answerEn: "• Laws are derived from the Holy Quran.\n• It ensures justice, tolerance, and equality for all religions.",
            answerAr: "مستمد من القرآن - يضمن العدل والتسامح والمساواة"
          },
          {
            id: "g12-u1-q4",
            questionEn: "What is the purpose of prisons?",
            questionAr: "الهدف من السجون",
            answerEn: "• To punish criminals.\n• To protect society from dangerous people.\n• To rehabilitate offenders.",
            answerAr: "عقاب المجرمين - حماية المجتمع - إصلاح المخطئين"
          },
          {
            id: "g12-u1-q5",
            questionEn: "Arguments for and against solving minor cases in court.",
            questionAr: "مع وضد القضايا البسيطة في المحكمة",
            answerEn: "• For: Everyone deserves justice.\n• Against: It wastes time and money, clogs up the system.",
            answerAr: "مع: الجميع يستحق العدالة\nضد: تضيع الوقت والمال، تعطل النظام"
          },
          {
            id: "g12-u1-q6",
            questionEn: "What is the 'Culture of Blame'?",
            questionAr: "ثقافة اللوم",
            answerEn: "• The tendency to blame others for our own mistakes instead of taking responsibility.",
            answerAr: "ميل للوم الآخرين على أخطائنا بدلاً من تحمل المسؤولية"
          },
          {
            id: "g12-u1-q7",
            questionEn: "Why should we deal with computer crimes (Cyber-crimes) seriously?",
            questionAr: "لماذا يجب التعامل بجدية مع الجرائم الإلكترونية؟",
            answerEn: "• Because they can ruin people's reputation.\n• They cause financial loss and identity theft.",
            answerAr: "لأنها تدمر سمعة الناس - تسبب خسائر مالية وسرقة الهوية"
          },
          {
            id: "g12-u1-q8",
            questionEn: "How can we help criminals to become good citizens?",
            questionAr: "كيف نساعد المجرمين ليصبحوا مواطنين صالحين؟",
            answerEn: "• By providing education and job training in prison.\n• By offering psychological support and rehabilitation.",
            answerAr: "توفير التعليم والتدريب المهني في السجن - الدعم النفسي وإعادة التأهيل"
          }
        ],
        writingTopics: [
          {
            id: "g12-u1-w1",
            titleEn: "The Importance of Law",
            titleAr: "أهمية القانون",
            promptEn: "Laws are the glue that holds society together. Write an essay explaining why laws are necessary and how Islamic values influence Kuwaiti law.",
            promptAr: "القوانين هي الغراء الذي يربط المجتمع. اكتب مقالاً تشرح فيه ضرورة القوانين وكيف تؤثر القيم الإسلامية على القانون الكويتي.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Definition of Law.", ar: "تعريف القانون." },
                  { en: "Thesis: Civilized societies need rules.", ar: "الأطروحة: المجتمعات المتحضرة تحتاج لقواعد." }
                ]
              },
              { 
                sectionEn: "Body 1: Necessity of Law", 
                sectionAr: "العرض ١: ضرورة القانون",
                tasks: [
                  { en: "Preventing chaos.", ar: "منع الفوضى." },
                  { en: "Protecting rights and property.", ar: "حماية الحقوق والممتلكات." },
                  { en: "Ensuring safety.", ar: "ضمان السلامة." }
                ]
              },
              { 
                sectionEn: "Body 2: Islamic Influence", 
                sectionAr: "العرض ٢: التأثير الإسلامي",
                tasks: [
                  { en: "Quran as a source.", ar: "القرآن كمصدر." },
                  { en: "Justice and Tolerance.", ar: "العدل والتسامح." },
                  { en: "Rights of non-Muslims.", ar: "حقوق غير المسلمين." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Respecting law is a duty.", ar: "احترام القانون واجب." },
                  { en: "Law guarantees freedom.", ar: "القانون يضمن الحرية." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 2,
        title: "Migration",
        questions: [
          {
            id: "g12-u2-q1",
            questionEn: "Why do people migrate?",
            questionAr: "لماذا يهاجر الناس؟",
            answerEn: "• Running away from wars or disasters (Push factors).\n• Seeking better jobs and education (Pull factors).",
            answerAr: "الهروب من الحروب والكوارث - البحث عن عمل وتعليم"
          },
          {
            id: "g12-u2-q2",
            questionEn: "What are the pros of migration?",
            questionAr: "إيجابيات الهجرة",
            answerEn: "• Improving standard of living.\n• Cultural exchange.\n• Filling labor shortages in host countries.",
            answerAr: "تحسين المعيشة - تبادل ثقافي - سد نقص العمالة"
          },
          {
            id: "g12-u2-q3",
            questionEn: "What are the cons of migration?",
            questionAr: "سلبيات الهجرة",
            answerEn: "• Loss of identity and culture.\n• Feeling homesick and lonely.\n• Brain drain for the home country.",
            answerAr: "فقدان الهوية - الحنين والوحدة - هجرة العقول"
          },
          {
            id: "g12-u2-q4",
            questionEn: "How does Kuwait treat foreign workers?",
            questionAr: "كيف تعامل الكويت العمالة؟",
            answerEn: "• Providing well-paid jobs.\n• Ensuring a safe environment.\n• Respecting their rights.",
            answerAr: "وظائف مجزية - بيئة آمنة - احترام حقوقهم"
          },
          {
            id: "g12-u2-q5",
            questionEn: "What is 'Brain Drain'?",
            questionAr: "ما هي هجرة العقول؟",
            answerEn: "• It is the movement of highly skilled people from their own country to another for better pay.\n• It negatively affects the developing countries.",
            answerAr: "انتقال المهرة من بلدهم لآخر من أجل أجر أفضل - يؤثر سلباً على الدول النامية"
          },
          {
            id: "g12-u2-q6",
            questionEn: "Why do animals migrate?",
            questionAr: "لماذا تهاجر الحيوانات؟",
            answerEn: "• To find food.\n• To breed in warmer climates.\n• To survive changing seasons.",
            answerAr: "للبحث عن الطعام - للتكاثر في طقس أدفأ - للنجاة من تغير الفصول"
          }
        ],
        writingTopics: [
          {
            id: "g12-u2-w1",
            titleEn: "Migration: Pros & Cons",
            titleAr: "الهجرة: إيجابيات وسلبيات",
            promptEn: "Migration is a global phenomenon. Discuss the reasons why people migrate and the advantages and disadvantages they face.",
            promptAr: "الهجرة ظاهرة عالمية. ناقش أسباب هجرة الناس والإيجابيات والسلبيات التي يواجهونها.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Migration is age-old.", ar: "الهجرة قديمة قدم الزمن." },
                  { en: "Thesis: Motivations vary between push and pull factors.", ar: "الأطروحة: الدوافع تختلف بين عوامل الطرد والجذب." }
                ]
              },
              { 
                sectionEn: "Body 1: Reasons", 
                sectionAr: "العرض ١: الأسباب",
                tasks: [
                  { en: "War and famine (Push).", ar: "الحرب والمجاعة (طرد)." },
                  { en: "Dreams of wealth/education (Pull).", ar: "أحلام الثراء/التعليم (جذب)." }
                ]
              },
              { 
                sectionEn: "Body 2: Consequences", 
                sectionAr: "العرض ٢: العواقب",
                tasks: [
                  { en: "Positive: Cultural mix, economy.", ar: "إيجابي: مزيج ثقافي، اقتصاد." },
                  { en: "Negative: Brain drain, loss of identity.", ar: "سلبي: هجرة العقول، فقدان الهوية." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Migration shapes the world.", ar: "الهجرة تشكل العالم." },
                  { en: "Need for tolerance.", ar: "الحاجة للتسامح." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 3,
        title: "Human Values",
        questions: [
          {
            id: "g12-u3-q1",
            questionEn: "Why are human values important?",
            questionAr: "أهمية القيم الإنسانية",
            answerEn: "• They promote peace and understanding.\n• They reduce violence and discrimination.\n• They ensure dignity for everyone.",
            answerAr: "تعزز السلام والتفاهم - تقلل العنف - تضمن الكرامة"
          },
          {
            id: "g12-u3-q2",
            questionEn: "How can governments protect human rights?",
            questionAr: "حماية حقوق الإنسان حكومياً",
            answerEn: "• Enacting strict laws against violations.\n• Promoting freedom of speech and equality.\n• Providing education and healthcare.",
            answerAr: "سن قوانين صارمة - تعزيز الحرية والمساواة - توفير التعليم والصحة"
          },
          {
            id: "g12-u3-q3",
            questionEn: "What is the role of the Kuwait Red Crescent Society (KRCS)?",
            questionAr: "دور الهلال الأحمر الكويتي",
            answerEn: "• Providing aid to disaster victims.\n• Distributing food and medicine.\n• Helping regardless of race or religion.",
            answerAr: "مساعدة الضحايا - توزيع طعام ودواء - المساعدة دون تمييز"
          },
          {
            id: "g12-u3-q4",
            questionEn: "What makes a successful diplomat?",
            questionAr: "صفات الدبلوماسي الناجح",
            answerEn: "• Knowledge of foreign languages and cultures.\n• Communication and negotiation skills.\n• Patience and confidence.",
            answerAr: "معرفة اللغات - مهارات تواصل وتفاوض - صبر وثقة"
          },
          {
            id: "g12-u3-q5",
            questionEn: "Why is freedom not absolute?",
            questionAr: "لماذا الحرية ليست مطلقة؟",
            answerEn: "• Because it ends when it harms others.\n• Absolute freedom leads to chaos.\n• Laws must balance freedom and safety.",
            answerAr: "لأنها تنتهي عند إيذاء الآخرين - الحرية المطلقة تسبب فوضى - القوانين توازن بين الحرية والأمان"
          },
          {
            id: "g12-u3-q6",
            questionEn: "How can we encourage volunteer work?",
            questionAr: "كيف نشجع العمل التطوعي؟",
            answerEn: "• By raising awareness in media.\n• By teaching students its importance in schools.\n• By rewarding volunteers.",
            answerAr: "رفع الوعي إعلامياً - تعليم الطلاب أهميته - مكافأة المتطوعين"
          }
        ],
        writingTopics: [
          {
            id: "g12-u3-w1",
            titleEn: "Human Values & Charity",
            titleAr: "القيم الإنسانية والعمل الخيري",
            promptEn: "Compassion is a core human value. Write about the importance of human values and the role of charitable organizations like KRCS.",
            promptAr: "الرحمة قيمة إنسانية جوهرية. اكتب عن أهمية القيم الإنسانية ودور المنظمات الخيرية مثل الهلال الأحمر الكويتي.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Values define humanity.", ar: "القيم تحدد الإنسانية." },
                  { en: "Thesis: Compassion drives charity.", ar: "الأطروحة: الرحمة تقود العمل الخيري." }
                ]
              },
              { 
                sectionEn: "Body 1: Universal Values", 
                sectionAr: "العرض ١: القيم العالمية",
                tasks: [
                  { en: "Freedom, Justice, Peace.", ar: "الحرية، العدالة، السلام." },
                  { en: "Impact on reducing wars.", ar: "الأثر في تقليل الحروب." }
                ]
              },
              { 
                sectionEn: "Body 2: Role of Charity (KRCS)", 
                sectionAr: "العرض ٢: دور العمل الخيري",
                tasks: [
                  { en: "Emergency relief.", ar: "الإغاثة الطارئة." },
                  { en: "Volunteering spirit.", ar: "روح التطوع." },
                  { en: "Kuwait as a Humanitarian Center.", ar: "الكويت كمركز إنساني." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Helping others is a duty.", ar: "مساعدة الآخرين واجب." },
                  { en: "Call for global solidarity.", ar: "دعوة للتضامن العالمي." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: "The Earth at Risk",
        questions: [
          {
            id: "g12-u4-q1",
            questionEn: "What causes desertification?",
            questionAr: "أسباب التصحر",
            answerEn: "• Climate change and lack of rain.\n• Overgrazing and deforestation.\n• Bad farming practices.",
            answerAr: "تغير المناخ - الرعي الجائر وقطع الغابات - زراعة سيئة"
          },
          {
            id: "g12-u4-q2",
            questionEn: "What are the effects of desertification?",
            questionAr: "آثار التصحر",
            answerEn: "• Loss of fertile land and crops.\n• Dust storms and air pollution.\n• Extinction of animals.",
            answerAr: "خسارة أراضي خصبة - عواصف ترابية - انقراض حيوانات"
          },
          {
            id: "g12-u4-q3",
            questionEn: "How can we solve the water shortage problem?",
            questionAr: "حل مشكلة نقص المياه",
            answerEn: "• Building desalination plants.\n• Using drip irrigation.\n• Reducing water wastage at home.",
            answerAr: "محطات تحلية - ري بالتنقيط - تقليل الهدر"
          },
          {
            id: "g12-u4-q4",
            questionEn: "Why are rainforests important?",
            questionAr: "أهمية الغابات المطيرة",
            answerEn: "• They produce oxygen (Lungs of the Earth).\n• They provide medicines and food.\n• They are home to diverse wildlife.",
            answerAr: "تنتج الأكسجين - توفر دواء وطعام - موطن للحياة البرية"
          },
          {
            id: "g12-u4-q5",
            questionEn: "How can we prevent land from turning into desert?",
            questionAr: "كيف نمنع تحول الأرض لصحراء؟",
            answerEn: "• By planting more trees (Green belts).\n• Controlling grazing.\n• Improving irrigation systems.",
            answerAr: "زراعة الأشجار (أحزمة خضراء) - التحكم بالرعي - تحسين الري"
          },
          {
            id: "g12-u4-q6",
            questionEn: "Why is water so important?",
            questionAr: "لماذا المياه مهمة جداً؟",
            answerEn: "• It is essential for life (drinking, farming).\n• It is used in industries.\n• It regulates the Earth's temperature.",
            answerAr: "ضرورية للحياة (شرب، زراعة) - تستخدم في الصناعة - تنظم حرارة الأرض"
          }
        ],
        writingTopics: [
          {
            id: "g12-u4-w1",
            titleEn: "Environmental Threats",
            titleAr: "التهديدات البيئية",
            promptEn: "The Earth is at risk due to human activities. Discuss the problem of desertification, its causes, effects, and possible solutions.",
            promptAr: "الأرض في خطر بسبب الأنشطة البشرية. ناقش مشكلة التصحر وأسبابها وآثارها والحلول الممكنة.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Earth is fragile.", ar: "الأرض هشة." },
                  { en: "Thesis: Human actions cause damage.", ar: "الأطروحة: أفعال البشر تسبب الضرر." }
                ]
              },
              { 
                sectionEn: "Body 1: Desertification", 
                sectionAr: "العرض ١: التصحر",
                tasks: [
                  { en: "Causes: Overgrazing, cutting trees.", ar: "أسباب: رعي جائر، قطع أشجار." },
                  { en: "Effects: Dust storms, loss of food.", ar: "آثار: عواصف ترابية، فقدان طعام." }
                ]
              },
              { 
                sectionEn: "Body 2: Solutions", 
                sectionAr: "العرض ٢: الحلول",
                tasks: [
                  { en: "Planting green belts.", ar: "زراعة أحزمة خضراء." },
                  { en: "Conserving water.", ar: "حفظ المياه." },
                  { en: "Sustainable farming.", ar: "زراعة مستدامة." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Act now or suffer later.", ar: "تحرك الآن أو عانِ لاحقاً." },
                  { en: "Protecting Earth is protecting us.", ar: "حماية الأرض هي حماية لأنفسنا." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 5,
        title: "Precious Resources",
        questions: [
          {
            id: "g12-u5-q1",
            questionEn: "Why is recycling essential?",
            questionAr: "أهمية إعادة التدوير",
            answerEn: "• It reduces pollution and landfill waste.\n• It saves energy and raw materials.\n• It protects the environment.",
            answerAr: "يقلل التلوث والنفايات - يوفر طاقة ومواد خام - يحمي البيئة"
          },
          {
            id: "g12-u5-q2",
            questionEn: "How can we preserve natural resources?",
            questionAr: "كيف نحفظ الموارد الطبيعية؟",
            answerEn: "• By using renewable energy (Solar, Wind).\n• By reducing consumption.\n• By recycling paper, glass, and plastic.",
            answerAr: "طاقة متجددة - تقليل الاستهلاك - تدوير الورق والبلاستيك"
          },
          {
            id: "g12-u5-q3",
            questionEn: "What is Kuwait doing to manage waste?",
            questionAr: "إدارة النفايات في الكويت",
            answerEn: "• Building recycling centers.\n• Encouraging citizens to separate waste.\n• Raising awareness campaigns.",
            answerAr: "بناء مراكز تدوير - تشجيع فصل النفايات - حملات توعية"
          },
          {
            id: "g12-u5-q4",
            questionEn: "Why are some materials difficult to recycle?",
            questionAr: "لماذا يصعب تدوير بعض المواد؟",
            answerEn: "• Because the process is expensive.\n• Some materials contain toxins.\n• Difficulty in separating components.",
            answerAr: "عملية مكلفة - تحتوي سموم - صعوبة الفصل"
          },
          {
            id: "g12-u5-q5",
            questionEn: "What is the difference between renewable and non-renewable energy?",
            questionAr: "الفرق بين الطاقة المتجددة وغير المتجددة",
            answerEn: "• Renewable: Clean, endless (Solar, Wind).\n• Non-renewable: Polluting, limited (Oil, Coal).",
            answerAr: "متجددة: نظيفة، لا تنفد (شمس، رياح)\nغير متجددة: ملوثة، محدودة (نفط، فحم)"
          },
          {
            id: "g12-u5-q6",
            questionEn: "How can you reduce waste at home?",
            questionAr: "كيف تقلل النفايات في المنزل؟",
            answerEn: "• By reusing bags and bottles.\n• Buying products with less packaging.\n• Donating old clothes.",
            answerAr: "إعادة استخدام الأكياس - شراء منتجات بتغليف أقل - التبرع بالملابس القديمة"
          }
        ],
        writingTopics: [
          {
            id: "g12-u5-w1",
            titleEn: "Recycling",
            titleAr: "إعادة التدوير",
            promptEn: "Recycling is essential for a sustainable future. Write an essay about the benefits of recycling and how Kuwait is managing waste.",
            promptAr: "إعادة التدوير ضرورية لمستقبل مستدام. اكتب مقالاً عن فوائد التدوير وكيف تدير الكويت النفايات.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Waste is a global crisis.", ar: "النفايات أزمة عالمية." },
                  { en: "Thesis: Recycling is the solution.", ar: "الأطروحة: التدوير هو الحل." }
                ]
              },
              { 
                sectionEn: "Body 1: Benefits", 
                sectionAr: "العرض ١: الفوائد",
                tasks: [
                  { en: "Saving energy and resources.", ar: "توفير الطاقة والموارد." },
                  { en: "Reducing pollution and landfills.", ar: "تقليل التلوث والمكبات." },
                  { en: "Creating green jobs.", ar: "خلق وظائف خضراء." }
                ]
              },
              { 
                sectionEn: "Body 2: Waste Management in Kuwait", 
                sectionAr: "العرض ٢: إدارة النفايات في الكويت",
                tasks: [
                  { en: "Recycling initiatives.", ar: "مبادرات التدوير." },
                  { en: "Public awareness.", ar: "الوعي العام." },
                  { en: "Challenges faced.", ar: "التحديات." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "Reduce, Reuse, Recycle.", ar: "قلل، أعد الاستخدام، دور." },
                  { en: "Responsibility of every citizen.", ar: "مسؤولية كل مواطن." }
                ]
              }
            ]
          }
        ]
      },
      {
        unitNumber: 6,
        title: "Under Threat",
        questions: [
          {
            id: "g12-u6-q1",
            questionEn: "Why are animals becoming extinct?",
            questionAr: "لماذا تنقرض الحيوانات؟",
            answerEn: "• Habitat destruction (deforestation).\n• Illegal poaching and hunting.\n• Pollution and climate change.",
            answerAr: "تدمير الموطن - الصيد الجائر - التلوث وتغير المناخ"
          },
          {
            id: "g12-u6-q2",
            questionEn: "How can we protect endangered species?",
            questionAr: "حماية الأنواع المهددة",
            answerEn: "• Establishing nature reserves.\n• Enforcing strict anti-hunting laws.\n• Breeding programs in zoos.",
            answerAr: "إنشاء محميات - قوانين ضد الصيد - برامج تكاثر"
          },
          {
            id: "g12-u6-q3",
            questionEn: "Significance of the Arfaj plant in Kuwait.",
            questionAr: "أهمية العرفج للكويت",
            answerEn: "• It is the national flower of Kuwait.\n• It helps stabilize the soil.\n• It was a food source for grazing animals.",
            answerAr: "الزهرة الوطنية - تثبيت التربة - طعام للرعي"
          },
          {
            id: "g12-u6-q4",
            questionEn: "Describe the Panda bear.",
            questionAr: "صف الباندا",
            answerEn: "• Native to China.\n• Eats bamboo.\n• Endangered due to habitat loss and low birth rates.",
            answerAr: "موطنها الصين - تأكل الخيزران - مهددة بسبب فقدان الموطن وقلة الولادات"
          },
          {
            id: "g12-u6-q5",
            questionEn: "What is land reclamation?",
            questionAr: "ما هو استصلاح الأراضي؟",
            answerEn: "• It is the process of creating new land from ocean, riverbeds, or lake beds.\n• It provides space for housing or farming.",
            answerAr: "إنشاء أرض جديدة من المحيط أو النهر - يوفر مساحة للسكن أو الزراعة"
          },
          {
            id: "g12-u6-q6",
            questionEn: "Why should we protect plants?",
            questionAr: "لماذا نحمي النباتات؟",
            answerEn: "• They provide oxygen and food.\n• They are used in medicine.\n• They beautify the environment.",
            answerAr: "توفر أكسجين وطعام - تستخدم في الدواء - تجمل البيئة"
          }
        ],
        writingTopics: [
          {
            id: "g12-u6-w1",
            titleEn: "Endangered Species",
            titleAr: "الأنواع المهددة",
            promptEn: "Many animals are under threat of extinction. Discuss the causes of this problem and how we can protect rare species like the Panda or Arfaj.",
            promptAr: "حيوانات كثيرة مهددة بالانقراض. ناقش أسباب هذه المشكلة وكيف نحمي الأنواع النادرة كالباندا أو العرفج.",
            plan: [
              { 
                sectionEn: "Introduction", 
                sectionAr: "المقدمة",
                tasks: [
                  { en: "Biodiversity is crucial.", ar: "التنوع البيولوجي ضروري." },
                  { en: "Thesis: Extinction is a warning sign.", ar: "الأطروحة: الانقراض علامة تحذير." }
                ]
              },
              { 
                sectionEn: "Body 1: Causes", 
                sectionAr: "العرض ١: الأسباب",
                tasks: [
                  { en: "Human expansion.", ar: "التوسع البشري." },
                  { en: "Poaching for fur/ivory.", ar: "الصيد للفراء/العاج." },
                  { en: "Pollution.", ar: "التلوث." }
                ]
              },
              { 
                sectionEn: "Body 2: Protection Methods", 
                sectionAr: "العرض ٢: طرق الحماية",
                tasks: [
                  { en: "Laws and Reserves.", ar: "القوانين والمحميات." },
                  { en: "Awareness.", ar: "الوعي." },
                  { en: "Protecting the Arfaj in Kuwait.", ar: "حماية العرفج في الكويت." }
                ]
              },
              { 
                sectionEn: "Conclusion", 
                sectionAr: "الخاتمة",
                tasks: [
                  { en: "We share the planet.", ar: "نتشارك الكوكب." },
                  { en: "Protect animals to protect ourselves.", ar: "احمِ الحيوانات لتحمي نفسك." }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
