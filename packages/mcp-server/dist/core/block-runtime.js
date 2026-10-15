import { createRequire } from 'module';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getBlockSchema } from './registry.js';
const require = createRequire(import.meta.url);
let domReady = false;
/**
 * @wordpress/block-editor reads `window` as soon as it loads. The block
 * bundles require it, so the window has to exist before the first require.
 */
export function ensureDom() {
    if (domReady) {
        return;
    }
    const { JSDOM, VirtualConsole } = require('jsdom');
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('jsdomError', () => { });
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {
        url: 'http://localhost/',
        virtualConsole,
    });
    const target = globalThis;
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
    target.requestAnimationFrame = (callback) => setTimeout(callback, 0);
    const matchMedia = () => ({
        matches: false,
        addListener() { },
        removeListener() { },
        addEventListener() { },
        removeEventListener() { },
    });
    target.matchMedia = matchMedia;
    dom.window.matchMedia = matchMedia;
    const store = new Map();
    target.localStorage = {
        getItem: (key) => store.get(key) ?? null,
        setItem: (key, value) => store.set(key, String(value)),
        removeItem: (key) => store.delete(key),
    };
    target.__ = (text) => text;
    domReady = true;
}
const loaded = new Map();
export function loadBundledBlock(slug) {
    const cached = loaded.get(slug);
    if (cached) {
        return cached;
    }
    ensureDom();
    const file = fileURLToPath(new URL(`../blocks/${slug}.cjs`, import.meta.url));
    if (!fs.existsSync(file)) {
        throw new Error(`Block bundle missing for "${slug}". Run "npm run build" in packages/mcp-server.`);
    }
    const mod = require(file);
    loaded.set(slug, mod);
    return mod;
}
export function attributeDefaults(attributes) {
    const defaults = {};
    for (const [key, definition] of Object.entries(attributes)) {
        if (definition && typeof definition === 'object' && 'default' in definition) {
            defaults[key] = definition.default;
        }
    }
    return defaults;
}
let blocksApi = null;
const registered = new Set();
let coreBlocksReady = false;
/**
 * Registers the core blocks a Flexi slide may contain, using the save
 * functions bundled from @wordpress/block-library. Only those saves are
 * loaded, so the server does not start the whole block library.
 */
export function registerCoreBlocksOnce() {
    if (coreBlocksReady) {
        return;
    }
    ensureDom();
    const saves = require('./core-saves.cjs');
    const blocks = wordpressBlocks();
    for (const name of ['paragraph', 'heading', 'image', 'button', 'buttons']) {
        const meta = saves[`${name}Meta`];
        if (!registered.has(meta.name)) {
            blocks.registerBlockType(meta.name, {
                ...saves[`${name}Meta`],
                save: saves[name],
                edit: () => null,
            });
            registered.add(meta.name);
        }
    }
    coreBlocksReady = true;
}
export function wordpressBlocks() {
    ensureDom();
    if (!blocksApi) {
        blocksApi = require('@wordpress/blocks');
    }
    return blocksApi;
}
/**
 * Registers the block with its real attributes, save, and deprecated, once.
 */
export function prepareBlock(slug) {
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
export function validationOf(raw) {
    if (Array.isArray(raw)) {
        return { isValid: Boolean(raw[0]), issues: Array.isArray(raw[1]) ? raw[1] : [] };
    }
    if (raw && typeof raw === 'object') {
        const record = raw;
        return {
            isValid: Boolean(record.isValid),
            issues: record.validationIssues ?? record.issues ?? [],
        };
    }
    return { isValid: false, issues: [raw] };
}
//# sourceMappingURL=block-runtime.js.map