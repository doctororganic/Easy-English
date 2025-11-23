/**
 * Writing Topic Card Component
 * Adapted from Khaled-K-E to use shared UI components and contexts
 */

import React from 'react';
import { Volume2, Globe, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { WritingTopic } from '../../types/expert-companion-types';
import { useLanguage } from '../../contexts/LanguageContext';

interface WritingTopicCardProps {
  topic: WritingTopic;
  isTranslated: boolean;
  onToggleTranslation: (id: string) => void;
  onSpeak: (text: string) => void;
}

export const WritingTopicCard = React.memo(({ 
  topic, 
  isTranslated, 
  onToggleTranslation, 
  onSpeak 
}: WritingTopicCardProps) => {
  const { isRTL } = useLanguage();

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-all duration-300 group shadow-lg">
      <CardHeader className="space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Badge variant="secondary" className="uppercase text-xs">
                Writing Topic
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {topic.titleEn}
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <h3 className="text-xl font-bold text-emerald-400/90 font-arabic text-right pt-1" dir="rtl">
                  {topic.titleAr}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onToggleTranslation(topic.id);
              }}
              className={isTranslated ? 'text-emerald-400 bg-emerald-400/10' : ''}
              title="Translate"
            >
              <Globe className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSpeak(topic.promptEn)}
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-6 border relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500/50 to-blue-500/50 rounded-l-xl"></div>
          <p className="text-foreground/80 leading-relaxed text-lg font-light pl-2">
            {topic.promptEn}
          </p>
          <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <p className="text-right text-emerald-400/80 font-arabic text-lg leading-relaxed pt-4 pr-2 border-t mt-4" dir="rtl">
                {topic.promptAr}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center space-x-2 border-b pb-2">
            <Languages className="w-4 h-4 text-primary" />
            <span>Plan & Outline</span>
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {topic.plan.map((section, idx) => (
              <div key={idx} className="rounded-lg bg-muted/30 border p-4 hover:bg-muted/50 transition-colors">
                <div className="mb-3 flex flex-col gap-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/20">
                      {idx + 1}
                    </div>
                    <h5 className="text-primary font-semibold text-sm">{section.sectionEn}</h5>
                  </div>
                  {isTranslated && (
                    <h5 className="text-emerald-400/80 font-arabic text-sm font-semibold text-right pr-8" dir="rtl">
                      {section.sectionAr}
                    </h5>
                  )}
                </div>
                <div className="space-y-3 pl-8">
                  {section.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex flex-col gap-1">
                      <div className="flex gap-2 items-start">
                        <span className="text-muted-foreground mt-1.5">•</span>
                        <p className="text-foreground/70 text-sm">{task.en}</p>
                      </div>
                      {isTranslated && (
                        <p className="text-emerald-500/60 text-sm font-arabic text-right pr-4" dir="rtl">
                          {task.ar}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
});

WritingTopicCard.displayName = 'WritingTopicCard';
