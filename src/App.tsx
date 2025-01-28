import { BrowserRouter as Router } from "react-router-dom";
import literatureArt from "../public/art-lit.png";
import historyGeography from "../public/history-geo.png";
import popCulture from "../public/pop-culture.png";
import scienceNature from "../public/science-nat.png";
import sportsLeisure from "../public/sports.png";
import "./App.css";

function App() {
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
              <button>History & Geography</button>
            </div>
            <div className="science-nature-container">
              <img
                src={scienceNature}
                alt="Plant growing from beaker image"
                id="science-nature"
              />
              <button>Science & Nature</button>
            </div>
            <div className="literature-art-container">
              <img
                src={literatureArt}
                alt="Stacked books image"
                id="literature-art"
              />
              <button>Art & Literature</button>
            </div>
            <div className="pop-culture-container">
              <img
                src={popCulture}
                alt="Camera and music notes image"
                id="pop-culture"
              />
              <button>Pop Culture</button>
            </div>
            <div className="sports-leisure-container">
              <img
                src={sportsLeisure}
                alt="Different sports equipment"
                id="sports-leisure"
              />
              <button className="sports-leisure">Sports & Leisure</button>
            </div>
          </div>
        </section>
      </main>
    </Router>
  );
}

export default App;
