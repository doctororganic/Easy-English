/**
 * Kuwait English Hub - Home Page
 * Landing page with grade selection and feature overview
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, MessageSquare, Brain, FileText, Languages, Award, Upload, BarChart3, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export function KuwaitHubHome() {
  const [selectedGrade, setSelectedGrade] = useState<number>(10);
  const navigate = useNavigate();



  const features = [
    {
      title: 'Vocabulary Learning',
      description: 'Master English vocabulary with interactive flashcards and voice support',
      icon: BookOpen,
      link: '/vocabulary',
      color: 'text-purple-600'
    },
    {
      title: 'Set-book and Topics Questions',
      description: 'Access comprehensive set-book and topic-based questions',
      icon: MessageSquare,
      link: 'https://j6u2dwumzbdva.ok.kimi.link',
      color: 'text-blue-600',
      external: true
    },
    {
      title: 'Grammar Quiz',
      description: 'Test your grammar knowledge with interactive quizzes',
      icon: Brain,
      link: '/grammar',
      color: 'text-purple-600'
    },
    {
      title: 'Writing Topics',
      description: 'Learn essay writing with model answers and tips',
      icon: FileText,
      link: '/writing',
      color: 'text-blue-600'
    },
    {
      title: 'Functional Language',
      description: 'Master situational phrases and language functions',
      icon: MessageSquare,
      link: '/functional',
      color: 'text-blue-600'
    },
    {
      title: 'Sample Exams',
      description: 'Take full practice exams with automatic scoring',
      icon: Award,
      link: '/exams',
      color: 'text-purple-600'
    },
    {
      title: 'File Upload',
      description: 'Upload PDF files for text extraction and analysis',
      icon: Upload,
      link: '/upload',
      color: 'text-blue-600'
    },
    {
      title: 'Visual Learning',
      description: 'Interactive charts, mind maps, and learning analytics',
      icon: Eye,
      link: '/visuals',
      color: 'text-purple-600'
    },
    {
      title: 'Progress Dashboard',
      description: 'Track your learning progress and achievements',
      icon: BarChart3,
      link: '/progress',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-purple-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Kuwait English Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Comprehensive English Learning Platform for Grades 10, 11 & 12
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[10, 11, 12].map(grade => (
              <Button
                key={grade}
                size="lg"
                variant={selectedGrade === grade ? 'default' : 'outline'}
                className={selectedGrade === grade ? 'bg-white text-primary' : 'border-white text-white hover:bg-white hover:text-primary'}
                onClick={() => setSelectedGrade(grade)}
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Learning Features</h2>
          <p className="text-muted-foreground text-lg">
            Explore our comprehensive learning tools designed for Kuwait curriculum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Vocabulary Learning */}
          <Link to="/vocabulary" className="cursor-pointer">
            <Card className="card-hover h-full">
              <CardHeader>
                <BookOpen className="mb-4 text-purple-600" size={40} />
                <CardTitle className="text-lg">Vocabulary Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Master English vocabulary with interactive flashcards and voice support
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Set-book and Topics Questions */}
          <button 
            onClick={() => window.open('https://j6u2dwumzbdva.ok.kimi.link', '_blank')}
            className="cursor-pointer text-left"
          >
            <Card className="card-hover h-full">
              <CardHeader>
                <MessageSquare className="mb-4 text-blue-600" size={40} />
                <CardTitle className="text-lg">Set-book and Topics Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Access comprehensive set-book and topic-based questions
                </p>
              </CardContent>
            </Card>
          </button>

          {/* Grammar Quiz */}
          <Link to="/grammar" className="cursor-pointer">
            <Card className="card-hover h-full">
              <CardHeader>
                <Brain className="mb-4 text-purple-600" size={40} />
                <CardTitle className="text-lg">Grammar Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Test your grammar knowledge with interactive quizzes
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Writing Topics */}
          <Link to="/writing" className="cursor-pointer">
            <Card className="card-hover h-full">
              <CardHeader>
                <FileText className="mb-4 text-blue-600" size={40} />
                <CardTitle className="text-lg">Writing Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Learn essay writing with model answers and tips
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Vocabulary Words</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-muted-foreground">Practice Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Writing Topics</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">45</div>
              <div className="text-muted-foreground">Functional Language MCQs</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose your grade level and explore our comprehensive English curriculum
          </p>
          <Link to="/vocabulary">
            <Button 
              size="lg" 
              className="text-lg px-8"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
