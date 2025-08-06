export interface Question {
  id: string;
  text: string;
  rating: number;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  score: number;
  maxScore: number;
}

export interface QuestionnaireState {
  categories: Category[];
  currentCategoryIndex: number;
  currentQuestionIndex: number;
  isCompleted: boolean;
}