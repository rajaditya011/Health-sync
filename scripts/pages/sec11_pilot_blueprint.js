// Pages 31 and 32: Section 11 — Recommended 12-Month Government Pilot Blueprint ("Project Aarogya Setu-Plus")
// Audited per Government Standards: Full Component Cost Table (₹145 Lakh) & Neutral Evaluation Positioning.

module.exports = function getSection11() {
    return `
<!-- PAGE 31: SECTION 11 - RECOMMENDED PILOT -->
<div class="pdf-page">
    <h1>11. Recommended 12-Month Pilot (Project Aarogya Setu-Plus)</h1>

    <h2>11.1 District Demographics & Facility Tiering Selection</h2>
    <p>
        To demonstrate generalizability across diverse geographical and infrastructural terrains, the 12-Month Pilot is proposed across two designated Aspirational Districts representing contrasting operating environments:
    </p>

    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 25%;">Analytical Dimension</th>
            <th style="width: 37%;">District 1: Chandauli (Uttar Pradesh)</th>
            <th style="width: 38%;">District 2: Tehri Garhwal (Uttarakhand)</th>
        </tr>
        <tr>
            <td><strong>Geographical Archetype</strong></td>
            <td>High-Density Indo-Gangetic Plain; Agrarian Core.</td>
            <td>High-Altitude Himalayan Mountain Terrain.</td>
        </tr>
        <tr>
            <td><strong>Total Population Covered</strong></td>
            <td>21.5 Lakh district total (Pilot Sample: 4.2 Lakh).</td>
            <td>6.2 Lakh district total (Pilot Sample: 2.3 Lakh).</td>
        </tr>
        <tr>
            <td><strong>Participating Facilities (82 Total)</strong></td>
            <td>48 Units (1 DH, 4 CHCs, 15 PHCs, 28 AAMs).</td>
            <td>34 Units (1 DH, 3 CHCs, 10 PHCs, 20 AAMs).</td>
        </tr>
        <tr>
            <td><strong>Daily Public OPD Volume</strong></td>
            <td>6,200 to 8,500 daily consultations.</td>
            <td>1,400 to 2,100 daily consultations.</td>
        </tr>
        <tr>
            <td><strong>Primary Delivery Friction</strong></td>
            <td>Severe OPD crowding; 90-sec doctor consultations.</td>
            <td>Terrain isolation; 6-hour travel for diagnostic follow-up.</td>
        </tr>
        <tr>
            <td><strong>Telecom Infrastructure</strong></td>
            <td>Consistent 4G/5G mobile connectivity.</td>
            <td>Frequent broadband blackouts; offline operation vital.</td>
        </tr>
    </table>

    <h3>Facility-Level Tiered Deployment Architecture</h3>
    <p>
        The pilot establishes a unified referral continuum across all five tiers of the public health infrastructure:
    </p>
    <ul>
        <li><strong>Tier 1: Ayushman Arogya Mandirs (48 AAMs):</strong> ASHA tablet companions with multi-lingual audio intake and high-risk maternal/NCD screening cards.</li>
        <li><strong>Tier 2: Primary Health Centres (25 PHCs):</strong> Entrance triage stations and offline-capable diagnostic vitals logging.</li>
        <li><strong>Tier 3: Community Health Centres (7 CHCs):</strong> Automated Entrance MediKiosks, doctor ambient voice scribing, and PMBJP generic drug mapping.</li>
        <li><strong>Tier 4: District Hospitals (2 DHs):</strong> Dual high-capacity MediKiosks, multi-specialty voice scribing, and surgical Recovery Circles command desks.</li>
    </ul>

    <div class="source-box">
        <strong>Baseline Sources:</strong> NITI Aayog Aspirational Districts Baseline Indicators | <a href="https://www.niti.gov.in" style="color: #0284c7;">niti.gov.in</a> | Census of India | MoHFW RHS 2022-23.
    </div>
</div>

<!-- PAGE 32: SECTION 11 (CONT) - PILOT OPERATIONS -->
<div class="pdf-page">
    <h1>11. Recommended Pilot (Cont.): Operations & Budget</h1>

    <h2>11.2 Detailed Component Cost Table & Budget Breakdown</h2>
    <p>
        The total funding requested for the 12-month pilot is <strong>₹1.45 Crore (₹145 Lakh)</strong>, funded through the untied NHM Innovation & Flexible Pool. The detailed itemized budget is structured below:
    </p>

    <table style="font-size: 8.2pt;">
        <thead>
            <tr>
                <th style="width: 26%;">Component Head</th>
                <th style="width: 14%;">Quantity</th>
                <th style="width: 16%;">Unit Cost</th>
                <th style="width: 14%;">Total Cost</th>
                <th style="width: 30%;">Cost Assumption Basis / Benchmark</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Entrance MediKiosks</strong></td>
                <td>15 Units</td>
                <td>₹1,75,000</td>
                <td>₹26.25 Lakh</td>
                <td>Vendor commercial quote (21.5" touch, IP54 chassis, printer).</td>
            </tr>
            <tr>
                <td><strong>Diagnostic Vitals Sensors</strong></td>
                <td>15 Sets</td>
                <td>₹45,000</td>
                <td>₹6.75 Lakh</td>
                <td>OEM quote for medical-grade NIBP, SpO2, temp sensors.</td>
            </tr>
            <tr>
                <td><strong>Doctor Ambient AI Licenses</strong></td>
                <td>120 Doctors</td>
                <td>₹1,500 / mo</td>
                <td>₹21.60 Lakh</td>
                <td>HealthSync estimate (Cloud speech compute & GPU hosting).</td>
            </tr>
            <tr>
                <td><strong>ASHA Tablet Integrations</strong></td>
                <td>450 ASHAs</td>
                <td>₹2,000 / unit</td>
                <td>₹9.00 Lakh</td>
                <td>HealthSync estimate for app provisioning & offline DB setup.</td>
            </tr>
            <tr>
                <td><strong>Staff & Clinician Training</strong></td>
                <td>570 Personnel</td>
                <td>₹3,200 / person</td>
                <td>₹18.40 Lakh</td>
                <td>Official NHM standard capacity building norms.</td>
            </tr>
            <tr>
                <td><strong>Cloud Infra & ABDM Gateway</strong></td>
                <td>12 Months</td>
                <td>₹1,16,667 / mo</td>
                <td>₹14.00 Lakh</td>
                <td>MeitY-empanelled cloud hosting benchmark (secure VPC).</td>
            </tr>
            <tr>
                <td><strong>Independent Academic Clinical Audit</strong></td>
                <td>1 Study</td>
                <td>₹35,00,000</td>
                <td>₹35.00 Lakh</td>
                <td>Academic research grant benchmark (ethics, cameras, data audit).</td>
            </tr>
            <tr>
                <td><strong>Field Operations & Management</strong></td>
                <td>2 Engineers</td>
                <td>₹7,00,000 / yr</td>
                <td>₹14.00 Lakh</td>
                <td>Technical staffing benchmark (on-ground district support).</td>
            </tr>
            <tr style="background: #f1f5f9; font-weight: 700;">
                <td colspan="3" style="text-align: right; color: #0f172a;">TOTAL REQUESTED PILOT OUTLAY:</td>
                <td style="color: #0284c7; font-size: 9pt;">₹145.00 Lakh</td>
                <td style="color: #475569; font-size: 7.8pt;">₹1.45 Crore via NHM Innovation Pool</td>
            </tr>
        </tbody>
    </table>

    <h2>11.3 Independent Academic Clinical Evaluation</h2>
    <p>
        To ensure total scientific rigor, HealthSync proposes that the trial be evaluated by an independent academic partner—such as <strong>AIIMS New Delhi</strong> or <strong>PGIMER Chandigarh</strong> (subject to formal institutional engagement and MoA)—evaluating:
    </p>
    <ul>
        <li><strong>Physician Examination Time:</strong> Net physical examination time per patient (measured by time-motion study).</li>
        <li><strong>Generic Prescribing Adherence:</strong> Share of prescriptions written using PMBJP generic names vs. proprietary brands.</li>
        <li><strong>Post-Surgical 30-Day Readmissions:</strong> Reduction in emergency surgical readmissions via Recovery Circles.</li>
        <li><strong>Household Pharmaceutical Spend:</strong> Direct monthly out-of-pocket medication expenditure logged by patients.</li>
    </ul>

    <div class="source-box">
        <strong>Evaluation Standards:</strong> ICMR National Ethical Guidelines | <a href="https://main.icmr.nic.in" style="color: #0284c7;">icmr.nic.in</a> | CONSORT Guidelines for Clinical Trials.
    </div>
</div>
`;
};
