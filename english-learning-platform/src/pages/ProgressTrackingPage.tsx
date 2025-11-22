import { ProgressDashboard } from '../components/ProgressDashboard'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function ProgressTrackingPage() {
  const navigate = useNavigate()

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
          
          <h1 className="text-4xl font-bold text-foreground mb-2">Progress Tracking</h1>
          <p className="text-muted-foreground text-lg">View your learning analytics and achievements</p>
        </div>

        {/* Progress Dashboard Component */}
        <ProgressDashboard />
      </div>
    </div>
  )
}
