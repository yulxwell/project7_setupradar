# PROJECT7_WORK_LOG.md

SetupRadar project7 작업 채팅용 운영 로그입니다. 이 문서는 v0.1.1부터 v0.5D까지의 작업 이력, 운영 원칙, 금지 사항, 그리고 다음 작업 후보를 한곳에 모아 이후 작업자가 같은 맥락에서 이어서 작업할 수 있도록 유지합니다.

## 현재 상태

- 현재 버전: `v0.5D - Product Detail UX Plan`
- 다음 후보 버전: `v0.5E - Product Detail Panel Mock 검토`
- 프로젝트 성격: PC 하드웨어 진단 및 구매 가이드용 정적 웹사이트
- 주요 경로:
  - `/kr`
  - `/kr/tests`
  - `/kr/guides`
  - `/kr/finder/mouse-fit`
  - `/kr/finder/keyboard-fit`
  - `/kr/switches`
- 배포 기준: Cloudflare Pages 정적 배포, `npm run build`, 출력 디렉터리 `out`

## 작업 이력

### v0.1.1 - Initial Setup

- Next.js 기반 SetupRadar 초기 구조를 생성했다.
- 한국어 하드웨어 진단 사이트의 기본 화면, 테스트 페이지, 구매 가이드 페이지를 구성했다.
- 마우스, 키보드, 모니터 관련 테스트 컴포넌트와 공통 카드/헤더/푸터 컴포넌트를 추가했다.
- 초기 정적 배포 산출물과 기본 설정 파일을 포함했다.

### v0.2.0 - Gear Finders & Stability Fixes

- 한국어 경로를 `/ko`에서 `/kr` 중심으로 정리했다.
- Mouse Finder와 Keyboard Finder를 장비 찾기 기능으로 추가했다.
- 키보드 롤오버 테스트를 추가했다.
- 마우스/키보드 제품 데이터 파일을 도입했다.
- 홈, 가이드, 테스트, Finder 화면의 경로와 CTA를 정리했다.

### v0.2.1 - Design System Hotfix

- CSS 변수 기반 테마 시스템을 정리했다.
- 라이트/다크 모드 대응을 강화했다.
- 테스트, 가이드, Finder, 카드, 헤더, 푸터의 UI 톤을 통일했다.
- 하드코딩 색상을 줄이고 `ThemeProvider`를 추가했다.

### v0.2.3 - Text Quality & Switch Database

- 초보자 친화적인 문장으로 주요 가이드와 진단 문구를 개선했다.
- 키보드 스위치 데이터 구조와 스위치 데이터베이스를 추가했다.
- `/kr/switches` 페이지를 추가해 축 종류와 체감 차이를 설명했다.
- 마우스/키보드 제품 설명의 구매 판단 기준을 보강했다.

### v0.2.4 - Content Architecture Refactor

- `src/content/` 기반 콘텐츠 구조로 전환했다.
- 가이드, 제품, 스위치, 도구, 사이트 문구를 콘텐츠 파일로 분리했다.
- `ai` 초안과 `editor` 교정본을 구분할 수 있는 하이브리드 콘텐츠 운영 구조를 만들었다.
- `getContentDisplay` 유틸을 통해 운영자 교정본이 우선 표시되도록 했다.
- 페이지 컴포넌트가 하드코딩 데이터에 덜 의존하도록 정리했다.

### v0.2.5 - Detail Hotfix & UX Polish

- Mouse Finder를 더 세밀한 6단계 마법사로 확장했다.
- 손 크기, 현재 불편함, 무게, 연결 방식, 용도, 형태 선호를 질문하도록 구성했다.
- Keyboard Finder의 배열 선택 단계에 레이아웃 배지/시각화를 추가했다.
- 60% 배열을 추가했다.
- 제품/스위치 데이터의 타입 안정성과 예외 처리를 보강했다.

### v0.2.6 - Finder Logic Refinement

- Mouse Finder에서 팜/클로/핑거 같은 파지법 질문을 제거했다.
- 마우스 형태 선호를 대칭형/오른손용 비대칭형/잘 모르겠음으로 바꾸었다.
- `shapeType` 기반 추천 로직을 추가했다.
- Keyboard Finder의 배열 그림을 CSS Grid 기반으로 재구성했다.
- 콘텐츠 편집 가이드에 형태 중심 설명 원칙을 추가했다.

## v0.2.7 문제 정의

이번 작업의 목표는 새 기능 추가가 아니라 Finder UX를 단순하고 수정 가능한 구조로 바꾸는 것이다.

현재 문제:

- Gemini가 구현한 Finder는 기능은 많지만 실제 사용자 입장에서는 무겁다.
- Mouse Finder가 단계형 마법사처럼 구성되어 한 항목을 고르고 다음으로 넘어가는 흐름이 답답하다.
- 초보자용 사이트인데 질문이 많고, "상관없음/잘 모르겠음" 선택지가 부족하다.
- 마우스에서 FPS/MOBA 같은 장르 구분은 구매 판단에 비해 과하게 강조되어 있다.
- 파지법은 이미 제거했지만 전체 Finder UX가 여전히 무겁다.
- Keyboard Finder의 배열 그림은 품질이 낮아 그대로 쓰기 어렵다.
- Finder 구현이 앞으로 운영자가 문구와 기준을 수정하기 쉽게 정리되어야 한다.

## v0.2.7 방향

### Finder UX 공통 방향

- 단계형 마법사보다 한 화면에서 빠르게 고르는 구조를 우선 검토한다.
- 질문 수를 줄이고, 구매 판단에 직접 연결되는 기준만 남긴다.
- "상관없음", "잘 모르겠음", "처음 사요" 같은 초보자 회피 선택지를 기본 옵션으로 둔다.
- 결과가 0개가 되기 쉬운 하드 필터보다 점수/가산점 방식의 소프트 매칭을 우선한다.
- 사용자가 모든 질문에 답하지 않아도 결과를 볼 수 있어야 한다.
- Finder 문구는 전문 용어 설명보다 선택 부담을 줄이는 방향으로 쓴다.

### Mouse Finder 후보

- 장르 중심 질문은 축소하거나 제거한다.
- FPS/MOBA/RPG 같은 세부 장르보다 다음 기준을 우선한다.
  - 손 크기 또는 현재 마우스가 크다/작다
  - 무게 선호 또는 상관없음
  - 유선/무선 또는 상관없음
  - 손목 편안함 필요 여부
  - 형태 선호 또는 잘 모르겠음
- "현재 불편함"은 선택형 체크리스트 또는 선택 가능한 태그로 단순화한다.
- 결과 화면은 "왜 추천됐는지"를 짧게 보여준다.

### Keyboard Finder 후보

- 배열 그림은 임시 품질로 유지하지 말고, 새 구현 전까지 과하게 믿게 만들지 않는다.
- 배열 선택은 그림 중심보다 "숫자패드 필요", "책상 공간", "방향키/F열 필요" 같은 실제 판단 기준으로 바꾼다.
- 스위치 질문에는 "잘 모르겠음/조용한 편/타건감 있음/소리 큰 편" 같은 초보자 언어를 우선한다.
- 배열 시각화는 향후 개선 시 실제 키 배치의 정확성보다 선택 판단에 도움이 되는 차이를 표현해야 한다.

## 운영 원칙

- SetupRadar는 초보자를 위한 구매 판단 도구다.
- 설명은 객관적이고 과장 없이 작성한다.
- "최고", "무조건 추천", "완벽" 같은 단정형 문구를 피한다.
- 전문 용어는 필요한 경우에만 쓰고, 바로 옆에 쉬운 설명을 붙인다.
- 제품 데이터는 운영자가 수정하기 쉬운 구조를 유지한다.
- `src/content/`의 `ai` 필드는 초안으로 보고, 최종 교정은 `editor` 필드에서 처리한다.
- 외부 API, 실시간 가격, 크롤링, 사용자 계정 없이 정적 사이트로 운영한다.
- 변경 범위가 작은 작업은 관련 파일만 수정한다.
- 문서 변경만 요청된 작업에서는 코드, 데이터, 스타일, 빌드 산출물을 수정하지 않는다.

## 금지 사항

- 새 기능 추가 금지.
- 외부 DB, Supabase, 서버 API, 로그인, 회원가입 추가 금지.
- 실시간 최저가, 상품 크롤링, 외부 상품 DB 연동 금지.
- 환경 변수 의존 기능 추가 금지.
- Finder를 더 복잡한 설문으로 확장 금지.
- Mouse Finder에 파지법 질문 재도입 금지.
- 마우스 구매 판단에서 FPS/MOBA 같은 장르 구분을 과도하게 강조 금지.
- Keyboard Finder에 품질 낮은 배열 그림을 핵심 판단 요소처럼 노출 금지.
- 운영자가 수정하기 어려운 하드코딩 문구/기준을 늘리는 작업 금지.
- 문서 작업 요청 시 코드 변경 금지.

## 다음 작업 후보

1. v0.2.7 Finder UX Refactor 설계 문서 작성
   - Mouse Finder와 Keyboard Finder의 질문 축소안을 문서로 먼저 확정한다.
   - 단계형 마법사 유지/폐지 여부를 결정한다.

2. Mouse Finder 질문 구조 단순화
   - 세부 장르 질문을 줄인다.
   - "상관없음/잘 모르겠음" 선택지를 모든 부담 큰 질문에 추가한다.
   - 결과 0개 방지를 위해 소프트 매칭 기준을 정리한다.

3. Keyboard Finder 판단 기준 재정리
   - 배열 그림 중심에서 실사용 질문 중심으로 이동한다.
   - 스위치 선택지를 초보자 언어로 바꾼다.

4. Finder 데이터/문구 분리 검토
   - 질문 문구와 선택지 텍스트를 `src/content/kr/siteCopy.ts` 또는 별도 콘텐츠 파일로 옮길지 검토한다.
   - 단, 구조 변경은 v0.2.7 구현 범위가 확정된 뒤 진행한다.

5. README와 콘텐츠 편집 가이드 동기화
   - v0.2.7 구현 후 README의 현재 버전과 업데이트 내역을 갱신한다.
   - Finder 운영 원칙을 `docs/content-editing-guide.md`에 반영할지 검토한다.

## 이번 문서 작업 기록

- `PROJECT7_WORK_LOG.md`를 생성했다.
- v0.1.1부터 v0.2.6까지의 이력을 README와 Git 커밋 로그 기준으로 정리했다.
- v0.2.7 Finder UX Refactor의 문제 정의, 방향, 금지 사항, 다음 작업 후보를 문서화했다.
- 코드 변경은 수행하지 않았다.
- 문서 파일만 추가했다.
- 문서만 변경했으므로 `npm run lint`와 `npm run build`는 생략 가능하다.

## v0.2.7 구현 기록

- Mouse Finder를 단계형 마법사에서 단일 페이지 필터형 구조로 변경했다.
- Mouse Finder에서 FPS/MOBA/RPG 등 장르 질문과 목적 단계, 진행바를 제거했다.
- Mouse Finder 조건을 손 크기, 마우스 형태, 현재 불편한 점, 무게 선호, 연결 방식으로 정리했다.
- Keyboard Finder를 단일 페이지 필터형 구조로 변경했다.
- Keyboard Finder의 CSS 배열 다이어그램을 제거하고 텍스트 배지와 설명 중심으로 대체했다.
- Finder 선택지 문구를 `src/content/kr/finder/mouseFinderOptions.ts`, `src/content/kr/finder/keyboardFinderOptions.ts`로 분리했다.
- 추천 로직은 하드 필터보다 가능한 조건만 점수화하는 방식으로 단순화했다.
- README와 콘텐츠 편집 가이드에 v0.2.7 변경 내용, Finder 옵션 수정 위치, git push 후 Cloudflare 배포 흐름을 반영했다.
- `npm run lint`와 `npm run build`를 통과했다.

## v0.2.8 구현 기록

- Mouse Finder와 Keyboard Finder의 큰 선택 카드 UI를 compact chip 중심으로 줄였다.
- Finder 페이지의 여백, 제목 크기, 선택지 높이를 줄여 데스크톱 첫 화면에서 주요 항목을 더 빠르게 훑을 수 있게 했다.
- Mouse Finder의 "현재 불편한 점" 질문을 제거하고, 손목 피로/선 걸림/크기 부담 설명을 형태, 무게, 연결 방식 선택지 설명으로 옮겼다.
- Mouse Finder 추천 로직에서 불편함 전용 점수 조건을 제거하고 손 크기, 형태, 무게, 연결 방식 점수화는 유지했다.
- Keyboard Finder는 배열, 스위치 느낌, 소음 민감도, 연결 방식, OS 항목을 compact layout으로 유지했다.
- 메인 페이지의 Finder 섹션을 테스트 도구보다 작고 조용한 보조 CTA로 낮췄다.
- Finder 옵션 파일은 `src/content/kr/finder/mouseFinderOptions.ts`, `src/content/kr/finder/keyboardFinderOptions.ts` 구조를 유지했다.

## v0.2.9 Content Editing Workbench 기록

- `docs/content-copy-workbench.kr.md`를 생성했다.
- 이번 작업은 공개 사이트 기능 추가가 아니라, yulxwell이 문구를 검토하고 수정 지시를 남길 수 있는 편집 작업대 문서화 작업이다.
- 메인 페이지, Mouse Finder, Keyboard Finder, 제품 데이터, 스위치 사전, 테스트 도구, 가이드 카드의 주요 노출 문구를 섹션별로 정리했다.
- 각 문구에 현재 문구, 수정 위치, 운영자 수정안, 메모 칸을 제공했다.
- 제품/스위치/가이드 데이터는 나중에 `ai*` 필드를 덮어쓰지 않고 `editor*` 필드로 반영하는 흐름을 명시했다.
- `docs/content-editing-guide.md`에 Copy Editing Workbench 사용 방법과 Codex/Gemini 반영 흐름을 추가했다.
- 사이트 기능, 라우팅, 디자인, 추천 로직은 변경하지 않았다.
- 문서만 변경했으므로 `npm run lint`와 `npm run build`는 생략 가능하다.

## Project7 Control Tower Content Editor 단순화 기록

- Project99 Control Tower의 `/projects/project7/content` 화면을 복잡한 상태 관리 도구가 아니라 yulxwell용 단순 문구 수정 작업대로 정리했다.
- priority 필터와 priority badge를 UI에서 제거했다.
- 기존 `needs_edit`, `edited`, `approved`, `skipped` 상태 드롭다운을 제거하고, `operator_draft` 존재 여부만으로 수정됨/미수정을 판단하도록 단순화했다.
- 상단 필터는 검색, 섹션 선택, 보기 옵션(전체/수정한 항목만/미수정 항목만)만 유지했다.
- 카드 버튼은 수정/되돌리기 중심으로 정리했다.
- 되돌리기는 해당 항목의 `operator_draft`와 `memo`를 비우며 localStorage에도 반영된다.
- memo는 보조 입력칸으로 유지하되 시각적 강조를 줄였다.
- localStorage 기반 로컬 저장과 JSON Export/Copy 구조는 유지했다.
- 전체 Export/Copy와 수정한 항목만 Export/Copy를 제공한다.
- Project7 공개 사이트의 `src/content` 실제 문구는 수정하지 않았다.
- Supabase, SQL, n8n, DB write, Control Tower 외부 연동은 추가하지 않았다.

## Project7 Control Tower Copy Workbench UX 단순화 기록

- Project99 Control Tower의 `/projects/project7/content` 화면을 개발자용 JSON 관리 도구 느낌에서 yulxwell용 문구 수정 작업대 느낌으로 한 번 더 정리했다.
- 페이지 제목을 "Project7 문구 수정 작업대"로 변경했다.
- 상단에 3단계 안내를 추가했다.
  - 고칠 문구 찾기
  - 내가 바꿀 문구 작성
  - 수정안 복사 후 AI에게 전달
- UI에서 `operator_draft`, `memo`, `Export JSON`, `Copy JSON`, `localStorage`, `payload` 같은 개발자 용어 노출을 줄였다.
- `operator_draft`는 "내가 바꿀 문구", `memo`는 "메모", `localStorage`는 "브라우저 임시 저장"으로 안내했다.
- 복사/저장 버튼은 "내가 고친 문구만 복사", "내가 고친 문구만 파일로 저장", "전체 문구 복사", "전체 문구 파일로 저장"으로 변경했다.
- 카드 구조를 문구 위치/섹션, 현재 문구, 내가 바꿀 문구, 메모, 수정/되돌리기 버튼 중심으로 정리했다.
- 파일 경로와 field path는 기본 노출을 줄이고 "반영 위치 보기" 접기 영역으로 이동했다.
- 실제 Project7 `src/content` 자동 반영은 하지 않았다.
- Supabase/API/DB/n8n 연동은 추가하지 않았다.
- 장기 후보로 제품 비교 기능, CPU/메인보드/벤치마크 영역을 남겼지만 현재 우선순위는 문구 품질, 제품 데이터 품질, 편집 흐름 안정화로 유지한다.

## Project7 Control Tower v0.3B Preview Editing Workbench 기록

- Project99 Control Tower의 `/projects/project7/content` 문구 수정 작업대에 미리보기 영역을 추가했다.
- 문구 목록, 선택한 문구 편집 영역, 미리보기 영역을 나눠 yulxwell이 현재 문구와 수정안을 한 화면에서 비교할 수 있게 했다.
- "내가 바꿀 문구"를 입력하면 작업대 내부 미리보기에 즉시 반영된다.
- 미리보기는 전체 사이트 iframe이 아니라 문구 종류별 mock preview card이며, 실제 SetupRadar 사이트 반영이 아니다.
- 첫 화면, 카드, Finder 선택지, 제품 문구, 스위치/축, 일반 문구 형태의 미리보기를 제공한다.
- localStorage 기반 브라우저 임시 저장과 수정안 복사/파일 저장 구조는 유지했다.
- 실제 반영은 export한 수정안을 Codex/Gemini가 `src/content`의 `editor` 필드에 옮긴 뒤 Git push와 Cloudflare Pages 배포로 진행한다.
- Project7 공개 사이트의 `src/content` 실제 문구는 수정하지 않았다.
- Supabase/API/DB/n8n 연동, 실제 사이트 자동 반영, 공개 사이트 라우팅 변경은 추가하지 않았다.

## Project7 Control Tower v0.3C Live Preview Editing Workbench 기록

- Project99 Control Tower의 `/projects/project7/content` 오른쪽 패널을 "작업대 미리보기"와 "실제 사이트 보기"로 구분했다.
- 작업대 미리보기는 기존 mock preview card를 유지하며, "내가 바꿀 문구" 입력값을 즉시 반영한다.
- 실제 사이트 보기는 `https://setupradar.pages.dev`의 현재 배포 화면을 iframe으로 작게 표시한다.
- 문구 항목의 section, id, file path, field path를 기준으로 `/kr`, 테스트 도구, Mouse Finder, Keyboard Finder, 스위치/축, 가이드 페이지 URL을 추정한다.
- 실제 사이트 보기에는 "새 창으로 크게 보기" 링크를 제공한다.
- iframe preview는 현재 배포 화면 확인용이며, 수정안이 즉시 반영되는 화면이 아니다.
- 사용자 화면의 디자인 용어는 "첫 화면" 기준 표현으로 정리했다.
- 실제 반영은 여전히 export한 수정안을 Codex/Gemini가 `src/content`의 `editor` 필드에 반영한 뒤 Git push와 Cloudflare Pages 배포로 진행한다.
- Project7 공개 사이트의 `src/content` 실제 문구는 수정하지 않았다.
- Supabase/API/DB/n8n 연동, iframe DOM 조작, postMessage 연동, 실제 사이트 자동 반영은 추가하지 않았다.

## Project7 Control Tower v0.3D Sentence Editing Workbench 기록

- Project7 문구 수정 작업대의 기본 편집 단위를 단어/phrase가 아니라 전체 문장으로 정리했다.
- "객관적으로"처럼 일부 단어만 보이는 항목은 사용자에게 혼란을 줄 수 있어, 화면에서는 전체 문장 맥락을 먼저 보여주도록 했다.
- 편집 영역을 "어디에 쓰이는 문구인가요?", "현재 문장", "내가 바꿀 문장", "메모", "반영 위치 보기" 흐름으로 바꿨다.
- 작업대 미리보기는 부분 치환 로직을 만들지 않고, 내가 바꿀 문장이 있으면 그 문장 전체를 그대로 표시한다.
- 기존 강조 단어 같은 부분 문구 정보는 기본 화면에서 크게 강조하지 않고, 필요한 경우 "반영 위치 보기" 안의 보조 정보로만 표시한다.
- 실제 Project7 `src/content` 문구는 수정하지 않았다.
- localStorage 기반 브라우저 임시 저장과 수정안 복사/파일 저장 구조는 유지했다.

## Project7 Control Tower v0.3E Grouped Sentence Workbench 기록

- Project99 Control Tower의 `/projects/project7/content` 왼쪽 문장 목록을 단순 나열형에서 카테고리/폴더형 구조로 변경했다.
- 큰 분류는 첫 화면, 테스트 도구, Finder, 제품 문구, 스위치·축 사전, 가이드, 공통·푸터, 기타로 나눴다.
- 각 큰 분류 heading에 현재 필터 기준 전체 항목 수와 고친 항목 수를 표시한다.
- 첫 화면, 테스트 도구, Finder는 기본 펼침 상태로 두고, 나머지는 사용자가 열고 닫을 수 있게 했다.
- 검색어, 섹션 필터, 보기 옵션이 적용되면 해당 조건에 맞는 카테고리 결과가 보이도록 했다.
- 문장 항목에는 위치 라벨, 현재 문장 앞부분, 고침/아직 안 고침 상태만 간결하게 표시한다.
- file path, field path, content id는 기존처럼 가운데 편집 영역의 "반영 위치 보기" 안에서만 확인한다.
- 이 변경은 문구 위치를 더 쉽게 찾기 위한 Control Tower 내부 UI 개선이며, 실제 Project7 콘텐츠를 자동 수정하지 않는다.
- localStorage 기반 브라우저 임시 저장과 수정안 복사/파일 저장 구조는 유지했다.

## Project7 Control Tower v0.3F Visual Page Editing Workbench 기록

- Project99 Control Tower의 `/projects/project7/content` 기본 UI를 목록형 편집기에서 시각형 페이지 편집기로 전환했다.
- 사용자는 첫 화면, 테스트 도구, Finder, 스위치·축, 가이드, 메뉴·푸터 탭을 선택하고, 가운데 mock page preview에서 문구를 클릭해 수정 대상을 고른다.
- 클릭한 문구는 오른쪽 수정 패널에 "어디에 쓰이는 문구인가요?", "현재 문장", "내가 바꿀 문장", "메모", "반영 위치 보기" 흐름으로 표시된다.
- 내가 바꿀 문장을 입력하면 가운데 mock preview에 즉시 반영된다.
- 기존 목록형 작업대는 삭제하지 않고 "목록으로 보기 / 고급 보기" 접기 영역으로 낮췄다.
- 이 preview는 Control Tower 내부 mock preview이며 실제 SetupRadar iframe DOM을 조작하지 않는다.
- 실제 Project7 `src/content` 자동 수정은 하지 않았다.
- localStorage 기반 브라우저 임시 저장과 수정안 복사/파일 저장 구조는 유지했다.

## Project99 / Project7 안정화 체크포인트 기록

- 이번 체크포인트에서는 새 기능을 추가하지 않고 Project7 SetupRadar와 Project99 Control Tower의 변경사항을 검수했다.
- Project7은 `/kr` 기준 라우팅, `/ko` 경로, Finder compact UX, `src/content` 기반 ai/editor 구조를 유지한다.
- Project7 문구 수정 작업대는 v0.3F Visual Editing Workbench 상태까지 구현되었고, 작업대 UI 개선은 여기서 잠근다.
- 문구 수정은 yulxwell이 다음 루프에서 직접 진행한다.
- Control Tower 작업대 수정안은 localStorage에 임시 저장하고 export 후 Codex/Gemini가 `editor` 필드에 반영하는 방식이다.
- 실시간 DB 수정, Supabase/API/n8n 연동, Project7 공개 사이트 자동 수정은 없다.

## GitHub Repository 이름 정리 기록

- Project7 SetupRadar의 GitHub repo 이름을 `setupradar`에서 `project7_setupradar`로 정리했다.
- Project7과 Project99 Control Tower를 구분하기 쉽도록 Project 번호가 드러나는 이름을 기준으로 기록한다.
- 이 기록은 repo 명칭 정리이며, 공개 사이트 라우팅(`/kr`)이나 Cloudflare Pages 배포 URL 변경을 의미하지 않는다.

## Keyboard Product Filter Simplification 설계 기록

- 키보드 제품 데이터 확장을 준비하면서 다나와식 전체 필터를 그대로 쓰지 않는 원칙을 세웠다.
- 키보드 필터는 기본 5개, 더보기 필터, 상세 스펙/원본 스펙으로 나눈다.
- 기본 필터는 배열, 연결 방식, 키감/축 느낌, 소음, 가격대만 둔다.
- 게이밍 기능, 멀티기기, 키캡, 하우징, 백라이트, 무게감은 더보기 필터로 분리한다.
- 키압 세부값, 매크로, 응답속도, 블루투스 버전, 배터리, 엔터키 형태, 각인 위치, 케이블 재질, 구성품, PS2, 스텝스컬쳐, 윈도우 키 잠금, 세부 크기는 상세 스펙 또는 원본 스펙으로 보관한다.
- `KeyboardContent` 타입에 `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs`를 선택 필드로 추가했다.
- 기존 `layout`, `switchType`, `priceRange`, `features` 필드는 Keyboard Finder 호환을 위해 유지했다.
- 제품 대량 추가, UI 대규모 변경, Supabase/API/DB 추가는 하지 않았다.

## Mouse Product Filter & Shell Reference 설계 기록

- 마우스 제품 데이터도 다나와식 전체 필터를 그대로 쓰지 않고 기본 5개, 더보기 필터, 상세 스펙/원본 스펙으로 나누는 원칙을 세웠다.
- 기본 필터는 형태, 무게감, 연결 방식, 크기감, 가격대만 둔다.
- 게이밍 성능, 버튼 수, 코팅/그립감, 스위치 성향, 배터리/충전은 더보기 필터로 분리한다.
- 센서 모델명, 최대 DPI, IPS, FPS 스캔율, 가속도 G, 폴링레이트, 블루투스 버전, USB/PS2, 배터리 세부값, A/S 보증기간, 가로/세로/높이, 버튼 수 세부, DPI 변경 여부, 무게추 조절, 파츠 변경 가능, 무한휠, RGB/LED는 상세 스펙 또는 원본 스펙으로 보관한다.
- 마우스 차별화 요소로 `shellReferences` 필드를 추가했다.
- 쉘 레퍼런스에는 `referenceModelKo`, `referenceModelEn`, `relationType`, `confidence`, `sourceHint`, `aiNoteKo`, `editorNoteKo`, `cautionKo`를 둘 수 있다.
- "카피쉘", "배꼈다", "짭", "표절", "원본 쉘" 같은 표현은 사용하지 않는다.
- 대신 "유사 쉘 계열", "쉘 체감 레퍼런스", "자주 비교되는 쉘", "손에 닿는 형태가 비슷하다는 반응", "비교 기준으로 삼기 좋음" 같은 표현을 사용한다.
- 기존 `shapeType`, `dimensions`, `weight`, `sensor`, `handSizeRange`, `priceRange`, `features` 필드는 Mouse Finder 호환을 위해 유지했다.
- 제품 대량 추가, UI 대규모 변경, Supabase/API/DB 추가는 하지 않았다.

## Guide Structure Cleanup 기록

- `/kr` 메인 페이지의 가이드 추천 카드를 `/kr/guides`의 새 Spec Guide 구조와 맞췄다.
- 오래된 메인 추천 카드인 "게이밍 마우스 vs 일반 마우스", "키보드 스위치 가이드", "하드웨어 용어 사전" 노출을 제거하고 새 가이드 주제로 교체했다.
- 메인 추천 가이드는 대칭형 vs 오른손용 비대칭형, 마우스 스위치와 더블클릭, 리니어/택타일/클릭/저소음, 래피드 트리거/자석축, PBT vs ABS 키캡, 불량화소/무결점 정책으로 정리했다.
- Hero 문구는 "객관적으로" 중심 표현에서 사기 전후 장비를 초보자 기준으로 쉽게 확인하는 톤으로 1차 개선했다.
- Header의 언어 버튼은 KR만 활성화하고, 아직 구현 전인 EN/JP/CN은 비활성 "준비 중" 상태로 보정했다.
- `/kr/guides`의 신규 상세 페이지 링크가 실제 생성된 상세 페이지 경로와 연결되는지 파일 기준으로 점검했다.
- `/kr/switches`는 이번 작업에서 문체를 추가로 크게 수정하지 않고 기존 단순화 상태를 유지했다.
- 상세 페이지 본문 전체 재작성, 다국어 페이지 생성, Supabase/API/DB/n8n 추가는 하지 않았다.

## Test Tool Category Cleanup 기록

- `/kr/tests`의 하드웨어 진단 도구 목록을 평면 카드 목록에서 모니터, 마우스, 키보드 카테고리 섹션으로 정리했다.
- `TEST_TOOLS` 데이터에 `category` 필드를 추가해 테스트 도구가 어느 장비군에 속하는지 명확히 했다.
- 모니터에는 불량화소 테스트와 빛샘/IPS Glow, 마우스에는 더블클릭/CPS/폴링레이트, 키보드에는 동시입력 테스트를 배치했다.
- 테스트 페이지 설명은 "무료 진단"보다 설치 없이 참고용으로 빠르게 점검하는 톤으로 정리했다.
- 새 테스트 도구, DB/API/n8n/Supabase 연동은 추가하지 않았다.

## Hardware Defect Test Expansion 기록

- 브라우저에서 바로 실행할 수 있는 하드웨어 불량/체감 진단 도구를 추가했다.
- 모니터 카테고리에 주사율 및 잔상 테스트, 명암비(가독성) 테스트를 추가했다.
- 마우스 카테고리에 마우스 휠 튕김(인코더) 테스트, 마우스 트래킹(지터/스킵) 테스트를 추가했다.
- 키보드 카테고리에 키보드 채터링(중복 입력) 테스트를 추가했다.
- 각 테스트는 설치 없이 참고용으로 확인하는 웹 기반 도구이며, 전문 장비 수준의 정밀 판정으로 표현하지 않는다.
- Supabase/API/DB/n8n, 가격 트래커, 제품 비교 기능은 추가하지 않았다.

## Added Tests QA Pass 기록

- 추가된 테스트 5개(`/kr/tests/refresh-rate-ghosting`, `/kr/tests/contrast-readability`, `/kr/tests/mouse-wheel-encoder`, `/kr/tests/mouse-tracking`, `/kr/tests/keyboard-chatter`)의 페이지 파일과 컴포넌트 연결을 점검했다.
- `/kr/tests`의 모니터/마우스/키보드 카테고리 카드가 실제 상세 페이지 파일로 연결되는지 확인했다.
- 주사율/잔상 테스트는 브라우저 기반 체감용 추정값이라는 점과 눈 피로 주의 문구를 보강했다.
- 명암비 테스트는 주변 조명, HDR, 밝기/명암비 설정에 따라 결과가 달라질 수 있음을 안내했다.
- 마우스 휠 튕김 테스트는 한두 번의 튐으로 고장을 확정하지 않도록 표현을 완화하고 먼지/드라이버/브라우저 이벤트 영향 가능성을 추가했다.
- 마우스 트래킹 테스트는 전용 장비 수준의 정밀 측정이 아니라 포인터 이벤트 기반 참고 도구임을 명시하고 모바일 터치 스크롤 간섭을 줄이도록 캔버스에 `touch-none`을 적용했다.
- 키보드 채터링 테스트는 OS 반복 입력 설정, 브라우저 이벤트, 키보드 펌웨어에 따라 기록이 달라질 수 있음을 안내했다.
- 기존 더블클릭/폴링레이트 문구 중 "정밀 진단", "정상 범위"처럼 확정 판정으로 보일 수 있는 표현도 최소 범위에서 완화했다.
- 새 테스트 추가, DB/API/n8n/Supabase, 가격 트래커, 제품 비교 기능은 추가하지 않았다.

## v0.4A Finder basicFilters 동기화 기록

- Mouse Finder 추천 점수 계산이 `mouse.basicFilters`를 우선 읽도록 동기화했다.
- Mouse Finder는 `basicFilters`가 없을 때 기존 `shapeType`, `weight`, `features`, `handSizeRange`, `priceRange`를 basic filter 형태로 변환해 fallback한다.
- Keyboard Finder 추천 점수 계산이 `keyboard.basicFilters`를 우선 읽도록 동기화했다.
- Keyboard Finder는 `basicFilters`가 없을 때 기존 `layout`, `switchType`, `features`, `priceRange`를 basic filter 형태로 변환해 fallback한다.
- `advancedFilters`, `detailSpecs`, `rawSpecs`, `shellReferences`는 이번 점수 계산에는 사용하지 않고, 이후 더보기 필터/상세 스펙/쉘 레퍼런스/비교용 확장을 위해 보존한다.
- Finder UI 구조와 결과 카드 레이아웃은 유지했으며, 제품 샘플 추가는 다음 단계로 남겼다.
- Supabase/API/DB/n8n, 가격 트래커, 제품 비교 기능, 새 테스트/가이드는 추가하지 않았다.

## v0.4B Sample Product Data Pack 기록

- DB화 전 데이터 구조 리허설을 위해 마우스, 키보드, 스위치/축 샘플 데이터를 총 10개 수준으로 보강했다.
- 마우스는 기존 3개에 review 상태 샘플 7개를 추가해 총 10개로 맞췄다.
- 키보드는 기존 2개에 review 상태 샘플 8개를 추가해 총 10개로 맞췄다.
- 스위치/축은 기존 6개에 review 상태 샘플 4개를 추가해 총 10개로 맞췄다.
- 신규 마우스/키보드 샘플에는 Finder 검증을 위해 `basicFilters`를 필수로 입력했다.
- 마우스 샘플의 `shellReferences`는 확실하거나 커뮤니티에서 자주 비교되는 경우만 넣고, 신규 항목 confidence는 low/medium 중심으로 기록했다.
- 불확실한 키압, 배터리, 블루투스, 센서 세부값은 detailSpecs에 과하게 넣지 않고 rawSpecs note로 분리했다.
- 모든 신규 샘플은 `status: "review"`로 두었고 editor 필드는 채우지 않았다.
- 구매 링크, 가격 추적, 이미지, Supabase/API/DB/n8n, 제품 비교 기능은 추가하지 않았다.

## v0.4C Sample Data QA 기록

- 마우스 10개, 키보드 10개, 스위치/축 10개 샘플이 Finder와 스위치 사전에서 깨지지 않는지 코드 기준으로 점검했다.
- Mouse Finder는 대칭형/가벼운 무선/보통 손, 오른손 비대칭형/가벼운 무선/큰 손, 대칭형/보통 무게/유선/작은 손, 상관없음 조합을 확인했다.
- Mouse Finder 결과는 기존 published 제품과 신규 review 샘플이 함께 후보로 나오는 것을 확인했다.
- Keyboard Finder는 풀배열/조용한 계열, 텐키리스/부드러운 타입/무선, 75% 계열/부드러운 타입, 래피드 트리거 후보가 들어올 수 있는 조합을 확인했다.
- Keyboard Finder 결과는 기존 published 제품과 신규 review 샘플이 함께 후보로 나오는 것을 확인했다.
- 결과 카드에 직접 보일 수 있는 기존 제품 문구 중 "최상의", "최상급", "압도적인", "끝판왕"처럼 과하게 읽힐 수 있는 표현을 참고용 톤으로 완화했다.
- 현재 샘플 데이터 QA/초기 확장 단계에서는 `status: "review"` 제품도 Finder 결과에 노출 가능하도록 둔다.
- 내부 `status` 값은 사용자 화면에 표시하지 않는다.
- 향후 제품 수가 늘어나면 Finder 결과에서 `published`만 노출하거나 review 노출 토글을 두는 방식을 검토한다.
- `shellReferences`는 데이터 구조만 유지하며 아직 Finder 결과 카드나 스위치 사전 화면에는 표시하지 않는다.
- 새 제품 추가, 제품 이미지/구매 링크/가격 추적, Supabase/API/DB/n8n, 제품 비교 기능은 추가하지 않았다.

## v0.4D Mouse Shell Reference Display 구현 기록

- Mouse Finder 결과 카드 내부 하단에 마우스의 `shellReferences` 데이터를 노출하는 "쉘 체감 레퍼런스" 영역을 신설했다.
- `shellReferences` 데이터가 존재하는 제품에만 영역을 렌더링하고, 데이터가 없는 마우스는 아무런 표시도 하지 않도록 방어했다.
- UI 일관성을 위해 small text(`text-[10.5px]`), muted color, `border-[var(--border)]/30` 테두리와 옅은 배경(`bg-[var(--secondary)]/15`) 디자인을 채택하여 결과 카드의 핵심 지표(체감 한줄평 등)보다 시각적 위계를 낮춰 조화롭게 배치했다.
- 모바일 뷰포트 등에서 카드가 너무 길어지는 문제를 미연에 방지하기 위해 최대 2개(`slice(0, 2)`)의 레퍼런스만 슬라이싱하여 노출했다.
- 데이터 로직에서 `editorNoteKo`를 우선 순위로 읽고, 없을 경우 `aiNoteKo`를 fallback으로 사용하도록 처리했다.
- 만약 두 코멘트 데이터가 모두 부재할 경우, `referenceModel`, `relationType` 및 `confidence` 데이터를 결합하여 완성도 높은 한글 안내 문구를 실시간 조립하는 fallback 로직을 구현했다.
- `cautionKo` 항목이 존재할 경우 하단에 작은 글씨(`text-[9.5px]`)로 주의사항 문구를 명시했다.
- “카피쉘”, “배꼈다”, “짭”, “표절”, “원본 쉘” 등의 부정적/직관적 금지 단어를 전체 소스코드와 마우스 파인더 UI에서 배제했다.
- Finder의 제품 추천 점수 계산 및 필터 로직은 전혀 변경하지 않았다.
- `npm run lint`와 `npm run build`를 성공적으로 패스했다.

## v0.4D - 2026-05-23 Gemini/Codex 공통 작업 규칙 문서화

- **AI 작업자 운영 규칙 수립**: Gemini와 Codex를 교대로 사용하여 작업할 때 컨텍스트가 깨지지 않도록 하는 리포지토리 통합 운영 규칙을 제정하고 문서화 작업을 완료했다.
- **AGENTS.md 및 README.md 갱신**:
  - 모든 AI 작업자가 시작하기 전 반드시 읽어야 할 필수 문서 목록(`README.md`, `AGENTS.md`, `PROJECT7_WORK_LOG.md`, `docs/content-editing-guide.md`)을 지정했다.
  - Gemini의 역할(반복 수정, 문구 완화, 샘플 데이터 추가, 문서 정리, QA, 단순 UI 보강)과 Codex의 역할(타입 오류 해결, Finder 매칭 알고리즘, 빌드 오류 해결, 복잡한 리팩터링)을 명확하게 분담했다.
  - PM yulxwell(비개발자)을 보조하는 컨텍스트를 유지하고, Supabase/API/DB/n8n 무단 연동 및 가격 트래커/제품 비교 등의 추가 기능을 제한하는 엄격한 금지 사항(Hard Limits)을 각인했다.
  - 마우스 쉘 체감 레퍼런스(`shellReferences`) 표현 시 법적 리스크가 있는 단어(카피쉘, 짭, 표절 등) 사용을 영구 금지하고, 대칭/비대칭 형태에 대한 완화된 한국어 설명 톤앤매너를 유지하도록 강제했다.
  - 작업 완료 시 반드시 `npm run lint` 및 `npm run build` 검증 후 8단계로 구성된 완료 보고 포맷에 맞춰 유저에게 최종 보고하도록 규칙을 완성했다.
  - `README.md` 상단에 본 운영 규칙의 존재를 공표하는 짧은 안내 섹션을 추가하여 가시성을 확보했다.
- **안전성 유지**: 기능 코드, UI, 제품 및 문구 데이터는 일절 수정하지 않고 정적 문서화 체계 구성 작업만을 안전하게 마무리했다.

## v0.4E - 2026-05-23 Product Trust Guard 구현 기록

- **쉘 레퍼런스 노출 기준 고도화**: 마우스 쉘 체감 레퍼런스의 엄격한 렌더링 검수 필터(`editorNoteKo` 존재 필수, confidence `medium` 또는 `high` 필수, `sourceHint: "unknown"` 제외, 레퍼런스 모델 식별자 필수)를 추가하였습니다.
- **빈 쉘 레퍼런스 영역 자동 숨김**: 필터링된 결과물 개수가 `0`일 경우, 마우스 결과 카드 내부의 "쉘 체감 레퍼런스" 영역(보더 및 백그라운드 스타일 포함) 전체를 완전히 렌더링하지 않고 숨기도록 구현하여 카드 레이아웃의 컴팩트한 완성도를 유지합니다.
- **제품 이미지/링크 권장 스키마 선언**: 향후 수집/제휴 리스크가 따르는 제품 이미지 및 최저가 가격 확인 아웃링크 기능 추가에 대비해 `productImages` 및 `productLinks` optional 스키마 타입을 `src/content/types.ts`와 `src/types.ts`에 완벽히 구축하였습니다.
- **정책 문서화 및 규칙 명문화**: 이미지 저작권 및 최저가 아웃링크에 대한 엄격한 sourceType/status 제어 프로세스와 쉘 검수 원칙을 `README.md` 및 `PROJECT7_WORK_LOG.md`에 철저하게 기록하여 AI/Human 공동 개발 시의 비즈니스적 신뢰도를 극대화했습니다.
- **정밀 QA 검수 통과**: 금지어("카피쉘", "짭", "배꼈", "표절")에 대해 소스코드 전수 검수를 완료하였고, `npm run lint` 및 `npm run build`를 이상 없이 성공시켰습니다.

## v0.5A - 2026-05-23 DB Schema Planning 기록

- `docs/db-schema-plan.md`를 생성해 Project7 제품 데이터를 향후 DB로 옮길 때 필요한 테이블 초안을 문서화했다.
- 현재 정적 TS 데이터 구조(`MOUSE_DATABASE`, `KEYBOARD_DATABASE`, `SWITCH_DATABASE`)와 DB 후보 테이블 간 매핑을 정리했다.
- `products`, `product_locales`, `product_basic_filters`, `product_advanced_filters`, `product_detail_specs`, `product_raw_specs`, `product_shell_references`, `product_images`, `product_links`, `switch_entries`, `guide_entries`/`content_pages` 테이블 후보를 정리했다.
- `product_locales`에는 AI 초안과 editor 교정본을 분리하고, 화면에서는 editor 우선/fallback 구조를 유지하는 방향을 기록했다.
- 마우스 쉘 레퍼런스는 `editor_note_ko` 존재, confidence medium/high, source_hint unknown 제외, approved 상태 등 엄격한 노출 기준을 유지하도록 설계했다.
- 제품 이미지와 링크는 approved 전 공개 노출을 막고, 이미지 hotlink와 실시간 가격 트래커를 피하는 정책을 기록했다.
- 정적 사이트와 DB 연결 전략은 단기 static TS 유지, 중기 DB JSON snapshot 후 정적 빌드, 장기 일부 Workers/API 검토 순서로 정리했다.
- 이번 작업은 설계 문서화이며 실제 Supabase 연결, SQL migration, API route, 제품 데이터 수정, Finder 로직 수정, UI 수정, Control Tower 수정은 하지 않았다.

## v0.5B - 2026-05-23 Product Card UX Review 기록

- Mouse Finder와 Keyboard Finder 결과 카드의 정보 위계, 표시 문구, 내부 데이터 노출 여부를 코드 기준으로 점검했다.
- Mouse Finder 결과 카드는 브랜드/제품명, 요약, 핵심 스펙, 체감 한줄평 순서를 유지하고, 가격/링크/이미지/내부 status는 표시하지 않는 상태를 확인했다.
- Mouse Finder의 쉘 체감 레퍼런스는 `editorNoteKo`가 있는 검수 항목만 표시하도록 유지하고, 표시 영역의 글자 크기와 색 위계를 더 조용하게 낮췄다.
- Keyboard Finder 결과 카드는 브랜드/제품명, 작은 배지, 요약, 핵심 스펙, 체감 한줄평 순서를 유지했다.
- Keyboard 제품 문구 중 카드에 직접 노출될 수 있는 "가성비 종결", "독보적인" 같은 마케팅성 표현을 참고용 톤으로 최소 보정했다.
- `productImages`와 `productLinks`는 타입만 유지하고 Finder 결과 카드에는 표시하지 않았습니다.
- Finder 추천 점수 계산, `basicFilters` 매칭 로직, 제품 수, 제품 상세 페이지, 제품 비교, 가격 링크, Supabase/API/DB/n8n 연동은 변경하지 않았다.

## v0.5C - 2026-05-23 Finder Product Card Compact UI 기록

- **Mouse Finder 결과 카드 컴팩트화**:
  - 결과 카드 내부 패딩을 `p-4`에서 `p-3`로 축소하였습니다.
  - 브랜드 및 제품명 영역 하단 여백을 `mb-2`에서 `mb-1`로, 제품 요약 영역 하단 여백을 `mb-3`에서 `mb-2`로 최적화하였습니다.
  - 스펙 테이블 그리드의 간격을 `gap-2`에서 `gap-1`로 좁히고, 개별 셀 내부 패딩을 `px-3 py-2`에서 `px-2 py-1`로 줄여 세로 길이를 확연히 단축시켰습니다.
  - 스펙 레이블 폰트 크기를 `text-[10px]`에서 `text-[9.5px]`로, 스펙 값 및 체감 한줄평 폰트 크기를 `text-[11px]`에서 `text-[10.5px]`로 조율하여 텍스트 밀도를 정교하게 향상시켰습니다.
  - `shellReferences` 영역의 마진 및 패딩을 축소(`mt-3 pt-2.5` -> `mt-2 pt-2`, `p-2` -> `p-1.5`)하고 레퍼런스 폰트를 `text-[9.5px]`, 주의사항 폰트를 `text-[9px]`로 재설정하여 핵심 UI를 보조하는 레이아웃으로 최적화하였습니다.
- **Keyboard Finder 결과 카드 컴팩트화 및 동기화**:
  - 카드 패딩(`p-4` -> `p-3`), 하단 마진(`mb-2` -> `mb-1`, `mb-3` -> `mb-2`)을 축소하였습니다.
  - 키보드만의 상단 배지 영역 간격 및 패딩(`mb-2` -> `mb-1.5`, `px-2 py-0.5` -> `px-1.5 py-0.5`)과 폰트 크기(`text-[10px]` -> `text-[9.5px]`)를 정교하게 튜닝하였습니다.
  - 스펙 테이블 그리드 `gap-1`, 개별 셀 패딩 `px-2 py-1`, 폰트 크기(`text-[9.5px]` / `text-[10.5px]`) 등을 Mouse Finder와 완벽하게 대칭 동기화하여 고도화된 레이아웃 대칭 및 일관성을 확보했습니다.
- **기존 제약 사항 준수**:
  - 추천 점수 계산 및 필터 로직에는 전혀 손대지 않았습니다.
  - `productImages` 및 `productLinks`와 내부 `status` 값을 노출하지 않는 정책을 완벽히 유지했습니다.
- **필터 옵션 그룹 헤더 레이아웃 개선**:
  - 화면 폭이 넓어질 때 필터의 `label`(예: 마우스 형태)과 `helperText`(설명글)가 한 줄로 나열되던 `sm:flex-row` 반응형 레이아웃을 제거하여, 모든 뷰포트 크기에서 라벨 밑에 설명글이 차분하게 줄바꿈(`flex-col` 고정)되어 깔끔하게 노출되도록 디자인 밀도를 조절했습니다.

## v0.5D - 2026-05-23 Product Detail UX Plan 기록

- `docs/product-detail-ux-plan.md`를 생성해 Finder 결과 상품 클릭 시 보여줄 상세정보 UX 구조를 문서화했다.
- 상세정보 진입 방식으로 카드 펼침 패널, 상세 모달, `/kr/products/[slug]` 상세 페이지를 비교했다.
- 현재 추천 방향은 단기 카드 펼침 패널, 중기 제품 상세 페이지, 장기 DB화 후 제품 상세/비교/가격 확인 링크 연결이다.
- 마우스 상세정보는 브랜드/제품명, 요약, 핵심 스펙, `basicFilters`, 확실한 `detailSpecs`, 장점, 주의점, 구매 전 체크, 체감 한줄평, 검수 통과 쉘 레퍼런스 순서로 설계했다.
- 키보드 상세정보는 브랜드/제품명, 요약, 배열, 연결, 키감/축 느낌, 소음 성향, 가격대, 핵심 스펙, 장점, 주의점, 구매 전 체크, 체감 한줄평 순서로 설계했다.
- 내부 `status`, 미승인 `productImages`, 미승인 `productLinks`, low confidence 또는 `sourceHint: "unknown"`인 `shellReferences`, 검증되지 않은 가격은 상세정보에서도 표시하지 않는 원칙을 기록했다.
- 이번 작업은 UX 설계 문서화이며 실제 상세 페이지, 상세 모달, 카드 펼침 패널, 제품 이미지/링크/가격/비교 기능, Supabase/API/DB 연결, Finder 추천 로직 변경은 하지 않았다.

## v0.5E - 2026-05-23 Product Detail Panel Mock 기록

- Mouse Finder 결과 카드에 `자세히 보기` 버튼과 카드 내부 펼침 패널 mock을 추가했다.
- Keyboard Finder 결과 카드에도 동일한 `자세히 보기` 펼침 패널 mock을 추가했다.
- 펼침 패널은 요약, basicFilters 기반 핵심 기준, 값이 있는 확실한 스펙, 장점, 주의점, 구매 전 체크를 최대 3개 중심으로 짧게 표시한다.
- Mouse Finder의 쉘 체감 레퍼런스는 기존 Product Trust Guard 조건(`editorNoteKo`, confidence medium/high, `sourceHint` unknown 제외, reference model 존재)을 통과한 항목만 표시한다.
- `productImages`, `productLinks`, 내부 `status`, rawSpecs 전체 dump, 가격/최저가/구매 링크, 비교 버튼은 표시하지 않았다.
- 제품 상세 페이지(`/kr/products/[slug]`)는 생성하지 않았고, Finder 추천 점수 계산 및 basicFilters 매칭 로직은 변경하지 않았다.
- Supabase/API/DB, Control Tower, 제품 데이터 추가/삭제, 라우팅 변경은 하지 않았다.

## v0.5F - 2026-05-23 Detail Panel De-dup QA 기록

- v0.5E 펼침 패널에서 기본 카드와 중복되던 요약, basicFilters 전체, 기본 스펙 반복 표시를 제거했다.
- 버튼 문구를 `자세히 보기`에서 `구매 전 체크`로 바꿔 패널의 목적을 더 분명하게 했다.
- Mouse Finder 상세 패널은 `이런 경우에 맞을 수 있음`, `주의할 점`, `구매 전 체크`, 카드에 없는 추가 detailSpecs, 검수 통과 쉘 체감 레퍼런스 중심으로 재구성했다.
- Keyboard Finder 상세 패널은 `이런 경우에 맞을 수 있음`, `주의할 점`, `구매 전 체크`, 카드에 없는 추가 detailSpecs 중심으로 재구성했다.
- 기본 카드에 이미 보이는 요약, 핵심 스펙, 체감 한줄평은 패널에서 반복하지 않는다.
- Finder 추천 점수 계산, basicFilters 매칭 로직, 제품 데이터, 제품 이미지/링크/가격/비교 기능은 변경하지 않았다.
- 내부 `status`, `review`, `published` 값은 사용자 화면에 노출하지 않는 정책을 유지했다.

## v0.6A - 2026-05-23 Content Snapshot Structure Plan 기록

- `docs/content-snapshot-plan.md`를 생성해 현재 `src/content` 기반 TS 데이터를 JSON snapshot으로 export할 때 사용할 구조 초안을 문서화했다.
- snapshot 전략의 목적을 static TS와 DB/CMS 사이의 중간 규격, Control Tower export와 Project7 build가 공유할 표준, 정적 배포 안정성 유지로 정리했다.
- 권장 snapshot 구조는 `snapshots/kr/site-copy.json`, `tools.json`, `guides.json`, `products/mice.json`, `products/keyboards.json`, `switches.json`, `finder/*-options.json`처럼 영역별 분할 파일을 우선 추천했다.
- 제품 snapshot은 `id`, `slug`, `category`, `brand`, `name`, `status`, `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs`, `productImages`, `productLinks`, `shellReferences`, `copy` 필드 중심으로 정리했다.
- 문구 snapshot은 Control Tower 문구 작업대와 맞물리도록 `id`, `section`, `label`, `sourcePath`, `fieldPath`, `currentValue`, `editorValue`, `memo`, `locale`, `updatedAt` 구조를 제안했다.
- 필터 snapshot은 `productType`, `filterGroup`, `key`, `labelKo`, `descriptionKo`, `enabled`, `options` 구조로 정리했다.
- 빌드 전략은 단기 TS 유지, 중기 JSON snapshot 병행 생성, 장기 DB에서 `published` snapshot export 후 정적 빌드를 추천했다.
- 이번 작업은 설계 문서화이며 export script 구현, Project7 import 경로 변경, Supabase/API/DB, 제품 데이터 수정, Finder 로직 변경, Control Tower 수정은 하지 않았다.

## v0.6B - 2026-05-23 TS to JSON Snapshot Export Script 기록

- `scripts/export-content-snapshots.ts`를 추가해 현재 `src/content` 기반 TypeScript 데이터를 JSON snapshot으로 export할 수 있게 했다.
- `package.json`에 `npm run snapshot:export` 명령을 추가하고, 실행을 위해 devDependency `tsx`를 추가했다.
- snapshot 출력 경로는 `snapshots/kr/`로 두고, 영역별 분할 구조를 사용했다.
- 생성된 snapshot 파일은 `site-copy.json`, `tools.json`, `guides.json`, `products/mice.json`, `products/keyboards.json`, `switches.json`, `finder/mouse-options.json`, `finder/keyboard-options.json` 총 8개다.
- 모든 snapshot에는 `projectId`, `locale`, `schemaVersion`, `generatedAt`, `source`, `status` metadata를 포함한다.
- 제품 snapshot은 copy 필드를 별도 `copy` 객체로 묶어 AI 초안과 editor 교정본을 구분하기 쉽게 만들었다.
- 공개 사이트 import 경로는 변경하지 않았고, Project7은 계속 `src/content` TS 데이터를 직접 읽는다.
- Supabase/API/DB, Control Tower 연동, 제품 데이터 수정, Finder 로직 변경, UI 변경은 하지 않았다.

## v0.6C - 2026-05-23 Snapshot Validation Rules 기록

- `scripts/export-content-snapshots.ts`에 snapshot 생성 전 validation 단계를 추가했다.
- 공통 metadata(`projectId`, `locale`, `schemaVersion`, `generatedAt`, `source`, `status`)와 JSON stringify/parse 가능 여부를 검증한다.
- 마우스/키보드 제품의 `id`, `slug`, `brand`, `name`, `category`, `status`, `basicFilters`, `copy` 구조와 중복 id/slug를 검사한다.
- Mouse `basicFilters.shape/weight/connection/size/price`, Keyboard `basicFilters.layout/connection/feel/noise/price` 허용값을 검사한다.
- `shellReferences`는 relation/confidence/source 허용값을 검사하고, 공개 가능 조건(`editorNoteKo`, medium/high, `sourceHint !== unknown`, reference model 존재)을 통과한 수를 summary로 출력한다.
- `productImages`와 `productLinks`는 배열 구조, 승인 상태, source/link type, approved 항목의 필수 `src`/`url`을 검사한다.
- 스위치/축, tools, guides, finder options의 기본 필수값과 중복값을 검사한다.
- snapshot 대상 데이터 문자열에서 금지 표현을 발견하면 export를 중단하도록 했다.
- `review` 상태 항목, 미공개 shell reference, low confidence reference, pending 이미지/링크, detailSpecs 부족 항목은 warning으로만 출력한다.
- validation 성공 시 snapshot 수, 제품/스위치/tools/guides 수, shellReferences 공개 가능 수, 이미지/링크 승인 수, warning 수를 console summary로 출력한다.
- 공개 사이트 import 경로는 변경하지 않았고, Supabase/API/DB/Control Tower 연동도 추가하지 않았다.

## v0.7A - 2026-05-24 Buying Checklist Pages 기록

- **구매 전 체크 정적 가이드 3종 전격 신규 추가**:
  - [마우스 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/mouse-buying-checklist/page.tsx)를 추가하여 대칭/비대칭 쉘 형태, 무게감 체감, 2.4GHz 무선 vs 블루투스 연결, DPI 및 8K 폴링레이트 실체 사양, 스위치 내구성과 AS 규정을 초보자 기준으로 체크하도록 했습니다. (관련 테스트로 `마우스 더블클릭 테스트` 연계)
  - [키보드 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/keyboard-buying-checklist/page.tsx)를 추가하여 텐키리스/75%/65%/60% 배열 낭비 차단법, 스위치 축 명칭과 실제 동작 방식, 타건 소음 민감도, 하우징/키캡 소재 특징, 핫스왑 호환성 등을 체크하도록 했습니다. (관련 테스트로 `키보드 채터링 테스트` 연계)
  - [모니터 구매 전 체크리스트](file:///Users/jilee/antigravity/src/project7/src/app/kr/guides/monitor-buying-checklist/page.tsx)를 추가하여 해상도/주사율 하드웨어 성능 타당성, IPS/VA/OLED 패널별 명암비 및 가독성 특징, GtG vs MPRT 응답속도 마케팅 구분법, 불량화소 무결점 보증 및 빛샘/IPS Glow 체크 기준을 제시했습니다. (관련 테스트로 `모니터 불량화소 테스트` 연계)
- **가이드 데이터 및 스냅샷 검증 연계**:
  - `src/content/kr/guides.ts`에 카테고리 `purchase-check` 하위에 3개의 가이드를 추가하여 가이드 목록 페이지(`/kr/guides`)에서 깨짐 없이 3열 그리드 형태로 완벽하게 어우러지도록 연결했습니다.
  - 콘텐츠 스냅샷 검사 스크립트(`export-content-snapshots.ts`)의 엄격한 금지어 규칙(최고, 완벽, 무조건, 끝판왕, 압도적 등)을 일절 예외 없이 철저히 준수했습니다.
- **정적 아키텍처 한계선 보존**:
  - Supabase/API/DB/Control Tower 연동, 제품 데이터 수정, 가격 트래커나 제품 비교 기능, 이미지/링크 화면 노출 변경 없이, Next.js App Router 정적 배포 구조를 유지했습니다.

## v0.7B - 2026-05-24 Buying Checklist Copy QA 기록

- **구매 전 체크 가이드 3종 대대적인 Copy QA 및 문체 교정**:
  - 마우스, 키보드, 모니터 가이드 페이지 본문의 번역투 및 AI 초안 성향의 문구를 초보자 친화적으로 다듬고 광고성/과장성 수식어를 차분하고 객관적인 문체로 전수 보정했습니다.
  - 마우스 쉘/형태를 그립법 전문 용어 대신 손바닥 지지감(비대칭/대칭형) 체감 예시로 풀어 설명하고, 4K/8K 폴링레이트의 CPU/모니터 조건부 작동 한계를 명시했습니다.
  - 키보드 미니배열(60%) 단축키 적응 팁을 추가하고 화려한 마케팅 축 네이밍을 4대 본질 축 계열로 환원해 설명했으며 저소음축 파워 타건 울림 경고 및 소재 기호 취향 존중을 강화했습니다.
  - 모니터 해상도/주사율 GPU 적합성 및 책상 세로 깊이 자로 재기 팁을 추가하고 패널 장단점 균형 유지 및 OLED 번인 리스크 우려를 기술적으로 균형 있게 다듬었습니다.
- **가이드 카드 요약 메타데이터 갱신**:
  - `src/content/kr/guides.ts` 데이터베이스에 수록된 신규 가이드 3종의 요약본(`aiSummaryKo`)을 광고 톤 배제 및 다정하고 품격 높은 요약 톤으로 완전히 교정했습니다.
- **금지어 및 스냅샷 유효성 검사 최종 통과**:
  - 10대 금지어(최고, 완벽, 무조건, 끝판왕, 압도적, 정밀 진단, 불량 확정, 정상 확정 및 '반드시', '후회 없음')에 대한 전수 검증 오류를 완벽하게 예외 없이 클리어했습니다.
  - SetupRadar의 더블클릭, 채터링, 불량화소 진단 도구 경로 링크를 본문 문장 속에 매우 유기적으로 연계시켰습니다.
- **정적 아키텍처 및 추천 로직 보존**:
  - Finder 로직, 제품/스위치 데이터, Control Tower, Supabase/API/DB 등 기존 코어 시스템은 일절 건드리지 않고 문체 보정만 콤팩트하게 완수했습니다.

## Product Patch Merge Policy - 2026-05-28 기록

- `docs/product-patch-merge-policy.md`를 생성해 Gemini LLM 또는 Control Tower가 만든 `product_config_patch`를 기존 제품 데이터에 반영하기 전의 병합 기준을 문서화했다.
- 중복 판정 기준은 `id` 동일, `slug` 동일, `brand + name`이 사실상 동일한 경우, 모델명 표기만 다른 경우로 정리했다.
- Logitech G304 / 로지텍 G304, AULA F75 / AULA 독거미 F75, ATK A9 Ultimate / ATK Dragonfly A9 Ultimate처럼 기존 샘플과 겹칠 가능성이 높은 제품은 새 제품으로 추가하지 않고 업데이트 후보로만 분류한다.
- 필드별 병합 정책을 정리했다:
  - `id`, `slug`, `status`는 기존 값을 유지한다.
  - `basicFilters`는 Finder 결과에 영향을 주므로 기존 값 우선이며, 기존 값이 `any` 또는 `unknown`일 때만 업데이트 후보로 둔다.
  - `detailSpecs`는 기존 값이 비어 있고 공식/명확한 출처 기반일 때만 추가 후보로 둔다.
  - `rawSpecs.note`는 삭제하지 않고 추가 확인 메모 형태로만 덧붙인다.
  - `copy` 문구 대량 교체는 별도 copy QA 작업으로 분리한다.
  - `shellReferences`, `productImages`, `productLinks`는 자동 병합하지 않는다.
- 이번 3개 제품 적용 예시를 기록했다:
  - Logitech G304: 배터리별 무게 변수는 확정 스펙보다 `rawSpecs.note` 보강 후보.
  - AULA F75: 축/키캡/배터리 옵션 파편화로 `detailSpecs` 확정 병합 금지.
  - ATK A9 Ultimate: 쉘 비교 자동 병합 금지, 8K 동글 포함 여부는 `buyingCheck` 또는 `rawSpecs.note` 후보.
- 향후 `merge-product-patch.ts`를 만들 경우 먼저 dry-run validator와 dry-run 보고 형식을 구현하고, 중복 제품 업데이트는 수동 승인 후 적용하는 순서로 진행한다.
- 이번 작업은 정책 문서화만 수행했으며 `src/content/kr/products/*`, `src/content/types.ts`, `src/types.ts`, snapshot JSON, export script, Finder 로직, UI, DB/API/Supabase, Control Tower는 수정하지 않았다.

## Product Patch Dry-run Validator - 2026-05-28 기록

- `scripts/validate-product-patch.ts`를 추가해 Gemini LLM 또는 Control Tower가 만든 `product_config_patch`를 실제 반영 전에 검사할 수 있게 했다.
- `package.json`에 `npm run product-patch:validate -- ./tmp/product-patch.json` 명령을 추가했다. 기존 `tsx` devDependency를 재사용했으며 새 의존성은 추가하지 않았다.
- validator는 patch root의 `projectId`, `type`, `locale`, `products` 구조를 확인하고, 제품별 `id`, `slug`, `brand`, `name`, `category`, `status`, `basicFilters` 허용값을 검사한다.
- patch 내부 `id`/`slug` 중복과 금지 표현을 발견하면 실패로 처리한다.
- 기존 `MOUSE_DATABASE`와 `KEYBOARD_DATABASE`를 읽어 `id`, `slug`, `brand + name` 유사성 기준으로 신규 추가 후보와 기존 중복 후보를 분류한다.
- 중복 제품은 자동 반영하지 않고 자동 보강 후보, 수동 검토 필요 필드, 반영 보류 필드로만 dry-run 보고한다.
- `shellReferences`, `productImages`, `productLinks`, 최상위 `sources`, `status` 변경은 반영 보류 대상으로 분류한다.
- 이번 작업은 dry-run validator만 구현했으며 `merge-product-patch.ts`, 실제 제품 파일 수정, snapshot JSON 수동 수정, Finder 로직, UI, DB/API/Supabase, Control Tower 연동은 추가하지 않았다.

## Product Patch Validator Real Sample QA - 2026-05-28 기록

- validator 실전 QA를 위해 `tmp/product-patch-duplicate-test.json`, `tmp/product-patch-new-candidate-test.json`, `tmp/product-patch-forbidden-terms-test.json`, `tmp/product-patch-invalid-filter-test.json` 임시 샘플을 만들었다.
- 중복 제품 샘플에서는 Logitech G304, AULA F75, ATK A9 Ultimate가 신규 추가 후보 0개, 기존 중복 후보 3개로 분류되는 것을 확인했다.
- 신규 제품 샘플에서는 테스트용 마우스/키보드 2개가 신규 추가 후보로 분류되는 것을 확인했다.
- 금지 표현 샘플은 `카피쉘`, `원본 쉘`, `최고`, `완벽`, `무조건` 위치를 차단 오류로 출력했다.
- 잘못된 필터 샘플은 `mouse.basicFilters.weight = "super_light"`, `keyboard.basicFilters.layout = "75"`를 허용값 오류로 차단했다.
- 실패한 제품이 신규 후보 목록에 함께 표시되면 운영자가 헷갈릴 수 있어, 제품별 오류가 있는 경우 후보 분류에 넣지 않도록 validator 출력 흐름을 보정했다.
- 콘솔 제목을 `제품 patch dry-run 요약`, `확인 필요`, `차단 오류`처럼 한국어 중심으로 정리했다.
- 이번 QA는 임시 JSON 샘플과 validator 출력 보정, 문서 기록만 수행했으며 실제 제품 TS, snapshot JSON, Finder/UI, DB/API/Supabase, Control Tower, `merge-product-patch.ts`는 수정하지 않았다.

## Real New Product Patch Trial - 2026-05-28 기록

- 기존 제품 목록과 snapshot에서 추천 후보 중 `Razer Viper V3 Pro`, `Rainy75`는 이미 존재하는 것을 확인하고 trial 후보에서 제외했다.
- 실제 신규 후보 가능성이 높은 `Pulsar Xlite V3 Large`, `Ninjutso Sora V2 8K`, `Keychron V1 Max` 3개로 `tmp/product-patch-real-new-trial.json` 임시 patch를 만들었다.
- 공식 제품 페이지 중심으로 확인 가능한 정보만 `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs`, `copy`에 정리하고, 불확실한 세부 정보는 `rawSpecs.note`에 확인 필요 메모로 남겼다.
- `npm run product-patch:validate -- ./tmp/product-patch-real-new-trial.json` 실행 결과 신규 추가 후보 3개, 기존 중복 후보 0개, errors 0개, warnings 0개로 통과했다.
- 이번 작업 환경에는 Gemini 전용 실행 도구가 없어, 동일한 `product_config_patch` schema를 사용해 공식/제조사 자료 기반 trial patch를 작성했다.
- 이번 trial은 임시 patch 검증만 수행했으며 실제 제품 TS, snapshot JSON, Finder/UI, DB/API/Supabase, Control Tower, `merge-product-patch.ts`는 수정하지 않았다.

## New Product Manual Apply Trial - 2026-05-28 기록

- `tmp/product-patch-real-new-trial.json`에서 validator를 통과한 신규 후보 3개를 수동으로 제품 TS 데이터에 추가했다.
- 마우스 2개를 `src/content/kr/products/mice.ts`에 추가했다:
  - `Pulsar Xlite V3 Large`
  - `Ninjutso Sora V2 8K`
- 키보드 1개를 `src/content/kr/products/keyboards.ts`에 추가했다:
  - `Keychron V1 Max`
- 세 제품 모두 `status: "review"` 상태로 추가했다.
- 최상위 `sources` 필드는 추가하지 않고, 공식 제품 페이지 기준 정보와 확인 필요 사항은 `rawSpecs.note`에 요약했다.
- `shellReferences`는 자동 확정하지 않았고, `productImages`와 `productLinks`도 추가하지 않았다.
- 반영 후 `npm run product-patch:validate -- ./tmp/product-patch-real-new-trial.json`을 다시 실행했으며, 신규 후보 0개 / 기존 중복 후보 3개 / errors 0개로 감지되는 것을 확인했다.
- `npm run snapshot:export`를 실행해 snapshot을 갱신했다. 결과는 마우스 12개, 키보드 11개이며 review 상태 제품과 미공개 shellReferences 관련 warning은 기존 정책에 맞는 확인 항목으로 출력되었다.
- `npm run lint`와 `npm run build`를 통과했다.
- Finder 로직과 UI는 변경하지 않았다. Mouse/Keyboard Finder는 기존처럼 제품 DB를 읽어 `basicFilters` 기반으로 점수화하고 상위 3개를 표시하므로, 새 review 제품도 구조상 후보군에 포함될 수 있다.
- 이번 작업은 수동 반영 trial이며 `merge-product-patch.ts`, 자동 병합 스크립트, DB/API/Supabase, Control Tower, 가격/이미지/링크 기능은 추가하지 않았다.

## New Product Finder QA - 2026-05-28 기록

- 신규 review 제품 3개가 Finder 후보군에서 자연스럽게 노출되는지 로컬 UI 기준으로 확인했다.
- Mouse Finder에서 `오른손용 비대칭형 / 가벼운 편 / 무선 / 큰 편` 조합으로 `Pulsar Xlite V3 Large`가 결과 카드에 노출되는 것을 확인했다.
- `Ninjutso Sora V2 8K`는 기존 대칭형 중형 무선 제품들과 동점으로 묶여 top 3 밖으로 밀리는 것을 확인했고, 실제 크기 119 x 60 x 37mm 기준 작은 편에 가까운 대칭형으로 보는 것이 더 자연스러워 `handSizeRange`와 `basicFilters.size`를 `small`로 최소 보정했다.
- 보정 후 Mouse Finder에서 `대칭형 / 가벼운 편 / 무선 / 작은 편` 조합으로 `Sora V2 8K`가 결과 카드에 노출되는 것을 확인했다.
- Keyboard Finder에서 `75% / 무선` 조합으로 `Keychron V1 Max`가 결과 카드에 노출되는 것을 확인했다.
- 결과 카드의 브랜드/제품명/요약/핵심 스펙과 `구매 전 체크` 펼침 패널이 깨지지 않는 것을 확인했고, 사용자 화면에 내부 `review` 상태값은 노출되지 않았다.
- `shellReferences`, `productImages`, `productLinks`는 새 제품에 추가하거나 화면에 노출하지 않았다.
- `npm run snapshot:export`를 실행해 snapshot을 갱신했으며, 결과는 마우스 12개 / 키보드 11개를 유지했다. review 상태와 미공개 shellReferences 관련 warning은 기존 정책성 warning으로 확인했다.
- `npm run product-patch:validate -- ./tmp/product-patch-real-new-trial.json`은 반영 후 기준으로 기존 중복 후보 3개, errors 0개로 통과했다.
- Finder 추천 로직, UI 구조, DB/API/Supabase, Control Tower, 가격/이미지/링크 기능은 변경하지 않았다.

## Weekly Product Patch Intake Automation Roadmap - 2026-05-28 기록

- 주간 제품 후보 3~5개를 Gemini LLM 조사 -> `product_config_patch` 생성 -> validator 실행 -> 수동 반영 -> snapshot/lint/build -> Finder QA로 이어가는 현재 루틴을 문서화했다.
- 현재 불편한 점으로 Gemini 결과 마크다운에서 JSON 코드블록을 사람이 직접 찾아 복사해야 하는 점, tmp JSON 파일을 수동으로 만들어야 하는 점, validator 명령을 따로 실행해야 하는 점을 정리했다.
- 향후 후보로 `tmp/gemini-weekly-result.md`에서 `product_config_patch` JSON 코드블록을 추출해 `tmp/product-patch-weekly-candidates.json`을 만들고 validator까지 이어 실행하는 로컬 반자동 intake 흐름을 기록했다.
- 후보 스크립트 이름은 `scripts/extract-product-patch-from-markdown.ts`, package script 후보는 `product-patch:extract` 및 `product-patch:intake`로 정리했다.
- 이번 작업에서는 intake 스크립트, package script, OpenRouter/Gemini/Hermes API 연결, 제품 데이터 반영, snapshot 수정, Finder/UI, Control Tower를 모두 만들거나 수정하지 않았다.

## Weekly Product Manual Apply - 2026-05-28 기록

- validator를 통과한 주간 제품 후보 3개를 실제 제품 TS 데이터에 `review` 상태로 수동 추가했다.
- `src/content/kr/products/mice.ts`에 `Zowie U2`, `Lamzu Maya`를 추가했다.
- `src/content/kr/products/keyboards.ts`에 `NuPhy Halo75 V2`를 추가했다.
- 최상위 `sources` 필드는 현재 제품 타입에 넣지 않고, 공식 제품 페이지 기준 확인 필요 사항은 `rawSpecs.note`에 요약했다.
- `shellReferences`는 자동 확정하지 않았고, `productImages`와 `productLinks`도 추가하지 않았다.
- `Lamzu Maya`의 `정밀한 컨트롤 환경` 표현은 Project7 톤에 맞춰 `민감한 설정을 선호하는 사용자에게 참고할 만합니다`로 완화했다.
- 반영 후 `npm run product-patch:validate -- ./tmp/product-patch-weekly-candidates.json`은 신규 후보 0개, 기존 중복 후보 3개, errors 0개로 통과했다.
- `npm run snapshot:export`를 실행해 snapshot을 갱신했고, 마우스 14개 / 키보드 12개로 생성되었다.
- Finder 추천 로직, UI 구조, DB/API/Supabase, Control Tower, intake 자동화 스크립트, 가격/이미지/링크 기능은 변경하지 않았다.

## Keyboard Finder Layout Filter Copy - 2026-05-29 기록

- Keyboard Finder 배열 선택지에서 별도 `60%` 옵션을 제거했다.
- 기존 `65%` 옵션 문구를 `65% 이하`로 바꿔 65%와 더 작은 배열을 함께 보는 선택지로 정리했다.
- 내부 매칭에서는 60%로 추정되는 제품도 `65% 이하` 선택에 포함되도록 보정했다.
- Finder 추천 점수 구조, 제품 데이터, DB/API/Supabase, Control Tower는 변경하지 않았다.

## Weekly Product Finder QA - 2026-05-29 기록

- 주간 신규 review 제품 3개(`Zowie U2`, `Lamzu Maya`, `NuPhy Halo75 V2`)가 Finder 후보군에 자연스럽게 포함되는지 QA했다.
- Mouse Finder 코드 기준으로 `보통 / 대칭형 / 가벼운 편 / 무선` 조합에서 `Zowie U2`와 `Lamzu Maya`는 기존 대칭형 무선 중형 제품들과 같은 점수권에 들어간다.
- 실제 화면 기준으로는 현재 결과가 top 3만 표시되고, 동점일 때 데이터 순서를 따르기 때문에 `Zowie U2`와 `Lamzu Maya`가 기존 동점 후보 뒤로 밀려 바로 노출되지 않았다.
- Keyboard Finder 코드 기준으로 `75% / 무선 / 잘 모르겠음 / 상관없음` 조합에서 `NuPhy Halo75 V2`는 `Rainy75`, `AULA F75`, `Keychron V1 Max`와 같은 점수권에 들어간다.
- 실제 화면 기준으로는 top 3 제한 때문에 `NuPhy Halo75 V2`가 4번째 동점 후보로 밀려 바로 노출되지 않았다.
- `65% 이하` 선택에서는 `NuPhy Halo75 V2`가 억지로 끼지 않고, 60% 계열로 추정되는 `Wooting 60HE`만 65% 이하 후보로 확인되었다.
- 신규 3개 제품의 `basicFilters`는 현재 데이터 기준으로 큰 오류가 없어 보정하지 않았다.
- 결과 카드와 `구매 전 체크` 패널 구조는 깨지지 않았고, 내부 `review` 상태값과 빈 `shellReferences`, `productImages`, `productLinks`는 화면에 노출되지 않았다.
- 이번 QA에서는 Finder 추천 로직, UI 구조, 제품 상세 패널, DB/API/Supabase, Control Tower를 변경하지 않았다.

## Finder Result More UX - 2026-05-29 기록

- Mouse Finder와 Keyboard Finder 결과 영역에 `후보 더 보기` / `접기` 버튼을 추가했다.
- 기본 표시 개수는 기존과 동일하게 3개로 유지하고, 확장 시 같은 정렬 순서의 전체 후보를 보여준다.
- 결과가 3개 이하이면 더 보기 버튼을 숨긴다.
- 필터 선택이나 초기화를 할 때 더 보기 상태와 열려 있던 `구매 전 체크` 패널을 닫아 새 조건에서는 다시 기본 3개부터 확인하도록 했다.
- 추천 점수 계산, basicFilters 매칭, 75%/65% 이하 배열 필터링, 동점 정렬 기준은 변경하지 않았다.
- 제품 데이터, `status`, `shellReferences`, `productImages`, `productLinks`, DB/API/Supabase, Control Tower는 변경하지 않았다.

## Pre-Launch SEO & Meta QA - 2026-05-29 기록

- 정식 배포 전 SEO 기본 상태를 점검했다.
- root layout metadata에 `metadataBase`, title template, description, Open Graph, Twitter summary card, robots 기본 설정을 추가했다.
- 주요 페이지 metadata를 보강했다:
  - `/kr`: 하드웨어 테스트와 구매 가이드
  - `/kr/tests`: 하드웨어 테스트 도구
  - `/kr/guides`: 하드웨어 구매 가이드
  - `/kr/switches`: 키보드 스위치/축 가이드
  - `/kr/finder/mouse-fit`: 마우스 찾기
  - `/kr/finder/keyboard-fit`: 키보드 찾기
  - `/kr/tests/keyboard-rollover`: 키보드 동시입력 테스트
- `src/app/sitemap.ts`를 추가해 실제 존재하는 `/kr` 주요 route, 테스트 상세 route, 가이드 상세 route, 스위치 사전 route만 sitemap에 포함했다.
- `src/app/robots.ts`를 추가해 기본 검색 허용과 sitemap URL을 제공했다.
- 아직 존재하지 않는 제품 상세 페이지 URL은 sitemap에 넣지 않았다.
- `og:image`는 새 이미지 생성 없이 보류했다. 향후 브랜드 이미지가 준비되면 Open Graph image를 별도 작업으로 추가한다.
- 현재 공개 URL이 `https://setupradar.pages.dev/kr`이므로 metadataBase와 sitemap은 pages.dev 기준으로 두었다. 커스텀 도메인 연결 시 해당 URL을 교체해야 한다.
- Search Console, Analytics, 광고 코드, 제품 데이터, Finder 로직, Control Tower, DB/API/Supabase는 수정하거나 연결하지 않았다.

## Cloudflare Live Deployment QA - 2026-05-29 기록

- GitHub push 이후 Cloudflare Pages 실서비스 URL 기준으로 배포 상태를 QA했다.
- 확인한 공개 URL:
  - `https://setupradar.pages.dev/kr`
  - `https://setupradar.pages.dev/sitemap.xml`
  - `https://setupradar.pages.dev/robots.txt`
  - `https://setupradar.pages.dev/kr/finder/mouse-fit`
  - `https://setupradar.pages.dev/kr/finder/keyboard-fit`
  - `https://setupradar.pages.dev/kr/tests`
  - `https://setupradar.pages.dev/kr/guides`
  - `https://setupradar.pages.dev/kr/switches`
- 모든 대상 URL은 Cloudflare 실서비스에서 HTTP 200으로 응답했다.
- `/kr` 메인에는 최신 Hero 문구와 SEO title/description/canonical이 반영된 것을 확인했다.
- `robots.txt`는 검색 허용(`Allow: /`)과 `https://setupradar.pages.dev/sitemap.xml` sitemap URL을 정상 제공한다.
- `sitemap.xml`은 37개 URL을 포함하며 `/kr` 주요 페이지, 실제 테스트 상세, 실제 가이드 상세, `/kr/switches`를 포함한다. 아직 없는 제품 상세 URL과 `/en`/`/jp`/`/cn` URL은 포함하지 않았다.
- Mouse Finder 실서비스 화면에서 `후보 더 보기` 버튼을 확인했고, 확장 후 `Zowie U2`와 `Lamzu Maya`가 표시되는 것을 확인했다. `구매 전 체크` 패널과 내부 status 미노출도 정상이다.
- Keyboard Finder 실서비스 화면에서 `75%` + `무선` 조건 후 `후보 더 보기` 확장 시 `NuPhy Halo75 V2`가 표시되는 것을 확인했다.
- `65% 이하` 선택에서는 `NuPhy Halo75 V2`가 억지로 포함되지 않았고, `60%` 별도 버튼도 노출되지 않았다.
- `/kr/tests`, `/kr/guides`, `/kr/switches`는 화면 깨짐 없이 접근되며 페이지별 metadata/canonical도 pages.dev 기준으로 확인했다.
- 데스크톱 폭 기준으로 메인과 Keyboard Finder에서 가로 스크롤 overflow가 없는 것을 확인했다.
- `og:image`는 아직 보류 상태이며 실패로 보지 않는다. Search Console, Analytics, 광고 코드, 커스텀 도메인은 아직 연결하지 않았다.
- 이번 QA에서는 제품 데이터, Finder 로직, SEO 구조, Control Tower, DB/API/Supabase, Cloudflare 설정을 수정하지 않았다.

## Search Console & Analytics Prep - 2026-05-29 기록

- 정식 배포 전 Search Console / Analytics 연결 준비를 진행했다.
- `src/components/analytics/GoogleAnalytics.tsx`를 추가해 `NEXT_PUBLIC_GA_MEASUREMENT_ID`가 있을 때만 GA4 스크립트가 렌더링되도록 했다.
- `src/app/layout.tsx`에서 GoogleAnalytics 컴포넌트를 호출하지만, 환경변수가 없으면 `null`을 반환하므로 현재 상태에서는 추적 스크립트가 삽입되지 않는다.
- `.env.example`을 생성하고 `NEXT_PUBLIC_GA_MEASUREMENT_ID=` 빈 placeholder만 추가했다. `.env.local`은 수정하지 않았고 실제 측정 ID도 넣지 않았다.
- README에 Search Console 등록 준비 내용을 기록했다:
  - 현재 sitemap URL: `https://setupradar.pages.dev/sitemap.xml`
  - 현재 robots URL: `https://setupradar.pages.dev/robots.txt`
  - 현재는 pages.dev URL-prefix 속성으로 임시 등록 가능
  - 커스텀 도메인 연결 후 새 도메인 기준 Search Console 속성 등록과 `metadataBase`/canonical/sitemap URL 교체 필요
- Cloudflare Pages 환경변수 TODO를 기록했다. GA4 측정 ID 발급 후 `NEXT_PUBLIC_GA_MEASUREMENT_ID`를 Cloudflare Pages 환경변수로 추가하면 analytics script가 활성화된다.
- 실제 Google 계정 작업, Search Console 소유권 인증, GA4 속성 생성, 광고/AdSense, 제품 데이터, Finder 로직, Control Tower, DB/API/Supabase는 수정하거나 연결하지 않았다.

## GA4 / Cloudflare Environment Live Verification - 2026-05-29 기록

- `GoogleAnalytics.tsx`가 `NEXT_PUBLIC_GA_MEASUREMENT_ID`를 읽고, 값이 없으면 `null`을 반환하는 조건부 구조임을 재확인했다.
- 로컬 기본 빌드 산출물에서 `googletagmanager` / `gtag` 스크립트가 포함되지 않는 것을 확인했다. 이는 측정 ID가 없으면 analytics script를 렌더링하지 않는 의도된 동작이다.
- 실서비스 `https://setupradar.pages.dev/kr`는 HTTP 200으로 정상 응답했다.
- 현재 실서비스 HTML에서는 `googletagmanager.com/gtag/js?id=` 스크립트와 GA config inline script가 확인되지 않았다.
- 따라서 Cloudflare Pages Production 환경변수에 `NEXT_PUBLIC_GA_MEASUREMENT_ID`가 아직 적용되지 않았거나, 환경변수 등록 후 재배포가 완료되지 않은 상태로 판단한다.
- 실제 GA4 측정 ID는 코드, README, 작업 로그에 기록하지 않았다.
- Search Console 실제 등록, 광고/AdSense, 제품 데이터, Finder 로직, Control Tower, DB/API/Supabase는 수정하거나 연결하지 않았다.

## GA4 Live Re-check - 2026-05-30 기록

- Cloudflare Pages Production 환경변수 적용 이후 `https://setupradar.pages.dev/kr` 실서비스를 재확인했다.
- 대상 URL은 HTTP 200으로 정상 응답했다.
- live HTML에서 `googletagmanager.com/gtag/js?id=G-...` 스크립트가 삽입된 것을 확인했다.
- `google-analytics` inline script와 `gtag('config', ...)` 설정 호출도 확인했고, script src의 측정 ID와 config 호출의 측정 ID가 같은 것을 확인했다.
- 실제 GA4 측정 ID는 작업 로그와 보고서에 전체 노출하지 않고 `G-**********` 형태로만 마스킹한다.
- 이번 재확인에서는 코드, 제품 데이터, Finder 로직, Control Tower, DB/API/Supabase, Search Console, 광고/AdSense를 수정하거나 연결하지 않았다.

## Search Console HTML Meta Verification - 2026-05-30 기록

- Search Console의 Google Analytics 인증이 script 위치 문제로 실패해 HTML meta tag 인증 방식으로 전환했다.
- `src/app/layout.tsx`의 App Router metadata에 `verification.google` 값을 추가했다.
- 기존 title, description, Open Graph, Twitter, robots, canonical 기준 metadata는 유지했다.
- 기존 GA4 `GoogleAnalytics` 컴포넌트와 측정 ID 환경변수 구조는 수정하지 않았다.
- Search Console 인증용 meta tag는 인증 완료 후에도 유지한다.
- 제품 데이터, Finder 로직, Control Tower, DB/API/Supabase, 광고/AdSense, Google Tag Manager는 추가하거나 수정하지 않았다.

## KR Sitemap Route - 2026-05-30 기록

- Search Console을 `https://setupradar.pages.dev/kr/` URL-prefix 속성으로 등록한 상태에 맞춰 `/kr/sitemap.xml` route를 추가했다.
- 기존 root sitemap인 `/sitemap.xml`은 유지하고, `/kr/sitemap.xml`은 같은 sitemap 생성 로직을 재사용하도록 했다.
- sitemap에는 기존과 동일하게 실제 존재하는 `/kr` 주요 페이지, 테스트 상세, 가이드 상세, 스위치 사전 route만 포함한다.
- 존재하지 않는 제품 상세 URL, `/en`, `/jp`, `/cn` route는 sitemap에 넣지 않았다.
- 제품 데이터, Finder 로직, GA4 구조, Search Console verification meta, Control Tower, DB/API/Supabase, 광고/AdSense는 수정하지 않았다.

## Content Quality Pass 1 - 2026-05-30 기록

- Search Console sitemap 제출은 raw XML이 정상임을 확인한 상태에서 일단 보류하고, 사이트 문구 신뢰도 개선을 우선했다.
- 메인 Hero와 테스트 도구 섹션 문구를 `진단/정상 판정`처럼 보이지 않게 조정하고, 설치 없이 참고용으로 확인하는 톤을 강화했다.
- Finder 안내 문구는 `정답 추천`보다 구매 전 비교할 후보를 좁히는 도구로 보이도록 다듬었다.
- 테스트 도구 문구에서 고장/불량 확정처럼 읽힐 수 있는 표현을 줄이고, 브라우저 기반 참고용이라는 톤을 유지했다.
- 가이드 문구는 광고성 추천보다 구매 전 체크리스트와 스펙 해석 중심으로 보이도록 최소 보정했다.
- 푸터의 실제 도메인 이메일과 `#` 정책 링크는 공식 서비스처럼 과하게 보이지 않도록 `준비 중` 문구로 낮췄다.
- 사용자 화면 대상 금지 표현 검색 결과 `최고`, `완벽`, `무조건`, `끝판왕`, `압도적`, `확정`, `정밀 진단`, `불량 확정`, `정상 확정`, `반드시`, `후회 없음`, `카피쉘`, `짭`, `표절`, `원본 쉘`, `동일 쉘`, `완전히 같다`, `최저가`, `핫딜`, `support@`는 0건으로 정리했다.
- 제품 데이터, 제품 basicFilters, Finder 추천 로직, snapshot 수동 수정, GA4/Search Console 구조, DB/API/Supabase, Control Tower, 광고/AdSense는 변경하지 않았다.

## Live Copy QA 1 - 2026-05-30 기록

- 실서비스 기준으로 `https://setupradar.pages.dev/kr`, `/kr/tests`, `/kr/guides`, `/kr/finder/mouse-fit`, `/kr/finder/keyboard-fit`, `/kr/switches` 화면의 문구 톤을 확인했다.
- 실서비스 화면은 HTTP 200으로 접근 가능했고, 주요 페이지에서 내부 `review`/`published` 상태값 노출이나 사용자 화면 금지 표현은 확인되지 않았다.
- 메인 Hero의 `설치없이`를 `설치 없이`로 정리하고, Finder 진입 섹션을 `새 장비를 고를 때 Finder로 후보를 좁혀보세요` 톤으로 바꿔 CTA가 덜 딱딱하게 보이도록 했다.
- Tests 페이지 하단은 `다음에 검토할 테스트`보다 신뢰감 있는 `테스트 항목은 신중하게 추가합니다`로 보정했다.
- Guides 페이지 하단은 `가이드 항목은 계속 다듬는 중입니다`보다 구매 전 체크 기준을 보강한다는 방향으로 정리했다.
- Switches 페이지의 클릭축/저소음 리니어축 문구에서 강한 단정과 과장으로 읽힐 수 있는 표현을 완화했다.
- Search Console sitemap 제출 문제는 기존 방침대로 계속 보류했고, sitemap/Search Console/GA4 구조는 수정하지 않았다.
- 제품 데이터, 제품 basicFilters, Finder 추천 로직, snapshot 수동 수정, DB/API/Supabase, Control Tower, 광고/제휴/리뷰 영상은 변경하지 않았다.

## Monetization Policy & Layout Plan - 2026-05-30 기록

- 향후 수익화 기준을 `docs/monetization-plan.md`에 문서화했다.
- Project7은 광고 사이트가 아니라 `하드웨어 테스트 도구 + 구매 전 참고 가이드` 사이트라는 원칙을 먼저 정리했다.
- AdSense 방문형 광고, 링크프라이스/쿠팡파트너스 등 제휴 링크, 가격/옵션 확인 링크의 우선순위와 보류 대상을 구분했다.
- 메인, 테스트 목록/상세, 가이드 목록/상세, Finder별 광고 후보 위치와 금지 위치를 정리했다.
- Finder 질문 선택 영역, 테스트 실행 버튼 주변, 결과 카드 사이에는 광고를 두지 않는 기준을 문서화했다.
- 제휴 링크는 `구매하기`보다 `가격/옵션 확인`, `공식 스펙 확인`, `국내 AS 조건 확인` 같은 확인용 문구를 우선하도록 정리했다.
- AdSense 신청 전 개인정보처리방침, 이용약관 또는 서비스 안내, 문의 채널, 광고/제휴 고지 문구, 미구현 링크 정리를 준비 항목으로 남겼다.
- 실제 AdSense 코드, 광고 script, 링크프라이스/쿠팡파트너스 링크, 구매 버튼, 가격/최저가 기능, 리뷰 영상/YouTube embed는 추가하지 않았다.
- 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower, package 설정은 수정하지 않았다.

## Policy Pages Prep - 2026-05-30 기록

- AdSense/제휴 준비를 위해 최소 정책/안내 페이지를 추가했다.
- 신규 페이지:
  - `/kr/privacy`: 현재 직접 입력받는 개인정보가 없고, GA4 기반 방문 분석과 브라우저 저장 정보가 사용될 수 있음을 안내한다.
  - `/kr/terms`: 테스트 도구와 Finder가 참고용이며, 제품 스펙/가격/AS 조건은 판매처와 제조사 기준으로 함께 확인해야 함을 안내한다.
  - `/kr/disclosure`: 현재 광고/제휴 링크는 없지만 향후 포함될 수 있고, 추천 기준은 광고/제휴 여부와 분리한다는 원칙을 안내한다.
- Footer의 준비 중 정책 문구를 실제 페이지 링크로 바꾸고 `광고·제휴 고지` 링크를 추가했다.
- `/sitemap.xml`과 `/kr/sitemap.xml`에 실제 생성된 정책 페이지 3개를 낮은 priority로 포함했다.
- 실제 AdSense 코드, 광고 script, 링크프라이스/쿠팡파트너스 링크, 구매 버튼은 추가하지 않았다.
- 제품 데이터, Finder 추천 로직, GA4/Search Console verification/robots 구조, DB/API/Supabase, Control Tower는 수정하지 않았다.

## Policy Pages Live QA - 2026-05-31 기록

- Cloudflare 실서비스 기준으로 정책/안내 페이지 3개를 확인했다.
- 확인 URL:
  - `https://setupradar.pages.dev/kr/privacy`
  - `https://setupradar.pages.dev/kr/terms`
  - `https://setupradar.pages.dev/kr/disclosure`
- 세 페이지 모두 HTTP 200으로 응답했고, 각 페이지의 title/canonical/본문 안내가 배포 HTML에 반영된 것을 확인했다.
- `/kr/privacy`에는 회원가입/로그인/결제/댓글/문의 폼 없음, GA4 방문 분석 가능성, 쿠키/브라우저 저장 정보, 향후 광고·제휴 가능성 안내가 반영되어 있다.
- `/kr/terms`에는 테스트 도구와 Finder가 참고용이며, 브라우저/기기/설정 환경에 따라 결과가 달라질 수 있고 제품 스펙/가격/AS 조건은 판매처와 제조사 기준으로 함께 확인해야 한다는 안내가 반영되어 있다.
- `/kr/disclosure`에는 현재 실제 광고 코드와 제휴 구매 링크가 없고, 향후 광고/제휴 링크가 포함될 수 있으며 추천 기준은 광고/제휴 여부와 분리한다는 원칙이 반영되어 있다.
- `/kr` Footer에서 `개인정보처리방침`, `이용 안내`, `광고·제휴 고지`가 각각 `/kr/privacy`, `/kr/terms`, `/kr/disclosure`로 연결되는 것을 확인했다.
- Footer의 빈 `href="#"` 링크는 실서비스 HTML에서 확인되지 않았고, `문의 채널 준비 중` 문구는 유지되어 있다.
- `https://setupradar.pages.dev/sitemap.xml`과 `https://setupradar.pages.dev/kr/sitemap.xml` 모두 정책 페이지 3개 URL을 포함한다.
- 정책 페이지와 Footer의 사용자 화면 대상 금지 표현 검색 결과 문제 없음.
- 실제 AdSense 코드, 광고 script, 링크프라이스/쿠팡파트너스 링크, 구매 버튼은 추가하지 않았다.
- 제품 데이터, Finder 추천 로직, GA4/Search Console verification/sitemap/robots 구조, DB/API/Supabase, Control Tower는 수정하지 않았다.

## AdSense Readiness Check - 2026-05-31 기록

- AdSense 신청 전 준비 상태를 `docs/adsense-readiness-check.md`에 문서화했다.
- 현재 판단은 `C. 콘텐츠/정책 보강 후 신청 권장`으로 정리했다.
- 준비 완료에 가까운 항목:
  - Cloudflare Pages 실서비스 배포
  - 작동하는 테스트 도구와 Finder
  - 가이드 목록과 구매 전 체크 가이드
  - 개인정보처리방침, 이용 안내, 광고·제휴 고지 페이지
  - Footer 정책 링크
  - robots/sitemap, GA4, Search Console 소유권 확인
- 신청 전 약점으로 실제 문의 채널 부재, `pages.dev` 임시 도메인, 일부 준비 중 문구, Search Console sitemap 제출 보류 상태를 기록했다.
- 신청 성공 가능성은 내부 판단용으로 `pages.dev` 현재 상태 약 40%, 커스텀 도메인과 문의 채널 보강 후 약 60%, 콘텐츠와 정책을 1주 정도 더 다듬은 뒤 약 72%로 추정했다.
- 신청 전 우선 보완 추천은 실제 문의 채널, 커스텀 도메인 검토, 준비 중 문구 축소, 핵심 가이드 3~5개 보강, Search Console sitemap 재제출로 정리했다.
- 실제 AdSense 코드, 광고 script, 제휴 링크, 구매 버튼은 추가하지 않았다.
- 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower는 수정하지 않았다.

## Contact Channel Prep - 2026-06-03 기록

- AdSense 신청 전 약점이었던 실제 문의 채널 부재를 보완하기 위해 `/kr/contact` 정적 페이지를 추가했다.
- 문의 이메일은 도메인 구매 전 임시 Gmail 채널인 `yulxwell123@gmail.com`로 안내했고, 도메인 메일이 생기면 교체할 수 있다는 운영 기준은 문서에만 남겼다.
- `/kr/contact`에는 불편한 점, 잘못된 정보, 제품/가이드 보강 제안을 이메일로 보낼 수 있다는 안내와 답변 지연 가능성을 적었다.
- 제품 가격, 재고, AS, 교환 조건은 판매처 또는 제조사 기준으로 확인해야 하며, 테스트 도구 결과는 브라우저, 운영체제, 기기 설정에 따라 달라질 수 있다는 안내를 포함했다.
- Footer의 `문의 채널 준비 중` 문구를 `/kr/contact`로 연결되는 `문의` 링크로 교체했다. Footer에는 이메일을 직접 길게 노출하지 않고 문의 페이지에서만 보여준다.
- `/kr/privacy`에는 문의 이메일로 사용자가 직접 보낸 정보가 답변과 사이트 운영 개선 참고 목적으로 처리될 수 있음을 반영했다. 회원가입, 로그인, 결제, 댓글, 문의 폼 없음 안내는 유지했다.
- `/kr/terms`에는 잘못된 정보나 보강 제안을 문의 이메일로 전달할 수 있고 답변이 늦어질 수 있다는 안내를 추가했다.
- `/kr/disclosure`는 현재 광고/제휴 코드 없음과 향후 운영 원칙을 이미 안내하고 있어 수정하지 않았다.
- root `/sitemap.xml`과 `/kr/sitemap.xml`에 `/kr/contact`를 낮은 priority로 추가했다. 존재하지 않는 URL은 추가하지 않았다.
- `README.md`와 `docs/adsense-readiness-check.md`에 Contact Channel Prep 완료 및 임시 Gmail 문의 채널 운영 기준을 기록했다.
- 검수 결과 `npm run lint`와 `npm run build`를 통과했고, 빌드 산출물 기준으로 `/kr/contact`, Footer 문의 링크, `/kr/privacy`, `/kr/terms`, root `/sitemap.xml`, `/kr/sitemap.xml` 반영을 확인했다.
- 실제 AdSense 코드, 광고 script, 링크프라이스/쿠팡파트너스 링크, 제품 데이터, Finder 추천 로직, GA4/Search Console verification 구조, DB/API/Supabase, Control Tower, package 설정은 수정하지 않았다.

## AdSense Pre-submit Cleanup - 2026-06-03 기록

- AdSense 신청 전 미완성 사이트처럼 보일 수 있는 사용자 화면 요소를 최소 정리했다.
- Header의 EN/JP/CN 비활성 언어 버튼은 심사 전 노출하지 않고 KR만 보이도록 변경했다. 실제 다국어 route나 기능은 추가하지 않았다.
- 메인 페이지 하단의 `가격 정보 연동은 후속 검토 중입니다` 문구를 `가격과 판매 옵션은 구매 전 판매처 기준으로 확인해 주세요.`로 바꿔 미구현 가격 기능 약속처럼 보이지 않게 정리했다.
- Footer는 `/kr/contact`, `/kr/privacy`, `/kr/terms`, `/kr/disclosure` 실제 링크가 연결되어 있고 빈 `href="#"`나 존재하지 않는 도메인 메일 노출이 없음을 확인했다.
- `/kr/privacy`, `/kr/terms`, `/kr/disclosure`, `/kr/contact`는 문의/분석/광고 가능성 안내가 자연스럽게 유지되어 있어 추가 수정하지 않았다.
- 핵심 가이드 후보 5개(`mouse-buying-checklist`, `keyboard-buying-checklist`, `monitor-buying-checklist`, `mouse-shape-symmetrical-vs-ergonomic`, `keyboard-switch-types`)는 현재 유용한 체크 항목이 있으나 압축된 형태라 다음 작업에서 예시와 구매 전 상황별 설명을 보강하는 후보로 남겼다.
- `/kr/tests`는 11개 테스트 도구가 실제 route로 연결되고, 결과를 참고용으로 안내하되 CTA와 목적이 유지되어 있어 추가 수정하지 않았다.
- `docs/adsense-readiness-check.md`에는 cleanup 결과, pages.dev/임시 Gmail/가이드 깊이 리스크, 내부 가능성 추정치(`pages.dev+문의+cleanup` 약 48%, 도메인 구매 후 약 62%, 도메인+핵심 가이드 보강 후 약 74%)를 반영했다.
- 새 실제 페이지를 추가하지 않았으므로 sitemap, robots, Search Console verification 구조는 수정하지 않았다.
- 사용자 화면 대상 금지 표현과 미구현/준비 중 문구를 재점검했고, 허용 범위 밖의 노출 문제는 확인되지 않았다.
- 실제 AdSense 코드, 광고 script, 링크프라이스/쿠팡파트너스 링크, 구매 버튼, 제품 데이터, Finder 추천 로직, GA4 구조, DB/API/Supabase, Control Tower, package 설정은 수정하지 않았다.

## Core Guide Polish 1 - 2026-06-03 기록

- AdSense 신청 전 콘텐츠 깊이 보강을 위해 핵심 구매 체크리스트 3개만 수정했다.
- `/kr/guides/mouse-buying-checklist`는 손 크기와 기존 마우스 수치 비교, 대칭형/오른손용 비대칭형 차이, 무게 체감, 유선/2.4GHz/블루투스 차이, DPI와 실제 감도 환경, 클릭 소음, 휠, 사이드 버튼, 코팅, AS/교환 조건을 구매 전 확인 기준으로 보강했다.
- `/kr/guides/keyboard-buying-checklist`는 풀배열/TKL/75%/65% 이하 배열 선택, 리니어/택타일/클릭/저소음 스위치 구분, 집/사무실/밤 사용 소음 기준, 유선/2.4GHz/블루투스, 키캡/하우징/흡음재 체감 요소, 핫스왑/VIA/QMK 기본 설명, 한글 각인과 OS 호환성 확인을 보강했다.
- `/kr/guides/monitor-buying-checklist`는 크기/해상도/주사율 선택, IPS/VA/OLED 차이, GtG/MPRT 응답속도 문구 주의, 밝기/HDR/명암비 체감 조건, 불량화소/빛샘/IPS Glow/무결점 정책, 포트/스탠드/VESA/책상 공간, 구매 후 테스트 순서를 보강했다.
- 3개 가이드에 page metadata description과 canonical을 추가해 기존 route 기준을 유지하면서 검색 설명을 보강했다.
- `src/content/kr/guides.ts`의 3개 체크리스트 카드 요약을 본문 보강 내용과 맞춰 수정했다.
- `docs/adsense-readiness-check.md`에는 Core Guide Polish 1 완료, 콘텐츠 깊이 리스크 일부 완화, pages.dev 임시 도메인과 Gmail 임시 문의 채널은 남은 약점이라는 점, 내부 가능성 추정치 `55% / 65% / 75%`를 기록했다.
- 새 URL을 만들지 않았으므로 sitemap은 수정하지 않았다.
- 광고/제휴 코드, 제품 구매 버튼, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower, package 설정, 도메인 설정은 수정하지 않았다.

## Core Guide Polish 2 - 2026-06-05 기록

- AdSense 신청 전 콘텐츠 깊이 추가 보강을 위해 Core Guide Polish 1에서 남겨둔 보조 핵심 가이드 2개만 수정했다.
- `/kr/guides/mouse-shape-symmetrical-vs-ergonomic`은 대칭형과 오른손용 비대칭형 차이를 우열이 아니라 손바닥 지지감, 손가락 위치, 그립 방식, 마우스를 들어 올리는 습관, 손목/팔 사용 방식에 따라 달라지는 체감 기준으로 보강했다.
- 마우스 쉘 가이드에는 팜그립/클로그립/핑거팁그립에서 보는 포인트, 좌우 클릭부 높이, 등 높이, 허리 폭, 후면 볼륨, 기존 사용 마우스와 비교할 항목, 직접 잡아볼 수 없을 때 확인할 후기 기준을 추가했다.
- `/kr/guides/keyboard-switch-types`는 리니어/택타일/클릭/저소음 차이와 함께 광축, 자석축, 무접점, 로우프로파일을 초보자 기준으로 설명하고, 타건감이 축만으로 정해지지 않는다는 점을 보강했다.
- 키보드 스위치 가이드에는 키캡, 하우징, 보강판, 흡음재, 윤활, 책상/매트 환경이 소음과 체감에 주는 영향, 게임/사무/밤 사용/공용 공간별 구매 전 확인 기준을 추가했다.
- 두 가이드에 page metadata description과 canonical을 추가해 기존 route 기준을 유지하면서 검색 설명을 보강했다.
- `src/content/kr/guides.ts`의 두 가이드 카드 요약을 본문 보강 내용에 맞춰 수정했다.
- `docs/adsense-readiness-check.md`에는 Core Guide Polish 2 완료, 핵심/보조 가이드 5개 보강 완료, 콘텐츠 깊이 리스크 추가 완화, pages.dev 임시 도메인과 Gmail 임시 문의 채널은 남은 약점이라는 점, 내부 가능성 추정치 `60% / 68% / 76%`를 기록했다.
- 새 URL을 만들지 않았으므로 sitemap은 수정하지 않았다.
- 광고/제휴 코드, 제품 구매 버튼, 제품 데이터, Finder 추천 로직, GA4/Search Console 구조, DB/API/Supabase, Control Tower, package 설정, 도메인 설정은 수정하지 않았다.
