import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/App.css";
import Game from "./pages/Game.tsx";
import Home from "./pages/Home.tsx";
import { Category, Question } from "./types";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);

  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const [timeLimit, setTimeLimit] = useState<number>(30);

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
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
