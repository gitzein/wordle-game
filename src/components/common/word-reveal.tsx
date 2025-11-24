import { BASE_ANIMATION_DELAY } from "../../lib/constants";

type PropsType = {
  word: string;
};

function WordReveal({ word }: PropsType) {
  return (
    <div className="fade-in-animate flex items-center justify-center gap-1 overflow-hidden transition-all">
      {word
        .toUpperCase()
        .split("")
        .map((v, i) => (
          <span
            key={v + i}
            style={{ animationDelay: (i + 1) * BASE_ANIMATION_DELAY + "ms" }}
            className="size-12 text-center text-3xl font-bold transition-all"
          >
            {v}
          </span>
        ))}
    </div>
  );
}
export default WordReveal;
