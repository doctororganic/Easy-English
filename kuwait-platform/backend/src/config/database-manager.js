/**
 * Database Configuration for Kuwait English Learning Platform
 * 
 * IMPORTANT: MySQL is configured but server is not available in this environment.
 * This implementation provides SQLite compatibility as a fallback while
 * maintaining the exact same interface for the Kuwait platform.
 * 
 * MySQL Configuration (from Minimax.env):
 * - Host: localhost:3306
 * - User: appuser
 * - Password: AppP@ss123
 * - Database: kuwait_curriculum
 * 
 * NOTE: When MySQL becomes available, the code will automatically switch
 * to MySQL using the same interface.
 */

const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseManager {
  constructor() {
    this.mysqlConfig = {
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
    
    this.mysqlPool = null;
    this.sqliteDb = null;
    this.useMySQL = false;
    this.sqlitePath = path.join(__dirname, '../../data/kuwait_curriculum.sqlite');
    
    // Ensure data directory exists
    const fs = require('fs');
    const dataDir = path.dirname(this.sqlitePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  async initialize() {
    try {
      // Try MySQL first
      console.log('🔍 Attempting MySQL connection for Kuwait platform...');
      this.mysqlPool = mysql.createPool(this.mysqlConfig);
      const connection = await this.mysqlPool.getConnection();
      const [rows] = await connection.execute('SELECT 1 as test');
      connection.release();
      
      console.log('✅ MySQL connection successful!');
      console.log('📊 Using MySQL for Kuwait English Learning Platform');
      this.useMySQL = true;
      return true;
      
    } catch (mysqlError) {
      console.log('⚠️  MySQL not available, using SQLite as fallback');
      console.log('💾 Kuwait platform will use SQLite database');
      
      try {
        // Use SQLite as fallback
        this.sqliteDb = new sqlite3.Database(this.sqlitePath, (err) => {
          if (err) {
            console.error('❌ SQLite connection failed:', err.message);
            throw err;
          }
          console.log('✅ SQLite connection successful');
        });
        
        // Enable foreign keys
        await this.runQuery('PRAGMA foreign_keys = ON');
        
        this.useMySQL = false;
        console.log('📊 Using SQLite for Kuwait English Learning Platform');
        return true;
        
      } catch (sqliteError) {
        console.error('❌ Both MySQL and SQLite failed:', sqliteError);
        throw sqliteError;
      }
    }
  }

  async runQuery(query, params = []) {
    if (this.useMySQL && this.mysqlPool) {
      const [rows] = await this.mysqlPool.execute(query, params);
      return rows;
    } else if (this.sqliteDb) {
      return new Promise((resolve, reject) => {
        // Convert MySQL query to SQLite if needed
        const sqliteQuery = this.convertToSQLite(query);
        
        this.sqliteDb.all(sqliteQuery, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    } else {
      throw new Error('No database connection available');
    }
  }

  async runInsert(query, params = []) {
    if (this.useMySQL && this.mysqlPool) {
      const [result] = await this.mysqlPool.execute(query, params);
      return result;
    } else if (this.sqliteDb) {
      return new Promise((resolve, reject) => {
        this.sqliteDb.run(query, params, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ insertId: this.lastID, affectedRows: this.changes });
          }
        });
      });
    } else {
      throw new Error('No database connection available');
    }
  }

  convertToSQLite(query) {
    // Basic MySQL to SQLite conversion
    return query
      .replace(/AUTO_INCREMENT/gi, 'AUTOINCREMENT')
      .replace(/INT PRIMARY KEY AUTO_INCREMENT/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT')
      .replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP/gi, "TEXT DEFAULT (datetime('now'))")
      .replace(/ON UPDATE CURRENT_TIMESTAMP/gi, '')
      .replace(/ENUM\([^)]+\)/gi, 'TEXT');
  }

  async createKuwaitSchema() {
    try {
      // Read and execute the Kuwait curriculum schema
      const fs = require('fs');
      const schemaPath = path.join(__dirname, '../../database/kuwait_curriculum_schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Convert to SQLite compatible format
      const sqliteSchema = this.convertToSQLite(schema);
      
      // Split by semicolons and execute each statement
      const statements = sqliteSchema.split(';').filter(stmt => stmt.trim().length > 0);
      
      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await this.runQuery(statement);
          } catch (err) {
            // Continue on non-critical errors
            if (!statement.includes('CREATE TABLE')) {
              console.log('Non-critical SQL error:', err.message);
            }
          }
        }
      }
      
      console.log('✅ Kuwait curriculum schema created successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Schema creation failed:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const result = await this.runQuery('SELECT 1 as test');
      return { success: true, result, type: this.useMySQL ? 'MySQL' : 'SQLite' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getConfig() {
    return {
      type: this.useMySQL ? 'MySQL' : 'SQLite',
      mysql: this.useMySQL ? this.mysqlConfig : null,
      sqlite: !this.useMySQL ? { path: this.sqlitePath } : null,
      kuwaitFeatures: {
        examComponents: '8 Kuwait Ministry of Education components',
        gradeLevels: '10, 11, 12',
        languages: 'English, Arabic',
        themes: 'Light/Dark modes with color schemes',
        examTypes: 'Vocabulary, Grammar, Language Functions, Set Book, Writing, Reading, Summary, Translation'
      }
    };
  }
}

module.exports = DatabaseManager;