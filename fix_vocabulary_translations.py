import json
import re

# Common academic/technical word translations
common_translations = {
    # Philosophy
    'logic': 'المنطق',
    'ethics': 'الأخلاق',
    'morality': 'الأخلاقية',
    'metaphysics': 'الميتافيزيقا',
    'epistemology': 'نظرية المعرفة',
    
    # Scientific
    'hypothesis': 'الفرضية',
    'observation': 'الملاحظة',
    'variable': 'المتغير',
    'mechanism': 'الآلية',
    'correlation': 'الارتباط',
    
    # Legal
    'appeal': 'الاستئناف',
    'testimony': 'الشهادة',
    'verdict': 'الحكم',
    'litigation': 'التقاضي',
    'jurisdiction': 'الاختصاص القضائي',
    
    # Medical
    'acute': 'حاد',
    'chronic': 'مزمن',
    'diagnosis': 'التشخيص',
    'prognosis': 'التنبؤ الطبي',
    'therapy': 'العلاج',
    
    # Psychology
    'cognition': 'الإدراك',
    'emotion': 'العاطفة',
    'behavior': 'السلوك',
    'perception': 'الإدراك الحسي',
    'motivation': 'الدافع',
    
    # Financial
    'asset': 'الأصل',
    'liability': 'الالتزام',
    'equity': 'حقوق الملكية',
    'dividend': 'توزيعات الأرباح',
    'depreciation': 'الإهلاك',
    
    # Engineering
    'specification': 'المواصفة',
    'calibration': 'المعايرة',
    'tolerance': 'التفاوت المسموح',
    'prototype': 'النموذج الأولي',
    'simulation': 'المحاكاة',
    
    # Academic
    'analyze': 'يحلل',
    'synthesize': 'يركب',
    'evaluate': 'يقيم',
    'critique': 'النقد',
    
    # Arts
    'aesthetic': 'جمالي',
    'composition': 'التكوين',
    'perspective': 'المنظور',
    'texture': 'الملمس',
    'genre': 'النوع',
    
    # Sociology
    'mobility': 'الحراك الاجتماعي',
    'culture': 'الثقافة',
    'institution': 'المؤسسة',
    'stratification': 'التطبق الاجتماعي',
    'norm': 'المعيار الاجتماعي',
}

def extract_base_word(word):
    """Extract base word from numbered variants like 'acute96' -> 'acute'"""
    # Remove numbers from end
    base = re.sub(r'\d+$', '', word)
    return base.lower()

def get_arabic_translation(word):
    """Get proper Arabic translation for a word"""
    base_word = extract_base_word(word)
    
    # Check if we have a translation
    if base_word in common_translations:
        return common_translations[base_word]
    
    # If not in dictionary, return a placeholder that indicates needs manual translation
    return f"[ترجمة: {word}]"

# Load vocabulary data with errors
with open('data/vocabulary_raw.json', 'r', encoding='utf-8') as f:
    vocab_data = json.load(f)

print("🔧 FIXING VOCABULARY TRANSLATIONS\n")
print("="*60)

# Process all entries
updates = []
fixed_count = 0
needs_manual = 0

for entry in vocab_data:
    word = entry.get('word', '')
    current_translation = entry.get('arabic_translation', '')
    
    # Check if translation is generic/placeholder
    if current_translation.startswith('كلمة_') or current_translation == 'No':
        new_translation = get_arabic_translation(word)
        
        updates.append({
            'id': entry['id'],
            'word': word,
            'old_translation': current_translation,
            'new_translation': new_translation
        })
        
        if new_translation.startswith('[ترجمة:'):
            needs_manual += 1
        else:
            fixed_count += 1

print(f"✓ Analyzed {len(vocab_data)} vocabulary entries")
print(f"✓ Found {len(updates)} entries needing translation fixes")
print(f"✓ Can auto-fix: {fixed_count} entries")
print(f"⚠ Needs manual translation: {needs_manual} entries")

# Save updates for review
with open('data/vocabulary_translation_updates.json', 'w', encoding='utf-8') as f:
    json.dump(updates, f, indent=2, ensure_ascii=False)

print(f"\n✓ Translation updates saved to data/vocabulary_translation_updates.json")
print(f"\nSample fixes:")
for update in updates[:20]:
    print(f"  {update['word']}: {update['old_translation']} → {update['new_translation']}")
