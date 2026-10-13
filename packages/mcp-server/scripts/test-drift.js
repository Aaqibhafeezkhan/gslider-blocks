import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
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

    const liveKeys = Object.keys(liveAttrs);
    const cachedKeys = Object.keys(cachedBlock.attributes || {});

    if (liveKeys.length !== cachedKeys.length) {
      console.error(
        `FAIL: Drift detected in "${slug}". Live attributes count: ${liveKeys.length}, Cached: ${cachedKeys.length}`
      );
      hasDrift = true;
      continue;
    }

    for (const key of liveKeys) {
      if (!(key in cachedBlock.attributes)) {
        console.error(`FAIL: Attribute "${key}" in "${slug}" missing from schema file.`);
        hasDrift = true;
      }
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
