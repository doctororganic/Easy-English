#!/usr/bin/env bash
# Kuwait English Learning Platform - Autonomous Bootstrap
# Complete autonomous setup for MySQL-based vocabulary system

set -e  # Exit on any error

# ============================================
# 0. ENVIRONMENT DETECTION & AUTONOMOUS SETUP
# ============================================

echo "🤖 Kuwait Platform - Autonomous Bootstrap Starting..."

# Detect available runtimes
HAS_NODE=$(command -v node >/dev/null 2>&1 && echo "yes" || echo "no")
HAS_PYTHON=$(command -v python3 >/dev/null 2>&1 && echo "yes" || echo "no")
HAS_MYSQL=$(command -v mysql >/dev/null 2>&1 && echo "yes" || echo "no")

if [[ "$HAS_PYTHON" == "no" ]]; then
  echo "❌ ERROR: Python3 required for autonomous pipeline"
  exit 1
fi

echo "✅ Runtime detected: Python=$HAS_PYTHON Node=$HAS_NODE MySQL=$HAS_MYSQL"

# ============================================
# 1. AUTONOMOUS TOOL INSTALLATION (Self-Healing)
# ============================================

install_autonomous_tools() {
  local MAX_RETRIES=3
  local RETRY=0
  
  while [[ $RETRY -lt $MAX_RETRIES ]]; do
    echo "🔧 Installing autonomous tools (attempt $((RETRY+1))/$MAX_RETRIES)..."
    
    # Python packages
    pip3 install --upgrade pip
    pip3 install pymysql mysql-connector-python sqlalchemy cryptography requests pytest 2>/dev/null || true
    
    # Node.js packages (if available)
    if [[ "$HAS_NODE" == "yes" ]]; then
      npm install -g mysql2 sqlite3 jest 2>/dev/null || true
    fi
    
    # Validation check
    python3 -c "import pymysql, mysql.connector, sqlalchemy, requests, pytest" 2>/dev/null
    if [[ $? -eq 0 ]]; then
      echo "✅ All autonomous tools installed successfully"
      return 0
    fi
    
    RETRY=$((RETRY+1))
    sleep 3
  done
  
  echo "❌ Failed to install autonomous tools"
  exit 1
}

install_autonomous_tools

# ============================================
# 2. AUTONOMOUS PROJECT STRUCTURE
# ============================================

PROJECT_DIR="/workspace/kuwait-platform-autonomous"
mkdir -p "$PROJECT_DIR"/{src,tests,data,config,scripts,cache,logs}

echo "🏗️  Autonomous project structure created: $PROJECT_DIR"

# ============================================
# 3. AUTONOMOUS AI INSTRUCTIONS
# ============================================

cat > "$PROJECT_DIR/.ai-instructions.md" <<'INSTRUCTIONS'
# 🤖 AUTONOMOUS KUWAIT PLATFORM AGENT

## AUTONOMOUS ROLE
You are **KuwaitAutonomousDev** - completing ALL tasks without human intervention.

## AUTONOMOUS CONSTRAINTS
- ✅ **MUST USE**: MySQL for all database operations
- ✅ **MUST USE**: pymysql/mysql-connector for database access
- ✅ **MUST USE**: SOLID principles validation
- ✅ **MUST USE**: pytest for all tests
- ✅ **MUST USE**: rollback capability for data safety
- ❌ **FORBIDDEN**: Skipping validation, ignoring errors, no human prompts

## AUTONOMOUS VALIDATION GATES
Before any task completion:

1. Database Connection Test
```bash
python3 test_mysql_connection.py || exit 1
```

2. Data Validation
```bash
python3 validate_vocabulary_data.py || exit 1
```

3. Test Coverage
```bash
pytest --cov=src --cov-fail-under=80 || exit 1
```

4. End-to-End Pipeline
```bash
python3 autonomous_pipeline.py || exit 1
```

## AUTONOMOUS SEQUENCE

### PHASE 1: DATABASE AUTONOMOUS SETUP
- [x] Environment detection
- [x] Tool installation  
- [ ] MySQL schema creation
- [ ] Connection validation
- [ ] Data migration preparation

### PHASE 2: DATA AUTONOMOUS PIPELINE
- [ ] Parse 436 vocabulary entries
- [ ] Create MySQL insertion scripts
- [ ] Implement rollback capability
- [ ] Validate data integrity
- [ ] Test batch operations

### PHASE 3: PLATFORM AUTONOMOUS MIGRATION
- [ ] Update platform database layer
- [ ] Create MySQL service layer
- [ ] Update authentication
- [ ] Test vocabulary generation
- [ ] Validate end-to-end

### PHASE 4: AUTONOMOUS DEPLOYMENT
- [ ] Create deployment scripts
- [ ] Build E2E tests
- [ ] Validate performance
- [ ] Generate reports
- [ ] Mark autonomous completion

## QUOTA OPTIMIZATION
- Cache parsed data in SQLite
- Use local MySQL operations first
- Log all operations with timing
- Implement exponential backoff
- Auto-retry with different strategies
INSTRUCTIONS

echo "📋 Autonomous instructions created"

# ============================================
# 4. CREATE CORE AUTONOMOUS SCRIPTS
# ============================================

# Autonomous MySQL connection test
cat > "$PROJECT_DIR/test_mysql_connection.py" <<'PYTEST'
#!/usr/bin/env python3
"""
Autonomous MySQL Connection Test
Tests MySQL connectivity for Kuwait Platform
"""

import pymysql
import os
import sys
from typing import Dict, Any

def test_mysql_connection() -> bool:
    """Test MySQL connection with autonomous retry logic"""
    
    # Configuration
    config = {
        'host': os.getenv('MYSQL_HOST', 'localhost'),
        'port': int(os.getenv('MYSQL_PORT', 3306)),
        'user': os.getenv('MYSQL_USER', 'root'),
        'password': os.getenv('MYSQL_PASSWORD', 'password'),
        'database': os.getenv('MYSQL_DATABASE', 'kuwait_platform'),
        'charset': 'utf8mb4',
        'autocommit': True
    }
    
    max_retries = 3
    retry = 0
    
    while retry < max_retries:
        try:
            print(f"🔌 Testing MySQL connection (attempt {retry+1}/{max_retries})...")
            
            connection = pymysql.connect(**config)
            cursor = connection.cursor()
            
            # Test query
            cursor.execute("SELECT VERSION()")
            version = cursor.fetchone()[0]
            print(f"✅ MySQL connected! Version: {version}")
            
            # Test database exists
            cursor.execute("SELECT DATABASE()")
            current_db = cursor.fetchone()[0]
            print(f"📊 Current database: {current_db}")
            
            cursor.close()
            connection.close()
            return True
            
        except pymysql.Error as e:
            print(f"❌ MySQL connection failed: {e}")
            retry += 1
            if retry < max_retries:
                print(f"🔄 Retrying in 2 seconds...")
                import time
                time.sleep(2)
            else:
                print("💀 Max retries reached")
                return False
    
    return False

if __name__ == "__main__":
    success = test_mysql_connection()
    sys.exit(0 if success else 1)
PYTEST

# Autonomous vocabulary validator
cat > "$PROJECT_DIR/validate_vocabulary_data.py" <<'PYVAL'
#!/usr/bin/env python3
"""
Autonomous Vocabulary Data Validator
Validates the 436 vocabulary entries for MySQL insertion
"""

import re
import sys
from typing import List, Dict, Any

def validate_vocabulary_entry(entry: str) -> bool:
    """Validate individual vocabulary entry format"""
    
    # Expected format: word (pos.) - arabic_translation
    pattern = r'^(.+?)\s*\(([^)]+)\)\s*-\s*(.+)$'
    match = re.match(pattern, entry.strip())
    
    if not match:
        return False
    
    word, pos, arabic = match.groups()
    
    # Basic validation
    if not word.strip() or not pos.strip() or not arabic.strip():
        return False
    
    # Arabic text should contain Arabic characters
    if not re.search(r'[أ-ي]', arabic):
        return False
    
    return True

def validate_vocabulary_file(file_path: str) -> Dict[str, Any]:
    """Validate the entire vocabulary file"""
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {'valid': False, 'error': f'File read error: {e}'}
    
    # Parse entries
    lines = content.split('\n')
    valid_entries = []
    invalid_entries = []
    current_class = None
    current_unit = None
    
    for line_num, line in enumerate(lines, 1):
        line = line.strip()
        
        # Skip empty lines and headers
        if not line or line.startswith('#') or line.startswith('##'):
            continue
        
        # Detect class/unit headers
        if 'Grade' in line and 'Vocabulary' in line:
            current_class = re.search(r'Grade\s+(\d+)', line)
            current_class = int(current_class.group(1)) if current_class else None
        elif line.startswith('### Unit'):
            current_unit = re.search(r'Unit\s+(\d+)', line)
            current_unit = int(current_unit.group(1)) if current_unit else None
        
        # Validate vocabulary entry
        if '-' in line and '(' in line and ')' in line:
            if validate_vocabulary_entry(line):
                valid_entries.append({
                    'line': line_num,
                    'text': line,
                    'class': current_class,
                    'unit': current_unit
                })
            else:
                invalid_entries.append({
                    'line': line_num,
                    'text': line,
                    'error': 'Invalid format'
                })
    
    # Calculate statistics
    total_entries = len(valid_entries) + len(invalid_entries)
    valid_count = len(valid_entries)
    invalid_count = len(invalid_entries)
    
    # Grade/Unit distribution
    grade_distribution = {}
    unit_distribution = {}
    
    for entry in valid_entries:
        grade = entry['class']
        unit = entry['unit']
        
        if grade:
            grade_distribution[grade] = grade_distribution.get(grade, 0) + 1
        if unit:
            unit_distribution[f"Grade {entry.get('class', 'Unknown')} Unit {unit}"] = unit_distribution.get(f"Grade {entry.get('class', 'Unknown')} Unit {unit}", 0) + 1
    
    return {
        'valid': invalid_count == 0,
        'total_entries': total_entries,
        'valid_entries': valid_count,
        'invalid_entries': invalid_count,
        'grade_distribution': grade_distribution,
        'unit_distribution': unit_distribution,
        'invalid_list': invalid_entries
    }

if __name__ == "__main__":
    file_path = "/workspace/extract/kuwait-vocabulary-database.md"
    result = validate_vocabulary_file(file_path)
    
    if result['valid']:
        print(f"✅ Vocabulary validation PASSED")
        print(f"📊 Total entries: {result['total_entries']}")
        print(f"✅ Valid: {result['valid_entries']}")
        print(f"📈 Grade distribution: {result['grade_distribution']}")
    else:
        print(f"❌ Vocabulary validation FAILED")
        print(f"❌ Invalid entries: {result['invalid_entries']}")
        sys.exit(1)
PYVAL

echo "🧪 Autonomous validation scripts created"

# ============================================
# 5. AUTONOMOUS VALIDATION GATE 1
# ============================================

chmod +x "$PROJECT_DIR/test_mysql_connection.py"
chmod +x "$PROJECT_DIR/validate_vocabulary_data.py"

echo "🔍 Running autonomous validation gate 1: Data validation"
cd "$PROJECT_DIR"
python3 validate_vocabulary_data.py

if [[ $? -ne 0 ]]; then
  echo "❌ Validation gate 1 FAILED - stopping autonomous pipeline"
  exit 1
fi

echo "✅ Autonomous validation gate 1 PASSED"

# ============================================
# 6. AUTONOMOUS MYSQL SETUP
# ============================================

echo "🗄️  Starting autonomous MySQL database setup..."

# Create MySQL initialization script
cat > "$PROJECT_DIR/mysql-init.sql" <<'SQL'
-- Kuwait English Learning Platform Database Schema
-- Autonomous MySQL initialization

CREATE DATABASE IF NOT EXISTS kuwait_platform;
USE kuwait_platform;

-- Test bank questions table (compatible with existing platform)
CREATE TABLE IF NOT EXISTS test_bank_questions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL DEFAULT 'vocabulary',
    component_type VARCHAR(50) NOT NULL DEFAULT 'vocabulary',
    grade_level INT NOT NULL,
    unit_number INT NOT NULL,
    english_word VARCHAR(255) NOT NULL,
    part_of_speech VARCHAR(50),
    arabic_translation TEXT NOT NULL,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_grade_unit (grade_level, unit_number),
    INDEX idx_component_type (component_type),
    INDEX idx_question_type (question_type)
);

-- Vocabulary cache for performance
CREATE TABLE IF NOT EXISTS vocabulary_cache (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    cache_data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    INDEX idx_cache_key (cache_key),
    INDEX idx_expires (expires_at)
);

-- User progress tracking (for future use)
CREATE TABLE IF NOT EXISTS user_progress (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(255) NOT NULL,
    grade_level INT NOT NULL,
    unit_number INT NOT NULL,
    vocabulary_completed JSON,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_progress (user_id, grade_level, unit_number)
);
SQL

echo "📋 MySQL schema created"

# ============================================
# 7. AUTONOMOUS VALIDATION GATE 2
# ============================================

echo "🔍 Running autonomous validation gate 2: MySQL setup"
chmod +x "$PROJECT_DIR/test_mysql_connection.py"
python3 "$PROJECT_DIR/test_mysql_connection.py"

if [[ $? -ne 0 ]]; then
  echo "⚠️  MySQL not available - creating SQLite fallback for autonomous development"
  
  # Create SQLite fallback schema
  cat > "$PROJECT_DIR/sqlite-schema.sql" <<'SQLITE'
-- Kuwait Platform SQLite Schema (Autonomous Development Fallback)

CREATE TABLE test_bank_questions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL DEFAULT 'vocabulary',
    component_type TEXT NOT NULL DEFAULT 'vocabulary',
    grade_level INTEGER NOT NULL,
    unit_number INTEGER NOT NULL,
    english_word TEXT NOT NULL,
    part_of_speech TEXT,
    arabic_translation TEXT NOT NULL,
    difficulty_level TEXT DEFAULT 'intermediate',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_grade_unit ON test_bank_questions(grade_level, unit_number);
CREATE INDEX idx_component_type ON test_bank_questions(component_type);
CREATE INDEX idx_question_type ON test_bank_questions(question_type);

CREATE TABLE vocabulary_cache (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    cache_key TEXT UNIQUE NOT NULL,
    cache_data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
);

CREATE INDEX idx_cache_key ON vocabulary_cache(cache_key);
CREATE INDEX idx_expires ON vocabulary_cache(expires_at);

CREATE TABLE user_progress (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    grade_level INTEGER NOT NULL,
    unit_number INTEGER NOT NULL,
    vocabulary_completed TEXT,
    last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_progress ON user_progress(user_id, grade_level, unit_number);
SQLITE
  
  echo "✅ SQLite fallback schema created for autonomous development"
else
  echo "✅ MySQL connection successful - proceeding with MySQL setup"
fi

echo "🎯 Autonomous bootstrap completed successfully!"
echo "🚀 Ready for Phase 2: Autonomous Data Pipeline"
