# Project7 Mouse Product Candidate Scoring 1

작성일: 2026-06-07

## 1. 목적

Mouse Product Patch Batch 1 전에 마우스 후보를 점수화한다.

- 감으로 제품을 추가하지 않고 Finder/Compare 기여도를 기준으로 고른다.
- 이번 작업에서는 실제 제품 데이터에 추가하지 않는다.
- `product_config_patch`도 생성하지 않는다.
- 기존 DB 중복 제품은 신규 후보가 아니라 보강 후보로 분류한다.

평가 기준은 `docs/weekly-product-candidate-plan.md`의 주간 후보 선정 기준을 따른다.

## 2. 현재 DB 중복 확인 요약

현재 `src/content/kr/products/mice.ts`에는 마우스 14개가 있다.

후보군 중 이미 DB에 있는 제품:

- Razer Viper V3 Pro
- Logitech G Pro X Superlight 2
- Pulsar X2V2
- Pulsar Xlite V3 Large
- Zowie EC2-CW
- Zowie U2
- Logitech G304
- Logitech G102

신규 후보로 볼 수 있는 제품:

- Pulsar X2H
- Lamzu Maya X
- Lamzu Thorn
- ATK X1
- ATK F1
- VXE R1 Pro
- Scyrox V8
- Logitech MX Master 계열
- Logitech MX Anywhere 계열

보강 후보로 볼 제품:

- Razer Viper V3 Pro: 이미 published. 고정 비교나 `rawSpecs.note` 보강 후보.
- Logitech G Pro X Superlight 2: 이미 published. 고정 비교나 구매 전 체크 보강 후보.
- Pulsar X2V2: 이미 review. X2H와 비교할 때 기존 데이터 보강 후보.
- Pulsar Xlite V3 Large: 이미 review. Medium/Mini를 새 제품으로 볼지, 계열 보강으로 볼지 추가 확인 필요.
- Zowie EC2-CW: 이미 review. EC 계열 비교 콘텐츠 보강 후보.
- Zowie U2: 이미 review. 고정 비교 페이지와 연결된 보강 후보.
- Logitech G304 / G102: 이미 review. 보급형 비교 콘텐츠 보강 후보.

## 3. 후보별 점수표

점수는 각 항목 0~5점이며, 총점 기준은 아래와 같다.

- 38점 이상: 우선 후보
- 32~37점: 보류 후보
- 31점 이하: 이번 주 제외

| 제품명 | 제품군 | Finder 기여도 | Compare 기여도 | 구매 접근성 | 공식 스펙 확인 가능성 | 초보자 설명 가능성 | 기존 DB와 차별성 | 제품군 균형성 | 데이터 입력 난이도 | 콘텐츠/제휴 연결 가능성 | 운영 리스크 | 총점 | 판정 | 메모 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| Lamzu Thorn | 오른손용 비대칭 경량 무선 | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 45 | 우선 후보 | 현재 DB의 비대칭 무선 후보를 넓히고, DeathAdder/Xlite/EC 계열과 비교 가치가 큼 |
| Logitech MX Anywhere 계열 | 사무/휴대용 무선 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 5 | 45 | 우선 후보 | 게이밍 중심 DB에 사무/휴대용 축을 추가할 수 있음. 모델 세대 확인 필요 |
| Lamzu Maya X | 초경량 무선 대칭형 | 4 | 5 | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 4 | 40 | 우선 후보 | 기존 Lamzu Maya와 크기/체감 차이를 비교하기 쉬움. 중복이 아니라 계열 차이로 정리 필요 |
| VXE R1 Pro | 가성비 초경량 무선 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 39 | 우선 후보 | 중국계/가성비 초경량 후보군 보강에 좋음. 판매처별 표기와 구성 확인 필요 |
| Scyrox V8 | 초경량 무선 대칭형 | 4 | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 3 | 36 | 보류 후보 | 초경량 후보 다양화에는 좋지만 국내 접근성과 세부 정보 확인 부담이 있음 |
| ATK F1 | 소형/경량 무선 | 4 | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 3 | 36 | 보류 후보 | ATK A9 Ultimate와 역할이 일부 겹칠 수 있어 크기 차이와 모델 구분 확인 필요 |
| Pulsar X2H | 대칭형 클로 그립 계열 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 4 | 3 | 4 | 35 | 보류 후보 | X2V2가 이미 DB에 있어 신규보다 계열 비교/보강 쪽이 안전함 |
| ATK X1 | 대칭형 초경량 무선 | 4 | 4 | 3 | 4 | 4 | 3 | 3 | 3 | 4 | 3 | 33 | 보류 후보 | 기존 ATK A9 Ultimate와 역할이 겹칠 가능성이 있어 모델 차이 조사 필요 |
| Logitech MX Master 계열 | 사무용 고기능 무선 | 3 | 4 | 5 | 5 | 5 | 5 | 4 | 3 | 4 | 4 | 40 | 보류 후보 | 사무용 축으로 가치는 높지만 무게와 기능 설명이 Finder 기본 조건과 다소 다름 |
| Pulsar Xlite V3 계열 | 오른손용 비대칭 무선 | 3 | 4 | 4 | 4 | 4 | 2 | 3 | 3 | 3 | 4 | 33 | 보류 후보 | Large가 이미 DB에 있어 Medium/Mini를 새 제품으로 볼지 보강으로 볼지 확인 필요 |

## 4. Batch 1 추천 3개

목표 조합:

- 초경량 무선 1개
- 오른손용 비대칭 1개
- 보급형/사무용 또는 국내 접근성 좋은 제품 1개

### 1. Lamzu Maya X

첫 Batch에 적합한 이유:

- 초경량 무선 대칭형 후보를 늘리면서 기존 `Lamzu Maya`와 크기/체감 차이를 설명하기 좋다.
- `Lamzu Maya vs Zowie U2` 고정 비교 흐름과도 이어질 수 있다.
- 기존 Maya가 중간 크기 이하로 읽히는 만큼, Maya X가 더 큰 손 또는 안정감 쪽 후보가 될 수 있는지 확인 가치가 있다.

Finder 기여:

- 대칭형, 초경량, 무선, 중형 이상 후보를 보강할 수 있다.
- 클로/핑거팁 성향 후보군에서 비교 폭을 넓힌다.

Compare Picker 가치:

- `Lamzu Maya`와 계열 비교가 가능하다.
- `Razer Viper V3 Pro`, `Pulsar X2V2`, `Zowie U2`와 대칭형 무선 비교 축을 만든다.

데이터 입력 시 주의:

- 기존 `Lamzu Maya`와 중복되지 않도록 제품명, 크기, 무게, 구성품을 분리해서 확인한다.
- 고폴링레이트 동글 포함 여부는 판매처/제조사 기준 확인이 필요할 수 있다.

### 2. Lamzu Thorn

첫 Batch에 적합한 이유:

- 오른손용 비대칭형 경량 무선 후보를 추가해 현재 DB의 비대칭 축을 넓힐 수 있다.
- `DeathAdder V3 Pro`, `Pulsar Xlite V3 Large`, `Zowie EC2-CW`와 비교 가치가 크다.
- 초보자에게 “비대칭형 지지감, 크기, 무게, 손바닥 지지”를 설명하기 쉽다.

Finder 기여:

- 오른손용 비대칭형, 경량 무선, 중간 손 크기 후보를 보강할 수 있다.
- 팜/클로 그립 후보를 늘린다.

Compare Picker 가치:

- 대형 비대칭, 중형 비대칭, e스포츠 지향 비대칭 후보를 비교하는 데 도움이 된다.
- `DeathAdder V3 Pro`보다 부담이 적은 비대칭 후보로 설명할 수 있는지 확인 가치가 있다.

데이터 입력 시 주의:

- 공식 크기/무게와 판매처 구성품을 확인한다.
- 쉘 체감은 특정 제품과 단정 비교하지 않고 손바닥 지지감과 등 높이 중심으로 설명한다.

### 3. Logitech MX Anywhere 계열

첫 Batch에 적합한 이유:

- 현재 DB가 게이밍 마우스 중심이라 사무/휴대용 축을 보강할 수 있다.
- 보급형/사무용 또는 국내 접근성 좋은 제품 1개 목표에 맞는다.
- 초보자에게 “작고 휴대하기 쉬운 무선 마우스, 블루투스/멀티기기, 휠/배터리 확인”을 설명하기 쉽다.

Finder 기여:

- 사무/웹서핑, 휴대용, 블루투스/멀티기기 조건에 기여한다.
- FPS 중심이 아닌 사용자에게 후보를 제공할 수 있다.

Compare Picker 가치:

- `Logitech G304`와 사무/휴대용 무선 vs 입문 게이밍 무선 비교가 가능하다.
- 향후 `MX Master` 계열과도 생산성 마우스 비교 축을 만들 수 있다.

데이터 입력 시 주의:

- 세대가 많으므로 특정 모델명을 먼저 정해야 한다.
- 무게, 센서, 버튼, 휠, 블루투스/수신기 구성은 세대별 차이가 있어 `rawSpecs.note`에 확인 필요를 남긴다.

## 5. 보류 후보

- VXE R1 Pro: 점수는 우선 후보권이지만 중국계 초경량 후보는 `ATK A9 Ultimate`, `Lamzu Maya`, `Ninjutso Sora V2 8K`와 역할이 겹칠 수 있어 Batch 2 후보로 보류한다.
- Scyrox V8: 초경량 후보 다양화에는 좋지만 국내 접근성과 판매처별 구성 확인 부담이 있어 보류한다.
- ATK F1: 소형/경량 후보로 좋지만 ATK A9 Ultimate와 브랜드/역할이 겹칠 수 있어 모델 차이 조사가 먼저 필요하다.
- Pulsar X2H: X2V2가 이미 DB에 있어 신규 추가보다 X2 계열 비교 콘텐츠나 기존 데이터 보강 후보로 둔다.
- ATK X1: ATK A9 Ultimate와 역할 중복 가능성이 있어 보류한다.
- Logitech MX Master 계열: 생산성 축으로 가치가 크지만 Finder 기본 조건과 게이밍 중심 비교표에서 설명 방식이 달라 별도 사무용 Batch에 두는 편이 낫다.
- Pulsar Xlite V3 계열: Large가 이미 DB에 있어 Medium/Mini를 별도 제품으로 둘지 계열 보강으로 둘지 확인이 필요하다.

## 6. 제외 후보

이번 주 신규 후보에서 제외하거나 보강 후보로만 둔다.

- Razer Viper V3 Pro: 기존 DB 중복. 신규 추가 제외, 고정 비교/보강 후보.
- Logitech G Pro X Superlight 2: 기존 DB 중복. 신규 추가 제외, 고정 비교/보강 후보.
- Pulsar X2V2: 기존 DB 중복. 신규 추가 제외, X2H와 비교할 때 보강 후보.
- Pulsar Xlite V3 Large: 기존 DB 중복. 신규 추가 제외, Xlite 계열 보강 후보.
- Zowie EC2-CW: 기존 DB 중복. 신규 추가 제외, EC 계열 비교 후보.
- Zowie U2: 기존 DB 중복. 신규 추가 제외, 이미 고정 비교 페이지에 연결된 보강 후보.
- Logitech G304: 기존 DB 중복. 신규 추가 제외, 보급형 비교 콘텐츠 후보.
- Logitech G102: 기존 DB 중복. 신규 추가 제외, 유선 입문형 비교 콘텐츠 후보.

정보 부족만으로 제외한 제품은 이번 표에서는 따로 두지 않았다. 다만 Scyrox/ATK/VXE 계열은 patch 생성 전 공식 스펙과 판매처별 구성 확인이 필요하다.

## 7. 다음 작업 제안

Mouse Product Patch Batch 1에서 실제 `product_config_patch`를 생성할 후보 3개:

1. Lamzu Maya X
2. Lamzu Thorn
3. Logitech MX Anywhere 계열 중 특정 세대 1개

patch 생성 시 기준:

- 공식 스펙 기반으로 `basicFilters`를 먼저 채운다.
- 불확실한 구성품, 동글, 세대별 차이는 `rawSpecs.note`에 남긴다.
- `shellReferences`는 자동 추가하지 않는다.
- `productImages`, `productLinks`는 추가하지 않는다.
- validator 실행 후 통과한 제품만 `review` 상태로 수동 반영한다.

## 8. Mouse Product Patch Batch 1 생성 결과

생성일: 2026-06-07

생성 파일:

- `tmp/product-patch-mouse-batch-1.json`

patch에 넣은 제품:

1. Lamzu Maya X
2. Lamzu Thorn
3. Logitech MX Anywhere 3S

Logitech 후보는 `MX Anywhere 계열`에서 `Logitech MX Anywhere 3S`로 모델명을 좁혔다. 공식 Logitech Support 문서 기준으로 MX Anywhere 3S는 Logitech USB receiver 2.4GHz와 Bluetooth Low Energy 연결, 100.5 x 65 x 34.4mm, 배터리 포함 95g, 400~8000 DPI, Darkfield high precision sensor, 6 buttons, 충전식 Li-Po battery로 안내된다. 비즈니스 데이터시트는 MX Anywhere 3S for Business를 99g, Logi Bolt/Bluetooth 구성으로 안내하므로 소비자용/비즈니스용 패키지는 수동 반영 전 다시 구분해야 한다.

Lamzu Maya X는 LAMZU 공식 제품 페이지에서 모델 페이지와 색상/패키지 variant를 확인했고, 공개 스펙 참고 자료 기준으로 47g급, PAW3950, 8K, 124mm대 대칭형 무선 후보로 정리했다. 다만 현재 validator는 기존 `Lamzu Maya`와 `brand + name 유사`로 분류한다. 실제로는 `Maya`와 `Maya X`가 별도 모델 후보이지만, 현재 validator 규칙에서는 수동 검토가 필요하다.

Lamzu Thorn은 LAMZU 공식 제품 페이지에서 `LAMZU THORN (4K Compatible)` 모델 페이지를 확인했고, 공식 협업 모델 페이지와 공개 스펙 참고 자료 기준으로 52g급, PAW3395, 오른손용 비대칭형, 4K 관련 구성 확인 필요 후보로 정리했다. 일반판과 협업판은 구성품/수신기 포함 여부가 다를 수 있어 수동 반영 전 패키지 구분이 필요하다.

validator 실행:

```bash
npm run product-patch:validate -- ./tmp/product-patch-mouse-batch-1.json
```

결과:

- 신규 추가 후보: 2개
- 기존 중복 후보: 1개
- warnings: 0
- errors: 0
- Validation passed

신규 추가 후보:

- Lamzu Thorn
- Logitech MX Anywhere 3S

기존 중복 후보:

- Lamzu Maya X -> 기존 `Lamzu Maya`와 `brand + name 유사`로 감지

Lamzu Maya X 처리 메모:

- 모델명과 slug는 `lamzu-maya-x`로 구분했다.
- 현재 validator의 포함 관계 중복 규칙 때문에 기존 `Lamzu Maya`와 묶인다.
- 다음 수동 반영 작업에서는 `Maya X`를 별도 신규 제품으로 볼지, validator 중복 판정 예외를 수동 승인할지 먼저 결정해야 한다.
- 자동 병합이나 기존 `Lamzu Maya` 덮어쓰기는 하지 않는다.

이번 작업에서 하지 않은 것:

- `src/content/kr/products/mice.ts` 직접 수정 없음
- 실제 제품 DB 추가 없음
- snapshot export 미실행
- Finder/Compare 로직 수정 없음
- 제품 이미지/구매 링크/shellReferences 추가 없음

## 9. Mouse Product Patch Batch 1 Manual Apply 결과

반영일: 2026-06-07

실제 반영 파일:

- `src/content/kr/products/mice.ts`

실제 반영 제품:

1. Lamzu Maya X
2. Lamzu Thorn
3. Logitech MX Anywhere 3S

반영 방식:

- 세 제품 모두 `status: "review"`로 추가했다.
- `productImages`, `productLinks`, `shellReferences`, 최상위 `sources` 필드는 추가하지 않았다.
- Finder/Compare 로직은 수정하지 않고, 기존 제품 데이터 구조에 새 제품 항목만 추가했다.
- 공식 스펙/패키지 차이와 추가 확인 사항은 각 제품의 `rawSpecs.note`에 남겼다.

Lamzu Maya X 수동 승인:

- validator는 `Lamzu Maya X`를 기존 `Lamzu Maya`와 `brand + name 유사`로 분류한다.
- 이번 수동 반영에서는 `Maya`와 `Maya X`를 별도 모델 후보로 보고 `id: "lamzu-maya-x"`, `slug: "lamzu-maya-x"`로 분리했다.
- `rawSpecs.note`에는 기존 Maya와 이름이 유사하지만 별도 모델 후보로 수동 검토 후 `review` 상태 반영했다는 메모를 남겼다.
- 기존 `Lamzu Maya` 항목은 덮어쓰지 않았다.

제품별 `rawSpecs.note` 요약:

- Lamzu Maya X: 공식 모델 페이지와 색상/패키지 variant 확인, 124.4 x 64.9 x 39.6mm, 47g, PAW3950, 8K 관련 공개 스펙 참고, 수신기/색상/번들/지역별 패키지 확인 필요.
- Lamzu Thorn: Thorn 4K Compatible 모델 페이지 확인, 52g급, PAW3395, 4K 관련 패키지 정보 참고, 일반판/협업판의 번들/수신기/색상/판매 가능 여부 확인 필요.
- Logitech MX Anywhere 3S: Logitech Support 기준 소비자용 연결/크기/무게/DPI/배터리 정보를 정리했고, Business datasheet와 무게/수신기 구성이 다를 수 있어 소비자용/비즈니스용 구분 필요.

검수 결과:

- `npm run snapshot:export`: 통과
- snapshot summary: 마우스 제품 17개, 키보드 제품 12개, product images 0, product links 0
- snapshot warnings: 50개. 기존 `review` 상태와 공개 전 shell reference 관련 경고이며 validation은 통과했다.
- `npm run product-patch:validate -- ./tmp/product-patch-mouse-batch-1.json`: 통과
- validator 재실행 결과: 신규 추가 후보 0개, 기존 중복 후보 3개, warnings 0, errors 0
- `Lamzu Maya X`는 반영 후에도 기존 `Lamzu Maya`와 `brand + name 유사`로 잡힌다. 이 판정은 자동 병합이 아니라 수동 승인 기록으로 관리한다.
- 금지 표현 점검: 새 제품 데이터와 patch JSON에서 금지 표현 없음.
