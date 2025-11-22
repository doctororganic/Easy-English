const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// MySQL Configuration
const mysqlConfig = {
  host: 'localhost',
  port: 3306,
  user: 'appuser',
  password: 'AppP@ss123',
  database: 'kuwait_curriculum',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

const pool = mysql.createPool(mysqlConfig);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Test MySQL connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connection successful for Kuwait English Learning Platform');
    
    // Test basic query
    const [rows] = await connection.execute('SELECT DATABASE() as db, USER() as user, NOW() as time');
    console.log(`Database: ${rows[0].db}`);
    console.log(`User: ${rows[0].user}`);
    console.log(`Server Time: ${rows[0].time}`);
    
    // Check if tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`Found ${tables.length} tables in database`);
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`  - ${tableName}`);
    });
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

// API Routes

// Get all Kuwait exam components
app.get('/api/exam-components', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM kuwait_exam_components ORDER BY weight_percentage DESC');
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching exam components:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exam components',
      message: error.message
    });
  }
});

// Get questions by component and grade
app.get('/api/questions', async (req, res) => {
  try {
    const { component_id, grade_level, limit = 10 } = req.query;
    
    let query = `
      SELECT q.*, kc.component_name, qt.type_name 
      FROM questions q
      JOIN kuwait_exam_components kc ON q.component_id = kc.id
      JOIN question_types qt ON q.question_type_id = qt.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (component_id) {
      query += ' AND q.component_id = ?';
      params.push(component_id);
    }
    
    if (grade_level) {
      query += ' AND q.grade_level = ?';
      params.push(grade_level);
    }
    
    query += ' ORDER BY RAND() LIMIT ?';
    params.push(parseInt(limit));
    
    const [rows] = await pool.execute(query, params);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions',
      message: error.message
    });
  }
});

// Get user progress
app.get('/api/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT up.*, l.lesson_title, t.topic_name, s.subject_name
      FROM user_progress up
      JOIN lessons l ON up.lesson_id = l.id
      JOIN topics t ON l.topic_id = t.id
      JOIN subjects s ON t.subject_id = s.id
      WHERE up.user_id = ?
      ORDER BY up.updated_at DESC
    `, [userId]);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user progress',
      message: error.message
    });
  }
});

// Update user progress
app.post('/api/progress', async (req, res) => {
  try {
    const { user_id, lesson_id, status, time_spent, score } = req.body;
    
    // Check if record exists
    const [existing] = await pool.execute(
      'SELECT id FROM user_progress WHERE user_id = ? AND lesson_id = ?',
      [user_id, lesson_id]
    );
    
    if (existing.length > 0) {
      // Update existing record
      const [result] = await pool.execute(`
        UPDATE user_progress 
        SET status = ?, time_spent = ?, score = ?, completed_at = CASE WHEN ? = 'completed' THEN NOW() ELSE completed_at END
        WHERE user_id = ? AND lesson_id = ?
      `, [status, time_spent, score, status, user_id, lesson_id]);
      
      res.json({
        success: true,
        message: 'Progress updated successfully',
        affected_rows: result.affectedRows
      });
    } else {
      // Create new record
      const [result] = await pool.execute(`
        INSERT INTO user_progress (user_id, lesson_id, status, time_spent, score, completed_at)
        VALUES (?, ?, ?, ?, ?, CASE WHEN ? = 'completed' THEN NOW() ELSE NULL END)
      `, [user_id, lesson_id, status, time_spent, score, status]);
      
      res.json({
        success: true,
        message: 'Progress created successfully',
        insert_id: result.insertId
      });
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update progress',
      message: error.message
    });
  }
});

// Get lesson steps for PowerPoint-style animation
app.get('/api/lessons/:lessonId/steps', async (req, res) => {
  try {
    const { lessonId } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT ls.*, l.lesson_title
      FROM lesson_steps ls
      JOIN lessons l ON ls.lesson_id = l.id
      WHERE ls.lesson_id = ?
      ORDER BY ls.step_number
    `, [lessonId]);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching lesson steps:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lesson steps',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Kuwait English Learning Platform API is running',
    timestamp: new Date().toISOString(),
    database: 'MySQL'
  });
});

// Initialize database
async function initialize() {
  console.log('🚀 Starting Kuwait English Learning Platform...');
  
  // Test MySQL connection
  const connected = await testConnection();
  if (!connected) {
    console.log('⚠️  MySQL connection failed. Some features may not work.');
  }
  
  // Start server
  app.listen(port, () => {
    console.log(`📚 Kuwait English Learning Platform API running on port ${port}`);
    console.log(`🌍 Visit: http://localhost:${port}`);
    console.log(`📊 API Docs: http://localhost:${port}/api/health`);
  });
}

// Start the application
initialize().catch(console.error);

module.exports = app;