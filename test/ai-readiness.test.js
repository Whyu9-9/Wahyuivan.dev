import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
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

test('agent-skills index lists at least one skill with required fields', async () => {
  const raw = await readFile(
    new URL('../public/.well-known/agent-skills/index.json', import.meta.url),
    'utf8',
  )
  const doc = JSON.parse(raw)
  assert.ok(doc.skills.length > 0)
  for (const skill of doc.skills) {
    assert.match(skill.name, /^[a-z0-9-]+$/)
    assert.ok(['skill-md', 'archive'].includes(skill.type))
    assert.equal(typeof skill.description, 'string')
    assert.match(skill.url, /^https:\/\//)
    assert.match(skill.digest, /^sha256:[0-9a-f]{64}$/)
  }
})

test('the published skill file matches its declared digest', async () => {
  const raw = await readFile(
    new URL('../public/.well-known/agent-skills/index.json', import.meta.url),
    'utf8',
  )
  const doc = JSON.parse(raw)
  const skill = doc.skills.find((s) => s.name === 'portfolio-info')
  const path = new URL(skill.url).pathname
  const content = await readFile(new URL(`../public${path}`, import.meta.url))
  const hash = createHash('sha256').update(content).digest('hex')
  assert.equal(skill.digest, `sha256:${hash}`)
})

// ── auth.md ──────────────────────────────────────────────────────────────────

test('auth.md declares no authentication required', async () => {
  const content = await readFile(new URL('../public/auth.md', import.meta.url), 'utf8')
  assert.match(content, /no authentication required/i)
  assert.match(content, /wahyuivan\.dev/)
})

test('auth.md has an H1 heading that contains "auth.md"', async () => {
  const content = await readFile(new URL('../public/auth.md', import.meta.url), 'utf8')
  assert.match(content, /^#\s+.*auth\.md.*$/im)
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

test('_headers serves text/plain for /llms.txt', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')
  assert.match(headers, /^\/llms\.txt\n/m)
  assert.match(headers, /Content-Type: text\/plain; charset=utf-8/)
})

// ── markdown negotiation (Cloudflare Pages Function) ─────────────────────────

test('functions/index.js serves index.md as text/markdown when Accept asks for it', async () => {
  const { onRequest } = await import('../functions/index.js')
  const request = new Request('https://wahyuivan.dev/', {
    headers: { accept: 'text/markdown' },
  })
  let fetchedUrl
  const context = {
    request,
    env: {
      ASSETS: {
        fetch: async (req) => {
          fetchedUrl = req.url
          return new Response('# Wahyu Ivan', { status: 200 })
        },
      },
    },
    next: () => {
      throw new Error('should not fall through to static assets')
    },
  }

  const response = await onRequest(context)
  assert.equal(fetchedUrl, 'https://wahyuivan.dev/index.md')
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(await response.text(), '# Wahyu Ivan')
})

test('functions/index.js falls through to static assets for normal browser requests', async () => {
  const { onRequest } = await import('../functions/index.js')
  const request = new Request('https://wahyuivan.dev/', {
    headers: { accept: 'text/html' },
  })
  const context = {
    request,
    env: { ASSETS: { fetch: async () => new Response('should not be called') } },
    next: async () => new Response('<html></html>', { status: 200 }),
  }

  const response = await onRequest(context)
  assert.equal(await response.text(), '<html></html>')
})
