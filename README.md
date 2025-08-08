# VTC Quiz Application - Frontend Angular

Application frontend moderne pour les quiz VTC, intégrée avec une API backend complète.

## 🚀 Fonctionnalités

### 🔐 Authentification complète
- **Page de connexion** avec validation des credentials
- **Page d'inscription** avec validation complète des champs
- **Gestion des tokens JWT** avec stockage sécurisé
- **Protection des routes** avec redirection automatique
- **Profil utilisateur** avec informations personnelles

### 📊 Statistiques par utilisateur
- **Statistiques détaillées** : score moyen, taux de réussite, meilleur score
- **Historique complet** des quiz avec dates et résultats
- **Graphiques de progression** visuels
- **Données persistantes** stockées en base de données

### 🎮 Quiz interactif
- **Sélection de catégories** dynamique depuis l'API
- **Questions aléatoires** par catégorie
- **Navigation fluide** entre les questions
- **Barre de progression** en temps réel
- **Calcul automatique** des scores
- **Enregistrement** des résultats via API

### 💳 Gestion des abonnements
- **Plans d'abonnement** configurables
- **Essai gratuit** de 24h
- **Statut d'abonnement** en temps réel
- **Interface de paiement** (à intégrer)

## 🏗️ Architecture technique

### Frontend (Angular 17+)
```
src/
├── app/
│   ├── core/
│   │   ├── models/           # Interfaces TypeScript
│   │   │   └── api.models.ts # Modèles basés sur le Swagger
│   │   └── services/         # Services métier
│   │       ├── api.service.ts        # Service HTTP de base
│   │       ├── auth.service.ts       # Authentification
│   │       ├── quiz.service.ts       # Gestion des quiz
│   │       ├── statistics.service.ts # Statistiques
│   │       └── subscription.service.ts # Abonnements
│   ├── pages/
│   │   ├── home/             # Page d'accueil
│   │   ├── login/            # Connexion
│   │   ├── register/         # Inscription (NOUVEAU)
│   │   ├── quiz/             # Quiz interactif
│   │   ├── statistiques/     # Statistiques utilisateur
│   │   └── profil/           # Gestion profil
│   └── shared/
│       └── components/
│           └── navbar/       # Navigation partagée
```

### Backend (API REST)
- **Base de données** : MySQL 8.0
- **Authentification** : JWT
- **API** : RESTful avec Swagger
- **Endpoints** : Catégories, Questions, Quiz, Statistiques, Abonnements

## 🛠️ Installation et configuration

### Prérequis
- Node.js 18+ et npm
- Angular CLI 17+
- Backend API en cours d'exécution

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd vtc-app

# Installer les dépendances
npm install

# Configuration de l'API
# Modifier src/app/core/services/api.service.ts
# Changer la baseUrl selon votre configuration backend
```

### Configuration backend
1. **Démarrer le backend** sur `http://localhost:3000` (ou modifier l'URL dans `api.service.ts`)
2. **Vérifier la base de données** MySQL avec les tables requises
3. **Tester l'API** via Swagger UI

### Démarrage
```bash
# Développement
ng serve --port 4201

# Production
ng build --configuration production
```

## 🔗 Intégration API

### Endpoints principaux

#### Authentification
- `POST /auth/register` - Inscription (NOUVEAU)
- `POST /auth/login` - Connexion
- `GET /auth/me` - Profil utilisateur

#### Catégories et Questions
- `GET /categories` - Liste des catégories
- `GET /questions/category/{id}` - Questions par catégorie
- `GET /question-sessions` - Sessions de questions

#### Quiz
- `POST /quiz-sessions/start/{id}` - Démarrer un quiz
- `POST /quiz-sessions/{id}/answer` - Soumettre une réponse
- `POST /quiz-sessions/{id}/complete` - Terminer un quiz
- `GET /quiz-sessions/my-sessions` - Historique des quiz

#### Statistiques
- `GET /quiz-sessions/my-sessions` - Données pour statistiques
- Calculs côté frontend pour performance

#### Abonnements
- `GET /subscriptions/plans` - Plans disponibles
- `GET /subscriptions/my-subscription` - Abonnement actuel
- `POST /subscriptions/subscribe/{id}` - Souscrire

### Modèles de données

#### Utilisateur
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  subscriptionStatus: 'none' | 'trial' | 'active' | 'expired';
}
```

#### Inscription
```typescript
interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
```

#### Question
```typescript
interface Question {
  id: string;
  text: string;
  explanation?: string;
  categoryId: string;
  correctAnswerId?: string;
  answerChoices?: AnswerChoice[];
}
```

#### Statistiques
```typescript
interface UserStatistics {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
  totalTimeSpent: number;
  successRate: number;
  lastQuizDate?: Date;
}
```

## 🎨 Interface utilisateur

### Design system
- **Framework CSS** : Tailwind CSS
- **Composants** : Standalone Angular components
- **Responsive** : Mobile-first design
- **Accessibilité** : WCAG 2.1 compliant

### Pages principales
1. **Accueil** - Présentation et navigation
2. **Connexion** - Formulaire d'authentification
3. **Inscription** - Création de compte (NOUVEAU)
4. **Quiz** - Interface interactive de quiz
5. **Statistiques** - Tableaux de bord détaillés
6. **Profil** - Gestion du compte et abonnements

### Page d'inscription (NOUVEAU)
- **Formulaire complet** avec validation
- **Champs requis** : prénom, nom, email, mot de passe
- **Validation en temps réel** des champs
- **Confirmation de mot de passe**
- **Messages d'erreur** explicites
- **Design cohérent** avec le reste de l'application

## 🔒 Sécurité

### Authentification
- **Tokens JWT** gérés automatiquement
- **Validation automatique** des tokens
- **Déconnexion automatique** si token expiré
- **Protection des routes** sensibles

### Validation des données
- **Validation côté client** et serveur
- **Sanitisation** des entrées utilisateur
- **HTTPS** recommandé en production

## 🚀 Déploiement

### Production
```bash
# Build de production
ng build --configuration production

# Les fichiers sont dans dist/vtc-app/
# Déployer sur votre serveur web
```

### Variables d'environnement
```bash
# src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

# src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.votre-domaine.com'
};
```

## 🧪 Tests

### Tests unitaires
```bash
# Lancer les tests
ng test

# Tests avec couverture
ng test --code-coverage
```

### Tests E2E
```bash
# Lancer les tests E2E
ng e2e
```

## 📝 API Documentation

La documentation complète de l'API est disponible via Swagger UI :
- **URL** : `http://localhost:3000/api-docs` (en développement)
- **Format** : OpenAPI 3.0
- **Tests** : Interface interactive pour tester les endpoints

## 🤝 Contribution

### Workflow de développement
1. **Fork** du projet
2. **Branch** feature : `git checkout -b feature/nouvelle-fonctionnalite`
3. **Commit** : `git commit -m 'Ajout: description'`
4. **Push** : `git push origin feature/nouvelle-fonctionnalite`
5. **Pull Request** avec description détaillée

### Standards de code
- **TypeScript** strict mode
- **ESLint** et **Prettier** configurés
- **Conventions** Angular style guide
- **Tests** requis pour nouvelles fonctionnalités

## 📞 Support

### Documentation
- **README** : Ce fichier
- **Code** : Commentaires dans le code
- **API** : Swagger documentation

### Contact
- **Issues** : GitHub Issues
- **Email** : support@votre-domaine.com

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ pour les examens VTC**
