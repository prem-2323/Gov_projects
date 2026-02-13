const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'mobile', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// A minimal 1x1 transparent PNG
const minimalPng = Buffer.from('89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D494441541857636060604860000003020101732C712B0000000049454E44AE426082', 'hex');

const files = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];

files.forEach(file => {
    const filePath = path.join(assetsDir, file);
    fs.writeFileSync(filePath, minimalPng);
    console.log(`Created ${file}`);
});
