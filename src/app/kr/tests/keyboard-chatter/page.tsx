import { Metadata } from "next";
import { KeyboardChatterTest } from "@/components/tests/KeyboardChatterTest";
import { DisclaimerBox } from "@/components/common/Common";

export const metadata: Metadata = {
  title: "키보드 채터링 테스트 | SetupRadar",
  description: "키보드 스위치 중복 입력 의심 증상을 참고용으로 확인합니다.",
};

export default function KeyboardChatterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">키보드 채터링 테스트</h1>
        <p className="mx-auto max-w-lg text-[var(--muted)]">
          키를 한 번 눌렀는데 짧은 간격으로 중복 입력되는 증상이 반복되는지 참고용으로 확인합니다.
        </p>
      </div>
      <div className="mb-10">
        <KeyboardChatterTest />
      </div>
      <DisclaimerBox className="bg-[var(--secondary)]/30 border-[var(--border)]" />
    </div>
  );
}
