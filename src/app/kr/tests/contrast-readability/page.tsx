import { Metadata } from "next";
import { ContrastReadabilityTest } from "@/components/tests/ContrastReadabilityTest";
import { DisclaimerBox } from "@/components/common/Common";

export const metadata: Metadata = {
  title: "명암비 가독성 테스트 | SetupRadar",
  description: "검정과 흰색 단계 표현을 통해 모니터 명암과 가독성 체감을 참고용으로 확인합니다.",
};

export default function ContrastReadabilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[var(--primary)] md:text-5xl">명암비(가독성) 테스트</h1>
        <p className="mx-auto max-w-lg text-[var(--muted)]">
          검은색과 흰색의 단계 차이가 얼마나 구분되는지 확인합니다. 주변 조명과 모니터 설정에 따라 다르게 보일 수 있습니다.
        </p>
      </div>
      <div className="mb-10">
        <ContrastReadabilityTest />
      </div>
      <DisclaimerBox className="bg-[var(--secondary)]/30 border-[var(--border)]" />
    </div>
  );
}
