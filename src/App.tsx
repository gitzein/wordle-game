import { useCallback, useEffect, useRef } from "react";
import Board from "./components/board/board";
import Header from "./components/common/header";
import Keyboard from "./components/keyboard/keyboard";
import { useThemeStore } from "./lib/store/useThemeStore";
import { useUserInputStore } from "./lib/store/useUserInputStore";
import { isValidWord, throttle } from "./lib/utils";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setInput = useUserInputStore((state) => state.setInput);
  const backspace = useUserInputStore((state) => state.backspace);
  const setAttempt = useUserInputStore((state) => state.setAttempt);
  const attempt = useUserInputStore((state) => state.attempt);
  const inputRef = useRef<string>("");

  const handleSubmit = useCallback((text: string) => {
    text = text.toLowerCase();
    const validInput = isValidWord(text);
    if (!validInput) {
      return alert("Not a valid word");
    }
    setAttempt();
    inputRef.current = "";
  }, []);

  const throttledSubmit = throttle(() => handleSubmit(inputRef.current), 1000);

  const handleClick = useCallback((keyCode: string) => {
    if (keyCode.startsWith("Key")) {
      const letter = keyCode[3];
      setInput(letter);
      inputRef.current = (inputRef.current + letter).slice(0, 5);
    }
    if (keyCode === "Backspace") {
      backspace();
      inputRef.current = inputRef.current.slice(0, inputRef.current.length - 1);
    }
    if (keyCode === "Enter") {
      throttledSubmit();
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.code;
      handleClick(key);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div
        className={`${theme} flex min-h-screen flex-col items-center gap-4 bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200`}
      >
        <Header />
        <Board attempt={attempt} />
        <Keyboard attempt={attempt} handleClick={handleClick} />
      </div>
    </>
  );
}

export default App;
