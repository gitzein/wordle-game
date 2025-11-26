import { useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { USED_LETTERS } from "../../lib/constants";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import { useWordStore } from "../../lib/store/useWordStore";
import { useGameStatusStore } from "../../lib/store/useGameStatusStore";

type PropsType = {
  text: string;
};

function ResetButton({ text }: PropsType) {
  const setGameStatus = useGameStatusStore((state) => state.setGameStatus);
  const setInvalidAttempt = useGameStatusStore(
    (state) => state.setInvalidAttempt,
  );
  const resetUserInputStore = useUserInputStore(
    (state) => state.resetUserInputStore,
  );
  const newWord = useWordStore((state) => state.newWord);

  const handleReset = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      (e.target as HTMLButtonElement).blur();
      resetUserInputStore();
      setInvalidAttempt(0);
      newWord();
      setGameStatus("playing");
      USED_LETTERS.clear();
    },
    [],
  );
  return (
    <button
      type="button"
      onClick={handleReset}
      className="basic-border cursor-pointer rounded-3xl px-4 py-1"
    >
      {text}
    </button>
  );
}
export default ResetButton;
