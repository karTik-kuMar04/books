import fs from 'node:fs';
import path from 'node:path';

const HEX_REGEX = /#[0-9a-fA-F]{3,8}\b/;
const SRC_DIR = path.resolve(process.cwd(), 'src');

function scanDirectory(dir) {
  let violations = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      violations = violations.concat(scanDirectory(fullPath));
    } else if (
      (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) &&
      !entry.name.endsWith('.test.ts') &&
      !entry.name.endsWith('.test.tsx')
    ) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (HEX_REGEX.test(line)) {
          violations.push(`${fullPath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }

  return violations;
}

const violations = scanDirectory(SRC_DIR);
if (violations.length > 0) {
  console.error('\x1b[31mError: Found hard-coded hex colors in source files:\x1b[0m');
  violations.forEach((v) => console.error(`  ${v}`));
  console.error('\x1b[33mUse a colour token, not a hex value.\x1b[0m');
  process.exit(1);
} else {
  console.log('Hex color check passed.');
}
