/**
 * Progress Dashboard
 * Visual progress tracking across all learning sections
 */

import { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Brain, FileText, Languages, Award, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface ProgressStats {
  vocabularyMastered: number;
  vocabularyTotal: number;
  setbookCompleted: number;
  setbookTotal: number;
  grammarScore: number;
  grammarAttempted: number;
  writingTopicsViewed: number;
  writingTopicsTotal: number;
  translationsCompleted: number;
  translationsTotal: number;
  functionalCompleted: number;
  functionalTotal: number;
}

export function ProgressDashboardPage() {
  const [stats, setStats] = useState<ProgressStats>({
    vocabularyMastered: 245,
    vocabularyTotal: 1000,
    setbookCompleted: 38,
    setbookTotal: 150,
    grammarScore: 85,
    grammarAttempted: 45,
    writingTopicsViewed: 12,
    writingTopicsTotal: 100,
    translationsCompleted: 28,
    translationsTotal: 80,
    functionalCompleted: 32,
    functionalTotal: 45
  });

  const [selectedGrade, setSelectedGrade] = useState<10 | 11 | 12>(10);

  const overallProgress = Math.round(
    ((stats.vocabularyMastered / stats.vocabularyTotal) * 20 +
    (stats.setbookCompleted / stats.setbookTotal) * 20 +
    (stats.grammarScore / 100) * 20 +
    (stats.writingTopicsViewed / stats.writingTopicsTotal) * 15 +
    (stats.translationsCompleted / stats.translationsTotal) * 15 +
    (stats.functionalCompleted / stats.functionalTotal) * 10)
  );

  const modules = [
    {
      name: 'Vocabulary Learning',
      icon: BookOpen,
      progress: (stats.vocabularyMastered / stats.vocabularyTotal) * 100,
      completed: stats.vocabularyMastered,
      total: stats.vocabularyTotal,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-950'
    },
    {
      name: 'Setbook Questions',
      icon: Brain,
      progress: (stats.setbookCompleted / stats.setbookTotal) * 100,
      completed: stats.setbookCompleted,
      total: stats.setbookTotal,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-950'
    },
    {
      name: 'Grammar Quiz',
      icon: Target,
      progress: stats.grammarScore,
      completed: stats.grammarAttempted,
      total: 100,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-950',
      displayText: `${stats.grammarScore}% average score`
    },
    {
      name: 'Writing Topics',
      icon: FileText,
      progress: (stats.writingTopicsViewed / stats.writingTopicsTotal) * 100,
      completed: stats.writingTopicsViewed,
      total: stats.writingTopicsTotal,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-950'
    },
    {
      name: 'Translation Exercises',
      icon: Languages,
      progress: (stats.translationsCompleted / stats.translationsTotal) * 100,
      completed: stats.translationsCompleted,
      total: stats.translationsTotal,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-950'
    },
    {
      name: 'Functional Language',
      icon: Award,
      progress: (stats.functionalCompleted / stats.functionalTotal) * 100,
      completed: stats.functionalCompleted,
      total: stats.functionalTotal,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-950'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Completed first vocabulary unit', unlocked: true },
    { name: 'Grammar Master', description: 'Achieved 90%+ on grammar quiz', unlocked: true },
    { name: 'Dedicated Learner', description: 'Studied for 7 days in a row', unlocked: false },
    { name: 'Translation Pro', description: 'Completed 50 translations', unlocked: false },
    { name: 'Vocabulary Champion', description: 'Mastered 500 words', unlocked: false },
    { name: 'Perfect Score', description: 'Got 100% on any quiz', unlocked: true }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient-purple-blue">
            Progress Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey across all modules
          </p>
        </div>

        {/* Overall Progress Card */}
        <Card className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Overall Progress</CardTitle>
                <p className="text-muted-foreground">Grade {selectedGrade}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-primary">{overallProgress}%</div>
                <p className="text-sm text-muted-foreground mt-1">Complete</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-4" />
          </CardContent>
        </Card>

        {/* Module Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map((module, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <module.icon className={module.color} size={32} />
                  <Badge variant="secondary">
                    {Math.round(module.progress)}%
                  </Badge>
                </div>
                <CardTitle className="text-lg">{module.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={module.progress} className="mb-3" />
                <p className="text-sm text-muted-foreground">
                  {module.displayText || `${module.completed} / ${module.total} completed`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-primary" size={24} />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.unlocked
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-muted opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {achievement.unlocked ? (
                      <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={24} />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-border flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-semibold mb-1">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const activity = [60, 45, 80, 55, 90, 0, 30][index];
                return (
                  <div key={day} className="text-center">
                    <div
                      className={`h-24 rounded-lg mb-2 ${
                        activity > 0 ? 'bg-primary' : 'bg-muted'
                      }`}
                      style={{ opacity: activity / 100 || 0.3 }}
                    />
                    <p className="text-xs text-muted-foreground">{day}</p>
                    <p className="text-xs font-semibold">{activity}min</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">245</div>
              <p className="text-sm text-muted-foreground">Words Mastered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">38</div>
              <p className="text-sm text-muted-foreground">Questions Answered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-sm text-muted-foreground">Avg Grammar Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">14</div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
