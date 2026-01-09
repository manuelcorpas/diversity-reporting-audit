# Diversity Reporting in UK Cancer Genomics: A Systematic Audit

## Protocol v1.0 | January 2026

**Author:** Dr Manuel Corpas
**Target:** Genomics England Research Summit 2026

---

## Research Question

What proportion of peer-reviewed UK cancer genomics publications (2020-2025) report participant ancestry or ethnicity, and how is diversity information reported when present?

---

## Objectives

### Primary
Quantify the proportion of UK cancer genomics publications that report participant ancestry/ethnicity

### Secondary
1. Characterize how diversity is reported (categories used, methods of ascertainment)
2. Identify variation by cancer type, journal, and year
3. Assess completeness of reporting (partial vs. full disclosure)

---

## Search Strategy

**Database:** PubMed/MEDLINE

**Search query:**
```
("United Kingdom"[Affiliation] OR "UK"[Affiliation] OR "England"[Affiliation]
OR "Scotland"[Affiliation] OR "Wales"[Affiliation])
AND ("cancer"[Title/Abstract] OR "neoplasm"[Title/Abstract] OR "tumour"[Title/Abstract]
OR "tumor"[Title/Abstract] OR "oncology"[Title/Abstract])
AND ("genomic"[Title/Abstract] OR "genome"[Title/Abstract] OR "exome"[Title/Abstract]
OR "sequencing"[Title/Abstract] OR "GWAS"[Title/Abstract] OR "genetic"[Title/Abstract]
OR "variant"[Title/Abstract] OR "mutation"[Title/Abstract])
AND ("2020/01/01"[Date - Publication] : "2025/12/31"[Date - Publication])
```

**Filters:**
- English language
- Primary research articles
- Human subjects

---

## Sampling

- If >500 results: Random sample of 300 (stratified by year: 60/year)
- If <500 results: Review all

---

## Inclusion Criteria

- Primary research article (not review/editorial/commentary)
- UK-based study OR uses UK cohort data
- Cancer-focused
- Human genomic data (germline or somatic)
- Published 2020-2025

## Exclusion Criteria

- Reviews, meta-analyses, editorials, commentaries, letters
- Non-human studies
- Cell line studies only (no patient data)
- Non-UK cohorts
- Non-cancer
- Conference abstracts only

---

## Data Extraction Variables

### Publication Metadata
| Variable | Type |
|----------|------|
| PMID | Numeric |
| Year | 2020-2025 |
| Journal | Text |
| Cancer type | Categorical |
| Study type | GWAS / WGS / WES / Panel / Other |
| Sample size | Numeric |
| Data source | UK Biobank / Genomics England / Institutional / Other |

### Diversity Reporting
| Variable | Options |
|----------|---------|
| Ancestry/ethnicity reported? | Yes / No / Partial |
| Term used | Ancestry / Ethnicity / Race / Population / Other |
| Categories reported | List |
| Ascertainment method | Self-report / Genetic / EHR / Not stated |
| Full breakdown provided? | Yes (N per group) / Proportions only / Mentioned only |
| European % | Numeric (if reported) |
| Non-European % | Numeric (if reported) |
| Diversity as limitation? | Yes / No |

---

## Analysis Plan

### Primary Outcome
- Proportion reporting any ancestry/ethnicity (95% CI)

### Secondary Outcomes
- Proportion with full quantitative breakdown
- Distribution of terminology
- Distribution of ascertainment methods
- Temporal trend (chi-square for trend)
- Variation by cancer type
- Variation by data source

### Reporting
- PRISMA flow diagram
- Summary tables
- Temporal trend figure

---

## Quality Control

- 10% double-coded
- Cohen's kappa for inter-rater reliability
- Discrepancies resolved by discussion

---

## Timeline

| Week | Activity |
|------|----------|
| 1 | Run search, de-duplicate, sample |
| 2 | Title/abstract screening |
| 3-4 | Full-text extraction |
| 5 | QC, resolve discrepancies |
| 6 | Analysis and write-up |

---

## Expected Outputs

1. Genomics England Summit abstract
2. Short paper (Lancet Oncology correspondence / Nature Genetics comment)
3. Open data file

---

## Hypotheses

Based on existing evidence:
- <50% of publications will report ancestry/ethnicity
- <25% will provide full quantitative breakdown
- Terminology will be inconsistent
- No significant improvement 2020-2025
