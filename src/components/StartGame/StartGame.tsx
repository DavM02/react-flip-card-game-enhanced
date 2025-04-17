import "./startGame.css";
import MainButton from "../ui/Button/MainButton";
import { statisticStore } from "../../store/statisticStore";
import CoinAnimation from "../CoinAnimation/CoinAnimation";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Portal from "../ui/Portal/Portal";
import SmoothWrapper from "../ui/SmoothWrapper/SmoothWrapper";
import { gameStore } from "../../store/gameStore";

const StartGame: React.FC = () => {

  const { isStarted, resetGameStats } = statisticStore()

  const [show, setShow] = useState<boolean>(false)

  const { setCurrentPlayer } = gameStore()

  const [transform, setTransform] = useState<number>(0)


  function spinTheCoin() {

    const number = Math.max(10, Math.floor(Math.random() * 20))
    const angle = number * 180

    setTransform(angle)

    if (number % 2 === 0) {
      setCurrentPlayer("player-1")
    } else {
      setCurrentPlayer("player-2")
    }

  }

  return (
    <>
      <div className="actions">
        <MainButton
          disabled={isStarted}
          onClick={() => setShow(true)}
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
        <AnimatePresence mode="wait"
      
        >
          {show && <>
            <SmoothWrapper
              onAnimationComplete={(animation) => {
                if (typeof animation === 'object' && animation !== null && 'opacity' in animation) {
                  if (animation.opacity === 1) {
                    spinTheCoin();
                  }
                }
              }}
              className="coin">
              <CoinAnimation
                transform={transform}
                closeModal={() => {
                  setShow(false)
                  setTransform(0)
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
