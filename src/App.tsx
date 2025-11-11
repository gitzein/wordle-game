import { useCallback, useEffect } from "react";
import Keyboard from "./components/keyboard";
import { useThemeStore } from "./lib/store/useThemeStore";
import Board from "./components/board";
import { useUserInputStore } from "./lib/store/useUserInputStore";
import { pickWord } from "./lib/utils";

function App() {
  const { theme, setTheme } = useThemeStore((state) => state);
  const { setInput, backspace } = useUserInputStore((state) => state);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      const key = e.code;
      if (key.startsWith("Key")) {
        const letter = key[3];
        setInput(letter);
      }
      if (key === "Backspace") {
        backspace();
      }
    };

    document.addEventListener("keydown", handleTyping);

    return () => document.removeEventListener("keydown", handleTyping);
  }, []);

  return (
    <>
      <div
        className={`${theme} flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200`}
      >
        <h1 className="text-2xl font-bold tracking-wide">Wordle Game</h1>
        <Board />
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
