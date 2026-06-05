import type { Metadata } from "next";
import { SITE_COPY } from "@/content/kr/siteCopy";
import { Monitor, MousePointer2, Zap, Mouse, Keyboard, ArrowRight, ShieldCheck, LayoutGrid } from "lucide-react";
import { TestCard, GuideCard } from "@/components/cards/Cards";
import Link from "next/link";

export const metadata: Metadata = {
  title: "하드웨어 테스트와 구매 가이드",
  description: "마우스, 키보드, 모니터 상태를 설치 없이 확인하고 구매 전 헷갈리는 스펙을 초보자 기준으로 정리합니다.",
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

export default function Home() {
  return (
    <div className="pb-20">
      {/* Hero Section - Sober & Warm */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-28 md:pb-24 border-b border-[var(--border)]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] border border-[var(--border)]">
            SetupRadar Hardware Check
          </div>
          <h1 className="mb-6 font-outfit text-4xl font-bold tracking-tight text-[var(--primary)] md:text-6xl lg:text-7xl">
            <HighlightedSentence text={SITE_COPY.kr.landing.heroTitle} highlights={[SITE_COPY.hero.titleHighlight]} />
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base text-[var(--muted)] md:text-lg leading-relaxed">
            <HighlightedSentence text={SITE_COPY.hero.description} highlights={["테스트 도구", "스펙 가이드", "Finder"]} />
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

      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 flex items-end justify-between border-b border-[var(--border)] pb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--primary)] md:text-3xl">설치 없이 쓰는 테스트 도구</h2>
            <p className="text-sm text-[var(--muted)]">장비의 의심 증상과 설정 상태를 참고용으로 확인해보세요.</p>
          </div>
          <Link href="/kr/tests" className="group hidden sm:flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-widest transition-colors">
            전체 보기 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
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
      <section className="container mx-auto px-4 py-16 bg-[var(--secondary)]/30 rounded-[3rem] border border-[var(--border)]">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">구매 전 확인하는 스펙 정리</h2>
          <p className="text-sm text-[var(--muted)]">광고 문구보다 실제로 확인해야 할 기준을 초보자 눈높이로 정리했습니다.</p>
        </div>
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
        <div className="mt-8 text-center">
          <Link href="/kr/guides" className="text-sm font-bold text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
            모든 가이드 읽어보기 →
          </Link>
        </div>
      </section>

      {/* Equipment Finders */}
      <section className="container mx-auto my-10 px-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[var(--primary)] md:text-xl">새 장비를 고를 때 Finder로 후보를 좁혀보세요</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">테스트만 필요하다면 위 도구를 바로 쓰고, 구매 전 비교가 필요할 때 열어보세요.</p>
          </div>
          <span className="w-fit rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Optional
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Link href="/kr/finder/mouse-fit" className="group rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all hover:border-[var(--accent)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--background)]">
                <MousePointer2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[var(--primary)]">마우스 찾기</h3>
                <p className="mt-0.5 text-xs text-[var(--muted)]">손 크기, 형태, 무게, 연결 방식으로 후보를 좁힙니다.</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/kr/finder/keyboard-fit" className="group rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all hover:border-[var(--accent)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--background)]">
                <Keyboard className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[var(--primary)]">키보드 찾기</h3>
                <p className="mt-0.5 text-xs text-[var(--muted)]">배열, 키감, 소음, 연결 조건으로 후보를 좁힙니다.</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
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
