import { useState } from "react";
import "../css/Leaderboard.css";
import { GameHistory } from "../types";

interface GameDetailsModalProps {
  game: GameHistory;
  onClose: () => void;
}

function GameDetailsModal({ game, onClose }: GameDetailsModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Game Details</h2>
        <p>Date: {game.date.toLocaleDateString()}</p>
        <p>Category: {game.category}</p>
        <p>
          Score: {game.score} / {game.totalQuestions}
        </p>

        {game.wrongAnswers.length > 0 && (
          <>
            <h3>Incorrect Answers:</h3>
            <div className="wrong-answers">
              {game.wrongAnswers.map((wrong, index) => (
                <div key={index} className="wrong-answer">
                  <p>
                    <strong>Question:</strong> {wrong.question}
                  </p>
                  <p>
                    <strong>Your Answer:</strong> {wrong.userAnswer}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {wrong.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Leaderboard({
  gameHistory,
}: {
  gameHistory: GameHistory[];
}) {
  const [selectedGame, setSelectedGame] = useState<GameHistory | null>(null);

  return (
    <section className="leaderboard-container">
      {gameHistory.map((game) => (
        <button
          key={game.id}
          className="leaderboard-content"
          onClick={() => setSelectedGame(game)}
        >
          <div className="leaderboard-one">
            <h3>
              {game.category === "history"
                ? "History & Geography"
                : game.category === "science"
                ? "Science & Nature"
                : game.category === "art"
                ? "Art & Literature"
                : game.category === "pop"
                ? "Pop Culture"
                : "Sports & Leisure"}
            </h3>
            <p>
              {game.score} / {game.totalQuestions}
            </p>
            <p>{game.date.toLocaleDateString()}</p>
          </div>
        </button>
      ))}

      {selectedGame && (
        <GameDetailsModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </section>
  );
}
