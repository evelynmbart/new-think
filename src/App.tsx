import { useEffect, useState } from "react";
import { LuBrain } from "react-icons/lu";
import { BrowserRouter as Router } from "react-router-dom";
import literatureArt from "../public/art-lit.png";
import historyGeography from "../public/history-geo.png";
import popCulture from "../public/pop-culture.png";
import scienceNature from "../public/science-nat.png";
import sportsLeisure from "../public/sports.png";
import thinkLogo from "../public/think.png";
import "./App.css";
import { questionsData } from "./questions.tsx";
import { Category, Question } from "./types.ts";

function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [count, setCount] = useState<number>(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleCategoryClick = (category: Category) => {
    setCategory(category);
    setCount(0);
    setUsedIndices([]);
    // Instead of setting to 0, we'll set a random index after setting questions
  };

  useEffect(() => {
    if (category) {
      setQuestions(questionsData[category]);
      // Set random initial question when category changes
      const randomIndex = Math.floor(
        Math.random() * questionsData[category].length
      );
      setCurrentQuestionIndex(randomIndex);
      setUsedIndices([randomIndex]);
    }
  }, [category]);

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
      <main className="app">
        <header className="app-header">
          <img src={thinkLogo} alt="Think logo" />
          <h2>Sharpen your skills, one question at a time!</h2>
        </header>
        <section className="pick-categories">
          <h3>Choose a category</h3>
          <div className="categories">
            <div className="history-geography-container">
              <LuBrain id="brain-icon" />
              <img
                src={historyGeography}
                alt="Globe and maps image"
                id="history-geography"
              />
              <button onClick={() => handleCategoryClick("history")}>
                History & Geography
              </button>
            </div>
            <div className="science-nature-container">
              <LuBrain id="brain-icon" />
              <img
                src={scienceNature}
                alt="Plant growing from beaker image"
                id="science-nature"
              />
              <button onClick={() => handleCategoryClick("science")}>
                Science & Nature
              </button>
            </div>
            <div className="literature-art-container">
              <LuBrain id="brain-icon" />
              <img
                src={literatureArt}
                alt="Stacked books image"
                id="literature-art"
              />
              <button onClick={() => handleCategoryClick("art")}>
                Art & Literature
              </button>
            </div>
            <div className="pop-culture-container">
              <LuBrain id="brain-icon" />
              <img
                src={popCulture}
                alt="Camera and music notes image"
                id="pop-culture"
              />
              <button onClick={() => handleCategoryClick("pop")}>
                Pop Culture
              </button>
            </div>
            <div className="sports-leisure-container">
              <LuBrain id="brain-icon" />
              <img
                src={sportsLeisure}
                alt="Different sports equipment"
                id="sports-leisure"
              />
              <button onClick={() => handleCategoryClick("sports")}>
                Sports & Leisure
              </button>
            </div>
          </div>
        </section>
        <section className="question-container">
          <div>
            {questions.length > 0 && (
              <div key={questions[currentQuestionIndex].id}>
                <div>
                  <h2>{questions[currentQuestionIndex].question}</h2>
                  <ul>
                    {questions[currentQuestionIndex].answers.map(
                      (answer, i) => (
                        <button type="button" key={i}>
                          {answer}
                        </button>
                      )
                    )}
                  </ul>
                  <button
                    onClick={() =>
                      handleAnswerClick(questions[currentQuestionIndex].id)
                    }
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </Router>
  );
}

export default App;
