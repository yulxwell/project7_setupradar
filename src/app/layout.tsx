import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const siteDescription = "마우스, 키보드, 모니터를 설치 없이 확인하는 테스트 도구와 초보자용 구매 가이드를 제공합니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://setupradar.pages.dev"),
  title: {
    default: "SetupRadar | 하드웨어 테스트와 구매 가이드",
    template: "%s | SetupRadar",
  },
  description: siteDescription,
  applicationName: "SetupRadar",
  keywords: ["SetupRadar", "마우스 테스트", "키보드 테스트", "모니터 테스트", "하드웨어 구매 가이드"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "SetupRadar",
    title: "SetupRadar | 하드웨어 테스트와 구매 가이드",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "SetupRadar | 하드웨어 테스트와 구매 가이드",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('setupradar-theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
