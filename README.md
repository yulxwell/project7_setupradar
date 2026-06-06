# SetupRadar (v0.7B - Buying Checklist Copy QA)

## 🤖 AI 작업자 운영 규칙 (Gemini / Codex 공통)

> [!IMPORTANT]
> 본 프로젝트는 **Gemini와 Codex**를 번갈아 가며 작업하는 환경입니다. 컨텍스트가 단절되거나 작업이 꼬이지 않도록 모든 AI 작업자는 반드시 아래 운영 규칙을 엄격히 준수해야 합니다.

1. **작업 전 필수 절차**:
   - `git status`를 확인하여 이전 작업 상태를 점검합니다.
   - [README.md](file:///Users/jilee/antigravity/src/project7/README.md), [AGENTS.md](file:///Users/jilee/antigravity/src/project7/AGENTS.md), [PROJECT7_WORK_LOG.md](file:///Users/jilee/antigravity/src/project7/PROJECT7_WORK_LOG.md)를 먼저 일독하여 진행 맥락을 확실히 파악합니다.
2. **작업 중 제한 사항**:
   - **기능 추가는 명시적인 요청이 있을 때만** 수행합니다. 임의로 기능을 추가하거나 대규모 UI 리디자인을 하지 않습니다.
   - Supabase/API/DB/n8n 연동 등 외부 아키텍처는 명시적 지시 없이 추가하지 않습니다.
   - 제품 설명, 마우스 쉘 체감 레퍼런스 노출 시 절대적인/단정적 표현이나 법적 위험이 있는 단어(예: 카피쉘, 짭)를 배제합니다.
3. **작업 후 필수 절차**:
   - 로컬에서 반드시 `npm run lint`와 `npm run build`를 실행하여 정적 빌드에 이상이 없는지 확인합니다.
   - [PROJECT7_WORK_LOG.md](file:///Users/jilee/antigravity/src/project7/PROJECT7_WORK_LOG.md)에 오늘 날짜와 함께 변경 사항을 소상히 기록합니다.
   - 변경된 파일 목록 및 검수 결과를 포함한 인수인계 양식에 맞춰 유저에게 최종 완료 보고를 수행합니다.
4. **제품 신뢰성 제어 정책 (Product Trust Guard)**:
   - **쉘 레퍼런스 화면 노출**: 마우스 쉘 체감 레퍼런스(`shellReferences`)는 엄격한 검수 조건(`editorNoteKo` 존재, confidence medium/high 등)을 충족하는 검증 완료 데이터만 화면에 노출합니다. AI 초안 단계의 데이터는 노출하지 않고 안전히 차단합니다.
   - **제품 이미지 권장 스키마**: 제품 이미지의 저작권 및 핫링크 리스크에 철저히 대비하기 위해 `sourceType`과 `status`를 기반으로 한 검증 체계를 운영합니다. 실사용 이미지는 임의 노출하지 않습니다.
   - **가격 링크 및 최저가 제어**: 복잡도가 높은 실시간 가격 트래커나 크롤링을 피하고, 단순 안전 구조의 “가격 확인 링크” 스키마를 통해 외부 변동 리스크를 차단합니다.

## 📍 주요 경로 (Routes)
- 한국어 기본 경로: `/kr`
- 도구 목록: `/kr/tests`
- 구매 가이드: `/kr/guides`
- 장비 찾기: `/kr/finder/mouse-fit`
- 키보드 배열/스위치: `/kr/finder/keyboard-fit`

## 🗂 Repository
- GitHub repo name: `project7_setupradar`
- 이전 `setupradar` 이름에서 Project7 식별이 더 명확한 이름으로 정리했습니다.

PC 하드웨어(마우스, 키보드, 모니터) 진단 및 구매 가이드를 제공하는 정적 웹 플랫폼입니다.

## 🚀 프로젝트 목표
- **사용자 중심 진단**: 복잡한 소프트웨어 설치 없이 브라우저에서 즉시 하드웨어 상태 체크.
- **초보자 가이드**: IT 전문 용어를 최소화하고 구매 결정에 직결되는 핵심 정보 제공.
- **가볍고 빠른 서비스**: Next.js App Router 기반의 완전 정적 사이트로 서버 비용 0원 및 고속 로딩 실현.

## 📂 콘텐츠 관리 (Content Architecture)
SetupRadar는 운영 효율성을 위해 하이브리드 콘텐츠 구조를 사용합니다.
- **AI-Human 하이브리드**: `src/content/` 내 데이터는 AI 생성 초안(`ai`)과 운영자 교정본(`editor`)으로 분리 관리됩니다.
- **편집 가이드**: 상세한 데이터 수정 방법은 [docs/content-editing-guide.md](file:///Users/jilee/antigravity/src/project7/docs/content-editing-guide.md)를 참고하세요.
- **문구 출처 지도**: 실제 화면 문구가 어느 파일에서 오는지 확인할 때는 [docs/copy-source-map.md](file:///Users/jilee/antigravity/src/project7/docs/copy-source-map.md)를 먼저 참고하세요.
- **WebUI 작업대**: Project99 Control Tower를 통한 시각적 편집을 위해 [docs/content-copy-workbench.kr.json](file:///Users/jilee/antigravity/src/project7/docs/content-copy-workbench.kr.json)을 제공합니다.

## ✅ 주요 업데이트 내역
### Product Patch Merge Policy - 2026-05-28
- **제품 patch 병합 기준 문서 추가**: Gemini LLM 또는 Control Tower가 생성한 `product_config_patch`가 기존 제품과 중복될 때 적용할 기준을 [docs/product-patch-merge-policy.md](file:///Users/jilee/antigravity/src/project7/docs/product-patch-merge-policy.md)에 정리했습니다.
- **중복 제품 안전 처리 원칙**: `id`, `slug`, `brand + name`, 모델명 표기 차이를 기준으로 중복을 판단하고, 중복 제품은 새로 추가하지 않고 업데이트 후보로만 분류합니다.
- **필드별 보수적 병합 정책**: `id`/`slug`/`status`는 기존 값을 유지하고, `basicFilters` 변경은 Finder 결과에 영향을 줄 수 있어 반드시 보고 대상으로 둡니다. `shellReferences`, `productImages`, `productLinks`는 자동 병합하지 않습니다.
- **구현 보류선 유지**: 이번 작업은 정책 문서화이며 `merge-product-patch.ts`, 실제 제품 데이터 수정, snapshot 수동 수정, Supabase/API/DB, Control Tower 변경은 하지 않았습니다.

### Product Patch Dry-run Validator - 2026-05-28
- **제품 patch 사전 검증 스크립트 추가**: Gemini LLM 또는 Control Tower가 만든 `product_config_patch`를 실제 반영하기 전 `npm run product-patch:validate -- ./tmp/product-patch.json` 명령으로 검사할 수 있게 했습니다.
- **dry-run 분류만 수행**: 신규 추가 후보, 기존 중복 후보, 자동 보강 후보, 수동 검토 필요 필드, 반영 보류 필드를 콘솔에 보고하며 실제 `src/content` 제품 파일은 수정하지 않습니다.
- **안전 검사 포함**: patch 내부 `id`/`slug` 중복, category/status/basicFilters 허용값, 금지 표현, shellReferences 기본 구조를 검사합니다.
- **자동 병합 보류**: `merge-product-patch.ts`, 제품 파일 자동 수정, DB/API/Supabase, Control Tower 연동은 여전히 추가하지 않았습니다.

### Product Patch Validator Real Sample QA - 2026-05-28
- **실전 샘플 QA 완료**: 중복 제품, 신규 후보, 금지 표현, 잘못된 `basicFilters` 샘플을 `tmp/` 아래 임시 patch로 만들어 validator를 실행했습니다.
- **분류 결과 확인**: Logitech G304, AULA F75, ATK A9 Ultimate는 기존 중복 후보 3개로 잡혔고, 테스트용 신규 마우스/키보드는 신규 추가 후보 2개로 분류되었습니다.
- **차단 검사 확인**: 금지 표현 샘플과 허용값 외 `basicFilters` 샘플은 errors로 차단되며, 오류 위치와 필드가 콘솔에 표시됩니다.
- **안전선 유지**: QA는 임시 JSON 파일과 validator 출력 보정만 수행했으며 실제 제품 TS, snapshot JSON, Finder, UI, DB/API/Supabase, Control Tower는 수정하지 않았습니다.

### Weekly Product Patch Intake Automation Roadmap - 2026-05-28
- **주간 제품 추가 루틴 문서화**: Gemini LLM 조사 결과에서 `product_config_patch` JSON을 수동으로 복사해 validator를 실행하고, 통과한 제품만 `review` 상태로 수동 반영하는 현재 운영 흐름을 정리했습니다.
- **향후 반자동 intake 후보**: Gemini 결과 전체 마크다운을 `tmp/gemini-weekly-result.md`에 저장하면 JSON 코드블록을 추출하고 `tmp/product-patch-weekly-candidates.json`을 만든 뒤 validator까지 이어 실행하는 로컬 스크립트 후보를 [docs/product-patch-merge-policy.md](file:///Users/jilee/antigravity/src/project7/docs/product-patch-merge-policy.md)에 기록했습니다.
- **구현 보류**: `scripts/extract-product-patch-from-markdown.ts`, `product-patch:intake`, package script, API 연결은 만들지 않았습니다. 현재는 수동 복사와 `npm run product-patch:validate` 흐름을 유지합니다.

### Weekly Product Manual Apply - 2026-05-28
- **주간 신규 후보 3개 수동 반영**: validator를 통과한 `Zowie U2`, `NuPhy Halo75 V2`, `Lamzu Maya`를 제품 TS 데이터에 `review` 상태로 추가했습니다.
- **안전 반영 원칙 유지**: 최상위 `sources`, `productImages`, `productLinks`, 자동 확정 `shellReferences`는 추가하지 않았고, 출처 및 옵션 확인 필요 사항은 `rawSpecs.note`에 보수적으로 남겼습니다.
- **검증 완료**: 반영 후 validator는 신규 후보 0개 / 기존 중복 후보 3개로 감지했고, snapshot export 결과 마우스 14개 / 키보드 12개로 갱신되었습니다. Finder 로직, UI, DB/API/Supabase, Control Tower는 변경하지 않았습니다.

### Weekly Product Finder QA - 2026-05-29
- **주간 신규 제품 Finder QA**: `Zowie U2`, `Lamzu Maya`, `NuPhy Halo75 V2`가 Finder 점수 계산상 후보군에 포함되는지 확인했습니다.
- **top 3 노출 한계 확인**: 현재 Finder는 결과 3개만 보여주며 동점일 때 데이터 순서를 따르므로, 신규 제품이 기존 동점 후보 뒤로 밀려 화면에 바로 보이지 않는 조합이 있습니다.
- **보정 보류**: 신규 제품 `basicFilters`는 현재 형태/무게/연결/크기/배열 기준에서 큰 오류가 없어 억지 보정하지 않았습니다. 향후 결과 수 확대 또는 동점 처리 정책은 별도 UX/추천 로직 작업으로 검토합니다.

### Finder Result More UX - 2026-05-29
- **기본 3개 + 더 보기 구조 추가**: Mouse Finder와 Keyboard Finder 결과는 기존처럼 기본 3개만 먼저 보여주고, 후보가 4개 이상이면 `후보 더 보기` 버튼으로 점수가 비슷한 전체 후보를 확인할 수 있게 했습니다.
- **추천 로직 유지**: 점수 계산, basicFilters 매칭, 동점 정렬 기준은 변경하지 않고 이미 계산된 결과 배열의 표시 개수만 조정했습니다.
- **가벼운 Finder 흐름 유지**: 조건을 바꾸거나 초기화하면 더 보기 상태와 펼침 패널을 닫아 다시 기본 3개부터 보이도록 했습니다.
- **데이터/외부 연동 미변경**: 제품 데이터, status, shellReferences, productImages/productLinks, DB/API/Supabase/Control Tower는 변경하지 않았습니다.

### Pre-Launch SEO & Meta QA - 2026-05-29
- **기본 metadata 보강**: `metadataBase`, title template, description, Open Graph, Twitter summary card, robots 기본값을 `https://setupradar.pages.dev` 기준으로 정리했습니다.
- **주요 페이지 title/description 보정**: `/kr`, `/kr/tests`, `/kr/guides`, `/kr/switches`, Mouse Finder, Keyboard Finder, Keyboard Rollover Test에 페이지별 metadata를 추가하거나 문구를 완화했습니다.
- **sitemap/robots 추가**: 실제 존재하는 `/kr` 정적 route만 포함한 `sitemap.xml`과 검색 허용 `robots.txt` 생성을 추가했습니다. 아직 없는 제품 상세 URL은 sitemap에 넣지 않았습니다.
- **보류 항목**: `og:image`는 새 이미지 생성 없이 보류했습니다. 커스텀 도메인 연결 시 `metadataBase`, canonical, sitemap URL은 새 도메인 기준으로 교체해야 합니다.
- **미연동 유지**: Search Console, Analytics, 광고 코드, DB/API/Supabase, Control Tower는 연결하지 않았습니다.

### Search Console & Analytics Prep - 2026-05-29
- **GA4 환경변수 준비**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`가 있을 때만 Google Analytics 스크립트가 렌더링되도록 최소 컴포넌트를 추가했습니다.
- **ID 미하드코딩**: 실제 GA4 측정 ID는 코드에 넣지 않았고, `.env.example`에는 빈 placeholder만 기록했습니다.
- **Cloudflare Pages TODO**: GA4 속성 생성 후 Cloudflare Pages 환경변수에 `NEXT_PUBLIC_GA_MEASUREMENT_ID`를 추가하면 추적 스크립트가 활성화됩니다. 측정 ID가 없으면 아무 analytics script도 렌더링되지 않습니다.
- **Search Console 준비**: 현재 등록 후보 URL은 `https://setupradar.pages.dev/sitemap.xml`과 `https://setupradar.pages.dev/robots.txt`입니다. pages.dev URL-prefix 속성으로 임시 등록할 수 있지만, 커스텀 도메인 연결 후 새 도메인 기준 속성 등록과 `metadataBase`/canonical/sitemap URL 교체가 필요합니다.
- **미연동 유지**: 실제 Google 계정 작업, Search Console 소유권 인증, GA4 속성 생성, 광고/AdSense, DB/API/Supabase, Control Tower는 연결하지 않았습니다.

### Content Quality Pass 1 - 2026-05-30
- **초보자용 문구 톤 보정**: 메인 Hero, 테스트 도구, 가이드, Finder 안내 문구를 “정답/진단”보다 참고용 확인과 구매 전 비교 중심으로 다듬었습니다.
- **과장 표현 완화**: 사용자 화면에 노출되는 금지 표현을 검색해 `최고`, `완벽`, `무조건`, `확정`, `정밀 진단` 등으로 읽힐 수 있는 문구를 완화했습니다.
- **미구현 기능 오해 축소**: 최저가/핫딜/맞춤형 매칭처럼 아직 구현되지 않은 기능처럼 보이는 표현을 후속 검토 톤으로 낮췄습니다.
- **안전선 유지**: 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower는 변경하지 않았습니다.

### Live Copy QA 1 - 2026-05-30
- **실서비스 화면 기준 문구 QA**: `/kr`, `/kr/tests`, `/kr/guides`, Mouse Finder, Keyboard Finder, `/kr/switches`를 실서비스 URL 기준으로 확인했습니다.
- **최소 문구 보정**: Hero의 `설치 없이` 띄어쓰기, 메인 Finder CTA, 테스트/가이드 하단 안내, 스위치/축 설명 일부를 더 자연스러운 참고용 톤으로 다듬었습니다.
- **기능 변경 없음**: Finder 추천 로직, 제품 데이터/basicFilters, GA4/Search Console 구조, DB/API/Supabase, Control Tower, 광고/제휴/리뷰 영상은 수정하지 않았습니다.
- **Search Console sitemap 보류 유지**: raw XML은 정상으로 확인된 기존 상태를 유지하고, 이번 작업에서는 sitemap/Search Console 구조를 건드리지 않았습니다.

### Monetization Policy & Layout Plan - 2026-05-30
- **수익화 정책 문서 추가**: 향후 AdSense, 방문형 광고, 링크프라이스/쿠팡파트너스 같은 제휴 링크를 붙일 때의 기준을 [docs/monetization-plan.md](file:///Users/jilee/antigravity/src/project7/docs/monetization-plan.md)에 정리했습니다.
- **광고보다 신뢰 우선**: SetupRadar를 광고 사이트가 아니라 `하드웨어 테스트 도구 + 구매 전 참고 가이드`로 유지하고, Finder 추천 결과는 제휴 수익이 아니라 제품 기준과 구매 전 체크를 우선하도록 명문화했습니다.
- **위치 후보만 정리**: 메인, 테스트 목록/상세, 가이드 목록/상세, Finder별 광고/제휴 후보 위치와 금지 위치를 문서화했습니다. 실제 광고 코드와 제휴 링크는 추가하지 않았습니다.
- **신청 전 TODO 정리**: 개인정보처리방침, 이용약관 또는 서비스 안내, 문의 채널, 광고/제휴 고지 문구, 커스텀 도메인 검토를 AdSense 신청 전 준비 항목으로 남겼습니다.

### AdSense Readiness Check - 2026-05-31
- **신청 전 준비도 점검 문서 추가**: Project7의 AdSense 신청 전 준비 상태를 [docs/adsense-readiness-check.md](file:///Users/jilee/antigravity/src/project7/docs/adsense-readiness-check.md)에 정리했습니다.
- **신청 판단**: 현재는 바로 신청보다 콘텐츠/정책 보강 후 신청하는 쪽을 권장합니다. 특히 실제 문의 채널, 커스텀 도메인, 일부 준비 중 문구 정리가 우선입니다.
- **수익화 코드 미추가**: 실제 AdSense 코드, 광고 script, 제휴 링크, 구매 버튼은 추가하지 않았습니다.
- **기존 구조 유지**: 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower는 변경하지 않았습니다.

### Contact Channel Prep - 2026-06-03
- **문의 페이지 추가**: `/kr/contact` 정적 페이지를 만들고 임시 Gmail 문의 채널 `yulxwell123@gmail.com`을 mailto 링크로 안내했습니다.
- **Footer 문의 링크 전환**: 기존 `문의 채널 준비 중` 문구를 `/kr/contact`로 연결되는 `문의` 링크로 교체했습니다. Footer에는 이메일을 길게 노출하지 않고 문의 페이지에서만 확인하도록 정리했습니다.
- **정책 문구 보강**: `/kr/privacy`에는 문의 이메일로 사용자가 직접 보낸 정보가 답변과 운영 개선 목적으로 처리될 수 있음을 반영했고, `/kr/terms`에는 잘못된 정보나 보강 제안을 문의할 수 있다는 안내를 추가했습니다.
- **sitemap 반영**: root `/sitemap.xml`과 `/kr/sitemap.xml`에 `/kr/contact`를 낮은 priority로 포함했습니다.
- **운영 기준**: 현재 이메일은 도메인 구매 전 임시 문의 채널이며, 도메인 메일이 생기면 교체할 수 있습니다.
- **미변경 유지**: 실제 AdSense 코드, 광고 script, 링크프라이스/쿠팡파트너스 링크, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower는 수정하지 않았습니다.

### AdSense Pre-submit Cleanup - 2026-06-03
- **Header 다국어 표시 정리**: AdSense 신청 전 미완성 다국어 사이트처럼 보이지 않도록 사용자 화면에서는 KR 언어 버튼만 노출하고 EN/JP/CN 비활성 버튼은 숨겼습니다.
- **메인 미구현 가격 문구 정리**: `가격 정보 연동은 후속 검토 중입니다` 문구를 `가격과 판매 옵션은 구매 전 판매처 기준으로 확인해 주세요.`로 바꿔 실제 제공 범위 중심으로 정리했습니다.
- **정책/문의/Footer 점검**: Footer 문의 링크와 정책 페이지 링크가 실제 URL로 연결되고, 문의 이메일은 `/kr/contact`에만 노출되는 상태를 유지했습니다.
- **readiness 업데이트**: `docs/adsense-readiness-check.md`에 cleanup 결과, 핵심 가이드 보강 후보, 신청 판단과 내부 가능성 추정치 업데이트를 기록했습니다.
- **sitemap/Search Console 보류 유지**: 새 실제 페이지를 추가하지 않았으므로 sitemap, robots, Search Console verification 구조는 수정하지 않았습니다.
- **미변경 유지**: 실제 AdSense 코드, 광고 script, 제휴 링크, 구매 버튼, 제품 데이터, Finder 추천 로직, GA4 구조, DB/API/Supabase, Control Tower, package 설정은 수정하지 않았습니다.

### Core Guide Polish 1 - 2026-06-03
- **핵심 구매 가이드 3개 보강**: `/kr/guides/mouse-buying-checklist`, `/kr/guides/keyboard-buying-checklist`, `/kr/guides/monitor-buying-checklist` 본문을 초보자용 구매 전 확인 기준 중심으로 확장했습니다.
- **마우스 체크 기준 강화**: 손 크기, 대칭형/오른손용 비대칭형, 무게, 유선/무선/블루투스, 센서/DPI, 클릭 소음, 휠, 사이드 버튼, AS/교환 조건 확인 문구를 보강했습니다.
- **키보드 체크 기준 강화**: 배열, 스위치 성향, 소음 환경, 연결 방식, 키캡/하우징/흡음재, 핫스왑/VIA/QMK, 한글 각인, OS 호환성 확인 문구를 보강했습니다.
- **모니터 체크 기준 강화**: 크기, 해상도, 주사율, IPS/VA/OLED, GtG/MPRT, 밝기/HDR, 불량화소/빛샘/IPS Glow, 포트/스탠드/VESA, 구매 후 테스트 순서 문구를 보강했습니다.
- **가이드 목록 요약 정리**: `src/content/kr/guides.ts`의 3개 체크리스트 카드 요약을 본문 보강 방향에 맞춰 수정했습니다.
- **readiness 업데이트**: `docs/adsense-readiness-check.md`에 Core Guide Polish 1 결과와 콘텐츠 깊이 리스크 일부 완화, pages.dev/Gmail 약점 유지, 내부 가능성 추정치 소폭 조정을 기록했습니다.
- **미변경 유지**: 광고/제휴 코드, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, sitemap, package 설정, 도메인 설정은 수정하지 않았습니다.

### Core Guide Polish 2 - 2026-06-05
- **보조 핵심 가이드 2개 보강**: `/kr/guides/mouse-shape-symmetrical-vs-ergonomic`, `/kr/guides/keyboard-switch-types` 본문을 초보자용 구매 전 확인 기준 중심으로 확장했습니다.
- **마우스 쉘 형태 기준 강화**: 대칭형/오른손용 비대칭형 차이, 팜/클로/핑거팁 그립, 손바닥 지지감, 손가락 위치, 클릭부 높이, 등 높이, 허리 폭, 후면 볼륨, 들어 올리는 습관을 비교 기준으로 보강했습니다.
- **키보드 스위치 기준 강화**: 리니어/택타일/클릭/저소음 차이, 광축/자석축/무접점/로우프로파일 기본 이해, 키캡/하우징/보강판/흡음재/윤활/책상 환경이 타건감과 소음에 주는 영향을 보강했습니다.
- **가이드 목록 요약 정리**: `src/content/kr/guides.ts`의 2개 카드 요약을 본문 보강 방향에 맞춰 수정했습니다.
- **readiness 업데이트**: `docs/adsense-readiness-check.md`에 핵심/보조 가이드 5개 보강 완료, 콘텐츠 깊이 리스크 추가 완화, pages.dev/Gmail 약점 유지, 내부 가능성 추정치 소폭 조정을 기록했습니다.
- **미변경 유지**: 광고/제휴 코드, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, sitemap, package 설정, 도메인 설정은 수정하지 않았습니다.

### Supporting Guide Polish 1 - 2026-06-05
- **테스트 연계 보조 가이드 3개 보강**: `/kr/guides/dead-pixel-policy`, `/kr/guides/mouse-switch-double-click`, `/kr/guides/gtg-vs-mprt` 본문을 구매 전 확인과 구매 후 참고용 테스트 흐름에 맞춰 확장했습니다.
- **불량화소 정책 기준 강화**: 휘점·암점·데드픽셀처럼 보이는 사례, 먼지/표면 오염 가능성, 무결점 정책 차이, 수령 후 확인 순서, 문의 전 준비 자료를 보강했습니다.
- **마우스 더블클릭 기준 강화**: 기계식/광축 스위치 차이, 더블클릭 의심 증상, USB/브라우저/OS 설정/무선 리시버/먼지 확인, 문의 전 기록 기준을 보강했습니다.
- **GtG/MPRT 기준 강화**: 응답속도 표기 차이, 오버드라이브, 역잔상, 주사율과 프레임 유지, MPRT 사용 시 밝기·깜빡임 체감, 잔상 테스트 연결을 보강했습니다.
- **가이드 목록 요약 정리**: `src/content/kr/guides.ts`의 3개 카드 요약을 본문 보강 방향에 맞춰 수정했습니다.
- **readiness 업데이트**: `docs/adsense-readiness-check.md`에 보조 가이드 3개 추가 보강 완료, 콘텐츠 깊이 리스크 추가 완화, pages.dev/Gmail 약점 유지, 내부 가능성 추정치 소폭 조정을 기록했습니다.
- **미변경 유지**: 광고/제휴 코드, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, sitemap, package 설정, 도메인 설정은 수정하지 않았습니다.

### Copy Source Coverage Audit - 2026-06-05
- **문구 출처 지도 추가**: Control Tower 수정 후 실서비스 문구가 바뀌지 않는 문제를 줄이기 위해 [docs/copy-source-map.md](file:///Users/jilee/antigravity/src/project7/docs/copy-source-map.md)에 `/kr`, Header/Footer, Tests, Guides, Finder, Products 문구 출처를 정리했습니다.
- **Control Tower 한계 명시**: `siteCopy.ts`와 `src/content` 계열 문구, page metadata, Header/Footer 하드코딩 문구가 서로 다른 관리 지점이라는 점을 문서화했습니다.
- **운영 규칙 보강**: 문구가 반영되지 않으면 copy source map을 먼저 확인하고, 변경 후 `npm run lint`, `npm run build`, live URL 확인을 진행하도록 기록했습니다.
- **미변경 유지**: 이번 작업은 문서화만 수행했으며 제품 데이터, Finder 추천 로직, 광고/제휴 코드, GA4/Search Console 구조, Control Tower, package 설정, 도메인 설정은 수정하지 않았습니다.

### Finder Advanced Criteria Mock 1 - 2026-06-06
- **상세 기준 접힘 영역 추가**: Mouse Finder와 Keyboard Finder에 `상세 기준` 버튼을 추가하고, 클릭 시 선택형 상세 기준 영역이 펼쳐지도록 했습니다.
- **약한 가산점 방식 적용**: 상세 기준은 제품을 탈락시키지 않고 기존 `advancedFilters`, `detailSpecs`, `features`, `specTags`, `rawSpecs.note`에서 확인 가능한 정보에만 낮은 가산점을 줍니다.
- **기본 Finder 유지**: 기본 질문, 기본 결과 흐름, 후보 더 보기, 구매 전 체크 패널 구조는 유지하고, 기본/상세 기준 변경 시 열린 상태가 닫히도록 정리했습니다.
- **미변경 유지**: 제품 데이터 추가/대량 수정, basicFilters 대규모 변경, 광고/제휴 코드, 뉴스란, Project2 연동, GA4/Search Console 구조, DB/API/Supabase, Control Tower, package 설정, 도메인 설정은 수정하지 않았습니다.

### Finder Result Reason Labels 1 - 2026-06-06
- **결과 카드 조건 반영 표시 추가**: Mouse Finder와 Keyboard Finder 결과 카드에 `조건 반영` 영역을 추가해 후보가 나온 이유를 짧게 보여주도록 했습니다.
- **표시 전용 helper 적용**: 기본 조건과 상세 기준 중 실제로 맞는 항목만 최대 3개 라벨로 보여주며, 제품 정보가 불확실한 항목은 억지로 표시하지 않습니다.
- **추천 순서 유지**: 점수 계산과 정렬 기준은 바꾸지 않고, 기존 결과를 설명하는 표시용 문구만 추가했습니다.
- **미변경 유지**: 제품 데이터, 상세 기준 가산점 구조, 광고/제휴 코드, 뉴스란, Project2 연동, GA4/Search Console 구조, DB/API/Supabase, Control Tower, package 설정, 도메인 설정은 수정하지 않았습니다.

### Real New Product Patch Trial - 2026-05-28
- **실제 신규 후보 trial**: 기존 제품 목록과 snapshot에서 중복 여부를 확인한 뒤 `Pulsar Xlite V3 Large`, `Ninjutso Sora V2 8K`, `Keychron V1 Max` 3개로 `product_config_patch` trial을 만들었습니다.
- **validator 결과**: `npm run product-patch:validate -- ./tmp/product-patch-real-new-trial.json` 실행 결과 신규 추가 후보 3개, 기존 중복 후보 0개, errors 0개로 분류되었습니다.
- **조사 기준**: 공식 제품 페이지 중심으로 무게, 센서, 연결, 배열, 키캡/하우징 등 확인 가능한 정보만 patch에 넣고, 불확실한 정보는 `rawSpecs.note`에 확인 필요 메모로 남겼습니다.
- **안전선 유지**: 이번 trial은 임시 patch 검증만 수행했으며 실제 제품 TS, snapshot JSON, Finder/UI, DB/API/Supabase, Control Tower, `merge-product-patch.ts`는 변경하지 않았습니다.

### New Product Manual Apply Trial - 2026-05-28
- **신규 제품 3개 수동 반영 trial**: validator를 통과한 `Pulsar Xlite V3 Large`, `Ninjutso Sora V2 8K`, `Keychron V1 Max`를 각각 `review` 상태로 제품 TS 데이터에 수동 추가했습니다.
- **자동 병합 없이 반영**: `merge-product-patch.ts`나 자동 병합 스크립트 없이, 기존 제품을 덮어쓰지 않고 신규 항목으로만 추가했습니다.
- **미확정 영역 보류**: `sources` 최상위 필드, `shellReferences`, `productImages`, `productLinks`는 추가하지 않았고, 불확실한 스펙은 `rawSpecs.note`에 확인 필요 메모로 남겼습니다.
- **검증 완료**: 반영 후 validator는 해당 patch를 기존 중복 후보 3개로 감지했으며, `npm run snapshot:export`, `npm run lint`, `npm run build`를 통과했습니다.

### New Product Finder QA - 2026-05-28
- **신규 제품 Finder 노출 확인**: `Pulsar Xlite V3 Large`, `Ninjutso Sora V2 8K`, `Keychron V1 Max`가 Mouse/Keyboard Finder에서 후보로 노출되는지 로컬 UI 기준으로 확인했습니다.
- **basicFilters 최소 보정**: `Ninjutso Sora V2 8K`는 실제 크기 기준 작은 편에 가까운 대칭형으로 판단해 `handSizeRange`와 `basicFilters.size`를 `small`로 보정했습니다.
- **확인 조합**: Xlite V3 Large는 `큰 편 / 오른손용 비대칭형 / 가벼운 편 / 무선`, Sora V2 8K는 `작은 편 / 대칭형 / 가벼운 편 / 무선`, V1 Max는 `75% / 무선` 조합에서 결과 카드 노출을 확인했습니다.
- **안전선 유지**: Finder 추천 로직, UI 구조, 상세 패널, DB/API/Supabase, Control Tower, 제품 이미지/링크/가격 기능은 변경하지 않았습니다.

### v0.7B - Buying Checklist Copy QA (Current)
- **가이드 상세 본문 및 카드 요약 문구 대대적 정밀 QA 완수**:
  - 새로 생성된 구매 전 체크 가이드 3종(마우스/키보드/모니터) 본문을 초보자 눈높이에서 이해하기 쉽고 직관적인 어조로 다듬었으며, AI 초안 느낌의 거친 번역투 및 광고성/과장성 수식어를 차분하고 객관적인 문체로 전수 보정했습니다.
  - [마우스 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/mouse-buying-checklist/page.tsx): 그립법 용어 대신 손바닥 지지감(비대칭/대칭형) 체감으로 쉽게 다듬고, 4K/8K 폴링레이트의 PC 사양 병목 주의점 명시 및 광학/기계식 스위치 취향 비교를 기재했습니다.
  - [키보드 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/keyboard-buying-checklist/page.tsx): 미니배열(60%) 단축키 조합 적응 이슈 팁 추가, 화려한 스위치 과장 마케팅 네이밍을 4대 본질 축(리니어/택타일/클릭/저소음)으로 환원해 설명, 저소음축 파워 타건 시 서걱음/책상 울림 경고, 하우징/키캡 소재 기호 취향 존중 강화.
  - [모니터 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/monitor-buying-checklist/page.tsx): 책상 세로 깊이 자로 재기 팁 추가, 패널별 장단점 균형 튜닝, OLED 번인 과도한 우려 거두기, 1ms 스펙 과신 주의 및 무리한 오버드라이브 역잔상 유발 경고 수록.
  - [가이드 목록 메타데이터](file:///Users/jilee/antigravity/src/project7/src/content/kr/guides.ts): 가이드 목록 카드에 표시되는 요약본(`aiSummaryKo`)을 다정하고 품격 높은 정보 요약 톤으로 완전히 정돈했습니다.
- **스냅샷 빌드 및 엄격한 금지어 전수 통과**:
  - 10대 금지 단어(최고, 완벽, 무조건, 끝판왕, 압도적, 정밀 진단, 불량 확정, 정상 확정 및 '반드시', '후회 없음')에 대해 철저히 예외 없는 검증을 통과시켰습니다.
  - SetupRadar의 더블클릭, 채터링, 불량화소 자가 테스트 도구 경로를 텍스트 맥락 속에 유기적으로 녹여 연동 완성도를 높였습니다.

### v0.7A - Buying Checklist Pages
- **구매 전 체크 정적 가이드 3종 신규 추가**: 초보자가 기기를 안심하고 구매할 수 있도록 마우스, 키보드, 모니터에 특화된 정밀 체크리스트 페이지 3개를 `SpecGuide` 레이아웃에 맞춰 전격 추가했습니다.
  - [마우스 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/mouse-buying-checklist/page.tsx): 마우스 쉘/형태, 무게 선호, 2.4GHz 무선 vs 블루투스, DPI 및 고주사율 폴링(4K/8K) 실체감, 부품 보증 기준 제시.
  - [키보드 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/keyboard-buying-checklist/page.tsx): 풀배열/텐키리스/75%/65%/60% 배열 낭비 방지, 화려한 스위치 네이밍 식별법, 실사용 소음, 하우징/키캡 소재 특징, 핫스왑 지원 여부.
  - [모니터 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/monitor-buying-checklist/page.tsx): 해상도/주사율 감당 사양 체크, IPS/VA/OLED 패널별 차이점 및 리스크, GtG vs MPRT 응답속도 마케팅 분별법, 불량화소 무결점 보증 범위 및 교환 규정.
- **가이드 데이터 및 스냅샷 무결성 완료**:
  - `src/content/kr/guides.ts`에 카테고리 `purchase-check`로 연동하여 가이드 목록(`/kr/guides`)에 깨짐 없이 자연스럽게 배치되도록 연계했습니다.
  - 콘텐츠 스냅샷 검사 스크립트(`export-content-snapshots.ts`)에 구현된 금지어 규칙(최고, 완벽, 무조건 등)을 철저히 우회 및 예외 없이 준수했습니다.
- **정적 아키텍처 한계선 준수**:
  - 서버 API, Supabase, 실시간 가격 트래커나 제품 이미지 로드 코드 변경 없이, 완전한 정적 HTML 컴파일 형태로 호환성을 보장했습니다.

### v0.6C - Snapshot Validation Rules
- **snapshot validation 강화**: `npm run snapshot:export` 실행 시 metadata, 제품 기본 필터, 중복 id/slug, shellReferences, productImages/productLinks, tools/guides/finder options, 금지 표현을 함께 검증합니다.
- **실패/경고 기준 분리**: 허용값 오류, 필수 필드 누락, 금지 표현은 export를 중단하고, review 상태 제품이나 미공개 shellReferences 같은 확인 항목은 warning으로 출력합니다.
- **요약 출력 추가**: 생성 snapshot 수, 마우스/키보드/스위치/도구/가이드 수, shellReferences 공개 가능 수, 이미지/링크 승인 수, warning 수를 console에 요약합니다.
- **공개 사이트 import 경로 유지**: snapshot은 여전히 검증/Control Tower/DB화 준비용 산출물이며, 실제 Project7 공개 사이트는 기존 `src/content` TS 데이터를 직접 읽습니다.

### v0.6B - TS to JSON Snapshot Export
- **snapshot export 스크립트 추가**: 현재 `src/content` TypeScript 데이터를 `snapshots/kr/` 아래 JSON snapshot으로 export하는 `npm run snapshot:export` 명령을 추가했습니다.
- **영역별 snapshot 생성**: site copy, tools, guides, mouse/keyboard products, switches, Mouse/Keyboard Finder 옵션을 분할 JSON으로 생성합니다.
- **공개 사이트 import 경로 유지**: 생성된 snapshot은 검증/Control Tower/DB화 준비용 산출물이며, 실제 Project7 공개 사이트는 아직 기존 `src/content` TS 데이터를 직접 읽습니다.
- **구현 금지선 유지**: Supabase/API/DB, Control Tower 연동, 제품 데이터 수정, Finder 로직 변경은 하지 않았습니다.

### v0.6A - Content Snapshot Structure Plan
- **JSON snapshot 구조 설계 문서 추가**: 현재 `src/content` 기반 TS 데이터를 나중에 JSON snapshot으로 export할 때 사용할 기준을 [docs/content-snapshot-plan.md](file:///Users/jilee/antigravity/src/project7/docs/content-snapshot-plan.md)에 정리했습니다.
- **정적 배포 유지 전략**: Supabase/API에 바로 연결하지 않고, TS 유지 -> JSON snapshot 병행 -> DB에서 published snapshot export 후 정적 빌드 흐름을 추천안으로 기록했습니다.
- **Control Tower 연계 기준**: 문구, 제품, 필터 작업대가 어떤 형태로 snapshot/patch를 export해야 하는지 제품/문구/필터 구조로 나눠 정리했습니다.
- **구현 보류선 유지**: 실제 export script, import 경로 변경, Supabase/API/DB, 제품 데이터 수정, Finder 로직 변경은 하지 않았습니다.

### v0.5F - Detail Panel De-dup QA
- **상세 패널 중복 정보 제거**: Finder 결과 카드에 이미 보이는 요약, 핵심 기준, 기본 스펙, 체감 한줄평을 펼침 패널에서 반복하지 않도록 정리했습니다.
- **구매 전 체크 중심 재구성**: 펼침 패널은 이런 경우에 맞을 수 있음, 주의할 점, 구매 전 체크, 추가로 확인할 스펙 중심으로 표시합니다.
- **버튼 문구 조정**: `자세히 보기` 대신 `구매 전 체크` 문구를 사용해 패널의 목적을 더 분명하게 했습니다.
- **기존 금지선 유지**: 추천 로직, 제품 데이터, 제품 상세 페이지, 이미지/링크/가격/비교 기능은 변경하지 않았습니다.

### v0.5E - Product Detail Panel Mock
- **Finder 카드 펼침 패널 mock 추가**: Mouse Finder와 Keyboard Finder 결과 카드에 `자세히 보기` 버튼을 추가해 카드 안에서 구매 전 확인 정보를 펼쳐볼 수 있게 했습니다.
- **현재 데이터만 표시**: 요약, basicFilters 기반 핵심 기준, 값이 있는 확실한 스펙, 장점/주의점/구매 전 체크를 짧게 표시합니다.
- **미노출 정책 유지**: 제품 상세 페이지, 이미지, 링크, 가격/최저가, 비교 기능, 내부 `status`는 표시하지 않으며 Finder 추천 로직도 변경하지 않았습니다.
- **쉘 레퍼런스 안전 조건 유지**: Mouse Finder의 쉘 체감 레퍼런스는 기존 Product Trust Guard 조건을 통과한 항목만 패널 안에서도 조용하게 표시합니다.

### v0.5D - Product Detail UX Plan
- **제품 상세정보 UX 설계 문서 추가**: Finder 결과 상품을 클릭했을 때 보여줄 상세정보 구조를 [docs/product-detail-ux-plan.md](file:///Users/jilee/antigravity/src/project7/docs/product-detail-ux-plan.md)에 정리했습니다.
- **진입 방식 비교**: 카드 펼침 패널, 상세 모달, `/kr/products/[slug]` 상세 페이지의 장단점을 비교하고, 단기는 카드 펼침 패널, 중기는 제품 상세 페이지를 추천했습니다.
- **구현 보류선 유지**: 실제 상세 페이지, 모달, 펼침 패널, 이미지/링크/가격/비교 기능, Supabase/API/DB 연결은 추가하지 않았습니다.

### v0.5C - Finder Product Card Compact UI
- **Finder 결과 카드 컴팩트화**: Mouse 및 Keyboard Finder 결과 카드의 세로 높이, 패딩, 마진을 축소하고 텍스트 밀도를 조정해 한 화면에 더 많은 결과가 노출되도록 개선했습니다.
  - 마우스/키보드 결과 카드 패딩 축소 (`p-4` -> `p-3`), 외부 여백 축소 (`mb-2` -> `mb-1`, `mb-3` -> `mb-2`).
  - 스펙 테이블 그리드 간격 및 패딩 축소 (`gap-2` -> `gap-1`, `px-3 py-2` -> `px-2 py-1`).
  - 텍스트 폰트 미세 조정 (`text-[10px]` -> `text-[9.5px]` 레이블, `text-[11px]` -> `text-[10.5px]` 스펙 값 및 체감 한줄평).
  - 키보드 배지 영역 마진 및 패딩 축소 (`mb-2` -> `mb-1.5`, `px-2 py-0.5` -> `px-1.5 py-0.5`), 폰트 크기 (`text-[10px]` -> `text-[9.5px]`).
  - 마우스 쉘 체감 레퍼런스(`shellReferences`) 영역의 마진/패딩 및 폰트 크기 축소 (`mt-3 pt-2.5` -> `mt-2 pt-2`, `p-2` -> `p-1.5`, `text-[9.5px]`, 주의사항 `text-[9px]`).
- **엄격한 구조 통일 및 비노출 정책 유지**:
  - 마우스와 키보드의 스펙 레이아웃 수치들을 완전히 동기화하여 시각적 일관성을 확보했습니다.
  - 추천/필터 로직 변경을 철저히 금지하였고, `productImages`, `productLinks`, 내부 `status` 미노출 정책을 유지하였습니다.
  - 필터 질문 영역의 라벨과 가이드 텍스트가 넓은 화면에서 한 줄로 붙어 나오는 문제를 해결하기 위해, 모든 뷰포트에서 라벨 아래에 가이드 텍스트가 항상 정교하게 줄바꿈(`flex-col` 구조)되어 노출되도록 디자인 정렬을 다듬었습니다.

### v0.5B - Product Card UX Review
- **Finder 결과 카드 품질 점검**: Mouse Finder와 Keyboard Finder 결과 카드의 정보 위계와 문구 톤을 점검하고, 과하게 마케팅처럼 읽히는 키보드 제품 문구를 최소 보정했습니다.
- **쉘 레퍼런스 노출 안전성 유지**: Mouse Finder의 쉘 체감 레퍼런스는 `editorNoteKo`가 있는 검수 항목만 작고 조용하게 표시하도록 유지했습니다.
- **미노출 정책 유지**: 내부 `status`, `productImages`, `productLinks`는 사용자 화면에 표시하지 않으며, 제품 상세/비교/가격 링크는 후속 작업으로 보류합니다.

### v0.5A - DB Schema Planning
- **DB화 전 설계 문서 추가**: 향후 Supabase 등 DB로 제품 데이터를 옮길 때 필요한 테이블 초안을 [docs/db-schema-plan.md](file:///Users/jilee/antigravity/src/project7/docs/db-schema-plan.md)에 정리했습니다.
- **정적 TS 구조와 DB 매핑 정리**: `products`, `product_locales`, `product_basic_filters`, `product_advanced_filters`, `product_detail_specs`, `product_raw_specs`, `product_shell_references`, `product_images`, `product_links`, `switch_entries`, `content_pages` 후보를 현재 `src/content` 구조와 연결했습니다.
- **구현 금지선 유지**: 이번 버전은 실제 Supabase 연결, API route, SQL migration, 제품 데이터 수정, Finder/UI 변경 없이 설계 문서만 추가한 단계입니다.

### v0.4E - Product Trust Guard
- **쉘 레퍼런스 노출 조건 극대화**: `editorNoteKo`가 존재하고, `confidence`가 `medium` 또는 `high`이며, `sourceHint`가 `unknown`이 아닌 신뢰할 수 있는 레퍼런스만 선별 렌더링하도록 노출 조건을 대폭 강화했습니다. 조건에 맞는 항목이 없으면 "쉘 체감 레퍼런스" 영역 전체를 완전히 숨겨 깔끔한 카드 가독성을 유지합니다.
- **이미지 및 가격 링크 타입 설계**: 향후 이미지 및 가격 아웃링크 추가에 대비하여 `BaseContent` 등에 `productImages` 및 `productLinks` optional 스키마를 준비했습니다. 이번 버전에서는 실제 데이터 주입 및 화면 노출을 제한하여 비즈니스/법적 리스크를 미연에 방지합니다.
- **제품 신뢰성 관리 정책 수립**: 이미지 저작권 및 가격 수집, 쉘 레퍼런스 검수 과정에 대한 신뢰성 제어 정책을 `README.md` 및 `PROJECT7_WORK_LOG.md`에 명문화하였습니다.

### v0.4D - Mouse Shell Reference Display
- **쉘 체감 레퍼런스 노출**: Mouse Finder 결과 카드 하단에 마우스의 `shellReferences` 데이터를 노출하는 "쉘 체감 레퍼런스" 영역을 적용했습니다.
- **체계적인 fallback 텍스트 처리**: `editorNoteKo || aiNoteKo` 문장을 우선 노출하고, 없을 경우 `relationType`과 `confidence` 조합 규칙에 맞게 매끄러운 추천 설명글을 자동 실시간 조립하는 견고한 데이터 fallbacks를 갖추었습니다.
- **작고 조용한 톤앤매너**: 기존 다크/라이트 테마의 디자인 흐름을 지키며, 옅은 백그라운드와 얇은 테두리 및 작은 크기의 서브 설명용 회색 텍스트(small/muted style)를 채택하여 결과 카드의 원래 가독성과 위계를 전혀 헤치지 않도록 깔끔하게 설계했습니다.
- **금지 표현 절대 배제 원칙**: 법적/비즈니스적 리스크가 있는 “카피쉘”, “배꼈다”, “짭”, “표절”, “원본 쉘” 등의 부정적/직관적 단어 사용을 완벽하게 방지하였습니다.

### v0.4C - Sample Data QA
- **Finder QA**: 마우스/키보드 샘플 10개 데이터가 Finder에서 기존 published 제품과 신규 review 샘플을 함께 후보로 보여주는지 점검했습니다.
- **review 노출 기준**: 현재 샘플 데이터 QA 단계에서는 `status: "review"` 제품도 Finder 결과에 노출될 수 있습니다. 내부 상태값은 사용자 화면에 표시하지 않습니다.
- **shellReferences 보존**: 쉘 레퍼런스는 아직 화면에 표시하지 않고, 추후 제품 카드/상세/비교 확장을 위한 데이터로만 보존합니다.
- **문구 완화**: Finder 결과에 직접 보일 수 있는 과장 표현을 참고용 톤으로 일부 완화했습니다.

### v0.4B - Sample Product Data Pack
- **DB화 전 리허설**: 마우스, 키보드, 스위치/축 샘플 데이터를 각각 총 10개 수준으로 보강해 `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs` 구조를 검증합니다.
- **review 상태 유지**: 신규 샘플은 모두 `status: "review"`로 두고, 운영자 교정 전 참고용 초안으로 관리합니다.
- **Finder 검증용 basicFilters**: 신규 마우스/키보드 샘플에는 Finder가 읽을 수 있는 `basicFilters`를 필수로 입력했습니다.
- **정적 운영 유지**: 구매 링크, 가격 추적, 제품 이미지, Supabase/API/DB/n8n 연동은 추가하지 않았습니다.

### Keyboard Product Filter Simplification
- **기본 필터 5개 원칙**: 키보드 제품 필터는 배열, 연결 방식, 키감/축 느낌, 소음, 가격대까지만 기본 노출하는 구조로 정리했습니다.
- **더보기 필터 분리**: 게이밍 기능, 멀티기기, 키캡, 하우징, 백라이트, 무게감은 선택형 더보기 필터로 분리합니다.
- **상세 스펙 분리**: 키압 세부값, 매크로, 응답속도, 블루투스 버전, 배터리, 엔터키 형태, 각인 위치, 케이블 재질, 구성품, PS2, 스텝스컬쳐, 윈도우 키 잠금, 세부 크기는 상세 스펙 또는 원본 스펙으로 보관합니다.
- **초보자 우선**: 다나와식 전체 스펙 필터를 그대로 노출하지 않고 구매 판단에 필요한 조건만 먼저 보여줍니다.

### Mouse Product Filter & Shell Reference Simplification
- **기본 필터 5개 원칙**: 마우스 제품 필터는 형태, 무게감, 연결 방식, 크기감, 가격대까지만 기본 노출하는 구조로 정리했습니다.
- **더보기 필터 분리**: 게이밍 성능, 버튼 수, 코팅/그립감, 스위치 성향, 배터리/충전은 선택형 더보기 필터로 분리합니다.
- **상세 스펙 분리**: 센서, DPI, IPS, 가속도, 폴링레이트, 블루투스 버전, 보증기간, 세부 크기값 등은 기본 필터가 아니라 상세 스펙 또는 원본 스펙으로 보관합니다.
- **쉘 체감 레퍼런스**: 유사 쉘 계열, 자주 비교되는 쉘, 쉘 체감 레퍼런스 정보를 `shellReferences`에 보관할 수 있습니다.
- **표현 원칙**: 법적/표현 리스크를 줄이기 위해 카피/표절성 표현 대신 손에 닿는 형태가 비슷하다는 반응, 비교 기준으로 삼기 좋음 같은 표현을 사용합니다.

### v0.3F - Visual Editing Workbench Ready (Current)
- **시각형 문구 수정 작업대**: Project99 Control Tower의 `/projects/project7/content`에서 SetupRadar 화면처럼 보이는 mock preview를 보며 문구를 클릭하고 수정안을 작성할 수 있습니다.
- **수동 반영 원칙 유지**: 작업대 수정안은 localStorage와 export 파일로만 관리되며, 실제 사이트 반영은 Codex/Gemini가 `src/content`의 `editor` 필드에 옮긴 뒤 Git push와 Cloudflare Pages 배포로 진행합니다.
- **실시간 DB 수정 없음**: Supabase/API/n8n 없이 정적 사이트 구조를 유지합니다. 실제 문구 수정은 yulxwell이 별도 루프에서 진행합니다.

### Policy Pages Prep - 2026-05-30
- **정책/안내 페이지 추가**: AdSense/제휴 준비를 위해 `/kr/privacy`, `/kr/terms`, `/kr/disclosure` 정적 페이지를 추가했습니다.
- **Footer 신뢰 링크 정리**: 준비 중 문구로 남아 있던 개인정보처리방침/이용 안내 링크를 실제 페이지로 연결하고, 광고·제휴 고지 링크를 추가했습니다.
- **수익화 코드 미추가**: 실제 광고 script, AdSense 코드, 링크프라이스/쿠팡파트너스 링크, 구매 버튼은 추가하지 않았습니다.
- **기존 구조 유지**: 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower는 변경하지 않았습니다.

### News Preview Section Mock 1 - 2026-06-07
- **최근 장비 소식 섹션 추가**: `/kr` 메인에 정적 mock 데이터 기반의 최근 장비 소식 미리보기 섹션을 추가했습니다.
- **내부 가이드 연결**: 카드 4개는 구매 전 확인 흐름을 안내하고, 관련 내부 가이드로만 연결합니다.
- **Project2 연동 준비 기록**: 향후 Project2가 핫딜/뉴스/제품 소개 본문을 맡고 Project7은 preview를 노출하는 방향만 문서화했습니다.
- **실제 연동 없음**: Project2, RSS/API/DB/Supabase, 광고/제휴 링크, 제품 데이터, Finder 로직, GA4/Search Console 구조는 수정하지 않았습니다.

### VS Compare Structure Plan - 2026-06-07
- **비교 콘텐츠 구조 문서화**: 장비 간 VS 비교를 장기 성장축으로 검토하기 위해 [docs/vs-compare-structure-plan.md](file:///Users/jilee/antigravity/src/project7/docs/vs-compare-structure-plan.md)를 추가했습니다.
- **URL/데이터/톤 설계**: `/kr/compare` 계열 URL 후보, 공통 비교 데이터 구조, 마우스/키보드/모니터/CPU/GPU/RAM 비교 기준, 초보자용 안전 표현 원칙을 정리했습니다.
- **CPU 비교 안전선 명시**: CPU 비교는 단순 벤치마크 수치보다 소켓, 플랫폼, DDR4/DDR5, 전력/발열, X3D, 업그레이드 경로, 병목 해석을 중심으로 설계했습니다.
- **구현 보류**: 실제 route, CPU/GPU 데이터, 제품 데이터 수정, Finder 로직, 광고/제휴, Project2 실제 연동, API/DB는 추가하지 않았습니다.

### Compare Main Mock 1 - 2026-06-07
- **비교 메인 route 추가**: `/kr/compare` 정적 mock 페이지를 추가해 장비 비교 카테고리 진입점을 만들었습니다.
- **카테고리 카드 구성**: 마우스, 키보드, 모니터, CPU, GPU 비교 카드 5개와 참고용 안내 문구를 배치했습니다.
- **메인 진입 링크 추가**: `/kr` 메인 하단부에 `/kr/compare`로 이동하는 작은 진입 카드를 추가했습니다.
- **상세 비교 보류**: 실제 비교 상세 페이지, CPU/GPU 데이터, 제품 데이터, Finder 로직, 광고/제휴, Project2 실제 연동은 추가하지 않았습니다.

### v0.3A - Control Tower Workbench Integration
- **JSON 작업대 도입**: Markdown 기반 검토를 넘어, Control Tower WebUI에서 읽을 수 있는 구조화된 JSON 작업대(`docs/content-copy-workbench.kr.json`)를 추가했습니다.
- **Project99 연동 설계**: Control Tower에서 SetupRadar의 문구를 섹션별로 필터링하고 수정안을 작성한 뒤 JSON으로 추출(Export)하는 흐름을 구축했습니다.
- **수동 반영 원칙 유지**: 실제 코드 수정은 추출된 JSON을 기반으로 Codex/Gemini가 수행하며, 사이트의 완전 정적 아키텍처와 `ai*` 필드 보존 원칙을 유지합니다.

### v0.2.8 - Finder Compact UX Hotfix
- **Finder compact layout 적용**: Mouse Finder와 Keyboard Finder의 큰 카드형 선택지를 compact chip 중심 UI로 줄였습니다.
- **첫 화면 정보 밀도 개선**: 데스크톱 기준 주요 선택 항목을 한 화면에서 빠르게 훑어볼 수 있도록 여백과 카드 높이를 줄였습니다.
- **Mouse Finder 불편함 질문 정리**: "현재 불편한 점"을 별도 질문에서 제거하고, 손목 피로/선 걸림/크기 부담 설명을 각 선택지 helper text에 녹였습니다.
- **메인 페이지 노출 낮춤**: Finder를 필수 흐름이 아닌 보조 CTA로 낮추고, 테스트 도구보다 크게 보이지 않도록 정리했습니다.
- **옵션 파일 유지**: Finder 문구와 선택지는 계속 `src/content/kr/finder/*Options.ts`에서 관리합니다.

### v0.2.7 - Finder UX Refactor
- **Finder 단일 페이지화**: Mouse Finder와 Keyboard Finder를 단계형 마법사에서 한 화면 필터형 UX로 단순화했습니다.
- **초보자 회피 선택지 강화**: 주요 선택 항목에 "상관없음", "잘 모르겠음"을 추가해 조건을 몰라도 추천 결과를 볼 수 있도록 했습니다.
- **Mouse Finder 질문 축소**: FPS/MOBA 등 장르 중심 질문을 제거하고 손 크기, 형태, 불편함, 무게, 연결 방식 중심으로 정리했습니다.
- **Keyboard Finder 시각화 정리**: 품질이 낮은 배열 다이어그램을 제거하고 텍스트 배지와 한 줄 설명 중심으로 대체했습니다.
- **Finder 옵션 분리**: 운영자가 문구와 선택지를 수정하기 쉽도록 `src/content/kr/finder/` 아래 옵션 config 파일로 분리했습니다.
- **소프트 매칭 유지**: 누락 조건은 무시하고 가능한 조건만 점수화해 참고용 추천 결과 3개를 표시합니다.

### v0.2.6 - Finder Logic Refinement
- **Mouse Finder 파지법 제거**: 초보자가 이해하기 어려운 팜/클로/핑거 그립 파지법 질문을 제거하고, 대신 "마우스 형태 선호(대칭/비대칭)" 질문을 도입하여 직관성을 높였습니다.
- **추천 로직 고도화**: 그립법 기준 필터링에서 `shapeType`(Symmetrical/Ergonomic) 기반 가산점 방식으로 로직을 전환하여 더 정확한 제품 추천을 제공합니다.
- **Keyboard Finder 레이아웃 시각화 강화**: 75%, 65%, 60% 등 구분이 어려운 미니 배열들을 CSS Grid 기반의 정교한 다이어그램으로 재구성하여 시각적 차이를 극대화했습니다.

### v0.2.5 - Detail Hotfix & UX Polish
- **Mouse Finder 개편**: 기존 3단계에서 6단계 정밀 마법사로 리뉴얼. 손 크기, 불편함(손목 통증), 무게, 연결 방식 등을 우선순위에 배치하여 초보자 대응 강화.
- **Keyboard Finder 시각화**: 배열 선택 단계에서 실제 키보드 크기를 직관적으로 알 수 있는 레이아웃 배지/아이콘 시스템 도입. 60% 배열 추가.
- **콘텐츠 아키텍처 안정화**: `BaseContent` 인터페이스 강화를 통해 제품/스위치 데이터의 타입 안전성 확보 및 브랜드 미지정 제품 예외 처리.

### v0.2.3 - Text Quality & Switch Database
- **초보자 중심 텍스트 개선**: 모든 가이드 및 진단 문구를 구매 판단을 돕는 '초보자 친화적' 문체로 리뉴얼.
- **키보드 스위치 사전 구축**: '아이스크림축', '말차축' 같은 감성 네이밍 축을 실제 체감 기준으로 분류하는 데이터 구조(`KeyboardSwitch`) 추가.
- **스위치 가이드 페이지 신설**: `/kr/switches` 경로를 통해 복잡한 스위치 정보를 한눈에 확인 가능.

### v0.2.1 - Design System Hotfix
- **테마 시스템 고도화**: 모든 테스트 및 가이드 컴포넌트가 CSS 변수(`--primary`, `--accent` 등)를 사용하도록 표준화.
- **UI 일관성 확보**: 하드코딩된 색상을 제거하고 라이트/다크 모드에 최적화된 전문적인 디자인 톤 적용.

## 📦 배포 가이드 (Cloudflare Pages)
본 프로젝트는 완전 정적 사이트(Static Site Generation)로 구성되어 있으며, **Cloudflare Pages** 배포를 기준으로 운영됩니다.

콘텐츠와 Finder 옵션은 브라우저에서 실시간으로 수정되는 구조가 아닙니다. 파일을 수정한 뒤 Git에 커밋/푸시하면 Cloudflare Pages 빌드가 실행되고 정적 산출물이 배포됩니다.

## 🧾 Snapshot Export
현재 TS content 데이터를 JSON snapshot으로 생성하려면 아래 명령을 사용합니다.

```bash
npm run snapshot:export
```

생성 위치는 `snapshots/kr/`입니다. 이 snapshot은 검증, Control Tower 연동, DB화 준비용이며, 공개 사이트의 import 경로는 아직 `src/content` 그대로 유지합니다.

### Cloudflare Pages 설정
1. Cloudflare 대시보드에서 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git** 선택.
2. 빌드 설정:
   - **Framework preset**: `Next.js` 또는 `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`

## 🛠 아키텍처 제약 사항 (Strict Restrictions)
- **No Database/API**: Supabase 포함 모든 외부 DB 및 서버 API 사용 없음.
- **No Dynamic Data**: 실시간 최저가 크롤링, 외부 상품 DB 연동 없음.
- **No User System**: 회원가입, 로그인, 개인 데이터 서버 저장 없음.
- **No Environment Variables**: 배포 시 별도의 환경 변수 설정이 필요하지 않음.

## 📝 배포 전 체크리스트
- [x] `npm run build` 오류 없이 완료 여부 (`out` 폴더 생성 확인)
- [x] 모든 테스트 페이지 하단에 Disclaimer(면책 문구) 포함 여부
- [x] 모바일 브라우저에서 전체화면 진입 및 색상 전환 정상 작동 확인
- [x] '시작하기' 등 주요 CTA 버튼의 시인성 확보
