import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { onRequestGet } from '../functions/api/[feed].js'

const repo = (name) => ({ name, html_url: `https://github.com/x/${name}`, description: 'd', stargazers_count: 1, forks_count: 0, archived: false, owner: {} })

let upstream
let cached
let requests

beforeEach(() => {
  requests = []
  cached = new Map()
  upstream = {
    'api.github.com': () => Response.json([repo('MyGram-API'), repo('some-fork')]),
    'github-contributions-api.jogruber.de': () => Response.json({ contributions: [{ date: '2026-01-01', count: 3, level: 2 }] }),
  }
  globalThis.fetch = async (url, init) => {
    requests.push({ url: String(url), init })
    return upstream[new URL(url).hostname]()
  }
  globalThis.caches = {
    default: {
      match: async (request) => cached.get(request.url)?.clone(),
      put: async (request, response) => { cached.set(request.url, response) },
    },
  }
})

const call = async (feed, env = {}, query = '') => {
  const pending = []
  const response = await onRequestGet({
    request: new Request(`https://wahyuivan.dev/api/${feed}${query}`),
    params: { feed },
    env,
    waitUntil: (promise) => pending.push(promise),
  })
  await Promise.all(pending)
  return response
}

test('github feed keeps pinned repos, trims fields, and sends a User-Agent', async () => {
  const response = await call('github', { GITHUB_TOKEN: 't0k' })
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(body.repos.map((r) => r.name), ['MyGram-API'])
  assert.equal(body.repos[0].owner, undefined)
  assert.deepEqual(body.contributions, [{ date: '2026-01-01', count: 3 }])
  const github = requests.find((r) => r.url.includes('api.github.com'))
  assert.equal(github.init.headers['User-Agent'], 'wahyuivan.dev')
  assert.equal(github.init.headers.Authorization, 'Bearer t0k')
})

test('github feed survives a failing contributions API', async () => {
  upstream['github-contributions-api.jogruber.de'] = () => new Response('down', { status: 500 })
  const body = await (await call('github')).json()
  assert.deepEqual(body.contributions, [])
  assert.equal(body.repos.length, 1)
})

test('second request is served from the edge cache', async () => {
  await call('github')
  const before = requests.length
  const response = await call('github')
  assert.equal(response.status, 200)
  assert.equal(requests.length, before)
})

test('query strings cannot bypass the cache', async () => {
  await call('github')
  const before = requests.length
  await call('github', {}, '?bust=1')
  await call('github', {}, '?bust=2')
  assert.equal(requests.length, before)
})

test('upstream failure returns 502 and is not cached', async () => {
  upstream['api.github.com'] = () => new Response('down', { status: 503 })
  const response = await call('github')
  assert.equal(response.status, 502)
  assert.equal(cached.size, 0)
})

test('unknown feed is a 404', async () => {
  assert.equal((await call('nope')).status, 404)
  assert.equal((await call('posts')).status, 404)
})
