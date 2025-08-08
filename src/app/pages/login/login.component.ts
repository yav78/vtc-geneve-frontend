import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { LoginDto } from '../../core/models/api.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: LoginDto = { email: '', password: '' };
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage.set('Veuillez remplir tous les champs');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      this.authService.login(this.credentials).subscribe({
        next: (response) => {
          console.log('Connexion réussie:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);
          this.errorMessage.set(error.message || 'Email ou mot de passe incorrect');
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      this.errorMessage.set('Erreur de connexion');
      this.isLoading.set(false);
    }
  }
}
