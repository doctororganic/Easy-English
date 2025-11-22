import { IELTSPracticeModule } from '../components/IELTSPracticeModule'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export function IELTSPracticePage() {
  const navigate = useNavigate()
  const [section, setSection] = useState<'speaking' | 'writing' | 'reading' | 'listening'>('speaking')

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Back to Home</span>
          </button>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">IELTS Practice</h1>
          <p className="text-muted-foreground text-lg">Comprehensive IELTS preparation modules</p>
        </div>

        {/* Section Selector */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {(['speaking', 'writing', 'reading', 'listening'] as const).map((sectionName) => (
            <button
              key={sectionName}
              onClick={() => setSection(sectionName)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize ${
                section === sectionName
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
              }`}
            >
              {sectionName}
            </button>
          ))}
        </div>

        {/* IELTS Practice Module Component */}
        <IELTSPracticeModule section={section} />
      </div>
    </div>
  )
}
