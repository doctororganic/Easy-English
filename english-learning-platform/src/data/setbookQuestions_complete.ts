/**
 * Set-book Questions Data Structure - COMPLETE VERSION
 * Organized by grade level (10, 11, 12) with bilingual questions and answers
 * Source: Set-books.txt with all complete questions
 */

export interface SetbookAnswer {
  english: string;
  arabic: string;
  isSubAnswer?: boolean;
}

export interface SetbookQuestion {
  id: number;
  question_en: string;
  question_ar: string;
  answers: SetbookAnswer[];
  unit: string;
}

export interface SetbookUnit {
  id: string;
  title: string;
  questions: SetbookQuestion[];
}

export interface SetbookGradeData {
  grade: number;
  title: string;
  units: SetbookUnit[];
}

export const setbookData: SetbookGradeData[] = [
];

// Helper functions
export const getSetbookDataByGrade = (grade: number): SetbookGradeData | undefined => {
  return setbookData.find(data => data.grade === grade);
};

export const getAllSetbookGrades = (): number[] => {
  return setbookData.map(data => data.grade);
};

export const getTotalQuestionsByGrade = (grade: number): number => {
  const gradeData = getSetbookDataByGrade(grade);
  if (!gradeData) return 0;
  
  return gradeData.units.reduce((total, unit) => total + unit.questions.length, 0);
};

export const getUnitsByGrade = (grade: number): SetbookUnit[] => {
  const gradeData = getSetbookDataByGrade(grade);
  return gradeData ? gradeData.units : [];
};