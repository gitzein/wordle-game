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
    <div className="basic-border rounded-md transition-none">
      <button
        onClick={handleButtonClick}
        style={{ transitionDelay }}
        className={cn(
          "cursor-pointer px-3 py-2 transition-colors",
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
        <span className="min-w-[1ch] transition-none">{text}</span>
      </button>
    </div>
  );
}
export default Key;
