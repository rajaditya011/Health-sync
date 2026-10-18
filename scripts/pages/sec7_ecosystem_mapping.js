// Pages 23 and 24: Section 7 — Ecosystem Mapping: HealthSync vs Sovereign Platforms
// Audited per Government Standards: Precise, respectful language reflecting complementary architecture.

module.exports = function getSection7() {
    return `
<!-- PAGE 23: SECTION 7 - ECOSYSTEM MAPPING -->
<div class="pdf-page">
    <h1>7. Ecosystem Mapping: Sovereign Platforms Matrix</h1>

    <h2>7.1 Comprehensive Sovereign Capabilities Matrix</h2>
    <p>
        HealthSync is engineered as an <strong>operational accelerator</strong> for sovereign digital health platforms. The existing national platforms provide foundational population-scale registries and financing backends; HealthSync proposes to operate at the physical point of care as an intelligent bedside interface.
    </p>

    <table style="font-size: 8.2pt;">
        <tr>
            <th style="width: 15%;">Sovereign System</th>
            <th style="width: 22%;">Primary Sovereign Focus</th>
            <th style="width: 14%;">National Scale</th>
            <th style="width: 24%;">Point-of-Care Operating Context</th>
            <th style="width: 25%;">HealthSync Proposed Role</th>
        </tr>
        <tr>
            <td><strong>ABDM (NHA)</strong></td>
            <td>National digital health identity (ABHA) and federated interoperability gateway.</td>
            <td>67.3+ Cr ABHA; 3.2L facilities; 42 Cr records.</td>
            <td>The reviewed system focuses on registry and exchange standards; clinicians in high-density OPDs face time constraints typing notes.</td>
            <td><strong>Bedside Interface:</strong> Ambient Voice AI auto-generates structured FHIR notes, populating ABHA without manual typing.</td>
        </tr>
        <tr>
            <td><strong>eSanjeevani (MoHFW)</strong></td>
            <td>National telemedicine platform for remote doctor-to-doctor and patient-to-doctor consults.</td>
            <td>15+ Crore teleconsultations completed.</td>
            <td>The reviewed system focuses on telecommunications connectivity; remote specialists often receive unstructured pre-consult notes.</td>
            <td><strong>Clinical Triage:</strong> Pre-intake MediKiosks package structured vitals and SOCRATES summaries before calls initiate.</td>
        </tr>
        <tr>
            <td><strong>PM-JAY TMS (NHA)</strong></td>
            <td>Transaction Management System for secondary and tertiary hospital pre-authorizations.</td>
            <td>7.3+ Crore hospital admissions authorized.</td>
            <td>The reviewed system focuses on claims adjudication; longitudinal clinical tracking concludes at hospital discharge.</td>
            <td><strong>Post-Discharge Loop:</strong> Recovery Circles track patient recovery post-discharge to prevent secondary readmissions.</td>
        </tr>
        <tr>
            <td><strong>AAMs (NHM)</strong></td>
            <td>1,73,000+ Ayushman Arogya Mandirs for comprehensive primary care delivery.</td>
            <td>Delivers 12 essential primary care service packages.</td>
            <td>The reviewed system focuses on grassroots primary delivery; Community Health Officers (CHOs) face complex triage decisions.</td>
            <td><strong>CHO Clinical Companion:</strong> AI red-flag algorithms detect emergency indicators for timely hospital referral.</td>
        </tr>
        <tr>
            <td><strong>e-RaktKosh (MoHFW)</strong></td>
            <td>Centralized blood bank management and stock availability portal.</td>
            <td>Connects 3,800+ licensed blood banks across India.</td>
            <td>The reviewed system focuses on stock inventory reporting; emergency room workflows require rapid donor-bed coordination.</td>
            <td><strong>Emergency Routing:</strong> Instant SOS routing connects trauma teams directly to nearest matched units.</td>
        </tr>
    </table>

    <div class="callout" style="margin-top: 10px;">
        <h4 style="margin: 0 0 2px 0; color: #0369a1; font-size: 8.8pt;">Architectural Philosophy: Non-Duplication</h4>
        <span style="font-size: 8.2pt; color: #334155;">
            HealthSync does not create parallel identities or separate data stores. All patient records created through HealthSync adhere strictly to the National Digital Health Blueprint (NDHB) and are transmitted directly to the citizen's ABHA account through official NHA-certified gateways.
        </span>
    </div>

    <div class="source-box">
        <strong>Primary Sources:</strong> National Digital Health Blueprint (MoHFW) | <a href="https://abdm.gov.in" style="color: #0284c7;">abdm.gov.in</a> | eSanjeevani Portal | <a href="https://esanjeevani.mohfw.gov.in" style="color: #0284c7;">esanjeevani.mohfw.gov.in</a> | NHA Annual Report.
    </div>
</div>

<!-- PAGE 24: SECTION 7 (CONT) - INTEGRATION ARCHITECTURE -->
<div class="pdf-page">
    <h1>7. Ecosystem Mapping (Cont.): Technical Integration</h1>

    <h2>7.2 Technical Integration Protocols & Architecture</h2>
    <p>
        To ensure compatibility with India's digital health infrastructure, HealthSync connects to government platforms via open, standardized protocols established by the National Health Authority:
    </p>

    <h3>1. ABDM Milestone 1, 2, and 3 Gateway Compliance</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 25%;">ABDM Milestone</th>
            <th style="width: 40%;">Technical Protocol & Standards</th>
            <th style="width: 35%;">HealthSync Proposed Function</th>
        </tr>
        <tr>
            <td><strong>Milestone 1 (M1)</strong></td>
            <td>Aadhaar OTP / Demographic Auth via NHA Sandbox API Gateway.</td>
            <td>Assists patient ABHA creation and demographic linking at MediKiosk and OPD entrance.</td>
        </tr>
        <tr>
            <td><strong>Milestone 2 (M2)</strong></td>
            <td>Health Information Provider (HIP) — Push clinical records via FHIR R4.</td>
            <td>Ambient Voice notes and diagnostic vitals packaged into signed ABDM bundles.</td>
        </tr>
        <tr>
            <td><strong>Milestone 3 (M3)</strong></td>
            <td>Health Information User (HIU) — Pull consent-based records via Gateway.</td>
            <td>Doctor's dashboard displays instant longitudinal clinical timeline from past hospitals.</td>
        </tr>
    </table>

    <h3>2. HL7 FHIR R4 Data Bundle Architecture</h3>
    <p>
        HealthSync utilizes the official <strong>Ayushman Bharat Digital Mission FHIR R4 Profiles</strong> for structuring clinical documents. Encounter packages bundle:
    </p>
    <ul>
        <li><strong>Bundle/Encounter:</strong> Hospital metadata, departmental code, physician National Health Registry ID.</li>
        <li><strong>Observation:</strong> Vitals captured at MediKiosks (systolic/diastolic BP, SpO2, heart rate, body temperature, BMI).</li>
        <li><strong>Condition:</strong> Clinical diagnoses structured via SNOMED CT and ICD-10 codings.</li>
        <li><strong>MedicationRequest:</strong> Digital prescriptions mapped to the Central PMBI Generic Drug Master registry.</li>
    </ul>

    <h3>3. Direct PMBI Drug Master API Synchronization</h3>
    <p>
        HealthSync connects to the <em>Pharmaceuticals & Medical Devices Bureau of India (PMBI)</em> drug master database. When a physician prescribes a medication, the matching algorithm maps the active molecule to the corresponding PMBJP generic code, displaying stock availability and retail price savings.
    </p>

    <div class="source-box">
        <strong>Primary Standards:</strong> HL7 FHIR R4 Specification (ABDM Profiles) | <a href="https://abdm.gov.in" style="color: #0284c7;">abdm.gov.in</a> | SNOMED CT India Extension | PMBI Central Drug Master API | <a href="https://janaushadhi.gov.in" style="color: #0284c7;">janaushadhi.gov.in</a>.
    </div>
</div>
`;
};
