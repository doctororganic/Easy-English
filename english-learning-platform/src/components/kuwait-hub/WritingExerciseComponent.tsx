/**
 * Writing Exercise Component
 * Provides a functional writing interface with autosave, rubric, and download features
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Save, 
  Download, 
  Clock, 
  FileText, 
  Target, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Lightbulb,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface WritingExercise {
  id: string;
  title: string;
  grade: number;
  type: string;
  prompt: string;
  key_points: string[];
  writing_tips: string[];
  time_limit: number;
  difficulty: string;
}

interface WritingData {
  templates: any;
  rubrics: any;
  exercises: WritingExercise[];
}

export function WritingExerciseComponent({ exercise }: { exercise: WritingExercise }) {
  const [content, setContent] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRubric, setShowRubric] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [writingData, setWritingData] = useState<WritingData | null>(null);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load writing data
  useEffect(() => {
    fetch('/data/writing.json')
      .then(res => res.json())
      .then(data => setWritingData(data))
      .catch(err => console.error('Failed to load writing data:', err));
  }, []);

  // Load saved content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem(`writing_${exercise.id}`);
    const savedStartTime = localStorage.getItem(`writing_start_${exercise.id}`);
    if (savedContent) {
      setContent(savedContent);
    }
    if (savedStartTime) {
      setStartTime(new Date(savedStartTime));
    } else {
      setStartTime(new Date());
    }
  }, [exercise.id]);

  // Save content to localStorage
  useEffect(() => {
    if (content) {
      localStorage.setItem(`writing_${exercise.id}`, content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [content, exercise.id]);

  // Save start time
  useEffect(() => {
    if (startTime) {
      localStorage.setItem(`writing_start_${exercise.id}`, startTime.toISOString());
    }
  }, [startTime, exercise.id]);

  // Timer
  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Update word count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadPDF = async () => {
    if (!content.trim()) {
      alert('Please write your essay before downloading.');
      return;
    }

    try {
      // Dynamically import jsPDF to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - (2 * margin);
      
      // Title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(exercise.title, maxWidth);
      doc.text(titleLines, margin, 30);
      
      // Exercise info
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Grade: ${exercise.grade} | Type: ${exercise.type} | Difficulty: ${exercise.difficulty}`, margin, 45);
      
      // Writing prompt
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Writing Prompt:', margin, 60);
      doc.setFont('helvetica', 'normal');
      const promptLines = doc.splitTextToSize(exercise.prompt, maxWidth);
      doc.text(promptLines, margin, 70);
      
      // Word count
      doc.text(`Word Count: ${wordCount} words`, margin, 80);
      doc.text(`Time Spent: ${formatTime(elapsedTime)}`, margin, 90);
      
      // Essay content
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Essay:', margin, 110);
      doc.setFont('helvetica', 'normal');
      
      // Split essay content into lines that fit the page
      const essayLines = doc.splitTextToSize(content, maxWidth);
      let yPosition = 120;
      
      essayLines.forEach((line: string) => {
        if (yPosition > 270) { // Check if we need a new page
          doc.addPage();
          yPosition = 30;
        }
        doc.text(line, margin, yPosition);
        yPosition += 7; // Line spacing
      });
      
      // Footer with date
      const date = new Date().toLocaleDateString();
      doc.setFontSize(8);
      doc.text(`Generated on ${date}`, margin, 285);
      
      // Save the PDF
      const fileName = `${exercise.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      
      // Fallback to text download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exercise.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your essay? This action cannot be undone.')) {
      setContent('');
      setStartTime(new Date());
      localStorage.removeItem(`writing_${exercise.id}`);
      localStorage.removeItem(`writing_start_${exercise.id}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTemplateStructure = () => {
    if (!writingData || !writingData.templates[exercise.type]) return null;
    return writingData.templates[exercise.type];
  };

  const templateStructure = getTemplateStructure();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-purple-blue mb-2">
              {exercise.title}
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline">Grade {exercise.grade}</Badge>
              <Badge className={getDifficultyColor(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
              <Badge variant="secondary">{exercise.type}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              disabled={!content.trim()}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatTime(elapsedTime)} / {exercise.time_limit}:00
                  </span>
                  <Progress 
                    value={(elapsedTime / (exercise.time_limit * 60)) * 100} 
                    className="w-24 h-2" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{wordCount} words</span>
                </div>
                {saved && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Saved</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowRubric(!showRubric)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {showRubric ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Rubric
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Writing Prompt */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Writing Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{exercise.prompt}</p>
              </CardContent>
            </Card>

            {/* Essay Textarea */}
            <Card>
              <CardHeader>
                <CardTitle>Your Essay</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your essay here..."
                  className="min-h-[400px] text-base leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Essay Structure Guide */}
            {templateStructure && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Essay Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {Object.entries(templateStructure.structure).map(([key, value], index) => (
                      <div key={key} className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm mb-1 capitalize">
                          {key.replace('_', ' ')}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {value as string}
                        </p>
                      </div>
                    ))}
                  </div>
                  {templateStructure.word_count && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-1">
                        Word Count Target
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Minimum: {templateStructure.word_count.minimum} words
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Recommended: {templateStructure.word_count.recommended} words
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Key Points to Include
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exercise.key_points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Collapsible open={showTips} onOpenChange={setShowTips}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  {showTips ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Writing Tips
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Writing Tips
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Writing Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {exercise.writing_tips.map((tip, index) => (
                        <li key={index} className="p-3 bg-muted rounded-lg text-sm">
                          💡 {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* Rubric */}
            {showRubric && writingData && writingData.rubrics && (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Rubric</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(writingData.rubrics).map(([category, rubric]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm capitalize">
                        {category.replace('_', ' ')}
                      </h4>
                      <div className="space-y-1">
                        {Object.entries(rubric as any).map(([level, details]) => (
                          <div key={level} className="p-2 bg-muted rounded text-xs">
                            <span className="font-medium">{(details as any).score}:</span> {(details as any).description}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}