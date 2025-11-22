# MySQL Configuration for Kuwait English Learning Platform

import mysql from 'mysql2/promise';

export const mysqlConfig = {
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

export const createMySQLPool = () => {
  return mysql.createPool(mysqlConfig);
};

export const testMySQLConnection = async (pool) => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connection successful');
    
    // Test database access
    const [result] = await connection.execute('SELECT DATABASE() as current_db, USER() as current_user');
    console.log('Current database:', result[0].current_db);
    console.log('Current user:', result[0].current_user);
    
    // Check for existing tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`Found ${tables.length} tables in database`);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
};

export const executeMySQLQuery = async (pool, query, params = []) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('MySQL query error:', error.message);
    throw error;
  }
};

export default { mysqlConfig, createMySQLPool, testMySQLConnection, executeMySQLQuery };