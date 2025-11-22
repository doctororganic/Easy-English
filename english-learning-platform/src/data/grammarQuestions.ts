/**
 * Grammar Questions Data Structure
 * Organized by grade level (10, 11, 12) with MCQ format
 */

export interface GrammarQuestion {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  answer: string; // 'A', 'B', 'C', or 'D'
  rule: string;
  quizTitle: string;
  topic: string;
}

export interface GrammarQuiz {
  id: string;
  title: string;
  grade: number;
  topic: string;
  questions: GrammarQuestion[];
}

export const grammarQuestionsData: Record<number, GrammarQuiz[]> = {
  10: [
    {
      id: "grade10-quiz1",
      title: "Past Simple and Past Continuous",
      grade: 10,
      topic: "Past Tenses",
      questions: [
        {
          id: 1,
          question: "We _______ (walk) in the park when it suddenly _______ (start) to rain.",
          options: {
            a: "were walking / started",
            b: "walked / was starting",
            c: "were walking / starting",
            d: "walked / started"
          },
          answer: "A",
          rule: "Past Continuous for the longer action (walking), Past Simple for the interruptive action (started).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 2,
          question: "I _______ (read) a book all evening yesterday.",
          options: {
            a: "was reading",
            b: "read",
            c: "am reading",
            d: "were reading"
          },
          answer: "B",
          rule: "Past Simple for a completed action over a specific past period (all evening yesterday).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 3,
          question: "While she _______ (cook) dinner, the children _______ (do) their homework.",
          options: {
            a: "cooked / did",
            b: "was cooking / were doing",
            c: "is cooking / are doing",
            d: "cooked / were doing"
          },
          answer: "B",
          rule: "Past Continuous in both clauses for two actions happening simultaneously (while).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 4,
          question: "What _______ (you / do) when I _______ (call) you last night?",
          options: {
            a: "did you do / called",
            b: "were you doing / called",
            c: "did you do / was calling",
            d: "are you doing / call"
          },
          answer: "B",
          rule: "Past Continuous for the background action (doing), Past Simple for the shorter action (called).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 5,
          question: "They _______ (not go) to the beach because the weather was too cold.",
          options: {
            a: "wasn't going",
            b: "didn't go",
            c: "weren't going",
            d: "haven't gone"
          },
          answer: "B",
          rule: "Past Simple negative for a completed action in the past.",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 6,
          question: "The electricity _______ (go out) while I _______ (watch) a movie.",
          options: {
            a: "went out / was watching",
            b: "was going out / watched",
            c: "went out / watched",
            d: "goes out / was watching"
          },
          answer: "A",
          rule: "Past Simple for the sudden interruption (went out), Past Continuous for the background action (watching).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 7,
          question: "He _______ (see) his friend at the mall two days ago.",
          options: {
            a: "was seeing",
            b: "saw",
            c: "sees",
            d: "is seeing"
          },
          answer: "B",
          rule: "Past Simple for a specific, completed time (two days ago).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 8,
          question: "At 8 PM last night, I _______ (study) for my English test.",
          options: {
            a: "studied",
            b: "study",
            c: "was studying",
            d: "am studying"
          },
          answer: "C",
          rule: "Past Continuous for an action in progress at a specific past moment (At 8 PM last night).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 9,
          question: "The teacher _______ (enter) the room and the students immediately _______ (stop) talking.",
          options: {
            a: "was entering / were stopping",
            b: "entered / stopped",
            c: "entered / were stopping",
            d: "was entering / stopped"
          },
          answer: "B",
          rule: "Past Simple for two sequenced short actions (entered, stopped).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        },
        {
          id: 10,
          question: "I _______ (sleep) when the fire alarm _______ (ring).",
          options: {
            a: "was sleeping / rang",
            b: "slept / was ringing",
            c: "slept / rang",
            d: "was sleeping / was ringing"
          },
          answer: "A",
          rule: "Past Continuous for the background action (sleeping), Past Simple for the sudden interruption (rang).",
          quizTitle: "Quiz 10.1: Past Simple and Past Continuous",
          topic: "Past Tenses"
        }
      ]
    },
    {
      id: "grade10-quiz2",
      title: "Comparatives and Superlatives",
      grade: 10,
      topic: "Adjectives",
      questions: [
        {
          id: 11,
          question: "My new job is _______ (interesting) than my previous one.",
          options: {
            a: "interestinger",
            b: "more interesting",
            c: "most interesting",
            d: "as interesting"
          },
          answer: "B",
          rule: "Comparative form of long adjectives (more + adjective + than).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 12,
          question: "This is _______ (fast) car in the world.",
          options: {
            a: "the more fast",
            b: "the fastest",
            c: "the most fast",
            d: "faster"
          },
          answer: "B",
          rule: "Superlative form of short adjectives (the + adjective + est).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 13,
          question: "Kuwait City is _______ (hot) in July _______ in March.",
          options: {
            a: "hotest / than",
            b: "as hot / as",
            c: "hotter / than",
            d: "more hot / than"
          },
          answer: "C",
          rule: "Comparative form of short adjectives (adjective + er + than).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 14,
          question: "Learning Arabic is _______ (difficult) than learning English for me.",
          options: {
            a: "difficulter",
            b: "most difficult",
            c: "more difficult",
            d: "much difficult"
          },
          answer: "C",
          rule: "Comparative form of long adjectives (more + adjective + than).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 15,
          question: "He is _______ (good) football player in the team.",
          options: {
            a: "gooder",
            b: "better",
            c: "the best",
            d: "the most good"
          },
          answer: "C",
          rule: "Irregular superlative form of good (the best).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 16,
          question: "I don't think anything is _______ (important) than family.",
          options: {
            a: "more important",
            b: "most important",
            c: "importanter",
            d: "as important"
          },
          answer: "A",
          rule: "Comparative form (more + adjective + than) used for contrast.",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 17,
          question: "The results of the second test were _______ (bad) than the first ones.",
          options: {
            a: "badder",
            b: "the worst",
            c: "worse",
            d: "much bad"
          },
          answer: "C",
          rule: "Irregular comparative form of bad (worse).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 18,
          question: "Climbing that mountain was _______ (exhausting) thing I have ever done.",
          options: {
            a: "more exhausting",
            b: "the most exhausting",
            c: "exhaustingest",
            d: "the most exhausted"
          },
          answer: "B",
          rule: "Superlative form of long adjectives (the most + adjective).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 19,
          question: "My salary is _______ (high) as yours.",
          options: {
            a: "as higher as",
            b: "as high as",
            c: "higher than",
            d: "high as"
          },
          answer: "B",
          rule: "Equality is expressed using as + adjective/adverb + as.",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        },
        {
          id: 20,
          question: "The new library is getting _______ (popular) and _______ (popular).",
          options: {
            a: "popular / popular",
            b: "more popular / more popular",
            c: "most popular / most popular",
            d: "more popular / most popular"
          },
          answer: "B",
          rule: "Used to show gradual change (more and more + adjective).",
          quizTitle: "Quiz 10.2: Comparatives and Superlatives",
          topic: "Adjectives"
        }
      ]
    },
    {
      id: "grade10-quiz3",
      title: "Articles (A, An, The, Ø)",
      grade: 10,
      topic: "Articles",
      questions: [
        {
          id: 21,
          question: "She works as _______ engineer in _______ city center.",
          options: {
            a: "an / the",
            b: "a / the",
            c: "the / a",
            d: "Ø / the"
          },
          answer: "A",
          rule: "An before a vowel sound (engineer); the for a specific location (city center).",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 22,
          question: "We went to _______ cinema to see _______ new movie.",
          options: {
            a: "Ø / a",
            b: "the / a",
            c: "the / the",
            d: "a / a"
          },
          answer: "B",
          rule: "The for common places (cinema); a for the first mention of an unspecified item (new movie).",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 23,
          question: "_______ life is getting more expensive every year.",
          options: {
            a: "The",
            b: "An",
            c: "A",
            d: "Ø"
          },
          answer: "D",
          rule: "Zero article (Ø) for general, abstract nouns (life).",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 24,
          question: "Could you hand me _______ blue pen on the desk?",
          options: {
            a: "a",
            b: "an",
            c: "the",
            d: "Ø"
          },
          answer: "C",
          rule: "The when referring to a specific, unique item visible to the listener (the blue pen).",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 25,
          question: "_______ honest man will always tell the truth.",
          options: {
            a: "A",
            b: "An",
            c: "The",
            d: "Ø"
          },
          answer: "B",
          rule: "An because the word honest starts with a vowel sound /ɒ/.",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 26,
          question: "_______ President of the company gave a speech today.",
          options: {
            a: "A",
            b: "An",
            c: "The",
            d: "Ø"
          },
          answer: "C",
          rule: "The when the title refers to a unique person in context.",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 27,
          question: "They are having _______ dinner at home tonight.",
          options: {
            a: "the",
            b: "a",
            c: "an",
            d: "Ø"
          },
          answer: "D",
          rule: "Zero article (Ø) before meals when speaking generally.",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 28,
          question: "_______ Arabian Gulf is known for its warm waters.",
          options: {
            a: "A",
            b: "An",
            c: "The",
            d: "Ø"
          },
          answer: "C",
          rule: "The is used before the names of gulfs and seas.",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 29,
          question: "I need _______ piece of _______ cake.",
          options: {
            a: "a / the",
            b: "an / a",
            c: "a / Ø",
            d: "Ø / the"
          },
          answer: "C",
          rule: "A is used with piece (countable); zero article (Ø) for the general noun cake.",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        },
        {
          id: 30,
          question: "She usually goes to _______ work by _______ bus.",
          options: {
            a: "the / the",
            b: "Ø / Ø",
            c: "a / Ø",
            d: "the / a"
          },
          answer: "B",
          rule: "Zero article (Ø) for going to work (purpose) and for transport systems (by bus).",
          quizTitle: "Quiz 10.3: Articles (A, An, The, Ø)",
          topic: "Articles"
        }
      ]
    },
    {
      id: "grade10-quiz4",
      title: "Modal Verbs (Can, Could, Should, Must, Might)",
      grade: 10,
      topic: "Modal Verbs",
      questions: [
        {
          id: 31,
          question: "_______ you help me with this heavy box, please?",
          options: {
            a: "Can",
            b: "Must",
            c: "Should",
            d: "Might"
          },
          answer: "A",
          rule: "Can is used for requests in the present.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 32,
          question: "When I was younger, I _______ play the piano very well.",
          options: {
            a: "could",
            b: "can",
            c: "should",
            d: "must"
          },
          answer: "A",
          rule: "Could is used for general ability in the past.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 33,
          question: "You _______ go to the doctor if you feel sick.",
          options: {
            a: "don't have to",
            b: "mustn't",
            c: "couldn't",
            d: "shouldn't"
          },
          answer: "A",
          rule: "Don't have to means absence of obligation.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 34,
          question: "It _______ rain later, so take an umbrella.",
          options: {
            a: "might",
            b: "must",
            c: "should",
            d: "can"
          },
          answer: "A",
          rule: "Might is used to express low certainty (possibility).",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 35,
          question: "You _______ smoke in the hospital; it's forbidden.",
          options: {
            a: "mustn't",
            b: "couldn't",
            c: "don't have to",
            d: "shouldn't"
          },
          answer: "A",
          rule: "Mustn't is used for strong prohibition (Do not do this).",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 36,
          question: "_______ you mind opening the window?",
          options: {
            a: "Do",
            b: "Could",
            c: "Must",
            d: "Should"
          },
          answer: "B",
          rule: "Could is used for a polite request.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 37,
          question: "She _______ speak three languages fluently.",
          options: {
            a: "should",
            b: "can",
            c: "must",
            d: "might"
          },
          answer: "B",
          rule: "Can is used for present ability.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 38,
          question: "You _______ drive so fast; it's dangerous.",
          options: {
            a: "mustn't",
            b: "shouldn't",
            c: "don't have to",
            d: "couldn't"
          },
          answer: "B",
          rule: "Shouldn't is used for negative advice.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 39,
          question: "_______ I bring my camera to the party?",
          options: {
            a: "Must",
            b: "Should",
            c: "Can",
            d: "Might"
          },
          answer: "C",
          rule: "Can is used to ask about possibility or permission.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        },
        {
          id: 40,
          question: "_______ you really want to go to university?",
          options: {
            a: "Must",
            b: "Should",
            c: "Can",
            d: "Might"
          },
          answer: "B",
          rule: "Should is used to ask about necessity or strong recommendation.",
          quizTitle: "Quiz 10.4: Modal Verbs (Can, Could, Should, Must, Might)",
          topic: "Modal Verbs"
        }
      ]
    },
    {
      id: "grade10-quiz5",
      title: "Passive Voice (Simple Tenses)",
      grade: 10,
      topic: "Passive Voice",
      questions: [
        {
          id: 41,
          question: "The car _______ (repair) by the mechanic last week.",
          options: {
            a: "repaired",
            b: "was repaired",
            c: "is repaired",
            d: "has repaired"
          },
          answer: "B",
          rule: "Past Simple Passive: was/were + V3 (car is singular).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 42,
          question: "English _______ (speak) in many countries around the world.",
          options: {
            a: "speaks",
            b: "is spoken",
            c: "spoke",
            d: "was spoken"
          },
          answer: "B",
          rule: "Present Simple Passive: is/are + V3 (English is singular/uncountable).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 43,
          question: "The school gate _______ (lock) every evening at 6 PM.",
          options: {
            a: "locks",
            b: "is locked",
            c: "locked",
            d: "was locked"
          },
          answer: "B",
          rule: "Present Simple Passive for routine actions (gate is singular).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 44,
          question: "The report _______ (write) by the manager yesterday.",
          options: {
            a: "was wrote",
            b: "is written",
            c: "wrote",
            d: "was written"
          },
          answer: "D",
          rule: "Past Simple Passive (was/were + V3 - written is the V3 of write).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 45,
          question: "Thousands of emails _______ (send) every day.",
          options: {
            a: "is sent",
            b: "are sent",
            c: "sends",
            d: "sent"
          },
          answer: "B",
          rule: "Present Simple Passive for routine actions (emails are plural).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 46,
          question: "The children _______ (take) to the zoo by their parents last weekend.",
          options: {
            a: "took",
            b: "were taken",
            c: "are taken",
            d: "take"
          },
          answer: "B",
          rule: "Past Simple Passive (were taken - children are plural).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 47,
          question: "The new library _______ (open) next month. (Passive Future Simple)",
          options: {
            a: "will open",
            b: "is opened",
            c: "will be opened",
            d: "opened"
          },
          answer: "C",
          rule: "Future Simple Passive: will be + V3.",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 48,
          question: "The problem _______ (discuss) at the next board meeting.",
          options: {
            a: "discusses",
            b: "is discussed",
            c: "will be discussed",
            d: "discussed"
          },
          answer: "C",
          rule: "Future Simple Passive: will be + V3.",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 49,
          question: "The novel _______ (publish) in 2024.",
          options: {
            a: "is published",
            b: "was published",
            c: "published",
            d: "has published"
          },
          answer: "B",
          rule: "Past Simple Passive for a specific past date (2024).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        },
        {
          id: 50,
          question: "The crops _______ (water) every morning.",
          options: {
            a: "are watered",
            b: "water",
            c: "is watered",
            d: "were watered"
          },
          answer: "A",
          rule: "Present Simple Passive for routine actions (crops are plural).",
          quizTitle: "Quiz 10.6: Passive Voice (Simple Tenses)",
          topic: "Passive Voice"
        }
      ]
    }
  ],
  11: [
    {
      id: "grade11-quiz1",
      title: "Past Perfect vs. Past Simple",
      grade: 11,
      topic: "Past Tenses",
      questions: [
        {
          id: 51,
          question: "By the time the police arrived, the thief _______ (already / run away).",
          options: {
            a: "already ran away",
            b: "has already run away",
            c: "had already run away",
            d: "was running away"
          },
          answer: "C",
          rule: "Past Perfect (had run away) for the action completed before another past action (arrived).",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 52,
          question: "I couldn't get into the house because I _______ (forget) my key.",
          options: {
            a: "forgot",
            b: "had forgotten",
            c: "have forgotten",
            d: "was forgetting"
          },
          answer: "B",
          rule: "Past Perfect for the reason/cause that happened earlier (forgot the key).",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 53,
          question: "After they _______ (eat) dinner, they went to see a movie.",
          options: {
            a: "ate",
            b: "had eaten",
            c: "have eaten",
            d: "were eating"
          },
          answer: "B",
          rule: "Past Perfect used after after to show the sequence of events.",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 54,
          question: "She _______ (not finish) her project before the deadline arrived.",
          options: {
            a: "hadn't finished",
            b: "didn't finish",
            c: "wasn't finishing",
            d: "hasn't finished"
          },
          answer: "A",
          rule: "Past Perfect for the action incomplete before the deadline.",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 55,
          question: "When he saw the doctor, he _______ (feel) sick for two days.",
          options: {
            a: "felt",
            b: "was feeling",
            c: "had felt",
            d: "has felt"
          },
          answer: "C",
          rule: "Past Perfect used with for to describe duration up to a point in the past.",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 56,
          question: "We _______ (know) each other for five years when we finally got married.",
          options: {
            a: "knew",
            b: "had known",
            c: "have known",
            d: "were knowing"
          },
          answer: "B",
          rule: "Past Perfect used to describe duration up to a point in the past.",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 57,
          question: "She only understood the lesson after the teacher _______ (explain) it three times.",
          options: {
            a: "explained",
            b: "explains",
            c: "had explained",
            d: "was explaining"
          },
          answer: "C",
          rule: "Past Perfect for the action that happened first (the explanation).",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 58,
          question: "I _______ (meet) my old friend while I was walking home.",
          options: {
            a: "had met",
            b: "met",
            c: "was meeting",
            d: "met"
          },
          answer: "D",
          rule: "Past Simple for a single completed action that interrupted or happened during another.",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 59,
          question: "He failed the test because he _______ (not study) hard enough.",
          options: {
            a: "didn't study",
            b: "hadn't studied",
            c: "wasn't studying",
            d: "hasn't studied"
          },
          answer: "B",
          rule: "Past Perfect for the condition/reason that occurred before the result (failing the test).",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        },
        {
          id: 60,
          question: "By 1995, the company _______ (expand) its operations to Europe.",
          options: {
            a: "expanded",
            b: "had expanded",
            c: "was expanding",
            d: "has expanded"
          },
          answer: "B",
          rule: "Past Perfect used with a specific deadline in the past (By 1995).",
          quizTitle: "Quiz 11.1: Past Perfect vs. Past Simple",
          topic: "Past Tenses"
        }
      ]
    },
    {
      id: "grade11-quiz2",
      title: "Conditional Sentences (Types 1 and 2)",
      grade: 11,
      topic: "Conditionals",
      questions: [
        {
          id: 61,
          question: "If I _______ (be) the President, I _______ (reduce) taxes.",
          options: {
            a: "was / will reduce",
            b: "were / would reduce",
            c: "am / would reduce",
            d: "were / will reduce"
          },
          answer: "B",
          rule: "Second Conditional uses were for all persons + would base verb.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 62,
          question: "If you _______ (study) hard, you _______ (pass) the exam.",
          options: {
            a: "study / will pass",
            b: "studied / would pass",
            c: "study / pass",
            d: "studied / will pass"
          },
          answer: "A",
          rule: "First Conditional uses present simple + will future.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 63,
          question: "What _______ you _______ (do) if you _______ (see) a ghost?",
          options: {
            a: "will you do / see",
            b: "would you do / saw",
            c: "do you do / saw",
            d: "would you do / see"
          },
          answer: "B",
          rule: "Second Conditional question: would + subject + base verb + if + past simple.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 64,
          question: "If she _______ (not call) me soon, I _______ (call) her.",
          options: {
            a: "doesn't call / will call",
            b: "didn't call / would call",
            c: "won't call / call",
            d: "doesn't call / call"
          },
          answer: "A",
          rule: "First Conditional with negative: if + doesn't + base verb + will + base verb.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 65,
          question: "If I _______ (know) his number, I _______ (phone) him. (I don't know his number.)",
          options: {
            a: "know / will phone",
            b: "knew / would phone",
            c: "had known / would phone",
            d: "knew / will phone"
          },
          answer: "B",
          rule: "Second Conditional for unreal present situations.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 66,
          question: "He _______ (be) late if he _______ (not hurry) up.",
          options: {
            a: "would be / didn't hurry",
            b: "will be / doesn't hurry",
            c: "would be / doesn't hurry",
            d: "will be / didn't hurry"
          },
          answer: "B",
          rule: "First Conditional for real future possibility.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 67,
          question: "If we _______ (not live) so far from the office, we _______ (walk) there.",
          options: {
            a: "don't live / will walk",
            b: "didn't live / would walk",
            c: "weren't living / would walk",
            d: "hadn't lived / would walk"
          },
          answer: "B",
          rule: "Second Conditional for unreal present situations.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 68,
          question: "I _______ (buy) a new computer if I _______ (have) enough money. (I don't have enough money.)",
          options: {
            a: "will buy / have",
            b: "would buy / had",
            c: "buy / have",
            d: "will buy / had"
          },
          answer: "B",
          rule: "Second Conditional for unreal present situations.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 69,
          question: "Unless you _______ (get) the ticket, you _______ (not be) able to enter.",
          options: {
            a: "get / won't be",
            b: "don't get / will be",
            c: "got / wouldn't be",
            d: "get / wouldn't be"
          },
          answer: "A",
          rule: "Unless means 'if not', so we use affirmative form after unless.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        },
        {
          id: 70,
          question: "If I _______ (see) a puppy, I always _______ (want) to pet it. (Zero Conditional)",
          options: {
            a: "see / want",
            b: "saw / would want",
            c: "see / will want",
            d: "saw / wanted"
          },
          answer: "A",
          rule: "Zero Conditional for general truths and habits: if + present simple + present simple.",
          quizTitle: "Quiz 11.2: Conditional Sentences (Types 1 and 2)",
          topic: "Conditionals"
        }
      ]
    },
    {
      id: "grade11-quiz3",
      title: "Advanced Modals and Structures",
      grade: 11,
      topic: "Advanced Grammar",
      questions: [
        {
          id: 71,
          question: "I wish I _______ more time to study yesterday.",
          options: {
            a: "have",
            b: "had",
            c: "have had",
            d: "had had"
          },
          answer: "B",
          rule: "For wishes about the past, we use 'had + past participle'.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 72,
          question: "She said she _______ (visit) her grandmother the next day.",
          options: {
            a: "will visit",
            b: "would visit",
            c: "visits",
            d: "visited"
          },
          answer: "B",
          rule: "Reported speech: will becomes would when reporting.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 73,
          question: "The students _______ when the teacher entered the classroom.",
          options: {
            a: "talk",
            b: "talks",
            c: "were talking",
            d: "have talked"
          },
          answer: "C",
          rule: "Past continuous describes an action in progress at a specific moment in the past.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 74,
          question: "Neither Ali nor his brothers _______ coming to the party.",
          options: {
            a: "is",
            b: "are",
            c: "was",
            d: "were"
          },
          answer: "B",
          rule: "With 'neither...nor', the verb agrees with the noun closer to it.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 75,
          question: "The movie was _______ boring that I fell asleep.",
          options: {
            a: "so",
            b: "such",
            c: "too",
            d: "very"
          },
          answer: "A",
          rule: "'So' is used before adjectives: so + adjective + that.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 76,
          question: "I would rather you _______ smoking in the house.",
          options: {
            a: "don't",
            b: "didn't",
            c: "won't",
            d: "haven't"
          },
          answer: "B",
          rule: "After 'would rather you', we use past simple for preferences.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 77,
          question: "It's high time we _______ about the environment.",
          options: {
            a: "think",
            b: "thought",
            c: "are thinking",
            d: "have thought"
          },
          answer: "B",
          rule: "After 'it's time/high time', we use past simple.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 78,
          question: "She made me _______ for an hour waiting outside.",
          options: {
            a: "wait",
            b: "to wait",
            c: "waiting",
            d: "waited"
          },
          answer: "A",
          rule: "After 'make + object', we use base form of verb.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 79,
          question: "I'd rather you _______ tell anyone about this.",
          options: {
            a: "don't",
            b: "didn't",
            c: "won't",
            d: "haven't"
          },
          answer: "B",
          rule: "After 'I'd rather you', we use past simple for preferences.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        },
        {
          id: 80,
          question: "The news came as _______ surprise to everyone.",
          options: {
            a: "a",
            b: "an",
            c: "the",
            d: "Ø"
          },
          answer: "A",
          rule: "We use 'a' before 'surprise' as it's countable.",
          quizTitle: "Quiz 11.3: Advanced Modals and Structures",
          topic: "Advanced Grammar"
        }
      ]
    }
  ],
  12: [
    {
      id: "grade12-quiz1",
      title: "Third Conditional (Unreal Past)",
      grade: 12,
      topic: "Conditionals",
      questions: [
        {
          id: 81,
          question: "If I _______ (know) you were ill, I _______ (visit) you.",
          options: {
            a: "had known / would visit",
            b: "knew / would have visited",
            c: "had known / would have visited",
            d: "knew / would visit"
          },
          answer: "C",
          rule: "Third Conditional (If + Past Perfect, would have + V3) for unreal past events.",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 82,
          question: "If the driver _______ (not be) speeding, the accident _______ (not happen).",
          options: {
            a: "wasn't speeding / wouldn't happen",
            b: "hadn't been speeding / wouldn't have happened",
            c: "hadn't been speeding / wouldn't happen",
            d: "wasn't speeding / wouldn't have happened"
          },
          answer: "B",
          rule: "Third Conditional (If + Past Perfect, would have + V3). The negative form is hadn't been.",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 83,
          question: "If she _______ (study) harder, she _______ (pass) the exam.",
          options: {
            a: "studied / would pass",
            b: "had studied / would pass",
            c: "had studied / would have passed",
            d: "studied / would have passed"
          },
          answer: "C",
          rule: "Third Conditional (If + Past Perfect, would have + V3).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 84,
          question: "What _______ (you / do) if you _______ (miss) your flight?",
          options: {
            a: "would you do / missed",
            b: "would you have done / had missed",
            c: "will you do / miss",
            d: "would you have done / missed"
          },
          answer: "B",
          rule: "Third Conditional question form (Would have + V3, if + Past Perfect).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 85,
          question: "They _______ (buy) the tickets if they _______ (not run out) of money.",
          options: {
            a: "would buy / didn't run out",
            b: "would have bought / hadn't run out",
            c: "bought / hadn't run out",
            d: "would have bought / didn't run out"
          },
          answer: "B",
          rule: "Third Conditional (If + Past Perfect, would have + V3). The negative form is hadn't run out.",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 86,
          question: "If it _______ (not rain), we _______ (go) to the beach yesterday.",
          options: {
            a: "didn't rain / would go",
            b: "hadn't rained / would go",
            c: "hadn't rained / would have gone",
            d: "wouldn't have rained / had gone"
          },
          answer: "C",
          rule: "Third Conditional (If + Past Perfect, would have + V3).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 87,
          question: "He _______ (be) happier if he _______ (choose) a different career path.",
          options: {
            a: "would be / chose",
            b: "would have been / had chosen",
            c: "had been / would choose",
            d: "would be / had chosen"
          },
          answer: "B",
          rule: "Third Conditional (If + Past Perfect, would have + V3).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 88,
          question: "If you _______ (tell) me about the party, I _______ (come).",
          options: {
            a: "told / would come",
            b: "had told / would come",
            c: "had told / would have come",
            d: "told / would have come"
          },
          answer: "C",
          rule: "Third Conditional (If + Past Perfect, would have + V3).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 89,
          question: "If she _______ (arrive) on time, she _______ (not miss) the beginning of the play.",
          options: {
            a: "arrived / wouldn't miss",
            b: "had arrived / wouldn't miss",
            c: "had arrived / wouldn't have missed",
            d: "arrived / wouldn't have missed"
          },
          answer: "C",
          rule: "Third Conditional (If + Past Perfect, would have + V3).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        },
        {
          id: 90,
          question: "I _______ (not make) that mistake if I _______ (read) the instructions carefully.",
          options: {
            a: "wouldn't make / read",
            b: "wouldn't have made / had read",
            c: "didn't make / had read",
            d: "wouldn't have made / read"
          },
          answer: "B",
          rule: "Third Conditional (If + Past Perfect, would have + V3).",
          quizTitle: "Quiz 12.1: Third Conditional (Unreal Past)",
          topic: "Conditionals"
        }
      ]
    },
    {
      id: "grade12-quiz2",
      title: "Phrasal Verbs (Advanced)",
      grade: 12,
      topic: "Phrasal Verbs",
      questions: [
        {
          id: 91,
          question: "The company had to _______ the entire project due to lack of funding.",
          options: {
            a: "call off",
            b: "call up",
            c: "call in",
            d: "call out"
          },
          answer: "A",
          rule: "Call off: To cancel something.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 92,
          question: "My grandfather _______ at the age of 92, after a long, healthy life.",
          options: {
            a: "passed out",
            b: "passed over",
            c: "passed on",
            d: "passed by"
          },
          answer: "C",
          rule: "Pass on: To die.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 93,
          question: "I'm trying to _______ a good excuse for being late to the meeting.",
          options: {
            a: "put out",
            b: "make up",
            c: "hold up",
            d: "take up"
          },
          answer: "B",
          rule: "Make up: To invent a story or excuse.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 94,
          question: "Please _______ the lights before you leave the laboratory.",
          options: {
            a: "turn on",
            b: "turn down",
            c: "turn off",
            d: "turn in"
          },
          answer: "C",
          rule: "Turn off: To switch off a machine or light.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 95,
          question: "When the fire alarm rang, everyone _______ of the building immediately.",
          options: {
            a: "ran over",
            b: "ran down",
            c: "ran out",
            d: "ran across"
          },
          answer: "C",
          rule: "Run out: To exit a place quickly.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 96,
          question: "They promised to _______ my complaint within 48 hours.",
          options: {
            a: "look up",
            b: "look into",
            c: "look after",
            d: "look out"
          },
          answer: "B",
          rule: "Look into: To investigate something.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 97,
          question: "I didn't expect him to _______ so much money for that old painting.",
          options: {
            a: "pay back",
            b: "pay for",
            c: "pay out",
            d: "pay up"
          },
          answer: "C",
          rule: "Pay out: To spend or dispense a large sum of money.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 98,
          question: "The negotiations _______ after the two sides couldn't reach an agreement.",
          options: {
            a: "broke off",
            b: "broke down",
            c: "broke up",
            d: "broke in"
          },
          answer: "A",
          rule: "Break off: To stop or end a relationship or discussion suddenly.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 99,
          question: "It took me a long time to _______ the loss of my pet.",
          options: {
            a: "get over",
            b: "get through",
            c: "get by",
            d: "get up"
          },
          answer: "A",
          rule: "Get over: To recover from an illness or a difficult experience.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        },
        {
          id: 100,
          question: "The police are trying to _______ where the stolen goods were hidden.",
          options: {
            a: "work out",
            b: "work up",
            c: "work in",
            d: "work off"
          },
          answer: "A",
          rule: "Work out: To solve a problem or calculate something.",
          quizTitle: "Quiz 12.2: Phrasal Verbs (Advanced)",
          topic: "Phrasal Verbs"
        }
      ]
    },
    {
      id: "grade12-quiz3",
      title: "Reported Speech (Questions and Commands)",
      grade: 12,
      topic: "Reported Speech",
      questions: [
        {
          id: 101,
          question: "Direct: \"Where did you go yesterday?\" he asked me. Reported: He asked me _______ the day before.",
          options: {
            a: "where did I go",
            b: "where I had gone",
            c: "where I went",
            d: "where had I gone"
          },
          answer: "B",
          rule: "Wh-question + S + V. Past Simple (did go) shifts to Past Perfect (had gone). Yesterday shifts to the day before.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 102,
          question: "Direct: \"Do you enjoy teaching?\" she asked. Reported: She asked the teacher _______ teaching.",
          options: {
            a: "did she enjoy",
            b: "if she enjoyed",
            c: "whether did she enjoy",
            d: "if did she enjoy"
          },
          answer: "B",
          rule: "Yes/No question uses if/whether + S + V. Simple Present shifts to Simple Past.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 103,
          question: "Direct: \"Don't touch that button!\" the supervisor ordered. Reported: The supervisor ordered the worker _______ that button.",
          options: {
            a: "not to touch",
            b: "don't touch",
            c: "didn't touch",
            d: "to not touch"
          },
          answer: "A",
          rule: "Negative command uses not + to + V1 (Infinitive).",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 104,
          question: "Direct: \"Will you be ready by noon?\" he questioned. Reported: He questioned if I _______ ready by noon.",
          options: {
            a: "will be",
            b: "would be",
            c: "am",
            d: "had been"
          },
          answer: "B",
          rule: "Will shifts to would.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 105,
          question: "Direct: \"Open your books to page 15,\" the instructor told us. Reported: The instructor told us _______ our books to page 15.",
          options: {
            a: "opening",
            b: "open",
            c: "to open",
            d: "opened"
          },
          answer: "C",
          rule: "Positive command uses to + V1 (Infinitive).",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 106,
          question: "Direct: \"What is your name?\" the policeman inquired. Reported: The policeman inquired what _______ was.",
          options: {
            a: "was my name",
            b: "my name was",
            c: "is my name",
            d: "my name is"
          },
          answer: "B",
          rule: "The structure must be S + V (indirect speech order: my name was). Simple Present shifts to Simple Past.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 107,
          question: "Direct: \"Have you ever traveled abroad?\" she wanted to know. Reported: She wanted to know _______ abroad.",
          options: {
            a: "if I have ever traveled",
            b: "if I had ever traveled",
            c: "if I traveled ever",
            d: "had I ever traveled"
          },
          answer: "B",
          rule: "Present Perfect shifts to Past Perfect.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 108,
          question: "Direct: \"Please wait for me,\" the girl begged. Reported: The girl begged her friend _______ her.",
          options: {
            a: "to wait for",
            b: "wait for",
            c: "waiting for",
            d: "waits for"
          },
          answer: "A",
          rule: "Positive command/request uses to + V1.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 109,
          question: "Direct: \"Why is the door locked?\" he asked them. Reported: He asked them why the door _______.",
          options: {
            a: "was locked",
            b: "is locked",
            c: "had been locked",
            d: "has been locked"
          },
          answer: "A",
          rule: "Simple Present passive shifts to Simple Past passive (is locked → was locked).",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        },
        {
          id: 110,
          question: "Direct: \"Where do you live?\" the interviewer asked. Reported: The interviewer asked me where I _______.",
          options: {
            a: "live",
            b: "lived",
            c: "did live",
            d: "was living"
          },
          answer: "B",
          rule: "Present Simple shifts to Past Simple in reported speech.",
          quizTitle: "Quiz 12.3: Reported Speech (Questions and Commands)",
          topic: "Reported Speech"
        }
      ]
    }
  ]
};

// Helper function to get all questions for a specific grade
export const getQuestionsByGrade = (grade: number): GrammarQuestion[] => {
  const quizzes = grammarQuestionsData[grade] || [];
  return quizzes.flatMap(quiz => quiz.questions);
};

// Helper function to get all quizzes for a specific grade
export const getQuizzesByGrade = (grade: number): GrammarQuiz[] => {
  return grammarQuestionsData[grade] || [];
};

// Helper function to get total question count for a grade
export const getTotalQuestionsByGrade = (grade: number): number => {
  const quizzes = grammarQuestionsData[grade] || [];
  return quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);
};