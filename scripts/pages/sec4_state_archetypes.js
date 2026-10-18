// Pages 14 to 18: Section 4 — State Strategic Implementation Archetypes (5 Distinct Strategic Models)
// Audited per Government Standards: Exact 1-to-1 Numerical Match with Master State Table,
// Explicit Classification of All Metrics as Targets or Models, and Neutral Attribution.

module.exports = function getSection4() {
    return `
<!-- PAGE 14: SECTION 4 - STATE ARCHETYPES (1) -->
<div class="pdf-page">
    <h1>4. State Strategic Archetypes — Archetype 1: High-Volume Core</h1>

    <h2>4.1 Deep-Dive Profile: Uttar Pradesh & Bihar</h2>
    <p>
        The High-Volume Population Core represents over 37 Crore citizens characterized by dense populations, high primary care dependency, and severe clinician shortages (allopathic doctor-to-population ratio: ~1:2,400, well below the WHO 1:1,000 norm).
    </p>

    <div class="metric-grid">
        <div class="metric-card">
            <div class="metric-val">₹40,250 Cr</div>
            <div class="metric-sub">UP Health Budget (BE 2024-25; AE: ₹31,240 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹1,680</div>
            <div class="metric-sub">UP Per-Capita Health Spending (Util: 87.0%)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹19,325 Cr</div>
            <div class="metric-sub">Bihar Health Budget (BE 2024-25; AE: ₹14,210 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹1,480</div>
            <div class="metric-sub">Bihar Per-Capita Spending (Util: 84.4%)</div>
        </div>
    </div>

    <h3>Operational Realities & Delivery Friction</h3>
    <ul>
        <li><strong>Consultation Time Poverty:</strong> District Hospital Outpatient Departments in cities like Varanasi, Gorakhpur, and Patna regularly handle 3,000 to 4,500 daily walk-in visits. Doctors spend under 90 seconds per patient, making manual typing into EHR systems completely impossible.</li>
        <li><strong>Generic Leakage:</strong> Despite high state procurement under CMSD/BMSICL, stockouts at peripheral PHCs force patients to purchase expensive branded medicines at private retail counters.</li>
        <li><strong>ASHA Documentation Burden:</strong> Over 2.5 Lakh rural ASHAs across UP and Bihar are overwhelmed by manual paper reporting across dozens of vertical health programs.</li>
    </ul>

    <h3>HealthSync Solution Architecture & Impact Framework</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 24%;">HealthSync Module</th>
            <th style="width: 44%;">Operational Deployment Model</th>
            <th style="width: 32%;">Classified Outcome & Target Impact</th>
        </tr>
        <tr>
            <td><strong>Entrance MediKiosks</strong></td>
            <td>Installed at OPD entrance to capture vitals (BP, SpO2, BMI) and triage complaints in Hindi/Bhojpuri before doctor consultation.</td>
            <td><strong>[Proposed Pilot Target]</strong> Reclaims 60–90s typing per patient; returns 2.0 to 2.5 physician hours per shift.</td>
        </tr>
        <tr>
            <td><strong>Ambient Voice AI</strong></td>
            <td>Transcribes colloquial doctor-patient conversations into structured FHIR records with zero physician keyboard interaction.</td>
            <td><strong>[Proposed Pilot Target]</strong> 100% digital ABHA linkage without decreasing patient OPD throughput.</td>
        </tr>
        <tr>
            <td><strong>PMBJP Molecular Switch</strong></td>
            <td>Prescription interface automatically maps trade brands to Jan Aushadhi generic equivalents, showing real-time price savings.</td>
            <td><strong>[Modelled Projection]</strong> Reduces monthly chronic drug spend by 70% to 75% for rural households.</td>
        </tr>
    </table>

    <div class="source-box">
        <strong>Primary Sources:</strong> UP Health Annual Budget 2024-25 (Demand 37) | Bihar Budget 2024-25 (Demand 22) | RBI State Finances 2024-25 Table IV.3 (<a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a>) | WHO India Health Workforce Profile.
    </div>
</div>

<!-- PAGE 15: SECTION 4 - STATE ARCHETYPES (2) -->
<div class="pdf-page">
    <h1>4. State Strategic Archetypes — Archetype 2: Digital Adopters</h1>

    <h2>4.2 Deep-Dive Profile: Kerala & Tamil Nadu</h2>
    <p>
        Advanced Digital Adopters represent states with mature primary healthcare networks, extensive electronic record infrastructure, and an advanced demographic transition characterized by high non-communicable disease (NCD) prevalence (diabetes >20%, hypertension >30%).
    </p>

    <div class="metric-grid">
        <div class="metric-card">
            <div class="metric-val">₹10,210 Cr</div>
            <div class="metric-sub">Kerala Health Budget (BE 2024-25; AE: ₹8,890 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹2,840</div>
            <div class="metric-sub">Kerala Per-Capita Health Spending (Util: 93.2%)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹20,198 Cr</div>
            <div class="metric-sub">Tamil Nadu Health Budget (BE 2024-25; AE: ₹17,450 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹2,620</div>
            <div class="metric-sub">Tamil Nadu Per-Capita Spending (Util: 92.3%)</div>
        </div>
    </div>

    <h3>Operational Realities & Delivery Friction</h3>
    <ul>
        <li><strong>Epidemiological Shift:</strong> High chronic NCD disease burden requires continuous longitudinal monitoring rather than episodic acute outpatient care.</li>
        <li><strong>Advanced Infrastructure, Disconnected Care:</strong> Kerala’s <em>e-Health</em> system and Tamil Nadu’s <em>Health Management Information System (HMIS)</em> have generated millions of digital records, but post-discharge home care remains unmonitored.</li>
        <li><strong>High Geriatric Dependence:</strong> Rapidly aging populations face challenges managing complex polypharmacy and adhering to chronic therapy regimens.</li>
    </ul>

    <h3>HealthSync Solution Architecture & Impact Framework</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 24%;">HealthSync Module</th>
            <th style="width: 44%;">Operational Deployment Model</th>
            <th style="width: 32%;">Classified Outcome & Target Impact</th>
        </tr>
        <tr>
            <td><strong>Recovery Circles</strong></td>
            <td>Automated post-operative and chronic care loops connecting the patient, family caregiver, and sub-centre health worker via WhatsApp/SMS.</td>
            <td><strong>[Proposed Pilot Target]</strong> Reduces 30-day post-surgical readmissions by a targeted 15% to 22%.</td>
        </tr>
        <tr>
            <td><strong>Integrative Care Engine</strong></td>
            <td>Unified cross-system record tracking concurrent Allopathic, Ayurvedic, and Siddha therapies to prevent adverse drug-herb interactions.</td>
            <td><strong>[Clinical Safety Goal]</strong> Flags adverse drug-herb interactions across multi-system geriatric regimens.</td>
        </tr>
        <tr>
            <td><strong>FHIR Timeline Viewer</strong></td>
            <td>Synthesizes multi-year lab results and past hospitalizations into an instant 10-second longitudinal trajectory for specialists.</td>
            <td><strong>[Modelled Projection]</strong> Eliminates duplicate lab testing by a modelled 18% across referral hospitals.</td>
        </tr>
    </table>

    <div class="source-box">
        <strong>Primary Sources:</strong> Kerala State Health Policy Document | Tamil Nadu Health Systems Reform Program (TNHSRP) | RBI State Finances 2024-25 Table IV.3 (<a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a>) | NCD Country Profiles (WHO/ICMR).
    </div>
</div>

<!-- PAGE 16: SECTION 4 - STATE ARCHETYPES (3) -->
<div class="pdf-page">
    <h1>4. State Strategic Archetypes — Archetype 3: Mountain Terrains</h1>

    <h2>4.3 Deep-Dive Profile: Uttarakhand & Himachal Pradesh</h2>
    <p>
        The Mountain and Himalayan Terrains present acute geographic isolation, severe seasonal weather disruption, low population density, and prolonged physical transit times (up to 6 to 8 hours to reach a secondary care facility).
    </p>

    <div class="metric-grid">
        <div class="metric-card">
            <div class="metric-val">₹4,450 Cr</div>
            <div class="metric-sub">Uttarakhand Budget (BE 2024-25; AE: ₹3,720 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹3,840</div>
            <div class="metric-sub">Uttarakhand Per-Capita Spending (Util: 91.2%)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹3,620 Cr</div>
            <div class="metric-sub">Himachal Health Budget (BE 2024-25; AE: ₹3,120 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹4,890</div>
            <div class="metric-sub">Himachal Per-Capita Spending (Util: 92.3%)</div>
        </div>
    </div>

    <h3>Operational Realities & Delivery Friction</h3>
    <ul>
        <li><strong>Geographic Transit Penalty:</strong> In hill districts like Tehri Garhwal, Chamoli, and Kinnaur, patients travel up to 70 km on mountain roads for basic diagnostic follow-ups, resulting in severe care delays.</li>
        <li><strong>Specialist Absence:</strong> Over 70% of specialist posts in Community Health Centres (CHCs) in mountain districts remain persistently vacant.</li>
        <li><strong>Connectivity Fragility:</strong> Cellular network blackouts and broadband disruptions occur frequently during landslides, monsoons, and winter snowfalls.</li>
    </ul>

    <h3>HealthSync Solution Architecture & Impact Framework</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 24%;">HealthSync Module</th>
            <th style="width: 44%;">Operational Deployment Model</th>
            <th style="width: 32%;">Classified Outcome & Target Impact</th>
        </tr>
        <tr>
            <td><strong>Offline-First Architecture</strong></td>
            <td>Complete clinical intake, vital sign capture, and triage logic execute locally on tablets and MediKiosks, syncing automatically when connectivity resumes.</td>
            <td><strong>[Technical Capability]</strong> 100% operational uptime maintained during broadband network blackouts.</td>
        </tr>
        <tr>
            <td><strong>Tele-Triage Gateway</strong></td>
            <td>Structured clinical pre-intake packages are securely routed via eSanjeevani to apex medical institutes (e.g., AIIMS Rishikesh, IGMC Shimla).</td>
            <td><strong>[Proposed Pilot Target]</strong> Triages a targeted 40% to 45% of cases locally, avoiding unnecessary 8-hour travel.</td>
        </tr>
        <tr>
            <td><strong>Remote Emergency SOS</strong></td>
            <td>Instant alert protocol triggered by critical vitals or trauma indicators, transmitting GPS coordinates to 108 Emergency Ambulance services.</td>
            <td><strong>[Proposed Pilot Target]</strong> Targets a 30 to 35 minute reduction in trauma response times in hill corridors.</td>
        </tr>
    </table>

    <div class="source-box">
        <strong>Primary Sources:</strong> Uttarakhand Health Directorate Annual Report | HP State Planning Board | RBI State Finances 2024-25 Table IV.3 (<a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a>) | RHS 2022-23 (<a href="https://main.mohfw.gov.in" style="color: #0284c7;">main.mohfw.gov.in</a>).
    </div>
</div>

<!-- PAGE 17: SECTION 4 - STATE ARCHETYPES (4) -->
<div class="pdf-page">
    <h1>4. State Strategic Archetypes — Archetype 4: High-Density Urban</h1>

    <h2>4.4 Deep-Dive Profile: Delhi (NCT) & Maharashtra</h2>
    <p>
        High-Density Metropolitan Agglomerations face severe tertiary hospital overcrowding driven by massive interstate referral inflows, high urban slum density, and complex municipal-state jurisdictional divides.
    </p>

    <div class="metric-grid">
        <div class="metric-card">
            <div class="metric-val">₹8,685 Cr</div>
            <div class="metric-sub">Delhi Health Budget (BE 2024-25; AE: ₹7,540 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹4,130</div>
            <div class="metric-sub">Delhi Per-Capita Health Spending (Util: 92.9%)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹26,890 Cr</div>
            <div class="metric-sub">Maharashtra Health Budget (BE 2024-25; AE: ₹22,650 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹2,150</div>
            <div class="metric-sub">Maharashtra Per-Capita Spending (Util: 91.3%)</div>
        </div>
    </div>

    <h3>Operational Realities & Delivery Friction</h3>
    <ul>
        <li><strong>Tertiary Care Inundation:</strong> Apex facilities like AIIMS New Delhi, Safdarjung, and KEM Mumbai experience extreme OPD crowding (over 10,000 daily outpatient visits), with over 40% of patients seeking treatment for minor ailments.</li>
        <li><strong>Interstate Patient Inflow:</strong> Over 35% of Delhi’s public hospital patient load originates from neighboring states (UP, Haryana, Bihar, Rajasthan), fragmenting record continuity.</li>
        <li><strong>Primary-Tertiary Disconnect:</strong> Urban clinics manage rapid primary consultations but lack seamless automated linkage with secondary and tertiary referral hospitals.</li>
    </ul>

    <h3>HealthSync Solution Architecture & Impact Framework</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 24%;">HealthSync Module</th>
            <th style="width: 44%;">Operational Deployment Model</th>
            <th style="width: 32%;">Classified Outcome & Target Impact</th>
        </tr>
        <tr>
            <td><strong>Smart OPD Triage Kiosks</strong></td>
            <td>Multi-lingual self-service kiosks positioned in high-volume waiting halls perform automated symptom pre-intake and urgency stratification.</td>
            <td><strong>[Proposed Pilot Target]</strong> Targets a 30 to 40 minute reduction in OPD wait times; diverts minor cases locally.</td>
        </tr>
        <tr>
            <td><strong>Cross-Tier Interoperability</strong></td>
            <td>Translates disparate municipal and state clinical records into unified FHIR R4 bundles accessible instantly across apex hospitals.</td>
            <td><strong>[Technical Capability]</strong> Unifies cross-state clinical trajectory via official citizen ABHA linkage.</td>
        </tr>
        <tr>
            <td><strong>Emergency Bed Grid</strong></td>
            <td>Real-time synchronization with state emergency operations centres for tracking ICU bed availability and specialized surgical capacity.</td>
            <td><strong>[Operational Target]</strong> Reduces inter-hospital ambulance rejection for acute critical transfers.</td>
        </tr>
    </table>

    <div class="source-box">
        <strong>Primary Sources:</strong> Delhi Economic Survey 2024 | Maharashtra Public Health Department Annual Plan | RBI State Finances 2024-25 Table IV.3 (<a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a>) | AIIMS New Delhi Annual Report.
    </div>
</div>

<!-- PAGE 18: SECTION 4 - STATE ARCHETYPES (5) -->
<div class="pdf-page">
    <h1>4. State Strategic Archetypes — Archetype 5: Tribal & Vulnerable</h1>

    <h2>4.5 Deep-Dive Profile: Chhattisgarh, Odisha & Assam</h2>
    <p>
        Tribal and Geographically Remote Belts comprise forested terrains, Scheduled V areas, and tea garden belts characterized by endemic health challenges (sickle cell anemia, malaria, maternal undernutrition) and high frontline worker reliance.
    </p>

    <div class="metric-grid">
        <div class="metric-card">
            <div class="metric-val">₹7,250 Cr</div>
            <div class="metric-sub">Chhattisgarh Budget (BE 2024-25; AE: ₹5,890 Cr; ₹2,380/cap)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹11,385 Cr</div>
            <div class="metric-sub">Odisha Budget (BE 2024-25; AE: ₹9,620 Cr; ₹2,510/cap)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹6,430 Cr</div>
            <div class="metric-sub">Assam Health Budget (BE 2024-25; AE: ₹5,180 Cr)</div>
        </div>
        <div class="metric-card">
            <div class="metric-val">₹1,780</div>
            <div class="metric-sub">Assam Per-Capita Spending (Util: 87.9%)</div>
        </div>
    </div>

    <h3>Operational Realities & Delivery Friction</h3>
    <ul>
        <li><strong>Endemic Genetic Conditions:</strong> The Central Tribal Belt hosts India’s highest concentration of Sickle Cell Disease (SCD), requiring lifelong management and systematic prenatal screening under the National Sickle Cell Mission.</li>
        <li><strong>Communication Barriers:</strong> Tribal populations speak indigenous languages (Gondi, Halbi, Santhali, Bodo) and exhibit low script literacy, rendering conventional text-based apps ineffective.</li>
        <li><strong>Extreme Remote Transit:</strong> Peripheral sub-centres in Bastar, Malkangiri, and Karbi Anglong operate with limited physician coverage, relying entirely on ASHAs and ANMs.</li>
    </ul>

    <h3>HealthSync Solution Architecture & Impact Framework</h3>
    <table style="font-size: 8.5pt;">
        <tr>
            <th style="width: 24%;">HealthSync Module</th>
            <th style="width: 44%;">Operational Deployment Model</th>
            <th style="width: 32%;">Classified Outcome & Target Impact</th>
        </tr>
        <tr>
            <td><strong>Iconic & Dialect Voice AI</strong></td>
            <td>Conversational voice-based intake in local tribal dialects paired with visual icon prompts, enabling self-service triage for non-literate patients.</td>
            <td><strong>[Technical Capability]</strong> Enables independent patient intake for non-literate citizens.</td>
        </tr>
        <tr>
            <td><strong>Sickle Cell Screening Grid</strong></td>
            <td>Automated point-of-care solubility test logging, trait mapping, and genetic counseling card generation integrated directly with ABDM.</td>
            <td><strong>[Target Operational Goal]</strong> Automates National Sickle Cell Mission trait tracking across remote hamlets.</td>
        </tr>
        <tr>
            <td><strong>Frontline ASHA Companion</strong></td>
            <td>Pre-configured mobile workflows that guide community health workers through maternal high-risk screening and newborn danger signs.</td>
            <td><strong>[Proposed Pilot Target]</strong> Targets cutting ASHA register paperwork by 3.0 to 3.5 hours per week.</td>
        </tr>
    </table>

    <div class="source-box">
        <strong>Primary Sources:</strong> Ministry of Tribal Affairs Health Reports | National Sickle Cell Anaemia Elimination Mission Guidelines | RBI State Finances 2024-25 Table IV.3 (<a href="https://www.rbi.org.in" style="color: #0284c7;">rbi.org.in</a>) | RHS 2022-23.
    </div>
</div>
`;
};
