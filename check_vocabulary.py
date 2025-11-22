import os
import json
from supabase import create_client, Client

# Initialize Supabase client
url = "https://hkljprwxvdoxorhcbvpo.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"
supabase: Client = create_client(url, key)

# Fetch all vocabulary to check for errors
print("Fetching vocabulary data from Supabase...")
response = supabase.table('vocabulary').select('*').execute()

if response.data:
    print(f"\n✓ Found {len(response.data)} vocabulary entries")
    
    # Search for the "acute" error
    acute_entries = [v for v in response.data if 'acute' in v.get('word', '').lower()]
    
    if acute_entries:
        print(f"\n Found {len(acute_entries)} entries with 'acute':")
        for entry in acute_entries:
            print(f"  - ID: {entry.get('id')}, Word: {entry.get('word')}, Arabic: {entry.get('arabic_translation', 'N/A')}")
    
    # Save all vocabulary to file for analysis
    with open('data/vocabulary_dump.json', 'w', encoding='utf-8') as f:
        json.dump(response.data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Vocabulary data saved to data/vocabulary_dump.json")
    
    # Check for potential errors (missing translations, invalid data)
    errors = []
    for entry in response.data:
        if not entry.get('word'):
            errors.append(f"Missing word: {entry}")
        if not entry.get('arabic_translation'):
            errors.append(f"Missing Arabic translation for: {entry.get('word')}")
        if entry.get('arabic_translation') == 'No':
            errors.append(f"Invalid translation 'No' for: {entry.get('word')} (ID: {entry.get('id')})")
    
    if errors:
        print(f"\n⚠ Found {len(errors)} potential errors:")
        for error in errors[:20]:  # Show first 20 errors
            print(f"  - {error}")
        
        # Save errors to file
        with open('data/vocabulary_errors.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(errors))
        print(f"\n✓ All errors saved to data/vocabulary_errors.txt")
    else:
        print("\n✓ No errors found in vocabulary data")
else:
    print("✗ No vocabulary data found")
