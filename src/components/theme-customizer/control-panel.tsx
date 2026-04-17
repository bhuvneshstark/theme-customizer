"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Store,
  Palette,
  Type,
  LayoutGrid,
  MousePointerClick,
  BookmarkPlus,
  RotateCcw,
  Trash2,
  Check,
} from "lucide-react";
import { useThemeStore } from "./store";
import { FONT_OPTIONS, PRESET_THEMES } from "./defaults";
import { cn } from "@/lib/utils";

// ─── Color Swatch Picker ─────────────────────────────────────
function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [inputVal, setInputVal] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  const handleHexInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setInputVal(v);
      if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        onChange(v);
      }
    },
    [onChange]
  );

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="relative size-8 shrink-0 rounded-md border border-border shadow-sm transition-shadow hover:shadow-md"
        style={{ backgroundColor: value }}
        onClick={() => inputRef.current?.click()}
        aria-label={`Pick ${label} color`}
      >
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setInputVal(e.target.value);
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
          tabIndex={-1}
        />
      </button>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <Label className="text-xs text-muted-foreground truncate">
          {label}
        </Label>
        <Input
          value={inputVal}
          onChange={handleHexInput}
          className="h-7 text-xs font-mono px-2"
          maxLength={7}
        />
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────
function Section({
  icon: Icon,
  title,
  children,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="hover:no-underline py-3 group">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary shrink-0">
            <Icon className="size-3.5" />
          </div>
          <span className="font-medium text-sm">{title}</span>
          {badge && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {badge}
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3 pl-1">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ─── Main Control Panel ───────────────────────────────────────
export function ControlPanel() {
  const { theme, updateTheme, resetTheme, presets, savePreset, deletePreset, loadPresets } =
    useThemeStore();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    loadPresets();
  }, [loadPresets]);

  const handleSavePreset = async () => {
    if (!presetName.trim()) return;
    await savePreset(presetName.trim());
    setPresetName("");
    setSaveDialogOpen(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {/* Preset Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <BookmarkPlus className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Quick Presets</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_THEMES.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => useThemeStore.getState().applyPreset({ name: preset.name, config: preset.config })}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <Accordion
          type="multiple"
          defaultValue={["Brand", "Colors", "Typography", "Layout", "Buttons"]}
          className="w-full"
        >
          {/* ── Brand ── */}
          <Section icon={Store} title="Brand">
            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="text-xs">Store Name</Label>
                <Input
                  value={theme.storeName}
                  onChange={(e) => updateTheme({ storeName: e.target.value })}
                  placeholder="Your Store"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tagline</Label>
                <Input
                  value={theme.storeTagline}
                  onChange={(e) =>
                    updateTheme({ storeTagline: e.target.value })
                  }
                  placeholder="Your tagline"
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </Section>

          {/* ── Colors ── */}
          <Section icon={Palette} title="Colors">
            <div className="grid grid-cols-2 gap-3">
              <ColorPicker
                label="Primary"
                value={theme.primaryColor}
                onChange={(v) =>
                  updateTheme({
                    primaryColor: v,
                    headerColor: theme.headerStyle !== "minimal" ? v : theme.headerColor,
                  })
                }
              />
              <ColorPicker
                label="Secondary"
                value={theme.secondaryColor}
                onChange={(v) => updateTheme({ secondaryColor: v })}
              />
              <ColorPicker
                label="Accent"
                value={theme.accentColor}
                onChange={(v) => updateTheme({ accentColor: v })}
              />
              <ColorPicker
                label="Background"
                value={theme.backgroundColor}
                onChange={(v) => updateTheme({ backgroundColor: v })}
              />
              <ColorPicker
                label="Text"
                value={theme.textColor}
                onChange={(v) => updateTheme({ textColor: v })}
              />
              <ColorPicker
                label="Card BG"
                value={theme.cardBackgroundColor}
                onChange={(v) => updateTheme({ cardBackgroundColor: v })}
              />
              <ColorPicker
                label="Hero From"
                value={theme.heroGradientFrom}
                onChange={(v) => updateTheme({ heroGradientFrom: v })}
              />
              <ColorPicker
                label="Hero To"
                value={theme.heroGradientTo}
                onChange={(v) => updateTheme({ heroGradientTo: v })}
              />
            </div>
          </Section>

          {/* ── Typography ── */}
          <Section icon={Type} title="Typography">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Heading Font</Label>
                <Select
                  value={theme.headingFont}
                  onValueChange={(v) => updateTheme({ headingFont: v })}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        <span style={{ fontFamily: f.value }}>{f.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Body Font</Label>
                <Select
                  value={theme.bodyFont}
                  onValueChange={(v) => updateTheme({ bodyFont: v })}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        <span style={{ fontFamily: f.value }}>{f.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs">Base Font Size</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {theme.baseFontSize}px
                  </span>
                </div>
                <Slider
                  value={[theme.baseFontSize]}
                  onValueChange={([v]) => updateTheme({ baseFontSize: v })}
                  min={12}
                  max={22}
                  step={1}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs">Heading Weight</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {theme.headingWeight}
                  </span>
                </div>
                <Slider
                  value={[theme.headingWeight]}
                  onValueChange={([v]) => updateTheme({ headingWeight: v })}
                  min={300}
                  max={900}
                  step={100}
                />
              </div>
            </div>
          </Section>

          {/* ── Layout ── */}
          <Section icon={LayoutGrid} title="Layout">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Grid Columns</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[2, 3, 4].map((cols) => (
                    <Button
                      key={cols}
                      variant={theme.gridColumns === cols ? "default" : "outline"}
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => updateTheme({ gridColumns: cols })}
                    >
                      {cols} cols
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Card Style</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["flat", "elevated", "bordered"] as const).map((style) => (
                    <Button
                      key={style}
                      variant={
                        theme.cardStyle === style ? "default" : "outline"
                      }
                      size="sm"
                      className="h-8 text-xs capitalize"
                      onClick={() => updateTheme({ cardStyle: style })}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Header Style</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["centered", "split", "minimal"] as const).map((style) => (
                    <Button
                      key={style}
                      variant={
                        theme.headerStyle === style ? "default" : "outline"
                      }
                      size="sm"
                      className="h-8 text-xs capitalize"
                      onClick={() => updateTheme({ headerStyle: style })}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs">Border Radius</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {theme.borderRadius}px
                  </span>
                </div>
                <Slider
                  value={[theme.borderRadius]}
                  onValueChange={([v]) => updateTheme({ borderRadius: v })}
                  min={0}
                  max={24}
                  step={1}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs">Section Spacing</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {theme.sectionSpacing}px
                  </span>
                </div>
                <Slider
                  value={[theme.sectionSpacing]}
                  onValueChange={([v]) => updateTheme({ sectionSpacing: v })}
                  min={24}
                  max={96}
                  step={4}
                />
              </div>
            </div>
          </Section>

          {/* ── Buttons ── */}
          <Section icon={MousePointerClick} title="Buttons">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Button Shape</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["rounded", "squared", "pill"] as const).map((style) => (
                    <Button
                      key={style}
                      variant={
                        theme.buttonStyle === style ? "default" : "outline"
                      }
                      size="sm"
                      className={cn("h-8 text-xs capitalize", style === "pill" && "!rounded-full")}
                      onClick={() => updateTheme({ buttonStyle: style })}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Button Variant</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["filled", "outlined", "ghost"] as const).map((variant) => (
                    <Button
                      key={variant}
                      variant={
                        theme.buttonVariant === variant ? "default" : "outline"
                      }
                      size="sm"
                      className="h-8 text-xs capitalize"
                      onClick={() => updateTheme({ buttonVariant: variant })}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
              {/* Live button preview */}
              <div className="pt-1">
                <Label className="text-xs text-muted-foreground">Preview</Label>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 text-sm font-medium transition-all"
                    style={{
                      backgroundColor:
                        theme.buttonVariant === "filled"
                          ? theme.primaryColor
                          : "transparent",
                      color:
                        theme.buttonVariant === "filled"
                          ? "#ffffff"
                          : theme.primaryColor,
                      border:
                        theme.buttonVariant === "outlined"
                          ? `2px solid ${theme.primaryColor}`
                          : "2px solid transparent",
                      borderRadius:
                        theme.buttonStyle === "pill"
                          ? "9999px"
                          : theme.buttonStyle === "squared"
                            ? "0px"
                            : `${theme.borderRadius}px`,
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium transition-all"
                    style={{
                      backgroundColor: theme.accentColor,
                      color: "#ffffff",
                      borderRadius:
                        theme.buttonStyle === "pill"
                          ? "9999px"
                          : theme.buttonStyle === "squared"
                            ? "0px"
                            : `${theme.borderRadius}px`,
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </Accordion>

        <Separator />

        {/* ── Save / Reset / Saved Presets ── */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1.5">
                  {justSaved ? (
                    <>
                      <Check className="size-3.5" /> Saved
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="size-3.5" /> Save Preset
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Save Theme Preset</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 pt-2">
                  <Input
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="Preset name..."
                    onKeyDown={(e) => e.key === "Enter" && handleSavePreset()}
                  />
                  <Button
                    onClick={handleSavePreset}
                    disabled={!presetName.trim()}
                    className="w-full"
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs gap-1.5"
              onClick={resetTheme}
            >
              <RotateCcw className="size-3.5" /> Reset
            </Button>
          </div>

          {presets.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Saved Presets ({presets.length})
              </Label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {presets.map((preset) => (
                  <div
                    key={preset.id}
                    className="flex items-center justify-between gap-2 rounded-md border bg-card px-3 py-2"
                  >
                    <button
                      className="text-sm font-medium truncate hover:underline flex-1 text-left"
                      onClick={() =>
                        useThemeStore.getState().applyPreset(preset)
                      }
                    >
                      {preset.name}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 p-0 text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => preset.id && deletePreset(preset.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
