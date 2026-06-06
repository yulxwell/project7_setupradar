import type { Metadata } from "next";
import { SITE_COPY } from "@/content/kr/siteCopy";
import { EQUIPMENT_UPDATE_PREVIEWS } from "@/content/kr/updates";
import { Monitor, MousePointer2, Zap, Mouse, Keyboard, ArrowRight, ShieldCheck, LayoutGrid } from "lucide-react";
import { TestCard, GuideCard } from "@/components/cards/Cards";
import Link from "next/link";

export const metadata: Metadata = {
  title: "하드웨어 테스트와 구매 가이드",
  description: "마우스, 키보드, 모니터 상태를 설치 없이 확인하고 구매 전 확인할 스펙을 초보자 기준으로 정리합니다.",
  alternates: {
    canonical: "/kr",
  },
};

function HighlightedSentence({ text, highlights }: { text: string; highlights: string[] }) {
  const activeHighlights = highlights.filter(Boolean);
  if (activeHighlights.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${activeHighlights.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        activeHighlights.includes(part) ? (
          <span key={`${part}-${index}`} className="text-[var(--accent)]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function HomeSectionHeader({
  title,
  description,
  href,
  actionLabel,
}: {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight text-[var(--primary)] md:text-2xl">{title}</h2>
        <p className="text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      </div>
      {href && actionLabel ? (
        <Link href={href} className="group flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--accent)] transition-colors">
          {actionLabel} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}

function HomeIntroBlock({
  eyebrow,
  title,
  description,
  highlights = [],
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  actions?: Array<{
    href: string;
    label: string;
    variant?: "primary" | "secondary";
  }>;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
        {eyebrow}
      </div>
      <h2 className="mx-auto mb-3 max-w-2xl font-outfit text-2xl font-bold tracking-tight text-[var(--primary)] md:text-3xl">
        <HighlightedSentence text={title} highlights={highlights} />
      </h2>
      <p className="mx-auto max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{description}</p>
      {actions && actions.length > 0 ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.variant === "secondary"
                  ? "flex h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 text-sm font-bold text-[var(--primary)] transition-all hover:bg-[var(--secondary)] active:scale-95"
                  : "flex h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-6 text-sm font-bold text-[var(--background)] transition-all hover:opacity-90 active:scale-95"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="pb-20">
      {/* Hero Section - Sober & Warm */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-14 pb-10 md:pt-20 md:pb-16">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] border border-[var(--border)]">
            SetupRadar Hardware Guide
          </div>
          <h1 className="mx-auto mb-4 max-w-3xl font-outfit text-2xl font-bold tracking-tight text-[var(--primary)] md:text-4xl lg:text-5xl">
            <HighlightedSentence text={SITE_COPY.kr.landing.heroTitle} highlights={[SITE_COPY.hero.titleHighlight]} />
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
            <HighlightedSentence text={SITE_COPY.hero.description} highlights={["테스트 도구", "구매 전 확인 기준", "후보 비교"]} />
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/kr/tests" className="flex h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-8 text-sm font-bold text-[var(--background)] transition-all hover:opacity-90 active:scale-95">
              {SITE_COPY.kr.landing.startButton}
            </Link>
            <Link href="/kr/guides" className="flex h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-8 text-sm font-bold text-[var(--primary)] transition-all hover:bg-[var(--secondary)] active:scale-95">
              {SITE_COPY.kr.landing.guideButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16">
        <HomeSectionHeader
          title="장비 상태 테스트"
          description="설치 없이 브라우저에서 의심 증상과 설정 상태를 참고용으로 확인해보세요."
          href="/kr/tests"
          actionLabel="전체 보기"
        />
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestCard 
            title="불량화소 테스트" 
            description="색상별 전체화면으로 눈에 띄는 점이나 화면 이상을 참고용으로 확인합니다."
            href="/kr/tests/dead-pixel"
            icon={Monitor}
            duration="1~3분"
            purpose="화면 속 작은 점 의심 증상 확인"
          />
          <TestCard 
            title="더블클릭 테스트" 
            description="한 번 클릭했는데 두 번 입력되는 증상이 반복되는지 참고용으로 확인합니다."
            href="/kr/tests/double-click"
            icon={MousePointer2}
            duration="30초"
            purpose="중복 클릭 의심 증상 확인"
          />
          <TestCard 
            title="폴링레이트 측정" 
            description="마우스가 PC와 데이터를 주고받는 속도를 브라우저에서 참고용으로 확인합니다."
            href="/kr/tests/polling-rate"
            icon={Zap}
            duration="10초"
            purpose="전송 속도와 설정 상태 확인"
          />
        </div>
      </section>

      {/* Beginner Guides */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <HomeIntroBlock
          eyebrow="SetupRadar Spec Guide"
          title="구매 전에 스펙 기준을 먼저 정리해보세요."
          highlights={["스펙 기준"]}
          description="마우스, 키보드, 모니터를 고를 때 자주 보이는 표현을 초보자 기준으로 풀어보고, 구매 전 확인할 항목을 차분히 살펴봅니다."
          actions={[
            { href: "/kr/guides", label: "가이드 보기" },
            { href: "/kr/guides/beginner-spec-traps", label: "스펙 함정 보기", variant: "secondary" },
          ]}
        />
        <HomeSectionHeader
          title="구매 전 스펙 가이드"
          description="광고 문구보다 실제로 확인할 기준을 초보자 눈높이로 정리했습니다."
          href="/kr/guides"
          actionLabel="전체 보기"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GuideCard 
            title="대칭형 vs 오른손용 비대칭형"
            description="마우스 형태가 손바닥 지지감과 움직임에 어떤 차이를 만드는지 확인하세요."
            href="/kr/guides/mouse-shape-symmetrical-vs-ergonomic"
            icon={Mouse}
          />
          <GuideCard 
            title="마우스 스위치와 더블클릭"
            description="기계식 스위치와 광축 차이, 더블클릭 확인 방법을 정리했습니다."
            href="/kr/guides/mouse-switch-double-click"
            icon={MousePointer2}
          />
          <GuideCard 
            title="리니어/택타일/클릭/저소음" 
            description="스위치 느낌을 초보자 기준으로 나누고 구매 전 체크를 정리했습니다." 
            href="/kr/guides/keyboard-switch-types" 
            icon={Zap}
          />
          <GuideCard 
            title="래피드 트리거/자석축"
            description="게임에서 체감될 수 있는 입력 방식과 구매 전 확인점을 정리했습니다."
            href="/kr/guides/rapid-trigger-magnetic-switch"
            icon={Keyboard}
          />
          <GuideCard 
            title="PBT vs ABS 키캡"
            description="키캡 소재가 촉감, 번들거림, 소리에 주는 차이를 쉽게 봅니다."
            href="/kr/guides/pbt-vs-abs-keycaps"
            icon={Keyboard}
          />
          <GuideCard 
            title="불량화소와 무결점 정책"
            description="모니터 구매 후 화면 결함과 교환 기준을 확인하는 방법입니다."
            href="/kr/guides/dead-pixel-policy"
            icon={ShieldCheck}
          />
        </div>
      </section>

      {/* Equipment Finders */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <HomeIntroBlock
          eyebrow="SetupRadar Finder"
          title="새 장비 후보를 조건별로 가볍게 좁혀보세요."
          highlights={["조건별로"]}
          description="손 크기, 배열, 소음, 연결 방식처럼 처음 고를 때 놓치기 쉬운 조건을 넣고 비교할 후보를 참고용으로 정리합니다."
          actions={[
            { href: "/kr/finder/mouse-fit", label: "마우스 찾기" },
            { href: "/kr/finder/keyboard-fit", label: "키보드 찾기", variant: "secondary" },
          ]}
        />
        <HomeSectionHeader
          title="장비 후보 Finder"
          description="구매 전 비교가 필요할 때 손 크기, 배열, 소음 같은 조건으로 후보를 가볍게 좁혀보세요."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GuideCard
            title="마우스 찾기"
            description="손 크기, 형태, 무게, 연결 방식으로 구매 전 비교할 후보를 좁힙니다."
            href="/kr/finder/mouse-fit"
            icon={MousePointer2}
          />
          <GuideCard
            title="키보드 찾기"
            description="배열, 키감, 소음, 연결 조건으로 구매 전 비교할 후보를 좁힙니다."
            href="/kr/finder/keyboard-fit"
            icon={Keyboard}
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16">
        <HomeSectionHeader
          title="최근 장비 소식"
          description="새 장비를 볼 때 같이 확인하면 좋은 흐름과 구매 전 체크 포인트를 가볍게 모았습니다. 자세한 판단은 관련 가이드와 판매처 기준을 함께 확인해 주세요."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {EQUIPMENT_UPDATE_PREVIEWS.map((item) => (
            <Link
              key={item.id}
              href={item.href ?? "/kr/guides"}
              className="group flex min-h-[250px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-[var(--border)] bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-bold text-[var(--accent)]">
                  {item.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">{item.sourceTypeLabel}</span>
              </div>
              <h3 className="text-base font-bold leading-snug text-[var(--primary)]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                <span className="text-xs font-semibold text-[var(--muted)]">{item.statusLabel}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                  관련 가이드 보기 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 text-center">
          <LayoutGrid className="h-5 w-5 text-[var(--muted)]/50 mb-3" />
          <p className="text-[11px] text-[var(--muted)] font-medium">
            가격과 판매 옵션은 구매 전 판매처 기준으로 확인해 주세요.
          </p>
        </div>
      </section>
    </div>
  );
}
