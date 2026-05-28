import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "키보드 동시입력 테스트",
  description: "여러 키를 동시에 눌렀을 때 키보드가 몇 개까지 인식하는지 브라우저에서 참고용으로 확인합니다.",
  alternates: {
    canonical: "/kr/tests/keyboard-rollover",
  },
};

export default function KeyboardRolloverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
