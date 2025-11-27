import { USED_LETTERS } from "../../lib/constants";
import { useGameStatusStore } from "../../lib/store/useGameStatusStore";
import { useUserInputStore } from "../../lib/store/useUserInputStore";
import type { GameStatusType } from "../../lib/types";
import ResetButton from "./reset-button";
import WordReveal from "./word-reveal";

type PropsType = {
  gameStatus: GameStatusType;
  word: string;
};

function GameResult({ gameStatus, word }: PropsType) {
  const invalidAttempt = useGameStatusStore((state) => state.invalidAttempt);
  const attempt = useUserInputStore((state) => state.attempt);
  const letterUsed = USED_LETTERS.size;

  return (
    <>
      {gameStatus === "lose" && <WordReveal word={word} />}
      <p className="text-center text-2xl font-semibold">You {gameStatus}</p>
      <div className="flex flex-col">
        <p className="text-center font-semibold">Game Recap</p>
        <p>Attempt : {attempt}</p>
        <p>Invalid input : {invalidAttempt}</p>
        <p>Used letters : {letterUsed}</p>
      </div>
      <ResetButton text="Play again" />
    </>
  );
}
export default GameResult;
