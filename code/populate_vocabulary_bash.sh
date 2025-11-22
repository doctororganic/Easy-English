#!/bin/bash

# Kuwait English Learning Platform - Vocabulary Database Population Script
# Using Supabase REST API directly to avoid Node.js dependency issues

echo "🎯 Kuwait English Learning Platform - Vocabulary Database Population"
echo "========================================================================"
echo ""

# Configuration
SUPABASE_URL="https://wjdzoqlxudswcovbuptd.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHpvcWx4dWRzd2NvdmJ1cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0MDksImV4cCI6MjA3NzU5ODQwOX0.AcOvzDba-IGxV_TNN1KE6FNSNxC4AJH2wOfAguG0yQc"

# Function to test database connection
test_connection() {
    echo "🔌 Testing Supabase connection..."
    response=$(curl -s -H "apikey: $SUPABASE_KEY" \
                    -H "Authorization: Bearer $SUPABASE_KEY" \
                    "$SUPABASE_URL/rest/v1/kuwait_vocabulary?select=id&limit=1")
    
    if echo "$response" | grep -q "error"; then
        echo "❌ Database connection failed: $response"
        return 1
    else
        echo "✅ Database connection successful!"
        return 0
    fi
}

# Function to clear existing data
clear_data() {
    echo "🗑️ Clearing existing vocabulary data..."
    response=$(curl -s -X DELETE \
                    -H "apikey: $SUPABASE_KEY" \
                    -H "Authorization: Bearer $SUPABASE_KEY" \
                    -H "Content-Type: application/json" \
                    "$SUPABASE_URL/rest/v1/kuwait_vocabulary?id=gte.0")
    
    if echo "$response" | grep -q "error"; then
        echo "⚠️ Warning: Could not clear existing data: $response"
    else
        echo "✅ Existing data cleared"
    fi
}

# Function to parse vocabulary file and create JSON batch
parse_vocabulary_file() {
    local file_path="$1"
    local class_number="$2" 
    local unit_number="$3"
    
    echo "📚 Parsing Grade $class_number, Unit $unit_number..."
    
    # Create temporary JSON file for this batch
    local temp_file="/tmp/vocab_batch_${class_number}_${unit_number}.json"
    echo "[" > "$temp_file"
    
    local order=0
    local found_entries=false
    
    # Read the file and extract vocabulary for this specific unit
    while IFS= read -r line; do
        # Check for unit header
        if [[ "$line" =~ "### Unit $unit_number" ]]; then
            found_entries=true
            continue
        fi
        
        # Stop at next unit or new grade
        if [[ "$line" =~ "### Unit" ]] || [[ "$line" =~ "## Grade" ]]; then
            if [[ "$found_entries" == true ]]; then
                break
            fi
        fi
        
        # Parse vocabulary entries
        if [[ "$line" =~ ^-[[:space:]] && "$line" =~ " - " ]]; then
            local entry="${line#- }"
            local parts=(${entry// - / })
            
            if [[ ${#parts[@]} -eq 2 ]]; then
                local word_part="${parts[0]}"
                local arabic_def="${parts[1]}"
                
                # Extract word and part of speech
                if [[ "$word_part" =~ ^([^(]+)[[:space:]]*\(([^)]+)\) ]]; then
                    local word="${BASH_REMATCH[1]}"
                    local pos="${BASH_REMATCH[2]}"
                else
                    local word="$word_part"
                    local pos="n."
                fi
                
                order=$((order + 1))
                
                # Add comma if not first entry
                if [[ $order -gt 1 ]]; then
                    echo "," >> "$temp_file"
                fi
                
                # Create JSON entry
                cat >> "$temp_file" << EOF
  {
    "word": "$word",
    "class_number": $class_number,
    "unit_number": $unit_number,
    "definition_en": "$word",
    "definition_ar": "$arabic_def",
    "phonetic": "$word",
    "examples": [],
    "category": "$pos",
    "difficulty_level": $((class_number / 3 + 1)),
    "order_in_unit": $order,
    "audio_url": null
  }
EOF
            fi
        fi
    done < "$file_path"
    
    echo "" >> "$temp_file"
    echo "]" >> "$temp_file"
    
    echo "$temp_file"
}

# Function to insert batch data
insert_batch() {
    local json_file="$1"
    local batch_name="$2"
    
    echo "📦 Inserting $batch_name..."
    
    response=$(curl -s -X POST \
                    -H "apikey: $SUPABASE_KEY" \
                    -H "Authorization: Bearer $SUPABASE_KEY" \
                    -H "Content-Type: application/json" \
                    -H "Prefer: return=minimal" \
                    --data @"$json_file" \
                    "$SUPABASE_URL/rest/v1/kuwait_vocabulary")
    
    if echo "$response" | grep -q "error"; then
        echo "❌ Error inserting $batch_name: $response"
        return 1
    else
        echo "✅ Successfully inserted $batch_name"
        return 0
    fi
}

# Function to verify final data
verify_data() {
    echo ""
    echo "🔍 Verifying final data..."
    
    response=$(curl -s -H "apikey: $SUPABASE_KEY" \
                    -H "Authorization: Bearer $SUPABASE_KEY" \
                    "$SUPABASE_URL/rest/v1/kuwait_vocabulary?select=class_number,unit_number&order=class_number.asc,unit_number.asc")
    
    if echo "$response" | grep -q "error"; then
        echo "❌ Verification failed: $response"
        return 1
    else
        echo "📊 Database state:"
        echo "$response" | python3 -m json.tool | grep -E '"class_number"|"unit_number"' | head -20
        return 0
    fi
}

# Main execution
main() {
    local vocab_file="/workspace/extract/kuwait-vocabulary-database.md"
    
    if [[ ! -f "$vocab_file" ]]; then
        echo "❌ Vocabulary file not found: $vocab_file"
        exit 1
    fi
    
    # Test connection
    if ! test_connection; then
        exit 1
    fi
    
    echo ""
    
    # Clear existing data
    clear_data
    echo ""
    
    # Process each grade and unit
    echo "🚀 Starting vocabulary data insertion..."
    echo ""
    
    local total_inserted=0
    
    # Grade 10 - Units 1-12
    echo "📖 Processing Grade 10..."
    for unit in {1..12}; do
        temp_file=$(parse_vocabulary_file "$vocab_file" 10 "$unit")
        if [[ -s "$temp_file" ]] && [[ $(wc -l < "$temp_file") -gt 2 ]]; then
            if insert_batch "$temp_file" "Grade 10, Unit $unit"; then
                total_inserted=$((total_inserted + 1))
            fi
        fi
        rm -f "$temp_file"
    done
    
    # Grade 11 - Units 7-12
    echo ""
    echo "📖 Processing Grade 11..."
    for unit in {7..12}; do
        temp_file=$(parse_vocabulary_file "$vocab_file" 11 "$unit")
        if [[ -s "$temp_file" ]] && [[ $(wc -l < "$temp_file") -gt 2 ]]; then
            if insert_batch "$temp_file" "Grade 11, Unit $unit"; then
                total_inserted=$((total_inserted + 1))
            fi
        fi
        rm -f "$temp_file"
    done
    
    # Grade 12 - Units 7-12
    echo ""
    echo "📖 Processing Grade 12..."
    for unit in {7..12}; do
        temp_file=$(parse_vocabulary_file "$vocab_file" 12 "$unit")
        if [[ -s "$temp_file" ]] && [[ $(wc -l < "$temp_file") -gt 2 ]]; then
            if insert_batch "$temp_file" "Grade 12, Unit $unit"; then
                total_inserted=$((total_inserted + 1))
            fi
        fi
        rm -f "$temp_file"
    done
    
    echo ""
    echo "📊 Total successful insertions: $total_inserted"
    
    # Verify data
    verify_data
    
    echo ""
    echo "🎉 Vocabulary database population completed!"
}

# Run main function
main