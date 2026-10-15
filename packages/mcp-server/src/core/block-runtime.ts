import { createRequire } from 'module';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getBlockSchema, type BlockDetail } from './registry.js';

const require = createRequire(import.meta.url);

export interface BundledBlock {
  meta: { name: string; title?: string; [key: string]: unknown };
  attributes: Record<string, { type?: string; default?: unknown }>;
  save: (props: { attributes: Record<string, unknown> }) => unknown;
  styling: (attributes: Record<string, unknown>) => string;
  deprecated: unknown[];
}

interface BlocksApi {
  registerBlockType: (name: string, settings: Record<string, unknown>) => unknown;
  createBlock: (name: string, attributes: Record<string, unknown>) => unknown;
  serialize: (blocks: unknown[]) => string;
  parse: (markup: string) => Array<{ name: string; attributes: Record<string, unknown> }>;
  validateBlock: (block: unknown) => unknown;
}

let domReady = false;

/**
 * @wordpress/block-editor reads `window` as soon as it loads. The block
 * bundles require it, so the window has to exist before the first require.
 */
export function ensureDom(): void {
  if (domReady) {
    return;
  }
  const { JSDOM, VirtualConsole } = require('jsdom') as {
    JSDOM: new (html: string, options: unknown) => { window: Record<string, unknown> };
    VirtualConsole: new () => { on: (event: string, listener: () => void) => void };
  };
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', () => {});
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
    virtualConsole,
  });
  const target = globalThis as Record<string, unknown>;
  for (const key of [
    'window',
    'document',
    'navigator',
    'Node',
    'HTMLElement',
    'Element',
    'DOMParser',
    'MutationObserver',
    'getComputedStyle',
    'CustomEvent',
    'Event',
  ]) {
    if (!(key in globalThis)) {
      target[key] = key === 'window' ? dom.window : dom.window[key];
    }
  }
  target.requestAnimationFrame = (callback: () => void) => setTimeout(callback, 0);
  const matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
  target.matchMedia = matchMedia;
  dom.window.matchMedia = matchMedia;
  const store = new Map<string, string>();
  target.localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, String(value)),
    removeItem: (key: string) => store.delete(key),
  };
  target.__ = (text: unknown) => text;
  domReady = true;
}

const loaded = new Map<string, BundledBlock>();

export function loadBundledBlock(slug: string): BundledBlock {
  const cached = loaded.get(slug);
  if (cached) {
    return cached;
  }
  ensureDom();
  const file = fileURLToPath(new URL(`../blocks/${slug}.cjs`, import.meta.url));
  if (!fs.existsSync(file)) {
    throw new Error(
      `Block bundle missing for "${slug}". Run "npm run build" in packages/mcp-server.`
    );
  }
  const mod = require(file) as BundledBlock;
  loaded.set(slug, mod);
  return mod;
}

export function attributeDefaults(
  attributes: BundledBlock['attributes']
): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const [key, definition] of Object.entries(attributes)) {
    if (definition && typeof definition === 'object' && 'default' in definition) {
      defaults[key] = definition.default;
    }
  }
  return defaults;
}

let blocksApi: BlocksApi | null = null;
const registered = new Set<string>();

export function wordpressBlocks(): BlocksApi {
  ensureDom();
  if (!blocksApi) {
    blocksApi = require('@wordpress/blocks') as BlocksApi;
  }
  return blocksApi;
}

/**
 * Registers the block with its real attributes, save, and deprecated, once.
 */
export function prepareBlock(slug: string): {
  blocks: BlocksApi;
  bundled: BundledBlock;
  schema: BlockDetail;
} {
  const bundled = loadBundledBlock(slug);
  const schema = getBlockSchema(slug);
  const blocks = wordpressBlocks();
  if (!registered.has(schema.name)) {
    blocks.registerBlockType(schema.name, {
      ...bundled.meta,
      attributes: bundled.attributes,
      save: bundled.save,
      deprecated: bundled.deprecated ?? [],
      edit: () => null,
    });
    registered.add(schema.name);
  }
  return { blocks, bundled, schema };
}

export function validationOf(raw: unknown): { isValid: boolean; issues: unknown[] } {
  if (Array.isArray(raw)) {
    return { isValid: Boolean(raw[0]), issues: Array.isArray(raw[1]) ? raw[1] : [] };
  }
  if (raw && typeof raw === 'object') {
    const record = raw as { isValid?: boolean; validationIssues?: unknown[]; issues?: unknown[] };
    return {
      isValid: Boolean(record.isValid),
      issues: record.validationIssues ?? record.issues ?? [],
    };
  }
  return { isValid: false, issues: [raw] };
}
