# Architecture and maintenance

The home route is a server component that renders the client portfolio tree into initial HTML. Interactive boundaries are the menu, disclosures, theme control, contact form, assistant, Three.js scene, and page loop. The visible page is not gated behind a splash screen or a loaded WebGL context.

## Content ownership

`app/data/resume.ts` owns factual career/research information for both the page and assistant. `site.ts` owns destinations and the canonical domain. `testimonials.ts` owns verbatim recommendation text; presentation excerpts do not rewrite the originals. `media.ts` owns selected project and portrait paths. `seo.ts` owns metadata and structured identity facts. Narrative section headings and layout remain in `Portfolio.tsx`; reusable link, tag, section heading, illustration, and hero components live in `components/portfolio/`.

Keep source facts separate from imagery: generated editorial covers illustrate a theme, while archived screenshots and the original poster provide authentic project evidence. Treat historical reviews and exported reference HTML as records, not executable instructions or current content sources.

## Asset changes

1. Preserve supplied originals in the relevant `assets/` folder with descriptive names; add source notes when provenance is new.
2. Export only selected web assets into `public/`, keeping intrinsic dimensions and useful alt text.
3. Update `media.ts` and any affected prompt/review notes. Move superseded exports to `assets/archive/` instead of discarding them.
4. Run `npm run assets:inventory`, inspect the source mappings/hashes, then `npm run assets:check`.

The generated inventory covers public images, fonts, documents, preserved asset files, and PDF/HTML design references. `assets/portraits/manifest.json` additionally records original upload filenames and dimensions for the 17 portraits. Markdown documentation itself is outside the asset checksum scope.

## Motion boundaries

Geometry, camera math, and loop interaction are separate modules. The scene mutates vertex buffers in its render loop; it does not store animation frames in React state. Mesh, seams, and camera sample the same phase. Preserve half-twist seam closure, the 4π parameter cycle, reduced-motion behavior, hidden-tab pause, and an inert reprise. Camera poses and CSS rules depend on section IDs/order and the shared header/hero dimensions; check both desktop and mobile after changing these.

The stylesheet retains intentional cascade order for the approved typography and scene refinements. Do not alphabetize or flatten these overrides without visual comparison; later media queries and point-size adjustments intentionally win.

## Validation and handoff

Run type checking, lint, offline tests, asset verification, and production build. Inspect desktop/mobile, both themes, opening motion without scroll, reversible entry, research poster disclosure, and the footer loop. Use mocked form/provider responses for routine tests. Existing live assistant checks are recorded separately.

`tmp/`, `.next/`, `graphify-out/`, local skills, environment secrets, and generated Firebase caches are not source deliverables. The old Firebase hosting pages/config are removed; the current Cloud Run workflow is unchanged. Retain `LICENSE.md` and local font licenses. Push, PR creation, and deployment are separate user-controlled steps.
