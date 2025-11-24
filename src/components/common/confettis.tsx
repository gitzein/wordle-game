import Confetti from "react-confetti-boom";

function Confettis() {
  return (
    <>
      <Confetti x={0} deg={315} launchSpeed={1.3} />
      <Confetti x={1} deg={225} launchSpeed={1.3} />
    </>
  );
}
export default Confettis;
