# Chatbot live smoke checks — 2026-10-21

Two live questions were sent to the local `/api/chat` route with explicit user authorization. Both returned HTTP 200 with substantive streamed answers, not the unavailable/contact fallback.

1. Current role and contributions: correctly identified AI/ML Engineering Intern at Trek Health since August 2026 and the profile available at the time. This historical response included usage analytics and a 35% stability improvement; the October 21 resume supersedes those Trek bullets with the diagnostic skill and REST API migration results. The old response is not current content validation.
2. Flagship projects: correctly identified StockPilot AI and F1 Primus AI, described their respective financial-research and F1 pre-race workflows, and returned the configured live project and source links.

Answers were compared with `app/data/resume.ts`. A project link in an answer is not an availability check of the remote deployment; the system prompt now makes that distinction explicit. No contact-form messages were submitted.
