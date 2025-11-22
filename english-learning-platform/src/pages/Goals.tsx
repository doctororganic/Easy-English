import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Save, Trash2, CheckCircle } from 'lucide-react'

interface Goal {
  number: number
  text: string
  status: 'active' | 'completed'
}

export function Goals() {
  const navigate = useNavigate()
  const [goals, setGoals] = useState<Goal[]>([
    { number: 1, text: '', status: 'active' },
    { number: 2, text: '', status: 'active' },
    { number: 3, text: '', status: 'active' },
    { number: 4, text: '', status: 'active' },
    { number: 5, text: '', status: 'active' }
  ])
  const [saved, setSaved] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('user-goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const handleGoalChange = (number: number, text: string) => {
    setGoals(goals.map(goal =>
      goal.number === number ? { ...goal, text } : goal
    ))
    setSaved(false)
  }

  const toggleGoalStatus = (number: number) => {
    setGoals(goals.map(goal =>
      goal.number === number
        ? { ...goal, status: goal.status === 'active' ? 'completed' : 'active' }
        : goal
    ))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('user-goals', JSON.stringify(goals))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all goals?')) {
      const emptyGoals = goals.map(g => ({ ...g, text: '', status: 'active' as const }))
      setGoals(emptyGoals)
      localStorage.removeItem('user-goals')
      setSaved(false)
    }
  }

  const handleDownload = () => {
    const content = goals
      .filter(g => g.text.trim())
      .map(g => `Goal ${g.number}: ${g.text} [${g.status === 'completed' ? '✓ Completed' : 'Active'}]`)
      .join('\n\n')

    const blob = new Blob([
      `Kuwait English Learning Platform - My Goals\n`,
      `Generated: ${new Date().toLocaleDateString()}\n`,
      `${'='.repeat(50)}\n\n`,
      content || 'No goals set yet.'
    ], { type: 'text/plain' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `my-goals-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Back to Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">My Learning Goals</h1>
            <p className="text-muted-foreground">Set and track your English learning objectives</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="space-y-6 mb-8">
          {goals.map((goal) => (
            <div
              key={goal.number}
              className={`bg-card border-2 rounded-xl p-6 transition-all ${
                goal.status === 'completed'
                  ? 'border-green-500 bg-green-500/5'
                  : 'border-border hover:border-primary'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    {goal.number}
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Goal {goal.number}
                  </label>
                  <textarea
                    value={goal.text}
                    onChange={(e) => handleGoalChange(goal.number, e.target.value)}
                    placeholder="Enter your learning goal here..."
                    className={`w-full p-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                      goal.status === 'completed' ? 'line-through opacity-75' : ''
                    }`}
                    rows={3}
                  />
                </div>

                <button
                  onClick={() => toggleGoalStatus(goal.number)}
                  className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                    goal.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                  title={goal.status === 'completed' ? 'Mark as active' : 'Mark as completed'}
                >
                  <CheckCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Trash2 className="w-5 h-5" />
            Clear All Goals
          </button>

          <div className="flex items-center gap-4">
            {saved && (
              <span className="text-green-600 font-medium animate-fade-in">
                Goals saved successfully!
              </span>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              <Save className="w-5 h-5" />
              Save Goals
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-accent/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Tips for Setting Effective Goals</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Be specific: Instead of "improve English", write "master 50 vocabulary words from Unit 1"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Set measurable targets: Include numbers or deadlines to track progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Make them achievable: Start with realistic goals and increase difficulty gradually</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Review regularly: Check your goals weekly and mark completed ones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Download your goals to keep them handy and stay motivated</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
