import { useId } from "react";
import { DISPLAY_KEYS } from "../../lib/constants";
import Keys from "./keys";

type PropsType = {
  handleClick: (keyCode: string) => void;
  attempt: number;
};

function Keyboard({ handleClick, attempt }: PropsType) {
  const keyId = useId();

  return (
    <div className="font-azeret-mono flex flex-col items-center space-y-2 text-lg">
      {DISPLAY_KEYS.map((v, i) => {
        return (
          <Keys
            handleClick={handleClick}
            keys={v}
            key={keyId + i}
            attempt={attempt}
          />
        );
      })}
    </div>
  );
}
export default Keyboard;
