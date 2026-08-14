import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const linkHeaderValue =
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </sitemap.xml>; rel="sitemap"; type="application/xml", </index.md>; rel="alternate"; type="text/markdown"'

test('static hosts advertise agent discovery resources from the homepage', async () => {
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')

  assert.match(headers, /^\/\n(?: {2}.+\n)+/m)
  assert.match(headers, new RegExp(`^  Link: ${escapeRegExp(linkHeaderValue)}$`, 'm'))
})

test('Vercel advertises the same agent discovery Link header from the homepage', async () => {
  const vercelConfig = JSON.parse(
    await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
  )

  const homepage = vercelConfig.headers.find((entry) => entry.source === '/')
  assert.ok(homepage)
  assert.deepEqual(homepage.headers, [{ key: 'Link', value: linkHeaderValue }])
})

test('the advertised API catalog is a linkset JSON document', async () => {
  const catalog = JSON.parse(
    await readFile(new URL('../public/.well-known/api-catalog', import.meta.url), 'utf8'),
  )

  assert.ok(Array.isArray(catalog.linkset))
  assert.equal(catalog.linkset[0].anchor, 'https://wahyuivan.dev/')
  assert.deepEqual(catalog.linkset[0]['service-doc'], [
    {
      href: 'https://wahyuivan.dev/',
      type: 'text/html',
    },
  ])
})

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
