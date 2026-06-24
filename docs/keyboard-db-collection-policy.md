# Keyboard DB Collection Policy

작성일: 2026-06-23

이 문서는 `Keyboard DB Collection Batch`에서 키보드 후보를 수집할 때 적용할 기준이다. 실제 제품 TS 데이터 반영, `product_config_patch` 생성, Finder/Compare 로직 변경은 이 문서 범위가 아니다.

## 1. 기본 원칙

- 키보드 DB는 넓게 수집하되 SetupRadar 공개 UI에는 일부만 노출한다.
- 수집 파일은 `tmp/keyboard-db-collection-batch-*.json`에 보관하고, 실제 반영 전 사람이 검토한다.
- 공식 제품 페이지와 공식 스펙을 우선한다.
- 판매처별 스위치, 배열, 키캡, 하우징 옵션 차이는 구조화 필드에 억지로 넣지 않는다.
- 불확실한 값은 `확인 필요`, `null`, 빈 문자열, `rawSpecs.uncertainFields`로 남긴다.
- 이미지 파일은 저장하지 않고, 이미지 URL도 확실한 경우에만 hidden 후보로 수집한다.

## 2. 데이터 계층

### Finder 일반 기준 후보

- `layout`: 풀배열, TKL, compact 등 초보자가 이해할 수 있는 배열 요약
- `connection`: 유선, 무선, 멀티모드 요약
- `noiseLevel`: 조용한 공간 기준 여부
- `switchFeel`: 리니어, 택타일, 클릭, 저소음, 확인 필요
- `priceBand`: budget, mid, premium, any 후보

### Finder 상세 기준 후보

- `hotSwap`
- `rapidTrigger`
- `magneticSwitch`
- `macIpadSupport`
- `koreanLegends`
- `portability`
- `lowProfile`
- `capacitive`
- `keycapHousing`
- `domesticAvailability`

상세 기준은 제품을 강하게 탈락시키는 값이 아니라 후보 이해를 돕는 참고값으로 유지한다.

### 제품 상세/Compare 후보

- `layout`
- `switchName`
- `switchOptions`
- `connectionDetail`
- `hotSwap`
- `rapidTrigger`
- `magneticSwitch`
- `viaQmk`
- `keycapMaterial`
- `housingMaterial`
- `battery`
- `weight`
- `softwareName`
- `pollingRateHz`
- `dimensions`

Compare에서 쓸 수 있는 값이라도 공식 스펙 확인이 부족하면 `확인 필요`로 둔다.

### rawSpecs

`rawSpecs.note`와 보조 메모에는 아래 정보를 남긴다.

- 판매처별 스위치 옵션 차이
- 국내/해외 배열 차이
- 키캡/하우징 옵션 차이
- 펌웨어/소프트웨어 확인 필요
- 리비전 또는 세대 차이
- 공식 URL을 찾지 못한 이유
- 국내 한글 각인, AS, 유통 모델 확인 필요

## 3. 중복 판정

- 기존 `src/content/kr/products/keyboards.ts`에 같은 `brand + name`, 같은 `slug`, 같은 세대가 있으면 `duplicateExisting: true`로 표시한다.
- 이름이 비슷해도 세대가 다르면 `duplicateExisting: false`로 둘 수 있지만, `rawSpecs.note`에 기존 제품과 구분 필요를 남긴다.
- 기존 제품과 역할이 가까우면 신규 추가가 아니라 보강 후보로 분리한다.

## 4. shouldAddToDB 기준

- `yes`: 공식 이름과 핵심 스펙이 비교적 명확하고 Finder/Compare 기여도가 높다.
- `hold`: 제품 가치는 있지만 세대, 옵션, 공식 URL, 국내 유통 정보 확인이 더 필요하다.
- `no`: 중복, 공식 스펙 부족, 운영 리스크가 커 이번 batch에서 제외한다.

`yes`라도 바로 TS 데이터에 추가하지 않는다. 다음 단계에서 `product_config_patch`를 만들고 validator를 통과한 뒤 수동 반영한다.

## 5. 이미지 정책

- 이미지 파일은 저장하지 않는다.
- `imageMeta.hidden`은 항상 `true`로 둔다.
- `thumbnailUrlCandidate`는 공식 이미지 URL이 확실할 때만 넣는다.
- 리뷰, 커뮤니티, 블로그 이미지는 저장하지 않는다.
- 공개 UI에서 이미지 노출 여부는 별도 정책이 생기기 전까지 변경하지 않는다.

## 6. 검수 기준

수집 JSON은 최소 아래를 통과해야 한다.

- JSON parse 가능
- 정확한 제품 수
- placeholder URL 없음
- JSON 주석 없음
- `imageMeta.hidden` true 유지
- 제품 TS 데이터 미수정
- Finder/Compare UI/로직 미수정

## 7. 다음 단계

Keyboard DB Collection Batch 1 이후에는 `shouldAddToDB: "yes"` 후보 중 3~5개만 골라 `product_config_patch` 후보로 만든다.

1차 추천 후보는 아래 순서로 검토한다.

1. NuPhy Air75 V2
2. SteelSeries Apex Pro TKL
3. Logitech MX Keys S
4. Keychron K3 Max

HHKB Professional HYBRID Type-S, Keychron K2 Max, Logitech MX Mechanical, Lofree Flow, Leopold FC750R, MonsGeek M1W는 추가 공식 스펙과 지역 옵션 확인 후 후속 batch 후보로 둔다.

## 8. Product Patch Candidate 1 기록

2026-06-24 기준 `tmp/keyboard-db-collection-batch-1.json`의 `shouldAddToDB: "yes"` 후보 4개를 `tmp/product-patch-keyboard-collection-batch-1.json`으로 변환했다.

- 포함: NuPhy Air75 V2, SteelSeries Apex Pro TKL, Logitech MX Keys S, Keychron K3 Max
- 제외: HHKB Professional HYBRID Type-S와 나머지 `hold` 후보
- HHKB는 무접점 방식, 특수 배열, 지역별 각인과 모델 차이를 별도 검토하기 위해 `hold`를 유지한다.
- 기존 키보드 타입과 validator가 허용하는 `basicFilters` canonical 값만 사용했다.
- collection 전용 상세 필드는 무리하게 옮기지 않고, 구매 전 확인이 필요한 세대·배열·스위치·키캡·수신기 차이는 `rawSpecs.note`와 `uncertainFields`에 남겼다.
- 이미지, 제품 링크, 최상위 `sources`, 제품 TS 반영, snapshot export는 포함하지 않았다.
- validator 결과는 신규 후보 3개, 기존 중복 후보 1개, warnings 0개, errors 0개다.
- 기존 중복 후보 1개는 `Logitech MX Keys S`가 기존 `Logitech MX Keys`와 `brand + name 유사`로 분류된 결과다. id, slug, 정확한 제품명은 겹치지 않아 별도 모델 후보로 수동 검토한다.

## 9. Product Patch Candidate 1 Manual Apply 결과

2026-06-24 기준 patch 후보 4개를 키보드 제품 TS 데이터에 수동 반영했다.

- 반영 제품: NuPhy Air75 V2, SteelSeries Apex Pro TKL, Logitech MX Keys S, Keychron K3 Max
- 상태: 4개 모두 `review`
- 제품 수: 12개에서 16개
- 정확한 id/slug/제품명 중복: 0개
- HHKB Professional HYBRID Type-S: 무접점·특수 배열·지역 모델 차이 검토를 위해 `hold` 유지
- snapshot: 키보드 16개, product images 0개, product links 0개
- validator 재실행: 신규 0개, 중복 4개, warnings 0개, errors 0개

`MX Keys S`는 별도 id와 slug로 반영됐지만 validator의 이름 포함 비교가 기존 `MX Keys`를 먼저 찾는다. 이는 validator 출력의 제품군 유사 판정이며 실제 데이터의 정확 중복은 아니다.

K3 Max의 핫스왑은 구매 옵션에 따라 달라질 수 있으나 현재 제품 타입은 boolean만 허용한다. 공개 필드에서는 보수적으로 두고 옵션 차이는 `rawSpecs.note`와 `uncertainFields`에 유지한다.
