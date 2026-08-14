# AI Readiness Design

**Date:** 2026-06-23  
**Site:** wahyuivan.dev (static Vite + Vercel)  
**Audit source:** isitagentready.com

## Goal

Pass 9 AI agent readiness checks by publishing static metadata files and minor code changes. Zero new server-side code; everything delivered from Vercel CDN.

## Architecture

Pure static delivery. All files in `public/`, headers in `public/_headers` and `vercel.json`. No build plugins, no Vercel Functions.

## Items

### 1. DNS-AID (manual — out of repo)

DNS records cannot be published from code. Add these records at your DNS provider after deployment:

```
_index._agents.wahyuivan.dev.  HTTPS 1 wahyuivan.dev. alpn="h2,h3" path="/.well-known/agent-skills/index.json"
_a2a._agents.wahyuivan.dev.    HTTPS 1 wahyuivan.dev. alpn="h2,h3" path="/.well-known/agent-skills/index.json"
```

Sign the zone with DNSSEC if your registrar supports it (e.g. Cloudflare DNS enables DNSSEC with one click).

### 2. Markdown for Agents

**Approach:** pre-rendered static file + `Link` alternate header.

- Create `public/index.md` — hand-authored markdown summary of portfolio content
- Add `Link: </index.md>; rel="alternate"; type="text/markdown"` header on `/` response
- Agents that read `Link` headers discover the markdown version without content negotiation

No content negotiation (static site constraint). Agents that send `Accept: text/markdown` won't get it automatically, but the `Link` header is the accepted fallback pattern for static sites.

### 3. Content Signals in robots.txt

Append to `public/robots.txt`:

```
Content-Signal: ai-train=no, search=yes, ai-input=no
```

### 4. OAuth/OIDC Discovery Stub

`public/.well-known/openid-configuration`:

```json
{
  "issuer": "https://wahyuivan.dev",
  "grant_types_supported": [],
  "scopes_supported": [],
  "note": "This is a public portfolio with no protected APIs. No authentication is required."
}
```

### 5. OAuth Protected Resource Stub

`public/.well-known/oauth-protected-resource`:

```json
{
  "resource": "https://wahyuivan.dev",
  "authorization_servers": [],
  "scopes_supported": [],
  "note": "This is a public portfolio with no protected APIs."
}
```

### 6. auth.md

`public/auth.md` — agent registration instructions served at `/auth.md`.

Content: declare no authentication required, no registration needed, all content publicly accessible.

### 7. MCP Server Card

`public/.well-known/mcp/server-card.json` — SEP-1649 format.

Fields: `serverInfo` (name, version), transport endpoint, capabilities. Since this is a portfolio (no MCP server running), declare capabilities as empty and note it's informational.

### 8. Agent Skills Discovery Index

`public/.well-known/agent-skills/index.json` — Agent Skills Discovery RFC v0.2.0.

Fields: `$schema`, `skills` array. Skills list: none (portfolio exposes no tools/skills), but the index file itself satisfies the check.

### 9. WebMCP

Inline script in `index.html` that calls `navigator.modelContext?.provideContext()` with tool definitions for key portfolio actions:

- `get_portfolio_info` — returns name, role, links
- `get_projects` — returns project list
- `get_contact` — returns contact info

### Headers

New entries needed in `public/_headers` and `vercel.json`:

| Path | Header | Value |
|------|--------|-------|
| `/` | `Link` | `</index.md>; rel="alternate"; type="text/markdown", ...existing...` |
| `/.well-known/openid-configuration` | `Content-Type` | `application/json` |
| `/.well-known/oauth-protected-resource` | `Content-Type` | `application/json` |
| `/.well-known/mcp/server-card.json` | `Content-Type` | `application/json` |
| `/.well-known/agent-skills/index.json` | `Content-Type` | `application/json` |
| `/auth.md` | `Content-Type` | `text/markdown; charset=utf-8` |
| `/index.md` | `Content-Type` | `text/markdown; charset=utf-8` |

## Files Changed

| File | Action |
|------|--------|
| `public/robots.txt` | modify — add Content-Signal |
| `public/_headers` | modify — add Link + Content-Types |
| `vercel.json` | modify — mirror _headers |
| `index.html` | modify — add WebMCP inline script |
| `public/index.md` | create |
| `public/auth.md` | create |
| `public/.well-known/openid-configuration` | create |
| `public/.well-known/oauth-protected-resource` | create |
| `public/.well-known/mcp/server-card.json` | create |
| `public/.well-known/agent-skills/index.json` | create |

## Out of Scope

- DNSSEC configuration (registrar-level)
- Actual OAuth server (portfolio has no protected APIs)
- Actual MCP server (portfolio has no tools backend)
- Content negotiation via Edge Function (static site constraint)

## Success Criteria

All 9 isitagentready.com checks pass (DNS-AID pending manual DNS step).
