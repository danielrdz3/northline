# Northline Technology

Static Next.js website for Northline Technology’s Michigan managed IT, co-managed IT, cybersecurity, and supporting service information.

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Use `.env.local` for production-specific public configuration. Do not commit vendor IDs, form URLs, chat scripts, analytics IDs, or any credentials.

## Validation

```bash
npm run lint
npm test
```

`npm test` creates the static export and validates canonical origins, sitemap inclusion, location noindex rules, and conversion/legal route fallbacks.

## Publishing model

- `northlinetechnology.com` is the only canonical public origin.
- Service pages live under `/services/`.
- Michigan city hubs live under `/locations/michigan/{city}/`.
- City pages are `noindex,follow` and excluded from the sitemap until the editorial `indexable` field in `lib/location-content.ts` is approved.
- Booking, GoHighLevel form/chat, GA4, and Clarity are optional environment-configured integrations.

See `roadmap.md` for the repository-safe status summary. The private implementation roadmap is intentionally excluded from version control.
