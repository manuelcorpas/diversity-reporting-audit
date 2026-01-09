# Diversity Reporting Audit

**A systematic audit of ancestry/ethnicity reporting in UK cancer genomics publications (2020-2025)**

## Research Question

What proportion of peer-reviewed UK cancer genomics publications report participant ancestry or ethnicity, and how is diversity information reported when present?

## Project Structure

```
DIVERSITY-REPORTING-AUDIT/
├── README.md                 # This file
├── protocol.md               # Full study protocol
├── search_strategy.md        # PubMed search instructions (validated)
├── search_validation.md      # Search validation documentation
├── extraction_template.csv   # Data extraction spreadsheet
├── web/                      # Interactive dashboard
│   ├── index.html            # Main dashboard
│   ├── css/styles.css        # Styling
│   ├── js/app.js             # JavaScript
│   └── data/audit.json       # Audit data
├── DATA/                     # Raw data (to be created)
│   ├── pubmed_export.csv     # Search results
│   └── extractions.csv       # Completed extractions
└── ANALYSIS/                 # Analysis outputs (to be created)
    ├── results.csv
    └── figures/
```

## Dashboard

Open `web/index.html` in a browser to view the interactive results dashboard.

## Timeline

| Week | Activity |
|------|----------|
| 1 | Run PubMed search, sample |
| 2 | Title/abstract screening |
| 3-4 | Full-text extraction |
| 5 | QC and analysis |
| 6 | Write-up |

## Target Output

- Genomics England Research Summit 2026 abstract
- Short paper for high-impact journal

## Author

Dr Manuel Corpas
DSxHE Data Diversity Theme Lead

## Status

- [x] Protocol drafted
- [x] Extraction template created
- [x] Search strategy validated (2026-01-09) - See `search_validation.md`
- [x] PubMed search executed (2026-01-09) - 3,427 results, 3/3 gold standard capture
- [x] Results visualization dashboard created
- [ ] Results exported and sample selected (300 stratified by year)
- [ ] Extraction completed
- [ ] Analysis completed
- [ ] Abstract submitted
