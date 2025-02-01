import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game.tsx";
import Home from "./components/Home.tsx";
import { Question } from "./types";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerClick = (id: number) => {
    // Add answer handling logic here
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game"
            element={
              <Game
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                handleAnswerClick={handleAnswerClick}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
