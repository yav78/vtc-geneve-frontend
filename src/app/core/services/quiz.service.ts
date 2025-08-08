import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
  Category, 
  Question, 
  QuestionSessionResponseDto, 
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

  // Questions
  getQuestionsByCategory(categoryId: string, limit?: number): Observable<Question[]> {
    const params = limit ? `?limit=${limit}` : '';
    return this.apiService.get<Question[]>(`/questions/category/${categoryId}${params}`);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.apiService.get<Question>(`/questions/${id}`);
  }

  // Sessions de questions
  getQuestionSessions(type?: 'normal' | 'exam'): Observable<QuestionSessionResponseDto[]> {
    const params = type ? `?type=${type}` : '';
    return this.apiService.get<QuestionSessionResponseDto[]>(`/question-sessions${params}`);
  }

  getQuestionSessionsByCategory(categoryId: string, type?: 'normal' | 'exam'): Observable<QuestionSessionResponseDto[]> {
    const params = type ? `?type=${type}` : '';
    return this.apiService.get<QuestionSessionResponseDto[]>(`/question-sessions/category/${categoryId}${params}`);
  }

  getQuestionSessionById(id: string): Observable<QuestionSessionResponseDto> {
    return this.apiService.get<QuestionSessionResponseDto>(`/question-sessions/${id}`);
  }

  getQuestionSessionWithQuestions(id: string): Observable<QuestionSessionResponseDto> {
    return this.apiService.get<QuestionSessionResponseDto>(`/question-sessions/${id}/with-questions`);
  }

  createQuestionSession(sessionData: CreateQuestionSessionDto): Observable<QuestionSessionResponseDto> {
    return this.apiService.post<QuestionSessionResponseDto>('/question-sessions', sessionData);
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
