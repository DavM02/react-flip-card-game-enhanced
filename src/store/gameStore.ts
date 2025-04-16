import { create } from "zustand";
import { GameConfig } from "../types/GameConfig";

export const gameStore = create<GameConfig>((set) => ({
    level: "easy",
    currentPlayer: "",
    pairNumber: 2,
    restartConfig: {
        showRestartConfirmation: false,
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
    },
    resetGameConfig: () => {
        set((state) => (
            {
                currentPlayer: "",
                level: state.restartConfig.level,
                pairNumber: state.restartConfig.pairNumber,
                restartConfig: {
                    ...state.restartConfig,
                    showRestartConfirmation: false,
                },
            }
        ));
    }
}));