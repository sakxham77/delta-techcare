# Delta TechCare — Educational SEO Prototype

**Course:** Search Engine Optimization (SEO)
**Institution:** Bennett University
**Instructor:** Dr. Amit Kumar
**Project ID:** P1 — Local Discovery Makeover for a Neighborhood Service
**Type:** Academic prototype — **fictional business**, not commercially operational

---

## ⚠️ Educational Disclaimer

Delta TechCare is a **fictional business**. Everything on this site — the address,
phone number, opening hours, prices, turnaround times, warranty terms and service
areas — is simulated for classroom demonstration only. No real repair service is
offered. No form on this site sends a real booking. No Google Business Profile or
Google Maps listing exists for this entity.

---

## Purpose

Demonstrate how a local business website can be designed and optimised to improve:

- Local search relevance
- User experience (UX)
- Technical SEO
- Structured data (JSON-LD) implementation
- Conversion pathway design

---

## Folder structure
delta-techcare/
├── index.html Homepage
├── contact-location.html Contact & demo pickup form
├── knowledge-park-student-repair-guide.html Informational content
├── 404.html Custom error page
├── robots.txt Deployment template
├── sitemap.xml Deployment template
├── README.md This file
├── css/styles.css Full design system
├── js/main.js All interactive behaviour
├── services/
│ ├── laptop-hardware-repair.html Service page
│ └── battery-chip-repair.html Service page
└── images/ Image assets


---

## How to run in VS Code

1. Install VS Code and the **Live Server** extension.
2. File → Open Folder → select `delta-techcare`.
3. Right-click `index.html` → **Open with Live Server**.
4. Site opens at `http://127.0.0.1:5500/index.html`.

---

## Testing the interactive features

| Feature | Where | Expected |
|---|---|---|
| Mobile menu | Any page < 700px | ☰ toggles nav |
| Theme toggle | Header button | Persists via localStorage |
| FAQ accordion | Home / services / contact | Expands smoothly |
| Cost estimator | Homepage | Shows illustrative range |
| Pickup form | `contact-location.html` | Validates + shows demo confirmation |
| Back-to-top | Scroll down | ↑ appears bottom-left |
| Call / WhatsApp demo | Contact page | Toast only |

---

## SEO implementation summary

### On-page SEO
- Unique `<title>` and `<meta name="description">` on every page
- Single `<h1>` per page, logical `<h2>` / `<h3>` hierarchy
- Descriptive `alt` attributes, `loading="lazy"` on below-the-fold images
- Contextual internal links with descriptive anchor text
- Content in HTML (crawlable, not JS-injected)

### Local SEO
- Consistent simulated NAP (Name, Address, Phone) in header, footer, contact page
- Localities named accurately (Sector Delta 1, Alpha 1 & 2, Gamma 1, Pari Chowk, Knowledge Park III)
- "Bennett University student zone" — an area description, not a keyword

### Structured data (JSON-LD)
- `ComputerStore` (a `LocalBusiness` subtype) on home and contact pages
- `Service` on both service pages
- `BreadcrumbList` on service pages
- `disambiguatingDescription` flags the entity as fictional
- `FAQPage` was deliberately **not** implemented on the visible FAQ sections because Google limited FAQ rich results in 2023 and the visible content is already clearly labelled — this is a defensible technical choice to disclose in the viva.

### Technical SEO
- Semantic HTML5, ARIA labels, focus states
- Responsive layout (mobile-first)
- Relative URLs throughout, so the site works from any folder or host
- Efficient CSS + JavaScript (no frameworks)

---

## Limitations (must be disclosed in viva)

1. **No real business entity** — cannot get a Google Business Profile or verified map pin.
2. **No live indexing** — localhost cannot be indexed by any search engine.
3. **No back-end** — forms validate client-side only; no data leaves the browser.
4. **Illustrative pricing** — no real market research; all figures are educational.
5. **No canonical URLs yet** — a strategy is prepared but only valid after deployment.
6. **No real customer reviews** — the design deliberately omits fake testimonials.
7. **FAQPage schema intentionally not used** — see rationale above.

---

## Preparing for public deployment

1. Choose a host (GitHub Pages, Netlify, Cloudflare Pages).
2. Upload the `delta-techcare/` folder contents.
3. Replace all `https://example.com/` URLs in `sitemap.xml` with the real URL.
4. Uncomment the `Sitemap:` line in `robots.txt` and update the URL.
5. Submit the sitemap in Google Search Console.
6. Run Lighthouse on the live URL for final screenshots.
7. Verify all structured data with Google Rich Results Test.
8. Confirm no `localhost` strings remain anywhere in the codebase.

---

## Built for

Bennett University — SEO Course (2026) — Project P1