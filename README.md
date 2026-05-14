# SetupRadar (v0.2.5 - Content Infrastructure & Detail Hotfix)

## 📍 주요 경로 (Routes)
- 한국어 기본 경로: `/kr`
- 도구 목록: `/kr/tests`
- 구매 가이드: `/kr/guides`
- 장비 찾기: `/kr/finder/mouse-fit`
- 키보드 배열/스위치: `/kr/finder/keyboard-fit`

PC 하드웨어(마우스, 키보드, 모니터) 진단 및 구매 가이드를 제공하는 정적 웹 플랫폼입니다.

## 🚀 프로젝트 목표
- **사용자 중심 진단**: 복잡한 소프트웨어 설치 없이 브라우저에서 즉시 하드웨어 상태 체크.
- **초보자 가이드**: IT 전문 용어를 최소화하고 구매 결정에 직결되는 핵심 정보 제공.
- **가볍고 빠른 서비스**: Next.js App Router 기반의 완전 정적 사이트로 서버 비용 0원 및 고속 로딩 실현.

## 📂 콘텐츠 관리 (Content Architecture)
SetupRadar는 운영 효율성을 위해 하이브리드 콘텐츠 구조를 사용합니다.
- **AI-Human 하이브리드**: `src/content/` 내 데이터는 AI 생성 초안(`ai`)과 운영자 교정본(`editor`)으로 분리 관리됩니다.
- **편집 가이드**: 상세한 데이터 수정 방법은 [docs/content-editing-guide.md](file:///Users/jilee/antigravity/src/project7/docs/content-editing-guide.md)를 참고하세요.

## ✅ 주요 업데이트 내역
### v0.2.5 - Detail Hotfix & UX Polish (Current)
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
