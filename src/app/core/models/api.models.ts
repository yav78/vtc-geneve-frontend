// Interfaces d'authentification
export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserResponseDto;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}

// Interfaces de catégories
export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interfaces de questions
export interface Question {
  id: string;
  text: string;
  explanation?: string;
  isActive: boolean;
  categoryId: string;
  correctAnswerId?: string;
  createdAt: string;
  updatedAt: string;
  answerChoices?: AnswerChoice[];
}

export interface AnswerChoice {
  id: string;
  text: string;
  questionId?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

// Interfaces d'abonnements
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  durationInDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  subscriptionPlanId: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  plan?: SubscriptionPlan;
}

// Interfaces de sessions de questions
export interface CreateQuestionSessionDto {
  name: string;
  description: string;
  type: 'normal' | 'exam';
  categoryId: string;
  timeLimit: number;
  passingScore: number;
  isActive: boolean;
  questionIds: string[];
}

export interface QuestionSession {
  id: string;
  name: string;
  description: string;
  type: 'normal' | 'exam';
  categoryId: string;
  isActive: boolean;
  timeLimit: number;
  passingScore: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  questionCount?: number;
  questions: Question[];
}

export interface UpdateQuestionSessionDto {
  name?: string;
  description?: string;
  type?: 'normal' | 'exam';
  timeLimit?: number;
  passingScore?: number;
  isActive?: boolean;
  questionIds?: string[];
}

// Interfaces de sessions de quiz
export interface QuizSession {
  id: string;
  userId: string;
  questionSessionId: string;
  status: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  startedAt?: string;
  completedAt?: string;
  timeSpent: number;
  isPassed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAnswer {
  id: string;
  quizSessionId: string;
  questionId: string;
  selectedAnswerChoiceId: string;
  isCorrect: boolean;
  timeSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitAnswerDto {
  questionId: string;
  answerChoiceId: string;
  timeSpent: number;
}

