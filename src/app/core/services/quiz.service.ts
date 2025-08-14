import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
  Category, 
  Question, 
  QuestionSession, 
  QuizSession, 
  QuizAnswer, 
  SubmitAnswerDto,
  CreateQuestionSessionDto 
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private apiService: ApiService) {}

  // Catégories
  getCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>('/categories');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.apiService.get<Category>(`/categories/${id}`);
  }

  getQuestionsByCategory(categoryId: string, limit: number, page: number): Observable<Question[]> {
    return this.apiService.get<Question[]>(`/categories/${categoryId}/questions?limit=${limit}&page=${page}`);
  }

  // Questions
  getRandomQuestionsByCategory(categoryId: string, limit?: number): Observable<Question[]> {
    const params = limit ? `?limit=${limit}` : '';
    return this.apiService.get<Question[]>(`/questions/category/${categoryId}${params}`);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.apiService.get<Question>(`/questions/${id}`);
  }

  // Sessions de questions
  getQuestionSessions(): Observable<QuestionSession[]> {
    return this.apiService.get<QuestionSession[]>('/question-sessions');
  }

  getQuestionSessionById(id: string): Observable<QuestionSession> {
    return this.apiService.get<QuestionSession>(`/question-sessions/${id}`);
  }

  getQuestionSessionWithQuestions(id: string): Observable<QuestionSession> {
    return this.apiService.get<QuestionSession>(`/question-sessions/${id}/with-questions`);
  }

  createQuestionSession(sessionData: CreateQuestionSessionDto): Observable<QuestionSession> {
    return this.apiService.post<QuestionSession>('/question-sessions', sessionData);
  }

  updateQuestionSession(id: string, sessionData: any): Observable<QuestionSession> {
    return this.apiService.put<QuestionSession>(`/question-sessions/${id}`, sessionData);
  }

  deleteQuestionSession(id: string): Observable<void> {
    return this.apiService.delete<void>(`/question-sessions/${id}`);
  }

  // Sessions de quiz
  startQuizSession(questionSessionId: string): Observable<QuizSession> {
    return this.apiService.post<QuizSession>(`/quiz-sessions/start/${questionSessionId}`, {});
  }

  submitAnswer(sessionId: string, answerData: SubmitAnswerDto): Observable<QuizAnswer> {
    return this.apiService.post<QuizAnswer>(`/quiz-sessions/${sessionId}/answer`, answerData);
  }

  completeQuizSession(sessionId: string): Observable<QuizSession> {
    return this.apiService.post<QuizSession>(`/quiz-sessions/${sessionId}/complete`, {});
  }

  getMyQuizSessions(): Observable<QuizSession[]> {
    return this.apiService.get<QuizSession[]>('/quiz-sessions/my-sessions');
  }

  getQuizSessionDetails(sessionId: string): Observable<QuizSession> {
    return this.apiService.get<QuizSession>(`/quiz-sessions/${sessionId}`);
  }
}
