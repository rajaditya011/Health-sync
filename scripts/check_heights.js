const puppeteer = require('puppeteer');
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
    <style>${styles}</style>
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

async function checkPageHeights() {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'height_check_'));
    const browser = await puppeteer.launch({
        headless: "new",
        userDataDir: tempDir,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 }); // A4 at 96 DPI
    await page.setContent(assembleHtml(), { waitUntil: 'networkidle0' });

    const pageHeights = await page.evaluate(() => {
        const pages = document.querySelectorAll('.pdf-page');
        return Array.from(pages).map((p, idx) => ({
            pageIndex: idx + 1,
            clientHeight: p.clientHeight,
            scrollHeight: p.scrollHeight,
            overflows: p.scrollHeight > p.clientHeight + 2
        }));
    });

    await browser.close();
    fs.rmSync(tempDir, { recursive: true, force: true });

    console.log("=== PAGE HEIGHT & OVERFLOW AUDIT ===");
    let overflowCount = 0;
    pageHeights.forEach(p => {
        if (p.overflows) {
            console.log(`[OVERFLOW] Page ${p.pageIndex}: scrollHeight ${p.scrollHeight}px > clientHeight ${p.clientHeight}px (Exceeded by ${p.scrollHeight - p.clientHeight}px)`);
            overflowCount++;
        }
    });

    if (overflowCount === 0) {
        console.log("PERFECT: All 38 pages fit within A4 height without any overflow!");
    } else {
        console.log(`TOTAL OVERFLOWING PAGES: ${overflowCount}`);
    }
}

checkPageHeights().catch(console.error);
