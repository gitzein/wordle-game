import { useCallback, useEffect, useId, useState } from "react";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import Tile from "./tile";
import { checkAnswer } from "../../lib/utils";
import { useWordStore } from "../../lib/store/useWordStore";
import type { GuessedStatusType } from "../../lib/types";
import {
  BASE_ANIMATION_DELAY,
  USED_LETTERS,
  WORDLE_LENGTH,
} from "../../lib/constants";

type PropsType = {
  attempt: number;
  index: number;
};

const initTilesStats: GuessedStatusType[] = Array(WORDLE_LENGTH[5]).fill(
  "unused",
);

function Tiles({ attempt, index }: PropsType) {
  const [active, setActive] = useState(false);
  const [tilesStats, setTilesStats] =
    useState<GuessedStatusType[]>(initTilesStats);
  const [text, setText] = useState("");
  const clearInput = useUserInputStore((state) => state.clearInput);
  const keyId = useId();
  const input = useUserInputStore((state) => state.input);
  const word = useWordStore((state) => state.word);

  const updateTilesStats = useCallback(() => {
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
    if (win) {
      setTimeout(
        () => {
          confirm("🎉 You won! 🎉 Play again?");
        },
        BASE_ANIMATION_DELAY * (WORDLE_LENGTH[5] + 2),
      );
    }
    console.log(text, word);
  }, [text, word]);

  useEffect(() => {
    if (attempt === index) {
      setActive(true);
      clearInput();
    } else {
      setActive(false);
    }
    if (attempt === index + 1) {
      updateTilesStats();
    }
  }, [attempt, index]);

  useEffect(() => {
    if (active) {
      setText(input);
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
