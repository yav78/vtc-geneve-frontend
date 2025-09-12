import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Question } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private apiService: ApiService) {}

  // Récupérer des questions aléatoires par catégorie
  getRandomQuestionsByCategory(categoryId: string, limit?: number): Observable<Question[]> {
    const queryParams = limit ? `?limit=${limit}` : '';
    return this.apiService.get<Question[]>(`/questions/category/${categoryId}${queryParams}`);
  }

  // Récupérer une question par ID
  getQuestionById(id: string): Observable<Question> {
    return this.apiService.get<Question>(`/questions/${id}`);
  }
}
