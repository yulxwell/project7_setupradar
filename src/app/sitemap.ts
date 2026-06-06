import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://setupradar.pages.dev";

const routes = [
  "/kr",
  "/kr/compare",
  "/kr/compare/mouse/lamzu-maya-vs-zowie-u2",
  "/kr/finder/mouse-fit",
  "/kr/finder/keyboard-fit",
  "/kr/tests",
  "/kr/tests/backlight-bleed",
  "/kr/tests/contrast-readability",
  "/kr/tests/cps",
  "/kr/tests/dead-pixel",
  "/kr/tests/double-click",
  "/kr/tests/keyboard-chatter",
  "/kr/tests/keyboard-rollover",
  "/kr/tests/mouse-tracking",
  "/kr/tests/mouse-wheel-encoder",
  "/kr/tests/polling-rate",
  "/kr/tests/refresh-rate-ghosting",
  "/kr/guides",
  "/kr/guides/8k-polling-rate",
  "/kr/guides/backlight-bleed-vs-ips-glow",
  "/kr/guides/beginner-spec-traps",
  "/kr/guides/dead-pixel-policy",
  "/kr/guides/full-aluminum-keyboard",
  "/kr/guides/gaming-mouse-vs-normal-mouse",
  "/kr/guides/gtg-vs-mprt",
  "/kr/guides/ips-va-oled",
  "/kr/guides/keyboard-buying-checklist",
  "/kr/guides/keyboard-layout-full-tkl-75-65",
  "/kr/guides/keyboard-switch-types",
  "/kr/guides/monitor-buying-checklist",
  "/kr/guides/mouse-buying-checklist",
  "/kr/guides/mouse-sensor-dpi-ips",
  "/kr/guides/mouse-shape-symmetrical-vs-ergonomic",
  "/kr/guides/mouse-switch-double-click",
  "/kr/guides/pbt-vs-abs-keycaps",
  "/kr/guides/rapid-trigger-magnetic-switch",
  "/kr/guides/review-reading-checklist",
  "/kr/guides/spec-table-red-flags",
  "/kr/switches",
  "/kr/contact",
  "/kr/privacy",
  "/kr/terms",
  "/kr/disclosure",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(route.startsWith("/kr/compare") ? "2026-06-07" : route === "/kr/contact" ? "2026-06-03" : "2026-05-29"),
    changeFrequency: route === "/kr" ? "weekly" : "monthly",
    priority: route === "/kr/compare/mouse/lamzu-maya-vs-zowie-u2"
      ? 0.5
      : route === "/kr/compare"
      ? 0.6
      : ["/kr/contact", "/kr/privacy", "/kr/terms", "/kr/disclosure"].includes(route)
      ? 0.4
      : route === "/kr"
        ? 1
        : route.split("/").length <= 3
          ? 0.8
          : 0.6,
  }));
}
