#!/usr/bin/env python3
"""
Kuwait English Learning Platform - Backend API Server
Serves SQLite database data to React frontend via REST API
"""

import sqlite3
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DB_PATH = '/workspace/kuwait_english_platform.db'

def get_db_connection():
    """Get database connection"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # Enable column access by name
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# ==================== VOCABULARY ROUTES ====================

@app.route('/api/vocabulary', methods=['POST'])
def get_vocabulary():
    """Get vocabulary words with optional filters"""
    try:
        data = request.get_json() or {}
        unit_id = data.get('unitId')
        difficulty = data.get('difficulty')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        query = "SELECT * FROM vocabulary_words WHERE 1=1"
        params = []
        
        if unit_id:
            query += " AND unit_id = ?"
            params.append(unit_id)
        
        if difficulty:
            query += " AND difficulty = ?"
            params.append(difficulty)
        
        query += " ORDER BY id"
        
        cursor = conn.execute(query, params)
        words = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(words)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vocabulary/search', methods=['POST'])
def search_vocabulary():
    """Search vocabulary words"""
    try:
        data = request.get_json() or {}
        query = data.get('query', '').strip()
        
        if not query:
            return jsonify([])
        
        conn = get_db_connection()
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
        """
        
        like_query = f"%{query}%"
        params = [like_query, like_query, like_query, like_query, like_query]
        
        cursor = conn.execute(search_query, params)
        words = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(words)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== QUESTIONS ROUTES ====================

@app.route('/api/questions', methods=['POST'])
def get_questions():
    """Get test bank questions with optional filters"""
    try:
        data = request.get_json() or {}
        unit_id = data.get('unitId')
        question_type = data.get('questionType')
        grade_level = data.get('gradeLevel')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        query = "SELECT * FROM test_bank_questions WHERE 1=1"
        params = []
        
        if unit_id:
            query += " AND unit_id = ?"
            params.append(unit_id)
        
        if question_type:
            query += " AND question_type = ?"
            params.append(question_type)
        
        if grade_level:
            query += " AND grade_level = ?"
            params.append(grade_level)
        
        query += " ORDER BY id"
        
        cursor = conn.execute(query, params)
        questions = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(questions)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/questions/answer', methods=['POST'])
def submit_answer():
    """Submit answer and check correctness"""
    try:
        data = request.get_json() or {}
        question_id = data.get('questionId')
        user_answer = data.get('userAnswer')
        
        if not question_id or not user_answer:
            return jsonify({'error': 'Missing question ID or user answer'}), 400
        
        conn = get_db_connection()
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
        
        conn.close()
        
        return jsonify({
            'isCorrect': is_correct,
            'correctAnswer': correct_answer,
            'explanation': 'Review the grammar rules and try again.' if not is_correct else 'Excellent work!'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== GRAMMAR ROUTES ====================

@app.route('/api/grammar', methods=['POST'])
def get_grammar():
    """Get grammar topics"""
    try:
        data = request.get_json() or {}
        unit_id = data.get('unitId')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        query = "SELECT * FROM grammar_content"
        params = []
        
        if unit_id:
            query += " WHERE unit_id = ?"
            params.append(unit_id)
        
        query += " ORDER BY id"
        
        cursor = conn.execute(query, params)
        topics = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(topics)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== SET BOOK ROUTES ====================

@app.route('/api/setbook', methods=['POST'])
def get_setbook():
    """Get set book passages"""
    try:
        data = request.get_json() or {}
        unit_id = data.get('unitId')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        query = "SELECT * FROM set_book_passages"
        params = []
        
        if unit_id:
            query += " WHERE unit_id = ?"
            params.append(unit_id)
        
        query += " ORDER BY id"
        
        cursor = conn.execute(query, params)
        passages = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(passages)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== PROGRESS ROUTES ====================

@app.route('/api/progress/<user_id>', methods=['GET'])
def get_progress(user_id):
    """Get user progress"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.execute(
            "SELECT * FROM user_progress WHERE user_id = ?",
            (user_id,)
        )
        result = cursor.fetchone()
        
        conn.close()
        
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
        return jsonify({'error': str(e)}), 500

@app.route('/api/progress/<user_id>', methods=['PUT'])
def update_progress(user_id):
    """Update user progress"""
    try:
        data = request.get_json() or {}
        
        conn = get_db_connection()
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
                data.get('vocabulary_mastered', 0),
                data.get('questions_answered', 0),
                data.get('correct_answers', 0),
                data.get('grammar_topics_completed', 0),
                data.get('total_study_time', 0),
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
                data.get('vocabulary_mastered', 0),
                data.get('questions_answered', 0),
                data.get('correct_answers', 0),
                data.get('grammar_topics_completed', 0),
                data.get('total_study_time', 0)
            ]
        
        conn.execute(update_query, params)
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Progress updated successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== UTILITY ROUTES ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Check database connection
        conn = get_db_connection()
        if conn:
            cursor = conn.execute("SELECT COUNT(*) FROM vocabulary_words")
            vocab_count = cursor.fetchone()[0]
            conn.close()
            
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
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get platform statistics"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        # Get counts from all tables
        stats = {}
        tables = ['vocabulary_words', 'test_bank_questions', 'grammar_content', 'set_book_passages']
        
        for table in tables:
            cursor = conn.execute(f"SELECT COUNT(*) FROM {table}")
            stats[table] = cursor.fetchone()[0]
        
        conn.close()
        
        return jsonify(stats)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ==================== MAIN ====================

if __name__ == '__main__':
    print("🚀 Starting Kuwait English Learning Platform API Server...")
    print("📊 Database:", DB_PATH)
    print("🌐 Server will be available at: http://localhost:5000")
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
    
    app.run(debug=True, host='0.0.0.0', port=5000)