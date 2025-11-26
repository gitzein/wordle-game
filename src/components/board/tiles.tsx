import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ATTEMPT_AMOUNT,
  BASE_ANIMATION_DELAY,
  USED_LETTERS,
  WORDLE_LENGTH,
} from "../../lib/constants";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import { useWordStore } from "../../lib/store/useWordStore";
import type { GuessedStatusType } from "../../lib/types";
import { checkAnswer, cn } from "../../lib/utils";
import Tile from "./tile";
import { useGameStatusStore } from "../../lib/store/useGameStatusStore";

type PropsType = {
  attempt: number;
  index: number;
  active: boolean;
  invalid: boolean;
};

const initTilesStats: GuessedStatusType[] = Array(WORDLE_LENGTH[5]).fill(
  "unused",
);

function Tiles({ attempt, index, active, invalid }: PropsType) {
  const [tilesStats, setTilesStats] =
    useState<GuessedStatusType[]>(initTilesStats);
  const [text, setText] = useState("");
  const keyId = useId();
  const setGameStatus = useGameStatusStore((state) => state.setGameStatus);

  const input = useUserInputStore((state) => state.input);
  const word = useWordStore((state) => state.word);
  const textRef = useRef<string>("");

  const updateTilesStats = useCallback(
    (text: string) => {
      const newLettersStats = checkAnswer(text, word);
      for (let i = 0; i < text.length; i++) {
        const prevState = USED_LETTERS.get(text[i].toLowerCase());
        if (prevState !== "correct") {
          USED_LETTERS.set(text[i].toLowerCase(), newLettersStats[i]);
        }
      }
      setTilesStats((prev) => {
        return prev.map((v, i) =>
          v === "unused" ? newLettersStats[i] : prev[i],
        );
      });
      const win = newLettersStats.every((v) => v === "correct");
      if (win) {
        setTimeout(
          () => {
            setGameStatus("win");
          },
          BASE_ANIMATION_DELAY * (WORDLE_LENGTH[5] + 2),
        );
      } else if (index === ATTEMPT_AMOUNT - 1) {
        setGameStatus("lose");
      }
    },
    [word, index, checkAnswer, setGameStatus],
  );

  useEffect(() => {
    if (attempt === index + 1) {
      updateTilesStats(textRef.current);
    }
  }, [attempt, index]);

  useEffect(() => {
    if (active) {
      setText(input);
      textRef.current = input;
    }
  }, [input, active]);

  return (
    <div
      className={cn("flex items-center gap-1 transition-colors", {
        "shake-animate": invalid && active,
      })}
    >
      {tilesStats.map((v, i) => (
        <Tile key={keyId + i} letter={text[i]} status={v} index={i} />
      ))}
    </div>
  );
}
export default Tiles;
