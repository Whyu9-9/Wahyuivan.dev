import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

// ── robots.txt ──────────────────────────────────────────────────────────────

test('robots.txt declares Content-Signal preferences', async () => {
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')
  assert.match(robots, /^Content-Signal:\s+ai-train=no,\s+search=yes,\s+ai-input=no$/m)
})

// ── OAuth stubs ──────────────────────────────────────────────────────────────

test('openid-configuration is valid JSON with issuer field', async () => {
  const raw = await readFile(
    new URL('../public/.well-known/openid-configuration', import.meta.url),
    'utf8',
  )
  const doc = JSON.parse(raw)
  assert.equal(doc.issuer, 'https://wahyuivan.dev')
  assert.ok(Array.isArray(doc.grant_types_supported))
  assert.ok(Array.isArray(doc.scopes_supported))
})

test('oauth-protected-resource is valid JSON with resource field', async () => {
  const raw = await readFile(
    new URL('../public/.well-known/oauth-protected-resource', import.meta.url),
    'utf8',
  )
  const doc = JSON.parse(raw)
  assert.equal(doc.resource, 'https://wahyuivan.dev')
  assert.ok(Array.isArray(doc.authorization_servers))
  assert.ok(Array.isArray(doc.scopes_supported))
})

// ── MCP server card ──────────────────────────────────────────────────────────

test('MCP server card has serverInfo name and version', async () => {
  const raw = await readFile(
    new URL('../public/.well-known/mcp/server-card.json', import.meta.url),
    'utf8',
  )
  const doc = JSON.parse(raw)
  assert.ok(doc.serverInfo)
  assert.equal(typeof doc.serverInfo.name, 'string')
  assert.equal(typeof doc.serverInfo.version, 'string')
})

// ── Agent Skills index ───────────────────────────────────────────────────────

test('agent-skills index has $schema and skills array', async () => {
  const raw = await readFile(
    new URL('../public/.well-known/agent-skills/index.json', import.meta.url),
    'utf8',
  )
  const doc = JSON.parse(raw)
  assert.equal(typeof doc.$schema, 'string')
  assert.ok(Array.isArray(doc.skills))
})

// ── auth.md ──────────────────────────────────────────────────────────────────

test('auth.md declares no authentication required', async () => {
  const content = await readFile(new URL('../public/auth.md', import.meta.url), 'utf8')
  assert.match(content, /no authentication required/i)
  assert.match(content, /wahyuivan\.dev/)
})

// ── index.md ─────────────────────────────────────────────────────────────────

test('index.md is a markdown portfolio summary with name and links', async () => {
  const content = await readFile(new URL('../public/index.md', import.meta.url), 'utf8')
  assert.match(content, /Wahyu Ivan/)
  assert.match(content, /Software Engineer/)
  assert.match(content, /github\.com/)
  assert.match(content, /linkedin\.com/)
})

// ── llms.txt ─────────────────────────────────────────────────────────────────

test('llms.txt follows the llms.txt convention with title, summary, and links', async () => {
  const content = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8')
  assert.match(content, /^# Wahyu Ivan/m)
  assert.match(content, /^>\s+.+/m)
  assert.match(content, /## Docs/)
  assert.match(content, /\[.+\]\(https:\/\/wahyuivan\.dev\/index\.md\)/)
  assert.match(content, /github\.com/)
  assert.match(content, /linkedin\.com/)
})

// ── WebMCP ───────────────────────────────────────────────────────────────────

test('index.html includes WebMCP provideContext script', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /navigator\.modelContext/)
  assert.match(html, /provideContext/)
  assert.match(html, /get_portfolio_info/)
})

// ── headers ──────────────────────────────────────────────────────────────────

test('_headers serves text/markdown for /index.md', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')
  assert.match(headers, /^\/index\.md\n/m)
  assert.match(headers, /Content-Type: text\/markdown; charset=utf-8/)
})

test('_headers serves text/markdown for /auth.md', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')
  assert.match(headers, /^\/auth\.md\n/m)
})

test('_headers serves application/json for /.well-known/mcp/server-card.json', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')
  assert.match(headers, /\/\.well-known\/mcp\/server-card\.json/)
  assert.match(headers, /Content-Type: application\/json; charset=utf-8/)
})

test('vercel.json includes Content-Type for /index.md', async () => {
  const config = JSON.parse(
    await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
  )
  const entry = config.headers.find((h) => h.source === '/index.md')
  assert.ok(entry)
  assert.deepEqual(entry.headers, [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }])
})

test('_headers serves text/plain for /llms.txt', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')
  assert.match(headers, /^\/llms\.txt\n/m)
  assert.match(headers, /Content-Type: text\/plain; charset=utf-8/)
})

test('vercel.json includes Content-Type for /llms.txt', async () => {
  const config = JSON.parse(
    await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
  )
  const entry = config.headers.find((h) => h.source === '/llms.txt')
  assert.ok(entry)
  assert.deepEqual(entry.headers, [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }])
})
