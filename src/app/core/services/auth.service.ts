import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { 
  LoginDto, 
  RegisterDto, 
  AuthResponseDto, 
  UserResponseDto, 
  UpdateUserDto 
} from '../models/api.models';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  subscriptionStatus: 'none' | 'trial' | 'active' | 'expired';
  trialExpiresAt?: Date;
  subscriptionExpiresAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);

  constructor(
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) {
    // Vérifier s'il y a un token stocké
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('currentUser');
    
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      
      // Vérifier si le token est toujours valide
      this.validateToken();
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  // Inscription
  register(registerData: RegisterDto): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>('/auth/register', registerData)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          console.error('Erreur lors de l\'inscription:', error);
          return throwError(() => error);
        })
      );
  }

  // Connexion
  login(credentials: LoginDto): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>('/auth/login', credentials)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          return throwError(() => error);
        })
      );
  }

  // Récupérer le profil utilisateur
  getProfile(): Observable<UserResponseDto> {
    return this.apiService.get<UserResponseDto>('/auth/me')
      .pipe(
        tap(user => {
          const userWithSubscription = this.mapUserResponseToUser(user);
          this.currentUser.set(userWithSubscription);
          localStorage.setItem('currentUser', JSON.stringify(userWithSubscription));
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération du profil:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // Mettre à jour le profil
  updateProfile(updateData: UpdateUserDto): Observable<UserResponseDto> {
    const userId = this.currentUser()?.id;
    if (!userId) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    return this.userService.updateUser(userId, updateData)
      .pipe(
        tap(user => {
          const userWithSubscription = this.mapUserResponseToUser(user);
          this.currentUser.set(userWithSubscription);
          localStorage.setItem('currentUser', JSON.stringify(userWithSubscription));
        }),
        catchError(error => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          return throwError(() => error);
        })
      );
  }

  // Supprimer le compte utilisateur
  deleteAccount(): Observable<void> {
    const userId = this.currentUser()?.id;
    if (!userId) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    return this.userService.deleteUser(userId)
      .pipe(
        tap(() => {
          this.logout();
        }),
        catchError(error => {
          console.error('Erreur lors de la suppression du compte:', error);
          return throwError(() => error);
        })
      );
  }

  // Déconnexion
  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Vérifier si l'utilisateur a accès aux fonctionnalités premium
  hasAccess(): boolean {
    const user = this.currentUser();
    return user !== null && (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trial');
  }

  // Vérifier si l'utilisateur est en essai
  isTrialActive(): boolean {
    const user = this.currentUser();
    if (!user || user.subscriptionStatus !== 'trial') return false;
    
    if (user.trialExpiresAt) {
      return new Date() < user.trialExpiresAt;
    }
    return false;
  }

  // Méthodes privées
  private handleAuthSuccess(response: AuthResponseDto) {
    localStorage.setItem('accessToken', response.accessToken);
    
    const userWithSubscription = this.mapUserResponseToUser(response.user);
    this.currentUser.set(userWithSubscription);
    this.isAuthenticated.set(true);
    
    localStorage.setItem('currentUser', JSON.stringify(userWithSubscription));
  }

  private mapUserResponseToUser(userResponse: UserResponseDto): User {
    return {
      id: userResponse.id,
      email: userResponse.email,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      isActive: userResponse.isActive,
      subscriptionStatus: 'none', // À récupérer depuis l'API d'abonnement
      trialExpiresAt: undefined,
      subscriptionExpiresAt: undefined
    };
  }

  private validateToken() {
    // Vérifier si le token est toujours valide en appelant l'API
    this.getProfile().subscribe({
      error: () => {
        // Token invalide, déconnecter l'utilisateur
        this.logout();
      }
    });
  }
}
