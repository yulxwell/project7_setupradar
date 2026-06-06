"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Info, RotateCcw, SlidersHorizontal } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { MOUSE_DATABASE } from "@/content/kr/products/mice";
import {
  FinderOptionGroup,
  MOUSE_FINDER_DEFAULTS,
  MOUSE_FINDER_OPTIONS,
  MouseFinderValues,
} from "@/content/kr/finder/mouseFinderOptions";
import { MouseBasicFilters, MouseShellReference } from "@/content/types";
import { getContentDisplay } from "@/content/utils";
import { cn } from "@/lib/utils";

type MouseScore = {
  mouse: (typeof MOUSE_DATABASE)[number];
  score: number;
  reasons: string[];
  cautions: string[];
};

type MouseAdvancedValues = {
  connectionDetail: "any" | "wired" | "wireless_24" | "bluetooth";
  battery: "any" | "rechargeable" | "aa_aaa";
  sideButtons: "any" | "needed" | "not_needed";
  usage: "any" | "fps" | "office" | "portable";
};

const MOUSE_ADVANCED_DEFAULTS: MouseAdvancedValues = {
  connectionDetail: "any",
  battery: "any",
  sideButtons: "any",
  usage: "any",
};

const MOUSE_ADVANCED_OPTIONS = {
  connectionDetail: {
    id: "connectionDetail",
    label: "연결 방식 + 상세",
    helperText: "무선 안에서도 수신기와 블루투스는 체감이 다를 수 있습니다.",
    options: [
      { value: "any", label: "상관없음", description: "연결 방식 상세 조건을 점수에 반영하지 않습니다." },
      { value: "wired", label: "유선", description: "충전 관리보다 케이블 사용이 편할 때" },
      { value: "wireless_24", label: "2.4GHz 무선", description: "수신기나 동글 기반 무선을 선호할 때" },
      { value: "bluetooth", label: "블루투스", description: "노트북이나 태블릿 연결도 함께 볼 때" },
    ],
  } satisfies FinderOptionGroup<MouseAdvancedValues["connectionDetail"]>,
  battery: {
    id: "battery",
    label: "배터리/충전",
    helperText: "충전식과 건전지 방식 중 관리하기 편한 쪽을 고릅니다.",
    options: [
      { value: "any", label: "상관없음", description: "배터리 방식을 점수에 반영하지 않습니다." },
      { value: "rechargeable", label: "충전식 선호", description: "내장 배터리와 케이블 충전을 선호할 때" },
      { value: "aa_aaa", label: "AA/AAA도 괜찮음", description: "건전지 교체식도 불편하지 않을 때" },
    ],
  } satisfies FinderOptionGroup<MouseAdvancedValues["battery"]>,
  sideButtons: {
    id: "sideButtons",
    label: "사이드 버튼",
    helperText: "웹서핑, 게임 단축키 사용 여부를 기준으로 봅니다.",
    options: [
      { value: "any", label: "상관없음", description: "버튼 수를 점수에 반영하지 않습니다." },
      { value: "needed", label: "사이드 버튼 필요", description: "뒤로가기나 단축키를 자주 쓸 때" },
      { value: "not_needed", label: "적어도 괜찮음", description: "기본 버튼 중심으로 단순하게 쓰고 싶을 때" },
    ],
  } satisfies FinderOptionGroup<MouseAdvancedValues["sideButtons"]>,
  usage: {
    id: "usage",
    label: "용도",
    helperText: "주 사용 상황을 고르면 일부 명확한 제품에만 약하게 반영합니다.",
    options: [
      { value: "any", label: "상관없음", description: "용도 조건을 점수에 반영하지 않습니다." },
      { value: "fps", label: "FPS 게임", description: "가벼운 무게와 게이밍 성향을 볼 때" },
      { value: "office", label: "사무/웹서핑", description: "설정 부담이 적은 사용을 선호할 때" },
      { value: "portable", label: "휴대용", description: "작고 무선인 후보를 참고할 때" },
    ],
  } satisfies FinderOptionGroup<MouseAdvancedValues["usage"]>,
};

function isWireless(features: string[]) {
  return features.some((feature) => /무선|wireless/i.test(feature));
}

function getMouseBasicFilters(mouse: (typeof MOUSE_DATABASE)[number]): MouseBasicFilters {
  if (mouse.basicFilters) return mouse.basicFilters;

  const featureTags = [...mouse.features, ...(mouse.specTags ?? [])];
  const connection = isWireless(featureTags) ? "wireless" : "wired";
  const weight = mouse.weight <= 55 ? "ultralight" : mouse.weight <= 70 ? "light" : "medium";
  const size = mouse.handSizeRange === "all" ? "unknown" : mouse.handSizeRange;
  const priceText = mouse.priceRange.toLowerCase();
  const price = /20|30|premium|고급/.test(priceText)
    ? "premium"
    : /10|mid|중급/.test(priceText)
      ? "mid"
      : /budget|입문/.test(priceText)
        ? "budget"
        : "any";

  return {
    shape: mouse.shapeType === "ergonomic" ? "right_ergonomic" : "symmetrical",
    weight,
    connection,
    size,
    price,
  };
}

function matchesMouseShape(selectedShape: MouseFinderValues["shape"], productShape: MouseBasicFilters["shape"]) {
  if (selectedShape === "any") return true;
  if (selectedShape === "ergonomic") return productShape === "right_ergonomic";
  return productShape === selectedShape;
}

function matchesMouseWeight(selectedWeight: MouseFinderValues["weight"], productWeight: MouseBasicFilters["weight"]) {
  if (selectedWeight === "any") return true;
  if (selectedWeight === "light") return productWeight === "ultralight" || productWeight === "light";
  return productWeight === "medium";
}

function matchesMouseConnection(selectedConnection: MouseFinderValues["connection"], productConnection: MouseBasicFilters["connection"]) {
  if (selectedConnection === "any") return true;
  if (selectedConnection === "wireless") return productConnection === "wireless" || productConnection === "multi_mode";
  return productConnection === "wired" || productConnection === "multi_mode";
}

function getMouseSearchText(mouse: (typeof MOUSE_DATABASE)[number]) {
  return [
    mouse.name,
    mouse.brand,
    mouse.sensor,
    mouse.priceRange,
    ...mouse.features,
    ...(mouse.specTags ?? []),
    mouse.detailSpecs?.bluetoothVersion,
    mouse.detailSpecs?.usbOrPs2,
    mouse.detailSpecs?.batteryDetail,
    mouse.detailSpecs?.buttonCountDetail,
    mouse.rawSpecs?.note,
    mouse.aiSummaryKo,
    ...(mouse.aiStrengthsKo ?? []),
    ...(mouse.aiCautionsKo ?? []),
    ...(mouse.aiBuyingCheckKo ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasMouseBluetooth(mouse: (typeof MOUSE_DATABASE)[number]) {
  return Boolean(mouse.detailSpecs?.bluetoothVersion) || /bluetooth|블루투스/.test(getMouseSearchText(mouse));
}

function hasMouseReceiverWireless(mouse: (typeof MOUSE_DATABASE)[number], filters: MouseBasicFilters) {
  const text = getMouseSearchText(mouse);
  return filters.connection === "wireless" && /2\.4|2\.4ghz|수신기|동글|receiver|wireless|무선|[248]k/.test(text);
}

function getMouseAdvancedScore(mouse: (typeof MOUSE_DATABASE)[number], advancedValues: MouseAdvancedValues) {
  const filters = getMouseBasicFilters(mouse);
  const text = getMouseSearchText(mouse);
  const advancedFilters = mouse.advancedFilters;
  let score = 0;

  if (advancedValues.connectionDetail === "wired" && filters.connection === "wired") score += 1;
  if (advancedValues.connectionDetail === "wireless_24" && hasMouseReceiverWireless(mouse, filters)) score += 1;
  if (advancedValues.connectionDetail === "bluetooth" && hasMouseBluetooth(mouse)) score += 1;

  if (advancedValues.battery === "rechargeable" && advancedFilters?.battery === "built_in") score += 1;
  if (advancedValues.battery === "aa_aaa" && advancedFilters?.battery === "aa_aaa") score += 1;

  if (advancedValues.sideButtons === "needed" && advancedFilters?.buttonCount === "side_buttons") score += 1;
  if (advancedValues.sideButtons === "not_needed" && advancedFilters?.buttonCount === "basic") score += 1;

  if (advancedValues.usage === "fps" && (advancedFilters?.gamingPerformance === "high" || advancedFilters?.gamingPerformance === "enthusiast")) score += 1;
  if (advancedValues.usage === "office" && /사무|웹|office|driverless|입문/.test(text)) score += 1;
  if (advancedValues.usage === "portable" && filters.connection === "wireless" && (filters.size === "small" || mouse.weight <= 60)) score += 1;

  return Math.min(score, 3);
}

function pushUniqueLabel(labels: string[], label: string) {
  if (!labels.includes(label)) labels.push(label);
}

function getMouseReasonLabels(
  mouse: (typeof MOUSE_DATABASE)[number],
  values: MouseFinderValues,
  advancedValues: MouseAdvancedValues,
) {
  const filters = getMouseBasicFilters(mouse);
  const text = getMouseSearchText(mouse);
  const advancedFilters = mouse.advancedFilters;
  const labels: string[] = [];

  if (values.handSize !== "unknown" && (filters.size === values.handSize || filters.size === "unknown")) {
    pushUniqueLabel(labels, "손 크기 조건이 기본 점수에 반영됐습니다.");
  }

  if (values.shape !== "any" && matchesMouseShape(values.shape, filters.shape)) {
    pushUniqueLabel(
      labels,
      values.shape === "ergonomic" ? "손바닥 지지감이 맞을 수 있는 형태입니다." : "대칭형 선호 조건이 반영됐습니다.",
    );
  }

  if (values.weight !== "any" && matchesMouseWeight(values.weight, filters.weight)) {
    pushUniqueLabel(labels, values.weight === "light" ? "가벼운 무게 조건과 맞을 수 있습니다." : "너무 가볍지 않은 무게감을 참고했습니다.");
  }

  if (values.connection !== "any" && matchesMouseConnection(values.connection, filters.connection)) {
    pushUniqueLabel(labels, values.connection === "wireless" ? "무선 연결 선호가 기본 점수에 반영됐습니다." : "유선 사용 조건이 기본 점수에 반영됐습니다.");
  }

  if (advancedValues.connectionDetail === "wired" && filters.connection === "wired") {
    pushUniqueLabel(labels, "유선 상세 기준이 확인 가능한 정보로 참고됐습니다.");
  }
  if (advancedValues.connectionDetail === "wireless_24" && hasMouseReceiverWireless(mouse, filters)) {
    pushUniqueLabel(labels, "2.4GHz 무선 조건은 스펙/문구 기준으로 참고했습니다.");
  }
  if (advancedValues.connectionDetail === "bluetooth" && hasMouseBluetooth(mouse)) {
    pushUniqueLabel(labels, "블루투스 조건은 확인 가능한 정보만 참고했습니다.");
  }

  if (advancedValues.battery === "rechargeable" && advancedFilters?.battery === "built_in") {
    pushUniqueLabel(labels, "배터리 방식은 확인 가능한 경우에만 참고했습니다.");
  }
  if (advancedValues.battery === "aa_aaa" && advancedFilters?.battery === "aa_aaa") {
    pushUniqueLabel(labels, "배터리 방식은 확인 가능한 경우에만 참고했습니다.");
  }

  if (advancedValues.sideButtons === "needed" && advancedFilters?.buttonCount === "side_buttons") {
    pushUniqueLabel(labels, "사이드 버튼 조건이 일부 반영됐습니다.");
  }
  if (advancedValues.sideButtons === "not_needed" && advancedFilters?.buttonCount === "basic") {
    pushUniqueLabel(labels, "기본 버튼 중심 조건을 참고했습니다.");
  }

  if (
    advancedValues.usage === "fps"
    && (advancedFilters?.gamingPerformance === "high" || advancedFilters?.gamingPerformance === "enthusiast")
  ) {
    pushUniqueLabel(labels, "FPS 용도 조건은 일부 스펙/문구 기준으로 참고했습니다.");
  }
  if (advancedValues.usage === "office" && /사무|웹|office|driverless|입문/.test(text)) {
    pushUniqueLabel(labels, "사무/웹 사용 조건은 문구 기준으로 참고했습니다.");
  }
  if (advancedValues.usage === "portable" && filters.connection === "wireless" && (filters.size === "small" || mouse.weight <= 60)) {
    pushUniqueLabel(labels, "휴대용 조건은 크기와 무선 여부를 함께 참고했습니다.");
  }

  if (labels.length === 0) {
    labels.push("조건을 넓게 본 참고용 후보입니다.");
  }

  return labels.slice(0, 3);
}

function scoreMouse(mouse: (typeof MOUSE_DATABASE)[number], values: MouseFinderValues, advancedValues: MouseAdvancedValues): MouseScore {
  const reasons: string[] = [];
  const cautions: string[] = [];
  let score = 0;
  const filters = getMouseBasicFilters(mouse);

  if (values.handSize !== "unknown") {
    if (filters.size === values.handSize || filters.size === "unknown") {
      score += 3;
      reasons.push("선택한 손 크기와 맞을 수 있습니다.");
    } else {
      cautions.push("손 크기 체감은 개인차가 있어 실측 확인이 필요합니다.");
    }
  }

  if (values.shape !== "any") {
    if (matchesMouseShape(values.shape, filters.shape)) {
      score += 2;
      reasons.push(values.shape === "ergonomic" ? "편안한 지지감을 기대할 수 있는 형태입니다." : "대칭형 선호를 반영했습니다.");
    } else {
      cautions.push("선호 형태와 다를 수 있어 실사용 후기를 확인해보세요.");
    }
  }

  if (values.weight === "light") {
    if (matchesMouseWeight(values.weight, filters.weight)) {
      score += 2;
      reasons.push("가벼운 편의 무게 조건에 맞습니다.");
    } else {
      cautions.push("가벼운 마우스를 원한다면 무게를 다시 확인해보세요.");
    }
  }
  if (values.weight === "normal" && matchesMouseWeight(values.weight, filters.weight)) {
    score += 1;
    reasons.push("너무 가볍지 않은 무게감을 기대할 수 있습니다.");
  }

  if (values.connection === "wireless") {
    if (matchesMouseConnection(values.connection, filters.connection)) {
      score += 2;
      reasons.push("무선 연결 선호를 반영했습니다.");
    } else {
      cautions.push("무선 모델을 원한다면 연결 방식을 다시 확인해보세요.");
    }
  }
  if (values.connection === "wired" && matchesMouseConnection(values.connection, filters.connection)) {
    score += 2;
    reasons.push("유선 사용을 선호할 때 후보가 될 수 있습니다.");
  }

  const advancedScore = getMouseAdvancedScore(mouse, advancedValues);
  if (advancedScore > 0) {
    score += advancedScore;
    reasons.push("상세 기준 일부를 참고 점수로 반영했습니다.");
  }

  if (score === 0) {
    score = 1;
    reasons.push("조건을 넓게 보았을 때 참고용 후보입니다.");
  }

  return { mouse, score, reasons, cautions };
}

function getMouseSpecRows(mouse: (typeof MOUSE_DATABASE)[number]) {
  const specs = mouse.detailSpecs;
  const dimensions = specs?.dimensionsMm ?? mouse.dimensions;
  const filters = getMouseBasicFilters(mouse);
  const shapeLabel = filters.shape === "right_ergonomic"
    ? "오른손용 비대칭형"
    : filters.shape === "vertical"
      ? "버티컬"
      : "대칭형";
  const connectionLabel = filters.connection === "wireless"
    ? "무선"
    : filters.connection === "multi_mode"
      ? "유선+무선"
      : filters.connection === "wired"
        ? "유선"
        : null;

  return [
    { label: "무게", value: `${mouse.weight}g` },
    { label: "형태", value: shapeLabel },
    connectionLabel ? { label: "연결", value: connectionLabel } : null,
    { label: "센서", value: specs?.sensorModel ?? mouse.sensor },
    specs?.pollingRateHz ? { label: "폴링레이트", value: `${specs.pollingRateHz.toLocaleString()}Hz` } : null,
    specs?.maxDpi ? { label: "최대 DPI", value: specs.maxDpi.toLocaleString() } : null,
    dimensions ? { label: "크기", value: `${dimensions.length} x ${dimensions.width} x ${dimensions.height}mm` } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

function formatBoolean(value: boolean) {
  return value ? "지원" : "미지원";
}

function getMouseAdditionalSpecRows(mouse: (typeof MOUSE_DATABASE)[number]) {
  const specs = mouse.detailSpecs;
  if (!specs) return [];

  return [
    specs.ips ? { label: "IPS", value: specs.ips.toLocaleString() } : null,
    specs.fpsScanRate ? { label: "스캔율", value: `${specs.fpsScanRate.toLocaleString()} FPS` } : null,
    specs.accelerationG ? { label: "가속도", value: `${specs.accelerationG}G` } : null,
    specs.bluetoothVersion ? { label: "블루투스", value: specs.bluetoothVersion } : null,
    specs.usbOrPs2 ? { label: "연결 규격", value: specs.usbOrPs2 } : null,
    specs.batteryDetail ? { label: "배터리", value: specs.batteryDetail } : null,
    specs.warrantyPeriod ? { label: "보증", value: specs.warrantyPeriod } : null,
    specs.buttonCountDetail ? { label: "버튼", value: specs.buttonCountDetail } : null,
    typeof specs.dpiChangeSupport === "boolean" ? { label: "DPI 변경", value: formatBoolean(specs.dpiChangeSupport) } : null,
    typeof specs.adjustableWeight === "boolean" ? { label: "무게추 조절", value: formatBoolean(specs.adjustableWeight) } : null,
    typeof specs.replaceableParts === "boolean" ? { label: "파츠 교체", value: formatBoolean(specs.replaceableParts) } : null,
    typeof specs.infiniteWheel === "boolean" ? { label: "무한휠", value: formatBoolean(specs.infiniteWheel) } : null,
    typeof specs.rgbLighting === "boolean" ? { label: "RGB", value: formatBoolean(specs.rgbLighting) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

function getShellRefText(ref: MouseShellReference) {
  const modelName = ref.referenceModelKo || ref.referenceModelEn;
  if (!modelName) return "";

  if (ref.editorNoteKo) {
    return `${modelName} 계열: ${ref.editorNoteKo}`;
  }

  return "";
}

function CompactOptionGroup({
  group,
  value,
  onChange,
}: {
  group: FinderOptionGroup<string>;
  value: string;
  onChange: (value: string) => void;
}) {
  const selected = group.options.find((option) => option.value === value);

  return (
    <section className="rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/[0.03] p-3">
      <div className="mb-2 flex flex-col gap-1">
        <h2 className="text-sm font-bold text-[var(--primary)]">{group.label}</h2>
        <p className="text-[11px] leading-snug text-[var(--muted)]">{group.helperText}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {group.options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--primary)]",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="mt-2 rounded-lg bg-[var(--background)] px-3 py-2 text-[11px] leading-snug text-[var(--muted)]">
          {selected.description}
        </p>
      )}
    </section>
  );
}

function AdvancedCriteriaToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-xs font-black text-[var(--primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      상세 기준
      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
    </button>
  );
}

export default function MouseFitPage() {
  const [values, setValues] = useState<MouseFinderValues>(MOUSE_FINDER_DEFAULTS);
  const [advancedValues, setAdvancedValues] = useState<MouseAdvancedValues>(MOUSE_ADVANCED_DEFAULTS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [expandedMouseId, setExpandedMouseId] = useState<string | null>(null);
  const [showMoreResults, setShowMoreResults] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("all");

  const scoredMice = useMemo(
    () => MOUSE_DATABASE
      .map((mouse) => scoreMouse(mouse, values, advancedValues))
      .sort((a, b) => b.score - a.score),
    [values, advancedValues],
  );
  const brandOptions = useMemo(
    () => Array.from(new Set(scoredMice.map(({ mouse }) => mouse.brand).filter((brand): brand is string => Boolean(brand))))
      .sort((a, b) => a.localeCompare(b)),
    [scoredMice],
  );
  const filteredMice = selectedBrand === "all"
    ? scoredMice
    : scoredMice.filter(({ mouse }) => mouse.brand === selectedBrand);
  const visibleMice = showMoreResults ? filteredMice : filteredMice.slice(0, 3);
  const hasMoreResults = filteredMice.length > 3;

  const updateValue = <Key extends keyof MouseFinderValues>(key: Key, value: MouseFinderValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setShowMoreResults(false);
    setExpandedMouseId(null);
  };

  const updateAdvancedValue = <Key extends keyof MouseAdvancedValues>(key: Key, value: MouseAdvancedValues[Key]) => {
    setAdvancedValues((current) => ({ ...current, [key]: value }));
    setShowMoreResults(false);
    setExpandedMouseId(null);
  };

  const toggleMouseDetail = (mouseId: string) => {
    setExpandedMouseId((current) => (current === mouseId ? null : mouseId));
  };

  return (
    <div className="container mx-auto min-h-[70vh] max-w-6xl px-4 py-8 md:py-10">
      <PageHero
        eyebrow="Mouse Finder"
        title="마우스 찾기"
        icon={SlidersHorizontal}
        description={
          <>
            손 크기, 형태, 무게, 연결 방식을 기준으로 구매 전 비교할 후보를 좁혀보세요. <br className="hidden md:block" />
            상관없음을 선택하면 후보를 넓게 볼 수 있는 참고용 Finder입니다.
          </>
        }
        action={
          <button
            onClick={() => {
              setValues(MOUSE_FINDER_DEFAULTS);
              setAdvancedValues(MOUSE_ADVANCED_DEFAULTS);
              setSelectedBrand("all");
              setShowMoreResults(false);
              setExpandedMouseId(null);
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-bold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)]"
          >
            <RotateCcw className="h-4 w-4" />
            초기화
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid content-start gap-3 md:grid-cols-2">
          <div className="mb-1 flex flex-col gap-1 border-l-4 border-[var(--accent)] pl-4 md:col-span-2">
            <h2 className="text-xl font-bold text-[var(--primary)]">마우스 필터</h2>
            <p className="max-w-2xl text-sm text-[var(--muted)]">
              손 크기, 형태, 무게, 연결 방식처럼 실제 사용감에 영향을 주는 조건입니다.
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/[0.03] p-3 md:col-span-2">
            <div>
              <h2 className="text-sm font-bold text-[var(--primary)]">상세 기준</h2>
              <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">
                선택하지 않아도 됩니다. 후보를 조금 더 좁히기 위한 참고 조건입니다.
              </p>
            </div>
            <AdvancedCriteriaToggle isOpen={advancedOpen} onClick={() => setAdvancedOpen((current) => !current)} />
          </div>
          <CompactOptionGroup
            group={MOUSE_FINDER_OPTIONS.handSize}
            value={values.handSize}
            onChange={(value) => updateValue("handSize", value as MouseFinderValues["handSize"])}
          />
          <CompactOptionGroup
            group={MOUSE_FINDER_OPTIONS.shape}
            value={values.shape}
            onChange={(value) => updateValue("shape", value as MouseFinderValues["shape"])}
          />
          <CompactOptionGroup
            group={MOUSE_FINDER_OPTIONS.weight}
            value={values.weight}
            onChange={(value) => updateValue("weight", value as MouseFinderValues["weight"])}
          />
          {advancedOpen ? (
            <CompactOptionGroup
              group={MOUSE_ADVANCED_OPTIONS.connectionDetail}
              value={advancedValues.connectionDetail}
              onChange={(value) => updateAdvancedValue("connectionDetail", value as MouseAdvancedValues["connectionDetail"])}
            />
          ) : (
            <CompactOptionGroup
              group={MOUSE_FINDER_OPTIONS.connection}
              value={values.connection}
              onChange={(value) => updateValue("connection", value as MouseFinderValues["connection"])}
            />
          )}
          {advancedOpen && (
            <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
              <div className="flex items-center gap-2 md:col-span-2">
                <span className="whitespace-nowrap text-[11px] font-black text-[var(--accent)]">- 상세 목록 -</span>
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
              </div>
              <CompactOptionGroup
                group={MOUSE_ADVANCED_OPTIONS.battery}
                value={advancedValues.battery}
                onChange={(value) => updateAdvancedValue("battery", value as MouseAdvancedValues["battery"])}
              />
              <CompactOptionGroup
                group={MOUSE_ADVANCED_OPTIONS.sideButtons}
                value={advancedValues.sideButtons}
                onChange={(value) => updateAdvancedValue("sideButtons", value as MouseAdvancedValues["sideButtons"])}
              />
              <CompactOptionGroup
                group={MOUSE_ADVANCED_OPTIONS.usage}
                value={advancedValues.usage}
                onChange={(value) => updateAdvancedValue("usage", value as MouseAdvancedValues["usage"])}
              />
              <div className="rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/[0.03] p-3">
                <p className="text-[11px] leading-relaxed text-[var(--muted)]">
                  상세 기준은 제품 후보를 더 좁히기 위한 참고 조건입니다. 제품 스펙은 판매처/제조사 기준으로 다시 확인해 주세요.
                </p>
              </div>
            </div>
          )}
          <div className="rounded-xl border border-[var(--accent)]/10 bg-[var(--accent)]/5 p-3 md:col-span-2">
            <div className="flex gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <p className="text-[11px] leading-relaxed text-[var(--accent)] opacity-80">
                별도의 불편함 질문은 제거했습니다. 손목 피로, 선 걸림, 크기 부담은 각 선택지 설명에 반영되어 있습니다.
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-3 xl:sticky xl:top-20 xl:self-start">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-3">
            <h2 className="text-base font-bold text-[var(--primary)]">추천 결과</h2>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">가능한 조건만 점수화한 참고용 결과입니다.</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-black text-[var(--primary)]">제조사 필터</p>
              <span className="text-[10px] font-bold text-[var(--muted)]">{filteredMice.length}개 후보</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["all", ...brandOptions].map((brand) => {
                const isActive = selectedBrand === brand;

                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(brand);
                      setShowMoreResults(false);
                      setExpandedMouseId(null);
                    }}
                    className={cn(
                      "rounded-lg border px-2.5 py-1.5 text-[10.5px] font-black transition-colors",
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-[var(--border)] bg-[var(--secondary)]/30 text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
                    )}
                  >
                    {brand === "all" ? "전체" : brand}
                  </button>
                );
              })}
            </div>
          </div>

          {visibleMice.map(({ mouse }, index) => {
            const display = getContentDisplay(mouse);
            const communityNote = display.communityNote || "커뮤니티 체감은 손 크기와 기존 사용 마우스에 따라 갈릴 수 있습니다.";
            const specRows = getMouseSpecRows(mouse);
            const additionalSpecRows = getMouseAdditionalSpecRows(mouse);
            const reasonLabels = getMouseReasonLabels(mouse, values, advancedValues);
            const strengths = display.strengths.slice(0, 3);
            const cautions = display.cautions.slice(0, 3);
            const buyingCheck = display.buyingCheck.slice(0, 3);
            const filteredShellRefs = (mouse.shellReferences || []).filter((ref) => {
              // 1. editorNoteKo가 있어야 함
              if (!ref.editorNoteKo) return false;
              // 2. confidence가 medium 또는 high이어야 함 (low 제외)
              if (ref.confidence === "low") return false;
              // 3. sourceHint가 unknown이 아니어야 함 (unknown 제외)
              if (ref.sourceHint === "unknown") return false;
              // 4. referenceModelKo 또는 referenceModelEn이 있어야 함
              if (!ref.referenceModelKo && !ref.referenceModelEn) return false;
              return true;
            });
            const shellRefs = filteredShellRefs.slice(0, 2);
            const isExpanded = expandedMouseId === mouse.id;

            return (
              <article
                key={mouse.id}
                className={cn(
                  "rounded-xl border bg-[var(--secondary)]/30 p-3",
                  index < 3 ? "border-[var(--accent)]/35 shadow-sm shadow-[var(--accent)]/10" : "border-[var(--border)]",
                )}
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{mouse.brand || "Unknown"}</p>
                    <h3 className="text-base font-bold text-[var(--primary)]">{mouse.name}</h3>
                  </div>
                  {index < 3 && (
                    <span className="shrink-0 rounded-full bg-[var(--accent)]/10 px-2 py-1 text-[9.5px] font-black text-[var(--accent)]">
                      추천 후보 {index + 1}
                    </span>
                  )}
                </div>
                <p className="mb-2 line-clamp-2 text-[10.5px] leading-relaxed text-[var(--muted)]">{display.summary}</p>
                <div className="mb-2 grid grid-cols-2 gap-1">
                  {specRows.map((spec) => (
                    <div key={spec.label} className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1">
                      <p className="text-[9.5px] font-bold text-[var(--muted)]">{spec.label}</p>
                      <p className="mt-0.5 text-[10.5px] font-bold text-[var(--primary)]">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-2 rounded-lg border border-[var(--border)]/60 bg-[var(--background)]/70 px-2.5 py-2">
                  <p className="mb-1 text-[9.5px] font-black text-[var(--primary)]">조건 반영</p>
                  <div className="flex flex-wrap gap-1">
                    {reasonLabels.map((label) => (
                      <span key={label} className="rounded-md bg-[var(--accent)]/10 px-2 py-1 text-[9.5px] font-bold leading-snug text-[var(--accent)]">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2 text-[10.5px] leading-relaxed">
                  <p><span className="font-bold text-[var(--primary)]">체감 한줄평: </span><span className="text-[var(--muted)]">{communityNote}</span></p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleMouseDetail(mouse.id)}
                  aria-expanded={isExpanded}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[10.5px] font-bold text-[var(--primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {isExpanded ? "접기" : "구매 전 체크"}
                </button>

                {isExpanded && (
                  <div className="mt-3 border-t border-[var(--border)]/40 pt-3">
                    <p className="mb-2 text-xs font-black text-[var(--primary)]">구매 전 확인할 점</p>
                    <div className="space-y-2.5 text-[10.5px] leading-relaxed">
                      {strengths.length > 0 && (
                        <section>
                          <p className="mb-1 font-bold text-[var(--primary)]">이런 경우에 맞을 수 있음</p>
                          <ul className="space-y-1 text-[var(--muted)]">
                            {strengths.map((item) => <li key={item}>- {item}</li>)}
                          </ul>
                        </section>
                      )}

                      {cautions.length > 0 && (
                        <section>
                          <p className="mb-1 font-bold text-[var(--primary)]">주의할 점</p>
                          <ul className="space-y-1 text-[var(--muted)]">
                            {cautions.map((item) => <li key={item}>- {item}</li>)}
                          </ul>
                        </section>
                      )}

                      {buyingCheck.length > 0 && (
                        <section>
                          <p className="mb-1 font-bold text-[var(--primary)]">구매 전 체크</p>
                          <ul className="space-y-1 text-[var(--muted)]">
                            {buyingCheck.map((item) => <li key={item}>- {item}</li>)}
                          </ul>
                        </section>
                      )}

                      {additionalSpecRows.length > 0 && (
                        <section>
                          <p className="mb-1 font-bold text-[var(--primary)]">추가로 확인할 스펙</p>
                          <div className="grid grid-cols-2 gap-1">
                            {additionalSpecRows.slice(0, 6).map((spec) => (
                              <div key={spec.label} className="rounded-md border border-[var(--border)]/50 bg-[var(--background)] px-2 py-1">
                                <p className="text-[9.5px] font-bold text-[var(--muted)]">{spec.label}</p>
                                <p className="text-[10.5px] font-bold text-[var(--primary)]">{spec.value}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {shellRefs.length > 0 && (
                        <section className="rounded-lg border border-[var(--border)]/40 bg-[var(--background)] p-2">
                          <p className="mb-1 font-bold text-[var(--primary)]">쉘 체감 레퍼런스</p>
                          <div className="space-y-1.5 text-[var(--muted)]">
                            {shellRefs.map((ref, idx) => {
                              const refText = getShellRefText(ref);
                              if (!refText) return null;
                              return (
                                <p key={idx}>{refText}</p>
                              );
                            })}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {hasMoreResults && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3 text-center">
              <p className="mb-2 text-[11px] leading-relaxed text-[var(--muted)]">
                점수가 비슷한 후보를 더 볼 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => setShowMoreResults((current) => !current)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-bold text-[var(--primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {showMoreResults ? "접기" : "후보 더 보기"}
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
