import "./SingleCard.css";
export default function SingleCard({
  card,
  handleChoice,
  flipped,
  gameOver,
}: any) {
  const handleCardClick = () => {
    console.log(card.flipped);
    if (!gameOver && card.flipped === false) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
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
