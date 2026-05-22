import { Mouse } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function MouseSwitchDoubleClickGuide() {
  return (
    <SpecGuide
      title="마우스 스위치와 더블클릭"
      category="Mouse"
      icon={Mouse}
      oneLineMeaning="마우스 더블클릭은 한 번 눌렀는데 두 번 입력되는 증상이며, 스위치 구조와 노후화의 영향을 받을 수 있습니다."
      whatToCheckFirst="기계식 스위치는 클릭감이 익숙하지만 접점 문제로 더블클릭이 생길 수 있고, 광축 스위치는 빛으로 입력을 감지해 접점 마모 영향을 줄이는 방식입니다."
      pros={[
        "기계식 스위치는 클릭감과 반발감이 뚜렷해 익숙하게 느끼는 사용자가 많습니다.",
        "광축 스위치는 물리 접점 대신 빛 감지 방식을 써 더블클릭 리스크를 줄이는 방향으로 설계됩니다.",
        "더블클릭 테스트를 해보면 현재 마우스의 입력 이상을 간단히 확인할 수 있습니다.",
      ]}
      cons={[
        "광축이라고 해서 모든 클릭감이 좋은 것은 아니며 제품마다 소리와 반발감이 다릅니다.",
        "더블클릭 증상은 스위치 외에도 소프트웨어 설정, 접촉 불량, 오염의 영향을 받을 수 있습니다.",
        "새 제품 구매 전에는 스위치 방식뿐 아니라 A/S 정책도 함께 확인하는 것이 좋습니다.",
      ]}
      prePurchaseCheck={[
        "제품 설명에 광축 스위치인지, 기계식 스위치인지 표시되어 있는지 확인해보세요.",
        "클릭압이 너무 높거나 낮다는 후기가 많은지 살펴보세요.",
        "더블클릭 관련 사용자 후기가 반복되는 모델인지 확인해보세요.",
        "현재 마우스가 의심된다면 먼저 더블클릭 테스트를 해보세요.",
      ]}
      relatedTest={{
        name: "더블클릭 테스트",
        href: "/kr/tests/double-click",
      }}
    />
  );
}
