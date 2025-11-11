import { useCallback } from "react";
import Keyboard from "./components/keyboard";
import { useThemeStore } from "./lib/store/useThemeStore";

function App() {
  const { theme, setTheme } = useThemeStore((state) => state);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <>
      <div
        className={`${theme} flex h-screen flex-col items-center justify-center gap-4 bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200`}
      >
        <h1 className="text-4xl font-bold tracking-wide">Wordle Game</h1>
        <button
          onClick={toggleTheme}
          className="basic-border absolute top-4 right-4 cursor-pointer rounded-lg p-2 px-3"
        >
          {theme}
        </button>
        <Keyboard />
      </div>
    </>
  );
}

export default App;
