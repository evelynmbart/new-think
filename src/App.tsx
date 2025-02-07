import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/App.css";
import Game from "./pages/Game.tsx";
import Home from "./pages/Home.tsx";
import Leaderboard from "./pages/Leaderboard";
import { Category, GameHistory, Question } from "./types";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);

  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>(() => {
    const saved = localStorage.getItem("gameHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  const getRandomQuestion = () => {
    if (!questions.length) return;

    // If all questions have been used, reset the used indices
    if (usedIndices.length === questions.length) {
      setUsedIndices([]);
    }

    // Generate random index that hasn't been used
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedIndices.includes(randomIndex));

    setUsedIndices([...usedIndices, randomIndex]);
    setCurrentQuestionIndex(randomIndex);
  };

  const handleAnswerClick = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      getRandomQuestion();
    }
  };

  const addToGameHistory = (history: GameHistory) => {
    setGameHistory((prev) => [history, ...prev]);
  };

  return (
    <Router>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setQuestions={setQuestions}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setUsedIndices={setUsedIndices}
                setTimeLimit={setTimeLimit}
                category={category}
                setCategory={setCategory}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                category={category}
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                handleAnswerClick={handleAnswerClick}
                timeLimit={timeLimit}
                score={score}
                questionNumber={questionNumber}
                setScore={setScore}
                setQuestionNumber={setQuestionNumber}
                addToGameHistory={addToGameHistory}
              />
            }
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard gameHistory={gameHistory} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
