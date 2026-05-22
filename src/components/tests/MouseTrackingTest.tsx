"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

export function MouseTrackingTest() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [jumpCount, setJumpCount] = useState(0);
  const [pointCount, setPointCount] = useState(0);

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!lastPoint.current) {
      lastPoint.current = { x, y };
      return;
    }

    const distance = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y);
    if (distance > 80) setJumpCount((count) => count + 1);

    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#f97316";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPoint.current = { x, y };
    setPointCount((count) => count + 1);
  };

  const reset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    lastPoint.current = null;
    setJumpCount(0);
    setPointCount(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-5 md:flex-row md:items-center md:justify-between">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs font-bold text-[var(--muted)]">기록된 움직임</p>
            <p className="text-2xl font-black text-[var(--primary)]">{pointCount}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--muted)]">튐 의심</p>
            <p className={jumpCount > 0 ? "text-2xl font-black text-red-500" : "text-2xl font-black text-emerald-500"}>{jumpCount}</p>
          </div>
        </div>
        <button onClick={reset} className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-bold text-[var(--muted)] hover:bg-[var(--background)]">
          <RotateCcw className="h-4 w-4" />
          지우기
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={520}
        onPointerMove={draw}
        onPointerLeave={() => { lastPoint.current = null; }}
        className="h-[360px] w-full touch-none cursor-crosshair rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--background)] md:h-[420px]"
      />
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        천천히 원과 대각선을 그려보세요. 선이 끊기거나 갑자기 튀면 센서, 패드 표면, 무선 연결 상태를 함께 확인해보는 것이 좋습니다. 브라우저 포인터 이벤트 기반이라 전용 장비 수준의 정밀 측정은 아닙니다.
      </p>
    </div>
  );
}
