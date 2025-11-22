#!/bin/bash

# MySQL Connection Test Script for Kuwait English Learning Platform

echo "🔍 Testing MySQL Connection for Kuwait English Learning Platform..."
echo ""

# MySQL connection parameters
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="appuser"
MYSQL_PASSWORD="AppP@ss123"
MYSQL_DATABASE="kuwait_curriculum"

echo "📡 Connection Details:"
echo "  Host: $MYSQL_HOST:$MYSQL_PORT"
echo "  Database: $MYSQL_DATABASE"
echo "  User: $MYSQL_USER"
echo ""

# Test MySQL connection
echo "🔍 Testing MySQL connection..."
if mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1" 2>/dev/null; then
    echo "✅ MySQL connection successful!"
    
    echo ""
    echo "🔍 Testing database access..."
    if mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -D"$MYSQL_DATABASE" -e "USE $MYSQL_DATABASE; SHOW TABLES;" 2>/dev/null; then
        echo "✅ Database access successful!"
        
        echo ""
        echo "📊 Listing tables in $MYSQL_DATABASE..."
        mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -D"$MYSQL_DATABASE" -e "SHOW TABLES;" 2>/dev/null
        
        echo ""
        echo "🎉 MySQL connection test completed successfully!"
        echo "📊 Connection is ready for Kuwait English Learning Platform"
    else
        echo "❌ Cannot access database $MYSQL_DATABASE"
        echo "   Database might not exist or user lacks permissions"
        exit 1
    fi
else
    echo "❌ MySQL connection failed!"
    echo ""
    echo "🔧 Troubleshooting steps:"
    echo "  1. Is MySQL server running? (systemctl status mysql)"
    echo "  2. Are credentials correct?"
    echo "  3. Is port 3306 accessible?"
    echo "  4. Check user permissions"
    exit 1
fi