import Link from "next/link";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { SWITCH_DATABASE } from "@/content/kr/switches";
import { getContentDisplay } from "@/content/utils";

export default function SwitchGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-[70vh]">
      <Link 
        href="/kr" 
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        메인으로 돌아가기
      </Link>

      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--primary)] md:text-4xl">Keyboard Switch Guide</h1>
        <p className="text-[var(--muted)]">복잡한 스위치 이름 대신, 실제 체감과 용도에 맞는 축을 찾아보세요.</p>
      </div>

      {/* Switch Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SWITCH_DATABASE.map((sw) => {
          const display = getContentDisplay(sw);
          return (
            <div
              key={sw.id}
              className="flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--secondary)]/20 p-6 hover:bg-[var(--secondary)]/40 transition-all shadow-sm"
            >
              <h3 className="mb-4 text-xl font-bold text-[var(--primary)]">{sw.name}</h3>

              <div className="mb-6 space-y-4">
                <div className="group flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)]/60 p-4 transition-colors hover:border-orange-400/30 hover:bg-orange-400/10">
                  <MessageSquare className="mt-1 h-4 w-4 shrink-0 text-[var(--muted)] transition-colors group-hover:text-orange-500" />
                  <div>
                    <p className="text-sm font-bold text-[var(--primary)] transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300">어떤 느낌인가요?</p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{display.beginnerSummary}</p>
                  </div>
                </div>

              </div>

              <div className="mt-auto space-y-3">
                <div className="group space-y-1.5 rounded-2xl border border-[var(--border)] bg-[var(--background)]/60 p-4 transition-colors hover:border-orange-400/30 hover:bg-orange-400/10">
                  <p className="text-[11px] font-bold text-[var(--primary)] transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300">구매 전 체크!</p>
                  <ul className="list-inside list-disc space-y-1 text-[10px] text-[var(--muted)]">
                    {display.buyingCheck.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                    <li>{display.caution}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
