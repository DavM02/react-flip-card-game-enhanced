import { create } from "zustand";
import { GameConfig } from "../types/types";

export const gameStore = create<GameConfig>((set) => ({
    level: "easy",
    currentPlayer: "",
    pairNumber: 2,
    restartConfig: {
        restart: false,
        level: "easy",
        pairNumber: 2,
    },
    setLevel: (level) => {
        set({ level })
    },
    setRestartConfig: (config) => {
        set((state) => ({
            restartConfig: {
                ...state.restartConfig,
                ...config,
            },
        }));
    },
    setPairNumber: (pair) => {
        set({ pairNumber: pair })
    },
    setCurrentPlayer: (name)  => {
        set({currentPlayer: name})
    }
}));