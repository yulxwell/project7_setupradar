import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, Cookie, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "SetupRadar의 개인정보 처리, 방문 분석, 브라우저 저장 정보, 향후 광고·제휴 가능성을 안내합니다.",
  alternates: {
    canonical: "/kr/privacy",
  },
};

const sections = [
  {
    title: "현재 직접 입력받지 않는 정보",
    body: [
      "SetupRadar는 현재 회원가입, 로그인, 결제, 댓글, 문의 폼을 운영하지 않습니다.",
      "이름, 이메일, 전화번호처럼 사용자가 직접 입력하는 개인정보를 공개 사이트에서 별도로 받지 않습니다.",
      "다만 사용자가 문의 이메일로 직접 내용을 보내는 경우, 답변을 위해 이메일 주소와 문의 내용이 확인될 수 있습니다.",
    ],
  },
  {
    title: "방문 분석",
    body: [
      "서비스 품질을 확인하기 위해 Google Analytics 같은 방문 분석 도구를 사용할 수 있습니다.",
      "방문 페이지, 기기와 브라우저 종류, 대략적인 이용 흐름 같은 비식별 통계가 처리될 수 있으며, 실제 처리 기준은 Google의 정책을 따릅니다.",
    ],
  },
  {
    title: "쿠키와 브라우저 저장 정보",
    body: [
      "브라우저 설정, 분석 도구, 화면 표시를 위해 쿠키 또는 브라우저 저장 정보가 사용될 수 있습니다.",
      "현재 공개 사이트는 서버 계정이나 결제 정보를 저장하는 구조가 아닙니다.",
    ],
  },
  {
    title: "광고와 제휴 가능성",
    body: [
      "향후 사이트 운영을 위해 광고 또는 제휴 링크가 포함될 수 있습니다.",
      "광고나 제휴 링크가 적용되면 관련 고지와 처리 기준을 이 페이지 또는 광고·제휴 고지 페이지에 함께 보강합니다.",
    ],
  },
  {
    title: "문의",
    body: [
      "문의는 /kr/contact 페이지에 안내된 이메일로 보낼 수 있습니다.",
      "이메일로 받은 내용은 답변과 사이트 운영 개선을 위한 참고 목적으로만 사용합니다.",
      "제품 구매, AS, 교환 조건은 판매처 또는 제조사 기준을 함께 확인해 주세요.",
    ],
  },
];

export default function PrivacyPage() {
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
          <ShieldCheck className="h-6 w-6" />
        </div>
        <p className="mb-3 text-sm font-bold text-[var(--accent)]">운영 안내</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          개인정보처리방침
        </h1>
        <p className="max-w-2xl text-[var(--muted)] md:text-lg">
          SetupRadar는 설치 없이 하드웨어 상태와 구매 전 체크 기준을 확인하는 사이트입니다. 현재 공개 사이트에서
          입력 폼으로 받는 개인정보는 없지만, 방문 분석과 문의 이메일 처리 기준, 향후 광고·제휴 가능성을 투명하게
          안내합니다.
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
          <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>방문 분석은 사이트 개선을 위한 참고 지표로 사용합니다.</p>
        </div>
        <div className="flex gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>브라우저 저장 정보는 화면 표시와 분석 도구 동작에 사용될 수 있습니다.</p>
        </div>
      </section>

      <p className="mt-8 text-xs font-medium text-[var(--muted)]">마지막 업데이트: 2026-06-03</p>
    </main>
  );
}
