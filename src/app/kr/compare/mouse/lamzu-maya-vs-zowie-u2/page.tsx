import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GitCompare, MousePointer2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Lamzu Maya vs Zowie U2 비교 | SetupRadar",
  description: "두 무선 마우스의 쉘, 무게, 연결 방식, 손 크기, 구매 전 체크 포인트를 초보자 기준으로 비교합니다.",
  alternates: {
    canonical: "/kr/compare/mouse/lamzu-maya-vs-zowie-u2",
  },
};

const productSummaries = [
  {
    name: "Lamzu Maya",
    label: "초경량 무선 대칭형",
    specs: ["약 45g", "119 x 62 x 38mm", "PAW3395", "무선"],
    description:
      "40g대 초경량 무게를 앞세운 대칭형 무선 마우스입니다. 가벼운 체감과 민첩한 조작을 선호하는 사용자에게 참고할 수 있습니다.",
    cautions: "고폴링레이트 수신기 기본 동봉 여부와 세부 구성은 판매처와 유통 버전 기준으로 확인이 필요합니다.",
  },
  {
    name: "Zowie U2",
    label: "e스포츠 지향 대칭형",
    specs: ["약 60g", "124 x 65 x 38mm", "1000Hz", "무선"],
    description:
      "대칭형 쉘과 안정적인 무선 연결에 집중한 e스포츠 지향 무선 마우스입니다. 안정적인 그립과 단순한 설정 흐름을 선호할 때 참고할 수 있습니다.",
    cautions: "고폴링레이트 구성, 리시버 구성, 세부 스펙 표기는 판매처와 모델 기준으로 다시 확인하는 편이 좋습니다.",
  },
] as const;

const comparisonRows = [
  {
    label: "형태",
    maya: "대칭형 쉘입니다. 좌우 움직임과 빠른 방향 전환을 가볍게 가져가고 싶은 사용자에게 맞을 수 있습니다.",
    u2: "대칭형 쉘입니다. Zowie 특유의 단순한 사용 흐름과 안정적인 잡는 느낌을 보고 싶을 때 참고할 수 있습니다.",
  },
  {
    label: "손 크기 체감",
    maya: "119mm 길이와 62mm 폭으로, 중간 손 크기 기준에서 작은 쪽 체감이 필요한지 함께 봐야 합니다.",
    u2: "124mm 길이와 65mm 폭으로, Maya보다 조금 더 넓고 긴 느낌을 기대할 수 있습니다.",
  },
  {
    label: "무게 체감",
    maya: "약 45g 수준이라 손목 부담을 줄이고 빠르게 움직이고 싶은 경우에 참고할 수 있습니다.",
    u2: "약 60g 수준이라 초경량보다 약간 더 안정적인 움직임을 선호할 때 비교해 볼 수 있습니다.",
  },
  {
    label: "연결 방식",
    maya: "무선 제품이며, 고폴링레이트 수신기 구성은 판매처와 패키지 기준 확인이 필요합니다.",
    u2: "무선 제품이며, 전용 수신기와 고폴링레이트 구성은 모델과 판매처 기준으로 확인해야 합니다.",
  },
  {
    label: "게임/FPS 사용",
    maya: "가벼운 무게와 민첩한 조작을 우선할 때 후보가 될 수 있습니다. PC 환경과 감도 설정도 함께 봐야 합니다.",
    u2: "안정적인 그립과 간단한 설정 흐름을 선호하는 FPS 사용자에게 후보가 될 수 있습니다.",
  },
  {
    label: "사무/일상 사용",
    maya: "가벼운 조작감이 편할 수 있지만, 너무 가벼운 움직임이 문서 작업에서 낯설 수 있습니다.",
    u2: "무게감이 조금 더 있는 편이라 일상 사용에서 안정적으로 느껴질 수 있지만, 손 크기에 따라 다릅니다.",
  },
  {
    label: "소프트웨어/설정",
    maya: "세부 설정과 동글 구성 확인이 필요한 쪽입니다. 구매 전 구성품과 설정 방식을 같이 살펴보세요.",
    u2: "별도 소프트웨어보다 단순한 설정 흐름을 선호하는 사용자에게 참고할 수 있습니다.",
  },
  {
    label: "배터리/충전",
    maya: "내장 배터리 기반으로 볼 수 있으며, 고폴링레이트 사용 시 배터리 체감이 달라질 수 있습니다.",
    u2: "내장 배터리 기반으로 볼 수 있으며, 리시버 구성과 충전 방식은 판매처 기준으로 확인하세요.",
  },
  {
    label: "AS/국내 구매 확인",
    maya: "국내 정식 유통, 구성품, AS 접수 기준을 구매 전 확인하는 편이 좋습니다.",
    u2: "국내 구매 접근성과 AS 조건, 리시버 구성 차이를 판매처 기준으로 확인하는 편이 좋습니다.",
  },
  {
    label: "구매 전 주의점",
    maya: "초경량 쉘 체감, 코팅, 고폴링레이트 동글 포함 여부를 함께 봐야 합니다.",
    u2: "쉘 폭, 클릭감, 폴링레이트 기대치, 리시버 구성을 함께 확인해야 합니다.",
  },
] as const;

const mayaChecks = [
  "아주 가벼운 무선 마우스를 선호한다.",
  "손에 부담이 적은 가벼운 조작감을 원한다.",
  "고폴링레이트 옵션이나 동글 구성 확인을 감수할 수 있다.",
] as const;

const u2Checks = [
  "대칭형이지만 안정적인 그립감을 원한다.",
  "별도 소프트웨어보다 단순한 설정 흐름을 선호한다.",
  "e스포츠 지향 브랜드의 그립과 설정 철학을 선호한다.",
] as const;

const buyingChecklist = [
  "내 손 크기와 기존 마우스의 길이, 너비, 높이를 비교합니다.",
  "마우스를 자주 들어 올리는지, 손목 중심인지 팔 중심인지 확인합니다.",
  "클릭압, 휠 구분감, 사이드 버튼 위치 선호를 확인합니다.",
  "무선 리시버와 동글 구성, 기본 동봉 여부를 확인합니다.",
  "AS 접수 방식과 교환 조건을 판매처와 제조사 기준으로 확인합니다.",
  "4K/8K 폴링 사용 시 배터리와 PC 환경, 모니터 주사율을 함께 봅니다.",
  "코팅과 그립감 후기가 내 사용 환경과 맞는지 확인합니다.",
  "실제 구성품과 패키지 차이는 판매처 기준으로 확인합니다.",
] as const;

const relatedLinks = [
  { href: "/kr/compare/mouse", label: "다른 마우스도 직접 비교하기" },
  { href: "/kr/finder/mouse-fit", label: "마우스 Finder" },
  { href: "/kr/guides/mouse-buying-checklist", label: "마우스 구매 전 체크리스트" },
  { href: "/kr/guides/mouse-shape-symmetrical-vs-ergonomic", label: "대칭형 vs 오른손용 비대칭형" },
  { href: "/kr/guides/mouse-switch-double-click", label: "마우스 스위치와 더블클릭" },
  { href: "/kr/compare", label: "장비 비교 메인" },
] as const;

export default function LamzuMayaVsZowieU2Page() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-14 pb-10 md:pt-18 md:pb-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              <GitCompare className="h-3.5 w-3.5" />
              Mouse Compare
            </div>
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
              Lamzu Maya vs Zowie U2
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              초경량 대칭형 마우스와 안정적인 그립 기준을 구매 전 비교합니다.
            </p>
            <div className="mt-5 grid max-w-3xl gap-3 text-xs leading-relaxed text-[var(--muted)] md:grid-cols-2">
              <p className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                이 비교는 정답 추천이 아니라 구매 전 차이를 이해하기 위한 참고 자료입니다.
              </p>
              <p className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                실제 스펙, 구성품, AS 조건은 판매처/제조사 기준으로 다시 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-14">
        <div className="mb-7 border-b border-[var(--border)] pb-5">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">요약 비교</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            두 제품 모두 기존 Project7 마우스 데이터에 있는 제품이며, 새 스펙을 추가하지 않고 확인 가능한 정보만 사용했습니다.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {productSummaries.map((product) => (
            <article key={product.name} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--accent)]">
                  <MousePointer2 className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-[var(--border)] bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-bold text-[var(--accent)]">
                  {product.label}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[var(--primary)]">{product.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <span key={spec} className="rounded-full bg-[var(--secondary)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                    {spec}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{product.description}</p>
              <p className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/40 p-3 text-xs leading-relaxed text-[var(--muted)]">
                {product.cautions}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-7 border-b border-[var(--border)] pb-5">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">비교 테이블</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            수치 하나로 우열을 정하기보다 손 크기, 잡는 방식, 설정 선호, 구성품 확인 여부를 함께 보세요.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="grid grid-cols-1 border-b border-[var(--border)] bg-[var(--secondary)]/40 text-sm font-bold text-[var(--primary)] md:grid-cols-[160px_1fr_1fr]">
            <div className="p-4">항목</div>
            <div className="border-t border-[var(--border)] p-4 md:border-t-0 md:border-l">Lamzu Maya</div>
            <div className="border-t border-[var(--border)] p-4 md:border-t-0 md:border-l">Zowie U2</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 border-b border-[var(--border)] last:border-b-0 md:grid-cols-[160px_1fr_1fr]">
              <div className="bg-[var(--secondary)]/20 p-4 text-sm font-bold text-[var(--primary)]">{row.label}</div>
              <div className="border-t border-[var(--border)] p-4 text-sm leading-relaxed text-[var(--muted)] md:border-t-0 md:border-l">
                {row.maya}
              </div>
              <div className="border-t border-[var(--border)] p-4 text-sm leading-relaxed text-[var(--muted)] md:border-t-0 md:border-l">
                {row.u2}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">어떤 쪽을 먼저 보면 좋을까?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h3 className="text-base font-bold text-[var(--primary)]">Lamzu Maya를 먼저 볼 수 있는 경우</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                {mayaChecks.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h3 className="text-base font-bold text-[var(--primary)]">Zowie U2를 먼저 볼 수 있는 경우</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                {u2Checks.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-7 flex items-center gap-2 border-b border-[var(--border)] pb-5">
          <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
          <h2 className="text-xl font-bold text-[var(--primary)] md:text-2xl">구매 전 체크리스트</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {buyingChecklist.map((item) => (
            <div key={item} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm leading-relaxed text-[var(--muted)]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-lg font-bold text-[var(--primary)]">관련 링크</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-3 text-sm font-bold text-[var(--primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
