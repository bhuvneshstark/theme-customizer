"use client";

import React, { useCallback } from "react";
import { ControlPanel } from "./control-panel";
import { StorefrontPreview } from "./storefront-preview";
import { useThemeStore } from "./store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Download,
  Monitor,
  Smartphone,
  Tablet,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DeviceView = "desktop" | "tablet" | "mobile";

export function ThemeCustomizer() {
  const { theme, isExporting, setIsExporting } = useThemeStore();
  const [deviceView, setDeviceView] = React.useState<DeviceView>("desktop");
  const [panelOpen, setPanelOpen] = React.useState(true);

  const handleExportCSS = useCallback(async () => {
    setIsExporting(true);
    try {
      const css = generateThemeCSS(theme);
      const blob = new Blob([css], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "theme.css";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  }, [theme, setIsExporting]);

  const deviceWidths: Record<DeviceView, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* ── Header Bar ── */}
      <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
            <Palette className="size-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-none">
              Theme Customizer
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Live storefront prototyping
            </p>
          </div>
          <Badge variant="secondary" className="text-[10px] ml-2 hidden sm:inline-flex">
            {theme.storeName}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Panel Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setPanelOpen(!panelOpen)}
          >
            {panelOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
          </Button>

          {/* Device View Toggle */}
          <div className="hidden md:flex items-center bg-muted rounded-lg p-0.5">
            {(
              [
                { key: "desktop", icon: Monitor },
                { key: "tablet", icon: Tablet },
                { key: "mobile", icon: Smartphone },
              ] as const
            ).map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setDeviceView(key)}
                className={cn(
                  "size-7 flex items-center justify-center rounded-md transition-colors",
                  deviceView === key
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={handleExportCSS}
            disabled={isExporting}
          >
            <Download className="size-3" />
            <span className="hidden sm:inline">Export CSS</span>
          </Button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Control Panel */}
        <aside
          className={cn(
            "border-r bg-card shrink-0 transition-all duration-300 overflow-hidden",
            panelOpen ? "w-[340px]" : "w-0"
          )}
        >
          <div className="w-[340px] h-full">
            <ControlPanel />
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 overflow-hidden bg-muted/30 flex items-start justify-center p-0 md:p-4">
          <div
            className="bg-white shadow-2xl overflow-hidden transition-all duration-300 h-full md:h-[calc(100%-2rem)] md:my-auto"
            style={{
              width: deviceWidths[deviceView],
              maxWidth: "100%",
            }}
          >
            <StorefrontPreview />
          </div>
        </main>
      </div>


    </div>
  );
}

// ─── Generate CSS from theme config ───────────────────────────
function generateThemeCSS(theme: ReturnType<typeof useThemeStore.getState>["theme"]) {
  return `/* Theme: ${theme.storeName} */
/* Generated by Theme Customizer */

:root {
  --store-primary: ${theme.primaryColor};
  --store-secondary: ${theme.secondaryColor};
  --store-accent: ${theme.accentColor};
  --store-background: ${theme.backgroundColor};
  --store-text: ${theme.textColor};
  --store-card-bg: ${theme.cardBackgroundColor};
  --store-radius: ${theme.borderRadius}px;
  --store-heading-font: "${theme.headingFont}", sans-serif;
  --store-body-font: "${theme.bodyFont}", sans-serif;
  --store-base-font-size: ${theme.baseFontSize}px;
  --store-heading-weight: ${theme.headingWeight};
  --store-section-spacing: ${theme.sectionSpacing}px;
}

body {
  font-family: var(--store-body-font);
  font-size: var(--store-base-font-size);
  color: var(--store-text);
  background-color: var(--store-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--store-heading-font);
  font-weight: var(--store-heading-weight);
}

.btn-primary {
  background-color: var(--store-primary);
  color: #ffffff;
  border-radius: ${theme.buttonStyle === "pill" ? "9999px" : theme.buttonStyle === "squared" ? "0" : "var(--store-radius)"};
  ${theme.buttonVariant === "outlined" ? `background: transparent; border: 2px solid var(--store-primary); color: var(--store-primary);` : ""}
  ${theme.buttonVariant === "ghost" ? `background: transparent; color: var(--store-primary);` : ""}
}

.btn-accent {
  background-color: var(--store-accent);
  color: #ffffff;
  border-radius: ${theme.buttonStyle === "pill" ? "9999px" : theme.buttonStyle === "squared" ? "0" : "var(--store-radius)"};
}

.card {
  background-color: var(--store-card-bg);
  border-radius: var(--store-radius);
  ${theme.cardStyle === "elevated" ? "box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);" : ""}
  ${theme.cardStyle === "bordered" ? "border: 2px solid var(--store-text, #00000010);" : ""}
}
`;
}
