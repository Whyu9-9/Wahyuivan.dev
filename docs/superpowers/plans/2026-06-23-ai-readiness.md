# AI Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pass 9 isitagentready.com checks by publishing static AI agent metadata files and minor code changes.

**Architecture:** Pure static delivery — all new files land in `public/` and are served by Vercel CDN unchanged. No build plugins, no Vercel Functions. WebMCP runs as an inline script in `index.html`. Headers are declared in `public/_headers` (Vercel CDN) and mirrored in `vercel.json`.

**Tech Stack:** Vite + Vue 3, Vercel static hosting, Node.js built-in test runner (`node:test`)

## Global Constraints

- Domain: `wahyuivan.dev` — use this exact value in all JSON/markdown files
- All JSON files must be valid JSON (no comments)
- Test runner: `node --test test/*.test.js` (Node 22, ESM modules)
- Existing tests in `test/agent-discovery.test.js` and `test/dns-aid.test.js` must stay passing
- Do not add new npm dependencies

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | modify | add `test` script |
| `docs/dns/dns-aid.zone` | create | DNS zone snippet for manual import |
| `docs/dns/README.md` | create | DNSSEC setup instructions |
| `public/robots.txt` | modify | add Content-Signal directive |
| `public/.well-known/openid-configuration` | create | OAuth/OIDC stub |
| `public/.well-known/oauth-protected-resource` | create | OAuth Protected Resource stub |
| `public/.well-known/mcp/server-card.json` | create | MCP Server Card (SEP-1649) |
| `public/.well-known/agent-skills/index.json` | create | Agent Skills Discovery index |
| `public/auth.md` | create | Agent registration instructions |
| `public/index.md` | create | Markdown mirror of portfolio |
| `index.html` | modify | add WebMCP inline script |
| `public/_headers` | modify | add Link alternate + Content-Types |
| `vercel.json` | modify | mirror `_headers` |
| `test/agent-discovery.test.js` | modify | update expected Link header value |
| `test/ai-readiness.test.js` | create | tests for all new files |

---

### Task 1: Test infrastructure + DNS-AID zone

The existing `test/dns-aid.test.js` already defines what these files must contain. Create the files to make those tests pass, then add the `test` script.

**Files:**
- Create: `docs/dns/dns-aid.zone`
- Create: `docs/dns/README.md`
- Modify: `package.json` — add `"test"` script

- [ ] **Step 1: Run existing tests to see current state**

```bash
cd /path/to/wahyu-portfolio
node --test test/dns-aid.test.js 2>&1 | head -30
```

Expected: FAIL — `docs/dns/dns-aid.zone` does not exist

- [ ] **Step 2: Create `docs/dns/` directory and zone file**

Create `docs/dns/dns-aid.zone` with this exact content:

```zone
; DNS-AID zone snippet for wahyuivan.dev
; Import this into your DNS provider or use as reference.
; Requires DNSSEC — see README.md.

_index._agents.wahyuivan.dev.  3600  IN  SVCB  1  wahyuivan.dev.  (
    alpn="h2,h3"
    port=443
    well-known="/.well-known/api-catalog"
)

_a2a._agents.wahyuivan.dev.    3600  IN  SVCB  1  wahyuivan.dev.  (
    alpn="h2,h3"
    port=443
    well-known="/.well-known/api-catalog"
)
```

- [ ] **Step 3: Create `docs/dns/README.md`**

```markdown
# DNS-AID Setup for wahyuivan.dev

DNS for AI Discovery (DNS-AID) publishes SVCB records so validating agents
can locate your agent discovery endpoint via DNS.

## Steps

1. Import `dns-aid.zone` (or add records manually) at your DNS provider.
2. Enable DNSSEC for `wahyuivan.dev` at your registrar.
   - Cloudflare: Dashboard → DNS → DNSSEC → Enable (one click).
3. Verify: `dig +dnssec _index._agents.wahyuivan.dev SVCB`

## Records

| Name | Type | Value |
|------|------|-------|
| `_index._agents.wahyuivan.dev.` | SVCB | `1 wahyuivan.dev. alpn="h2,h3" port=443 well-known="/.well-known/api-catalog"` |
| `_a2a._agents.wahyuivan.dev.` | SVCB | `1 wahyuivan.dev. alpn="h2,h3" port=443 well-known="/.well-known/api-catalog"` |
```

- [ ] **Step 4: Add `test` script to `package.json`**

In `package.json`, add to `"scripts"`:

```json
"test": "node --test test/*.test.js"
```

- [ ] **Step 5: Run dns-aid tests**

```bash
npm test -- --test-name-pattern "DNS-AID" 2>&1
```

Expected: 2 tests PASS

- [ ] **Step 6: Commit**

```bash
git add docs/dns/ package.json
git commit -m "feat: add DNS-AID zone snippet and test script"
```

---

### Task 2: Content Signals in robots.txt

**Files:**
- Modify: `public/robots.txt`
- Create: `test/ai-readiness.test.js` (start file here, add to it in later tasks)

- [ ] **Step 1: Write failing test**

Create `test/ai-readiness.test.js`:

```js
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

// ── robots.txt ──────────────────────────────────────────────────────────────

test('robots.txt declares Content-Signal preferences', async () => {
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')
  assert.match(robots, /^Content-Signal:\s+ai-train=no,\s+search=yes,\s+ai-input=no$/m)
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: FAIL — `robots.txt` has no Content-Signal line

- [ ] **Step 3: Add Content-Signal to `public/robots.txt`**

Append to the end of `public/robots.txt`:

```
Content-Signal: ai-train=no, search=yes, ai-input=no
```

Final file:

```
User-agent: Twitterbot
Disallow:

User-agent: *
Disallow: 

Sitemap: https://wahyuivan.dev/sitemap.xml

Content-Signal: ai-train=no, search=yes, ai-input=no
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add public/robots.txt test/ai-readiness.test.js
git commit -m "feat: add Content-Signal directives to robots.txt"
```

---

### Task 3: OAuth stubs

**Files:**
- Create: `public/.well-known/openid-configuration`
- Create: `public/.well-known/oauth-protected-resource`
- Modify: `test/ai-readiness.test.js` — add tests

- [ ] **Step 1: Write failing tests**

Append to `test/ai-readiness.test.js`:

```js
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
```

- [ ] **Step 2: Run to confirm failure**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: 2 new tests FAIL — files not found

- [ ] **Step 3: Create `public/.well-known/openid-configuration`**

```json
{
  "issuer": "https://wahyuivan.dev",
  "grant_types_supported": [],
  "scopes_supported": [],
  "note": "This is a public portfolio with no protected APIs. No authentication is required."
}
```

- [ ] **Step 4: Create `public/.well-known/oauth-protected-resource`**

```json
{
  "resource": "https://wahyuivan.dev",
  "authorization_servers": [],
  "scopes_supported": [],
  "note": "This is a public portfolio with no protected APIs."
}
```

- [ ] **Step 5: Run tests**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: all tests PASS

- [ ] **Step 6: Commit**

```bash
git add public/.well-known/openid-configuration public/.well-known/oauth-protected-resource test/ai-readiness.test.js
git commit -m "feat: publish OAuth/OIDC discovery stubs"
```

---

### Task 4: MCP Server Card + Agent Skills index

**Files:**
- Create: `public/.well-known/mcp/server-card.json`
- Create: `public/.well-known/agent-skills/index.json`
- Modify: `test/ai-readiness.test.js` — add tests

- [ ] **Step 1: Write failing tests**

Append to `test/ai-readiness.test.js`:

```js
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
```

- [ ] **Step 2: Run to confirm failure**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: 2 new tests FAIL — files not found

- [ ] **Step 3: Create `public/.well-known/mcp/server-card.json`**

```json
{
  "schemaVersion": "1.0",
  "serverInfo": {
    "name": "wahyuivan.dev",
    "version": "1.0.0",
    "description": "Wahyu Ivan — Software Engineer portfolio"
  },
  "transport": null,
  "capabilities": {},
  "note": "Informational only — this is a public portfolio with no active MCP server."
}
```

- [ ] **Step 4: Create `public/.well-known/agent-skills/index.json`**

```json
{
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "name": "wahyuivan.dev",
  "description": "Wahyu Ivan — Software Engineer portfolio",
  "skills": []
}
```

- [ ] **Step 5: Run tests**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: all tests PASS

- [ ] **Step 6: Commit**

```bash
git add public/.well-known/mcp/ public/.well-known/agent-skills/ test/ai-readiness.test.js
git commit -m "feat: publish MCP server card and agent skills discovery index"
```

---

### Task 5: auth.md + index.md

**Files:**
- Create: `public/auth.md`
- Create: `public/index.md`
- Modify: `test/ai-readiness.test.js` — add tests

- [ ] **Step 1: Write failing tests**

Append to `test/ai-readiness.test.js`:

```js
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
```

- [ ] **Step 2: Run to confirm failure**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: 2 new tests FAIL — files not found

- [ ] **Step 3: Create `public/auth.md`**

```markdown
# Agent Authentication

**Site:** https://wahyuivan.dev  
**Type:** Public portfolio — no authentication required

## Registration

No registration is required. All content is publicly accessible without credentials.

## Access

All endpoints are open. No tokens, API keys, or credentials are needed to read or browse this site.

## Links

- GitHub: https://github.com/Whyu9-9
- LinkedIn: https://www.linkedin.com/in/wahyuivan
```

- [ ] **Step 4: Create `public/index.md`**

```markdown
# Wahyu Ivan — Software Engineer

**Website:** https://wahyuivan.dev

## About

Software engineer sharing projects, insights, and experiences in software development.

## Experience

- **Frontend Developer** at [Incentro](https://www.incentro.com/en)
- **Software Engineer - FE** at [Taksu Tech](https://taksu.tech/)
- **Quality Assurance Engineer** at [Djoin](https://djoin.id/)
- **Backend Web Developer Intern** at [Timedoor Indonesia](https://timedoor.net/)

## Projects

- Chrome Built-in AI
- Claudia Fitness
- MyTISI Gobolabali
- PT. Pancoran Mas
- ASDP Indonesia Ferry
- Alengkong Bali Camp

## Links

- GitHub: https://github.com/Whyu9-9
- LinkedIn: https://www.linkedin.com/in/wahyuivan
- Medium: https://medium.com/@wahyuivan
- YouTube: https://www.youtube.com/@wahyuivan9
- Twitter: https://twitter.com/ivanwahyu195
```

- [ ] **Step 5: Run tests**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: all tests PASS

- [ ] **Step 6: Commit**

```bash
git add public/auth.md public/index.md test/ai-readiness.test.js
git commit -m "feat: add auth.md and index.md for agent discovery"
```

---

### Task 6: WebMCP

Add `navigator.modelContext.provideContext()` to `index.html` so AI agents in supporting browsers can discover portfolio tools.

**Files:**
- Modify: `index.html`
- Modify: `test/ai-readiness.test.js` — add test

- [ ] **Step 1: Write failing test**

Append to `test/ai-readiness.test.js`:

```js
// ── WebMCP ───────────────────────────────────────────────────────────────────

test('index.html includes WebMCP provideContext script', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /navigator\.modelContext/)
  assert.match(html, /provideContext/)
  assert.match(html, /get_portfolio_info/)
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: FAIL — `index.html` has no WebMCP script

- [ ] **Step 3: Add WebMCP script to `index.html`**

Add the following script block immediately before the closing `</body>` tag in `index.html` (after the service worker script):

```html
        <!-- WebMCP: expose portfolio tools to AI agents in supporting browsers -->
        <script>
            if ("modelContext" in navigator) {
                navigator.modelContext.provideContext({
                    tools: [
                        {
                            name: "get_portfolio_info",
                            description:
                                "Get information about Wahyu Ivan — software engineer",
                            inputSchema: { type: "object", properties: {} },
                            execute: async () => ({
                                name: "Wahyu Ivan",
                                role: "Software Engineer",
                                website: "https://wahyuivan.dev",
                                github: "https://github.com/Whyu9-9",
                                linkedin:
                                    "https://www.linkedin.com/in/wahyuivan",
                                twitter: "https://twitter.com/ivanwahyu195",
                            }),
                        },
                        {
                            name: "get_projects",
                            description:
                                "Get list of projects built by Wahyu Ivan",
                            inputSchema: { type: "object", properties: {} },
                            execute: async () => ({
                                projects: [
                                    "Chrome Built-in AI",
                                    "Claudia Fitness",
                                    "MyTISI Gobolabali",
                                    "PT. Pancoran Mas",
                                    "ASDP Indonesia Ferry",
                                    "Alengkong Bali Camp",
                                ],
                            }),
                        },
                        {
                            name: "get_contact",
                            description:
                                "Get contact and social links for Wahyu Ivan",
                            inputSchema: { type: "object", properties: {} },
                            execute: async () => ({
                                github: "https://github.com/Whyu9-9",
                                linkedin:
                                    "https://www.linkedin.com/in/wahyuivan",
                                medium: "https://medium.com/@wahyuivan",
                                youtube:
                                    "https://www.youtube.com/@wahyuivan9",
                                twitter: "https://twitter.com/ivanwahyu195",
                            }),
                        },
                    ],
                });
            }
        </script>
```

- [ ] **Step 4: Run test**

```bash
node --test test/ai-readiness.test.js 2>&1
```

Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add index.html test/ai-readiness.test.js
git commit -m "feat: add WebMCP provideContext tools to index.html"
```

---

### Task 7: Headers (_headers + vercel.json)

Update `public/_headers` and `vercel.json` to add the `Link` alternate for `index.md` and `Content-Type` headers for all new files. Also update `test/agent-discovery.test.js` since the Link header value changes.

**Files:**
- Modify: `public/_headers`
- Modify: `vercel.json`
- Modify: `test/agent-discovery.test.js` — update expected Link header value
- Modify: `test/ai-readiness.test.js` — add Content-Type header tests

- [ ] **Step 1: Update `test/agent-discovery.test.js` with new Link header value**

The existing test asserts this exact Link header value:
```
</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </sitemap.xml>; rel="sitemap"; type="application/xml"
```

Replace the `linkHeaderValue` constant with:

```js
const linkHeaderValue =
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </sitemap.xml>; rel="sitemap"; type="application/xml", </index.md>; rel="alternate"; type="text/markdown"'
```

- [ ] **Step 2: Write failing header tests in `test/ai-readiness.test.js`**

Append:

```js
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
```

- [ ] **Step 3: Run tests to confirm failures**

```bash
npm test 2>&1 | tail -20
```

Expected: `agent-discovery.test.js` Link tests FAIL (header not updated yet); new ai-readiness header tests FAIL

- [ ] **Step 4: Replace `public/_headers` with updated content**

```
/
  Link: </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </sitemap.xml>; rel="sitemap"; type="application/xml", </index.md>; rel="alternate"; type="text/markdown"

/.well-known/api-catalog
  Content-Type: application/linkset+json; charset=utf-8

/index.md
  Content-Type: text/markdown; charset=utf-8

/auth.md
  Content-Type: text/markdown; charset=utf-8

/.well-known/openid-configuration
  Content-Type: application/json; charset=utf-8

/.well-known/oauth-protected-resource
  Content-Type: application/json; charset=utf-8

/.well-known/mcp/server-card.json
  Content-Type: application/json; charset=utf-8

/.well-known/agent-skills/index.json
  Content-Type: application/json; charset=utf-8
```

- [ ] **Step 5: Replace `vercel.json` with updated content**

```json
{
  "headers": [
    {
      "source": "/",
      "headers": [
        {
          "key": "Link",
          "value": "</.well-known/api-catalog>; rel=\"api-catalog\"; type=\"application/linkset+json\", </sitemap.xml>; rel=\"sitemap\"; type=\"application/xml\", </index.md>; rel=\"alternate\"; type=\"text/markdown\""
        }
      ]
    },
    {
      "source": "/.well-known/api-catalog",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/linkset+json; charset=utf-8"
        }
      ]
    },
    {
      "source": "/index.md",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/markdown; charset=utf-8"
        }
      ]
    },
    {
      "source": "/auth.md",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/markdown; charset=utf-8"
        }
      ]
    },
    {
      "source": "/.well-known/openid-configuration",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json; charset=utf-8"
        }
      ]
    },
    {
      "source": "/.well-known/oauth-protected-resource",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json; charset=utf-8"
        }
      ]
    },
    {
      "source": "/.well-known/mcp/server-card.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json; charset=utf-8"
        }
      ]
    },
    {
      "source": "/.well-known/agent-skills/index.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json; charset=utf-8"
        }
      ]
    }
  ]
}
```

- [ ] **Step 6: Run all tests**

```bash
npm test 2>&1
```

Expected: all tests PASS — zero failures

- [ ] **Step 7: Commit**

```bash
git add public/_headers vercel.json test/agent-discovery.test.js test/ai-readiness.test.js
git commit -m "feat: update headers for markdown alternates and new well-known files"
```

---

## Post-implementation: Manual DNS step

After deploying to Vercel, add these DNS records at your DNS provider:

```
_index._agents.wahyuivan.dev.  3600  IN  SVCB  1  wahyuivan.dev.  (
    alpn="h2,h3"
    port=443
    well-known="/.well-known/api-catalog"
)

_a2a._agents.wahyuivan.dev.    3600  IN  SVCB  1  wahyuivan.dev.  (
    alpn="h2,h3"
    port=443
    well-known="/.well-known/api-catalog"
)
```

Enable DNSSEC at your registrar. See `docs/dns/README.md` for full instructions.
