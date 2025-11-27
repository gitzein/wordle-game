import { useCallback } from "react";
import { BASE_ANIMATION_DELAY, WORDLE_LENGTH } from "../../lib/constants";
import type { GuessedStatusType } from "../../lib/types";
import { cn } from "../../lib/utils";

type PropsType = {
  keyObj: {
    text: string;
    code: string;
  };
  status?: GuessedStatusType;
  handleClick: (keyCode: string) => void;
};

const transitionDelay = BASE_ANIMATION_DELAY * (WORDLE_LENGTH[5] + 1) + "ms";

function Key({ keyObj: { code, text }, status, handleClick }: PropsType) {
  const handleButtonClick = useCallback(() => {
    handleClick(code);
  }, [text, handleClick]);

  return (
    <button
      onClick={handleButtonClick}
      style={{ transitionDelay }}
      className={cn(
        "cursor-pointer rounded-xs bg-slate-500/50 px-2 py-3 transition-colors md:px-3 md:py-4",
        {
          "bg-misplaced-let": status === "misplaced",
        },
        {
          "bg-correct-let": status === "correct",
        },
        {
          "bg-wrong-let": status === "wrong",
        },
      )}
    >
      <span
        className={cn("text-base font-semibold md:text-xl md:font-bold", {
          "text-xs md:text-xs": text.length > 1,
        })}
      >
        {text}
      </span>
    </button>
  );
}
export default Key;
