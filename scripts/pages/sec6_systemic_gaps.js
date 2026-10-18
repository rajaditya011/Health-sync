// Pages 21 and 22: Section 6 — Systemic Healthcare Delivery Gaps & Empirical Evidence
// Audited per Government Standards: Exact Evidence Classification, Direct Journal URLs, and Professional Tone.

module.exports = function getSection6() {
    return `
<!-- PAGE 21: SECTION 6 - SYSTEMIC GAPS (PART 1) -->
<div class="pdf-page">
    <h1>6. Systemic Healthcare Delivery Gaps (Gaps 1 & 2)</h1>

    <p>
        An evidence-based examination of India's healthcare delivery system reveals severe operational bottlenecks where public funding fails to translate into clinical outcomes due to point-of-care friction.
    </p>

    <h2>6.1 Gap 1: High-Density OPD Consultation Compression</h2>
    <ul>
        <li><strong>Empirical Evidence:</strong> A multi-centre time-motion study published in <em>The Lancet Global Health</em> (2022) revealed that average consultation times in Indian public hospital Outpatient Departments range from <strong>1.8 to 2.5 minutes (98 to 150 seconds)</strong>. Overburdened medical officers in District Hospitals handle 100 to 160 patients in a single 4-hour morning shift.</li>
        <li><strong>Existing Government Response:</strong> The National Health Authority rolled out the <em>Scan-and-Share QR Code</em> feature under ABDM, generating over 4 Crore digital queue tokens.</li>
        <li><strong>The Remaining Gap:</strong> Scan-and-Share addresses demographic registration queue congestion, but it does <strong>not capture clinical history or symptoms</strong>. When the patient enters the doctor's cabin, the physician must still spend 60 to 90 seconds manually typing symptoms and past history.</li>
        <li><strong>HealthSync Point-of-Care Solution:</strong> Ambient Regional Voice AI and Entrance MediKiosks capture chief complaints in colloquial regional languages, synthesizing a clinical SOCRATES note <em>before</em> the patient sits down with the doctor.</li>
        <li><strong>Classified Impact Metric:</strong> <strong>[Proposed Pilot Target / Workflow Model]</strong> Reclaims 60 to 90 seconds of typing per patient, returning an estimated <strong>2.0 hours of direct physical clinical attention</strong> per 120-patient shift.</li>
    </ul>

    <h2>6.2 Gap 2: Out-of-Pocket Generic Medicine Leakage</h2>
    <ul>
        <li><strong>Empirical Evidence:</strong> National Health Accounts Estimates (FY 2021-22) confirm that retail pharmaceuticals constitute <strong>48% of total household Out-of-Pocket expenditure</strong>. Over 60 million Indian citizens are pushed below the poverty line annually due to medical debt.</li>
        <li><strong>Existing Government Response:</strong> The Central Government established the <em>Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)</em>, expanding to over 14,000 retail generic pharmacy outlets.</li>
        <li><strong>The Remaining Gap:</strong> Clinicians frequently write proprietary brand trade names out of habit; hospital internal pharmacies frequently face stockouts; and retail private pharmacists systematically substitute prescribed drugs with high-margin branded formulations.</li>
        <li><strong>HealthSync Point-of-Care Solution:</strong> A dynamic molecular matching engine embedded directly in the prescription workflow auto-suggests identical PMBJP generic formulations, displaying approved retail price savings in real time.</li>
        <li><strong>Classified Impact Metric:</strong> <strong>[Modelled Household Saving based on PMBJP Price Differentials; Pilot Target]</strong> Targets lowering monthly chronic cardiovascular and diabetes medication bills by <strong>70% to 80%</strong>, saving an estimated ₹600–₹1,400 per patient per month.</li>
    </ul>

    <div class="source-box">
        <strong>Primary Sources:</strong> The Lancet Global Health (2022; <a href="https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(22)00416-8/fulltext" style="color: #0284c7;">thelancet.com/journals/langlo/article/PIIS2214-109X(22)00416-8</a>) | NHA Estimates FY 2021-22 (<a href="https://nhsrcindia.org" style="color: #0284c7;">nhsrcindia.org</a>) | Pharmaceuticals & Medical Devices Bureau of India (PMBI; <a href="https://janaushadhi.gov.in" style="color: #0284c7;">janaushadhi.gov.in</a>).
    </div>
</div>

<!-- PAGE 22: SECTION 6 - SYSTEMIC GAPS (PART 2) -->
<div class="pdf-page">
    <h1>6. Systemic Healthcare Delivery Gaps (Gaps 3, 4 & 5)</h1>

    <h2>6.3 Gap 3: The Post-Discharge Surgical Readmission Abyss</h2>
    <ul>
        <li><strong>Empirical Evidence:</strong> Hospital claim audits under PM-JAY and State Health Schemes demonstrate that <strong>8.4% to 12.1%</strong> of high-risk surgical patients require unplanned readmission within 30 days of discharge, driving significant secondary treatment costs.</li>
        <li><strong>The Remaining Gap:</strong> Public hospital care terminates completely at the physical discharge gate. Telephone follow-ups via state call centers (14555) are administrative and fail to detect early surgical site infections, vital degradation, or medication non-compliance.</li>
        <li><strong>HealthSync Solution:</strong> <em>Recovery Circles</em>—an automated, low-bandwidth communication protocol connecting the discharged patient, designated family caregivers, and the village ASHA worker to monitor recovery milestones.</li>
        <li><strong>Classified Impact Metric:</strong> <strong>[Proposed Pilot Target / Modelled Projection]</strong> Decreases preventable 30-day post-surgical readmissions by an estimated <strong>15% to 20%</strong>.</li>
    </ul>

    <h2>6.4 Gap 4: The Longitudinal "Data Black Hole" & Test Duplication</h2>
    <ul>
        <li><strong>Empirical Evidence:</strong> NHA field evaluations indicate that fewer than <strong>8% of public hospital OPD visits</strong> access prior diagnostic or clinical records. Referred patients arrive without accessible documentation.</li>
        <li><strong>The Remaining Gap:</strong> Primary care doctors re-order basic complete blood counts, renal function panels, and radiographs simply because they cannot view tests performed at the sub-district hospital 48 hours earlier.</li>
        <li><strong>HealthSync Solution:</strong> FHIR R4-compliant longitudinal visual timeline parsing past records into a 10-second chronological briefing.</li>
        <li><strong>Classified Impact Metric:</strong> <strong>[Modelled Projection based on FHIR Data Availability]</strong> Eliminates duplicate diagnostic lab orders, saving an estimated <strong>18% in public laboratory consumables</strong>.</li>
    </ul>

    <h2>6.5 Gap 5: Isolated Allopathy–AYUSH Dual Care Regimens</h2>
    <ul>
        <li><strong>Empirical Evidence:</strong> Indian Council of Medical Research (ICMR) surveys reveal that over <strong>70% of rural patients</strong> use Ayurvedic and Allopathic remedies concurrently without cross-practitioner disclosure.</li>
        <li><strong>The Remaining Gap:</strong> Zero interoperability between Allopathic hospital EHRs and AYUSH dispensary registers, risking severe drug-herb interactions.</li>
        <li><strong>HealthSync Solution:</strong> Unified dual-pathway clinical architecture tracking Prakriti and herbal therapies alongside Allopathic drugs.</li>
        <li><strong>Classified Impact Metric:</strong> <strong>[Clinical Safety Goal]</strong> Real-time cross-system contraindication alerts to protect patient safety.</li>
    </ul>

    <div class="source-box">
        <strong>Primary Sources:</strong> NHA PM-JAY Compendium 2023-24 (<a href="https://pmjay.gov.in" style="color: #0284c7;">pmjay.gov.in</a>) | ICMR Integrative Medicine Reports (<a href="https://main.icmr.nic.in" style="color: #0284c7;">icmr.nic.in</a>) | Ministry of Ayush (<a href="https://main.ayush.gov.in" style="color: #0284c7;">ayush.gov.in</a>).
    </div>
</div>
`;
};
