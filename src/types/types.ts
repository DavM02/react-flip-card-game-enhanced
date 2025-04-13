
export type Level = "easy" | "medium" | "hard";
export type PairNumber = 2 | 3 | 4;


// game

export interface GameConfig {

    currentPlayer: string,
    level: Level;
    pairNumber: PairNumber;
    restartConfig: {
        restart: boolean;
        level: Level;
        pairNumber: PairNumber;
    };
    setLevel: (level: Level) => void;
    setPairNumber: (pair: PairNumber) => void;
    setRestartConfig: (config: Partial<GameConfig["restartConfig"]>) => void;
    setCurrentPlayer: (name: string) => void;
};

// statistic

export interface Statistic {
    winner: string;
    time: number;
    isStarted: boolean;
    players: {
        [key: string]: {
            name: string,
            color: string,
            attempts: number;
            correctAttempts: number;
            time: number;
            isPaused: boolean,
            points: number,
            wins: number
        };
    };
    updatePlayer: (playerKey: string, updates: Partial<Statistic['players'][string]>) => void;
    setIsStarted: (val: boolean) => void,
    setWinner: (playerKey: string) => void;  
    setDuration: (time: number) => void;
    resetGameStats: (resetWins?: boolean) => void;
}