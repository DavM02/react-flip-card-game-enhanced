import React from 'react'
import './playersConfig.css'
import { gameStore } from '../../store/gameStore';
import { Statistic } from '../../types/types'
import PlayerModal from './PlayerModal';
import { statisticStore } from '../../store/statisticStore';
type PlayerType = Statistic['players'][string];

interface PlayerProps {
    playerKey: "player-1" | "player-2";  
    player: PlayerType;
}

const Player: React.FC<PlayerProps> = ({ player, playerKey }) => {

    const { currentPlayer } = gameStore()
    const { isStarted } = statisticStore()

    return (
        <div className='player'
            style={{
                border: `1.5px solid ${player.color}`,
                opacity: currentPlayer === playerKey ? "1" : isStarted ? "0.4" : "1",
            }}>
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
                <h3>{player.time}</h3>
            </div>
            <div>
                <h4>Wins:</h4>
                <h3>{player.wins}</h3>
            </div>
            <PlayerModal />
        </div>
    )
}

export default Player
