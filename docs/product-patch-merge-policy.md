# SetupRadar Product Patch Merge Policy

이 문서는 Gemini LLM이나 Control Tower가 만든 `product_config_patch`를 기존 Project7 제품 데이터에 반영하기 전에 적용할 병합 기준이다.

이번 범위는 정책 문서화다. `merge-product-patch.ts` 구현, 기존 제품 데이터 자동 수정, snapshot 수동 수정, Supabase/API/DB 연결은 하지 않는다.

## 1. 목적

`product_config_patch`는 제품 추가와 기존 제품 보강을 모두 담을 수 있다. 그러나 Project7은 Finder 추천, 제품 문구, 쉘 체감 레퍼런스가 서로 연결되어 있어 중복 제품을 잘못 추가하거나 기존 값을 덮어쓰면 데이터 품질이 빠르게 흐려질 수 있다.

이 정책의 목적은 다음과 같다.

- Gemini LLM이 만든 제품 patch를 기존 Project7 제품 데이터에 안전하게 반영하기 위한 기준을 정한다.
- 자동 병합 전에 사람이 검수할 항목과 보류할 항목을 구분한다.
- 중복 제품, 출처 불명 스펙, 과장 문구, 위험한 쉘 비교 표현으로 인한 데이터 오염을 막는다.

## 2. 제품 중복 판정 기준

아래 중 하나라도 맞으면 새 제품이 아니라 기존 제품의 업데이트 후보로 본다.

- `id`가 동일하다.
- `slug`가 동일하다.
- `brand + name`이 사실상 동일하다.
- 모델명 표기만 다르다.

예시:

- `Logitech G304` / `로지텍 G304`
- `AULA F75` / `AULA 독거미 F75`
- `ATK A9 Ultimate` / `ATK Dragonfly A9 Ultimate`

중복으로 판단되면 새 제품으로 추가하지 않는다. patch는 기존 제품 업데이트 후보로만 분류한다.

## 3. 중복일 때 기본 원칙

- 새 제품으로 추가하지 않는다.
- 기존 제품을 무조건 덮어쓰지 않는다.
- patch는 업데이트 후보로 분류한다.
- 확실한 신규 정보만 보강 후보가 된다.
- 불확실한 정보는 `rawSpecs.note` 후보로만 둔다.
- `editor*` 필드는 사람이 직접 검수한 경우에만 수정한다.
- `ai*` 초안 필드는 필요 시 보강 가능하지만 과장 표현을 쓰지 않는다.
- Finder 결과에 영향을 주는 `basicFilters` 변경은 반드시 보고한다.

## 4. 필드별 병합 규칙

| 필드 | 병합 규칙 |
| --- | --- |
| `id` / `slug` | 기존 값을 유지한다. patch 값으로 변경하지 않는다. |
| `brand` / `name` | 기존 값을 유지한다. 오탈자 수정이 명확한 경우만 후보로 표시한다. |
| `status` | 기존 값을 유지한다. patch가 `review`여도 기존 `published`를 낮추지 않는다. `published` 승격은 별도 검수 후 수동 처리한다. |
| `basicFilters` | 기존 값 우선. patch 값이 더 명확하고 기존 값이 `any` / `unknown`일 때만 업데이트 후보로 둔다. 기존 값이 구체적이면 덮어쓰지 않는다. |
| `advancedFilters` | 공개 추천 로직에 강하게 쓰지 않으므로 보수적으로 유지한다. 확실한 정보만 추가 후보로 둔다. |
| `detailSpecs` | 기존 값이 비어 있고 patch 값이 공식 또는 명확한 출처 기반일 때만 추가 후보로 둔다. 기존 값이 있으면 덮어쓰지 않는다. 출처 간 충돌은 `rawSpecs.note`로 보낸다. |
| `rawSpecs.note` | 기존 note를 삭제하지 않는다. 새 정보는 `추가 확인 메모` 형태로 뒤에 덧붙이는 방식만 허용한다. 중복 문장 추가를 막아야 한다. |
| `copy.summaryKo` | 기존 문구 유지 우선. patch 문구가 더 자연스러워도 바로 덮어쓰지 않고 별도 copy QA 작업으로 분리한다. |
| `copy.strengthsKo` / `copy.cautionsKo` / `copy.buyingCheckKo` | 기존 값 유지 우선. 새 항목이 구매 판단에 명확히 도움 되고 중복이 아니면 추가 후보로 둔다. 최대 3개 원칙을 유지한다. |
| `shellReferences` | 자동 병합 금지. `editorNoteKo` 없는 항목은 public-ready가 아니다. 공식/검수 출처 없는 쉘 비교는 넣지 않는다. 커뮤니티 비교 수준은 `rawSpecs.note` 후보로 둔다. |
| `sources` | 현재 타입에 없으면 최상위 필드로 추가하지 않는다. `rawSpecs.note`에 참고 출처 요약으로 남길 수 있다. 장기적으로 `rawSpecs.sources` 또는 `researchSources` 도입 후보로 기록한다. |
| `productImages` / `productLinks` | 자동 병합 금지. `approved` 검수 전 공개 후보가 아니다. 이번 병합 정책에서는 제외한다. |

## 5. 자동 병합 가능/불가 기준

자동 병합 가능 후보:

- 기존 값이 비어 있다.
- patch 값이 허용 enum 안에 있다.
- 공식 또는 신뢰 가능한 출처 기반이다.
- 금지 표현이 없다.
- Finder 로직 영향이 낮다.

자동 병합 불가:

- 기존 값 덮어쓰기
- `basicFilters` 변경
- `published` 상태 변경
- `shellReferences` 추가
- `productLinks` / `productImages` 추가
- 출처 충돌 스펙
- 판매처 옵션별로 달라지는 스펙
- 문구 대량 교체

## 6. dry-run 보고 형식

나중에 `merge-product-patch.ts`를 만들 경우 기본 실행은 dry-run이어야 한다. 실제 파일 수정 전 아래 항목을 보고한다.

- 입력 patch 제품 수
- 신규 추가 후보
- 기존 중복 후보
- 자동 병합 가능 필드
- 수동 검토 필요 필드
- 반영 보류 필드
- 금지 표현 검사 결과
- `id` / `slug` 중복 검사 결과
- snapshot validation 예상 결과

dry-run 출력은 “반영됨”이 아니라 “후보” 기준으로 말해야 한다.

## 7. 이번 3개 제품 적용 예시

### Logitech G304

- 중복 가능성 높음.
- 새 제품으로 추가하지 않는다.
- `id: logitech-g304` 또는 동일 모델명 기준으로 기존 제품 업데이트 후보로 둔다.
- 배터리 종류에 따라 무게가 달라질 수 있는 정보는 `detailSpecs` 확정보다 `rawSpecs.note` 보강 후보가 적합하다.

### AULA F75

- 중복 가능성 높음.
- 새 제품으로 추가하지 않는다.
- 축, 키캡, 배터리, 연결 옵션이 판매처와 구성에 따라 파편화될 수 있으므로 `detailSpecs` 확정 병합을 피한다.
- 옵션 차이는 `rawSpecs.note` 보강 후보로 둔다.

### ATK A9 Ultimate

- 중복 가능성 높음.
- 새 제품으로 추가하지 않는다.
- 쉘 비교는 `shellReferences` 자동 추가 금지.
- 커뮤니티 비교 수준의 쉘 언급은 `rawSpecs.note` 후보로만 둔다.
- 8K 동글 포함 여부처럼 구성에 따라 달라질 수 있는 정보는 `buyingCheck` 후보 또는 `rawSpecs.note` 후보로 둔다.

## 8. 향후 구현 순서

1. 병합 정책 문서 확정
2. `product_config_patch` dry-run validator 작성
   - `npm run product-patch:validate -- ./tmp/product-patch.json` 형식으로 실행한다.
   - validator는 실제 제품 파일을 수정하지 않고 신규 추가 후보, 기존 중복 후보, 자동 보강 후보, 수동 검토 필요 필드, 반영 보류 필드만 보고한다.
   - 금지 표현, patch 내부 `id`/`slug` 중복, category/status/basicFilters 허용값 오류는 실패로 처리한다.
3. `merge-product-patch.ts` dry-run 모드 작성
4. 신규 제품 추가만 자동화
5. 중복 제품 업데이트는 수동 승인 후 적용
6. Control Tower에서 patch 검토 화면 보강
7. DB/snapshot 기반 운영으로 확장

## 9. 지금 하지 말아야 할 것

- `merge-product-patch.ts` 구현
- 기존 제품 자동 업데이트
- `sources` 필드 타입 추가
- `shellReferences` 자동 병합
- `productImages` / `productLinks` 자동 병합
- DB/API/Supabase 추가
- Control Tower 수정

## 10. Real Sample QA 기록

2026-05-28 기준 `scripts/validate-product-patch.ts`를 아래 임시 patch로 점검했다.

- `tmp/product-patch-duplicate-test.json`: Logitech G304, AULA F75, ATK A9 Ultimate가 신규이 아니라 기존 중복 후보 3개로 분류되는지 확인했다.
- `tmp/product-patch-new-candidate-test.json`: 테스트용 신규 마우스/키보드가 신규 추가 후보 2개로 분류되는지 확인했다.
- `tmp/product-patch-forbidden-terms-test.json`: 금지 표현이 포함된 patch가 차단 오류로 실패하는지 확인했다.
- `tmp/product-patch-invalid-filter-test.json`: 허용값 외 `basicFilters`가 차단 오류로 실패하는지 확인했다.

QA 결과, validator는 실제 제품 파일을 수정하지 않고 후보 분류와 차단 오류를 출력했다. 실패한 제품은 신규 후보나 중복 후보에 섞어 표시하지 않도록 출력 흐름을 보정했다.

## 11. Real New Product Patch Trial 기록

2026-05-28 기준 실제 신규 후보 가능성이 높은 제품 3개로 `tmp/product-patch-real-new-trial.json`을 만들고 validator를 실행했다.

- 후보 제품:
  - `Pulsar Xlite V3 Large`
  - `Ninjutso Sora V2 8K`
  - `Keychron V1 Max`
- 기존 제품 목록 및 snapshot에서 `Razer Viper V3 Pro`, `Rainy75`는 이미 존재하는 것을 확인해 이번 trial 후보에서 제외했다.
- validator 결과:
  - 신규 추가 후보: 3
  - 기존 중복 후보: 0
  - errors: 0
  - warnings: 0

이번 trial은 임시 patch 검증만 수행했으며 실제 제품 TS 파일, snapshot JSON, Finder/UI, DB/API/Supabase, Control Tower, `merge-product-patch.ts`는 변경하지 않았다.

## 12. New Product Manual Apply Trial 기록

2026-05-28 기준 validator를 통과한 신규 후보 3개를 자동 병합 없이 수동으로 제품 TS 데이터에 추가했다.

- `src/content/kr/products/mice.ts`
  - `Pulsar Xlite V3 Large`
  - `Ninjutso Sora V2 8K`
- `src/content/kr/products/keyboards.ts`
  - `Keychron V1 Max`

공통 적용 원칙:

- 모두 `status: "review"`로 추가했다.
- 기존 제품을 덮어쓰지 않고 신규 항목으로만 추가했다.
- 최상위 `sources` 필드는 추가하지 않았다.
- `shellReferences`는 자동 확정하지 않아 비워두거나 생략했다.
- `productImages`와 `productLinks`는 추가하지 않았다.
- 불확실한 정보는 `detailSpecs`에 확정하지 않고 `rawSpecs.note`에 확인 필요 메모로 남겼다.
- 반영 후 같은 patch를 validator로 다시 실행했을 때 신규 후보 0개, 기존 중복 후보 3개로 감지되는 것을 확인했다.
