import { useThemeStore } from "../../lib/store/useThemeStore";

function ThemeButton() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="basic-border absolute top-1.5 right-1.5 cursor-pointer rounded-lg p-1 px-2"
    >
      {theme}
    </button>
  );
}
export default ThemeButton;
