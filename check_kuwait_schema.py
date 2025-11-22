#!/usr/bin/env python3
"""
Kuwait Secondary School Database Status Checker
Verifies the current database schema status and provides setup guidance
"""

import requests
import json
from datetime import datetime

# Supabase Configuration
SUPABASE_URL = "https://hkljprwxvdoxorhcbvpo.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"

headers = {
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
}

def check_table_exists(table_name: str) -> dict:
    """Check if a table exists and get basic info"""
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/{table_name}?select=id&limit=1",
            headers=headers
        )
        
        if response.status_code == 200:
            return {
                "table": table_name,
                "exists": True,
                "status": "Accessible",
                "error": None
            }
        elif "Could not find the table" in response.text:
            return {
                "table": table_name,
                "exists": False,
                "status": "Not Found",
                "error": "Table does not exist"
            }
        else:
            return {
                "table": table_name,
                "exists": False,
                "status": "Error",
                "error": response.text[:100] + "..."
            }
    except Exception as e:
        return {
            "table": table_name,
            "exists": False,
            "status": "Exception",
            "error": str(e)
        }

def get_table_count(table_name: str) -> int:
    """Get the count of records in a table"""
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/{table_name}?select=id",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            return len(data)
        else:
            return -1
    except:
        return -1

def check_schema_status():
    """Check the status of Kuwait schema tables"""
    
    print("🔍 Kuwait Secondary School Database Schema Status Check")
    print("="*60)
    
    # List of tables to check
    kuwait_tables = [
        "kuwait_classes",
        "kuwait_units", 
        "kuwait_vocabulary",
        "grammar_content",
        "grammar_questions",
        "user_progress",
        "learning_sessions",
        "curriculum_config"
    ]
    
    # Also check existing vocabulary table
    existing_tables = ["vocabulary"]
    
    all_tables = kuwait_tables + existing_tables
    
    print("\n📋 Checking Table Existence...")
    print("-" * 40)
    
    table_status = []
    
    for table_name in all_tables:
        status = check_table_exists(table_name)
        table_status.append(status)
        
        # Get record count if table exists
        if status["exists"]:
            count = get_table_count(table_name)
            status["record_count"] = count
        else:
            status["record_count"] = 0
            
        # Display status
        exists_icon = "✅" if status["exists"] else "❌"
        count_info = f" ({status['record_count']} records)" if status["exists"] else ""
        
        print(f"{exists_icon} {table_name:20} → {status['status']:12}{count_info}")
        if status["error"]:
            print(f"   Error: {status['error']}")
    
    # Summary
    print("\n" + "="*60)
    print("📊 DATABASE STATUS SUMMARY")
    print("="*60)
    
    existing_kuwait_tables = [t for t in table_status if t["table"] in kuwait_tables and t["exists"]]
    missing_kuwait_tables = [t for t in table_status if t["table"] in kuwait_tables and not t["exists"]]
    existing_vocabulary = [t for t in table_status if t["table"] == "vocabulary" and t["exists"]]
    
    print(f"✅ Kuwait Tables Created: {len(existing_kuwait_tables)}/8")
    print(f"❌ Kuwait Tables Missing: {len(missing_kuwait_tables)}/8")
    print(f"📚 Existing Vocabulary Table: {'Found' if existing_vocabulary else 'Not Found'}")
    
    if existing_vocabulary:
        vocab_count = existing_vocabulary[0].get("record_count", 0)
        print(f"📖 Vocabulary Records: {vocab_count}")
    
    # Recommendations
    print("\n" + "🔧 RECOMMENDATIONS")
    print("-" * 20)
    
    if len(missing_kuwait_tables) > 0:
        print("\n❗ MISSING TABLES - Execute schema creation:")
        print("1. Open Supabase SQL Editor")
        print("2. Copy content from: /workspace/supabase/kuwait_school_schema.sql")
        print("3. Execute the SQL script")
        print("4. Copy content from: /workspace/supabase/kuwait_rls_policies.sql")
        print("5. Execute the RLS policies")
        
        print(f"\nMissing tables:")
        for table in missing_kuwait_tables:
            print(f"  - {table}")
    
    if existing_vocabulary:
        print("\n✅ EXISTING VOCABULARY INTEGRATION:")
        print("- Vocabulary table exists and can be linked to Kuwait curriculum")
        print("- Use original_vocabulary_id field in kuwait_vocabulary table")
        print("- Run vocabulary fix script if needed (935/1000 entries have errors)")
    
    if len(existing_kuwait_tables) == len(kuwait_tables):
        print("\n🎉 SCHEMA SETUP COMPLETE:")
        print("- All Kuwait schema tables are created")
        print("- Ready to populate sample data")
        print("- Proceed with UI development for class-based navigation")
        
        # Check if data exists
        total_records = sum(t.get("record_count", 0) for t in existing_kuwait_tables)
        if total_records > 0:
            print(f"- Database contains {total_records} records")
            print("- Test with API endpoints to verify functionality")
        else:
            print("- No sample data found - run population script")
            print("- Execute manual INSERT statements from setup guide")
    
    # Next steps
    print("\n" + "🚀 NEXT STEPS")
    print("-" * 15)
    print("1. Complete schema setup (if tables missing)")
    print("2. Populate sample Kuwait curriculum data")
    print("3. Test database connections and API endpoints")
    print("4. Build class-based UI navigation system")
    print("5. Integrate vocabulary practice with Kuwait units")
    print("6. Connect grammar content to curriculum units")
    
    return table_status

def generate_setup_commands():
    """Generate setup commands for manual execution"""
    
    print("\n" + "💻 MANUAL SETUP COMMANDS")
    print("="*30)
    print("\n1. Execute in Supabase SQL Editor:")
    print("   📁 File: /workspace/supabase/kuwait_school_schema.sql")
    print("   📁 File: /workspace/supabase/kuwait_rls_policies.sql")
    
    print("\n2. Test API endpoints:")
    api_tests = [
        "curl -X GET 'https://hkljprwxvdoxorhcbvpo.supabase.co/rest/v1/kuwait_classes?select=*' -H 'Authorization: Bearer ...'",
        "curl -X GET 'https://hkljprwxvdoxorhcbvpo.supabase.co/rest/v1/kuwait_units?select=*&class_id=eq.1' -H 'Authorization: Bearer ...'",
        "curl -X GET 'https://hkljprwxvdoxorhcbvpo.supabase.co/rest/v1/vocabulary?select=id,word&limit=5' -H 'Authorization: Bearer ...'"
    ]
    
    for test in api_tests:
        print(f"   {test}")
    
    print(f"\n3. Run this script again to verify setup:")
    print(f"   python check_kuwait_schema.py")

if __name__ == "__main__":
    status = check_schema_status()
    generate_setup_commands()