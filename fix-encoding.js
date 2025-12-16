const fs = require('fs');

// Read the file
const filePath = 'd:\\Antigravity\\OBSOLIO-FE\\src\\translations\\index.js';
let content = fs.readFileSync(filePath, 'utf8');

// Define replacements - these are the mojibake patterns that need to be fixed
const replacements = [
    // Register button
    ["startFreeTrial: 'Ø¬Ø±Ù'Ø¨ Ù…Ø¬Ø§Ù†Ø§Ù‹'", "startFreeTrial: 'جرّب مجاناً'"],
    // Book demo in hero section  
    ["bookDemo: 'Ø§Ø­Ø¬Ø² Ø¬Ù„Ø³Ø© Ø¹Ø±Ø¶ ØªØ¬Ø±ÙŠØ¨ÙŠ'", "bookDemo: 'احجز جلسة عرض تجريبي'"],
];

// Apply replacements
replacements.forEach(([oldText, newText]) => {
    if (content.includes(oldText)) {
        content = content.replace(oldText, newText);
        console.log(`✓ Fixed: ${oldText.substring(0, 30)}...`);
    } else {
        console.log(`✗ Not found: ${oldText.substring(0, 30)}...`);
    }
});

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('\nEncoding fixes applied!');
