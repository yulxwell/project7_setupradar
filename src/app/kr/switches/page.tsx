"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Search, MessageSquare, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { SWITCH_DATABASE } from "@/content/kr/switches";
import { SwitchType } from "@/content/types";
import { getContentDisplay } from "@/content/utils";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<SwitchType, string> = {
  linear: "리니어 (Linear)",
  tactile: "택타일 (Tactile)",
  clicky: "클릭 (Clicky)",
  magnetic: "자석축 (Magnetic)",
  optical: "광축 (Optical)",
  capacitive: "무접점 (Capacitive)",
  unknown: "기타/확인불가",
};

export default function SwitchGuidePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<SwitchType | "all">("all");

  const filteredSwitches = SWITCH_DATABASE.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.brand?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesFilter = activeFilter === "all" || s.switchType === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-[70vh]">
      <Link 
        href="/kr" 
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        메인으로 돌아가기
      </Link>

      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--primary)] md:text-4xl">Keyboard Switch Guide</h1>
        <p className="text-[var(--muted)]">복잡한 스위치 이름 대신, 실제 체감과 용도에 맞는 축을 찾아보세요.</p>
      </div>

      {/* Intro Section */}
      <div className="mb-12 rounded-3xl bg-[var(--secondary)]/30 border border-[var(--border)] p-8">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[var(--primary)]">
          <Info className="h-5 w-5 text-[var(--accent)]" />
          축 이름보다 먼저 봐야 할 것
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-bold text-[var(--primary)]">1. 소음 환경</p>
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              사무실이나 조용한 방이라면 &apos;저소음&apos; 혹은 &apos;리니어&apos;를, 나만의 공간이라면 &apos;클릭&apos;이나 &apos;택타일&apos;을 고려해보세요.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-[var(--primary)]">2. 손가락 피로도</p>
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              빠른 입력이 필요한 게임이나 장시간 타이핑이 많다면 키압이 낮은(45g 이하) 축이 손목과 손가락 건강에 유리할 수 있습니다. 키압이 높을 수록 입력할 때 묵직한 느낌이 납니다.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-[var(--primary)]">3. 입력 방식 (구분감)</p>
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              눌렀을 때 피드백이 확실한 것을 원하면 택타일/클릭을, 물 흐르듯 부드러운 입력을 원하면 리니어가 맞을 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "linear", "tactile", "clicky", "magnetic"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all border",
                activeFilter === t 
                  ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--background)]" 
                  : "bg-[var(--background)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]"
              )}
            >
              {t === "all" ? "전체보기" : TYPE_LABELS[t]}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="스위치 이름, 브랜드 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-4 text-sm focus:border-[var(--accent)] focus:outline-none md:w-64"
          />
        </div>
      </div>

      {/* Switch Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredSwitches.map((sw) => {
          const display = getContentDisplay(sw);
          return (
            <motion.div
              key={sw.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--secondary)]/20 p-6 hover:bg-[var(--secondary)]/40 transition-all shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <span className="mb-1 block text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">{sw.brand || "Unknown"}</span>
                  <h3 className="text-xl font-bold text-[var(--primary)]">{sw.name}</h3>
                </div>
                <div className="rounded-lg bg-[var(--accent)]/10 px-2 py-1 text-[10px] font-bold text-[var(--accent)]">
                  {TYPE_LABELS[sw.switchType]}
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-1 h-4 w-4 shrink-0 text-[var(--muted)]" />
                  <div>
                    <p className="text-sm font-bold text-[var(--primary)]">어떤 느낌인가요?</p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{display.beginnerSummary}</p>
                  </div>
                </div>

              </div>

              <div className="mt-auto space-y-3">
                {display.namingWarning && (
                  <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 p-3 border border-amber-500/20">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                    <p className="text-[11px] font-medium leading-relaxed text-amber-700">
                      {display.namingWarning}
                    </p>
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-[var(--primary)]">구매 전 체크!</p>
                  <ul className="list-inside list-disc space-y-1 text-[10px] text-[var(--muted)]">
                    {display.buyingCheck.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                    <li>{display.caution}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div className="mt-16 rounded-3xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 p-8">
        <p className="text-xs leading-relaxed text-[var(--accent)] opacity-80">
          * 위 데이터는 일반적인 스위치 특성을 초보자가 이해하기 쉽게 정리한 요약본입니다. 
          동일한 &apos;아이스크림축&apos;이라도 제조사나 버전에 따라 키압과 타건감이 크게 다를 수 있습니다. 
          가능하다면 &apos;타건 카페&apos; 등에서 직접 체험해보거나, 상세한 타건 영상을 참고하는 것이 좋습니다.
        </p>
      </div>
    </div>
  );
}
