import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { QuizSession, QuizAnswer } from '../models/api.models';

export interface QuizResult {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  duration: number;
  categoryName?: string;
}

export interface UserStatistics {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
  totalTimeSpent: number;
  successRate: number;
  lastQuizDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private quizResults = signal<QuizResult[]>([]);

  constructor(private apiService: ApiService) {
    this.loadQuizResults();
  }

  // Charger les résultats depuis l'API
  private loadQuizResults() {
    // Charger d'abord depuis localStorage
    const localResults = this.loadQuizResultsFromLocalStorage();
    if (localResults.length > 0) {
      this.quizResults.set(localResults);
      console.log('Résultats chargés depuis localStorage:', localResults.length, 'quiz');
    }
    
    // Ensuite charger depuis l'API pour synchroniser
    this.apiService.get<QuizSession[]>('/quiz-sessions/my-sessions').subscribe({
      next: (sessions) => {
        const apiResults: QuizResult[] = sessions.map(session => ({
          id: session.id,
          score: session.score,
          totalQuestions: session.totalQuestions,
          correctAnswers: session.correctAnswers,
          completedAt: session.completedAt ? new Date(session.completedAt) : new Date(),
          duration: session.timeSpent,
          categoryName: 'Quiz' // À récupérer depuis la session de questions
        }));
        
        // Combiner les résultats locaux et API (éviter les doublons)
        const combinedResults = [...localResults, ...apiResults];
        this.quizResults.set(combinedResults);
        this.saveQuizResultsToLocalStorage(combinedResults);
        
        console.log('Résultats synchronisés avec l\'API:', combinedResults.length, 'quiz');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des résultats depuis l\'API:', error);
        // Garder les résultats locaux si l'API échoue
      }
    });
  }

  // Ajouter un résultat de quiz
  addQuizResult(result: Omit<QuizResult, 'id'>): void {
    const newResult: QuizResult = {
      ...result,
      id: Date.now().toString() // ID temporaire
    };
    
    console.log('Ajout du résultat aux statistiques:', newResult);
    
    const currentResults = this.quizResults();
    this.quizResults.set([newResult, ...currentResults]);
    
    // Sauvegarder dans localStorage pour persistance
    this.saveQuizResultsToLocalStorage([newResult, ...currentResults]);
    
    // En production, vous devriez appeler l'API pour sauvegarder
    // this.apiService.post('/quiz-sessions', newResult).subscribe({
    //   next: (response) => console.log('Résultat sauvegardé sur le serveur:', response),
    //   error: (error) => console.error('Erreur lors de la sauvegarde:', error)
    // });
  }
  
  // Sauvegarder les résultats dans localStorage
  private saveQuizResultsToLocalStorage(results: QuizResult[]): void {
    try {
      localStorage.setItem('quiz_results', JSON.stringify(results));
      console.log('Résultats sauvegardés dans localStorage');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  }
  
  // Charger les résultats depuis localStorage
  private loadQuizResultsFromLocalStorage(): QuizResult[] {
    try {
      const saved = localStorage.getItem('quiz_results');
      if (saved) {
        const results = JSON.parse(saved);
        console.log('Résultats chargés depuis localStorage:', results);
        return results;
      }
    } catch (error) {
      console.error('Erreur lors du chargement depuis localStorage:', error);
    }
    return [];
  }

  // Obtenir les statistiques de l'utilisateur
  getUserStatistics(): Observable<UserStatistics> {
    return this.apiService.get<QuizSession[]>('/quiz-sessions/my-sessions').pipe(
      map(sessions => {
        if (sessions.length === 0) {
          return {
            totalQuizzes: 0,
            averageScore: 0,
            bestScore: 0,
            totalQuestions: 0,
            totalCorrectAnswers: 0,
            totalTimeSpent: 0,
            successRate: 0
          };
        }

        const totalQuizzes = sessions.length;
        const totalScore = sessions.reduce((sum, session) => sum + session.score, 0);
        const averageScore = Math.round(totalScore / totalQuizzes);
        const bestScore = Math.max(...sessions.map(s => s.score));
        const totalQuestions = sessions.reduce((sum, session) => sum + session.totalQuestions, 0);
        const totalCorrectAnswers = sessions.reduce((sum, session) => sum + session.correctAnswers, 0);
        const totalTimeSpent = sessions.reduce((sum, session) => sum + session.timeSpent, 0);
        const successRate = Math.round((totalCorrectAnswers / totalQuestions) * 100);

        const lastQuizDate = sessions.length > 0 && sessions[0].completedAt 
          ? new Date(sessions[0].completedAt) 
          : undefined;

        return {
          totalQuizzes,
          averageScore,
          bestScore,
          totalQuestions,
          totalCorrectAnswers,
          totalTimeSpent,
          successRate,
          lastQuizDate
        };
      })
    );
  }

  // Obtenir l'historique des quiz
  getUserQuizHistory(): Observable<QuizResult[]> {
    return this.apiService.get<QuizSession[]>('/quiz-sessions/my-sessions').pipe(
      map(sessions => 
        sessions.map(session => ({
          id: session.id,
          score: session.score,
          totalQuestions: session.totalQuestions,
          correctAnswers: session.correctAnswers,
          completedAt: session.completedAt ? new Date(session.completedAt) : new Date(),
          duration: session.timeSpent,
          categoryName: 'Quiz' // À récupérer depuis la session de questions
        }))
      )
    );
  }

  // Obtenir les statistiques globales (pour l'admin)
  getGlobalStatistics(): Observable<any> {
    return this.apiService.get<any>('/quiz-sessions/global-stats');
  }

  // Réinitialiser les statistiques
  resetStatistics(): void {
    this.quizResults.set([]);
    localStorage.removeItem('quizResults');
  }
}
