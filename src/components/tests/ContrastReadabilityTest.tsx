"use client";

const darkSteps = Array.from({ length: 16 }, (_, index) => index);
const lightSteps = Array.from({ length: 16 }, (_, index) => index);

export function ContrastReadabilityTest() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5 text-sm leading-relaxed text-[var(--muted)]">
        밝기, 명암비, HDR, 주변 조명에 따라 보이는 단계가 달라질 수 있습니다. 캘리브레이션 장비처럼 수치를 판정하는 도구가 아니라 실사용 가독성을 확인하는 참고 화면입니다.
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-black p-6 text-white">
        <h2 className="mb-4 text-sm font-bold">검은색 단계 구분</h2>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
          {darkSteps.map((step) => {
            const value = step * 8;
            return (
              <div key={step} className="flex aspect-square items-center justify-center rounded-xl border border-white/10 text-xs font-bold" style={{ backgroundColor: `rgb(${value}, ${value}, ${value})` }}>
                {step}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/60">0에 가까운 칸들이 모두 뭉개져 보이면 어두운 장면에서 사물 구분이 어려울 수 있습니다.</p>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 text-slate-950">
        <h2 className="mb-4 text-sm font-bold">흰색 단계 구분</h2>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
          {lightSteps.map((step) => {
            const value = 255 - step * 6;
            return (
              <div key={step} className="flex aspect-square items-center justify-center rounded-xl border border-slate-200 text-xs font-bold" style={{ backgroundColor: `rgb(${value}, ${value}, ${value})` }}>
                {step}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">밝은 단계가 전부 흰색으로 뭉개지면 명부 디테일 표현이 약하게 느껴질 수 있습니다.</p>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-6">
        <h2 className="mb-4 text-sm font-bold text-[var(--primary)]">가독성 샘플</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-[#111] p-5 text-[#333]">어두운 배경의 낮은 대비 텍스트</div>
          <div className="rounded-2xl bg-[#111] p-5 text-[#777]">중간 대비 텍스트</div>
          <div className="rounded-2xl bg-[#111] p-5 text-[#ddd]">높은 대비 텍스트</div>
        </div>
      </section>
    </div>
  );
}
