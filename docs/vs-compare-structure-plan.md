# Project7 VS Compare Structure Plan

Last updated: 2026-06-07 Mouse Compare Mock 1

Scope: structure planning, compare main mock, and first mouse compare detail mock only. No automatic compare engine, CPU/GPU data, product data update, Finder logic change, ad/affiliate code, Project2 integration, RSS/API/DB/Supabase, crawler, GA4/Search Console structure, Control Tower, package, or domain changes.

## 0. 진행 상태

- Phase 0 문서화 완료.
- Phase 1 `/kr/compare` 메인 mock 완료.
- Phase 2 첫 mouse compare mock으로 `/kr/compare/mouse/lamzu-maya-vs-zowie-u2` 상세 페이지를 추가했다.
- 현재 `/kr/compare`는 비교 카테고리 카드와 첫 마우스 비교 상세 링크를 제공한다.
- 자동 비교기, CPU/GPU 데이터, 제품 데이터 기반 비교 로직은 아직 만들지 않았다.

## 1. VS Compare의 목적

Project7 SetupRadar의 다음 성장축은 단순한 테스트 도구와 구매 가이드를 넘어, 사용자가 장비를 고르기 직전에 참고할 수 있는 **장비 선택 비교**를 제공하는 것이다.

- 테스트 도구: 사용 중인 장비의 의심 증상과 설정 상태를 참고용으로 확인한다.
- Finder: 손 크기, 배열, 소음, 연결 방식 같은 조건으로 후보를 좁힌다.
- VS Compare: 후보 2개 또는 장비 기준 2개를 놓고, 구매 직전 판단에 필요한 차이를 초보자 기준으로 해석한다.

VS Compare는 벤치마크 수치를 복제하는 페이지가 아니다. 핵심 가치는 “어떤 상황에서 무엇을 확인해야 하는지”를 설명하는 것이다. CPU/GPU처럼 수치와 세대가 중요한 영역도 단순 점수 순위보다 호환성, 플랫폼, 전력, 발열, 업그레이드 경로, 사용 목적별 해석을 우선한다.

## 2. 비교 카테고리

초기 후보 카테고리:

- `mouse-vs-mouse`
- `keyboard-vs-keyboard`
- `monitor-vs-monitor`
- `cpu-vs-cpu`
- `gpu-vs-gpu`
- `ram-vs-ram`
- `setup-vs-setup`

우선순위:

1. `mouse-vs-mouse`
2. `keyboard-vs-keyboard`
3. `monitor-vs-monitor`
4. `cpu-vs-cpu`
5. `gpu-vs-gpu`

우선순위 이유:

- 마우스와 키보드는 이미 `src/content/kr/products`의 정적 제품 데이터, Finder 기준, 구매 전 체크 문구와 연결하기 쉽다.
- 모니터는 테스트 도구와 가이드가 있어 비교 기준을 만들기 쉽지만, 제품 데이터는 아직 별도 준비가 필요하다.
- CPU/GPU는 정보 오류, 세대 변경, 벤치마크 출처, 호환성 해석 리스크가 크므로 별도 검증 구조가 필요하다.

## 3. URL 구조 후보

이번 작업에서는 실제 route를 생성하지 않는다. 아래는 장기 URL 설계 후보만 기록한다.

- `/kr/compare`
- `/kr/compare/mouse`
- `/kr/compare/keyboard`
- `/kr/compare/monitor`
- `/kr/compare/cpu`
- `/kr/compare/gpu`
- `/kr/compare/mouse/razer-viper-v4-pro-vs-lamzu-maya`
- `/kr/compare/keyboard/aula-f75-vs-nuphy-halo75-v2`
- `/kr/compare/cpu/i9-14900ks-vs-ryzen-7-9800x3d`

운영 규칙:

- 실제 존재하지 않는 비교 상세 URL은 sitemap에 넣지 않는다.
- 비교 상세 slug는 제품명 표기 변경 가능성을 고려해 소문자 영문, 숫자, 하이픈 중심으로 둔다.
- CPU/GPU 상세 URL은 공식 스펙과 검증 출처 기준이 준비되기 전까지 생성하지 않는다.

## 4. 공통 비교 데이터 구조

비교 콘텐츠는 정적 데이터 기반으로 시작하는 것을 우선 검토한다. 초기에는 별도 DB 없이 `src/content/kr/compare` 같은 폴더를 후보로 둘 수 있다.

공통 필드 후보:

```ts
type CompareCategory =
  | "mouse-vs-mouse"
  | "keyboard-vs-keyboard"
  | "monitor-vs-monitor"
  | "cpu-vs-cpu"
  | "gpu-vs-gpu"
  | "ram-vs-ram"
  | "setup-vs-setup";

type CompareStatus = "draft" | "review" | "published";

interface CompareContent {
  id: string;
  slug: string;
  locale: "kr";
  category: CompareCategory;
  titleKo: string;
  summaryKo: string;
  itemA: CompareItem;
  itemB: CompareItem;
  comparisonPoints: ComparePoint[];
  beginnerSummaryKo: string;
  strengthsA: string[];
  strengthsB: string[];
  cautionsA: string[];
  cautionsB: string[];
  whoShouldChooseA: string[];
  whoShouldChooseB: string[];
  checkBeforeBuying: string[];
  relatedGuides: RelatedGuideLink[];
  status: CompareStatus;
  sourcesNote: string;
  lastReviewedAt: string;
}
```

필드 운영 기준:

- `itemA`, `itemB`는 기존 제품 데이터 id를 참조할 수 있으면 참조하고, CPU/GPU처럼 별도 데이터가 필요한 영역은 새 검증 구조가 준비된 뒤 사용한다.
- `comparisonPoints`는 수치 우열보다 “확인해야 할 차이” 중심으로 작성한다.
- `sourcesNote`에는 공식 스펙, 제조사 안내, 판매처 옵션, 벤치마크 출처 여부를 구분해 적는다.
- `status`가 `published`가 아닌 콘텐츠는 공개 페이지와 sitemap에 넣지 않는다.

## 5. 마우스 비교 구조

마우스 비교는 Project7이 가장 먼저 검증하기 좋은 비교 영역이다. Finder 데이터와 구매 가이드가 이미 있고, 초보자가 체감하는 차이를 설명하기 쉽다.

비교 항목:

- 쉘 형태
- 크기와 손 크기
- 무게
- 센서와 폴링레이트
- 클릭감과 스위치 성향
- 코팅과 그립감
- 배터리와 충전 방식
- 소프트웨어 편의성
- AS와 국내 구매 접근성
- 가격대는 확정하지 않고 판매처 확인 안내

예시 콘텐츠 후보:

- `Razer Viper V4 Pro vs 중국계 초경량 대칭형 마우스`
- `Logitech G Pro X Superlight 계열 vs ATK/Lamzu/Pulsar 계열`

표현 안전 규칙:

- `카피쉘`, `짭`, `표절`, `원본 쉘`, `동일 쉘`, `완전히 같다` 같은 표현을 쓰지 않는다.
- “비슷한 체감으로 언급됨”, “쉘 체감 참고”, “자주 비교되는 쉘 계열”, “비교 기준으로 볼 수 있음” 정도로 완화한다.
- 쉘 형태가 비슷해 보여도 클릭부 높이, 등 높이, 허리 폭, 코팅, 무게중심에 따라 체감이 달라질 수 있음을 안내한다.

## 6. CPU 비교 구조

CPU 비교는 단순 벤치마크 수치 중심으로 가지 않는다. 초보자가 실제 구매 전 헷갈리는 호환성, 플랫폼, 전력, 발열, 업그레이드 경로를 먼저 설명한다.

비교 항목:

- 출시년도
- 세대와 아키텍처
- 소켓
- 메인보드 플랫폼
- DDR4/DDR5 호환 여부
- 코어와 스레드
- 기본 전력과 발열 부담
- 쿨러 요구 수준
- 게임 성능 경향
- 작업 성능 경향
- X3D/3D V-Cache 여부
- 내장그래픽 여부
- 업그레이드 경로
- 중고/신품 구매 시 주의점
- 병목이 적은 GPU 조합은 확정하지 않고 “급”으로만 안내

예시 후보:

- `i9-14900KS vs Ryzen 7 9800X3D`

초보자 설명 방향:

- `i9-14900KS`는 고클럭, 높은 전력 사용, 작업 성능에서 강점을 보일 수 있으나 발열과 쿨링 부담을 함께 봐야 한다.
- `Ryzen 7 9800X3D`는 3D V-Cache 구조 덕분에 게임에서 강점을 보이는 경우가 많지만, 모든 게임과 모든 환경을 한 문장으로 판단하지 않는다.
- DDR4/DDR5 호환은 CPU 이름만으로 결정하지 않고 메인보드 플랫폼, 칩셋, BIOS, 메모리 QVL을 함께 확인해야 한다.
- CPU 병목은 게임, 해상도, 그래픽카드, 프레임 목표, 그래픽 옵션에 따라 달라진다.
- “이 CPU면 어떤 GPU까지 병목 없음”처럼 쓰지 않고 “일반적으로 함께 검토할 만한 GPU 급” 정도로 표현한다.

금지 기준:

- 병목 없음 확정
- 무조건 게임 최강
- 완벽한 조합
- 모든 게임에서 우세
- 벤치마크 수치 무단 복제
- 출처 없는 수치 단정

## 7. GPU 비교 구조

GPU 비교는 성능 수치보다 사용 해상도, 전력, VRAM, 업스케일링 기능, 케이스와 파워 조건을 함께 설명해야 한다.

비교 항목:

- 출시 세대
- VRAM
- 전력
- 해상도 목표
- DLSS/FSR/프레임 생성
- 레이트레이싱
- 권장 파워
- 케이스 크기
- CPU 병목 가능성
- 중고 구매 주의점

운영 기준:

- 벤치마크 수치를 직접 복제하지 않는다.
- 수치가 필요하면 출처 링크, 테스트 환경, 참고 문구를 함께 둔다.
- “4K용”, “QHD용” 같은 표현도 게임과 옵션에 따라 달라질 수 있음을 같이 적는다.

## 8. RAM 비교 구조

RAM 비교는 DDR4/DDR5 세대 차이와 플랫폼 호환성을 먼저 설명한다.

비교 항목:

- DDR4/DDR5
- 용량
- 클럭
- 램타이밍
- 플랫폼 호환성
- 게임/작업 체감
- 업그레이드 경로

운영 기준:

- 메인보드가 지원하지 않는 메모리는 장착할 수 없다는 점을 명확히 안내한다.
- 체감 차이는 CPU, 메인보드, 게임/작업 종류, 듀얼채널 구성에 따라 달라질 수 있다.

## 9. 비교 콘텐츠 톤

VS Compare는 제품 하나를 정답처럼 밀어주는 페이지가 아니다. 비교의 목적은 사용자가 자신의 환경에서 무엇을 확인해야 하는지 알게 하는 것이다.

권장 톤:

- “정답”보다 “사용 목적에 따라 다름”
- “초보자 기준”
- “구매 전 확인”
- “판매처/제조사 스펙 확인”
- “벤치마크 수치는 측정 환경에 따라 다름”
- “호환성은 메인보드/BIOS/메모리 QVL 확인 필요”

피해야 할 톤:

- 특정 제품을 구매하도록 압박하는 문구
- 제품 우열을 한 문장으로 단정하는 문구
- 출처 없는 수치 비교
- 제휴 링크가 비교 결론에 영향을 주는 것처럼 보이는 구조

## 10. Project2 연동 방향

장기적으로 Project7과 Project2의 역할은 분리하는 편이 안전하다.

- Project7: 비교 기준, 선택 도구, 테스트 도구, Finder, 구매 전 체크를 제공한다.
- Project2: 핫딜, 제품 소개, 뉴스 본문, 구매처 정보 후보를 담당할 수 있다.
- Project7 비교 페이지 하단에는 Project2 관련 글 preview를 노출하는 구조를 장기 후보로 둔다.
- 실제 링크프라이스/쿠팡파트너스 링크는 Project2 쪽에서 먼저 관리하는 방향이 안전하다.
- Project7은 초반에는 내부 가이드, 비교 기준, Finder 연결 중심으로 유지한다.

운영 주의:

- 이번 단계에서는 Project2 실제 연동을 하지 않는다.
- Project2 preview가 들어가더라도 공개 상태, 광고·제휴 고지, 링크 상태를 검수한 글만 노출한다.

## 11. 구현 단계 로드맵

### Phase 0: 문서화

- VS Compare 목적, URL 후보, 데이터 구조, 안전 규칙을 문서화한다.
- 실제 route와 UI는 만들지 않는다.

### Phase 1: `/kr/compare` 메인 mock

- 비교 카테고리 카드만 표시한다.
- 실제 비교 상세는 만들지 않는다.
- sitemap에는 실제 route가 생긴 뒤에만 반영한다.
- 2026-06-07 Compare Main Mock 1에서 `/kr/compare` 메인 route와 sitemap 반영을 완료했다.
- 상세 비교 URL은 아직 만들지 않았고 sitemap에도 넣지 않았다.

### Phase 2: Mouse compare mock 1개

- 기존 마우스 데이터 일부를 재사용한다.
- 쉘, 무게, 연결, 클릭감, 배터리, 주의점 중심으로 구성한다.
- 가격은 판매처 기준 확인 안내만 둔다.
- 2026-06-07 Mouse Compare Mock 1에서 `Lamzu Maya vs Zowie U2` 첫 상세 비교 route를 추가했다.
- 이 mock은 page 내부 정적 구조로만 작성했고, 새 제품 데이터나 자동 비교 엔진은 만들지 않았다.

### Phase 3: Keyboard compare mock 1개

- 배열, 스위치 성향, 소음, 연결, 핫스왑, 하우징, OS 호환성 중심으로 구성한다.
- Finder 추천 로직과 별도로 표시용 비교만 만든다.

### Phase 4: CPU compare schema 설계

- 실제 CPU 데이터는 공식 스펙과 검증 출처 기준으로 별도 관리한다.
- 벤치마크 수치 복제 없이 플랫폼, 호환성, 전력, 발열, 업그레이드 경로를 먼저 설계한다.

### Phase 5: Project2 preview 연동 구조 검토

- 비교 상세 하단에 Project2 관련 글 preview를 둘지 검토한다.
- 실제 제휴 링크, 광고 고지, 외부 링크 정책은 Project2 운영 기준과 함께 확인한다.

## 12. 리스크

- CPU/GPU 데이터 오류 리스크
- 벤치마크 수치 저작권/출처 리스크
- 특정 브랜드 편향 리스크
- 제휴 링크가 추천 순서나 비교 결론에 영향을 주는 것처럼 보일 리스크
- 데이터 업데이트 부담
- 너무 많은 카테고리 확장으로 운영 피로도 증가
- 기존 Finder와 비교 콘텐츠의 역할이 겹쳐 사용자가 헷갈릴 리스크
- 실제 구현 전 sitemap이나 내비게이션에 미구현 URL이 노출될 리스크

## 13. 운영 원칙

- 처음부터 CPU/GPU까지 구현하지 않는다.
- 먼저 `mouse-vs-mouse`로 비교 UX를 검증한다.
- 벤치마크 수치는 직접 복제하지 않는다.
- 수치가 필요한 경우 출처 링크와 “참고” 문구를 둔다.
- 초보자 해석과 구매 전 확인 기준을 핵심 가치로 둔다.
- 실제 비교 콘텐츠는 `draft`, `review`, `published` 상태를 가진다.
- `published` 상태가 아닌 비교 콘텐츠는 공개 route, sitemap, 메인 preview에 넣지 않는다.
- 제품 데이터나 Finder 추천 점수와 비교 결론을 자동으로 연결하지 않는다.
- 광고/제휴 링크가 있는 콘텐츠와 없는 콘텐츠가 비교 결론에 영향을 주지 않도록 한다.
