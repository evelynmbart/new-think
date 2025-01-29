import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import literatureArt from "../public/art-lit.png";
import historyGeography from "../public/history-geo.png";
import popCulture from "../public/pop-culture.png";
import scienceNature from "../public/science-nat.png";
import sportsLeisure from "../public/sports.png";
import "./App.css";
import { questionsData } from "./questions.tsx";
import { Category, Question } from "./types.ts";

function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);

  const handleCategoryClick = (category: Category) => {
    setCategory(category);
  };

  useEffect(() => {
    if (category) {
      setQuestion(
        questionsData[category][
          Math.floor(Math.random() * questionsData[category].length)
        ]
      );
    }
  }, [category]);

  return (
    <Router>
      <main className="app">
        <header className="app-header">
          <h1>Th!nk</h1>
          <h2>Sharpen your skills, one question at a time!</h2>
        </header>
        <section className="pick-categories">
          <h3>Pick a category</h3>
          <div className="categories">
            <div className="history-geography-container">
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
        <section className="question-container">{}</section>
      </main>
    </Router>
  );
}

export default App;
