import Portal from "../Portal/Portal";
import SmoothWrapper from "../SmoothWrapper/SmoothWrapper";
import { AnimatePresence } from "framer-motion";
import './confrim.css'
import MainButton from "../Button/MainButton";

export default function Confirm() {
    // const context = useContext(GameContext);

    // if (!context) return null;

    // const { restart } = context.gameConfig.restartConfig;

    // const handleConfirm = () => {
    //     context.setGameConfig(prev => ({
    //         ...prev,
    //         character: null,
    //         pairNumber: prev.restartConfig.pairNumber,
    //         level: prev.restartConfig.level,
    //         restartConfig: { ...prev.restartConfig, restart: false },
    //     }));
    //     context.setStatistic((prev) => ({ ...prev, isStarted: false, time: 0 }))
    // };

    // const handleCancel = () => {
    //     context.setGameConfig(prev => ({
    //         ...prev,
    //         restartConfig: { ...prev.restartConfig, restart: false }
    //     }));
    // };

    return (
        <Portal>
            <AnimatePresence mode="wait">
                {restart && (
                    <>
                        <SmoothWrapper className="modal confirm">
                            <h3>
                                The game is currently in the process. <br />
                                Changing the configuration will reset the game.
                            </h3>
                            {/* <div className="buttons">
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
                            </div> */}
                        </SmoothWrapper>
                        <SmoothWrapper className="overlay" />
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
}
