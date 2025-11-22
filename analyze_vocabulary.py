import json

# Read the vocabulary data
with open('/workspace/shell_output_save/_workspace_data_vocabulary_dump.json_1762092307.txt', 'r') as f:
    content = f.read()
    # Extract JSON from the output
    json_start = content.find('[{')
    json_end = content.rfind('}]') + 2
    json_str = content[json_start:json_end]
    vocab_data = json.loads(json_str)

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
for entry in acute_entries[:10]:  # Show first 10
    print(f"  - ID: {entry['id']}, Word: {entry['word']}, Arabic: {entry.get('arabic_translation', 'N/A')}")

print(f"\n⚠ Found {len(errors)} vocabulary errors:")
for error in errors[:20]:  # Show first 20
    print(f"  - ID: {error['id']}, Word: {error['word']}, Issue: {error['issue']}")

# Save clean vocabulary data
with open('data/vocabulary_clean.json', 'w', encoding='utf-8') as f:
    json.dump(vocab_data, f, indent=2, ensure_ascii=False)

# Save errors report
with open('data/vocabulary_errors_report.json', 'w', encoding='utf-8') as f:
    json.dump(errors, f, indent=2, ensure_ascii=False)

print(f"\n✓ Saved {len(vocab_data)} vocabulary entries to data/vocabulary_clean.json")
print(f"✓ Saved {len(errors)} errors to data/vocabulary_errors_report.json")
