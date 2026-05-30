import { Metadata } from "next";
import { CpsTest } from "@/components/tests/CpsTest";
import { DisclaimerBox } from "@/components/common/Common";

export const metadata: Metadata = {
  title: "마우스 클릭 속도 측정 (CPS) | SetupRadar",
  description: "초당 클릭 횟수(CPS)를 브라우저에서 참고용으로 측정하고 내 기록을 확인하세요.",
};

export default function CpsPage() {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">CPS 테스트</h1>
        <p className="mx-auto max-w-lg text-[var(--muted)]">
          초당 클릭 횟수(Clicks Per Second)를 측정합니다.
          모드(시간)를 선택한 뒤 화면을 연사로 클릭하여 자신의 실력을 확인해보세요.
        </p>
      </div>

      <div className="mb-12">
        <CpsTest />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/50 p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-[var(--primary)]">클릭 등급 가이드</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span className="text-sm font-bold text-[var(--muted)]">거북이</span>
              <span className="text-sm font-bold text-[var(--muted)] opacity-60">0 ~ 5 CPS</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span className="text-sm font-bold text-[var(--primary)]">인간</span>
              <span className="text-sm font-bold text-[var(--muted)] opacity-60">6 ~ 9 CPS</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span className="text-sm font-bold text-[var(--accent)]">프로게이머</span>
              <span className="text-sm font-bold text-[var(--muted)] opacity-60">10 ~ 13 CPS</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span className="text-sm font-bold text-red-600">치타</span>
              <span className="text-sm font-bold text-[var(--muted)] opacity-60">14+ CPS</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/50 p-6 md:p-8 text-sm text-[var(--muted)] leading-relaxed">
            내 기록은 현재 사용 중인 기기의 브라우저(LocalStorage)에만 저장됩니다. 서버로 전송되거나 공유되지 않습니다.
          </div>
          <DisclaimerBox className="bg-[var(--secondary)]/30 border-[var(--border)]" />
        </div>
      </div>
    </div>
  );
}
