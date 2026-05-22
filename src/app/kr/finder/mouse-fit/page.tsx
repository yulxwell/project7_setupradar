"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, RotateCcw, SlidersHorizontal } from "lucide-react";
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

function scoreMouse(mouse: (typeof MOUSE_DATABASE)[number], values: MouseFinderValues): MouseScore {
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
    <section className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-3">
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
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

export default function MouseFitPage() {
  const [values, setValues] = useState<MouseFinderValues>(MOUSE_FINDER_DEFAULTS);

  const scoredMice = useMemo(
    () => MOUSE_DATABASE
      .map((mouse) => scoreMouse(mouse, values))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3),
    [values],
  );

  const updateValue = <Key extends keyof MouseFinderValues>(key: Key, value: MouseFinderValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
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
          <h1 className="text-2xl font-bold text-[var(--primary)] md:text-3xl">Mouse Finder</h1>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
            필요한 조건만 빠르게 고르세요. 상관없음을 선택하면 후보를 넓게 봅니다.
          </p>
        </div>
        <button
          onClick={() => setValues(MOUSE_FINDER_DEFAULTS)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 text-xs font-bold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)]/80"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          초기화
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid content-start gap-3 md:grid-cols-2">
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
          <CompactOptionGroup
            group={MOUSE_FINDER_OPTIONS.connection}
            value={values.connection}
            onChange={(value) => updateValue("connection", value as MouseFinderValues["connection"])}
          />
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

          {scoredMice.map(({ mouse }) => {
            const display = getContentDisplay(mouse);
            const communityNote = display.communityNote || "커뮤니티 체감은 손 크기와 기존 사용 마우스에 따라 갈릴 수 있습니다.";
            const specRows = getMouseSpecRows(mouse);
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

            return (
              <article key={mouse.id} className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-3">
                <div className="mb-1 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{mouse.brand || "Unknown"}</p>
                    <h3 className="text-base font-bold text-[var(--primary)]">{mouse.name}</h3>
                  </div>
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

                {shellRefs && shellRefs.length > 0 && (
                  <div className="mt-2 border-t border-[var(--border)]/30 pt-2 text-[10px] leading-relaxed">
                    <p className="mb-1 font-bold text-[var(--muted)]">쉘 체감 레퍼런스</p>
                    <div className="space-y-1.5">
                      {shellRefs.map((ref, idx) => {
                        const refText = getShellRefText(ref);
                        if (!refText) return null;
                        return (
                          <div key={idx} className="rounded-md border border-[var(--border)]/20 bg-[var(--secondary)]/10 p-1.5">
                            <p className="text-[9.5px] font-medium text-[var(--muted)]">{refText}</p>
                            {ref.cautionKo && (
                              <p className="mt-0.5 text-[9px] text-[var(--muted)] leading-snug">
                                ※ {ref.cautionKo}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
