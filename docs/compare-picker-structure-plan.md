# Project7 Compare Picker Structure Plan

Last updated: 2026-06-07 Keyboard Compare Picker Mock 1

Scope: structure planning, first Mouse Compare Picker mock, and first Keyboard Compare Picker mock only. No product data update, new products, API/DB/Supabase, Project2 integration, ad/affiliate code, Finder logic change, GA4/Search Console structure change, package change, or domain change.

## 0. 진행 상태

- Phase 0 Compare Picker 구조 문서화를 완료했다.
- Phase 1 `/kr/compare/mouse` 정적 picker mock을 완료했다.
- 현재 `/kr/compare/mouse`는 기존 `MOUSE_DATABASE`에서 sanitized 제품 목록을 읽고, 사용자가 A/B 제품을 선택해 기본 비교표를 볼 수 있다.
- Phase 4 첫 Keyboard Compare Picker mock으로 `/kr/compare/keyboard` route를 완료했다.
- 현재 `/kr/compare/keyboard`는 기존 `KEYBOARD_DATABASE`에서 sanitized 제품 목록을 읽고, 사용자가 A/B 제품을 선택해 기본 비교표를 볼 수 있다.
- 형태/무게/연결/크기 필터, URL 공유, CPU/GPU picker는 아직 구현하지 않았다.

## 1. Compare Picker 목적

Compare Picker는 사용자가 직접 제품 A와 제품 B를 선택해 차이를 비교할 수 있는 도구형 기능이다.

- 고정 비교 페이지: SEO와 검색 유입을 위한 읽는 콘텐츠
- Compare Picker: 사이트 체류시간과 상품성을 높이는 선택형 도구
- 첫 대상: `mouse-vs-mouse`
- 후속 확장 후보: `keyboard-vs-keyboard`, `monitor-vs-monitor`, `cpu-vs-cpu`

고정 비교 페이지는 운영자가 미리 정리한 조합을 깊게 설명하고, Picker는 사용자가 궁금한 조합을 직접 골라 기본 차이를 빠르게 확인하는 역할을 맡는다.

## 2. UX 후보 비교

### A안: 좌우 선택형

- 데스크탑에서 왼쪽은 제품 A, 오른쪽은 제품 B를 선택한다.
- 선택 후 아래에 요약 카드와 비교 결과를 표시한다.
- 장점: 비교 도구처럼 직관적으로 느껴진다.
- 단점: 모바일에서 좌우 배치가 길어지거나 답답해질 수 있다.

### B안: 필터 + 제품 선택형

- 먼저 카테고리, 형태, 무게, 연결 방식 같은 조건으로 후보를 좁힌다.
- 좁혀진 목록에서 A/B 제품을 각각 선택한다.
- 장점: 제품 수가 늘어날수록 유리하다.
- 단점: 초기 구현이 조금 복잡하고 초보자에게 필터가 많아 보일 수 있다.

### C안: 가로 스크롤 카드형

- 제품 카드를 가로로 넘기며 A/B를 선택한다.
- 장점: 모바일에서 자연스럽게 보일 수 있다.
- 단점: 제품 수가 많아지면 검색이나 필터가 없을 때 탐색이 불편해질 수 있다.

### 추천 방향

1차 구현은 **A안 + 간단 검색/필터**를 추천한다. 데스크탑에서는 A/B 선택을 나란히 보여주고, 모바일에서는 A 선택, B 선택, 비교 결과 순서로 세로 배치한다.

제품 수가 늘어나면 B안의 필터 구조를 확장한다. C안은 모바일 카드 탐색 보조 UI로 검토할 수 있지만, 처음부터 가로 스크롤만으로 제품 선택을 맡기지는 않는다.

## 3. 초기 Mouse Compare Picker 구조

경로 후보:

- `/kr/compare/mouse`
- `/kr/compare/mouse/custom`

추천 경로:

- `/kr/compare/mouse`

`/kr/compare/mouse`는 마우스 비교 허브이면서 picker 역할을 함께 맡는다. 고정 상세 페이지는 기존처럼 `/kr/compare/mouse/lamzu-maya-vs-zowie-u2` 같은 하위 URL을 사용한다.

초기 UI 구성:

1. Hero
2. 제품 A 선택
3. 제품 B 선택
4. 간단 필터
   - 형태
   - 크기
   - 무게
   - 연결 방식
5. 선택된 제품 요약 카드
6. 비교 결과 테이블
7. 구매 전 체크
8. 관련 Finder/가이드 링크

운영 문구는 “정답 추천”보다 “구매 전 차이 이해”에 맞춘다. Picker는 Finder처럼 추천 점수를 계산하는 도구가 아니라, 사용자가 고른 두 제품의 차이를 정리하는 도구로 둔다.

## 4. 데이터 사용 원칙

- 기존 `MOUSE_DATABASE`를 읽어서 사용한다.
- 제품 데이터는 수정하지 않는다.
- 새 제품은 추가하지 않는다.
- `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs`, `features`, `specTags`, summary copy를 활용한다.
- 없는 정보는 빈칸으로 두거나 `확인 필요` 톤으로 표시한다.
- `review`, `status` 내부값은 사용자 화면에 직접 노출하지 않는다.
- `productImages`, `productLinks`는 초기 Picker 화면에 노출하지 않는다.
- 제휴 링크나 가격 정보는 비교 결과와 분리한다.

필드 활용 예시:

| 표시 항목 | 우선 참고 필드 | 부족할 때 처리 |
| --- | --- | --- |
| 브랜드/제품명 | `brand`, `name` | 제품 식별자라 임의 보정하지 않음 |
| 형태 | `basicFilters.shape`, `shapeType` | 초보자용 라벨로 변환 |
| 손 크기 기준 | `basicFilters.size`, `handSizeRange`, `dimensions` | `확인 필요` 또는 치수 참고 |
| 무게 기준 | `weight`, `basicFilters.weight` | 수치와 체감 라벨 분리 |
| 연결 방식 | `basicFilters.connection`, `features`, `rawSpecs.note` | 불확실하면 참고 문구 |
| 상세 연결 | `detailSpecs.bluetoothVersion`, `rawSpecs.note`, `features` | 확실한 경우만 표시 |
| 배터리/충전 | `advancedFilters.battery`, `detailSpecs.batteryDetail` | 판매처 확인 안내 |
| 쉘 체감 참고 | `shellReferences` | 검수 조건 충족 항목만 조심스럽게 사용 |

## 5. 비교 항목 후보

### 마우스

- 브랜드/제품명
- 형태
- 손 크기 기준
- 무게 기준
- 연결 방식
- 상세 연결
- 용도
- 클릭/휠/사이드 버튼
- 배터리/충전
- 쉘 체감 참고
- 구매 전 확인할 점

### 키보드 확장 시

- 배열
- 스위치 성향
- 소음
- 연결 방식
- 핫스왑
- OS/기기 호환성
- 키캡/하우징
- 구매 전 확인할 점

### CPU 확장 시

- 출시년도
- 소켓
- 메인보드 플랫폼
- DDR4/DDR5
- 전력/발열
- X3D 여부
- GPU 급 검토
- 업그레이드 경로

CPU/GPU는 공식 스펙과 검증 출처 기준의 별도 데이터 구조가 준비된 뒤 확장한다. 벤치마크 수치는 직접 복제하지 않고, 수치가 필요한 경우 출처와 측정 환경을 함께 둔다.

## 6. 고정 비교 페이지와 Picker 관계

- 고정 비교 페이지는 SEO용 콘텐츠다.
- Picker는 도구형 기능이다.
- 고정 비교 페이지 상단이나 하단에 `다른 마우스도 직접 비교하기` 링크를 추가할 수 있다.
- Picker에서 사용자가 많이 찾는 조합을 운영자가 고정 비교 페이지로 만들 수 있다.
- `Lamzu Maya vs Zowie U2`는 고정 비교 페이지의 첫 예시이며, 이후 Picker가 생기면 해당 조합으로 미리 선택된 링크를 검토할 수 있다.

URL 공유 후보:

- `/kr/compare/mouse?a=lamzu-maya&b=zowie-u2`
- `/kr/compare/mouse/lamzu-maya-vs-zowie-u2`는 고정 SEO 페이지로 유지

초기에는 query 기반 공유 URL을 바로 만들지 않고, 실제 사용 흐름이 확인된 뒤 검토한다.

## 7. 모바일 UX 원칙

- A/B 선택 영역을 모바일에서 좌우 고정으로 만들지 않는다.
- 모바일에서는 A 선택, B 선택, 비교 결과 순서로 세로 배치한다.
- 비교 테이블은 가로 스크롤보다 카드형 행 비교를 우선 검토한다.
- 긴 스펙표보다 `차이 요약`을 먼저 보여준다.
- 필터는 접힘 영역 또는 간단한 chip 버튼 형태로 둔다.
- 선택한 A/B 제품은 화면 중간 이후에도 짧은 sticky 요약 또는 상단 요약으로 다시 확인할 수 있게 검토한다.

## 8. 구현 단계 로드맵

### Phase 0: 문서화

- 이번 작업에서 Compare Picker 구조를 문서화한다.
- 실제 route, picker UI, 데이터 연결은 만들지 않는다.

### Phase 1: `/kr/compare/mouse` 정적 picker mock

- `MOUSE_DATABASE`에서 제품 목록을 읽는다.
- A/B select 또는 버튼 선택을 제공한다.
- 비교 결과는 브랜드, 이름, 형태, 크기, 무게, 연결 방식 같은 기본 필드만 표시한다.
- 제품 이미지, 제품 링크, 가격/제휴 링크는 노출하지 않는다.
- 2026-06-07 Mouse Compare Picker Mock 1에서 `/kr/compare/mouse` route를 추가했다.
- 기본 선택값은 `Lamzu Maya`와 `Zowie U2`이며, 사용자가 select box로 제품 A/B를 바꾸면 요약 카드와 비교표가 즉시 바뀐다.
- 내부 `review/status`, `productImages`, `productLinks`는 client component로 넘기지 않고 화면에 노출하지 않는다.

### Phase 2: 필터 추가

- 형태, 무게, 연결, 크기 기준으로 후보를 좁힌다.
- 필터는 제품 탈락보다 탐색 편의에 가깝게 설계한다.
- 전체/다중 선택/선택 해제 규칙은 Finder에서 최근 다듬은 브랜드 필터 UX와 비슷한 방향을 검토한다.

### Phase 3: 고정 비교 페이지와 연결

- 고정 상세 페이지에서 Picker로 이동한다.
- Picker에서 특정 조합 URL 공유 구조를 검토한다.
- 인기 조합을 고정 비교 페이지 후보로 운영자가 선별한다.

### Phase 4: Keyboard Compare Picker 확장

- `KEYBOARD_DATABASE`를 읽어 배열, 스위치 성향, 소음, 연결, 핫스왑, OS/기기 호환성 기준을 표시한다.
- 키보드는 판매처별 옵션 차이가 커서 `확인 필요` 표시를 적극적으로 사용한다.
- 2026-06-07 Keyboard Compare Picker Mock 1에서 `/kr/compare/keyboard` route를 추가했다.
- 기본 선택값은 `AULA F75`와 `NuPhy Halo75 V2`이며, 사용자가 select box로 제품 A/B를 바꾸면 요약 카드와 비교표가 즉시 바뀐다.
- 제품 A/B 제조사 필터는 각각 독립적으로 동작한다.
- 내부 `review/status`, `productImages`, `productLinks`는 client component로 넘기지 않고 화면에 노출하지 않는다.

### Phase 5: CPU/GPU 확장 검토

- CPU/GPU는 공식 스펙과 검증 출처 기준의 별도 데이터 구조를 만든 뒤 확장한다.
- 출시년도, 세대, 플랫폼, 메모리 호환성, 전력/발열, GPU 급 검토처럼 초보자 해석 중심으로 둔다.

## 9. 리스크

- 제품 데이터가 부족하면 비교표가 빈약해 보일 수 있다.
- 너무 많은 필터는 초보자에게 복잡하게 느껴질 수 있다.
- `review` 상태 제품을 공개 비교 도구에 어느 범위까지 쓸지 기준이 필요하다.
- `productLinks`나 affiliate가 섞이면 추천 공정성 오해가 생길 수 있다.
- CPU/GPU는 데이터 오류 리스크가 크다.
- Finder와 Picker의 역할이 겹쳐 보이면 사용자가 목적을 헷갈릴 수 있다.
- 제품 수가 늘어날수록 검색, 정렬, 필터 기준 관리 부담이 커진다.

## 10. 운영 원칙

- 처음부터 큰 비교기를 만들지 않는다.
- 마우스 제품 10~20개 규모에서 UX를 먼저 검증한다.
- 부족한 데이터는 `확인 필요`로 표시한다.
- 비교 결과는 정답이 아니라 구매 전 차이 이해용으로 안내한다.
- 제휴 링크는 비교 결과 정렬과 표시 우선순위에 영향을 주지 않는다.
- Finder 추천 점수와 Picker 비교 결론을 자동으로 연결하지 않는다.
- 실제 route가 생기기 전에는 sitemap에 Picker URL을 넣지 않는다.
- 공개 후에는 `npm run lint`, `npm run build`, `/kr/compare`, `/kr/compare/mouse` live QA를 진행한다.
