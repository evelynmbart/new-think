import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import literatureArt from "../../public/art-lit.png";
import historyGeography from "../../public/history-geo.png";
import popCulture from "../../public/pop-culture.png";
import scienceNature from "../../public/science-nat.png";
import sportsLeisure from "../../public/sports.png";
import "../css/Game.css";
import { Category, GameHistory, Question, WrongAnswer } from "../types.ts";

export default function Game({
  category,
  questions,
  handleAnswerClick,
  currentQuestionIndex,
  timeLimit,
  score,
  questionNumber,
  setScore,
  setQuestionNumber,
  addToGameHistory,
}: {
  category: Category | null;
  questions: Question[];
  handleAnswerClick: (id: number) => void;
  currentQuestionIndex: number;
  timeLimit: number;
  score: number;
  questionNumber: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setQuestionNumber: (questionNumber: number) => void;
  addToGameHistory: (history: GameHistory) => void;
}) {
  const navigate = useNavigate();
  const [isQuizOver, setIsQuizOver] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(timeLimit);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);

  useEffect(() => {
    if (isQuizOver) {
      addToGameHistory({
        id: crypto.randomUUID(),
        date: new Date(),
        category: category!,
        score,
        totalQuestions: questionNumber,
        wrongAnswers,
      });
      navigate("/leaderboard");
    }
    if (timeRemaining <= 0) return;

    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsQuizOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const handleUserAnswer = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          userAnswer: answer,
          correctAnswer: currentQuestion.correct,
        },
      ]);
    }
  };

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
      <div className="timer-container">
        <div className="timer">
          <CircularProgressbar
            value={timeRemaining}
            maxValue={timeLimit}
            text={`${timeRemaining}sec`}
            styles={{
              path: {
                stroke: timeRemaining <= 10 ? "#fe4a4a" : "white",
              },
              text: {
                fill: "white",
                fontSize: "20px",
              },
            }}
          />
        </div>
      </div>

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
                <button
                  type="button"
                  key={i}
                  className="answer-button"
                  onClick={() => handleUserAnswer(answer)}
                >
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
