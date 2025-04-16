import "./startGame.css";
import MainButton from "../ui/Button/MainButton";
import { statisticStore } from "../../store/statisticStore";
import CoinAnimation from "../CoinAnimation/CoinAnimation";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Portal from "../ui/Portal/Portal";
import SmoothWrapper from "../ui/SmoothWrapper/SmoothWrapper";
import { gameStore } from "../../store/gameStore";

const StartGame: React.FC = () => {

  const { isStarted, resetGameStats } = statisticStore()

  const [show, setShow] = useState<boolean>(false)

  const { setCurrentPlayer } = gameStore()
  
  const [transform, setTransform] = useState<number>(0)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)


  function spinTheCoin() {

    setShow(true)

    timeoutRef.current = setTimeout(() => {
      const number = Math.max(5, Math.floor(Math.random() * 20))
      const angle = number * 180

      setTransform(angle)

      if (number % 2 === 0) {
        setCurrentPlayer("player-1")
      } else {
        setCurrentPlayer("player-2")
      }

    }, 1000)
  }


  return (
    <>
      <div className="actions">
        <MainButton
          disabled={isStarted}
          onClick={spinTheCoin}
          colorVariant="blue"
          type="button"
        >
          start game
        </MainButton>
        <MainButton
          onClick={() => resetGameStats(true)}
          disabled={!isStarted}
          colorVariant="red"
          type="button"
        >
          reset game
        </MainButton>
      </div>
      <Portal>
        <AnimatePresence mode="wait">
          {show && <>
            <SmoothWrapper className="coin">
              <CoinAnimation
                transform={transform}
                closeModal={() => {
                  setShow(false)
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                  }
                }} />
            </SmoothWrapper>
            <SmoothWrapper className="overlay" />
          </>}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default StartGame;
