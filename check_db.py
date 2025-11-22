import json
import urllib.request
import urllib.error

SUPABASE_URL = "https://hkljprwxvdoxorhcbvpo.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"

def query_table(table_name):
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=*&limit=1"
    headers = {
        'apikey': ANON_KEY,
        'Authorization': f'Bearer {ANON_KEY}',
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"✓ Table {table_name} exists with {len(result)} rows")
            return True
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        if '42P01' in error_msg or 'does not exist' in error_msg:
            print(f"✗ Table {table_name} does NOT exist")
        else:
            print(f"? Table {table_name} check failed: {e.code}")
        return False

print("Checking Kuwait schema tables...")
tables = ['kuwait_classes', 'kuwait_units', 'kuwait_vocabulary', 'grammar_content', 'grammar_questions', 'user_progress', 'learning_sessions', 'curriculum_config']
for table in tables:
    query_table(table)
