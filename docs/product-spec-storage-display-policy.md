# Product Spec Storage & Display Policy

작성일: 2026-06-13

## 1. 핵심 정책

Project7 제품 DB는 제품 정보를 넓게 수집하되, 사용자 화면에는 SetupRadar의 목적에 맞는 일부 정보만 단계적으로 노출한다.

- DB는 다나와처럼 넓게 수집한다.
- UI는 초보자가 구매 전 판단에 쓰기 좋은 정보만 먼저 보여준다.
- Finder는 초보자용 질문과 선택지만 노출한다.
- Compare는 Finder보다 상세 스펙을 더 많이 보여줄 수 있다.
- Detail page는 향후 거의 모든 구조화 스펙을 보여줄 수 있다.
- hidden field는 삭제가 아니라 비노출 보관이다.
- 불확실한 정보는 확정 필드에 넣지 않고 `rawSpecs.note`와 `uncertainFields`에 남긴다.

이 정책은 마우스, 키보드, 모니터 제품 DB를 200~300개 규모로 확장하기 전의 공통 기준이다.

## 2. 데이터 계층 구조

제품 데이터는 아래 5개 계층으로 구분한다.

| 계층 | 역할 | 화면 노출 기준 |
| --- | --- | --- |
| `basicFilters` | Finder 일반 필터용 요약값 | Finder 기본 질문에 필요한 값만 노출 |
| `advancedFilters` | Finder 상세 필터용 요약값 | 상세 기준을 열었을 때 일부만 노출 |
| `detailSpecs` | 제품 상세/Compare용 구조화 스펙 | Compare와 향후 상세 페이지에서 선택 노출 |
| `productTags` | 가이드/큐레이션/분류용 태그 | 직접 필터보다 문맥 분류에 사용 |
| `rawSpecs` | 출처, 불확실성, 판매처별 차이, 운영상 주의 메모 | 원칙적으로 요약 또는 일부만 노출 |

현재 타입에 `productTags`가 직접 없는 제품군은 `recommendationTags`, `specTags`, 수집 JSON의 `productTags`를 이 계층의 후보로 본다. `productImages`, `productLinks`, `shellReferences`는 별도 승인 전까지 hidden 또는 미노출 상태를 유지한다.

## 3. Mouse 정책

### Finder 일반 필터

마우스 Finder 일반 필터는 아래 기준만 우선한다.

- 손 크기
- 마우스 형태
- 무게 선호
- 연결 방식
- 가격 성향

### Finder 상세 필터

상세 필터는 후보를 조금 더 좁히는 참고 조건이다.

- 연결 상세
- 배터리/충전
- 클릭 소음
- 사이드 버튼
- 휴대성
- 휠/스크롤
- 손목 부담/특수 형태
- 국내 구매 접근성

상세 필터는 제품을 강하게 탈락시키는 조건이 아니라, 확인 가능한 경우에만 약하게 참고하는 조건으로 둔다.

### Finder에서 제외할 것

아래 항목은 마우스 Finder 질문으로 직접 노출하지 않는다.

- `gripStyle`
- 사무용/게임용 broad filter
- 센서명
- DPI
- IPS
- 가속도
- 폴링레이트
- 스캔율
- 스위치 브랜드
- 코팅
- 크기 mm
- A/S 보증기간
- 블루투스 세부 버전

사무용/게임용 성격은 넓은 필터가 아니라 설명, 태그, Compare 문맥에서 참고한다.

### 제품 상세/Compare에 저장 또는 노출 가능한 것

아래 항목은 `detailSpecs` 또는 Compare 전용 표시 후보로 저장할 수 있다.

- `sensorName`
- `maxDpi`
- `ips`
- `acceleration`
- `pollingRateHz`
- `scanRateFps`
- `switchName`
- `switchType`
- `wheelType`
- `coating`
- `lengthMm`
- `widthMm`
- `heightMm`
- `weightG`
- `batteryType`
- `batteryLife`
- `chargePort`
- `receiverType`
- `wirelessModes`
- `multiDevice`
- `softwareName`
- `onboardMemory`

현재 코드의 `sensorModel`, `fpsScanRate`, `dimensionsMm`처럼 기존 필드명이 다른 항목은 타입 변경 없이 기존 구조를 우선 사용한다.

### `rawSpecs.note`로 둘 것

아래 항목은 구조화가 어렵거나 판매처/지역 차이가 커서 `rawSpecs.note`에 남긴다.

- 판매처별 수신기 구성 차이
- 지역별 패키지 차이
- A/S 보증기간
- 블루투스 세부 버전
- 배터리 개수 세부
- RGB/LED
- 무게추
- 무선충전
- 확정하기 어려운 리뷰/커뮤니티성 정보

## 4. Keyboard 정책

### Finder 일반 필터

키보드 Finder 일반 필터는 아래 기준만 우선한다.

- 배열
- 연결 방식
- 소음 성향
- 스위치 성향
- 가격 성향

### Finder 상세 필터

상세 필터는 선택 사항으로 둔다.

- 핫스왑
- 자석축/래피드 트리거
- Mac/iPad 호환
- 한글 각인
- 휴대성
- 로우프로파일
- 무접점
- 키캡/하우징 기본 성향

### Finder에서 제외할 것

아래 항목은 키보드 Finder 질문으로 직접 노출하지 않는다.

- 스위치 세부 모델명
- 보강판 세부 재질
- 흡음재 세부 구성
- 정확한 무게 g
- 배터리 용량
- 펌웨어 세부 버전
- 판매처별 스위치 옵션 전체

### 제품 상세/Compare에 저장 또는 노출 가능한 것

아래 항목은 `detailSpecs` 또는 Compare 전용 표시 후보로 저장할 수 있다.

- `layout`
- `switchFeel`
- `switchName`
- `switchOptions`
- `connectionDetail`
- `hotSwap`
- `rapidTrigger`
- `magneticSwitch`
- `viaQmk`
- `macIpadSupport`
- `koreanLegends`
- `keycapMaterial`
- `housingMaterial`
- `plateFoam`
- `battery`
- `weight`
- `portability`
- `softwareName`

현재 타입에 없는 항목은 새 타입을 즉시 만들지 않고, 수집 JSON 또는 `rawSpecs.note`에서 먼저 검토한다.

### `rawSpecs.note`로 둘 것

- 판매처별 스위치 옵션 차이
- 국내/해외 배열 차이
- 키캡/하우징 옵션 차이
- 펌웨어/소프트웨어 확인 필요
- 리비전 차이

## 5. Monitor 정책 초안

모니터는 아직 제품 DB 확장 전이므로 초안 정책으로 둔다.

### Finder 일반 필터 후보

- 크기
- 해상도
- 주사율
- 패널 타입
- 가격 성향

### Finder 상세 필터 후보

- 용도별 참고값
- HDR
- 포트
- 스탠드 조절
- VESA
- 무결점 정책 확인 필요 여부
- 플리커프리/로우블루라이트
- VRR 지원

### 제품 상세/Compare에 저장할 것

- `gtg`
- `mprt`
- `brightness`
- `colorGamut`
- `hdr`
- `ports`
- `standAdjust`
- `vesa`
- `speaker`
- `deadPixelPolicy`
- `flickerFree`
- `vrrSupport`

### `rawSpecs.note`로 둘 것

- 패널 로트 차이
- 무결점 정책 판매처 차이
- HDR 광고 문구 주의
- 실제 응답속도 체감은 테스트 환경에 따라 달라질 수 있음

## 6. Image 정책

제품 이미지는 기본적으로 파일로 저장하지 않는다.

- 이미지 파일 다운로드 금지
- 공식 이미지 URL이 확실하지 않으면 빈 문자열로 둔다.
- DB에는 `thumbnailUrlCandidate`, `imageAlt`, `sourceType`, `sourceNote`, `hidden`만 저장한다.
- `hidden` 기본값은 `true`다.
- 리뷰/커뮤니티 이미지는 저장하지 않는다.
- 대표 제품 일부만 나중에 WebP 썸네일 저장을 검토한다.

이미지 노출은 저작권, 핫링크, 공식 사용 가능 여부, 빌드 용량을 별도 검토한 뒤 진행한다.

## 7. Supabase 정책

제품 DB는 200~300개 규모에서는 Supabase Free로 충분한 범위로 본다. 다만 초기에는 로컬 파일 기반 수집과 검증 흐름을 유지한다.

- Supabase에는 구조화 제품 정보와 짧은 `rawSpecs.note`만 저장한다.
- 원문 HTML, 리뷰 전문, 이미지 원본, 대량 로그는 저장하지 않는다.
- 이미지 저장이 필요하면 대표 썸네일만 압축 WebP로 제한한다.
- 대량 제품 수집은 먼저 `tmp` JSON -> `product_config_patch` -> validator -> manual apply 순서를 따른다.
- Supabase 전환 전에도 Finder/Compare 추천 순서와 제휴 여부는 분리한다.

이 섹션은 향후 DB 전환 후보를 위한 정책이며, 현재 작업에서 Supabase/API/DB 연동을 추가하지 않는다.

## 8. LLM 수집 정책

LLM은 조사원과 정리원 역할로 사용한다.

- LLM 수집값은 바로 `published` 데이터로 믿지 않는다.
- 제조사 공식 페이지와 공식 스펙을 우선한다.
- 불확실하면 `null`, 빈 문자열, 또는 `확인 필요`로 둔다.
- placeholder URL은 금지한다.
- 생략 보고는 금지한다.
- 실제 파일 생성 없이 완료 보고하지 않는다.
- 제품 수집은 10개 batch 단위로 진행한다.

LLM이 만든 수집 파일은 사람이 검토한 뒤 `product_config_patch`로 변환하고, validator를 통과한 후보만 수동 반영한다.

## 9. UI 노출 정책

UI 노출은 화면 역할에 따라 다르게 둔다.

- Finder는 `basicFilters`와 `advancedFilters` 중 선택된 필드만 사용한다.
- Compare는 `detailSpecs`를 Finder보다 더 많이 보여준다.
- Detail page는 추후 `detailSpecs`와 `rawSpecs.note` 일부를 보여줄 수 있다.
- Hidden field는 삭제하지 않고 displayConfig 또는 정책 문서 기준으로 비노출 처리한다.
- 내부 상태값, 이미지 후보, 구매 링크 후보, 검수 전 쉘 레퍼런스는 사용자 화면에 노출하지 않는다.

화면에 표시되는 문구는 제품 우열보다 구매 전 확인 기준과 사용 환경 차이를 설명하는 방향으로 작성한다.

## 10. 다음 작업과 연결

이 정책 문서 이후 제품 확장 작업은 아래 순서와 연결한다.

1. `Keyboard Product Candidate Scoring 1`
2. `Keyboard DB Collection Batch 1`
3. `Mouse DB Collection Batch 2`
4. 모니터 제품 DB schema 초안

마우스 Batch 2와 키보드 수집 batch는 이 문서를 상위 기준으로 삼고, 제품별 수집 파일과 patch 변환 단계에서 불확실한 값을 확정 필드로 밀어 넣지 않는다.
