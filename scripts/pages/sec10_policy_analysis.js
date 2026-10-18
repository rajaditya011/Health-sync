// Pages 29 and 30: Section 10 — Policy Analysis: Mandatory Implementation Feasibility
// Audited per Government Standards: GFR Anti-Monopoly Analysis, Three Policy Pathways,
// and Comprehensive DPDP Act 2023 & DPDP Rules 2025 Phased Compliance Architecture.

module.exports = function getSection10() {
    return `
<!-- PAGE 29: SECTION 10 - MANDATORY ANALYSIS -->
<div class="pdf-page">
    <h1>10. Policy Analysis: Mandatory Implementation Feasibility</h1>

    <h2>10.1 Constitutional & Procurement Analysis: Three Policy Pathways</h2>
    <p>
        A central question for healthcare leadership is whether digital health software should be made <strong>mandatory</strong> by central or state administrative orders. A rigorous statutory analysis evaluates three distinct policy alternatives:
    </p>

    <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #ef4444; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px;">
        <h4 style="margin: 0 0 2px 0; color: #991b1b; font-size: 8.8pt;">Option A: Mandate HealthSync Itself (Legally Infeasible & Not Recommended)</h4>
        <span style="font-size: 7.9pt; color: #7f1d1d; line-height: 1.35;">
            <strong>Procurement & Legal Concerns:</strong> A procurement specification that unnecessarily locks public procurement into a single proprietary vendor could raise competition, transparency, and procurement-law concerns under Rule 144 of the General Financial Rules (GFR 2017) and Article 19(1)(g) of the Constitution (freedom of medical practice). Mandating a single commercial product would also fail the Supreme Court's proportionality test in <em>K.S. Puttaswamy (2017)</em>. Formal legal advice should be obtained before proposing any mandatory procurement policy. HealthSync explicitly rejects Option A.
        </span>
    </div>

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px;">
        <h4 style="margin: 0 0 2px 0; color: #166534; font-size: 8.8pt;">Option B: Mandate Open Healthcare Capabilities & Standards (Legally Sound & Recommended)</h4>
        <span style="font-size: 7.9pt; color: #14532d; line-height: 1.35;">
            <strong>Statutory Validity:</strong> Legally defensible, constitutionally sound, and strongly recommended.<br>
            <strong>What CAN and SHOULD Be Mandated:</strong> The Government of India and State Health Departments maintain statutory authority under the National Health Mission and Clinical Establishments Act to mandate <em>open technical capabilities</em> across public and empanelled private facilities:
            <ul style="margin: 2px 0 0 16px; padding: 0;">
                <li>Mandatory generation and linkage of ABHA IDs for all patient outpatient registrations.</li>
                <li>Mandatory transmission of discharge summaries and diagnostic reports using standardized <strong>HL7 FHIR R4</strong> profiles.</li>
                <li>Mandatory default display of PMBJP unbranded generic chemical equivalents in all hospital prescription software.</li>
                <li>Mandatory digital consent architecture aligned with DPDP frameworks prior to clinical record sharing.</li>
            </ul>
        </span>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; border-radius: 6px; padding: 8px 12px;">
        <h4 style="margin: 0 0 2px 0; color: #1e40af; font-size: 8.8pt;">Option C: Government-Supported Competitive Implementation (HealthSync Proposed Path)</h4>
        <span style="font-size: 7.9pt; color: #1e3a8a; line-height: 1.35;">
            <strong>Operational Pathway:</strong> The optimal model for transparent public-private collaboration.<br>
            <strong>Mechanism:</strong> HealthSync participates through competitive empanelment on the Government e-Marketplace (GeM) under Rule 149 of GFR 2017. State Health Societies retain full discretion to procure HealthSync or competing compliant solutions based on clinician satisfaction, local dialect accuracy, and transparent pricing benchmarks, preventing proprietary lock-in.
        </span>
    </div>

    <div class="source-box" style="margin-top: 6px; font-size: 7.5pt;">
        <strong>Legal Citations:</strong> Constitution of India (Articles 19 & 21) | Rule 144, General Financial Rules 2017 (<a href="https://doe.gov.in" style="color: #0284c7;">doe.gov.in</a>) | K.S. Puttaswamy v. Union of India (2017) 10 SCC 1.
    </div>
</div>

<!-- PAGE 30: SECTION 10 (CONT) - DPDP ACT 2023 & DPDP RULES 2025 -->
<div class="pdf-page">
    <h1>10. Policy Analysis (Cont.): DPDP Act 2023 & DPDP Rules 2025</h1>

    <h2>10.2 Statutory Privacy Governance: DPDP Act 2023 & DPDP Rules 2025</h2>
    <p style="font-size: 8.5pt; color: #334155; margin-bottom: 6px;">
        The handling of citizen health information in public facilities is governed by the <em>Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)</em> and the applicable commencement frameworks under the <em>Digital Personal Data Protection Rules, 2025</em>. <strong>HealthSync should be designed and operated to comply with applicable DPDP Act 2023 and DPDP Rules 2025 requirements:</strong>
    </p>

    <table style="font-size: 7.9pt; margin-bottom: 8px;">
        <thead>
            <tr>
                <th style="width: 22%;">Regulatory Dimension</th>
                <th style="width: 38%;">Statutory Requirement (Act 2023 & Rules 2025)</th>
                <th style="width: 40%;">HealthSync Architecture & Implementation Safeguards</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Consent & Regional Notice</strong></td>
                <td>Free, specific, informed, unconditional consent accompanied by clear notice in English and 22 Eighth Schedule languages.</td>
                <td>Audio-visual consent prompts on MediKiosks and mobile screens explaining data use in local dialects before intake.</td>
            </tr>
            <tr>
                <td><strong>Data Fiduciary Obligations</strong></td>
                <td>Duty to implement reasonable technical security safeguards and prevent personal data breaches under Section 8.</td>
                <td>End-to-end AES-256 encryption at rest; TLS 1.3 in transit; on-premise edge processing of ambient speech models.</td>
            </tr>
            <tr>
                <td><strong>Data Retention & Purpose Limitation</strong></td>
                <td>Personal data must be erased as soon as the specified purpose is fulfilled or consent is withdrawn.</td>
                <td>Raw audio streams are wiped immediately following clinical note synthesis; zero persistent audio storage.</td>
            </tr>
            <tr>
                <td><strong>Children's Personal Data</strong></td>
                <td>Mandatory verifiable parental consent before processing data of minors (under 18 years) under Section 9.</td>
                <td>Parent/guardian biometric or OTP-based authorization gate embedded into all pediatric OPD pre-intake screens.</td>
            </tr>
            <tr>
                <td><strong>Data Breach Notification</strong></td>
                <td>Mandatory intimate notification to Data Protection Board of India (DPBI) and affected Data Principals upon breach.</td>
                <td>Automated intrusion-detection logging with immediate incident escalation protocols aligned with CERT-In and DPBI rules.</td>
            </tr>
            <tr>
                <td><strong>Phased Implementation Timelines</strong></td>
                <td>Rules 2025 outline a phased rollout: consent management and security readiness followed by Data Protection Board registration.</td>
                <td>Sandbox architecture operates within secure staging enclaves, allowing incremental alignment as statutory rules commence.</td>
            </tr>
        </tbody>
    </table>

    <h2>10.3 Final Policy Verdict for Government Leadership</h2>
    <div class="callout-emerald" style="padding: 6px 10px;">
        <h4 style="margin: 0 0 2px 0; color: #15803d; font-size: 8.5pt;">Final Policy & Regulatory Recommendation</h4>
        <span style="font-size: 8pt; color: #14532d; line-height: 1.35;">
            <strong>Policy Verdict:</strong> The Government of India should establish <em>Option B (Mandatory Open Standards)</em> as the regulatory foundation for digital health, while adopting <em>Option C (Competitive Public Implementation via GeM)</em> for technology procurement.<br>
            HealthSync does not seek an exclusive monopoly. By enforcing open standards (ABDM, FHIR R4, PMBI generic masters), the government empowers platforms to compete purely on clinician usability, dialect accuracy, and measurable reductions in patient wait times.
        </span>
    </div>

    <div class="source-box" style="margin-top: 4px; font-size: 7.5pt;">
        <strong>Statutory Citations:</strong> DPDP Act 2023 (Gazette of India, August 11, 2023) | DPDP Rules 2025 Draft & Guidelines (<a href="https://www.meity.gov.in" style="color: #0284c7;">meity.gov.in</a>) | CERT-In Cyber Security Directions.
    </div>
</div>
`;
};
