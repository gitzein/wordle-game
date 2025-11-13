import { BASE_ANIMATION_DELAY } from "../../lib/constants";
import type { GuessedStatusType } from "../../lib/types";
import { cn } from "../../lib/utils";

type PropsType = {
  letter: string;
  status?: GuessedStatusType;
  index: number;
};

function Tile({ letter, status, index }: PropsType) {
  const transitionDelay =
    status === "unused" ? "0ms" : (index + 1) * BASE_ANIMATION_DELAY + "ms";

  return (
    <div
      style={{ transitionDelay }}
      className={cn(
        "basic-border flex size-12 items-center justify-center transition-colors",
        {
          "bg-yellow-500/70": status === "misplaced",
        },
        {
          "bg-green-500/70": status === "correct",
        },
        {
          "bg-rose-500/70": status === "wrong",
        },
      )}
    >
      <span className="text-2xl font-bold">{letter}</span>
    </div>
  );
}
export default Tile;
