// Pages 6 and 7: Section 2 — Consolidated India Healthcare Financing Architecture
// Audited against Union Budget 2024-25 Demands for Grants and RBI State Finances 2024-25 Table IV.3.

module.exports = function getSection2() {
    return `
<!-- PAGE 6: SECTION 2 - FINANCING ARCHITECTURE -->
<div class="pdf-page">
    <h1>2. Consolidated India Healthcare Financing Architecture</h1>

    <h2>2.1 Macro Health Financing Framework: BE vs RE vs AE (2021–2025)</h2>
    <p>
        Public healthcare financing in India operates across a two-tiered federal structure: Union Budget allocations (direct central outlays and Centrally Sponsored Schemes) and State/UT Budget allocations. In FY 2024-25, the combined public budget commitment reached <strong>₹4,45,855 Crore</strong>.
    </p>

    <h3>Consolidated Public Health Macro-Financing Table (FY 2021–2025)</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 27%;">Macro Financing Head</th>
            <th style="width: 17%;">BE FY 2024-25</th>
            <th style="width: 17%;">RE FY 2023-24</th>
            <th style="width: 17%;">AE FY 2022-23</th>
            <th style="width: 22%;">Official Source & Verification URL</th>
        </tr>
        <tr>
            <td><strong>Central MoHFW Outlay</strong></td>
            <td><strong>₹90,958.63 Cr</strong></td>
            <td>₹80,517.62 Cr</td>
            <td>₹74,943.44 Cr</td>
            <td><a href="https://www.indiabudget.gov.in" style="color: #0284c7; text-decoration: none;">Union Budget Demand 46 & 47</a></td>
        </tr>
        <tr>
            <td><strong>Ministry of Ayush Outlay</strong></td>
            <td><strong>₹3,712.49 Cr</strong></td>
            <td>₹3,003.61 Cr</td>
            <td>₹2,763.50 Cr</td>
            <td><a href="https://www.indiabudget.gov.in" style="color: #0284c7; text-decoration: none;">Union Budget Demand 4 (Ayush)</a></td>
        </tr>
        <tr>
            <td><strong>State Health Budgets (All States/UTs)</strong></td>
            <td><strong>₹3,51,184.30 Cr</strong></td>
            <td>₹2,80,974.70 Cr</td>
            <td>₹2,42,883.20 Cr</td>
            <td><a href="https://www.rbi.org.in" style="color: #0284c7; text-decoration: none;">RBI State Finances 2024-25 (Table IV.3)</a></td>
        </tr>
        <tr>
            <td><strong>Consolidated Public Health Outlay</strong></td>
            <td><strong>₹4,45,855.42 Cr</strong></td>
            <td>₹3,64,495.93 Cr</td>
            <td>₹3,20,590.14 Cr</td>
            <td>Synthesized Union Budget & RBI Data</td>
        </tr>
        <tr>
            <td><strong>National Health Mission (NHM)</strong></td>
            <td><strong>₹36,000.00 Cr</strong></td>
            <td>₹31,550.00 Cr</td>
            <td>₹30,060.00 Cr</td>
            <td><a href="https://www.indiabudget.gov.in" style="color: #0284c7; text-decoration: none;">MoHFW CSS Demand No. 46</a></td>
        </tr>
        <tr>
            <td><strong>PM-JAY (Ayushman Bharat Scheme)</strong></td>
            <td><strong>₹7,300.00 Cr</strong></td>
            <td>₹6,800.00 Cr</td>
            <td>₹6,048.00 Cr</td>
            <td><a href="https://nha.gov.in" style="color: #0284c7; text-decoration: none;">NHA Annual Compendium 2023-24</a></td>
        </tr>
        <tr>
            <td><strong>Ayushman Bharat Digital Mission (ABDM)</strong></td>
            <td><strong>₹200.00 Cr</strong></td>
            <td>₹200.00 Cr</td>
            <td>₹135.20 Cr</td>
            <td><a href="https://dashboard.abdm.gov.in" style="color: #0284c7; text-decoration: none;">MoHFW Demand 46 Central Sector</a></td>
        </tr>
        <tr>
            <td><strong>Govt Health Exp (% of GDP)</strong></td>
            <td><strong>1.84% (NHA FY22)</strong></td>
            <td>1.60% (NHA FY21)</td>
            <td>1.35% (NHA FY20)</td>
            <td><a href="https://nhsrcindia.org" style="color: #0284c7; text-decoration: none;">NHA Estimates FY 2021-22</a></td>
        </tr>
        <tr>
            <td><strong>Out-of-Pocket Exp (% of THE)</strong></td>
            <td><strong>39.4% (NHA FY22)</strong></td>
            <td>44.4% (NHA FY21)</td>
            <td>48.2% (NHA FY20)</td>
            <td><a href="https://nhsrcindia.org" style="color: #0284c7; text-decoration: none;">NHA Estimates FY 2021-22</a></td>
        </tr>
        <tr>
            <td><strong>Per-Capita Govt Health Spend</strong></td>
            <td><strong>₹3,169 (NHA FY22)</strong></td>
            <td>₹2,488 (NHA FY21)</td>
            <td>₹1,814 (NHA FY19)</td>
            <td><a href="https://nhsrcindia.org" style="color: #0284c7; text-decoration: none;">NHA Estimates FY 2021-22</a></td>
        </tr>
    </table>

    <div class="callout" style="margin-top: 8px;">
        <h4 style="margin: 0 0 2px 0; color: #0369a1; font-size: 8.8pt;">Statutory Accounting Definitions (GFR 2017)</h4>
        <span style="font-size: 8.2pt; color: #334155;">
            <strong>BE (Budget Estimate):</strong> Ex-ante allocation approved by Parliament and State Legislatures before fiscal year commencement.<br>
            <strong>RE (Revised Estimate):</strong> Mid-year statutory review reflecting actual mid-year burn rates, re-appropriations, and supplemental demands.<br>
            <strong>AE (Actual Expenditure):</strong> Audited final accounts certified by the Comptroller & Auditor General of India (CAG) and compiled by RBI.
        </span>
    </div>

    <div class="source-box">
        <strong>Direct Verification Sources:</strong> Union Budget Demands for Grants (Demand 46 & 47) | <a href="https://www.indiabudget.gov.in" style="color: #0284c7;">indiabudget.gov.in</a> | RBI State Finances Study of Budgets (Table IV.3) | <a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a> | NHA Estimates FY 2021-22 | <a href="https://nhsrcindia.org" style="color: #0284c7;">nhsrcindia.org</a>.
    </div>
</div>

<!-- PAGE 7: SECTION 2 (CONT) - SPENDING EVOLUTION -->
<div class="pdf-page">
    <h1>2. Macro Financing (Cont.): Central vs State Outlays</h1>

    <h2>2.2 Longitudinal 8-Year Spending Evolution & Centre-State Ratio</h2>
    <p>
        Under the Seventh Schedule of the Constitution of India, "Public health and sanitation; hospitals and dispensaries" is assigned to the <strong>State List (List II, Entry 6)</strong>. Consequently, State Governments bear the primary constitutional burden of financing public healthcare delivery, contributing roughly <strong>78.8% of direct public health expenditure</strong>.
    </p>

    <div class="chart-box">
        <div class="chart-title">Visual 1: Longitudinal 8-Year Public vs Out-of-Pocket Health Spend Evolution</div>
        <div class="chart-meta">Source: National Health Accounts (NHA) Estimates FY15 to FY22 | Ministry of Health & Family Welfare | https://nhsrcindia.org</div>
        
        <div class="bar-group">
            <div class="bar-label"><span>FY 2021-22 (Audited NHA Latest)</span><span>Govt: 1.84% GDP | OOPE: 39.4% THE</span></div>
            <div class="bar-track"><div class="bar-fill-emerald" style="width: 48%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>FY 2019-20 (Pre-Pandemic Baseline)</span><span>Govt: 1.35% GDP | OOPE: 47.1% THE</span></div>
            <div class="bar-track"><div class="bar-fill-blue" style="width: 38%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>FY 2017-18</span><span>Govt: 1.28% GDP | OOPE: 48.8% THE</span></div>
            <div class="bar-track"><div class="bar-fill-indigo" style="width: 35%;"></div></div>
        </div>
        <div class="bar-group">
            <div class="bar-label"><span>FY 2014-15 (National Health Policy Baseline)</span><span>Govt: 1.13% GDP | OOPE: 62.6% THE</span></div>
            <div class="bar-track"><div class="bar-fill-amber" style="width: 30%;"></div></div>
        </div>
    </div>

    <h3>Constitutional Division of Healthcare Outlays (FY 2024-25 BE)</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 30%;">Financing Dimension</th>
            <th style="width: 35%;">Union Government Outlays</th>
            <th style="width: 35%;">State & UT Government Outlays</th>
        </tr>
        <tr>
            <td><strong>Direct Health Budget Outlay</strong></td>
            <td>₹94,671.12 Cr (21.2% of total)</td>
            <td>₹3,51,184.30 Cr (78.8% of total)</td>
        </tr>
        <tr>
            <td><strong>Primary Spending Responsibilities</strong></td>
            <td>National digital health stack (ABDM), AIIMS apex institutes, central drug regulation, CSS grant transfers.</td>
            <td>Primary Health Centres (PHCs), District Hospitals, healthcare worker payroll, state medical colleges.</td>
        </tr>
        <tr>
            <td><strong>Centrally Sponsored Matching Ratio</strong></td>
            <td>National Health Mission (60% Centre), PM-JAY (60% Centre), PM-ABHIM infrastructure (60% Centre).</td>
            <td>States provide 40% matching share (10% for Special Category/Himalayan/North Eastern States).</td>
        </tr>
        <tr>
            <td><strong>15th Finance Commission Health Grants</strong></td>
            <td>Transfers ₹70,051 Cr untied grants directly to rural and urban local bodies through state treasuries.</td>
            <td>Allocated for diagnostic infrastructure at sub-centres and Ayushman Arogya Mandirs (AAMs).</td>
        </tr>
    </table>

    <div class="callout" style="margin-top: 8px;">
        <h4 style="margin: 0 0 2px 0; color: #0369a1; font-size: 8.8pt;">Strategic Federalism Insight</h4>
        <span style="font-size: 8.2pt; color: #334155;">
            While central schemes establish standards and partial funding, frontline delivery is executed entirely by State Health Departments. HealthSync's architecture is explicitly dual-compatible: it delivers real-time compliance data to Central ABDM gateways while solving clinical consultation time poverty for State-employed medical officers.
        </span>
    </div>

    <div class="source-box">
        <strong>Primary Legal & Fiscal Citations:</strong> Constitution of India (Seventh Schedule, State List Entry 6); Report of the 15th Finance Commission for 2021-26 | <a href="https://fincomindia.nic.in" style="color: #0284c7;">fincomindia.nic.in</a>; RBI State Finances 2024-25.
    </div>
</div>
`;
};
