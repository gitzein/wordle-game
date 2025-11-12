import { create } from "zustand";

type UserInputType = {
  input: string;
  setInput: (letter: string) => void;
  backspace: () => void;
  clearInput: () => void;
  attempt: number;
  setAttempt: () => void;
  usedLetters: Set<string>;
  setUsedLetters: (letters: string[]) => void;
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
  setAttempt: () => set((state) => ({ attempt: state.attempt + 1 })),
  clearInput: () => set(() => ({ input: "" })),
  setUsedLetters: (letters) =>
    set((state) => ({
      usedLetters: new Set([...state.usedLetters, ...letters]),
    })),
}));
