import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Board from "./components/board/board";
import Confettis from "./components/common/confettis";
import GameResult from "./components/common/game-result";
import Header from "./components/common/header";
import Keyboard from "./components/keyboard/keyboard";
import { Toaster } from "./components/ui/sonner";
import { useGameStatusStore } from "./lib/store/useGameStatusStore";
import { useThemeStore } from "./lib/store/useThemeStore";
import { useUserInputStore } from "./lib/store/useUserInputStore";
import { useWordStore } from "./lib/store/useWordStore";
import { isValidWord, throttle } from "./lib/utils";

function App() {
  const [winCount, setWinCount] = useState(0);
  const theme = useThemeStore((state) => state.theme);
  const setInput = useUserInputStore((state) => state.setInput);
  const backspace = useUserInputStore((state) => state.backspace);
  const setAttempt = useUserInputStore((state) => state.setAttempt);
  const clearInput = useUserInputStore((state) => state.clearInput);
  const inputRef = useRef<string>("");
  const word = useWordStore((state) => state.word);
  const gameStatus = useGameStatusStore((state) => state.gameStatus);
  const setInvalidAttempt = useGameStatusStore(
    (state) => state.setInvalidAttempt,
  );

  const handleSubmit = useCallback((text: string) => {
    text = text.toLowerCase();
    const validInput = isValidWord(text);
    if (!validInput) {
      setInvalidAttempt();
      return toast.warning("Not a valid word");
    }
    setAttempt();
    clearInput();
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
    if (gameStatus === "playing") {
      document.addEventListener("keydown", onKeyDown);
    }
    if (gameStatus === "win") {
      setWinCount((prev) => prev + 1);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [gameStatus]);

  return (
    <>
      <div
        className={`${theme} flex min-h-screen flex-col items-center gap-4 bg-neutral-200 pb-[15vh] text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200`}
      >
        <Header />
        <Board key={word + "board"} />
        {gameStatus === "playing" ? (
          <Keyboard key={word + "keyboard"} handleClick={handleClick} />
        ) : (
          <GameResult gameStatus={gameStatus} word={word} />
        )}
      </div>
      {winCount > 0 && <Confettis key={winCount} />}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
