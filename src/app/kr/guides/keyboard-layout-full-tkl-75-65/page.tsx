import { Keyboard } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function KeyboardLayoutGuide() {
  return (
    <SpecGuide
      title="풀배열/TKL/75/65 배열"
      category="Keyboard"
      icon={Keyboard}
      oneLineMeaning="키보드 배열은 숫자키, 방향키, 기능키를 얼마나 남길지 정하는 선택입니다."
      whatToCheckFirst="숫자키를 자주 쓰는지, 책상 위 마우스 공간이 부족한지 먼저 확인해보세요."
      pros={[
        "풀배열은 숫자 입력과 사무 작업에 익숙하고 빠릅니다.",
        "TKL은 숫자패드를 줄여 마우스 공간을 확보하면서 방향키와 기능키는 유지합니다.",
        "75%, 65% 배열은 책상 공간을 크게 줄이고 휴대성을 높일 수 있습니다.",
      ]}
      cons={[
        "작은 배열은 일부 키 조합을 외워야 해서 처음에는 불편할 수 있습니다.",
        "업무에서 숫자 입력이 많다면 65% 이하 배열은 피곤할 수 있습니다.",
        "키캡 교체를 고려한다면 비표준 배열 호환성을 확인해야 합니다.",
      ]}
      prePurchaseCheck={[
        "엑셀이나 숫자 입력을 자주 한다면 풀배열 또는 별도 넘패드를 고려해보세요.",
        "게임 중 마우스 공간이 부족했다면 TKL이나 75%가 편할 수 있습니다.",
        "Delete, Home, End 같은 키를 자주 쓰는지 확인해보세요.",
        "노브나 특수 배열은 키캡 호환성이 제한될 수 있습니다.",
      ]}
    />
  );
}
