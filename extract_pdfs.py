import PyPDF2
import json
import os

def extract_full_pdf(pdf_path, output_file):
    """Extract all text from PDF and save to file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            total_pages = len(pdf_reader.pages)
            
            content = {
                'source_file': pdf_path,
                'total_pages': total_pages,
                'pages': []
            }
            
            for page_num in range(total_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                content['pages'].append({
                    'page_number': page_num + 1,
                    'text': text
                })
            
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(content, f, indent=2, ensure_ascii=False)
            
            print(f"✓ Extracted {total_pages} pages from {pdf_path} to {output_file}")
            return True
    except Exception as e:
        print(f"✗ Error extracting {pdf_path}: {e}")
        return False

# Create output directory
os.makedirs('data/grammar_content', exist_ok=True)

# Extract all three PDFs
pdfs = [
    ('user_input_files/-Free-English-Grammar.pdf', 'data/grammar_content/free-english-grammar.json'),
    ('user_input_files/ilovepdf_merged (1).pdf', 'data/grammar_content/merged-1.json'),
    ('user_input_files/ilovepdf_merged.pdf', 'data/grammar_content/merged-2.json')
]

for pdf_path, output_file in pdfs:
    extract_full_pdf(pdf_path, output_file)

print("\n✓ All PDFs extracted successfully!")
