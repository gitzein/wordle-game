import Key from "./key";

type PropsType = {
  keys: string[];
};

function Keys({ keys }: PropsType) {
  return (
    <div className="flex items-center gap-2">
      {keys.map((v) => (
        <Key text={v} key={v} />
      ))}
    </div>
  );
}
export default Keys;
