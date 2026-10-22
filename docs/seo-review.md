# SEO review — October 21, 2026

Compared the working `ver_2` branch with freshly fetched `origin/main` at `e7e6c9f8cd5971d647f16e1c2059f07416d72e4c`. No merge or branch switch was needed.

## Retained from main

- Name/role page title, the complete keyword list, author/creator, canonical URL, and metadata base.
- Open Graph and Twitter descriptions, website type, and site name.
- `index,follow` for general robots and Googlebot.
- Crawl permission for all public pages and a single canonical homepage sitemap entry.

The description reflects the latest supplied career/research facts. The old splash-screen content gate is absent. Sections render in the initial HTML and remain available without the scene loading.

## Cleanup

Metadata now lives in `app/data/seo.ts`; `site.url` supplies the domain for metadata, sitemap, generated robots route, and ProfilePage/Person JSON-LD. `app/robots.ts` replaces the static robots file with equivalent crawl permissions. The structured data contains public name, role, profile image, social links, and educational institutions shown on the page. It does not invent ratings, credentials, or review markup. Hash-fragment sections remain out of the sitemap because they are parts of one page.

The original keyword list is still present. Google explicitly [ignores meta keywords for indexing and ranking](https://developers.google.com/search/docs/crawling-indexing/special-tags). Titles, descriptions, accessible content, canonical consistency, crawl access, and the sitemap are the useful checks here. A [sitemap aids discovery but does not guarantee indexing](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

## Verification

Offline tests check a consistent canonical domain across metadata/robots/sitemap/JSON-LD, enabled indexing, and existing referenced public images/documents. Production build and local rendered HTML checks confirm that metadata, structured data, and portfolio content are emitted, and `/robots.txt` and `/sitemap.xml` respond.

After deployment, verify the canonical HTTPS hostname responds with 200, redirects resolve consistently, and no hosting-level `X-Robots-Tag: noindex` is injected. Verify the property and submit `https://vaibhavsaran.com/sitemap.xml` in Google Search Console, then inspect the homepage. Domain verification and live Google indexing were not performed as part of local cleanup. The retained Cloud Run deployment is checked in the next task.
