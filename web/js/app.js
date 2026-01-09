// Diversity Reporting Audit Dashboard
// Dr Manuel Corpas - DSxHE Data Diversity Theme

let auditData = null;

// Load data on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/audit.json');
        auditData = await response.json();
        renderDashboard();
    } catch (error) {
        console.error('Error loading audit data:', error);
        document.getElementById('research-question').textContent = 'Error loading data';
    }
});

function renderDashboard() {
    renderResearchQuestion();
    renderSummaryCards();
    renderMethodology();
    renderGoldStandard();
    renderHypotheses();
    renderExtractedPapers();
    renderFindings();
    renderSources();
    renderLastUpdated();
}

function renderResearchQuestion() {
    document.getElementById('research-question').textContent = auditData.researchQuestion;
}

function renderSummaryCards() {
    const search = auditData.searchMethodology;
    const results = auditData.auditResults;

    document.getElementById('total-publications').textContent = search.totalResults.toLocaleString();
    document.getElementById('gold-standard-rate').textContent = search.goldStandardCapture.rate + '%';
    document.getElementById('extraction-progress').textContent = results.extractionProgress.percentage + '%';

    // Reporting rate - show placeholder if not yet calculated
    const reportingRate = results.preliminaryFindings.reportingRate.value;
    document.getElementById('reporting-rate').textContent = reportingRate !== null ? reportingRate + '%' : '--';
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
            <div class="pmid">PMID: ${paper.pmid}</div>
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

function renderExtractedPapers() {
    const tbody = document.getElementById('extracted-tbody');
    tbody.innerHTML = '';

    auditData.goldStandardPapers.forEach(paper => {
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

    // Get findings from gold standard papers that have keyFindings
    auditData.goldStandardPapers.forEach(paper => {
        if (paper.keyFindings) {
            paper.keyFindings.forEach(finding => {
                const card = document.createElement('div');
                card.className = 'finding-card';

                card.innerHTML = `
                    <div class="source">PMID ${paper.pmid} - ${paper.journal} ${paper.year}</div>
                    <div class="content">${finding}</div>
                `;

                container.appendChild(card);
            });
        }
    });

    // If no findings, show placeholder
    if (container.children.length === 0) {
        container.innerHTML = '<p class="section-description">Key findings will appear here after extraction.</p>';
    }
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

// Copy search string to clipboard
function copySearchString() {
    const searchString = document.getElementById('search-string').textContent;
    navigator.clipboard.writeText(searchString).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Placeholder chart initialization (will be populated when data is available)
function initCharts() {
    const yearCtx = document.getElementById('chart-by-year');
    const termCtx = document.getElementById('chart-terminology');

    if (yearCtx && auditData.auditResults.byYear[0].total !== null) {
        new Chart(yearCtx, {
            type: 'bar',
            data: {
                labels: auditData.auditResults.byYear.map(y => y.year),
                datasets: [{
                    label: 'Reporting Rate (%)',
                    data: auditData.auditResults.byYear.map(y => y.rate),
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    if (termCtx && auditData.auditResults.terminologyUsed.ancestry !== null) {
        new Chart(termCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ancestry', 'Ethnicity', 'Race', 'Population', 'Mixed', 'Not Reported'],
                datasets: [{
                    data: [
                        auditData.auditResults.terminologyUsed.ancestry,
                        auditData.auditResults.terminologyUsed.ethnicity,
                        auditData.auditResults.terminologyUsed.race,
                        auditData.auditResults.terminologyUsed.population,
                        auditData.auditResults.terminologyUsed.mixed,
                        auditData.auditResults.terminologyUsed.notApplicable
                    ],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ec4899',
                        '#6b7280'
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}
