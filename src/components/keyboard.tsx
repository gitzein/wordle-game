import { DISPLAY_KEYS } from "../lib/constants";
import Keys from "./keys";

function Keyboard() {
  return (
    <div className="font-azeret-mono flex flex-col items-center space-y-2 text-xl">
      {DISPLAY_KEYS.map((v) => {
        return <Keys keys={v} />;
      })}
    </div>
  );
}
export default Keyboard;
