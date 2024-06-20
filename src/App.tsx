import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { isElementAccessExpression } from "typescript";
import GameOverMessage from "./components/GameOverMessage";
import Bet from "./components/Bet";

const cardImages = [
  {
    src: "/img/bomb.jpg",
    flipped: false,
  },
  { src: "/img/diamond.jpg", flipped: false },
];
const bets = [
  {
    money: "1$",
    moneyKey: "one",
  },
  {
    money: "5$",
    moneyKey: "five",
  },
  {
    money: "10$",
    moneyKey: "ten",
  },
  {
    money: "20$",
    moneyKey: "twenty",
  },
  {
    money: "50$",
    moneyKey: "fifty",
  },
  {
    money: "100$",
    moneyKey: "hundred",
  },
  {
    money: "200$",
    moneyKey: "two_hundred",
  },
  {
    money: "500$",
    moneyKey: "five_hundred",
  },
  {
    money: "1000$",
    moneyKey: "thousand",
  },
  {
    money: "5000$",
    moneyKey: "five_thousand",
  },
];
const prizes = [
  1, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8,
  7.2, 7.6, 8.0, 8.4,
];

interface Card {
  src: string;
  id: number;
  flipped: boolean;
}
interface Bet {
  money: string;
  moneyKey: string;
}
function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [choice, setChoice] = useState<Card | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [betMoney, setBetMoney] = useState(1);
  const [selectedBet, setSelectedBet] = useState<Bet>();
  const [noOfClicks, setNoOfClicks] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = Array(19)
      .fill(cardImages[1])
      .concat(cardImages[0])
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setNoOfClicks(0);
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
    setNoOfClicks((prevClicks) => prevClicks + 1);
    console.log(betMoney, noOfClicks);
    setWinAmount(prizes[noOfClicks] * betMoney);
  };
  const handleBetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBet = bets.find((bet) => bet.moneyKey === event.target.value);
    if (selectedBet) {
      setBetMoney(parseInt(selectedBet.money));
      setSelectedBet(selectedBet);
      console.log(betMoney);
      setWinAmount(betMoney);
    }
  };

  return (
    <div className="App">
      <h1>Diamond Bomb</h1>
      <div className="game-options-box">
        <div className="bet-items">
          <label htmlFor="bet">Bet:</label>
          <select onChange={handleBetChange}>
            {bets.map((bet, index) => (
              <Bet key={index} bet={bet}></Bet>
            ))}
          </select>
        </div>
        <button onClick={shuffleCards}>New game</button>
      </div>

      <div className="card-grid">
        {cards?.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            gameOver={gameOver}
          ></SingleCard>
        ))}
      </div>
      {gameOver && <GameOverMessage score={winAmount}></GameOverMessage>}
    </div>
  );
}

export default App;
