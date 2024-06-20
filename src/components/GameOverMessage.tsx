export default function GameOverMessage({ score }: any) {
  return (
    <div className="game-over-message">
      <h2>U win {score}$</h2>
    </div>
  );
}
