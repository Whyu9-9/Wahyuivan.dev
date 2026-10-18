// Bakes the rendered home page and its CSS into dist/index.html so first paint needs only the HTML.
import { readFile, writeFile, rm } from 'node:fs/promises';

const { render } = await import('../dist-ssr/entry-server.js');
const dist = new URL('../dist/', import.meta.url);
const file = new URL('index.html', dist);
let html = await readFile(file, 'utf8');

const marker = '<div id="app"></div>';
if (!html.includes(marker)) throw new Error(`${marker} not found in dist/index.html`);
html = html.replace(marker, `<div id="app">${await render('/')}</div>`);

const stylesheet = /<link rel="stylesheet" crossorigin href="\/(assets\/[^"]+\.css)">/;
const [link, href] = html.match(stylesheet) ?? [];
if (!link) throw new Error('Built stylesheet link not found in dist/index.html');
const css = await readFile(new URL(href, dist), 'utf8');
html = html.replace(link, () => `<style>${css}</style>`);

await writeFile(file, html);
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
