"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Keyboard, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

const navigation = [
  { name: "테스트 도구", href: "/kr/tests", icon: Monitor },
  { name: "구매 가이드", href: "/kr/guides", icon: Keyboard },
  { name: "마우스 찾기", href: "/kr/finder/mouse-fit", icon: Search },
  { name: "키보드 찾기", href: "/kr/finder/keyboard-fit", icon: Search },
];

const languageLinks = [
  { label: "KR", href: "/kr", enabled: true },
  { label: "EN", href: "/kr", enabled: false },
  { label: "JP", href: "/kr", enabled: false },
  { label: "CN", href: "/kr", enabled: false },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const currentLocale = pathname.split("/")[1] || "kr";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/kr" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--background)]">
              <Monitor className="h-5 w-5" />
            </div>
            <span className="font-outfit text-xl font-black tracking-tight text-[var(--primary)]">SetupRadar</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all",
                    isActive 
                      ? "bg-[var(--secondary)] text-[var(--accent)]" 
                      : "text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-all hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <div className="hidden items-center rounded-lg border border-[var(--border)] bg-[var(--secondary)]/50 p-1 sm:flex">
            {languageLinks.map((language) => {
              const isActive = currentLocale === language.href.slice(1);
              return language.enabled ? (
                <Link
                  key={language.label}
                  href={language.href}
                  aria-label={`${language.label} language`}
                  className={cn(
                    "flex h-8 min-w-9 items-center justify-center rounded-md px-2 text-xs font-black transition-colors",
                    isActive ? "bg-[var(--primary)] text-[var(--background)]" : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--primary)]",
                  )}
                >
                  {language.label}
                </Link>
              ) : (
                <button
                  key={language.label}
                  type="button"
                  disabled
                  title={`${language.label} 준비 중`}
                  aria-label={`${language.label} language coming soon`}
                  className="flex h-8 min-w-9 cursor-not-allowed items-center justify-center rounded-md px-2 text-xs font-black text-[var(--muted)] opacity-35"
                >
                  {language.label}
                </button>
              );
            })}
          </div>
          
          <button 
            className="flex md:hidden p-2 text-[var(--muted)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-4 py-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-4 text-base font-bold",
                  pathname.startsWith(item.href) ? "bg-[var(--secondary)] text-[var(--accent)]" : "text-[var(--muted)]"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {languageLinks.map((language) => {
                const isActive = currentLocale === language.href.slice(1);
                return language.enabled ? (
                  <Link
                    key={language.label}
                    href={language.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex h-11 items-center justify-center rounded-xl border text-sm font-black",
                      isActive ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]" : "border-[var(--border)] text-[var(--muted)]",
                    )}
                  >
                    {language.label}
                  </Link>
                ) : (
                  <button
                    key={language.label}
                    type="button"
                    disabled
                    title={`${language.label} 준비 중`}
                    aria-label={`${language.label} language coming soon`}
                    className="flex h-11 cursor-not-allowed items-center justify-center rounded-xl border border-[var(--border)] text-sm font-black text-[var(--muted)] opacity-35"
                  >
                    {language.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
