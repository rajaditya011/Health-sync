// Shared Consulting-Grade CSS Styles for the HealthSync Government Report

module.exports = `
@page {
    size: A4 portrait;
    margin: 16mm 14mm 16mm 14mm;
}

* {
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    line-height: 1.55;
    font-size: 10.5pt;
    background: #ffffff;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}

.pdf-page {
    box-sizing: border-box;
    height: 265mm;
    max-height: 265mm;
    overflow: hidden;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    padding-bottom: 2mm;
}

h1 {
    font-size: 20pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 10px 0;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 5px;
    letter-spacing: -0.02em;
}

h2 {
    font-size: 15.5pt;
    font-weight: 700;
    color: #0f172a;
    margin: 12px 0 8px 0;
    letter-spacing: -0.01em;
}

h3 {
    font-size: 12.5pt;
    font-weight: 600;
    color: #1e293b;
    margin: 10px 0 6px 0;
}

p {
    margin: 0 0 9px 0;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #334155;
}

ul, ol {
    margin: 0 0 10px 0;
    padding-left: 20px;
}

li {
    margin-bottom: 6px;
    font-size: 10pt;
    line-height: 1.5;
    color: #334155;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 9pt;
    line-height: 1.35;
}

th {
    background: #0f172a;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 7px 8px;
    font-size: 8.8pt;
    border: 1px solid #1e293b;
}

td {
    padding: 6.5px 8px;
    border: 1px solid #e2e8f0;
    color: #1e293b;
    vertical-align: top;
    font-size: 8.8pt;
}

tr:nth-child(even) td {
    background: #f8fafc;
}

.metric-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 12px 0;
}

.metric-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 12px;
    border-left: 4px solid #0284c7;
}

.metric-val {
    font-size: 18pt;
    font-weight: 800;
    color: #0284c7;
    line-height: 1.15;
}

.metric-sub {
    font-size: 8.2pt;
    color: #64748b;
    margin-top: 3px;
    line-height: 1.25;
}

.callout {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-left: 4px solid #0284c7;
    padding: 10px 14px;
    border-radius: 6px;
    margin: 10px 0;
}

.callout-amber {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-left: 4px solid #d97706;
    padding: 10px 14px;
    border-radius: 6px;
    margin: 10px 0;
}

.callout-emerald {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-left: 4px solid #16a34a;
    padding: 10px 14px;
    border-radius: 6px;
    margin: 10px 0;
}

.source-box {
    margin-top: 8px;
    font-size: 8.2pt;
    color: #64748b;
    border-top: 1px dashed #cbd5e1;
    padding-top: 4px;
    line-height: 1.3;
}

.badge {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 7.8pt;
    font-weight: 700;
    text-transform: uppercase;
}

.badge-blue { background: #e0f2fe; color: #0369a1; }
.badge-emerald { background: #dcfce7; color: #15803d; }
.badge-amber { background: #fef3c7; color: #b45309; }

.chart-box {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 16px;
    background: #f8fafc;
    margin: 10px 0;
}

.chart-title {
    font-weight: 700;
    font-size: 11pt;
    color: #0f172a;
    margin-bottom: 2px;
}

.chart-meta {
    font-size: 8pt;
    color: #64748b;
    margin-bottom: 10px;
}

.bar-group {
    margin-bottom: 8px;
}

.bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 8.5pt;
    font-weight: 600;
    margin-bottom: 3px;
    color: #334155;
}

.bar-track {
    background: #e2e8f0;
    border-radius: 4px;
    height: 12px;
    overflow: hidden;
}

.bar-fill-blue { background: #0284c7; height: 100%; border-radius: 4px; }
.bar-fill-emerald { background: #10b981; height: 100%; border-radius: 4px; }
.bar-fill-indigo { background: #6366f1; height: 100%; border-radius: 4px; }
.bar-fill-amber { background: #f59e0b; height: 100%; border-radius: 4px; }
.bar-fill-rose { background: #f43f5e; height: 100%; border-radius: 4px; }
`;
