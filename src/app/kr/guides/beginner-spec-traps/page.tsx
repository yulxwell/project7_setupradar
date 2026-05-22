import { ShieldCheck } from "lucide-react";
import { SpecGuide } from "@/components/guides/SpecGuide";

export default function BeginnerSpecTrapsGuide() {
  return (
    <SpecGuide
      title="초보자가 자주 속는 스펙"
      category="Check"
      icon={ShieldCheck}
      oneLineMeaning="숫자가 크거나 기능명이 화려해도 실제 사용에서 꼭 좋은 선택이 되는 것은 아닙니다."
      whatToCheckFirst="내가 쓰는 환경에서 체감되는 조건인지, 아니면 보기 좋은 숫자인지 나눠서 보세요."
      pros={[
        "불필요한 고스펙에 예산을 쓰는 일을 줄일 수 있습니다.",
        "나에게 맞는 크기, 소음, 연결 방식 같은 체감 요소를 먼저 볼 수 있습니다.",
        "리뷰를 읽을 때 어떤 불편이 반복되는지 더 쉽게 보입니다.",
      ]}
      cons={[
        "스펙을 너무 무시하면 필요한 기능을 놓칠 수 있습니다.",
        "제품군마다 중요한 기준이 다르므로 한 가지 기준만 적용하면 안 됩니다.",
        "가격이 낮은 제품은 기본 품질과 A/S를 더 꼼꼼히 봐야 합니다.",
      ]}
      prePurchaseCheck={[
        "내가 실제로 쓸 기능인지 먼저 체크해보세요.",
        "숫자가 큰 스펙보다 불편 후기가 반복되는지 확인해보세요.",
        "저렴한 제품은 초기 불량과 교환 정책을 같이 보세요.",
        "초보자라면 기본 필터를 먼저 맞추고 세부 스펙은 나중에 보세요.",
      ]}
    />
  );
}
