import { create } from "zustand";
import { Statistic } from "../types/types";

export const statisticStore = create<Statistic>((set) => ({
    winner: "",
    time: 0,
    isStarted: false,
    players: {
        "player-1": {
            name: "Sam",
            color: "green",
            attempts: 0,
            correctAttempts: 0,
            time: 0,
            isPaused: true,
            points: 0,
            wins: 0,
        },
        "player-2": {
            name: "Ann",
            color: "pink",
            attempts: 0,
            correctAttempts: 0,
            time: 0,
            isPaused: true,
            points: 0,
            wins: 0,
        }
    },
    updatePlayer: (playerKey, updates) => {
        set((state) => ({
            players: {
                ...state.players,
                [playerKey]: {
                    ...state.players[playerKey],
                    ...updates,
                },
            },
        }));
    },
    setIsStarted: (val) => {
        set({isStarted: val})
    },
    setWinner: (playerKey) => {
        set({ winner: playerKey });
    },
    setDuration: (time) => {
        set({time})
    }
}));