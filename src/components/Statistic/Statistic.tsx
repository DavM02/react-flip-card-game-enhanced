import "./statistic.css";
import Portal from "../ui/Portal/Portal";
import SmoothWrapper from "../ui/SmoothWrapper/SmoothWrapper";
import { AnimatePresence } from "framer-motion";
import { statisticStore } from "../../store/statisticStore";
import MainButton from "../ui/Button/MainButton";

export default function Statistic() {
    const { winner, time, players } = statisticStore();

    return (
        <Portal>
            <AnimatePresence mode="wait">
                {winner && (
                    <>
                        <SmoothWrapper className="modal statistic">
                            <h2>
                                {
                                    winner === "draw"
                                        ? "It is a draw."
                                        : `${players[winner].name} won the game.`
                                }
                            </h2>

                            <p className="game-time"> Game Duration: {time}s</p>

                            <div className="players-statistic">
                                {Object.entries(players).map(([key, player]) => {
                                    const { name, color, attempts, correctAttempts, time, points, wins } = player;
                                    const accuracy = Math.round((correctAttempts / attempts) * 100)

                                    return (
                                        <div key={key} className="player-card" style={{ border: `1px solid ${color}` }}>
                                            <h3 style={{ color }}>{name}</h3>
                                            <p>Attempts: {attempts}</p>
                                            <p>Correct Matches: {correctAttempts}</p>
                                            <p>Accuracy: {accuracy}%</p>
                                            <p>Points: {points}</p>
                                            <p>Time: {time}s</p>
                                            <p>Total Wins: {wins}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <MainButton
                                type="button"
                                onClick={() => {
                            
                                  console.log('')
                                }}
                                colorVariant="violet"
                            >
                               play again
                            </MainButton>
                        </SmoothWrapper>
                        <SmoothWrapper className="overlay" />
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
}
