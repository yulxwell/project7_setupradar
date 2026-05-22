import { Metadata } from "next";
import { RefreshRateGhostingTest } from "@/components/tests/RefreshRateGhostingTest";
import { DisclaimerBox } from "@/components/common/Common";

export const metadata: Metadata = {
  title: "주사율 및 잔상 테스트 | SetupRadar",
  description: "브라우저에서 모니터 주사율 설정과 움직임 잔상 체감을 참고용으로 확인합니다.",
};

export default function RefreshRateGhostingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">주사율 및 잔상 테스트</h1>
        <p className="mx-auto max-w-lg text-[var(--muted)]">
          움직이는 물체를 보며 주사율 설정과 잔상 체감을 눈으로 확인합니다. 정밀 측정값이 아니라 참고용으로 보세요.
        </p>
      </div>
      <div className="mb-10">
        <RefreshRateGhostingTest />
      </div>
      <DisclaimerBox className="bg-[var(--secondary)]/30 border-[var(--border)]" />
    </div>
  );
}
