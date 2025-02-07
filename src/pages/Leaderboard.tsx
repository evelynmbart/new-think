import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../css/Leaderboard.css";
import { GameHistory } from "../types";

interface GameDetailsModalProps {
  game: GameHistory;
  onClose: () => void;
}

function GameDetailsModal({ game, onClose }: GameDetailsModalProps) {
  return (
    <section className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button" onClick={onClose}>
          ×
        </button>

        <h2
          style={{
            color:
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
          {game.category === "history"
            ? "History & Geography"
            : game.category === "science"
            ? "Science & Nature"
            : game.category === "art"
            ? "Art & Literature"
            : game.category === "pop"
            ? "Pop Culture"
            : "Sports & Leisure"}
        </h2>
        <p className="modal-content-p">
          You scored{" "}
          <span
            style={{
              color:
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
            {game.score}
          </span>{" "}
          out of{" "}
          <span
            style={{
              color:
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
            {game.totalQuestions}
          </span>{" "}
          questions correct!
        </p>

        {game.wrongAnswers.length > 0 && (
          <section className="wrong-answers-container">
            <h3>Review Incorrect Answers</h3>
            <div className="wrong-answers">
              {game.wrongAnswers.map((wrong, index) => (
                <div key={index} className="wrong-answer">
                  <p className="question-text">
                    <strong>Q{index + 1}:</strong> {wrong.question}
                  </p>
                  <div className="these-answers">
                    <div className="answer-item">
                      <span className="answer-label user-answer">
                        Your Answer
                      </span>
                      <p className="answer-text">{wrong.userAnswer}</p>
                    </div>
                    <div className="answer-item">
                      <span className="answer-label correct-answer">
                        Correct Answer
                      </span>
                      <p className="answer-text">{wrong.correctAnswer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
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
        />{" "}
        Back to Home
      </button>

      <header className="leaderboard-header">
        <h1 className="leaderboard-title" title="Game History">
          <LuBrain id="brain-icons" /> Game History <LuBrain id="brain-icons" />
        </h1>
        <p className="leaderboard-summary">
          Review your quiz performance and learn from past attempts. Click on
          any game to see detailed results and review incorrect answers.
        </p>
      </header>

      <div className="leaderboard-list">
        {gameHistory.length === 0 ? (
          <p className="leaderboard-summary">
            No games played yet. Start a quiz to see your results here!
          </p>
        ) : (
          gameHistory.map((game) => (
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
              </div>
            </button>
          ))
        )}
      </div>

      {selectedGame && (
        <GameDetailsModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </section>
  );
}
