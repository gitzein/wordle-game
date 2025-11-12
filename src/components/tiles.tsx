import { useCallback, useEffect, useId, useState } from "react";
import { useUserInputStore } from "../lib/store/useUserInputStore";
import Tile from "./tile";
import { checkAnswer } from "../lib/utils";
import { useWordStore } from "../lib/store/useWordStore";
import type { GuessedStatusType } from "../lib/types";

type PropsType = {
  attempt: number;
  index: number;
};

function Tiles({ attempt, index }: PropsType) {
  const [active, setActive] = useState(false);
  const [tilesStats, setTilesStats] = useState<Array<GuessedStatusType>>(
    Array(5).fill("idle"),
  );
  const [text, setText] = useState("");
  const clearInput = useUserInputStore((state) => state.clearInput);
  const keyId = useId();
  const input = useUserInputStore((state) => state.input);
  const word = useWordStore((state) => state.word);

  const updateTilesStats = useCallback(() => {
    const newArr = checkAnswer(text, word);
    setTilesStats(newArr);
    console.log(text, word, newArr);
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
      {Array(5)
        .fill(0)
        .map((_v, i) => (
          <Tile
            key={keyId + i}
            letter={text[i]}
            status={tilesStats[i]}
            index={i}
          />
        ))}
    </div>
  );
}
export default Tiles;
