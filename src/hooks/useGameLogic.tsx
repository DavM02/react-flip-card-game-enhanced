import { useEffect, useState } from "react";
import { Level } from "../types/types";
import { gameStore } from "../store/gameStore";
import { statisticStore } from "../store/statisticStore";
 
const grid: Record<Level, number> = {
    easy: 16,
    medium: 36,
    hard: 64,
};

interface GameLogicReturn {
    selected: { i: number; path: number }[];
    flipped: number[];
    matches: number[];
    adjustTransition: boolean;
    setSelected: React.Dispatch<React.SetStateAction<{ i: number; path: number }[]>>;
    setAdjustTransition: React.Dispatch<React.SetStateAction<boolean>>;
    numberOfCells: number;
}

export const useGameLogic = (): GameLogicReturn => {
    const level = gameStore((state) => state.level);
    const pairNumber = gameStore((state) => state.pairNumber);
    const currentPlayer = gameStore((state) => state.currentPlayer);

    const updatePlayer = statisticStore((state) => state.updatePlayer);
    const setWinner = statisticStore((state) => state.setWinner);
    const numberOfCells = grid[level];

    const [selected, setSelected] = useState<{ i: number; path: number }[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matches, setMatches] = useState<number[]>([]);
    const [adjustTransition, setAdjustTransition] = useState<boolean>(false);


    useEffect(() => {
        if (selected.length === pairNumber) {
            const prevPlayer = statisticStore.getState().players[currentPlayer];
            updatePlayer(currentPlayer, {
                attempts: prevPlayer.attempts + 1,
            });

            const allMatch = selected.every((item) => item.path === selected[0].path);
            const indexes = selected.map((item) => item.i);

            setFlipped((prev) => [...prev, ...indexes]);

            const flipBack = setTimeout(() => {
                if (allMatch) {
                    setMatches((prev) => [...prev, ...indexes]);

                    const prevPlayer = statisticStore.getState().players[currentPlayer];
                    updatePlayer(currentPlayer, {
                        correctAttempts: prevPlayer.correctAttempts + 1,
                        points: prevPlayer.points + 1,
                    });

         
                } else {
                    setFlipped((prev) => prev.filter((idx) => !indexes.includes(idx)));

              
                    const nextPlayer = currentPlayer === "player-1" ? "player-2" : "player-1";
                    gameStore.getState().setCurrentPlayer(nextPlayer);
                }

                setSelected([]);
            }, 1000);

            return () => clearTimeout(flipBack);
        }
    }, [selected, pairNumber, currentPlayer, updatePlayer]);


 
    useEffect(() => {
        if (matches.length === numberOfCells) {
            const players = statisticStore.getState().players;

            const p1Points = players["player-1"].points;
            const p2Points = players["player-2"].points;

            const winnerKey = p1Points > p2Points ? "player-1"
                : p2Points > p1Points ? "player-2"
                    : "draw"; 

            if (winnerKey !== "draw") {
                const prevWins = players[winnerKey].wins;
                updatePlayer(winnerKey, { wins: prevWins + 1 });
                setWinner(winnerKey);
            } else {
                setWinner("draw"); 
            }
        }
    }, [matches, numberOfCells]);

   
    useEffect(() => {
        setMatches([]);
        setFlipped([]);
        setSelected([]);
        setAdjustTransition(false);
    }, [level, pairNumber]);

    return {
        selected,
        flipped,
        matches,
        adjustTransition,
        setSelected,
        setAdjustTransition,
        numberOfCells,
    };
};
