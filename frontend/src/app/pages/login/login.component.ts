import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../core/stores/users/user-store.service';
import { AuthResponseDto } from '../../core/dtos/auth/auth-response.dto';
import { UserLoginGoogleDto } from '../../core/dtos/auth/external-auth/user-login-google.dto';
import { UserGetDto } from '../../core/dtos/users/user-get.dto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode: boolean = true; // Mode par défaut : connexion
  errorMessage: string | null = null; // Pour stocker les erreurs

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.initForms();

    // gère le retour de google authentification
    this.route.queryParams.subscribe(params => {
      if (params['isSuccess'] === 'true') {
        const isGoogleRegister = params['isGoogleRegister'] === 'true';
        const dataLogin: UserLoginGoogleDto = {
          email: params['email'],
        }
  
        if (isGoogleRegister) {
          // Si l'utilisateur doit compléter l'inscription
          this.isLoginMode = false; // Passer en mode inscription
          this.registerForm.patchValue(dataLogin); // Pré-remplir l'email
        } else {
          // Connexion directe avec l'email récupéré
          this.authService.loginPostGoogleAuth(dataLogin).subscribe({
            next: (response: AuthResponseDto) => {
              if (response.isSuccess) {
                console.log('Connexion réussie', response);
                // Rediriger vers la page d'accueil
                this.router.navigate(['/']);
              } else {
                this.errorMessage = response.message;  // Afficher le message d'erreur
              }
            },
            error: () => {
              this.errorMessage = 'Une erreur est survenue lors de la connexion.';
            }
          });
        }
      } else if (params['isSuccess'] === 'false') {
        this.errorMessage = 'Une erreur est survenue lors de l\'authentification Google.';
      }
    });
  }

  // Initialisation des formulaires de connexion et d'inscription
  initForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email valide requis
      password: ['', [Validators.required, Validators.minLength(6)]], // Mdp avec min 6 caractères
    });

    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]], // Prénom min 2 caractères
      lastname: ['', [Validators.required, Validators.minLength(2)]],  // Nom min 2 caractères
      email: ['', [Validators.required, Validators.email]],  // Email valide requis
      password: ['', [Validators.required, Validators.minLength(6)]],  // Mdp avec min 6 caractères
      confirmPassword: ['', [Validators.required]], // Confirmation du mdp
      gender: ['', Validators.required], // Genre requis
      age: ['', [Validators.required, Validators.min(18)]], // Âge min 18 ans
    });
  }

  // Vérifie si un champ est invalide et a été touché
  isInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    return control?.invalid ? true : false;
  }

  // Connexion via formulaire classique
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response: AuthResponseDto) => {
        if (response.isSuccess) {
          console.log('Connexion réussie', response);
          // Rediriger vers la page d'accueil
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message;  // Afficher le message d'erreur
        }
      },
      error: () => {
        this.errorMessage = 'Une erreur de serveur est survenue, veuillez réessayer.';
      }
    });
  }

  // Inscription via formulaire classique
  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstname, lastname, email, password, confirmPassword, gender, age } = this.registerForm.value;
    if (password === confirmPassword) {
      this.authService.register({ firstname, lastname, email, password, gender, age, roleId: 3 }).subscribe({
        next: (response: AuthResponseDto) => {
          if (response.isSuccess) {
            console.log('Inscription réussie', response);
            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message;  // Afficher le message d'erreur
          }
        },
        error: () => {
          this.errorMessage = 'Une erreur de serveur est survenue, veuillez réessayer.';
        }
      });
    } else {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
    }
  }

  // Basculer entre le mode de connexion et d'inscription
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null; // Réinitialiser le message d'erreur lors du changement de mode
  }

  // Connexion via Google
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  // Pré-remplir le formulaire d'inscription avec les données fournies par Google
  prefillRegistrationForm(user: Partial<UserGetDto>) {
    this.registerForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  }
}
