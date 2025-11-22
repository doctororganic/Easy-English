# Comprehensive Analysis of Kuwait Grades 10–11 English Grammar Content: Extraction, Quality, and Curriculum Alignment

## Executive Summary

This report consolidates findings from a multi-source corpus to evaluate the English grammar content available for Kuwait Grades 10–11. The analysis integrates topic discovery, exercise profiling, bilingual coverage assessment, and curriculum alignment checks. It also documents the data quality constraints encountered and proposes an actionable plan to strengthen grammar coverage, diversify assessment items, and improve Arabic translation completeness.

The analysis shows a solid foundation in core grammar areas—particularly modal verbs, tenses, and question forms—derived from curriculum-aligned vocabulary units and essay artifacts. However, the reference grammar source suffered severe optical character recognition (OCR) corruption, limiting depth and breadth of grammar extraction. The bilingual content is vocabulary-rich but lacks the meta-information and example sentences necessary for comprehensive translation quality scoring. Overall curriculum alignment reaches approximately 57.1%, indicating partial coverage with clear gaps in relative clauses, passive voice, and reported speech.

Final outputs are prepared for platform ingestion and saved under the data_analysis directory: the integrated dataset (grammar_content_integrated.json) and the analysis summary (analysis_summary.json). Recommendations prioritize re-scanning the corrupted reference grammar, enhancing bilingual coverage with example sentences and POS/domain/register meta, diversifying exercise types (especially grammar correction and transformation), and closing curriculum gaps to reach full compliance.

## Data Sources and Processing Overview

Six sources were processed to extract grammar signals, exercises, vocabulary, and curriculum cues. The corpus includes one large grammar reference with 488 pages, two merged curriculum files with bilingual vocabulary and essay artifacts, and three auxiliary bilingual extracts. Processing involved parsing per-page text, applying topic extraction patterns, classifying exercise types, and aggregating counts and coverage metrics.

The diagnostic run revealed a critical issue: the reference grammar text is severely corrupted by OCR noise, yielding near-zero readability and unreliable topic signals. Conversely, the merged files present clean unit structures, consistent bilingual entries, and part-of-speech (POS) markers, making them the primary contributors to topic discovery and alignment.

Table 1. Source overview and contribution

| Source                                   | Pages | Content Type         | Readability Notes                                           | Key Contributions                                  |
|------------------------------------------|-------|----------------------|--------------------------------------------------------------|----------------------------------------------------|
| free-english-grammar.json                | 488   | Grammar reference     | Severely corrupted OCR; unreliable textual signals           | Minimal topic coverage due to noise                |
| merged-1.json                            | 41    | Vocabulary (EN–AR)   | Clean unit structure; bilingual entries; POS markers         | Bilingual vocabulary, unit taxonomy                |
| merged-2.json                            | 47    | Curriculum (EN–AR)   | Grade 10 units; vocabulary with Arabic; essay example        | Grade tagging, essay artifacts, exercise cues      |
| ilovepdf_merged (1)_30b53d84.json        | —     | Extract               | Light structural content; small volume                       | Supplemental exercise indicators                   |
| arabic_vocab_ilovepdf_merged (1)_ab38a242.json.txt | —     | Vocabulary (EN–AR)   | Bilingual fragments; POS indicators                          | Auxiliary vocabulary signals                        |
| arabic_vocab_ilovepdf_merged_68369229.json.txt     | —     | Vocabulary (EN–AR)   | Bilingual fragments; POS indicators                          | Auxiliary vocabulary signals                        |

### Source File Summary

The reference grammar file, though extensive, is not usable in its current form due to widespread OCR corruption. The merged curriculum files (merged-1 and merged-2) are coherent, bilingual, and tagged by unit and POS, which enables reliable topic extraction and exercise classification. These files serve as the backbone for this analysis and for future integrations.

### Extraction and Quality Diagnostics

A diagnostic routine quantified text samples, characters, and readability. The reference grammar’s character-level noise explains the near-zero readability ratio and the limited number of extractable topics. The merged files, despite low readability ratios caused by layout and bilingual markers, are structurally clean and yield valuable signals for grammar topics and assessment types.

Table 2. Diagnostic metrics by source

| Source                                   | Text Samples | Total Characters | Readability Ratio | Top Words (Selected)         | Notable Notes                                 |
|------------------------------------------|--------------|------------------|-------------------|------------------------------|-----------------------------------------------|
| free-english-grammar.json                | 487          | 1,019,814        | 0.0%              | e, d, f, g, https, pdforall | Severe OCR noise; unusable for topic parsing  |
| merged-1.json                            | 41           | 65,198           | 0.0%              | n, the, a, v, adj, b, to    | Clean unit structure; bilingual vocabulary    |
| merged-2.json                            | 39           | 75,737           | 0.0%              | the, a, n, to, b, and       | Grade 10 units; vocabulary + essay            |
| ilovepdf_merged (1)_30b53d84.json        | 2            | 5,251            | 0.0%              | n, v, adj, adv, unit        | Small but useful structural signals           |
| arabic_vocab_…_ab38a242.json.txt         | 1            | 5,000            | 0.0%              | n, v, adj, adv, unit        | Light bilingual vocabulary content            |
| arabic_vocab_…_68369229.json.txt         | 1            | 5,000            | 0.0%              | n, v, adj, adv, unit        | Light bilingual vocabulary content            |

The diagnostic confirms the need to prioritize the merged curriculum files for integration and to address the reference grammar’s quality before relying on it for deeper topic coverage.

## Topic Discovery and Categorization

The integrated pipeline identified 26 unique grammar topics. Modal verbs and tenses are prominent, reflecting the Grade 10 emphasis on functional language use. Comparatives and superlatives provide morphology for description and evaluation, while question forms indicate attention to interrogative structures. Future forms (including “going to”) and selected verb patterns are present, but certain topics remain under-represented due to the reliance on vocabulary-centric sources.

Table 3. Top 10 topics and frequencies

| Topic          | Frequency |
|----------------|-----------|
| questions      | 39        |
| modal_verbs    | 30        |
| can            | 25        |
| will           | 23        |
| superlatives   | 15        |
| should         | 15        |
| tenses         | 13        |
| going to       | 12        |
| could          | 10        |
| must           | 9         |

Table 4. Topic categories coverage

| Category               | Representative Topics                                   | Coverage Notes                                                                 |
|------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------|
| Tense grammar          | tenses, going to                                        | Strong coverage; future forms and time markers present                         |
| Modal structures       | modal_verbs, can, will, should, could, must             | High frequency; central to Grade 10 material                                   |
| Sentence structures    | questions                                               | Well represented via exercise cues                                             |
| Word classes           | superlatives, comparatives                              | Frequent adjective forms; limited adverbs/prepositions in signal set           |
| Communication skills   | —                                                        | Limited explicit signals; essay artifacts present but not classified here      |

### Extracted Topics Overview

The distribution underscores a focus on modality, time, and clause-level operations. The prominence of “questions” suggests classroom practice around interrogatives and functional language use. Modal verbs (can, will, should, could, must) cover ability, prediction, advice, possibility, and obligation—core competencies for Grade 10 learners. Tenses and “going to” reflect attention to future forms and temporal reference, while comparatives and superlatives support descriptive and evaluative tasks typical of the curriculum.

### Category Mapping

Mapping topics to pedagogical categories reveals the corpus’ strengths (modality, tenses, question forms) and gaps (relative clauses, passive voice, reported speech). To deepen alignment, upcoming content passes should prioritize these missing constructs and integrate them within the unit structures already present in merged files, ensuring both form and function are covered with contextualized examples.

## Question Types and Difficulty Assessment

The analysis identified 315 questions across the corpus, spanning multiple exercise types. Most items are medium-demand, focusing on form-function relationships, transformations, and contextual application. Increasing the share of high-demand grammar correction and error identification tasks will better prepare learners for complex usage and assessment demands.

Table 5. Question type distribution and inferred difficulty

| Question Type         | Count | Typical Cognitive Demand          | Inferred Difficulty |
|-----------------------|-------|-----------------------------------|---------------------|
| vocabulary_usage      | 125   | Meaning recall, context application | Medium              |
| reorder               | 68    | Structural parsing, sequencing      | Medium              |
| transform_sentence    | 42    | Grammar transformation             | Medium–High         |
| matching              | 35    | Association, concept mapping        | Low–Medium          |
| fill_in_blanks        | 21    | Form knowledge, cloze tasks         | Low–Medium          |
| multiple_choice       | 14    | Recognition, rule application       | Medium              |
| grammar_correction    | 8     | Error identification, revision      | High                |
| identify              | 2     | Recognition of forms                | Low                 |

### Distribution Analysis

Vocabulary usage and reordering dominate, indicating a strong emphasis on meaning, collocation, and structural awareness. Transformation items provide practice in grammatical recoding (e.g., modal alternatives, tense shifts), which is essential for developing flexible command of English. The relatively low count of grammar correction presents an opportunity to add high-demand items that sharpen precision and metalinguistic awareness.

## Arabic Translation Quality Evaluation

Bilingual entries in the merged files demonstrate clear English–Arabic correspondences and POS labeling. However, the overall translation coverage is modest (~11.6%) when assessed against the whole corpus. The scarcity of explicit translation meta-data—especially example sentences, usage notes, domain, and register—limits the ability to score accuracy, completeness, clarity, and cultural appropriateness with confidence.

Table 6. Translation quality metrics

| Metric                      | Score/Observation                     | Notes                                                         |
|----------------------------|---------------------------------------|---------------------------------------------------------------|
| Overall coverage           | 11.6%                                 | Vocabulary-strong, grammar-translation-light                 |
| Accuracy                   | Not systematically scored             | Arabic renderings appear consistent with POS and context      |
| Completeness               | Not systematically scored             | Many entries lack example sentences or usage notes            |
| Clarity                    | Not systematically scored             | Bilingual entries are legible; layout is compact              |
| Cultural appropriateness   | Not systematically scored             | Regional educational conventions likely; formal scoring needed |

### Bilingual Content Findings

The vocabulary-centric bilingual entries support comprehension and allow teachers to reinforce meaning in Arabic. To elevate translation quality, future iterations should introduce example sentences, domain labels (e.g., health, technology), register indicators (formal/informal), and usage notes. These enhancements will enable more robust scoring and richer instructional design.

## Kuwait Curriculum Alignment

The alignment score is approximately 57.1%. Modal verbs, tenses, questions, comparatives, and superlatives are aligned with Grade 10–11 expectations. Gaps persist in relative clauses, passive voice, and reported speech—core elements of the curriculum that should be prioritized. Grade distribution shows strong signals in Grade 10 and some in Grade 11, with incidental references to other grades likely due to front matter or annotations.

Table 7. Curriculum mapping

| Requirement Cluster            | Extracted Topics (Examples)                  | Alignment Status | Gap Notes                                                   |
|--------------------------------|----------------------------------------------|------------------|-------------------------------------------------------------|
| Modality                       | can, will, should, could, must               | Aligned          | Strong coverage; add obligation/possibility in context      |
| Tenses (present/past/future)   | tenses, going to                             | Aligned          | Aspectual distinctions and time expressions need deepening  |
| Questions                      | questions                                    | Aligned          | Extend to indirect questions and question tags              |
| Adjectives (comparatives/superlatives) | superlatives, comparatives              | Partially aligned| Include adverbial forms and degree modification             |
| Phrasal verbs                  | —                                            | Missing          | Add patterns and contextual exercises                        |
| Relative clauses               | —                                            | Missing          | Introduce restrictive/non-restrictive usage                 |
| Passive voice                  | —                                            | Missing          | Cover formation and functional uses in reports/descriptions |
| Reported speech                | —                                            | Missing          | Add tense shifts, reporting verbs, and backshifting         |

Table 8. Grade distribution

| Grade  | Count |
|--------|-------|
| 1      | 25    |
| 2      | 3     |
| 3      | 4     |
| 4      | 1     |
| 5      | 1     |
| 6      | 1     |
| 7      | 1     |
| 10     | 41    |
| 11     | 4     |
| 12     | 1     |

### Grade Distribution and Implications

The concentration in Grade 10 confirms the corpus’ utility for that cohort, with selective relevance for Grade 11. The anomaly of Grade 1 likely reflects non-curricular content (e.g., teacher notes). Refining grade inference rules will strengthen focus on Grades 10–11 and reduce noise from ancillary material.

## Integrated Output, Format, and File Locations

The analysis produces two core outputs for platform ingestion and operations reporting:

- grammar_content_integrated.json: A structured corpus containing metadata, topics, question types, translation indicators, curriculum mapping, and recommendations.
- analysis_summary.json: A concise summary of the key metrics and priorities.

Both files are stored under the data_analysis directory.

Table 9. Output artifacts

| File Name                         | Purpose                                      | Directory     | Key Schema Elements                                                   |
|-----------------------------------|----------------------------------------------|---------------|------------------------------------------------------------------------|
| grammar_content_integrated.json   | Integrated corpus for platform ingestion      | data_analysis | metadata; topics; question_types; arabic_translations; curriculum_mapping; recommendations |
| analysis_summary.json             | Executive summary of metrics and guidance     | data_analysis | analysis_status; total_grammar_topics; curriculum_alignment; translation_quality; content_completeness; top_recommendations |

## Methodology, Assumptions, and Limitations

The methodology comprised page-level text parsing, pattern-based topic extraction, exercise classification, and aggregate statistics. Topics were inferred from lexical and structural signals within the available content. Exercise difficulty was derived from item formats and cognitive demand heuristics rather than learner performance data. Translation quality was approximated through coverage and structural presence, pending systematic meta-data.

Limitations include the severe OCR corruption of the reference grammar, which constrains grammar completeness. Bilingual content is primarily vocabulary, with sparse example sentences and usage notes. Grade inference is noisy due to mixed signals in the source files. These constraints inform the recommendations to improve source fidelity, bilingual meta-data, and grading consistency.

## Recommendations and Next Steps

- Improve OCR quality or secure higher-fidelity sources for the grammar reference to unlock deeper topic coverage and more complete grammar instruction.
- Enhance bilingual completeness by adding example sentences, usage notes, and consistent meta for POS, domain, and register.
- Diversify exercise types, prioritizing grammar correction and complex transformations, while maintaining a scaffolded range from low to medium difficulty.
- Systematically address curriculum gaps in relative clauses, passive voice, and reported speech, and expand adverbial/adjectival distinctions.
- Refine grade inference rules to focus on Grades 10–11 and eliminate non-curricular artifacts.

Table 10. Prioritized improvement plan

| Action                                        | Priority | Effort | Impact | Owner            | Timeline     |
|-----------------------------------------------|----------|--------|--------|------------------|--------------|
| Re-scan/reference upgrade for grammar corpus  | High     | Medium | High   | Content Ops      | Near-term    |
| Add example sentences and usage notes (AR/EN) | High     | Medium | High   | Curriculum Team  | Near-term    |
| Diversify high-demand exercises                | Medium   | Medium | High   | Assessment Team  | Near-term    |
| Close curriculum gaps (clauses, passive, reported speech) | High     | High   | High   | Curriculum Design| Mid-term     |
| Stabilize grade inference rules                | Medium   | Low    | Medium | Data Engineering | Near-term    |
| Expand bilingual meta (POS, domain, register) | Medium   | Medium | Medium | Content Ops      | Mid-term     |

## Appendix: Data Diagnostics

The diagnostic run provided sample counts, character totals, readability ratios, and top word lists. Results confirm that the merged curriculum files are structurally clean and appropriate for integration, while the reference grammar is not usable in its current form.

Table 11. Consolidated diagnostic metrics

| Source                                   | Text Samples | Total Characters | Readability Ratio |
|------------------------------------------|--------------|------------------|-------------------|
| free-english-grammar.json                | 487          | 1,019,814        | 0.0%              |
| merged-1.json                            | 41           | 65,198           | 0.0%              |
| merged-2.json                            | 39           | 75,737           | 0.0%              |
| ilovepdf_merged (1)_30b53d84.json        | 2            | 5,251            | 0.0%              |
| arabic_vocab_ilovepdf_merged (1)_ab38a242.json.txt | 1            | 5,000            | 0.0%              |
| arabic_vocab_ilovepdf_merged_68369229.json.txt     | 1            | 5,000            | 0.0%              |

## Information Gaps

- Reference grammar text quality is poor due to OCR corruption, limiting grammar completeness and accurate topic extraction.
- Arabic translation quality lacks systematic scoring for accuracy, completeness, clarity, and cultural appropriateness.
- Difficulty levels are inferred from question formats rather than labeled rubrics or learner performance.
- Grade tagging is inconsistent (e.g., Grade 1 anomaly) and requires refined extraction rules.
- Bilingual content is mainly vocabulary lists; grammar explanations and example sentences in Arabic are scarce.

## References

[^1]: Free English Grammar (PDF) – PDFForAll. https://pdforall.com (Original PDF corpus; severely corrupted in provided extraction.)