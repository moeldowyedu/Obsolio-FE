import { readFileSync, writeFileSync } from 'fs';

// Read the file
const filePath = 'd:\\\\Antigravity\\\\OBSOLIO-FE\\\\src\\\\translations\\\\index.js';
let content = readFileSync(filePath, 'utf8');

// Use regex to find and replace the mojibake patterns
// This will match startFreeTrial followed by any non-ASCII characters
content = content.replace(
    /startFreeTrial:\s*'[^']*Ø[^']*'/g,
    "startFreeTrial: 'جرّب مجاناً'"
);

content = content.replace(
    /bookDemo:\s*'[^']*Ø§Ø­[^']*'/g,
    "bookDemo: 'احجز جلسة عرض تجريبي'"
);

// Write back
writeFileSync(filePath, content, 'utf8');
console.log('Encoding fixes applied successfully!');
