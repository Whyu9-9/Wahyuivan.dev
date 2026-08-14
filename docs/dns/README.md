# DNS Discovery Records

Publish the records in `dns-aid.zone` at the authoritative DNS provider for
`wahyuivan.dev`.

Required DNS-AID entrypoints:

```dns
_index._agents.wahyuivan.dev. 3600 IN SVCB 1 wahyuivan.dev. (
  alpn="h2,h3"
  port=443
  mandatory=alpn,port
)

_a2a._agents.wahyuivan.dev. 3600 IN SVCB 1 wahyuivan.dev. (
  alpn="h2,h3"
  port=443
  mandatory=alpn,port
)
```

Note: the DNS-AID draft also defines a `well-known` SvcParamKey to point at an
agent catalog path, but its numeric key is still "deferred to IANA assignment"
(draft §7.1) — no DNS provider can accept it yet. Cloudflare's API rejects it
with error 9012 ("Value for SVCB record is invalid"). Drop it until IANA
assigns a code point; `alpn` + `port` already satisfy the discovery check.

Enable DNSSEC for `wahyuivan.dev` before treating DNS-AID as published. The
DNS-AID draft recommends signed records for data origin authentication and
integrity; DNSSEC is also required if TLSA records are added later.
