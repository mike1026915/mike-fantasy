// Fails when src/data/profile.json changed in a way that affects the resume PDF
// but public/Mike-Fang-Resume.pdf was not regenerated (npm run resume:pdf).
// The fingerprint must match fingerprint() in generate-resume-pdf.py.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const PDF_FIELDS = ['name', 'chineseName', 'title', 'summary', 'experience', 'education', 'skills'];

const sortKeys = (value) => {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortKeys(value[key])]),
    );
  }
  return value;
};

const profile = JSON.parse(
  readFileSync(new URL('../src/data/profile.json', import.meta.url), 'utf8'),
);
const subset = Object.fromEntries(PDF_FIELDS.map((key) => [key, profile[key]]));
subset.contacts = {
  location: profile.contacts.location.text,
  linkedin: profile.contacts.linkedin.link,
};

const actual = createHash('sha256')
  .update(JSON.stringify(sortKeys(subset)))
  .digest('hex');
const expected = readFileSync(new URL('./resume-pdf.sha256', import.meta.url), 'utf8').trim();

if (actual !== expected) {
  console.error(
    'public/Mike-Fang-Resume.pdf is out of date with src/data/profile.json.\n' +
      'Run `npm run resume:pdf` (see README) and commit the result.',
  );
  process.exit(1);
}
console.log('Resume PDF is up to date.');
