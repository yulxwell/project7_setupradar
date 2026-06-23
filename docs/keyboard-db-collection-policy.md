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
