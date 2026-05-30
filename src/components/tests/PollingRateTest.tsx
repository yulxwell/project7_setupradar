"use client";

import { useState, useCallback, useRef } from "react";
import { Zap, AlertTriangle, RotateCcw, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PollingRateTest() {
  const [currentRate, setCurrentRate] = useState(0);
  const [maxRate, setMaxRate] = useState(0);
  const [samples, setSamples] = useState<number[]>([]);
  const lastTime = useRef<number>(0);
  const sampleCount = useRef<number>(0);

  const handleMouseMove = useCallback(() => {
    const now = performance.now();
    if (lastTime.current) {
      const interval = now - lastTime.current;
      if (interval > 0) {
        const rate = Math.round(1000 / interval);
        // Filter out extreme noise
        if (rate < 10000) {
          setCurrentRate(rate);
          if (rate > maxRate) setMaxRate(rate);
          
          sampleCount.current++;
          if (sampleCount.current % 5 === 0) {
            setSamples(prev => [rate, ...prev].slice(0, 40));
          }
        }
      }
    }
    lastTime.current = now;
  }, [maxRate]);

  const reset = () => {
    setCurrentRate(0);
    setMaxRate(0);
    setSamples([]);
    lastTime.current = 0;
    sampleCount.current = 0;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Measurement Area */}
      <div 
        onMouseMove={handleMouseMove}
        className="relative flex aspect-[21/9] w-full cursor-crosshair flex-col items-center justify-center rounded-[2.5rem] border-2 border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/50 transition-all overflow-hidden"
      >
        <div className="flex flex-col items-center gap-6 text-center pointer-events-none select-none">
          {currentRate > 0 ? (
            <>
              <div className="text-7xl font-black text-[var(--accent)] tabular-nums">{currentRate} <span className="text-2xl font-bold text-[var(--muted)] opacity-40">Hz</span></div>
              <p className="text-sm font-bold text-[var(--muted)] opacity-80">마우스를 계속 움직여주세요</p>
            </>
          ) : (
            <>
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--secondary)] text-[var(--muted)] border border-[var(--border)]">
                <MousePointer2 className="h-10 w-10" />
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--primary)]">마우스를 영역 안에서 움직이세요</p>
                <p className="text-sm text-[var(--muted)]">전송 속도(Polling Rate)를 실시간으로 측정합니다.</p>
              </div>
            </>
          )}
        </div>

        {/* Live Visualizer (Simple dots) */}
        <div className="absolute bottom-0 left-0 flex h-24 w-full items-end justify-center gap-1 px-10 opacity-20">
          {samples.map((s, i) => (
            <div 
              key={i} 
              className="w-full bg-[var(--accent)] rounded-t-sm transition-all" 
              style={{ height: `${Math.min((s / 8000) * 100, 100)}%` }} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="rounded-3xl border border-[var(--border)] p-8 bg-[var(--background)] shadow-sm">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">측정 결과</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">최대 속도</span>
                <span className="text-2xl font-black text-[var(--primary)] tabular-nums">{maxRate} Hz</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">상태</span>
                <span className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full",
                  maxRate >= 1000 ? "bg-emerald-500/10 text-emerald-500" : "bg-[var(--secondary)] text-[var(--muted)] border border-[var(--border)]"
                )}>
                  {maxRate >= 1000 ? "고성능" : "일반"}
                </span>
              </div>
            </div>
            
            <button 
              onClick={reset}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] p-3 text-sm font-bold text-[var(--muted)] hover:bg-[var(--secondary)] transition-all active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" /> 초기화
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl bg-amber-500/5 p-6 border border-amber-500/10">
            <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5" /> 브라우저 측정의 한계
            </h4>
            <ul className="space-y-2 text-[11px] leading-relaxed text-[var(--muted)] opacity-80">
              <li>• 브라우저는 보안 및 성능상의 이유로 1000Hz 이상의 데이터를 모두 안정적으로 처리하지 못할 수 있습니다.</li>
              <li>• 2K, 4K, 8K 마우스의 경우 전용 소프트웨어의 측정값이 더 정확합니다.</li>
              <li>• 마우스 이동 속도가 너무 느리면 폴링레이트 수치도 낮게 표시됩니다.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border)] p-6 flex items-start gap-4 bg-[var(--secondary)]/30">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <Zap className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <div>
              <h4 className="mb-1 text-sm font-bold text-[var(--primary)]">왜 중요할까요?</h4>
              <p className="text-xs leading-relaxed text-[var(--muted)] opacity-80">
                폴링레이트가 높을수록 마우스의 움직임과 화면의 커서가 더 부드럽게 일치하며 지연시간이 줄어듭니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
