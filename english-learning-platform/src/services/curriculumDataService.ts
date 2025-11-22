/**
 * Kuwait English Hub - Curriculum Data Service
 * This service handles loading, parsing, and managing curriculum data
 * for all grades (10, 11, 12)
 */

import {
  VocabularyItem,
  VocabularyUnit,
  SetbookQuestion,
  SetbookUnit,
  GrammarQuestion,
  TranslationExercise,
  WritingTopic,
  FunctionalLanguageQuestion,
  FunctionalPhrase,
  CurriculumUnit,
  Grade10Curriculum,
  Grade11Curriculum,
  Grade12Curriculum,
  CompleteCurriculum,
  GradeLevel
} from '../types/curriculum';

/**
 * Main Curriculum Data Service
 */
class CurriculumDataService {
  private static instance: CurriculumDataService;
  private curriculumData: CompleteCurriculum | null = null;
  private loading: boolean = false;

  private constructor() {}

  static getInstance(): CurriculumDataService {
    if (!CurriculumDataService.instance) {
      CurriculumDataService.instance = new CurriculumDataService();
    }
    return CurriculumDataService.instance;
  }

  /**
   * Load all curriculum data from text files
   */
  async loadAllData(): Promise<CompleteCurriculum> {
    if (this.curriculumData) {
      return this.curriculumData;
    }

    if (this.loading) {
      // Wait for current loading to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.loadAllData();
    }

    this.loading = true;

    try {
      // Load all data files in parallel
      const [grade10Text, grade11Text, grade12Text, functionalText] = await Promise.all([
        fetch('/data/grade10.txt').then(r => r.text()),
        fetch('/data/grade11.txt').then(r => r.text()),
        fetch('/data/grade12.txt').then(r => r.text()),
        fetch('/data/functional-language.txt').then(r => r.text())
      ]);

      // Parse each grade's data
      const grade10Data = this.parseGrade10Data(grade10Text);
      const grade11Data = this.parseGrade11Data(grade11Text);
      const grade12Data = this.parseGrade12Data(grade12Text);
      const functionalLanguageData = this.parseFunctionalLanguageData(functionalText);

      this.curriculumData = {
        grade10: grade10Data,
        grade11: grade11Data,
        grade12: grade12Data,
        functionalLanguage: functionalLanguageData,
        sampleExams: [] // Will be generated dynamically
      };

      this.loading = false;
      return this.curriculumData;
    } catch (error) {
      this.loading = false;
      console.error('Error loading curriculum data:', error);
      throw new Error('Failed to load curriculum data');
    }
  }

  /**
   * Parse Grade 10 data from text file
   */
  private parseGrade10Data(text: string): Grade10Curriculum {
    const units: CurriculumUnit[] = [];
    const lines = text.split('\n');
    
    const unitNames = [
      'Nutrition & Health',
      'Culture & Communication',
      'Arts & Architecture',
      'Technology & Gaming',
      'Sports & Fitness',
      'Environment & Conservation'
    ];

    // Parse vocabulary for each unit
    for (let i = 0; i < unitNames.length; i++) {
      const unit: CurriculumUnit = {
        unitNumber: i + 1,
        unitName: unitNames[i],
        grade: 10,
        vocabulary: this.parseVocabularySection(text, unitNames[i]),
        setbookQuestions: this.parseSetbookSection(text, i + 1, 10),
        translations: this.parseTranslationSection(text, i + 1, 10),
        writing: this.parseWritingSection(text, i + 1, 10)
      };
      units.push(unit);
    }

    return {
      grade: 10,
      units,
      totalUnits: units.length
    };
  }

  /**
   * Parse Grade 11 data from text file
   */
  private parseGrade11Data(text: string): Grade11Curriculum {
    const units: CurriculumUnit[] = [];
    
    const unitNames = [
      'The Law',
      'Migration',
      'Human Values',
      'Earth at Risk',
      'Precious Resources',
      'Under Threat'
    ];

    for (let i = 0; i < unitNames.length; i++) {
      const unit: CurriculumUnit = {
        unitNumber: i + 1,
        unitName: unitNames[i],
        grade: 11,
        vocabulary: this.parseVocabularySection(text, unitNames[i]),
        setbookQuestions: this.parseSetbookSection(text, i + 1, 11),
        translations: this.parseTranslationSection(text, i + 1, 11),
        writing: this.parseWritingSection(text, i + 1, 11)
      };
      units.push(unit);
    }

    return {
      grade: 11,
      units,
      totalUnits: units.length
    };
  }

  /**
   * Parse Grade 12 data from text file
   */
  private parseGrade12Data(text: string): Grade12Curriculum {
    const units: CurriculumUnit[] = [];
    
    const unitNames = [
      'The Law',
      'Migration',
      'Human Values',
      'Earth at Risk',
      'Precious Resources',
      'Under Threat'
    ];

    for (let i = 0; i < unitNames.length; i++) {
      const unit: CurriculumUnit = {
        unitNumber: i + 1,
        unitName: unitNames[i],
        grade: 12,
        vocabulary: this.parseVocabularySection(text, unitNames[i]),
        grammar: this.parseGrammarSection(text, i + 1),
        setbookQuestions: this.parseSetbookSection(text, i + 1, 12),
        translations: this.parseTranslationSection(text, i + 1, 12),
        writing: this.parseWritingSection(text, i + 1, 12)
      };
      units.push(unit);
    }

    return {
      grade: 12,
      units,
      totalUnits: units.length
    };
  }

  /**
   * Parse vocabulary section for a specific unit
   */
  private parseVocabularySection(text: string, unitName: string): VocabularyItem[] {
    const vocabulary: VocabularyItem[] = [];
    
    // Find the unit section in the text
    const unitPattern = new RegExp(`Unit \\d+: ${unitName}[\\s\\S]*?(?=Unit \\d+:|SETBOOK|$)`, 'i');
    const match = text.match(unitPattern);
    
    if (!match) return vocabulary;
    
    const section = match[0];
    const lines = section.split('\n');
    
    // Parse vocabulary table format
    // Format: English word, Arabic, Meaning, Example sentence (repeated every 4 lines)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for English word pattern (word followed by (n), (v), (adj.), etc.)
      if (line.match(/^[a-z\s-]+\s*\([nvadj\.]+\)$/i)) {
        const english = line;
        const arabic = lines[i + 1]?.trim() || '';
        const meaning = lines[i + 2]?.trim() || '';
        const example = lines[i + 3]?.trim() || '';
        
        if (arabic && meaning && example) {
          vocabulary.push({
            english,
            arabic,
            meaning,
            example,
            unit: unitName,
            grade: 10 // Will be set correctly by caller
          });
        }
        i += 3; // Skip the lines we just processed
      }
    }
    
    return vocabulary;
  }

  /**
   * Parse setbook questions for a unit
   */
  private parseSetbookSection(text: string, unitNumber: number, grade: GradeLevel): SetbookQuestion[] {
    const questions: SetbookQuestion[] = [];
    
    // Look for setbook questions pattern
    const setbookPattern = new RegExp(`UNIT ${unitNumber}[\\s\\S]*?SETBOOK[\\s\\S]*?(?=UNIT ${unitNumber + 1}|$)`, 'i');
    const match = text.match(setbookPattern);
    
    if (!match) return questions;
    
    const section = match[0];
    const lines = section.split('\n');
    
    let currentQuestion = '';
    let currentAnswer = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Question pattern: starts with number followed by dot or parenthesis
      if (line.match(/^\d+[\.)]\s+/)) {
        if (currentQuestion && currentAnswer) {
          questions.push({
            question: currentQuestion,
            answer: currentAnswer,
            unit: `Unit ${unitNumber}`,
            unitNumber,
            grade
          });
        }
        currentQuestion = line.replace(/^\d+[\.)]\s+/, '');
        currentAnswer = '';
      } else if (line.toLowerCase().startsWith('answer:') || line.toLowerCase().startsWith('a:')) {
        currentAnswer = line.replace(/^(answer:|a:)\s*/i, '');
      } else if (currentAnswer) {
        currentAnswer += ' ' + line;
      } else if (currentQuestion) {
        currentQuestion += ' ' + line;
      }
    }
    
    // Add last question
    if (currentQuestion && currentAnswer) {
      questions.push({
        question: currentQuestion,
        answer: currentAnswer,
        unit: `Unit ${unitNumber}`,
        unitNumber,
        grade
      });
    }
    
    return questions;
  }

  /**
   * Parse grammar section (Grade 12 only)
   */
  private parseGrammarSection(text: string, unitNumber: number): GrammarQuestion[] {
    const questions: GrammarQuestion[] = [];
    
    // Look for grammar pattern
    const grammarPattern = new RegExp(`UNIT ${unitNumber}[\\s\\S]*?GRAMMAR[\\s\\S]*?(?=UNIT ${unitNumber + 1}|LANGUAGE FUNCTIONS|$)`, 'i');
    const match = text.match(grammarPattern);
    
    if (!match) return questions;
    
    const section = match[0];
    const lines = section.split('\n');
    
    let currentQuestion = '';
    let currentOptions: string[] = [];
    let correctIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Question pattern
      if (line.match(/^\d+\.\s+/)) {
        if (currentQuestion && currentOptions.length > 0) {
          questions.push({
            question: currentQuestion,
            options: currentOptions,
            correctAnswer: correctIndex >= 0 ? correctIndex : 0,
            topic: `Unit ${unitNumber} Grammar`,
            grade: 12,
            unit: unitNumber
          });
        }
        currentQuestion = line.replace(/^\d+\.\s+/, '');
        currentOptions = [];
        correctIndex = -1;
      } else if (line.match(/^[a-d]\.\s+/i)) {
        currentOptions.push(line.replace(/^[a-d]\.\s+/i, ''));
      }
    }
    
    // Add last question
    if (currentQuestion && currentOptions.length > 0) {
      questions.push({
        question: currentQuestion,
        options: currentOptions,
        correctAnswer: correctIndex >= 0 ? correctIndex : 0,
        topic: `Unit ${unitNumber} Grammar`,
        grade: 12,
        unit: unitNumber
      });
    }
    
    return questions;
  }

  /**
   * Parse translation section
   */
  private parseTranslationSection(text: string, unitNumber: number, grade: GradeLevel): TranslationExercise[] {
    const translations: TranslationExercise[] = [];
    
    // Look for translation pattern
    const translationPattern = new RegExp(`UNIT ${unitNumber}[\\s\\S]*?TRANSLATION[\\s\\S]*?(?=UNIT ${unitNumber + 1}|$)`, 'i');
    const match = text.match(translationPattern);
    
    if (!match) return translations;
    
    // Translation exercises will be parsed from the matched section
    // Format varies, so we'll create placeholders for now
    // TODO: Implement detailed parsing based on actual format
    
    return translations;
  }

  /**
   * Parse writing section
   */
  private parseWritingSection(text: string, unitNumber: number, grade: GradeLevel): WritingTopic[] {
    const topics: WritingTopic[] = [];
    
    // Look for writing/expository pattern
    const writingPattern = new RegExp(`UNIT ${unitNumber}[\\s\\S]*?(?:EXPOSITORY WRITING|WRITING)[\\s\\S]*?(?=UNIT ${unitNumber + 1}|TRANSLATION|$)`, 'i');
    const match = text.match(writingPattern);
    
    if (!match) return topics;
    
    // Writing topics will be parsed from the matched section
    // Format varies, so we'll create placeholders for now
    // TODO: Implement detailed parsing based on actual format
    
    return topics;
  }

  /**
   * Parse functional language data
   */
  private parseFunctionalLanguageData(text: string): any {
    const phrases: FunctionalPhrase[] = [];
    const questionBlocks: any[] = [];
    
    // Parse functional language phrases
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for function headers (e.g., "إبداء رأي (Giving an Opinion)")
      if (line.match(/^[\u0600-\u06FF\s]+\s*\([A-Z][a-z\s]+\)/)) {
        // Extract function name
        const match = line.match(/\(([^)]+)\)/);
        if (match) {
          const functionName = match[1];
          // Parse phrases for this function
          // TODO: Implement detailed parsing
        }
      }
    }
    
    return {
      phrases,
      questionBlocks
    };
  }

  /**
   * Get vocabulary for a specific grade and unit
   */
  async getVocabulary(grade: GradeLevel, unit?: number): Promise<VocabularyItem[]> {
    const data = await this.loadAllData();
    const gradeData = data[`grade${grade}` as keyof CompleteCurriculum] as any;
    
    if (unit) {
      const unitData = gradeData.units.find((u: CurriculumUnit) => u.unitNumber === unit);
      return unitData?.vocabulary || [];
    }
    
    // Return all vocabulary for the grade
    return gradeData.units.flatMap((u: CurriculumUnit) => u.vocabulary);
  }

  /**
   * Get setbook questions for a specific grade and unit
   */
  async getSetbookQuestions(grade: GradeLevel, unit?: number): Promise<SetbookQuestion[]> {
    const data = await this.loadAllData();
    const gradeData = data[`grade${grade}` as keyof CompleteCurriculum] as any;
    
    if (unit) {
      const unitData = gradeData.units.find((u: CurriculumUnit) => u.unitNumber === unit);
      return unitData?.setbookQuestions || [];
    }
    
    return gradeData.units.flatMap((u: CurriculumUnit) => u.setbookQuestions);
  }

  /**
   * Get grammar questions for Grade 12
   */
  async getGrammarQuestions(unit?: number): Promise<GrammarQuestion[]> {
    const data = await this.loadAllData();
    const grade12Data = data.grade12;
    
    if (unit) {
      const unitData = grade12Data.units.find((u: CurriculumUnit) => u.unitNumber === unit);
      return unitData?.grammar || [];
    }
    
    return grade12Data.units.flatMap((u: CurriculumUnit) => u.grammar || []);
  }

  /**
   * Search vocabulary across all grades
   */
  async searchVocabulary(searchTerm: string, grade?: GradeLevel): Promise<VocabularyItem[]> {
    const data = await this.loadAllData();
    const term = searchTerm.toLowerCase();
    
    const searchInGrade = (gradeData: any) => {
      return gradeData.units
        .flatMap((u: CurriculumUnit) => u.vocabulary)
        .filter((v: VocabularyItem) =>
          v.english.toLowerCase().includes(term) ||
          v.arabic.includes(searchTerm) ||
          v.meaning.toLowerCase().includes(term)
        );
    };
    
    if (grade) {
      const gradeData = data[`grade${grade}` as keyof CompleteCurriculum] as any;
      return searchInGrade(gradeData);
    }
    
    // Search across all grades
    return [
      ...searchInGrade(data.grade10),
      ...searchInGrade(data.grade11),
      ...searchInGrade(data.grade12)
    ];
  }

  /**
   * Get units for a specific grade
   */
  async getUnits(grade: GradeLevel): Promise<CurriculumUnit[]> {
    const data = await this.loadAllData();
    const gradeData = data[`grade${grade}` as keyof CompleteCurriculum] as any;
    return gradeData.units;
  }
}

export default CurriculumDataService.getInstance();
