import { BASE_ANIMATION_DELAY } from "../../lib/constants";
import type { GuessedStatusType } from "../../lib/types";
import { cn } from "../../lib/utils";

type PropsType = {
  letter: string;
  status?: GuessedStatusType;
  index: number;
};

function Tile({ letter, status, index }: PropsType) {
  const transitionDelay = (index + 1) * BASE_ANIMATION_DELAY + "ms";

  return (
    <div
      style={{ transitionDelay }}
      className={cn(
        "flex size-12 items-center justify-center bg-slate-500/50",
        {
          "bg-misplaced-let": status === "misplaced",
        },
        {
          "bg-correct-let": status === "correct",
        },
        {
          "bg-wrong-let": status === "wrong",
        },
        {
          "grow-animate": letter,
        },
      )}
    >
      <span className="text-3xl font-bold">{letter}</span>
    </div>
  );
}
export default Tile;
