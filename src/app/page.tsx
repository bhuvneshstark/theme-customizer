"use client";

import dynamic from "next/dynamic";

const ThemeCustomizer = dynamic(
  () => import("@/components/theme-customizer/theme-customizer").then((mod) => ({ default: mod.ThemeCustomizer })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading Theme Customizer...</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return <ThemeCustomizer />;
}
