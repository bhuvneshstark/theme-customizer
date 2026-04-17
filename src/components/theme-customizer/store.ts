import { create } from "zustand";
import { ThemeConfig, ThemePreset } from "./types";
import { DEFAULT_THEME } from "./defaults";

interface ThemeStore {
  // Current theme configuration
  theme: ThemeConfig;

  // Theme presets
  presets: ThemePreset[];

  // UI state
  isExporting: boolean;
  isLoading: boolean;

  // Actions
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  applyPreset: (preset: ThemePreset) => void;
  loadPresets: () => Promise<void>;
  savePreset: (name: string) => Promise<void>;
  deletePreset: (id: string) => Promise<void>;
  setIsExporting: (v: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: { ...DEFAULT_THEME },
  presets: [],
  isExporting: false,
  isLoading: false,

  updateTheme: (updates) =>
    set((state) => ({
      theme: { ...state.theme, ...updates },
    })),

  resetTheme: () =>
    set({
      theme: { ...DEFAULT_THEME },
    }),

  applyPreset: (preset) =>
    set({
      theme: { ...preset.config },
    }),

  loadPresets: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/themes");
      if (res.ok) {
        const data = await res.json();
        set({ presets: data });
      }
    } catch {
      // Silently fail — presets are optional
    } finally {
      set({ isLoading: false });
    }
  },

  savePreset: async (name) => {
    const { theme } = get();
    try {
      const res = await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, config: theme }),
      });
      if (res.ok) {
        const preset = await res.json();
        set((state) => ({
          presets: [...state.presets, preset],
        }));
      }
    } catch {
      // Silently fail
    }
  },

  deletePreset: async (id) => {
    try {
      const res = await fetch(`/api/themes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== id),
        }));
      }
    } catch {
      // Silently fail
    }
  },

  setIsExporting: (v) => set({ isExporting: v }),
}));
