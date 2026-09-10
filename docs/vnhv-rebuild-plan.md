# vnhv.org — Three-Audit Reconciliation & Rebuild Plan

**Site:** https://www.vnhv.org (Trường Việt Ngữ Hùng Vương, Houston) · **Portal:** https://ghidanh.vnhv.org
**Prepared:** September 9, 2026 · **Rev. Sep 10:** palette changed to navy + bamboo green (uniform colours), black removed · **Inputs:** three independent audits (Gemini, ChatGPT, Claude) + live inspection of the website and portal in a real browser (desktop 1366px and mobile 375px/Android UA)
**Not available:** source repository, WP admin, hosting/server access, GA4/Search Console data, brand guidelines, board-confirmed business goals. Nothing below invents those.

> **Audit attribution (assumption).** The three uploaded files are unlabeled. By style and content I have attributed them as: `vnhv_website_audit_and_modernization_strategy.md` → **Gemini**; `VNHVWebsiteAuditandModernizationStrategy.md` → **ChatGPT**; `vnhvwebsiteaudit.md` → **Claude**. If that mapping is wrong, only the source labels in the matrix change — not the assessments.

---

## 1. Executive summary

**Verdict: a partial redesign on the existing WordPress installation — not a cosmetic refresh, and not a full replatform.** The homepage, navigation, registration/giving/event journeys and the program pages get rebuilt on a lighter theme with a small design system; the ~90 archive pages, 15 testimonials, 34 staff profiles and the news archive are preserved and migrated with redirects. The PrinciPal portal is kept as the back-office system of record and hidden behind a school-branded parent front door.

**Why this scope.** Live inspection confirmed that the problems are structural but not platform-level:

- The two enrollment links the site exposes — homepage "Lớp học" → `/PrinciPal/Students` and the returning-student link on Ghi danh → `/PrinciPal/Parents/RegisterParent` — both return **404**. The working portal paths (`/` and `/Parents/RegisterCurrentStudents`) are one directory level different. This is a link bug, fixable today, and it is the single most enrollment-damaging finding.
- On a 375px Android-UA viewport the Slider Revolution hero renders at **height 0 / visibility hidden**: mobile visitors get no hero, no headline and no "GHI DANH" button. None of the three audits caught this exactly (ChatGPT saw clipping at 390px in what appears to have been a desktop-UA emulation).
- The homepage has **no `<h1>`, `lang="en-US"`, no meta description, no Open Graph, no JSON-LD**; the primary menu holds **204 list items** (Sinh hoạt alone: 81); the page transfers **3.36 MB across 77 requests** with a measured TTFB of ~4.3 s on one sample; buttons are white-on-`#ffb606` (~1.8:1).
- Facts contradict each other on the site: 279 students / 41 teachers / 22 classes (homepage counters) vs "hơn 36 năm" (footer) vs "approximately 25 classes" (Lịch trình) vs "approximately 18 classes" (Liên lạc) vs 35 teachers / 225 students / 0 graduates (About Us); the portal says tuition is $200 while the website says $230 after July 1.
- Giving still points to AmazonSmile (closed Feb 2023). The gala sells tickets through Zeffy ($80 / $800 table) — but only via a `tinyurl.com/KN40N` link on the homepage; the dedicated Kỷ niệm 40 năm page embeds three PDFs and has no ticket link at all.

**What the three audits got right, together:** the enrollment journey, AmazonSmile, navigation bloat, slider removal, bilingual separation with hreflang, stale/contradictory content, and local SEO. **Where they diverged:** Claude did not detect the 404s (it tested a working path) and stated Liên lạc omits the email (it does not); Gemini asserted unverifiable numbers (3–8 MB gallery JPEGs on the homepage, "LCP > 4.2s", ">1,200 DOM nodes" — the last is roughly right at 1,496) and proposed a video/carousel hero that contradicts the other two; ChatGPT was the most accurate on markup facts and the only one to find the working Zeffy path.

**Recommended direction: B (Conversion-Focused) as the base, with A's brand continuity (gold logo lock-up, quick-link tiles, Vietnamese-first labels) and C's editorial 40-year timeline band retained.** Palette (board input, Sep 10): **navy blue and bamboo green — the teachers' uniform colours — plus the gold of the logo; no black.** Detail in §9.

**First 30 days (no rebuild needed):** fix the two 404 links; replace the tinyurl with the direct Zeffy URL and put a ticket button on the gala page; remove AmazonSmile and add a Zeffy donation form; correct the six contradictory facts; add H1/lang/meta/OG; page cache + CDN + uptime monitor; noindex author archives; add the sitemap to robots.txt.

---

## 2. Current-state assessment

Every line is tagged: **[Verified]** observed directly in the browser on Sep 9, 2026 · **[Concern]** evidence-supported but not measured end-to-end · **[Opinion]** design judgement · **[Assume]** needs stakeholder confirmation · **[Unverifiable]** could not be checked without access.

### 2.1 Business positioning and audience
- [Verified] Non-profit 501(c)(3) Vietnamese language and cultural school, founded 1986 (Rice → St. Thomas 1988 → HCC), Sunday 9:00–12:00 at HCC Central, 1300 Holman St, Houston 77004. Homepage counters: 279 students, 41 teachers, 22 classes, 40 years. Tuition 2026-27: $200 before June 30, $230 July 1–Aug 14; opening day Aug 16, 2026. 40th-anniversary gala Oct 24, 2026 at Ocean Palace (Zeffy: $80 ticket / $800 table).
- [Verified] Title tag "Trường Việt Ngữ Hùng Vương – Bảo tồn văn hoá Việt Nam" is brand-descriptive; no English or location variant.
- [Assume] Primary audiences, in priority order: (1) parents enrolling children, (2) gala attendees/donors this fall, (3) volunteers/phụ giáo, (4) alumni, (5) adult learners. Board should confirm the ranking — it drives the homepage order.
- [Unverifiable] Traffic mix, search rankings, conversion rates, enrollment-by-channel.

### 2.2 Information architecture and navigation
- [Verified] Eight top-level items; primary `<ul>` contains **204 `<li>`**; "Sinh hoạt" holds **81** descendants (yearbooks, 30/40-year commemorations, photos by year 1986→2026). 259 links on the homepage, **49 of them `href="#"`** (menu parents + footer Privacy/Terms/Legal/Sitemap).
- [Verified] The mobile drawer is the same 204-item list; there is no menu-button `aria-label`.
- [Verified] Duplicate/legacy URLs: `/gioi-thieu/` 301s to `/trang-nha/gioi-thieu/` (redirect exists — Claude's "reachable at both" is technically a redirect, not duplication). Two empty pages are published and in the sitemap: `/trang-nha/ghi-danh/don-ghi-danh-cho-hoc-sinh-moi/` and `/…/don-ghi-danh-cho-hoc-sinh-dang-hoc/` (no content).
- [Opinion] Archive belongs in a dedicated "Lịch sử & Cựu học sinh" hub, not in the primary menu.

### 2.3 Content clarity and messaging
- [Verified] Hero slide 1 text: "Niên khóa 2023-2024 Ban Giảng Huấn" (the image file is `VNHV_BGH_2025_2026-1-scaled.jpg` — image updated, text layer not). Slide 5 links to the 2018-2019 graduation post. Program posts (cấp 1/2/người lớn) show "19 July, 2017".
- [Verified] Contradictory facts (§1). Footer credits "Designed and Developed by Trung Hoang" with an `http://` link.
- [Verified] Bilingual handling is inconsistent: Ghi danh and Hỗ trợ interleave VI/EN paragraph by paragraph; About Us is EN-only; Giới thiệu is VI-only; Liên lạc is VI with EN schedule block.
- [Verified] 15 student testimonials exist as a custom post type — a real asset.

### 2.4 Visual hierarchy and brand
- [Verified] Eduma (Thim) theme demo layout; Roboto only (400/700/900); gold `#ffb606` primary + black top bar; dotted overlay on hero photos; five news cards use the theme's `demo_image.jpg`; a 736×310 photo is stretched to 2848×1200 and a 640×354 photo to 976×540 (visible softness).
- [Opinion] The gold logo is recognizable and worth keeping; the black chrome is not — the school's own uniform colours (navy blue + bamboo green) are a better base and were adopted on Sep 10. The theme chrome (counters, dotted overlay, generic cards) goes.

### 2.5 Calls to action and conversion paths
- [Verified] Enrollment: Ghi danh tells new families to email name/DOB/gender/parents/phones to `vietnguhungvuongnoreply@gmail.com`, or download `VNHV-2025-Registration-Form.docx/.pdf` (2025-labelled for the 2026-27 cycle); returning-student link 404s; homepage "Lớp học" card 404s. Portal (when reached directly) is titled "Trường tôi", shows admin navigation (Học sinh, Lớp, Thầy cô, Điểm danh, Quản trị, Nạp tiền PayPal…) to anonymous visitors, has no `lang`, zero `<label>` elements on its form, and states tuition $200.
- [Verified] Giving: Hỗ trợ = email, check to PO Box 721111, AmazonSmile (defunct). EIN 76-0322140 published.
- [Verified] Gala: homepage → tinyurl → Zeffy works. Kỷ niệm 40 năm page: three `pdfemb` embeds (VN poster, EN poster, "how to purchase tickets" flyer), a mailto to HV40@VNHV.ORG, no ticket link.
- [Verified] No volunteer or alumni journey; Học Bổng Phụ Giáo page describes the scholarship but has no application path.

### 2.6 Mobile responsiveness
- [Verified] Viewport meta present; no horizontal overflow at 375px. **Slider hidden at 375px/Android UA** (rs-module height 0, visibility hidden) → first screen is the six gold quick-link cards on grey; no headline, no primary CTA. At 800px (desktop UA) the hero renders but the slide-1 headline is clipped at the top.
- [Verified] Quick-link cards are gold text on grey (`#ffb606` on `#5a5a5a`-ish) — low contrast on the first mobile screen.

### 2.7 Accessibility (WCAG 2.2 AA)
- [Verified] `<html lang="en-US">` on a Vietnamese site (3.1.1). No `<h1>` on the homepage; sub-pages use theme H1s (Ghi danh: "ghi danh"). Heading order jumps to H3. 34 images: 1 without `alt`, 5 with empty alt including informative ones. Contact Form 7 form: 14 inputs, 1 `<label>`, placeholders as labels. No skip link. No visible focus styles observed on nav. Button contrast ~1.8:1 (white on #ffb606). Slider auto-advances with no pause control. Parking/campus map is an image; gala information is PDF-only.
- [Unverifiable] Full keyboard/screen-reader pass across all templates (needs the rebuild to test).

### 2.8 Technical SEO / on-page SEO
- [Verified] Home: no meta description, no OG/Twitter, no JSON-LD, canonical present, no hreflang. `wp-sitemap.xml` works (84 pages, 37 posts, 21 legacy tp_event items from 2019–22, 15 testimonials, 34 our_team, 5 author URLs); `sitemap_index.xml` 404; `robots.txt` has `Crawl-delay: 10` and no `Sitemap:` line. Author archives (`/author/vnhv/`, `/author/vnhv2017/`, `/author/hoang-truong/`…) are 200 and indexed. ~35 pages carry cloned slugs (`/trang-nha/ky-yeu-30-nam-2-2-2-2-4-5-3-2-2-2-3-2/`). Posts at `/sinh-hoat-le-ta-on-2024-2/`, `-3/`, `/sinh-hoat-trung-thu-2024-2/` are 2025 events with 2024 slugs. `/tai-khoan/` and `/no-access/` (LearnPress) are in the sitemap. Nine `http://vnhv.org/…` links in slides.
- [Concern] No English-intent landing page for "Vietnamese classes for kids Houston".

### 2.9 Performance and Core Web Vitals
- [Verified, single sample] TTFB 4,285 ms; DOMContentLoaded 5.2 s; load 6.35 s; 77 requests; 3.36 MB transferred; HTML 250 KB; 1,496 DOM nodes; 37 script files; Slider Revolution 6.7.23 loads all seven slide images including hidden ones (slider-4.jpg 527 KB, BGH 339 KB); jQuery + jquery-migrate; reCAPTCHA v3 loaded on every page; `analytics.js` (UA-103323722-2, dead since 2023) loaded alongside gtag (G-K4V7DZ7BSF).
- [Unverifiable] Field CWV (needs Search Console / CrUX). A lab run from the user's own machine (PageSpeed Insights) is the first roadmap task. Gemini's "3–8 MB JPEGs on the homepage" and "LCP > 4.2s" are not supported by what loads on the homepage.

### 2.10 Forms, interactions, error states
- [Verified] Contact form (CF7) with reCAPTCHA v3; newsletter signup (no visible list provider); portal form with no labels; no inline validation observed. [Unverifiable] Where newsletter submissions go.

### 2.11 Code quality, maintainability, security
- [Verified] `meta generator` exposes "WordPress 7.1" and "Slider Revolution 6.7.23"; usernames exposed via author archives; LearnPress/Eduma LMS features unused but active (account/no-access pages); mixed http links; portal copyright 2017–2021 (QueTek "PrinciPal"). [Unverifiable] Plugin update status, backups, 2FA, hosting plan, PHP version.

### 2.12 Analytics, structured data, tracking
- [Verified] GA4 present; no conversion events can be inferred from markup; no schema of any kind; Jetpack stats present.

### 2.13 Pages and URLs that must be preserved
Inventory from the sitemap (see §10 migration map): 7 operational pages, 3 program posts, 15 testimonials, 34 staff profiles, ~40 archive/yearbook pages, 37 posts, Facebook/video gallery pages, FAQs, PTO page, Học Bổng Phụ Giáo page.

---

## 3. Three-audit comparison matrix

Severity is my final assessment. "Agree" = all three; "2/3" = two of three; "Unique" = one audit only. Effort: S ≤ ½ day · M = 1–3 days · L = 1–2 weeks · XL = multi-week.

| # | Finding | Source(s) | Area | Sev | Agreement | Evidence (live check) | Final assessment | Action | Impact | Effort |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Enrollment portal links return 404 | ChatGPT | Conversion | **Critical** | Unique (Claude tested a working path; Gemini silent) | `/PrinciPal/Students` and `/PrinciPal/Parents/RegisterParent` → 404; `/` and `/Parents/RegisterCurrentStudents` → 200 | Confirmed. Highest-value fix on the site | Repoint both links today; later replace with branded enrollment page | Direct enrollment recovery | S |
| 2 | New-student registration is an email + 2025 Word/PDF forms | All three | Conversion / data handling | **Critical** | Agree | Ghi danh text and file names verified | Confirmed; DOB by email to a noreply Gmail is also a privacy issue | One online form with validation + payment (Zeffy form or Gravity Forms+Stripe), feeding PrinciPal | Enrollment completion, office workload | M–L |
| 3 | Portal looks like a different organization / exposes admin nav | Claude (ChatGPT partially) | UX / trust | High | 2/3 | "Trường tôi", QueTek footer, admin menu visible to anonymous users, no labels, no `lang` | Confirmed | Branded parent landing page on vnhv.org; portal only for returning-student number entry until replaced | Trust, abandonment | M (front door) / vendor (re-skin) |
| 4 | AmazonSmile still promoted; no online donation | All three | Giving | High | Agree | Hỗ trợ page verified | Confirmed | Remove; add Zeffy donation form (already on Zeffy for the gala) | New revenue channel | S |
| 5 | Gala has no direct ticket path on its own page; tinyurl on homepage | ChatGPT (Gemini misdescribed as "static form/email") | Events | High | 2/3 with disagreement | tinyurl → Zeffy works ($80/$800); Kỷ niệm 40 page = 3 PDFs + mailto | Confirmed. Gemini's claim that tickets require email is wrong | Direct Zeffy button on homepage + gala page; HTML event details; keep PDFs as downloads | Ticket sales before Oct 24 | S |
| 6 | Navigation bloat (archive in primary menu) | All three | IA | High | Agree | 204 `<li>`, Sinh hoạt = 81 | Confirmed; Gemini's "60+" undercounts | 5–6 task-based top-level items; archive hub page | Findability, mobile menu, DOM size | M |
| 7 | Hero slider: heavy, auto-advancing, dated | All three (Gemini contradicts itself by proposing a video/carousel hero) | Design / perf / a11y | High | Agree on removal (Gemini inconsistent) | 7 slides, hidden slide images loaded, 527 KB largest | Confirmed | Static hero, one optimized image, `fetchpriority=high` | LCP, CLS, clarity | S–M |
| 8 | Slider hidden entirely on mobile | **None** (ChatGPT: "clipped at 390px") | Mobile | **Critical** | Missed by all | rs-module height 0 / hidden at 375px Android UA | New finding; confirm on real iOS/Android devices | Same fix as #7 | Mobile conversion | — |
| 9 | No H1, wrong `lang`, no meta description / OG / JSON-LD | ChatGPT (Claude: schema only; Gemini: schema only) | SEO / a11y | High | 1/3 full, 3/3 on schema | All verified on homepage | Confirmed | Fix in theme/SEO plugin | Rankings, sharing, screen readers | S |
| 10 | Bilingual content interleaved; recommend /vi/ + /en/ with hreflang | All three | Content / SEO | High | Agree | Verified | Confirmed. Phase it: Level 1 (structured blocks + `lang` attrs) now; Polylang later | Level 1 now; Level 2 in redesign | English-intent search, readability | M then L |
| 11 | Contradictory facts (years, classes, students) | Claude, ChatGPT | Content governance | Medium | 2/3 | 40/36 years; 22/25/18 classes; 279/225 students; 41/35 teachers; $230/$200 tuition | Confirmed and worse than either audit listed | Single facts sheet; annual August refresh; remove dead counters | Trust | S |
| 12 | Program pages are 2017-dated posts | Claude, ChatGPT | Content / SEO | Medium | 2/3 | "19 July, 2017" verified | Confirmed | Convert to pages with the program template | Freshness signal, conversion | M |
| 13 | Cloned slugs, misleading permalinks | Claude, ChatGPT | SEO | Medium | 2/3 | ~35 `ky-yeu-30-nam-2-2…` pages; 2025 events with 2024 slugs | Confirmed | Rename with 301s via Redirection plugin | Crawl clarity | M |
| 14 | Author archives / usernames exposed | Claude | Security / SEO | Medium | Unique | 5 author URLs in sitemap, 200 OK | Confirmed | noindex + remove from sitemap; 2FA | Security hygiene | S |
| 15 | Button/text contrast failures (white on #ffb606 ≈ 1.8:1; gold on white/grey) | ChatGPT, Gemini | A11y | High | 2/3 | Computed styles verified | Confirmed | New palette: navy + bamboo green primaries, gold as accent only | WCAG 1.4.3 | S (tokens) |
| 16 | Form labels missing (placeholders only) | ChatGPT | A11y | Medium | Unique | CF7: 14 inputs / 1 label; portal: 0 labels | Confirmed | Rebuild forms with labels + error summaries | WCAG 1.3.1, 3.3.x | S |
| 17 | Images without alt / generic demo images | ChatGPT (alt), ChatGPT (demo) | A11y / credibility | Medium | Unique | 6 alt issues; 5× `demo_image.jpg` | Confirmed | Alt pass; real featured images | Credibility | S |
| 18 | Origin slow / intermittent timeouts | Claude (timeouts), ChatGPT (227 KB HTML), Gemini (unsupported numbers) | Performance | High | 3/3 on "slow", different evidence | TTFB 4.3 s, load 6.35 s, 3.36 MB (one sample); no timeouts in my window | Confirmed slow; "intermittent" not reproduced | Page cache + CDN + uptime monitor; then asset work | LCP, reliability | S then M |
| 19 | Dead UA tag + legacy analytics.js; reCAPTCHA loaded sitewide | **None** | Perf / tracking | Low | Missed | Verified | New | Remove UA/analytics.js; load reCAPTCHA only on form pages | ~3 requests, cleaner GA | S |
| 20 | Contact page omits email and hours | Claude | Content | — | Unique, **incorrect** | Liên lạc shows support@vnhv.org and Sunday 9–12 | Rejected | None | — | — |
| 21 | "310 students / 18 classes" on homepage | Claude | Content | — | Unique, **outdated** | Counters now read 279 / 22 | Superseded (site changed) | — | — | — |
| 22 | Homepage galleries load 3–8 MB JPEGs; LCP > 4.2 s; 1,200+ DOM nodes | Gemini | Performance | — | Unique, **unsupported** | Largest homepage image 527 KB; DOM 1,496; LCP not measured | Reject the figures; keep the direction | Measure with PSI first | — | — |
| 23 | Interactive floor-plan seat picker, Stripe checkout, Apple Wallet QR tickets | Gemini | Features | Low | Unique, over-scoped | Zeffy already sells tickets | Reject: rebuilds what Zeffy does | Use Zeffy | — | — |
| 24 | Video background / HD carousel hero | Gemini | Design | — | Unique, contradicts #7 | — | Reject | — | — | — |
| 25 | Empty published pages (đơn ghi danh mới / đang học) in sitemap | **None** | Content / SEO | Medium | Missed | Both 200 with empty body | New | Unpublish or use them as the new form pages | Crawl waste, confusion | S |
| 26 | LearnPress/Eduma LMS leftovers (`/tai-khoan/`, `/no-access/`, 21 stale tp_event items) | Claude (partially: "migrate off Eduma") | Maintainability | Medium | 1/3 | In sitemap | Confirmed | Disable LearnPress; unpublish stale events; consider theme swap | Attack surface, crawl | S–M |
| 27 | Sitemap not in robots.txt; `Crawl-delay: 10` | ChatGPT (sitemap) | SEO | Low | Unique | Verified | Confirmed; also remove crawl-delay | Edit robots.txt | Indexing speed | S |
| 28 | Volunteer / alumni journeys absent | All three | Engagement | Medium | Agree | No pages exist | Confirmed | Volunteer page + form; alumni opt-in form; archive hub | Recruiting, giving | M |
| 29 | Calendar with subscribe / next dates on homepage | ChatGPT, Claude (Gemini as "resource hub") | Features | Medium | 3/3 in spirit | Schedule is prose + PDF; 2019–22 event plugin abandoned | Confirmed | Google Calendar embed + "next 3 dates" block + alert bar | Fewer "is there school?" calls | M |
| 30 | Local SEO: GBP, English title, citations | All three | SEO | Medium | Agree | No English title/description; GBP status unverifiable | Confirmed direction | Claim GBP; EN meta; Organization schema | Discoverability | S–M |
| 31 | Tuition mismatch website ($230 after 7/1) vs portal ($200) | **None** | Content | Medium | Missed | Verified | New | Align copy; ideally one source | Trust, disputes | S |
| 32 | Footer placeholder links (`#`) | Claude, ChatGPT | Trust | Low | 2/3 | Verified | Confirmed | Publish Privacy page (required once collecting child data online); remove others | Trust, compliance | S |
| 33 | `meta generator` exposes WP + plugin versions; mixed http links | Claude (http), none (generator) | Security | Low | Partial | Verified | Confirmed | Remove generator tags; force https+www | Hygiene | S |

### 3.1 Findings by agreement

- **All three:** #2 email registration, #4 AmazonSmile/no giving, #6 nav bloat, #7 slider, #10 bilingual/hreflang, #28 volunteer/alumni, #29 calendar, #30 local SEO.
- **Two of three:** #3 portal branding, #5 gala path (with disagreement on facts), #11 contradictory facts, #12 program posts, #13 slugs, #15 contrast, #32 footer links.
- **Unique and valuable:** #1 404s (ChatGPT — the most important finding in any audit), #9 markup basics (ChatGPT), #14 author archives (Claude), #16/#17 labels/alt/demo images (ChatGPT), Claude's placement-quiz idea and its "data handling note" (photo consent, no DOB by email), Gemini's "Sunday Parent Guide" (parking, drop-off) — cheap and useful.
- **Contradictions:** Gemini recommends a video/carousel hero while also flagging slider weight (and the other two say remove it). Gemini says gala tickets are handled by email/form; ChatGPT verified Zeffy. Claude says the contact page lacks the email; it does not. Class counts differ across audits because the site itself differs (18/22/25).
- **Duplicates across audits:** the /vi/ /en/ hreflang recommendation, the program-page template, the Organization/Event schema, GBP claim, WebP/srcset, and the "6-category nav" appear in near-identical form in two or three audits — consolidated in §4 as single items.
- **Incorrect or unsupported:** #20, #21 (stale), #22, #23 (over-scoped), #24; Gemini's GBP hours "8:30–12:30" (site says 9–12); Gemini's "60+ sub-items" (it is 200+).
- **Missed by all three:** #8 slider hidden on mobile; #19 dead UA/analytics.js and sitewide reCAPTCHA; #25 empty published pages; #31 tuition mismatch with the portal; the portal's own accessibility (no labels, no `lang`); Jetpack + gtag + analytics.js triple tracking; WordPress version disclosure; 21 stale event posts from a 2019–22 plugin still indexed.

---

## 4. Refined recommendations

### 4.1 Quick improvements (no rebuild, ≤ 30 days)

| # | Change | Why | Pages | Deps / risks | Effort | Result / measure |
|---|---|---|---|---|---|---|
| Q1 | Repoint the two portal links to `https://ghidanh.vnhv.org/` and `/Parents/RegisterCurrentStudents`; add "Học sinh cũ: cần số danh bạ" note | Both current links 404 | Home (Lớp học card), Ghi danh | Confirm with portal admin which page returning parents should land on | S | 0 broken enrollment links; GA4 outbound-click event `portal_click` |
| Q2 | Replace `tinyurl.com/KN40N` with the direct Zeffy URL; add a "Mua vé / Buy tickets" button + HTML event block (date, time, address, prices) on Kỷ niệm 40 năm and homepage; keep PDFs as downloads | Gala page has no ticket path | Home, Kỷ niệm 40 | None | S | `ticket_click` events; Zeffy sales |
| Q3 | Remove AmazonSmile; add a Zeffy donation form (one-time + monthly), keep EIN and PO Box for checks | Defunct program; no online giving | Hỗ trợ, header/footer | Zeffy account already exists (gala) — confirm same account | S | First online gifts; `donation_click` |
| Q4 | Facts sweep: 40 years everywhere; one class count; align About Us counters or remove them; tuition $200/$230 rule stated identically on web + portal; retitle slide 1 or remove it | Contradictions erode trust | Home, Footer, Lịch trình, Liên lạc, About Us, portal | Portal copy may need vendor | S | Zero contradictions in the facts sheet |
| Q5 | Homepage markup: add `<h1>`, set `lang="vi"` (and `lang="en"` on English blocks), meta description (VI + EN sentence), OG image/title, Organization JSON-LD | Missing basics | Home (then all) | Yoast/Rank Math or theme settings | S | Rich result validator passes |
| Q6 | Stability: page cache (LiteSpeed/WP Super Cache), Cloudflare free, force https+www, UptimeRobot, remove `analytics.js`/UA, load reCAPTCHA only on Liên lạc | TTFB 4.3 s, 3.36 MB | Site-wide | Cache exclusions for forms | S | TTFB < 800 ms; weekly uptime ≥ 99.5% |
| Q7 | SEO hygiene: `Sitemap:` line + remove `Crawl-delay` in robots.txt; noindex author archives; unpublish the two empty form pages, 21 stale tp_event items, `/tai-khoan/`, `/no-access/`; remove generator tags | Crawl waste, username exposure | robots, sitemap | Verify nothing links to removed pages | S | Search Console coverage clean |
| Q8 | Interim mobile fix: set Slider Revolution to show a single static slide on mobile, or disable the module below 768px and place a plain hero block above the quick links | Mobile has no hero/CTA today | Home | Test on real iOS + Android | S | Hero + CTA visible at 375px |
| Q9 | Claim/verify Google Business Profile (Language school; Sunday 9–12; photos) | Local discovery | — | Eligibility (school meets at HCC; GBP allows service locations) | S + wait | GBP insights: direction requests |
| Q10 | Add labels to the CF7 contact form; alt text pass on homepage; replace `demo_image.jpg` with real photos | Basic a11y/credibility | Home, Liên lạc | Photo consent | S | 0 images without alt on home |

### 4.2 High-impact design and content improvements

| # | Change | Why | Pages | Deps / risks | Effort | Result / measure |
|---|---|---|---|---|---|---|
| D1 | New homepage (mock-up B/hybrid): static hero, "next dates" strip, programs ×3, gala/event card, testimonials, 40-year band, contact/footer | Message clarity, mobile CTA, LCP | Home | Design system (D4); photo consent | L | Home → Ghi danh click-through; mobile bounce |
| D2 | Navigation: Giới thiệu · Chương trình · Ghi danh · Sinh hoạt & Sự kiện · Cộng đồng (PTO, Tình nguyện, Cựu học sinh, Lịch sử & Kỷ yếu) · Liên lạc + header buttons Ghi danh / Ủng hộ | 204 → ~30 menu items | Site-wide | Archive hub page must exist first | M | Menu depth; task success in 5-person test |
| D3 | Program page template (who, what a Sunday looks like, textbook, outcomes, tuition, placement, FAQ, CTA) as Pages not posts; add "Which level?" rubric | Evergreen, convertible | Cấp 1, Cấp 2, Người lớn | Content from teachers | M | Program → Ghi danh clicks |
| D4 | Design system: palette from the school's own colours — navy `#1F3A5F` / navy-deep `#14273F` (grounds, header, footer), navy text `#1B2F4B`, **bamboo green `#2E7D4F` as the single primary-action colour** (hover `#256A42`, active `#1E5636`), logo gold `#E0A400` as accent only (`#8F6E2C` when used as text on light), rice paper `#FBFAF7`; no black. Be Vietnam Pro (UI/body) + Lora (display), 8-pt spacing, WCAG AA tokens | Matches the teaching uniform (navy + bamboo green); fixes contrast systemically; Vietnamese diacritics | All | Font loading (Vietnamese subset) | M | All text ≥ 4.5:1 (white on green 5.1:1, white on navy 10:1); diacritic test at 4 sizes |
| D5 | Bilingual Level 1: every operational page gets a VI block then an EN block with headings and `lang` attributes; menu labels "Ghi danh (Register)" on the four conversion items | Immediate readability | 8 pages | Translation effort | M | — |
| D6 | Events system: Sự kiện page + Google Calendar (subscribe/ICS) + one Zeffy ticketing pattern reused for Tết/Trung Thu/gala; operational notices in an alert bar with expiry | Pre-event registration; fewer Facebook-only notices | New page, Home | Owner for the calendar | M | RSVPs/tickets online; calendar subscribers |
| D7 | Volunteer page (roles, service hours for HS students, form) tied to Học Bổng Phụ Giáo; Alumni opt-in form; Archive hub "Lịch sử & Kỷ yếu" with yearbooks + photos by decade | Turn archive into engagement | New pages | Photo/ privacy consent for alumni wall | M | Volunteer submissions; alumni sign-ups |
| D8 | Sunday Parent Guide (HTML timetable, parking lots 7/12/garage P with Maps pin, drop-off/pick-up, Room 112) | Parking map is an image; repeated on two pages inconsistently | Lịch trình + Liên lạc → one guide | — | S | Fewer Sunday-morning calls (office anecdotal) |

### 4.3 Technical remediation

| # | Change | Why | Deps / risks | Effort | Measure |
|---|---|---|---|---|---|
| T1 | Remove Slider Revolution; static hero with `<picture>` WebP/AVIF, `fetchpriority="high"`, explicit dimensions | 7 images + JS bundle on every load | D1 | S | LCP < 2.5 s mobile lab |
| T2 | Image pipeline: regenerate thumbnails, WebP, `srcset/sizes`, lazy-load below fold; cap uploads at 1600 px | Upscaled/oversized images | Bulk conversion plugin or offline | M | Home ≤ 1.5 MB |
| T3 | Disable LearnPress and unused Eduma modules; audit plugins; defer non-critical JS; single analytics stack (GA4 only) | 37 scripts, LMS leftovers | Theme dependency check | M | ≤ 15 requests before LCP |
| T4 | Lighter theme (block theme or slim child theme) for the redesign; keep WordPress | Eduma is the demo layout | Content migration | L | Maintainability by volunteers |
| T5 | Redirect map + Redirection plugin; rename cloned slugs; keep every indexed URL answering 200 or 301 | SEO preservation | Inventory in §10.3 | M | 0 404s in Search Console after launch |
| T6 | Security: remove generator tags, hide usernames, 2FA, update plugins (Slider Revolution history), backups, HTTPS everywhere, privacy page | Child data collected | Hosting plan | S | Checklist complete |
| T7 | Enrollment form → PrinciPal: CSV export/import or vendor API; confirm what PrinciPal can ingest | Keep back office | Vendor (QueTek) conversation | M–vendor | Office confirms roster sync |
| T8 | Portal front door: `/ghi-danh/hoc-sinh-cu/` page on vnhv.org explains the student-number step and links to the working portal path; ask vendor to hide admin nav from anonymous users and add `lang`/labels | Trust + a11y | Vendor | S (page) / vendor | Portal bounce |

### 4.4 Rebuild vs preserve

**Rebuild:** homepage; header/nav/footer; Ghi danh (new-student form + returning path); Hỗ trợ (donation); program pages ×3; Sự kiện + gala page; Lịch trình/Liên lạc → Sunday Parent Guide + Contact; new Volunteer, Alumni, Archive hub, Privacy pages.
**Preserve (migrate as-is, restyled):** 15 testimonials; 34 staff profiles (Ban Giảng Huấn, Ban Điều Hành); yearbook pages (10/20/25/30/40 năm) and photo-by-year pages (under the archive hub, slugs cleaned); news posts 2017→2026 (keep URLs); FAQs; PTO page; Học Bổng Phụ Giáo; Ca khúc; Nội quy; Facebook/video galleries; the logo and gold/charcoal identity; the Zeffy account; the PrinciPal back office; GA4 property G-K4V7DZ7BSF; the title-tag brand line.

### 4.5 Items requiring stakeholder decisions

1. Registration tool: Zeffy form (0% fees, simple) vs Gravity Forms + Stripe (more control, sibling pricing) vs staying with PrinciPal's own registration (needs vendor work). Who owns the roster export into PrinciPal?
2. Whether PrinciPal is retained long-term, re-skinned, or replaced after 2026-27.
3. Bilingual scope: Level 1 now; Level 2 (Polylang, /vi/ /en/) — who translates and maintains parity?
4. Photo-consent policy for student images on the web (needed before the photo-led homepage).
5. Audience priority order for the homepage (parents vs gala vs donors) — changes hero content after Oct 24.
6. Hosting: stay and add cache/CDN vs move to managed WordPress.
7. Navigation labels: Vietnamese-first with English in parentheses (recommended) vs language-switched menus.
8. Domain of the enrollment experience: keep `ghidanh.vnhv.org` for returning students in 2026-27, or route everything through `www.vnhv.org/ghi-danh/` immediately.

### 4.6 Refresh vs partial redesign vs complete rebuild

- **Focused refresh** would fix Q1–Q10 but leave the 204-item menu, the theme's demo layout, unlabeled forms, the missing form-based enrollment and the interleaved bilingual pages — the three journeys that matter would still end in email or a foreign-looking portal. Insufficient.
- **Complete rebuild/replatform** is not justified: WordPress is appropriate for a volunteer team; the content model (pages, posts, testimonials, staff) is sound; 100+ URLs have accumulated search equity; the school already uses Zeffy for transactions. Replatforming adds migration risk with no functional gain.
- **Partial redesign (recommended):** keep WordPress and the content; replace the theme/homepage/navigation/templates and the three journeys; migrate the archive under a hub with redirects. Evidence: every Critical/High finding is either a link/setting (fixable now) or a template/theme problem (fixable by redesign) — none is a platform limitation.

---

## 5. Mock-ups — overview (details in §6–8)

Three responsive HTML prototypes were built with the real content (tuition, dates, HCC address, counters, gala details, real testimonial excerpts from the site, the real logo). They are self-contained pages; each has a **"📱 Mobile" toggle** that renders the same page at 390px alongside, and a **states panel** showing hover/focus/active/disabled/error states. Anything not on the live site is marked **[PLACEHOLDER]**. No testimonials, logos, statistics or awards were invented.

| Direction | Concept | Palette / type | Where it differs |
|---|---|---|---|
| **A — Evolutionary Refresh** | Keep the top bar, gold identity, six quick-link tiles and counters; replace the slider with a static photo hero; fix hierarchy, contrast and mobile | Navy `#1F3A5F`/`#14273F` in place of black, gold `#E0A400` (button fill with navy text, never white text on gold), bamboo green `#2E7D4F` (secondary buttons, icons, status), navy text `#1B2F4B`, cream `#FBFAF7`; Be Vietnam Pro throughout | Familiar structure; lowest change-management cost |
| **B — Conversion-Focused** | Above-the-fold answer to "what, for whom, when, how much, enroll now"; sticky mobile Ghi danh bar; deadline/price strip; program cards with "which level?"; gala card with ticket button; trust strip; donation + volunteer invitations | Bamboo green `#2E7D4F` primary action, navy `#1F3A5F` grounds and secondary buttons, navy text, gold accent labels, rice paper; Be Vietnam Pro + Lora display | Fewest decisions per screen; every section ends in one action |
| **C — Bold Modern Rebuild** | Editorial "heritage, not nostalgia": large Lora display type, asymmetric hero, 40-year timeline band (1986 Rice → 1988 St. Thomas → [HCC year] → 2026), bilingual columns, deep-navy footer with gold rule | Deep navy `#14273F` grounds, bamboo green primary, gold `#C39120` rules and `#F2D58A` accent text on navy; Lora display + Be Vietnam Pro | Most distinctive; most content-hungry (needs photography and a photo-consent process) |

Accessibility in all three: single `<h1>`; skip link; `lang="vi"` root with `lang="en"` on English spans; 4.5:1 text and 3:1 UI contrast (checked); visible 3px focus rings; 44px targets; no auto-advancing motion; `prefers-reduced-motion` respected; real `<nav>` with `aria-expanded` disclosure; labels on every input with text errors.

---

## 6. Mock-up A — Evolutionary Refresh

**Prototype:** https://claude.ai/code/artifact/658a78a0-49f1-4638-9d2a-310a92e1f0fa
**Concept.** Keep what long-time families recognise — the black utility bar, the gold logo lock-up, the six quick-link tiles, the counters — and fix everything that undermines them: one static photo hero with one sentence and two buttons; a notice block for tuition/deadlines; program cards; the gala as a proper event card with a Zeffy button; three testimonials plus the principal's quote; a footer with the real contact block, EIN and a working privacy link.
**System.** Navy `#1F3A5F` (header, stats band) and navy-deep `#14273F` (utility bar, footer) replace the black; gold `#E0A400` only as button fill with navy text (9.5:1) or on navy — never white text on gold; gold-deep `#8A6200` for gold-toned text on white (5.9:1); bamboo green `#2E7D4F` for secondary buttons, quick-link icons and "open" status; navy text `#1B2F4B`; cream `#FBFAF7`. Be Vietnam Pro 400–800 throughout; 17px body, 8-pt spacing; 6px radii.
**States.** Primary button default/hover (`#F2B400`)/focus (3px blue ring)/active (`#CC9500`)/disabled; green and outline secondaries; nav hover (light gold on `#2F5384`); form with real labels, hint and bilingual text error.
**Mobile.** Hamburger disclosure with the same `<nav>`; hero stacks; tiles 3×2; sticky bottom bar (Ghi danh + Vé Gala).
**Accessibility.** One H1, `lang="vi"` root with `lang="en"` spans, skip link, `aria-expanded` on menu buttons, 44px targets, no auto-motion.

## 7. Mock-up B — Conversion-Focused Redesign

**Prototype:** https://claude.ai/code/artifact/f7e3978a-a00a-49ce-a773-345b99ce1b6b
**Concept.** The first screen answers what / for whom / when / how much / where to enroll: status pill "Ghi danh 2026-2027 đang mở", headline, two buttons, photo; a four-cell key-facts bar (Chủ nhật 9–12 · HCC Central · $200/$230 · 16/8/2026); a deadline card; program cards with "Còn chỗ" pills and a "Lớp nào phù hợp?" entry; a four-step "how to enroll"; the gala as a dated event row with a direct Zeffy button; a trust strip (279 · 41 · 22 · 1986) and quotes; a red donate panel paired with a volunteer panel; sticky mobile CTA.
**System.** Bamboo green `#2E7D4F` (primary action only; 5.1:1 with white), navy `#1F3A5F` for the event row, donate panel and secondary buttons (10:1 with white), navy-deep `#14273F` for utility bar and footer, navy text `#1B2F4B`, gold `#8F6E2C` for labels (5.9:1) with tint `#F4EBD3` for the deadline card, rice paper `#FBFAF7`. No black. Be Vietnam Pro for UI/body, Lora 600–700 for the H1/H2 and pull-quotes; 8px radii.
**States.** Primary default/hover (`#256A42` + shadow)/focus/active (`#1E5636`)/disabled (`#B9B3A6`); navy secondary and green ghost buttons; status pills (open / soon / closed) with text, not colour alone; select + text inputs with labels, hint and error.
**Mobile.** Hero stacks with photo below text; key facts 2×2; steps and cards single column; fixed bottom bar with body padding so nothing is covered.
**Accessibility.** As A, plus `aria-describedby` on errors, `aria-invalid`, states never colour-only, card hover motion disabled under `prefers-reduced-motion`.

## 8. Mock-up C — Bold Modern Rebuild

**Prototype:** https://claude.ai/code/artifact/e7aa1de9-ade9-4c29-8479-72f2d21a8886
**Concept.** "Heritage, not nostalgia." A deep-navy hero with the school's own motto as the H1 ("Tiếng Việt còn, người Việt còn" — taken from the gala's Zeffy page), a vertical portrait, and a four-cell fact ticker; programs as three age-anchored columns (MG–5 · 6–9 · 18+); a bilingual two-column message block (VI | EN, each with its `lang`); a navy 40-year timeline (1986 Rice → 1988 St. Thomas → [HCC year: confirm] → 2016 → 2026); the gala as a poster + details panel; an editorial voices grid; navy/white dual CTA; a footer under a gold rule.
**System.** Deep navy `#14273F` and navy `#1F3A5F` grounds, paper `#F7F3EA`, bamboo green `#2E7D4F` for primary actions, gold `#C39120` for rules and timeline dots only, gold-text `#7A5A12` on paper (6.3:1) and `#F2D58A` on navy (11:1). No black. Lora 500–700 (display, italic accents) + Be Vietnam Pro (UI); 2px radii; generous 7vw section padding.
**States.** Primary default/hover/focus/active/disabled; light outline buttons on navy; nav underline hover in gold; form with numeric student-number field, hint and error.
**Mobile.** Hero stacks, portrait becomes 16:9; ticker 2×2; programs stack; timeline 2-column without the connecting rule; sticky bottom bar.
**Accessibility.** As A/B; the timeline is a real ordered list because order carries meaning; gold is never used as text on either ground; large Lora sizes checked for stacked diacritics.

## 9. Mock-up comparison and winning direction

| Criterion (1–5) | A Evolutionary | B Conversion | C Bold |
|---|---|---|---|
| Alignment with business goals (enroll, gala, give) | 3 | **5** | 4 |
| Audience fit (grandparents → 2nd-gen parents) | 4 | **5** | 3 |
| Brand continuity | **5** | 3 | 2 |
| Message clarity | 3 | **5** | 4 |
| Conversion potential | 3 | **5** | 4 |
| Accessibility (achievable AA) | 4 | **5** | 4 |
| Mobile usability | 4 | **5** | 3 |
| Performance implications | 4 | **5** | 3 (large type + photography) |
| Technical complexity | **low** | medium | high |
| Maintainability by volunteers | 4 | **4** | 3 |
| Time and cost | **lowest** | medium | highest |

**Winner: B, hybridized.** Take B's structure and journey design wholesale. From A, keep the navy utility bar with the gold logo lock-up, the six quick-link tiles (re-labelled and moved below the hero as "Chủ nhật này"), and the counters. From C, keep the 40-year timeline band and the Lora display face for the school name and section titles — it gives the site a voice that Roboto/Inter cannot, and it renders Vietnamese diacritics well. Drop C's asymmetric hero and full-navy ground until there is a photo library with consent.

Rationale: the evidence says the site fails on journeys, not on identity. B fixes the journeys with the least content risk; A's brand elements keep long-time families oriented; C's editorial touches are cheap to add once the system exists.

---

## 10. Phased rebuild roadmap

Effort assumes a volunteer web lead (Trung) ~8 h/week plus one content volunteer, with optional paid help for theme/child-theme work. Weeks are elapsed, not effort.

| Phase | Tasks | Deliverables | Dependencies | Acceptance criteria | Effort | Risks → mitigation |
|---|---|---|---|---|---|---|
| **1. Discovery & measurement** (wk 1–2) | Quick wins Q1–Q10; run PSI + WebPageTest baseline; enable GA4 events (portal_click, ticket_click, donation_click, form_start/submit); Search Console verified; UptimeRobot; 5 short parent/volunteer interviews; facts sheet | Baseline dashboard; facts sheet; interview notes; decisions list (§4.5) answered | Admin access; Zeffy account | 0 broken enrollment links; baseline recorded; decisions 1, 4, 5 taken | 2–3 days | Admin access unavailable → get owner credentials + 2FA first |
| **2. Content & IA** (wk 2–5) | New sitemap (§10.2); content inventory of 84 pages/37 posts; write program pages, Sunday guide, volunteer, donate, privacy; Level-1 bilingual pass; redirect map | Sitemap; copy deck (VI/EN); redirect map v1 | Phase 1 decisions | Every current URL has a destination; 8 operational pages have VI+EN blocks | 5–8 days | Translation bottleneck → prioritise 6 conversion pages |
| **3. Design system** (wk 4–6) | Tokens (color/type/space), components (header, buttons, cards, alert bar, forms, footer), states, WCAG checks, diacritic test | Style guide page in WP; token CSS | Direction decision (§9) | All tokens pass AA; diacritics at 16/20/32/48 px | 3–4 days | Font load cost → preload 2 files, `font-display: swap` |
| **4. Component development** (wk 6–9) | Child theme or block theme; header/nav with disclosure menus; hero; program card; event card; testimonial; timeline; forms with labels/errors; alert bar | Theme on staging | Phase 3 | Keyboard walkthrough passes; Lighthouse a11y ≥ 95 on staging | 6–10 days | Eduma coupling → build on a fresh lightweight theme, not on Eduma |
| **5. Page migration** (wk 8–11) | Build 12 core pages; migrate testimonials/staff/archive/news via WP export-import; archive hub; unpublish stale items | Staging site complete | Phase 2, 4 | Content parity checklist signed by content owner | 6–8 days | Archive volume → migrate as-is first, prettify later |
| **6. SEO & redirects** (wk 10–12) | Redirection plugin rules; canonical/hreflang (Level 1: `lang` attrs only); titles/meta VI+EN; Organization + Event + FAQ schema; sitemap; robots | Redirect table; schema validated | Phase 5 | Every old URL 200/301; 0 chains > 1; rich-results test passes | 2–3 days | Slug renames → keep old slugs live until redirects verified |
| **7. Accessibility remediation** (wk 11–12) | axe + manual keyboard + VoiceOver/TalkBack on 8 templates; 200% zoom; 320px reflow; PDF alternatives (gala, schedule) | A11y report; fixes | Phase 5 | 0 serious/critical axe issues; manual checklist complete | 2–3 days | Volunteer time → use a fixed 20-item checklist (§12) |
| **8. Performance optimization** (wk 12–13) | Image regeneration/WebP; remove slider/LMS/duplicate analytics; defer JS; cache + CDN rules; preload LCP image | PSI reports | Phase 5 | Mobile lab LCP < 2.5 s, CLS < 0.1, home ≤ 1.5 MB, ≤ 40 requests | 2–3 days | Plugin conflicts → test cache exclusions for forms/Zeffy embeds |
| **9. Analytics & conversion tracking** (wk 12–13) | GA4 events (enrollment_start/complete, ticket_click, donation_start/complete, volunteer_submit, calendar_add, language_switch, form_error); Zeffy UTM; Looker Studio one-pager | Tracking plan; dashboard | Phase 5 | Events fire in DebugView for each journey | 1–2 days | Consent/cookie → minimal GA4 config, no ads |
| **10. QA** (wk 13–14) | Cross-device (iOS Safari, Android Chrome, desktop), forms end-to-end incl. payment test, redirect crawl (Screaming Frog), content proof by two readers (VI, EN) | QA log | Phases 6–9 | All P0/P1 bugs closed | 2–3 days | — |
| **11. Staged launch** (wk 14–15) | Launch on a Sunday afternoon after class; DNS/hosting cutover or theme switch; smoke test; announce via email/Facebook/GBP; keep old theme available for 30 days | Live site; rollback plan | QA sign-off; board approval | Rollback rehearsed; monitoring green 48 h | 1 day | Launch before gala? → if before Oct 24, launch Q1–Q3 fixes only; full launch after gala (see note) |
| **12. Post-launch monitoring** (30 days) | Daily uptime/404 check week 1; weekly Search Console coverage; GA4 journeys; fix list; 30-day review with board | 30-day report | Launch | Metrics in §12.3 reported | 1–2 days | — |

**Timing note.** Registration for 2026-27 has closed (Aug 14) and the gala is Oct 24. Do Phase 1 (quick wins, especially Q1–Q3) **before the gala**; run Phases 2–11 Nov 2026 → Feb 2027 so the new enrollment flow is live for the 2027-28 cycle (early-bird opens ~May/June 2027).

### 10.1 Suggested component and page architecture

**Pages (12 core):** Home · Chương trình (hub) · Cấp 1 · Cấp 2 · Người lớn · Ghi danh (new-student form; returning path; tuition; FAQ) · Sinh hoạt & Sự kiện (calendar + event list) · Kỷ niệm 40 năm (event page template) · Cộng đồng hub → PTO · Tình nguyện · Cựu học sinh · Lịch sử & Kỷ yếu (archive hub) · Hỗ trợ / Ủng hộ · Liên lạc & Hướng dẫn Chủ nhật · Privacy.
**Templates:** page, program, event, announcement (with status badge + expiry), archive-year, staff profile, testimonial loop.
**Components:** utility bar · header (logo, 6 items, Ghi danh/Ủng hộ buttons, mobile drawer) · alert bar (expiring) · hero (static) · next-dates strip · program card · event card · stat tile · testimonial card · timeline · bilingual block (VI/EN with `lang`) · form (label, hint, error summary) · CTA band · footer (contact block, EIN, donate, Facebook, privacy).

### 10.2 Content migration map

| Current | New home | Action |
|---|---|---|
| `/` | `/` | Rebuild |
| `/trang-nha/ghi-danh/` (+2 empty subpages) | `/ghi-danh/` (+ `/ghi-danh/hoc-sinh-moi/`, `/ghi-danh/hoc-sinh-cu/`) | Rebuild; reuse the two empty pages |
| `/chuong-trinh-cap-1/`, `-cap-2/`, `-nguoi-lon/` (posts, 2017) | `/chuong-trinh/cap-1/` etc. (pages) | Convert + 301 |
| `/trang-nha/lich-trinh/`, `/trang-nha/lien-lac/` | `/lien-lac/` (contact + Sunday guide) and `/sinh-hoat/lich/` | Merge duplicated schedule text; 301 |
| `/ho-tro/` | `/ung-ho/` (donate) | Rebuild; 301 |
| `/trang-nha/ky-niem-40/`, post `/ky-niem-40-nam-ngay-thanh-lap-truong/` | `/su-kien/ky-niem-40-nam/` | Event template; 301 both |
| `/trang-nha/gioi-thieu/`, `/trang-nha/about-us/` | `/gioi-thieu/` (VI + EN blocks) | Merge; 301 |
| `/danh-sach-thay-co/`, `/our_team/*` (34) | keep `/our_team/*`; hub at `/gioi-thieu/ban-giang-huan/` | Restyle |
| `/testimonials/*` (15) | keep | Restyle |
| `/trang-nha/ky-yeu-*`, photo-year pages (~40) | `/lich-su/ky-yeu/<n>-nam/`, `/lich-su/hinh-anh/<year>/` | Rename + 301 |
| `/trang-nha/faqs/` | `/ghi-danh/faq/` or keep | 301 if moved |
| `/trang-nha/phu-huynh/` | `/cong-dong/hoi-phu-huynh/` | 301 |
| `/trang-nha/chuong-trinh-hoc-bong-phu-giao/` | `/cong-dong/tinh-nguyen/` (+ scholarship section) | Merge; 301 |
| `/sinh-hoat-*` posts, `/tin-tuc/`, `/category/*` | keep; fix 2025-with-2024 slugs (3) | 301 for renamed |
| `/events/*` (21, 2019–22), `/tai-khoan/`, `/no-access/`, `/author/*` | remove | 410 or 301 to nearest hub; noindex authors |
| `/facebook/`, `/facebook-page/`, `/trang-nha/sinh-hoat/` (video/gallery) | `/sinh-hoat/hinh-anh/` | Merge; 301 |

### 10.3 Old-to-new URL and redirect requirements
- Export every URL from `wp-sitemap.xml` sub-sitemaps (≈ 220 URLs) into the redirect table before any slug change; every row gets status 200 (unchanged), 301 (target), or 410 (removed).
- Enforce `http://` → `https://www.` at server level (one hop). Canonical on every page. No redirect chains > 1.
- Keep `ghidanh.vnhv.org` links pointing to the two working portal paths until the portal is replaced.
- Re-submit sitemap; monitor Search Console "Not found" for 30 days.

---

## 11. Prioritized implementation backlog

| Pri | Item | Phase |
|---|---|---|
| **P0** | Q1 fix 404 portal links · Q2 direct Zeffy ticket button on home + gala page · Q3 remove AmazonSmile, add Zeffy donation · Q8 mobile hero visible · Q6 cache/CDN/uptime · Q5 H1/lang/meta/OG · Q4 facts sweep incl. tuition mismatch | 1 |
| **P1** | New-student online form with payment + roster export (T7) · Portal front door page (T8) · Homepage rebuild (D1) · Navigation restructure + archive hub (D2) · Design system (D4) · Program pages (D3) · Redirect map (T5) · Contrast/labels/alt (Q10, D4) · Q7 SEO hygiene · Privacy page | 2–6 |
| **P2** | Events page + calendar + alert bar (D6) · Sunday Parent Guide (D8) · Volunteer + Alumni pages (D7) · Bilingual Level 1 (D5) · Image pipeline (T2) · Plugin/LMS cleanup (T3) · Schema (Organization, Event, FAQ) · GBP + citations · GA4 conversion events | 5–9 |
| **P3** | Polylang /vi/ /en/ with hreflang · Placement quiz · Email/SMS list (Mailchimp/Brevo) · Alumni wall / yearbook reader · PrinciPal re-skin or replacement · Managed hosting move | post-launch |

---

## 12. Testing and launch checklist

### 12.1 Testing checklist
- [ ] Every URL in the redirect table returns the expected 200/301/410 (crawl with Screaming Frog, 0 chains)
- [ ] Enrollment: new-student form validates, bilingual errors, payment test in Zeffy/Stripe test mode, confirmation email in VI+EN, submission reaches office inbox/spreadsheet, roster export imports into PrinciPal
- [ ] Returning-student path lands on the working portal page; note about student number visible
- [ ] Ticket and donation buttons open Zeffy with UTM; GA4 events fire (DebugView)
- [ ] Keyboard: skip link, menu disclosure (Enter/Space/Esc), focus visible everywhere, no traps; screen reader: landmarks, one H1, heading order, `lang` switches, form labels/errors announced
- [ ] Contrast: all text ≥ 4.5:1, UI ≥ 3:1 (axe + manual on gold accents); 200% zoom and 320px reflow without loss
- [ ] Diacritic rendering: Việt Ngữ Hùng Vương, Tết Nguyên Đán, Lễ Tạ Ơn, Kỷ yếu at all heading sizes on iOS/Android/Windows
- [ ] Mobile: hero and primary CTA visible at 360/375/390 px; sticky CTA does not cover content; targets ≥ 44 px
- [ ] Performance: PSI mobile LCP < 2.5 s, CLS < 0.1, INP < 200 ms; home ≤ 1.5 MB; no hidden images loaded
- [ ] SEO: title/meta VI+EN on 12 core pages; OG image; Organization/Event/FAQ schema valid; sitemap lists only live URLs; robots has Sitemap line, no crawl-delay; author archives noindex
- [ ] Content proof: facts sheet matches every page; no "36 năm", no 2023-2024, no 2025 forms, no AmazonSmile, no `#` links
- [ ] Security: generator tags removed, 2FA on admins, plugins current, backups tested, HTTPS-only, privacy page linked in footer and forms

### 12.2 Launch checklist
- [ ] Board approval of scope, facts sheet, privacy page and photo-consent policy
- [ ] Full backup + rollback rehearsal (old theme switch or DNS revert) documented with owner + backup volunteer
- [ ] Launch window: Sunday after 12:30 or a weekday evening; not the week of the gala or opening day
- [ ] Cache purge, CDN rules, forms tested on production, monitoring (UptimeRobot, GA4 realtime) green for 48 h
- [ ] Search Console: new sitemap submitted; GBP website link and photos updated; Facebook pinned post; email to families
- [ ] Old `tinyurl` and any printed QR codes still resolve

### 12.3 30-day post-launch measurement plan
| Week | Check | Metric / target |
|---|---|---|
| 1 | Daily: uptime, 404 log, form submissions, GA4 events | Uptime ≥ 99.5%; 0 unexpected 404s; every journey has ≥ 1 test + real event |
| 2 | Search Console coverage and Core Web Vitals; fix crawl errors | Indexed pages ≈ redirect table; no new "Not found" |
| 3 | Journey funnels: Home → Ghi danh → form start → submit; ticket/donation clicks; mobile vs desktop | Baseline funnel established (no target until first enrollment cycle) |
| 4 | Board review: enrollment-online share (n/a until 2027 cycle), online gifts, volunteer forms, GBP actions, English-query impressions; backlog re-prioritised | Report + P2/P3 plan |

---

## 13. Open questions and unverified assumptions

1. **Audit attribution** of the three files (see top) — confirm.
2. **Analytics** — no GA4/Search Console access; all conversion statements are qualitative. Please share GA4 read access or a screenshot of the last 90 days.
3. **Hosting** — provider, plan, PHP version, existing cache/CDN unknown; TTFB 4.3 s is a single sample from one location and should be re-measured from Houston.
4. **Portal** — whether PrinciPal (QueTek) can accept a roster import/API from a web form, whether the vendor relationship is active (copyright 2017–2021), and what the 2027-28 plan is. Portal tuition "$200" vs website "$230 after July 1": which is right?
5. **Zeffy** — is the gala Zeffy account the school's own and reusable for donations/registration?
6. **Class count** — 18, 22 or 25? Student count 279 or 225 (About Us)? Teachers 41 or 35?
7. **Mobile slider** — hidden under Android-UA emulation at 375px; confirm on physical iPhone/Android (Slider Revolution may have a "disable on mobile" setting enabled).
8. **Photo consent** — does registration currently include a media-release checkbox? Needed before student photos anchor the new homepage.
9. **Audience priority** after Oct 24 — hero switches from gala to 2027-28 enrollment; confirm dates for early-bird opening.
10. **Governance** — who is the named site owner and backup, and who approves copy? The audits and this plan assume a volunteer team of 1–2.
11. **Newsletter** — where do the current email sign-ups go? (No list provider is visible in the markup.)
12. **Repository** — none was provided; the site is a theme-configured WordPress install, so "existing technology" for the prototypes was interpreted as static HTML/CSS that a child theme can adopt directly.
