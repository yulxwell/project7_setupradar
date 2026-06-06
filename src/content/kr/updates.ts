export interface EquipmentUpdatePreview {
  id: string;
  category: string;
  title: string;
  description: string;
  statusLabel: string;
  sourceTypeLabel: string;
  href?: string;
}

export const EQUIPMENT_UPDATE_PREVIEWS: EquipmentUpdatePreview[] = [
  {
    id: "lightweight-wireless-mouse-trend",
    category: "신제품",
    title: "초경량 무선 마우스 신제품이 늘어나고 있습니다",
    description: "무게와 폴링레이트만 보지 말고 배터리, 동글 포함 여부, AS 조건을 함께 확인하세요.",
    statusLabel: "구매 전 흐름",
    sourceTypeLabel: "가이드 연결",
    href: "/kr/guides/mouse-buying-checklist",
  },
  {
    id: "keyboard-75-aluminum-options",
    category: "키보드",
    title: "75% 배열과 풀알루미늄 키보드 선택지가 많아졌습니다",
    description: "배열, 무게, 연결 방식, 스위치 옵션이 판매처마다 다를 수 있어 구매 전 확인이 필요합니다.",
    statusLabel: "스펙 체크",
    sourceTypeLabel: "가이드 연결",
    href: "/kr/guides/keyboard-buying-checklist",
  },
  {
    id: "monitor-response-time-check",
    category: "모니터",
    title: "응답속도 표기보다 실제 잔상 체감이 중요합니다",
    description: "GtG, MPRT, 오버드라이브, 주사율 조건을 함께 보고 테스트 도구로 참고 확인해 보세요.",
    statusLabel: "용어 점검",
    sourceTypeLabel: "가이드 연결",
    href: "/kr/guides/gtg-vs-mprt",
  },
  {
    id: "as-exchange-condition-check",
    category: "구매 전 체크",
    title: "가격보다 AS와 교환 조건을 먼저 확인해야 할 때가 있습니다",
    description: "불량화소, 더블클릭, 키보드 채터링처럼 구매 후 확인해야 할 항목을 미리 알아두면 좋습니다.",
    statusLabel: "수령 후 확인",
    sourceTypeLabel: "가이드 연결",
    href: "/kr/guides/dead-pixel-policy",
  },
];
