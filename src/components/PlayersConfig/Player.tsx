import './playersConfig.css';
import { gameStore } from '../../store/gameStore';
import { Statistic } from '../../types/Statistic';
import { statisticStore } from '../../store/statisticStore';
import { usePlayerTimer } from '../../hooks/usePlayerTImer';
import { PlayerKey } from '../../types/types';

type PlayerType = Statistic['players'][string];

interface PlayerProps {
    playerKey: PlayerKey
    player: PlayerType;
}

const Player: React.FC<PlayerProps> = ({ player, playerKey }) => {

    const localtime = usePlayerTimer(playerKey, player.time)
 
    const { isStarted } = statisticStore();

    const {currentPlayer} = gameStore()

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
                <h3>{localtime}</h3>
            </div>
            <div>
                <h4>Wins:</h4>
                <h3>{player.wins}</h3>
            </div>

        </div>
    );
};

export default Player;
