import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <main className="app">
        <h1>Th!nk</h1>
        <h2>Sharpen your skills, one question at a time</h2>
        <section className="pick-categories">
          <h3>Pick a category</h3>
          <div className="categories">
            <button id="history-geography">History & Geography</button>
            <button id="science-nature">Science & Nature</button>
            <button id="literature-art">Art & Literature</button>
            <button id="pop-culture">Pop Culture</button>
            <button id="sports-leisure">Sports & Leisure</button>
          </div>
        </section>
      </main>
    </Router>
  );
}

export default App;
