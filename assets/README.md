# Asset library

`public/` contains current browser assets only. This folder preserves the originals and earlier options for future edits; Docker excludes it from deployment.

| Location | Purpose |
| --- | --- |
| `portraits/originals/` | All 17 supplied photographs, unchanged, with descriptive names |
| `portraits/manifest.json` | Original WhatsApp names, pixel dimensions, and SHA-256 hashes |
| `artwork/` | Full-size generated editorial artwork, including earlier device/hand versions |
| `references/f1/` | Supplied F1 reference artwork, original filenames preserved |
| `references/stockpilot/` | Supplied StockPilot reference artwork, original filenames preserved |
| `archive/web-exports/` | Superseded covers, authentic project screenshots, and previous portrait export |
| `archive/documents/` | Earlier resume PDF; the active resume is the Drive link in `app/data/site.ts` |
| `archive/vaibhav-saran-previous-profile.jpg` | Previous profile photograph |
| `manifest.json` | Generated inventory of runtime assets, references, sizes, hashes, and source mappings |

Current project covers and portrait paths are centralized in `app/data/media.ts`. Project covers are editorial illustrations, not product screenshots or clinical evidence. The original Green CRISP poster remains in `public/documents/`, with a WebP preview in `public/images/work/`.

Image-generation prompts and revision rationale are in `docs/design/`; `docs/design/stitch-solid-reference.html` and `docs/PortFolioWebsite.pdf` are historical design references, not application code. Those historical notes describe intermediate states; this file and the current media map describe the final selection.

After adding or changing an asset, run `npm run assets:inventory`, review the manifest, then run `npm run assets:check`. Each reference folder retains the supplied filenames so sources remain recognizable; no reference is silently deleted during cleanup.

The repository's MIT license applies to its code. When adapting the template, supply your own portraits, resume, recommendations, project evidence, and any assets you have permission to publish. Preserve the Inter/Newsreader license notices alongside the fonts.
