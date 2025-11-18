import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  BASE_ANIMATION_DELAY,
  USED_LETTERS,
  WORDLE_LENGTH,
} from "../../lib/constants";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import { useWordStore } from "../../lib/store/useWordStore";
import type { GuessedStatusType } from "../../lib/types";
import { checkAnswer } from "../../lib/utils";
import Tile from "./tile";

type PropsType = {
  attempt: number;
  index: number;
  active: boolean;
};

const initTilesStats: GuessedStatusType[] = Array(WORDLE_LENGTH[5]).fill(
  "unused",
);

function Tiles({ attempt, index, active }: PropsType) {
  const [tilesStats, setTilesStats] =
    useState<GuessedStatusType[]>(initTilesStats);
  const [text, setText] = useState("");
  const keyId = useId();
  const input = useUserInputStore((state) => state.input);
  const word = useWordStore((state) => state.word);
  const textRef = useRef<string>("");

  const updateTilesStats = useCallback(
    (text: string) => {
      const newLettersStats = checkAnswer(text, word);
      for (let i = 0; i < text.length; i++) {
        USED_LETTERS.set(text[i].toLowerCase(), newLettersStats[i]);
      }
      setTilesStats((prev) => {
        return prev.map((v, i) =>
          v === "unused" ? newLettersStats[i] : prev[i],
        );
      });
      const win = newLettersStats.every((v) => v === "correct");
      console.log(newLettersStats);
      if (win) {
        setTimeout(
          () => {
            confirm("🎉 You won! 🎉 Play again?");
          },
          BASE_ANIMATION_DELAY * (WORDLE_LENGTH[5] + 2),
        );
      }

      // console.log(text, word);
    },
    [word, checkAnswer],
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
    <div className="shake-animate flex items-center gap-1 transition-colors">
      {tilesStats.map((v, i) => (
        <Tile key={keyId + i} letter={text[i]} status={v} index={i} />
      ))}
    </div>
  );
}
export default Tiles;
