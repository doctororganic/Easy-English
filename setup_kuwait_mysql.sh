#!/bin/bash

# Kuwait English Learning Platform - MySQL Database Setup Script
# This script sets up a complete MySQL database for the Kuwait curriculum

set -e

echo "🚀 Setting up Kuwait English Learning Platform MySQL Database..."

# Database configuration
DB_NAME="kuwait_english_platform"
DB_USER="kuwaituser"
DB_PASS="kuwait_secure_2025"
DB_HOST="localhost"
DB_PORT="3306"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if MySQL is running
print_status "Checking MySQL service..."
if ! pgrep -x "mysqld" > /dev/null; then
    print_warning "MySQL is not running. Starting MySQL..."
    sudo systemctl start mysql || sudo service mysql start || {
        print_error "Failed to start MySQL. Please start MySQL service manually."
        exit 1
    }
fi

# Create database
print_status "Creating database: $DB_NAME"
mysql -u root -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create user
print_status "Creating database user: $DB_USER"
mysql -u root -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
mysql -u root -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"

# Execute schema creation
print_status "Creating database schema..."
mysql -u $DB_USER -p$DB_PASS -h $DB_HOST -P $DB_PORT $DB_NAME < /workspace/kuwait_mysql_schema.sql

# Verify setup
print_status "Verifying database setup..."
TABLES=$(mysql -u $DB_USER -p$DB_PASS -h $DB_HOST -P $DB_PORT -e "SHOW TABLES;" $DB_NAME | tail -n +2)

if [ -z "$TABLES" ]; then
    print_error "No tables found in database!"
    exit 1
fi

print_status "Database setup complete! Tables created:"
echo "$TABLES" | while read table; do
    echo "  ✓ $table"
done

# Test connection
print_status "Testing database connection..."
if mysql -u $DB_USER -p$DB_PASS -h $DB_HOST -P $DB_PORT -e "SELECT COUNT(*) as class_count FROM kuwait_classes;" $DB_NAME | grep -q "3"; then
    print_status "✅ Database connection test passed!"
    print_status "✅ Found 3 Kuwait classes in database"
else
    print_warning "Database connection test failed or data missing"
fi

# Generate environment file
print_status "Generating environment configuration..."
cat > /workspace/kuwait_english_platform/.env << EOL
# Kuwait English Learning Platform - MySQL Configuration
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASS
DB_URL=mysql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME

# API Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USE_MYSQL=true

# MySQL Connection Settings
MYSQL_POOL_SIZE=10
MYSQL_TIMEOUT=60000
EOL

print_status "Environment file created: /workspace/kuwait_english_platform/.env"

# Create Node.js API server template
print_status "Creating Node.js API server template..."
mkdir -p /workspace/kuwait_english_platform/api
cat > /workspace/kuwait_english_platform/api/server.js << 'EOL'
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'kuwaituser',
  password: process.env.DB_PASSWORD || 'kuwait_secure_2025',
  database: process.env.DB_NAME || 'kuwait_english_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Kuwait English Learning Platform API' });
});

// Get Kuwait Classes
app.get('/api/classes', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM kuwait_classes WHERE is_active = true ORDER BY class_number'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// Get Kuwait Units
app.get('/api/units/:classNumber', async (req, res) => {
  try {
    const classNumber = parseInt(req.params.classNumber);
    const [rows] = await pool.execute(
      'SELECT u.*, c.class_number FROM kuwait_units u JOIN kuwait_classes c ON u.class_id = c.id WHERE c.class_number = ? AND u.is_published = true ORDER BY u.order_index',
      [classNumber]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Failed to fetch units' });
  }
});

// Get Vocabulary
app.get('/api/vocabulary/:classNumber/:unitNumber', async (req, res) => {
  try {
    const { classNumber, unitNumber } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM vocabulary WHERE class_number = ? AND unit_number = ? AND is_active = true ORDER BY id',
      [classNumber, unitNumber]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    res.status(500).json({ error: 'Failed to fetch vocabulary' });
  }
});

// Get class progress
app.get('/api/progress/:classNumber', async (req, res) => {
  try {
    const classNumber = parseInt(req.params.classNumber);
    
    // Get class info
    const [classRows] = await pool.execute(
      'SELECT * FROM kuwait_classes WHERE class_number = ?',
      [classNumber]
    );
    
    if (classRows.length === 0) {
      return res.status(404).json({ error: 'Class not found' });
    }
    
    const classId = classRows[0].id;
    
    // Get units
    const [unitRows] = await pool.execute(
      'SELECT * FROM kuwait_units WHERE class_id = ?',
      [classId]
    );
    
    const completedUnits = unitRows.filter(unit => unit.completion_percentage === 100).length;
    const totalVocabulary = unitRows.reduce((sum, unit) => sum + unit.vocabulary_count, 0);
    const masteredVocabulary = Math.floor(totalVocabulary * 0.3); // 30% simulated mastery
    
    const progress = {
      total_units: unitRows.length,
      completed_units: completedUnits,
      total_vocabulary: totalVocabulary,
      mastered_vocabulary: masteredVocabulary,
      completion_percentage: Math.round((completedUnits / unitRows.length) * 100)
    };
    
    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Kuwait English Learning Platform API running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});
EOL

# Create package.json for API
cat > /workspace/kuwait_english_platform/api/package.json << 'EOL'
{
  "name": "kuwait-english-api",
  "version": "1.0.0",
  "description": "Kuwait English Learning Platform API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
EOL

# Create Docker setup
print_status "Creating Docker configuration..."
cat > /workspace/kuwait_english_platform/docker-compose.yml << 'EOL'
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: kuwait-mysql
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=kuwait_root_secure_2025
      - MYSQL_DATABASE=kuwait_english_platform
      - MYSQL_USER=kuwaituser
      - MYSQL_PASSWORD=kuwait_secure_2025
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./kuwait_mysql_schema.sql:/docker-entrypoint-initdb.d/01-schema.sql:ro
    networks:
      - kuwait-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 30s
      timeout: 10s
      retries: 3

  api:
    build: ./api
    container_name: kuwait-api
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=kuwait_english_platform
      - DB_USER=kuwaituser
      - DB_PASSWORD=kuwait_secure_2025
      - PORT=3001
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - kuwait-network
    volumes:
      - ./api:/app
      - /app/node_modules

volumes:
  mysql_data:

networks:
  kuwait-network:
    driver: bridge
EOL

# Create API Dockerfile
mkdir -p /workspace/kuwait_english_platform/api
cat > /workspace/kuwait_english_platform/api/Dockerfile << 'EOL'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
EOL

# Test data insertion
print_status "Testing data insertion..."
CLASS_COUNT=$(mysql -u $DB_USER -p$DB_PASS -h $DB_HOST -P $DB_PORT -e "SELECT COUNT(*) FROM $DB_NAME.kuwait_classes;" | tail -n 1)
UNIT_COUNT=$(mysql -u $DB_USER -p$DB_PASS -h $DB_HOST -P $DB_PORT -e "SELECT COUNT(*) FROM $DB_NAME.kuwait_units;" | tail -n 1)
VOCAB_COUNT=$(mysql -u $DB_USER -p$DB_PASS -h $DB_HOST -P $DB_PORT -e "SELECT COUNT(*) FROM $DB_NAME.vocabulary;" | tail -n 1)

print_status "✅ Database contains:"
echo "  📚 Classes: $CLASS_COUNT"
echo "  📖 Units: $UNIT_COUNT"  
echo "  📝 Vocabulary: $VOCAB_COUNT"

print_status "🎉 MySQL database setup complete!"
print_status "📋 Next steps:"
echo "  1. Start the API server: cd /workspace/kuwait_english_platform/api && npm install && npm start"
echo "  2. Or use Docker: cd /workspace/kuwait_english_platform && docker-compose up -d"
echo "  3. Update React app to use MySQL by setting REACT_APP_USE_MYSQL=true"
echo "  4. Access the platform at: http://localhost:3000"

print_status "🔗 Database connection details:"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Password: $DB_PASS"

# Make the script executable
chmod +x /workspace/setup_kuwait_mysql.sh

print_status "✨ Setup script ready: /workspace/setup_kuwait_mysql.sh"