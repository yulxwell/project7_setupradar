import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Info, MousePointerClick } from "lucide-react";

export const metadata: Metadata = {
  title: "이용 안내",
  description: "SetupRadar 테스트 도구, Finder, 구매 가이드 이용 시 참고할 기준과 확인 사항을 안내합니다.",
  alternates: {
    canonical: "/kr/terms",
  },
};

const sections = [
  {
    title: "서비스 성격",
    body: [
      "SetupRadar는 하드웨어 테스트 도구, 구매 전 가이드, Finder를 통해 장비 상태와 구매 후보를 가볍게 확인하는 사이트입니다.",
      "사이트의 정보는 참고용이며, 제품 선택이나 교환 판단은 사용 환경과 판매처 기준을 함께 확인한 뒤 진행하는 것을 권장합니다.",
    ],
  },
  {
    title: "테스트 도구 이용",
    body: [
      "브라우저 기반 테스트는 기기, 운영체제, 브라우저, 모니터 설정, 주변 환경에 따라 결과가 달라질 수 있습니다.",
      "의심 증상을 확인하는 용도로 활용하고, 교환이나 수리 판단 전에는 제조사 또는 판매처 안내도 함께 확인해 주세요.",
    ],
  },
  {
    title: "Finder와 제품 정보",
    body: [
      "Finder는 정답을 정해주는 기능이 아니라, 사용자가 구매 전 비교할 후보를 좁히는 도구입니다.",
      "가격, 구성품, 스펙, AS 조건은 판매처와 제조사 기준으로 바뀔 수 있으므로 구매 전 직접 확인해 주세요.",
    ],
  },
  {
    title: "콘텐츠 변경",
    body: [
      "테스트 항목, 가이드, 제품 정보는 더 나은 이해를 위해 수정되거나 보강될 수 있습니다.",
      "잘못된 정보나 보강 제안은 문의 페이지의 이메일로 전달할 수 있으며, 답변이 늦어질 수 있습니다.",
      "새로운 기능이나 광고·제휴 구조가 추가되면 관련 안내 페이지에 기준을 함께 기록합니다.",
    ],
  },
];

export default function TermsPage() {
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
          <FileText className="h-6 w-6" />
        </div>
        <p className="mb-3 text-sm font-bold text-[var(--accent)]">서비스 안내</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">이용 안내</h1>
        <p className="max-w-2xl text-[var(--muted)] md:text-lg">
          SetupRadar의 테스트와 Finder는 구매 전 확인을 돕기 위한 참고 도구입니다. 결과를 볼 때 함께 확인하면
          좋은 기준을 정리했습니다.
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
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>테스트 결과는 환경에 따라 달라질 수 있으므로 구매·교환 전 참고 자료로 활용해 주세요.</p>
        </div>
        <div className="flex gap-3">
          <MousePointerClick className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>Finder 결과는 후보 비교를 돕는 기준이며, 개인의 손 크기와 사용 습관에 따라 체감이 다를 수 있습니다.</p>
        </div>
      </section>

      <p className="mt-8 text-xs font-medium text-[var(--muted)]">마지막 업데이트: 2026-06-03</p>
    </main>
  );
}
