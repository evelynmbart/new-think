import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import literatureArt from "../../public/art-lit.png";
import historyGeography from "../../public/history-geo.png";
import popCulture from "../../public/pop-culture.png";
import scienceNature from "../../public/science-nat.png";
import sportsLeisure from "../../public/sports.png";
import { Category, Question } from "../types.ts";
import "./Game.css";

export default function Game({
  category,
  questions,
  handleAnswerClick,
  currentQuestionIndex,
}: {
  category: Category | null;
  questions: Question[];
  handleAnswerClick: (id: number) => void;
  currentQuestionIndex: number;
}) {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const navigate = useNavigate();
  return (
    <section
      className="game-container"
      style={{
        background:
          category === "history"
            ? "linear-gradient(to top, #667eea, #b2bff7)"
            : category === "science"
            ? "linear-gradient(to top, #42c492, #8cf0ca)"
            : category === "art"
            ? "linear-gradient(to top, #764ba2, #cda8f5)"
            : category === "pop"
            ? "linear-gradient(to top, #ff758c, #fcc0c8)"
            : category === "sports"
            ? "linear-gradient(to top, #00b4d8, #93e1f0)"
            : "#f4b9b9",
      }}
    >
      <RiCloseCircleLine
        id="close-button"
        color="white"
        size={35}
        onClick={() => {
          const confirm = window.confirm(
            "Are you sure you want to leave the quiz?"
          );
          if (confirm) {
            navigate("/");
          }
        }}
      />
      {questions.length > 0 && (
        <div
          key={questions[currentQuestionIndex].id}
          className="question-container"
        >
          <div className="question-content">
            <img
              src={
                category === "history"
                  ? historyGeography
                  : category === "science"
                  ? scienceNature
                  : category === "art"
                  ? literatureArt
                  : category === "pop"
                  ? popCulture
                  : sportsLeisure
              }
            />
            <p className="question-number">Question {questionNumber}</p>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <ul className="answer-buttons">
              {questions[currentQuestionIndex].answers.map((answer, i) => (
                <button type="button" key={i} className="answer-button">
                  {answer}
                </button>
              ))}
            </ul>
            <button
              className="next-button"
              onClick={() => {
                handleAnswerClick(questions[currentQuestionIndex].id);
                setQuestionNumber(questionNumber + 1);
              }}
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
