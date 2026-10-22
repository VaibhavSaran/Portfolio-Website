# Vaibhav Saran — Möbius portfolio

A responsive editorial portfolio built with Next.js, TypeScript, React, and a native Three.js glass Möbius strip. Light and dark themes, continuous ambient twist, scroll-driven surface exploration, and a seamless two-way page loop share one persistent scene.

## Run locally

Use Node.js 20 or later and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. On PowerShell, use `Copy-Item .env.example .env.local` for the optional environment-file step. The page runs without AI keys; the assistant returns a contact fallback when neither provider is configured.

```sh
npm run typecheck
npm run lint
npm test
npm run assets:check
npm run build
```

Tests use provider stubs and do not send email or make paid AI calls. Stop the dev server before building into the shared `.next` directory; restart it afterward.

## Edit content

| File | Responsibility |
| --- | --- |
| `app/data/resume.ts` | Career, projects, research, skills, education; shared with the assistant |
| `app/data/site.ts` | Canonical domain, latest resume URL, contact endpoint, email, calendar, socials, navigation |
| `app/data/testimonials.ts` | Recommendation excerpts and full quotations |
| `app/data/media.ts` | Current portrait and project-art paths |
| `app/data/seo.ts` | Search/social metadata and public ProfilePage/Person structured data |
| `app/components/Portfolio.tsx` | Section composition and editorial presentation copy |
| `app/components/portfolio/` | Reusable presentation elements and shared opening/reprise content |
| `app/components/Contact.tsx` | Form UI and Formspree request |
| `app/components/ChatBot.tsx`, `app/api/chat/route.ts` | Assistant UI and streaming backend |
| `app/globals.css` | Theme tokens, typography, layouts, responsive and motion styling |

The opening uses the smiling beige-suit portrait; About uses the woodland river portrait. All 17 supplied originals are preserved. See the [asset library](assets/README.md), [portrait provenance](assets/portraits/README.md), and [generated inventory](assets/manifest.json). Only selected optimized exports are served from `public/`; earlier artwork and screenshots remain under `assets/archive/`.

## Motion

`app/lib/mobius-geometry.ts` builds a closed half-twisted band with 1,792 flat glass triangles and irregular panel seams. `AmbientScene.tsx` updates the existing geometry buffers so the twist travels at 0.3 radians per second, at up to 30 rendered frames per second. Active elapsed time preserves the pace on slower devices. Hidden tabs pause; reduced-motion users get a still scene.

`app/lib/scene-motion.ts` defines reversible section camera poses and surface sampling. The intro copy stays readable before entry; later scrolling follows the moving strip's surface and normal. `ScrollLoop.tsx` joins matching opening and closing views using an inert, accessibility-hidden reprise. Wheel, touch, keyboard, and upward loops retain form/assistant interactions. Geometry, seam closure, and camera continuity have offline regression tests.

## Search and indexing

SEO from `main` is retained: title, description, keywords, canonical URL, Open Graph/Twitter metadata, and indexing directives. The domain in `site.ts` feeds metadata, `/robots.txt`, `/sitemap.xml`, and structured data. The single-page sections are anchors, not separate sitemap URLs. The full content is server-rendered before JavaScript hydration.

See the [SEO review](docs/seo-review.md) for the branch comparison, validation, and post-deployment checks. Indexing eligibility is configured; live crawling/indexing is verified after deployment in Google Search Console. Meta keywords are retained for compatibility but Google does not use them for ranking or indexing.

## Use the template

Give [community/mobius-portfolio/SKILL.md](community/mobius-portfolio/SKILL.md) to ChatGPT or another coding assistant. It includes the design, content model, motion specification, integration boundaries, and verification workflow. Using this repository as the source produces the closest reproduction; the standalone Markdown also supports rebuilding the design when repository access is unavailable. Replace personal content and service destinations with your own.

The code is MIT licensed. Keep font license notices. Personal photographs, recommendation text, and research/project evidence should be replaced when adapting the template.

## Integrations and deployment

The assistant streams Claude first, falls back to Gemini before any output, then returns contact information. Configure `ANTHROPIC_API_KEY` and/or `GEMINI_API_KEY` in local/deployment secrets. The current contact endpoint is in `site.ts`; test submissions with a mocked response to avoid emailing the owner.

The existing Docker standalone build, Cloud Run workflow, and `/StockPilotAI` and `/F1PrimusAI` redirects are retained. Docker excludes originals, references, docs, local secrets, and community instructions. No deployment was performed during this cleanup. Push this branch and open the PR separately; deployment verification is the next task.

[Architecture and maintenance](docs/architecture.md) · [Asset library](assets/README.md) · [Design history](docs/design/) · [Previous live assistant checks](docs/chat-smoke-checks.md)
