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
      {questions.length > 0 && (
        <div key={questions[currentQuestionIndex].id}>
          <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <ul>
              {questions[currentQuestionIndex].answers.map((answer, i) => (
                <button type="button" key={i}>
                  {answer}
                </button>
              ))}
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
    </section>
  );
}
