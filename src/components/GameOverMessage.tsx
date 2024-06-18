export default function GameOverMessage({ score }: any) {
  return (
    <div className="game-over-message">
      <h2>Game Over! your score is {score}</h2>
    </div>
  );
}
