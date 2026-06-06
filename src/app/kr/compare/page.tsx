import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, Keyboard, Monitor, MousePointer2, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "장비 비교",
  description: "마우스, 키보드, 모니터, CPU, GPU를 구매 전 비교할 때 확인할 차이를 초보자 기준으로 정리하는 비교 허브입니다.",
  alternates: {
    canonical: "/kr/compare",
  },
};

const compareCategories = [
  {
    title: "마우스 비교",
    description: "손에 맞는 체감 차이를 보기 위해 쉘과 무게, 연결 방식, 클릭감, AS 조건을 함께 확인합니다.",
    points: ["쉘 형태", "무게", "연결 방식", "클릭감", "AS 조건"],
    icon: MousePointer2,
    example: "Lamzu Maya vs Zowie U2",
    href: "/kr/compare/mouse/lamzu-maya-vs-zowie-u2",
    status: "mock 공개",
  },
  {
    title: "키보드 비교",
    description: "배열과 스위치만 보지 않고 소음, 연결 방식, 핫스왑, OS 호환성까지 같이 살펴봅니다.",
    points: ["배열", "스위치", "소음", "핫스왑", "OS 호환성"],
    icon: Keyboard,
  },
  {
    title: "모니터 비교",
    description: "크기와 해상도, 주사율, 패널, 응답속도 표기, 불량화소와 AS 조건을 구매 전 기준으로 봅니다.",
    points: ["크기", "해상도", "주사율", "패널", "AS 조건"],
    icon: Monitor,
  },
  {
    title: "CPU 비교",
    description: "벤치마크 숫자만 보기보다 출시년도, 소켓, 메인보드, 메모리, 전력과 발열 부담을 함께 해석합니다.",
    points: ["출시년도", "소켓", "DDR4/DDR5", "전력/발열", "GPU 조합 기준"],
    icon: Cpu,
  },
  {
    title: "GPU 비교",
    description: "세대, VRAM, 전력, 해상도 목표, 업스케일링, 권장 파워와 케이스 호환성을 같이 확인합니다.",
    points: ["세대", "VRAM", "전력", "해상도 목표", "케이스 호환성"],
    icon: Sparkles,
  },
] as const;

export default function ComparePage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-14 pb-10 md:pt-18 md:pb-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              SetupRadar Compare
            </div>
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">장비 비교</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              스펙 숫자만 나열하기보다, 초보자가 구매 전 이해해야 할 차이를 정리합니다.
            </p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--muted)] md:text-sm">
              실제 가격과 세부 스펙은 판매처/제조사 기준으로 확인해야 합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="mb-8 flex flex-col gap-3 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold tracking-tight text-[var(--primary)] md:text-2xl">비교 카테고리</h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              현재는 마우스 비교 상세 1개를 먼저 열고, 나머지 카테고리는 기준과 방향만 보여주는 mock 단계입니다.
            </p>
          </div>
          <span className="w-fit rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            mock 1
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {compareCategories.map((category) => {
            const Icon = category.icon;
            const cardContent = (
              <>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-bold text-[var(--muted)]">
                    {"status" in category ? category.status : "설계 중"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--primary)]">{category.title}</h3>
                {"example" in category ? (
                  <p className="mt-2 text-xs font-bold text-[var(--accent)]">{category.example}</p>
                ) : null}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{category.description}</p>
                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">비교할 기준</p>
                  <div className="flex flex-wrap gap-2">
                    {category.points.map((point) => (
                      <span key={point} className="rounded-full bg-[var(--secondary)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                        {point}
                      </span>
                    ))}
                  </div>
                  {"href" in category ? (
                    <span className="mt-5 inline-flex text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                      비교 보기
                    </span>
                  ) : null}
                </div>
              </>
            );

            if ("href" in category) {
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group flex min-h-[300px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-sm"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <article key={category.title} className="flex min-h-[300px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                {cardContent}
              </article>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-[var(--accent)]">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="text-lg font-bold text-[var(--primary)]">비교 콘텐츠 안내</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm leading-relaxed text-[var(--muted)] md:grid-cols-3">
            <p>비교 콘텐츠는 정답을 고르는 기능이 아니라 구매 전 차이를 이해하기 위한 참고 자료입니다.</p>
            <p>벤치마크 수치는 측정 환경에 따라 달라질 수 있어, 수치보다 사용 목적과 조건을 함께 봐야 합니다.</p>
            <p>호환성은 메인보드, BIOS, 메모리, 케이스, 파워 조건에 따라 달라질 수 있습니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
