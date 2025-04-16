import Portal from "../Portal/Portal";
import SmoothWrapper from "../SmoothWrapper/SmoothWrapper";
import { AnimatePresence } from "framer-motion";
import './confrim.css'
import MainButton from "../Button/MainButton";
import { statisticStore } from "../../../store/statisticStore";
import { gameStore } from "../../../store/gameStore";

export default function Confirm() {
    const { resetGameStats } = statisticStore();
    const { restartConfig, setRestartConfig, setLevel, setPairNumber, setCurrentPlayer } = gameStore();

    const handleConfirm = () => {
        setCurrentPlayer("");  
        setLevel(restartConfig.level);
        setPairNumber(restartConfig.pairNumber);
        setRestartConfig({ showRestartConfirmation: false });
        resetGameStats(true);  
    };

    const handleCancel = () => {
        setRestartConfig({ showRestartConfirmation: false }); 
    };

    return (
        <Portal>
            <AnimatePresence mode="wait">
                {restartConfig.showRestartConfirmation && (
                    <>
                        <SmoothWrapper className="modal confirm">
                            <h3>
                                The game is currently in the process. <br />
                                Changing the configuration will reset the game.
                            </h3>
                            <div className="buttons">
                                <MainButton
                                    onClick={handleConfirm}
                                    type="button"
                                    colorVariant="red"
                                >
                                    confirm
                                </MainButton>
                                <MainButton
                                    onClick={handleCancel}
                                    type="button"
                                    colorVariant="yellow"
                                >
                                    cancel
                                </MainButton>
                            </div>
                        </SmoothWrapper>
                        <SmoothWrapper className="overlay" />
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
}
