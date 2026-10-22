---
name: mobius-portfolio
description: Reproduce or adapt the editorial Next.js portfolio with a traveling glass Möbius background, scroll-driven surface exploration, and a seamless two-way loop. Use for this specific portfolio template, not unrelated website designs.
---

# Build the editorial Möbius portfolio

Create a working personal portfolio matching the visual design and behavior described below. This file is intentionally standalone: a user can give it to ChatGPT or a coding assistant with their resume, portraits, and project information. Produce actual source files and a runnable local preview when the environment supports file creation; otherwise provide a complete project artifact and run instructions.

## Reproduction source

The reference implementation is https://github.com/VaibhavSaran/Portfolio-Website, the editorial `ver_2` design as finalized on October 21, 2026. If that branch has been merged, locate the matching implementation on `main`. Prefer adapting the actual source over approximating the geometry, stylesheet, or scroll loop. A later repository revision may differ: inspect its README, `app/components/AmbientScene.tsx`, `app/lib/scene-motion.ts`, and `app/data/media.ts` before adopting it. Use an explicit commit/tag supplied by the user when available.

If the user already has a checkout, edit it without replacing their unrelated work. If repository access is unavailable, build from the standalone specification below. Markdown alone cannot preserve exact binary artwork or guarantee pixel-identical output; use the reference assets with appropriate rights or create equivalent imagery. Do not claim to have inspected or cloned sources you could not access.

## Personalization

Use supplied facts for name, role, current position, experience dates, achievements, project links/results, research citations, education, skills, and recommendations. Reuse the template's design, not Vaibhav's identity or achievements. Obtain the user's canonical domain, resume URL, email/social links, portraits, and optional contact/calendar destinations from their materials. Continue with visibly editable placeholders when those optional details are missing; never publish invented recommendations or measurable results.

Keep a polished professional portrait in the opening and a different personal/outdoor portrait in About when available. Preserve all supplied original images under descriptive repository names with source filenames and SHA-256 hashes. Serve selected optimized WebP exports only; CSS may crop for layout but do not generate changes to the person's face. Do not copy private environment files, credentials, analytics verification tokens, or someone else's contact-form destination.

## Stack and file ownership

- Next.js App Router, React, TypeScript, Three.js, Lucide icons, and CSS/Tailwind utilities. The reference uses Next 15.5, React 18.3, Three 0.186; use its lockfile when reproducing that version. For a fresh implementation choose compatible available versions and verify the build.
- `app/page.tsx`: server entry rendering the portfolio. Initial HTML contains meaningful text; do not wait for WebGL before showing content.
- `app/components/Portfolio.tsx`: section composition and small disclosure/menu state.
- `app/components/portfolio/`: shared hero/reprise and presentation primitives.
- `app/data/resume.ts`: factual profile, experience, projects, research, skills, education; also feeds the assistant.
- `app/data/site.ts`: domain, resume, contact/calendar/social destinations, navigation.
- `app/data/media.ts`: selected portraits and artwork paths. No inferred version-string filenames in JSX.
- `app/data/testimonials.ts`: authentic excerpts and full recommendation text.
- `app/data/seo.ts`, `app/robots.ts`, `app/sitemap.ts`: metadata and indexing routes.
- `app/lib/mobius-geometry.ts`, `app/lib/scene-motion.ts`: pure geometry/camera functions.
- `AmbientScene.tsx`, `ScrollLoop.tsx`, `ThemeToggle.tsx`, `Contact.tsx`, `ChatBot.tsx`: isolated interactive concerns.
- `public/`: active web images/fonts/documents. `assets/`: originals, references, archived options and checksum manifests. `docs/design/`: prompts and design rationale. Keep reference HTML as data, never runtime code.

## Visual system

Use an editorial gallery aesthetic: warm paper, dark green-black text, sage/blue-gray glass, fine rules, spacious margins, restrained blue micro-labels, large serif display headlines, plain sans-serif body copy, and small tracked monospaced metadata. Avoid neon dashboards, gradient headline fills, glossy generic card grids, and distracting entrance effects.

Light tokens: paper `#f7f8f5`, ink `#17211f`, muted `#5e6a65`, rules `#dce2da`, blue `#345ed7`, soft fill `#eef1eb`. Dark mode uses deep green-black paper, pale text, subdued sage surfaces and brighter blue-gray glass edges. Persist the theme preference and apply it before paint; light is the initial default.

Use locally hosted Inter for body/UI, Newsreader for display/italic emphasis, and a system monospace for metadata. Preserve font licenses. Large desktop hero display type is roughly 72–96px, scaling down near 40px on narrow phones; section titles roughly 36–52px. Long prose should stay comfortably readable with generous 1.7–1.85 line height. Match the reference stylesheet's final cascade when using the repository.

Desktop: centered content approximately 1240–1320px wide, roughly 6vw side gutters, thin dividers, 80px sticky header, generous 100–140px section spacing. Header shows wordmark left, section links/resume center-right, theme toggle right. At about 760px collapse navigation to an accessible menu, stack columns, preserve readable gutters and prevent horizontal overflow.

The opening is an airy sticky composition: small role/location labels, introductory line, large two-line headline with the final word italic, short supporting paragraph, primary project/experience button, secondary resume link, current-position note, and portrait at the right with a gentle lower-edge fade. The translucent Möbius sculpture occupies the middle/background without hiding text. On mobile the portrait becomes a small upper-right image and the band occupies the lower opening area. Keep text foreground surfaces sufficiently opaque where later geometry passes behind them.

## Page sequence

1. Opening introduction with one true H1 and scroll-to-enter prompt.
2. Experience: numbered blue eyebrow, serif section title, editorial rows with dates/employer/role and concise factual bullets. Recent roles visible; earlier experience/open source in an accessible disclosure.
3. Selected engineering: two flagship projects, then supporting work. Each flagship has a tiny category/year strip, 16:9 artwork, short lower caption, category, title/subtitle, narrative/result, technology tags, and source/live links. Supporting projects retain meaningful details instead of becoming a wall of logos.
4. Research/publications: two-column editorial cards where appropriate, with illustration, publication type, title, bullets, measured findings, citation, technology tags, links, and expandable authentic poster/profiler details. Distinguish research evaluation from real-world clinical or production outcomes.
5. About: alternate portrait, personal working philosophy, social links; grouped skills and academic foundation below.
6. Recommendations: authentic quotations with person/role/relationship and expand-to-full text.
7. Contact: invitation, email/calendar/social links, labeled accessible form, and clear success/error states.
8. Quiet footer with wordmark, short tagline, social/copy-email actions, copyright; then an inert visual reprise of the opening that joins the loop.

Use GitHub/LinkedIn glyphs on those links, not an extra external-arrow glyph alongside the social glyph. Other external links can use a small arrow and `rel="noopener noreferrer"` with a new tab. Keep focus indicators, skip navigation, semantic headings, descriptive image alt text, and keyboard-operable disclosures.

## Glass Möbius scene

Use one fixed transparent WebGL canvas behind the entire page. This is a ribbon with a single half twist, not a torus, knot, twisted tube, or three-lobed ring. Use a static CSS fallback when WebGL cannot start.

For `u ∈ [0,2π]`, `v ∈ [-0.82,0.82]`, radius `R=2.35`, and traveling phase `φ`, define:

```text
t = (u - φ)/2 + 0.3 sin(u - φ)
x = (R + v cos(t)) cos(u)
y = (R + v cos(t)) sin(u)
z = v sin(t) + 0.14 sin(2u)
```

Closure invariant: `P(0,v,φ)=P(2π,-v,φ)`. The full parameterized cycle repeats at `φ+4π`. Build roughly 112 longitudinal segments × 8 across, split into 1,792 non-indexed triangles. Slight deterministic UV jitter creates organic panel boundaries; retain triangle, quadrilateral, diamond and hexagonal seam regions. Mesh and seam buffers must use exactly the same parameter samples/phase. Recompute flat normals after deformation without rebuilding topology.

Use physical glass material: double-sided, pale sage/blue-gray, roughness about 0.07, metalness 0.12, transmission about 0.55 in light mode/0.65 dark, clearcoat 1, thickness 0.15, IOR 1.45. Use room/studio environment reflections, hemisphere light, directional key/rim, crisp visible fine seams, ACES tone mapping, and capped pixel ratio about 1.6. Theme changes update lighting/materials without remounting the entire scene.

Idle motion begins automatically after scene initialization, without scroll or pointer input. Advance `φ` by active elapsed seconds × 0.3. Limit rendering to about 30fps while keeping the phase independent of frame count. Reuse dynamic position buffers. Pause on hidden tabs and reset the elapsed-time anchor on resume so the surface does not jump. Keep a single requestAnimationFrame chain; do not cancel/restart it on every scroll event. Honor `prefers-reduced-motion` with a still scene, readable introduction, and no continuous frame loop. Dispose GPU resources, observers, and listeners on unmount.

## Scroll journey and loop

Ambient deformation is separate from scroll progress. Scrolling forward enters/approaches the band; scrolling backward reverses the same path. Preserve native scrolling; do not impose a splash screen, blocking gestures, rewind overlays, or scroll-lock choreography.

Intro interpolation uses `smoothstep(t)=clamp(t)^2(3−2clamp(t))`. Hold copy longer, then fade it with `1−smoothstep((p−0.23)/0.56)` and shift it up at most 28px. Begin approach around `p=0.15`. Set entry/camera poses from measured section offsets, not hardcoded document pixel heights.

For faithful reproduction reuse `scene-motion.ts` from the reference. It has nine keyed overview poses spanning opening, aperture, experience, projects, research, about, recommendations, contact and matching closing. Surface-flight samples progress through `u=[0,0.38,1.35,2.5,3.6,4.9,5.65]`, `v=[−0.12,0.28,−0.35,0.32,−0.2,0.25,−0.1]`, and normal distances `[0.62,1.1,0.9,1.25,0.75,1,1.4]`. Blend into the close-up after intro entry, out toward the closing. Sample the moving geometry, tangent and surface normal at the current phase so the camera follows the ribbon without detaching. Keep object pose and camera projection continuous during these blends.

After the footer, render an accessibility-hidden, `inert` reprise of the same opening component. When its view aligns with the original opening, wrap native scroll coordinates to the matching original position in the same frame, retaining overshoot. Upward wheel/touch/keyboard intent at the top wraps to the matching closing view. Handle input near the boundaries only; leave form fields, contenteditable controls and chat-panel scrolling alone. Avoid duplicate H1s, focus targets, IDs or announcements in the reprise. Test both directions at desktop and phone widths.

## Illustrations and provenance

Use ivory/sage editorial still-life illustrations of glass and stone with soft studio lighting and no embedded UI text or fake logos. The reference has: a financial archival research lens, an unbranded open-wheel racing model with telemetry planes, an opportunity sorting sculpture, a multi-device comparison gallery, distinct fingerspelling hand sculptures, clinical reasoning glass layers, and six sustainability panels around a computing core. Keep project evidence separate from these illustrative covers.

For repository-based reuse preserve the selected v2 flagship/research images and v3 device/hand images listed in `media.ts`. Prompt history and full-size outputs live in `docs/design/` and `assets/artwork/`. Copy or generate images only when the user has rights/authorization and the environment supports it. Do not invent paths to nonexistent image-generation outputs. A matching page layout should remain usable while image assets are pending.

## Optional integrations

The portfolio must work without API keys. If requested, implement a small portfolio assistant with a server route using the same factual profile, bounded validated history, streamed plain text, first-provider/fallback-provider behavior only before output begins, and a contact fallback. Keep keys server-side; use current supported SDK/model details when implementing anew. Do not silently make paid calls during tests.

Configure the contact endpoint for the actual user. Use mock responses for verification; do not submit test emails to the reference owner. Resume links use the user's current URL. Calendar and project redirects should point only to real supplied destinations. Deployment, account setup, PR creation and publishing are separate actions requiring the user's request; providing this file is not authorization to perform them.

## SEO and delivery

Set truthful role/name title, description, canonical domain, Open Graph/Twitter metadata, author, crawlable robots rules and a sitemap. Keep the domain in one data file so these cannot drift. Optional ProfilePage/Person JSON-LD must match public visible facts. Escape `<` when serializing JSON-LD into HTML. Keep the whole profile server-rendered; do not gate content on WebGL/hydration. Sitemap the canonical page only, not its hash anchors. Keywords can be retained for compatibility, but Google does not use meta keywords for ranking/indexing. Never promise Google inclusion.

Run type checking, lint, meaningful geometry/camera/provider tests, local-asset integrity checks, and a production build. Verify actual rendered HTML metadata and public robots/sitemap routes. Inspect desktop and a ~390px phone viewport, both themes, the two portraits, disclosure controls, a moving twist while scrollY remains zero, reversible scroll entry and both loop directions. Check for console errors, missing assets and overflow. Restore the preview to the opening and report what passed and what remains unverified. Keep all work local unless publishing was explicitly requested.

Deliver a README with setup/content locations and an `.env.example` containing empty placeholders only, retain the MIT code attribution and font licenses, and document asset provenance. Never include the source author's secrets, personal portraits, or recommendations as another person's identity.
