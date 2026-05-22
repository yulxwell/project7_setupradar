import { ShieldCheck } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function SpecTableRedFlagsGuide() {
  return (
    <SpecGuide
      title="제품 스펙표에서 걸러야 할 문구"
      category="Check"
      icon={ShieldCheck}
      oneLineMeaning="스펙표에는 좋아 보이는 표현이 많지만, 실제 구매 판단에는 추가 확인이 필요한 문구가 섞여 있습니다."
      whatToCheckFirst="최고, 초고속, 프리미엄 같은 표현보다 실제 수치와 조건, 사용자 후기를 먼저 확인하세요."
      pros={[
        "광고성 표현을 걸러내면 필요한 스펙만 빠르게 볼 수 있습니다.",
        "체감에 영향이 작은 숫자에 과하게 끌리지 않을 수 있습니다.",
        "구매 전 확인해야 할 조건을 놓칠 가능성이 줄어듭니다.",
      ]}
      cons={[
        "모든 마케팅 문구가 틀린 것은 아니므로 실제 스펙과 함께 봐야 합니다.",
        "브랜드별 표기 방식이 달라 단순 비교가 어려울 수 있습니다.",
        "초보자에게는 전문 용어보다 사용 후기의 반복 패턴이 더 도움이 될 수 있습니다.",
      ]}
      prePurchaseCheck={[
        "측정 조건이 빠진 수치인지 확인해보세요.",
        "최대값만 강조하고 일반 사용 조건 설명이 없는지 살펴보세요.",
        "실사용 후기에서 같은 장점과 단점이 반복되는지 확인해보세요.",
        "A/S와 교환 정책처럼 숫자로 보이지 않는 조건도 함께 보세요.",
      ]}
    />
  );
}
