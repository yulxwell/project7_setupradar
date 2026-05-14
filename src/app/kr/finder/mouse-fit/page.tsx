"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Ruler, 
  Hand, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  AlertCircle, 
  Weight, 
  Wifi, 
  Target, 
  HelpCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOUSE_DATABASE } from "@/content/kr/products/mice";
import { getContentDisplay } from "@/content/utils";
import { cn } from "@/lib/utils";

type Step = "size" | "problem" | "weight" | "connection" | "purpose" | "grip" | "result";
type HandSize = "small" | "medium" | "large";
type WeightPref = "ultralight" | "normal" | "any";
type ConnectionPref = "wireless" | "wired" | "any";
type Purpose = "fps" | "moba" | "office" | "all";
type GripStyle = "palm" | "claw" | "fingertip" | "unknown";
type Problem = "wrist" | "size" | "weight" | "doubleclick" | "none";

export default function MouseFitPage() {
  const [step, setStep] = useState<Step>("size");
  const [handSize, setHandSize] = useState<HandSize | null>(null);
  const [problem, setProblem] = useState<Problem>("none");
  const [weightPref, setWeightPref] = useState<WeightPref>("any");
  const [connectionPref, setConnectionPref] = useState<ConnectionPref>("any");
  const [purpose, setPurpose] = useState<Purpose>("all");
  const [gripStyle, setGripStyle] = useState<GripStyle>("unknown");

  const filteredMice = useMemo(() => {
    if (step !== "result") return [];
    
    return MOUSE_DATABASE.filter(mouse => {
      // 1. Size match (Essential)
      const sizeMatch = !handSize || mouse.handSizeRange === handSize || mouse.handSizeRange === "all";
      
      // 2. Weight match
      let weightMatch = true;
      if (weightPref === "ultralight") weightMatch = mouse.weight < 65;
      
      // 3. Connection match
      let connMatch = true;
      const isWireless = mouse.features.some(f => f.includes("무선"));
      if (connectionPref === "wireless") connMatch = isWireless;
      if (connectionPref === "wired") connMatch = !isWireless;

      // 4. Purpose match
      let purposeMatch = true;
      if (purpose === "fps" || purpose === "moba") {
        // Prioritize lightweight or high polling rate
        const isGamingMice = mouse.weight < 80 || mouse.features.some(f => f.includes("8K") || f.includes("4K"));
        purposeMatch = isGamingMice;
      }

      // 5. Problem match (Soft match)
      // If wrist pain, prioritize ergonomic/asymmetric (we'll look for "비대칭" in features)
      if (problem === "wrist" && !mouse.features.some(f => f.includes("비대칭"))) {
        // Not a hard filter, but could be a score. For now, let's keep it simple.
      }

      // 5. Grip match (Reference only - only filter if specifically chosen and not 'unknown')
      const gripMatch = gripStyle === "unknown" || mouse.recommendedGrips.includes(gripStyle);

      return sizeMatch && weightMatch && connMatch && gripMatch && purposeMatch;
    });
  }, [step, handSize, weightPref, connectionPref, gripStyle, problem, purpose]);

  const reset = () => {
    setStep("size");
    setHandSize(null);
    setProblem("none");
    setWeightPref("any");
    setConnectionPref("any");
    setPurpose("all");
    setGripStyle("unknown");
  };

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: "size", label: "손 크기", icon: Ruler },
    { id: "problem", label: "불편함", icon: AlertCircle },
    { id: "weight", label: "무게", icon: Weight },
    { id: "connection", label: "연결", icon: Wifi },
    { id: "purpose", label: "용도", icon: Target },
    { id: "grip", label: "파지법", icon: Hand },
    { id: "result", label: "결과", icon: CheckCircle2 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
      <Link 
        href="/kr" 
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        메인으로 돌아가기
      </Link>

      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--primary)] md:text-4xl">Mouse Finder</h1>
        <p className="text-[var(--muted)]">당신의 손과 환경에 꼭 맞는 마우스를 찾아드립니다.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 hidden md:flex items-center justify-between gap-2">
        {steps.map((s, idx) => {
          const isActive = step === s.id;
          const stepIndex = steps.findIndex(x => x.id === step);
          const isDone = idx < stepIndex;
          
          return (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all",
                isActive ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)] shadow-lg shadow-[var(--accent)]/20" : 
                isDone ? "border-emerald-600 bg-emerald-600 text-white" : 
                "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
              )}>
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
              </div>
              <div className="overflow-hidden">
                <p className={cn("text-[10px] font-bold whitespace-nowrap", isActive ? "text-[var(--primary)]" : "text-[var(--muted)] opacity-60")}>{s.label}</p>
              </div>
              {idx < steps.length - 1 && <div className="flex-1 border-t border-[var(--border)]" />}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {step === "size" && (
          <motion.div 
            key="size"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">본인의 손 크기를 선택해주세요</h2>
              <p className="text-sm text-[var(--muted)]">키보드 F열을 기준으로 측정하거나, 느낌상 크기를 선택하세요.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { id: "small", label: "작음 (F9 이하)", desc: "손이 작아 일반 마우스가 큽니다" },
                { id: "medium", label: "보통 (F10~F10.5)", desc: "대부분의 표준 모델이 맞습니다" },
                { id: "large", label: "큼 (F11 이상)", desc: "손이 커서 마우스가 남습니다" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setHandSize(item.id as HandSize);
                    setStep("problem");
                  }}
                  className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]/50"
                >
                  <span className="mb-2 text-xl font-bold text-[var(--primary)]">{item.label}</span>
                  <span className="text-center text-xs text-[var(--muted)]">{item.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "problem" && (
          <motion.div 
            key="problem"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">현재 마우스에서 가장 불편한 점은?</h2>
              <p className="text-sm text-[var(--muted)]">가장 해결하고 싶은 고민을 선택해주세요.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: "wrist", label: "손목이 아파요", desc: "인체공학적 설계가 필요합니다" },
                { id: "size", label: "크기가 안 맞아요", desc: "더 크거나 작은 모델이 필요합니다" },
                { id: "weight", label: "너무 무거워요", desc: "가벼운 무게가 최우선입니다" },
                { id: "doubleclick", label: "버튼 고장이 잦아요", desc: "내구성 좋은 스위치가 필요합니다" },
                { id: "none", label: "딱히 없어요 / 첫 구매", desc: "가장 인기 있는 표준형을 추천합니다" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setProblem(item.id as Problem);
                    setStep("weight");
                  }}
                  className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]/50"
                >
                  <span className="mb-1 text-lg font-bold text-[var(--primary)]">{item.label}</span>
                  <span className="text-center text-xs text-[var(--muted)]">{item.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("size")} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--primary)]">이전으로</button>
          </motion.div>
        )}

        {step === "weight" && (
          <motion.div 
            key="weight"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">무게는 어느 정도를 원하시나요?</h2>
              <p className="text-sm text-[var(--muted)]">요즘은 가벼운 마우스가 트렌드지만 개인차가 큽니다.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { id: "ultralight", label: "매우 가벼움", desc: "65g 미만 / 빠른 조작" },
                { id: "normal", label: "적당한 무게", desc: "70~90g / 안정적인 느낌" },
                { id: "any", label: "상관 없음", desc: "무게보다 다른 요소 중시" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setWeightPref(item.id as WeightPref);
                    setStep("connection");
                  }}
                  className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]/50"
                >
                  <span className="mb-1 text-lg font-bold text-[var(--primary)]">{item.label}</span>
                  <span className="text-center text-xs text-[var(--muted)]">{item.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("problem")} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--primary)]">이전으로</button>
          </motion.div>
        )}

        {step === "connection" && (
          <motion.div 
            key="connection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">유선 vs 무선, 어떤 것을 선호하세요?</h2>
              <p className="text-sm text-[var(--muted)]">성능 차이는 거의 없지만 가격과 편의성이 다릅니다.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { id: "wireless", label: "무선 (Wireless)", desc: "선 걸림 없는 자유로움" },
                { id: "wired", label: "유선 (Wired)", desc: "충전 필요 없는 안정성" },
                { id: "any", label: "상관 없음", desc: "가격대비 성능 우선" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setConnectionPref(item.id as ConnectionPref);
                    setStep("purpose");
                  }}
                  className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]/50"
                >
                  <span className="mb-1 text-lg font-bold text-[var(--primary)]">{item.label}</span>
                  <span className="text-center text-xs text-[var(--muted)]">{item.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("weight")} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--primary)]">이전으로</button>
          </motion.div>
        )}

        {step === "purpose" && (
          <motion.div 
            key="purpose"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">주로 어떤 용도로 사용하시나요?</h2>
              <p className="text-sm text-[var(--muted)]">용도에 따라 필요한 기능과 성능이 달라집니다.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { id: "fps", label: "FPS 게임", desc: "배그, 오버워치 등 정밀 조작" },
                { id: "moba", label: "MOBA/RPG", desc: "롤, 디아 등 다버튼 활용" },
                { id: "office", label: "사무용/작업", desc: "장시간 편안한 사용" },
                { id: "all", label: "범용 (All)", desc: "다양하게 활용" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPurpose(item.id as Purpose);
                    setStep("grip");
                  }}
                  className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]/50"
                >
                  <span className="mb-1 text-lg font-bold text-[var(--primary)]">{item.label}</span>
                  <span className="text-center text-xs text-[var(--muted)]">{item.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("connection")} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--primary)]">이전으로</button>
          </motion.div>
        )}

        {step === "grip" && (
          <motion.div 
            key="grip"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-bold text-[var(--accent)]">
                <HelpCircle className="h-3 w-3" /> 참고 선택 사항
              </div>
              <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">평소 마우스 파지법(그립)은?</h2>
              <p className="text-sm text-[var(--muted)]">잘 모르겠다면 &apos;잘 모르겠음&apos;을 선택하셔도 결과에는 큰 영향이 없습니다.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { id: "palm", label: "팜 그립 (Palm)", desc: "손바닥 전체 밀착" },
                { id: "claw", label: "클로 그립 (Claw)", desc: "손가락 끝을 세움" },
                { id: "fingertip", label: "핑거 그립", desc: "손가락 끝으로만 조작" },
                { id: "unknown", label: "잘 모르겠음", desc: "상관 없이 추천받기" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setGripStyle(item.id as GripStyle);
                    setStep("result");
                  }}
                  className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]/50"
                >
                  <span className="mb-1 text-lg font-bold text-[var(--primary)]">{item.label}</span>
                  <span className="text-center text-xs text-[var(--muted)]">{item.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("purpose")} className="text-sm font-bold text-[var(--muted)] hover:text-[var(--primary)]">이전으로</button>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="mb-2 text-2xl font-bold text-[var(--primary)]">당신을 위한 마우스 추천 결과</h2>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold text-[var(--muted)] border border-[var(--border)] uppercase">
                    {handSize}
                  </span>
                  {weightPref !== "any" && (
                    <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold text-[var(--muted)] border border-[var(--border)] uppercase">
                      {weightPref === "ultralight" ? "초경량" : "안정적 무게"}
                    </span>
                  )}
                  {connectionPref !== "any" && (
                    <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold text-[var(--muted)] border border-[var(--border)] uppercase">
                      {connectionPref === "wireless" ? "무선" : "유선"}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={reset}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-5 py-3 text-sm font-bold text-[var(--primary)] hover:bg-[var(--secondary)]/80"
              >
                <RotateCcw className="h-4 w-4" /> 다시 하기
              </button>
            </div>

            {filteredMice.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filteredMice.map((mouse) => {
                  const display = getContentDisplay(mouse);
                  return (
                    <div 
                      key={mouse.id}
                      className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-tighter">{mouse.brand || "Unknown"}</span>
                        <span className="text-sm font-bold text-[var(--primary)]">{mouse.priceRange}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-[var(--primary)]">{mouse.name}</h3>
                      <p className="mb-4 text-xs text-[var(--muted)] leading-relaxed">{display.summary}</p>
                      
                      <div className="mb-6 space-y-3">
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">주요 특징</p>
                          <ul className="grid grid-cols-1 gap-1">
                            {display.strengths.slice(0, 2).map((s, i) => (
                              <li key={i} className="flex items-center gap-2 text-[10px] text-[var(--muted)]">
                                <div className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-1.5">
                        {mouse.features.map(f => (
                          <span key={f} className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--accent)]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-20 text-center">
                <Info className="mx-auto mb-4 h-10 w-10 text-[var(--muted)] opacity-30" />
                <p className="text-lg font-bold text-[var(--primary)]">아직 완벽하게 일치하는 제품이 없네요.</p>
                <p className="text-sm text-[var(--muted)]">조건을 조금 더 완화해서 다시 시도해보세요.</p>
              </div>
            )}

            <div className="rounded-2xl bg-[var(--accent)]/5 p-6 border border-[var(--accent)]/10">
              <div className="flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[var(--accent)]">참고해주세요!</p>
                  <p className="text-[11px] leading-relaxed text-[var(--accent)] opacity-80">
                    손 크기와 현재 불편함 기준으로 보면 이 제품들이 잘 맞을 수 있습니다. 
                    파지법(Grip)은 습관에 따라 적응할 수 있는 요소이므로, 절대적인 기준보다는 참고용으로만 활용하시는 편이 좋습니다. 
                    가장 중요한 것은 실제 손에 쥐었을 때의 첫인상과 편안함입니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

