import { Mouse } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function MouseShapeGuide() {
  return (
    <SpecGuide
      title="대칭형 vs 오른손용 비대칭형"
      category="Mouse"
      icon={Mouse}
      oneLineMeaning="마우스 쉘은 손바닥을 어떻게 받쳐주는지와 좌우 움직임이 얼마나 편한지를 크게 바꿉니다."
      whatToCheckFirst="현재 쓰는 마우스에서 손바닥 지지가 부족한지, 아니면 움직임이 답답한지를 먼저 떠올려보세요."
      pros={[
        "대칭형은 좌우 움직임이 가볍고 다양한 잡는 방식에 맞을 수 있습니다.",
        "오른손용 비대칭형은 손바닥과 엄지 쪽을 받쳐줘 오래 잡을 때 편하게 느껴질 수 있습니다.",
        "같은 무게라도 쉘이 손에 맞으면 더 가볍고 안정적으로 느껴질 수 있습니다.",
      ]}
      cons={[
        "대칭형이 항상 게임에 유리한 것은 아니며 손 크기에 따라 비어 보일 수 있습니다.",
        "오른손용 비대칭형은 손에 맞지 않으면 기울어진 느낌이 불편할 수 있습니다.",
        "쉘 체감은 스펙표보다 실사용 후기와 기존 사용 마우스 비교가 더 중요합니다.",
      ]}
      prePurchaseCheck={[
        "손 길이와 손바닥 폭이 제품 권장 체감과 맞는지 확인해보세요.",
        "비슷한 쉘로 자주 비교되는 모델이 있는지 후기를 살펴보세요.",
        "높이와 엉덩이 부분이 손바닥을 얼마나 받쳐주는지 확인해보세요.",
        "무게만 보지 말고 크기와 쉘 형태를 함께 비교해보세요.",
      ]}
    />
  );
}
