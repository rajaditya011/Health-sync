// Pages 1 to 3: Cover Page and Table of Contents (Part 1 and Part 2)
// Fully Audited per Government Standards: 2026 Planning Baseline, Neutral Positioning, Exact Page Mapping.

module.exports = function getCoverAndToc() {
    return `
<!-- PAGE 1: COVER PAGE -->
<div class="pdf-page" style="display: flex; flex-direction: column; justify-content: space-between; padding: 18mm 14mm 14mm 14mm; border: 1px solid #cbd5e1; border-top: 8px solid #0f172a; border-radius: 4px; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 30px;">
            <div style="font-size: 18pt; font-weight: 800; letter-spacing: -0.03em; color: #0f172a;">
                Health<span style="color: #0284c7;">Sync</span>
            </div>
            <div style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 4px 12px; border-radius: 4px; font-size: 8pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                COLLABORATION PROPOSAL — 2026 CONSULTATION DRAFT
            </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 20px;">
            <h1 style="font-size: 30pt; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; border: none; padding: 0; letter-spacing: -0.03em;">
                HEALTH<span style="color: #0284c7;">SYNC</span>
            </h1>
            <h2 style="font-size: 14pt; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px 0; border: none; padding: 0;">
                Government Healthcare Policy & Collaboration Proposal
            </h2>
            <h3 style="font-size: 18pt; line-height: 1.25; font-weight: 700; color: #1e293b; margin: 0 0 12px 0; border: none; padding: 0;">
                India Healthcare Funding, Expenditure & Digital Health Opportunity Report
            </h3>
            <div style="display: inline-block; background: #0284c7; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 8.5pt; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;">
                Prepared for Government Consultation
            </div>
            <div style="font-size: 11pt; color: #475569; font-weight: 500; line-height: 1.4;">
                A Data-Driven Public Healthcare Expenditure Audit of All 36 States & UTs, Systemic Delivery Gap Analysis, and Point-of-Care Clinical AI Implementation Blueprint
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin: 20px 0; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px;">
            <div>
                <div style="font-size: 8.5pt; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Prepared for Institutional Consultation</div>
                <div style="font-size: 9.2pt; font-weight: 600; color: #0f172a; line-height: 1.45;">
                    Ministry of Health & Family Welfare (MoHFW)<br>
                    National Health Authority (NHA)<br>
                    NITI Aayog (Health & Aspirational Districts Division)<br>
                    State Health Departments & Mission Directors (NHM)
                </div>
            </div>
            <div>
                <div style="font-size: 8.5pt; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Primary Analytical Focus Areas</div>
                <div style="font-size: 9.2pt; font-weight: 600; color: #0f172a; line-height: 1.45;">
                    ₹4.45L–₹4.95L Cr Public Health Financing Architecture<br>
                    All 36 States & UTs Audited Expenditure & Variances<br>
                    Bedside Clinical AI & Regional Ambient Voice Scribing<br>
                    12-Month Sandbox Proposal across 2 Aspirational Districts
                </div>
            </div>
        </div>
    </div>

    <div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 8.2pt; color: #64748b;">
            <div>
                <div><strong>Evidence Baseline:</strong> Union Budgets (FY24–27) | RBI State Finances 2024–26 | NHA FY22 | CAG PM-JAY Audit</div>
                <div><strong>Authoring Entity:</strong> HealthSync Public Health Systems & Strategic Policy Group</div>
                <div><strong>Document Classification:</strong> Consultation Draft — Prepared by HealthSync for Institutional Review</div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: 700; color: #0f172a; font-size: 8.8pt;">Prepared for Government Consultation</div>
                <div>Publication Date: 2026 Planning Baseline</div>
            </div>
        </div>
    </div>
</div>

<!-- PAGE 2: TABLE OF CONTENTS (PART 1) -->
<div class="pdf-page">
    <h1>Table of Contents & Research Directory</h1>
    <p style="color: #64748b; font-size: 8.8pt; margin-bottom: 10px;">
        Directory of verified official public healthcare expenditures, state-by-state audits, systemic delivery bottlenecks, and policy proposals.
    </p>

    <div style="background: #0f172a; color: #ffffff; padding: 6px 10px; border-radius: 4px 4px 0 0; font-size: 8.5pt; font-weight: 700; display: flex; justify-content: space-between;">
        <span style="width: 8%;">#</span>
        <span style="width: 44%;">Research & Policy Chapter Title</span>
        <span style="width: 36%;">Core Analytical Scope & Thematic Focus</span>
        <span style="width: 12%; text-align: right;">Page</span>
    </div>

    <table style="margin-top: 0; font-size: 8.1pt;">
        <tr>
            <td style="width: 8%; font-weight: 700;">1.</td>
            <td style="width: 44%; font-weight: 600; color: #0f172a;">Executive Summary: 10 Questions for Leadership</td>
            <td style="width: 36%; color: #475569;">10 Core Executive Answers, Macro Health Spend & OOPE Crisis</td>
            <td style="width: 12%; text-align: right; font-weight: 700; color: #0284c7;">Page 4</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">1.2</td>
            <td style="font-weight: 600; color: #0f172a;">Executive Summary (Cont.): Operational Positioning</td>
            <td style="color: #475569;">The Last-Mile Paradox, 98s OPDs & Strict Fact vs Model Framework</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 5</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">2.</td>
            <td style="font-weight: 600; color: #0f172a;">Consolidated India Healthcare Financing Architecture</td>
            <td style="color: #475569;">Macro Financing Matrix: BE vs RE vs AE (Union & State Accounts)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 6</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">2.2</td>
            <td style="font-weight: 600; color: #0f172a;">Macro Financing (Cont.): Central vs State Outlays</td>
            <td style="color: #475569;">Longitudinal 8-Year Evolution, Centre-State Split & 15th FC Grants</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 7</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">3.1</td>
            <td style="font-weight: 600; color: #0f172a;">Master State Table — Part 1: Northern & Western States</td>
            <td style="color: #475569;">Audited 9-Column Dataset: Andhra Pradesh, Arunachal, Assam, Bihar, CG, Goa</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 8</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">3.2</td>
            <td style="font-weight: 600; color: #0f172a;">Master State Table — Part 2: Western & Central States</td>
            <td style="color: #475569;">Audited 9-Column Dataset: Gujarat, Haryana, HP, Jharkhand, Karnataka, Kerala</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 9</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">3.3</td>
            <td style="font-weight: 600; color: #0f172a;">Master State Table — Part 3: Southern & Central States</td>
            <td style="color: #475569;">Audited 9-Column Dataset: MP, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 10</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">3.4</td>
            <td style="font-weight: 600; color: #0f172a;">Master State Table — Part 4: Eastern & North-Eastern States</td>
            <td style="color: #475569;">Audited 9-Column Dataset: Odisha, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 11</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">3.5</td>
            <td style="font-weight: 600; color: #0f172a;">Master State Table — Part 5: Northern & Southern States</td>
            <td style="color: #475569;">Audited 9-Column Dataset: Tripura, UP, Uttarakhand, WB, A&N, Chandigarh</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 12</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">3.6</td>
            <td style="font-weight: 600; color: #0f172a;">Master State Table — Part 6: Union Territories</td>
            <td style="color: #475569;">Audited 9-Column Dataset: DNH&DD, Delhi (NCT), J&K, Ladakh, Lakshadweep, Puducherry</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 13</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">4.1</td>
            <td style="font-weight: 600; color: #0f172a;">State Strategic Archetypes — Archetype 1: High-Volume Core</td>
            <td style="color: #475569;">Deep-Dive Profile: Uttar Pradesh & Bihar (High Density, Clinician Void)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 14</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">4.2</td>
            <td style="font-weight: 600; color: #0f172a;">State Strategic Archetypes — Archetype 2: Digital Adopters</td>
            <td style="color: #475569;">Deep-Dive Profile: Kerala & Tamil Nadu (Advanced NCD Infrastructure)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 15</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">4.3</td>
            <td style="font-weight: 600; color: #0f172a;">State Strategic Archetypes — Archetype 3: Mountain Terrains</td>
            <td style="color: #475569;">Deep-Dive Profile: Uttarakhand & Himachal Pradesh (Terrain Isolation)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 16</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">4.4</td>
            <td style="font-weight: 600; color: #0f172a;">State Strategic Archetypes — Archetype 4: High-Density Urban</td>
            <td style="color: #475569;">Deep-Dive Profile: Delhi (NCT) & Maharashtra (Tertiary Inflow)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 17</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">4.5</td>
            <td style="font-weight: 600; color: #0f172a;">State Strategic Archetypes — Archetype 5: Tribal & Vulnerable</td>
            <td style="color: #475569;">Deep-Dive Profile: Chhattisgarh, Odisha & Assam (Endemic Belts)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 18</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">5.1</td>
            <td style="font-weight: 600; color: #0f172a;">HealthSync Synthesis of Public Health Spending</td>
            <td style="color: #475569;">Analytical Harmonization: Tertiary, Primary, Payroll, Drugs & PM-JAY</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 19</td>
        </tr>
        <tr>
            <td style="font-weight: 700;">5.2</td>
            <td style="font-weight: 600; color: #0f172a;">Spending Breakdown (Cont.): Statutory CAG Audits</td>
            <td style="color: #475569;">CAG Report No. 11/2023 on PM-JAY & Report No. 23/2017 on NHM</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7;">Page 20</td>
        </tr>
    </table>
</div>

<!-- PAGE 3: TABLE OF CONTENTS (PART 2) -->
<div class="pdf-page">
    <h1>Table of Contents & Research Directory (Cont.)</h1>
    <p style="color: #64748b; font-size: 8.8pt; margin-bottom: 10px;">
        Continuation of research directory: Delivery gaps, sovereign ecosystem mapping, RoI models, pilot blueprint, and 3-tier citations.
    </p>

    <div style="background: #0f172a; color: #ffffff; padding: 6px 10px; border-radius: 4px 4px 0 0; font-size: 8.5pt; font-weight: 700; display: flex; justify-content: space-between;">
        <span style="width: 8%;">#</span>
        <span style="width: 44%;">Research & Policy Chapter Title</span>
        <span style="width: 36%;">Core Analytical Scope & Thematic Focus</span>
        <span style="width: 12%; text-align: right;">Page</span>
    </div>

    <table style="margin-top: 0; font-size: 7.6pt; line-height: 1.2;">
        <tr>
            <td style="width: 8%; font-weight: 700; padding: 2px 4px;">6.1</td>
            <td style="width: 44%; font-weight: 600; color: #0f172a; padding: 2px 4px;">Systemic Healthcare Delivery Gaps (Gaps 1 & 2)</td>
            <td style="width: 36%; color: #475569; padding: 2px 4px;">OPD Consultation Compression & Retail Generic Drug Substitution Leakage</td>
            <td style="width: 12%; text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 21</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">6.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Systemic Healthcare Delivery Gaps (Gaps 3, 4 & 5)</td>
            <td style="color: #475569; padding: 2px 4px;">Post-Surgical Readmission Abyss, Data Void & AYUSH Dual Care Divide</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 22</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">7.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Ecosystem Mapping: Sovereign Platforms Matrix</td>
            <td style="color: #475569; padding: 2px 4px;">ABDM (72+ Cr ABHA), eSanjeevani, PM-JAY TMS, AAMs, e-RaktKosh vs HealthSync</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 23</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">7.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Ecosystem Mapping (Cont.): Technical Integration</td>
            <td style="color: #475569; padding: 2px 4px;">HL7 FHIR R4 Bundles, ABDM Gateway M1/M2/M3 & PMBI Drug Master APIs</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 24</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">8.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">HealthSync Value Proposition & Clinical Efficacy</td>
            <td style="color: #475569; padding: 2px 4px;">Point-of-Care Triage, Doctor Efficiency & Red-Flag Clinical Safety Alerts</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 25</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">8.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Value Proposition (Cont.): Economic RoI & Savings</td>
            <td style="color: #475569; padding: 2px 4px;">Full Econometric Model: ₹3,200 Cr National Readmission Model & RoI Sensitivity</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 26</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">9.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">WHAT HEALTHSYNC IS ASKING THE GOVERNMENT FOR</td>
            <td style="color: #475569; padding: 2px 4px;">Primary Ask (12-Mo Sandbox, ₹1.45 Cr NHM Route) & 5 Secondary Asks</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 27</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">9.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">The Government Ask (Cont.): Mutual Commitments</td>
            <td style="color: #475569; padding: 2px 4px;">Government Provides / HealthSync Commits Table & NHM Pool Legal Audit</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 28</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">10.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Policy Analysis: Mandatory Implementation Feasibility</td>
            <td style="color: #475569; padding: 2px 4px;">Option A (Mandatory HealthSync — Infeasible) vs. Option B & Option C</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 29</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">10.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Policy Analysis (Cont.): DPDP Act 2023 & DPDP Rules 2025</td>
            <td style="color: #475569; padding: 2px 4px;">Compliance Architecture, Phased Implementation Timelines & Open Standards</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 30</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">11.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Recommended 12-Month Pilot (Project Aarogya Setu-Plus)</td>
            <td style="color: #475569; padding: 2px 4px;">Chandauli (UP) & Tehri Garhwal (UK) — 82 Facilities & 6.5 Lakh Population</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 31</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">11.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Recommended Pilot (Cont.): Itemized Budget & Evaluation</td>
            <td style="color: #475569; padding: 2px 4px;">Verified 8-Component Cost Table (₹145 Lakh) & Independent Academic Audit</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 32</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">12.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Five-Year National Scale-Up Roadmap (Phases 1 to 5)</td>
            <td style="color: #475569; padding: 2px 4px;">Pilot Sandbox → 100 Districts → 5 States → 15 States → Sovereign National Stack</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 33</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">13.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">One-Page Executive Decision Brief for Senior Leadership</td>
            <td style="color: #475569; padding: 2px 4px;">Consultation Memorandum for Cabinet Secretary & State Health Ministers</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 34</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">14.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">THE HEALTHSYNC GOVERNMENT PROPOSAL (Pillars 1 to 5)</td>
            <td style="color: #475569; padding: 2px 4px;">Culmination Section: Problem, Evidence, Sovereign Stack, Edge & Ask</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 35</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">14.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">THE HEALTHSYNC GOVERNMENT PROPOSAL (Pillars 6 to 9)</td>
            <td style="color: #475569; padding: 2px 4px;">What We Ask • What We Commit • What Govt Gets (1-Minute Summary Box)</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 36</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">15.1</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Comprehensive Statutory Sources Appendix (Tier 1 Sources)</td>
            <td style="color: #475569; padding: 2px 4px;">Primary Official Government Acts, Union Budgets, RBI Reports & CAG Audits</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 37</td>
        </tr>
        <tr>
            <td style="font-weight: 700; padding: 2px 4px;">15.2</td>
            <td style="font-weight: 600; color: #0f172a; padding: 2px 4px;">Comprehensive Statutory Sources Appendix (Tier 2 & 3 Sources)</td>
            <td style="color: #475569; padding: 2px 4px;">Institutional Standards, Lancet/ICMR Studies, ABDM & Direct URLs</td>
            <td style="text-align: right; font-weight: 700; color: #0284c7; padding: 2px 4px;">Page 38</td>
        </tr>
    </table>

    <div class="callout" style="margin-top: 5px; padding: 4px 8px; font-size: 7.4pt; line-height: 1.3;">
        <h4 style="margin: 0 0 1px 0; color: #0369a1; font-size: 8pt;">Methodological Note on Evidence Classification</h4>
        Throughout this document, a strict evidentiary distinction is maintained between: (1) <strong>Verified Historical Facts</strong> (audited government budgets, CAG reports, Lancet studies); (2) <strong>Pilot Targets</strong> (operational goals for the 12-month trial); (3) <strong>Modelled Projections</strong> (macroeconomic simulations under explicit assumptions); and (4) <strong>Hypotheses Requiring Validation</strong> (clinical and operational propositions subject to independent academic evaluation).
    </div>
</div>
`;
};
