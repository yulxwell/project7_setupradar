import { ShieldCheck } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function ReviewReadingChecklistGuide() {
  return (
    <SpecGuide
      title="후기 볼 때 확인할 것"
      category="Check"
      icon={ShieldCheck}
      oneLineMeaning="후기는 별점보다 반복되는 불편과 내 사용 환경에 맞는 조건을 찾는 것이 중요합니다."
      whatToCheckFirst="좋다는 말보다 어떤 손 크기, 어떤 책상 환경, 어떤 용도에서 좋았는지 맥락을 보세요."
      pros={[
        "반복되는 단점은 실제 구매 후 불편으로 이어질 가능성이 있습니다.",
        "내 사용 환경과 비슷한 사람의 후기를 찾으면 실패 확률을 줄일 수 있습니다.",
        "초기 불량, 소음, 발열, 연결 안정성 같은 체감 문제를 미리 알 수 있습니다.",
      ]}
      cons={[
        "개인 취향이 강한 후기는 그대로 믿기보다 여러 개를 비교해야 합니다.",
        "협찬이나 이벤트 후기는 장점이 과하게 보일 수 있습니다.",
        "출시 초기 후기는 장기 내구성 판단에 한계가 있습니다.",
      ]}
      prePurchaseCheck={[
        "단점 후기가 여러 곳에서 반복되는지 확인해보세요.",
        "내 손 크기, 책상 크기, 사용 OS와 비슷한 후기를 찾아보세요.",
        "소음과 무게처럼 취향이 갈리는 요소는 긍정 후기와 부정 후기를 같이 보세요.",
        "A/S 경험 후기가 있는지도 확인해보세요.",
      ]}
    />
  );
}
