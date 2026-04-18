const fs = require('fs');
const path = require('path');

const REPLACEMENTS = [
  { p: /#0A0A0A/gi, r: 'var(--color-bg)' },
  { p: /#111111/gi, r: 'var(--color-surface)' },
  { p: /#1A1A1A/gi, r: 'var(--color-border)' },
  { p: /#F5F5F0/gi, r: 'var(--color-text)' },
  { p: /#888888/gi, r: 'var(--color-muted)' },
  { p: /#AFA9EC/gi, r: 'var(--color-accent)' },
  { p: /#1D9E75/gi, r: 'var(--color-success)' },
  { p: /#FF4F4F/gi, r: 'var(--color-error)' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const pair of REPLACEMENTS) {
        content = content.replace(pair.p, pair.r);
      }
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

try {
  processDirectory(path.join(__dirname, 'src'));
  console.log('Color replacement audit completed successfully.');
} catch (e) {
  console.error(e);
}
