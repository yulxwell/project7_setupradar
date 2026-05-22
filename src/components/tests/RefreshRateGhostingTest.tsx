"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Zap } from "lucide-react";

export function RefreshRateGhostingTest() {
  const [estimatedHz, setEstimatedHz] = useState(0);
  const [speed, setSpeed] = useState(2);
  const frameTimes = useRef<number[]>([]);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    let frameId = 0;
    const tick = (time: number) => {
      if (lastTime.current !== null) {
        const delta = time - lastTime.current;
        if (delta > 0 && delta < 100) {
          frameTimes.current = [...frameTimes.current, delta].slice(-90);
          const average = frameTimes.current.reduce((sum, value) => sum + value, 0) / frameTimes.current.length;
          setEstimatedHz(Math.round(1000 / average));
        }
      }
      lastTime.current = time;
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const reset = () => {
    frameTimes.current = [];
    lastTime.current = null;
    setEstimatedHz(0);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">체감용 추정 주사율</p>
            <p className="mt-1 text-4xl font-black text-[var(--primary)] tabular-nums">{estimatedHz || "--"} Hz</p>
          </div>
          <button onClick={reset} className="flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--muted)] hover:bg-[var(--secondary)]">
            <RotateCcw className="h-4 w-4" />
            다시 측정
          </button>
        </div>

        <label className="mb-3 block text-xs font-bold text-[var(--muted)]">움직임 속도</label>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          className="mb-8 w-full accent-[var(--accent)]"
        />

        <div className="relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(90deg,var(--secondary)_1px,transparent_1px)] [background-size:32px_32px]">
          <div
            className="absolute top-1/2 flex -translate-y-1/2 items-center gap-3"
            style={{ animation: `ufo-slide ${5 - speed}s linear infinite` }}
          >
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-10 w-20 rounded-full bg-[var(--accent)]"
                style={{ opacity: 1 - index * 0.2, filter: `blur(${index * 0.5}px)` }}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes ufo-slide {
            from { transform: translate(-160px, -50%); }
            to { transform: translate(calc(100vw + 160px), -50%); }
          }
        `}</style>
      </div>

      <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
          <Zap className="h-4 w-4" />
          확인 방법
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          움직이는 물체의 가장자리가 여러 겹으로 보이거나 길게 끌리면 잔상이 체감될 수 있습니다. 브라우저 하드웨어 가속, 모니터 주사율 설정, 전원 모드에 따라 결과가 달라질 수 있습니다. 눈이 피로하면 테스트를 멈추고 잠시 쉬어주세요.
        </p>
      </div>
    </div>
  );
}
