import { Metadata } from "next";
import { MouseWheelEncoderTest } from "@/components/tests/MouseWheelEncoderTest";
import { DisclaimerBox } from "@/components/common/Common";

export const metadata: Metadata = {
  title: "마우스 휠 튕김 테스트 | SetupRadar",
  description: "마우스 휠이 반대 방향으로 튀는 의심 입력이 반복되는지 브라우저에서 확인합니다.",
};

export default function MouseWheelEncoderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">마우스 휠 튕김 테스트</h1>
        <p className="mx-auto max-w-lg text-[var(--muted)]">
          휠을 굴릴 때 의도와 반대 방향 입력이 반복되는지 참고용으로 확인합니다.
        </p>
      </div>
      <div className="mb-10">
        <MouseWheelEncoderTest />
      </div>
      <DisclaimerBox className="bg-[var(--secondary)]/30 border-[var(--border)]" />
    </div>
  );
}
