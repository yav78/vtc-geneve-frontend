import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
  QuizSession, 
  QuizAnswer, 
  SubmitAnswerDto,
  QuizSessionQueryParams
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class QuizSessionService {
  constructor(private apiService: ApiService) {}

  // Démarrer une nouvelle session de quiz
  startQuizSession(questionSessionId: string): Observable<QuizSession> {
    return this.apiService.post<QuizSession>(`/quiz-sessions/start/${questionSessionId}`, {});
  }

  // Soumettre une réponse à une question
  submitAnswer(sessionId: string, answerData: SubmitAnswerDto): Observable<QuizAnswer> {
    return this.apiService.post<QuizAnswer>(`/quiz-sessions/${sessionId}/answer`, answerData);
  }

  // Terminer une session de quiz
  completeQuizSession(sessionId: string): Observable<QuizSession> {
    return this.apiService.post<QuizSession>(`/quiz-sessions/${sessionId}/complete`, {});
  }

  // Récupérer les sessions de l'utilisateur connecté
  getMyQuizSessions(params?: QuizSessionQueryParams): Observable<QuizSession[]> {
    let endpoint = '/quiz-sessions/my-sessions';
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.questionSessionId) {
        queryParams.append('questionSessionId', params.questionSessionId);
      }
      if (params.status) {
        queryParams.append('status', params.status);
      }
      if (queryParams.toString()) {
        endpoint += `?${queryParams.toString()}`;
      }
    }
    return this.apiService.get<QuizSession[]>(endpoint);
  }

  // Récupérer les détails d'une session de quiz
  getQuizSessionDetails(sessionId: string): Observable<QuizSession> {
    return this.apiService.get<QuizSession>(`/quiz-sessions/${sessionId}`);
  }
}
