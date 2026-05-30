import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeInfo, Handshake, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "광고·제휴 고지",
  description: "SetupRadar의 광고와 제휴 링크 적용 가능성, 추천 기준, 향후 운영 원칙을 안내합니다.",
  alternates: {
    canonical: "/kr/disclosure",
  },
};

const sections = [
  {
    title: "현재 상태",
    body: [
      "현재 SetupRadar에는 실제 광고 코드, AdSense 코드, 제휴 구매 링크가 들어가 있지 않습니다.",
      "향후 운영 비용을 마련하기 위해 광고 또는 제휴 링크가 포함될 수 있습니다.",
    ],
  },
  {
    title: "광고와 제휴 링크",
    body: [
      "일부 링크를 통해 구매가 발생하면 운영자가 일정 수수료를 받을 수 있습니다.",
      "제휴 링크가 포함되더라도 사용자가 추가 비용을 부담하지 않는 구조를 우선 검토합니다.",
      "가격과 옵션은 판매처에 따라 달라질 수 있으므로 구매 전 직접 확인해 주세요.",
    ],
  },
  {
    title: "추천 기준",
    body: [
      "Finder 결과와 가이드의 기준은 광고나 제휴 여부가 아니라 구매 전 체크 기준과 데이터 품질을 우선합니다.",
      "제휴 링크가 있는 제품과 없는 제품이 추천 점수에 영향을 주지 않도록 운영 기준을 분리합니다.",
    ],
  },
  {
    title: "제품 링크 운영 원칙",
    body: [
      "검수 중인 제품에는 제휴 링크를 자동으로 노출하지 않습니다.",
      "향후 제품 링크를 붙이더라도 승인된 링크만 공개 후보로 다루고, 공식 스펙과 판매처 옵션 확인 용도를 우선합니다.",
    ],
  },
];

export default function DisclosurePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <Link
        href="/kr"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" />
        SetupRadar로 돌아가기
      </Link>

      <section className="mb-10 rounded-3xl border border-[var(--border)] bg-[var(--secondary)]/35 p-8 md:p-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--background)]">
          <Handshake className="h-6 w-6" />
        </div>
        <p className="mb-3 text-sm font-bold text-[var(--accent)]">운영 고지</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">광고·제휴 고지</h1>
        <p className="max-w-2xl text-[var(--muted)] md:text-lg">
          SetupRadar는 테스트 도구와 구매 전 체크 기준의 신뢰도를 먼저 지키는 방향으로 운영합니다. 광고나 제휴가
          추가되더라도 추천 기준과 분리해 안내합니다.
        </p>
      </section>

      <div className="grid gap-5">
        {sections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
            <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">{section.title}</h2>
            <div className="space-y-2 text-sm leading-7 text-[var(--muted)]">
              {section.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/25 p-6 text-sm text-[var(--muted)] md:grid-cols-2">
        <div className="flex gap-3">
          <BadgeInfo className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>광고 또는 제휴 링크가 들어가는 영역은 사용자가 알아볼 수 있게 표시하는 방향으로 운영합니다.</p>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>제품 선택 기준은 구매 전 확인할 항목과 데이터 품질을 우선합니다.</p>
        </div>
      </section>

      <p className="mt-8 text-xs font-medium text-[var(--muted)]">마지막 업데이트: 2026-05-30</p>
    </main>
  );
}
