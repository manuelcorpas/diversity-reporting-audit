// Diversity Reporting Audit Dashboard
// Dr Manuel Corpas - DSxHE Data Diversity Theme

let auditData = null;
let filteredPapers = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/audit.json');
        auditData = await response.json();
        filteredPapers = [...auditData.goldStandardPapers];
        renderDashboard();
        setupFilters();
        initCharts();
    } catch (error) {
        console.error('Error loading audit data:', error);
        document.getElementById('research-question').textContent = 'Error loading data';
    }
});

function renderDashboard() {
    renderResearchQuestion();
    renderProgressTracker();
    renderSummaryCards();
    renderMethodology();
    renderGoldStandard();
    renderHypotheses();
    renderCancerTypeTable();
    renderExtractedPapers();
    renderFindings();
    renderSources();
    renderLastUpdated();
}

function renderResearchQuestion() {
    document.getElementById('research-question').textContent = auditData.researchQuestion;
}

function renderProgressTracker() {
    const results = auditData.auditResults;
    const extracted = results.extractionProgress.completed;
    const total = results.extractionProgress.total;
    const percent = results.extractionProgress.percentage;

    document.getElementById('extracted-count').textContent = extracted;
    document.getElementById('total-sample').textContent = total;
    document.getElementById('progress-percent').textContent = percent + '%';
    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('search-results-count').textContent = auditData.searchMethodology.totalResults.toLocaleString();
    document.getElementById('current-extracted').textContent = extracted;
}

function renderSummaryCards() {
    const search = auditData.searchMethodology;
    const results = auditData.auditResults;

    document.getElementById('total-publications').textContent = search.totalResults.toLocaleString();
    document.getElementById('gold-standard-rate').textContent = search.goldStandardCapture.rate + '%';
    document.getElementById('extraction-progress').textContent = results.extractionProgress.percentage + '%';

    // Reporting rate - show placeholder if not yet calculated
    const reportingRate = results.preliminaryFindings.reportingRate.value;
    const reportingRateCard = document.getElementById('reporting-rate-card');
    if (reportingRate !== null) {
        document.getElementById('reporting-rate').textContent = reportingRate + '%';
        if (reportingRateCard) {
            reportingRateCard.classList.add('highlight');
            const note = reportingRateCard.querySelector('.card-note');
            if (note) note.style.display = 'none';
        }
    } else {
        document.getElementById('reporting-rate').textContent = '--';
    }
}

function renderMethodology() {
    const search = auditData.searchMethodology;

    document.getElementById('search-database').textContent = search.database;
    document.getElementById('search-date-range').textContent = search.dateRange;
    document.getElementById('search-date-executed').textContent = search.dateExecuted;
    document.getElementById('search-total-results').textContent = search.totalResults.toLocaleString();
    document.getElementById('search-string').textContent = search.searchString;
    document.getElementById('validation-note').textContent = search.validationNote;
}

function renderGoldStandard() {
    const container = document.getElementById('gold-standard-grid');
    container.innerHTML = '';

    auditData.goldStandardPapers.forEach(paper => {
        const card = document.createElement('div');
        card.className = 'gold-paper';

        const diversityClass = paper.diversityReporting.reported === 'yes' ? 'yes' :
            paper.diversityReporting.reported === 'partial' ? 'partial' : 'no';

        card.innerHTML = `
            <div class="pmid">PMID: <a href="https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/" target="_blank">${paper.pmid}</a></div>
            <div class="title">${paper.title}</div>
            <div class="journal-year">${paper.journal} (${paper.year})</div>
            <div>
                <span class="diversity-badge ${diversityClass}">
                    Diversity: ${paper.diversityReporting.reported.toUpperCase()}
                </span>
                ${paper.diversityReporting.termUsed ?
                    `<span class="diversity-badge" style="background: #e0e7ff; color: #3730a3; margin-left: 0.25rem;">
                        ${paper.diversityReporting.termUsed}
                    </span>` : ''}
            </div>
        `;

        container.appendChild(card);
    });
}

function renderHypotheses() {
    const container = document.getElementById('hypotheses-grid');
    container.innerHTML = '';

    auditData.hypotheses.forEach(hypothesis => {
        const card = document.createElement('div');
        card.className = 'hypothesis-card';

        card.innerHTML = `
            <div class="hypothesis-id">${hypothesis.id.toUpperCase()}</div>
            <div class="hypothesis-statement">${hypothesis.statement}</div>
            <div class="hypothesis-status ${hypothesis.status}">${hypothesis.status}</div>
        `;

        container.appendChild(card);
    });
}

function renderCancerTypeTable() {
    const tbody = document.getElementById('cancer-type-tbody');
    tbody.innerHTML = '';

    // Aggregate by cancer type from extracted papers
    const byCancer = {};
    filteredPapers.forEach(paper => {
        const type = paper.cancerType || 'unknown';
        if (!byCancer[type]) {
            byCancer[type] = { total: 0, reporting: 0, fullBreakdown: 0 };
        }
        byCancer[type].total++;
        if (paper.diversityReporting.reported === 'yes') {
            byCancer[type].reporting++;
        }
        if (paper.diversityReporting.fullBreakdown === 'yes_counts') {
            byCancer[type].fullBreakdown++;
        }
    });

    if (Object.keys(byCancer).length === 0) {
        tbody.innerHTML = '<tr class="placeholder-row"><td colspan="4">Data pending extraction</td></tr>';
        return;
    }

    Object.entries(byCancer).forEach(([type, data]) => {
        const row = document.createElement('tr');
        const reportingRate = ((data.reporting / data.total) * 100).toFixed(0);
        const breakdownRate = ((data.fullBreakdown / data.total) * 100).toFixed(0);

        row.innerHTML = `
            <td>${type}</td>
            <td>${data.total}</td>
            <td>${reportingRate}%</td>
            <td>${breakdownRate}%</td>
        `;
        tbody.appendChild(row);
    });
}

function renderExtractedPapers() {
    const tbody = document.getElementById('extracted-tbody');
    tbody.innerHTML = '';

    const badge = document.getElementById('extracted-badge');
    if (badge) badge.textContent = `${filteredPapers.length} papers`;

    filteredPapers.forEach(paper => {
        const row = document.createElement('tr');

        const diversityClass = paper.diversityReporting.reported === 'yes' ? 'yes' :
            paper.diversityReporting.reported === 'partial' ? 'partial' : 'no';

        row.innerHTML = `
            <td><a href="https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/" target="_blank">${paper.pmid}</a></td>
            <td>${paper.year}</td>
            <td>${paper.journal}</td>
            <td>${paper.cancerType}</td>
            <td>${paper.sampleSize ? paper.sampleSize.toLocaleString() : '--'}</td>
            <td><span class="diversity-badge ${diversityClass}">${paper.diversityReporting.reported}</span></td>
            <td>${paper.diversityReporting.termUsed || '--'}</td>
            <td>${paper.diversityReporting.fullBreakdown || '--'}</td>
        `;

        tbody.appendChild(row);
    });
}

function renderFindings() {
    const container = document.getElementById('findings-grid');
    container.innerHTML = '';

    const papers = auditData.goldStandardPapers;
    const total = papers.length;
    const reporting = papers.filter(p => p.diversityReporting.reported === 'yes').length;
    const rate = ((reporting / total) * 100).toFixed(1);

    // Calculate terminology distribution
    const termCounts = {};
    papers.forEach(p => {
        if (p.diversityReporting.termUsed) {
            const term = p.diversityReporting.termUsed;
            termCounts[term] = (termCounts[term] || 0) + 1;
        }
    });

    // Calculate year trends
    const byYear = {};
    papers.forEach(p => {
        if (!byYear[p.year]) byYear[p.year] = {total: 0, reporting: 0};
        byYear[p.year].total++;
        if (p.diversityReporting.reported === 'yes') byYear[p.year].reporting++;
    });

    const findings = [
        {
            title: "Overall Reporting Rate",
            content: `Only ${rate}% of UK cancer genomics publications (${reporting}/${total}) mention participant ancestry or ethnicity in their abstracts.`
        },
        {
            title: "Terminology Variation",
            content: `Multiple terms are used: ${Object.entries(termCounts).map(([t,c]) => `${t} (${c})`).join(', ')}. This inconsistency hinders cross-study comparisons.`
        },
        {
            title: "Hypothesis H1 Supported",
            content: `The hypothesis that less than 50% of publications report diversity is strongly supported (${rate}% < 50%).`
        },
        {
            title: "Year-by-Year Variation",
            content: `Reporting rates vary across years: ${Object.entries(byYear).sort((a,b) => a[0]-b[0]).map(([y,d]) => `${y}: ${((d.reporting/d.total)*100).toFixed(0)}%`).join(', ')}.`
        }
    ];

    findings.forEach(finding => {
        const card = document.createElement('div');
        card.className = 'finding-card';
        card.innerHTML = `
            <div class="source">${finding.title}</div>
            <div class="content">${finding.content}</div>
        `;
        container.appendChild(card);
    });
}

function renderSources() {
    const container = document.getElementById('sources-list');
    container.innerHTML = '';

    auditData.sources.forEach(source => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${source.url}" target="_blank">${source.label}</a>`;
        container.appendChild(li);
    });
}

function renderLastUpdated() {
    document.getElementById('last-updated').textContent = auditData.metadata.date;
}

// Filter functionality
function setupFilters() {
    const filterYear = document.getElementById('filter-year');
    const filterCancer = document.getElementById('filter-cancer');
    const filterDiversity = document.getElementById('filter-diversity');

    if (filterYear) filterYear.addEventListener('change', applyFilters);
    if (filterCancer) filterCancer.addEventListener('change', applyFilters);
    if (filterDiversity) filterDiversity.addEventListener('change', applyFilters);

    // Populate filter options from data
    populateFilterOptions();
}

function populateFilterOptions() {
    const years = new Set();
    const cancerTypes = new Set();

    auditData.goldStandardPapers.forEach(paper => {
        years.add(paper.year);
        cancerTypes.add(paper.cancerType);
    });

    const yearSelect = document.getElementById('filter-year');
    if (yearSelect) {
        yearSelect.innerHTML = '<option value="all">All Years</option>';
        [...years].sort().forEach(year => {
            yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
        });
    }

    const cancerSelect = document.getElementById('filter-cancer');
    if (cancerSelect) {
        cancerSelect.innerHTML = '<option value="all">All Types</option>';
        [...cancerTypes].sort().forEach(type => {
            cancerSelect.innerHTML += `<option value="${type}">${type}</option>`;
        });
    }
}

function applyFilters() {
    const yearFilter = document.getElementById('filter-year')?.value || 'all';
    const cancerFilter = document.getElementById('filter-cancer')?.value || 'all';
    const diversityFilter = document.getElementById('filter-diversity')?.value || 'all';

    filteredPapers = auditData.goldStandardPapers.filter(paper => {
        if (yearFilter !== 'all' && paper.year.toString() !== yearFilter) return false;
        if (cancerFilter !== 'all' && paper.cancerType !== cancerFilter) return false;
        if (diversityFilter !== 'all' && paper.diversityReporting.reported !== diversityFilter) return false;
        return true;
    });

    renderCancerTypeTable();
    renderExtractedPapers();
    updateCharts();
}

// CSV Export
function exportCSV() {
    const headers = ['PMID', 'Year', 'Journal', 'Cancer_Type', 'Sample_Size', 'Diversity_Reported', 'Term_Used', 'Categories_Reported', 'Ascertainment_Method', 'Full_Breakdown', 'European_Pct', 'NonEuropean_Pct', 'Diversity_As_Limitation', 'Notes'];

    const rows = filteredPapers.map(paper => [
        paper.pmid,
        paper.year,
        paper.journal,
        paper.cancerType,
        paper.sampleSize || '',
        paper.diversityReporting.reported,
        paper.diversityReporting.termUsed || '',
        paper.diversityReporting.categoriesReported || '',
        paper.diversityReporting.ascertainmentMethod || '',
        paper.diversityReporting.fullBreakdown || '',
        paper.diversityReporting.europeanPct || '',
        paper.diversityReporting.nonEuropeanPct || '',
        paper.diversityReporting.diversityAsLimitation || '',
        paper.notes || ''
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `diversity_audit_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
}

// Copy search string to clipboard
function copySearchString() {
    const searchString = document.getElementById('search-string').textContent;
    navigator.clipboard.writeText(searchString).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy to Clipboard';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Charts
let yearChart = null;
let termChart = null;

function initCharts() {
    const yearCtx = document.getElementById('chart-by-year');
    const termCtx = document.getElementById('chart-terminology');

    if (!yearCtx || !termCtx) return;

    // Year chart - group by year
    const byYear = {};
    auditData.goldStandardPapers.forEach(paper => {
        const year = paper.year;
        if (!byYear[year]) byYear[year] = { total: 0, reporting: 0 };
        byYear[year].total++;
        if (paper.diversityReporting.reported === 'yes') byYear[year].reporting++;
    });

    const years = Object.keys(byYear).sort();
    const reportingData = years.map(y => byYear[y].total > 0 ? (byYear[y].reporting / byYear[y].total * 100) : 0);

    yearChart = new Chart(yearCtx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Diversity Reporting Rate (%)',
                data: reportingData,
                backgroundColor: '#3b82f6',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Reporting Rate (%)' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Terminology chart
    const byTerm = {};
    auditData.goldStandardPapers.forEach(paper => {
        const term = paper.diversityReporting.termUsed || 'not reported';
        byTerm[term] = (byTerm[term] || 0) + 1;
    });

    termChart = new Chart(termCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(byTerm),
            datasets: [{
                data: Object.values(byTerm),
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Update chart notes
    const paperCount = auditData.goldStandardPapers.length;
    const yearNote = document.getElementById('chart-year-note');
    const termNote = document.getElementById('chart-term-note');
    if (yearNote) yearNote.textContent = `Based on ${paperCount} extracted papers`;
    if (termNote) termNote.textContent = `Based on ${paperCount} extracted papers`;
}

function updateCharts() {
    if (!yearChart || !termChart) return;

    // Update year chart
    const byYear = {};
    filteredPapers.forEach(paper => {
        const year = paper.year;
        if (!byYear[year]) byYear[year] = { total: 0, reporting: 0 };
        byYear[year].total++;
        if (paper.diversityReporting.reported === 'yes') byYear[year].reporting++;
    });

    const years = Object.keys(byYear).sort();
    yearChart.data.labels = years;
    yearChart.data.datasets[0].data = years.map(y => byYear[y].total > 0 ? (byYear[y].reporting / byYear[y].total * 100) : 0);
    yearChart.update();

    // Update terminology chart
    const byTerm = {};
    filteredPapers.forEach(paper => {
        const term = paper.diversityReporting.termUsed || 'not reported';
        byTerm[term] = (byTerm[term] || 0) + 1;
    });

    termChart.data.labels = Object.keys(byTerm);
    termChart.data.datasets[0].data = Object.values(byTerm);
    termChart.update();

    // Update notes
    const yearNote = document.getElementById('chart-year-note');
    const termNote = document.getElementById('chart-term-note');
    if (yearNote) yearNote.textContent = `Based on ${filteredPapers.length} extracted papers`;
    if (termNote) termNote.textContent = `Based on ${filteredPapers.length} extracted papers`;
}
