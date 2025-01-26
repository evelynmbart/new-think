import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game.tsx";
import Home from "./components/Home.tsx";

function App() {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [questionsPerPlayer, setQuestionsPerPlayer] = useState(5);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                player1Name={player1Name}
                player2Name={player2Name}
                questionsPerPlayer={questionsPerPlayer}
                setPlayer1Name={setPlayer1Name}
                setPlayer2Name={setPlayer2Name}
                setQuestionsPerPlayer={setQuestionsPerPlayer}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                player1Name={player1Name}
                player2Name={player2Name}
                questionsPerPlayer={questionsPerPlayer}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
