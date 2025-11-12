import { useCallback, useEffect, useRef } from "react";
import Board from "./components/board";
import Keyboard from "./components/keyboard";
import { useThemeStore } from "./lib/store/useThemeStore";
import { useUserInputStore } from "./lib/store/useUserInputStore";
import { isValidWord } from "./lib/utils";

function App() {
  const { theme, setTheme } = useThemeStore((state) => state);
  const { setInput, backspace, setAttempt, setUsedLetters } = useUserInputStore(
    (state) => state,
  );
  const inputRef = useRef<string>("");

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  const handleSubmit = useCallback((text: string) => {
    console.log(text);
    text = text.toLowerCase();
    const validInput = isValidWord(text);
    if (!validInput) {
      return alert("Not a valid word");
    }
    setUsedLetters(text.split(""));
    setAttempt();
    inputRef.current = "";
  }, []);

  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      const key = e.code;
      if (key.startsWith("Key")) {
        const letter = key[3];
        setInput(letter);
        inputRef.current = (inputRef.current + letter).slice(0, 5);
      }
      if (key === "Backspace") {
        backspace();
        inputRef.current = inputRef.current.slice(
          0,
          inputRef.current.length - 1,
        );
      }
      if (key === "Enter") {
        handleSubmit(inputRef.current);
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
