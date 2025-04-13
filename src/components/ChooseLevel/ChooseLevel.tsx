import { gameStore } from "../../store/gameStore";
import { statisticStore } from "../../store/statisticStore";
import { Level } from "../../types/types";
import MainButton from "../ui/Button/MainButton";
import "./chooseLevel.css";

const ChooseLevel: React.FC = () => {

  const { level, setLevel, setRestartConfig } = gameStore()

  const { isStarted } = statisticStore()

  function handleLevelChange(level: Level): void {
    if (!isStarted) {
      setLevel(level);
    } else {
      setRestartConfig({
        restart: true,
        level,
      });
    }
  }

  return (
    <>
    <h3>Level:</h3>
      <div className="choose-level">
        <MainButton
          isActive={level === "easy"}
          onClick={() => handleLevelChange("easy")}
          type="button"
          colorVariant="green"
        >
          easy
        </MainButton>
        <MainButton
          isActive={level === "medium"}
          onClick={() => handleLevelChange("medium")}
          type="button"
          colorVariant="yellow"
        >
          medium
        </MainButton>
        <MainButton
          isActive={level === "hard"}
          onClick={() => handleLevelChange("hard")}
          type="button"
          colorVariant="red"
        >
          hard
        </MainButton>
      </div>
    </>
  );
};

export default ChooseLevel;
