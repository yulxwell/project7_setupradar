import type { Metadata } from "next";
import { Monitor, MousePointer2, Zap, Mouse, Keyboard } from "lucide-react";
import { TestCard } from "@/components/cards/Cards";
import { PageHero } from "@/components/sections/PageHero";
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
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      <PageHero
        eyebrow="Test Tools"
        title="하드웨어 테스트 도구"
        icon={Monitor}
        description={
          <>
            모니터, 마우스, 키보드의 의심 증상을 브라우저에서 가볍게 확인하세요. <br className="hidden md:block" />
            결과는 사용 환경에 따라 달라질 수 있는 참고용입니다.
          </>
        }
      />

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
        <h2 className="mb-2 text-lg font-bold text-[var(--primary)]">테스트 항목은 신중하게 추가합니다</h2>
        <p className="text-sm text-[var(--muted)]">
          브라우저에서 의미 있게 확인할 수 있는 항목부터 우선순위에 맞춰 보강합니다.
        </p>
      </div>
    </div>
  );
}
