# Services API - Documentation

Cette documentation décrit les services mis à jour pour correspondre à l'API OpenAPI VTC Quiz.

## Services Principaux

### ApiService
Service de base pour les appels HTTP avec gestion automatique des tokens d'authentification.

**Méthodes principales :**
- `get<T>(endpoint: string): Observable<T>`
- `post<T>(endpoint: string, data: any): Observable<T>`
- `put<T>(endpoint: string, data: any): Observable<T>`
- `delete<T>(endpoint: string): Observable<T>`

### AuthService
Service d'authentification et de gestion des utilisateurs.

**Endpoints utilisés :**
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Récupérer le profil

**Méthodes principales :**
- `register(registerData: RegisterDto): Observable<AuthResponseDto>`
- `login(credentials: LoginDto): Observable<AuthResponseDto>`
- `getProfile(): Observable<UserResponseDto>`
- `updateProfile(updateData: UpdateUserDto): Observable<UserResponseDto>`
- `deleteAccount(): Observable<void>`
- `logout(): void`

### UserService
Service pour la gestion des utilisateurs.

**Endpoints utilisés :**
- `PUT /users/{id}` - Mettre à jour un utilisateur
- `DELETE /users/{id}` - Supprimer un utilisateur

**Méthodes principales :**
- `updateUser(id: string, updateData: UpdateUserDto): Observable<UserResponseDto>`
- `deleteUser(id: string): Observable<void>`

## Services Spécialisés

### CategoryService
Service pour la gestion des catégories.

**Endpoints utilisés :**
- `GET /categories` - Récupérer toutes les catégories
- `GET /categories/{id}` - Récupérer une catégorie par ID
- `GET /categories/{id}/questions` - Récupérer les questions d'une catégorie

**Méthodes principales :**
- `getAllCategories(): Observable<Category[]>`
- `getCategoryById(id: string): Observable<Category>`
- `getQuestionsByCategory(categoryId: string, params: QuestionsByCategoryParams): Observable<Question[]>`

### QuestionService
Service pour la gestion des questions.

**Endpoints utilisés :**
- `GET /questions/category/{categoryId}` - Récupérer des questions aléatoires par catégorie
- `GET /questions/{id}` - Récupérer une question par ID

**Méthodes principales :**
- `getRandomQuestionsByCategory(categoryId: string, limit?: number): Observable<Question[]>`
- `getQuestionById(id: string): Observable<Question>`

### QuestionSessionService
Service pour la gestion des sessions de questions.

**Endpoints utilisés :**
- `GET /question-sessions` - Récupérer toutes les sessions
- `GET /question-sessions/{id}` - Récupérer une session par ID
- `GET /question-sessions/{id}/with-questions` - Récupérer une session avec ses questions
- `POST /question-sessions` - Créer une session
- `PUT /question-sessions/{id}` - Mettre à jour une session
- `DELETE /question-sessions/{id}` - Supprimer une session

**Méthodes principales :**
- `getAllQuestionSessions(): Observable<QuestionSession[]>`
- `getQuestionSessionById(id: string): Observable<QuestionSession>`
- `getQuestionSessionWithQuestions(id: string): Observable<QuestionSession>`
- `createQuestionSession(sessionData: CreateQuestionSessionDto): Observable<QuestionSession>`
- `updateQuestionSession(id: string, sessionData: UpdateQuestionSessionDto): Observable<QuestionSession>`
- `deleteQuestionSession(id: string): Observable<void>`

### QuizSessionService
Service pour la gestion des sessions de quiz.

**Endpoints utilisés :**
- `POST /quiz-sessions/start/{questionSessionId}` - Démarrer une session
- `POST /quiz-sessions/{sessionId}/answer` - Soumettre une réponse
- `POST /quiz-sessions/{sessionId}/complete` - Terminer une session
- `GET /quiz-sessions/my-sessions` - Récupérer les sessions de l'utilisateur
- `GET /quiz-sessions/{sessionId}` - Récupérer les détails d'une session

**Méthodes principales :**
- `startQuizSession(questionSessionId: string): Observable<QuizSession>`
- `submitAnswer(sessionId: string, answerData: SubmitAnswerDto): Observable<QuizAnswer>`
- `completeQuizSession(sessionId: string): Observable<QuizSession>`
- `getMyQuizSessions(params?: QuizSessionQueryParams): Observable<QuizSession[]>`
- `getQuizSessionDetails(sessionId: string): Observable<QuizSession>`

### SubscriptionService
Service pour la gestion des abonnements.

**Endpoints utilisés :**
- `GET /subscriptions/plans` - Récupérer tous les plans
- `GET /subscriptions/plans/{id}` - Récupérer un plan par ID
- `POST /subscriptions/subscribe/{planId}` - Souscrire à un plan
- `GET /subscriptions/my-subscription` - Récupérer l'abonnement de l'utilisateur

**Méthodes principales :**
- `getSubscriptionPlans(): Observable<SubscriptionPlan[]>`
- `getSubscriptionPlanById(id: string): Observable<SubscriptionPlan>`
- `subscribeToPlan(planId: string): Observable<UserSubscription>`
- `getMySubscription(): Observable<UserSubscription>`

## Service Principal - QuizService

Le `QuizService` agit comme un service de façade qui délègue les appels aux services spécialisés appropriés. Il fournit une interface unifiée pour toutes les opérations liées aux quiz.

## Modèles de Données

Tous les modèles sont définis dans `src/app/core/models/api.models.ts` et correspondent exactement aux schémas de l'API OpenAPI :

- **Authentification :** `RegisterDto`, `LoginDto`, `AuthResponseDto`, `UserResponseDto`, `UpdateUserDto`
- **Catégories et Questions :** `Category`, `Question`, `AnswerChoice`
- **Abonnements :** `SubscriptionPlan`, `UserSubscription`
- **Sessions de Questions :** `CreateQuestionSessionDto`, `QuestionSession`, `UpdateQuestionSessionDto`
- **Sessions de Quiz :** `QuizSession`, `QuizAnswer`, `SubmitAnswerDto`
- **Paramètres de Requête :** `QuizSessionQueryParams`, `QuestionsByCategoryParams`

## Utilisation

```typescript
import { QuizService, AuthService, CategoryService } from '@core/services';

// Dans un composant
constructor(
  private quizService: QuizService,
  private authService: AuthService,
  private categoryService: CategoryService
) {}

// Exemples d'utilisation
this.quizService.getCategories().subscribe(categories => {
  console.log('Catégories:', categories);
});

this.quizService.startQuizSession(sessionId).subscribe(session => {
  console.log('Session démarrée:', session);
});
```

## Gestion des Erreurs

Tous les services utilisent le `ApiService` qui gère automatiquement :
- L'ajout des headers d'authentification
- La gestion des erreurs HTTP
- La transformation des réponses

## Sécurité

- Les tokens JWT sont automatiquement inclus dans les headers des requêtes
- La validation des tokens est gérée par le `AuthService`
- Les endpoints protégés nécessitent une authentification
