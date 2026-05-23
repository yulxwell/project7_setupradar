# SetupRadar Product Detail UX Plan (v0.5D)

이 문서는 Finder 결과 상품을 클릭했을 때 보여줄 상세정보 UX 구조를 설계하기 위한 초안입니다.

이번 v0.5D 범위는 문서화입니다. 실제 상세 페이지, 상세 모달, 카드 펼침 패널, 이미지, 링크, 가격, 비교 기능, Supabase/API/DB 연결은 구현하지 않습니다.

## 0. 현재 상태

- Project7은 `/kr` 기준 정적 사이트다.
- Mouse Finder와 Keyboard Finder는 compact 결과 카드 UI를 사용한다.
- 마우스와 키보드 샘플 제품은 각각 10개 수준이다.
- Finder는 `basicFilters`를 우선 읽고, 없으면 기존 필드로 fallback한다.
- `productImages`와 `productLinks` 타입은 준비되어 있지만 화면에는 표시하지 않는다.
- 마우스 `shellReferences`는 검수 조건을 통과한 항목만 작고 조용하게 표시한다.
- 제품 상세 URL과 제품 상세 컴포넌트는 아직 없다.

## 1. 상세정보 진입 방식 비교

### A. 카드 펼침 패널

Finder 결과 카드 안에서 상품을 클릭하면 카드 아래에 상세정보가 펼쳐지는 방식이다.

장점:

- 구현 범위가 가장 작다.
- Finder 흐름을 끊지 않는다.
- 현재 10개 수준 샘플 데이터의 표시 품질을 검증하기 좋다.
- 별도 라우팅 없이 `detailSpecs`, `strengths`, `cautions`, `buyingCheck`를 실험할 수 있다.
- 모바일에서 한 카드씩 열고 닫는 구조로 만들기 쉽다.

단점:

- SEO 효과가 약하다.
- 상세 URL이 없어 공유가 어렵다.
- 정보가 많아지면 Finder 결과 영역이 길어진다.
- 여러 제품을 동시에 비교하기에는 적합하지 않다.

적합한 시점:

- 단기.
- 제품 데이터 구조와 상세정보 위계를 검증하는 단계.

### B. 상세 모달

상품 클릭 시 현재 화면 위에 모달로 상세정보를 표시하는 방식이다.

장점:

- 화면 전환 없이 상세정보를 볼 수 있다.
- Finder 조건과 결과 목록을 유지한 채로 확인할 수 있다.
- 카드 펼침보다 정보 영역을 넓게 쓸 수 있다.

단점:

- 모바일에서 답답할 수 있다.
- 뒤로가기, URL 공유, 접근성 처리가 까다롭다.
- 상세정보가 길어지면 모달 스크롤 UX가 무거워진다.
- 사용자가 모달을 닫고 다시 비교하는 흐름이 번거로울 수 있다.

적합한 시점:

- 단기 실험은 가능하지만, 모바일 중심 초보자 사이트에서는 우선순위가 낮다.

### C. 제품 상세 페이지

`/kr/products/[slug]` 같은 별도 페이지를 만드는 방식이다.

장점:

- SEO와 공유에 유리하다.
- 향후 이미지, 공식 링크, 가격 확인 링크, 제휴 안내, 상세 스펙을 배치하기 좋다.
- 제품별 문구 품질을 독립적으로 관리할 수 있다.
- DB화 이후 `published` 제품만 공개하는 구조와 잘 맞는다.

단점:

- 지금은 제품 데이터가 아직 샘플 수준이라 상세 페이지가 빈약할 수 있다.
- 라우팅, 페이지 템플릿, 메타데이터, 404 처리가 필요하다.
- 구현 범위가 커진다.
- 제품 수가 적을 때는 사이트가 과하게 커 보일 수 있다.

적합한 시점:

- 중기.
- 샘플 데이터 QA가 끝나고 제품 문구와 스펙이 더 안정된 뒤.

## 2. 현재 추천

- 단기: 카드 펼침 패널
- 중기: `/kr/products/[slug]` 상세 페이지
- 장기: DB화 후 제품 상세/비교/가격 확인 링크 연결

이유:

- 지금은 Finder에서 샘플 제품을 검증하는 단계다.
- 별도 상세 페이지를 만들기에는 이미지, 링크, 상세 스펙, 검수 상태가 아직 부족하다.
- 카드 펼침 패널은 기존 Finder 흐름을 유지하면서 상세정보 위계를 빠르게 검증할 수 있다.
- 상세 페이지는 제품 데이터 품질과 `published` 기준이 더 분명해진 뒤 만드는 편이 안전하다.

## 3. 마우스 상세정보 섹션 초안

### 현재 데이터로 표시 가능한 항목

1. 브랜드/제품명
   - `brand`
   - `name`

2. 요약
   - `editorSummaryKo || aiSummaryKo`

3. 핵심 스펙
   - `weight`
   - `shapeType` 또는 `basicFilters.shape`
   - `basicFilters.connection`
   - `dimensions`
   - `sensor` 또는 `detailSpecs.sensorModel`
   - `detailSpecs.pollingRateHz`
   - `detailSpecs.maxDpi`

4. basicFilters 기반 구매 판단
   - 형태: `basicFilters.shape`
   - 무게감: `basicFilters.weight`
   - 연결: `basicFilters.connection`
   - 크기감: `basicFilters.size`
   - 가격대: `basicFilters.price`

5. detailSpecs 중 확실한 값
   - 센서 모델명
   - 폴링레이트
   - 최대 DPI
   - 크기
   - RGB 여부
   - 무게추/무한휠/파츠 변경 여부 등 확실한 값만

6. 장점
   - `editorStrengthsKo || aiStrengthsKo`

7. 주의점
   - `editorCautionsKo || aiCautionsKo`

8. 구매 전 체크
   - `editorBuyingCheckKo || aiBuyingCheckKo`

9. 체감 한줄평
   - `editorCommunityNoteKo || aiCommunityNoteKo`

10. 쉘 체감 레퍼런스
   - 검수 조건을 통과한 `shellReferences`만 표시
   - `editorNoteKo`가 있는 항목만 표시
   - `confidence`는 medium/high만 표시
   - `sourceHint`가 unknown인 항목은 표시하지 않음
   - low confidence 항목은 표시하지 않음

### 나중에 추가할 항목

- 제품 이미지
- 공식 링크
- 가격 확인 링크
- 최저가 추적
- 유사 쉘 비교
- 제품 비교
- 커뮤니티 후기 요약
- 손 크기별 체감 후기
- 쉘 실측 이미지 또는 자체 제작 비교 이미지

## 4. 키보드 상세정보 섹션 초안

### 현재 데이터로 표시 가능한 항목

1. 브랜드/제품명
   - `brand`
   - `name`

2. 요약
   - `editorSummaryKo || aiSummaryKo`

3. 배열
   - `layout`
   - `basicFilters.layout`

4. 연결 방식
   - `basicFilters.connection`
   - 기존 `features` 내 무선/유선 힌트 fallback

5. 키감/축 느낌
   - `switchType`
   - `basicFilters.feel`

6. 소음 성향
   - `basicFilters.noise`

7. 가격대
   - `basicFilters.price`
   - 현재 `priceRange`는 표기 방식이 섞여 있으므로 상세에서는 참고 정도로만 사용

8. 핵심 스펙
   - `isHotSwap`
   - `material`
   - `detailSpecs.actuationForceG`
   - `detailSpecs.responseTimeMs`
   - `detailSpecs.bluetoothVersion`
   - `detailSpecs.battery`
   - `detailSpecs.dimensionsMm`

9. 장점
   - `editorStrengthsKo || aiStrengthsKo`

10. 주의점
   - `editorCautionsKo || aiCautionsKo`

11. 구매 전 체크
   - `editorBuyingCheckKo || aiBuyingCheckKo`

12. 체감 한줄평
   - `editorCommunityNoteKo || aiCommunityNoteKo`

### 나중에 추가할 항목

- 제품 이미지
- 스위치 상세
- 키캡 소재/프로파일 상세
- 하우징/보강판/흡음 구조
- 타건음/소음 참고
- 공식 링크
- 가격 확인 링크
- 제품 비교
- 배열별 실제 키 배치 이미지

## 5. 상세정보에서 표시하지 말아야 할 것

- 내부 `status`
- `review` / `published` 표시
- 미승인 `productImages`
- 미승인 `productLinks`
- low confidence `shellReferences`
- `sourceHint: "unknown"`인 `shellReferences`
- 검증되지 않은 가격
- 최저가처럼 보이는 표현
- 구매 유도형 링크
- 단정적 불량/성능 표현
- "최고", "완벽", "무조건", "끝판왕", "압도적", "확정", "정밀 진단"
- "카피쉘", "짭", "표절", "원본 쉘", "동일 쉘", "완전히 같다"

## 6. UI 원칙

- Finder 결과 카드에는 요약만 표시한다.
- 상세정보는 클릭한 사람에게만 표시한다.
- 기본 Finder 화면을 복잡하게 만들지 않는다.
- 정보 순서는 "요약 -> 스펙 -> 장점/주의 -> 구매 전 체크"를 기본으로 한다.
- 스펙은 표처럼 짧게 보여준다.
- 장점과 주의점은 2~3개만 우선 노출하고, 길면 접는다.
- 모바일에서는 접기/펼치기 구조를 유지한다.
- 상세정보 영역에서도 내부 status, 미승인 이미지/링크, 가격 추적 정보는 숨긴다.
- 쉘 레퍼런스는 마우스 상세에서도 본문보다 작고 조용하게 둔다.

## 7. 카드 펼침 패널 초안 구조

```txt
제품 카드
├─ 브랜드 / 제품명
├─ 짧은 요약
├─ 핵심 스펙 4~6개
├─ 체감 한줄평
└─ 자세히 보기 버튼
   └─ 펼침 패널
      ├─ 이 제품을 볼 때 먼저 확인할 것
      ├─ 상세 스펙
      ├─ 장점
      ├─ 주의점
      ├─ 구매 전 체크
      └─ 쉘 체감 레퍼런스(마우스만, 검수 통과 항목만)
```

## 8. 향후 구현 순서 제안

1. 카드 펼침 상세 패널 mock 구현
2. 마우스/키보드 공통 `ProductDetailPanel` 컴포넌트 분리
3. `productImages` / `productLinks`는 계속 숨김
4. 샘플 10개로 표시 품질 확인
5. 제품 상세 페이지 필요성 판단
6. DB snapshot 구조와 연결
7. `published` 제품만 상세 페이지에 노출할지 결정
8. 이미지/링크 승인 플로우가 생긴 뒤 상세 페이지로 확장

## 9. 지금 구현하지 않는 항목

- 실제 상세 페이지 생성
- `/kr/products/[slug]` 라우팅
- 상세 모달
- 카드 펼침 패널 구현
- 제품 이미지 표시
- 제품 링크 표시
- 가격/최저가/구매 링크
- 제품 비교 기능
- Supabase/API/DB 연결
- Control Tower 수정
- 제품 데이터 대량 수정
- Finder 추천 로직 변경

## 10. 다음 결정이 필요한 질문

- 상세정보 첫 구현을 카드 펼침 패널로 할지 확정할 것
- 제품 상세 페이지를 만들 때 `review` 제품을 제외하고 `published`만 노출할지 결정할 것
- 제품 이미지는 자체 제작/승인 이미지가 준비되기 전까지 placeholder만 쓸지 결정할 것
- 가격 확인 링크를 언제, 어떤 승인 문구와 함께 열지 결정할 것
