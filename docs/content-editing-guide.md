# SetupRadar 콘텐츠 편집 가이드 (v0.2.8)

SetupRadar는 AI와 운영자가 협업하여 고품질의 기기 정보를 제공하는 하이브리드 콘텐츠 시스템을 사용합니다. 모든 제품 및 스위치 데이터는 `src/content/` 폴더 내의 `.ts` 파일에서 관리됩니다.

## 📂 데이터 구조 및 위치
- **마우스 데이터**: `src/content/kr/products/mice.ts`
- **키보드 데이터**: `src/content/kr/products/keyboards.ts`
- **스위치 데이터**: `src/content/kr/switches.ts`
- **Mouse Finder 옵션**: `src/content/kr/finder/mouseFinderOptions.ts`
- **Keyboard Finder 옵션**: `src/content/kr/finder/keyboardFinderOptions.ts`

## 🛠 편집 원칙: AI vs Editor
각 제품 데이터 객체는 `ai` 필드와 `editor` 필드를 포함할 수 있습니다.

1. **`ai` 필드**: 
   - AI가 생성한 초안 데이터입니다. 
   - 기술 스펙(무게, 센서 등) 중심의 객관적 정보를 담습니다.
   - 운영자가 수정하지 않는 것을 원칙으로 합니다.

2. **`editor` 필드**: 
   - **운영자가 직접 교정한 최종 데이터**입니다.
   - AI의 문체가 딱딱하거나 오류가 있을 경우 이 필드에 내용을 작성합니다.
   - **우선순위**: 시스템은 `editor` 필드가 존재하면 `ai` 필드보다 우선하여 사용자에게 보여줍니다.

## 📝 텍스트 작성 가이드 (Neutral & Objective)
SetupRadar는 신뢰할 수 있는 진단 도구를 지향합니다. 다음 문체를 지켜주세요.

- **객관적 서술**: "최고의 마우스입니다" (X) → "경량화된 설계로 빠른 움직임에 적합합니다" (O)
- **초보자 친화적**: 전문 용어 뒤에는 간단한 보충 설명을 덧붙입니다. (예: "폴링레이트(초당 데이터 전송 횟수)")
- **형태 중심 설명**: v0.2.6부터는 파지법(팜, 클로 등)보다 마우스의 형태(대칭형, 비대칭형)를 중심으로 설명합니다.
- **참고용 표현**: Finder 결과는 "맞을 수 있습니다", "확인이 필요합니다", "참고용으로 보세요"처럼 여지를 남겨 설명합니다.

## 🧩 Copy Editing Workbench 사용 흐름 (v0.3A 추가)
비개발 운영자가 코드 파일을 직접 뒤지지 않고 문구를 검토할 수 있도록 두 가지 작업대를 사용합니다.

실제 화면 문구의 관리 위치가 헷갈릴 때는 먼저 `docs/copy-source-map.md`를 확인합니다. 특히 `/kr` 메인 meta description, Header/Footer 문구, 상세 page.tsx 본문은 Control Tower 작업대나 `siteCopy.ts`만 수정해도 자동으로 바뀌지 않을 수 있습니다.

1. **Markdown 작업대 (`docs/content-copy-workbench.kr.md`)**:
   - 사람이 읽고 전체 문맥을 검토하는 용도입니다.
   - yulxwell이 텍스트로 자유롭게 의견을 남기기에 적합합니다.

2. **JSON 작업대 (`docs/content-copy-workbench.kr.json`)**:
   - **Project99 Control Tower WebUI**에서 읽어들이는 구조화된 데이터 파일입니다.
   - WebUI에서 수정된 내용은 `operator_draft` 필드에 저장되며, 이를 JSON으로 추출(Export)할 수 있습니다.

### 작업 및 반영 흐름
1. **검토**: 운영자는 Control Tower WebUI 또는 Markdown 작업대를 통해 문구를 검토합니다.
2. **수정**: Control Tower WebUI에서 수정안(`operator_draft`)을 작성하고 `memo`를 남깁니다.
3. **추출**: WebUI의 'Export JSON' 기능을 통해 수정된 작업대 파일을 내려받습니다.
4. **반영 (Finalization)**:
   - 추출된 JSON의 `operator_draft` 내용을 Codex/Gemini에게 전달하여 실제 코드(`src/content/`)의 `editor*` 필드에 반영하도록 지시합니다.
   - **주의**: `ai*` 필드는 원본 보존을 위해 절대 직접 덮어쓰지 않습니다.
5. **배포**: 반영 후 Git 커밋/푸시를 하면 Cloudflare Pages를 통해 사이트에 최종 적용됩니다.

이 시스템은 실시간 데이터베이스 연동이 아닌, **WebUI 기반의 로컬 작업 지원 도구**입니다.

### v0.3F Visual Editing Workbench 기준
- Project99 Control Tower의 `/projects/project7/content`는 화면처럼 보이는 mock preview에서 문구를 클릭해 수정하는 방식입니다.
- 기본 편집 단위는 단어가 아니라 전체 문장입니다.
- 수정 내용은 브라우저 localStorage에 임시 저장되고, 복사/파일 저장으로 추출한 뒤 Codex/Gemini가 `editor` 필드에 반영합니다.
- 작업대는 실제 SetupRadar `src/content`를 자동 수정하지 않으며, Supabase/API/n8n과 연결되어 있지 않습니다.
- 작업대 UI 개선은 현재 v0.3F 상태에서 잠그고, 다음 단계는 yulxwell의 실제 문구 수정 루프 테스트입니다.

## 🧭 Finder 옵션 수정 가이드
Finder 질문과 선택지는 `src/content/kr/finder/` 폴더의 config 파일에서 관리합니다.

- `id`: Finder 내부에서 사용하는 항목 식별자입니다. 코드와 연결되므로 신중하게 변경해야 합니다.
- `label`: 화면에 표시되는 질문 제목입니다.
- `helperText`: 질문 아래에 표시되는 짧은 안내 문구입니다.
- `options`: 사용자가 고르는 선택지 목록입니다.
  - `value`: 추천 로직과 연결되는 값입니다. 임의 변경 시 Finder 로직도 함께 확인해야 합니다.
  - `label`: 선택지 이름입니다.
  - `description`: 선택지 아래 보조 설명입니다.

운영자가 문구를 바꿀 때는 `label`, `helperText`, `description` 위주로 수정하는 것을 권장합니다. `id`와 `value`는 추천 로직에 연결되어 있으므로 변경 전 코드 영향 범위를 확인해야 합니다.

Keyboard Finder의 배열 이미지는 현재 외부 이미지를 사용하지 않습니다. 향후 생성형 이미지로 배열 이미지를 추가할 경우 `keyboardFinderOptions.ts`의 `KEYBOARD_LAYOUT_META`에 준비된 `layoutImage` 필드를 사용할 수 있습니다.

v0.2.8부터 Finder는 compact layout을 사용합니다. 선택지는 큰 카드가 아니라 chip 형태로 표시되므로 문구가 길면 화면 밀도가 다시 낮아질 수 있습니다. 질문 제목은 짧게, `helperText`와 `description`은 한 줄에 가깝게 유지해주세요.

Mouse Finder의 "현재 불편한 점"은 별도 질문으로 두지 않습니다. 손목 피로, 선 걸림, 크기 부담 같은 문제는 마우스 형태, 무게, 연결 방식 선택지 설명에 녹여서 안내합니다.

Finder는 필수 사용 흐름이 아니라 장비를 새로 고를 때 쓰는 선택 기능입니다. 메인 페이지에서도 테스트 도구보다 작고 조용한 보조 CTA로 유지합니다.

## ⌨️ 키보드 제품 필터 설계 가이드
키보드 제품 데이터는 많이 저장할 수 있지만, 초보자에게 처음 보여줄 필터는 적게 유지합니다. 다나와식 전체 스펙 필터를 그대로 가져오지 않고 `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs`로 나눕니다.

### 기본 필터
기본 필터는 5개 이하로 유지합니다.

- `layout`: `full`, `tkl`, `compact`, `any`
- `connection`: `wired`, `wireless`, `multi_mode`, `any`
- `feel`: `smooth_linear`, `tactile`, `clicky`, `quiet`, `unknown`
- `noise`: `quiet_preferred`, `no_preference`
- `price`: `budget`, `mid`, `premium`, `any`

### 더보기 필터
더보기 필터는 선택 사항입니다. 처음 화면에서 크게 노출하지 않습니다.

- `gamingFeature`: `rapid_trigger`, `high_polling`, `no_preference`
- `multiDevice`: `multi_pairing`, `no_preference`
- `keycap`: `pbt_preferred`, `no_preference`
- `housing`: `aluminum_preferred`, `lightweight_preferred`, `no_preference`
- `backlight`: `rgb_preferred`, `no_preference`
- `weightFeel`: `light`, `solid_heavy`, `no_preference`

### 상세 스펙 / 원본 스펙
키압 세부값, 매크로, 응답속도 ms, 블루투스 버전, 배터리 종류/용량, 엔터키 형태, 각인 위치, 케이블 재질, 키스킨/루프/리무버, PS2, 스텝스컬쳐, 윈도우 키 잠금, 가로/세로/높이 세부값은 기본 필터가 아니라 `detailSpecs` 또는 `rawSpecs`에 둡니다.

운영 원칙은 "데이터는 보관하되, 첫 화면 필터는 구매 판단에 필요한 것만 보여준다"입니다.

## 🖱️ 마우스 제품 필터 및 쉘 레퍼런스 가이드
마우스 제품도 다나와식 전체 필터를 그대로 가져오지 않습니다. 데이터는 `basicFilters`, `advancedFilters`, `detailSpecs`, `rawSpecs`로 나누고, 쉘 체감 비교를 위해 `shellReferences`를 사용할 수 있습니다.

### 기본 필터
기본 필터는 5개 이하로 유지합니다.

- `shape`: `symmetrical`, `right_ergonomic`, `vertical`, `any`
- `weight`: `ultralight`, `light`, `medium`, `any`
- `connection`: `wired`, `wireless`, `multi_mode`, `any`
- `size`: `small`, `medium`, `large`, `unknown`
- `price`: `budget`, `mid`, `premium`, `any`

### 더보기 필터
더보기 필터는 선택 사항입니다. 처음 화면에서 크게 노출하지 않습니다.

- `gamingPerformance`: `standard`, `high`, `enthusiast`, `no_preference`
- `buttonCount`: `basic`, `side_buttons`, `multi_button`, `no_preference`
- `coating`: `matte`, `rubber`, `glossy`, `no_preference`
- `switchTendency`: `mechanical`, `optical`, `silent`, `unknown`
- `battery`: `built_in`, `aa_aaa`, `wireless_charging`, `unknown`

### 상세 스펙 / 원본 스펙
센서 모델명, 최대 DPI, IPS, FPS 스캔율, 가속도 G, 폴링레이트, 블루투스 버전, USB/PS2, 배터리 종류 세부값, A/S 보증기간, 가로/세로/높이, 버튼 수 세부, DPI 변경 여부, 무게추 조절, 파츠 변경 가능, 무한휠, RGB/LED는 기본 필터가 아니라 `detailSpecs` 또는 `rawSpecs`에 둡니다.

### 쉘 레퍼런스
`shellReferences`는 구매자가 손에 닿는 형태를 상상할 수 있도록 돕는 보조 정보입니다.

- `referenceModelKo`
- `referenceModelEn`
- `relationType`: `similar_shape`, `community_compared`, `inspired_by`, `unknown`
- `confidence`: `low`, `medium`, `high`
- `sourceHint`: `eloshapes`, `community`, `official`, `manual`, `unknown`
- `aiNoteKo`
- `editorNoteKo`
- `cautionKo`

금지 표현:
- 카피쉘
- 배꼈다
- 짭
- 표절
- 원본 쉘

권장 표현:
- 유사 쉘 계열
- 쉘 체감 레퍼런스
- 자주 비교되는 쉘
- 손에 닿는 형태가 비슷하다는 반응
- 비교 기준으로 삼기 좋음

## 🔄 업데이트 프로세스
1. 새로운 제품이나 스위치 정보가 필요할 경우 AI를 통해 초안(`ai`)을 생성합니다.
2. 운영자는 `src/content/` 파일을 열어 내용을 검토합니다.
   - 마우스의 경우 `shapeType` 필드를 `symmetrical`(대칭) 또는 `ergonomic`(비대칭)으로 정확히 지정해야 합니다.
3. 수정이 필요한 경우 `editor` 객체 내의 필드(summary, strengths 등)를 직접 편집합니다.
4. 파일을 저장하면 정적 배포 파이프라인을 통해 즉시 사이트에 반영됩니다.

## 🚢 배포 반영 방식
SetupRadar는 실시간 CMS가 아닙니다. 콘텐츠, 제품 데이터, Finder 옵션 수정은 로컬 파일 변경 후 Git 커밋/푸시를 통해 반영합니다. Git push 이후 Cloudflare Pages가 `npm run build`를 실행하고 `out` 디렉터리의 정적 파일을 배포합니다.
