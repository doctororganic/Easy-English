# Kuwait English Learning Platform - MySQL MCP Server (Enhanced)

A comprehensive Model Context Protocol (MCP) server for managing MySQL databases specifically designed for the Kuwait English Learning Platform. This enhanced server provides complete database lifecycle management with all curriculum data integrated.

## 🚀 Features

### Database Connection Management
- **Connection Testing**: Test MySQL connections with detailed server information
- **Multi-Database Support**: Support for multiple MySQL configurations
- **Environment Configuration**: Configurable via environment variables or tool parameters

### Kuwait Curriculum Schema
- **4 Core Tables**: Complete database schema specifically for Kuwait curriculum
  - `vocabulary_words`: 30+ words from Grade 12 Unit 1 (Legal theme)
  - `test_bank_questions`: 43+ questions with multiple choice options
  - `grammar_topics`: 2 grammar topics with explanations and examples
  - `set_book_passages`: Reading passages with English and Arabic content

### Curriculum Data Integration
- **Vocabulary Management**: 30+ vocabulary words with Arabic translations, examples, and synonyms
- **Test Bank Questions**: Complete question bank with multiple choice options and correct answers
- **Grammar Topics**: Present Perfect Tense and Comparative/Contrastive Connectors
- **Set Book Content**: Reading passages with bilingual support (English/Arabic)

### Advanced Data Operations
- **Bulk Insertion**: Efficient batch insertion of curriculum data
- **Advanced Querying**: Filter vocabulary by word, class, unit, and difficulty level
- **Search Capabilities**: Full-text search across vocabulary and content
- **Data Validation**: Built-in validation and error handling
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality

### Database Utilities
- **Schema Creation**: Automatic creation of curriculum tables with proper relationships
- **Backup/Restore**: Database backup using mysqldump
- **Data Export**: Export curriculum data in various formats
- **Migration Support**: Convert data from other formats to MySQL

## 📋 Curriculum Content Summary

### Vocabulary Words (30+)
- **Theme**: Grade 12 Unit 1 (Legal theme)
- **Examples**: adoption, bench, case, court, legal, penalty, principle, property, sue, etc.
- **Features**: Arabic translations, example sentences, synonyms, difficulty levels
- **Categories**: Legal terms, business vocabulary, general English

### Test Bank Questions (43+)
- **Types**: Multiple choice questions
- **Topics**: Vocabulary, Present Perfect Tense, Comparative Connectors
- **Features**: 4 options (a, b, c, d), correct answers, explanations
- **Difficulty Levels**: 1 (easy), 2 (medium), 3 (hard)

### Grammar Topics (2)
1. **Present Perfect Tense**
   - Structure: Subject + have/has + past participle
   - Time expressions: just, already, never, yet, for, since
   - Examples and usage rules

2. **Comparative and Contrastive Connectors**
   - Connectors: whereas, instead of, on the other hand, in comparison with
   - Usage patterns and examples
   - Contrast and comparison functions

### Set Book Passages (Bilingual)
- **English Content**: Reading passages about urban farming
- **Arabic Translation**: Complete Arabic translations
- **Word Count**: Various passage lengths
- **Difficulty Levels**: Adaptable to different proficiency levels

## 🛠️ Installation

### Prerequisites
- Python 3.10 or higher
- MySQL 8.0+ server
- uv package manager

### Quick Setup
1. Clone or download the project
2. Ensure MySQL server is running and accessible
3. Set up environment variables or use tool parameters
4. The server will automatically create the virtual environment and install dependencies

## ⚙️ Configuration

### Environment Variables
```bash
# Required for all operations
export MYSQL_USER="your_mysql_username"
export MYSQL_PASSWORD="your_mysql_password"
export MYSQL_DATABASE="kuwait_english_platform"

# Optional (defaults provided)
export MYSQL_HOST="localhost"
export MYSQL_PORT="3306"
export MYSQL_CHARSET="utf8mb4"
export MYSQL_COLLATION="utf8mb4_unicode_ci"
```

### Database Setup
```sql
-- Create user
CREATE USER 'kuwait_mcp'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX ON kuwait_english_platform.* TO 'kuwait_mcp'@'localhost';

-- Refresh privileges
FLUSH PRIVILEGES;
```

## 🛠️ Available Tools

### 1. test_mysql_connection
Test MySQL connection and get server information.

**Parameters:**
- `host` (optional): MySQL host
- `port` (optional): MySQL port
- `user` (optional): MySQL user
- `password` (optional): MySQL password
- `database` (optional): MySQL database

**Returns:** Connection status, server version, user info, table count

### 2. create_kuwait_schema
Create Kuwait curriculum database schema with all 4 required tables.

**Creates Tables:**
- `vocabulary_words`: Vocabulary with Arabic translations
- `test_bank_questions`: Multiple choice questions with answers
- `grammar_topics`: Grammar rules and explanations
- `set_book_passages`: Reading passages with bilingual content

### 3. insert_vocabulary_data
Insert 30+ vocabulary words from Grade 12 Unit 1 (Legal theme).

**Parameters:**
- `vocabulary_data` (optional): Array of vocabulary objects (uses default data if not provided)
  - `word`: English word
  - `translation_ar`: Arabic translation
  - `class_id`: Class ID (default: 1)
  - `unit_id`: Unit ID (default: 1)
  - `order_in_unit`: Order within unit
  - `difficulty_level`: "1", "2", or "3"
  - `examples`: Array of example sentences
  - `synonyms`: Array of synonyms

### 4. insert_test_bank_questions
Insert 43+ test bank questions from Grade 12 test bank.

**Parameters:**
- `questions_data` (optional): Array of question objects (uses default data if not provided)
  - `id`: Question ID
  - `question`: Question text
  - `options_a`, `options_b`, `options_c`, `options_d`: Multiple choice options
  - `correct_answer`: Correct option (a, b, c, or d)
  - `explanation`: Answer explanation
  - `topic`: Question topic
  - `difficulty_level`: "1", "2", or "3"

### 5. insert_grammar_topics
Insert 2 grammar topics with explanations and examples.

**Parameters:**
- `grammar_data` (optional): Array of grammar topic objects (uses default data if not provided)
  - `id`: Topic ID
  - `topic_name`: Grammar topic name
  - `content`: Main content/rules
  - `explanation`: Detailed explanation
  - `examples`: Array of example sentences
  - `difficulty_level`: "1", "2", or "3"

### 6. insert_set_book_passages
Insert set book content with English and Arabic text.

**Parameters:**
- `passages_data` (optional): Array of passage objects (uses default data if not provided)
  - `id`: Passage ID
  - `title`: Passage title
  - `english_content`: English text
  - `arabic_content`: Arabic translation
  - `word_count`: Number of words
  - `difficulty_level`: "1", "2", or "3"

### 7. query_vocabulary
Query Kuwait vocabulary data with advanced filtering.

**Parameters:**
- `word`: Search for specific word (partial match)
- `class_id`: Filter by class (default: 1)
- `unit_id`: Filter by unit (default: 1)
- `difficulty_level`: Filter by difficulty ("1", "2", "3")
- `limit`: Results limit (default: 100)
- `offset`: Pagination offset (default: 0)

### 8. backup_database
Create database backup using mysqldump.

**Parameters:**
- `backup_path` (required): Path to save backup file

## 📊 Database Schema

### Vocabulary Words Table
```sql
CREATE TABLE vocabulary_words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR(200) NOT NULL,
    translation_ar VARCHAR(200) NOT NULL,
    class_id INT,
    unit_id INT,
    order_in_unit INT DEFAULT 0,
    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
    category VARCHAR(50) DEFAULT 'vocabulary',
    examples JSON,
    synonyms JSON,
    ai_generated BOOLEAN DEFAULT FALSE,
    source VARCHAR(100) DEFAULT 'kuwait_curriculum',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Test Bank Questions Table
```sql
CREATE TABLE test_bank_questions (
    id VARCHAR(50) PRIMARY KEY,
    question TEXT NOT NULL,
    options_a VARCHAR(200) NOT NULL,
    options_b VARCHAR(200) NOT NULL,
    options_c VARCHAR(200) NOT NULL,
    options_d VARCHAR(200) NOT NULL,
    correct_answer ENUM('a', 'b', 'c', 'd') NOT NULL,
    explanation TEXT,
    topic VARCHAR(100) DEFAULT 'vocabulary',
    class_id INT,
    unit_id INT,
    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
    ai_generated BOOLEAN DEFAULT FALSE,
    source VARCHAR(100) DEFAULT 'kuwait_testbank',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Grammar Topics Table
```sql
CREATE TABLE grammar_topics (
    id VARCHAR(50) PRIMARY KEY,
    topic_name VARCHAR(200) NOT NULL,
    class_id INT,
    unit_id INT,
    content_type ENUM('rule', 'example', 'exercise') DEFAULT 'rule',
    content TEXT NOT NULL,
    explanation TEXT,
    examples JSON,
    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
    ai_generated BOOLEAN DEFAULT FALSE,
    source VARCHAR(100) DEFAULT 'kuwait_grammar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Set Book Passages Table
```sql
CREATE TABLE set_book_passages (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    class_id INT,
    unit_id INT,
    content_type ENUM('reading_passage', 'writing_sample', 'speaking_topic') DEFAULT 'reading_passage',
    english_content TEXT NOT NULL,
    arabic_content TEXT,
    word_count INT,
    difficulty_level ENUM('1', '2', '3') DEFAULT '1',
    ai_generated BOOLEAN DEFAULT FALSE,
    source VARCHAR(100) DEFAULT 'set_book',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 💡 Usage Examples

### Example 1: Initial Setup
```bash
# 1. Test connection
test_mysql_connection

# 2. Create schema
create_kuwait_schema

# 3. Insert all curriculum data
insert_vocabulary_data
insert_test_bank_questions
insert_grammar_topics
insert_set_book_passages
```

### Example 2: Query Vocabulary
```python
# Query vocabulary with filters
query_vocabulary(
    word="legal",
    class_id=1,
    difficulty_level="2",
    limit=20
)
```

### Example 3: Data Management
```bash
# Create database backup
backup_database(backup_path="/backups/kuwait_enhanced_20231109.sql")
```

## 🔒 Security Best Practices

1. **Use Dedicated MySQL User**: Create a user with minimal required permissions
2. **Environment Variables**: Never hardcode credentials in scripts
3. **SSL Connections**: Enable SSL for production MySQL connections
4. **Access Control**: Restrict database access to specific IP ranges
5. **Regular Backups**: Implement automated backup procedures

## 🚨 Error Handling

All tools provide comprehensive error handling and detailed error messages:

- **Connection Errors**: Clear feedback on authentication and network issues
- **SQL Errors**: Specific error codes and messages for debugging
- **Data Validation**: Validation of input data before database operations
- **Transaction Safety**: Proper error handling for batch operations

## 📈 Performance Optimization

- **Batch Operations**: Efficient bulk insertion for large datasets
- **Connection Pooling**: Optimized database connections
- **Query Optimization**: Proper indexing and query structure
- **JSON Storage**: Efficient storage of examples and synonyms
- **Pagination**: Built-in pagination support for large result sets

## 🐛 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check MySQL server is running
   - Verify credentials and database name
   - Ensure MySQL user has proper permissions

2. **Schema Creation Failed**
   - Check if tables already exist
   - Verify foreign key relationships
   - Ensure proper table permissions

3. **Data Insertion Failed**
   - Check data format and required fields
   - Verify class_id and unit_id references
   - Ensure proper JSON format for examples/synonyms

### Logging
Enable detailed logging by setting the environment:
```bash
export PYTHONPATH=/path/to/kuwait-mysql-mcp-enhanced
export LOG_LEVEL=DEBUG
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push -u origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details.

## 🆘 Support

For issues and feature requests, please create an issue in the project repository.

---

**Note**: This enhanced MCP server is specifically designed for the Kuwait English Learning Platform and includes complete curriculum data integration with specialized features for managing educational content in both English and Arabic.
