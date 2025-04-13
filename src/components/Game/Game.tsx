import "./game.css";
import ChooseLevel from "../ChooseLevel/ChooseLevel";
import Board from "../Board/Board";
import StartGame from "../StartGame/StartGame";
import Confirm from "../ui/Confirm/Confirm";
import ChoosePairCount from "../ChoosePairCount/ChoosePairCount";
import Timer from "../Timer/Timer";
import Statistic from "../Statistic/Statistic";
import PlayersConfig from "../PlayersConfig/PlayersConfig";
import CoinAnimation from "../CoinAnimation/CoinAnimation";
const Game: React.FC = () => {


  return (
    <>
      <ChoosePairCount />
      <ChooseLevel />
      <StartGame />
      <Statistic />
      <Timer />
      {/* <Timer/>
      <Statistic/>
      <Confirm/> */}
    </>
  );
};

export default Game;
