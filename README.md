# SetupRadar (v0.5B - Product Card UX Review)

## 🤖 AI 작업자 운영 규칙 (Gemini / Codex 공통)

> [!IMPORTANT]
> 본 프로젝트는 **Gemini와 Codex**를 번갈아 가며 작업하는 환경입니다. 컨텍스트가 단절되거나 작업이 꼬이지 않도록 모든 AI 작업자는 반드시 아래 운영 규칙을 엄격히 준수해야 합니다.

1. **작업 전 필수 절차**:
   - `git status`를 확인하여 이전 작업 상태를 점검합니다.
   - [README.md](file:///Users/jilee/antigravity/src/project7/README.md), [AGENTS.md](file:///Users/jilee/antigravity/src/project7/AGENTS.md), [PROJECT7_WORK_LOG.md](file:///Users/jilee/antigravity/src/project7/PROJECT7_WORK_LOG.md)를 먼저 일독하여 진행 맥락을 확실히 파악합니다.
2. **작업 중 제한 사항**:
   - **기능 추가는 명시적인 요청이 있을 때만** 수행합니다. 임의로 기능을 추가하거나 대규모 UI 리디자인을 하지 않습니다.
   - Supabase/API/DB/n8n 연동 등 외부 아키텍처는 명시적 지시 없이 추가하지 않습니다.
   - 제품 설명, 마우스 쉘 체감 레퍼런스 노출 시 절대적인/단정적 표현이나 법적 위험이 있는 단어(예: 카피쉘, 짭)를 배제합니다.
3. **작업 후 필수 절차**:
   - 로컬에서 반드시 `npm run lint`와 `npm run build`를 실행하여 정적 빌드에 이상이 없는지 확인합니다.
   - [PROJECT7_WORK_LOG.md](file:///Users/jilee/antigravity/src/project7/PROJECT7_WORK_LOG.md)에 오늘 날짜와 함께 변경 사항을 소상히 기록합니다.
   - 변경된 파일 목록 및 검수 결과를 포함한 인수인계 양식에 맞춰 유저에게 최종 완료 보고를 수행합니다.
4. **제품 신뢰성 제어 정책 (Product Trust Guard)**:
   - **쉘 레퍼런스 화면 노출**: 마우스 쉘 체감 레퍼런스(`shellReferences`)는 엄격한 검수 조건(`editorNoteKo` 존재, confidence medium/high 등)을 충족하는 검증 완료 데이터만 화면에 노출합니다. AI 초안 단계의 데이터는 노출하지 않고 안전히 차단합니다.
   - **제품 이미지 권장 스키마**: 제품 이미지의 저작권 및 핫링크 리스크에 철저히 대비하기 위해 `sourceType`과 `status`를 기반으로 한 검증 체계를 운영합니다. 실사용 이미지는 임의 노출하지 않습니다.
   - **가격 링크 및 최저가 제어**: 복잡도가 높은 실시간 가격 트래커나 크롤링을 피하고, 단순 안전 구조의 “가격 확인 링크” 스키마를 통해 외부 변동 리스크를 차단합니다.

## 📍 주요 경로 (Routes)
- 한국어 기본 경로: `/kr`
- 도구 목록: `/kr/tests`
- 구매 가이드: `/kr/guides`
- 장비 찾기: `/kr/finder/mouse-fit`
- 키보드 배열/스위치: `/kr/finder/keyboard-fit`

## 🗂 Repository
- GitHub repo name: `project7_setupradar`
- 이전 `setupradar` 이름에서 Project7 식별이 더 명확한 이름으로 정리했습니다.

PC 하드웨어(마우스, 키보드, 모니터) 진단 및 구매 가이드를 제공하는 정적 웹 플랫폼입니다.

## 🚀 프로젝트 목표
- **사용자 중심 진단**: 복잡한 소프트웨어 설치 없이 브라우저에서 즉시 하드웨어 상태 체크.
- **초보자 가이드**: IT 전문 용어를 최소화하고 구매 결정에 직결되는 핵심 정보 제공.
- **가볍고 빠른 서비스**: Next.js App Router 기반의 완전 정적 사이트로 서버 비용 0원 및 고속 로딩 실현.

## 📂 콘텐츠 관리 (Content Architecture)
SetupRadar는 운영 효율성을 위해 하이브리드 콘텐츠 구조를 사용합니다.
- **AI-Human 하이브리드**: `src/content/` 내 데이터는 AI 생성 초안(`ai`)과 운영자 교정본(`editor`)으로 분리 관리됩니다.
- **편집 가이드**: 상세한 데이터 수정 방법은 [docs/content-editing-guide.md](file:///Users/jilee/antigravity/src/project7/docs/content-editing-guide.md)를 참고하세요.
- **WebUI 작업대**: Project99 Control Tower를 통한 시각적 편집을 위해 [docs/content-copy-workbench.kr.json](file:///Users/jilee/antigravity/src/project7/docs/content-copy-workbench.kr.json)을 제공합니다.

## ✅ 주요 업데이트 내역
### v0.5B - Product Card UX Review (Current)
- **Finder 결과 카드 품질 점검**: Mouse Finder와 Keyboard Finder 결과 카드의 정보 위계와 문구 톤을 점검하고, 과하게 마케팅처럼 읽히는 키보드 제품 문구를 최소 보정했습니다.
- **쉘 레퍼런스 노출 안전성 유지**: Mouse Finder의 쉘 체감 레퍼런스는 `editorNoteKo`가 있는 검수 항목만 작고 조용하게 표시하도록 유지했습니다.
- **미노출 정책 유지**: 내부 `status`, `productImages`, `productLinks`는 사용자 화면에 표시하지 않으며, 제품 상세/비교/가격 링크는 후속 작업으로 보류합니다.

### v0.5A - DB Schema Planning
- **DB화 전 설계 문서 추가**: 향후 Supabase 등 DB로 제품 데이터를 옮길 때 필요한 테이블 초안을 [docs/db-schema-plan.md](file:///Users/jilee/antigravity/src/project7/docs/db-schema-plan.md)에 정리했습니다.
- **정적 TS 구조와 DB 매핑 정리**: `products`, `product_locales`, `product_basic_filters`, `product_advanced_filters`, `product_detail_specs`, `product_raw_specs`, `product_shell_references`, `product_images`, `product_links`, `switch_entries`, `content_pages` 후보를 현재 `src/content` 구조와 연결했습니다.
- **구현 금지선 유지**: 이번 버전은 실제 Supabase 연결, API route, SQL migration, 제품 데이터 수정, Finder/UI 변경 없이 설계 문서만 추가한 단계입니다.

### v0.4E - Product Trust Guard
- **쉘 레퍼런스 노출 조건 극대화**: `editorNoteKo`가 존재하고, `confidence`가 `medium` 또는 `high`이며, `sourceHint`가 `unknown`이 아닌 신뢰할 수 있는 레퍼런스만 선별 렌더링하도록 노출 조건을 대폭 강화했습니다. 조건에 맞는 항목이 없으면 "쉘 체감 레퍼런스" 영역 전체를 완전히 숨겨 깔끔한 카드 가독성을 유지합니다.
- **이미지 및 가격 링크 타입 설계**: 향후 이미지 및 가격 아웃링크 추가에 대비하여 `BaseContent` 등에 `productImages` 및 `productLinks` optional 스키마를 준비했습니다. 이번 버전에서는 실제 데이터 주입 및 화면 노출을 제한하여 비즈니스/법적 리스크를 미연에 방지합니다.
- **제품 신뢰성 관리 정책 수립**: 이미지 저작권 및 가격 수집, 쉘 레퍼런스 검수 과정에 대한 신뢰성 제어 정책을 `README.md` 및 `PROJECT7_WORK_LOG.md`에 명문화하였습니다.

### v0.4D - Mouse Shell Reference Display
- **쉘 체감 레퍼런스 노출**: Mouse Finder 결과 카드 하단에 마우스의 `shellReferences` 데이터를 노출하는 "쉘 체감 레퍼런스" 영역을 적용했습니다.
- **체계적인 fallback 텍스트 처리**: `editorNoteKo || aiNoteKo` 문장을 우선 노출하고, 없을 경우 `relationType`과 `confidence` 조합 규칙에 맞게 매끄러운 추천 설명글을 자동 실시간 조립하는 견고한 데이터 fallbacks를 갖추었습니다.
- **작고 조용한 톤앤매너**: 기존 다크/라이트 테마의 디자인 흐름을 지키며, 옅은 백그라운드와 얇은 테두리 및 작은 크기의 서브 설명용 회색 텍스트(small/muted style)를 채택하여 결과 카드의 원래 가독성과 위계를 전혀 헤치지 않도록 깔끔하게 설계했습니다.
- **금지 표현 절대 배제 원칙**: 법적/비즈니스적 리스크가 있는 “카피쉘”, “배꼈다”, “짭”, “표절”, “원본 쉘” 등의 부정적/직관적 단어 사용을 완벽하게 방지하였습니다.

### v0.4C - Sample Data QA
- **Finder QA**: 마우스/키보드 샘플 10개 데이터가 Finder에서 기존 published 제품과 신규 review 샘플을 함께 후보로 보여주는지 점검했습니다.
- **review 노출 기준**: 현재 샘플 데이터 QA 단계에서는 `status: "review"` 제품도 Finder 결과에 노출될 수 있습니다. 내부 상태값은 사용자 화면에 표시하지 않습니다.
- **shellReferences 보존**: 쉘 레퍼런스는 아직 화면에 표시하지 않고, 추후 제품 카드/상세/비교 확장을 위한 데이터로만 보존합니다.
- **문구 완화**: Finder 결과에 직접 보일 수 있는 과장 표현을 참고용 톤으로 일부 완화했습니다.

### v0.4B - Sample Product Data Pack
- **DB화 전 리허설**: 마우스, 키보드, 스위치/축 샘플 데이터를 각각 총 10개 수준으로 보강해 `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs` 구조를 검증합니다.
- **review 상태 유지**: 신규 샘플은 모두 `status: "review"`로 두고, 운영자 교정 전 참고용 초안으로 관리합니다.
- **Finder 검증용 basicFilters**: 신규 마우스/키보드 샘플에는 Finder가 읽을 수 있는 `basicFilters`를 필수로 입력했습니다.
- **정적 운영 유지**: 구매 링크, 가격 추적, 제품 이미지, Supabase/API/DB/n8n 연동은 추가하지 않았습니다.

### Keyboard Product Filter Simplification
- **기본 필터 5개 원칙**: 키보드 제품 필터는 배열, 연결 방식, 키감/축 느낌, 소음, 가격대까지만 기본 노출하는 구조로 정리했습니다.
- **더보기 필터 분리**: 게이밍 기능, 멀티기기, 키캡, 하우징, 백라이트, 무게감은 선택형 더보기 필터로 분리합니다.
- **상세 스펙 분리**: 키압 세부값, 매크로, 응답속도, 블루투스 버전, 배터리, 엔터키 형태, 각인 위치, 케이블 재질, 구성품, PS2, 스텝스컬쳐, 윈도우 키 잠금, 세부 크기는 상세 스펙 또는 원본 스펙으로 보관합니다.
- **초보자 우선**: 다나와식 전체 스펙 필터를 그대로 노출하지 않고 구매 판단에 필요한 조건만 먼저 보여줍니다.

### Mouse Product Filter & Shell Reference Simplification
- **기본 필터 5개 원칙**: 마우스 제품 필터는 형태, 무게감, 연결 방식, 크기감, 가격대까지만 기본 노출하는 구조로 정리했습니다.
- **더보기 필터 분리**: 게이밍 성능, 버튼 수, 코팅/그립감, 스위치 성향, 배터리/충전은 선택형 더보기 필터로 분리합니다.
- **상세 스펙 분리**: 센서, DPI, IPS, 가속도, 폴링레이트, 블루투스 버전, 보증기간, 세부 크기값 등은 기본 필터가 아니라 상세 스펙 또는 원본 스펙으로 보관합니다.
- **쉘 체감 레퍼런스**: 유사 쉘 계열, 자주 비교되는 쉘, 쉘 체감 레퍼런스 정보를 `shellReferences`에 보관할 수 있습니다.
- **표현 원칙**: 법적/표현 리스크를 줄이기 위해 카피/표절성 표현 대신 손에 닿는 형태가 비슷하다는 반응, 비교 기준으로 삼기 좋음 같은 표현을 사용합니다.

### v0.3F - Visual Editing Workbench Ready (Current)
- **시각형 문구 수정 작업대**: Project99 Control Tower의 `/projects/project7/content`에서 SetupRadar 화면처럼 보이는 mock preview를 보며 문구를 클릭하고 수정안을 작성할 수 있습니다.
- **수동 반영 원칙 유지**: 작업대 수정안은 localStorage와 export 파일로만 관리되며, 실제 사이트 반영은 Codex/Gemini가 `src/content`의 `editor` 필드에 옮긴 뒤 Git push와 Cloudflare Pages 배포로 진행합니다.
- **실시간 DB 수정 없음**: Supabase/API/n8n 없이 정적 사이트 구조를 유지합니다. 실제 문구 수정은 yulxwell이 별도 루프에서 진행합니다.

### v0.3A - Control Tower Workbench Integration
- **JSON 작업대 도입**: Markdown 기반 검토를 넘어, Control Tower WebUI에서 읽을 수 있는 구조화된 JSON 작업대(`docs/content-copy-workbench.kr.json`)를 추가했습니다.
- **Project99 연동 설계**: Control Tower에서 SetupRadar의 문구를 섹션별로 필터링하고 수정안을 작성한 뒤 JSON으로 추출(Export)하는 흐름을 구축했습니다.
- **수동 반영 원칙 유지**: 실제 코드 수정은 추출된 JSON을 기반으로 Codex/Gemini가 수행하며, 사이트의 완전 정적 아키텍처와 `ai*` 필드 보존 원칙을 유지합니다.

### v0.2.8 - Finder Compact UX Hotfix
- **Finder compact layout 적용**: Mouse Finder와 Keyboard Finder의 큰 카드형 선택지를 compact chip 중심 UI로 줄였습니다.
- **첫 화면 정보 밀도 개선**: 데스크톱 기준 주요 선택 항목을 한 화면에서 빠르게 훑어볼 수 있도록 여백과 카드 높이를 줄였습니다.
- **Mouse Finder 불편함 질문 정리**: "현재 불편한 점"을 별도 질문에서 제거하고, 손목 피로/선 걸림/크기 부담 설명을 각 선택지 helper text에 녹였습니다.
- **메인 페이지 노출 낮춤**: Finder를 필수 흐름이 아닌 보조 CTA로 낮추고, 테스트 도구보다 크게 보이지 않도록 정리했습니다.
- **옵션 파일 유지**: Finder 문구와 선택지는 계속 `src/content/kr/finder/*Options.ts`에서 관리합니다.

### v0.2.7 - Finder UX Refactor
- **Finder 단일 페이지화**: Mouse Finder와 Keyboard Finder를 단계형 마법사에서 한 화면 필터형 UX로 단순화했습니다.
- **초보자 회피 선택지 강화**: 주요 선택 항목에 "상관없음", "잘 모르겠음"을 추가해 조건을 몰라도 추천 결과를 볼 수 있도록 했습니다.
- **Mouse Finder 질문 축소**: FPS/MOBA 등 장르 중심 질문을 제거하고 손 크기, 형태, 불편함, 무게, 연결 방식 중심으로 정리했습니다.
- **Keyboard Finder 시각화 정리**: 품질이 낮은 배열 다이어그램을 제거하고 텍스트 배지와 한 줄 설명 중심으로 대체했습니다.
- **Finder 옵션 분리**: 운영자가 문구와 선택지를 수정하기 쉽도록 `src/content/kr/finder/` 아래 옵션 config 파일로 분리했습니다.
- **소프트 매칭 유지**: 누락 조건은 무시하고 가능한 조건만 점수화해 참고용 추천 결과 3개를 표시합니다.

### v0.2.6 - Finder Logic Refinement
- **Mouse Finder 파지법 제거**: 초보자가 이해하기 어려운 팜/클로/핑거 그립 파지법 질문을 제거하고, 대신 "마우스 형태 선호(대칭/비대칭)" 질문을 도입하여 직관성을 높였습니다.
- **추천 로직 고도화**: 그립법 기준 필터링에서 `shapeType`(Symmetrical/Ergonomic) 기반 가산점 방식으로 로직을 전환하여 더 정확한 제품 추천을 제공합니다.
- **Keyboard Finder 레이아웃 시각화 강화**: 75%, 65%, 60% 등 구분이 어려운 미니 배열들을 CSS Grid 기반의 정교한 다이어그램으로 재구성하여 시각적 차이를 극대화했습니다.

### v0.2.5 - Detail Hotfix & UX Polish
- **Mouse Finder 개편**: 기존 3단계에서 6단계 정밀 마법사로 리뉴얼. 손 크기, 불편함(손목 통증), 무게, 연결 방식 등을 우선순위에 배치하여 초보자 대응 강화.
- **Keyboard Finder 시각화**: 배열 선택 단계에서 실제 키보드 크기를 직관적으로 알 수 있는 레이아웃 배지/아이콘 시스템 도입. 60% 배열 추가.
- **콘텐츠 아키텍처 안정화**: `BaseContent` 인터페이스 강화를 통해 제품/스위치 데이터의 타입 안전성 확보 및 브랜드 미지정 제품 예외 처리.

### v0.2.3 - Text Quality & Switch Database
- **초보자 중심 텍스트 개선**: 모든 가이드 및 진단 문구를 구매 판단을 돕는 '초보자 친화적' 문체로 리뉴얼.
- **키보드 스위치 사전 구축**: '아이스크림축', '말차축' 같은 감성 네이밍 축을 실제 체감 기준으로 분류하는 데이터 구조(`KeyboardSwitch`) 추가.
- **스위치 가이드 페이지 신설**: `/kr/switches` 경로를 통해 복잡한 스위치 정보를 한눈에 확인 가능.

### v0.2.1 - Design System Hotfix
- **테마 시스템 고도화**: 모든 테스트 및 가이드 컴포넌트가 CSS 변수(`--primary`, `--accent` 등)를 사용하도록 표준화.
- **UI 일관성 확보**: 하드코딩된 색상을 제거하고 라이트/다크 모드에 최적화된 전문적인 디자인 톤 적용.

## 📦 배포 가이드 (Cloudflare Pages)
본 프로젝트는 완전 정적 사이트(Static Site Generation)로 구성되어 있으며, **Cloudflare Pages** 배포를 기준으로 운영됩니다.

콘텐츠와 Finder 옵션은 브라우저에서 실시간으로 수정되는 구조가 아닙니다. 파일을 수정한 뒤 Git에 커밋/푸시하면 Cloudflare Pages 빌드가 실행되고 정적 산출물이 배포됩니다.

### Cloudflare Pages 설정
1. Cloudflare 대시보드에서 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git** 선택.
2. 빌드 설정:
   - **Framework preset**: `Next.js` 또는 `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`

## 🛠 아키텍처 제약 사항 (Strict Restrictions)
- **No Database/API**: Supabase 포함 모든 외부 DB 및 서버 API 사용 없음.
- **No Dynamic Data**: 실시간 최저가 크롤링, 외부 상품 DB 연동 없음.
- **No User System**: 회원가입, 로그인, 개인 데이터 서버 저장 없음.
- **No Environment Variables**: 배포 시 별도의 환경 변수 설정이 필요하지 않음.

## 📝 배포 전 체크리스트
- [x] `npm run build` 오류 없이 완료 여부 (`out` 폴더 생성 확인)
- [x] 모든 테스트 페이지 하단에 Disclaimer(면책 문구) 포함 여부
- [x] 모바일 브라우저에서 전체화면 진입 및 색상 전환 정상 작동 확인
- [x] '시작하기' 등 주요 CTA 버튼의 시인성 확보
