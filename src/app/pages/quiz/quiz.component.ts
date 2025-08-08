import { Component, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { QuizService } from '../../core/services/quiz.service';
import { Router } from '@angular/router';
import { Question, AnswerChoice, QuizSession, SubmitAnswerDto } from '../../core/models/api.models';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, DecimalPipe],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  started = signal(false);
  completed = signal(false);
  index = signal(0);
  selected = signal<number | null>(null);
  question = signal<Question | null>(null);
  answers = signal<number[]>([]);
  startTime = signal<Date | null>(null);
  
  questions: Question[] = [];
  currentQuizSession: QuizSession | null = null;
  categories: any[] = [];
  selectedCategory: string | null = null;
  
  constructor(
    private readonly authService: AuthService,
    private readonly quizService: QuizService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté
    const user = this.authService.getCurrentUser()();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // Charger les catégories
    this.loadCategories();
  }

  private loadCategories() {
    this.quizService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (categories.length > 0) {
          this.selectedCategory = categories[0].id;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }

  async startQuiz() {
    if (!this.selectedCategory) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    this.isLoading.set(true);

    try {
      // Récupérer les questions de la catégorie
      this.quizService.getQuestionsByCategory(this.selectedCategory, 100).subscribe({
        next: (questions) => {
          this.questions = questions;
          if (questions.length === 0) {
            alert('Aucune question disponible pour cette catégorie');
            this.isLoading.set(false);
            return;
          }

          // Démarrer la session de quiz
          this.startQuizSession();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des questions:', error);
          alert('Erreur lors du chargement des questions');
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      console.error('Erreur lors du démarrage du quiz:', error);
      this.isLoading.set(false);
    }
  }

  private startQuizSession() {
    // Pour l'instant, on simule une session de quiz
    // En production, vous devriez créer une session via l'API
    this.started.set(true);
    this.completed.set(false);
    this.startTime.set(new Date());
    this.answers.set(new Array(this.questions.length).fill(-1));
    this.index.set(0);
    this.loadQuestion();
    this.isLoading.set(false);
  }

  loadQuestion() {
    this.selected.set(null);
    this.question.set(this.questions[this.index()] ?? null);
  }

  selectAnswer(i: number) {
    this.selected.set(i);
    // Sauvegarder la réponse
    const currentAnswers = this.answers();
    currentAnswers[this.index()] = i;
    this.answers.set([...currentAnswers]);
  }

  next() {
    if (this.index() < this.questions.length - 1) {
      this.index.set(this.index() + 1);
      this.loadQuestion();
    } else {
      this.completeQuiz();
    }
  }

  prev() {
    if (this.index() > 0) {
      this.index.set(this.index() - 1);
      this.loadQuestion();
    }
  }

  private completeQuiz() {
    const endTime = new Date();
    const startTime = this.startTime();
    const duration = startTime ? Math.round((endTime.getTime() - startTime.getTime()) / 60000) : 0;
    
    // Calculer le score
    const answers = this.answers();
    let correctAnswers = 0;
    
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const answerIndex = answers[i];
      
      if (answerIndex >= 0 && 
          question.answerChoices && 
          question.answerChoices[answerIndex] && 
          question.correctAnswerId &&
          question.answerChoices[answerIndex].id === question.correctAnswerId) {
        correctAnswers++;
      }
    }
    
    const score = Math.round((correctAnswers / this.questions.length) * 100);
    
    // Enregistrer le résultat (pour l'instant en local)
    try {
      // Ici vous devriez appeler l'API pour enregistrer le résultat
      console.log('Quiz terminé:', { score, correctAnswers, totalQuestions: this.questions.length });
      this.completed.set(true);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du résultat:', error);
      alert('Erreur lors de l\'enregistrement du résultat');
    }
  }

  getProgressPercentage(): number {
    return this.questions.length > 0 ? ((this.index() + 1) / this.questions.length) * 100 : 0;
  }

  getScore(): number {
    const answers = this.answers();
    let correctAnswers = 0;
    
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const answerIndex = answers[i];
      
      if (answerIndex >= 0 && 
          question.answerChoices && 
          question.answerChoices[answerIndex] && 
          question.correctAnswerId &&
          question.answerChoices[answerIndex].id === question.correctAnswerId) {
        correctAnswers++;
      }
    }
    
    return this.questions.length > 0 ? Math.round((correctAnswers / this.questions.length) * 100) : 0;
  }

  getAnsweredQuestionsCount(): number {
    return this.answers().filter(answer => answer >= 0).length;
  }

  getCorrectAnswersCount(): number {
    const answers = this.answers();
    let correctAnswers = 0;
    
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const answerIndex = answers[i];
      
      if (answerIndex >= 0 && 
          question.answerChoices && 
          question.answerChoices[answerIndex] && 
          question.correctAnswerId &&
          question.answerChoices[answerIndex].id === question.correctAnswerId) {
        correctAnswers++;
      }
    }
    
    return correctAnswers;
  }

  // Propriété pour l'état de chargement
  isLoading = signal(false);

  // Méthode publique pour la navigation
  navigateToStatistics() {
    this.router.navigate(['/statistiques']);
  }
}
