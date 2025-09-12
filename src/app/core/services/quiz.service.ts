import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { QuestionService } from './question.service';
import { QuestionSessionService } from './question-session.service';
import { QuizSessionService } from './quiz-session.service';
import { 
  Category, 
  Question, 
  QuestionSession, 
  QuizSession, 
  QuizAnswer, 
  SubmitAnswerDto,
  CreateQuestionSessionDto,
  UpdateQuestionSessionDto,
  QuizSessionQueryParams,
  QuestionsByCategoryParams
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private questionSessionService: QuestionSessionService,
    private quizSessionService: QuizSessionService
  ) {}

  // Catégories - Délégué au service spécialisé
  getCategories(): Observable<Category[]> {
    return this.categoryService.getAllCategories();
  }

  getCategoryById(id: string): Observable<Category> {
    return this.categoryService.getCategoryById(id);
  }

  getQuestionsByCategory(categoryId: string, params: QuestionsByCategoryParams): Observable<Question[]> {
    return this.categoryService.getQuestionsByCategory(categoryId, params);
  }

  // Questions - Délégué au service spécialisé
  getRandomQuestionsByCategory(categoryId: string, limit?: number): Observable<Question[]> {
    return this.questionService.getRandomQuestionsByCategory(categoryId, limit);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.questionService.getQuestionById(id);
  }

  // Sessions de questions - Délégué au service spécialisé
  getQuestionSessions(): Observable<QuestionSession[]> {
    return this.questionSessionService.getAllQuestionSessions();
  }

  getQuestionSessionById(id: string): Observable<QuestionSession> {
    return this.questionSessionService.getQuestionSessionById(id);
  }

  getQuestionSessionWithQuestions(id: string): Observable<QuestionSession> {
    return this.questionSessionService.getQuestionSessionWithQuestions(id);
  }

  createQuestionSession(sessionData: CreateQuestionSessionDto): Observable<QuestionSession> {
    return this.questionSessionService.createQuestionSession(sessionData);
  }

  updateQuestionSession(id: string, sessionData: UpdateQuestionSessionDto): Observable<QuestionSession> {
    return this.questionSessionService.updateQuestionSession(id, sessionData);
  }

  deleteQuestionSession(id: string): Observable<void> {
    return this.questionSessionService.deleteQuestionSession(id);
  }

  // Sessions de quiz - Délégué au service spécialisé
  startQuizSession(questionSessionId: string): Observable<QuizSession> {
    return this.quizSessionService.startQuizSession(questionSessionId);
  }

  submitAnswer(sessionId: string, answerData: SubmitAnswerDto): Observable<QuizAnswer> {
    return this.quizSessionService.submitAnswer(sessionId, answerData);
  }

  completeQuizSession(sessionId: string): Observable<QuizSession> {
    return this.quizSessionService.completeQuizSession(sessionId);
  }

  getMyQuizSessions(params?: QuizSessionQueryParams): Observable<QuizSession[]> {
    return this.quizSessionService.getMyQuizSessions(params);
  }

  getQuizSessionDetails(sessionId: string): Observable<QuizSession> {
    return this.quizSessionService.getQuizSessionDetails(sessionId);
  }
}
