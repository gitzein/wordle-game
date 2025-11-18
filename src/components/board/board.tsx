import { useId } from "react";
import { ATTEMPT_AMOUNT } from "../../lib/constants";
import Tiles from "./tiles";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import { useWordStore } from "../../lib/store/useWordStore";

type PropsType = {
  // attempt: number;
};

function Board({}: PropsType) {
  const attempt = useUserInputStore((state) => state.attempt);
  const word = useWordStore((state) => state.word);
  return (
    <div className="flex flex-col gap-1">
      {Array(ATTEMPT_AMOUNT)
        .fill(0)
        .map((_v, i) => (
          <Tiles
            key={word + i}
            attempt={attempt}
            active={attempt === i}
            index={i}
          />
        ))}
    </div>
  );
}
export default Board;
