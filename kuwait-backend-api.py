#!/usr/bin/env python3
"""
Kuwait English Learning Platform - Backend API Server
Serves SQLite database data to React frontend via REST API
"""

import sqlite3
import json
import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from functools import wraps
from contextlib import contextmanager

app = Flask(__name__)

# Secure CORS configuration - restrict to specific origins
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000').split(',')
CORS(app, origins=ALLOWED_ORIGINS, supports_credentials=True)

DB_PATH = '/workspace/kuwait_english_platform.db'

# Whitelist of allowed table names to prevent SQL injection
ALLOWED_TABLES = {'vocabulary_words', 'test_bank_questions', 'grammar_content', 'set_book_passages'}

# Database connection pool (simple implementation for SQLite)
_db_pool = None

def get_db_connection():
    """Get database connection with connection pooling"""
    global _db_pool
    try:
        if _db_pool is None:
            _db_pool = sqlite3.connect(DB_PATH, check_same_thread=False)
            _db_pool.row_factory = sqlite3.Row
            # Enable WAL mode for better concurrency
            _db_pool.execute('PRAGMA journal_mode=WAL')
        return _db_pool
    except Exception as e:
        app.logger.error(f"Database connection error: {e}")
        return None

@contextmanager
def get_db():
    """Context manager for database operations"""
    conn = get_db_connection()
    try:
        yield conn
    except Exception as e:
        if conn:
            conn.rollback()
        app.logger.error(f"Database error: {e}")
        raise
    # Note: We don't close the connection as we're using a pool

def validate_table_name(table_name: str) -> bool:
    """Validate table name against whitelist to prevent SQL injection"""
    return table_name in ALLOWED_TABLES

def sanitize_input(value, max_length=None):
    """Basic input sanitization"""
    if value is None:
        return None
    if isinstance(value, str):
        # Remove potentially dangerous characters
        value = re.sub(r'[;\'"\\]', '', value)
        if max_length:
            value = value[:max_length]
    return value

def validate_json_input(required_fields=None):
    """Decorator to validate JSON input"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                data = request.get_json() or {}
                if required_fields:
                    missing = [field for field in required_fields if field not in data]
                    if missing:
                        return jsonify({'error': f'Missing required fields: {", ".join(missing)}'}), 400
                return f(*args, **kwargs)
            except Exception as e:
                app.logger.error(f"Input validation error: {e}")
                return jsonify({'error': 'Invalid input'}), 400
        return decorated_function
    return decorator

# ==================== VOCABULARY ROUTES ====================

@app.route('/api/vocabulary', methods=['POST'])
@validate_json_input()
def get_vocabulary():
    """Get vocabulary words with optional filters"""
    try:
        data = request.get_json() or {}
        unit_id = data.get('unitId')
        difficulty = data.get('difficulty')
        
        # Sanitize inputs
        unit_id = sanitize_input(unit_id)
        difficulty = sanitize_input(difficulty)
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            query = "SELECT * FROM vocabulary_words WHERE 1=1"
            params = []
            
            if unit_id:
                try:
                    unit_id = int(unit_id)
                    query += " AND unit_id = ?"
                    params.append(unit_id)
                except (ValueError, TypeError):
                    return jsonify({'error': 'Invalid unit_id'}), 400
            
            if difficulty:
                difficulty = str(difficulty)
                if difficulty not in ['1', '2', '3']:
                    return jsonify({'error': 'Invalid difficulty level'}), 400
                query += " AND difficulty = ?"
                params.append(difficulty)
            
            query += " ORDER BY id LIMIT 1000"  # Add limit to prevent large queries
            
            cursor = conn.execute(query, params)
            words = [dict(row) for row in cursor.fetchall()]
            
            return jsonify(words)
        
    except Exception as e:
        app.logger.error(f"Error in get_vocabulary: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/vocabulary/search', methods=['POST'])
@validate_json_input()
def search_vocabulary():
    """Search vocabulary words"""
    try:
        data = request.get_json() or {}
        query = data.get('query', '').strip()
        
        if not query:
            return jsonify([])
        
        # Sanitize and limit search query length
        query = sanitize_input(query, max_length=100)
        if not query:
            return jsonify([])
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            search_query = """
            SELECT * FROM vocabulary_words 
            WHERE english LIKE ? OR arabic LIKE ? OR example LIKE ?
            ORDER BY 
                CASE 
                    WHEN english LIKE ? THEN 1
                    WHEN arabic LIKE ? THEN 2
                    ELSE 3
                END,
                id
            LIMIT 100
            """
            
            like_query = f"%{query}%"
            params = [like_query, like_query, like_query, like_query, like_query]
            
            cursor = conn.execute(search_query, params)
            words = [dict(row) for row in cursor.fetchall()]
            
            return jsonify(words)
        
    except Exception as e:
        app.logger.error(f"Error in search_vocabulary: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== QUESTIONS ROUTES ====================

@app.route('/api/questions', methods=['POST'])
@validate_json_input()
def get_questions():
    """Get test bank questions with optional filters"""
    try:
        data = request.get_json() or {}
        unit_id = data.get('unitId')
        question_type = data.get('questionType')
        grade_level = data.get('gradeLevel')
        
        # Sanitize inputs
        unit_id = sanitize_input(unit_id)
        question_type = sanitize_input(question_type, max_length=50)
        grade_level = sanitize_input(grade_level, max_length=20)
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            query = "SELECT * FROM test_bank_questions WHERE 1=1"
            params = []
            
            if unit_id:
                try:
                    unit_id = int(unit_id)
                    query += " AND unit_id = ?"
                    params.append(unit_id)
                except (ValueError, TypeError):
                    return jsonify({'error': 'Invalid unit_id'}), 400
            
            if question_type:
                query += " AND question_type = ?"
                params.append(question_type)
            
            if grade_level:
                query += " AND grade_level = ?"
                params.append(grade_level)
            
            query += " ORDER BY id LIMIT 1000"
            
            cursor = conn.execute(query, params)
            questions = [dict(row) for row in cursor.fetchall()]
            
            return jsonify(questions)
        
    except Exception as e:
        app.logger.error(f"Error in get_questions: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/questions/answer', methods=['POST'])
@validate_json_input(required_fields=['questionId', 'userAnswer'])
def submit_answer():
    """Submit answer and check correctness"""
    try:
        data = request.get_json() or {}
        question_id = sanitize_input(data.get('questionId'), max_length=100)
        user_answer = sanitize_input(data.get('userAnswer'), max_length=10)
        
        if not question_id or not user_answer:
            return jsonify({'error': 'Missing question ID or user answer'}), 400
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            # Get correct answer
            cursor = conn.execute(
                "SELECT correct_answer FROM test_bank_questions WHERE question_id = ?",
                (question_id,)
            )
            result = cursor.fetchone()
            
            if not result:
                return jsonify({'error': 'Question not found'}), 404
            
            correct_answer = result['correct_answer']
            is_correct = user_answer.lower() == correct_answer.lower()
            
            return jsonify({
                'isCorrect': is_correct,
                'correctAnswer': correct_answer,
                'explanation': 'Review the grammar rules and try again.' if not is_correct else 'Excellent work!'
            })
        
    except Exception as e:
        app.logger.error(f"Error in submit_answer: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== GRAMMAR ROUTES ====================

@app.route('/api/grammar', methods=['POST'])
@validate_json_input()
def get_grammar():
    """Get grammar topics"""
    try:
        data = request.get_json() or {}
        unit_id = sanitize_input(data.get('unitId'))
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            query = "SELECT * FROM grammar_content"
            params = []
            
            if unit_id:
                try:
                    unit_id = int(unit_id)
                    query += " WHERE unit_id = ?"
                    params.append(unit_id)
                except (ValueError, TypeError):
                    return jsonify({'error': 'Invalid unit_id'}), 400
            
            query += " ORDER BY id LIMIT 1000"
            
            cursor = conn.execute(query, params)
            topics = [dict(row) for row in cursor.fetchall()]
            
            return jsonify(topics)
        
    except Exception as e:
        app.logger.error(f"Error in get_grammar: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== SET BOOK ROUTES ====================

@app.route('/api/setbook', methods=['POST'])
@validate_json_input()
def get_setbook():
    """Get set book passages"""
    try:
        data = request.get_json() or {}
        unit_id = sanitize_input(data.get('unitId'))
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            query = "SELECT * FROM set_book_passages"
            params = []
            
            if unit_id:
                try:
                    unit_id = int(unit_id)
                    query += " WHERE unit_id = ?"
                    params.append(unit_id)
                except (ValueError, TypeError):
                    return jsonify({'error': 'Invalid unit_id'}), 400
            
            query += " ORDER BY id LIMIT 1000"
            
            cursor = conn.execute(query, params)
            passages = [dict(row) for row in cursor.fetchall()]
            
            return jsonify(passages)
        
    except Exception as e:
        app.logger.error(f"Error in get_setbook: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== PROGRESS ROUTES ====================

@app.route('/api/progress/<user_id>', methods=['GET'])
def get_progress(user_id):
    """Get user progress"""
    try:
        # Sanitize user_id
        user_id = sanitize_input(user_id, max_length=100)
        if not user_id:
            return jsonify({'error': 'Invalid user_id'}), 400
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            cursor = conn.execute(
                "SELECT * FROM user_progress WHERE user_id = ?",
                (user_id,)
            )
            result = cursor.fetchone()
            
            if result:
                return jsonify(dict(result))
            else:
                # Return default progress if user doesn't exist
                default_progress = {
                    'user_id': user_id,
                    'vocabulary_mastered': 0,
                    'questions_answered': 0,
                    'correct_answers': 0,
                    'grammar_topics_completed': 0,
                    'total_study_time': 0,
                    'last_activity': datetime.now().isoformat(),
                    'created_at': datetime.now().isoformat()
                }
                return jsonify(default_progress)
        
    except Exception as e:
        app.logger.error(f"Error in get_progress: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/progress/<user_id>', methods=['PUT'])
@validate_json_input()
def update_progress(user_id):
    """Update user progress"""
    try:
        data = request.get_json() or {}
        
        # Sanitize user_id
        user_id = sanitize_input(user_id, max_length=100)
        if not user_id:
            return jsonify({'error': 'Invalid user_id'}), 400
        
        # Validate and sanitize numeric inputs
        try:
            vocabulary_mastered = max(0, int(data.get('vocabulary_mastered', 0)))
            questions_answered = max(0, int(data.get('questions_answered', 0)))
            correct_answers = max(0, int(data.get('correct_answers', 0)))
            grammar_topics_completed = max(0, int(data.get('grammar_topics_completed', 0)))
            total_study_time = max(0, int(data.get('total_study_time', 0)))
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid numeric values'}), 400
        
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            # Check if user exists
            cursor = conn.execute(
                "SELECT id FROM user_progress WHERE user_id = ?",
                (user_id,)
            )
            result = cursor.fetchone()
            
            if result:
                # Update existing progress
                update_query = """
                UPDATE user_progress SET
                    vocabulary_mastered = ?,
                    questions_answered = ?,
                    correct_answers = ?,
                    grammar_topics_completed = ?,
                    total_study_time = ?,
                    last_activity = ?
                WHERE user_id = ?
                """
                params = [
                    vocabulary_mastered,
                    questions_answered,
                    correct_answers,
                    grammar_topics_completed,
                    total_study_time,
                    datetime.now().isoformat(),
                    user_id
                ]
            else:
                # Insert new progress
                update_query = """
                INSERT INTO user_progress (
                    user_id, vocabulary_mastered, questions_answered,
                    correct_answers, grammar_topics_completed, total_study_time
                ) VALUES (?, ?, ?, ?, ?, ?)
                """
                params = [
                    user_id,
                    vocabulary_mastered,
                    questions_answered,
                    correct_answers,
                    grammar_topics_completed,
                    total_study_time
                ]
            
            conn.execute(update_query, params)
            conn.commit()
            
            return jsonify({'success': True, 'message': 'Progress updated successfully'})
        
    except Exception as e:
        app.logger.error(f"Error in update_progress: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== UTILITY ROUTES ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Check database connection
        with get_db() as conn:
            if conn:
                cursor = conn.execute("SELECT COUNT(*) FROM vocabulary_words")
                vocab_count = cursor.fetchone()[0]
                
                return jsonify({
                    'status': 'healthy',
                    'database': 'connected',
                    'vocabulary_words': vocab_count,
                    'timestamp': datetime.now().isoformat()
                })
            else:
                return jsonify({
                    'status': 'unhealthy',
                    'database': 'disconnected',
                    'error': 'Could not connect to database'
                }), 500
            
    except Exception as e:
        app.logger.error(f"Error in health_check: {e}")
        return jsonify({
            'status': 'error',
            'error': 'Internal server error'
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get platform statistics"""
    try:
        with get_db() as conn:
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            # Get counts from all tables using parameterized queries
            stats = {}
            tables = ['vocabulary_words', 'test_bank_questions', 'grammar_content', 'set_book_passages']
            
            for table in tables:
                # Validate table name to prevent SQL injection
                if not validate_table_name(table):
                    app.logger.warning(f"Invalid table name requested: {table}")
                    continue
                # SQLite doesn't support parameterized table names, so we use whitelist validation
                cursor = conn.execute(f"SELECT COUNT(*) FROM {table}")
                stats[table] = cursor.fetchone()[0]
            
            return jsonify(stats)
        
    except Exception as e:
        app.logger.error(f"Error in get_stats: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ==================== MAIN ====================

if __name__ == '__main__':
    # Security: Disable debug mode in production
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.getenv('PORT', '5000'))
    host = os.getenv('HOST', '0.0.0.0')
    
    print("🚀 Starting Kuwait English Learning Platform API Server...")
    print("📊 Database:", DB_PATH)
    print("🌐 Server will be available at: http://{}:{}".format(host, port))
    print("🔒 Debug mode: {}".format('ENABLED' if debug_mode else 'DISABLED'))
    print("📚 API Endpoints:")
    print("   • GET  /api/health - Health check")
    print("   • GET  /api/stats - Platform statistics")
    print("   • POST /api/vocabulary - Get vocabulary words")
    print("   • POST /api/vocabulary/search - Search vocabulary")
    print("   • POST /api/questions - Get test questions")
    print("   • POST /api/questions/answer - Submit answer")
    print("   • POST /api/grammar - Get grammar topics")
    print("   • POST /api/setbook - Get set book passages")
    print("   • GET  /api/progress/<user_id> - Get user progress")
    print("   • PUT  /api/progress/<user_id> - Update user progress")
    
    app.run(debug=debug_mode, host=host, port=port)