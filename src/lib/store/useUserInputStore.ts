import { create } from "zustand";
import type { GuessedStatusType } from "../types";

type UserInputType = {
  input: string;
  setInput: (letter: string) => void;
  backspace: () => void;
  clearInput: () => void;
  attempt: number;
  setAttempt: () => void;
  usedLetters: Map<string, GuessedStatusType>;
};

// const usedLettersMap = new Map<string, GuessedStatusType>();
// Array.from({ length: 26 }, (_v, i) => String.fromCharCode(97 + i)).forEach(
//   (v) => usedLettersMap.set(v, "unused"),
// );

export const useUserInputStore = create<UserInputType>()((set) => ({
  input: "",
  attempt: 0,
  setInput: (letter) =>
    set((state) => ({ input: (state.input + letter).slice(0, 5) })),
  usedLetters: new Map(),
  backspace: () =>
    set((state) => ({
      input: state.input.slice(0, state.input.length - 1),
    })),
  setAttempt: () => set((state) => ({ attempt: state.attempt + 1 })),
  clearInput: () => set(() => ({ input: "" })),
}));
