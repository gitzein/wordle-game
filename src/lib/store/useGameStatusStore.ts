import { create } from "zustand";
import type { GameStatusType } from "../types";

type GameStatusStoreType = {
  gameStatus: GameStatusType;
  setGameStatus: (status: GameStatusType) => void;
  invalidAttempt: number;
  setInvalidAttempt: (n?: number) => void;
};

export const useGameStatusStore = create<GameStatusStoreType>()((set) => ({
  gameStatus: "playing",
  setGameStatus: (status) => set(() => ({ gameStatus: status })),
  invalidAttempt: 0,
  setInvalidAttempt: (n) =>
    set((state) => ({ invalidAttempt: n ?? state.invalidAttempt + 1 })),
}));
