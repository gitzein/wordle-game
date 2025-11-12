import { create } from "zustand";
import { pickWord } from "../utils";

type WordStoreType = {
  word: string;
  newWord: () => void;
};

export const useWordStore = create<WordStoreType>()((set) => ({
  word: pickWord(),
  newWord: () => set(() => ({ word: pickWord() })),
}));
