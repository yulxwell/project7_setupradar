import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "문의 안내",
  description: "SetupRadar 이용 중 불편한 점, 잘못된 정보, 제품과 가이드 보강 제안을 보낼 수 있는 문의 채널입니다.",
  alternates: {
    canonical: "/kr/contact",
  },
};

const contactNotes = [
  "SetupRadar 이용 중 불편한 점, 잘못된 정보, 제품/가이드 보강 제안이 있다면 아래 이메일로 알려주세요.",
  "문의 내용은 확인 후 가능한 범위에서 답변드리며, 운영 상황에 따라 답변이 늦어질 수 있습니다.",
];

const guideNotes = [
  "제품 가격, 재고, AS, 교환 조건은 판매처 또는 제조사 기준으로 최종 확인해 주세요.",
  "테스트 도구 결과는 브라우저, 운영체제, 기기 설정에 따라 달라질 수 있습니다.",
  "SetupRadar는 고장이나 불량 여부를 단정하는 답변을 제공하지 않으며, 구매 전 참고 기준을 안내하는 데 집중합니다.",
];

export default function ContactPage() {
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
          <Mail className="h-6 w-6" />
        </div>
        <p className="mb-3 text-sm font-bold text-[var(--accent)]">Contact</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">문의 안내</h1>
        <p className="max-w-2xl text-[var(--muted)] md:text-lg">
          SetupRadar 이용 중 확인이 필요한 내용이나 보강 제안이 있다면 이메일로 알려주세요. 초보자도 구매 전
          참고할 수 있는 정보가 되도록 차분히 검토하겠습니다.
        </p>
      </section>

      <div className="grid gap-5">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
          <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">문의 이메일</h2>
          <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
            {contactNotes.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a
              href="mailto:yulxwell123@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-4 py-3 font-bold text-[var(--primary)] transition-colors hover:text-[var(--accent)]"
            >
              <Mail className="h-4 w-4" />
              yulxwell123@gmail.com
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
          <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">확인해 주세요</h2>
          <div className="space-y-2 text-sm leading-7 text-[var(--muted)]">
            {guideNotes.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/25 p-6 text-sm text-[var(--muted)] md:grid-cols-2">
        <div className="flex gap-3">
          <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>잘못된 정보나 설명이 부족한 부분은 운영 개선 참고 자료로 검토합니다.</p>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
          <p>구매, AS, 교환 판단은 판매처와 제조사 안내를 함께 확인해 주세요.</p>
        </div>
      </section>
    </main>
  );
}
