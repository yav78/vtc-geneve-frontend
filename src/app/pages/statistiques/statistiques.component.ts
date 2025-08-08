import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { StatisticsService, UserStatistics, QuizResult } from '../../core/services/statistics.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, DatePipe],
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.scss'
})
export class StatistiquesComponent implements OnInit {
  statistics = signal<UserStatistics>({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalQuestions: 0,
    totalCorrectAnswers: 0,
    totalTimeSpent: 0,
    successRate: 0
  });
  quizHistory = signal<QuizResult[]>([]);
  isLoading = signal(true);
  currentUser = signal<any>(null);

  constructor(
    private statisticsService: StatisticsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté
    const user = this.authService.getCurrentUser()();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser.set(user);
    this.loadStatistics();
  }

  private loadStatistics() {
    this.isLoading.set(true);

    // Charger les statistiques
    this.statisticsService.getUserStatistics().subscribe({
      next: (stats) => {
        this.statistics.set(stats);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
        this.statistics.set({
          totalQuizzes: 0,
          averageScore: 0,
          bestScore: 0,
          totalQuestions: 0,
          totalCorrectAnswers: 0,
          totalTimeSpent: 0,
          successRate: 0
        });
      }
    });

    // Charger l'historique des quiz
    this.statisticsService.getUserQuizHistory().subscribe({
      next: (history) => {
        this.quizHistory.set(history);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'historique:', error);
        this.quizHistory.set([]);
        this.isLoading.set(false);
      }
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }

  getScoreBgColor(score: number): string {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  }
}
