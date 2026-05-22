import { Zap } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function GtgVsMprtGuide() {
  return (
    <SpecGuide
      title="GtG vs MPRT"
      category="Monitor"
      icon={Zap}
      oneLineMeaning="GtG는 픽셀 색이 바뀌는 속도, MPRT는 움직이는 화면에서 잔상이 얼마나 남는지를 보는 표기입니다."
      whatToCheckFirst="응답속도 숫자 하나만 보지 말고, 오버드라이브 설정과 실제 잔상 후기를 함께 확인하세요."
      pros={[
        "GtG는 패널 반응 속도를 비교할 때 참고하기 쉽습니다.",
        "MPRT는 움직이는 화면의 선명도 체감을 설명하는 데 도움이 됩니다.",
        "고주사율 모니터에서는 응답속도와 잔상 후기가 함께 중요해집니다.",
      ]}
      cons={[
        "1ms 표기가 있어도 실제 체감이 항상 좋은 것은 아닙니다.",
        "MPRT 기능은 밝기가 낮아지거나 플리커가 생길 수 있습니다.",
        "오버드라이브를 강하게 걸면 역잔상이 보일 수 있습니다.",
      ]}
      prePurchaseCheck={[
        "실측 리뷰에서 잔상과 역잔상 평가가 어떤지 확인해보세요.",
        "MPRT 사용 시 밝기 저하가 있는지 살펴보세요.",
        "주로 하는 게임 장르에서 잔상이 민감한지 생각해보세요.",
        "응답속도보다 패널 품질과 주사율을 함께 비교해보세요.",
      ]}
    />
  );
}
