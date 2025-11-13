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
      className="basic-border absolute top-4 right-4 cursor-pointer rounded-lg p-2 px-3"
    >
      {theme}
    </button>
  );
}
export default ThemeButton;
