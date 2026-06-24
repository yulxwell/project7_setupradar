# Keyboard Product Candidate Scoring 1

작성일: 2026-06-13

## 1. 목적

Keyboard DB Collection Batch 1 또는 Keyboard Product Patch Batch 1 전에 후보 제품을 점수화한다.

- 감으로 제품을 추가하지 않고 Finder/Compare 기여도를 기준으로 고른다.
- 실제 키보드 제품 데이터에는 추가하지 않는다.
- `product_config_patch`도 생성하지 않는다.
- 기준은 `docs/product-spec-storage-display-policy.md`와 `docs/weekly-product-candidate-plan.md`를 따른다.

이번 점수는 제품 우열이 아니라 Project7에 먼저 넣기 쉬운 순서를 정하기 위한 운영 기준이다. 실제 patch 생성 전에는 공식 제품 페이지, 공식 스펙, 국내 판매처 옵션 차이를 다시 확인해야 한다.

## 2. 현재 키보드 DB 중복 확인 요약

현재 `src/content/kr/products/keyboards.ts` 기준 키보드 제품 수는 12개다.

### 후보군 중 이미 DB에 있는 제품

아래 제품은 신규 추가 후보가 아니라 기존 데이터 보강 또는 고정 비교 콘텐츠 후보로 본다.

| 후보 | 현재 DB 판정 | 메모 |
| --- | --- | --- |
| AULA F75 | 기존 DB 있음 | `aula-f75`로 존재. 스위치/배터리/옵션 보강 후보 |
| NuPhy Halo75 V2 | 기존 DB 있음 | `nuphy-halo75-v2`로 존재. 옵션/배터리/각인 보강 후보 |
| Keychron V1 Max | 기존 DB 있음 | `keychron-v1-max`로 존재. QMK/VIA, 구성 옵션 보강 후보 |
| Wooting 60HE | 기존 DB 있음 | `wooting-60he`로 존재. 자석축/래피드 트리거 비교 후보 |
| DrunkDeer A75 | 기존 DB 있음 | `drunkdeer-a75`로 존재. 자석축/75% 비교 후보 |
| Razer Huntsman V3 Pro TKL | 기존 DB 있음 | `razer-huntsman-v3-pro-tkl`로 존재. 고급 TKL 게이밍 비교 후보 |
| Realforce R3 | 기존 DB 있음 | `realforce-r3`로 존재. 무접점/프리미엄 보강 후보 |
| Rainy75 | 기존 DB 있음 | `rainy75`로 존재. 75% 알루미늄 비교 후보 |

### 신규 후보로 볼 수 있는 제품

아래 제품은 현재 DB에 같은 모델명으로 존재하지 않는 후보로 본다.

- Keychron K2 Max
- Keychron K3 Max
- Keychron Q1 Max
- Wooting 80HE
- DrunkDeer G75
- SteelSeries Apex Pro TKL
- Logitech MX Keys S
- Logitech MX Mechanical
- NuPhy Air75 V2
- Lofree Flow
- HHKB Professional HYBRID Type-S
- Leopold FC750R
- MonsGeek M1W
- Akko 5075B Plus
- Bridge75

### 보강 후보로 볼 제품

- `AULA F75`, `NuPhy Halo75 V2`, `Keychron V1 Max`: Keyboard Compare Picker 기본값과 75% 무선 축 보강 후보
- `Wooting 60HE`, `DrunkDeer A75`, `Razer Huntsman V3 Pro TKL`: 래피드 트리거/게이밍 축 비교 문구 보강 후보
- `Realforce R3`: 무접점/저소음/프리미엄 축 보강 후보
- `Rainy75`, `Keychron Q1`: 알루미늄/커스텀 입문 고정 비교 후보

## 3. 후보별 점수표

점수 항목은 0~5점이다.

| 제품명 | 제품군 | Finder | Compare | 구매 접근성 | 공식 스펙 | 초보자 설명 | 차별성 | 균형성 | 입력 난이도 | 콘텐츠/제휴 | 운영 리스크 | 총점 | 판정 | 메모 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| Keychron K2 Max | 75% 무선 / Mac 겸용 | 4 | 4 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | 4 | 42 | 우선 후보 | Keychron V1 Max와 달리 K 계열 무선/Mac 친화 축을 보강할 수 있음 |
| Keychron K3 Max | 로우프로파일 / Mac 겸용 | 4 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 43 | 우선 후보 | 로우프로파일 축이 현재 DB에 부족해 Finder/Compare 다양화에 좋음 |
| Keychron Q1 Max | 알루미늄/커스텀 입문 | 3 | 5 | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 40 | 우선 후보 | 기존 Q1과 계열은 겹치지만 무선 Max 후보로 별도 비교 가치가 있음 |
| Wooting 80HE | 래피드 트리거 / 80% | 4 | 5 | 3 | 5 | 4 | 4 | 4 | 3 | 5 | 3 | 40 | 우선 후보 | 기존 60HE와 배열 차이가 있어 게이밍 비교 확장 가치가 큼 |
| DrunkDeer G75 | 래피드 트리거 / 75% | 4 | 4 | 3 | 4 | 4 | 3 | 3 | 4 | 4 | 4 | 37 | 보류 후보 | 기존 A75와 역할이 가까워 Batch 1에서는 후순위 |
| SteelSeries Apex Pro TKL | TKL 게이밍 / 자석축 계열 | 4 | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 5 | 4 | 42 | 우선 후보 | Razer/Wooting/DrunkDeer와 게이밍 비교 축을 만들기 좋음 |
| Logitech MX Keys S | 풀배열/사무/저소음 | 5 | 4 | 5 | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 48 | 우선 후보 | 기존 MX Keys와 세대가 달라 보강/신규 판정 확인 필요. 사무/저소음 축에 좋음 |
| Logitech MX Mechanical | 사무/기계식/무선 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 5 | 5 | 47 | 우선 후보 | MX Keys와 다른 기계식 사무 축을 확보할 수 있음 |
| NuPhy Air75 V2 | 로우프로파일 / 휴대 / Mac 겸용 | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 46 | 우선 후보 | Halo75 V2와 다른 로우프로파일/휴대 축이라 Batch 1 가치가 높음 |
| Lofree Flow | 로우프로파일 / 조용한 타건 후보 | 4 | 4 | 3 | 4 | 4 | 5 | 4 | 3 | 4 | 3 | 38 | 우선 후보 | 감성/휴대/로우프로파일 축을 만들 수 있으나 판매 옵션 확인 필요 |
| HHKB Professional HYBRID Type-S | 무접점 / 프리미엄 / 컴팩트 | 4 | 5 | 4 | 5 | 4 | 5 | 4 | 4 | 4 | 4 | 43 | 우선 후보 | Realforce R3와 다른 무접점/컴팩트 프리미엄 축으로 비교 가치가 큼 |
| Leopold FC750R | TKL / 저소음·사무 후보 | 4 | 4 | 4 | 4 | 5 | 4 | 4 | 3 | 3 | 4 | 39 | 우선 후보 | TKL 사무/타이핑 축 보강. 스위치 옵션 파편화는 확인 필요 |
| MonsGeek M1W | 알루미늄/커스텀 입문/무선 | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 3 | 39 | 우선 후보 | Rainy75/Keychron Q 계열과 비교 가치가 있음. 옵션 차이 확인 필요 |
| Akko 5075B Plus | 보급형 75% 무선 | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 3 | 3 | 3 | 35 | 보류 후보 | 75% 보급형 축에는 좋지만 AULA F75와 역할이 겹칠 수 있음 |
| Bridge75 | 75% 알루미늄/커스텀 입문 | 4 | 4 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 3 | 33 | 보류 후보 | 정보와 유통 옵션 확인이 더 필요함 |

## 4. 제품군 분류

| 제품군 | 후보 |
| --- | --- |
| 75% 무선 | Keychron K2 Max, Keychron Q1 Max, Akko 5075B Plus, Bridge75 |
| TKL 게이밍 | SteelSeries Apex Pro TKL, Leopold FC750R |
| 풀배열/사무용 | Logitech MX Keys S, Logitech MX Mechanical |
| 저소음 | Logitech MX Keys S, HHKB Professional HYBRID Type-S, Leopold FC750R |
| 래피드 트리거/자석축 | Wooting 80HE, DrunkDeer G75, SteelSeries Apex Pro TKL |
| Mac/iPad 겸용 | Keychron K2 Max, Keychron K3 Max, NuPhy Air75 V2, Logitech MX Keys S |
| 로우프로파일 | Keychron K3 Max, NuPhy Air75 V2, Lofree Flow |
| 무접점 | HHKB Professional HYBRID Type-S |
| 보급형 기계식 | Akko 5075B Plus |
| 알루미늄/커스텀 입문 | Keychron Q1 Max, MonsGeek M1W, Bridge75 |

## 5. Batch 1 추천 3~5개

Keyboard Product Patch Batch 1을 바로 진행한다면 아래 5개를 우선 추천한다.

### 1. NuPhy Air75 V2

- 추천 이유: 현재 DB의 NuPhy Halo75 V2와 다른 로우프로파일/휴대/Mac 겸용 축을 만든다.
- Finder 기여: 로우프로파일, 무선, 휴대성, Mac/iPad 사용 조건에 기여한다.
- Compare 기여: Halo75 V2, Keychron K3 Max, Logitech MX Keys S와 비교할 수 있다.
- 입력 주의: 스위치 옵션, 키캡 프로파일, 무선 구성, 한글 각인 여부는 판매처 기준 확인 필요.

### 2. SteelSeries Apex Pro TKL

- 추천 이유: 기존 Razer Huntsman V3 Pro TKL, Wooting 60HE, DrunkDeer A75와 게이밍/래피드 트리거 비교 축을 넓힌다.
- Finder 기여: TKL, 유선 또는 게이밍 기능, 빠른 입력 성향에 기여한다.
- Compare 기여: Razer/Wooting/DrunkDeer와 자석축/광축/소프트웨어 설정 차이를 설명하기 좋다.
- 입력 주의: 세대와 모델명, 래피드 트리거 관련 기능명, 배열 차이를 공식 스펙 기준으로 확인해야 한다.

### 3. Logitech MX Keys S

- 추천 이유: 풀배열/사무/저소음/Mac 겸용 후보를 강화한다.
- Finder 기여: 풀배열, 무선, 조용한 공간, 여러 기기 전환 조건에 기여한다.
- Compare 기여: 기존 MX Keys와 세대 차이, MX Mechanical과 팬터그래프/기계식 차이를 비교할 수 있다.
- 입력 주의: 기존 `Logitech MX Keys`와 중복 또는 세대 보강 후보인지 먼저 판정해야 한다.

### 4. Keychron K3 Max

- 추천 이유: 로우프로파일, 무선, Mac 친화, 휴대성을 한 번에 보강한다.
- Finder 기여: 컴팩트/무선/휴대/Mac 조건에 기여한다.
- Compare 기여: NuPhy Air75 V2, Lofree Flow, Logitech MX Keys S와 비교 가치가 있다.
- 입력 주의: 스위치 옵션과 키캡/하우징 구성이 판매처마다 달라질 수 있어 `rawSpecs.note`에 남긴다.

### 5. HHKB Professional HYBRID Type-S

- 추천 이유: 무접점/컴팩트/프리미엄 축을 Realforce R3와 다르게 보강한다.
- Finder 기여: 조용한 공간, 컴팩트, 프리미엄, 무접점 후보에 기여한다.
- Compare 기여: Realforce R3와 무접점 계열 차이, 일반 기계식과 타건 방식 차이를 설명하기 좋다.
- 입력 주의: 배열 적응, 키 수, 연결 옵션, 각인/무각인 옵션을 확정하지 말고 확인 필요 톤으로 남긴다.

3개만 먼저 patch로 간다면 `NuPhy Air75 V2`, `SteelSeries Apex Pro TKL`, `Logitech MX Keys S` 조합을 추천한다. 5개 수집 batch로 간다면 `Keychron K3 Max`, `HHKB Professional HYBRID Type-S`를 함께 조사한다.

## 6. 보류 후보

| 제품 | 보류 사유 | 다음 Batch 후보 여부 |
| --- | --- | --- |
| Keychron K2 Max | 좋은 후보지만 Keychron 후보가 많아 Batch 1에서는 K3 Max를 먼저 추천 | 가능 |
| Keychron Q1 Max | 기존 Keychron Q1과 계열이 가까워 중복/세대 구분 확인 필요 | 가능 |
| Wooting 80HE | 점수는 높지만 기존 60HE가 있어 세대/배열 차이 확인 후 진행 | 가능 |
| DrunkDeer G75 | 기존 A75와 역할이 가까워 정보 확인 후 진행 | 가능 |
| Logitech MX Mechanical | 좋은 사무용 기계식 후보지만 MX Keys S와 함께 넣으면 Logitech 비중이 커짐 | 가능 |
| Lofree Flow | 로우프로파일 후보로 좋지만 유통/옵션 확인이 더 필요 | 가능 |
| Leopold FC750R | 좋은 TKL 타이핑 후보지만 스위치 옵션 파편화 확인 필요 | 가능 |
| MonsGeek M1W | 알루미늄 입문 후보로 좋지만 Rainy75/Q 계열과 비교 후 진행 | 가능 |
| Akko 5075B Plus | 보급형 75% 후보지만 AULA F75와 역할이 가까움 | 가능 |
| Bridge75 | 정보와 판매 옵션 확인이 더 필요 | 가능 |

## 7. 제외 후보

이번 점수화에서 완전 제외로 둔 제품은 없다. 다만 아래 제품은 신규 추가 후보가 아니라 보강 후보로 분리한다.

- `AULA F75`: 기존 DB 중복
- `NuPhy Halo75 V2`: 기존 DB 중복
- `Keychron V1 Max`: 기존 DB 중복
- `Wooting 60HE`: 기존 DB 중복
- `DrunkDeer A75`: 기존 DB 중복
- `Razer Huntsman V3 Pro TKL`: 기존 DB 중복
- `Realforce R3`: 기존 DB 중복
- `Rainy75`: 기존 DB 중복

## 8. 다음 작업 제안

### Keyboard DB Collection Batch 1 추천 10개

수집 JSON을 먼저 만든다면 아래 10개를 추천한다.

1. NuPhy Air75 V2
2. SteelSeries Apex Pro TKL
3. Logitech MX Keys S
4. Keychron K3 Max
5. HHKB Professional HYBRID Type-S
6. Keychron K2 Max
7. Wooting 80HE
8. Logitech MX Mechanical
9. Lofree Flow
10. MonsGeek M1W

### Keyboard Product Patch Batch 1 추천 3~5개

바로 patch 후보를 만든다면 아래 순서를 추천한다.

1. NuPhy Air75 V2
2. SteelSeries Apex Pro TKL
3. Logitech MX Keys S
4. Keychron K3 Max
5. HHKB Professional HYBRID Type-S

patch 생성 시 공식 스펙 기반으로 `rawSpecs.note`에 판매처별 스위치 옵션, 국내/해외 배열 차이, 키캡/하우징 옵션 차이, 펌웨어/소프트웨어 확인 필요 사항을 남긴다.

## 9. Product Patch Candidate 1 결과

2026-06-24 기준 Keyboard DB Collection Batch 1의 `yes` 후보 4개를 첫 `product_config_patch` 후보로 선택했다.

1. NuPhy Air75 V2
2. SteelSeries Apex Pro TKL
3. Logitech MX Keys S
4. Keychron K3 Max

HHKB Professional HYBRID Type-S는 무접점 방식, 특수 배열, 각인과 지역 모델 차이를 별도로 검토하기 위해 이번 patch에서 제외하고 `hold`를 유지한다.

- NuPhy Air75 V2는 기존 Halo75 V2와 다른 로우프로파일 Air V2 세대로 구분했다.
- SteelSeries Apex Pro TKL은 유선 TKL 후보로 두고 Wireless, Gen 3, 구형 세대 차이를 `rawSpecs.note`와 `uncertainFields`에 남겼다.
- Logitech MX Keys S는 기존 MX Keys와 이름이 유사하지만 별도 모델 후보로 구분했으며, 팬터그래프 계열 생산성 키보드로 작성했다.
- Keychron K3 Max는 K3, K3 Pro와 분리하고 핫스왑·배열·스위치 옵션 차이를 확인 항목으로 남겼다.
- 제품 이미지, 구매 링크, 최상위 출처 필드, 실제 키보드 TS 반영은 포함하지 않았다.
- validator는 신규 후보 3개, 기존 중복 후보 1개, warnings 0개, errors 0개로 통과했다.
- 정확한 id/slug/제품명 중복은 0개다. 제품군 유사 판정 1개는 `Logitech MX Keys S`와 기존 `Logitech MX Keys`의 이름 포함 관계이며, 세대와 기능 차이를 별도 검토한다.
