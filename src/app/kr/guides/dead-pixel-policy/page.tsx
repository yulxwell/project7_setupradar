import { ShieldCheck } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function DeadPixelGuide() {
  return (
    <SpecGuide
      title="불량화소와 무결점 정책"
      category="Monitor"
      lastUpdated="2026-05-13"
      icon={ShieldCheck}
      oneLineMeaning="제조사가 보장하는 화면 결함의 개수와 위치에 따른 교환 기준입니다."
      whatToCheckFirst="제조사 홈페이지의 상세 보증 규정(휘점/암점 개수 기준)을 먼저 확인하세요. 모니터의 경우는 해상도 만큼의 점이 화면을 표현합니다. 4K 모니터의 경우 해상도는 3840x2160로 총 8,294,400개의 픽셀이 화면을 표현하고 그 중 불량 화소가 있을 시 작은 점이 색 표현을 잘 못 하게 될 것 입니다."
      pros={[
        "무결점 정책 제품은 불량 발생 시 1:1 교환이 용이함",
        "중고 거래 시 무결점 제품이 더 높은 가치를 인정받음",
        "초기 양품 검수 과정을 거쳐 배송되므로 안심할 수 있음"
      ]}
      cons={[
        "일반 모델 대비 약 1~3만 원 정도의 추가 비용 발생",
        "무결점임에도 특정 개수 미만의 암점은 불량으로 인정 안 될 수 있음",
        "보증 기간이 구입 후 7일~1개월로 짧은 경우가 많음"
      ]}
      prePurchaseCheck={[
        "중앙 9분할 영역 내 결함은 즉시 교환 대상인가?",
        "휘점(Bright) 1개, 암점(Dark) 3개 등 구체적 기준이 명시되었는가?",
        "왕복 택배비를 제조사에서 부담하는가?",
        "패널 보증 기간이 본체 보증 기간과 동일한가?"
      ]}
      relatedTest={{
        name: "불량화소 테스트",
        href: "/kr/tests/dead-pixel"
      }}
    />
  );
}
