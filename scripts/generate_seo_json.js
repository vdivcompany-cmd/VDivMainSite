const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'vdiv_arabic_keywords_expanded.csv');
const outDir = path.join(__dirname, '..', 'data');
const outPath = path.join(outDir, 'seoPages.json');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const content = fs.readFileSync(csvPath, 'utf-8');
const lines = content.split('\n');

const headers = lines[0].split(',').map(h => h.trim());
const data = {};

// Helper to parse CSV line respecting quotes
function parseCSVLine(text) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') {
            inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
            result.push(cur);
            cur = '';
        } else {
            cur += c;
        }
    }
    result.push(cur);
    return result;
}

for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const row = parseCSVLine(lines[i]);
    const record = {};
    
    for (let j = 0; j < headers.length; j++) {
        let val = row[j] || '';
        // Unescape double quotes
        val = val.replace(/""/g, '"');
        record[headers[j]] = val.trim();
    }
    
    const slug = record['suggestedURLSlug'];
    if (slug) {
        data[slug] = record;
    }
}

fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Generated JSON with ${Object.keys(data).length} entries at ${outPath}`);
