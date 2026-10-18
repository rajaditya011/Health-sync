const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

async function debugPdf() {
    const pdfPath = path.join(__dirname, '..', 'HealthSync_India_Government_Healthcare_Report.pdf');
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(buffer);

    console.log("=== FIRST 1000 CHARACTERS OF PDF ===");
    console.log(data.text.slice(0, 1000));

    console.log("\n=== SEARCHING FOR DPDP ===");
    const dpdpMatches = data.text.match(/HealthSync should be designed/i);
    console.log("HealthSync should be designed match:", dpdpMatches);

    console.log("\n=== SEARCHING FOR WHAT HEALTHSYNC IS ASKING ===");
    const askMatches = data.text.match(/WHAT HEALTHSYNC IS ASKING/i);
    console.log("WHAT HEALTHSYNC IS ASKING match:", askMatches);

    console.log("\n=== SEARCHING FOR 145 Lakh / 145.00 Lakh ===");
    const lakhMatches = data.text.match(/145/g);
    console.log("145 count in PDF:", lakhMatches ? lakhMatches.length : 0);

    console.log("\n=== SEARCHING FOR Major Spending Areas ===");
    const spendingMatches = data.text.match(/Major Spending/i);
    console.log("Major Spending match:", spendingMatches);
}

debugPdf().catch(console.error);
