"use client";

import { useRef, useState } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface WheelLog {
  id: number;
  delta: number;
  direction: "up" | "down";
  suspicious: boolean;
}

export function MouseWheelEncoderTest() {
  const [logs, setLogs] = useState<WheelLog[]>([]);
  const lastDirection = useRef<"up" | "down" | null>(null);
  const logId = useRef(0);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const direction: WheelLog["direction"] = event.deltaY > 0 ? "down" : "up";
    const suspicious = lastDirection.current !== null && lastDirection.current !== direction && Math.abs(event.deltaY) < 80;
    lastDirection.current = direction;
    setLogs((current) => [
      { id: ++logId.current, delta: Math.round(event.deltaY), direction, suspicious },
      ...current,
    ].slice(0, 80));
  };

  const reset = () => {
    setLogs([]);
    lastDirection.current = null;
    logId.current = 0;
  };

  const suspiciousCount = logs.filter((log) => log.suspicious).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div
        onWheel={handleWheel}
        className="flex min-h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--background)] p-8 text-center transition-colors hover:border-[var(--accent)]"
      >
        <p className="text-2xl font-black text-[var(--primary)]">이 영역 위에서 휠을 굴려보세요</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          아래로 천천히 한 칸씩, 빠르게도 굴려보세요. 의도와 반대로 짧게 튀는 입력이 반복되면 휠 튐 증상을 의심해볼 수 있습니다.
        </p>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--primary)]">참고 요약</h2>
            <button aria-label="휠 입력 기록 초기화" onClick={reset} className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:bg-[var(--background)]">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>전체 입력</span>
            <strong className="text-[var(--primary)]">{logs.length}</strong>
          </div>
          <div className="mt-3 flex justify-between text-sm text-[var(--muted)]">
            <span>튐 의심</span>
            <strong className={suspiciousCount > 0 ? "text-red-500" : "text-emerald-500"}>{suspiciousCount}</strong>
          </div>
        </div>
        <div className="h-80 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3">
          {logs.map((log) => (
            <div key={log.id} className={`mb-2 flex items-center justify-between rounded-xl px-3 py-2 text-xs ${log.suspicious ? "bg-red-500/10 text-red-500" : "bg-[var(--secondary)]/40 text-[var(--muted)]"}`}>
              <span>{log.direction === "down" ? "아래" : "위"}</span>
              <span>{log.delta}</span>
              {log.suspicious && <AlertTriangle className="h-3.5 w-3.5" />}
            </div>
          ))}
          {logs.length === 0 && <p className="py-20 text-center text-xs text-[var(--muted)]">휠 입력 기록이 여기에 표시됩니다.</p>}
        </div>
        <p className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs leading-relaxed text-[var(--muted)]">
          한두 번의 튐만으로 고장이라고 단정하지 마세요. 먼지, 휠 표면 상태, 드라이버, 브라우저 이벤트 처리 영향도 함께 확인하는 편이 좋습니다.
        </p>
      </aside>
    </div>
  );
}
