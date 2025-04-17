import { useEffect, useState, useMemo } from "react";
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
    setAdjustTransition: React.Dispatch<React.SetStateAction<boolean>>;
    numberOfCells: number;
    color: string;
    onCardClick: (card: { i: number; path: number }) => void;
}

export const useGameLogic = (): GameLogicReturn => {
    const { level, pairNumber, currentPlayer, setCurrentPlayer } = gameStore();
    const { isStarted, setWinner, updatePlayer } = statisticStore();

    const numberOfCells = grid[level];

    const [selected, setSelected] = useState<{ i: number; path: number }[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matches, setMatches] = useState<number[]>([]);
    const [adjustTransition, setAdjustTransition] = useState<boolean>(false);

    const onCardClick = (card: { i: number; path: number }) => {
        if (!isStarted) return;
        if (flipped.includes(card.i) || matches.includes(card.i)) return;
 
        if (selected.length === pairNumber) {
            setSelected([card]);
            setFlipped([card.i]);
            return;
        }

        setSelected((prev) => [...prev, card]);
        setFlipped((prev) => [...prev, card.i]);
    };

    useEffect(() => {
        if (!isStarted || selected.length !== pairNumber) return;

        const allMatch = selected.every((item) => item.path === selected[0].path);
        const indexes = selected.map((item) => item.i);
        const prevPlayer = statisticStore.getState().players[currentPlayer];

        updatePlayer(currentPlayer, { attempts: prevPlayer.attempts + 1 });

        if (allMatch) {
            setMatches((prev) => [...prev, ...indexes]);
            updatePlayer(currentPlayer, {
                correctAttempts: prevPlayer.correctAttempts + 1,
                points: prevPlayer.points + 1,
            });
        } else {
            const nextPlayer = currentPlayer === "player-1" ? "player-2" : "player-1";
            setTimeout(() => {
                setFlipped((prev) => prev.filter((i) => !indexes.includes(i)));
            }, 600); 
            setCurrentPlayer(nextPlayer);
        }

        setSelected([]);
    }, [selected]);

    const totalMatchedCells = useMemo(() => {
    return  Math.floor(numberOfCells / pairNumber) * pairNumber;
     }, [level, pairNumber]);

    useEffect(() => {
        if (isStarted && matches.length === totalMatchedCells) {
            const players = statisticStore.getState().players;
            const p1Points = players["player-1"].points;
            const p2Points = players["player-2"].points;

            const winnerKey = p1Points > p2Points ? "player-1" : p2Points > p1Points ? "player-2" : "draw";

            if (winnerKey !== "draw") {
                const prevWins = players[winnerKey].wins;
                updatePlayer(winnerKey, { wins: prevWins + 1 });
                setWinner(winnerKey);
                setCurrentPlayer("");
            } else {
                setWinner("draw");
                setCurrentPlayer("");
            }
        }
    }, [matches, numberOfCells, isStarted]);

    useEffect(() => {
        setMatches([]);
        setFlipped([]);
        setSelected([]);
        setAdjustTransition(false);
    }, [level, pairNumber, isStarted]);

    return {
        selected,
        flipped,
        matches,
        adjustTransition,
        setAdjustTransition,
        numberOfCells,
        color: statisticStore.getState().players[currentPlayer]?.color ?? "",
        onCardClick,
    };
};
