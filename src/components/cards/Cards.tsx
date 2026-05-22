import Link from "next/link";
import { LucideIcon, Clock, Target, AlertTriangle } from "lucide-react";

interface TestCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  duration?: string;
  purpose?: string;
  caution?: string;
}

export function TestCard({ title, description, href, icon: Icon, duration, purpose, caution }: TestCardProps) {
  return (
    <Link 
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/5 active:scale-[0.98]"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:text-[var(--background)] transition-colors duration-300">
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="mb-2 text-xl font-bold text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors">{title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
        {description}
      </p>

      {(duration || purpose || caution) && (
        <div className="mb-6 space-y-3 border-t border-[var(--border)] pt-5">
          {duration && (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--muted)]">
              <Clock className="h-3.5 w-3.5" />
              <span>소요 시간: {duration}</span>
            </div>
          )}
          {purpose && (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--muted)]">
              <Target className="h-3.5 w-3.5" />
              <span>용도: {purpose}</span>
            </div>
          )}
          {caution && (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--accent)]">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>주의: {caution}</span>
            </div>
          )}
        </div>
      )}

    </Link>
  );
}

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function GuideCard({ title, description, href, icon: Icon }: GuideCardProps) {
  return (
    <Link 
      href={href}
      className="group flex h-full items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--accent)] hover:bg-[var(--secondary)]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:text-[var(--background)] transition-all">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h4 className="mb-1 text-sm font-bold text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors">{title}</h4>
        <p className="text-xs leading-relaxed text-[var(--muted)] line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
