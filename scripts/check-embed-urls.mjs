import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const games = JSON.parse(
  readFileSync(join(root, 'data', 'games.registry.json'), 'utf8'),
);

const warnings = [];

for (const game of games) {
  if (game.embed.type !== 'iframe' && game.embed.type !== 'self') continue;
  try {
    const res = await fetch(game.embed.url, { method: 'HEAD', redirect: 'follow' });
    if (!res.ok) {
      warnings.push(`${game.slug}: ${res.status} ${game.embed.url}`);
    }
  } catch {
    warnings.push(`${game.slug}: unreachable ${game.embed.url}`);
  }
}

if (warnings.length) {
  console.warn('Embed URL warnings (game may not be deployed yet):');
  warnings.forEach((w) => console.warn(w));
} else {
  console.log('All embed URLs responded OK.');
}
