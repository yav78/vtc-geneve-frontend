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
    this.apiService.get<QuizSession[]>('/quiz-sessions/my-sessions').subscribe({
      next: (sessions) => {
        const results: QuizResult[] = sessions.map(session => ({
          id: session.id,
          score: session.score,
          totalQuestions: session.totalQuestions,
          correctAnswers: session.correctAnswers,
          completedAt: session.completedAt ? new Date(session.completedAt) : new Date(),
          duration: session.timeSpent,
          categoryName: 'Quiz' // À récupérer depuis la session de questions
        }));
        this.quizResults.set(results);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des résultats:', error);
        this.quizResults.set([]);
      }
    });
  }

  // Ajouter un résultat de quiz
  addQuizResult(result: Omit<QuizResult, 'id'>): void {
    const newResult: QuizResult = {
      ...result,
      id: Date.now().toString() // ID temporaire
    };
    
    const currentResults = this.quizResults();
    this.quizResults.set([newResult, ...currentResults]);
    
    // En production, vous devriez appeler l'API pour sauvegarder
    console.log('Résultat ajouté:', newResult);
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
