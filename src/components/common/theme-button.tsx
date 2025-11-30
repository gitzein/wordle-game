import { type MouseEvent as ReactMouseEvent } from "react";
import { useThemeStore } from "../../lib/store/useThemeStore";
import { MoonIcon, SunIcon } from "lucide-react";

function ThemeButton() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const toggleTheme = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    (e.target as HTMLButtonElement).blur();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-1/2 right-2 flex translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg [&_svg]:size-7"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
export default ThemeButton;
