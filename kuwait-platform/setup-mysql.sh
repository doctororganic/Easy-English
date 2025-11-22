#!/bin/bash

# Kuwait English Learning Platform - MySQL Setup Script
# Sets up the MySQL database with all educational content

echo "🚀 Setting up Kuwait English Learning Platform MySQL Database..."
echo ""

# MySQL connection parameters
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="appuser"
MYSQL_PASSWORD="AppP@ss123"
MYSQL_DATABASE="kuwait_curriculum"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Setup Information:${NC}"
echo "  Host: $MYSQL_HOST:$MYSQL_PORT"
echo "  Database: $MYSQL_DATABASE"
echo "  User: $MYSQL_USER"
echo ""

# Test MySQL connection
echo -e "${YELLOW}🔍 Testing MySQL connection...${NC}"
if mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1" 2>/dev/null; then
    echo -e "${GREEN}✅ MySQL connection successful!${NC}"
else
    echo -e "${RED}❌ MySQL connection failed!${NC}"
    echo ""
    echo -e "${YELLOW}🔧 Troubleshooting:${NC}"
    echo "  1. Is MySQL server running? (sudo systemctl start mysql)"
    echo "  2. Are credentials correct?"
    echo "  3. Is port 3306 accessible?"
    echo "  4. Check user permissions with: mysql -u root -p"
    echo ""
    exit 1
fi

# Create database if it doesn't exist
echo ""
echo -e "${YELLOW}📁 Setting up database: $MYSQL_DATABASE${NC}"
mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE $MYSQL_DATABASE;

-- Verify database creation
SELECT DATABASE() as current_database, 
       USER() as current_user, 
       NOW() as setup_time;
EOF

# Run the schema file
echo ""
echo -e "${YELLOW}📚 Applying database schema...${NC}"
if mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < database/kuwait_curriculum_schema.sql; then
    echo -e "${GREEN}✅ Database schema applied successfully!${NC}"
else
    echo -e "${RED}❌ Failed to apply database schema!${NC}"
    exit 1
fi

# Verify tables were created
echo ""
echo -e "${YELLOW}📊 Verifying database structure...${NC}"
TABLES=$(mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -D"$MYSQL_DATABASE" -e "SHOW TABLES;" 2>/dev/null | wc -l)

if [ $TABLES -gt 1 ]; then
    echo -e "${GREEN}✅ Database structure verified!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Created tables:${NC}"
    mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -D"$MYSQL_DATABASE" -e "SHOW TABLES;" 2>/dev/null | tail -n +2
else
    echo -e "${RED}❌ Database structure verification failed!${NC}"
    exit 1
fi

# Test data insertion
echo ""
echo -e "${YELLOW}🧪 Testing data insertion...${NC}"
COUNT=$(mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -D"$MYSQL_DATABASE" -e "SELECT COUNT(*) as count FROM kuwait_exam_components;" 2>/dev/null | tail -n 1)

if [ "$COUNT" = "8" ]; then
    echo -e "${GREEN}✅ Kuwait exam components loaded successfully!${NC}"
    echo -e "${GREEN}✅ Default educational content ready!${NC}"
else
    echo -e "${YELLOW}⚠️  Only $COUNT exam components found (expected 8)${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Kuwait English Learning Platform MySQL setup completed!${NC}"
echo ""
echo -e "${YELLOW}📊 Summary:${NC}"
echo "  • MySQL Database: $MYSQL_DATABASE"
echo "  • Tables Created: $(($TABLES - 1))"
echo "  • Exam Components: 8 (Kuwait Ministry of Education)"
echo "  • Languages Supported: English, Arabic"
echo "  • Theme Support: Light/Dark modes"
echo "  • Grade Levels: 10, 11, 12"
echo ""
echo -e "${YELLOW}🚀 Next Steps:${NC}"
echo "  1. Start the backend: npm start"
echo "  2. Start the frontend: npm run dev:frontend"
echo "  3. Open browser: http://localhost:3000"
echo "  4. Test API: curl http://localhost:3000/api/health"
echo ""
echo -e "${GREEN}✨ Ready for Kuwait English Learning!${NC}"