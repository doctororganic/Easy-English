#!/usr/bin/env node

/**
 * MySQL Connection Test Script
 * Tests the MySQL database connection for Kuwait English Learning Platform
 */

const mysql = require('mysql2/promise');

async function testMySQLConnection() {
  console.log('🔍 Testing MySQL connection for Kuwait English Learning Platform...\n');
  
  const dbConfig = {
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
  };

  let connection;
  
  try {
    console.log('📡 Connecting to MySQL...');
    console.log(`Host: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`Database: ${dbConfig.database}`);
    console.log(`User: ${dbConfig.user}\n`);
    
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL connection successful!\n');
    
    // Test basic query
    console.log('🔍 Testing basic query...');
    const [rows] = await connection.execute('SELECT 1 as test_value, NOW() as current_time');
    console.log('✅ Query test successful:', rows[0]);
    console.log(`Current time: ${rows[0].current_time}\n`);
    
    // Test database structure
    console.log('🔍 Checking database structure...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Found ${tables.length} tables in database ${dbConfig.database}:`);
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];
      console.log(`  ${index + 1}. ${tableName}`);
    });
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. This might be a fresh database.');
    }
    
    // Test user privileges
    console.log('\n🔍 Checking user privileges...');
    const [privileges] = await connection.execute('SHOW GRANTS');
    console.log('User privileges:');
    privileges.forEach(priv => {
      console.log(`  • ${Object.values(priv)[0]}`);
    });
    
    console.log('\n🎉 MySQL connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MySQL connection test failed:');
    console.error('Error details:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Troubleshooting:');
      console.log('  • Make sure MySQL server is running');
      console.log('  • Check if the port (3306) is correct');
      console.log('  • Verify firewall settings');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n🔧 Troubleshooting:');
      console.log('  • Check username and password');
      console.log('  • Verify user has access to the database');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n🔧 Troubleshooting:');
      console.log('  • Database does not exist');
      console.log('  • Create the database or check the name');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔒 Connection closed.');
    }
  }
}

// Run the test
testMySQLConnection();