import { Metadata } from "next";
import { MouseTrackingTest } from "@/components/tests/MouseTrackingTest";
import { DisclaimerBox } from "@/components/common/Common";

export const metadata: Metadata = {
  title: "마우스 트래킹 테스트 | SetupRadar",
  description: "캔버스에 선을 그려 마우스 센서 튐, 스킵, 직선 보정 체감을 확인합니다.",
};

export default function MouseTrackingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">마우스 트래킹 테스트</h1>
        <p className="mx-auto max-w-lg text-[var(--muted)]">
          빈 캔버스에 선과 원을 그리며 포인터가 튀거나 끊기는 느낌이 있는지 참고용으로 확인합니다.
        </p>
      </div>
      <div className="mb-10">
        <MouseTrackingTest />
      </div>
      <DisclaimerBox className="bg-[var(--secondary)]/30 border-[var(--border)]" />
    </div>
  );
}
