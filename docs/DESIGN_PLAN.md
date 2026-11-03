# Salman portfolio — Phase 1: design system and build plan

Source brief: [`Salman_Creative_AI_Portfolio_Brief.md`](../Salman_Creative_AI_Portfolio_Brief.md). This document is the Phase 1 output (brief §17). Nothing is built yet; it needs sign-off first.

Repository state: empty apart from the brief and `.claude/skills/`. No existing framework to preserve, so the brief's recommended stack is used as-is.

---

## 1. The idea in one line

**The page is a flight plan.** Scrolling advances a single mission along one continuous trajectory: the 3D camera travels it, and a thin trajectory rail on the left edge of the page shows where you are on it. Every section is a phase of that mission, and the last phase brings everything back to a single point.

Why this and not a generic sci-fi dashboard: Salman's work is literally *nodes connected by paths* — n8n workflows, lead-to-follow-up journeys, script → voice → avatar → publish pipelines. The trajectory is the same shape as the work. The mission-control vocabulary (phases, telemetry, GO status) gives the playful edge without making it a game.

**Where the boldness is spent:** the hero intelligence core and the trajectory it launches. Everything else — sections, panels, forms — stays quiet, disciplined and very legible.

---

## 2. Tokens

### Color (fixed by the brief)

| Token | Hex | Role |
|---|---|---|
| `--void` | `#080B10` | Page background, canvas clear color |
| `--graphite` | `#0D1118` | Raised surfaces: panels, dialogs, rail |
| `--signal` | `#5CE1E6` | **Interactive and live**: links, focus rings, hover light, the core's glow, active rail position |
| `--go` | `#C7F36B` | **Confirmed / GO**: the single primary CTA, unlocked milestones, form success, `SYSTEM ONLINE` |
| `--text` | `#F3F5F7` | Primary text |
| `--steel` | `#9AA5B1` | Secondary text, metadata (≈7.9:1 on `--void`, passes AA for body) |
| `--depth` | `#9A82FF` | 3D only: far fog and distant particles. Never used in the UI |
| `--hairline` | `rgb(154 165 177 / 0.14)` | Rules, panel borders, rail line |

The two accents carry **meaning**, not decoration: cyan = "you can touch this / this is live", lime = "this is done / go". That's the mission-control convention (green = GO) and it means accents show up only where they tell you something. No gradient washes in the UI; glow exists only inside the canvas and on focus.

Grain: a 3–4% static SVG noise layer over the canvas, not over text.

### Type

| Role | Face | Setting |
|---|---|---|
| Display / headlines | **Archivo** (variable, `wdth` 62–125) at `wdth 125`, `wght 750–800` | Tracking −0.02em, line-height 0.92, caps only where the brief's copy is in caps (hero line, closing line) |
| Body / UI | **Archivo** at `wdth 100`, `wght 400/500` | 17–18px, line-height 1.6, max 68ch |
| Telemetry | **JetBrains Mono** 400/500, tabular figures | 12–13px; used **only for real data** — dates, durations, counts, phase readouts |

One family with a width axis instead of Space Grotesk + Inter: the expanded cut reads like aerospace instrument lettering and gives the display type its own voice, while the normal cut stays a quiet, highly legible body face. The width axis also becomes the boot moment (see §5).

Fluid scale (`clamp`, ratio ≈ 1.333 at desktop, 1.2 at mobile): `12 · 14 · 17 · 22 · 30 · 40 · 56 · 76 · 104`. Hero display tops out at 104px on desktop and 44px at 360px width.

### Space and grid

- 4px base; spacing scale `4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112 · 160`.
- Desktop: 12-column grid, 24px gutters, 72px outer margin, trajectory rail in a fixed 56px gutter on the left.
- Mobile: 4-column grid, 16px side gutter, rail becomes a 2px progress line along the top with the current phase name.
- Radii by hierarchy, not one value everywhere: dialogs 16px, controls 999px (pill), inline tags 4px, the console bank 0.

---

## 3. Layout

**Alignment: left-aligned throughout** (consoles read left to right, and it keeps long copy readable). The only centered moment is the final convergence.

### Hero — Orbit

```
┌──────────────────────────────────────────────────────────────────┐
│ SALMAN / AI WITH SALMAN     Work  About  Capabilities  …  Contact │
│                                                                  │
│ ●  I BUILD INTELLIGENT                          .   ·            │
│ │  SYSTEMS THAT DO THE                     ·   ( ◎ )  ·  core    │
│ │  HEAVY LIFTING.                             ·  nodes orbit     │
│ │                                                                │
│ │  AI Engineer building automations, agents and                  │
│ │  digital experiences that make businesses work smarter.        │
│ │                                                                │
│ │  [ Let's build something ]   Explore my work                   │
│ │                                                                │
│ │  AI engineer / Automation builder / Independent creator / India│
└──────────────────────────────────────────────────────────────────┘
  ↑ trajectory rail (dot = you are here)
```

The core sits right-of-center and slightly behind the headline's last line so the type and object overlap — one composition, not "text column + image column". The lime button is the only filled button on the page.

### Capabilities — Modules (a console bank, not a card grid)

```
┌────┬────┬───────────────────────────────┬────┬────┐
│ A  │ A  │  Voice AI                     │ W  │ C  │
│ u  │ g  │  Voice agent workflows,       │ h  │ o  │
│ t  │ e  │  TTS experiments, regional-   │ a  │ n  │
│ o  │ n  │  language conversations.      │ t  │ t  │
│    │ t  │  [ small live waveform ]      │ s  │ e  │
└────┴────┴───────────────────────────────┴────┴────┘
```

Five rack modules side by side; the selected one opens, the rest compress to vertical labels. Built as an accordion (each header is a button with `aria-expanded`, one module always open) so the same markup works as a row on desktop and a vertical stack on mobile. Each module's small visual is CSS/SVG, not WebGL.

### Work — Project galaxy

```
┌────────────────────────┬─────────────────────────────────────────┐
│ Ziya Voice             │                                         │
│   Employer · Aspirentech│         ·        ●  ← lit node          │
│ WhatsApp sales system  │    ·         ·                          │
│   Employer · current job│        ·   (constellation, 3D)    ·     │
│ Founder AI avatar      │                 ·          ·            │
│ n8n module · 10 projects│                                        │
│ BOTZUP / CLWise setup  │                                         │
│ Freelance automation   │                                         │
│ AI + marketing ops     │                                         │
└────────────────────────┴─────────────────────────────────────────┘
```

The **HTML list is the source of truth**; the constellation mirrors it. Hover or focus a project and its node lights and the camera eases toward it. Enter or click opens a case-study dialog (side sheet on desktop, full-screen on mobile, Esc closes, focus is trapped and restored).

Every project carries a **provenance tag** in text plus a glyph, never color alone: `Employer project · Aspirentech`, `Employer project · current role`, `Learning module · current role`, `Independent / freelance`. This satisfies the brief's ownership rules (§4, §16) visibly rather than in fine print.

**Naming rule:** the current employer is never named anywhere on the site, in metadata, structured data, alt text or code comments. It's referred to only as "current role" / "AI Engineer, Bengaluru". This overrides the brief, which names it in §3.5 (Projects B and D) and §4.

### Journey, Network, Creator, Milestones, Convergence

- **Journey**: vertical stations along the trajectory: ZenXAI → Aspirentech → current role (AI Engineer, Bengaluru, May 2026 – present; employer unnamed). Dates in telemetry type. The awards attach to the Aspirentech/2025 station. The ZenXAI station shows only role and dates until you confirm a summary.
- **Network (skills)**: five labelled clusters (Automation, AI engineering, Voice & conversational, Product & creative tech, Growth & content). In the canvas they're linked point clusters; in HTML they're five grouped lists. No percentages, no logo badges.
- **Creator**: Instagram and Topmate links plus a "Learn with me" CTA. Until real reel thumbnails exist, this is a plain *transmission log* (list of content themes), not a grid of fake thumbnails.
- **Milestones**: the five achievements as lime "GO" status lines. No invented certificates or badges.
- **Convergence**: nodes collapse into one point, `IDEAS IN. INTELLIGENT SYSTEMS OUT.`, then the contact form.

---

## 4. 3D choreography

One R3F canvas, fixed behind the content, `pointer-events` only where needed. A single `CatmullRomCurve3` is the trajectory; GSAP ScrollTrigger maps each section's scroll range to a segment of it (`scrub`, no pinning except one short pin in Work if it proves necessary). Native scroll is never hijacked; scrolling up reverses everything.

| Phase | Section | Scene state |
|---|---|---|
| Orbit | Hero | Core: wireframe icosahedron shell + inner shader sphere; 5 capability nodes on tilted rings; subtle pointer parallax |
| Approach | About | Camera passes through the outer ring (the "portal"); core recedes |
| Modules | Capabilities | The 5 ring nodes detach and line up; the active tab's node brightens |
| Galaxy | Work | 7 project nodes in a loose constellation; hover/focus drives camera target |
| Journey | Journey | 3 stations lit along the path as each comes into view |
| Network | Skills | Instanced points + line segments resolve into 5 clusters |
| Convergence | Contact | Everything lerps to one point; bloom peaks once, then settles |

Budgets: one draw call per particle system (instancing), ≤ 4k points desktop / ≤ 800 mobile, one bloom pass desktop only, DPR capped at 1.75 (1.25 mobile), render loop paused when the tab is hidden or the canvas is off-screen.

**As built (Phase 4)** — differences from the table above:
- Glow comes from additive sprites, not a bloom pass: same look, no post-processing cost, works on phones.
- Capabilities has no dedicated 3D state; the camera travels through the starfield there (the module bank covers most of the frame).
- Each section holds the camera on its keyframe for the first 55% of its scroll, then travels to the next; Contact's own scroll shrinks the core away so it never sits behind the form.
- Tiers: `full` (fine pointer, ≥1024px, ≥4 cores), `lite` (other WebGL devices: fewer points, lower resolution, dimmer in portrait), none (reduced motion, data saver, ≤2 GB memory, no WebGL).
- Camera keyframes and world anchors: `src/components/scenes/trajectory.ts`.

Fallbacks:
- **No WebGL or a render error** → an error boundary swaps in a static poster render; the page never breaks.
- **Mobile / low-power** → a simplified scene (core + rings only, no bloom); below a capability threshold, the poster image.
- **`prefers-reduced-motion`** → no camera travel and no autoplay motion; each section shows a still frame of its scene state.
- The canvas lazy-loads after first paint; the HTML hero is fully readable before it arrives.

---

## 5. Motion rules

1. **One orchestrated load moment**: the boot lines (`INITIALIZING SALMAN.OS` → `SYSTEM ONLINE`, max ~1.6s, skippable, shortened to ~0.4s on repeat visits via `sessionStorage`) end with the hero headline expanding from `wdth 62` to `wdth 125` as the core ignites. No fake progress bar.
2. **Scroll motion lives in the canvas.** In the DOM, only section headlines get a single line-mask reveal; paragraphs, tags and lists simply appear. No fade-up on every block.
3. **User-triggered motion is welcome**: module expand, dialog open, magnetic primary CTA (max 6px travel), project tilt (max 4°) with a cursor-following signal-colored light.
4. Custom cursor only on `(hover: hover) and (pointer: fine)`; the native cursor is never hidden on touch.
5. All GSAP work goes through `useGSAP` / `gsap.matchMedia()` so it cleans up on unmount and switches off under reduced motion.

---

## 6. Review against the brief: what I changed and why

I drafted a first pass, asked "would I have produced this for any AI portfolio?", and revised these:

| First draft (generic default) | Revised to | Why |
|---|---|---|
| Space Grotesk + Inter | Archivo variable (expanded/normal) + JetBrains Mono | Space Grotesk + Inter is the default AI-site pairing; the width axis gives a voice and a boot moment |
| Mono, tracked caps eyebrow above every heading | Mono only for real telemetry data; headings stand alone | The eyebrow-on-everything is template chrome |
| `01 / 02 / 03` section numbers | Position shown by the trajectory rail | Sections aren't a numbered list; the rail shows the journey. Numbers kept only where the content is a real sequence (the 10 n8n projects, the timeline) |
| Capability cards in a 3- or 5-up grid | Console bank `tablist` | Identical rounded cards are the SaaS kit |
| Content grid of reel thumbnails | Transmission log until real thumbnails exist | No fake media |
| Fade-and-slide-up on every section | One boot moment + scroll in the canvas | Scattered entrances read as generated |
| `→` on links and buttons | Plain verbs | Template chrome |

Kept on purpose: near-black + one bright accent and mono labels resemble common defaults, but **the brief specifies them**, so they stay. They're constrained by the meaning rules above.

---

## 7. Stack and structure

| Concern | Choice | Current stable (checked 2026-11-02) |
|---|---|---|
| Framework | Next.js App Router + React + TypeScript | next 16.4.4, react 19.3.1 |
| Styling | Tailwind v4 with tokens defined in `styles/tokens.css` via `@theme` | tailwindcss 4.3.3 |
| 3D | three + @react-three/fiber + @react-three/drei | three 0.187.0, R3F 9.8.2, drei 10.7.9 |
| Scroll | gsap + ScrollTrigger + @gsap/react | gsap 3.15.0, @gsap/react 2.1.2 |
| UI motion | motion | motion 14.9.0 |
| Icons | lucide-react | 1.66.0 |
| Fonts | `next/font/google` (self-hosted at build, no layout shift) | — |
| Hosting | Vercel | — |

TypeScript: use the version `create-next-app` pins (TS 7 is now the npm `latest`; adopt it only if Next 16 and R3F types are confirmed compatible at install).

The folder structure follows brief §12 exactly, with two additions: `components/scenes/trajectory.ts` (the shared curve and the per-section segment map that both the DOM rail and the camera read) and `components/scenes/SceneErrorBoundary.tsx`.

Content lives in `src/data/*.ts`, with a `provenance` field on every project and experience item. Unverified items (`learners`, `youtubeUrl`, `email`, ZenXAI summary) are typed as `string | null`; the UI omits anything that's `null` instead of rendering a placeholder or a dead link.

---

## 8. Open questions (needed before launch, not before building)

1. **Contact email** and **form delivery**: Formspree/Web3Forms (no backend, free tier) or a Next route handler sending via Resend (needs an API key on Vercel).
2. **YouTube channel URL**: omitted until confirmed.
3. **"250+ learners"**: still accurate? Omitted until confirmed.
4. **ZenXAI**: a one- or two-line summary of the work you can share publicly.
5. **Portrait**: a real photo for About, or keep the abstract frame?
6. **Approved assets** (brief §15): until supplied, project panels use clearly labelled conceptual visuals (*"Concept visual — not a product screenshot"*).
7. **Domain** (for canonical URL, sitemap, OG).

## 9. Next steps after sign-off

Phase 2: scaffold Next.js, tokens, navigation, all semantic sections with real data, responsive at all seven breakpoints, working with no JS animation and no 3D. Then Phase 3 (motion) → Phase 4 (3D) → Phase 5 (QA: lint, types, build, breakpoints, keyboard, reduced motion, WebGL failure) as the brief lays out, with a check-in after each phase.
