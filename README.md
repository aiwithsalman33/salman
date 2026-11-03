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

The contact form needs no backend: it opens WhatsApp (`wa.me`) with the enquiry pre-filled for the number in `src/data/social-links.ts`.

## Content

All copy lives in `src/data/`: `work.ts` (four categories, 13 projects), `skills.ts`, `experience.ts`, `achievements.ts`, `social-links.ts`. Unconfirmed details (`email`, `youtube`, `learnerCount`; the Axxeler start date) are `null`/omitted and left off the page until filled in. Workflow diagrams marked `illustrative` are sample steps, and `tech` lists only confirmed tools. The former employer named in the original planning brief must never appear on the site or in this repo.

## Status

- [x] Phase 1: design system and plan
- [x] Phase 2: functional responsive site, real content, no animation or 3D
- [x] Phase 3: motion (boot sequence, headline reveals, scroll progress, project tilt and light, magnetic CTA, sheet/module transitions; all off under reduced motion)
- [x] Phase 4: 3D scene (React Three Fiber + GSAP ScrollTrigger; SVG fallback without WebGL or with reduced motion)
- [ ] Phase 5: QA
- [ ] Phase 6: real assets, metadata, launch
