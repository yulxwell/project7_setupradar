import { Zap } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function MouseSensorDpiIpsGuide() {
  return (
    <SpecGuide
      title="센서/DPI/IPS 쉽게 보기"
      category="Mouse"
      icon={Zap}
      oneLineMeaning="센서는 움직임을 읽는 부품이고, DPI와 IPS는 그 움직임을 얼마나 세밀하고 빠르게 처리하는지 설명하는 숫자입니다."
      whatToCheckFirst="최대 DPI 숫자보다 평소 쓰는 감도에서 안정적으로 움직이는지, 센서 튐 후기가 없는지를 먼저 보세요."
      pros={[
        "좋은 센서는 빠르게 움직여도 포인터가 튀거나 끊기는 느낌을 줄일 수 있습니다.",
        "DPI 조절 폭이 넓으면 게임과 작업 환경에 맞춰 감도를 맞추기 쉽습니다.",
        "IPS가 높으면 빠른 손 움직임을 추적하는 여유가 커질 수 있습니다.",
      ]}
      cons={[
        "최대 DPI가 높다고 무조건 좋은 마우스는 아닙니다.",
        "초보자에게는 센서 모델명보다 쉘, 무게, 연결 안정성이 더 크게 체감될 수 있습니다.",
        "스펙 숫자만 보고 고르면 손에 맞지 않는 제품을 고를 수 있습니다.",
      ]}
      prePurchaseCheck={[
        "최대 DPI보다 실사용 DPI 구간에서 안정적이라는 후기가 있는지 확인해보세요.",
        "센서 튐, 끊김, LOD 관련 불편 후기가 반복되는지 살펴보세요.",
        "무선 모델은 수신기 위치와 연결 안정성 후기도 함께 확인해보세요.",
        "본인이 원하는 무게와 쉘 조건을 먼저 정한 뒤 센서 스펙을 보세요.",
      ]}
    />
  );
}
