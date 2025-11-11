import { create } from "zustand";

type UserInputType = {
  input: string;
  setInput: (letter: string) => void;
  backspace: () => void;
  attempt: number;
  usedLetters: Set<string>;
};

export const useUserInputStore = create<UserInputType>()((set) => ({
  input: "",
  attempt: 0,
  setInput: (letter) =>
    set((state) => ({ input: (state.input + letter).slice(0, 5) })),
  usedLetters: new Set<string>(),
  backspace: () =>
    set((state) => ({
      input: state.input.slice(0, state.input.length - 1),
    })),
}));
