import type { Metadata } from "next";
import { Keyboard as KeyboardIcon } from "lucide-react";
import { KEYBOARD_DATABASE } from "@/content/kr/products/keyboards";
import { getContentDisplay } from "@/content/utils";
import { KeyboardComparePickerClient, type KeyboardPickerProduct } from "./KeyboardComparePickerClient";

export const metadata: Metadata = {
  title: "키보드 직접 비교 | SetupRadar",
  description: "키보드 두 개를 선택해 배열, 스위치 성향, 소음, 연결 방식, 핫스왑, 구매 전 체크 포인트를 비교합니다.",
  alternates: {
    canonical: "/kr/compare/keyboard",
  },
};

const keyboardPickerProducts: KeyboardPickerProduct[] = KEYBOARD_DATABASE.map((product) => {
  const display = getContentDisplay(product);

  return {
    id: product.id,
    brand: product.brand ?? "브랜드 확인 필요",
    name: product.name,
    summary: display.summary,
    cautions: display.cautions,
    buyingCheck: display.buyingCheck,
    layout: product.layout,
    switchType: product.switchType,
    isHotSwap: product.isHotSwap,
    material: product.material,
    features: product.features,
    specTags: product.specTags ?? [],
    rawNote: typeof product.rawSpecs?.note === "string" ? product.rawSpecs.note : "",
    basicFilters: product.basicFilters
      ? {
          layout: product.basicFilters.layout,
          connection: product.basicFilters.connection,
          feel: product.basicFilters.feel,
          noise: product.basicFilters.noise,
          price: product.basicFilters.price,
        }
      : undefined,
    advancedFilters: product.advancedFilters
      ? {
          gamingFeature: product.advancedFilters.gamingFeature,
          multiDevice: product.advancedFilters.multiDevice,
          keycap: product.advancedFilters.keycap,
          housing: product.advancedFilters.housing,
          backlight: product.advancedFilters.backlight,
          weightFeel: product.advancedFilters.weightFeel,
        }
      : undefined,
    detailSpecs: product.detailSpecs
      ? {
          actuationForceG: product.detailSpecs.actuationForceG,
          macroSupport: product.detailSpecs.macroSupport,
          responseTimeMs: product.detailSpecs.responseTimeMs,
          bluetoothVersion: product.detailSpecs.bluetoothVersion,
          battery: product.detailSpecs.battery,
          enterKeyShape: product.detailSpecs.enterKeyShape,
          legendPosition: product.detailSpecs.legendPosition,
          cableMaterial: product.detailSpecs.cableMaterial,
          accessories: product.detailSpecs.accessories,
          ps2Support: product.detailSpecs.ps2Support,
          stepSculpture: product.detailSpecs.stepSculpture,
          windowsKeyLock: product.detailSpecs.windowsKeyLock,
          dimensionsMm: product.detailSpecs.dimensionsMm,
        }
      : undefined,
  };
});

export default function KeyboardComparePage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-neutral-300 pt-14 pb-10 dark:border-zinc-600 md:pt-18 md:pb-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-[var(--secondary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] dark:border-zinc-600">
              <KeyboardIcon className="h-3.5 w-3.5" />
              Keyboard Compare Picker
            </div>
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">키보드 직접 비교</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              두 키보드를 선택해 구매 전 확인할 차이를 비교해 보세요.
            </p>
            <div className="mt-5 grid max-w-3xl gap-3 text-xs leading-relaxed text-[var(--muted)] md:grid-cols-2">
              <p className="rounded-xl border border-neutral-300 bg-[var(--card)] p-3 dark:border-zinc-600">
                이 비교는 정답 추천이 아니라 구매 전 차이를 이해하기 위한 참고 자료입니다.
              </p>
              <p className="rounded-xl border border-neutral-300 bg-[var(--card)] p-3 dark:border-zinc-600">
                실제 스위치 옵션, 키캡, 구성품, 연결 방식은 판매처/제조사 기준으로 다시 확인해 주세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <KeyboardComparePickerClient products={keyboardPickerProducts} />
    </div>
  );
}
