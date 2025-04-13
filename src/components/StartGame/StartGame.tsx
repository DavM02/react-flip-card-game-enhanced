import "./startGame.css";

import MainButton from "../ui/Button/MainButton";
import { statisticStore } from "../../store/statisticStore";
import CoinAnimation from "../CoinAnimation/CoinAnimation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Portal from "../ui/Portal/Portal";
import SmoothWrapper from "../ui/SmoothWrapper/SmoothWrapper";
const StartGame: React.FC = () => {

  const { isStarted } = statisticStore()

  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (isStarted) {
      setShow(false)
    }
  }, [isStarted])

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
          onClick={() => console.log("")}
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
              <CoinAnimation />
            </SmoothWrapper>
            <SmoothWrapper className="overlay" />
          </>}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default StartGame;
