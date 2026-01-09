# PubMed Search Strategy

**Status:** VALIDATED AND EXECUTED (2026-01-09)
**See:** `search_validation.md` for full validation documentation

## Final Validated Search

### Copy and paste this COMPLETE search string into PubMed:
```
(("United Kingdom"[Affiliation] OR "UK"[Affiliation] OR "England"[Affiliation] OR "Scotland"[Affiliation] OR "Wales"[Affiliation]) AND (cancer[Title/Abstract] OR neoplasm[Title/Abstract] OR tumour[Title/Abstract] OR tumor[Title/Abstract]) AND ("whole genome"[Title/Abstract] OR "whole exome"[Title/Abstract] OR WGS[Title/Abstract] OR WES[Title/Abstract] OR GWAS[Title/Abstract] OR "genome-wide"[Title/Abstract] OR genomic[Title/Abstract])) AND ("2020"[Date - Publication] : "2025"[Date - Publication]) AND Journal Article[pt] AND English[lang]
```

### Important Notes:
- **DO NOT** add Humans[MeSH] filter (excludes recent papers with delayed indexing)
- Filters are built into the query string above
- Expected results: ~3,427

### Verify gold standard capture:
After running search, check these are included:
```
38200255[PMID]   → Must return 1
40513586[PMID]   → Must return 1
40513587[PMID]   → Must return 1
```

### Export:
- Export to CSV format
- Include: PMID, Title, Authors, Journal, Year, Abstract

---

## Validation Results (2026-01-09)

| Metric | Value |
|--------|-------|
| Total results | 3,427 |
| Gold standard capture | 3/3 (100%) |

| Gold Standard | PMID | Status |
|---------------|------|--------|
| GEL 100K Cancer | 38200255 | ✓ Captured |
| Recruitment Equity | 40513586 | ✓ Captured |
| Equity in Cancer Genomics UK | 40513587 | ✓ Captured |

---

## Search Strategy Selection

Multiple strategies were tested. The selected strategy balances sensitivity and specificity:

| Strategy | Results | Gold Std | Decision |
|----------|---------|----------|----------|
| Broad + Humans[MeSH] | 8,047 | 2/3 | Missed recent paper |
| Broad - Humans[MeSH] | 10,811 | 3/3 | Too many results |
| **Selected (specific terms)** | **3,427** | **3/3** | **Optimal** |
| Narrowest | 1,651 | 2/3 | Missed key paper |

---

## Next Steps

1. ✓ Search validated
2. Export results from PubMed
3. Per protocol: Sample 300 stratified by year (60/year for 2020-2025)
4. Begin title/abstract screening
