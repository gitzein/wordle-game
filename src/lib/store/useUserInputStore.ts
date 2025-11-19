import { create } from "zustand";

type UserInputType = {
  input: string;
  setInput: (letter: string) => void;
  backspace: () => void;
  clearInput: () => void;
  attempt: number;
  setAttempt: (num?: number) => void;
  resetUserInputStore: () => void;
};

export const useUserInputStore = create<UserInputType>()(
  (set, _get, store) => ({
    input: "",
    attempt: 0,
    setInput: (letter) =>
      set((state) => ({ input: (state.input + letter).slice(0, 5) })),
    backspace: () =>
      set((state) => ({
        input: state.input.slice(0, state.input.length - 1),
      })),
    setAttempt: (num?: number) =>
      set((state) => ({ attempt: num ? num : state.attempt + 1 })),
    clearInput: () => set(() => ({ input: "" })),
    resetUserInputStore: () => set(store.getInitialState()),
  }),
);
