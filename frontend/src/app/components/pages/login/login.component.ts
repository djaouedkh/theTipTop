import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponseDto } from '../../../core/dtos/auth/auth-response.dto';
import { UserLoginGoogleDto } from '../../../core/dtos/auth/external-auth/user-login-google.dto';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForms();

    // Gestion du callback Google
    this.route.queryParams.subscribe(params => {
      if (params['isSuccess'] === 'true') {
        const isGoogleRegister = params['isGoogleRegister'] === 'true';
        const dataLogin: UserLoginGoogleDto = { email: params['email'] };

        if (isGoogleRegister) {
          // Google indique qu'il faut finaliser l'inscription
          this.isLoginMode = false;
          this.registerForm.patchValue(dataLogin);
        } else {
          // Connexion directe
          this.authService.loginPostGoogleAuth(dataLogin).subscribe({
            next: (response: AuthResponseDto) => {
              if (response.isSuccess) {
                this.router.navigate(['/']);
              } else {
                this.errorMessage = response.message;
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

  private initForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  // Affiche l'erreur seulement si le champ est invalide ET que l'utilisateur y a déjà interagi
  isInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response: AuthResponseDto) => {
        if (response.isSuccess) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: () => {
        this.errorMessage = 'Une erreur de serveur est survenue, veuillez réessayer.';
      }
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { firstname, lastname, email, password, confirmPassword, gender, age } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.authService.register({ firstname, lastname, email, password, gender, age, roleId: 3 })
      .subscribe({
        next: (response: AuthResponseDto) => {
          if (response.isSuccess) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: () => {
          this.errorMessage = 'Une erreur de serveur est survenue, veuillez réessayer.';
        }
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;

    // Reset des formulaires pour réinitialiser touched/dirty
    this.loginForm.reset();
    this.registerForm.reset();
    this.initForms();
  }
}
