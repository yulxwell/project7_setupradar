# SetupRadar DB Schema Plan (v0.5A)

이 문서는 Project7 SetupRadar의 정적 TypeScript 제품 데이터를 나중에 Supabase 같은 DB로 옮길 때 필요한 테이블 구조 초안입니다.

이번 v0.5A 범위는 설계 문서화입니다. 실제 Supabase 연결, API route, SQL migration, 제품 데이터 수정, Finder 로직 수정은 하지 않습니다.

## 0. 현재 범위

- 공개 사이트 기준 경로: `/kr`
- 배포 방식: Cloudflare Pages 정적 배포
- 현재 데이터 위치:
  - 마우스: `src/content/kr/products/mice.ts`
  - 키보드: `src/content/kr/products/keyboards.ts`
  - 스위치/축: `src/content/kr/switches.ts`
- 현재 데이터 규모:
  - 마우스 10개 수준
  - 키보드 10개 수준
  - 스위치/축 10개 수준
- 현재 운영 원칙:
  - `editor*` 필드가 있으면 화면에는 editor 우선, 없으면 `ai*` fallback
  - `review` 상태 제품도 현재 샘플 QA 단계에서는 Finder에 노출 가능
  - 내부 status 값은 사용자 화면에 노출하지 않음
  - 쉘 레퍼런스는 검수 조건을 만족한 항목만 공개 노출

## 1. 현재 정적 데이터 구조 요약

### 공통 BaseContent

현재 `src/content/types.ts`의 `BaseContent`는 제품과 스위치가 공통으로 쓰는 기본 필드를 가진다.

| TS 필드 | 의미 | DB 후보 |
| --- | --- | --- |
| `id` | 콘텐츠 식별자 | `products.id`, `switch_entries.id` |
| `slug` | URL 또는 공개 식별자 | `products.slug`, `switch_entries.slug` |
| `brand` | 브랜드 | `products.brand`, `switch_entries.brand` |
| `name` | 제품명/항목명 | `products.name`, `switch_entries.name` |
| `status` | `draft` / `review` / `published` | `products.status`, `switch_entries.status` |
| `updatedAt` | 정적 파일 기준 갱신일 | `updated_at` |
| `aiSummaryKo` | AI 초안 요약 | `product_locales.ai_summary` |
| `editorSummaryKo` | 운영자 교정 요약 | `product_locales.editor_summary` |
| `aiStrengthsKo` / `editorStrengthsKo` | 장점 문구 | `product_locales.ai_strengths`, `editor_strengths` |
| `aiCautionsKo` / `editorCautionsKo` | 주의점 문구 | `product_locales.ai_cautions`, `editor_cautions` |
| `aiCommunityNoteKo` / `editorCommunityNoteKo` | 커뮤니티 체감 문구 | `product_locales.ai_community_note`, `editor_community_note` |
| `aiBuyingCheckKo` / `editorBuyingCheckKo` | 구매 전 체크 | `product_locales.ai_buying_check`, `editor_buying_check` |
| `productImages` | 이미지 후보 | `product_images` |
| `productLinks` | 가격 확인/공식/리뷰 링크 후보 | `product_links` |

### 마우스 제품

마우스는 기존 레거시 필드와 새 필터 구조가 공존한다.

- 레거시 호환 필드: `shapeType`, `dimensions`, `weight`, `sensor`, `recommendedGrips`, `handSizeRange`, `priceRange`, `features`
- 기본 필터: `basicFilters.shape`, `weight`, `connection`, `size`, `price`
- 더보기 필터: `advancedFilters.gamingPerformance`, `buttonCount`, `coating`, `switchTendency`, `battery`
- 상세 스펙: `detailSpecs.sensorModel`, `maxDpi`, `ips`, `fpsScanRate`, `accelerationG`, `pollingRateHz`, `bluetoothVersion`, `dimensionsMm` 등
- 원본 스펙: `rawSpecs`
- 쉘 레퍼런스: `shellReferences`

### 키보드 제품

키보드도 기존 레거시 필드와 새 필터 구조가 공존한다.

- 레거시 호환 필드: `layout`, `switchType`, `isHotSwap`, `material`, `priceRange`, `features`
- 기본 필터: `basicFilters.layout`, `connection`, `feel`, `noise`, `price`
- 더보기 필터: `advancedFilters.gamingFeature`, `multiDevice`, `keycap`, `housing`, `backlight`, `weightFeel`
- 상세 스펙: `detailSpecs.actuationForceG`, `macroSupport`, `responseTimeMs`, `bluetoothVersion`, `battery`, `enterKeyShape`, `legendPosition`, `dimensionsMm` 등
- 원본 스펙: `rawSpecs`

### 스위치/축

스위치/축 사전은 현재 제품이라기보다 설명형 사전 항목에 가깝다.

- 식별자: `id`, `slug`
- 분류: `switchType`, `soundLevel`, `bestFor`
- 수치: `actuationForceG`, `bottomOutForceG`, `travelMm`
- 초보자 문구: `aiBeginnerSummaryKo`, `editorBeginnerSummaryKo`
- 구매 전 체크: `aiBuyingCheckKo`, `editorBuyingCheckKo`
- 주의/네이밍 경고: `aiCautionKo`, `editorCautionKo`, `aiNamingWarningKo`, `editorNamingWarningKo`

## 2. 권장 테이블 전체 초안

| 테이블 | 목적 | 공개 사이트 읽기 | Control Tower 쓰기/검수 |
| --- | --- | --- | --- |
| `products` | 제품의 공통 식별자, 카테고리, 상태 관리 | 예 | 예 |
| `product_locales` | 다국어 제품 문구와 ai/editor 분리 | 예 | 예 |
| `product_basic_filters` | Finder와 기본 목록 필터용 핵심 조건 | 예 | 예 |
| `product_advanced_filters` | 더보기 필터용 보조 조건 | 나중에 가능 | 예 |
| `product_detail_specs` | 상세/비교용 정리 스펙 | 나중에 가능 | 예 |
| `product_raw_specs` | 원본 스펙 보관 | 아니오 또는 제한 | 예 |
| `product_shell_references` | 마우스 쉘 체감 레퍼런스 | 조건부 예 | 예 |
| `product_images` | 제품 이미지 후보와 승인 상태 | approved만 예 | 예 |
| `product_links` | 공식/가격 확인/리뷰 링크 후보 | approved만 예 | 예 |
| `switch_entries` | 스위치/축 사전 항목 | 예 | 예 |
| `guide_entries` 또는 `content_pages` | 가이드/콘텐츠 페이지 관리 | 예 | 예 |

## 3. 테이블별 설계

### products

목적: 마우스, 키보드, 이후 모니터 등 제품 단위의 공통 식별자와 공개 상태를 관리한다. 제품 설명 문구는 이 테이블에 직접 넣지 않고 `product_locales`로 분리한다.

주요 컬럼:

| 컬럼 | 타입 후보 | nullable | TS 매핑 |
| --- | --- | --- | --- |
| `id` | uuid 또는 text | no | `BaseContent.id` |
| `slug` | text | no | `BaseContent.slug` |
| `category` | text enum | no | `MouseContent.category`, `KeyboardContent.category` |
| `brand` | text | yes | `BaseContent.brand` |
| `name` | text | no | `BaseContent.name` |
| `status` | text enum | no | `BaseContent.status` |
| `locale_default` | text | no | 현재는 `kr` |
| `created_at` | timestamptz | no | DB 생성 시점 |
| `updated_at` | timestamptz | no | `updatedAt` 변환 |
| `published_at` | timestamptz | yes | `status = published` 시점 |

인덱스 후보:

- unique: `slug`
- btree: `(category, status)`
- btree: `(brand)`
- btree: `(updated_at)`

읽기 범위:

- 공개 사이트는 기본 제품 목록과 Finder 결과에서 읽는다.
- Control Tower는 제품 생성, 상태 변경, 검수 흐름에서 읽고 쓴다.

### product_locales

목적: 제품 문구를 locale별로 분리하고, AI 초안과 운영자 교정본을 같이 보관한다. 화면에서는 `editor_*`가 있으면 우선 표시하고, 없으면 `ai_*`를 fallback으로 표시한다. 이는 현재 `src/content/utils.ts`의 `getContentDisplay` 철학과 맞춘다.

주요 컬럼:

| 컬럼 | 타입 후보 | nullable | TS 매핑 |
| --- | --- | --- | --- |
| `id` | uuid | no | 신규 |
| `product_id` | uuid/text FK | no | `BaseContent.id` |
| `locale` | text enum | no | 현재 `kr`, 이후 `en`/`jp`/`cn` |
| `ai_summary` | text | yes | `aiSummaryKo` |
| `editor_summary` | text | yes | `editorSummaryKo` |
| `ai_strengths` | jsonb text[] | yes | `aiStrengthsKo` |
| `editor_strengths` | jsonb text[] | yes | `editorStrengthsKo` |
| `ai_cautions` | jsonb text[] | yes | `aiCautionsKo` |
| `editor_cautions` | jsonb text[] | yes | `editorCautionsKo` |
| `ai_community_note` | text | yes | `aiCommunityNoteKo` |
| `editor_community_note` | text | yes | `editorCommunityNoteKo` |
| `ai_buying_check` | jsonb text[] | yes | `aiBuyingCheckKo` |
| `editor_buying_check` | jsonb text[] | yes | `editorBuyingCheckKo` |
| `created_at` | timestamptz | no | 신규 |
| `updated_at` | timestamptz | no | 신규 |

인덱스 후보:

- unique: `(product_id, locale)`
- btree: `(locale)`
- 선택: 전문 검색용 `to_tsvector` 또는 trigram index는 제품 수가 늘어난 뒤 검토

읽기 범위:

- 공개 사이트는 `locale = kr`과 공개 가능한 제품 상태만 읽는다.
- Control Tower는 ai/editor 비교, 교정, 승인에 사용한다.

### product_basic_filters

목적: Finder와 기본 목록 필터가 가장 먼저 읽는 핵심 조건을 보관한다. 초보자 화면에 처음 보여줄 필터는 5개 이하로 유지한다.

마우스 필드:

- `shape`
- `weight`
- `connection`
- `size`
- `price`

키보드 필드:

- `layout`
- `connection`
- `feel`
- `noise`
- `price`

설계 선택지:

| 방식 | 장점 | 단점 | 판단 |
| --- | --- | --- | --- |
| `filters jsonb` 단일 컬럼 | category별 차이를 쉽게 수용, 초기 마이그레이션이 빠름 | Supabase 필터/인덱스가 복잡해질 수 있음 | 초기 snapshot 전환에는 적합 |
| 공통 테이블 + nullable 컬럼 | SQL 필터와 인덱스가 쉬움 | category별로 빈 컬럼이 많아짐 | 제품 수가 늘면 현실적인 후보 |
| `mouse_basic_filters`, `keyboard_basic_filters` 분리 | 타입과 제약이 가장 명확함 | 테이블 수가 늘고 공통 관리가 번거로움 | 장기적으로 Finder가 커지면 검토 |

v0.5A 추천:

- 단기 문서/리허설 단계: `product_basic_filters(product_id, category, filters jsonb)`로 시작해도 된다.
- 실제 공개 필터가 많아지는 시점: `shape`, `weight`, `connection`, `layout`, `feel` 같은 자주 조회하는 값은 컬럼화하거나 generated column/index를 검토한다.

주요 컬럼 후보:

| 컬럼 | 타입 후보 | nullable | TS 매핑 |
| --- | --- | --- | --- |
| `product_id` | uuid/text FK | no | `BaseContent.id` |
| `category` | text enum | no | `category` |
| `filters` | jsonb | no | `basicFilters` 전체 |
| `shape` | text | category별 yes | `MouseBasicFilters.shape` |
| `weight` | text | category별 yes | `MouseBasicFilters.weight` |
| `layout` | text | category별 yes | `KeyboardBasicFilters.layout` |
| `connection` | text | yes | 양쪽 공통 |
| `feel` | text | category별 yes | `KeyboardBasicFilters.feel` |
| `noise` | text | category별 yes | `KeyboardBasicFilters.noise` |
| `size` | text | category별 yes | `MouseBasicFilters.size` |
| `price` | text | yes | 양쪽 공통 |

인덱스 후보:

- unique: `product_id`
- btree: `(category)`
- btree: `(category, connection)`
- 마우스: `(shape)`, `(weight)`, `(size)`, `(price)`
- 키보드: `(layout)`, `(feel)`, `(noise)`, `(price)`
- jsonb 방식이면 GIN index 후보: `filters`

읽기 범위:

- 공개 Finder가 읽는다.
- Control Tower가 편집/검수한다.

### product_advanced_filters

목적: 더보기 필터에 쓰이는 보조 조건을 보관한다. 첫 화면 필터가 아니라 선택형 확장 영역에 해당한다.

TS 매핑:

- 마우스: `advancedFilters.gamingPerformance`, `buttonCount`, `coating`, `switchTendency`, `battery`
- 키보드: `advancedFilters.gamingFeature`, `multiDevice`, `keycap`, `housing`, `backlight`, `weightFeel`

권장 구조:

- 초기에는 `filters jsonb`를 추천한다.
- 더보기 필터는 category별 차이가 크고, 공개 화면의 핵심 조회 조건이 아니므로 컬럼화 우선순위가 낮다.

주요 컬럼:

- `product_id`
- `category`
- `filters jsonb`
- `created_at`
- `updated_at`

인덱스 후보:

- unique: `product_id`
- GIN: `filters`
- 많이 쓰이는 필터가 생기면 해당 값만 별도 컬럼화

읽기 범위:

- 단기 공개 사이트에서는 읽지 않아도 된다.
- Control Tower는 관리한다.

### product_detail_specs

목적: 제품 상세 페이지나 비교 기능이 생겼을 때 사용할 정리된 스펙을 보관한다.

TS 매핑:

- 마우스: `detailSpecs.sensorModel`, `maxDpi`, `ips`, `pollingRateHz`, `dimensionsMm`, `buttonCountDetail` 등
- 키보드: `detailSpecs.actuationForceG`, `macroSupport`, `responseTimeMs`, `bluetoothVersion`, `battery`, `enterKeyShape`, `dimensionsMm` 등

설계 선택지:

| 방식 | 장점 | 단점 |
| --- | --- | --- |
| `specs jsonb` | category별 차이를 쉽게 수용 | 비교/정렬/검색에 약함 |
| category별 상세 테이블 | 타입과 제약이 명확함 | 초기에 과설계가 될 수 있음 |
| 핵심 스펙 컬럼 + `specs jsonb` | 자주 쓰는 값만 인덱싱 가능 | 설계 기준을 계속 관리해야 함 |

v0.5A 추천:

- 초기에는 `specs jsonb`로 보관한다.
- 제품 비교 기능을 실제로 만들 때 자주 비교하는 스펙만 컬럼화한다.

인덱스 후보:

- unique: `product_id`
- GIN: `specs`
- 나중에 필요하면 `(category, sensor_model)`, `(category, polling_rate_hz)` 같은 컬럼 인덱스 검토

읽기 범위:

- 현재 공개 Finder에는 필요하지 않다.
- 향후 제품 상세/비교에서 읽을 수 있다.
- Control Tower는 검수와 원본 대비 정리에 사용한다.

### product_raw_specs

목적: 판매처, 공식 페이지, 수집 자료에서 온 원본 스펙을 보존한다. 정리된 필터/상세 스펙과 별개로 원문 흔적을 남긴다.

권장 구조:

- `raw_specs jsonb`
- `source_note`
- `source_checked_at`

정책:

- raw specs는 공개 화면에 직접 노출하지 않는 것을 기본으로 한다.
- 운영자가 검수한 뒤 필요한 값만 `product_detail_specs`나 `product_basic_filters`로 승격한다.
- jsonb 추천. 원본 스펙은 제품군별 차이가 크고 구조가 자주 흔들린다.

인덱스 후보:

- unique: `product_id`
- GIN: `raw_specs`

읽기 범위:

- Control Tower 중심.
- 공개 사이트는 읽지 않거나 제한적으로만 읽는다.

### product_shell_references

목적: 마우스의 쉘 체감 레퍼런스를 제품과 분리된 검수 단위로 관리한다.

주요 컬럼:

| 컬럼 | 타입 후보 | nullable | TS 매핑 |
| --- | --- | --- | --- |
| `id` | uuid | no | 신규 |
| `product_id` | uuid/text FK | no | 마우스 제품 id |
| `reference_model_ko` | text | yes | `referenceModelKo` |
| `reference_model_en` | text | yes | `referenceModelEn` |
| `relation_type` | text enum | no | `relationType` |
| `confidence` | text enum | no | `confidence` |
| `source_hint` | text enum | no | `sourceHint` |
| `ai_note_ko` | text | yes | `aiNoteKo` |
| `editor_note_ko` | text | yes | `editorNoteKo` |
| `caution_ko` | text | yes | `cautionKo` |
| `status` | text enum | no | 신규 검수 상태 |
| `created_at` | timestamptz | no | 신규 |
| `updated_at` | timestamptz | no | 신규 |

노출 정책:

- 공개 화면 노출 조건:
  - `editor_note_ko`가 있어야 함
  - `confidence`가 `medium` 또는 `high`
  - `source_hint`가 `unknown`이 아님
  - reference model 식별자가 있어야 함
  - `status = approved`
- Finder 점수 계산에는 사용하지 않는다.
- 쉘 레퍼런스는 추천 근거가 아니라 체감 보조 정보다.

표현 정책:

- 금지 표현: 카피쉘, 배꼈다, 짭, 표절, 원본 쉘, 동일 쉘, 완전히 같다
- 권장 표현: 유사 쉘 계열, 쉘 체감 레퍼런스, 자주 비교되는 쉘, 비교 기준, 형태 체감이 비슷하다는 반응, 참고용

인덱스 후보:

- btree: `(product_id)`
- btree: `(status, confidence)`
- btree: `(source_hint)`

읽기 범위:

- 공개 사이트는 approved 조건을 만족하는 일부만 읽는다.
- Control Tower는 pending/review/rejected까지 모두 관리한다.

### product_images

목적: 제품 이미지 후보를 저작권/출처/승인 상태와 함께 관리한다.

주요 컬럼:

| 컬럼 | 타입 후보 | nullable | TS 매핑 |
| --- | --- | --- | --- |
| `id` | uuid | no | 신규 |
| `product_id` | uuid/text FK | no | `BaseContent.id` |
| `src` | text | no | `productImages.src` |
| `alt_ko` | text | no | `productImages.altKo` |
| `source_type` | text enum | no | `sourceType` |
| `status` | text enum | no | `status` |
| `license_note` | text | yes | `noteKo` 확장 |
| `created_at` | timestamptz | no | 신규 |
| `updated_at` | timestamptz | no | 신규 |

정책:

- approved 전에는 공개 화면에 노출하지 않는다.
- 외부 이미지 hotlink는 원칙적으로 피한다.
- 초기 공개 화면은 placeholder 유지가 안전하다.
- `affiliate`나 판매처 이미지일 경우 별도 승인 기록이 필요하다.

인덱스 후보:

- btree: `(product_id, status)`
- btree: `(source_type, status)`

읽기 범위:

- 공개 사이트는 approved만 읽는다.
- Control Tower는 pending/review/rejected까지 모두 관리한다.

### product_links

목적: 공식 페이지, 가격 확인, 리뷰, 매뉴얼 링크 후보를 관리한다. 현재 목표는 가격 트래커가 아니라 수동 검수된 링크 구조다.

주요 컬럼:

| 컬럼 | 타입 후보 | nullable | TS 매핑 |
| --- | --- | --- | --- |
| `id` | uuid | no | 신규 |
| `product_id` | uuid/text FK | no | `BaseContent.id` |
| `label_ko` | text | no | `productLinks.labelKo` |
| `url` | text | no | `productLinks.url` |
| `link_type` | text enum | no | `productLinks.linkType` |
| `status` | text enum | no | `productLinks.status` |
| `last_checked_at` | timestamptz | yes | `lastCheckedAt` |
| `note_ko` | text | yes | `noteKo` |
| `created_at` | timestamptz | no | 신규 |
| `updated_at` | timestamptz | no | 신규 |

정책:

- 지금은 최저가 트래커나 자동 크롤링이 아니다.
- `price_check`는 사용자가 가격을 직접 확인하는 수동 링크 정도로 제한한다.
- `affiliate` 링크는 별도 승인 상태와 정책 문구가 필요하다.
- 자동 가격 수집, 가격 변동 기록, 알림은 후순위다.

인덱스 후보:

- btree: `(product_id, status)`
- btree: `(link_type, status)`
- btree: `(last_checked_at)`

읽기 범위:

- 공개 사이트는 approved만 읽는다.
- Control Tower는 전체 상태를 관리한다.

### switch_entries

목적: 스위치/축 사전을 제품 데이터와 분리해 관리한다.

설계 선택지:

| 방식 | 장점 | 단점 | 판단 |
| --- | --- | --- | --- |
| `switch_entries` 별도 테이블 | 사전형 콘텐츠에 맞고 문구 검수가 쉬움 | 제품과 공통 구조가 일부 중복 | 현재 추천 |
| `products.category = switch`로 통합 | 제품/콘텐츠를 하나의 CRUD로 관리 가능 | 스위치 타입 설명과 실제 판매 제품이 섞일 수 있음 | 장기 검토 |

현재 추천:

- 스위치/축 사전은 `switch_entries` 별도 테이블로 유지한다.
- 실제 개별 스위치 제품을 판매/추천 대상으로 다룰 때만 `products`와 연결하거나 통합을 검토한다.

주요 컬럼:

- `id`
- `slug`
- `name_ko`
- `name_en`
- `brand`
- `marketing_name_ko`
- `switch_type`
- `sound_level`
- `actuation_force_g`
- `bottom_out_force_g`
- `travel_mm`
- `best_for jsonb`
- `ai_beginner_summary_ko`
- `editor_beginner_summary_ko`
- `ai_buying_check_ko jsonb`
- `editor_buying_check_ko jsonb`
- `ai_caution_ko`
- `editor_caution_ko`
- `ai_naming_warning_ko`
- `editor_naming_warning_ko`
- `status`
- `created_at`
- `updated_at`

정책:

- 리니어/택타일/클릭/저소음/자석축/광축/정전용량/로우프로파일/감성 네이밍 축을 사전 항목으로 다룬다.
- 감성 네이밍 축은 마케팅명과 실제 방식이 다를 수 있음을 유지한다.
- "이 이름이면 무조건 이 방식"처럼 단정하지 않는다.

인덱스 후보:

- unique: `slug`
- btree: `(switch_type)`
- btree: `(sound_level)`
- btree: `(status)`

읽기 범위:

- 공개 스위치/축 사전에서 읽는다.
- Control Tower에서 문구 검수와 상태 관리를 한다.

### guide_entries 또는 content_pages

목적: 가이드 페이지, 테스트 안내, 공통 문구까지 Control Tower에서 관리하려면 제품 테이블과 별개 콘텐츠 테이블이 필요하다.

권장 방향:

- 제품 DB화와 별개로 `content_pages`를 두는 편이 안전하다.
- `guide_entries`는 가이드 전용으로 시작할 수 있고, 나중에 테스트 안내/공통 문구까지 포함하면 `content_pages`로 확장한다.

주요 컬럼 후보:

- `id`
- `slug`
- `locale`
- `category`
- `title_ai`
- `title_editor`
- `summary_ai`
- `summary_editor`
- `body_ai`
- `body_editor`
- `status`
- `created_at`
- `updated_at`
- `published_at`

인덱스 후보:

- unique: `(slug, locale)`
- btree: `(category, status)`
- btree: `(updated_at)`

읽기 범위:

- 공개 가이드 페이지와 목록에서 읽는다.
- Control Tower에서 문구 편집과 공개 상태를 관리한다.

## 4. 정적 TS 구조와 DB 구조 매핑 요약

| 현재 TS 구조 | DB 구조 | 비고 |
| --- | --- | --- |
| `MOUSE_DATABASE[]` | `products` + `product_locales` + filter/spec tables | `category = mouse` |
| `KEYBOARD_DATABASE[]` | `products` + `product_locales` + filter/spec tables | `category = keyboard` |
| `SWITCH_DATABASE[]` | `switch_entries` | 당장은 제품과 분리 추천 |
| `BaseContent.status` | `products.status`, `switch_entries.status` | DB에서는 `archived` 추가 검토 |
| `ai*Ko` / `editor*Ko` | `product_locales`, `switch_entries`, `content_pages` | editor 우선 표시 |
| `basicFilters` | `product_basic_filters` | Finder가 우선 읽는 구조 |
| `advancedFilters` | `product_advanced_filters` | 더보기 필터용 |
| `detailSpecs` | `product_detail_specs` | 상세/비교용 |
| `rawSpecs` | `product_raw_specs` | 원본 보관용, 공개 직접 노출 제한 |
| `shellReferences` | `product_shell_references` | 마우스 한정, 승인 후 노출 |
| `productImages` | `product_images` | approved 전 공개 금지 |
| `productLinks` | `product_links` | 가격 트래커 아님 |

## 5. Control Tower 관리 흐름 초안

1. 운영자가 Control Tower에서 제품 초안을 추가한다.
2. AI가 `ai_summary`, `ai_strengths`, `ai_cautions`, `ai_community_note`, `ai_buying_check` 초안을 생성한다.
3. yulxwell이 문구와 스펙을 검수하고 `editor_*` 필드를 작성한다.
4. 제품 상태를 `draft`에서 `review`로 올린다.
5. 필수 필드, basic filters, 카테고리, locale copy를 확인한다.
6. 공개 가능한 항목만 `published`로 전환한다.
7. 이미지, 링크, 쉘 레퍼런스는 제품 상태와 별도로 각각 pending/review/approved/rejected를 가진다.
8. 공개 사이트는 `published` 제품과 approved 부가 정보만 snapshot으로 읽는다.
9. 배포는 DB에서 JSON snapshot을 만들고 정적 빌드에 포함하는 방식을 우선 검토한다.

## 6. 정적 사이트와 DB 연결 전략

### A. Static export 유지 + 빌드 시 DB snapshot 생성

장점:

- 현재 Cloudflare Pages 정적 배포 철학과 가장 잘 맞는다.
- 런타임 장애 지점이 적다.
- 공개 사이트가 빠르고 단순하다.
- `published` 데이터만 snapshot으로 내보내면 검수 전 데이터 노출을 막기 쉽다.

단점:

- DB 수정 후 즉시 반영되지 않고 재빌드가 필요하다.
- Control Tower와 공개 사이트 사이에 snapshot/export 과정이 필요하다.

판단:

- 중기 추천안이다.

### B. Cloudflare Workers/API로 runtime fetch

장점:

- 일부 데이터만 실시간 갱신할 수 있다.
- 공개 사이트와 DB 사이의 보안/캐시 계층을 만들 수 있다.

단점:

- API 설계, 캐싱, 장애 대응이 필요하다.
- 현재 정적 사이트보다 운영 복잡도가 늘어난다.

판단:

- 제품 수와 조회 기능이 늘어난 뒤 일부 기능에 한해 검토한다.

### C. Supabase direct client fetch

장점:

- 구현이 빠를 수 있다.
- DB 변경이 비교적 빠르게 반영된다.

단점:

- 공개 클라이언트에서 읽기 정책, RLS, 캐싱, 키 관리 고민이 필요하다.
- 정적 배포의 단순성이 줄어든다.
- 초보자용 정적 가이드 사이트에는 과할 수 있다.

판단:

- 지금 단계에서는 추천하지 않는다.

### 현재 추천

- 단기: static TS 유지
- 중기: DB에서 JSON snapshot export 후 정적 빌드
- 장기: 실시간성이 필요한 일부 영역만 Cloudflare Workers/API 검토

## 7. 마이그레이션 순서

1. 현재 TS 데이터를 JSON snapshot 형태로 정리한다.
2. `products`, `product_locales`, `product_basic_filters` 설계를 확정한다.
3. Control Tower에서 제품 CRUD mock을 만든다.
4. Supabase 테이블을 생성한다.
5. 마우스/키보드/스위치 10/10/10 샘플 데이터만 마이그레이션한다.
6. 정적 사이트가 DB snapshot을 읽도록 전환한다.
7. 공개 사이트는 `published`만 노출하도록 바꾼다.
8. 이미지/링크/shellReferences 승인 플로우를 추가한다.

## 8. 지금 당장 하지 말아야 할 것

- 실제 Supabase 연결
- SQL migration 생성
- API route 작성
- 가격 트래커
- 크롤링
- 제품 비교
- 이미지 업로드
- 제품 대량 추가
- Finder 로직 수정
- 공개 UI 수정
- Control Tower 수정

## 9. 다음 검토 후보

- `src/types.ts`와 `src/content/types.ts`의 `ProductStatus` 차이 정리
  - `src/content/types.ts`: `draft | review | published`
  - `src/types.ts`: `draft | published`
  - 실제 DB화 전에는 `review`와 `archived`까지 포함하는 단일 enum으로 맞추는 것이 좋다.
- `productImages` / `productLinks`의 `rejected` 상태 추가 여부
  - 현재 TS optional 타입은 `pending | review | approved` 중심이다.
  - DB 검수 플로우에는 `rejected`가 필요할 수 있다.
- `GuideContent`, 테스트 도구 문구, 공통 site copy를 `content_pages`로 옮길지 여부
- `published`만 공개할지, 샘플 QA 단계의 `review` 노출을 언제 종료할지 여부
