import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { isDeepStrictEqual } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

const BLOCK_SLUGS = [
  'image-slider',
  'testimonial',
  'logo-carousel',
  'flexi-content',
  'base'
];

async function extractBlockAttributes(slug) {
  const attrPath = path.resolve(rootDir, 'src/blocks', slug, 'attributes.js');
  const result = await esbuild.build({
    entryPoints: [attrPath],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    loader: { '.js': 'jsx' },
    external: ['@wordpress/*']
  });

  const code = result.outputFiles[0].text;
  const mod = { exports: {} };
  const fn = new Function('React', 'module', 'exports', 'require', code);
  fn({ createElement: () => null }, mod, mod.exports, (id) => {
    if (id.startsWith('@wordpress/')) return { __: (s) => (typeof s === 'string' ? s : '') };
    return {};
  });

  return mod.exports.default || mod.exports;
}

export function isEmptySlideItemSchema(schema) {
  if (schema == null) return true;
  if (typeof schema === 'string') return schema.trim() === '';
  if (Array.isArray(schema)) return schema.length === 0;
  if (typeof schema === 'object') return Object.keys(schema).length === 0;
  return false;
}

export function slideSchemaProblems(slug, block) {
  const problems = [];
  if (block?.slideField === 'innerBlocks') {
    problems.push(`"${slug}" slideField is "innerBlocks"`);
  }
  if (isEmptySlideItemSchema(block?.slideItemSchema)) {
    problems.push(`"${slug}" slideItemSchema is empty`);
  }
  if (slug === 'flexi-content') {
    const described = JSON.stringify(block?.slideItemSchema ?? null);
    if (!described.includes('gslider-blocks/flexi-content-item')) {
      problems.push(`"${slug}" slideItemSchema does not name gslider-blocks/flexi-content-item`);
    }
    if (!described.includes('nested blocks')) {
      problems.push(`"${slug}" slideItemSchema does not say its content is nested blocks`);
    }
    if (Object.prototype.hasOwnProperty.call(block?.attributes || {}, 'innerBlocks')) {
      problems.push(`"${slug}" attributes include "innerBlocks"`);
    }
  }
  return problems;
}

export function attributeDriftProblems(slug, liveAttrs, cachedAttrs) {
  const problems = [];
  // Round-trip through JSON so live definitions compare like the written schema.
  const live = JSON.parse(JSON.stringify(liveAttrs || {}));
  const cached = cachedAttrs || {};

  for (const key of Object.keys(live)) {
    if (!Object.prototype.hasOwnProperty.call(cached, key)) {
      problems.push(`Attribute "${key}" in "${slug}" is missing from the schema file.`);
      continue;
    }
    for (const field of new Set([...Object.keys(live[key] || {}), ...Object.keys(cached[key] || {})])) {
      if (!isDeepStrictEqual(live[key]?.[field], cached[key]?.[field])) {
        problems.push(
          `Attribute "${key}" in "${slug}" has a different "${field}". Live: ${JSON.stringify(live[key]?.[field])}, schema: ${JSON.stringify(cached[key]?.[field])}.`
        );
      }
    }
  }

  for (const key of Object.keys(cached)) {
    if (!Object.prototype.hasOwnProperty.call(live, key)) {
      problems.push(`Attribute "${key}" in "${slug}" is in the schema file but not in attributes.js.`);
    }
  }

  return problems;
}

async function runDriftCheck() {
  const schemasDir = path.resolve(__dirname, '../src/core/schemas');
  let hasDrift = false;

  for (const slug of BLOCK_SLUGS) {
    const schemaFile = path.resolve(schemasDir, `${slug}.json`);
    if (!fs.existsSync(schemaFile)) {
      console.error(`FAIL: Schema file missing: schemas/${slug}.json. Run "npm run generate-schemas" first.`);
      hasDrift = true;
      continue;
    }

    const cachedBlock = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
    for (const problem of slideSchemaProblems(slug, cachedBlock)) {
      console.error(`FAIL: ${problem}.`);
      hasDrift = true;
    }

    const liveAttrs = await extractBlockAttributes(slug);

    for (const problem of attributeDriftProblems(slug, liveAttrs, cachedBlock.attributes)) {
      console.error(`FAIL: ${problem}`);
      hasDrift = true;
    }
  }

  if (hasDrift) {
    console.error('❌ Schema drift detected! Run "npm run generate-schemas" to re-sync.');
    process.exit(1);
  }

  console.log('✅ PASS: Zero schema drift. All 5 individual block schemas match source code 1:1.');
}

runDriftCheck().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
