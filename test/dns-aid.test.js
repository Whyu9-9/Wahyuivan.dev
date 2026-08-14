import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('DNS-AID zone snippet publishes the organization agent index entrypoint', async () => {
  const zone = await readFile(new URL('../docs/dns/dns-aid.zone', import.meta.url), 'utf8')

  assert.match(zone, /^_index\._agents\.wahyuivan\.dev\.\s+3600\s+IN\s+SVCB\s+1\s+wahyuivan\.dev\.\s+\(/m)
  assert.match(zone, /^\s+alpn="h2,h3"$/m)
  assert.match(zone, /^\s+port=443$/m)
  assert.match(zone, /^\s+mandatory=alpn,port$/m)
  // "well-known" is a DNS-AID SvcParamKey whose numeric code point is still
  // unassigned by IANA (draft §7.1) — real providers reject it, so it must
  // not appear in the published record.
  assert.doesNotMatch(zone, /well-known/)
})

test('DNS-AID zone snippet publishes the A2A agent entrypoint', async () => {
  const zone = await readFile(new URL('../docs/dns/dns-aid.zone', import.meta.url), 'utf8')

  assert.match(zone, /^_a2a\._agents\.wahyuivan\.dev\.\s+3600\s+IN\s+SVCB\s+1\s+wahyuivan\.dev\.\s+\(/m)
})

test('DNS-AID notes require DNSSEC before considering discovery published', async () => {
  const readme = await readFile(new URL('../docs/dns/README.md', import.meta.url), 'utf8')

  assert.match(readme, /Enable DNSSEC for `wahyuivan\.dev`/)
  assert.match(readme, /_index\._agents\.wahyuivan\.dev/)
})
