import "./SingleCard.css";

interface Card {
  src: string;
  flipped: boolean;
  id: number;
}
interface SingleCardProp {
  card: Card;
  handleChoice: (card: Card) => void;
  gameOver: boolean;
}
export default function SingleCard({
  card,
  handleChoice,
  gameOver,
}: SingleCardProp) {
  const handleCardClick = () => {
    console.log(card.flipped);
    if (!gameOver && card.flipped === false) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={card.flipped ? "flipped" : ""}>
        <img
          className="back"
          src="./img/cover.png"
          alt="cardback"
          onClick={handleCardClick}
        ></img>
        <img className="front" src={card.src} alt="cardfront"></img>
      </div>
    </div>
  );
}
