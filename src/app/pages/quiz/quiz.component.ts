import { Component, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { QuizService } from '../../core/services/quiz.service';
import { Router } from '@angular/router';
import { Question, AnswerChoice, QuizSession, SubmitAnswerDto, QuestionSession, Category } from '../../core/models/api.models';

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
  questionSessions: QuestionSession[] = [];
  selectedCategory: string | null = null;
  selectedQuestionSession: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly quizService: QuizService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté
    const user = this.authService.getCurrentUser()();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // Charger les catégories et sessions de questions
    this.loadCategories();
    this.loadQuestionSessions();
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

  private loadQuestionSessions() {
    this.quizService.getQuestionSessions().subscribe({
      next: (sessions) => {
        this.questionSessions = sessions;
        console.log(this.questionSessions);
        if (sessions.length > 0) {
          this.selectedQuestionSession = sessions[0].id;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sessions de questions:', error);
      }
    });
  }

  async startQuiz() {
    if (!this.selectedQuestionSession) {
      alert('Veuillez sélectionner une session de quiz');
      return;
    }

    this.isLoading.set(true);

    try {
      // Démarrer une session de quiz
      this.quizService.startQuizSession(this.selectedQuestionSession).subscribe({
        next: (quizSession) => {
          this.currentQuizSession = quizSession;

          // Récupérer les questions de la session
          this.quizService.getQuestionSessionWithQuestions(this.selectedQuestionSession!).subscribe({
            next: (sessionWithQuestions) => {
              // Récupérer les questions via l'endpoint approprié
              // Selon le Swagger, on peut utiliser l'endpoint pour récupérer les questions par catégorie
              console.log(sessionWithQuestions);

              this.questions = sessionWithQuestions.questions;
              // Démarrer le quiz
              this.started.set(true);
              this.completed.set(false);
              this.startTime.set(new Date());
              this.answers.set(new Array(this.questions.length).fill(-1));
              this.index.set(0);
              this.loadQuestion();
              this.isLoading.set(false);
            },
            error: (error) => {
              console.error('Erreur lors du chargement de la session:', error);
              alert('Erreur lors du chargement de la session');
              this.isLoading.set(false);
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors du démarrage de la session:', error);
          alert('Erreur lors du démarrage de la session');
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      console.error('Erreur lors du démarrage du quiz:', error);
      this.isLoading.set(false);
    }
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

    if (!this.currentQuizSession) {
      console.error('Aucune session de quiz active');
      return;
    }

    // Soumettre toutes les réponses
    const answers = this.answers();
    let submittedAnswers = 0;

    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const answerIndex = answers[i];

      if (answerIndex >= 0 && question.answerChoices && question.answerChoices[answerIndex]) {
        const submitData: SubmitAnswerDto = {
          questionId: question.id,
          answerChoiceId: question.answerChoices[answerIndex].id,
          timeSpent: duration / this.questions.length // Temps moyen par question
        };

        this.quizService.submitAnswer(this.currentQuizSession.id, submitData).subscribe({
          next: () => {
            submittedAnswers++;
            if (submittedAnswers === this.questions.length) {
              // Toutes les réponses soumises, terminer la session
              this.finalizeQuiz();
            }
          },
          error: (error) => {
            console.error('Erreur lors de la soumission de la réponse:', error);
          }
        });
      }
    }
  }

  private finalizeQuiz() {
    if (!this.currentQuizSession) return;

    this.quizService.completeQuizSession(this.currentQuizSession.id).subscribe({
      next: (completedSession) => {
        this.currentQuizSession = completedSession;
        this.completed.set(true);
        console.log('Quiz terminé:', completedSession);
      },
      error: (error) => {
        console.error('Erreur lors de la finalisation du quiz:', error);
        alert('Erreur lors de la finalisation du quiz');
      }
    });
  }

  getProgressPercentage(): number {
    return this.questions.length > 0 ? ((this.index() + 1) / this.questions.length) * 100 : 0;
  }

  getScore(): number {
    if (this.currentQuizSession) {
      return this.currentQuizSession.score;
    }
    return 0;
  }

  getAnsweredQuestionsCount(): number {
    return this.answers().filter(answer => answer >= 0).length;
  }

  getCorrectAnswersCount(): number {
    if (this.currentQuizSession) {
      return this.currentQuizSession.correctAnswers;
    }
    return 0;
  }

  // Propriété pour l'état de chargement
  isLoading = signal(false);

  // Méthode publique pour la navigation
  navigateToStatistics() {
    this.router.navigate(['/statistiques']);
  }

  getCategoryById(id: string): Category {
    return this.categories.find(category => category.id === id);
  }

  getSessionQuestionByCategoryType(categoryType: string): QuestionSession[] {
    const categoryId = this.categories.find(cat => cat.type === categoryType).id
    return this.questionSessions.filter(question => question.categoryId === categoryId);
  }
}
