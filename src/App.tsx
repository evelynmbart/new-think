import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Game from "./components/Game.tsx";
import Home from "./components/Home.tsx";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
