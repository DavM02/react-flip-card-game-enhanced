import { Level, PairNumber } from "./types";

export interface GameConfig {
    currentPlayer: string,
    level: Level;
    pairNumber: PairNumber;
    restartConfig: {
        showRestartConfirmation: boolean;
        level: Level;
        pairNumber: PairNumber;
    };
    setLevel: (level: Level) => void;
    setPairNumber: (pair: PairNumber) => void;
    setRestartConfig: (config: Partial<GameConfig["restartConfig"]>) => void;
    setCurrentPlayer: (name: string) => void;
    resetGameConfig: () => void
};