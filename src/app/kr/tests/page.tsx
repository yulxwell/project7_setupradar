import type { Metadata } from "next";
import { Monitor, MousePointer2, Zap, Mouse, Keyboard } from "lucide-react";
import { TestCard } from "@/components/cards/Cards";
import { TEST_TOOLS } from "@/content/kr/tools";

export const metadata: Metadata = {
  title: "하드웨어 테스트 도구",
  description: "모니터, 마우스, 키보드 상태를 브라우저에서 설치 없이 참고용으로 확인하는 테스트 도구 모음입니다.",
  alternates: {
    canonical: "/kr/tests",
  },
};

const ICON_MAP = {
  Monitor,
  MousePointer2,
  Zap,
  Mouse,
  Keyboard,
};

const TEST_CATEGORIES = [
  {
    id: "monitor",
    label: "모니터",
    description: "화면 결함, 빛샘, 주사율, 명암 체감을 참고용으로 확인합니다.",
  },
  {
    id: "mouse",
    label: "마우스",
    description: "클릭, 휠, 트래킹, 폴링레이트를 브라우저에서 가볍게 확인합니다.",
  },
  {
    id: "keyboard",
    label: "키보드",
    description: "동시입력과 중복 입력 의심 증상을 참고용으로 확인합니다.",
  },
] as const;

export default function TestsPage() {
  return (
    <div className="mx-auto max-w-6xl py-16 px-4 md:py-28">
      <div className="relative mb-16 overflow-hidden rounded-3xl bg-[var(--secondary)]/50 px-8 py-12 text-center md:px-12 md:py-16 border border-[var(--border)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--background)]">
          <Monitor className="h-6 w-6" />
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">하드웨어 진단 도구</h1>
        <p className="mx-auto max-w-xl text-[var(--muted)] md:text-lg">
          모니터, 마우스, 키보드 상태를 브라우저에서 바로 확인하세요. <br className="hidden md:block" />
          설치 없이 참고용으로 빠르게 점검할 수 있습니다.
        </p>
      </div>

      <div className="space-y-12">
        {TEST_CATEGORIES.map((category) => {
          const tools = TEST_TOOLS.filter((tool) => tool.category === category.id);
          if (tools.length === 0) return null;

          return (
            <section key={category.id}>
              <div className="mb-4 flex flex-col gap-1 border-l-4 border-[var(--accent)] pl-4">
                <h2 className="text-xl font-bold text-[var(--primary)]">{category.label}</h2>
                <p className="max-w-2xl text-sm text-[var(--muted)]">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <TestCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                    icon={ICON_MAP[tool.iconName as keyof typeof ICON_MAP] || Monitor}
                    duration={tool.duration}
                    purpose={tool.purpose}
                    caution={tool.caution}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-20 rounded-3xl bg-[var(--secondary)]/30 p-10 text-center border border-[var(--border)]">
        <h2 className="mb-2 text-lg font-bold text-[var(--primary)]">추가 테스트 준비 중</h2>
        <p className="text-sm text-[var(--muted)]">
          모니터 잔상, 키보드 입력 지연처럼 초보자가 바로 확인하기 좋은 항목을 검토하고 있습니다.
        </p>
      </div>
    </div>
  );
}
