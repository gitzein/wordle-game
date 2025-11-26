import { useEffect, useId, useState } from "react";
import { ATTEMPT_AMOUNT } from "../../lib/constants";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import Tiles from "./tiles";
import { useGameStatusStore } from "../../lib/store/useGameStatusStore";

type PropsType = {
  // attempt: number;
};

function Board({}: PropsType) {
  const [invalid, setInvalid] = useState(false);
  const attempt = useUserInputStore((state) => state.attempt);
  const invalidAttempt = useGameStatusStore((state) => state.invalidAttempt);
  const keyId = useId();

  useEffect(() => {
    if (invalidAttempt === 0) return;
    setInvalid(true);
    const to = setTimeout(() => {
      setInvalid(false);
    }, 750);
    return () => clearTimeout(to);
  }, [invalidAttempt]);

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
            invalid={invalid}
          />
        ))}
    </div>
  );
}
export default Board;
