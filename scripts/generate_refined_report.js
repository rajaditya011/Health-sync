// Complete Refined 38-Page High-Quality Government Policy & Consulting Report Generator

const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const os = require('os');

const styles = require('./pages/styles');
const getCoverAndToc = require('./pages/cover_and_toc');
const getSection1 = require('./pages/sec1_executive_summary');
const getSection2 = require('./pages/sec2_macro_financing');
const getSection3 = require('./pages/sec3_master_states');
const getSection4 = require('./pages/sec4_state_archetypes');
const getSection5 = require('./pages/sec5_functional_spending');
const getSection6 = require('./pages/sec6_systemic_gaps');
const getSection7 = require('./pages/sec7_ecosystem_mapping');
const getSection8 = require('./pages/sec8_value_proposition');
const getSection9 = require('./pages/sec9_government_ask');
const getSection10 = require('./pages/sec10_policy_analysis');
const getSection11 = require('./pages/sec11_pilot_blueprint');
const getSection12 = require('./pages/sec12_scale_up_roadmap');
const getSection13 = require('./pages/sec13_decision_brief');
const getSection14 = require('./pages/sec14_proposal_culmination');
const getSection15 = require('./pages/sec15_statutory_sources');

function assembleHtml() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HealthSync: India Government Healthcare Funding, Expenditure & Digital Health Opportunity Report</title>
    <style>
        ${styles}
    </style>
</head>
<body>
    ${getCoverAndToc()}
    ${getSection1()}
    ${getSection2()}
    ${getSection3()}
    ${getSection4()}
    ${getSection5()}
    ${getSection6()}
    ${getSection7()}
    ${getSection8()}
    ${getSection9()}
    ${getSection10()}
    ${getSection11()}
    ${getSection12()}
    ${getSection13()}
    ${getSection14()}
    ${getSection15()}
</body>
</html>`;
}

async function runRefinedReportGeneration() {
    const outputPath = path.join(__dirname, '..', 'HealthSync_India_Government_Healthcare_Report.pdf');
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'healthsync_refined_'));

    console.log("Assembling Refined 38-Page Report HTML Template...");
    const html = assembleHtml();

    // Verify .pdf-page count in HTML
    const pageMatches = html.match(/class=['\"]pdf-page/g);
    console.log(`Number of .pdf-page sections in HTML: ${pageMatches ? pageMatches.length : 0}`);

    console.log("Launching Puppeteer with isolated user data directory...");
    const browser = await puppeteer.launch({
        headless: "new",
        userDataDir: tempDir,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-first-run",
            "--no-zygote"
        ]
    });

    const page = await browser.newPage();
    console.log("Loading HTML into Puppeteer...");
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const headerTemplate = `
        <div style="font-size: 8pt; width: 100%; display: flex; justify-content: space-between; padding: 0 14mm; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 2px;">
            <span style="font-weight: 600; color: #0f172a;">HealthSync</span>
            <span style="color: #64748b;">Government Healthcare Policy & Collaboration Proposal</span>
        </div>
    `;

    const footerTemplate = `
        <div style="font-size: 8pt; width: 100%; display: flex; justify-content: space-between; padding: 0 14mm; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-top: 1px solid #e2e8f0; padding-top: 4px;">
            <span style="color: #64748b;">Consultation Draft — Prepared for Government Review</span>
            <span style="font-weight: 600; color: #0284c7;">HealthSync</span>
            <span style="color: #64748b;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
    `;

    console.log("Rendering PDF with strict A4 margins and consulting layout...");
    await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: { top: '16mm', right: '14mm', bottom: '16mm', left: '14mm' },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate
    });

    await browser.close();
    fs.rmSync(tempDir, { recursive: true, force: true });

    // Validate page count and text integrity with pdfParse
    const finalBuffer = fs.readFileSync(outputPath);
    const finalParsed = await pdfParse(finalBuffer);

    console.log("\n========================================================");
    console.log("REFINED CONSULTING-GRADE PDF REPORT COMPLETE!");
    console.log(`Verified Total Pages in PDF: ${finalParsed.numpages}`);
    console.log(`Target Page Count: 38`);
    console.log(`Output File: ${outputPath}`);
    console.log(`File Size: ${(finalBuffer.length / 1024).toFixed(1)} KB`);
    console.log("========================================================\n");

    if (finalParsed.numpages !== 38) {
        console.warn(`WARNING: Page count mismatch! Expected 38, got ${finalParsed.numpages}`);
    }
}

runRefinedReportGeneration().catch(err => {
    console.error("FATAL Error:", err);
    process.exit(1);
});
