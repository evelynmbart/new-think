import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game.tsx";
import Home from "./components/Home.tsx";
import { Question } from "./types";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [count, setCount] = useState<number>(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const [timeLimit, setTimeLimit] = useState<number>(30);

  // const handleAnswerClick = (id: number) => {
  //   // Add answer handling logic here
  //   setCurrentQuestionIndex((prev) => prev + 1);
  // };

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
      setCount(count + 1);
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
                questions={questions}
                setQuestions={setQuestions}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                count={count}
                setCount={setCount}
                usedIndices={usedIndices}
                setUsedIndices={setUsedIndices}
                timeLimit={timeLimit}
                setTimeLimit={setTimeLimit}
              />
            }
          />
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
