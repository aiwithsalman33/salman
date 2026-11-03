# Salman — Creative AI Engineer Portfolio
## Creative direction, content architecture, motion system and Claude Code implementation brief

> **Primary concept:** AI MISSION CONTROL × DIGITAL PLAYGROUND  
> **Positioning:** AI Engineer · Automation Builder · Creative Technologist  
> **Experience goal:** A premium, cinematic, highly interactive portfolio that feels like exploring a futuristic digital world—not scrolling through a conventional résumé.

---

# 1. The creative direction

## Recommended theme: AI Mission Control × Digital Playground

Build a dark, cinematic control-room universe with a playful creative edge. The visitor enters a futuristic digital environment and discovers the work through a guided scroll journey.

The visual language should combine:
- Premium technology brand art direction.
- Futuristic mission-control interfaces and holographic panels.
- A few memorable 3D objects and spatial transitions.
- Editorial typography and strong, confident copy.
- Playful interactions that reward exploration without making the site feel like a game for children.

### Theme alternatives

| Theme | Visual language | Strength | Risk |
|---|---|---|---|
| AI Mission Control | Holographic control room, modules, data interfaces | Best balance of professional and futuristic | Can become a generic sci-fi dashboard if overdone |
| Neon Arcade Universe | 3D arcade world, levels, power-ups | Memorable and playful | Can look too game-like |
| Digital Playground | Floating 3D forms, glass, particles | Most experimental and flexible | Needs a clear visual system |
| Hacker Terminal 2077 | Terminal, scan lines, code, phosphor glow | Developer personality | Can feel dated or cliché |
| Brutalist Creative Studio | Oversized type, asymmetric editorial layouts | Bold and premium | Less naturally suited to 3D storytelling |
| Pac-Man Reimagined | Maze navigation, collectible project nodes | Strong concept and nostalgia | Risks distracting from professional credibility |

**Final direction:** Use AI Mission Control as the foundation, Digital Playground as the motion/3D language, and only subtle arcade-inspired moments. Do not make the whole site a Pac-Man clone.

## Art direction

- Background: near-black / deep graphite (`#080B10`, `#0D1118`).
- Primary accent: electric cyan (`#5CE1E6`).
- Secondary accent: acid lime (`#C7F36B`).
- Text: warm white (`#F3F5F7`), secondary grey (`#9AA5B1`).
- Optional restrained violet for depth (`#9A82FF`).
- Use accent colors sparingly. Avoid the generic purple-blue AI gradient on every section.
- Typography: a distinctive display face such as Space Grotesk, Sora, or a similar geometric grotesk; pair with Inter or Geist for body/UI. Use a mono face such as JetBrains Mono for metadata and system labels.
- Use large editorial headlines, compact technical labels, generous whitespace, layered depth, subtle grain and controlled glow.
- The site must remain legible and premium. Avoid clutter, excessive glassmorphism, constant flashing, and animations that obscure content.

---

# 2. Personal brand and positioning

## Name / identity

**Salman**  
Creator identity: **AI With Salman**  
Handle: `@imsalmaann`  
Primary title: **AI Engineer & Automation Builder**

### Main positioning statement

> I build AI-powered systems, agents and automations that help businesses eliminate repetitive work, move faster and operate smarter.

### Supporting description

I work across AI automation, agentic workflows, voice agents, WhatsApp automation, Python, LLM APIs and no-code/low-code automation platforms. I also create educational content and practical learning experiences around emerging AI tools and workflows.

### Personality

- Curious, experimental, hands-on.
- Builder-first rather than buzzword-first.
- Technical but approachable.
- Creative and energetic, with a professional delivery.
- Focused on practical business outcomes.

### Audience

1. Business owners looking to automate repetitive processes.
2. Startup founders exploring AI agents and workflow automation.
3. Recruiters and technology teams evaluating practical AI engineering experience.
4. Students and aspiring automation builders.
5. Brands looking for AI-focused content collaborations.

### Primary calls to action

- **Let's build something** — contact / project enquiry.
- **Explore my work** — scroll to selected projects.
- **Book a session** — Topmate.
- **Watch my experiments** — social/video content.

---

# 3. Website experience and section-by-section plan

The website should feel like one continuous cinematic experience. Use a clear navigation system so the visitor can still jump directly to sections.

## 3.1 Intro / boot sequence

**Purpose:** Establish the world and create a memorable first impression.

Experience:
- A short, skippable boot-up sequence: system initialization, loading modules, then reveal the hero.
- Keep it under roughly 1.5–2 seconds on repeat visits; never make visitors wait for a long animation.
- Display a small “Skip intro” control.
- Respect `prefers-reduced-motion`.
- Show a subtle loading indicator only if the 3D scene genuinely needs to load.

Possible intro copy:
- `INITIALIZING SALMAN.OS`
- `LOADING CREATIVE SYSTEMS`
- `AI ENGINEER / AUTOMATION BUILDER`
- `SYSTEM ONLINE`

Do not use fake progress that makes loading appear slower than it is.

## 3.2 Hero — the control room

**Headline:**
> I BUILD INTELLIGENT SYSTEMS THAT DO THE HEAVY LIFTING.

Alternative:
> Turning ideas into AI-powered systems.

Supporting copy:
> AI Engineer building automations, agents and digital experiences that make businesses work smarter.

Visual:
- One central 3D “intelligence core” / abstract orbital machine.
- Floating nodes orbit around the core, representing AI, automation, voice, workflows and products.
- The object responds subtly to pointer movement.
- On scroll, the camera moves closer or the object transforms into the next scene.
- Keep the headline and primary CTA readable and prominent.

Small metadata:
- `AI ENGINEER`
- `AUTOMATION BUILDER`
- `INDEPENDENT CREATOR`
- `BASED IN INDIA`

Do not show a live location or precise address.

## 3.3 About — the builder behind the systems

Headline:
> Not just experimenting with AI. Building with it.

Copy:
> I'm Salman, an AI engineer and automation builder focused on turning emerging AI capabilities into practical systems. My work spans business process automation, AI agents, voice experiences, WhatsApp workflows, content systems and education. I enjoy taking an idea from a rough problem statement to a working solution.

Layout:
- Editorial text on one side.
- 3D profile object / animated abstract portrait frame / floating system elements on the other.
- Use a real portrait only if a suitable photo is supplied. Do not generate a fake photorealistic identity portrait.
- Add small animated keywords: `BUILD`, `AUTOMATE`, `EXPERIMENT`, `TEACH`.

## 3.4 What I do — capability modules

Create five interactive modules. Each should have a concise explanation and a small animated visual.

1. **AI Automation**
   - Workflow automation with n8n and Make.com.
   - Connecting apps, APIs, databases and business processes.
   - Reducing manual operations and repetitive tasks.

2. **AI Agents & LLM Applications**
   - LLM API integrations.
   - Agentic workflows and tool-connected assistants.
   - Python-based AI application development.

3. **Voice AI**
   - Voice agent workflows.
   - Text-to-speech experimentation.
   - Regional-language and conversational experiences.

4. **WhatsApp Automation**
   - WhatsApp business workflows.
   - Lead handling, sales support and customer communication.
   - Cloud API and automation integrations.

5. **AI Content & Education**
   - AI-assisted content systems.
   - Founder/avatar video workflows.
   - Tutorials, learning modules and practical projects.

Do not imply that every listed capability is an independently launched commercial product.

## 3.5 Selected work — the project galaxy

This is the main showcase. Use a 3D constellation / orbiting project nodes / horizontal spatial gallery. Each project opens a detailed case-study panel or dedicated route.

### Project A — Ziya Voice

**Context:** Built at Aspirentech Business Solutions over approximately six months, taking the product from scratch with limited senior developer support.

**Showcase copy:**
> Built a voice-AI product from the ground up, working across product thinking, implementation and experience design.

**Show:**
- Voice interface / product mockup.
- Audio waveform and voice visualizer.
- Development journey.
- Product screenshots or demo media if supplied.

**Important:** Do not invent user counts, revenue, accuracy, customers or performance claims.

### Project B — WhatsApp sales automation at PROITBRIDGE

**Context:** Built an internal AI-powered WhatsApp automation system for the sales team.

**Showcase copy:**
> Designed an internal WhatsApp automation workflow to support sales operations and reduce repetitive manual work.

**Show:**
- WhatsApp conversation mockup using fictional/sample data.
- Workflow diagram.
- Lead-to-follow-up journey.
- Integration map.

Do not reveal private customer data, credentials, internal endpoints or confidential screenshots.

### Project C — Tamil / regional-language founder AI avatar workflow

**Context:** Working on founder AI-avatar video content, including Tamil and regional-language workflows.

**Showcase copy:**
> Exploring AI avatar and regional-language content workflows to make founder-led communication easier to produce.

**Show:**
- Video frame mockups, subtitles and language selector.
- A sample pipeline: script → voice → avatar → edit → publish.
- Only use approved sample assets.

### Project D — n8n learning module: 10 projects

**Context:** Created an n8n course module containing 10 practical projects at PROITBRIDGE.

**Showcase copy:**
> Designed a hands-on automation learning module built around ten practical n8n projects.

**Show:**
- Ten numbered project nodes.
- Workflow miniatures.
- Course/module overview.
- Sample screenshots where available.

Do not fabricate learner completion or outcome statistics.

### Project E — WhatsApp automation setup: BOTZUP and CLWise

**Context:** Worked on WhatsApp automation setup and related implementation at Aspirentech.

**Showcase copy:**
> Worked on WhatsApp automation platform setup and configuration to support business communication workflows.

Keep product/vendor claims factual and use screenshots only when permitted.

### Project F — Business automation & freelance builds

**Context:** Freelance AI engineering work focused on business automation and agents.

**Showcase copy:**
> Helping businesses identify repetitive processes and turn them into practical AI-powered workflows.

Potential case-study template:
- The problem.
- The manual process.
- The automation architecture.
- Tools and integrations.
- The result (only verified metrics).
- What I learned.

Do not invent client names, confidential workflows or “10x savings” as a proven outcome. The phrase “save up to 10x time/cost” may be used only as an aspiration or marketing proposition, not as a verified result.

### Project G — AI + marketing operations

**Context:** At Aspirentech, contributed to brand building, social media content, video production, Meta ads, UI/UX and AI automation knowledge-sharing.

**Showcase copy:**
> Working across the intersection of AI, digital marketing and product experience.

Use a collage / campaign wall / content production timeline.

---

# 4. Career timeline

Build a cinematic vertical or horizontal timeline. Each milestone should expand on click or as it enters the viewport.

### ZenXAI — AI Automation Engineer
**June 2025 – August 2025**  
Use the role and dates as recorded in previous career material. Add a concise summary only after confirming the exact work and public-facing project details.

### Aspirentech Business Solutions — Business Analyst / Automation & Product Work
**August 2025 – April 2026**

Highlights:
- Contributed to business and brand growth.
- Built Ziya Voice over approximately six months.
- Worked on WhatsApp automation setups including BOTZUP and CLWise.
- Contributed to client meetings, sales/marketing, Meta ads, UI/UX and social content.
- Supported AI automation knowledge transfer and learning.

Awards associated with 2025:
- Best Employee of the Year (2025).
- Outstanding Student of the Year 2025 — Dhaanish Chennai College.

### PROITBRIDGE — AI Engineer
**May 2026 – Present**  
**Bengaluru, India**

Highlights:
- Internal AI WhatsApp automation for the sales team.
- Founder AI-avatar and Tamil/regional-language content workflows.
- n8n educational module with ten practical projects.
- AI workflow experimentation and implementation.

**Timeline rule:** Make it clear which projects were built as employment work, which were learning/experimental work, and which are independent freelance work. Do not imply ownership of employer products.

---

# 5. Skills constellation

Present skills as a floating, interactive constellation or orbital map. Group by capability instead of displaying a long list of unrelated badges.

### Automation
- n8n
- Make.com
- Workflow design
- API integrations
- Webhooks
- Business process automation

### AI engineering
- Python
- LLM APIs
- Agentic workflows
- AI assistants
- Prompt engineering
- Google AI Studio

### Voice and conversational AI
- Voice agents
- Text-to-speech workflows
- Conversational AI
- WhatsApp automation
- Regional-language AI workflows

### Product and creative technology
- UI/UX thinking
- Vibe coding
- AI-assisted development
- Automation architecture
- Rapid prototyping

### Growth and content
- Meta Ads
- Social media marketing
- AI content workflows
- Video production
- Educational content

Only show tools and technologies the user can confidently discuss in an interview or client conversation. Do not assign arbitrary proficiency percentages.

---

# 6. Creator / educator section

Headline:
> Building in public. Sharing what I learn.

Copy:
> Alongside building AI systems, I create practical content around AI tools, automation, agents and emerging workflows. I enjoy helping students and builders move from watching AI demos to actually building useful things.

Include:
- Instagram: `https://www.instagram.com/imsalmaann/`
- Topmate: `https://topmate.io/aiwithsalman/`
- YouTube: add the correct channel URL after confirming the current channel.
- A content grid for reels, tutorials, experiments and walkthroughs.
- A “Learn with me” CTA linking to Topmate.

A previous profile description referenced 250+ learners. Use this number only if it is still accurate and can be verified before launch.

---

# 7. Achievements

Make this section feel like a collection of unlocked milestones, not a fake leaderboard.

- Best Employee of the Year — 2025.
- Outstanding Student of the Year — 2025, Dhaanish Chennai College.
- Built Ziya Voice from scratch over approximately six months.
- Created an n8n learning module with ten practical projects.
- Built internal AI WhatsApp automation for sales operations.

Use actual award certificates or approved photographs if available. Do not create fake certificates, badges or logos.

---

# 8. Contact / final scene

Headline:
> Have a process worth automating?

Copy:
> Tell me what takes too much time. Let's explore how AI and automation can make it simpler.

Buttons:
- Start a project
- Book a session
- Instagram
- Email

Use a contact form with name, email, project type and message. Add spam protection and clear success/error states.

Email: use the current professional email supplied by Salman before launch; do not assume an old address is still active.

Final visual:
- The central intelligence core returns.
- Project nodes converge into one bright point.
- A short closing line appears: `IDEAS IN. INTELLIGENT SYSTEMS OUT.`

---

# 9. Navigation and interaction design

Persistent navigation:
- SALMAN / AI WITH SALMAN wordmark.
- Work
- About
- Capabilities
- Journey
- Creator
- Contact

Interactions:
- Smooth anchor navigation.
- Active section indicator.
- Custom cursor only on pointer devices; never hide the normal cursor on touch devices.
- Magnetic CTA buttons with restrained movement.
- Project cards with subtle 3D tilt and cursor-following light.
- Hover previews on desktop; tap-to-open on mobile.
- Scroll progress indicator.
- Keyboard accessible menus and dialogs.
- Escape key closes overlays.
- Clear focus states.
- No interaction should require a mouse.

---

# 10. 3D and scroll choreography

The 3D experience is the signature of the site. It must be purposeful, not a collection of unrelated effects.

## Main 3D narrative

1. **Hero — Orbit:** Central intelligence core with orbiting capability nodes.
2. **About — Approach:** Camera moves through a spatial portal; the environment opens into the builder story.
3. **Capabilities — Modules:** Five capability objects appear in a controlled sequence.
4. **Work — Project galaxy:** Camera travels through a project constellation; selected nodes open case studies.
5. **Journey — Timeline tunnel:** Career milestones appear as illuminated stations along a path.
6. **Skills — Network:** Skills connect into a living constellation.
7. **Contact — Convergence:** The scene simplifies and resolves into the final CTA.

## Motion principles

- Every large animation must have a clear purpose and a start/end state.
- Use scroll progress to drive a small number of major camera/object transitions.
- Use staggered reveals for text and metadata.
- Use spring-based motion for cards and controls.
- Avoid animating every element simultaneously.
- Avoid forced scroll hijacking. Native page scrolling must remain natural.
- Use pinned scenes only where they genuinely improve storytelling.
- Make transitions reversible when scrolling upward.
- Avoid long page-locking sequences.
- Respect `prefers-reduced-motion`.

## 3D implementation

Preferred:
- Three.js or React Three Fiber for the primary 3D scene.
- GSAP + ScrollTrigger for carefully choreographed scroll sequences.
- Framer Motion / Motion for DOM transitions, UI interactions and layout motion.
- CSS transforms for lightweight card depth and micro-interactions.

Use only one main 3D canvas where possible. Keep headings, paragraphs, buttons and navigation as real HTML—not text baked into a 3D canvas.

Mobile:
- Replace expensive 3D scenes with simplified meshes, static renders or CSS-based depth effects.
- Reduce particle count, shadow quality and post-processing.
- Keep all content and interactions available.
- Never make mobile users download a desktop-sized 3D experience.

---

# 11. Recommended Claude Code skills and tools

The following are useful resources discovered for this build. Check their current installation instructions, compatibility and licenses before installing.

## Essential

### A. Anthropic Frontend Design
Purpose: Distinctive design direction, polished production UI, typography, color, layout and high-impact animation.

- Official plugin: https://claude.com/plugins/frontend-design
- Claude Marketplace: https://claude.com/marketplace/plugins/frontend-design

This should be the first design skill. It helps Claude commit to an intentional aesthetic instead of producing generic AI-looking layouts.

### B. Three.js / 3D Frontend skill
Purpose: Scroll-driven 3D scenes, camera paths, spatial environments, particles, lighting and interactive 3D.

- Skill repository: https://github.com/zyliu0/3d-frontend

This skill specifically covers scroll-driven 3D website patterns. Review its single-file Three.js assumptions before applying it to a React/Next.js application; adapt the patterns rather than blindly copying its architecture.

### C. Claude Design Skills marketplace
Purpose: Specialized knowledge for 3D, animation, scroll experiences and interactive web development.

- Repository: https://github.com/freshtechbro/claudedesignskills

Relevant skills listed by the repository:
- `threejs-webgl`
- `react-three-fiber`
- `gsap-scrolltrigger`
- `motion-framer`
- `lightweight-3d-effects`
- `spline-interactive`
- `web3d-integration-patterns`
- `modern-web-design`

Suggested marketplace workflow (verify exact current commands in the repository):
```bash
/plugin marketplace add freshtechbro/claudedesignskills
/plugin install threejs-webgl
/plugin install react-three-fiber
/plugin install gsap-scrolltrigger
/plugin install motion-framer
/plugin install lightweight-3d-effects
```

Do not install every skill in the marketplace. Start with the essential set and add only what the implementation needs.

## Useful optional design resources

### D. Impeccable
Purpose: Design critique, refinement, visual polish and UI improvement.

- https://impeccable.style/

### E. UI UX Pro Max
Purpose: Design-system guidance, style and component decisions, UI/UX patterns.

- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

### F. Frontend design toolkit collection
Purpose: Discover additional skills, animation tools, UI references and testing workflows.

- https://github.com/plexormedia/claude-code-frontend-design-toolkit

## Recommended implementation stack

- Framework: Next.js + React + TypeScript.
- Styling: Tailwind CSS or a well-structured CSS variable design system.
- 3D: Three.js / React Three Fiber.
- Scroll choreography: GSAP + ScrollTrigger.
- UI motion: Motion (formerly Framer Motion).
- 3D assets: Spline or Blender-created assets when needed.
- Icons: Lucide.
- Deployment: Vercel or another suitable production host.

Use compatible current stable versions. Do not assume the version numbers in old tutorials are still current.

---

# 12. Technical architecture

Suggested structure:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    navigation/
      Navbar.tsx
      MobileMenu.tsx
    scenes/
      MissionControlScene.tsx
      SceneFallback.tsx
      SceneLoader.tsx
    sections/
      HeroSection.tsx
      AboutSection.tsx
      CapabilitiesSection.tsx
      ProjectsSection.tsx
      JourneySection.tsx
      SkillsSection.tsx
      CreatorSection.tsx
      AchievementsSection.tsx
      ContactSection.tsx
    projects/
      ProjectCard.tsx
      ProjectCaseStudy.tsx
    motion/
      ScrollDirector.tsx
      Reveal.tsx
      MagneticButton.tsx
      ProgressIndicator.tsx
    ui/
      Button.tsx
      SectionHeading.tsx
      Tag.tsx
  data/
    projects.ts
    experience.ts
    skills.ts
    social-links.ts
  hooks/
    useReducedMotion.ts
    useIsMobile.ts
  lib/
    animations.ts
    constants.ts
  styles/
    tokens.css
```

Architecture principles:
- Keep content data separate from presentation.
- Keep the 3D scene isolated from the DOM sections.
- Lazy-load the 3D scene and heavy project media.
- Provide a static fallback if WebGL is unavailable.
- Clean up GSAP timelines, ScrollTriggers, observers and event listeners.
- Avoid unnecessary global state.
- Do not let a 3D rendering error crash the whole portfolio.
- Avoid large dependencies for effects that CSS can handle.

---

# 13. Responsive design requirements

Test at minimum:
- 360 × 800 mobile.
- 390 × 844 mobile.
- 430 × 932 mobile.
- 768 × 1024 tablet.
- 1024 × 768 laptop/tablet landscape.
- 1440 × 900 desktop.
- 1920 × 1080 large desktop.

Requirements:
- No horizontal overflow.
- No clipped headings or buttons.
- No hover-only essential content.
- Mobile navigation works by touch and keyboard.
- Text sizes use fluid typography with sensible limits.
- Images use responsive sources and aspect ratios.
- Cards stack naturally.
- 3D canvas respects viewport and device performance.
- Touch targets are comfortably sized.
- The page remains useful with animations disabled.

---

# 14. Performance, accessibility and SEO

## Performance
- Target a fast first contentful render.
- Lazy-load 3D, video and below-the-fold images.
- Compress images; use modern formats where supported.
- Use poster images for videos.
- Limit particles and expensive post-processing.
- Avoid loading multiple 3D libraries for the same effect.
- Pause or reduce animation when the scene is off-screen.
- Test on a mid-range Android phone, not just a high-end desktop.

## Accessibility
- Semantic HTML and correct heading order.
- Keyboard navigation for every interaction.
- Visible focus states.
- Sufficient contrast.
- Alt text for meaningful images.
- Reduced-motion support.
- Do not communicate meaning using color alone.
- Keep important content outside canvas-only experiences.

## SEO
Suggested page title:
`Salman | AI Engineer, Automation Builder & Creative Technologist`

Suggested description:
`Salman is an AI engineer and automation builder creating AI agents, voice experiences, WhatsApp automations and intelligent business workflows.`

Add:
- Open Graph metadata and social preview image.
- Favicon and app icons.
- Canonical URL after domain selection.
- Person structured data with only verified public details.
- Descriptive project headings and internal links.
- Sitemap and robots configuration.
- Optimized image alt text.

---

# 15. Asset checklist

Collect these before final launch:

1. Professional portrait or creator photo.
2. AI With Salman logo/wordmark if one exists.
3. Ziya Voice screenshots or demo video approved for public use.
4. Approved screenshots of WhatsApp automation workflows.
5. Founder AI-avatar sample video approved for public display.
6. n8n course module screenshots.
7. BOTZUP / CLWise setup visuals that can be shared publicly.
8. Award photographs or certificates.
9. Instagram reel thumbnails / creator content.
10. Project-specific logos and links, if public.
11. A short showreel or screen recording of selected builds.

If an asset is unavailable, create a tasteful abstract mockup or clearly labelled conceptual visual. Never fabricate a screenshot and present it as a real product interface.

---

# 16. Content accuracy rules

These are non-negotiable:

- Distinguish employment projects from independent freelance projects.
- Do not imply ownership of products built for an employer.
- Do not invent client names, revenue, users, conversion rates or savings.
- Do not turn the “save 10x money” positioning into a proven case-study result.
- Use “approximately six months” for the Ziya Voice build.
- Use the ten-project count for the n8n learning module.
- Use the two 2025 awards exactly as described.
- Verify that 250+ learners remains current before publishing.
- Verify the current email, YouTube URL and public project links.
- Do not expose API keys, access tokens, customer data, private dashboards or employer-confidential material.

---

# 17. Build workflow for Claude Code

Do not ask Claude to generate the entire site in one unreviewed pass. Build it in deliberate stages.

### Phase 1 — Research and design system
1. Read this entire brief.
2. Inspect the existing project repository before changing anything.
3. Install/use the Frontend Design skill.
4. Create a design system: colors, typography, spacing, grid, motion principles and responsive rules.
5. Present the chosen direction and component plan before implementation.

### Phase 2 — Functional skeleton
1. Build navigation and all semantic content sections.
2. Add accurate project and career data.
3. Make every section responsive.
4. Add working links and contact actions.
5. Ensure the site works without 3D or animation.

### Phase 3 — Motion
1. Add entrance choreography.
2. Add scroll reveals and progress indicator.
3. Add project interactions and card tilt.
4. Add page transitions only if they improve usability.
5. Test reverse scrolling and reduced motion.

### Phase 4 — 3D
1. Build the hero intelligence core.
2. Add the capability constellation.
3. Add the project galaxy.
4. Connect scroll progress to the camera and scene.
5. Add mobile and WebGL fallbacks.
6. Optimize rendering and loading.

### Phase 5 — Quality assurance
1. Run lint and type checks.
2. Run production build.
3. Test all breakpoints.
4. Test keyboard and touch interactions.
5. Test reduced motion and WebGL failure.
6. Inspect console errors and network failures.
7. Fix all overflow, hydration, animation cleanup and layout bugs.
8. Review performance on a mid-range phone.

### Phase 6 — Final polish
1. Replace temporary assets with real approved assets.
2. Verify every claim and link.
3. Add metadata and social previews.
4. Test contact form delivery.
5. Deploy and inspect the live production build.

---

# 18. Master prompt to give Claude Code

Copy the prompt below after placing this file in the project root as `PORTFOLIO_BRIEF.md`.

```text
You are a world-class creative developer, digital art director, interaction
designer, Three.js engineer and senior frontend architect.

Read PORTFOLIO_BRIEF.md completely before doing anything.

I want you to build a premium, cinematic, highly interactive personal portfolio
for Salman, an AI Engineer and Automation Builder.

THE CREATIVE DIRECTION:
AI MISSION CONTROL × DIGITAL PLAYGROUND.

This must NOT look like a normal portfolio template, SaaS landing page,
generic AI website, or a dashboard full of cards.

It should feel like entering a futuristic creative technology universe.
The visitor should discover my capabilities, projects, career journey and
creator work through an immersive scroll experience.

DESIGN:
- Deep graphite / OLED black foundation.
- Electric cyan and acid-lime accents.
- Premium typography and strong editorial hierarchy.
- Spatial layouts, layered depth, subtle grain and controlled glow.
- Distinctive art direction, not generic gradients.
- Consistent visual language across every section.

3D AND MOTION:
- Use Three.js / React Three Fiber for purposeful 3D.
- Use GSAP ScrollTrigger for cinematic scroll choreography.
- Use Motion for UI transitions and interaction.
- Create a central intelligence core, orbital capability nodes,
  interactive project constellation and career timeline environment.
- Let the 3D scene respond to scrolling in a controlled, meaningful way.
- Keep text and controls as accessible HTML.
- Avoid excessive animation, scroll hijacking and unnecessary effects.
- Support reverse scrolling and prefers-reduced-motion.

CONTENT:
Use the real work history, project descriptions, achievements, skills,
social links and accuracy rules in PORTFOLIO_BRIEF.md.
Do not invent statistics, client results, product ownership or credentials.
Keep employer projects and independent work clearly distinguished.

QUALITY:
- Fully responsive on mobile, tablet and desktop.
- Excellent mobile fallback for 3D.
- No horizontal overflow.
- No dead buttons or fake links.
- Semantic, accessible HTML.
- Good SEO and metadata.
- Lazy loading and performance optimization.
- Clean TypeScript architecture.
- No hydration errors, console errors or broken animations.

WORK METHOD:
1. Inspect the existing repository and report its framework and structure.
2. Present the design system and implementation plan.
3. Build the functional responsive website first.
4. Implement animation and 3D in controlled stages.
5. Run lint, type checks and production build.
6. Test all key breakpoints and interactions.
7. Fix every error before declaring completion.

Do not stop after creating a basic landing page or static wireframe.
Do not replace the requested creative direction with a generic template.
Make deliberate art-direction decisions and execute them with exceptional
attention to detail.

The final result should be memorable, fast, professional, playful and
production-ready.
```

---

# 19. Definition of done

The website is complete only when:

- [ ] The visual identity is distinctive and consistent.
- [ ] The hero creates a memorable first impression.
- [ ] The site has a meaningful 3D scroll narrative.
- [ ] Projects have real descriptions and meaningful presentation.
- [ ] Career history and awards are accurate.
- [ ] All sections work on phone, tablet and desktop.
- [ ] Mobile users receive a fast, attractive experience.
- [ ] Reduced-motion and keyboard accessibility work.
- [ ] Every CTA and external link works.
- [ ] No placeholder content or fabricated metrics remain.
- [ ] No console, hydration, build or layout errors remain.
- [ ] The deployed site has working metadata and social previews.

**The intended result:** A visitor should leave understanding that Salman is not just someone who talks about AI—he is someone who builds, experiments, automates, teaches and turns ideas into working systems.
