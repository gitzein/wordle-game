import { useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { USED_LETTERS } from "../../lib/constants";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import { useWordStore } from "../../lib/store/useWordStore";

function ResetButton() {
  const resetUserInputStore = useUserInputStore(
    (state) => state.resetUserInputStore,
  );
  const newWord = useWordStore((state) => state.newWord);

  const handleReset = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      (e.target as HTMLButtonElement).blur();
      resetUserInputStore();
      newWord();
      USED_LETTERS.clear();
    },
    [],
  );
  return (
    <button type="button" onClick={handleReset} className="cursor-pointer">
      reset
    </button>
  );
}
export default ResetButton;
