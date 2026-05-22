"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface KeyLog {
  id: number;
  key: string;
  interval: number;
  suspicious: boolean;
}

export function KeyboardChatterTest() {
  const [threshold, setThreshold] = useState(30);
  const [logs, setLogs] = useState<KeyLog[]>([]);
  const lastKeyTime = useRef<Record<string, number>>({});
  const logId = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const now = performance.now();
      const previous = lastKeyTime.current[event.code] ?? 0;
      const interval = previous ? Math.round(now - previous) : 0;
      const suspicious = interval > 0 && interval <= threshold;
      lastKeyTime.current[event.code] = now;
      setLogs((current) => [
        { id: ++logId.current, key: event.key.length === 1 ? event.key.toUpperCase() : event.code, interval, suspicious },
        ...current,
      ].slice(0, 100));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [threshold]);

  const reset = () => {
    setLogs([]);
    lastKeyTime.current = {};
    logId.current = 0;
  };

  const suspiciousCount = logs.filter((log) => log.suspicious).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-5">
          <h2 className="mb-4 text-sm font-bold text-[var(--primary)]">감지 기준</h2>
          <label className="mb-2 block text-xs text-[var(--muted)]">같은 키가 {threshold}ms 이하로 다시 입력되면 의심</label>
          <input type="range" min="10" max="80" step="5" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} className="w-full accent-[var(--accent)]" />
          <div className="mt-6 flex justify-between text-sm text-[var(--muted)]">
            <span>의심 입력</span>
            <strong className={suspiciousCount > 0 ? "text-red-500" : "text-emerald-500"}>{suspiciousCount}</strong>
          </div>
          <button onClick={reset} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-bold text-[var(--muted)] hover:bg-[var(--background)]">
            <RotateCcw className="h-4 w-4" />
            기록 초기화
          </button>
        </div>
        <p className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs leading-relaxed text-[var(--muted)]">
          평소처럼 문장을 타이핑해보세요. 같은 키가 매우 짧은 간격으로 다시 입력되면 채터링 가능성을 참고할 수 있습니다. OS 반복 입력 설정, 브라우저 이벤트, 키보드 펌웨어에 따라 기록이 달라질 수 있습니다.
        </p>
      </aside>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--primary)]">입력 기록</h2>
          <span className="text-xs text-[var(--muted)]">최근 100개</span>
        </div>
        <div className="grid max-h-[520px] gap-2 overflow-y-auto md:grid-cols-2">
          {logs.map((log) => (
            <div key={log.id} className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs ${log.suspicious ? "bg-red-500/10 text-red-500" : "bg-[var(--secondary)]/40 text-[var(--muted)]"}`}>
              <span className="font-bold">{log.key}</span>
              <span>{log.interval || "--"}ms</span>
              {log.suspicious && <AlertTriangle className="h-3.5 w-3.5" />}
            </div>
          ))}
          {logs.length === 0 && <p className="col-span-full py-24 text-center text-sm text-[var(--muted)]">키보드를 눌러 입력 기록을 시작하세요.</p>}
        </div>
      </div>
    </div>
  );
}
