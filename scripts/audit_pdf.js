const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

async function auditPdf() {
    const pdfPath = path.join(__dirname, '..', 'HealthSync_India_Government_Healthcare_Report.pdf');
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(buffer);

    console.log(`Auditing PDF: ${pdfPath}`);
    console.log(`Total Pages: ${data.numpages}`);

    // Normalize whitespace for robust multi-line matching
    const cleanText = data.text.replace(/\s+/g, ' ');

    const checks = [
        { label: "1. Cover Title Hierarchy", pattern: /HEALTHSYNC.*Government Healthcare Policy & Collaboration Proposal/i },
        { label: "2. Cover Subtitle", pattern: /India Healthcare Funding, Expenditure & Digital Health Opportunity Report/i },
        { label: "3. Prepared for Govt Consultation", pattern: /Prepared for Government Consultation/i },
        { label: "4. Master State Table Schema", pattern: /Major Spending Areas/i },
        { label: "5. Unavailable AE Disclaimer", pattern: /Comparable actual expenditure unavailable in an official source/i },
        { label: "6. Analytical Synthesis Section", pattern: /HealthSync Analytical Synthesis of Public Health Spending Categories/i },
        { label: "7. Harmonization Disclaimer", pattern: /These categories are analytically harmonised from multiple government budget/i },
        { label: "8. Lancet Direct Citation", pattern: /thelancet\.com\/journals\/langlo\/article/i },
        { label: "9. CAG PM-JAY Audit", pattern: /Report No\. 11 of 2023/i },
        { label: "10. RoI Full Table & Inputs", pattern: /Avoided PM-JAY Readmissions.*Avoided Repeat Diagnostics.*Physician Working Time Value/i },
        { label: "11. RoI Sensitivity (Conservative, Baseline, Optimistic)", pattern: /Conservative Case.*Baseline Case.*Optimistic Case/i },
        { label: "12. 3200 Cr National Model", pattern: /₹3,200 Crore total public healthcare system savings/i },
        { label: "13. Primary Ask Section Title", pattern: /WHAT HEALTHSYNC IS ASKING THE GOVERNMENT FOR/i },
        { label: "14. NHM Innovation Caution", pattern: /Proposed funding route, subject to confirmation by the relevant NHM\/State Health Society/i },
        { label: "15. Government Provides / HealthSync Commits", pattern: /What the Government Provides.*What HealthSync Commits to Deliver/i },
        { label: "16. GFR Rule 144 Caution", pattern: /A procurement specification that unnecessarily locks public procurement/i },
        { label: "17. DPDP Rules 2025", pattern: /Digital Personal Data Protection Rules, 2025/i },
        { label: "18. DPDP Compliance Framing", pattern: /HealthSync should be designed and operated to comply with applicable DPDP Act 2023 and DPDP Rules 2025 requirements/i },
        { label: "19. Pilot Itemized Budget 145 Lakh", pattern: /145\.00 Lakh/i },
        { label: "20. Neutral Academic Partner Wording", pattern: /subject to formal institutional engagement/i },
        { label: "21. Three-Tier Source Quality", pattern: /Tier 1: Primary Official Government Sources/i }
    ];

    let allPassed = true;
    for (const c of checks) {
        const found = c.pattern.test(cleanText);
        console.log(`[${found ? "PASS" : "FAIL"}] ${c.label}`);
        if (!found) allPassed = false;
    }

    if (allPassed) {
        console.log("\n========================================================");
        console.log("SUCCESS: ALL 21 GOVERNMENT-READINESS AUDIT CHECKS PASSED!");
        console.log("========================================================\n");
    } else {
        console.log("\nWARNING: Some checks failed.");
    }
}

auditPdf().catch(console.error);
