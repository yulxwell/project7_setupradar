import { Keyboard } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function PbtVsAbsKeycapsGuide() {
  return (
    <SpecGuide
      title="PBT vs ABS 키캡"
      category="Keyboard"
      icon={Keyboard}
      oneLineMeaning="PBT와 ABS는 키캡 플라스틱 소재이며, 촉감과 번들거림, 소리 성향에 차이를 만들 수 있습니다."
      whatToCheckFirst="손에 땀이 많은지, 오래 썼을 때 번들거림이 신경 쓰이는지 먼저 생각해보세요."
      pros={[
        "PBT는 표면이 덜 번들거리는 편이라 오래 쓰기 좋게 느껴질 수 있습니다.",
        "ABS는 색감 표현과 투명 각인, RGB 표현에서 유리한 제품이 많습니다.",
        "키캡 소재는 타건음의 높고 낮은 느낌에도 영향을 줄 수 있습니다.",
      ]}
      cons={[
        "PBT라고 항상 고급인 것은 아니며 두께와 가공 품질이 함께 중요합니다.",
        "ABS는 오래 쓰면 번들거림이 생길 수 있습니다.",
        "키캡 프로파일과 두께에 따라 같은 소재라도 체감이 달라질 수 있습니다.",
      ]}
      prePurchaseCheck={[
        "키캡 소재뿐 아니라 두께와 각인 방식도 함께 확인해보세요.",
        "RGB 투과가 중요한지, 표면 내구성이 중요한지 정해보세요.",
        "한글 각인 위치와 가독성이 괜찮은지 제품 사진을 확인해보세요.",
        "교체용 키캡을 쓸 계획이면 배열 호환성을 확인해보세요.",
      ]}
    />
  );
}
