import { useEffect, useState } from "react";
import { USED_LETTERS } from "../../lib/constants";
import type { GuessedStatusType } from "../../lib/types";
import Key from "./key";

//NOTE : attempt props just to trigger re-render & update each key's status (avoiding changing the key of this component since it will recreate new component and makes the transition-colors on 'Key' component won't happen)
type PropsType = {
  keys: {
    text: string;
    code: string;
  }[];
  attempt: number;
  handleClick: (keyCode: string) => void;
};

function Keys({ keys, handleClick, attempt }: PropsType) {
  const [keysStats, setkeysStats] = useState<
    Array<GuessedStatusType | undefined>
  >(Array(keys.length).fill("unused"));

  useEffect(() => {
    setkeysStats(keys.map((v) => USED_LETTERS.get(v.text.toLowerCase())));
  }, [attempt]);

  return (
    <div className="flex items-center gap-1 md:gap-1.5">
      {keys.map((v, i) => (
        <Key
          handleClick={handleClick}
          keyObj={v}
          key={v.text}
          status={keysStats[i]}
        />
      ))}
    </div>
  );
}
export default Keys;
