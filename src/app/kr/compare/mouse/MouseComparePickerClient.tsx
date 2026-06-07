"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, GitCompare, MousePointer2, ShieldCheck } from "lucide-react";

export interface MousePickerProduct {
  id: string;
  brand: string;
  name: string;
  summary: string;
  cautions: string[];
  buyingCheck: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  sensor: string;
  recommendedGrips: string[];
  handSizeRange: string;
  shapeType: string;
  features: string[];
  specTags: string[];
  rawNote: string;
  basicFilters?: {
    shape: string;
    weight: string;
    connection: string;
    size: string;
  };
  advancedFilters?: {
    gamingPerformance?: string;
    buttonCount?: string;
    switchTendency?: string;
    battery?: string;
  };
  detailSpecs?: {
    sensorModel?: string | null;
    pollingRateHz?: number | null;
    bluetoothVersion?: string | null;
    batteryDetail?: string | null;
    buttonCountDetail?: string | null;
    infiniteWheel?: boolean | null;
  };
}

interface MouseComparePickerClientProps {
  products: MousePickerProduct[];
}

const fallbackText = "확인 필요";

const shapeLabels: Record<string, string> = {
  symmetrical: "대칭형",
  ergonomic: "오른손용 비대칭형",
  right_ergonomic: "오른손용 비대칭형",
  vertical: "버티컬",
  any: "상관없음",
};

const sizeLabels: Record<string, string> = {
  small: "작은 손 기준",
  medium: "중간 손 기준",
  large: "큰 손 기준",
  all: "여러 손 크기 참고",
  unknown: fallbackText,
};

const weightLabels: Record<string, string> = {
  ultralight: "초경량 체감",
  light: "가벼운 체감",
  medium: "중간 무게 체감",
  any: "무게 취향 확인",
};

const connectionLabels: Record<string, string> = {
  wired: "유선",
  wireless: "무선",
  multi_mode: "멀티모드",
  any: "확인 필요",
};

const batteryLabels: Record<string, string> = {
  built_in: "내장 배터리",
  aa_aaa: "AA/AAA 배터리",
  wireless_charging: "무선 충전 참고",
  unknown: fallbackText,
};

const switchLabels: Record<string, string> = {
  mechanical: "기계식 스위치 성향",
  optical: "광축 스위치 성향",
  silent: "저소음 스위치 성향",
  unknown: fallbackText,
};

function getProductLabel(product: MousePickerProduct) {
  return `${product.brand} ${product.name}`;
}

function getShape(product: MousePickerProduct) {
  return shapeLabels[product.basicFilters?.shape ?? product.shapeType] ?? fallbackText;
}

function getSize(product: MousePickerProduct) {
  return sizeLabels[product.basicFilters?.size ?? product.handSizeRange] ?? fallbackText;
}

function getWeight(product: MousePickerProduct) {
  const weightLabel = weightLabels[product.basicFilters?.weight ?? ""] ?? "체감 확인";
  return `${product.weight}g / ${weightLabel}`;
}

function getConnection(product: MousePickerProduct) {
  return connectionLabels[product.basicFilters?.connection ?? ""] ?? fallbackText;
}

function getDetailConnection(product: MousePickerProduct) {
  const polling = product.detailSpecs?.pollingRateHz ? `${product.detailSpecs.pollingRateHz}Hz 참고` : "";
  const bluetooth = product.detailSpecs?.bluetoothVersion ? `Bluetooth ${product.detailSpecs.bluetoothVersion}` : "";
  const details = [polling, bluetooth].filter(Boolean).join(" · ");
  return details || product.rawNote || "동글, 리시버, 유선 구성은 판매처 기준 확인이 필요합니다.";
}

function getGamingUse(product: MousePickerProduct) {
  const performance = product.advancedFilters?.gamingPerformance;

  if (performance === "enthusiast") {
    return "고폴링레이트나 게이밍 성능 옵션을 함께 확인할 후보입니다. PC 환경과 설정에 따라 체감은 달라질 수 있습니다.";
  }

  if (performance === "high") {
    return "게임용으로 참고할 수 있는 후보입니다. 감도, 그립, 연결 환경을 함께 확인하세요.";
  }

  if (performance === "standard") {
    return "가벼운 게임과 일상 사용을 함께 보는 후보입니다. 경쟁 게임 목적이라면 세부 스펙 확인이 필요합니다.";
  }

  return "게임 사용 체감은 손 크기, 그립, 감도, PC 환경에 따라 달라질 수 있습니다.";
}

function getDailyUse(product: MousePickerProduct) {
  if (product.weight <= 55) {
    return "가벼운 조작을 선호하면 편할 수 있지만, 문서 작업에서는 너무 민감하게 느껴질 수 있습니다.";
  }

  if (product.weight >= 90) {
    return "무게감 있는 조작을 선호하면 안정적으로 느껴질 수 있지만, 오래 쓰면 부담이 생길 수 있습니다.";
  }

  return "게임과 일상 사용을 함께 볼 수 있는 무게대입니다. 클릭감과 휠 체감은 별도 확인이 필요합니다.";
}

function getButtons(product: MousePickerProduct) {
  const button = product.advancedFilters?.buttonCount === "side_buttons" ? "사이드 버튼 참고" : "버튼 구성 확인 필요";
  const switchText = switchLabels[product.advancedFilters?.switchTendency ?? ""] ?? "스위치 성향 확인 필요";
  const wheel = product.detailSpecs?.infiniteWheel ? "무한 휠 지원 참고" : "휠 구분감은 후기 확인";
  return `${button} · ${switchText} · ${wheel}`;
}

function getBattery(product: MousePickerProduct) {
  const battery = batteryLabels[product.advancedFilters?.battery ?? ""] ?? fallbackText;
  const detail = product.detailSpecs?.batteryDetail ? ` / ${product.detailSpecs.batteryDetail}` : "";
  return `${battery}${detail}. 실제 사용 시간과 충전 방식은 판매처/제조사 기준 확인이 필요합니다.`;
}

function getShellNote(product: MousePickerProduct) {
  const dimensions = `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}mm`;
  return `${getShape(product)} / ${dimensions}. 쉘 체감은 손 크기, 그립, 들어 올리는 습관에 따라 달라질 수 있습니다.`;
}

function getBuyingChecks(product: MousePickerProduct) {
  const checks = product.buyingCheck.length > 0 ? product.buyingCheck : product.cautions;
  return checks.slice(0, 3);
}

function getDifferenceSummary(productA: MousePickerProduct, productB: MousePickerProduct) {
  const summary = [];
  const weightDiff = Math.abs(productA.weight - productB.weight);

  if (weightDiff >= 10) {
    const lighter = productA.weight < productB.weight ? productA : productB;
    const heavier = productA.weight < productB.weight ? productB : productA;
    summary.push(`${getProductLabel(lighter)}는 더 가벼운 체감 후보로 볼 수 있고, ${getProductLabel(heavier)}는 상대적으로 안정적인 움직임을 기대할 수 있습니다.`);
  } else {
    summary.push("두 제품의 무게 차이가 크지 않다면 쉘, 코팅, 클릭감 같은 체감 요소를 더 중요하게 확인해 보세요.");
  }

  if (getShape(productA) !== getShape(productB)) {
    summary.push("형태가 다르면 손바닥 지지감과 손목 각도가 달라질 수 있으므로 기존에 쓰던 마우스와 크기를 비교해 보세요.");
  } else {
    summary.push("두 제품이 같은 형태 계열이어도 길이, 폭, 등 높이, 무게중심에 따라 체감은 달라질 수 있습니다.");
  }

  summary.push("정확한 구성품, 리시버, AS 조건은 판매처/제조사 기준으로 다시 확인해 주세요.");

  return summary;
}

function ProductSummaryCard({ product, label }: { product: MousePickerProduct; label: string }) {
  const checks = getBuyingChecks(product);

  return (
    <article className="rounded-2xl border border-neutral-300 bg-[var(--card)] p-5 dark:border-zinc-600">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--accent)]">
          <MousePointer2 className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-neutral-300 bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-bold text-[var(--accent)] dark:border-zinc-600">
          {label}
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{product.brand}</p>
      <h2 className="mt-1 text-xl font-bold text-[var(--primary)]">{product.name}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{product.summary || "요약 문구는 확인 필요입니다."}</p>
      <div className="mt-4 grid gap-2 text-xs text-[var(--primary)] sm:grid-cols-2">
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">형태: {getShape(product)}</span>
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">손 크기: {getSize(product)}</span>
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">무게: {getWeight(product)}</span>
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2">연결: {getConnection(product)}</span>
      </div>
      <div className="mt-4 rounded-xl border border-neutral-300 bg-[var(--secondary)]/30 p-3 dark:border-zinc-600">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">구매 전 확인</p>
        <ul className="space-y-1.5 text-xs leading-relaxed text-[var(--muted)]">
          {checks.length > 0 ? checks.map((item) => <li key={item}>- {item}</li>) : <li>- 판매처/제조사 기준으로 구성품과 AS 조건을 확인해 주세요.</li>}
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

export function MouseComparePickerClient({ products }: MouseComparePickerClientProps) {
  const defaultA = products.find((product) => product.id === "lamzu-maya")?.id ?? products[0]?.id ?? "";
  const defaultB = products.find((product) => product.id === "zowie-u2")?.id ?? products[1]?.id ?? defaultA;
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
          비교할 마우스 데이터가 아직 준비되지 않았습니다.
        </div>
      </div>
    );
  }

  const comparisonRows = [
    { label: "형태", a: getShape(productA), b: getShape(productB) },
    { label: "손 크기 기준", a: `${getSize(productA)} / ${productA.dimensions.length} x ${productA.dimensions.width} x ${productA.dimensions.height}mm`, b: `${getSize(productB)} / ${productB.dimensions.length} x ${productB.dimensions.width} x ${productB.dimensions.height}mm` },
    { label: "무게 기준", a: getWeight(productA), b: getWeight(productB) },
    { label: "연결 방식", a: getConnection(productA), b: getConnection(productB) },
    { label: "상세 연결", a: getDetailConnection(productA), b: getDetailConnection(productB) },
    { label: "게임/FPS 사용", a: getGamingUse(productA), b: getGamingUse(productB) },
    { label: "사무/일상 사용", a: getDailyUse(productA), b: getDailyUse(productB) },
    { label: "클릭/휠/사이드 버튼", a: getButtons(productA), b: getButtons(productB) },
    { label: "배터리/충전", a: getBattery(productA), b: getBattery(productB) },
    { label: "쉘 체감 참고", a: getShellNote(productA), b: getShellNote(productB) },
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
            <label htmlFor="mouse-product-a" className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">제품 A</label>
            {renderBrandFilter("a", selectedBrandsA, selectableProductsA.length)}
            <select
              id="mouse-product-a"
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
            <label htmlFor="mouse-product-b" className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">제품 B</label>
            {renderBrandFilter("b", selectedBrandsB, selectableProductsB.length)}
            <select
              id="mouse-product-b"
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
            수치 하나보다 손 크기, 쉘 체감, 무게, 연결 방식, 구성품 확인 여부를 함께 봅니다.
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
            <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">두 제품을 이렇게 보면 좋습니다</h2>
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
              { href: "/kr/finder/mouse-fit", label: "마우스 Finder" },
              { href: "/kr/compare/mouse/lamzu-maya-vs-zowie-u2", label: "Lamzu Maya vs Zowie U2" },
              { href: "/kr/guides/mouse-buying-checklist", label: "마우스 구매 전 체크리스트" },
              { href: "/kr/guides/mouse-shape-symmetrical-vs-ergonomic", label: "대칭형 vs 오른손용 비대칭형" },
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
          이 비교는 구매 전 차이를 이해하기 위한 참고 자료입니다. 실제 스펙, 구성품, AS 조건은 판매처/제조사 기준으로 다시 확인해 주세요.
        </div>
      </section>
    </div>
  );
}
