import { Moon } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function PanelTypeGuide() {
  return (
    <SpecGuide
      title="IPS/VA/OLED"
      category="Monitor"
      icon={Moon}
      oneLineMeaning="패널 종류는 색감, 명암비, 시야각, 잔상, 번인 리스크에 영향을 주는 큰 기준입니다."
      whatToCheckFirst="게임, 영상, 작업 중 어떤 용도가 가장 중요한지 먼저 정하면 패널 선택이 쉬워집니다."
      pros={[
        "IPS는 시야각과 색 표현이 안정적인 편이라 범용성이 좋습니다.",
        "VA는 명암비가 높아 어두운 장면에서 깊은 검정을 느끼기 쉽습니다.",
        "OLED는 매우 빠른 응답과 높은 명암비를 기대할 수 있습니다.",
      ]}
      cons={[
        "IPS는 어두운 화면에서 IPS Glow가 신경 쓰일 수 있습니다.",
        "VA는 일부 제품에서 어두운 장면 잔상이 보일 수 있습니다.",
        "OLED는 번인 관리와 가격대를 함께 고려해야 합니다.",
      ]}
      prePurchaseCheck={[
        "밝은 방에서 쓰는지, 어두운 방에서 쓰는지 먼저 생각해보세요.",
        "정적 UI를 오래 띄우는 작업이 많다면 OLED 번인 정책을 확인해보세요.",
        "FPS 게임 비중이 높다면 응답속도와 잔상 후기를 함께 보세요.",
        "콘텐츠 감상 위주라면 명암비와 HDR 평가도 확인해보세요.",
      ]}
    />
  );
}
