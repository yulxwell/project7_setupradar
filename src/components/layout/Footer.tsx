import { Monitor, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/kr" className="flex items-center gap-2 mb-6">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--primary)] text-[var(--background)]">
                <Monitor className="h-4 w-4" />
              </div>
              <span className="font-outfit text-lg font-bold tracking-tight text-[var(--primary)]">SetupRadar</span>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              설치 없이 장비 상태를 가볍게 확인하고, <br />
              구매 전 확인할 스펙을 초보자 기준으로 정리합니다.
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--primary)] opacity-60">테스트</h4>
            <ul className="space-y-4 text-sm text-[var(--muted)]">
              <li><Link href="/kr/tests/dead-pixel" className="hover:text-[var(--accent)] transition-colors">모니터 불량화소</Link></li>
              <li><Link href="/kr/tests/backlight-bleed" className="hover:text-[var(--accent)] transition-colors">빛샘 / IPS Glow</Link></li>
              <li><Link href="/kr/tests/double-click" className="hover:text-[var(--accent)] transition-colors">마우스 더블클릭</Link></li>
              <li><Link href="/kr/tests/polling-rate" className="hover:text-[var(--accent)] transition-colors">마우스 폴링레이트</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--primary)] opacity-60">리소스</h4>
            <ul className="space-y-4 text-sm text-[var(--muted)]">
              <li><Link href="/kr/guides" className="hover:text-[var(--accent)] transition-colors">구매 가이드</Link></li>
              <li><Link href="/kr/finder/mouse-fit" className="hover:text-[var(--accent)] transition-colors">마우스 핏 찾기</Link></li>
              <li><Link href="/kr/finder/keyboard-fit" className="hover:text-[var(--accent)] transition-colors">키보드 핏 찾기</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--primary)] opacity-60">연락처</h4>
            <ul className="space-y-4 text-sm text-[var(--muted)]">
              <li>
                <Link href="/kr/contact" className="flex items-center gap-2 transition-colors hover:text-[var(--accent)]">
                  <Mail className="h-4 w-4" />
                  <span>문의</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-medium text-[var(--muted)]">
            © 2026 SetupRadar. All rights reserved. 본 서비스에서 제공하는 정보는 참고용입니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-[var(--muted)]">
            <Link href="/kr/privacy" className="transition-colors hover:text-[var(--accent)]">
              개인정보처리방침
            </Link>
            <Link href="/kr/terms" className="transition-colors hover:text-[var(--accent)]">
              이용 안내
            </Link>
            <Link href="/kr/disclosure" className="transition-colors hover:text-[var(--accent)]">
              광고·제휴 고지
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
