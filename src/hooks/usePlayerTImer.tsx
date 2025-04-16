import { useEffect, useRef, useState } from "react";
import { statisticStore } from "../store/statisticStore";
import { gameStore } from "../store/gameStore";

export const usePlayerTimer = (playerKey: string, initialTime: number) => {
  
    const { currentPlayer } = gameStore();

    const { isStarted, winner, updatePlayer } = statisticStore();

    const [localTime, setLocalTime] = useState<number>(0);
    
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

    const isActive = (currentPlayer === playerKey) && isStarted;

 
    useEffect(() => {

        if (winner || !isStarted) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (localTime > 0) {
                updatePlayer(playerKey, {
                    time: initialTime + localTime,
                });
                setLocalTime(0);
            }
        }

        if (isActive) {
            intervalRef.current = setInterval(() => {
                setLocalTime((prev) => prev + 1);
            }, 1000);
        }  

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isActive, isStarted, winner]);


    return localTime;
};
