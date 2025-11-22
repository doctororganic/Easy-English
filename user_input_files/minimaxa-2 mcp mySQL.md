
mysql:
image: mysql:8.0
container_name: dental-mysql-prod
restart: unless-stopped
environment:
- MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-your-secure-root-password}
- MYSQL_DATABASE=${MYSQL_DATABASE:-dentaldb}
- MYSQL_USER=${MYSQL_USER:-dentaluser}
- MYSQL_PASSWORD=${MYSQL_PASSWORD:-securepass}
ports:
- "3306:3306"
volumes:
- mysql_data:/var/lib/mysql
- ./mysql-init:/docker-entrypoint-initdb.d:ro
networks:
- dental-network
healthcheck:
test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
interval: 30s
timeout: 10s
retries: 3
start_period: 40s

volumes:
mysql_data:

networks:
dental-network:
driver: bridge

### 3. MCP Configuration File

Create  .config/mcp/mysql.json :

{
"mcpServers": {
"mysql": {
"command": "npx",
"args": ["@modelcontextprotocol/server-mysql"],
"env": {
"MYSQL_HOST": "localhost",
"MYSQL_PORT": "3306",
"MYSQL_USER": "dentaluser",
"MYSQL_PASSWORD": "securepass",
"MYSQL_DATABASE": "dentaldb"
}
}
}
}

### 4. Environment Variables (.env)

MYSQL_ROOT_PASSWORD=your-secure-root-password
MYSQL_DATABASE=dentaldb
MYSQL_USER=dentaluser
MYSQL_PASSWORD=securepass
MYSQL_HOST=localhost
MYSQL_PORT=3306



### 5. Required Python Dependencies

Add to requirements.txt:

pymysql==1.1.1
mysql-connector-python==9.0.0
sqlalchemy==2.0.35

### 6. Sample MySQL Init Script (mysql-init/01-schema.sql)

CREATE DATABASE IF NOT EXISTS dentaldb;
USE dentaldb;

CREATE TABLE IF NOT EXISTS patients (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE,
phone VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
id INT AUTO_INCREMENT PRIMARY KEY,
patient_id INT,
appointment_date DATETIME,
notes TEXT,
status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
FOREIGN KEY (patient_id) REFERENCES patients(id)

### 7. Client Integration Code

import os
import pymysql
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Database connection
DATABASE_URL = os.getenv("MYSQL_URL", "mysql+pymysql://dentaluser:securepass@localhost:3306/dentaldb")

# SQLAlchemy engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Direct MySQL connection
def get_mysql_connection():
return pymysql.connect(
host=os.getenv("MYSQL_HOST", "localhost"),
port=int(os.getenv("MYSQL_PORT", 3306)),
user=os.getenv("MYSQL_USER", "dentaluser"),
password=os.getenv("MYSQL_PASSWORD", "securepass"),
database=os.getenv("MYSQL_DATABASE", "dentaldb")

### 8. Update Backend App Environment Variables

In your docker-compose.production.yml, add to dental-backend:

environment:
- MYSQL_URL=mysql+pymysql://dentaluser:securepass@mysql:3306/dentaldb
- MYSQL_HOST=mysql
- MYSQL_PORT=3306
- MYSQL_USER=dentaluser
- MYSQL_PASSWORD=securepass
- MYSQL_DATABASE=dentaldb

9. Testing the MCP Connection

async def test_mysql_mcp():
"""Test MySQL MCP server connection"""
try:
conn = get_mysql_connection()
cursor = conn.cursor()
cursor.execute("SELECT VERSION()")
version = cursor.fetchone()[0]
print(f"MySQL version: {version}")

cursor.execute("SHOW TABLES")
tables = cursor.fetchall()
print(f"Tables: {[table[0] for table in tables]}")

conn.close()
return True
except Exception as e:
print(f"Error connecting to MySQL: {e}")
return False

### 10. Security Considerations

• Use secrets management for production passwords
• Enable SSL connections:  ssl_ca=/path/to/ca.pem 
• Create read-only users for MCP operations
• Monitor connections with MySQL logs

This configuration provides complete MySQL MCP integration with your existing dental application infrastructure.