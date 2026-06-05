# Project7 Copy Source Map

Last updated: 2026-06-05

## 1. 목적

이 문서는 Project7 SetupRadar의 사용자 화면 문구가 어떤 파일에서 관리되는지 정리하기 위한 운영 지도입니다.

- Control Tower에서 수정 가능한 문구와 실제 공개 사이트 문구의 범위 차이를 분명히 합니다.
- yulxwell이 사이트를 직접 훑으며 문구 수정을 요청할 때, 어떤 파일을 봐야 하는지 빠르게 확인할 수 있게 합니다.
- Control Tower 수정 후 실서비스 문구가 바뀌지 않을 때 먼저 확인할 기준 문서로 사용합니다.

현재 Project7은 실시간 CMS가 아닙니다. Control Tower에서 작성한 수정안은 곧바로 `setupradar.pages.dev`에 반영되지 않으며, Codex/Gemini가 실제 repo 파일에 반영한 뒤 commit/push와 Cloudflare Pages 배포가 필요합니다.

## 2. 메인 `/kr` 문구 출처

| 화면 위치 | 현재 관리 파일 | Control Tower 수정 가능 여부 | 하드코딩 여부 | 주의사항 |
| --- | --- | --- | --- | --- |
| Hero badge `SetupRadar Hardware Guide` | `src/app/kr/page.tsx` | 현재 범위 밖 | 예 | `siteCopy.ts`를 바꿔도 badge는 바뀌지 않습니다. |
| Hero title | `src/content/kr/siteCopy.ts`의 `SITE_COPY.kr.landing.heroTitle`, `SITE_COPY.hero.titleHighlight` | 부분 가능 | 아니오 | Control Tower가 이 필드를 실제 코드에 반영해야 live에 적용됩니다. |
| Hero subtitle/body | `src/content/kr/siteCopy.ts`의 `HOMEPAGE_HERO_DESCRIPTION`, `SITE_COPY.hero.description` | 부분 가능 | 아니오 | `/kr` meta description과는 별도입니다. |
| Hero 강조 단어 | `src/app/kr/page.tsx`의 `highlights` 배열 | 현재 범위 밖 | 예 | 본문 문구를 바꿀 때 강조 단어도 같이 맞춰야 합니다. |
| CTA 버튼 | `src/content/kr/siteCopy.ts`의 `startButton`, `guideButton` | 부분 가능 | 아니오 | 버튼 링크는 `src/app/kr/page.tsx`에 직접 있습니다. |
| 테스트 도구 섹션 제목/설명 | `src/app/kr/page.tsx`의 `HomeSectionHeader` props | 현재 범위 밖 | 예 | `/kr/tests` 목록 문구와 별도입니다. |
| 메인 테스트 카드 3개 | `src/app/kr/page.tsx`의 `TestCard` props | 현재 범위 밖 | 예 | `src/content/kr/tools.ts`를 바꿔도 메인 카드 3개는 자동 변경되지 않습니다. |
| 가이드 소개문구 | `src/app/kr/page.tsx`의 `HomeIntroBlock` props | 현재 범위 밖 | 예 | `/kr/guides` Hero와 별도입니다. |
| 가이드 섹션 제목/설명 | `src/app/kr/page.tsx`의 `HomeSectionHeader` props | 현재 범위 밖 | 예 | 가이드 목록 카테고리 설명은 `guides.ts`에서 따로 관리됩니다. |
| 메인 가이드 카드 6개 | `src/app/kr/page.tsx`의 `GuideCard` props | 현재 범위 밖 | 예 | `src/content/kr/guides.ts` 카드 요약을 바꿔도 메인 추천 카드 문구는 자동 변경되지 않습니다. |
| Finder 소개문구 | `src/app/kr/page.tsx`의 `HomeIntroBlock` props | 현재 범위 밖 | 예 | Finder 상세 페이지 Hero와 별도입니다. |
| Finder 진입 카드 | `src/app/kr/page.tsx`의 `GuideCard` props | 현재 범위 밖 | 예 | Mouse/Keyboard Finder 옵션 문구와 별도입니다. |
| 하단 안내 문구 | `src/app/kr/page.tsx` 하단 `<section>` | 현재 범위 밖 | 예 | 가격/판매 옵션 안내처럼 정책성 문구는 별도 확인이 필요합니다. |
| meta title | `src/app/kr/page.tsx`의 `metadata.title` | 현재 범위 밖 | 예 | 화면 Hero title과 다를 수 있습니다. |
| meta description | `src/app/kr/page.tsx`의 `metadata.description` | 현재 범위 밖 | 예 | Control Tower가 hero 본문만 바꾸면 검색/공유 설명은 그대로 남습니다. |
| canonical | `src/app/kr/page.tsx`의 `metadata.alternates.canonical` | 현재 범위 밖 | 예 | 경로 구조와 SEO에 연결됩니다. 문구 작업에서 임의 수정하지 않습니다. |
| global metadata | `src/app/layout.tsx` | 현재 범위 밖 | 예 | `metadataBase`, 기본 title template, Open Graph, Twitter, robots, Google verification이 있습니다. |

## 3. Header/Footer 문구 출처

| 화면 위치 | 관리 파일 | Control Tower 수정 가능 여부 | 하드코딩 여부 | 수정 시 주의사항 |
| --- | --- | --- | --- | --- |
| Header 로고 `SetupRadar` | `src/components/layout/Header.tsx` | 현재 범위 밖 | 예 | 모든 페이지 공통 노출입니다. |
| Header 내비게이션 | `src/components/layout/Header.tsx`의 `navigation` | 현재 범위 밖 | 예 | 라벨과 링크가 함께 있으므로 경로를 실수로 바꾸지 않습니다. |
| Header 언어 버튼 | `src/components/layout/Header.tsx`의 `languageLinks` | 현재 범위 밖 | 예 | 현재 KR만 노출됩니다. 미완성 다국어처럼 보이지 않게 유지합니다. |
| Footer 브랜드 설명 | `src/components/layout/Footer.tsx` | 현재 범위 밖 | 예 | Control Tower의 `/kr` hero 설명과 별도입니다. |
| Footer 테스트/리소스 링크 | `src/components/layout/Footer.tsx` | 현재 범위 밖 | 예 | 실제 존재하는 URL만 연결합니다. |
| Footer 문의 링크 | `src/components/layout/Footer.tsx` | 현재 범위 밖 | 예 | 이메일은 Footer가 아니라 `/kr/contact`에서 보여줍니다. |
| Footer 정책 링크 | `src/components/layout/Footer.tsx` | 현재 범위 밖 | 예 | 개인정보처리방침, 이용 안내, 광고·제휴 고지 링크를 유지합니다. |
| Footer 하단 안내 | `src/components/layout/Footer.tsx` | 현재 범위 밖 | 예 | 참고용 안내 문구이며 전역 노출됩니다. |

## 4. Tests 문구 출처

| 화면 위치 | 관리 파일 | Control Tower 수정 가능 여부 | 주의사항 |
| --- | --- | --- | --- |
| `/kr/tests` metadata | `src/app/kr/tests/page.tsx` | 현재 범위 밖 | 화면 Hero와 별도입니다. |
| `/kr/tests` Hero | `src/app/kr/tests/page.tsx`의 `PageHero` props | 현재 범위 밖 | 공통 디자인은 `PageHero`지만 문구는 페이지 파일에서 전달합니다. |
| 테스트 카테고리 제목/설명 | `src/app/kr/tests/page.tsx`의 `TEST_CATEGORIES` | 현재 범위 밖 | `tools.ts`에 없는 목록 섹션 설명입니다. |
| 테스트 목록 카드 | `src/content/kr/tools.ts`의 `TEST_TOOLS` | 부분 가능 | 카드 제목, 설명, 소요 시간, 목적, 주의 문구가 여기서 옵니다. |
| 테스트 상세 페이지 안내 | `src/app/kr/tests/*/page.tsx` | 현재 범위 밖 | 목록 카드 문구와 상세 안내는 별도입니다. |
| 테스트 도구 내부 주의 문구 | 테스트 상세 컴포넌트 또는 해당 route 파일 | 현재 범위 밖 | 테스트 로직과 안내 문구가 같은 파일에 있을 수 있어 수정 범위를 조심합니다. |

## 5. Guides 문구 출처

| 화면 위치 | 관리 파일 | Control Tower 수정 가능 여부 | 주의사항 |
| --- | --- | --- | --- |
| `/kr/guides` metadata | `src/app/kr/guides/page.tsx` | 현재 범위 밖 | 검색/공유 문구입니다. |
| `/kr/guides` Hero | `src/app/kr/guides/page.tsx`의 `PageHero` props | 현재 범위 밖 | 목록 Hero 문구는 `guides.ts`와 별도입니다. |
| 가이드 카테고리 제목/설명 | `src/content/kr/guides.ts`의 `GUIDE_CATEGORIES` | 부분 가능 | 마우스/키보드/모니터/구매 전 체크 섹션 설명입니다. |
| 가이드 목록 카드 제목 | `src/content/kr/guides.ts`의 `GUIDES_DATABASE[].name` | 부분 가능 | 상세 페이지 H1과 다를 수 있습니다. |
| 가이드 목록 카드 요약 | `src/content/kr/guides.ts`의 `aiSummaryKo` 또는 `editorSummaryKo` | 부분 가능 | `getContentDisplay`가 `editorSummaryKo`를 우선 표시합니다. |
| 가이드 상세 본문 | `src/app/kr/guides/*/page.tsx` | 현재 범위 밖 | `guides.ts` 요약을 바꿔도 상세 본문은 자동으로 바뀌지 않습니다. |
| 가이드 상세 metadata | 각 `src/app/kr/guides/*/page.tsx` | 현재 범위 밖 | 상세 본문과도 별도입니다. |

운영 주의: `src/content/kr/guides.ts`는 목록 카드와 카테고리 설명을 관리하고, 상세 페이지 본문은 각 route의 `page.tsx`에서 따로 관리합니다. 카드 요약만 고치고 상세 본문이 바뀌지 않는 것은 정상 구조입니다.

## 6. Finder 문구 출처

| 화면 위치 | 관리 파일 | Control Tower 수정 가능 여부 | 주의사항 |
| --- | --- | --- | --- |
| Mouse Finder Hero | `src/app/kr/finder/mouse-fit/page.tsx`의 `PageHero` props | 현재 범위 밖 | `siteCopy.ts`의 finder title/description과 현재 직접 연결되어 있지 않습니다. |
| Keyboard Finder Hero | `src/app/kr/finder/keyboard-fit/page.tsx`의 `PageHero` props | 현재 범위 밖 | 페이지 파일에 직접 있습니다. |
| 필터 섹션 제목/설명 | 각 Finder `page.tsx` | 현재 범위 밖 | 최근 추가된 `마우스 필터`, `키보드 필터` 설명이 여기에 있습니다. |
| Mouse Finder 질문/선택지 | `src/content/kr/finder/mouseFinderOptions.ts` | 부분 가능 | `label`, `helperText`, `options[].label`, `options[].description` 위주로 수정합니다. |
| Keyboard Finder 질문/선택지 | `src/content/kr/finder/keyboardFinderOptions.ts` | 부분 가능 | `value`는 추천 로직과 연결되어 있어 문구 수정 때 건드리지 않습니다. |
| 결과 카드 제목/브랜드 | `src/content/kr/products/mice.ts`, `src/content/kr/products/keyboards.ts` | 부분 가능 | 제품명/브랜드는 데이터 정체성과 연결됩니다. 단순 문구처럼 바꾸지 않습니다. |
| 결과 카드 요약 | 제품 데이터의 `aiSummaryKo` 또는 `editorSummaryKo` | 부분 가능 | `getContentDisplay(product).summary`로 표시됩니다. |
| 체감 한줄평 | 제품 데이터의 `aiCommunityNoteKo` 또는 `editorCommunityNoteKo`, 없으면 page fallback | 부분 가능 | fallback 문구는 Finder `page.tsx`에 직접 있습니다. |
| 구매 전 체크 패널 | 제품 데이터의 `aiStrengthsKo`, `aiCautionsKo`, `aiBuyingCheckKo` 또는 editor 필드 | 부분 가능 | 패널 제목 자체는 Finder `page.tsx`에 직접 있습니다. |
| 점수 계산 사유/주의 문구 | 각 Finder `page.tsx`의 `scoreMouse`, `scoreKeyboard` | 현재 범위 밖 | 문구처럼 보여도 추천 점수 계산 함수 안에 있으므로 로직 변경 위험이 있습니다. |
| spec label/value 조립 | 각 Finder `page.tsx`의 `getMouseSpecRows`, `getKeyboardSpecRows` | 현재 범위 밖 | label 변경은 UI 문구지만 spec 표시 로직과 붙어 있습니다. |

Finder 문구를 수정할 때는 추천 점수 계산, 필터 매칭, 정렬, `basicFilters` 값을 건드리지 않습니다. 문구만 바꿔도 결과 설명이 달라질 수 있으므로 변경 후 `/kr/finder/mouse-fit`, `/kr/finder/keyboard-fit`에서 직접 확인합니다.

## 7. Products 문구 출처

| 화면 위치 | 관리 파일/필드 | 현재 화면 노출 | 주의사항 |
| --- | --- | --- | --- |
| 마우스 제품 카드 제목 | `src/content/kr/products/mice.ts`의 `brand`, `name` | 노출 | 제품 식별자이므로 문체 교정 대상이 아닙니다. |
| 키보드 제품 카드 제목 | `src/content/kr/products/keyboards.ts`의 `brand`, `name` | 노출 | 제품명 표기 변경은 중복 판단에도 영향을 줄 수 있습니다. |
| 제품 요약 | `aiSummaryKo`, `editorSummaryKo` | 노출 | `editorSummaryKo`가 있으면 AI 초안보다 우선합니다. |
| 장점/주의/구매 체크 | `aiStrengthsKo`, `editorStrengthsKo`, `aiCautionsKo`, `editorCautionsKo`, `aiBuyingCheckKo`, `editorBuyingCheckKo` | Finder 펼침 패널에 노출 | 광고성 추천보다 구매 전 확인 기준으로 유지합니다. |
| 체감 메모 | `aiCommunityNoteKo`, `editorCommunityNoteKo` | 있으면 노출 | 없으면 Finder page fallback 문구가 표시됩니다. |
| 기본/상세 스펙 | `basicFilters`, `detailSpecs`, `features`, `specTags` | 일부 노출 | `basicFilters`는 추천 로직에 연결되므로 문구 작업에서 수정하지 않습니다. |
| `rawSpecs.note` | `rawSpecs.note` | 현재 Finder 기본 카드에는 직접 노출되지 않음 | 운영자 확인용 메모 성격입니다. |
| `productImages` | `BaseContent.productImages` | 현재 공개 UI 미노출 | 이미지 기능은 보류 상태입니다. |
| `productLinks` | `BaseContent.productLinks` | 현재 공개 UI 미노출 | 가격/제휴/구매 링크 기능은 보류 상태입니다. |

제품 데이터 문구는 `src/content/utils.ts`의 `getContentDisplay`를 통해 editor 필드가 우선 표시됩니다. AI 초안 문구를 직접 덮어쓰기보다 `editor*` 필드로 교정하는 흐름을 유지합니다.

## 8. Control Tower 현재 한계

Control Tower는 yulxwell이 문구 수정안을 작성하기 쉽게 돕는 작업대입니다. 현재 구조에서는 다음 한계가 있습니다.

- Control Tower 수정안은 실서비스 파일을 자동으로 바꾸지 않습니다.
- `docs/content-copy-workbench.kr.json`에 있는 항목이나 `src/content` 계열 필드는 상대적으로 작업대에 올리기 쉽습니다.
- `src/app/kr/page.tsx` metadata, section header, main card copy, Footer, Header처럼 page/component에 직접 있는 문구는 현재 별도 수동 수정이 필요합니다.
- `src/app/layout.tsx`의 global metadata, Google verification, robots 설정은 문구처럼 보여도 SEO/Search Console 구조와 연결되어 있어 Control Tower 작업 범위로 보지 않습니다.
- Finder의 점수 계산 함수 안에 있는 안내 문구는 문구처럼 보여도 로직과 같이 있으므로 직접 수정 요청 시 파일 위치와 변경 범위를 명확히 해야 합니다.

## 9. 다음 개선 후보

대규모 구현 없이 검토 후보만 기록합니다.

1. `/kr` metadata 문구를 `siteCopy.ts`와 연결할지 검토합니다.
2. Footer 브랜드 설명과 공통 안내 문구를 `siteCopy.ts`로 옮길지 검토합니다.
3. Header 내비게이션 라벨을 site copy 또는 별도 navigation copy 파일로 분리할지 검토합니다.
4. Control Tower 문구 작업대 범위를 metadata/Footer/Header까지 확장할지 검토합니다.
5. 모든 문구를 한 번에 DB화하지 말고, 자주 바꾸는 문구부터 단계적으로 연결합니다.
6. yulxwell 직접 수정 대상 우선순위는 메인 Hero/CTA, Finder 안내 문구, Guides 카드 요약, Footer/정책 문구, 제품 카드 문구 순으로 둡니다.

## 10. 운영 규칙

- Control Tower에서 수정한 문구가 실서비스에 반영되지 않으면 먼저 이 문서를 확인합니다.
- 메타 문구와 화면 문구는 다를 수 있습니다.
- `guides.ts` 요약과 상세 `page.tsx` 본문은 별도입니다.
- Footer/Header는 현재 별도 컴포넌트입니다.
- Finder 옵션의 `id`, `value`, 제품 `basicFilters`는 추천 로직과 연결되어 있으므로 문구 수정 때 임의로 바꾸지 않습니다.
- 문구 수정 후에는 `npm run lint`, `npm run build`, live URL 확인을 진행합니다.
- 광고/제휴 코드, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조는 문구 작업 중 함께 수정하지 않습니다.
