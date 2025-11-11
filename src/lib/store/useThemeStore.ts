import { create } from "zustand";

type ThemeOptionType = "dark" | "light";

let initTheme: ThemeOptionType = "dark";

const isPrefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

if (isPrefersDarkTheme.matches) {
  initTheme = "dark";
}

type ThemeType = {
  theme: ThemeOptionType;
  setTheme: (theme: ThemeOptionType) => void;
};

export const useThemeStore = create<ThemeType>()((set) => ({
  theme: initTheme,
  setTheme: (theme) => set(() => ({ theme: theme })),
}));
