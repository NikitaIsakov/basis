import { build } from 'esbuild';
import { mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = mkdtempSync(join(tmpdir(), 'edmarket-sync-'));
const outfile = join(outDir, 'mockData.mjs');

await build({
  entryPoints: [join(root, 'src/shared/lib/mockData.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
  alias: {
    '@': join(root, 'src'),
  },
});

const { mockCourses, mockLessons, mockUsers, mockAuthors, mockFeedback } = await import(
  `${pathToFileURL(outfile).href}?t=${Date.now()}`
);

writeFileSync(
  join(root, 'db.json'),
  `${JSON.stringify({ courses: mockCourses, lessons: mockLessons, users: mockUsers, authors: mockAuthors, feedback: mockFeedback }, null, 2)}\n`,
);

console.log(
  `db.json synced: ${mockCourses.length} courses, ${mockLessons.length} lessons, ${mockUsers.length} users, ${mockAuthors.length} authors, ${mockFeedback.length} feedback`,
);
