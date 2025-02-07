import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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
        {/* <p>Date: {game.date.toLocaleDateString()}</p> */}
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
  const navigate = useNavigate();

  return (
    <section className="leaderboard-container">
      <button className="close-button" onClick={() => navigate("/")}>
        <IoArrowBackCircleOutline
          size={50}
          title="back to home"
          color="white"
        />
      </button>
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
            <p
              style={{
                backgroundColor:
                  game.category === "history"
                    ? "#667eea"
                    : game.category === "science"
                    ? "#42c492"
                    : game.category === "art"
                    ? "#764ba2"
                    : game.category === "pop"
                    ? "#ff758c"
                    : "#00b4d8",
              }}
            >
              {game.score} / {game.totalQuestions}
            </p>
            {/* <p>{game.date.toLocaleDateString()}</p> */}
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
