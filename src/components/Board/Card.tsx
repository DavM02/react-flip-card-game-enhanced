

interface CardProps {
  i: number;
  img: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected: boolean;
  isStarted: boolean;
  onClick: () => void;
  adjustTransition: boolean;
  color: string
}

const Card: React.FC<CardProps> = ({
  i,
  img,
  isStarted,
  isFlipped,
  isMatched,
  isSelected,
  onClick,
  adjustTransition,
  color,
}) => {
  const className = `flip-card ${isFlipped ? "static" : isStarted ? "flipped" : "static"}`;
  const flipCardBackClass = `flip-card-back ${isSelected ? "target" : "static"}`;
 
 
  return (
    <li
      key={i}
      onClick={onClick}
      className={className}
      style={{
        opacity:  img === "" ? "20%" : isMatched ? "50%" : "1",
        pointerEvents: img === "" ? "none" : "all",
      }}
    >
      <div
        className={`flip-card-inner ${adjustTransition ? "adjust-transition" : "default"}`}
        style={{ '--transition-index': `${(i + 1) / 40}s` } as React.CSSProperties}
      >
        <div className="flip-card-front">
          {isStarted && img && <img src={img} alt="card-img" />}
        </div>
        <div
          style={{ "--target": color } as React.CSSProperties}
          className={flipCardBackClass}></div>
      </div>
    </li>
  );
};

export default Card;
