# Salman — portfolio

Next.js 16 (App Router) · React 19 · Tailwind 4 · TypeScript. Brief: [`Salman_Creative_AI_Portfolio_Brief.md`](Salman_Creative_AI_Portfolio_Brief.md). Design system and build plan: [`docs/DESIGN_PLAN.md`](docs/DESIGN_PLAN.md).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint
```

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL once the domain is chosen (canonical + OG URLs) |
| `CONTACT_WEBHOOK_URL` | Contact submissions are POSTed here as JSON (n8n, Make.com, Formspree…). Unset: the form tells visitors it isn't connected yet |
| `CONTACT_WEBHOOK_SECRET` | Optional; sent as `x-contact-secret` |

## Content

All copy lives in `src/data/`. Unconfirmed details (`email`, `youtube`, `learnerCount` in `social-links.ts`; the ZenXAI summary in `experience.ts`) are `null`/empty and are left off the page until filled in. Every project has a `provenance` label. The current employer is never named; use "current role".

## Status

- [x] Phase 1: design system and plan
- [x] Phase 2: functional responsive site, real content, no animation or 3D
- [x] Phase 3: motion (boot sequence, headline reveals, scroll progress, project tilt and light, magnetic CTA, sheet/module transitions; all off under reduced motion)
- [x] Phase 4: 3D scene (React Three Fiber + GSAP ScrollTrigger; SVG fallback without WebGL or with reduced motion)
- [ ] Phase 5: QA
- [ ] Phase 6: real assets, metadata, launch
