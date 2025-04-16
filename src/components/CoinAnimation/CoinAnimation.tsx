import { statisticStore } from "../../store/statisticStore"
import './coinAnimation.css'

interface CoinAnimationProps {
    closeModal: () => void,
    transform: number,
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({ closeModal, transform }) => {
    
    const { players, setIsStarted } = statisticStore()

    return (
        <div className="coin-inner"
            onTransitionEnd={() => {
                setIsStarted(true)
                closeModal()
            }}
            style={{ transform: `rotateY(${transform}deg)` }}>
            <div className="coin-front" style={{ backgroundColor: players["player-1"].color }}>
                <h3>{players["player-1"].name} <br /> is playing first</h3>
            </div>
            <div className="coin-back" style={{ backgroundColor: players["player-2"].color }}>
                <h3>{players["player-2"].name} <br /> is playing first</h3>
            </div>
        </div>
    )
}

export default CoinAnimation