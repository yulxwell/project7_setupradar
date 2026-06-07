# Project7 Product & Content Expansion Plan

Last updated: 2026-06-07

Scope: product DB and content expansion planning only. No product data update, compare page implementation, Finder/Compare logic change, Project2 integration, ad/affiliate link, API/DB/Supabase, crawler, GA4/Search Console structure, Control Tower, package, or domain change.

## 1. 확장 목적

Project7 SetupRadar는 이제 UI 골격보다 제품 DB와 콘텐츠 자산을 늘려야 하는 단계다.

- 테스트 도구와 구매 가이드는 신뢰 기반 콘텐츠다.
- Finder와 Compare는 제품 수와 데이터 품질이 올라갈수록 체감 가치가 커진다.
- 최근 장비 소식 preview는 재방문 흐름을 만드는 보조 콘텐츠다.
- Project2 연동은 뉴스, 제품 소개, 핫딜 본문으로 확장할 수 있는 장기 후보지만, Project7은 우선 기준/도구/비교의 신뢰도를 지킨다.

현재 제품 DB는 마우스 14개, 키보드 12개 수준이다. Finder와 Compare가 이미 작동하는 만큼 다음 성장은 제품 수보다 `basicFilters`, `detailSpecs`, `rawSpecs.note`, 구매 전 체크 문구의 품질을 안정적으로 늘리는 쪽이 우선이다.

## 2. 제품 DB 목표

### 단기 목표

- 마우스 30개
- 키보드 25개
- Finder 기본 조건에서 빈 후보가 적게 나오도록 제품군을 고르게 채운다.
- Compare Picker에서 같은 브랜드만 반복되지 않도록 브랜드와 용도 폭을 넓힌다.

### 중기 목표

- 마우스 50개
- 키보드 40개
- 모니터 제품/스펙 schema 설계
- 고정 비교 페이지 후보를 제품 데이터와 연결 가능한 조합 중심으로 늘린다.

### 장기 후보

- CPU
- GPU
- RAM
- 모니터
- 헤드셋/이어폰
- 패드/마우스패드

CPU/GPU/RAM은 공식 스펙 검증과 세대 변경 리스크가 크므로 주변기기 DB가 안정된 뒤 별도 schema로 진입한다.

## 3. 마우스 제품 확장 우선순위

우선 추가할 제품군:

- 초경량 무선 대칭형
- 오른손용 비대칭형 FPS 마우스
- 보급형 무선 마우스
- 사무/휴대용 마우스
- 국내 구매 접근성이 좋은 제품
- 중국계/가성비 초경량 마우스

각 제품에 필요한 필드:

- `basicFilters`
- 형태
- 무게 기준
- 연결 방식
- 상세 연결
- 손 크기 기준
- 용도
- 배터리/충전
- 사이드 버튼
- 구매 전 체크
- `rawSpecs.note`
- `shellReferences`는 확실한 검수 조건을 만족할 때만

마우스 데이터는 Finder에 바로 영향을 주므로 `basicFilters.shape`, `basicFilters.weight`, `basicFilters.connection`, `basicFilters.size` 품질을 먼저 본다. 쉘 체감 비교는 법적/표현 리스크가 있으므로 `shellReferences` 자동 추가를 피하고, 불확실한 비교는 `rawSpecs.note`에 참고 메모로만 남긴다.

## 4. 키보드 제품 확장 우선순위

우선 추가할 제품군:

- 75% 무선 키보드
- TKL 게이밍 키보드
- 풀배열 사무용 키보드
- 저소음 키보드
- 래피드 트리거/자석축 키보드
- Mac/iPad 겸용 키보드
- 보급형 기계식 키보드

각 제품에 필요한 필드:

- `basicFilters`
- 배열
- 스위치 성향
- 소음 성향
- 연결 방식
- 상세 연결
- 핫스왑
- OS/기기 호환
- 키캡/하우징
- 구매 전 체크
- `rawSpecs.note`

키보드는 판매처별 스위치, 키캡, 베어본/완제품 구성이 자주 달라진다. 확실하지 않은 옵션은 단일 스펙처럼 넣지 말고 `rawSpecs.note`에 판매처/제조사 기준 확인 메모로 남긴다.

## 5. Finder/Compare 기준 데이터 보강 원칙

- Finder는 기본 필터 정확도가 우선이다.
- Compare는 `detailSpecs`, `rawSpecs.note`, summary/caution/buyingCheck copy가 중요하다.
- 불확실한 스펙은 확정 필드에 넣지 않고 `rawSpecs.note`에 남긴다.
- `review/status` 내부값은 사용자 화면에 노출하지 않는다.
- `productImages/productLinks`는 현재 미노출 상태를 유지한다.
- 제휴 링크는 제품 추천 순서와 분리한다.
- 제품 추가 후에는 Finder와 Compare 양쪽에서 기본 문구가 어색하지 않은지 확인한다.

데이터 품질 우선순위:

1. `basicFilters`
2. 제품명/브랜드/카테고리 중복 없음
3. 구매 전 체크 2~3개
4. `rawSpecs.note`의 옵션 차이 안내
5. Compare에 필요한 `detailSpecs`
6. 고정 비교 페이지 후보 연결 가능성

## 6. 주간 제품 추가 루틴

권장 루틴:

1. Gemini 또는 Codex로 후보 제품 5~10개를 조사한다.
2. `product_config_patch`를 생성한다.
3. `npm run product-patch:validate -- ./tmp/product-patch.json`을 실행한다.
4. 중복 제품, 금지 표현, 허용 enum 오류를 확인한다.
5. 통과 제품만 `review` 상태로 수동 반영한다.
6. `npm run snapshot:export`를 실행한다.
7. `npm run lint`를 실행한다.
8. `npm run build`를 실행한다.
9. Finder와 Compare에서 후보 노출과 비교표 문구를 QA한다.
10. 커밋하고 push한다.

초기 권장:

- 한 번에 3~5개만 추가한다.
- 마우스와 키보드를 번갈아 추가한다.
- 제품 수보다 `basicFilters` 품질을 우선한다.
- 중복 제품은 새 제품으로 추가하지 않고 업데이트 후보로 둔다.
- 제품 링크/이미지는 승인 정책이 생기기 전까지 공개하지 않는다.

## 7. 비교 콘텐츠 확장 계획

고정 비교 페이지 후보:

- `Lamzu Maya vs Zowie U2` - 완료
- `Logitech G304 vs Logitech G102`
- `Razer Viper V3 Pro vs Lamzu Maya`
- `Pulsar X2V2 vs Lamzu Atlantis`
- `AULA F75 vs NuPhy Halo75 V2`
- `Wooting 60HE vs DrunkDeer A75`
- `Keychron Q1 vs Keychron V1 Max`

운영 기준:

- 고정 비교 페이지는 SEO용이다.
- Picker는 도구용이다.
- 고정 비교는 실제 제품 데이터가 충분한 조합부터 만든다.
- 제품 우열보다 사용 목적 차이와 구매 전 확인 기준을 중심으로 쓴다.
- 비교 페이지를 만들기 전 두 제품의 `rawSpecs.note`, 구매 전 체크, 기본 필터가 충분한지 먼저 확인한다.

## 8. 모니터 확장 방향

### 단기

- 제품 DB보다 가이드와 테스트 도구 중심을 유지한다.
- `monitor-buying-checklist`, `gtg-vs-mprt`, `dead-pixel-policy`, `backlight-bleed-vs-ips-glow` 같은 가이드를 내부 연결 자산으로 활용한다.

### 중기

- 모니터 schema를 설계한다.
- 필요한 필드 후보:
  - 크기
  - 해상도
  - 주사율
  - 패널
  - 응답속도 표기
  - HDR/밝기
  - 포트
  - 스탠드
  - VESA
  - 무결점/불량화소 정책

### 리스크

- 모델명과 패널 정보가 판매처마다 다를 수 있다.
- 가격 변동이 크다.
- 무결점 정책과 AS 조건은 판매처 기준 차이가 크다.
- 검증 부담이 마우스/키보드보다 높다.

## 9. CPU/GPU 확장 방향

CPU/GPU는 바로 제품 DB에 넣지 않는다. 먼저 별도 schema와 출처 검증 기준이 필요하다.

먼저 필요한 것:

- 공식 스펙 출처 기준
- 출시년도
- 세대/아키텍처
- CPU 소켓/메인보드 플랫폼
- DDR4/DDR5 호환 여부
- 전력/발열
- X3D/3D V-Cache 여부
- 내장그래픽 여부
- 업그레이드 경로
- GPU VRAM/전력/해상도 목표
- 업스케일링/프레임 생성 지원 여부
- 권장 파워와 케이스 호환

운영 주의:

- 벤치마크 수치를 직접 복제하지 않는다.
- 병목 여부를 단정하지 않는다.
- 특정 조합을 한 문장으로 결론내리지 않는다.
- 초보자가 플랫폼, 호환성, 전력/발열, 업그레이드 경로를 이해하는 데 집중한다.

## 10. Project2 연동 방향

역할 분리:

| 영역 | Project7 | Project2 |
| --- | --- | --- |
| 핵심 역할 | Finder, Compare, 기준/가이드, 테스트 도구, 뉴스 preview | 뉴스 본문, 핫딜, 제품 소개, 구매처/배송대행/구매대행 소개, 제휴 링크 후보 |
| 링크 톤 | 내부 기준과 검수된 preview 중심 | 수익형 본문과 구매처 안내 후보 |
| 제휴 링크 | 초반 직접 노출 보류 | 먼저 관리하는 쪽이 안전 |

연동 단계:

### Phase 0

- 현재처럼 Project7 안에서 정적 preview만 운영한다.

### Phase 1

- Project2 글 URL을 수동으로 Project7 `updates.ts`에 연결한다.
- 연결 전 광고·제휴 고지, 링크 상태, 글 공개 상태를 확인한다.

### Phase 2

- Project2에서 JSON export 또는 RSS-like static feed를 만든다.
- Project7은 빌드 시점 또는 정적 데이터로 검수된 preview만 가져오는 방향을 검토한다.

### Phase 3

- API/DB 연동을 검토한다.
- 이 단계 전까지는 Project7에 실시간 수집, 자동 크롤링, 제휴 링크 직접 노출을 넣지 않는다.

주의:

- Project7에는 제휴 링크를 직접 강하게 붙이지 않는다.
- Project2에서 수익형 링크를 먼저 관리하는 쪽이 안전하다.
- Project7의 Finder/Compare 결론과 Project2 제휴 수익은 분리한다.

## 11. 우선순위 로드맵

다음 5개 작업 추천:

1. Weekly Product Candidate Plan 1
2. Mouse Product Patch Batch 1
3. Keyboard Product Patch Batch 1
4. Compare Fixed Page Batch 1
5. Project2 Preview Link Plan

권장 순서:

- 먼저 후보 제품 조사 기준을 정한다.
- 그 다음 마우스/키보드 제품을 소량씩 추가한다.
- 제품 데이터가 쌓인 뒤 고정 비교 페이지를 만든다.
- Project2 preview는 수익형 링크 정책을 다시 확인한 뒤 연결한다.

## 12. 리스크

- 제품 데이터 정확도 리스크
- 비교표가 빈칸처럼 보이는 문제
- 운영자가 감당하기 어려운 제품 수 증가
- 제휴 링크와 추천 공정성 오해
- CPU/GPU 데이터 오류
- Project2 연동 복잡도
- AdSense 심사 전 과도한 상업성
- 미구현 URL이 sitemap이나 화면 링크에 들어가는 문제
- `review` 상태 제품의 공개 범위가 불명확해지는 문제

## 13. 운영 원칙

- 한 번에 제품 3~5개만 추가한다.
- 제품 수보다 데이터 품질을 우선한다.
- 신규 제품은 `review` 상태로 먼저 추가한다.
- 사용자 화면에 내부 검수 상태를 노출하지 않는다.
- 불확실하면 `rawSpecs.note`에 남긴다.
- Finder에 필요한 `basicFilters`를 먼저 채운다.
- Compare에 필요한 detail/spec copy는 후속 보강한다.
- 광고/제휴는 Finder/Compare 추천 순서와 분리한다.
- 실제 route가 없으면 sitemap에 넣지 않는다.
- 제품 데이터 수정 후에는 snapshot, lint, build, Finder/Compare QA를 함께 진행한다.
