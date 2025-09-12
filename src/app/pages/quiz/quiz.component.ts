import { Component, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { QuizButtonComponent } from '../../shared/components/quiz-button/quiz-button.component';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { QuizService } from '../../core/services/quiz.service';
import { StatisticsService } from '../../core/services/statistics.service';
import { Router } from '@angular/router';
import { Question, AnswerChoice, QuizSession, SubmitAnswerDto, QuestionSession, Category } from '../../core/models/api.models';
import { Utils } from '../../core/services/utils.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NavbarComponent, QuizButtonComponent, NgIf, NgFor],
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

  // Nouvelles propriétés pour le feedback immédiat
  showFeedback = signal(false);
  isCorrect = signal(false);
  correctAnswerIndex = signal<number | null>(null);
  userAnswerIndex = signal<number | null>(null);

  questions: Question[] = [];
  currentQuizSession: QuizSession | null = null;
  categories: any[] = [];
  questionSessions: QuestionSession[] = [];
  selectedCategory: string | null = null;
  selectedQuestionSession: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly quizService: QuizService,
    private readonly statisticsService: StatisticsService,
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
        console.log('Sessions de questions chargées:', sessions.length);

        if (sessions.length > 0) {
          this.selectedQuestionSession = sessions[0].id;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sessions de questions:', error);
      }
    });
  }

  // Méthode pour démarrer un quiz spécifique
  async startSpecificQuiz(sessionId: string) {
    try {
      // Vérifier s'il y a une progression sauvegardée
      const savedProgress = this.checkSavedProgress(sessionId);
      console.log('Progression sauvegardée trouvée:', savedProgress);

      if (savedProgress && savedProgress.status === 'non_terminé') {
        console.log('Reprise automatique du quiz');
        await this.resumeQuiz(savedProgress);
        return;
      }

      console.log('Démarrage d\'un nouveau quiz');
      // Démarrer une session de quiz
      this.quizService.startQuizSession(sessionId).subscribe({
        next: (quizSession) => {
          this.currentQuizSession = quizSession;

          // Récupérer les questions de la session
          this.quizService.getQuestionSessionWithQuestions(sessionId).subscribe({
            next: (sessionWithQuestions) => {
              console.log('Session avec questions:', sessionWithQuestions);

              // Utiliser directement les questions de la session
              if (sessionWithQuestions.questions && sessionWithQuestions.questions.length > 0) {
                console.log('=== CHEMIN 1: Questions de la session ===');
                console.log('Nombre de questions:', sessionWithQuestions.questions.length);
                console.log('Première question:', sessionWithQuestions.questions[0]?.text);
                console.log('Questions avant mélange:', sessionWithQuestions.questions);

                // Créer une copie profonde des questions pour éviter de modifier les données originales
                this.questions = sessionWithQuestions.questions.map(question => ({
                  ...question,
                  answerChoices: [...(question.answerChoices || [])]
                }));
                
                // Mélanger les réponses de chaque question
                this.questions.forEach((question, index, array) => {
                  if (question.answerChoices && Array.isArray(question.answerChoices) && question.answerChoices.length > 0) {
                    question.answerChoices = Utils.shuffleArray(question.answerChoices as AnswerChoice[]);
                  }
                });


                this.index.set(0);
                this.selected.set(null);
                this.answers.set(new Array(this.questions.length).fill(-1));
                this.startTime.set(new Date());
                this.started.set(true);

                // Charger la première question
                this.question.set(this.questions[0]);
                console.log('Première question chargée:', this.questions[0]);
              } else {
                console.error('Aucune question trouvée dans la session');
                alert('Aucune question trouvée dans cette session de quiz');
              }
            },
            error: (error) => {
              console.error('Erreur lors du chargement de la session:', error);
              alert('Erreur lors du chargement de la session');
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors du démarrage du quiz:', error);
          alert('Erreur lors du démarrage du quiz');
        }
      });
    } catch (error) {
      console.error('Erreur lors du démarrage du quiz:', error);
      alert('Erreur lors du démarrage du quiz');
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

    // Afficher le feedback immédiat
    this.showImmediateFeedback(i);
  }

  // Nouvelle méthode pour afficher le feedback immédiat
  private showImmediateFeedback(userAnswerIndex: number) {
    const currentQuestion = this.question();
    if (!currentQuestion || !currentQuestion.answerChoices) return;

    console.log('=== DÉBOGAGE FEEDBACK ===');
    console.log('Question:', currentQuestion);
    console.log('Réponse utilisateur (index):', userAnswerIndex);
    console.log('correctAnswerId:', currentQuestion.correctAnswerId);
    console.log('Choix de réponses:', currentQuestion.answerChoices);

    // Trouver la réponse correcte en utilisant correctAnswerId
    let correctAnswerIndex = currentQuestion.answerChoices.findIndex(answer =>
      answer.id === currentQuestion.correctAnswerId
    );

    // Fallback: si correctAnswerId n'est pas défini, utiliser le premier choix
    if (correctAnswerIndex === -1) {
      console.log('correctAnswerId non trouvé, utilisation du premier choix comme fallback');
      correctAnswerIndex = 0;
    }

    console.log('Index de la bonne réponse:', correctAnswerIndex);

    // Vérifier si la réponse est correcte
    const isCorrect = userAnswerIndex === correctAnswerIndex;

    console.log('Est-ce correct?', isCorrect);

    // Afficher le feedback
    this.userAnswerIndex.set(userAnswerIndex);
    this.correctAnswerIndex.set(correctAnswerIndex);
    this.isCorrect.set(isCorrect);
    this.showFeedback.set(true);

    console.log('Feedback affiché:', {
      userAnswerIndex: this.userAnswerIndex(),
      correctAnswerIndex: this.correctAnswerIndex(),
      isCorrect: this.isCorrect(),
      showFeedback: this.showFeedback()
    });

    // Passer automatiquement à la question suivante après 2 secondes
    setTimeout(() => {
      this.showFeedback.set(false);
      this.nextQuestion();
    }, 2000);
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

  // Méthode pour obtenir le texte du bouton selon l'état
  getButtonText(sessionId: string): string {
    if (this.hasSavedProgress(sessionId)) {
      return 'Reprendre le quiz';
    }
    return 'Commencer ce quiz';
  }

  // Méthode pour passer à la question suivante
  nextQuestion() {
    // Masquer le feedback
    this.showFeedback.set(false);

    // Sauvegarder la réponse actuelle si elle existe
    if (this.selected() !== null) {
      const currentAnswers = this.answers();
      currentAnswers[this.index()] = this.selected()!;
      this.answers.set([...currentAnswers]);
    }

    // Sauvegarder la progression
    this.saveQuizProgress('en_cours');

    if (this.index() < this.questions.length - 1) {
      this.index.set(this.index() + 1);
      this.question.set(this.questions[this.index()]);
      this.selected.set(null);
    } else {
      this.completeQuiz();
    }
  }

  // Méthode pour passer à la question précédente
  previousQuestion() {
    if (this.index() > 0) {
      // Masquer le feedback
      this.showFeedback.set(false);

      this.index.set(this.index() - 1);
      this.question.set(this.questions[this.index()]);

      // Restaurer la réponse précédente
      const currentAnswer = this.answers()[this.index()];
      this.selected.set(currentAnswer >= 0 ? currentAnswer : null);
    }
  }

  // Méthode pour passer une question
  skipQuestion() {
    // Masquer le feedback
    this.showFeedback.set(false);

    // Marquer la question comme passée (-2)
    const currentAnswers = this.answers();
    currentAnswers[this.index()] = -2;
    this.answers.set([...currentAnswers]);

    // Sauvegarder la progression
    this.saveQuizProgress('en_cours');

    if (this.index() < this.questions.length - 1) {
      this.index.set(this.index() + 1);
      this.question.set(this.questions[this.index()]);
      this.selected.set(null);
    } else {
      this.completeQuiz();
    }
  }

  // Méthode pour terminer le quiz
  completeQuiz() {
    // Masquer le feedback
    this.showFeedback.set(false);

    // Sauvegarder la progression finale
    this.saveQuizProgress('terminé');

    // Calculer les statistiques finales
    const finalScore = this.getScore();
    const correctAnswers = this.getCorrectAnswersCount();
    const totalQuestions = this.questions.length;
    const answeredQuestions = this.getAnsweredQuestionsCount();

    // Calculer le temps passé
    const endTime = new Date();
    const startTime = this.startTime();
    const durationInMinutes = startTime ? Math.round((endTime.getTime() - startTime.getTime()) / 60000) : 0;

    console.log('=== RÉSULTATS FINAUX DU QUIZ ===');
    console.log('Score final:', finalScore);
    console.log('Réponses correctes:', correctAnswers);
    console.log('Total questions:', totalQuestions);
    console.log('Questions répondues:', answeredQuestions);
    console.log('Temps passé (minutes):', durationInMinutes);

    // Envoyer les résultats aux statistiques
    this.statisticsService.addQuizResult({
      score: finalScore,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
      completedAt: endTime,
      duration: durationInMinutes,
      categoryName: this.getCurrentCategoryName()
    });

    // Marquer le quiz comme terminé
    this.completed.set(true);
  }

  // Méthode pour réinitialiser le quiz
  resetQuiz() {
    this.started.set(false);
    this.completed.set(false);
    this.index.set(0);
    this.selected.set(null);
    this.question.set(null);
    this.answers.set([]);
    this.startTime.set(null);
    this.currentQuizSession = null;
    this.questions = [];
  }

  // Méthode pour calculer le pourcentage de progression
  getProgressPercentage(): number {
    if (this.questions.length === 0) return 0;
    return Math.round(((this.index() + 1) / this.questions.length) * 100);
  }

  // Méthode pour obtenir la classe CSS du statut d'une question
  getQuestionStatusClass(questionIndex: number, answer: number): string {
    if (questionIndex === this.index()) {
      return 'bg-teal-500'; // Question actuelle
    } else if (answer >= 0) {
      // Vérifier si la réponse est correcte
      const question = this.questions[questionIndex];
      if (question && question.answerChoices) {
        let correctAnswerIndex = question.answerChoices.findIndex(choice =>
          choice.id === question.correctAnswerId
        );
        if (correctAnswerIndex === -1) {
          correctAnswerIndex = 0; // Fallback
        }

        if (answer === correctAnswerIndex) {
          return 'bg-green-500'; // Question répondue correctement
        } else {
          return 'bg-red-500'; // Question répondue incorrectement
        }
      }
      return 'bg-green-500'; // Fallback
    } else if (answer === -2) {
      return 'bg-yellow-500'; // Question passée
    } else {
      return 'bg-gray-400'; // Question non traitée
    }
  }

  getScore(): number {
    // Calculer le score basé sur les réponses réelles de l'utilisateur
    const correctAnswers = this.getCorrectAnswersCount();
    const totalQuestions = this.questions.length;

    if (totalQuestions === 0) return 0;

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    console.log(`Score calculé: ${correctAnswers}/${totalQuestions} = ${score}%`);

    return score;
  }

  getAnsweredQuestionsCount(): number {
    return this.answers().filter(answer => answer >= 0).length;
  }

  getCorrectAnswersCount(): number {
    let correctCount = 0;

    // Parcourir toutes les réponses de l'utilisateur
    this.answers().forEach((userAnswer, questionIndex) => {
      // Ignorer les questions non répondues ou passées
      if (userAnswer >= 0) {
        const question = this.questions[questionIndex];
        if (question && question.answerChoices) {
          // Trouver l'index de la bonne réponse
          let correctAnswerIndex = question.answerChoices.findIndex(choice =>
            choice.id === question.correctAnswerId
          );

          // Fallback si correctAnswerId n'est pas défini
          if (correctAnswerIndex === -1) {
            correctAnswerIndex = 0;
          }

          // Vérifier si la réponse de l'utilisateur est correcte
          if (userAnswer === correctAnswerIndex) {
            correctCount++;
          }
        }
      }
    });

    console.log(`Réponses correctes calculées: ${correctCount}/${this.getAnsweredQuestionsCount()}`);
    return correctCount;
  }

  getSkippedQuestionsCount(): number {
    return this.answers().filter(answer => answer === -2).length;
  }

  // Méthode publique pour la navigation
  navigateToStatistics() {
    this.router.navigate(['/statistiques']);
  }

  getCategoryById(id: string): Category {
    return this.categories.find(category => category.id === id);
  }

  // Méthode pour obtenir les sessions par catégorie
  getSessionQuestionByCategoryType(categoryType: string): QuestionSession[] {
    return this.questionSessions.filter(session => {
      const categoryName = session.category?.name;
      const categoryId = session.category?.id;

      return categoryName === categoryType || categoryId === categoryType;
    });
  }

  getCurrentCategoryName(): string {
    // Essayer de récupérer le nom de la catégorie depuis la session de questions
    if (this.currentQuizSession && this.questionSessions.length > 0) {
      const session = this.questionSessions.find(s => s.id === this.currentQuizSession?.id);
      if (session?.category?.name) {
        return session.category.name;
      }
    }
    return 'Quiz';
  }

  // Méthode pour quitter le quiz
  quitQuiz() {
    if (confirm('Êtes-vous sûr de vouloir quitter le quiz ? Votre progression sera sauvegardée.')) {
      try {
        console.log('Tentative de sauvegarde avant de quitter...');
        console.log('Session actuelle:', this.currentQuizSession);
        console.log('Index actuel:', this.index());
        console.log('Réponses actuelles:', this.answers());

        // Sauvegarder la progression
        this.saveQuizProgress('non_terminé');
        console.log('Progression sauvegardée avec succès');

        // Réinitialiser l'interface
        this.resetQuiz();
        console.log('Quiz réinitialisé');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        alert('Erreur lors de la sauvegarde de la progression');
      }
    }
  }

  // Méthode pour recommencer un quiz depuis le début
  restartQuiz(sessionId: string) {
    if (confirm('Voulez-vous vraiment recommencer ce quiz depuis le début ? Votre progression actuelle sera perdue.')) {
      // Supprimer la progression sauvegardée
      localStorage.removeItem(`quiz_progress_${sessionId}`);
      console.log('Progression supprimée, redémarrage du quiz');

      // Redémarrer le quiz
      this.startSpecificQuiz(sessionId);
    }
  }

  // Méthode pour sauvegarder la progression du quiz
  private async saveQuizProgress(status: 'en_cours' | 'terminé' | 'non_terminé') {
    console.log('Début de la sauvegarde de la progression...');
    console.log('Status:', status);
    console.log('Session actuelle:', this.currentQuizSession);

    if (!this.currentQuizSession) {
      console.error('Aucune session de quiz active pour la sauvegarde');
      throw new Error('Aucune session de quiz active');
    }

    const progressData = {
      sessionId: this.currentQuizSession.id,
      status: status,
      currentQuestionIndex: this.index(),
      answers: this.answers(),
      startTime: this.startTime(),
      endTime: status === 'terminé' ? new Date() : null,
      totalQuestions: this.questions.length
    };

    console.log('Données de progression à sauvegarder:', progressData);

    // Sauvegarder dans le localStorage pour la reprise
    const storageKey = `quiz_progress_${this.currentQuizSession.id}`;
    localStorage.setItem(storageKey, JSON.stringify(progressData));

    console.log('Progression sauvegardée avec succès:', progressData);
    console.log('Clé de stockage:', storageKey);

    // Vérifier que la sauvegarde a fonctionné
    const savedData = localStorage.getItem(storageKey);
    console.log('Données vérifiées dans localStorage:', savedData);
  }

  // Méthode pour vérifier s'il y a une progression sauvegardée
  private checkSavedProgress(sessionId: string): any {
    const savedProgress = localStorage.getItem(`quiz_progress_${sessionId}`);
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (error) {
        console.error('Erreur lors du parsing de la progression sauvegardée:', error);
        return null;
      }
    }
    return null;
  }

  // Méthode pour reprendre un quiz interrompu
  private async resumeQuiz(progressData: any) {
    console.log('Début de la reprise du quiz avec les données:', progressData);

    try {
      // Démarrer une nouvelle session ou reprendre l'existante
      this.quizService.startQuizSession(progressData.sessionId).subscribe({
        next: (quizSession) => {
          console.log('Session de quiz redémarrée:', quizSession);
          this.currentQuizSession = quizSession;

          // Récupérer les questions
          this.quizService.getQuestionSessionWithQuestions(progressData.sessionId).subscribe({
            next: (sessionWithQuestions) => {
              console.log('Questions récupérées pour la reprise:', sessionWithQuestions);

              if (sessionWithQuestions.questions && sessionWithQuestions.questions.length > 0) {
                this.questions = sessionWithQuestions.questions;

                // Restaurer la progression
                this.index.set(progressData.currentQuestionIndex);
                this.answers.set(progressData.answers);
                this.startTime.set(new Date(progressData.startTime));
                this.started.set(true);
                this.completed.set(false);

                // Charger la question actuelle
                this.question.set(this.questions[this.index()]);

                // Restaurer la sélection précédente si elle existe
                const currentAnswer = this.answers()[this.index()];
                this.selected.set(currentAnswer >= 0 ? currentAnswer : null);

                console.log('Quiz repris avec succès à la question:', this.index() + 1);
                console.log('Réponses restaurées:', this.answers());
                console.log('Question actuelle:', this.question());
              } else {
                console.error('Aucune question trouvée pour la reprise');
                // En cas d'erreur, démarrer un nouveau quiz
                this.startSpecificQuiz(progressData.sessionId);
              }
            },
            error: (error) => {
              console.error('Erreur lors de la reprise du quiz:', error);
              // En cas d'erreur, démarrer un nouveau quiz
              this.startSpecificQuiz(progressData.sessionId);
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la reprise de la session:', error);
          // En cas d'erreur, démarrer un nouveau quiz
          this.startSpecificQuiz(progressData.sessionId);
        }
      });
    } catch (error) {
      console.error('Erreur lors de la reprise du quiz:', error);
      // En cas d'erreur, démarrer un nouveau quiz
      this.startSpecificQuiz(progressData.sessionId);
    }
  }

  // Méthode pour vérifier s'il y a une progression sauvegardée pour un quiz
  hasSavedProgress(sessionId: string): boolean {
    console.log(`Vérification de la progression pour la session: ${sessionId}`);
    const savedProgress = this.checkSavedProgress(sessionId);
    console.log('Progression trouvée:', savedProgress);

    const hasProgress = savedProgress !== null && savedProgress.status === 'non_terminé';
    console.log(`Session ${sessionId} a une progression: ${hasProgress}`);

    return hasProgress;
  }

  // Méthode pour gérer les clics sur les boutons de quiz
  onQuizButtonClick(sessionId: string) {
    this.startSpecificQuiz(sessionId);
  }

  // Méthode pour gérer les clics sur le bouton de redémarrage
  onRestartQuizClick(sessionId: string) {
    this.restartQuiz(sessionId);
  }
}