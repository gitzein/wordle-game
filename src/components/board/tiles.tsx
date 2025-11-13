import { useCallback, useEffect, useId, useState } from "react";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import Tile from "./tile";
import { checkAnswer } from "../../lib/utils";
import { useWordStore } from "../../lib/store/useWordStore";
import type { GuessedStatusType } from "../../lib/types";
import { WORDLE_LENGTH } from "../../lib/constants";

type PropsType = {
  attempt: number;
  index: number;
};

function Tiles({ attempt, index }: PropsType) {
  const [active, setActive] = useState(false);
  const [tilesStats, setTilesStats] = useState<Array<GuessedStatusType>>(
    Array(WORDLE_LENGTH[5]).fill("unused"),
  );
  const [text, setText] = useState("");
  const clearInput = useUserInputStore((state) => state.clearInput);
  const keyId = useId();
  const input = useUserInputStore((state) => state.input);
  const usedLetters = useUserInputStore((state) => state.usedLetters);
  const word = useWordStore((state) => state.word);

  const updateTilesStats = useCallback(() => {
    const newLettersStats = checkAnswer(text, word);
    for (let i = 0; i < text.length; i++) {
      usedLetters.set(text[i].toLowerCase(), newLettersStats[i]);
    }
    setTilesStats(newLettersStats);
    const win = newLettersStats.every((v) => v === "correct");
    if (win) {
      confirm("🎉 You won! 🎉 Play again?");
    }
    // console.log(text, word);
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
    <div className="flex items-center gap-2">
      {tilesStats.map((v, i) => (
        <Tile key={keyId + i} letter={text[i]} status={v} index={i} />
      ))}
    </div>
  );
}
export default Tiles;
