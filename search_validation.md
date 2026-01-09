# Search Strategy Validation

**Date:** 2026-01-09
**Author:** Dr Manuel Corpas
**Status:** IN PROGRESS

---

## 1. Gold Standard Articles

Papers that MUST be captured by any valid search strategy:

| # | PMID | Title | Journal | Year | Relevance | Status |
|---|------|-------|---------|------|-----------|--------|
| 1 | 38200255 | Insights for precision oncology from the integration of genomic and clinical data of 13,880 tumors from the 100,000 Genomes Cancer Programme | Nature Medicine | 2024 | Core GEL cancer paper | ✓ Valid |
| 2 | 40513586 | Improved recruitment equity in a UK cancer genomic testing programme | Lancet Oncology | 2025 | UK cancer equity commentary | ✓ Valid |
| 3 | 40513587 | Equity in cancer genomics in the UK: a cross-sectional analysis of a national cancer cohort | Lancet Oncology | 2025 | Core diversity paper | ✓ Valid |
| 4 | ~~40770095~~ | ~~Whole-genome sequencing of 490,640 UK Biobank participants~~ | ~~Nature~~ | ~~2025~~ | NOT cancer-specific | ✗ Removed |

**Note:** PMID 40770095 removed from gold standard - paper is general population genomics, not cancer-focused.

---

## 2. Search Strategies to Test

### Strategy A: Affiliation-based (Original)

```
("United Kingdom"[Affiliation] OR "UK"[Affiliation] OR "England"[Affiliation]
OR "Scotland"[Affiliation] OR "Wales"[Affiliation])
AND (cancer[Title/Abstract] OR neoplasm[Title/Abstract] OR tumour[Title/Abstract]
OR tumor[Title/Abstract] OR oncology[Title/Abstract])
AND (genomic[Title/Abstract] OR genome[Title/Abstract] OR sequencing[Title/Abstract]
OR exome[Title/Abstract] OR GWAS[Title/Abstract])
```

**Filters:** 2020-2025, Journal Article, Humans, English

**Concern:** Affiliation field may miss papers where UK data is used but authors are international

---

### Strategy B: UK Data Sources

```
("UK Biobank"[Title/Abstract] OR "Genomics England"[Title/Abstract]
OR "100,000 Genomes"[Title/Abstract] OR "100000 Genomes"[Title/Abstract]
OR "NHS England"[Title/Abstract])
AND (cancer[Title/Abstract] OR neoplasm[Title/Abstract] OR tumour[Title/Abstract]
OR tumor[Title/Abstract] OR oncology[Title/Abstract])
```

**Filters:** 2020-2025, Journal Article, Humans, English

**Concern:** Misses institutional cohorts not from UK Biobank or GEL

---

### Strategy C: Combined (A OR B)

```
(
  (("United Kingdom"[Affiliation] OR "UK"[Affiliation] OR "England"[Affiliation]
  OR "Scotland"[Affiliation] OR "Wales"[Affiliation])
  AND (genomic[Title/Abstract] OR genome[Title/Abstract] OR sequencing[Title/Abstract]
  OR exome[Title/Abstract] OR GWAS[Title/Abstract] OR genetic[Title/Abstract]))
  OR
  ("UK Biobank"[Title/Abstract] OR "Genomics England"[Title/Abstract]
  OR "100,000 Genomes"[Title/Abstract] OR "100000 Genomes"[Title/Abstract])
)
AND (cancer[Title/Abstract] OR neoplasm[Title/Abstract] OR tumour[Title/Abstract]
OR tumor[Title/Abstract] OR oncology[Title/Abstract])
```

**Filters:** 2020-2025, Journal Article, Humans, English

---

### Strategy D: MeSH-based

```
("Great Britain"[MeSH] OR "United Kingdom"[MeSH])
AND ("Neoplasms"[MeSH] OR cancer[Title/Abstract])
AND ("Genomics"[MeSH] OR "Whole Genome Sequencing"[MeSH] OR "Genome-Wide Association Study"[MeSH])
```

**Filters:** 2020-2025, Journal Article, Humans, English

**Concern:** MeSH indexing can be delayed or inconsistent

---

## 3. Validation Protocol

### Step 1: Test each strategy against gold standard
For each strategy, verify:
- Does it capture PMID 38200255? (Y/N)
- Does it capture PMID 40770095? (Y/N)
- Does it capture PMID 40513586? (Y/N)

### Step 2: Estimate yield
Run each strategy in PubMed and record total results

### Step 3: Precision sampling
For the best-performing strategy:
- Sample 20 random articles
- Review for relevance
- Calculate precision = relevant / total sampled

### Step 4: Select final strategy
Choose strategy with:
- 100% gold standard capture
- Highest precision
- Manageable yield (<1000)

---

## 4. Execution Instructions

### To test in PubMed:

1. Go to https://pubmed.ncbi.nlm.nih.gov/
2. Paste search string
3. Click Search
4. Apply filters via sidebar:
   - Publication date: Custom range → 2020/01/01 to 2025/12/31
   - Article type: Journal Article
   - Species: Humans
   - Language: English
5. Record total results
6. Search within results for each gold standard PMID

### To verify gold standard capture:

After running search, use:
```
[search results] AND 38200255[PMID]
```
Should return 1 result if captured, 0 if missed.

---

## 5. Validation Analysis (2026-01-09)

### Gold Standard Article Metadata Review

**PMID 38200255** - Genomics England 100K Cancer Programme
- Affiliations: Genomics England London **UK**, University of Westminster London **UK**, Queen Mary University of London, NHS
- Title terms: "**oncology**", "**genomic**", "**100,000 Genomes**"
- Abstract terms: "**cancer**", "**tumors**", "**genome**", "**sequencing**", "WGS"

**PMID 40513586** - Recruitment Equity Commentary (Lancet Oncology)
- Affiliations: Manchester Centre for Genomic Medicine **UK**, University of Manchester **UK**
- Title terms: "**UK**", "**cancer**", "**genomic**"
- No abstract (commentary/letter - 3 pages)

**PMID 40513587** - Equity in Cancer Genomics UK (Lancet Oncology)
- Affiliations: Genomics England London **UK**, University of Bristol, University of Oxford, UCL, LSHTM
- Title terms: "**cancer**", "**genomics**", "**UK**"
- Abstract terms: "**cancer**", "**genomics**", "**100,000 Genomes Project**", "**ancestry**", "**tumour**"

**PMID 40770095** - UK Biobank WGS (**REMOVED**)
- Affiliations: International consortium (AstraZeneca, GSK, Janssen, Illumina, deCODE/Amgen)
- Title terms: "UK Biobank", "Whole-genome sequencing"
- Abstract terms: genetic variation, ancestry, structural variants
- **CRITICAL:** NOT cancer-specific - no cancer terms in title/abstract

### Strategy Capture Analysis

| Strategy | PMID 38200255 | PMID 40513586 | PMID 40513587 | Notes |
|----------|---------------|---------------|---------------|-------|
| **A: Affiliation** | ✓ YES | ✓ YES | ✓ YES | All have UK affiliations |
| **B: UK Sources** | ✓ YES | ? UNCERTAIN | ✓ YES | 40513586 may not mention Biobank/GEL explicitly |
| **C: Combined** | ✓ YES | ✓ YES | ✓ YES | Best coverage |
| **D: MeSH** | ? TBD | ? TBD | ? TBD | Requires PubMed verification |

### Validation Results Summary

| Strategy | Gold Std 1 | Gold Std 2 | Gold Std 3 | Capture Rate |
|----------|------------|------------|------------|--------------|
| **A: Affiliation-based** | ✓ | ✓ | ✓ | **3/3 (100%)** |
| **B: UK Data Sources** | ✓ | ? | ✓ | 2-3/3 (67-100%) |
| **C: Combined (A OR B)** | ✓ | ✓ | ✓ | **3/3 (100%)** |
| **D: MeSH-based** | ? | ? | ? | TBD |

### Strategy Evaluation

**Strategy A (Affiliation-based):**
- ✓ Captures all 3 valid gold standards
- ✓ Simpler query structure
- ⚠ May miss papers with international author teams using UK data
- **VIABLE OPTION**

**Strategy B (UK Data Sources):**
- ✗ Too narrow - misses UK institutional studies not explicitly mentioning Biobank/GEL
- Only captures papers explicitly mentioning major UK resources
- **NOT RECOMMENDED**

**Strategy C (Combined A OR B):**
- ✓ Captures all 3 valid gold standards
- ✓ Best theoretical coverage (combines affiliation AND data source)
- ⚠ More complex query
- ⚠ May produce larger yield
- **RECOMMENDED**

**Strategy D (MeSH-based):**
- ⚠ Depends on NLM indexing (can be delayed or inconsistent)
- ⚠ May miss recent papers
- Requires PubMed verification
- **DEFER PENDING TESTING**

### Methodological Note: Gold Standard Refinement

**PMID 40770095** (UK Biobank WGS, Nature 2025) was removed from gold standard because:
1. Paper is general population genomics, NOT cancer-specific
2. No cancer-related terms appear in title or abstract
3. While UK Biobank is used for cancer research, this specific paper is irrelevant to "UK cancer genomics" audit
4. Its exclusion from search results is **CORRECT** (not a false negative)

---

## 6. Final Validated Search

**Selected strategy:** Strategy A Modified (Affiliation + Specific Genomics Terms)

**Rationale:** 100% gold standard capture with manageable yield (3,427 vs 10,811)

**Exact search string (copy/paste into PubMed):**
```
(("United Kingdom"[Affiliation] OR "UK"[Affiliation] OR "England"[Affiliation] OR "Scotland"[Affiliation] OR "Wales"[Affiliation])
AND (cancer[Title/Abstract] OR neoplasm[Title/Abstract] OR tumour[Title/Abstract] OR tumor[Title/Abstract])
AND ("whole genome"[Title/Abstract] OR "whole exome"[Title/Abstract] OR WGS[Title/Abstract] OR WES[Title/Abstract] OR GWAS[Title/Abstract] OR "genome-wide"[Title/Abstract] OR genomic[Title/Abstract]))
AND ("2020"[Date - Publication] : "2025"[Date - Publication])
AND Journal Article[pt]
AND English[lang]
```

**Filters applied (built into query):**
- Publication date: 2020/01/01 - 2025/12/31
- Article type: Journal Article
- Language: English
- **NOTE:** Humans[MeSH] filter REMOVED (excludes recent papers with delayed MeSH indexing)

**Empirical validation results (2026-01-09):**

| Metric | Value |
|--------|-------|
| Total results | 3,427 |
| Gold standard capture | 3/3 (100%) |
| PMID 38200255 | ✓ Captured |
| PMID 40513586 | ✓ Captured |
| PMID 40513587 | ✓ Captured |

**Search strategies tested:**

| Strategy | Results | Gold Std Capture | Notes |
|----------|---------|------------------|-------|
| C (Combined) + Humans[MeSH] | 8,047 | 2/3 (67%) | Missed 40513586 due to MeSH delay |
| C (Combined) - Humans[MeSH] | 10,811 | 3/3 (100%) | Too broad |
| A (Affiliation) broad | 6,399 | 3/3 (100%) | Still large |
| A Modified (specific terms) | 3,427 | 3/3 (100%) | **SELECTED** |
| Narrowest (no "genomic") | 1,651 | 2/3 (67%) | Missed 40513586 |

**Key finding:** The Humans[MeSH] filter must be EXCLUDED for recent papers (PMID 40513586 lacked MeSH indexing)

---

## 7. Reproducibility Checklist

- [x] Search string documented exactly as entered
- [x] All filters documented
- [x] Gold standard articles identified and validated
- [x] Search strategy theoretically validated against gold standards
- [x] Search executed via NCBI E-utilities API
- [x] Date of search recorded: 2026-01-09
- [x] Total results recorded: 3,427
- [x] Gold standard articles verified as captured (empirical): 3/3
- [ ] Search replicated in PubMed web interface (optional verification)
- [ ] Results exported for screening

---

## 8. Gold Standard Verification Commands

After executing the search in PubMed, run these queries to verify gold standard capture:

```
# Verify PMID 38200255 is captured
([your search results]) AND 38200255[PMID]
→ Should return 1 result

# Verify PMID 40513586 is captured
([your search results]) AND 40513586[PMID]
→ Should return 1 result

# Verify PMID 40513587 is captured
([your search results]) AND 40513587[PMID]
→ Should return 1 result
```

---

## 9. Validation Audit Trail

| Date | Action | Result |
|------|--------|--------|
| 2026-01-09 | Created validation protocol | 4 strategies defined |
| 2026-01-09 | Identified gold standard articles | 4 candidates |
| 2026-01-09 | Reviewed PMID 40770095 | REMOVED - not cancer-specific |
| 2026-01-09 | Found PMID for Lancet Oncology equity paper | PMID 40513587 |
| 2026-01-09 | Theoretical validation complete | Strategy C selected |
| 2026-01-09 | Executed Strategy C via API | 8,047 results, 2/3 gold std |
| 2026-01-09 | Identified Humans[MeSH] filter issue | PMID 40513586 lacked indexing |
| 2026-01-09 | Tested Strategy A variants | Found optimal at 3,427 results |
| 2026-01-09 | Final validation complete | 3,427 results, 3/3 gold std (100%) |

---

## Notes

- PMID 40513587 (Equity in cancer genomics UK) is the core diversity paper - essential capture.
- PMID 40770095 was correctly removed - it's about UK Biobank WGS generally, not cancer.
- Affiliation-based searches may miss international collaborations using UK data.
- Strategy C (Combined) provides redundant capture paths for maximum sensitivity.
- Consider running search monthly during extraction to capture new publications.
