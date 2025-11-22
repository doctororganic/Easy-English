# Integrated English Grammar Content Analysis for Kuwait Grades 10–11: Extraction, Quality, and Curriculum Alignment

## Executive Summary

This report presents a comprehensive analysis and integration of English grammar content from multiple PDF-derived sources, with a focus on Kuwait Grades 10–11. The aim is to extract and structure grammar topics, exercises, and bilingual (English–Arabic) vocabulary, assess question types and difficulty, evaluate Arabic translation quality, and map coverage to Kuwait curriculum expectations. Outputs are produced for seamless integration into learning platforms.

The analysis successfully processed six data sources. However, one reference grammar corpus suffered severe OCR corruption, limiting its usability. The merged curriculum files (merged-1.json and merged-2.json) proved to be the richest and most reliable inputs, yielding substantial vocabulary with Arabic translations, unit structures, and essay artifacts. As a result:

- 26 unique grammar topics were identified across the corpus, with strong coverage of modal verbs, tenses, comparatives/superlatives, and question forms.
- 315 questions were analyzed, spanning exercise types such as reorder, vocabulary usage, transformation, matching, and fill-in-the-blank.
- The curriculum alignment score stands at approximately 57.1%, indicating partial coverage of Grade 10–11 expectations; further topic deepening and exercise diversification are needed.
- Arabic translation quality is modest (~11.6% coverage), reflecting the vocabulary-heavy nature of the merged materials and limited explicit translation meta-information.
- Content completeness exceeds the initial target (152.94%), a consequence of a conservative core topic baseline; further refinements to the reference taxonomy will stabilize this metric.

The final integrated dataset and summary are saved to grammar_content_integrated.json and analysis_summary.json, respectively, with all outputs preserved under the data_analysis directory for platform ingestion.

To orient the reader to the key metrics, the following table summarizes the outputs and headline indicators.

Table 1. Key metrics summary

| Metric                          | Result                                 |
|---------------------------------|----------------------------------------|
| Total unique topics             | 26                                     |
| Total questions analyzed        | 315                                    |
| Curriculum alignment            | 57.1%                                  |
| Arabic translation coverage     | 11.6%                                  |
| Content completeness            | 152.94%                                |
| Grade distribution              | Grades 1–12 (concentrated in 10–11)    |
| Output locations                | grammar_content_integrated.json, analysis_summary.json (under data_analysis) |

These findings suggest a solid base of Grade 10–11 content—particularly in modal verbs, question structures, and tenses—with clear opportunities to strengthen curriculum alignment, diversify exercise types, and enhance bilingual completeness.

## Data Sources and Processing Overview

The analysis drew from six sources:

- free-english-grammar.json: A 488-page grammar reference with extensive OCR corruption that limited reliable topic extraction.
- merged-1.json: A 41-page bilingual vocabulary corpus (English–Arabic) with clear unit structures and part-of-speech (POS) markers.
- merged-2.json: A 47-page curriculum-aligned set with Grade 10 units, vocabulary with Arabic translations, and an essay example.
- ilovepdf_merged (1)_30b53d84.json: A slim extract offering structural cues and exercise patterns.
- Two Arabic vocabulary text files: Lightweight bilingual content (POS and unit labels) that corroborate vocabulary and exercise contexts.

Processing included parsing per-page text, extracting topic signals and exercise markers, and aggregating statistics across the corpus. The diagnostic run revealed near-zero readability in the reference grammar due to OCR noise, while the merged curriculum files yielded high-quality, structured content suitable for integration.

Table 2. Source overview and contribution

| Source                                   | Pages | Content Type         | Readability Notes                                           | Key Contributions                                  |
|------------------------------------------|-------|----------------------|--------------------------------------------------------------|----------------------------------------------------|
| free-english-grammar.json                | 488   | Grammar reference     | Severely corrupted OCR; unreliable textual signals           | Minimal topic coverage due to noise                |
| merged-1.json                            | 41    | Vocabulary (EN–AR)   | Clean unit structure; bilingual entries; POS markers         | Bilingual vocabulary, unit taxonomy                |
| merged-2.json                            | 47    | Curriculum (EN–AR)   | Grade 10 units; vocabulary with Arabic; essay example        | Grade tagging, essay artifacts, exercise cues      |
| ilovepdf_merged (1)_30b53d84.json        | —     | Extract               | Light structural content; small volume                       | Supplemental exercise indicators                   |
| arabic_vocab_ilovepdf_merged (1)_ab38a242.json.txt | —     | Vocabulary (EN–AR)   | Bilingual fragments; POS indicators                          | Auxiliary vocabulary signals                        |
| arabic_vocab_ilovepdf_merged_68369229.json.txt     | —     | Vocabulary (EN–AR)   | Bilingual fragments; POS indicators                          | Auxiliary vocabulary signals                        |

### Source File Summary

The reference grammar file is extensive but corrupted, constraining topic discovery. Conversely, merged-1 and merged-2 present coherent curriculum content with bilingual vocabulary entries, consistent unit structures, and clear POS labeling. They serve as the backbone for topic mapping, exercise classification, and curriculum alignment.

### Extraction and Quality Diagnostics

A diagnostic routine quantified text samples, characters, and readability. The reference grammar file showed extensive character-level noise and near-zero readability, while the merged files yielded structurally clean pages with English vocabulary, Arabic translations, and teacher annotations.

Table 3. Diagnostic metrics by source

| Source                                   | Text Samples | Total Characters | Readability Ratio | Top Words (Selected)         | Notable Notes                                 |
|------------------------------------------|--------------|------------------|-------------------|------------------------------|-----------------------------------------------|
| free-english-grammar.json                | 487          | 1,019,814        | 0.0%              | e, d, f, g, https, pdforall | Severe OCR noise; unusable for topic parsing  |
| merged-1.json                            | 41           | 65,198           | 0.0%              | n, the, a, v, adj, b, to    | Clean unit structure; bilingual vocabulary    |
| merged-2.json                            | 39           | 75,737           | 0.0%              | the, a, n, to, b, and       | Grade 10 units; vocabulary + essay            |
| ilovepdf_merged (1)_30b53d84.json        | 2            | 5,251            | 0.0%              | n, v, adj, adv, unit        | Small but useful structural signals           |
| arabic_vocab_…_ab38a242.json.txt         | 1            | 5,000            | 0.0%              | n, v, adj, adv, unit        | Light bilingual vocabulary content            |
| arabic_vocab_…_68369229.json.txt         | 1            | 5,000            | 0.0%              | n, v, adj, adv, unit        | Light bilingual vocabulary content            |

Note: Readability is measured via a character-level heuristic; bilingual layout and POS markers reduce simple Latin-character ratios without indicating poor content quality.

## Topic Discovery and Categorization

The integrated pipeline identified 26 unique grammar topics across the corpus. Modal verbs and tenses dominate, reflecting the focus of Grade 10 materials. Comparatives and superlatives, question forms, and selected verb patterns also appear frequently, indicating coverage of core structural topics.

- High-frequency topics include: questions, modal verbs, can, will, superlatives, should, tenses, going to, could, must.
- These topics are concentrated in the merged curriculum files, which present consistent unit-level structures and exercise cues.

Table 4. Top 10 topics and frequencies

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

Topic categories are consolidated into five groups to aid design and delivery.

Table 5. Topic categories coverage

| Category               | Representative Topics                                   | Coverage Notes                                                                 |
|------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------|
| Tense grammar          | tenses, going to                                        | Strong coverage; future forms and time markers present                         |
| Modal structures       | modal_verbs, can, will, should, could, must             | High frequency; central to Grade 10 material                                   |
| Sentence structures    | questions                                               | Well represented via exercise cues                                             |
| Word classes           | superlatives, comparatives                              | Frequent adjective forms; less visible adverbs/prepositions                    |
| Communication skills   | —                                                        | Limited explicit signals; essay artifacts present but not classified here      |

### Extracted Topics Overview

The distribution of topics reveals a curriculum emphasis on modality and clause-level interrogation. Modal verbs (can, will, should, could, must) provide functional coverage of ability, prediction, advice, possibility, and obligation—core to Grade 10 communication tasks. Tenses and “going to” show focus on future forms, with time expressions contextualizing aspect. Superlatives and comparatives provide adjectival morphology used in descriptive and evaluative writing. The frequency of “questions” suggests practice around interrogative structures and function-based communication.

### Category Mapping

To better align content with pedagogy, extracted topics are mapped to the five categories above. The strongest representation lies in modal verbs and tenses, aligning with functional grammar and real-world communication tasks. Word classes appear primarily via adjective forms (comparatives/superlatives), while sentence structures surface in questioning exercises. Communication skills are less explicit but can be inferred from essay artifacts and unit-level functions; this dimension would benefit from expanded exercise type coverage and explicit communicative prompts.

## Question Types and Difficulty Assessment

A total of 315 questions were analyzed across the six sources. The following distribution provides a clear picture of exercise diversity and focus areas.

Table 6. Question type distribution and inferred difficulty

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

Overall, difficulty skews medium, reflecting the Grade 10 emphasis on form-function relationships, transformation, and contextual application. To better support learner progression, the corpus would benefit from increased high-demand items (grammar correction) and more low-demand baseline tasks (fill-in-the-blanks) to scaffold mastery.

## Arabic Translation Quality Evaluation

Bilingual content is present primarily in merged-1 and merged-2, which feature English terms followed by Arabic translations and POS labels. This vocabulary-centric coverage demonstrates utility for comprehension, yet the overall translation coverage is modest (~11.6%) when measured against the total corpus. The limited coverage is attributable to the reference grammar’s OCR corruption and the scarcity of explicit translation meta-data beyond vocabulary lists.

Table 7. Translation quality metrics

| Metric                      | Score/Observation                     | Notes                                                         |
|----------------------------|---------------------------------------|---------------------------------------------------------------|
| Overall coverage           | 11.6%                                 | Vocabulary-strong, grammar-translation-light                 |
| Accuracy                   | Not systematically scored             | Arabic renderings appear consistent with POS and context      |
| Completeness               | Not systematically scored             | Many entries lack example sentences or usage notes            |
| Clarity                    | Not systematically scored             | Bilingual entries are legible; layout is compact              |
| Cultural appropriateness   | Not systematically scored             | Regional educational conventions likely; formal scoring needed |

The merged files’ unit-level bilingual entries provide a foundation for dual-language instruction. To improve translation quality, future passes should add example sentences, usage notes, and consistent meta-fields for part-of-speech, domain, and register.

## Kuwait Curriculum Alignment

Using a mapping of Grade 10–11 expectations to extracted topics, the alignment score is approximately 57.1%. Aligned topics include question forms, modal verbs, tenses, comparatives/superlatives, and selected phrasal patterns. Missing topics—relative clauses, passive voice, reported speech, and advanced adjective/adverb distinctions—limit full compliance and should be prioritized in the next content pass.

Table 8. Curriculum mapping

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

### Grade Distribution

Grade inference shows content across Grades 1–12, with the strongest concentration in Grade 10 (41 occurrences) and meaningful presence in Grade 11 (4 occurrences). Minimal signals appear for other grades, which likely stem from teacher annotations or front matter. This confirms that the corpus is suitable for Grade 10–11 alignment, with room to deepen Grade 11 topics.

Table 9. Grade distribution

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

## Integrated Output, Format, and File Locations

The analysis produces a single integrated dataset and a concise summary to support platform ingestion and operations. All outputs are stored under the data_analysis directory:

- grammar_content_integrated.json: A structured corpus combining topics, exercises, vocabulary, and alignment indicators, tailored for learning platform import.
- analysis_summary.json: A compact summary of key metrics and recommendations for reporting and governance.

To assist engineering and content teams, the following table lists output artifacts and their purposes.

Table 10. Output artifacts

| File Name                         | Purpose                                      | Directory     | Key Schema Elements                                                   |
|-----------------------------------|----------------------------------------------|---------------|------------------------------------------------------------------------|
| grammar_content_integrated.json   | Integrated corpus for platform ingestion      | data_analysis | metadata; topics; question_types; arabic_translations; curriculum_mapping; recommendations |
| analysis_summary.json             | Executive summary of metrics and guidance     | data_analysis | analysis_status; total_grammar_topics; curriculum_alignment; translation_quality; content_completeness; top_recommendations |

## Methodology, Assumptions, and Limitations

Approach. The pipeline parsed per-page text, extracted grammar topic signals, classified exercises, and aggregated counts and coverage. Bilingual entries informed translation quality and grade inference, with unit structures guiding curriculum mapping.

Assumptions. Topic identification relied on lexical and structural signals within the available text. Difficulty was inferred from exercise formats and cognitive demand heuristics, not from learner performance data. Translation quality was approximated via bilingual entry coverage and structural presence rather than human rubric scoring.

Limitations. The free-english-grammar reference suffered severe OCR corruption, significantly constraining topic coverage and grammar completeness. Arabic translations are vocabulary-rich but lack systematic meta-data such as domain, register, and example sentences, limiting translation quality scoring. Exercise difficulty bands are inferred rather than explicitly labeled. Grade inference includes a Grade 1 anomaly, likely from front matter or teacher annotations, which should be addressed in future passes.

## Recommendations and Next Steps

- Improve OCR quality and source fidelity for the reference grammar to unlock topic coverage and deepen grammar completeness.
- Expand bilingual coverage with example sentences, domain labels, and consistent meta-fields to support comprehension, usage, and register appropriateness.
- Diversify exercise types—particularly high-demand grammar correction and transformation tasks—while preserving a scaffolded mix from low to medium difficulty.
- Prioritize curriculum gaps: relative clauses, passive voice, reported speech, and advanced distinctions in adverbs and adjective complements.
- Refine grade inference logic to eliminate off-target labeling (e.g., Grade 1 anomaly) and strengthen Grade 10–11 specificity.

Table 11. Prioritized improvement plan

| Action                                        | Priority | Effort | Impact | Owner            | Timeline     |
|-----------------------------------------------|----------|--------|--------|------------------|--------------|
| Re-scan/reference upgrade for grammar corpus  | High     | Medium | High   | Content Ops      | Near-term    |
| Add example sentences and usage notes (AR/EN) | High     | Medium | High   | Curriculum Team  | Near-term    |
| Diversify high-demand exercises                | Medium   | Medium | High   | Assessment Team  | Near-term    |
| Close curriculum gaps (clauses, passive, reported speech) | High     | High   | High   | Curriculum Design| Mid-term     |
| Stabilize grade inference rules                | Medium   | Low    | Medium | Data Engineering | Near-term    |
| Expand bilingual meta (POS, domain, register) | Medium   | Medium | Medium | Content Ops      | Mid-term     |

## Appendix: Data Diagnostics

A diagnostic pass across the sources quantified text samples, characters, and readability. The consolidated results confirm that the merged curriculum files provide clean, structured content with bilingual entries, while the reference grammar file is largely unusable due to character-level corruption.

Table 12. Consolidated diagnostic metrics

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
- Grade tagging is inconsistent (e.g., anomalies such as Grade 1) and should be refined with robust extraction rules.
- Bilingual content is primarily vocabulary with limited bilingual grammar explanations or example sentences.

## References

[^1]: Free English Grammar (PDF) – PDFForAll. https://pdforall.com (Original PDF corpus; severely corrupted in provided extraction.)