import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Languages, Download, BookOpen } from 'lucide-react'

interface SetBookPassage {
  id: number
  title: string
  text_en: string
  text_ar: string
  theme: string
  key_vocabulary: string[]
  discussion_questions: string[]
}

// Mock data matching database schema
const mockPassages: SetBookPassage[] = [
  {
    id: 1,
    title: 'Justice and the Law',
    text_en: `The legal system plays a vital role in maintaining order and justice in society. Laws are established to protect citizens' rights and ensure fair treatment for all. In Kuwait, the judicial system is based on principles of equality and fairness, where everyone is entitled to a fair trial and legal representation.

The concept of justice extends beyond the courtroom. It encompasses the protection of individual rights, the prevention of injustice, and the promotion of social welfare. When citizens understand their legal rights and responsibilities, they become more empowered and active participants in their communities.

Legal consultation is an important service that helps people navigate complex legal matters. Whether dealing with property disputes, civil cases, or understanding new regulations, consulting with legal professionals ensures that individuals make informed decisions. The litigation process, while sometimes lengthy, exists to ensure that all parties receive proper consideration and that justice is served fairly.`,
    text_ar: `يلعب النظام القانوني دورًا حيويًا في الحفاظ على النظام والعدالة في المجتمع. يتم وضع القوانين لحماية حقوق المواطنين وضمان المعاملة العادلة للجميع. في الكويت، يقوم النظام القضائي على مبادئ المساواة والإنصاف، حيث يحق لكل فرد الحصول على محاكمة عادلة وتمثيل قانوني.

مفهوم العدالة يمتد إلى ما هو أبعد من قاعة المحكمة. إنه يشمل حماية حقوق الأفراد، ومنع الظلم، وتعزيز الرفاهية الاجتماعية. عندما يفهم المواطنون حقوقهم ومسؤولياتهم القانونية، يصبحون أكثر تمكينًا ومشاركة فعالة في مجتمعاتهم.

الاستشارة القانونية هي خدمة مهمة تساعد الناس على التعامل مع المسائل القانونية المعقدة. سواء كان الأمر يتعلق بنزاعات الملكية أو القضايا المدنية أو فهم اللوائح الجديدة، فإن استشارة المهنيين القانونيين تضمن أن الأفراد يتخذون قرارات مستنيرة. عملية التقاضي، رغم أنها قد تكون طويلة أحيانًا، موجودة لضمان حصول جميع الأطراف على الاعتبار المناسب وتحقيق العدالة بشكل عادل.`,
    theme: 'Legal System and Justice',
    key_vocabulary: ['justice', 'legal system', 'judicial', 'litigation', 'consultation', 'welfare', 'rights'],
    discussion_questions: [
      'What is the importance of having a fair legal system?',
      'How does legal consultation help citizens?',
      'Why is it important to understand your legal rights?',
      'What role does justice play in maintaining social order?'
    ]
  }
]

export function SetBookReading() {
  const navigate = useNavigate()
  const { classNumber, unitNumber } = useParams()
  const [showArabic, setShowArabic] = useState(false)
  const [selectedPassage, setSelectedPassage] = useState(0)
  const [showAnswers, setShowAnswers] = useState(false)

  const passage = mockPassages[selectedPassage]

  const generateAnswers = () => {
    setShowAnswers(true)
  }

  const downloadPassage = () => {
    const content = `Kuwait English Learning Platform - Set Book Reading
Grade ${classNumber || 12} - Unit ${unitNumber || 1}
${'='.repeat(60)}

Title: ${passage.title}
Theme: ${passage.theme}

PASSAGE (English):
${passage.text_en}

${showArabic ? `
PASSAGE (Arabic):
${passage.text_ar}
` : ''}

KEY VOCABULARY:
${passage.key_vocabulary.join(', ')}

DISCUSSION QUESTIONS:
${passage.discussion_questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

${showAnswers ? `
SAMPLE ANSWERS:
1. A fair legal system is important because it ensures equal treatment for all citizens and protects their rights.
2. Legal consultation helps citizens by providing expert guidance on complex legal matters and helping them make informed decisions.
3. Understanding legal rights empowers citizens to participate actively in their communities and protect themselves from injustice.
4. Justice plays a crucial role in maintaining social order by ensuring fairness, preventing abuse, and promoting the welfare of all members of society.
` : ''}

Generated: ${new Date().toLocaleString()}
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `set-book-grade${classNumber || 12}-unit${unitNumber || 1}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/kuwait-classes')}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Back to Classes</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Set Book Reading</h1>
            <p className="text-muted-foreground">Grade {classNumber || 12} - Unit {unitNumber || 1}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowArabic(!showArabic)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Languages className="w-5 h-5" />
              <span className="hidden sm:inline">{showArabic ? 'Hide' : 'Show'} Arabic</span>
            </button>
            <button
              onClick={downloadPassage}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Passage Content */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">{passage.title}</h2>
              <p className="text-sm text-muted-foreground">{passage.theme}</p>
            </div>
          </div>

          {/* English Text */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Passage</h3>
            <div className="prose max-w-none">
              {passage.text_en.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Arabic Translation */}
          {showArabic && (
            <div className="mb-8 p-6 bg-accent/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Translation (Arabic)</h3>
              <div className="prose max-w-none" dir="rtl">
                {passage.text_ar.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Key Vocabulary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Vocabulary</h3>
            <div className="flex flex-wrap gap-2">
              {passage.key_vocabulary.map((word, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Discussion Questions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Discussion Questions</h3>
            <div className="space-y-4">
              {passage.discussion_questions.map((question, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {idx + 1}
                  </span>
                  <p className="text-foreground pt-1">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Answers Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={generateAnswers}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg shadow-lg"
          >
            Generate Sample Answers
          </button>
        </div>

        {/* Sample Answers */}
        {showAnswers && (
          <div className="bg-green-500/10 border-2 border-green-500 rounded-xl p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">Sample Answers</h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-foreground mb-2">1. What is the importance of having a fair legal system?</p>
                <p className="text-foreground pl-6">
                  A fair legal system is important because it ensures equal treatment for all citizens and protects their rights. 
                  It maintains social order and prevents injustice by providing a framework for resolving disputes fairly.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">2. How does legal consultation help citizens?</p>
                <p className="text-foreground pl-6">
                  Legal consultation helps citizens by providing expert guidance on complex legal matters and helping them make informed decisions. 
                  It ensures they understand their rights and obligations under the law.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">3. Why is it important to understand your legal rights?</p>
                <p className="text-foreground pl-6">
                  Understanding legal rights empowers citizens to participate actively in their communities and protect themselves from injustice. 
                  It helps them navigate legal situations confidently and make better decisions.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">4. What role does justice play in maintaining social order?</p>
                <p className="text-foreground pl-6">
                  Justice plays a crucial role in maintaining social order by ensuring fairness, preventing abuse, and promoting the welfare of all members of society. 
                  It creates trust in institutions and encourages law-abiding behavior.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
