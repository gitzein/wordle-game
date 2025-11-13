import { useId } from "react";
import { ATTEMPT_AMOUNT } from "../../lib/constants";
import Tiles from "./tiles";

type PropsType = {
  attempt: number;
};

function Board({ attempt }: PropsType) {
  const keyId = useId();

  return (
    <div className="flex flex-col gap-2">
      {Array(ATTEMPT_AMOUNT)
        .fill(0)
        .map((_v, i) => (
          <Tiles key={keyId + i} attempt={attempt} index={i} />
        ))}
    </div>
  );
}
export default Board;
