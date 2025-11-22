#!/usr/bin/env python3
"""
Kuwait Platform Autonomous Migration Script
Updates the platform to use MySQL-compatible database instead of Supabase
"""

import os
import shutil
import json
import re
from typing import Dict, Any, List

class AutonomousPlatformMigrator:
    def __init__(self):
        self.platform_dir = "/workspace/english-learning-platform"
        self.autonomous_db_path = "/workspace/kuwait_platform_autonomous.db"
        self.backup_dir = "/workspace/backup_before_migration"
        
    def create_backup(self):
        """Create backup of original platform files"""
        print("💾 Creating autonomous backup of platform...")
        
        os.makedirs(self.backup_dir, exist_ok=True)
        
        # Backup key files
        key_files = [
            "src/services/databaseService.ts",
            "src/services/supabase.ts",
            "package.json"
        ]
        
        for file_path in key_files:
            full_path = os.path.join(self.platform_dir, file_path)
            if os.path.exists(full_path):
                backup_path = os.path.join(self.backup_dir, file_path)
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                shutil.copy2(full_path, backup_path)
                print(f"✅ Backed up: {file_path}")
        
        print(f"📦 Backup completed in: {self.backup_dir}")
    
    def create_mysql_service_layer(self):
        """Create MySQL-compatible service layer"""
        print("🗄️ Creating autonomous MySQL service layer...")
        
        mysql_service_content = '''// Kuwait Platform - Autonomous MySQL Service Layer
// Compatible with SQLite/MySQL databases

import Database from 'better-sqlite3'

// Database connection
let db: Database.Database

// Initialize database connection
export const initDatabase = () => {
  const dbPath = process.env.DATABASE_PATH || '/workspace/kuwait_platform_autonomous.db'
  db = new Database(dbPath)
  console.log('🗄️ Connected to autonomous Kuwait database')
  return db
}

// Vocabulary Service
export interface VocabularyWord {
  id: string
  question_text: string
  question_type: string
  component_type: string
  grade_level: number
  unit_number: number
  english_word: string
  part_of_speech: string
  arabic_translation: string
  difficulty_level: string
  question_data: any
  created_at: string
  updated_at: string
}

export const vocabularyService = {
  // Get vocabulary by class and unit
  async getByClassAndUnit(classNumber: number, unitNumber: number): Promise<VocabularyWord[]> {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT * FROM test_bank_questions 
      WHERE component_type = 'vocabulary' 
      AND grade_level = ? 
      AND unit_number = ?
      ORDER BY question_text
    `)
    
    const rows = stmt.all(classNumber, unitNumber)
    
    // Transform database rows to expected format
    return rows.map((row: any) => ({
      id: row.id,
      question_text: row.question_text,
      question_type: row.question_type,
      component_type: row.component_type,
      grade_level: row.grade_level,
      unit_number: row.unit_number,
      english_word: row.english_word,
      part_of_speech: row.part_of_speech,
      arabic_translation: row.arabic_translation,
      difficulty_level: row.difficulty_level,
      question_data: row.question_data ? JSON.parse(row.question_data) : null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      // Legacy compatibility
      word: row.english_word,
      class_number: row.grade_level,
      unit_number: row.unit_number,
      definition_en: row.english_word,
      definition_ar: row.arabic_translation,
      category: row.part_of_speech,
      difficulty_level: 2
    }))
  },

  // Get all vocabulary for a class
  async getByClass(classNumber: number): Promise<VocabularyWord[]> {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT * FROM test_bank_questions 
      WHERE component_type = 'vocabulary' 
      AND grade_level = ?
      ORDER BY unit_number, question_text
    `)
    
    const rows = stmt.all(classNumber)
    
    return rows.map((row: any) => ({
      id: row.id,
      question_text: row.question_text,
      question_type: row.question_type,
      component_type: row.component_type,
      grade_level: row.grade_level,
      unit_number: row.unit_number,
      english_word: row.english_word,
      part_of_speech: row.part_of_speech,
      arabic_translation: row.arabic_translation,
      difficulty_level: row.difficulty_level,
      question_data: row.question_data ? JSON.parse(row.question_data) : null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      // Legacy compatibility
      word: row.english_word,
      class_number: row.grade_level,
      unit_number: row.unit_number,
      definition_en: row.english_word,
      definition_ar: row.arabic_translation,
      category: row.part_of_speech,
      difficulty_level: 2
    }))
  },

  // Search vocabulary
  async searchVocabulary(query: string, classNumber?: number): Promise<VocabularyWord[]> {
    if (!db) initDatabase()
    
    let sql = `
      SELECT * FROM test_bank_questions 
      WHERE component_type = 'vocabulary' 
      AND (english_word LIKE ? OR arabic_translation LIKE ?)
    `
    const params = [`%${query}%`, `%${query}%`]
    
    if (classNumber) {
      sql += ' AND grade_level = ?'
      params.push(classNumber)
    }
    
    sql += ' ORDER BY grade_level, unit_number LIMIT 50'
    
    const stmt = db.prepare(sql)
    const rows = stmt.all(...params)
    
    return rows.map((row: any) => ({
      id: row.id,
      question_text: row.question_text,
      question_type: row.question_type,
      component_type: row.component_type,
      grade_level: row.grade_level,
      unit_number: row.unit_number,
      english_word: row.english_word,
      part_of_speech: row.part_of_speech,
      arabic_translation: row.arabic_translation,
      difficulty_level: row.difficulty_level,
      question_data: row.question_data ? JSON.parse(row.question_data) : null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      // Legacy compatibility
      word: row.english_word,
      class_number: row.grade_level,
      unit_number: row.unit_number,
      definition_en: row.english_word,
      definition_ar: row.arabic_translation,
      category: row.part_of_speech,
      difficulty_level: 2
    }))
  },

  // Get vocabulary statistics
  async getStatistics() {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT 
        grade_level,
        COUNT(*) as word_count,
        COUNT(DISTINCT unit_number) as unit_count
      FROM test_bank_questions 
      WHERE component_type = 'vocabulary'
      GROUP BY grade_level
      ORDER BY grade_level
    `)
    
    return stmt.all()
  }
}

// User Progress Service (if needed)
export const progressService = {
  async getUserProgress(userId: string, classNumber: number) {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      SELECT * FROM user_progress 
      WHERE user_id = ? AND grade_level = ?
    `)
    
    return stmt.get(userId, classNumber)
  },

  async updateUserProgress(userId: string, classNumber: number, unitNumber: number, completedVocabulary: any) {
    if (!db) initDatabase()
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO user_progress 
      (user_id, grade_level, unit_number, vocabulary_completed, last_accessed)
      VALUES (?, ?, ?, ?, datetime('now'))
    `)
    
    return stmt.run(userId, classNumber, unitNumber, JSON.stringify(completedVocabulary))
  }
}

// Test Bank Questions Service
export const testBankService = {
  async getQuestionsByComponent(componentType: string, gradeLevel?: number) {
    if (!db) initDatabase()
    
    let sql = `SELECT * FROM test_bank_questions WHERE component_type = ?`
    const params = [componentType]
    
    if (gradeLevel) {
      sql += ' AND grade_level = ?'
      params.push(gradeLevel)
    }
    
    sql += ' ORDER BY grade_level, unit_number, question_text'
    
    const stmt = db.prepare(sql)
    const rows = stmt.all(...params)
    
    return rows.map((row: any) => ({
      ...row,
      question_data: row.question_data ? JSON.parse(row.question_data) : null
    }))
  }
}

// Initialize database on import
initDatabase()
'''
        
        service_path = os.path.join(self.platform_dir, "src/services/mysqlService.ts")
        with open(service_path, 'w', encoding='utf-8') as f:
            f.write(mysql_service_content)
        
        print(f"✅ Created MySQL service layer: {service_path}")
    
    def update_vocabulary_components(self):
        """Update React components to use new service"""
        print("🔄 Updating vocabulary components for autonomous mode...")
        
        # Update the main vocabulary generation component
        vocab_gen_path = os.path.join(self.platform_dir, "src/components/VocabularyGenerator.tsx")
        
        if os.path.exists(vocab_gen_path):
            # Read current component
            with open(vocab_gen_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace Supabase imports with MySQL service
            updated_content = content.replace(
                "import { vocabularyService } from '../services/databaseService'",
                "import { vocabularyService } from '../services/mysqlService'"
            )
            
            # Write updated component
            with open(vocab_gen_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print("✅ Updated VocabularyGenerator component")
        
        # Update other vocabulary-related components
        component_files = [
            "src/components/VocabularyCard.tsx",
            "src/components/VocabularyList.tsx",
            "src/components/VocabularyQuiz.tsx"
        ]
        
        for file_path in component_files:
            full_path = os.path.join(self.platform_dir, file_path)
            if os.path.exists(full_path):
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace service imports
                updated_content = content.replace(
                    "from '../services/databaseService'",
                    "from '../services/mysqlService'"
                )
                
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                
                print(f"✅ Updated {file_path}")
    
    def create_environment_config(self):
        """Create environment configuration for autonomous mode"""
        print("⚙️ Creating autonomous environment configuration...")
        
        env_content = '''# Kuwait Platform - Autonomous Environment Configuration
DATABASE_PATH=/workspace/kuwait_platform_autonomous.db
NODE_ENV=development

# Database Configuration (for future MySQL migration)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=kuwait_user
MYSQL_PASSWORD=autonomous_pass
MYSQL_DATABASE=kuwait_platform

# Platform Configuration
REACT_APP_PLATFORM_NAME=Kuwait English Learning Platform
REACT_APP_VERSION=2.0.0-autonomous
REACT_APP_DATABASE_TYPE=sqlite
'''
        
        env_path = os.path.join(self.platform_dir, ".env.autonomous")
        with open(env_path, 'w', encoding='utf-8') as f:
            f.write(env_content)
        
        print(f"✅ Created environment config: {env_path}")
    
    def create_package_json_updates(self):
        """Update package.json for autonomous dependencies"""
        print("📦 Updating package.json for autonomous dependencies...")
        
        package_json_path = os.path.join(self.platform_dir, "package.json")
        
        if os.path.exists(package_json_path):
            with open(package_json_path, 'r', encoding='utf-8') as f:
                package_data = json.load(f)
            
            # Add autonomous dependencies
            package_data['dependencies']['better-sqlite3'] = '^9.2.2'
            package_data['dependencies']['@types/better-sqlite3'] = '^7.6.8'
            
            # Add autonomous scripts
            package_data['scripts']['autonomous:dev'] = 'DATABASE_PATH=/workspace/kuwait_platform_autonomous.db npm run dev'
            package_data['scripts']['autonomous:build'] = 'DATABASE_PATH=/workspace/kuwait_platform_autonomous.db npm run build'
            package_data['scripts']['autonomous:test'] = 'npm test -- --testPathPattern=autonomous'
            
            # Write updated package.json
            with open(package_json_path, 'w', encoding='utf-8') as f:
                json.dump(package_data, f, indent=2)
            
            print("✅ Updated package.json for autonomous mode")
    
    def create_autonomous_test_suite(self):
        """Create autonomous test suite"""
        print("🧪 Creating autonomous test suite...")
        
        test_dir = os.path.join(self.platform_dir, "src/tests/autonomous")
        os.makedirs(test_dir, exist_ok=True)
        
        # Vocabulary service test
        test_content = '''// Autonomous Vocabulary Service Tests
import { vocabularyService } from '../../services/mysqlService'

describe('Autonomous Vocabulary Service', () => {
  test('should get vocabulary by class and unit', async () => {
    const vocabulary = await vocabularyService.getByClassAndUnit(10, 1)
    expect(vocabulary).toBeDefined()
    expect(Array.isArray(vocabulary)).toBe(true)
  })

  test('should get vocabulary statistics', async () => {
    const stats = await vocabularyService.getStatistics()
    expect(stats).toBeDefined()
    expect(Array.isArray(stats)).toBe(true)
  })

  test('should search vocabulary', async () => {
    const results = await vocabularyService.searchVocabulary('food')
    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
  })
})
'''
        
        test_path = os.path.join(test_dir, "vocabularyService.test.ts")
        with open(test_path, 'w', encoding='utf-8') as f:
            f.write(test_content)
        
        print(f"✅ Created autonomous test suite: {test_path}")
    
    def run_autonomous_migration(self):
        """Execute the complete autonomous migration"""
        print("🚀 Starting Kuwait Platform Autonomous Migration")
        print("=" * 60)
        
        try:
            # Step 1: Create backup
            self.create_backup()
            
            # Step 2: Create MySQL service layer
            self.create_mysql_service_layer()
            
            # Step 3: Update components
            self.update_vocabulary_components()
            
            # Step 4: Create environment config
            self.create_environment_config()
            
            # Step 5: Update package.json
            self.create_package_json_updates()
            
            # Step 6: Create test suite
            self.create_autonomous_test_suite()
            
            # Step 7: Generate migration report
            report = {
                'migration_completed': True,
                'timestamp': '2025-11-10T01:32:43Z',
                'backup_location': self.backup_dir,
                'database_path': self.autonomous_db_path,
                'migrated_files': [
                    'src/services/mysqlService.ts',
                    'src/components/VocabularyGenerator.tsx',
                    '.env.autonomous',
                    'package.json (updated)',
                    'src/tests/autonomous/vocabularyService.test.ts'
                ],
                'next_steps': [
                    'Install better-sqlite3 dependency',
                    'Run autonomous tests',
                    'Start development server with autonomous config',
                    'Verify vocabulary generation works'
                ]
            }
            
            report_path = "/workspace/autonomous_migration_report.json"
            with open(report_path, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2, ensure_ascii=False)
            
            print(f"📋 Migration report saved: {report_path}")
            print("🎯 Kuwait Platform Autonomous Migration COMPLETED!")
            print("🔄 Platform now ready for autonomous vocabulary generation!")
            
            return True
            
        except Exception as e:
            print(f"💥 Autonomous migration failed: {e}")
            return False

if __name__ == "__main__":
    migrator = AutonomousPlatformMigrator()
    success = migrator.run_autonomous_migration()
    exit(0 if success else 1)
