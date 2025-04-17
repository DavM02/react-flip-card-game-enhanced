import "./game.css";
import ChooseLevel from "../ChooseLevel/ChooseLevel";
import StartGame from "../StartGame/StartGame";
import Confirm from "../ui/Confirm/Confirm";
import ChoosePairCount from "../ChoosePairCount/ChoosePairCount";
import Timer from "../Timer/Timer";
import Statistic from "../Statistic/Statistic";
import PlayerModal from "../PlayersConfig/PlayerModal";
const Game: React.FC = () => {


  return (
    <>
      <ChoosePairCount />
      <ChooseLevel />
      <StartGame />
      <PlayerModal/>
      <Statistic />
      <Timer />
      <Confirm /> 
    </>
  );
};

export default Game;
