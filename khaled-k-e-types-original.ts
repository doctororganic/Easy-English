
export interface QuestionItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string; // Can be bullet points joined by newline
  answerAr: string;
}

export interface TaskItem {
  en: string;
  ar: string;
}

export interface PlanSection {
  sectionEn: string;
  sectionAr: string;
  tasks: TaskItem[];
}

export interface WritingTopic {
  id: string;
  titleEn: string;
  titleAr: string;
  promptEn: string;
  promptAr: string;
  plan: PlanSection[];
}

export interface UnitData {
  unitNumber: number;
  title: string;
  questions: QuestionItem[];
  writingTopics: WritingTopic[];
}

export interface GradeData {
  grade: number;
  units: UnitData[];
}

export enum TabType {
  SET_BOOK = 'SET_BOOK',
  WRITING = 'WRITING'
}
