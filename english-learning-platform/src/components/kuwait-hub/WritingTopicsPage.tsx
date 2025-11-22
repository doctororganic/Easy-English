/**
 * Writing Topics Page
 * Displays comprehensive writing topics with model answers, tips, and organized by grade and type
 */

import { useState, useEffect } from 'react';
import { FileText, BookOpen, Lightbulb, Users, Clock, Eye, EyeOff, ChevronDown, ChevronUp, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { WritingExerciseComponent } from './WritingExerciseComponent';
import { 
  getWritingTopicsByGrade, 
  getAllWritingGrades, 
  getTotalTopicsByGrade,
  getTopicsByType,
  getTopicById,
  WritingTopic
} from '../../data/writingTopics';

export function WritingTopicsPage() {
  const [selectedGrade, setSelectedGrade] = useState<number>(10);
  const [selectedTopic, setSelectedTopic] = useState<WritingTopic | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  const [currentExercise, setCurrentExercise] = useState<WritingTopic | null>(null);
  const [writingData, setWritingData] = useState<any>(null);

  const availableGrades = getAllWritingGrades();
  const topics = getWritingTopicsByGrade(selectedGrade);

  // Load writing exercises data
  useEffect(() => {
    fetch('/data/writing.json')
      .then(res => res.json())
      .then(data => setWritingData(data))
      .catch(err => console.error('Failed to load writing data:', err));
  }, []);

  const toggleTopicExpansion = (topicId: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const selectTopic = (topic: WritingTopic) => {
    setSelectedTopic(topic);
  };

  const startWriting = (topic: WritingTopic) => {
    setCurrentExercise(topic);
  };

  const backToTopics = () => {
    setCurrentExercise(null);
  };

  const selectGrade = (grade: number) => {
    setSelectedGrade(grade);
    setSelectedTopic(null);
    setCurrentExercise(null);
    setExpandedTopics(new Set());
  };

  const getTypeColor = (type: string) => {
    const colors = {
      argumentative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      descriptive: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      narrative: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      expository: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      persuasive: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  // Grade selection content
  const GradeSelectionContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
          Writing Options
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose your grade level and start writing essays with guided practice
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {availableGrades.map(grade => {
          const totalTopics = getTotalTopicsByGrade(grade);
          
          return (
            <Card 
              key={grade} 
              className={`hover:shadow-lg transition-all cursor-pointer group ${
                selectedGrade === grade ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => selectGrade(grade)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                  selectedGrade === grade 
                    ? 'bg-primary text-white' 
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                }`}>
                  <FileText className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">Grade {grade}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {totalTopics} writing topics available
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Essay Topics
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Model Answers
                  </Badge>
                </div>
                <Button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectGrade(grade);
                  }}
                  className={`w-full transition-colors ${
                    selectedGrade === grade 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'group-hover:bg-primary group-hover:text-white'
                  }`}
                  type="button"
                >
                  {selectedGrade === grade ? 'Selected' : `View Grade ${grade} Topics`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Topics overview content
  const TopicsOverviewContent = () => {
    const argumentatives = getTopicsByType(selectedGrade, 'argumentative');
    const descriptives = getTopicsByType(selectedGrade, 'descriptive');
    const narratives = getTopicsByType(selectedGrade, 'narrative');
    const expositories = getTopicsByType(selectedGrade, 'expository');

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gradient-purple-blue">
              Grade {selectedGrade} Writing Topics
            </h2>
            <p className="text-lg text-muted-foreground mt-1">
              Choose from {topics.length} comprehensive essay topics
            </p>
          </div>
          <Button onClick={() => selectGrade(0)} variant="outline">
            ← Change Grade
          </Button>
        </div>

        {/* Topics by Type */}
        <div className="space-y-6">
          {[
            { type: 'argumentative', title: 'Argumentative Essays', icon: '⚖️', data: argumentatives, color: 'border-red-200' },
            { type: 'descriptive', title: 'Descriptive Essays', icon: '🎨', data: descriptives, color: 'border-blue-200' },
            { type: 'narrative', title: 'Narrative Essays', icon: '📖', data: narratives, color: 'border-green-200' },
            { type: 'expository', title: 'Expository Essays', icon: '📝', data: expositories, color: 'border-purple-200' }
          ].map(({ type, title, icon, data, color }) => (
            data.length > 0 && (
              <Card key={type} className={`border-l-4 ${color}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    {title}
                    <Badge variant="outline">{data.length} topics</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {data.map(topic => (
                      <button
                        key={topic.id}
                        onClick={() => selectTopic(topic)}
                        className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{topic.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {topic.prompt}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Grade {topic.grade}
                              </Badge>
                              {topic.wordCount && (
                                <Badge variant="secondary" className="text-xs">
                                  {topic.wordCount} words
                                </Badge>
                              )}
                            </div>
                            <Button 
                              onClick={() => startWriting(topic)}
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <PenTool className="w-3 h-3" />
                              Write
                            </Button>
                          </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    );
  };

  // Detailed topic view
  const TopicDetailView = () => {
    if (!selectedTopic) return null;

    const isExpanded = expandedTopics.has(selectedTopic.id);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gradient-purple-blue">
              {selectedTopic.title}
            </h2>
            <p className="text-lg text-muted-foreground mt-1">
              Grade {selectedTopic.grade} • {selectedTopic.type} essay
            </p>
          </div>
          <Button onClick={() => {setSelectedTopic(null); setCurrentExercise(null);}} variant="outline">
            ← Back to Topics
          </Button>
        </div>

        {/* Topic Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Writing Prompt */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{selectedTopic.prompt}</p>
              </CardContent>
            </Card>

            {/* Model Answer */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  onClick={() => toggleTopicExpansion(selectedTopic.id)}
                  variant="outline"
                  className="w-full mb-4"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Hide Model Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Model Answer ({selectedTopic.modelAnswer.split(' ').length} words)
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Model Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {selectedTopic.modelAnswer.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Ready to write?</h3>
                    <p className="text-sm text-muted-foreground">
                      Start your essay with autosave, rubric guidance, and download features
                    </p>
                  </div>
                  <Button 
                    onClick={() => startWriting(selectedTopic)}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <PenTool className="w-5 h-5" />
                    Start Writing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Topic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Grade:</span>
                  <Badge>{selectedTopic.grade}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Type:</span>
                  <Badge className={getTypeColor(selectedTopic.type)}>
                    {selectedTopic.type}
                  </Badge>
                </div>
                {selectedTopic.wordCount && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Target Length:</span>
                    <Badge variant="outline">{selectedTopic.wordCount} words</Badge>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Word Count:</span>
                  <Badge variant="outline">
                    {selectedTopic.modelAnswer.split(' ').length} words
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            {selectedTopic.keyPoints && selectedTopic.keyPoints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedTopic.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Writing Tips */}
            {selectedTopic.tips && selectedTopic.tips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Writing Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedTopic.tips.map((tip, index) => (
                      <li key={index} className="p-3 bg-muted rounded-lg text-sm">
                        💡 {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Essay Structure Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Essay Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-1">
                      Introduction
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Hook, background, and thesis statement
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-medium text-sm text-green-900 dark:text-green-100 mb-1">
                      Body Paragraphs
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Topic sentence, evidence, and analysis
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <h4 className="font-medium text-sm text-purple-900 dark:text-purple-100 mb-1">
                      Conclusion
                    </h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Summary and final thoughts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // If currently in writing exercise, show the exercise component
  if (currentExercise) {
    // Convert WritingTopic to WritingExercise format
    const exercise = {
      id: `grade${currentExercise.grade}${currentExercise.id}`,
      title: currentExercise.title,
      grade: currentExercise.grade,
      type: currentExercise.type,
      prompt: currentExercise.prompt,
      key_points: currentExercise.keyPoints || [],
      writing_tips: currentExercise.tips || [],
      time_limit: currentExercise.type === 'narrative' ? 50 : currentExercise.type === 'argumentative' ? 45 : 40,
      difficulty: currentExercise.grade === 10 ? 'basic' : currentExercise.grade === 11 ? 'intermediate' : 'advanced'
    };

    return (
      <div>
        {/* Header */}
        <div className="bg-background p-4 md:p-8 border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button onClick={backToTopics} variant="outline" className="flex items-center gap-2">
              ← Back to Topics
            </Button>
            <h1 className="text-2xl font-bold text-gradient-purple-blue">
              Writing Exercise
            </h1>
            <div /> {/* Spacer for alignment */}
          </div>
        </div>
        <WritingExerciseComponent exercise={exercise} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="grade-selection" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grade-selection">Writing Options</TabsTrigger>
            <TabsTrigger value="topics" disabled={selectedGrade === 0}>
              Writing Practice
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="grade-selection">
            <GradeSelectionContent />
          </TabsContent>
          
          <TabsContent value="topics">
            {selectedGrade === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Please select a grade first</p>
                <Button onClick={() => selectGrade(10)}>
                  Select Grade 10
                </Button>
              </div>
            ) : !selectedTopic ? (
              <TopicsOverviewContent />
            ) : (
              <TopicDetailView />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}