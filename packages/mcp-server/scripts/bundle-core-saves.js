/**
 * Bundles the real core block save functions Flexi slides are allowed to
 * contain. The bundle externalizes @wordpress/*, so it uses the same
 * block-editor copy as the GSlider blocks and does not load block-library
 * at runtime.
 */
import esbuild from 'esbuild';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryDir = path.dirname(require.resolve('@wordpress/block-library/package.json'));

const entry = `
  export { default as paragraph } from '${libraryDir}/src/paragraph/save.js';
  export { default as paragraphMeta } from '${libraryDir}/src/paragraph/block.json';
  export { default as heading } from '${libraryDir}/src/heading/save.js';
  export { default as headingMeta } from '${libraryDir}/src/heading/block.json';
  export { default as image } from '${libraryDir}/src/image/save.js';
  export { default as imageMeta } from '${libraryDir}/src/image/block.json';
  export { default as button } from '${libraryDir}/src/button/save.js';
  export { default as buttonMeta } from '${libraryDir}/src/button/block.json';
  export { default as buttons } from '${libraryDir}/src/buttons/save.js';
  export { default as buttonsMeta } from '${libraryDir}/src/buttons/block.json';
`;

const result = await esbuild.build({
  stdin: { contents: entry, resolveDir: packageDir, sourcefile: 'core-saves-entry.js', loader: 'js' },
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'node',
  loader: { '.js': 'jsx' },
  jsx: 'automatic',
  jsxImportSource: 'react',
  external: ['@wordpress/*', 'react', 'react/*'],
  logLevel: 'silent',
});

const outDir = path.join(packageDir, 'dist/core');
await import('fs').then((fs) => {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'core-saves.cjs'), result.outputFiles[0].text);
});
console.error(`bundled core saves: ${result.outputFiles[0].text.length} bytes`);
