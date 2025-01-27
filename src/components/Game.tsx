import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  history_geography,
  literature_art,
  pop_culture,
  science_nature,
  sportsQuiz,
} from "../questions";
import "./Game.css";

interface GameProps {
  player1Name: string;
  player2Name: string;
  questionsPerPlayer: number;
}

type Question = {
  id?: number;
  question: string;
  answers?: string[];
  options?: string[];
  correct?: string;
  correctAnswer?: string;
};

function Game({ player1Name, player2Name, questionsPerPlayer }: GameProps) {
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);

  const categories = [
    science_nature,
    history_geography,
    literature_art,
    pop_culture,
    sportsQuiz,
  ];

  useEffect(() => {
    const allQuestions = categories.flat();
    const shuffledQuestions = shuffleArray([...allQuestions]);
    setAvailableQuestions(shuffledQuestions.slice(1));
    setCurrentQuestion(shuffledQuestions[0]);
  }, []);

  const shuffleArray = (array: Question[]): Question[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomQuestion = () => {
    if (availableQuestions.length === 0) {
      const allQuestions = categories.flat();
      setAvailableQuestions(shuffleArray([...allQuestions]));
    }

    const nextQuestion = availableQuestions[0];
    setAvailableQuestions((prev) => prev.slice(1));
    setCurrentQuestion(nextQuestion);
  };

  const handleAnswer = (answer: string) => {
    const correct = currentQuestion?.correct || currentQuestion?.correctAnswer;
    if (answer === correct) {
      if (currentPlayer === 1) {
        setPlayer1Score((prev) => prev + 1);
      } else {
        setPlayer2Score((prev) => prev + 1);
      }
    }

    setQuestionsAnswered((prev) => prev + 1);
    if (questionsAnswered + 1 >= questionsPerPlayer * 2) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      getRandomQuestion();
    }
  };

  const getWinner = () => {
    if (player1Score > player2Score) return player1Name;
    if (player2Score > player1Score) return player2Name;
    return "It's a tie!";
  };

  return (
    <div className="game">
      {!gameOver ? (
        <>
          <div className="scores">
            <div
              className={`player-score ${currentPlayer === 1 ? "active" : ""}`}
            >
              {player1Name}: {player1Score}
            </div>
            <div
              className={`player-score ${currentPlayer === 2 ? "active" : ""}`}
            >
              {player2Name}: {player2Score}
            </div>
          </div>
          <div className="question-container">
            <h2>{currentPlayer === 1 ? player1Name : player2Name}'s Turn</h2>
            <p className="question">{currentQuestion?.question}</p>
            <div className="answers">
              {(currentQuestion?.answers || currentQuestion?.options)?.map(
                (answer, index) => (
                  <button
                    key={index}
                    className="answer-button"
                    onClick={() => handleAnswer(answer)}
                  >
                    {answer}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>{getWinner()}</p>
          <p>Final Scores:</p>
          <p>
            {player1Name}: {player1Score}
          </p>
          <p>
            {player2Name}: {player2Score}
          </p>
          <button onClick={() => navigate("/")}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Game;
