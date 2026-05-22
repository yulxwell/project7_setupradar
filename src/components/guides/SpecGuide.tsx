import { LucideIcon, CheckCircle2, ArrowRight, Info, Zap, AlertTriangle, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { DisclaimerBox } from "@/components/common/Common";

interface SpecGuideProps {
  title: string;
  category: string;
  lastUpdated?: string;
  icon: LucideIcon;
  oneLineMeaning: string;
  whatToCheckFirst: string;
  pros: string[];
  cons: string[];
  prePurchaseCheck: string[];
  relatedTest?: {
    name: string;
    href: string;
  };
}

export function SpecGuide({
  title,
  category,
  icon: Icon,
  oneLineMeaning,
  whatToCheckFirst,
  pros,
  cons,
  prePurchaseCheck,
  relatedTest
}: SpecGuideProps) {
  return (
    <div className="mx-auto max-w-4xl pb-20 px-4">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
            {category} Guide
          </div>
          <h1 className="text-3xl font-bold text-[var(--primary)] md:text-4xl">{title}</h1>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--muted)] border border-[var(--border)]">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* 한 줄 뜻 */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--primary)] uppercase tracking-tight">
              <Info className="h-4 w-4 text-[var(--accent)]" />
              한 줄 뜻
            </h2>
            <p className="text-lg font-medium leading-relaxed text-[var(--primary)] opacity-90 bg-[var(--accent)]/5 p-5 rounded-2xl border border-[var(--accent)]/10">
              {oneLineMeaning}
            </p>
          </section>

          {/* 먼저 확인할 것 */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--primary)] uppercase tracking-tight">
              <Search className="h-4 w-4 text-[var(--muted)]" />
              먼저 확인할 것
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              {whatToCheckFirst}
            </p>
          </section>

          {/* 좋은 점 & 주의점 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-2xl bg-emerald-500/5 p-6 border border-emerald-500/10">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                <Zap className="h-4 w-4" />
                좋은 점
              </h2>
              <ul className="space-y-3">
                {pros.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl bg-amber-500/5 p-6 border border-amber-500/10">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-tight">
                <AlertTriangle className="h-4 w-4" />
                주의점
              </h2>
              <ul className="space-y-3">
                {cons.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Sidebar: 구매 전 체크 */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm sticky top-24">
            <h2 className="mb-6 flex items-center gap-2 text-sm font-bold text-[var(--primary)] uppercase tracking-tight">
              <ShoppingBag className="h-4 w-4 text-[var(--accent)]" />
              구매 전 체크
            </h2>
            <ul className="space-y-4">
              {prePurchaseCheck.map((item, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-[10px] font-bold text-[var(--muted)] border border-[var(--border)]">
                    {i + 1}
                  </div>
                  <p className="text-xs font-medium leading-normal text-[var(--primary)] opacity-80">{item}</p>
                </li>
              ))}
            </ul>

            {relatedTest && (
              <Link 
                href={relatedTest.href}
                className="mt-8 flex items-center justify-between rounded-xl bg-[var(--primary)] p-4 text-[var(--background)] transition-all hover:opacity-90"
              >
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-1">Recommended</p>
                  <p className="text-xs font-bold">{relatedTest.name}</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </section>
          
          <DisclaimerBox className="bg-transparent border-0 p-0 text-[var(--muted)] opacity-60" />
        </aside>
      </div>
    </div>
  );
}
