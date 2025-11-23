/**
 * Question Card Component
 * Adapted from Khaled-K-E to use shared UI components and contexts
 */

import React from 'react';
import { Volume2, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { QuestionItem } from '../../types/expert-companion-types';
import { useLanguage } from '../../contexts/LanguageContext';

interface QuestionCardProps {
  q: QuestionItem;
  isLearned: boolean;
  isRevealed: boolean;
  isTranslated: boolean;
  onToggleLearned: (id: string) => void;
  onToggleAnswer: (id: string) => void;
  onToggleTranslation: (id: string) => void;
  onSpeak: (text: string) => void;
}

export const QuestionCard = React.memo(({ 
  q, 
  isLearned, 
  isRevealed, 
  isTranslated, 
  onToggleLearned, 
  onToggleAnswer, 
  onToggleTranslation, 
  onSpeak 
}: QuestionCardProps) => {
  const { isRTL } = useLanguage();

  return (
    <Card 
      className={`group relative transition-all duration-300 overflow-hidden ${
        isLearned 
          ? 'opacity-60 hover:opacity-100 border-green-500/30' 
          : 'border-border hover:border-primary/50 shadow-lg'
      }`}
    >
      {/* Card Header / Question */}
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <h3 className={`text-lg font-semibold leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
              {q.questionEn}
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className={`text-right text-emerald-400/80 font-arabic text-lg leading-relaxed pt-2`} dir="rtl">
                  {q.questionAr}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onToggleTranslation(q.id);
              }}
              className={isTranslated ? 'text-emerald-400 bg-emerald-400/10' : ''}
              title="Translate"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(q.questionEn + ". " + q.answerEn);
              }}
              title="Listen to native pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Answer Section */}
      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-out border-t ${
          isRevealed ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-4">
              <div className="text-foreground/80 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-primary">
                {q.answerEn}
              </div>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="text-right text-emerald-400/80 font-arabic whitespace-pre-line text-lg leading-relaxed pr-4 border-r-2 border-emerald-500/50 pt-2" dir="rtl">
                    {q.answerAr}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 py-3 border-t flex justify-between items-center bg-muted/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleLearned(q.id)}
          className={isLearned ? 'text-green-500 bg-green-500/10' : ''}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {isLearned ? "Learned" : "Mark as Learned"}
        </Button>

        <Button
          variant={isRevealed ? "secondary" : "default"}
          onClick={() => onToggleAnswer(q.id)}
        >
          {isRevealed ? "Hide Answer" : "Show Answer"}
        </Button>
      </div>
      
      {/* Progress Bar Decoration */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 opacity-50" style={{ width: isRevealed ? '100%' : '0%' }} />
    </Card>
  );
});

QuestionCard.displayName = 'QuestionCard';
