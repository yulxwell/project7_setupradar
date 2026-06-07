import type { Metadata } from "next";
import { MousePointer2 } from "lucide-react";
import { MOUSE_DATABASE } from "@/content/kr/products/mice";
import { getContentDisplay } from "@/content/utils";
import { MouseComparePickerClient, type MousePickerProduct } from "./MouseComparePickerClient";

export const metadata: Metadata = {
  title: "마우스 직접 비교 | SetupRadar",
  description: "마우스 두 개를 선택해 형태, 무게, 연결 방식, 손 크기 기준, 구매 전 체크 포인트를 비교합니다.",
  alternates: {
    canonical: "/kr/compare/mouse",
  },
};

const mousePickerProducts: MousePickerProduct[] = MOUSE_DATABASE.map((product) => {
  const display = getContentDisplay(product);

  return {
    id: product.id,
    brand: product.brand ?? "브랜드 확인 필요",
    name: product.name,
    summary: display.summary,
    cautions: display.cautions,
    buyingCheck: display.buyingCheck,
    dimensions: product.dimensions,
    weight: product.weight,
    sensor: product.sensor,
    recommendedGrips: product.recommendedGrips,
    handSizeRange: product.handSizeRange,
    shapeType: product.shapeType,
    features: product.features,
    specTags: product.specTags ?? [],
    rawNote: typeof product.rawSpecs?.note === "string" ? product.rawSpecs.note : "",
    basicFilters: product.basicFilters
      ? {
          shape: product.basicFilters.shape,
          weight: product.basicFilters.weight,
          connection: product.basicFilters.connection,
          size: product.basicFilters.size,
        }
      : undefined,
    advancedFilters: product.advancedFilters
      ? {
          gamingPerformance: product.advancedFilters.gamingPerformance,
          buttonCount: product.advancedFilters.buttonCount,
          switchTendency: product.advancedFilters.switchTendency,
          battery: product.advancedFilters.battery,
        }
      : undefined,
    detailSpecs: product.detailSpecs
      ? {
          sensorModel: product.detailSpecs.sensorModel,
          pollingRateHz: product.detailSpecs.pollingRateHz,
          bluetoothVersion: product.detailSpecs.bluetoothVersion,
          batteryDetail: product.detailSpecs.batteryDetail,
          buttonCountDetail: product.detailSpecs.buttonCountDetail,
          infiniteWheel: product.detailSpecs.infiniteWheel,
        }
      : undefined,
  };
});

export default function MouseComparePage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-neutral-300 pt-14 pb-10 dark:border-zinc-600 md:pt-18 md:pb-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] dark:border-zinc-600">
              <MousePointer2 className="h-3.5 w-3.5" />
              Mouse Compare Picker
            </div>
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">마우스 직접 비교</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              두 마우스를 선택해 구매 전 확인할 차이를 비교해 보세요.
            </p>
            <div className="mt-5 grid max-w-3xl gap-3 text-xs leading-relaxed text-[var(--muted)] md:grid-cols-2">
              <p className="rounded-xl border border-neutral-300 bg-[var(--card)] p-3 dark:border-zinc-600">
                이 비교는 정답 추천이 아니라 구매 전 차이를 이해하기 위한 참고 자료입니다.
              </p>
              <p className="rounded-xl border border-neutral-300 bg-[var(--card)] p-3 dark:border-zinc-600">
                실제 스펙과 구성품은 판매처/제조사 기준으로 다시 확인해 주세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MouseComparePickerClient products={mousePickerProducts} />
    </div>
  );
}
