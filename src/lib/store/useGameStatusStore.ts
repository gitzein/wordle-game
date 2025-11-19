import { create } from "zustand";

type GameStatusType = "playing" | "win" | "lose";

type GameStatusStoreType = {
  gameStatus: GameStatusType;
  setGameStatus: (status: GameStatusType) => void;
};

export const useGameStatusStore = create<GameStatusStoreType>()((set) => ({
  gameStatus: "playing",
  setGameStatus: (status) => set(() => ({ gameStatus: status })),
}));
