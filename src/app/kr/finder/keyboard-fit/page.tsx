"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Info, Keyboard, RotateCcw } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { KEYBOARD_DATABASE } from "@/content/kr/products/keyboards";
import {
  FinderOptionGroup,
  KEYBOARD_FINDER_DEFAULTS,
  KEYBOARD_FINDER_OPTIONS,
  KEYBOARD_LAYOUT_META,
  KeyboardFinderValues,
} from "@/content/kr/finder/keyboardFinderOptions";
import { KeyboardBasicFilters } from "@/content/types";
import { getContentDisplay } from "@/content/utils";
import { cn } from "@/lib/utils";

type KeyboardScore = {
  keyboard: (typeof KEYBOARD_DATABASE)[number];
  score: number;
  reasons: string[];
  cautions: string[];
};

type KeyboardAdvancedValues = {
  connectionDetail: "any" | "wired" | "wireless_24" | "bluetooth" | "multi_mode";
  hotSwap: "any" | "preferred" | "fixed_ok";
  device: "any" | "windows" | "mac" | "tablet" | "ipad_pro" | "multi_device";
  usage: "any" | "gaming" | "office" | "coding" | "portable" | "quiet";
  legends: "any" | "korean" | "english_ok" | "mac_layout";
};

const KEYBOARD_ADVANCED_DEFAULTS: KeyboardAdvancedValues = {
  connectionDetail: "any",
  hotSwap: "any",
  device: "any",
  usage: "any",
  legends: "any",
};

const KEYBOARD_ADVANCED_OPTIONS = {
  connectionDetail: {
    id: "connectionDetail",
    label: "연결 상세",
    helperText: "유선, 수신기, 블루투스, 멀티모드를 나눠 참고합니다.",
    options: [
      { value: "any", label: "상관없음", description: "연결 상세 조건을 점수에 반영하지 않습니다." },
      { value: "wired", label: "유선", description: "책상에 고정해서 안정적으로 쓸 때" },
      { value: "wireless_24", label: "2.4GHz 무선", description: "수신기 기반 무선을 선호할 때" },
      { value: "bluetooth", label: "블루투스", description: "노트북, 태블릿과 함께 쓸 때" },
      { value: "multi_mode", label: "멀티모드", description: "유선과 무선을 함께 보고 싶을 때" },
    ],
  } satisfies FinderOptionGroup<KeyboardAdvancedValues["connectionDetail"]>,
  hotSwap: {
    id: "hotSwap",
    label: "핫스왑",
    helperText: "스위치 교체 가능 여부를 약하게 참고합니다.",
    options: [
      { value: "any", label: "상관없음", description: "핫스왑 여부를 점수에 반영하지 않습니다." },
      { value: "preferred", label: "핫스왑 가능 선호", description: "나중에 스위치 교체를 해보고 싶을 때" },
      { value: "fixed_ok", label: "고정축도 괜찮음", description: "순정 상태로 오래 쓸 예정일 때" },
    ],
  } satisfies FinderOptionGroup<KeyboardAdvancedValues["hotSwap"]>,
  device: {
    id: "device",
    label: "특정 기기 사용",
    helperText: "기기별 호환은 판매처 스펙 확인이 필요합니다.",
    options: [
      { value: "any", label: "상관없음", description: "기기 조건을 점수에 반영하지 않습니다." },
      { value: "windows", label: "Windows PC 중심", description: "일반 PC 사용을 중심으로 볼 때" },
      { value: "mac", label: "Mac 중심", description: "맥 키 배열과 소프트웨어 호환을 함께 볼 때" },
      { value: "tablet", label: "태블릿/iPad", description: "블루투스와 거치 환경을 함께 확인할 때" },
      { value: "ipad_pro", label: "iPad Pro", description: "태블릿 사용 중에서도 큰 화면 조합을 고려할 때" },
      { value: "multi_device", label: "여러 기기 전환", description: "멀티페어링이나 멀티모드가 필요할 때" },
    ],
  } satisfies FinderOptionGroup<KeyboardAdvancedValues["device"]>,
  usage: {
    id: "usage",
    label: "용도",
    helperText: "게임, 문서, 코딩, 휴대, 조용한 공간을 참고합니다.",
    options: [
      { value: "any", label: "상관없음", description: "용도 조건을 점수에 반영하지 않습니다." },
      { value: "gaming", label: "게임", description: "게이밍 기능이나 빠른 입력 성향을 볼 때" },
      { value: "office", label: "사무/문서", description: "조용함과 배열 안정감을 볼 때" },
      { value: "coding", label: "코딩", description: "배열과 커스터마이징 여지를 볼 때" },
      { value: "portable", label: "휴대용", description: "작은 배열과 무선 연결을 볼 때" },
      { value: "quiet", label: "조용한 공간", description: "저소음 성향을 더 중요하게 볼 때" },
    ],
  } satisfies FinderOptionGroup<KeyboardAdvancedValues["usage"]>,
  legends: {
    id: "legends",
    label: "각인/배열 참고",
    helperText: "각인과 Mac 배열은 데이터가 있을 때만 반영합니다.",
    options: [
      { value: "any", label: "상관없음", description: "각인 조건을 점수에 반영하지 않습니다." },
      { value: "korean", label: "한글 각인 선호", description: "한글 각인이 필요할 때" },
      { value: "english_ok", label: "영문만 괜찮음", description: "영문 각인이나 무각인도 괜찮을 때" },
      { value: "mac_layout", label: "Mac 배열 중요", description: "Mac 키 배열과 키 매핑을 확인할 때" },
    ],
  } satisfies FinderOptionGroup<KeyboardAdvancedValues["legends"]>,
};

function hasWirelessText(values: string[]) {
  return values.some((value) => /무선|wireless/i.test(value));
}

function hasQuietText(values: string[]) {
  return values.some((value) => /저소음|silent|무접점/i.test(value));
}

function getKeyboardBasicFilters(keyboard: (typeof KEYBOARD_DATABASE)[number]): KeyboardBasicFilters {
  if (keyboard.basicFilters) return keyboard.basicFilters;

  const tags = [...keyboard.features, ...(keyboard.specTags ?? [])];
  const wireless = hasWirelessText(tags);
  const quiet = hasQuietText(tags) || keyboard.switchType.includes("capacitive");
  const layout = keyboard.layout === "full" || keyboard.layout === "tkl" ? keyboard.layout : "compact";
  const feel = quiet
    ? "quiet"
    : keyboard.switchType.includes("linear")
      ? "smooth_linear"
      : keyboard.switchType.includes("tactile")
        ? "tactile"
        : keyboard.switchType.includes("clicky")
          ? "clicky"
          : "unknown";
  const priceText = keyboard.priceRange.toLowerCase();
  const price = /30|20|premium|고급/.test(priceText)
    ? "premium"
    : /10|mid|중급/.test(priceText)
      ? "mid"
      : /budget|입문/.test(priceText)
        ? "budget"
        : "any";

  return {
    layout,
    connection: wireless ? "wireless" : "wired",
    feel,
    noise: quiet ? "quiet_preferred" : "no_preference",
    price,
  };
}

function getKeyboardSpecificLayout(keyboard: (typeof KEYBOARD_DATABASE)[number]): KeyboardFinderValues["layout"] | null {
  if (keyboard.layout === "full" || keyboard.layout === "tkl" || keyboard.layout === "75%" || keyboard.layout === "65%") {
    return keyboard.layout;
  }

  const layoutText = [keyboard.name, keyboard.layout, ...keyboard.features, ...(keyboard.specTags ?? [])].join(" ");
  if (/\b75%|\b75\b/i.test(layoutText)) return "75%";
  if (/\b65%|\b65\b/i.test(layoutText)) return "65%";
  if (/\b60%|\b60\b/i.test(layoutText)) return "65%";

  return null;
}

function matchesKeyboardLayout(
  selectedLayout: KeyboardFinderValues["layout"],
  keyboard: (typeof KEYBOARD_DATABASE)[number],
  productLayout: KeyboardBasicFilters["layout"],
) {
  if (selectedLayout === "any") return true;
  if (selectedLayout === "75%" || selectedLayout === "65%") {
    return getKeyboardSpecificLayout(keyboard) === selectedLayout;
  }
  return productLayout === selectedLayout;
}

function matchesKeyboardFeel(selectedFeel: KeyboardFinderValues["switchFeel"], productFeel: KeyboardBasicFilters["feel"]) {
  if (selectedFeel === "unknown") return true;
  if (selectedFeel === "linear") return productFeel === "smooth_linear";
  if (selectedFeel === "silent") return productFeel === "quiet";
  return productFeel === selectedFeel;
}

function matchesKeyboardConnection(selectedConnection: KeyboardFinderValues["connection"], productConnection: KeyboardBasicFilters["connection"]) {
  if (selectedConnection === "any") return true;
  if (selectedConnection === "wireless") return productConnection === "wireless" || productConnection === "multi_mode";
  return productConnection === "wired" || productConnection === "multi_mode";
}

function getKeyboardSearchText(keyboard: (typeof KEYBOARD_DATABASE)[number]) {
  return [
    keyboard.name,
    keyboard.brand,
    keyboard.priceRange,
    ...keyboard.features,
    ...(keyboard.specTags ?? []),
    keyboard.detailSpecs?.bluetoothVersion,
    keyboard.detailSpecs?.battery,
    keyboard.detailSpecs?.legendPosition,
    keyboard.rawSpecs?.note,
    keyboard.aiSummaryKo,
    ...(keyboard.aiStrengthsKo ?? []),
    ...(keyboard.aiCautionsKo ?? []),
    ...(keyboard.aiBuyingCheckKo ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasKeyboardBluetooth(keyboard: (typeof KEYBOARD_DATABASE)[number]) {
  return Boolean(keyboard.detailSpecs?.bluetoothVersion) || /bluetooth|블루투스/.test(getKeyboardSearchText(keyboard));
}

function hasKeyboardReceiverWireless(keyboard: (typeof KEYBOARD_DATABASE)[number]) {
  return /2\.4|2\.4ghz|수신기|동글|receiver/.test(getKeyboardSearchText(keyboard));
}

function getKeyboardAdvancedScore(keyboard: (typeof KEYBOARD_DATABASE)[number], advancedValues: KeyboardAdvancedValues) {
  const filters = getKeyboardBasicFilters(keyboard);
  const text = getKeyboardSearchText(keyboard);
  let score = 0;

  if (advancedValues.connectionDetail === "wired" && (filters.connection === "wired" || filters.connection === "multi_mode")) score += 1;
  if (advancedValues.connectionDetail === "wireless_24" && hasKeyboardReceiverWireless(keyboard)) score += 1;
  if (advancedValues.connectionDetail === "bluetooth" && hasKeyboardBluetooth(keyboard)) score += 1;
  if (advancedValues.connectionDetail === "multi_mode" && filters.connection === "multi_mode") score += 1;

  if (advancedValues.hotSwap === "preferred" && keyboard.isHotSwap) score += 1;
  if (advancedValues.hotSwap === "fixed_ok" && !keyboard.isHotSwap) score += 1;

  if (advancedValues.device === "windows" && /windows|윈도우|pc|qmk|via/.test(text)) score += 1;
  if (advancedValues.device === "mac" && /mac|qmk|via/.test(text)) score += 1;
  if (advancedValues.device === "tablet" && hasKeyboardBluetooth(keyboard)) score += 1;
  if (advancedValues.device === "ipad_pro" && hasKeyboardBluetooth(keyboard) && (keyboard.layout === "75%" || keyboard.layout === "65%" || keyboard.layout === "compact")) score += 1;
  if (advancedValues.device === "multi_device" && keyboard.advancedFilters?.multiDevice === "multi_pairing") score += 1;

  if (advancedValues.usage === "gaming" && keyboard.advancedFilters?.gamingFeature && keyboard.advancedFilters.gamingFeature !== "no_preference") score += 1;
  if (advancedValues.usage === "office" && (filters.noise === "quiet_preferred" || keyboard.layout === "full")) score += 1;
  if (advancedValues.usage === "coding" && (keyboard.isHotSwap || /qmk|via|75%|tkl/.test(text))) score += 1;
  if (advancedValues.usage === "portable" && filters.connection !== "wired" && (keyboard.layout === "75%" || keyboard.layout === "65%" || keyboard.layout === "compact")) score += 1;
  if (advancedValues.usage === "quiet" && (filters.noise === "quiet_preferred" || filters.feel === "quiet")) score += 1;

  if (advancedValues.legends === "korean" && /한글/.test(text)) score += 1;
  if (advancedValues.legends === "english_ok" && /english|영문|osa|pbt|double-shot/.test(text)) score += 1;
  if (advancedValues.legends === "mac_layout" && /mac|qmk|via/.test(text)) score += 1;

  return Math.min(score, 4);
}

function scoreKeyboard(keyboard: (typeof KEYBOARD_DATABASE)[number], values: KeyboardFinderValues, advancedValues: KeyboardAdvancedValues): KeyboardScore {
  const reasons: string[] = [];
  const cautions: string[] = [];
  let score = 0;
  const filters = getKeyboardBasicFilters(keyboard);
  const selectedLayout = values.layout === "any" ? null : values.layout;

  if (selectedLayout) {
    if (matchesKeyboardLayout(selectedLayout, keyboard, filters.layout)) {
      score += 3;
      reasons.push("선택한 배열 조건과 맞을 수 있습니다.");
    } else {
      cautions.push("선호 배열과 다를 수 있어 키 배치 적응 여부를 확인해보세요.");
    }
  }

  if (values.switchFeel !== "unknown") {
    if (values.switchFeel === "silent") {
      if (matchesKeyboardFeel(values.switchFeel, filters.feel)) {
        score += 2;
        reasons.push("조용한 성향을 기대할 수 있는 후보입니다.");
      } else {
        cautions.push("저소음 스위치 여부는 구매 전 확인이 필요합니다.");
      }
    } else if (matchesKeyboardFeel(values.switchFeel, filters.feel)) {
      score += 2;
      reasons.push("선택한 스위치 느낌을 반영했습니다.");
    } else {
      cautions.push("선호 스위치와 다를 수 있어 타건 후기를 확인해보세요.");
    }
  }

  if (values.noise === "quiet") {
    if (filters.noise === "quiet_preferred" || filters.feel === "quiet") {
      score += 2;
      reasons.push("소음이 신경 쓰이는 환경에서 참고할 만합니다.");
    } else {
      cautions.push("조용한 공간에서 쓴다면 실제 소음 후기를 확인해보세요.");
    }
  }

  if (values.connection === "wireless") {
    if (matchesKeyboardConnection(values.connection, filters.connection)) {
      score += 2;
      reasons.push("무선 연결 선호를 반영했습니다.");
    } else {
      cautions.push("무선 연결이 필요한 경우 제품 상세 스펙 확인이 필요합니다.");
    }
  }
  if (values.connection === "wired" && matchesKeyboardConnection(values.connection, filters.connection)) {
    score += 1;
    reasons.push("유선 중심 사용 후보로 볼 수 있습니다.");
  }

  if (values.os !== "any") {
    cautions.push("OS 호환 정보는 현재 데이터에 제한적이므로 키 매핑과 전용 소프트웨어를 확인해보세요.");
  }

  const advancedScore = getKeyboardAdvancedScore(keyboard, advancedValues);
  if (advancedScore > 0) {
    score += advancedScore;
    reasons.push("상세 기준 일부를 참고 점수로 반영했습니다.");
  }

  if (score === 0) {
    score = 1;
    reasons.push("조건을 넓게 보았을 때 참고용 후보입니다.");
  }

  return { keyboard, score, reasons, cautions };
}

const LAYOUT_LABELS = {
  full: "풀배열",
  tkl: "텐키리스",
  "75%": "75%",
  "65%": "65% 이하",
  compact: "컴팩트",
} as const;

const SWITCH_LABELS = {
  linear: "리니어",
  tactile: "택타일",
  clicky: "클릭",
  magnetic: "자석축",
  optical: "광축",
  capacitive: "무접점",
  unknown: "확인 필요",
} as const;

const MATERIAL_LABELS = {
  plastic: "플라스틱",
  aluminum: "알루미늄",
  polycarbonate: "폴리카보네이트",
} as const;

function getKeyboardSpecRows(keyboard: (typeof KEYBOARD_DATABASE)[number]) {
  const specs = keyboard.detailSpecs;
  const dimensions = specs?.dimensionsMm;
  const filters = getKeyboardBasicFilters(keyboard);
  const connection = filters.connection === "multi_mode"
    ? "유선+무선"
    : filters.connection === "wireless"
      ? "무선"
      : filters.connection === "wired"
        ? "유선"
        : null;
  const dimensionText = dimensions && (dimensions.width || dimensions.depth || dimensions.height)
    ? [dimensions.width, dimensions.depth, dimensions.height].filter(Boolean).join(" x ") + "mm"
    : null;

  return [
    { label: "배열", value: LAYOUT_LABELS[keyboard.layout] },
    connection ? { label: "연결", value: connection } : null,
    { label: "스위치", value: keyboard.switchType.map((type) => SWITCH_LABELS[type]).join(", ") },
    { label: "소재", value: MATERIAL_LABELS[keyboard.material] },
    { label: "핫스왑", value: keyboard.isHotSwap ? "지원" : "미지원" },
    specs?.actuationForceG ? { label: "키압", value: `${specs.actuationForceG}g` } : null,
    specs?.bluetoothVersion ? { label: "블루투스", value: specs.bluetoothVersion } : null,
    specs?.battery ? { label: "배터리", value: specs.battery } : null,
    dimensionText ? { label: "크기", value: dimensionText } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

function formatBoolean(value: boolean) {
  return value ? "지원" : "미지원";
}

function getKeyboardAdditionalSpecRows(keyboard: (typeof KEYBOARD_DATABASE)[number]) {
  const specs = keyboard.detailSpecs;
  if (!specs) return [];

  const accessoriesText = specs.accessories && specs.accessories.length > 0
    ? specs.accessories.join(", ")
    : null;

  return [
    specs.actuationForceG ? { label: "키압", value: `${specs.actuationForceG}g` } : null,
    typeof specs.macroSupport === "boolean" ? { label: "매크로", value: formatBoolean(specs.macroSupport) } : null,
    specs.responseTimeMs ? { label: "응답속도", value: `${specs.responseTimeMs}ms` } : null,
    specs.bluetoothVersion ? { label: "블루투스", value: specs.bluetoothVersion } : null,
    specs.battery ? { label: "배터리", value: specs.battery } : null,
    specs.enterKeyShape ? { label: "엔터키", value: specs.enterKeyShape } : null,
    specs.legendPosition ? { label: "각인", value: specs.legendPosition } : null,
    specs.cableMaterial ? { label: "케이블", value: specs.cableMaterial } : null,
    accessoriesText ? { label: "구성품", value: accessoriesText } : null,
    typeof specs.ps2Support === "boolean" ? { label: "PS/2", value: formatBoolean(specs.ps2Support) } : null,
    typeof specs.stepSculpture === "boolean" ? { label: "스텝스컬쳐", value: formatBoolean(specs.stepSculpture) } : null,
    typeof specs.windowsKeyLock === "boolean" ? { label: "윈도우 키 잠금", value: formatBoolean(specs.windowsKeyLock) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
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
    <section className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3">
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

export default function KeyboardFitPage() {
  const [values, setValues] = useState<KeyboardFinderValues>(KEYBOARD_FINDER_DEFAULTS);
  const [advancedValues, setAdvancedValues] = useState<KeyboardAdvancedValues>(KEYBOARD_ADVANCED_DEFAULTS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [expandedKeyboardId, setExpandedKeyboardId] = useState<string | null>(null);
  const [showMoreResults, setShowMoreResults] = useState(false);

  const scoredKeyboards = useMemo(
    () => {
      const scored = KEYBOARD_DATABASE
        .map((keyboard) => scoreKeyboard(keyboard, values, advancedValues))
        .sort((a, b) => b.score - a.score);

      if (values.layout === "75%" || values.layout === "65%") {
        return scored
          .filter(({ keyboard }) => getKeyboardSpecificLayout(keyboard) === values.layout);
      }

      return scored;
    },
    [values, advancedValues],
  );
  const visibleKeyboards = showMoreResults ? scoredKeyboards : scoredKeyboards.slice(0, 3);
  const hasMoreResults = scoredKeyboards.length > 3;

  const selectedLayoutMeta = KEYBOARD_LAYOUT_META[values.layout];

  const updateValue = <Key extends keyof KeyboardFinderValues>(key: Key, value: KeyboardFinderValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setShowMoreResults(false);
    setExpandedKeyboardId(null);
  };

  const updateAdvancedValue = <Key extends keyof KeyboardAdvancedValues>(key: Key, value: KeyboardAdvancedValues[Key]) => {
    setAdvancedValues((current) => ({ ...current, [key]: value }));
    setShowMoreResults(false);
    setExpandedKeyboardId(null);
  };

  const toggleKeyboardDetail = (keyboardId: string) => {
    setExpandedKeyboardId((current) => (current === keyboardId ? null : keyboardId));
  };

  return (
    <div className="container mx-auto min-h-[70vh] max-w-6xl px-4 py-8 md:py-10">
      <PageHero
        eyebrow="Keyboard Finder"
        title="키보드 찾기"
        icon={Keyboard}
        description={
          <>
            배열, 키감, 소음, 연결 방식을 기준으로 구매 전 비교할 후보를 좁혀보세요. <br className="hidden md:block" />
            잘 모르겠음을 선택하면 후보를 넓게 볼 수 있는 참고용 Finder입니다.
          </>
        }
        action={
          <button
            onClick={() => {
              setValues(KEYBOARD_FINDER_DEFAULTS);
              setAdvancedValues(KEYBOARD_ADVANCED_DEFAULTS);
              setShowMoreResults(false);
              setExpandedKeyboardId(null);
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
            <h2 className="text-xl font-bold text-[var(--primary)]">키보드 필터</h2>
            <p className="max-w-2xl text-sm text-[var(--muted)]">
              배열, 키감, 소음, 연결 방식, OS처럼 사용 환경에 맞춰 볼 조건입니다.
            </p>
          </div>
          <section className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3 md:col-span-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-bold text-[var(--primary)]">배열 선택 기준</h2>
                <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">{selectedLayoutMeta.description}</p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-black text-[var(--accent)]">
                {selectedLayoutMeta.badge}
              </span>
            </div>
          </section>

          <CompactOptionGroup
            group={KEYBOARD_FINDER_OPTIONS.layout}
            value={values.layout}
            onChange={(value) => updateValue("layout", value as KeyboardFinderValues["layout"])}
          />
          <CompactOptionGroup
            group={KEYBOARD_FINDER_OPTIONS.switchFeel}
            value={values.switchFeel}
            onChange={(value) => updateValue("switchFeel", value as KeyboardFinderValues["switchFeel"])}
          />
          <CompactOptionGroup
            group={KEYBOARD_FINDER_OPTIONS.noise}
            value={values.noise}
            onChange={(value) => updateValue("noise", value as KeyboardFinderValues["noise"])}
          />
          <CompactOptionGroup
            group={KEYBOARD_FINDER_OPTIONS.connection}
            value={values.connection}
            onChange={(value) => updateValue("connection", value as KeyboardFinderValues["connection"])}
          />
          <CompactOptionGroup
            group={KEYBOARD_FINDER_OPTIONS.os}
            value={values.os}
            onChange={(value) => updateValue("os", value as KeyboardFinderValues["os"])}
          />
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3 md:col-span-2">
            <div>
              <h2 className="text-sm font-bold text-[var(--primary)]">상세 기준</h2>
              <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">
                선택하지 않아도 됩니다. 후보를 조금 더 좁히기 위한 참고 조건입니다.
              </p>
            </div>
            <AdvancedCriteriaToggle isOpen={advancedOpen} onClick={() => setAdvancedOpen((current) => !current)} />
          </div>
          {advancedOpen && (
            <div className="grid gap-3 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/[0.03] p-3 md:col-span-2 md:grid-cols-2">
              <CompactOptionGroup
                group={KEYBOARD_ADVANCED_OPTIONS.connectionDetail}
                value={advancedValues.connectionDetail}
                onChange={(value) => updateAdvancedValue("connectionDetail", value as KeyboardAdvancedValues["connectionDetail"])}
              />
              <CompactOptionGroup
                group={KEYBOARD_ADVANCED_OPTIONS.hotSwap}
                value={advancedValues.hotSwap}
                onChange={(value) => updateAdvancedValue("hotSwap", value as KeyboardAdvancedValues["hotSwap"])}
              />
              <CompactOptionGroup
                group={KEYBOARD_ADVANCED_OPTIONS.device}
                value={advancedValues.device}
                onChange={(value) => updateAdvancedValue("device", value as KeyboardAdvancedValues["device"])}
              />
              <CompactOptionGroup
                group={KEYBOARD_ADVANCED_OPTIONS.usage}
                value={advancedValues.usage}
                onChange={(value) => updateAdvancedValue("usage", value as KeyboardAdvancedValues["usage"])}
              />
              <div className="md:col-span-2">
                <CompactOptionGroup
                  group={KEYBOARD_ADVANCED_OPTIONS.legends}
                  value={advancedValues.legends}
                  onChange={(value) => updateAdvancedValue("legends", value as KeyboardAdvancedValues["legends"])}
                />
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]/70 p-3 md:col-span-2">
                <p className="text-[11px] leading-relaxed text-[var(--muted)]">
                  상세 기준은 제품 후보를 더 좁히기 위한 참고 조건입니다. 태블릿/iPad 사용 시 배열·블루투스·거치 환경을 함께 확인해 주세요. 제품 스펙은 판매처/제조사 기준으로 다시 확인해 주세요.
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-3 xl:sticky xl:top-20 xl:self-start">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-3">
            <h2 className="text-base font-bold text-[var(--primary)]">추천 결과</h2>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">현재 데이터에 있는 조건만 점수화한 참고용 결과입니다.</p>
          </div>

          {scoredKeyboards.length === 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-4">
              <p className="text-sm font-bold text-[var(--primary)]">선택한 배열과 정확히 맞는 샘플이 아직 없습니다.</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                75%와 65% 이하는 구분해서 보고 있습니다. 후보를 넓게 보려면 배열을 상관없음으로 바꿔보세요.
              </p>
            </div>
          )}

          {visibleKeyboards.map(({ keyboard }) => {
            const display = getContentDisplay(keyboard);
            const specificLayout = getKeyboardSpecificLayout(keyboard) ?? "65%";
            const layoutMeta = KEYBOARD_LAYOUT_META[specificLayout];
            const communityNote = display.communityNote || "키보드 체감은 스위치, 보강판, 흡음재에 따라 다르게 느껴질 수 있습니다.";
            const specRows = getKeyboardSpecRows(keyboard);
            const additionalSpecRows = getKeyboardAdditionalSpecRows(keyboard);
            const strengths = display.strengths.slice(0, 3);
            const cautions = display.cautions.slice(0, 3);
            const buyingCheck = display.buyingCheck.slice(0, 3);
            const isExpanded = expandedKeyboardId === keyboard.id;

            return (
              <article key={keyboard.id} className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-3">
                <div className="mb-1 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{keyboard.brand || "Unknown"}</p>
                    <h3 className="text-base font-bold text-[var(--primary)]">{keyboard.name}</h3>
                  </div>
                </div>
                <div className="mb-1.5 flex flex-wrap gap-1">
                  <span className="rounded-md bg-[var(--accent)]/10 px-1.5 py-0.5 text-[9.5px] font-bold text-[var(--accent)]">
                    {layoutMeta.badge} {keyboard.layout.toUpperCase()}
                  </span>
                  {keyboard.features.slice(0, 2).map((feature) => (
                    <span key={feature} className="rounded-md bg-[var(--accent)]/10 px-1.5 py-0.5 text-[9.5px] font-bold text-[var(--accent)]">
                      {feature}
                    </span>
                  ))}
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
                <div className="grid gap-2 text-[10.5px] leading-relaxed">
                  <p><span className="font-bold text-[var(--primary)]">체감 한줄평: </span><span className="text-[var(--muted)]">{communityNote}</span></p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleKeyboardDetail(keyboard.id)}
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
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {hasMoreResults && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3 text-center">
              <p className="mb-2 text-[11px] leading-relaxed text-[var(--muted)]">
                조건에 맞는 다른 후보도 확인해 보세요.
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

          <div className="rounded-xl border border-[var(--accent)]/10 bg-[var(--accent)]/5 p-3">
            <div className="flex gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <p className="text-[11px] leading-relaxed text-[var(--accent)] opacity-80">
                배열 다이어그램은 계속 숨깁니다. 향후 직접 제작한 이미지가 준비되면 `layoutImage` 필드를 사용할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3">
            <div className="flex gap-2">
              <Keyboard className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
              <p className="text-[11px] leading-relaxed text-[var(--muted)]">참고용으로 보세요. 같은 스위치 이름이어도 모델마다 체감이 달라질 수 있습니다.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
