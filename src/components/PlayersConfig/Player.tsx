import React, { useEffect, useRef, useState } from 'react';
import './playersConfig.css';
import { gameStore } from '../../store/gameStore';
import { Statistic } from '../../types/types';
import PlayerModal from './PlayerModal';
import { statisticStore } from '../../store/statisticStore';

type PlayerType = Statistic['players'][string];

interface PlayerProps {
    playerKey: "player-1" | "player-2";
    player: PlayerType;
}

const Player: React.FC<PlayerProps> = ({ player, playerKey }) => {
    const { currentPlayer } = gameStore();
    const { isStarted, winner, updatePlayer } = statisticStore();

    
    const [localTime, setLocalTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const isActive = currentPlayer === playerKey && isStarted;

 
    useEffect(() => {

        if (winner || !isStarted) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (localTime > 0) {
                updatePlayer(playerKey, {
                    time: player.time + localTime,
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



    return (
        <div
            className="player"
            style={{
                border: `1.5px solid ${player.color}`,
                opacity: currentPlayer === playerKey ? "1" : isStarted ? "0.4" : "1",
            }}
        >
            <div>
                <h4>Player:</h4>
                <h3>{player.name}</h3>
            </div>
            <div>
                <h4>Points:</h4>
                <h3>{player.points}</h3>
            </div>
            <div>
                <h4>Time:</h4>
                <h3>{localTime}</h3>
            </div>
            <div>
                <h4>Wins:</h4>
                <h3>{player.wins}</h3>
            </div>
            <PlayerModal />
        </div>
    );
};

export default Player;
