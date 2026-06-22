# DNS Discovery Records

Publish the records in `dns-aid.zone` at the authoritative DNS provider for
`wahyuivan.dev`.

Required DNS-AID entrypoint:

```dns
_index._agents.wahyuivan.dev. 3600 IN SVCB 1 wahyuivan.dev. (
  alpn="h2,h3"
  port=443
  well-known="/.well-known/api-catalog"
)
```

Enable DNSSEC for `wahyuivan.dev` before treating DNS-AID as published. The
DNS-AID draft recommends signed records for data origin authentication and
integrity; DNSSEC is also required if TLSA records are added later.
