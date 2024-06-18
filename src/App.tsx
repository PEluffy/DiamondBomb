import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { isElementAccessExpression } from "typescript";
import GameOverMessage from "./components/GameOverMessage";

const cardImages = [
  {
    src: "/img/bomb.jpg",
    flipped: false,
  },
  { src: "/img/diamond.jpg", flipped: false },
];

interface Card {
  src: string;
  id: number;
  flipped: boolean;
}
function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [choice, setChoice] = useState<Card | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(-1);

  const shuffleCards = () => {
    const shuffledCards = Array(19)
      .fill(cardImages[1])
      .concat(cardImages[0])
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setGameOver(false);
  };

  const handleChoice = (selectedCard: Card) => {
    if (selectedCard.src === cardImages[0].src) {
      setGameOver(true);
    }
    setCards(
      cards.map((card) =>
        card.id === selectedCard.id ? { ...card, flipped: true } : card
      )
    );
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="App">
      <h1>Diamond Bomb</h1>
      <button onClick={shuffleCards}>New game</button>
      <div className="card-grid">
        {cards?.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card.flipped}
            gameOver={gameOver}
          ></SingleCard>
        ))}
      </div>
      {gameOver && <GameOverMessage score={score}></GameOverMessage>}
    </div>
  );
}

export default App;
