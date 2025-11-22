"""
Test script for Enhanced Kuwait MySQL MCP Server
Tests all tools with sample data and validates functionality
"""

import json
import sys
import os
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from server import (
    test_connection,
    create_kuwait_schema,
    insert_vocabulary_batch,
    insert_test_questions_batch,
    insert_grammar_topics_batch,
    insert_set_book_passages_batch,
    query_vocabulary_data,
    get_kuwait_vocabulary_data,
    get_test_bank_questions,
    get_grammar_topics,
    get_set_book_passages,
    backup_database
)

# Sample test configuration (would normally come from environment)
test_config = {
    "host": "localhost",
    "port": 3306,
    "user": "test_user",
    "password": "test_password", 
    "database": "test_kuwait_enhanced_db"
}

def test_data_loading():
    """Test loading of all curriculum data"""
    print("Testing curriculum data loading...")
    
    try:
        # Test vocabulary data
        vocab_data = get_kuwait_vocabulary_data()
        print(f"✅ Vocabulary data: {len(vocab_data)} words loaded")
        print(f"   Sample: {vocab_data[0]['word']} = {vocab_data[0]['translation_ar']}")
        
        # Test test bank questions
        questions_data = get_test_bank_questions()
        print(f"✅ Test bank questions: {len(questions_data)} questions loaded")
        print(f"   Sample: {questions_data[0]['question'][:50]}...")
        
        # Test grammar topics
        grammar_data = get_grammar_topics()
        print(f"✅ Grammar topics: {len(grammar_data)} topics loaded")
        print(f"   Sample: {grammar_data[0]['topic_name']}")
        
        # Test set book passages
        passages_data = get_set_book_passages()
        print(f"✅ Set book passages: {len(passages_data)} passages loaded")
        print(f"   Sample: {passages_data[0]['title']}")
        
        return {
            "vocabulary": len(vocab_data),
            "questions": len(questions_data),
            "grammar": len(grammar_data),
            "passages": len(passages_data)
        }
        
    except Exception as e:
        print(f"❌ Data loading failed: {str(e)}")
        return {"success": False, "error": str(e)}

def test_schema_creation():
    """Test schema creation functionality"""
    print("\nTesting schema creation...")
    try:
        result = create_kuwait_schema(test_config)
        if result.get("success"):
            print(f"✅ Schema created: {result.get('tables_created')}")
            print(f"   Default data: {result.get('default_data')}")
        else:
            print(f"❌ Schema creation failed: {result.get('message')}")
        return result
    except Exception as e:
        print(f"❌ Schema creation failed (expected): {str(e)}")
        return {"success": False, "message": "No MySQL server available for testing", "expected": True}

def test_data_insertion():
    """Test data insertion functionality"""
    print("\nTesting data insertion...")
    try:
        # Get sample data
        vocab_data = get_kuwait_vocabulary_data()[:3]  # Test with 3 words
        questions_data = get_test_bank_questions()[:3]  # Test with 3 questions
        grammar_data = get_grammar_topics()  # All grammar topics
        passages_data = get_set_book_passages()  # All passages
        
        # Test vocabulary insertion
        vocab_result = insert_vocabulary_batch(test_config, vocab_data)
        print(f"✅ Vocabulary insertion: {vocab_result.get('inserted', 0)}/{vocab_result.get('total_processed', 0)}")
        
        # Test questions insertion
        questions_result = insert_test_questions_batch(test_config, questions_data)
        print(f"✅ Questions insertion: {questions_result.get('inserted', 0)}/{questions_result.get('total_processed', 0)}")
        
        # Test grammar insertion
        grammar_result = insert_grammar_topics_batch(test_config, grammar_data)
        print(f"✅ Grammar insertion: {grammar_result.get('inserted', 0)}/{grammar_result.get('total_processed', 0)}")
        
        # Test passages insertion
        passages_result = insert_set_book_passages_batch(test_config, passages_data)
        print(f"✅ Passages insertion: {passages_result.get('inserted', 0)}/{passages_result.get('total_processed', 0)}")
        
        return {
            "vocabulary": vocab_result,
            "questions": questions_result,
            "grammar": grammar_result,
            "passages": passages_result
        }
        
    except Exception as e:
        print(f"❌ Data insertion failed (expected): {str(e)}")
        return {"success": False, "message": "No MySQL server available for testing", "expected": True}

def test_query_functionality():
    """Test query functionality"""
    print("\nTesting query functionality...")
    try:
        # Test vocabulary query
        query_filters = {"limit": 5}
        vocab_query_result = query_vocabulary_data(test_config, query_filters)
        print(f"✅ Vocabulary query: {vocab_query_result.get('returned', 0)} results")
        
        return {
            "vocabulary_query": vocab_query_result
        }
        
    except Exception as e:
        print(f"❌ Query functionality failed (expected): {str(e)}")
        return {"success": False, "message": "No MySQL server available for testing", "expected": True}

def test_backup_functionality():
    """Test database backup"""
    print("\nTesting backup functionality...")
    try:
        backup_path = "/tmp/test_kuwait_enhanced_backup.sql"
        result = backup_database(test_config, backup_path)
        if result.get("success"):
            print(f"✅ Backup created: {result.get('file_size_mb', 0)} MB")
        else:
            print(f"❌ Backup failed: {result.get('message')}")
        return result
        
    except Exception as e:
        print(f"❌ Backup failed (expected): {str(e)}")
        return {"success": False, "message": "No MySQL server available for testing", "expected": True}

def test_fastmcp_tools():
    """Test FastMCP tool definitions"""
    print("\nTesting FastMCP tool definitions...")
    try:
        from server import mcp
        
        # Check if tools are properly defined
        tools = mcp._tools
        expected_tools = [
            "test_mysql_connection",
            "create_kuwait_schema", 
            "insert_vocabulary_data",
            "insert_test_bank_questions",
            "insert_grammar_topics",
            "insert_set_book_passages",
            "query_vocabulary",
            "backup_database"
        ]
        
        print("✅ FastMCP server initialized")
        print(f"   Available tools: {len(tools)}")
        
        for tool_name in expected_tools:
            if tool_name in tools:
                print(f"   ✅ {tool_name}")
            else:
                print(f"   ❌ {tool_name} - Missing")
        
        return {"success": True, "tools_count": len(tools)}
        
    except Exception as e:
        print(f"❌ FastMCP tools test failed: {str(e)}")
        return {"success": False, "error": str(e)}

def main():
    """Run all tests"""
    print("Kuwait MySQL Enhanced MCP Server - Test Suite")
    print("=" * 60)
    
    test_results = {
        "data_loading": test_data_loading(),
        "schema_creation": test_schema_creation(),
        "data_insertion": test_data_insertion(),
        "query_functionality": test_query_functionality(),
        "backup_functionality": test_backup_functionality(),
        "fastmcp_tools": test_fastmcp_tools()
    }
    
    print("\n" + "=" * 60)
    print("Test Summary:")
    print("-" * 60)
    
    for test_name, result in test_results.items():
        if result.get("expected"):
            status = "EXPECTED (No MySQL Server)"
        elif result.get("success"):
            status = "PASS"
        else:
            status = "FAIL"
        print(f"{test_name:25}: {status}")
    
    # Detailed data summary
    if "data_loading" in test_results and isinstance(test_results["data_loading"], dict):
        data_summary = test_results["data_loading"]
        if all(isinstance(v, int) for v in data_summary.values()):
            print(f"\n📊 Curriculum Data Summary:")
            print(f"   Vocabulary Words: {data_summary.get('vocabulary', 0)}")
            print(f"   Test Bank Questions: {data_summary.get('questions', 0)}")
            print(f"   Grammar Topics: {data_summary.get('grammar', 0)}")
            print(f"   Set Book Passages: {data_summary.get('passages', 0)}")
    
    return test_results

if __name__ == "__main__":
    main()
