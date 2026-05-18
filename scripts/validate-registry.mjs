import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const schema = JSON.parse(
  readFileSync(join(root, 'data', 'games.registry.schema.json'), 'utf8'),
);
const registry = JSON.parse(
  readFileSync(join(root, 'data', 'games.registry.json'), 'utf8'),
);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

if (!validate(registry)) {
  console.error('Registry validation failed:');
  console.error(validate.errors);
  process.exit(1);
}

const slugs = new Set();
for (const game of registry) {
  if (slugs.has(game.slug)) {
    console.error(`Duplicate slug: ${game.slug}`);
    process.exit(1);
  }
  slugs.add(game.slug);

  if (!game.embed.url.includes('gamejam.alpegames.cl')) {
    console.warn(`Warning: ${game.slug} embed URL is not on gamejam.alpegames.cl`);
  }
}

console.log(`Registry OK (${registry.length} game(s)).`);
