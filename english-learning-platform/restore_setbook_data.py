#!/usr/bin/env python3
"""
Restore Complete Setbook Questions Data
Extracts all setbook questions from grade10.txt, grade11.txt, and grade12.txt
and generates the complete TypeScript file structure
"""

import re
import json

def extract_setbook_questions(file_path, grade_num):
    """Extract setbook questions from a grade data file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    units_data = []
    current_unit = None
    current_questions = []
    question_id = 1
    
    lines = content.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i].strip()
        
        # Detect unit headers
        if ('UNIT' in line.upper() or 'UNIT' in line) and ('##' in line or '**' in line):
            # Save previous unit if exists
            if current_unit and current_questions:
                units_data.append({
                    "id": current_unit["id"],
                    "title": current_unit["title"],
                    "questions": current_questions.copy()
                })
            
            # Extract unit number and title
            unit_match = re.search(r'UNIT\s+(\w+):?\s*(.+)', line, re.IGNORECASE)
            if unit_match:
                unit_num = unit_match.group(1).upper()
                unit_title = unit_match.group(2).strip()
                
                current_unit = {
                    "id": f"grade{grade_num}-unit{unit_num.lower()}",
                    "title": f"Unit {unit_num}: {unit_title}"
                }
                current_questions = []
                print(f"Found Unit {unit_num}: {unit_title}")
        
        # Detect question sections
        elif ('Questions' in line or 'Questions & Answers' in line) and ('###' in line or '**' in line):
            # Parse questions that follow
            j = i + 1
            while j < len(lines) and j < i + 50:  # Look ahead up to 50 lines
                question_line = lines[j].strip()
                
                if question_line.startswith('**') and 'Arabic:' in question_line:
                    # Extract Arabic question
                    arabic_match = re.search(r'\*\*([^*]+)\*\*', question_line)
                    if arabic_match:
                        arabic_q = arabic_match.group(1).replace('Arabic:', '').strip()
                        
                        # Look for English question
                        english_q = ""
                        if j + 1 < len(lines):
                            english_line = lines[j + 1].strip()
                            english_match = re.search(r'\*\*([^*]+)\*\*', english_line)
                            if english_match:
                                english_q = english_match.group(1).replace('English:', '').strip()
                        
                        # Look for answers (usually in next few lines)
                        answers = []
                        k = j + 2
                        while k < len(lines) and k < j + 10:
                            answer_line = lines[k].strip()
                            if answer_line.startswith('**Answer:**') or answer_line.startswith('**Answers:**'):
                                # Extract answers
                                answer_text = answer_line.replace('**Answer:**', '').replace('**Answers:**', '').strip()
                                if answer_text:
                                    # Split multiple answers by /
                                    answer_parts = [ans.strip() for ans in answer_text.split('/')]
                                    for part in answer_parts:
                                        if part:
                                            answers.append({
                                                "english": part,
                                                "arabic": ""  # Will be filled manually or left empty
                                            })
                                break
                            elif answer_line == '---' or ('###' in answer_line and 'Questions' in answer_line):
                                break
                            k += 1
                        
                        if arabic_q and english_q:
                            question_data = {
                                "id": question_id,
                                "question_en": english_q,
                                "question_ar": arabic_q,
                                "answers": answers if answers else [{"english": "Answer not found", "arabic": "إجابة غير موجودة"}],
                                "unit": current_unit["title"] if current_unit else f"Unit {unit_num}"
                            }
                            current_questions.append(question_data)
                            question_id += 1
                            print(f"  Question {question_id}: {english_q[:50]}...")
                
                elif question_line.startswith('---') and len(current_questions) > 0:
                    # New question separator
                    pass
                elif ('UNIT' in question_line.upper() and '##' in question_line) or question_line.startswith('**UNIT'):
                    # Next unit detected
                    break
                
                j += 1
            i = j
        
        i += 1
    
    # Add last unit
    if current_unit and current_questions:
        units_data.append({
            "id": current_unit["id"],
            "title": current_unit["title"],
            "questions": current_questions
        })
    
    return units_data

def generate_typescript_file(units_by_grade):
    """Generate the complete TypeScript file content"""
    
    ts_content = '''/**
 * Set-book Questions Data Structure - COMPLETE VERSION
 * Organized by grade level (10, 11, 12) with bilingual questions and answers
 * Source: Complete extraction from grade data files
 */

export interface SetbookAnswer {
  english: string;
  arabic: string;
  isSubAnswer?: boolean; // For numbered answers like a), b), c)
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
'''
    
    # Add data for each grade
    for grade_num in [10, 11, 12]:
        if grade_num in units_by_grade:
            units_data = units_by_grade[grade_num]
            ts_content += f'  // ================ GRADE {grade_num} ================\n'
            ts_content += f'  {{\n'
            ts_content += f'    grade: {grade_num},\n'
            ts_content += f'    title: "Grade {grade_num} Set-book Questions",\n'
            ts_content += f'    units: [\n'
            
            for unit in units_data:
                ts_content += f'      {{\n'
                ts_content += f'        id: "{unit["id"]}",\n'
                ts_content += f'        title: "{unit["title"]}",\n'
                ts_content += f'        questions: [\n'
                
                for question in unit["questions"]:
                    ts_content += f'          {{\n'
                    ts_content += f'            id: {question["id"]},\n'
                    ts_content += f'            question_en: "{question["question_en"]}",\n'
                    ts_content += f'            question_ar: "{question["question_ar"]}",\n'
                    ts_content += f'            answers: [\n'
                    
                    for answer in question["answers"]:
                        ts_content += f'              {{ english: "{answer["english"]}", arabic: "{answer.get("arabic", "")}" }},\n'
                    
                    ts_content += f'            ],\n'
                    ts_content += f'            unit: "{question["unit"]}"\n'
                    ts_content += f'          }},\n'
                
                ts_content += f'        ]\n'
                ts_content += f'      }},\n'
            
            ts_content += f'    ]\n'
            ts_content += f'  }},\n'
    
    ts_content += '''];

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
'''
    
    return ts_content

def main():
    print("Starting setbook data restoration...")
    
    # Extract data from each grade file
    units_by_grade = {}
    
    for grade_num in [10, 11, 12]:
        file_path = f"dist/data/grade{grade_num}.txt"
        print(f"\nProcessing Grade {grade_num}...")
        try:
            units_data = extract_setbook_questions(file_path, grade_num)
            units_by_grade[grade_num] = units_data
            
            print(f"Grade {grade_num}: {len(units_data)} units")
            total_questions = sum(len(unit["questions"]) for unit in units_data)
            print(f"Grade {grade_num}: {total_questions} questions total")
            
        except Exception as e:
            print(f"Error processing Grade {grade_num}: {e}")
    
    # Generate TypeScript file
    print("\nGenerating TypeScript file...")
    ts_content = generate_typescript_file(units_by_grade)
    
    # Write to file
    output_path = "src/data/setbookQuestions.ts"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Complete setbook data saved to {output_path}")
    
    # Summary
    total_questions = 0
    total_units = 0
    for grade_num in [10, 11, 12]:
        if grade_num in units_by_grade:
            grade_units = len(units_by_grade[grade_num])
            grade_questions = sum(len(unit["questions"]) for unit in units_by_grade[grade_num])
            total_units += grade_units
            total_questions += grade_questions
            print(f"Grade {grade_num}: {grade_units} units, {grade_questions} questions")
    
    print(f"\nTotal Summary: {total_units} units, {total_questions} questions across grades 10-12")

if __name__ == "__main__":
    main()