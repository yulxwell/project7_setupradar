import type { Metadata } from "next";
import { Mouse, Keyboard, Zap, ShieldCheck, Moon } from "lucide-react";
import { GuideCard } from "@/components/cards/Cards";
import { GUIDE_CATEGORIES, GUIDES_DATABASE } from "@/content/kr/guides";
import { getContentDisplay } from "@/content/utils";

export const metadata: Metadata = {
  title: "하드웨어 구매 가이드",
  description: "마우스, 키보드, 모니터 구매 전 확인할 스펙과 광고 문구보다 먼저 볼 기준을 초보자 눈높이로 정리합니다.",
  alternates: {
    canonical: "/kr/guides",
  },
};

const ICON_MAP = {
  Mouse,
  Keyboard,
  Zap,
  ShieldCheck,
  Moon,
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl py-16 px-4 md:py-24">
      <div className="mb-16 text-left border-b border-[var(--border)] pb-8">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">하드웨어 구매 가이드</h1>
        <p className="max-w-lg text-[var(--muted)]">
          광고 문구 대신 실제 구매 시 확인해야 할 체크리스트와 핵심 정보를 정리했습니다.
        </p>
      </div>

      <div className="space-y-12">
        {GUIDE_CATEGORIES.map((category) => {
          const categoryGuides = GUIDES_DATABASE.filter((guide) => guide.category === category.id);
          if (categoryGuides.length === 0) return null;

          return (
            <section key={category.id}>
              <div className="mb-4 flex flex-col gap-1 border-l-4 border-[var(--accent)] pl-4">
                <h2 className="text-xl font-bold text-[var(--primary)]">{category.label}</h2>
                <p className="max-w-2xl text-sm text-[var(--muted)]">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryGuides.map((guide) => {
                  const display = getContentDisplay(guide);
                  return (
                    <GuideCard
                      key={guide.id}
                      title={guide.name}
                      description={display.summary}
                      href={guide.href}
                      icon={ICON_MAP[guide.iconName as keyof typeof ICON_MAP] || Zap}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-20 flex flex-col items-center justify-center p-12 text-center border border-[var(--border)] rounded-3xl bg-[var(--secondary)]/30">
        <h3 className="text-lg font-bold text-[var(--primary)] mb-2">장비 추천 기능 준비 중</h3>
        <p className="text-sm text-[var(--muted)] max-w-sm">
          단순 정보 제공을 넘어, 사용자 데이터 기반 맞춤형 제품 매칭 시스템을 준비하고 있습니다.
        </p>
      </div>
    </div>
  );
}
