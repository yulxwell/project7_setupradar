import { Keyboard } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function KeyboardSwitchTypesGuide() {
  return (
    <SpecGuide
      title="리니어/택타일/클릭/저소음"
      category="Keyboard"
      icon={Keyboard}
      oneLineMeaning="스위치 느낌은 크게 부드럽게 내려가는 리니어, 걸림이 있는 택타일, 소리가 큰 클릭, 소음을 줄인 저소음 계열로 나눠볼 수 있습니다."
      whatToCheckFirst="사무실이나 가족이 있는 공간에서 쓸지, 게임과 타이핑 중 어느 쪽을 더 많이 할지 먼저 정해보세요."
      pros={[
        "리니어는 걸림 없이 부드러워 게임과 빠른 입력에 편하게 느껴질 수 있습니다.",
        "택타일은 입력 지점의 구분감이 있어 타이핑할 때 안정적으로 느껴질 수 있습니다.",
        "저소음 계열은 주변 사람에게 들리는 소리를 줄이는 데 도움이 될 수 있습니다.",
      ]}
      cons={[
        "클릭 스위치는 소리가 크기 때문에 공용 공간에서는 부담이 될 수 있습니다.",
        "저소음 스위치는 조용하지만 먹먹하거나 답답하게 느껴질 수 있습니다.",
        "같은 리니어, 택타일이라도 제조사와 키압에 따라 느낌이 크게 다릅니다.",
      ]}
      prePurchaseCheck={[
        "소음이 중요한 환경이라면 클릭 스위치는 피하는 편이 안전합니다.",
        "키압이 너무 높다는 후기가 반복되는지 확인해보세요.",
        "핫스왑 지원 여부를 확인하면 나중에 스위치를 바꾸기 쉽습니다.",
        "가능하면 타건 영상보다 실제 사용자 후기를 함께 확인해보세요.",
      ]}
      relatedTest={{
        name: "스위치·축 사전 보기",
        href: "/kr/switches",
      }}
    />
  );
}
