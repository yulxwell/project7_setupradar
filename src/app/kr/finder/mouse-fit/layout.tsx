export const metadata = {
  title: "마우스 찾기",
  description: "손 크기, 형태, 무게, 연결 방식을 기준으로 참고용 마우스 후보를 빠르게 확인합니다.",
  alternates: {
    canonical: "/kr/finder/mouse-fit",
  },
};

export default function MouseFitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
