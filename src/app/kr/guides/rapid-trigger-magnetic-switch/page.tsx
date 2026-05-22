import { Zap } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function RapidTriggerMagneticSwitchGuide() {
  return (
    <SpecGuide
      title="래피드 트리거/자석축"
      category="Keyboard"
      icon={Zap}
      oneLineMeaning="자석축은 입력 깊이를 감지하는 방식이고, 래피드 트리거는 키가 올라오는 순간 빠르게 입력 해제를 잡는 기능입니다."
      whatToCheckFirst="발로란트처럼 키를 짧게 누르고 떼는 게임을 많이 하는지, 일반 타이핑 비중이 더 큰지 먼저 보세요."
      pros={[
        "키 입력과 해제 지점을 세밀하게 조절할 수 있어 일부 게임에서 반응이 빠르게 느껴질 수 있습니다.",
        "래피드 트리거는 방향 전환이 많은 게임에서 체감될 가능성이 있습니다.",
        "소프트웨어 설정을 통해 입력 깊이를 취향에 맞출 수 있는 제품이 많습니다.",
      ]}
      cons={[
        "설정이 복잡하면 초보자에게 오히려 피곤할 수 있습니다.",
        "타이핑 위주라면 일반 기계식 키보드보다 체감 이점이 작을 수 있습니다.",
        "게임별 허용 정책과 펌웨어 안정성은 구매 전 확인이 필요합니다.",
      ]}
      prePurchaseCheck={[
        "래피드 트리거와 입력 지점 조절을 실제로 지원하는지 확인해보세요.",
        "전용 소프트웨어가 macOS나 Windows에서 잘 작동하는지 확인해보세요.",
        "펌웨어 업데이트 이슈나 설정 초기화 후기가 있는지 살펴보세요.",
        "일반 타이핑 소리와 키감 후기도 함께 확인해보세요.",
      ]}
      relatedTest={{
        name: "스위치·축 사전 보기",
        href: "/kr/switches",
      }}
    />
  );
}
