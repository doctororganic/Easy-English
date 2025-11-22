#!/usr/bin/env python3
"""
Complete Setbook Data Generator
Parses Set-books.txt and generates complete TypeScript data
"""

import re

def parse_setbook_content():
    """Parse Set-books.txt and extract all questions"""
    
    with open('/workspace/user_input_files/Set-books.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Initialize data structure
    data = {
        10: [],  # Grade 10
        11: [],  # Grade 11  
        12: []   # Grade 12
    }
    
    # Parse Grade 10 content
    grade_10_match = re.search(r'---\s*Grade 10(.*?)---\s*Grade 11', content, re.DOTALL)
    if grade_10_match:
        grade_10_content = grade_10_match.group(1)
        
        # Extract Unit 1
        unit1_match = re.search(r'### \*\*Unit 1\*\*(.*?)(?=###|\Z)', grade_10_content, re.DOTALL)
        if unit1_match:
            unit1_content = unit1_match.group(1)
            questions = []
            
            # Extract questions from Unit 1
            question_pattern = r'\*\*(\d+)\.\s*(.*?)\*\*\n(.*?)(?=\n\n\*\*\d+\.|\Z)'
            for match in re.finditer(question_pattern, unit1_content, re.DOTALL):
                q_num = int(match.group(1))
                q_text = match.group(2).strip()
                q_answers = match.group(3).strip()
                
                # Parse answers
                answers = []
                answer_lines = [line.strip() for line in q_answers.split('\n') if line.strip() and line.startswith('-')]
                for answer_line in answer_lines:
                    if ':' in answer_line:
                        english_part = answer_line.split('**')[1] if '**' in answer_line else answer_line.split(':', 1)[0].strip()
                        arabic_part = answer_line.split('**')[-1] if '**' in answer_line else answer_line.split(':', 1)[1].strip()
                        answers.append({"english": english_part.strip('- '), "arabic": arabic_part.strip()})
                
                questions.append({
                    "id": q_num,
                    "question_en": q_text.split('؟')[0] if '؟' in q_text else q_text,
                    "question_ar": q_text.split('Why')[0] if 'Why' in q_text else q_text,
                    "answers": answers,
                    "unit": "Unit 1"
                })
            
            data[10].append({
                "id": "grade10-unit1",
                "title": "Unit 1: Health and Food",
                "questions": questions
            })
    
    return data

def generate_typescript_content(data):
    """Generate TypeScript content from parsed data"""
    
    ts_content = '''/**
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

export const setbookData: SetbookGradeData[] = ['''
    
    # Add data for each grade
    for grade_num in [10, 11, 12]:
        if grade_num in data and data[grade_num]:
            ts_content += f'''
  {{
    grade: {grade_num},
    title: "Grade {grade_num} Set-book Questions",
    units: ['''
            
            # Add units for this grade
            for unit in data[grade_num]:
                ts_content += f'''
      {{
        id: "{unit["id"]}",
        title: "{unit["title"]}",
        questions: ['''
                
                # Add questions for this unit
                for question in unit["questions"]:
                    ts_content += f'''
          {{
            id: {question["id"]},
            question_en: "{question["question_en"].replace('"', '\\"')}",
            question_ar: "{question["question_ar"].replace('"', '\\"')}",
            answers: ['''
                    
                    # Add answers for this question
                    for answer in question["answers"]:
                        ts_content += f'''
              {{ english: "{answer["english"].replace('"', '\\"')}", arabic: "{answer["arabic"].replace('"', '\\"')}" }},'''
                    
                    ts_content += '''
            ],
            unit: "''' + question["unit"] + '''"
          },'''
                
                ts_content += '''
        ]
      },'''
            
            ts_content += '''
    ]
  },'''
    
    # Add helper functions
    ts_content += '''
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
};'''
    
    return ts_content

def main():
    """Main function to generate complete setbook data"""
    
    print("🔄 Starting setbook data generation...")
    
    # Parse content
    data = parse_setbook_content()
    
    # Generate TypeScript content
    ts_content = generate_typescript_content(data)
    
    # Write to file
    output_path = '/workspace/english-learning-platform/src/data/setbookQuestions_complete.ts'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"✅ Generated complete setbook data: {output_path}")
    
    # Count questions
    total_questions = 0
    for grade_num in [10, 11, 12]:
        if grade_num in data:
            grade_questions = sum(len(unit["questions"]) for unit in data[grade_num])
            total_questions += grade_questions
            print(f"📊 Grade {grade_num}: {grade_questions} questions")
    
    print(f"📊 Total questions: {total_questions}")

if __name__ == "__main__":
    main()
