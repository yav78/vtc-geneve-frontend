import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Category, Question, QuestionsByCategoryParams } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  // Récupérer toutes les catégories
  getAllCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>('/categories');
  }

  // Récupérer une catégorie par ID
  getCategoryById(id: string): Observable<Category> {
    return this.apiService.get<Category>(`/categories/${id}`);
  }

  // Récupérer les questions d'une catégorie
  getQuestionsByCategory(categoryId: string, params: QuestionsByCategoryParams): Observable<Question[]> {
    const queryParams = `?limit=${params.limit}&page=${params.page}`;
    return this.apiService.get<Question[]>(`/categories/${categoryId}/questions${queryParams}`);
  }
}
