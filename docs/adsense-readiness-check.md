# Project7 AdSense Readiness Check

Date: 2026-05-31
Updated: 2026-06-03 Contact Channel Prep
Updated: 2026-06-03 AdSense Pre-submit Cleanup
Updated: 2026-06-03 Core Guide Polish 1
Updated: 2026-06-05 Core Guide Polish 2
Scope: readiness review and content polish only. No AdSense code, ad script, affiliate link, product data, Finder logic, GA4, Search Console verification/sitemap/robots structure, DB/API, or Control Tower changes.

References:

- Google AdSense Program policies: https://support.google.com/adsense/answer/48182
- Google AdSense site readiness guide: https://support.google.com/adsense/answer/7299563
- Google AdSense policy FAQ: https://support.google.com/adsense/answer/3394713

## 1. Summary

Current judgement: **C. Apply after content and policy polish.**

SetupRadar has moved past the empty-site stage. It has working tools, guide pages, Finder flows, policy pages, sitemap/robots, GA4, Search Console ownership, and a live contact page. Core Guide Polish 1 expanded three buying-check pages, and Core Guide Polish 2 expanded two supporting guides, so the thin-content risk is lower than before. The main remaining risk is operating trust: the site is still on `pages.dev`, the contact email is a temporary Gmail channel, and some guide families can still mature before review.

Rough approval outlook:

| Scenario | Estimate | Notes |
| --- | ---: | --- |
| Apply now on `setupradar.pages.dev` with contact + cleanup + 5 polished core guides | 60% | Better content depth than before, but temporary domain and Gmail contact still make review less stable. |
| Buy a domain, update canonical/sitemap, replace Gmail with domain email if available | 68% | Stronger identity and support signal. |
| Domain + additional guide/product-detail polish | 76% | Better balance of useful content, policy readiness, and site trust. |

These percentages are internal planning estimates, not a guarantee of Google review results.

## 2. Site Purpose Clarity

Ready points:

- The `/kr` hero explains that SetupRadar is for hardware checks and buying guidance.
- The three main roles are visible: testing tools, buying guides, and Finder.
- The current tone does not feel like a pure affiliate or shopping site.
- Finder is framed as narrowing candidates, not telling users a single answer.

Risks:

- The site still uses the temporary `pages.dev` domain.
- Some guide families outside the first five polished pages can still be expanded with examples and concrete buying scenarios.

Cleanup result on 2026-06-03:

- Header now shows only KR before AdSense submission. EN/JP/CN disabled buttons are hidden from the user-facing header.
- The main page no longer says that price information is under later review. It now reminds users to confirm price and sales options with the seller before purchase.

Recommendation:

- Keep KR-only language UI until other locales actually exist.
- Keep future product/price features out of the user-facing homepage until they are implemented.

## 3. Content Sufficiency

Ready points:

- `/kr/tests` has 11 browser-based tools grouped by monitor, mouse, and keyboard.
- `/kr/guides` has 21 guide pages across mouse, keyboard, monitor, and buying-check categories.
- Mouse Finder and Keyboard Finder are interactive and return real product candidates.
- Recent buying checklist pages give the site more original content depth.
- Core Guide Polish 1 expanded three key buying-check guides:
  - Mouse buying checklist: hand size, shell shape, weight, wired/wireless differences, sensor/DPI context, clicks, wheel, side buttons, coating, and warranty checks.
  - Keyboard buying checklist: layout choice, switch families, noise, wired/2.4GHz/Bluetooth, keycaps/housing, hot-swap/VIA/QMK basics, Korean legends, and OS compatibility.
  - Monitor buying checklist: size, resolution, refresh rate, IPS/VA/OLED, GtG/MPRT wording, brightness/HDR, pixel policy, ports, stand, VESA, and post-purchase test order.
- Core Guide Polish 2 expanded two supporting guides:
  - Mouse shape: symmetrical vs ergonomic: palm/claw/fingertip grip differences, palm support, finger position, click height, waist width, rear volume, lift habits, and comparison checklist.
  - Keyboard switch types: linear/tactile/click/silent differences, optical/magnetic/capacitive/low-profile basics, noise conditions, keycaps, housing, plate, foam, lubrication, desk, and mat effects.

Risks:

- Some non-core guide pages are still compact and may benefit from more examples later.
- Product detail pages do not exist yet, so Finder product cards are useful but not deep enough to carry monetization alone.
- The site should not lean too much on future product/price features before those pages exist.

Recommendation:

- Core Guide Polish 1 is complete for the first 3 strongest buying-check pages.
- Core Guide Polish 2 is complete for 2 supporting guide pages.
- Current check: the first 5 core pages now have more concrete examples and "what to check before buying" details, without product purchase links.

## 4. Policy Pages

Ready points:

- `/kr/privacy` exists.
- `/kr/terms` exists.
- `/kr/disclosure` exists.
- Footer links point to those real pages.
- The disclosure page states that no actual ad or affiliate links are currently present.

Ready points added on 2026-06-03:

- `/kr/contact` exists.
- Footer now links to `/kr/contact` with `문의`.
- The contact email is `yulxwell123@gmail.com`.
- `/kr/privacy` explains that information sent directly by email may be used for replies and operating improvements.

Risks:

- The contact email is a temporary Gmail channel before a custom domain is purchased.
- Privacy and terms pages are intentionally light. They are suitable as minimum operating pages, but not yet mature policy pages.

Recommendation:

- Keep `/kr/contact` live before applying.
- If a custom domain is purchased, consider changing the contact email to a domain-based address and update the contact page, Footer-adjacent documents, and privacy page together.
- Keep the disclosure page even before affiliate links are added, because it shows operating intent clearly.

## 5. Unfinished Or Preparing Signals

Items to review before applying:

- Contact page: temporary Gmail is acceptable for now, but domain email would look stronger after domain purchase.
- Header language selector: KR-only after cleanup.
- Main page: future price information text replaced with seller-confirmation guidance.
- Search Console sitemap submission: raw XML is normal, but Search Console status is still pending/unstable

Current assessment:

- None of these block the site from functioning.
- The remaining early-stage signals are mainly the temporary domain and compact guide depth, not broken links or visible disabled features.

Recommendation:

- Keep the contact page and Footer link active.
- Keep future features out of user-facing copy until they are part of the current service.

## 6. Technical And SEO Readiness

Ready points:

- `robots.txt` exists and allows crawling.
- Root `sitemap.xml` exists.
- `/kr/sitemap.xml` exists for the `/kr` URL-prefix property.
- Sitemap includes only real pages, not nonexistent product detail URLs.
- Metadata, canonical, Open Graph, Twitter metadata, and `html lang="ko"` are present.
- GA4 is live through `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Search Console ownership is verified through HTML meta verification.

Risks:

- The site is still on `setupradar.pages.dev`.
- Canonical and sitemap URLs currently point to `pages.dev`, which is correct now but should change after a custom domain is connected.
- Search Console sitemap submission is still in a waiting/problem state even though raw XML has been checked.

Recommendation:

- If a custom domain is purchased, update:
  - `metadataBase`
  - canonical output
  - root sitemap URLs
  - `/kr/sitemap.xml`
  - robots sitemap URL
  - Search Console property

## 7. AdSense Risk Assessment

High priority risks:

- Temporary `pages.dev` domain.
- Additional guide depth can still improve review confidence, especially outside the first five polished pages.

Medium priority risks:

- Some guide pages may need more depth before review.
- Policy pages are minimum viable pages, not mature legal/operating pages.
- Sitemap submission in Search Console is still not fully settled.
- Contact email is temporary Gmail rather than a domain email.

Low priority risks:

- No ad/affiliate code yet, which is actually safer before applying.
- No product purchase links yet, so disclosure risk is low.
- Finder results are interactive and useful enough for early content value.

## 8. Application Decision

Decision: **C. 콘텐츠/정책 보강 후 신청 권장**

Reason:

- The site has useful features and enough structure to be considered a real product.
- The current weak points are easy to notice during review: temporary domain, temporary Gmail contact email, and remaining compact guide families.
- Core Guide Polish 1 and 2 reduced the content-depth concern, but the temporary domain and temporary Gmail contact email are still visible operating signals.
- Applying now is possible but not the best timing.

If the user wants a faster route, the decision can move toward **B. 도메인 구매 후 신청 권장** once a custom domain is ready and the contact channel is reviewed again.

## 9. Top 5 Recommended Fixes Before Applying

1. Keep the new `/kr/contact` channel live and replace Gmail with domain email after domain purchase if available.
2. Decide whether to buy a custom domain before applying.
3. Keep KR-only language UI and seller-confirmation price wording until non-KR locales or product price features are actually implemented.
4. Continue polishing compact supporting guides or decide whether product-detail content should be planned later.
5. Re-submit sitemap in Search Console after the site URL and sitemap route are stable.

## 10. Things Not To Add Yet

- AdSense code.
- Ad placeholder blocks.
- Affiliate purchase links.
- Product card buy buttons.
- Product price tracking.
- Product comparison dashboards.
- Review video embeds.
- API, DB, Supabase, or crawler jobs.

## 11. Current Ready / Not Ready Matrix

| Area | Status | Comment |
| --- | --- | --- |
| Live site | Ready | Cloudflare Pages URL works. |
| Tools | Ready | 11 tools exist and are categorized. |
| Guides | Stronger than before | Five core/supporting pages were expanded; additional supporting guide polish can still help. |
| Finder | Ready | Interactive and useful; no purchase links needed yet. |
| Policy pages | Minimum ready | Existing pages cover privacy, terms, disclosure, and contact, but legal/operating detail can mature later. |
| Contact | Ready for now | `/kr/contact` exists and uses temporary Gmail `yulxwell123@gmail.com`; replace with domain email later if available. |
| Sitemap/robots | Mostly ready | Raw XML normal, Search Console submission still pending. |
| GA4 | Ready | Environment variable based and live. |
| Custom domain | Not ready | Strongly recommended before review. |
| Ads/affiliate | Correctly absent | Do not add before review. |

## 12. Next Action

Recommended next step: **Custom Domain Decision or Additional Supporting Guide Polish**.

Core Guide Polish 1 and 2 are complete for five core/supporting pages. Next, either decide on a custom domain or continue polishing compact supporting guides before applying.
