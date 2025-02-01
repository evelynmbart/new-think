import { Question } from "../types.ts";
import "./Game.css";

export default function Game({
  questions,
  handleAnswerClick,
  currentQuestionIndex,
}: {
  questions: Question[];
  handleAnswerClick: (id: number) => void;
  currentQuestionIndex: number;
}) {
  return (
    <div>
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
    </div>
  );
}
