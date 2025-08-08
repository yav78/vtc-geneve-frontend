import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { RegisterDto } from '../../core/models/api.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData: RegisterDto = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  confirmPassword = '';
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    // Validation des champs
    if (!this.registerData.email || !this.registerData.password || 
        !this.registerData.firstName || !this.registerData.lastName) {
      this.errorMessage.set('Veuillez remplir tous les champs');
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      this.errorMessage.set('Veuillez entrer une adresse email valide');
      return;
    }

    // Validation du mot de passe
    if (this.registerData.password.length < 6) {
      this.errorMessage.set('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Validation de la confirmation du mot de passe
    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage.set('Les mots de passe ne correspondent pas');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      this.authService.register(this.registerData).subscribe({
        next: (response) => {
          console.log('Inscription réussie:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          this.errorMessage.set(error.message || 'Erreur lors de l\'inscription');
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      this.errorMessage.set('Erreur lors de l\'inscription');
      this.isLoading.set(false);
    }
  }
}

