import { useId } from "react";
import { DISPLAY_KEYS } from "../../lib/constants";
import Keys from "./keys";
import { useUserInputStore } from "../../lib/store/useUserInputStore";

type PropsType = {
  handleClick: (keyCode: string) => void;
};

function Keyboard({ handleClick }: PropsType) {
  const keyId = useId();
  const attempt = useUserInputStore((state) => state.attempt);

  return (
    <div className="font-azeret-mono mb-[15vh] flex flex-col items-center space-y-1.5 text-lg">
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
