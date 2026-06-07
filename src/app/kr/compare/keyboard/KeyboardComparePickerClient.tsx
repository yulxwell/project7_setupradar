"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, GitCompare, Keyboard as KeyboardIcon, ShieldCheck } from "lucide-react";

export interface KeyboardPickerProduct {
  id: string;
  brand: string;
  name: string;
  summary: string;
  cautions: string[];
  buyingCheck: string[];
  layout: string;
  switchType: string[];
  isHotSwap: boolean;
  material: string;
  features: string[];
  specTags: string[];
  rawNote: string;
  basicFilters?: {
    layout: string;
    connection: string;
    feel: string;
    noise: string;
    price: string;
  };
  advancedFilters?: {
    gamingFeature?: string;
    multiDevice?: string;
    keycap?: string;
    housing?: string;
    backlight?: string;
    weightFeel?: string;
  };
  detailSpecs?: {
    actuationForceG?: number | null;
    macroSupport?: boolean | null;
    responseTimeMs?: number | null;
    bluetoothVersion?: string | null;
    battery?: string | null;
    enterKeyShape?: string | null;
    legendPosition?: string | null;
    cableMaterial?: string | null;
    accessories?: string[] | null;
    ps2Support?: boolean | null;
    stepSculpture?: boolean | null;
    windowsKeyLock?: boolean | null;
    dimensionsMm?: {
      width?: number;
      depth?: number;
      height?: number;
    } | null;
  };
}

interface KeyboardComparePickerClientProps {
  products: KeyboardPickerProduct[];
}

const fallbackText = "확인 필요";

const layoutLabels: Record<string, string> = {
  full: "풀배열",
  tkl: "TKL",
  "75%": "75%",
  "65%": "65%",
  compact: "컴팩트",
  any: "배열 확인 필요",
};

const switchLabels: Record<string, string> = {
  linear: "리니어",
  tactile: "택타일",
  clicky: "클릭",
  magnetic: "자석축",
  optical: "광축",
  capacitive: "무접점",
  unknown: fallbackText,
};

const feelLabels: Record<string, string> = {
  smooth_linear: "부드러운 리니어 성향",
  tactile: "구분감 있는 택타일 성향",
  clicky: "클릭감 있는 성향",
  quiet: "저소음 성향",
  unknown: fallbackText,
};

const noiseLabels: Record<string, string> = {
  quiet_preferred: "조용한 공간 기준 확인",
  no_preference: "소음 취향 확인",
};

const connectionLabels: Record<string, string> = {
  wired: "유선",
  wireless: "무선",
  multi_mode: "멀티모드",
  any: "연결 방식 확인 필요",
};

const materialLabels: Record<string, string> = {
  plastic: "플라스틱 하우징",
  aluminum: "알루미늄 하우징",
  polycarbonate: "폴리카보네이트 하우징",
};

const keycapLabels: Record<string, string> = {
  pbt: "PBT 키캡 참고",
  abs: "ABS 키캡 참고",
  any: "키캡 옵션 확인 필요",
};

const housingLabels: Record<string, string> = {
  plastic: "플라스틱 하우징 계열",
  aluminum: "알루미늄 하우징 계열",
  any: "하우징 옵션 확인 필요",
};

function getProductLabel(product: KeyboardPickerProduct) {
  return `${product.brand} ${product.name}`;
}

function getSwitchNames(product: KeyboardPickerProduct) {
  const names = product.switchType.map((type) => switchLabels[type] ?? fallbackText).filter((name) => name !== fallbackText);
  return names.length > 0 ? names.join(" · ") : fallbackText;
}

function getLayout(product: KeyboardPickerProduct) {
  return layoutLabels[product.layout] ?? layoutLabels[product.basicFilters?.layout ?? ""] ?? fallbackText;
}

function getSwitchFeel(product: KeyboardPickerProduct) {
  const switchText = getSwitchNames(product);
  const feelText = feelLabels[product.basicFilters?.feel ?? ""] ?? "";
  const actuation = product.detailSpecs?.actuationForceG ? `${product.detailSpecs.actuationForceG}g 작동압 참고` : "";

  return [switchText, feelText, actuation].filter(Boolean).join(" · ") || fallbackText;
}

function getNoise(product: KeyboardPickerProduct) {
  const noise = noiseLabels[product.basicFilters?.noise ?? ""] ?? "소음 확인 필요";

  if (product.switchType.includes("clicky")) {
    return `${noise}. 클릭 계열은 공간에 따라 크게 느껴질 수 있어 후기의 소음 녹음을 확인해 보세요.`;
  }

  return `${noise}. 실제 소음은 스위치, 키캡, 하우징, 책상 환경에 따라 달라질 수 있습니다.`;
}

function getConnection(product: KeyboardPickerProduct) {
  return connectionLabels[product.basicFilters?.connection ?? ""] ?? fallbackText;
}

function getDetailConnection(product: KeyboardPickerProduct) {
  const bluetooth = product.detailSpecs?.bluetoothVersion ? `Bluetooth ${product.detailSpecs.bluetoothVersion}` : "";
  const battery = product.detailSpecs?.battery ? `배터리: ${product.detailSpecs.battery}` : "";
  const accessories = product.detailSpecs?.accessories?.filter((item) => /동글|리시버|케이블|cable|receiver/i.test(item)).slice(0, 2).join(" · ") ?? "";
  const details = [bluetooth, battery, accessories].filter(Boolean).join(" · ");

  return details || "유선, 2.4GHz, 블루투스 지원과 구성품은 판매처/제조사 기준 확인이 필요합니다.";
}

function getHotSwap(product: KeyboardPickerProduct) {
  return product.isHotSwap
    ? "핫스왑 가능 후보입니다. 지원 소켓과 스위치 호환 범위는 판매처 기준으로 확인해 주세요."
    : "고정축 또는 확인이 필요한 후보입니다. 스위치 교체가 중요하면 제품 상세 설명을 다시 확인해 주세요.";
}

function getDeviceCompatibility(product: KeyboardPickerProduct) {
  const text = [...product.features, ...product.specTags, product.rawNote].join(" ");
  const hints = [
    /mac|맥/i.test(text) ? "Mac 사용 참고" : "",
    /windows|윈도우/i.test(text) || product.detailSpecs?.windowsKeyLock ? "Windows 사용 참고" : "",
    /bluetooth|블루투스|멀티|multi/i.test(text) || product.basicFilters?.connection === "multi_mode" ? "여러 기기 전환 확인" : "",
    product.detailSpecs?.macroSupport ? "매크로/설정 기능 확인" : "",
  ].filter(Boolean);

  return hints.length > 0
    ? `${hints.slice(0, 3).join(" · ")}. OS별 키 배열과 전환 방식은 실제 옵션을 확인해 주세요.`
    : "OS, 태블릿, 여러 기기 전환은 배열과 연결 방식을 함께 확인해야 합니다.";
}

function getKeycapHousing(product: KeyboardPickerProduct) {
  const keycap = keycapLabels[product.advancedFilters?.keycap ?? ""] ?? "";
  const housing = housingLabels[product.advancedFilters?.housing ?? ""] ?? materialLabels[product.material] ?? "";
  const legend = product.detailSpecs?.legendPosition ? `각인 위치: ${product.detailSpecs.legendPosition}` : "";
  const sculpt = product.detailSpecs?.stepSculpture ? "스텝스컬처 참고" : "";

  return [keycap, housing, legend, sculpt].filter(Boolean).join(" · ") || "키캡, 하우징, 흡음 구성은 판매처 옵션에 따라 달라질 수 있습니다.";
}

function getPortability(product: KeyboardPickerProduct) {
  const layout = getLayout(product);
  const connection = getConnection(product);
  const weightFeel = product.advancedFilters?.weightFeel === "heavy" ? "무게감 있는 체감" : product.advancedFilters?.weightFeel === "light" ? "가벼운 체감" : "휴대성 확인 필요";

  return `${layout} / ${connection} / ${weightFeel}. 휴대 목적이면 크기, 무게, 케이스와 케이블 구성을 함께 확인해 주세요.`;
}

function getUseCase(product: KeyboardPickerProduct) {
  const uses = [
    product.advancedFilters?.gamingFeature === "rapid_trigger" ? "게임용 빠른 입력 기능 참고" : "",
    product.advancedFilters?.gamingFeature === "standard" ? "일반 게임과 타이핑 겸용 참고" : "",
    product.basicFilters?.noise === "quiet_preferred" ? "공용 공간 또는 밤 사용 확인" : "",
    product.detailSpecs?.macroSupport ? "코딩/작업용 설정 기능 확인" : "",
  ].filter(Boolean);

  return uses.length > 0
    ? `${uses.slice(0, 3).join(" · ")}. 타건감은 스위치만으로 결정되지 않습니다.`
    : "게임, 사무, 코딩 만족도는 배열, 소음, 키감, 책상 환경에 따라 달라질 수 있습니다.";
}

function getBuyingChecks(product: KeyboardPickerProduct) {
  const checks = product.buyingCheck.length > 0 ? product.buyingCheck : product.cautions;
  return checks.slice(0, 3);
}

function getDifferenceSummary(productA: KeyboardPickerProduct, productB: KeyboardPickerProduct) {
  const summary = [];

  if (getLayout(productA) !== getLayout(productB)) {
    summary.push("배열이 다르면 방향키, 펑션열, 숫자패드 사용 방식이 달라집니다. 책상 공간과 자주 쓰는 키를 먼저 비교해 보세요.");
  } else {
    summary.push("배열이 같아도 키캡 높이, 하우징, 보강판, 흡음 구성에 따라 타건감과 소음은 달라질 수 있습니다.");
  }

  if (getConnection(productA) !== getConnection(productB) || productA.isHotSwap !== productB.isHotSwap) {
    summary.push("연결 방식이나 핫스왑 조건이 다르면 관리 방식이 달라집니다. 여러 기기 전환과 스위치 교체 계획을 함께 확인하세요.");
  } else {
    summary.push("연결 방식과 핫스왑 조건이 비슷하다면 스위치 옵션, 소음, 키캡/하우징 차이를 더 중요하게 보면 좋습니다.");
  }

  summary.push("스위치 이름만 보고 판단하기보다 판매처 옵션, 실제 타건 후기, 구성품을 함께 확인해 주세요.");

  return summary;
}

function ProductSummaryCard({ product, label }: { product: KeyboardPickerProduct; label: string }) {
  const checks = getBuyingChecks(product);

  return (
    <article className="rounded-2xl border border-neutral-300 bg-[var(--card)] p-5 dark:border-zinc-600">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--accent)]">
          <KeyboardIcon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-neutral-300 bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-bold text-[var(--accent)] dark:border-zinc-600">
          {label}
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{product.brand}</p>
      <h2 className="mt-1 text-xl font-bold text-[var(--primary)]">{product.name}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{product.summary || "요약 문구는 확인 필요입니다."}</p>
      <div className="mt-4 grid gap-2 text-xs text-[var(--primary)] sm:grid-cols-2">
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">배열: {getLayout(product)}</span>
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">스위치: {getSwitchNames(product)}</span>
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">연결: {getConnection(product)}</span>
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">핫스왑: {product.isHotSwap ? "지원 참고" : "확인 필요"}</span>
      </div>
      <div className="mt-4 rounded-xl border border-neutral-300 bg-[var(--secondary)]/30 p-3 dark:border-zinc-600">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">구매 전 확인</p>
        <ul className="space-y-1.5 text-xs leading-relaxed text-[var(--muted)]">
          {checks.length > 0 ? checks.map((item) => <li key={item}>- {item}</li>) : <li>- 판매처/제조사 기준으로 스위치 옵션과 구성품을 확인해 주세요.</li>}
        </ul>
      </div>
    </article>
  );
}

function ComparisonRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <div className="grid grid-cols-1 border-b border-neutral-300 last:border-b-0 dark:border-zinc-600 md:grid-cols-[180px_1fr_1fr]">
      <div className="bg-[var(--secondary)]/25 p-4 text-sm font-bold text-[var(--primary)]">{label}</div>
      <div className="border-t border-neutral-300 p-4 text-sm leading-relaxed text-[var(--muted)] dark:border-zinc-600 md:border-t-0 md:border-l">{a}</div>
      <div className="border-t border-neutral-300 p-4 text-sm leading-relaxed text-[var(--muted)] dark:border-zinc-600 md:border-t-0 md:border-l">{b}</div>
    </div>
  );
}

export function KeyboardComparePickerClient({ products }: KeyboardComparePickerClientProps) {
  const defaultA = products.find((product) => product.id === "aula-f75")?.id ?? products[0]?.id ?? "";
  const defaultB = products.find((product) => product.id === "nuphy-halo75-v2")?.id ?? products[1]?.id ?? defaultA;
  const [productAId, setProductAId] = useState(defaultA);
  const [productBId, setProductBId] = useState(defaultB);
  const [selectedBrandsA, setSelectedBrandsA] = useState<string[]>([]);
  const [selectedBrandsB, setSelectedBrandsB] = useState<string[]>([]);

  const brandOptions = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [products],
  );
  const selectableProductsA = useMemo(
    () => (selectedBrandsA.length === 0 ? products : products.filter((product) => selectedBrandsA.includes(product.brand))),
    [products, selectedBrandsA],
  );
  const selectableProductsB = useMemo(
    () => (selectedBrandsB.length === 0 ? products : products.filter((product) => selectedBrandsB.includes(product.brand))),
    [products, selectedBrandsB],
  );

  const productA = useMemo(() => products.find((product) => product.id === productAId) ?? products[0], [productAId, products]);
  const productB = useMemo(() => products.find((product) => product.id === productBId) ?? products[1] ?? products[0], [productBId, products]);

  const updateBrandFilter = (side: "a" | "b", brand: string) => {
    const selectedBrands = side === "a" ? selectedBrandsA : selectedBrandsB;
    const nextBrands = brand === "all"
      ? []
      : selectedBrands.includes(brand)
        ? selectedBrands.filter((item) => item !== brand)
        : [...selectedBrands, brand];
    const nextProducts = nextBrands.length === 0 ? products : products.filter((product) => nextBrands.includes(product.brand));

    if (side === "a") {
      setSelectedBrandsA(nextBrands);

      if (nextProducts.length > 0 && !nextProducts.some((product) => product.id === productAId)) {
        setProductAId(nextProducts[0].id);
      }
      return;
    }

    setSelectedBrandsB(nextBrands);

    if (nextProducts.length > 0 && !nextProducts.some((product) => product.id === productBId)) {
      setProductBId(nextProducts[1]?.id ?? nextProducts[0].id);
    }
  };

  const renderBrandFilter = (side: "a" | "b", selectedBrands: string[], optionCount: number) => (
    <div className="mt-4 rounded-xl border border-neutral-300 bg-[var(--secondary)]/25 p-3 dark:border-zinc-600">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[11px] font-black text-[var(--primary)]">제조사 필터</p>
        <span className="text-[10px] font-bold text-[var(--muted)]">{optionCount}개 후보</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["all", ...brandOptions].map((brand) => {
          const isAll = brand === "all";
          const isActive = isAll ? selectedBrands.length === 0 : selectedBrands.includes(brand);

          return (
            <button
              key={brand}
              type="button"
              onClick={() => updateBrandFilter(side, brand)}
              className={[
                "rounded-lg border px-2.5 py-1.5 text-[10.5px] font-black transition-colors",
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-neutral-300 bg-[var(--card)] text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-zinc-600",
              ].join(" ")}
            >
              {isAll ? "전체" : brand}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!productA || !productB) {
    return (
      <div className="container mx-auto px-4 py-14">
        <div className="rounded-2xl border border-neutral-300 bg-[var(--card)] p-6 text-sm text-[var(--muted)] dark:border-zinc-600">
          비교할 키보드 데이터가 아직 준비되지 않았습니다.
        </div>
      </div>
    );
  }

  const comparisonRows = [
    { label: "배열", a: getLayout(productA), b: getLayout(productB) },
    { label: "스위치 성향", a: getSwitchFeel(productA), b: getSwitchFeel(productB) },
    { label: "소음", a: getNoise(productA), b: getNoise(productB) },
    { label: "연결 방식", a: getConnection(productA), b: getConnection(productB) },
    { label: "상세 연결", a: getDetailConnection(productA), b: getDetailConnection(productB) },
    { label: "핫스왑", a: getHotSwap(productA), b: getHotSwap(productB) },
    { label: "OS/기기 호환", a: getDeviceCompatibility(productA), b: getDeviceCompatibility(productB) },
    { label: "키캡/하우징", a: getKeycapHousing(productA), b: getKeycapHousing(productB) },
    { label: "휴대성", a: getPortability(productA), b: getPortability(productB) },
    { label: "게임/사무/코딩 사용", a: getUseCase(productA), b: getUseCase(productB) },
    { label: "구매 전 체크", a: getBuyingChecks(productA).join(" / ") || "판매처/제조사 기준 확인", b: getBuyingChecks(productB).join(" / ") || "판매처/제조사 기준 확인" },
  ];

  const summaries = getDifferenceSummary(productA, productB);
  const isSameProduct = productA.id === productB.id;

  return (
    <div>
      <section className="container mx-auto px-4 py-12 md:py-14">
        <div className="mb-7 border-b border-neutral-300 pb-5 dark:border-zinc-600">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">제품 선택</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            제품 A와 제품 B의 제조사를 따로 좁힌 뒤 비교할 수 있습니다. 필터는 선택 목록만 줄이고 비교 점수나 정렬은 만들지 않습니다.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-300 bg-[var(--card)] p-5 dark:border-zinc-600">
            <label htmlFor="keyboard-product-a" className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">제품 A</label>
            {renderBrandFilter("a", selectedBrandsA, selectableProductsA.length)}
            <select
              id="keyboard-product-a"
              value={productAId}
              onChange={(event) => setProductAId(event.target.value)}
              className="mt-3 w-full rounded-xl border border-neutral-300 bg-[var(--secondary)] px-3 py-3 text-sm font-bold text-[var(--primary)] outline-none transition-colors focus:border-[var(--accent)] dark:border-zinc-600"
            >
              {selectableProductsA.map((product) => (
                <option key={product.id} value={product.id}>
                  {getProductLabel(product)}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-2xl border border-neutral-300 bg-[var(--card)] p-5 dark:border-zinc-600">
            <label htmlFor="keyboard-product-b" className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">제품 B</label>
            {renderBrandFilter("b", selectedBrandsB, selectableProductsB.length)}
            <select
              id="keyboard-product-b"
              value={productBId}
              onChange={(event) => setProductBId(event.target.value)}
              className="mt-3 w-full rounded-xl border border-neutral-300 bg-[var(--secondary)] px-3 py-3 text-sm font-bold text-[var(--primary)] outline-none transition-colors focus:border-[var(--accent)] dark:border-zinc-600"
            >
              {selectableProductsB.map((product) => (
                <option key={product.id} value={product.id}>
                  {getProductLabel(product)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-4 rounded-xl border border-neutral-300 bg-[var(--secondary)]/30 p-3 text-xs leading-relaxed text-[var(--muted)] dark:border-zinc-600">
          {isSameProduct
            ? "같은 제품이 양쪽에 선택되어 있습니다. 다른 제품을 고르면 차이를 더 쉽게 볼 수 있습니다."
            : "선택한 두 제품만 비교합니다. 추천 점수나 자동 정렬은 적용하지 않습니다."}
        </p>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-7 border-b border-neutral-300 pb-5 dark:border-zinc-600">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">선택 제품 요약</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            내부 상태값, 제품 이미지, 제품 링크는 표시하지 않고 구매 전 확인에 필요한 기본 정보만 보여줍니다.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ProductSummaryCard product={productA} label="Product A" />
          <ProductSummaryCard product={productB} label="Product B" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-7 border-b border-neutral-300 pb-5 dark:border-zinc-600">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">기본 비교표</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            스위치 이름 하나보다 배열, 소음, 연결 방식, 핫스왑, 키캡과 하우징 차이를 함께 봅니다.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-[var(--card)] dark:border-zinc-600">
          <div className="grid grid-cols-1 border-b border-neutral-300 bg-[var(--secondary)]/40 text-sm font-bold text-[var(--primary)] dark:border-zinc-600 md:grid-cols-[180px_1fr_1fr]">
            <div className="p-4">항목</div>
            <div className="border-t border-neutral-300 p-4 dark:border-zinc-600 md:border-t-0 md:border-l">{getProductLabel(productA)}</div>
            <div className="border-t border-neutral-300 p-4 dark:border-zinc-600 md:border-t-0 md:border-l">{getProductLabel(productB)}</div>
          </div>
          {comparisonRows.map((row) => (
            <ComparisonRow key={row.label} label={row.label} a={row.a} b={row.b} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-neutral-300 bg-[var(--secondary)]/30 p-6 dark:border-zinc-600 md:p-8">
          <div className="mb-5 flex items-center gap-2 text-[var(--accent)]">
            <GitCompare className="h-5 w-5" />
            <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">두 키보드를 이렇게 비교해 보세요</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {summaries.map((summary) => (
              <p key={summary} className="rounded-xl border border-neutral-300 bg-[var(--card)] p-4 text-sm leading-relaxed text-[var(--muted)] dark:border-zinc-600">
                {summary}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-neutral-300 bg-[var(--card)] p-6 dark:border-zinc-600">
          <h2 className="text-lg font-bold text-[var(--primary)]">관련 링크</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/kr/finder/keyboard-fit", label: "키보드 Finder" },
              { href: "/kr/guides/keyboard-buying-checklist", label: "키보드 구매 전 체크리스트" },
              { href: "/kr/guides/keyboard-switch-types", label: "키보드 스위치 종류" },
              { href: "/kr/tests/keyboard-chatter", label: "키보드 채터링 테스트" },
              { href: "/kr/tests/keyboard-rollover", label: "키보드 동시입력 테스트" },
              { href: "/kr/compare", label: "장비 비교 메인" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-300 bg-[var(--secondary)]/30 px-4 py-3 text-sm font-bold text-[var(--primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-zinc-600"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-4">
        <div className="rounded-2xl border border-neutral-300 bg-[var(--secondary)]/25 p-5 text-sm leading-relaxed text-[var(--muted)] dark:border-zinc-600">
          <div className="mb-2 flex items-center gap-2 font-bold text-[var(--primary)]">
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
            참고 안내
          </div>
          이 비교는 구매 전 차이를 이해하기 위한 참고 자료입니다. 실제 스위치 옵션, 구성품, 연결 방식, AS 조건은 판매처/제조사 기준으로 다시 확인해 주세요.
        </div>
      </section>
    </div>
  );
}
