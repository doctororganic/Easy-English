import mysql from 'mysql2/promise';

/**
 * Database Configuration for Kuwait English Learning Platform
 * Supports both MySQL (primary) and Supabase (secondary/auth/realtime)
 */

export const databaseConfig = {
  // MySQL Database (Primary)
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'appuser',
    password: process.env.MYSQL_PASSWORD || 'AppP@ss123',
    database: process.env.MYSQL_DATABASE || 'kuwait_curriculum',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
  },
  
  // Supabase (Secondary - Auth & Realtime)
  supabase: {
    url: process.env.SUPABASE_URL || 'https://hkljprwxvdoxorhcbvpo.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTk2NDQ4NiwiZXhwIjoyMDc3NTQwNDg2fQ.heaHyMO4dBSo2PotYtcWR-QsVPUc4ZVJbng37GPX3Fo'
  },
  
  // Redis (Caching & Session Management)
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    options: {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3
    }
  }
};

// Create MySQL connection pool
export const mysqlPool = mysql.createPool(databaseConfig.mysql);

// MySQL helper functions
export const mysqlTestConnection = async (): Promise<boolean> => {
  try {
    const connection = await mysqlPool.getConnection();
    console.log('✅ MySQL connection successful');
    
    // Test query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ MySQL query test successful:', rows);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error);
    return false;
  }
};

export const executeMysqlQuery = async (query: string, params: any[] = []) => {
  try {
    const [rows] = await mysqlPool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('MySQL query execution error:', error);
    throw error;
  }
};

// Database migrations configuration
export const migrations = {
  path: './database/migrations',
  seedersPath: './database/seeders'
};

// Initialize all database connections
export const initializeDatabases = async () => {
  try {
    console.log('🔄 Initializing Kuwait Platform databases...');
    
    // Test MySQL connection
    const mysqlConnected = await mysqlTestConnection();
    
    if (mysqlConnected) {
      console.log('🎯 Kuwait Platform Database initialized successfully');
      console.log(`📊 MySQL: ${databaseConfig.mysql.database}@${databaseConfig.mysql.host}:${databaseConfig.mysql.port}`);
    }
    
    return mysqlConnected;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

export default mysqlPool;