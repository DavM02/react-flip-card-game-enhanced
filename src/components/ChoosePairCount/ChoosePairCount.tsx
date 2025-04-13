import { gameStore } from "../../store/gameStore";
import { statisticStore } from "../../store/statisticStore";
import MainButton from "../ui/Button/MainButton";
import './choosePair.css'
import { PairNumber } from "../../types/types";
export default function ChoosePairCount() {
 
 

    const { pairNumber, setPairNumber, setRestartConfig } = gameStore()
    const { isStarted } = statisticStore()
    console.log(pairNumber)
      
    function handlePairChange(pairNumber: PairNumber): void {
        if (!isStarted) {
            setPairNumber(pairNumber)

        } else {
            setRestartConfig({
                restart: true,
                pairNumber
            })
        }
    
      }

    return <>
        <h3>Pair count:</h3>
        <div className="choose-pair-count">
            <MainButton
                onClick={() => handlePairChange(2)}
                type="button"
                colorVariant="green"
                isActive={pairNumber === 2}
            >
                2
            </MainButton>
            <MainButton
                onClick={() => handlePairChange(3)}
                type="button"
                colorVariant="yellow"
                isActive={pairNumber === 3}
            >
                3
            </MainButton>
            <MainButton
                onClick={() => handlePairChange(4)}
                type="button"
                colorVariant="red"
                isActive={pairNumber === 4}
            >
                4
            </MainButton>
        </div>
    </>
}