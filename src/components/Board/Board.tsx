import React from "react";

import "./board.css";
import { statisticStore } from "../../store/statisticStore";
import { gameStore } from "../../store/gameStore";
import { useGameLogic } from "../../hooks/useGameLogic";
import Card from "./Card";
import { useImages } from "../../hooks/useImages";
const Board: React.FC = () => {

  const { level, pairNumber } = gameStore()
  const { isStarted } = statisticStore()

  const { numberOfCells, selected,
    flipped,
    matches,
    adjustTransition,
    setSelected,
    setAdjustTransition, } = useGameLogic()

  const { images, isLoading } = useImages(numberOfCells, pairNumber)


  return (
    <div className={`board ${level}`}>
      {
        isLoading ? <h3>Preparing the board</h3> : <ul>
          {images && images.map((el, i) => {
            const img = el.resized_url;
            const id = el.id
            const matched = matches.includes(i);
            const isFlipped = flipped.includes(i) || matched;
            const isSelected = selected.some((sel) => sel.i === i);

            return (
              <Card
                key={i}
                i={i}
                img={img || ""}
                isStarted={isStarted}
                isFlipped={isFlipped}
                isMatched={matched}
                isSelected={isSelected}
                onClick={() => {
                  if (!adjustTransition) {
                    setAdjustTransition(true);
                  }

                  if (
                    selected.find((sel) => sel.i === i) ||
                    matches.includes(i) ||
                    selected.length === pairNumber
                  )
                    return;

                  setSelected((prev) => [...prev, { i, path: id }]);
                }}
                adjustTransition={adjustTransition}
              />
            );
          })}
        </ul>
      }

    </div>
  );
};

export default Board;
