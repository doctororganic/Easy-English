/**
 * Kuwait English Hub - Visual Learning Aids
 * 
 * Features:
 * - Interactive vocabulary mind maps
 * - Progress charts and visualizations
 * - Grammar concept diagrams
 * - Study pattern analytics
 * - Interactive learning canvas
 */

import { useState, useEffect } from 'react'
import { 
  Brain, BarChart3, TrendingUp, PieChart, Target,
  BookOpen, Award, Calendar, Zap, Eye
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { GradeLevel } from '../../types/curriculum'

interface ProgressData {
  vocabulary: number
  grammar: number
  setbook: number
  writing: number
  translation: number
  functional: number
  exams: number
}

interface StudySession {
  date: string
  duration: number // in minutes
  topics: string[]
  score?: number
}

export function VisualLearningPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(10)
  const [activeView, setActiveView] = useState<'progress' | 'mindmap' | 'analytics'>('progress')
  const [progressData, setProgressData] = useState<ProgressData>({
    vocabulary: 65,
    grammar: 72,
    setbook: 58,
    writing: 45,
    translation: 68,
    functional: 80,
    exams: 55
  })

  const [studySessions, setStudySessions] = useState<StudySession[]>([
    { date: '2025-11-10', duration: 45, topics: ['Vocabulary', 'Grammar'], score: 85 },
    { date: '2025-11-09', duration: 60, topics: ['Setbook', 'Writing'], score: 78 },
    { date: '2025-11-08', duration: 30, topics: ['Translation'], score: 92 },
    { date: '2025-11-07', duration: 75, topics: ['Functional', 'Exams'], score: 88 },
    { date: '2025-11-06', duration: 50, topics: ['Vocabulary', 'Grammar'], score: 81 }
  ])

  // Load real progress from localStorage
  useEffect(() => {
    // Try to get actual progress from other components
    const vocabProgress = localStorage.getItem('vocabularyProgress')
    const grammarProgress = localStorage.getItem('grammarProgress')
    
    // Update with real data if available
    if (vocabProgress || grammarProgress) {
      setProgressData(prev => ({
        ...prev,
        vocabulary: vocabProgress ? JSON.parse(vocabProgress).completion || prev.vocabulary : prev.vocabulary,
        grammar: grammarProgress ? JSON.parse(grammarProgress).completion || prev.grammar : prev.grammar
      }))
    }
  }, [])

  // Calculate overall progress
  const overallProgress = Math.round(
    Object.values(progressData).reduce((sum, val) => sum + val, 0) / Object.keys(progressData).length
  )

  // Calculate study streak
  const studyStreak = calculateStudyStreak(studySessions)

  function calculateStudyStreak(sessions: StudySession[]): number {
    if (sessions.length === 0) return 0
    
    const sortedDates = sessions
      .map(s => new Date(s.date))
      .sort((a, b) => b.getTime() - a.getTime())
    
    let streak = 1
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const diff = Math.floor((sortedDates[i].getTime() - sortedDates[i + 1].getTime()) / (1000 * 60 * 60 * 24))
      if (diff === 1) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  // Progress Chart Component
  const ProgressChart = () => {
    const maxValue = 100
    const categories = Object.keys(progressData)
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-3xl font-bold">{overallProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-3xl font-bold">{studyStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Award className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-3xl font-bold">
                    {Math.round(studySessions.reduce((sum, s) => sum + (s.score || 0), 0) / studySessions.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const value = progressData[category as keyof ProgressData]
                const percentage = (value / maxValue) * 100
                
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{category}</span>
                      <span className="text-sm text-muted-foreground">{value}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-purple-blue transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Radial Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Completion Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => {
                const value = progressData[category as keyof ProgressData]
                return (
                  <div key={category} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted opacity-20"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{value}%</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium capitalize">{category}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mind Map Component
  const MindMap = () => {
    const topics = [
      { name: 'Vocabulary', subtopics: ['Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5', 'Box 6'] },
      { name: 'Grammar', subtopics: ['Tenses', 'Conditionals', 'Passive', 'Reported Speech'] },
      { name: 'Writing', subtopics: ['Essays', 'Letters', 'Reports', 'Articles'] },
      { name: 'Reading', subtopics: ['Comprehension', 'Setbook', 'Analysis'] }
    ]

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Grade {selectedGrade} Curriculum Mind Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-[600px] bg-muted/30 rounded-lg p-8 overflow-hidden">
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-32 h-32 bg-gradient-purple-blue rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center text-white">
                    <BookOpen className="w-8 h-8 mx-auto mb-1" />
                    <span className="font-bold text-sm">Grade {selectedGrade}</span>
                  </div>
                </div>
              </div>

              {/* Topic Nodes */}
              {topics.map((topic, index) => {
                const angle = (index / topics.length) * 2 * Math.PI - Math.PI / 2
                const radius = 200
                const x = Math.cos(angle) * radius + 300
                const y = Math.sin(angle) * radius + 300

                return (
                  <div key={topic.name}>
                    {/* Connection Line */}
                    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                      <line
                        x1="300"
                        y1="300"
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-purple-500/30"
                      />
                    </svg>

                    {/* Topic Node */}
                    <div
                      className="absolute z-20"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="bg-card border-2 border-primary rounded-lg p-4 shadow-lg min-w-[140px]">
                        <h4 className="font-bold text-center mb-2">{topic.name}</h4>
                        <div className="space-y-1">
                          {topic.subtopics.map((sub, subIndex) => (
                            <div
                              key={subIndex}
                              className="text-xs text-muted-foreground text-center py-1 px-2 bg-muted rounded"
                            >
                              {sub}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Path Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: 'Foundation', topics: ['Vocabulary Basics', 'Grammar Rules'], status: 'complete' },
                { stage: 'Intermediate', topics: ['Setbook Reading', 'Writing Skills'], status: 'in-progress' },
                { stage: 'Advanced', topics: ['Translation', 'Functional Language'], status: 'locked' },
                { stage: 'Mastery', topics: ['Sample Exams', 'Comprehensive Review'], status: 'locked' }
              ].map((level, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold
                      ${level.status === 'complete'
                        ? 'bg-green-500 text-white'
                        : level.status === 'in-progress'
                        ? 'bg-gradient-purple-blue text-white'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{level.stage}</h4>
                    <p className="text-sm text-muted-foreground">{level.topics.join(' • ')}</p>
                  </div>
                  <Badge variant={level.status === 'complete' ? 'default' : 'outline'}>
                    {level.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Analytics Component
  const Analytics = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Study Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studySessions.map((session, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex-shrink-0 w-16 text-center">
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">
                      {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {session.topics.map((topic, i) => (
                        <Badge key={i} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{session.duration} minutes</span>
                      {session.score && (
                        <span className="font-medium text-foreground">Score: {session.score}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { topic: 'Vocabulary', time: 180, color: 'bg-purple-500' },
                  { topic: 'Grammar', time: 150, color: 'bg-blue-500' },
                  { topic: 'Writing', time: 120, color: 'bg-green-500' },
                  { topic: 'Translation', time: 90, color: 'bg-orange-500' },
                  { topic: 'Exams', time: 75, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.topic}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.topic}</span>
                      <span className="text-sm text-muted-foreground">{item.time} min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${(item.time / 180) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-700 dark:text-green-400">Improving</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Functional Language, Grammar
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +12% increase in last 7 days
                  </p>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-700 dark:text-yellow-400">Needs Attention</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Writing, Setbook Questions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Below 60% completion rate
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-blue-700 dark:text-blue-400">Recommended Focus</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Translation Exercises
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Complete 5 more exercises to reach target
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
            Visual Learning Aids
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive charts, mind maps, and analytics to track your learning journey
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant={activeView === 'progress' ? 'default' : 'outline'}
              onClick={() => setActiveView('progress')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Progress Charts
            </Button>
            <Button
              variant={activeView === 'mindmap' ? 'default' : 'outline'}
              onClick={() => setActiveView('mindmap')}
            >
              <Brain className="w-4 h-4 mr-2" />
              Mind Maps
            </Button>
            <Button
              variant={activeView === 'analytics' ? 'default' : 'outline'}
              onClick={() => setActiveView('analytics')}
            >
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>

          <div className="w-48">
            <Select
              value={selectedGrade.toString()}
              onValueChange={(value) => setSelectedGrade(parseInt(value) as GradeLevel)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        {activeView === 'progress' && <ProgressChart />}
        {activeView === 'mindmap' && <MindMap />}
        {activeView === 'analytics' && <Analytics />}
      </div>
    </div>
  )
}
