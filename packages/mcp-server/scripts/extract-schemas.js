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
  if (!fs.existsSync(attrPath)) {
    throw new Error(`Attributes file not found for slug: ${slug} at ${attrPath}`);
  }

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

async function extractBlockJson(slug) {
  const jsonPath = path.resolve(rootDir, 'src/blocks', slug, 'block.json');
  if (!fs.existsSync(jsonPath)) {
    return { name: `gslider-blocks/${slug}`, title: slug };
  }
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

async function extractPresets(slug) {
  const presetPath = path.resolve(rootDir, 'src/blocks', slug, 'preset.js');
  if (!fs.existsSync(presetPath)) {
    return [];
  }

  const result = await esbuild.build({
    entryPoints: [presetPath],
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
  fn({ createElement: () => null }, mod, mod.exports, () => ({
    __: (s) => (typeof s === 'string' ? s : ''),
    Dashicon: () => null
  }));

  return Object.keys(mod.exports.presetStyles || {});
}

async function extractConstants() {
  const constantsPath = path.resolve(rootDir, 'src/constants/index.js');
  const result = await esbuild.build({
    entryPoints: [constantsPath],
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
  fn({ createElement: () => null }, mod, mod.exports, () => ({
    __: (s) => (typeof s === 'string' ? s : ''),
    Dashicon: () => null
  }));

  const c = mod.exports;
  return {
    sliderEffects: (c.SLIDER_EFFECT_OPTIONS || []).map((o) => o.value),
    carouselEffects: (c.CAROUSEL_EFFECT_OPTIONS || []).map((o) => o.value),
    sliderTypes: (c.SLIDER_TYPE || []).map((o) => o.value),
    paginationTypes: (c.PAGINATION_TYPE || []).map((o) => o.value),
  };
}

async function generate() {
  const constants = await extractConstants();

  const slideFields = {
    'image-slider': 'images',
    'logo-carousel': 'logos',
    'testimonial': 'sliderItems',
    'base': 'sliderItems',
    'flexi-content': 'innerBlocks'
  };

  const srcSchemasDir = path.resolve(__dirname, '../src/core/schemas');
  const distSchemasDir = path.resolve(__dirname, '../dist/core/schemas');

  fs.mkdirSync(srcSchemasDir, { recursive: true });
  fs.mkdirSync(distSchemasDir, { recursive: true });

  for (const slug of BLOCK_SLUGS) {
    const rawAttrs = await extractBlockAttributes(slug);
    const blockJson = await extractBlockJson(slug);
    const presets = await extractPresets(slug);

    const hasSliderType = slug in rawAttrs && 'sliderType' in rawAttrs;
    const allowedEffects = {
      carouselEffect: constants.carouselEffects,
    };
    if (hasSliderType || slug === 'base' || slug === 'testimonial' || slug === 'flexi-content') {
      allowedEffects.slideEffect = constants.sliderEffects;
      allowedEffects.sliderType = constants.sliderTypes;
    }

    const slideField = slideFields[slug];
    const slideAttr = rawAttrs[slideField];
    const slideItemSchema = slideAttr?.items || slideAttr?.default?.[0] || {};

    const blockData = {
      slug,
      name: blockJson.name || `gslider-blocks/${slug}`,
      title: blockJson.title || slug,
      description: blockJson.description || '',
      category: blockJson.category || 'gslider-blocks',
      slideField,
      presets,
      allowedEffects,
      totalAttributes: Object.keys(rawAttrs).length,
      slideItemSchema,
      attributes: rawAttrs
    };

    const outSrcFile = path.resolve(srcSchemasDir, `${slug}.json`);
    const outDistFile = path.resolve(distSchemasDir, `${slug}.json`);

    fs.writeFileSync(outSrcFile, JSON.stringify(blockData, null, 2), 'utf8');
    fs.writeFileSync(outDistFile, JSON.stringify(blockData, null, 2), 'utf8');

    console.log(`✅ Extracted block: ${slug} (${blockData.totalAttributes} attributes) -> schemas/${slug}.json`);
  }
}

generate().catch((err) => {
  console.error('Fatal error in schema extraction:', err);
  process.exit(1);
});
