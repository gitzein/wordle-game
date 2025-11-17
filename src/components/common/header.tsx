import ThemeButton from "./theme-button";

function Header() {
  return (
    <header className="relative flex w-full items-center justify-center border-b-2 border-neutral-900 py-2 dark:border-neutral-200">
      <h1 className="text-2xl font-bold tracking-wide">Wordle Game</h1>

      <ThemeButton />
    </header>
  );
}
export default Header;
