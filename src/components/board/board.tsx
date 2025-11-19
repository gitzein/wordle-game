import { useId } from "react";
import { ATTEMPT_AMOUNT } from "../../lib/constants";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import Tiles from "./tiles";

type PropsType = {
  // attempt: number;
};

function Board({}: PropsType) {
  const attempt = useUserInputStore((state) => state.attempt);
  const keyId = useId();

  return (
    <div className="flex flex-col gap-1">
      {Array(ATTEMPT_AMOUNT)
        .fill(0)
        .map((_v, i) => (
          <Tiles
            key={keyId + i}
            attempt={attempt}
            active={attempt === i}
            index={i}
          />
        ))}
    </div>
  );
}
export default Board;
