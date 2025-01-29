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
