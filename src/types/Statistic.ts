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