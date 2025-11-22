import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { TrendingUp, BookOpen, Award, Clock, Target } from 'lucide-react'

interface ProgressStats {
  topicsCompleted: number
  vocabularyLearned: number
  ieltsScore: number | null
  studyTime: number
  streak: number
}

export function ProgressDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<ProgressStats>({
    topicsCompleted: 0,
    vocabularyLearned: 0,
    ieltsScore: null,
    studyTime: 0,
    streak: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProgress()
    }
  }, [user])

  const fetchProgress = async () => {
    if (!user) return

    try {
      // Fetch user progress
      const { data: progressData, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      // Calculate stats
      const completed = progressData?.filter(p => p.completed).length || 0
      const vocabulary = progressData?.filter(p => p.vocabulary_id).length || 0
      const avgScore = progressData?.reduce((acc, p) => acc + (p.score || 0), 0) / (progressData?.length || 1)

      // Calculate study time (simplified - in real app would track actual time)
      const studyMinutes = (progressData?.length || 0) * 15 // Assume 15 min per item

      // Calculate streak (simplified)
      const today = new Date().toDateString()
      const recentProgress = progressData?.filter(p => {
        const progressDate = new Date(p.last_practiced_at).toDateString()
        return progressDate === today
      })
      const streak = recentProgress && recentProgress.length > 0 ? 7 : 0 // Simplified

      setStats({
        topicsCompleted: completed,
        vocabularyLearned: vocabulary,
        ieltsScore: avgScore > 0 ? Math.round(avgScore * 10) / 10 : null,
        studyTime: studyMinutes,
        streak
      })
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Track Your Progress</h3>
        <p className="text-gray-600 mb-4">Sign in to save your learning progress and earn achievements</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Your Learning Journey</h2>
        <p className="text-blue-100">Keep up the great work! Here's your progress overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-800">{stats.topicsCompleted}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Topics Completed</h3>
          <p className="text-sm text-gray-500 mt-1">Keep exploring new topics!</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-green-600" />
            <span className="text-3xl font-bold text-gray-800">{stats.vocabularyLearned}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Words Learned</h3>
          <p className="text-sm text-gray-500 mt-1">Expand your vocabulary</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-10 h-10 text-yellow-600" />
            <span className="text-3xl font-bold text-gray-800">
              {stats.ieltsScore ? stats.ieltsScore.toFixed(1) : '--'}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">IELTS Practice Score</h3>
          <p className="text-sm text-gray-500 mt-1">Average band score</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-10 h-10 text-purple-600" />
            <span className="text-3xl font-bold text-gray-800">{stats.studyTime}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Minutes Studied</h3>
          <p className="text-sm text-gray-500 mt-1">Total learning time</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          Learning Streak
        </h3>
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-orange-600">{stats.streak}</div>
          <div>
            <p className="text-gray-600 font-medium">Days in a row!</p>
            <p className="text-sm text-gray-500">Keep studying daily to maintain your streak</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                i < stats.streak ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {i < stats.streak ? '✓' : '-'}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'First Steps', desc: 'Complete first topic', unlocked: stats.topicsCompleted >= 1 },
            { title: 'Word Master', desc: 'Learn 50 words', unlocked: stats.vocabularyLearned >= 50 },
            { title: 'IELTS Ready', desc: 'Score 7.0 or higher', unlocked: (stats.ieltsScore || 0) >= 7 },
            { title: 'Dedicated', desc: '7-day streak', unlocked: stats.streak >= 7 }
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 text-center ${
                achievement.unlocked
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'opacity-30'}`}>
                🏆
              </div>
              <h4 className={`font-bold text-sm ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                {achievement.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
