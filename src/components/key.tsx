type PropsType = {
  text: string;
};

function Key({ text }: PropsType) {
  return (
    <button className="basic-border cursor-pointer rounded-md px-3 py-2">
      <span className="min-w-[1ch]">{text}</span>
    </button>
  );
}
export default Key;
