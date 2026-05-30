# Project7 AdSense Readiness Check

Date: 2026-05-31  
Scope: readiness review only. No AdSense code, ad script, affiliate link, product data, Finder logic, GA4, Search Console, DB/API, or Control Tower changes.

References:

- Google AdSense Program policies: https://support.google.com/adsense/answer/48182
- Google AdSense site readiness guide: https://support.google.com/adsense/answer/7299563
- Google AdSense policy FAQ: https://support.google.com/adsense/answer/3394713

## 1. Summary

Current judgement: **C. Apply after content and policy polish.**

SetupRadar has moved past the empty-site stage. It has working tools, guide pages, Finder flows, policy pages, sitemap/robots, GA4, and Search Console ownership. The main risk is not technical readiness, but operating trust: the site is still on `pages.dev`, the contact channel is not live, and a few "future/coming later" cues remain visible.

Rough approval outlook:

| Scenario | Estimate | Notes |
| --- | ---: | --- |
| Apply now on `setupradar.pages.dev` | 40% | Possible, but weak trust signals and temporary domain make it fragile. |
| Buy a domain, update canonical/sitemap, add a real contact channel | 60% | Stronger identity and support signal. |
| Domain + contact + one week of guide/test content polish | 72% | Better balance of useful content, policy readiness, and site trust. |

These percentages are internal planning estimates, not a guarantee of Google review results.

## 2. Site Purpose Clarity

Ready points:

- The `/kr` hero explains that SetupRadar is for hardware checks and buying guidance.
- The three main roles are visible: testing tools, buying guides, and Finder.
- The current tone does not feel like a pure affiliate or shopping site.
- Finder is framed as narrowing candidates, not telling users a single answer.

Risks:

- The line about price information being a future item can make the site feel unfinished.
- Disabled language buttons for EN/JP/CN may signal that the service is still under construction.

Recommendation:

- Before applying, reduce visible future-work language on the main page.
- Keep only KR language UI until other locales actually exist, or make the disabled state very quiet.

## 3. Content Sufficiency

Ready points:

- `/kr/tests` has 11 browser-based tools grouped by monitor, mouse, and keyboard.
- `/kr/guides` has 21 guide pages across mouse, keyboard, monitor, and buying-check categories.
- Mouse Finder and Keyboard Finder are interactive and return real product candidates.
- Recent buying checklist pages give the site more original content depth.

Risks:

- Some guide pages are still short and may look closer to a checklist than a full article.
- Product detail pages do not exist yet, so Finder product cards are useful but not deep enough to carry monetization alone.
- The site should not lean too much on future product/price features before those pages exist.

Recommendation:

- Polish 3 to 5 strongest guide pages before applying:
  - Mouse buying checklist
  - Keyboard buying checklist
  - Monitor buying checklist
  - Dead pixel policy
  - Mouse switch and double-click
- Add more concrete examples and "what to check before buying" sections, without adding product purchase links yet.

## 4. Policy Pages

Ready points:

- `/kr/privacy` exists.
- `/kr/terms` exists.
- `/kr/disclosure` exists.
- Footer links point to those real pages.
- The disclosure page states that no actual ad or affiliate links are currently present.

Risks:

- Contact channel still says "문의 채널 준비 중".
- Privacy and terms pages are intentionally light. They are suitable as minimum operating pages, but not yet mature policy pages.

Recommendation:

- Add a real contact method before applying. A simple contact email or contact page is enough for now.
- Keep the disclosure page even before affiliate links are added, because it shows operating intent clearly.

## 5. Unfinished Or Preparing Signals

Items to review before applying:

- Footer: `문의 채널 준비 중`
- Header language selector: EN/JP/CN disabled states
- Main page: future price information text
- Search Console sitemap submission: raw XML is normal, but Search Console status is still pending/unstable

Current assessment:

- None of these block the site from functioning.
- Together, they make the site look early-stage. That is the main AdSense risk.

Recommendation:

- Replace "문의 채널 준비 중" with a real contact channel.
- Hide or quiet future features that are not part of the current service.

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

- No real contact channel yet.
- Temporary `pages.dev` domain.
- Some visible "future" signals remain.

Medium priority risks:

- Several guide pages may need more depth before review.
- Policy pages are minimum viable pages, not mature legal/operating pages.
- Sitemap submission in Search Console is still not fully settled.

Low priority risks:

- No ad/affiliate code yet, which is actually safer before applying.
- No product purchase links yet, so disclosure risk is low.
- Finder results are interactive and useful enough for early content value.

## 8. Application Decision

Decision: **C. 콘텐츠/정책 보강 후 신청 권장**

Reason:

- The site has useful features and enough structure to be considered a real product.
- The current weak points are easy to notice during review: no contact channel, temporary domain, and visible future-work text.
- Applying now is possible but not the best timing.

If the user wants a faster route, the decision can move toward **B. 도메인 구매 후 신청 권장** once a custom domain and contact channel are ready.

## 9. Top 5 Recommended Fixes Before Applying

1. Add a real contact channel and update Footer/privacy page wording.
2. Decide whether to buy a custom domain before applying.
3. Reduce visible future-work cues such as disabled locales and price integration text.
4. Polish 3 to 5 core guide pages with more original examples and buying-check detail.
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
| Guides | Almost ready | Good volume, but several pages can be deeper. |
| Finder | Ready | Interactive and useful; no purchase links needed yet. |
| Policy pages | Minimum ready | Existing pages are enough for early trust, but contact is weak. |
| Contact | Not ready | Actual channel should be added before applying. |
| Sitemap/robots | Mostly ready | Raw XML normal, Search Console submission still pending. |
| GA4 | Ready | Environment variable based and live. |
| Custom domain | Not ready | Strongly recommended before review. |
| Ads/affiliate | Correctly absent | Do not add before review. |

## 12. Next Action

Recommended next step: **Contact Channel Prep**.

Create a real contact path, then update Footer and privacy page. After that, do a short **AdSense Pre-submit Cleanup** pass to reduce early-stage wording and re-check guide depth.
