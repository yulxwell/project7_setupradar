"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Mouse, RotateCcw, Trophy, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_OPTIONS = [5, 10, 30];

export function CpsTest() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState(5);
  const [clicks, setClicks] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
  const [bestCps, setBestCps] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("setupradar_best_cps");
      return saved ? parseFloat(saved) : 0;
    }
    return 0;
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus("finished");
    const currentCps = parseFloat((clicks / selectedTime).toFixed(2));
    if (currentCps > bestCps) {
      setBestCps(currentCps);
      localStorage.setItem("setupradar_best_cps", currentCps.toString());
    }
  }, [clicks, selectedTime, bestCps]);

  useEffect(() => {
    if (status === "running" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            finishTest();
            return 0;
          }
          return parseFloat((prev - 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, timeLeft, finishTest]);

  const startTest = () => {
    setClicks(0);
    setTimeLeft(selectedTime);
    setStatus("running");
  };

  const handleAreaClick = () => {
    if (status === "idle") {
      startTest();
      setClicks(1);
    } else if (status === "running") {
      setClicks((prev) => prev + 1);
    }
  };

  const getGrade = (clicks: number, seconds: number) => {
    const cps = clicks / seconds;
    if (cps >= 12) return { name: "전설 (Legend)", color: "text-amber-600 dark:text-amber-400", desc: "프로게이머 수준의 속도입니다." };
    if (cps >= 9) return { name: "달인 (Master)", color: "text-indigo-600 dark:text-indigo-400", desc: "매우 빠른 클릭 실력을 갖추고 있습니다." };
    if (cps >= 6) return { name: "우수 (Diamond)", color: "text-[var(--accent)]", desc: "평균 이상의 우수한 속도입니다." };
    return { name: "입문 (Beginner)", color: "text-[var(--muted)]", desc: "일반적인 사용자의 평균 속도입니다." };
  };

  const currentCps = status === "finished" ? (clicks / selectedTime) : (status === "running" ? (clicks / (selectedTime - timeLeft) || 0) : 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Test Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div className="flex items-center gap-2 rounded-2xl bg-[var(--secondary)] p-1 border border-[var(--border)]">
          {TIME_OPTIONS.map((time) => (
            <button
              key={time}
              disabled={status === "running"}
              onClick={() => setSelectedTime(time)}
              className={cn(
                "rounded-xl px-6 py-2.5 text-sm font-bold transition-all",
                selectedTime === time 
                  ? "bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--border)]" 
                  : "text-[var(--muted)] hover:text-[var(--primary)]"
              )}
            >
              {time}초
            </button>
          ))}
        </div>
        
        {bestCps > 0 && (
          <div className="flex items-center gap-2 rounded-2xl bg-amber-500/5 px-4 py-2 border border-amber-500/10">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">내 기록: {bestCps} CPS</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Click Area */}
        <div className="lg:col-span-2">
          <div 
            onClick={handleAreaClick}
            className={cn(
              "relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-4 transition-all select-none overflow-hidden",
              status === "running" 
                ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_0_40px_-15px_var(--accent)]" 
                : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/50"
            )}
          >
            {status === "running" && (
              <div 
                className="absolute bottom-0 left-0 h-2 bg-[var(--accent)] transition-all duration-100" 
                style={{ width: `${(timeLeft / selectedTime) * 100}%` }}
              />
            )}

            <div className="flex flex-col items-center gap-6 text-center">
              {status === "idle" ? (
                <>
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--secondary)] text-[var(--muted)] border border-[var(--border)]">
                    <Mouse className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--primary)]">클릭하여 시작</p>
                    <p className="text-sm text-[var(--muted)]">클릭하는 순간 타이머가 시작됩니다.</p>
                  </div>
                </>
              ) : status === "running" ? (
                <>
                  <div className="text-7xl font-black text-[var(--accent)] tabular-nums">{clicks}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-bold text-[var(--background)]">
                      <Clock className="h-3.5 w-3.5 opacity-70" /> {timeLeft}s
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[var(--secondary)] px-4 py-2 text-xs font-bold text-[var(--primary)] border border-[var(--border)]">
                      <Zap className="h-3.5 w-3.5 text-amber-500" /> {currentCps.toFixed(1)} CPS
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={cn("text-5xl font-black mb-2", getGrade(clicks, selectedTime).color)}>{currentCps.toFixed(1)} CPS</div>
                  <div className="mb-8">
                    <p className="text-xl font-bold text-[var(--primary)]">{getGrade(clicks, selectedTime).name}</p>
                    <p className="text-sm text-[var(--muted)]">{getGrade(clicks, selectedTime).desc}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); startTest(); }}
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-[var(--primary)] px-10 text-lg font-bold text-[var(--background)] transition-all hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="h-5 w-5" /> 다시 측정하기
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Grade Info */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--border)] p-8 bg-[var(--background)] shadow-sm">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">CPS 등급 가이드</h3>
            <div className="space-y-6">
              {[
                { name: "Legend", range: "12+", color: "bg-amber-500" },
                { name: "Master", range: "9 - 12", color: "bg-indigo-500" },
                { name: "Diamond", range: "6 - 9", color: "bg-[var(--accent)]" },
                { name: "Beginner", range: "0 - 6", color: "bg-[var(--muted)]" },
              ].map((grade) => (
                <div key={grade.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-2.5 w-2.5 rounded-full", grade.color)} />
                    <span className="text-sm font-bold text-[var(--primary)]">{grade.name}</span>
                  </div>
                  <span className="text-xs font-medium text-[var(--muted)]">{grade.range} CPS</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--accent)]/5 p-6 border border-[var(--accent)]/10">
            <p className="text-[11px] leading-relaxed text-[var(--muted)]">
              <span className="font-bold text-[var(--accent)]">Tip:</span> 기록은 브라우저(localStorage)에만 저장되며, 측정 중 페이지를 벗어나면 초기화됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
