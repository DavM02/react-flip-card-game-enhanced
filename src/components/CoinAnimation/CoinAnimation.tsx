import { useEffect, useState } from "react"
import { statisticStore } from "../../store/statisticStore"
import { gameStore } from "../../store/gameStore"
import './coinAnimation.css'

export default function CoinAnimation() {
    const { players, setIsStarted } = statisticStore()
    const { setCurrentPlayer } = gameStore()
    const [transform, setTransform] = useState<number>(0)

    function generateNumber() {
        return Math.max(5, Math.floor(Math.random() * 11))
    }
 
    useEffect(() => {
        const timeout = setTimeout(() => {
            const number = generateNumber()
            const angle = number * 180

            setTransform(angle)

            if (number % 2 === 0) {
                setCurrentPlayer("player-1")
                 
            } else {
                setCurrentPlayer("player-2")
             
            }
           
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="coin-inner"
            onTransitionEnd={() => {
                setIsStarted(true)
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
