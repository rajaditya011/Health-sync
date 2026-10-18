// Page 34: Section 13 — One-Page Executive Decision Brief for Senior Leadership
// Audited per Government Standards: Neutral, Fact-Based Consultation Memorandum.

module.exports = function getSection13() {
    return `
<!-- PAGE 34: SECTION 13 - ONE-PAGE PITCH -->
<div class="pdf-page">
    <h1>13. One-Page Decision Brief for Senior Leadership</h1>

    <div style="background: #0f172a; color: white; padding: 10px 14px; border-radius: 6px; margin-bottom: 10px;">
        <div style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; font-weight: 700;">Executive Decision Memorandum — Consultation Draft</div>
        <div style="font-size: 11pt; font-weight: 700; margin-top: 2px;">Sanction of 12-Month Controlled Innovation Sandbox for Point-of-Care Clinical AI</div>
        <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">Submitted for Institutional Review: MoHFW, NHA, NITI Aayog, and State Health Departments</div>
    </div>

    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 25%;">Decision Dimension</th>
            <th style="width: 75%;">Executive Briefing & Strategic Findings</th>
        </tr>
        <tr>
            <td><strong>1. The Core Problem</strong></td>
            <td>Despite ₹4,45,855 Crore in annual public health spending, Indian citizens still spend 39.4% out-of-pocket on medical care (₹3.16 Lakh Crore), primarily on retail branded medicines. In crowded public hospital OPDs, doctors examine patients in just 98 seconds, making manual typing into EHR software impossible and causing clinical records to remain unlinked.</td>
        </tr>
        <tr>
            <td><strong>2. The Empirical Evidence</strong></td>
            <td>CAG Performance Audit Report No. 11 of 2023 revealed serious PM-JAY claim leakages and zero post-discharge tracking. Time-motion studies in <em>The Lancet</em> confirm 98-second average consultation durations. NHA data shows less than 8% of OPD visits access past clinical records.</td>
        </tr>
        <tr>
            <td><strong>3. The Proposed Solution</strong></td>
            <td>HealthSync deploys ambient regional voice scribing in 14 Indian languages, entrance MediKiosks for vital capture and pre-intake, automated Jan Aushadhi generic substitution, and post-operative Recovery Circles that connect patients, families, and village ASHAs.</td>
        </tr>
        <tr>
            <td><strong>4. Financial Request</strong></td>
            <td><strong>₹1.45 Crore</strong> funded under the existing National Health Mission (NHM) Innovation & Flexible Pool. This constitutes less than 0.004% of Uttar Pradesh's annual NHM allocation and requires zero additional parliamentary appropriations.</td>
        </tr>
        <tr>
            <td><strong>5. Risk Mitigation Guardrails</strong></td>
            <td>Total compliance with DPDP Act 2023 consent architecture; zero secondary commercialization of citizen health data; strict adherence to open HL7 FHIR R4 and ABDM standards to prevent proprietary vendor lock-in.</td>
        </tr>
        <tr>
            <td><strong>6. Action Requested</strong></td>
            <td>Joint administrative sanction by MoHFW and NITI Aayog approving the 12-Month Controlled Innovation Sandbox across Chandauli (UP) and Tehri Garhwal (Uttarakhand), with academic clinical auditing entrusted to an independent institution such as AIIMS New Delhi.</td>
        </tr>
    </table>

    <div class="callout-emerald" style="margin-top: 10px; padding: 8px 12px;">
        <h4 style="margin: 0 0 2px 0; color: #15803d; font-size: 8.8pt;">Proposed Administrative Decision Resolution</h4>
        <span style="font-size: 8.2pt; color: #14532d; line-height: 1.4;">
            "Approve the issuance of an Administrative Sanction for a 12-Month Controlled Innovation Sandbox under the NHM Innovation & Flexible Pool, authorizing HealthSync to deploy point-of-care clinical AI tools across 82 public facilities in Chandauli and Tehri Garhwal under the joint oversight of MoHFW, NHA, and independent academic clinical auditors."
        </span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 14px; padding-top: 8px; border-top: 1px solid #cbd5e1; font-size: 7.8pt; color: #64748b;">
        <div>Submitted by: HealthSync Public Systems Group</div>
        <div>Proposed for Evaluation: In consultation with relevant health system institutions</div>
        <div>Status: Consultation Draft</div>
    </div>
</div>
`;
};
