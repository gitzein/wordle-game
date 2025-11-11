import { useId } from "react";
import Tiles from "./tiles";
import { useUserInputStore } from "../lib/store/useUserInputStore";

function Board() {
  const keyId = useId();
  const attempt = useUserInputStore((state) => state.attempt);

  return (
    <div className="flex flex-col gap-2">
      {Array(6)
        .fill(0)
        .map((_v, i) => (
          <Tiles key={keyId + i} attempt={attempt} index={i} />
        ))}
    </div>
  );
}
export default Board;
