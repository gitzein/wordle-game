import { useId } from "react";
import { useUserInputStore } from "../lib/store/useUserInputStore";

type PropsType = {
  attempt: number;
  index: number;
};

function Tiles({ attempt, index }: PropsType) {
  const keyId = useId();
  const input = useUserInputStore((state) => state.input);
  const active = attempt === index;

  return (
    <div className="flex items-center gap-2">
      {Array(5)
        .fill(0)
        .map((_v, i) => (
          <div
            className="basic-border flex size-12 items-center justify-center"
            key={keyId + i}
          >
            {active && <span className="text-2xl font-bold">{input[i]}</span>}
          </div>
        ))}
    </div>
  );
}
export default Tiles;
