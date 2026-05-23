# SetupRadar Content Snapshot Structure Plan (v0.6A)

이 문서는 Project7 SetupRadar의 현재 `src/content` 기반 TypeScript 데이터를 나중에 JSON snapshot으로 export할 때 사용할 구조 초안이다.

이번 v0.6A 범위는 설계 문서화다. 실제 export script, Supabase 연결, API route, DB migration, import 경로 변경은 하지 않는다.

## 0. Snapshot 전략의 목적

SetupRadar는 현재 `/kr` 기준 정적 사이트이며 Cloudflare Pages 정적 배포를 전제로 한다. 제품, 테스트 도구, 가이드, Finder 옵션, 사이트 문구는 모두 `src/content` 아래 TypeScript 파일에서 관리한다.

JSON snapshot은 바로 DB로 넘어가기 전의 중간 규격이다.

- 현재 static TS 데이터를 DB/CMS로 옮기기 전 구조를 고정한다.
- Project99 Control Tower export와 Project7 build가 공유할 표준 파일 모양을 만든다.
- Supabase를 바로 붙이지 않고도 데이터 구조, 검수 규칙, 배포 흐름을 검증할 수 있다.
- 런타임 DB fetch 없이 Cloudflare Pages 정적 배포와 무료 운영 구조를 유지할 수 있다.
- 나중에 DB가 생겨도 공개 사이트는 DB에서 직접 읽지 않고, `published` snapshot만 빌드에 사용할 수 있다.

## 1. 현재 정적 데이터 구조 요약

현재 주요 source는 아래 파일이다.

| 영역 | 현재 TS source | 역할 |
| --- | --- | --- |
| 사이트 공통 문구 | `src/content/kr/siteCopy.ts` | 첫 화면, CTA, Finder 소개 문구 |
| 테스트 도구 | `src/content/kr/tools.ts` | `/kr/tests` 카드와 상세 링크 |
| 가이드 | `src/content/kr/guides.ts` | `/kr/guides` 카테고리/카드 |
| 마우스 제품 | `src/content/kr/products/mice.ts` | Mouse Finder 후보 데이터 |
| 키보드 제품 | `src/content/kr/products/keyboards.ts` | Keyboard Finder 후보 데이터 |
| 스위치/축 | `src/content/kr/switches.ts` | `/kr/switches` 사전 데이터 |
| Mouse Finder 옵션 | `src/content/kr/finder/mouseFinderOptions.ts` | Mouse Finder 질문/선택지 |
| Keyboard Finder 옵션 | `src/content/kr/finder/keyboardFinderOptions.ts` | Keyboard Finder 질문/선택지 |

제품 데이터는 아래 구조를 중심으로 확장 중이다.

- `basicFilters`: Finder와 기본 필터가 우선 읽는 핵심 조건
- `advancedFilters`: 더보기 필터 후보
- `detailSpecs`: 상세/비교용으로 정리된 확실한 스펙
- `rawSpecs`: 판매처/공식 페이지에서 온 원본성 스펙 메모
- `shellReferences`: 마우스 쉘 체감 레퍼런스
- `productImages`: 향후 이미지 후보, 현재 화면 미표시
- `productLinks`: 향후 공식/가격 확인/리뷰 링크 후보, 현재 화면 미표시
- `status`: `draft` / `review` / `published`

## 2. 권장 snapshot 디렉토리 구조

### A안: 영역별 분할 snapshot

```txt
snapshots/
└─ kr/
   ├─ site-copy.json
   ├─ tools.json
   ├─ guides.json
   ├─ products/
   │  ├─ mice.json
   │  └─ keyboards.json
   ├─ switches.json
   └─ finder/
      ├─ mouse-options.json
      └─ keyboard-options.json
```

장점:

- 변경 범위가 작고 git diff가 읽기 쉽다.
- Control Tower에서 문구/필터/제품 작업대를 나눠 export하기 좋다.
- 제품만 교체하거나 Finder 옵션만 검수하는 흐름이 단순하다.
- 한 파일이 너무 커지지 않는다.

단점:

- build 단계에서 여러 파일을 조합해야 한다.
- snapshot 간 `schemaVersion`이 어긋나지 않도록 관리가 필요하다.

### B안: 큰 번들 snapshot

```txt
snapshots/
└─ kr/
   ├─ content.snapshot.json
   ├─ products.snapshot.json
   └─ finder.snapshot.json
```

장점:

- import 수가 줄고 build 연결이 단순하다.
- 배포 시점 전체 content bundle을 한 번에 고정하기 쉽다.
- DB export 결과물을 그대로 떨어뜨리기 좋다.

단점:

- 파일 diff가 커진다.
- 작은 문구 수정도 큰 파일 변경으로 보일 수 있다.
- Control Tower의 부분 작업대와 연결할 때 patch 범위 계산이 필요하다.

### 추천안

단기에는 A안, 즉 영역별 분할 snapshot을 추천한다. 현재 Project7은 문구, 제품, Finder 옵션, 테스트 도구가 서로 다른 운영 속도를 갖고 있다. 분할 snapshot은 yulxwell이 문구만 수정하거나, 제품만 검수하거나, Finder 옵션만 바꾸는 흐름에 잘 맞는다.

중기에는 빌드 편의를 위해 분할 snapshot을 읽어 내부에서 하나의 normalized bundle로 조립할 수 있다. 장기 DB 단계에서는 DB에서 A안 형태로 export하거나, 배포용으로 B안 bundle을 추가 생성할 수 있다.

## 3. 공통 snapshot 메타데이터

모든 snapshot 파일은 최상단에 `metadata`를 둔다.

```json
{
  "metadata": {
    "projectId": "project7_setupradar",
    "locale": "kr",
    "schemaVersion": "0.1.0",
    "generatedAt": "2026-05-23T00:00:00.000Z",
    "source": "static_ts",
    "status": "review",
    "contentHash": "sha256-or-checksum-candidate",
    "notes": "Generated from src/content TypeScript files."
  },
  "items": []
}
```

필드 의미:

| 필드 | 의미 |
| --- | --- |
| `projectId` | 항상 `project7_setupradar` |
| `locale` | 현재 `kr`, 이후 `en`/`jp`/`cn` 확장 |
| `schemaVersion` | snapshot 구조 버전 |
| `generatedAt` | 생성 시각 |
| `source` | `static_ts` / `control_tower` / `db_export` |
| `status` | snapshot 전체 상태: `draft` / `review` / `published` |
| `contentHash` | 파일 무결성 또는 변경 감지용 checksum 후보 |
| `notes` | 생성 조건, 수동 검수 메모 |

## 4. 제품 snapshot 구조

제품 snapshot은 마우스/키보드 공통 필드와 category별 필드를 함께 가진다. 공개 화면에서는 `editor*`가 있으면 editor를 우선 사용하고, 없으면 `ai*`를 fallback한다.

```json
{
  "metadata": {
    "projectId": "project7_setupradar",
    "locale": "kr",
    "schemaVersion": "0.1.0",
    "generatedAt": "2026-05-23T00:00:00.000Z",
    "source": "static_ts",
    "status": "review"
  },
  "items": [
    {
      "id": "g-pro-x-superlight-2",
      "slug": "g-pro-x-superlight-2",
      "category": "mouse",
      "brand": "Logitech",
      "name": "G Pro X Superlight 2",
      "status": "published",
      "updatedAt": "2024-05-14",
      "basicFilters": {
        "shape": "symmetrical",
        "weight": "light",
        "connection": "wireless",
        "size": "medium",
        "price": "mid"
      },
      "advancedFilters": {},
      "detailSpecs": {},
      "rawSpecs": {},
      "productImages": [],
      "productLinks": [],
      "shellReferences": [],
      "copy": {
        "aiSummaryKo": "",
        "editorSummaryKo": "",
        "aiStrengthsKo": [],
        "editorStrengthsKo": [],
        "aiCautionsKo": [],
        "editorCautionsKo": [],
        "aiCommunityNoteKo": "",
        "editorCommunityNoteKo": "",
        "aiBuyingCheckKo": [],
        "editorBuyingCheckKo": []
      }
    }
  ]
}
```

### 공통 필수 필드

- `id`
- `slug`
- `category`
- `brand`
- `name`
- `status`
- `updatedAt`
- `basicFilters`
- `advancedFilters`
- `detailSpecs`
- `rawSpecs`
- `productImages`
- `productLinks`
- `copy`

### category별 차이

마우스:

- legacy 호환 필드: `shapeType`, `dimensions`, `weight`, `sensor`, `recommendedGrips`, `handSizeRange`, `priceRange`, `features`
- `basicFilters.shape`, `weight`, `connection`, `size`, `price`
- `shellReferences`

키보드:

- legacy 호환 필드: `layout`, `switchType`, `isHotSwap`, `material`, `priceRange`, `features`
- `basicFilters.layout`, `connection`, `feel`, `noise`, `price`

### 공개 노출 원칙

- `status`는 내부 관리용이며 사용자 화면에는 노출하지 않는다.
- 공개 화면 copy는 `editor*` 우선, 없으면 `ai*` fallback으로 표시한다.
- `productImages`는 `status: "approved"` 항목만 공개 후보로 본다.
- `productLinks`는 `status: "approved"` 항목만 공개 후보로 본다.
- `shellReferences`는 `editorNoteKo`가 있고, `confidence`가 `medium` 또는 `high`이며, `sourceHint`가 `unknown`이 아닌 항목만 공개 후보로 본다.
- `rawSpecs`는 전체 dump를 공개 화면에 그대로 표시하지 않는다.

## 5. 스위치/축 snapshot 구조

스위치/축은 제품이라기보다 사전형 content에 가깝다. 다만 검수와 다국어 확장을 고려해 제품 snapshot과 비슷하게 copy를 분리한다.

```json
{
  "metadata": {
    "projectId": "project7_setupradar",
    "locale": "kr",
    "schemaVersion": "0.1.0",
    "source": "static_ts",
    "status": "review"
  },
  "items": [
    {
      "id": "standard-linear",
      "slug": "standard-linear",
      "category": "switch",
      "brand": "Generic",
      "name": "일반 리니어축",
      "switchType": "linear",
      "soundLevel": "normal",
      "actuationForceG": 45,
      "bottomOutForceG": 60,
      "travelMm": 4,
      "bestFor": ["beginner", "gaming", "office"],
      "status": "published",
      "updatedAt": "2024-05-13",
      "copy": {
        "aiBeginnerSummaryKo": "",
        "editorBeginnerSummaryKo": "",
        "aiBuyingCheckKo": [],
        "editorBuyingCheckKo": [],
        "aiCautionKo": "",
        "editorCautionKo": "",
        "aiNamingWarningKo": "",
        "editorNamingWarningKo": ""
      }
    }
  ]
}
```

감성 네이밍 축은 마케팅명과 실제 방식이 다를 수 있으므로 snapshot 검증에서 단정 표현을 별도로 검색한다.

## 6. 문구 snapshot 구조

문구 snapshot은 Control Tower 문구 작업대와 직접 연결될 수 있어야 한다. 실제 사이트에 보이는 문구가 어느 파일/필드에 대응하는지 추적 가능해야 한다.

대상:

- `siteCopy`
- `tools`
- `guides`
- Finder 옵션 label/helper/description
- footer/header 등 공통 문구가 content로 옮겨질 경우 해당 문구

권장 구조:

```json
{
  "metadata": {
    "projectId": "project7_setupradar",
    "locale": "kr",
    "schemaVersion": "0.1.0",
    "source": "control_tower",
    "status": "review"
  },
  "items": [
    {
      "id": "main-hero-title",
      "section": "main",
      "label": "메인 첫 화면 큰 제목",
      "sourcePath": "src/content/kr/siteCopy.ts",
      "fieldPath": "SITE_COPY.kr.landing.heroTitle",
      "currentValue": "장비 상태를 설치없이 바로 확인해보세요.",
      "editorValue": "",
      "memo": "",
      "locale": "kr",
      "updatedAt": "2026-05-23"
    }
  ]
}
```

필수 고려 필드:

- `id`
- `section`
- `label`
- `sourcePath` 또는 `filePath`
- `fieldPath`
- `currentValue`
- `editorValue`
- `memo`
- `locale`
- `updatedAt`

원칙:

- `currentValue`는 snapshot 생성 시점의 실제 문구다.
- `editorValue`는 운영자가 바꾼 문구다.
- 실제 Project7 반영 시에는 `editorValue`를 TS content의 `editor*` 필드 또는 해당 문구 필드에 수동/자동 반영한다.
- 실시간 DB write가 아니라 export 후 build 반영 흐름을 유지한다.

## 7. 필터 snapshot 구조

필터 snapshot은 Control Tower 필터 작업대와 연결될 수 있어야 한다.

```json
{
  "metadata": {
    "projectId": "project7_setupradar",
    "locale": "kr",
    "schemaVersion": "0.1.0",
    "source": "control_tower",
    "status": "review"
  },
  "filters": [
    {
      "productType": "mouse",
      "filterGroup": "basic",
      "key": "shape",
      "labelKo": "형태",
      "descriptionKo": "손에 닿는 형태와 지지감을 고르는 기본 기준입니다.",
      "enabled": true,
      "options": [
        {
          "value": "symmetrical",
          "labelKo": "대칭형",
          "descriptionKo": "좌우 균형이 비슷한 형태입니다.",
          "enabled": true
        },
        {
          "value": "right_ergonomic",
          "labelKo": "오른손용 비대칭형",
          "descriptionKo": "오른손 손바닥 지지감을 더 기대할 수 있는 형태입니다.",
          "enabled": true
        }
      ]
    }
  ]
}
```

필수 고려 필드:

- `productType`: `mouse` / `keyboard`
- `filterGroup`: `basic` / `advanced` / `detail`
- `key`
- `labelKo`
- `descriptionKo`
- `enabled`
- `options.value`
- `options.labelKo`
- `options.descriptionKo`
- `options.enabled`

운영 원칙:

- `basic` 필터는 사용자 첫 화면 기준 5개 이하를 유지한다.
- `advanced` 필터는 더보기/선택형으로 둔다.
- `detail` 필터와 raw spec은 화면 기본 필터가 아니라 상세/비교/운영자 확인용이다.

## 8. 빌드 연결 전략

### A. TS 직접 유지

현재 방식이다.

장점:

- 가장 단순하다.
- 타입 안정성이 좋다.
- 빌드 흐름이 이미 검증되어 있다.

단점:

- 비개발자가 직접 수정하기 어렵다.
- Control Tower export를 다시 TS에 반영해야 한다.
- 데이터가 늘어나면 파일 관리가 무거워진다.

### B. JSON snapshot을 source of truth로 사용

Project7이 snapshot JSON을 import해서 정적 빌드한다.

장점:

- Control Tower가 snapshot을 생성/수정하기 쉽다.
- 정적 배포를 유지하면서도 데이터 파일을 코드와 분리할 수 있다.
- 문구/필터/제품 데이터를 같은 규격으로 검증할 수 있다.

단점:

- TS 타입 검증을 별도 schema 검증으로 보완해야 한다.
- import 경로 전환과 build read layer가 필요하다.
- snapshot이 깨지면 빌드 실패 또는 런타임 표시 오류가 생길 수 있다.

### C. DB에서 snapshot export 후 빌드

Supabase 같은 DB에서 `published` snapshot을 export하고 Project7 빌드가 그 snapshot을 읽는다.

장점:

- Control Tower에서 제품/문구/이미지/링크 검수 흐름을 관리하기 좋다.
- 공개 사이트는 runtime DB fetch 없이 정적 배포를 유지할 수 있다.
- DB 장애가 공개 사이트 런타임에 직접 영향을 주지 않는다.

단점:

- DB schema, 권한, export job, snapshot 검증 파이프라인이 필요하다.
- 초기 구현 비용이 크다.
- preview/review/published 상태 관리가 더 중요해진다.

### 추천

- 단기: TS 유지 + snapshot 규격 문서화
- 중기: TS에서 JSON snapshot을 병행 생성하고 검증
- 장기: DB에서 `published` snapshot export 후 정적 빌드

지금은 A를 유지하고, B/C를 위한 문서 기준만 만든다.

## 9. 마이그레이션 단계

추천 순서:

1. snapshot schema 문서 확정
2. TS -> JSON export script 설계
3. 10/10/10 샘플 데이터 snapshot 생성
4. Project7 build가 snapshot을 읽을 수 있는지 실험
5. Control Tower에서 snapshot patch export
6. DB 테이블 생성
7. DB -> snapshot export
8. Project7은 `published` snapshot만 빌드에 사용

각 단계는 별도 작업으로 나누며, 한 번에 DB 연결까지 진행하지 않는다.

## 10. 검증 규칙

snapshot 생성 시 아래 규칙을 체크한다.

- `id` 중복 없음
- `slug` 중복 없음
- `status` 값이 허용 범위 안에 있음
- 제품 `basicFilters` 필수값 존재
- `editor*`와 `ai*` 필드 타입 일치
- `productImages`는 `approved` 전 공개 후보에서 제외
- `productLinks`는 `approved` 전 공개 후보에서 제외
- `shellReferences` 공개 후보 조건 확인
- 금지 표현 검색
- `locale` 누락 확인
- `sourcePath`와 `fieldPath`가 실제 source와 연결되는지 확인
- JSON parse 가능 여부 확인
- snapshot `schemaVersion` 호환 확인

금지 표현 후보:

- 최고
- 완벽
- 무조건
- 확정
- 정밀 진단
- 카피쉘
- 짭
- 표절
- 원본 쉘
- 동일 쉘
- 완전히 같다

## 11. 지금 당장 하지 말아야 할 것

- export script 구현
- Project7 import 경로 변경
- Supabase 연결
- API 추가
- DB migration 추가
- 제품 대량 추가
- 이미지/링크 표시
- 가격 트래커
- 제품 비교 기능
- Control Tower 수정
- Finder 로직 변경
- 공개 사이트 UI 변경

## 12. 다음 작업 후보

- v0.6B: TS -> JSON snapshot export script 설계 문서 또는 prototype 범위 확정
- v0.6C: snapshot schema validator 설계
- v0.6D: Control Tower snapshot patch export format 정리
- v0.7A: 10/10/10 샘플 데이터 snapshot 생성 리허설
