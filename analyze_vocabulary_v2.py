import json

# Read the vocabulary data
with open('data/vocabulary_raw.json', 'r', encoding='utf-8') as f:
    vocab_data = json.load(f)

print(f"✓ Loaded {len(vocab_data)} vocabulary entries\n")

# Find errors
errors = []
acute_entries = []

for entry in vocab_data:
    # Check for "acute" entries
    if 'acute' in entry.get('word', '').lower():
        acute_entries.append(entry)
    
    # Check for generic/placeholder translations
    if entry.get('arabic_translation', '').startswith('كلمة_'):
        errors.append({
            'id': entry.get('id'),
            'word': entry.get('word'),
            'issue': f"Generic translation: {entry.get('arabic_translation')}",
            'category': entry.get('category')
        })
    
    # Check for "No" translation
    if entry.get('arabic_translation') == 'No':
        errors.append({
            'id': entry.get('id'),
            'word': entry.get('word'),
            'issue': "Invalid translation 'No'",
            'category': entry.get('category')
        })

print(f"🔍 Found {len(acute_entries)} entries with 'acute':")
for entry in acute_entries:
    print(f"  - ID: {entry['id']}, Word: {entry['word']}, Arabic: {entry.get('arabic_translation', 'N/A')}")

print(f"\n⚠ Found {len(errors)} vocabulary errors:")
for error in errors[:30]:  # Show first 30
    print(f"  - ID: {error['id']}, Word: {error['word']}, Issue: {error['issue']}")

if len(errors) > 30:
    print(f"  ... and {len(errors) - 30} more errors")

# Save clean vocabulary data
with open('data/vocabulary_clean.json', 'w', encoding='utf-8') as f:
    json.dump(vocab_data, f, indent=2, ensure_ascii=False)

# Save errors report
with open('data/vocabulary_errors_report.json', 'w', encoding='utf-8') as f:
    json.dump(errors, f, indent=2, ensure_ascii=False)

print(f"\n✓ Saved {len(vocab_data)} vocabulary entries to data/vocabulary_clean.json")
print(f"✓ Saved {len(errors)} errors to data/vocabulary_errors_report.json")
print(f"\n📊 Summary:")
print(f"  - Total vocabulary entries: {len(vocab_data)}")
print(f"  - Entries with errors: {len(errors)}")
print(f"  - Error rate: {len(errors)/len(vocab_data)*100:.1f}%")
