import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { SpecGuide } from "@/components/guides/SpecGuide";

export const metadata: Metadata = {
  title: "모니터 구매 전 체크리스트",
  description:
    "크기, 해상도, 주사율, 패널 종류, 응답속도 문구, 불량화소 정책과 포트까지 모니터 구매 전 확인할 기준을 정리합니다.",
  alternates: {
    canonical: "/kr/guides/monitor-buying-checklist",
  },
};

export default function MonitorBuyingChecklistGuide() {
  return (
    <SpecGuide
      title="모니터 구매 전 체크리스트"
      category="Checklist"
      icon={ShieldCheck}
      oneLineMeaning="모니터는 크기, 해상도, 주사율, 패널 종류가 내 책상 거리와 사용 목적에 맞는지 먼저 보는 것이 좋습니다."
      whatToCheckFirst="책상 깊이와 눈에서 화면까지의 거리를 먼저 재고, 사무/게임/영상/콘솔 중 가장 자주 쓰는 목적을 정해 보세요. 같은 스펙이라도 조명, 시청 거리, PC 성능, 연결 포트에 따라 체감이 달라질 수 있습니다."
      pros={[
        "크기, 해상도, 주사율을 사용 목적과 PC 성능 기준으로 함께 비교할 수 있습니다.",
        "IPS, VA, OLED의 차이를 색감, 명암, 잔상, 장시간 사용 환경 기준으로 나눠 볼 수 있습니다.",
        "GtG, MPRT, 응답속도 같은 광고 문구를 실제 설정과 체감 기준으로 더 차분하게 볼 수 있습니다.",
        "불량화소, 빛샘, IPS Glow, 무결점 정책처럼 구매 후 바로 확인해야 할 항목을 미리 준비할 수 있습니다.",
      ]}
      cons={[
        "체감 밝기와 명암은 방 조명, 화면 각도, 콘텐츠 종류에 따라 달라질 수 있습니다.",
        "고해상도와 고주사율은 PC나 콘솔 출력 성능이 따라와야 의미가 커집니다.",
        "어두운 화면의 빛샘이나 IPS Glow는 스펙표만으로 비교하기 어렵고 제품 편차도 있을 수 있습니다.",
        "HDR, 명암비, 응답속도 표기는 측정 조건이 달라 실제 사용감과 차이가 날 수 있습니다.",
      ]}
      prePurchaseCheck={[
        "24~27인치는 일반 책상에서 다루기 쉬운 편이고, 32인치 이상은 책상 깊이와 시청 거리를 먼저 확인하세요.",
        "FHD, QHD, 4K는 화면 크기와 글자 크기 체감이 함께 달라지므로 사무, 게임, 영상 작업 중 주 용도를 기준으로 고르세요.",
        "고주사율은 게임에서 체감이 클 수 있지만, 그래픽카드나 콘솔이 해당 해상도와 주사율을 안정적으로 출력할 수 있는지도 함께 보세요.",
        "IPS는 시야각과 색 표현, VA는 명암, OLED는 빠른 응답과 블랙 표현이 장점으로 언급되는 편이지만 사용 환경에 따라 체감이 달라집니다.",
        "GtG와 MPRT는 측정 방식이 다릅니다. 1ms 문구만 보기보다 오버드라이브 단계별 잔상과 역잔상 후기를 함께 확인하세요.",
        "밝기, HDR, 명암비는 방 조명과 콘텐츠 종류에 따라 인상이 달라질 수 있어 숫자만으로 체감을 예측하기 어렵습니다.",
        "불량화소, 빛샘, IPS Glow, 무결점 정책은 판매처와 제조사 기준이 다를 수 있으니 교환 조건과 확인 기간을 구매 전 확인하세요.",
        "HDMI, DP, USB-C, KVM, 스피커, VESA 홀, 스탠드 높낮이 조절처럼 책상 구성에 필요한 포트를 빠뜨리지 않았는지 살피세요.",
        "제품 수령 후에는 밝은 화면, 어두운 화면, 단색 화면, 주사율 설정, 케이블 연결 상태 순서로 확인하고 SetupRadar 테스트 도구를 참고용으로 활용해 보세요.",
      ]}
      relatedTest={{
        name: "모니터 불량화소 테스트",
        href: "/kr/tests/dead-pixel",
      }}
    />
  );
}
