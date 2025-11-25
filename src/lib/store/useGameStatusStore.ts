import { create } from "zustand";
import type { GameStatusType } from "../types";

type GameStatusStoreType = {
  gameStatus: GameStatusType;
  setGameStatus: (status: GameStatusType) => void;
};

export const useGameStatusStore = create<GameStatusStoreType>()((set) => ({
  gameStatus: "playing",
  setGameStatus: (status) => set(() => ({ gameStatus: status })),
}));
