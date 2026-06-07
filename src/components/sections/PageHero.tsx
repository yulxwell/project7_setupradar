import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  icon: LucideIcon;
  action?: ReactNode;
};

export function PageHero({ eyebrow, title, description, icon: Icon, action }: PageHeroProps) {
  return (
    <section className="relative mb-10 overflow-hidden rounded-2xl bg-[var(--secondary)]/50 px-5 py-7 text-left md:px-8 md:py-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <h1 className="mb-3 font-outfit text-2xl font-bold tracking-tight text-[var(--primary)] md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}
