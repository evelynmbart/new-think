import { useNavigate } from "react-router-dom";
import "./Home.css";

interface HomeProps {
  player1Name: string;
  player2Name: string;
  questionsPerPlayer: number;
  setPlayer1Name: (name: string) => void;
  setPlayer2Name: (name: string) => void;
  setQuestionsPerPlayer: (num: number) => void;
}

function Home({
  player1Name,
  player2Name,
  questionsPerPlayer,
  setPlayer1Name,
  setPlayer2Name,
  setQuestionsPerPlayer,
}: HomeProps) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div className="home">
      <h1>Quiz Battle!</h1>
      <div className="settings-container">
        <div className="input-group">
          <label htmlFor="player1">Player 1 Name:</label>
          <input
            type="text"
            id="player1"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="player2">Player 2 Name:</label>
          <input
            type="text"
            id="player2"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="questions">Questions per player:</label>
          <input
            type="number"
            id="questions"
            min="1"
            max="10"
            value={questionsPerPlayer}
            onChange={(e) => setQuestionsPerPlayer(Number(e.target.value))}
          />
        </div>
        <button className="start-button" onClick={handleStart}>
          Start Game!
        </button>
      </div>
    </div>
  );
}

export default Home;
