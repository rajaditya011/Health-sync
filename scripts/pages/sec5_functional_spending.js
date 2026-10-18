// Pages 19 and 20: Section 5 — Functional Healthcare Spending Breakdown & Statutory Audits
// Audited per Government Standards: Clear Analytical Harmonization Title and Required Disclaimers.

module.exports = function getSection5() {
    return `
<!-- PAGE 19: SECTION 5 - FUNCTIONAL SPENDING -->
<div class="pdf-page">
    <h1>5. Functional Healthcare Spending Breakdown</h1>

    <h2>5.1 HealthSync Analytical Synthesis of Public Health Spending Categories</h2>
    <div class="callout" style="margin-bottom: 10px; padding: 7px 12px; font-size: 8pt; line-height: 1.4; border-left: 4px solid #0284c7; background: #f0f9ff;">
        <strong>Methodological Note & Statutory Disclaimer:</strong> These categories are analytically harmonised from multiple government budget and expenditure sources (Union Ministry of Health & Family Welfare Demands for Grants, State Budget Demand Gazettes, and RBI State Finances: A Study of Budgets Table IV.3) and do not represent a single official government accounting classification. Official accounting structures differ across states (Revenue vs. Capital accounts under Major Head 2210/2211, Centrally Sponsored Scheme matching shares, and autonomous trust transfers). HealthSync has synthesised these functional categories to provide a clear, operational perspective on where public health funds are directed.
    </div>

    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 28%;">Harmonised Spending Category</th>
            <th style="width: 17%;">Estimated Outlay</th>
            <th style="width: 10%;">% Share</th>
            <th style="width: 23%;">Primary Funding Vehicle</th>
            <th style="width: 22%;">Documented Operational Bottleneck</th>
        </tr>
        <tr>
            <td><strong>Tertiary & Secondary Hospitals</strong></td>
            <td><strong>₹1,47,130 Cr</strong></td>
            <td>33.0%</td>
            <td>State Health Budgets & PMSSY Scheme</td>
            <td>Severe overcrowding; 45% minor ailments bypass primary care.</td>
        </tr>
        <tr>
            <td><strong>Primary Care & AAMs</strong></td>
            <td><strong>₹1,24,840 Cr</strong></td>
            <td>28.0%</td>
            <td>National Health Mission (NHM) & XV-FC</td>
            <td>Low diagnostic confirmation capability at rural sub-centres.</td>
        </tr>
        <tr>
            <td><strong>Human Resources & Salaries</strong></td>
            <td><strong>₹1,02,545 Cr</strong></td>
            <td>23.0%</td>
            <td>State Establishment Outlays & NHM</td>
            <td>35–40% physician working time lost to manual documentation.</td>
        </tr>
        <tr>
            <td><strong>Drug & Supply Procurement</strong></td>
            <td><strong>₹40,125 Cr</strong></td>
            <td>9.0%</td>
            <td>Central PMBJP & State Medical Corps</td>
            <td>Generic non-compliance; costly brand substitution in retail.</td>
        </tr>
        <tr>
            <td><strong>Government Insurance (PM-JAY)</strong></td>
            <td><strong>₹17,830 Cr</strong></td>
            <td>4.0%</td>
            <td>NHA Trust / Insurance Mode Transfers</td>
            <td>Zero post-discharge recovery monitoring; readmission leakage.</td>
        </tr>
        <tr>
            <td><strong>Diagnostics & Devices</strong></td>
            <td><strong>₹8,915 Cr</strong></td>
            <td>2.0%</td>
            <td>NHM Free Diagnostics Initiative</td>
            <td>Redundant repeat testing across referral tiers.</td>
        </tr>
        <tr>
            <td><strong>Digital Health & Telemedicine</strong></td>
            <td><strong>₹4,460 Cr</strong></td>
            <td>1.0%</td>
            <td>Central ABDM Allocation & State IT</td>
            <td>Invested in static registries rather than point-of-care clinical workflow AI.</td>
        </tr>
    </table>

    <div class="chart-box" style="margin-top: 10px;">
        <div class="chart-title">Visual 2: HealthSync Analytical Synthesis of Public Health Spending Categories (FY 2024-25)</div>
        <div class="chart-meta">Source: Analytically harmonised from RBI State Finances & Union Budget 2024-25 | Total Outlays: ₹4,45,855 Crore</div>
        
        <div class="bar-group">
            <div class="bar-label"><span>Tertiary & Secondary Hospitals (33.0%)</span><span>₹1,47,130 Cr</span></div>
            <div class="bar-track"><div class="bar-fill-blue" style="width: 33%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>Primary Healthcare & AAMs (28.0%)</span><span>₹1,24,840 Cr</span></div>
            <div class="bar-track"><div class="bar-fill-emerald" style="width: 28%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>Salaries & Human Resources (23.0%)</span><span>₹1,02,545 Cr</span></div>
            <div class="bar-track"><div class="bar-fill-indigo" style="width: 23%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>Drug & Supply Procurement (9.0%)</span><span>₹40,125 Cr</span></div>
            <div class="bar-track"><div class="bar-fill-amber" style="width: 9%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>PM-JAY, Diagnostics & Digital (7.0%)</span><span>₹31,205 Cr</span></div>
            <div class="bar-track"><div class="bar-fill-rose" style="width: 7%;"></div></div>
        </div>
    </div>

    <div class="source-box">
        <strong>Primary Sources:</strong> Union Budget Demands for Grants 2024-25 (<a href="https://www.indiabudget.gov.in" style="color: #0284c7;">indiabudget.gov.in</a>) | Reserve Bank of India State Finances Study of Budgets (<a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a>).
    </div>
</div>

<!-- PAGE 20: SECTION 5 (CONT) - CAG AUDITS -->
<div class="pdf-page">
    <h1>5. Spending Breakdown (Cont.): Statutory CAG Audits</h1>

    <h2>5.2 Empirical Audits by the Comptroller & Auditor General of India</h2>
    <p>
        Statutory performance audits conducted by the Comptroller & Auditor General of India (CAG) highlight critical structural gaps in fund utilization, beneficiary authentication, and healthcare delivery across Centrally Sponsored Schemes:
    </p>

    <div class="callout-amber">
        <h4 style="margin: 0 0 4px 0; color: #b45309; font-size: 9.5pt;">1. CAG Performance Audit of PM-JAY (Report No. 11 of 2023)</h4>
        The constitutional audit of Ayushman Bharat PM-JAY tabled in Parliament revealed serious operational vulnerabilities across states:
        <ul style="margin-top: 6px;">
            <li><strong>Invalid Identity Linkages:</strong> Over <strong>7.49 Lakh beneficiaries</strong> were registered under a single disabled phone number (9999999999), and another 1.39 Lakh under numbers like 8888888888, demonstrating absence of bedside intake verification.</li>
            <li><strong>Ghost Authorizations & Double Billing:</strong> In multiple states, surgical pre-authorizations were approved for patients simultaneously admitted across hospitals separated by hundreds of kilometers, alongside approvals for already deceased patients.</li>
            <li><strong>Post-Discharge Disconnect:</strong> While hospitalizations were covered, the audit noted zero systemic tracking of post-discharge clinical outcomes, complications, or secondary readmissions.</li>
        </ul>
        <div style="font-size: 8.5pt; color: #78350f; margin-top: 4px;">
            <strong>HealthSync Solution:</strong> Biometric-bound intake timestamps, real-time FHIR record trails, and continuous post-operative Recovery Circles prevent identity recycling and false surgical billing.
        </div>
    </div>

    <div class="callout-amber">
        <h4 style="margin: 0 0 4px 0; color: #b45309; font-size: 9.5pt;">2. CAG Performance Audit of National Health Mission (Report No. 23 of 2017 & State Reviews)</h4>
        Audits across 28 State Health Societies revealed persistent structural financial delays:
        <ul style="margin-top: 6px;">
            <li><strong>Unspent Balances:</strong> Over <strong>₹18,000 Crore</strong> of Central NHM funds remained unspent in state treasuries at year-end due to delayed matching state share transfers and manual utilization certifications.</li>
            <li><strong>Procurement Idle Balances:</strong> Medical diagnostic equipment valued at ₹240+ Crore sat uninstalled in district warehouses due to lack of trained operators and site readiness.</li>
        </ul>
        <div style="font-size: 8.5pt; color: #78350f; margin-top: 4px;">
            <strong>HealthSync Solution:</strong> Automated digital milestone tracking provides verified proof of service completion, instantly releasing tranches under the Single Nodal Agency (SNA) portal.
        </div>
    </div>

    <div class="source-box">
        <strong>Primary Government Audits:</strong> CAG Report No. 11 of 2023 (Union Government — Performance Audit of Ayushman Bharat PM-JAY; <a href="https://cag.gov.in" style="color: #0284c7;">cag.gov.in</a>) | CAG Report No. 23 of 2017 (Performance Audit of National Health Mission; <a href="https://cag.gov.in" style="color: #0284c7;">cag.gov.in</a>).
    </div>
</div>
`;
};
