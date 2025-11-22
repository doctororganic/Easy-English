import json
import requests
import time

SUPABASE_URL = "https://hkljprwxvdoxorhcbvpo.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGpwcnd4dmRveG9yaGNidnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ0ODYsImV4cCI6MjA3NzU0MDQ4Nn0.RN7ax6dITsRKMLCH9ptQZqYmsh7slXONVHH1Bn3ihwQ"

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

def update_vocabulary_entry(entry_id, new_translation):
    """Update a single vocabulary entry"""
    url = f"{SUPABASE_URL}/rest/v1/vocabulary?id=eq.{entry_id}"
    data = {"arabic_translation": new_translation}
    
    response = requests.patch(url, headers=headers, json=data)
    return response.status_code == 204

print("🔧 UPDATING VOCABULARY DATABASE\n")
print("="*60)

# Load translation updates
with open('data/vocabulary_translation_updates.json', 'r', encoding='utf-8') as f:
    updates = json.load(f)

print(f"\n📊 Total updates to apply: {len(updates)}")

# Filter out entries that need manual translation
auto_updates = [u for u in updates if not u['new_translation'].startswith('[ترجمة:')]
manual_updates = [u for u in updates if u['new_translation'].startswith('[ترجمة:')]

print(f"✓ Auto-fixable: {len(auto_updates)}")
print(f"⚠ Need manual review: {len(manual_updates)}\n")

# Update in batches
batch_size = 10
success_count = 0
error_count = 0

for i in range(0, len(auto_updates), batch_size):
    batch = auto_updates[i:i + batch_size]
    batch_num = i // batch_size + 1
    total_batches = (len(auto_updates) + batch_size - 1) // batch_size
    
    print(f"Processing batch {batch_num}/{total_batches}...")
    
    for update in batch:
        success = update_vocabulary_entry(update['id'], update['new_translation'])
        
        if success:
            success_count += 1
        else:
            error_count += 1
            print(f"  ✗ Failed to update ID {update['id']}: {update['word']}")
    
    # Small delay between batches
    time.sleep(0.3)

print('\n' + '='*60)
print(f"\n✅ UPDATE COMPLETE")
print(f"  ✓ Successfully updated: {success_count} entries")
print(f"  ✗ Failed: {error_count} entries")
print(f"  ⚠ Require manual translation: {len(manual_updates)} entries\n")

# Save manual review list
if manual_updates:
    with open('data/vocabulary_manual_review.json', 'w', encoding='utf-8') as f:
        json.dump(manual_updates, f, indent=2, ensure_ascii=False)
    print('✓ Manual review list saved to data/vocabulary_manual_review.json')
