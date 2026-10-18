// Pages 27 and 28: Section 9 — WHAT HEALTHSYNC IS ASKING THE GOVERNMENT FOR
// Audited per Government Standards: Highly Structured Primary & Secondary Asks with 5-Part Logic,
// Formal NHM Innovation Pool Statutory Audit, and Mutual "Government Provides / HealthSync Commits" Table.

module.exports = function getSection9() {
    return `
<!-- PAGE 27: SECTION 9 - WHAT HEALTHSYNC IS ASKING FOR -->
<div class="pdf-page">
    <h1>9. WHAT HEALTHSYNC IS ASKING THE GOVERNMENT FOR</h1>

    <h2>9.1 Primary Ask: 12-Month Controlled Innovation Sandbox</h2>
    <p>
        HealthSync submits a formal collaboration proposal to the Ministry of Health & Family Welfare (MoHFW), NITI Aayog, and the State Health Societies of Uttar Pradesh and Uttarakhand to sanction a <strong>12-Month Controlled Innovation Sandbox</strong> deployed across two contrasting Aspirational Districts to empirically validate point-of-care clinical AI in public healthcare workflows.
    </p>

    <div class="metric-grid">
        <div class="metric-card">
            <div class="metric-val">₹1.45 Cr</div>
            <div class="metric-sub">Funding Requested (Proposed NHM Innovation Pool Route)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">12 Months</div>
            <div class="metric-sub">Controlled Sandbox Duration (Phased Milestones)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">2 Districts</div>
            <div class="metric-sub">Chandauli (UP Plain) & Tehri Garhwal (UK Hill)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">82 Facilities</div>
            <div class="metric-sub">2 DHs, 7 CHCs, 25 PHCs, 48 AAMs (~6.5 Lakh Pop)</div>
        </div>
    </div>

    <h3>Detailed 5-Part Operational Specification of the Primary Ask</h3>
    <table style="font-size: 8.3pt;">
        <tr>
            <th style="width: 24%;">Analytical Dimension</th>
            <th style="width: 76%;">Detailed Operational Specification & Commitments</th>
        </tr>
        <tr>
            <td><strong>1. What HealthSync Needs</strong></td>
            <td>(a) Administrative sanction to deploy software and hardware across 82 designated public facilities; (b) ₹1.45 Crore grant disbursed via State Health Societies; (c) District-level administrative liaison and facility access.</td>
        </tr>
        <tr>
            <td><strong>2. Why It Is Needed</strong></td>
            <td>To test point-of-care clinical AI across two contrasting terrains (high-density agrarian Gangetic plain vs. geographically isolated Himalayan mountain terrain) to validate real-world generalizability and offline functionality.</td>
        </tr>
        <tr>
            <td><strong>3. What HealthSync Will Deliver</strong></td>
            <td>(a) 15 Entrance MediKiosks deployed; (b) 120 doctor ambient voice licenses; (c) 450 ASHA tablet workflows; (d) Full clinical software maintenance, offline caching, and user onboarding.</td>
        </tr>
        <tr>
            <td><strong>4. What the Government Receives</strong></td>
            <td>(a) Operational hardware transferred at zero terminal cost; (b) Comprehensive longitudinal FHIR clinical records linking to citizen ABHA accounts; (c) Audited clinical time savings and generic prescription data.</td>
        </tr>
        <tr>
            <td><strong>5. How Success Is Measured</strong></td>
            <td>Independent third-party clinical evaluation proposed in consultation with <strong>AIIMS New Delhi / PGIMER Chandigarh</strong> (subject to formal institutional engagement) auditing: doctor examination time, generic prescribing rate, and 30-day readmissions.</td>
        </tr>
    </table>

    <div class="callout" style="margin-top: 8px; padding: 6px 10px;">
        <h4 style="margin: 0 0 2px 0; color: #0369a1; font-size: 8.5pt;">Statutory Funding Route Audit: NHM Innovation & Flexible Pool</h4>
        <span style="font-size: 7.8pt; color: #334155; line-height: 1.35;">
            <strong>Proposed funding route, subject to confirmation by the relevant NHM/State Health Society and applicable procurement rules.</strong><br>
            Under the National Health Mission (NHM) financial guidelines, State Health Societies maintain an untied <em>Innovation & Flexible Pool</em> (Part C/Part B) for piloting promising health delivery technologies. Approval requires inclusion in the State Program Implementation Plan (PIP) appraised and approved by the National Program Coordination Committee (NPCC), or sanction by the State Health Society Executive Committee chaired by the Principal Secretary (Health). The requested ₹1.45 Crore represents less than <strong>0.004% of Uttar Pradesh’s annual NHM allocation</strong>.
        </span>
    </div>

    <div class="source-box" style="margin-top: 4px; font-size: 7.5pt;">
        <strong>Statutory Guidance:</strong> NHM Implementation Framework Clause 4.3 (<a href="https://nhm.gov.in" style="color: #0284c7;">nhm.gov.in</a>) | NITI Aayog Aspirational Districts Program Guidelines (<a href="https://www.niti.gov.in" style="color: #0284c7;">niti.gov.in</a>).
    </div>
</div>

<!-- PAGE 28: SECTION 9 (CONT) - SECONDARY ASKS & MUTUAL COMMITMENTS -->
<div class="pdf-page">
    <h1>9. WHAT HEALTHSYNC IS ASKING FOR (Cont.)</h1>

    <h2>9.2 Secondary Technical & Policy Enablers (5-Part Logic)</h2>
    <table style="font-size: 8pt; margin-bottom: 8px;">
        <tr>
            <th style="width: 18%;">Secondary Ask</th>
            <th style="width: 20%;">What HealthSync Needs</th>
            <th style="width: 20%;">Why It Is Needed</th>
            <th style="width: 20%;">What HealthSync Delivers</th>
            <th style="width: 22%;">What Government Receives</th>
        </tr>
        <tr>
            <td><strong>1. ABDM Sandbox Integration</strong></td>
            <td>Fast-track M1, M2, M3 API gateway certification.</td>
            <td>Ensures ambient notes and vitals flow into citizen ABHA records.</td>
            <td>Certified HL7 FHIR R4 push and pull integration.</td>
            <td>Structured clinical encounters populating national health registries.</td>
        </tr>
        <tr>
            <td><strong>2. PMBI Master Drug API Access</strong></td>
            <td>Read-access to Central PMBJP Generic Drug Registry API.</td>
            <td>Enables real-time molecular matching and pricing display.</td>
            <td>Automated molecular brand-to-generic substitution switch.</td>
            <td>Increased Jan Aushadhi generic uptake; lower public drug budget.</td>
        </tr>
        <tr>
            <td><strong>3. GeM SaaS Listing Pathway</strong></td>
            <td>Standardized product category on GeM under GFR Rule 149.</td>
            <td>Allows transparent, rate-contract procurement post-pilot.</td>
            <td>Transparent, competitive volume-tiered pricing.</td>
            <td>Standardized procurement pricing without single-vendor lock-in.</td>
        </tr>
        <tr>
            <td><strong>4. Technical Consultation Desk</strong></td>
            <td>Quarterly technical reviews with NHA & MoHFW digital teams.</td>
            <td>Aligns speech AI vocabularies with national FHIR profiles.</td>
            <td>Field-tested speech models in rural dialects (Bhojpuri, Garhwali).</td>
            <td>Sovereign clinical vocabulary enhancements for regional languages.</td>
        </tr>
        <tr>
            <td><strong>5. Institutional Oversight</strong></td>
            <td>Joint steering committee chaired by State Mission Directors (NHM).</td>
            <td>Ensures cross-tier administrative alignment across 82 units.</td>
            <td>Weekly transparent KPI reporting and clinical audit access.</td>
            <td>Executive oversight and evidence-based performance tracking.</td>
        </tr>
    </table>

    <h2>9.3 Mutual Partnership Matrix: "Government Provides / HealthSync Commits"</h2>
    <table style="font-size: 8pt; margin-bottom: 8px;">
        <thead>
            <tr style="background: #0f172a; color: white;">
                <th style="width: 50%; color: white;">What the Government Provides</th>
                <th style="width: 50%; color: white;">What HealthSync Commits to Deliver</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Pilot Funding:</strong> ₹1.45 Cr via NHM Innovation Pool (subject to confirmation).</td>
                <td><strong>Deployment:</strong> Full hardware installation & software provisioning in 82 units.</td>
            </tr>
            <tr>
                <td><strong>Facility Access:</strong> Physical clearance across 2 DHs, 7 CHCs, 25 PHCs, 48 AAMs.</td>
                <td><strong>Training:</strong> Comprehensive training of 120 doctors, 450 ASHAs, and 570 staff.</td>
            </tr>
            <tr>
                <td><strong>Integration Access:</strong> ABDM sandbox access and PMBI generic drug master APIs.</td>
                <td><strong>ABDM Interoperability:</strong> 100% open HL7 FHIR R4 compliance and zero lock-in.</td>
            </tr>
            <tr>
                <td><strong>Government Oversight:</strong> Joint MoHFW, NHA, and State SHS steering committee.</td>
                <td><strong>KPI Reporting:</strong> Weekly transparent dashboard metrics and milestone compliance.</td>
            </tr>
            <tr>
                <td><strong>Evaluation Access:</strong> Permission for independent academic researchers.</td>
                <td><strong>Data Protection:</strong> Total DPDP Act 2023 & DPDP Rules 2025 compliance.</td>
            </tr>
            <tr>
                <td><strong>Procurement Pathway:</strong> Structured onboarding under GeM SaaS standards.</td>
                <td><strong>Transparent Pricing:</strong> Open, volume-tiered pricing with public-good transition.</td>
            </tr>
            <tr>
                <td><strong>District Support:</strong> Designation of district health nodal officers for coordination.</td>
                <td><strong>Independent Evaluation:</strong> Full facilitation of third-party clinical audit.</td>
            </tr>
        </tbody>
    </table>

    <div class="source-box" style="font-size: 7.5pt;">
        <strong>Statutory Citations:</strong> Rule 149, General Financial Rules 2017 (<a href="https://gem.gov.in" style="color: #0284c7;">gem.gov.in</a>) | National Health Data Management Policy (<a href="https://abdm.gov.in" style="color: #0284c7;">abdm.gov.in</a>).
    </div>
</div>
`;
};
