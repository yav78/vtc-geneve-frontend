import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
  QuestionSession, 
  CreateQuestionSessionDto, 
  UpdateQuestionSessionDto 
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class QuestionSessionService {
  constructor(private apiService: ApiService) {}

  // Récupérer toutes les sessions de questions
  getAllQuestionSessions(): Observable<QuestionSession[]> {
    return this.apiService.get<QuestionSession[]>('/question-sessions');
  }

  // Récupérer une session de questions par ID
  getQuestionSessionById(id: string): Observable<QuestionSession> {
    return this.apiService.get<QuestionSession>(`/question-sessions/${id}`);
  }

  // Récupérer une session avec ses questions
  getQuestionSessionWithQuestions(id: string): Observable<QuestionSession> {
    return this.apiService.get<QuestionSession>(`/question-sessions/${id}/with-questions`);
  }

  // Créer une nouvelle session de questions
  createQuestionSession(sessionData: CreateQuestionSessionDto): Observable<QuestionSession> {
    return this.apiService.post<QuestionSession>('/question-sessions', sessionData);
  }

  // Mettre à jour une session de questions
  updateQuestionSession(id: string, sessionData: UpdateQuestionSessionDto): Observable<QuestionSession> {
    return this.apiService.put<QuestionSession>(`/question-sessions/${id}`, sessionData);
  }

  // Supprimer une session de questions
  deleteQuestionSession(id: string): Observable<void> {
    return this.apiService.delete<void>(`/question-sessions/${id}`);
  }
}
