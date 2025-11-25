import type { GameStatusType } from "../../lib/types";
import ResetButton from "./reset-button";
import WordReveal from "./word-reveal";

type PropsType = {
  gameStatus: GameStatusType;
  word: string;
};

function GameResult({ gameStatus, word }: PropsType) {
  return (
    <>
      {gameStatus === "lose" && <WordReveal word={word} />}
      <p className="text-center text-xl font-semibold">You {gameStatus}</p>
      <ResetButton text="Play again?" />
    </>
  );
}
export default GameResult;
