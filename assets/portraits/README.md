# Portrait archive

All 17 photographs supplied on October 21, 2026 are preserved byte-for-byte in `originals/`, with descriptive filenames. `manifest.json` maps each file to its supplied WhatsApp filename, original dimensions, and SHA-256 checksum.

The introduction uses `vaibhav-saran-beige-suit-smile.jpg` (attachment 15): the latest smiling, three-quarter beige-suit photograph. Its warm background fits the site's palette. About uses `vaibhav-saran-woodland-river-front.jpg` (attachment 3) for a more personal outdoor setting. The front-facing beige-suit photograph is a useful alternate. The Green CRISP poster photograph is available for future research/event use.

The site serves optimized, orientation-corrected WebP exports in `public/images/portraits/`: the suit photograph at its supplied 576 × 1024 resolution and the woodland portrait resized to 1125 × 1500. Neither photograph has generated retouching. Responsive CSS controls the displayed crop. Original files are outside `public/` and excluded from the Docker build context; keep them in the repository for future exports.
