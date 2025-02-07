export type Question = {
  id: number;
  question: string;
  answers: string[];
  correct: string;
};

export type Category = "history" | "science" | "art" | "pop" | "sports";

export type QuestionsData = {
  [key in Category]: Question[];
};

export interface WrongAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

export interface GameHistory {
  id: string;
  date: Date;
  category: Category;
  score: number;
  totalQuestions: number;
  wrongAnswers: WrongAnswer[];
}
