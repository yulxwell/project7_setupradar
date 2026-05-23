"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Keyboard, RotateCcw, SlidersHorizontal } from "lucide-react";
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

function matchesKeyboardLayout(selectedLayout: KeyboardFinderValues["layout"], productLayout: KeyboardBasicFilters["layout"]) {
  if (selectedLayout === "any") return true;
  if (selectedLayout === "75%" || selectedLayout === "65%" || selectedLayout === "60%") {
    return productLayout === "compact";
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

function scoreKeyboard(keyboard: (typeof KEYBOARD_DATABASE)[number], values: KeyboardFinderValues): KeyboardScore {
  const reasons: string[] = [];
  const cautions: string[] = [];
  let score = 0;
  const filters = getKeyboardBasicFilters(keyboard);
  const selectedLayout = values.layout === "any" ? null : values.layout;

  if (selectedLayout) {
    if (matchesKeyboardLayout(selectedLayout, filters.layout)) {
      score += 3;
      reasons.push("선택한 배열 조건과 맞을 수 있습니다.");
    } else {
      cautions.push("선호 배열과 다를 수 있어 키 배치 적응 여부를 확인해보세요.");
    }
  }

  if (values.layout === "60%") {
    cautions.push("현재 기본 필터에서는 60%를 compact 후보와 함께 넓게 봅니다.");
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
  "65%": "65%",
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

export default function KeyboardFitPage() {
  const [values, setValues] = useState<KeyboardFinderValues>(KEYBOARD_FINDER_DEFAULTS);
  const [expandedKeyboardId, setExpandedKeyboardId] = useState<string | null>(null);

  const scoredKeyboards = useMemo(
    () => KEYBOARD_DATABASE
      .map((keyboard) => scoreKeyboard(keyboard, values))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3),
    [values],
  );

  const selectedLayoutMeta = KEYBOARD_LAYOUT_META[values.layout];

  const updateValue = <Key extends keyof KeyboardFinderValues>(key: Key, value: KeyboardFinderValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const toggleKeyboardDetail = (keyboardId: string) => {
    setExpandedKeyboardId((current) => (current === keyboardId ? null : keyboardId));
  };

  return (
    <div className="container mx-auto min-h-[70vh] max-w-6xl px-4 py-8">
      <Link
        href="/kr"
        className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
      >
        <ChevronLeft className="h-4 w-4" />
        메인으로 돌아가기
      </Link>

      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            <SlidersHorizontal className="h-3 w-3" />
            Compact Finder
          </div>
          <h1 className="text-2xl font-bold text-[var(--primary)] md:text-3xl">Keyboard Finder</h1>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
            배열 그림 없이 텍스트 기준으로 빠르게 고릅니다. 잘 모르겠음을 선택하면 넓은 후보를 봅니다.
          </p>
        </div>
        <button
          onClick={() => setValues(KEYBOARD_FINDER_DEFAULTS)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 text-xs font-bold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)]/80"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          초기화
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid content-start gap-3 md:grid-cols-2">
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
        </div>

        <aside className="space-y-3 xl:sticky xl:top-20 xl:self-start">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-3">
            <h2 className="text-base font-bold text-[var(--primary)]">추천 결과</h2>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">현재 데이터에 있는 조건만 점수화합니다.</p>
          </div>

          {scoredKeyboards.map(({ keyboard }) => {
            const display = getContentDisplay(keyboard);
            const layoutMeta = KEYBOARD_LAYOUT_META[keyboard.layout === "compact" ? "60%" : keyboard.layout];
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
